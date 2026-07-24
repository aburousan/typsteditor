export type CollabInvite = {
  url: string;
  room: string;
  key: string;
};

const ROOM_RE = /^[0-9a-f]{64}$/i;
const KEY_BYTES = 32;
const FRAME_VERSION = 1;
const IV_BYTES = 12;

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToBytes(value: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) return null;
  try {
    const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
    const binary = atob(padded);
    return Uint8Array.from(binary, character => character.charCodeAt(0));
  } catch {
    return null;
  }
}

export function normalizeCollabServerUrl(value: string): string | null {
  let candidate = value.trim();
  if (!candidate) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(candidate)) candidate = `ws://${candidate}`;
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== 'ws:' && parsed.protocol !== 'wss:') return null;
    if (!parsed.hostname || parsed.username || parsed.password || parsed.search || parsed.hash) return null;
    const path = parsed.pathname.replace(/\/+$/, '');
    return `${parsed.protocol}//${parsed.host}${path}`;
  } catch {
    return null;
  }
}

export function newCollabSession(): { room: string; key: string } {
  const roomBytes = new Uint8Array(32);
  const keyBytes = new Uint8Array(KEY_BYTES);
  crypto.getRandomValues(roomBytes);
  crypto.getRandomValues(keyBytes);
  return {
    room: Array.from(roomBytes, byte => byte.toString(16).padStart(2, '0')).join(''),
    key: bytesToBase64Url(keyBytes),
  };
}

export function makeCollabTicket(url: string, room: string, key: string): string {
  const normalized = normalizeCollabServerUrl(url);
  const decodedKey = base64UrlToBytes(key);
  if (!normalized || !ROOM_RE.test(room) || decodedKey?.length !== KEY_BYTES) {
    throw new Error('Invalid collaboration invitation parameters.');
  }
  const params = new URLSearchParams({ server: normalized, room: room.toLowerCase(), key });
  return `hilbert-collab://join?${params.toString()}`;
}

export function parseCollabTicket(ticket: string): CollabInvite | null {
  try {
    const parsed = new URL(ticket.trim());
    if (parsed.protocol !== 'hilbert-collab:' || parsed.hostname !== 'join') return null;
    const url = normalizeCollabServerUrl(parsed.searchParams.get('server') || '');
    const room = parsed.searchParams.get('room') || '';
    const key = parsed.searchParams.get('key') || '';
    const decodedKey = base64UrlToBytes(key);
    if (!url || !ROOM_RE.test(room) || decodedKey?.length !== KEY_BYTES) return null;
    return { url, room: room.toLowerCase(), key };
  } catch {
    return null;
  }
}

function encryptedFrame(key: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer> {
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  return crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data).then(ciphertext => {
    const packet = new Uint8Array(1 + IV_BYTES + ciphertext.byteLength);
    packet[0] = FRAME_VERSION;
    packet.set(iv, 1);
    packet.set(new Uint8Array(ciphertext), 1 + IV_BYTES);
    return packet.buffer;
  });
}

async function decryptedFrame(key: CryptoKey, packet: ArrayBuffer): Promise<ArrayBuffer> {
  const bytes = new Uint8Array(packet);
  // The smallest authentic frame is version + IV + a bare 16-byte GCM tag.
  if (bytes.length < 1 + IV_BYTES + 16 || bytes[0] !== FRAME_VERSION) {
    throw new Error('Invalid encrypted collaboration frame.');
  }
  const iv = bytes.slice(1, 1 + IV_BYTES);
  const ciphertext = bytes.slice(1 + IV_BYTES);
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
}

// y-websocket accepts a WebSocket constructor. This adapter encrypts every
// network frame before the relay sees it and decrypts it before Yjs receives it.
// The relay therefore needs no document key and can remain content-blind.
export function encryptedWebSocketClass(encodedKey: string): typeof WebSocket {
  const rawKey = base64UrlToBytes(encodedKey);
  if (!rawKey || rawKey.length !== KEY_BYTES) throw new Error('Invalid collaboration key.');
  const keyMaterial = rawKey.slice().buffer as ArrayBuffer;
  const keyPromise = crypto.subtle.importKey('raw', keyMaterial, 'AES-GCM', false, ['encrypt', 'decrypt']);

  class EncryptedWebSocket {
    static readonly CONNECTING = WebSocket.CONNECTING;
    static readonly OPEN = WebSocket.OPEN;
    static readonly CLOSING = WebSocket.CLOSING;
    static readonly CLOSED = WebSocket.CLOSED;
    readonly CONNECTING = WebSocket.CONNECTING;
    readonly OPEN = WebSocket.OPEN;
    readonly CLOSING = WebSocket.CLOSING;
    readonly CLOSED = WebSocket.CLOSED;

    private readonly socket: WebSocket;
    private sendChain: Promise<void> = Promise.resolve();
    private receiveChain: Promise<void> = Promise.resolve();
    onopen: ((event: Event) => void) | null = null;
    onclose: ((event: CloseEvent) => void) | null = null;
    onerror: ((event: Event) => void) | null = null;
    onmessage: ((event: MessageEvent) => void) | null = null;

    constructor(url: string | URL, protocols?: string | string[]) {
      this.socket = new WebSocket(url, protocols);
      this.socket.binaryType = 'arraybuffer';
      this.socket.onopen = event => {
        void keyPromise.then(() => {
          if (this.socket.readyState === WebSocket.OPEN) this.onopen?.(event);
        }).catch(() => this.fail());
      };
      this.socket.onclose = event => this.onclose?.(event);
      this.socket.onerror = event => this.onerror?.(event);
      this.socket.onmessage = event => {
        this.receiveChain = this.receiveChain.then(async () => {
          const packet = event.data instanceof Blob ? await event.data.arrayBuffer() : event.data;
          if (!(packet instanceof ArrayBuffer)) throw new Error('Expected a binary collaboration frame.');
          const plaintext = await decryptedFrame(await keyPromise, packet);
          this.onmessage?.(new MessageEvent('message', { data: plaintext }));
        // A relay can receive probes or a client with the wrong invitation key.
        // Ignore frames that do not authenticate instead of letting that client
        // disconnect valid collaborators.
        }).catch(() => {});
      };
    }

    get readyState() { return this.socket.readyState; }
    get bufferedAmount() { return this.socket.bufferedAmount; }
    get extensions() { return this.socket.extensions; }
    get protocol() { return this.socket.protocol; }
    get url() { return this.socket.url; }
    get binaryType() { return this.socket.binaryType; }
    set binaryType(value: BinaryType) { this.socket.binaryType = value; }

    send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
      this.sendChain = this.sendChain.then(async () => {
        if (this.socket.readyState !== WebSocket.OPEN) return;
        let plaintext: ArrayBuffer;
        if (data instanceof ArrayBuffer) plaintext = data;
        else if (ArrayBuffer.isView(data)) {
          plaintext = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
        } else if (data instanceof Blob) plaintext = await data.arrayBuffer();
        else throw new Error('Text collaboration frames are not supported.');
        this.socket.send(await encryptedFrame(await keyPromise, plaintext));
      }).catch(() => this.fail());
    }

    close(code?: number, reason?: string) {
      // Let frames still in the encryption queue (such as the awareness
      // departure announcement) reach the socket before it closes.
      void this.sendChain.finally(() => this.socket.close(code, reason));
    }

    private fail() {
      this.onerror?.(new Event('error'));
      if (this.socket.readyState < WebSocket.CLOSING) {
        this.socket.close(1008, 'Encrypted collaboration frame rejected');
      }
    }
  }

  return EncryptedWebSocket as unknown as typeof WebSocket;
}

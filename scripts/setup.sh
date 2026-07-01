#!/usr/bin/env bash
# Sets up the tools Typst Editor needs (Typst CLI + Python stack) and installs
# npm dependencies. Works on macOS and Linux.
#
#   bash scripts/setup.sh
set -e

info() { printf "\033[1;35m==>\033[0m %s\n" "$1"; }
ok()   { printf "\033[1;32m ✓\033[0m %s\n" "$1"; }
warn() { printf "\033[1;33m !\033[0m %s\n" "$1"; }

OS="$(uname -s)"; ARCH="$(uname -m)"

have() { command -v "$1" >/dev/null 2>&1; }

# --- Node -------------------------------------------------------------------
if have node; then ok "Node $(node -v)"; else
  warn "Node.js not found. Install Node 18+ from https://nodejs.org (or 'brew install node')."
fi

# --- Typst CLI --------------------------------------------------------------
if have typst; then
  ok "Typst $(typst --version | awk '{print $2}')"
else
  info "Installing Typst CLI…"
  if [ "$OS" = "Darwin" ] && have brew; then
    brew install typst
  elif have cargo; then
    cargo install typst-cli
  else
    case "$ARCH" in
      x86_64) T=x86_64 ;; aarch64|arm64) T=aarch64 ;; *) T=x86_64 ;;
    esac
    if [ "$OS" = "Darwin" ]; then TRIP="$T-apple-darwin"; else TRIP="$T-unknown-linux-musl"; fi
    URL="https://github.com/typst/typst/releases/latest/download/typst-$TRIP.tar.xz"
    TMP="$(mktemp -d)"
    curl -fsSL "$URL" -o "$TMP/typst.tar.xz"
    tar -xf "$TMP/typst.tar.xz" -C "$TMP"
    mkdir -p "$HOME/.local/bin"
    mv "$TMP"/typst-*/typst "$HOME/.local/bin/typst"
    chmod +x "$HOME/.local/bin/typst"
    rm -rf "$TMP"
    ok "Installed Typst to ~/.local/bin (make sure it's on your PATH)"
  fi
fi

# --- Python scientific stack (optional live-code features) ------------------
if have python3; then
  info "Installing Python packages (numpy, matplotlib, sympy)…"
  python3 -m pip install --user --quiet --upgrade numpy matplotlib sympy 2>/dev/null \
    || python3 -m pip install --user --quiet --break-system-packages numpy matplotlib sympy \
    || warn "Could not install Python packages automatically — install numpy/matplotlib/sympy yourself for live Python."
  ok "Python stack ready"
else
  warn "python3 not found — the live Python feature will be unavailable (optional)."
fi

have julia          && ok "Julia found (optional)"       || warn "Julia not found (optional — for live Julia)."
have wolframscript  && ok "WolframScript found (optional)" || warn "WolframScript not found (optional — for live Wolfram)."

# --- npm deps ---------------------------------------------------------------
if have npm; then
  info "Installing npm dependencies…"
  npm install
  ok "Done. Start the app with:  npm run dev"
else
  warn "npm not found — install Node.js, then run 'npm install'."
fi

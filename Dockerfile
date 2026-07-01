# Typst Editor — self-contained image with the Typst CLI and a Python stack.
#
#   docker build -t typst-editor .
#   docker run --rm -p 127.0.0.1:3001:3001 -v "$PWD/workspace:/app/workspace" typst-editor
#   → open http://localhost:3001
FROM node:20-bookworm-slim

# System deps + Python (for the live-code / plotting features).
RUN apt-get update && apt-get install -y --no-install-recommends \
      curl xz-utils ca-certificates fontconfig \
      python3 python3-pip python3-numpy python3-matplotlib python3-sympy \
    && rm -rf /var/lib/apt/lists/*

# Install the Typst CLI (latest release) for the container's architecture.
RUN set -eux; \
    case "$(uname -m)" in \
      x86_64)         TARCH=x86_64 ;; \
      aarch64|arm64)  TARCH=aarch64 ;; \
      *)              TARCH=x86_64 ;; \
    esac; \
    curl -fsSL "https://github.com/typst/typst/releases/latest/download/typst-${TARCH}-unknown-linux-musl.tar.xz" -o /tmp/typst.tar.xz; \
    tar -xf /tmp/typst.tar.xz -C /tmp; \
    mv /tmp/typst-*/typst /usr/local/bin/typst; \
    chmod +x /usr/local/bin/typst; \
    rm -rf /tmp/typst*

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# The server binds HOST:3001 and also serves the built UI.
ENV HOST=0.0.0.0 \
    ALLOW_CODE_EXECUTION=1 \
    NODE_ENV=production
EXPOSE 3001
CMD ["node", "server.js"]

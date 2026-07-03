# Builds the Linux desktop bundles (AppImage + .deb) in a container, since Tauri
# links against WebKitGTK and cannot cross-compile from macOS. The compiled
# src-tauri/target is written back to a mounted volume.
FROM rust:1-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    libwebkit2gtk-4.1-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    patchelf \
    file \
    desktop-file-utils \
    libssl-dev \
    pkg-config \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# AppImage tooling needs FUSE at runtime; in a container we extract instead.
ENV APPIMAGE_EXTRACT_AND_RUN=1

RUN cargo install tauri-cli --version "^2" --locked

WORKDIR /work
CMD ["bash", "/work/linux-build/build.sh"]

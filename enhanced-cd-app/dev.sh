#!/bin/bash

# Source the Rust environment variables
if [ -f "$HOME/.cargo/env" ]; then
    source "$HOME/.cargo/env"
fi

# Run the Tauri development server
echo "Starting Enhanced CD App..."
npx tauri dev

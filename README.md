# MDEditor

A modern markdown editor that works on both web and desktop platforms.

## Features

- ✨ Beautiful, modern UI
- 📝 Monaco Editor for code editing
- 👁️ Live markdown preview with syntax highlighting
- 📂 File operations (open, save, save as)
- 🖥️ Desktop app via Tauri (Windows, macOS, Linux)
- 🌐 Web app via Vite
- 📱 Split view, edit-only, and preview-only modes

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Rust (for desktop builds) - [Install Rust](https://www.rust-lang.org/tools/install)

### Installation

```bash
npm install
```

### Development

#### Web Development

```bash
npm run dev
```

This will start the Vite dev server at `http://localhost:1420`

#### Desktop Development

```bash
npm run tauri:dev
```

This will build and run the Tauri desktop application.

### Building

#### Web Build

```bash
npm run build
```

The built files will be in the `dist` directory.

#### Desktop Build

```bash
npm run tauri:build
```

This will create platform-specific installers in `src-tauri/target/release/bundle/`.

## Project Structure

```
mdeditor/
├── src/                    # React application source
│   ├── components/         # React components
│   ├── utils/             # Utility functions
│   └── App.tsx            # Main app component
├── src-tauri/             # Tauri desktop app
│   ├── src/               # Rust source
│   └── tauri.conf.json    # Tauri configuration
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies and scripts
```

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Monaco Editor** - Code editor
- **React Markdown** - Markdown rendering
- **Tauri** - Desktop framework
- **Rust** - Desktop backend

## License

MIT


# Changelog

All notable changes to MDEditor will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Performance Optimizations - 2026-01-03

#### Added
- **Lazy Loading for Monaco Editor**: Implemented `LazyMonacoEditor` component to defer loading of Monaco Editor until needed, reducing initial bundle size and improving LCP (Largest Contentful Paint)
- **Code Splitting**: Configured Vite to split vendor chunks (React, Monaco, Markdown libraries) for better caching and smaller initial bundle
- **Caching Headers**: Added `public/_headers` file for Cloudflare Pages with proper cache-control headers
  - Static assets cached for 1 year with `immutable` flag
  - HTML files with `must-revalidate` for proper cache invalidation
- **Resource Hints**: Added `preconnect` and `dns-prefetch` for CDN resources in `index.html`
- **Build Optimizations**: Enhanced Vite build configuration with:
  - Optimized chunk file naming with content hashes
  - Minification with esbuild
  - Chunk size warning limits

#### Changed
- **Monaco Editor Loading**: Switched from eager loading to lazy loading with Suspense boundary
- **Build Output**: Improved chunk organization for better caching strategy

#### Performance Metrics (Expected Improvements)
- **LCP**: Reduced render delay from 351ms (83.4% of LCP time) through lazy loading
- **Caching**: Static assets now cached for 1 year, significantly improving repeat visit performance
- **Bundle Size**: Reduced initial bundle size through code splitting
- **Network**: Improved connection time through resource hints

## [1.0.0] - 2026-01-02

### Added
- **Initial Release**: Markdown editor with web and desktop support
- **Monaco Editor Integration**: Full-featured code editor with markdown syntax support
- **Live Preview**: Real-time markdown preview with syntax highlighting
- **File Operations**: Open, save, and save as functionality
- **View Modes**: Split view, edit-only, and preview-only modes
- **Desktop App**: Tauri-based desktop application for Windows, macOS, and Linux
- **Web App**: Vite-based web application
- **Syntax Suggestions**: Intelligent markdown completion suggestions with visual previews
- **Custom Theme**: Light glass theme for Monaco editor matching the preview panel
- **Glassmorphism UI**: Modern liquid glass design with translucent elements
- **Apple System Fonts**: SF Pro Display and SF Mono font integration
- **Synchronized Scrolling**: Scroll synchronization between editor and preview (later removed)
- **Resizable Split View**: Drag-to-resize functionality for split view
- **Cloudflare Pages Deployment**: Automated deployment configuration

### Changed
- **UI Design**: Ported to liquid glass (glassmorphism) design system
- **Editor Theme**: Customized Monaco editor theme to match light glass preview
- **Code Block Styling**: Improved contrast for code block text colors
- **Font System**: Changed to Apple's system fonts for better macOS integration

### Fixed
- **Duplicate Suggestions**: Fixed duplicate markdown suggestions in Monaco editor
- **Trigger Character Trimming**: Fixed issue where trigger characters weren't being trimmed from completions
- **Code Quality**: Refactored codebase for better separation of concerns and single responsibility
- **Linter Errors**: Resolved TypeScript and ESLint errors
- **Cloudflare Deployment**: Fixed Wrangler configuration for static asset deployment

### Technical Details
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Desktop Framework**: Tauri 1.5
- **Editor**: Monaco Editor via @monaco-editor/react
- **Markdown Rendering**: react-markdown with remark-gfm and rehype plugins
- **Syntax Highlighting**: highlight.js with rehype-highlight
- **Deployment**: Cloudflare Pages with Wrangler

## [0.1.0] - 2025-12-31

### Added
- Initial project setup
- Basic markdown editor functionality
- Tauri desktop app configuration

---

## Legend

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes


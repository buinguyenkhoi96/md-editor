import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
  build: {
    // Enable code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          // Separate node_modules into vendor chunks
          if (id.indexOf('node_modules') !== -1) {
            if (id.indexOf('react') !== -1 || id.indexOf('react-dom') !== -1) {
              return 'react-vendor'
            }
            if (id.indexOf('monaco-editor') !== -1) {
              return 'monaco-vendor'
            }
            if (id.indexOf('react-markdown') !== -1 || id.indexOf('remark') !== -1 || id.indexOf('rehype') !== -1) {
              return 'markdown-vendor'
            }
            // Other node_modules
            return 'vendor'
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    // Minify for production (esbuild is default and faster)
    minify: 'esbuild',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', '@monaco-editor/react'],
  },
})


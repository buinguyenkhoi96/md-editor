import { lazy, Suspense } from 'react'
import type { EditorProps } from '@monaco-editor/react'

// Lazy load Monaco Editor to reduce initial bundle size
const Editor = lazy(() => import('@monaco-editor/react').then(module => ({ default: module.default })))

interface LazyMonacoEditorProps extends EditorProps {
  fallback?: React.ReactNode
}

export default function LazyMonacoEditor({ fallback, ...props }: LazyMonacoEditorProps) {
  return (
    <Suspense fallback={fallback || <div style={{ 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: '#666',
      fontSize: '14px'
    }}>Loading editor...</div>}>
      <Editor {...props} />
    </Suspense>
  )
}


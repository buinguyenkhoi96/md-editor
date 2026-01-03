import { useState, useRef } from 'react'
import LazyMonacoEditor from './LazyMonacoEditor'
import MarkdownPreview from './MarkdownPreview'
import { useResizeSplit } from '../hooks/useResizeSplit'
import { useMonacoEditor } from '../hooks/useMonacoEditor'
import './MarkdownEditor.css'

interface MarkdownEditorProps {
  content: string
  onChange: (content: string) => void
}

export default function MarkdownEditor({ content, onChange }: MarkdownEditorProps) {
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split')
  const previewRef = useRef<HTMLDivElement>(null)
  
  const { splitPosition, containerRef, handleResizeStart } = useResizeSplit({
    viewMode
  })
  
  const { handleEditorDidMount, editorOptions } = useMonacoEditor()

  return (
    <div className="markdown-editor-container">
      <div className="view-controls">
        <button
          className={`view-btn ${viewMode === 'edit' ? 'active' : ''}`}
          onClick={() => setViewMode('edit')}
          title="Edit Mode"
        >
          Edit
        </button>
        <button
          className={`view-btn ${viewMode === 'split' ? 'active' : ''}`}
          onClick={() => setViewMode('split')}
          title="Split View"
        >
          Split
        </button>
        <button
          className={`view-btn ${viewMode === 'preview' ? 'active' : ''}`}
          onClick={() => setViewMode('preview')}
          title="Preview Mode"
        >
          Preview
        </button>
      </div>
      <div className="editor-wrapper" ref={containerRef}>
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div 
            className={`editor-pane ${viewMode === 'split' ? 'split' : 'full'}`}
            style={viewMode === 'split' ? { width: `${splitPosition}%` } : {}}
          >
            <LazyMonacoEditor
              height="100%"
              defaultLanguage="markdown"
              value={content}
              onChange={(value) => onChange(value || '')}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={editorOptions}
              loading={<div style={{ 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#666',
                fontSize: '14px'
              }}>Loading editor...</div>}
            />
          </div>
        )}
        {viewMode === 'split' && (
          <div 
            className="resize-handle"
            onMouseDown={handleResizeStart}
          />
        )}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div 
            className={`preview-pane ${viewMode === 'split' ? 'split' : 'full'}`}
            style={viewMode === 'split' ? { width: `${100 - splitPosition}%` } : {}}
          >
            <MarkdownPreview content={content} previewRef={previewRef} />
          </div>
        )}
      </div>
    </div>
  )
}

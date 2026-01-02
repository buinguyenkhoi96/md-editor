import './Toolbar.css'

interface ToolbarProps {
  onNew: () => void
  onOpen: () => void
  onSave: () => void
  onSaveAs: () => void
  fileName: string | null
  isTauri: boolean
}

export default function Toolbar({ onNew, onOpen, onSave, onSaveAs, fileName, isTauri }: ToolbarProps) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <h1 className="toolbar-title">MDEditor</h1>
        {fileName && <span className="toolbar-filename">{fileName}</span>}
      </div>
      <div className="toolbar-right">
        <button className="toolbar-btn" onClick={onNew} title="New Document">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <path d="M8 2v12M2 8h12" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          New
        </button>
        <button className="toolbar-btn" onClick={onOpen} title="Open File">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <path d="M14 9v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h3" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M14 9l-5-5M9 4v5h5" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Open
        </button>
        <button className="toolbar-btn" onClick={onSave} title="Save" disabled={!fileName && !isTauri}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <path d="M3 13h10V5H3v8z" strokeWidth="1.5"/>
            <path d="M5 3V1h6v2M5 13V8h6v5" strokeWidth="1.5"/>
          </svg>
          Save
        </button>
        <button className="toolbar-btn" onClick={onSaveAs} title="Save As">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <path d="M3 13h10V5H3v8z" strokeWidth="1.5"/>
            <path d="M5 3V1h6v2M5 13V8h6v5" strokeWidth="1.5"/>
          </svg>
          Save As
        </button>
      </div>
    </div>
  )
}


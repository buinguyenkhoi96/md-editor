import { useState, useEffect } from 'react'
import MarkdownEditor from './components/MarkdownEditor'
import Toolbar from './components/Toolbar'
import { checkTauri, openFile, saveFile } from './utils/fileOperations'
import './App.css'

function App() {
  const [content, setContent] = useState('# Welcome to MDEditor\n\nStart editing your markdown here...')
  const [isTauri, setIsTauri] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  useEffect(() => {
    checkTauri().then(setIsTauri)
  }, [])

  const handleNew = () => {
    setContent('# New Document\n\n')
    setFileName(null)
  }

  const handleOpen = async () => {
    if (isTauri) {
      const result = await openFile()
      if (result) {
        setContent(result.content)
        setFileName(result.fileName)
      }
    } else {
      // Web fallback: create file input
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.md,.markdown,text/markdown'
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          const text = await file.text()
          setContent(text)
          setFileName(file.name)
        }
      }
      input.click()
    }
  }

  const handleSave = async () => {
    if (isTauri) {
      const savedFileName = await saveFile(content, fileName)
      if (savedFileName) {
        setFileName(savedFileName)
      }
    } else {
      // Web fallback: download file
      const blob = new Blob([content], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName || 'document.md'
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const handleSaveAs = async () => {
    if (isTauri) {
      const savedFileName = await saveFile(content, null)
      if (savedFileName) {
        setFileName(savedFileName)
      }
    } else {
      const blob = new Blob([content], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName || 'document.md'
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="app">
      <Toolbar
        onNew={handleNew}
        onOpen={handleOpen}
        onSave={handleSave}
        onSaveAs={handleSaveAs}
        fileName={fileName}
        isTauri={isTauri}
      />
      <MarkdownEditor content={content} onChange={setContent} />
    </div>
  )
}

export default App


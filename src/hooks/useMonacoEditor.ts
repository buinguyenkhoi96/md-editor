import { useCallback } from 'react'
import type { Monaco } from '@monaco-editor/react'
import { configureMarkdownLanguage, getEditorOptions } from '../utils/monacoConfig'
import { registerMarkdownCompletions } from '../utils/markdownCompletions'

export const useMonacoEditor = () => {
  const handleEditorDidMount = useCallback((_editor: any, monaco: Monaco) => {
    configureMarkdownLanguage(monaco)
    registerMarkdownCompletions(monaco)
  }, [])

  const editorOptions = getEditorOptions()

  return {
    handleEditorDidMount,
    editorOptions
  }
}


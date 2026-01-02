import type { Monaco } from '@monaco-editor/react'

export const getEditorOptions = () => ({
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: 'on' as const,
  wordWrap: 'on' as const,
  automaticLayout: true,
  scrollBeyondLastLine: false,
  padding: { top: 16, bottom: 16 },
  // Enable suggestions and autocomplete
  quickSuggestions: {
    other: true,
    comments: true,
    strings: true
  },
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnCommitCharacter: true,
  acceptSuggestionOnEnter: 'on' as const,
  tabCompletion: 'on' as const,
  wordBasedSuggestions: 'off' as const, // Disable word-based to avoid duplicates
  // Snippet suggestions
  snippetSuggestions: 'top' as const,
  // Additional UX improvements
  parameterHints: { enabled: true },
  hover: { enabled: true },
  formatOnPaste: true,
  formatOnType: true,
  // Auto closing
  autoClosingBrackets: 'always' as const,
  autoClosingQuotes: 'always' as const,
  autoSurround: 'languageDefined' as const,
  // Smart features
  smartSelect: {
    selectLeadingAndTrailingWhitespace: true
  },
  // Multi cursor
  multiCursorModifier: 'ctrlCmd' as const,
  // Bracket matching
  matchBrackets: 'always' as const,
  // Indentation
  autoIndent: 'full' as const,
  tabSize: 2,
  insertSpaces: true
})

export const configureMarkdownLanguage = (monaco: Monaco) => {
  monaco.languages.setLanguageConfiguration('markdown', {
    comments: {
      lineComment: '<!--',
      blockComment: ['<!--', '-->']
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: '`', close: '`' }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: '`', close: '`' },
      { open: '*', close: '*' },
      { open: '_', close: '_' },
      { open: '~', close: '~' }
    ]
  })
}


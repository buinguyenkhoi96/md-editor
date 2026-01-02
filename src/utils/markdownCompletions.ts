import type { Monaco } from '@monaco-editor/react'

interface CompletionContext {
  model: any
  position: any
  monaco: Monaco
}

const createCompletionRange = (model: any, position: any) => {
  const lineContent = model.getLineContent(position.lineNumber)
  const textUntilPosition = lineContent.substring(0, position.column - 1)
  
  const triggerChars = ['#', '*', '[', '!', '`', '-', '>', '|', '~']
  let startColumn = position.column
  let endColumn = position.column
  
  const charBefore = textUntilPosition[textUntilPosition.length - 1]
  if (triggerChars.includes(charBefore)) {
    startColumn = position.column - 1
    endColumn = position.column
  } else {
    const word = model.getWordUntilPosition(position)
    startColumn = word.startColumn
    endColumn = word.endColumn
  }
  
  return {
    startLineNumber: position.lineNumber,
    endLineNumber: position.lineNumber,
    startColumn,
    endColumn
  }
}

const createSuggestion = (
  label: string,
  insertText: string,
  detail: string,
  documentation: string,
  range: any,
  monaco: Monaco
) => ({
  label,
  kind: monaco.languages.CompletionItemKind.Snippet,
  insertText,
  insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
  documentation: { value: documentation },
  detail,
  range
})

const getMarkdownSuggestions = ({ model, position, monaco }: CompletionContext) => {
  const range = createCompletionRange(model, position)

  return [
    createSuggestion(
      'h1',
      '# ${1:Heading 1}\n',
      'Heading 1 - Large title',
      '**Preview:**\n\n# Heading 1\n\nLarge heading text',
      range,
      monaco
    ),
    createSuggestion(
      'h2',
      '## ${1:Heading 2}\n',
      'Heading 2 - Medium title',
      '**Preview:**\n\n## Heading 2\n\nMedium heading text',
      range,
      monaco
    ),
    createSuggestion(
      'h3',
      '### ${1:Heading 3}\n',
      'Heading 3 - Small title',
      '**Preview:**\n\n### Heading 3\n\nSmall heading text',
      range,
      monaco
    ),
    createSuggestion(
      'bold',
      '**${1:text}**',
      'Bold text - **Bold Text**',
      '**Preview:**\n\n**Bold Text**\n\nMakes text appear in **bold**',
      range,
      monaco
    ),
    createSuggestion(
      'italic',
      '*${1:text}*',
      'Italic text - *Italic Text*',
      '**Preview:**\n\n*Italic Text*\n\nMakes text appear in *italics*',
      range,
      monaco
    ),
    createSuggestion(
      'bold-italic',
      '***${1:text}***',
      'Bold & Italic - ***Bold Italic***',
      '**Preview:**\n\n***Bold Italic Text***\n\nMakes text appear in ***bold and italic***',
      range,
      monaco
    ),
    createSuggestion(
      'link',
      '[${1:link text}](${2:url})',
      'Link - [text](url)',
      '**Preview:**\n\n[Link Text](https://example.com)\n\nCreates a clickable link: [Link Text](https://example.com)',
      range,
      monaco
    ),
    createSuggestion(
      'image',
      '![${1:alt text}](${2:image url})',
      'Image - ![alt](url)',
      '**Preview:**\n\n![Alt Text](image.png)\n\nEmbeds an image with alt text',
      range,
      monaco
    ),
    createSuggestion(
      'code',
      '`${1:code}`',
      'Inline code - `code`',
      '**Preview:**\n\n`inline code`\n\nCreates inline code with monospace font: `code`',
      range,
      monaco
    ),
    createSuggestion(
      'codeblock',
      '```${1:language}\n${2:code}\n```',
      'Code block - ```language```',
      '**Preview:**\n\n```\ncode block\nwith syntax highlighting\n```\n\nCreates a code block with syntax highlighting',
      range,
      monaco
    ),
    createSuggestion(
      'list',
      '- ${1:item 1}\n- ${2:item 2}\n- ${3:item 3}',
      'Bullet list - • Item',
      '**Preview:**\n\n• Item 1\n• Item 2\n• Item 3\n\nCreates a bulleted list',
      range,
      monaco
    ),
    createSuggestion(
      'olist',
      '1. ${1:item 1}\n2. ${2:item 2}\n3. ${3:item 3}',
      'Numbered list - 1. Item',
      '**Preview:**\n\n1. Item 1\n2. Item 2\n3. Item 3\n\nCreates a numbered list',
      range,
      monaco
    ),
    createSuggestion(
      'blockquote',
      '> ${1:quote}',
      'Blockquote - > Quote',
      '**Preview:**\n\n> Quote text\n\nCreates a blockquote with indented text:\n\n> This is a quote',
      range,
      monaco
    ),
    createSuggestion(
      'table',
      '| ${1:Header 1} | ${2:Header 2} |\n| --- | --- |\n| ${3:Cell 1} | ${4:Cell 2} |',
      'Table - | Header |',
      '**Preview:**\n\n| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |\n\nCreates a table with headers and cells',
      range,
      monaco
    ),
    createSuggestion(
      'hr',
      '---\n',
      'Horizontal rule - ---',
      '**Preview:**\n\n---\n\nCreates a horizontal rule (divider line)',
      range,
      monaco
    ),
    createSuggestion(
      'checkbox',
      '- [ ] ${1:task}',
      'Checkbox - ☐ Task',
      '**Preview:**\n\n☐ Task item\n\nCreates a checkbox task list item',
      range,
      monaco
    ),
    createSuggestion(
      'strikethrough',
      '~~${1:text}~~',
      'Strikethrough - ~~text~~',
      '**Preview:**\n\n~~Strikethrough Text~~\n\nMakes text appear with a line through it: ~~strikethrough~~',
      range,
      monaco
    )
  ]
}

export const registerMarkdownCompletions = (monaco: Monaco) => {
  monaco.languages.registerCompletionItemProvider('markdown', {
    provideCompletionItems: (model: any, position: any) => {
      const suggestions = getMarkdownSuggestions({ model, position, monaco })
      
      return {
        suggestions,
        incomplete: false
      }
    },
    triggerCharacters: ['#', '*', '[', '!', '`', '-', '>', '|', '~']
  })
}


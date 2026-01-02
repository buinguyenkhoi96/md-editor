import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import './MarkdownPreview.css'

// Import highlight.js styles
import 'highlight.js/styles/github-dark.css'

interface MarkdownPreviewProps {
  content: string
  previewRef?: React.RefObject<HTMLDivElement>
}

export default function MarkdownPreview({ content, previewRef }: MarkdownPreviewProps) {
  return (
    <div className="markdown-preview" ref={previewRef}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          code({ className, children, ...props }: any) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}


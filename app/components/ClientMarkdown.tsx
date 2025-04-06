'use client'

import { ReactNode } from 'react'

interface ClientMarkdownProps {
  children: ReactNode
}

export default function ClientMarkdown({ children }: ClientMarkdownProps) {
  return (
    <div className="mdx-content prose prose-invert prose-headings:mt-8 prose-headings:mb-4 prose-p:my-4 prose-li:my-2 max-w-2xl">
      {children}
    </div>
  )
} 
import { ReactNode } from 'react'

interface MDXLayoutProps {
  children: ReactNode
  frontMatter: {
    title?: string
    description?: string
    date?: string
  }
}

export default function MDXLayout({ children, frontMatter }: MDXLayoutProps) {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(Date.UTC(year, month - 1, day))
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    })
  }

  return (
    <article>
      <header className="mb-8 border-b border-gray-800 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          {frontMatter.title}
        </h1>
        {frontMatter.description && (
          <p className="text-xl text-gray-300 mb-2">
            {frontMatter.description}
          </p>
        )}
        {frontMatter.date && (
          <time className="text-sm text-gray-400">
            {formatDate(frontMatter.date)}
          </time>
        )}
      </header>
      <div className="max-w-none">
        {children}
      </div>
    </article>
  )
} 

import { getAllPosts } from '@/app/lib/mdx'
import { notFound } from 'next/navigation'
import MDXLayout from '@/app/components/MDXLayout'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'
import { ReactNode } from 'react'
import ClientMarkdown from '@/app/components/ClientMarkdown'
// Import the MDX Remote component for server components
import { MDXRemote } from 'next-mdx-remote/rsc'
// Import rehype-pretty-code and its options
import rehypePrettyCode from 'rehype-pretty-code'
import { Options } from 'rehype-pretty-code'

// Define node type for rehype 
interface RehypeNode {
  children: Array<{ type: string; value: string }>;
  properties: {
    className: string[];
  };
}

interface HighlightedChunk {
  properties: {
    className?: string[];
    [key: string]: unknown;
  };
}

// Define the rehype-pretty-code options (same as in next.config.mjs)
const prettyCodeOptions = {
  theme: 'dark-plus', // VS Code Dark+ theme
  keepBackground: true,
  // Add language labels
  filterMetaString: (meta: string) => meta,
  // Ensure language is passed to the data-language attribute
  onVisitHighlightedChunk(chunk: HighlightedChunk) {
    chunk.properties.className = chunk.properties.className ?? [];
    
    // Get language from className (rehype-pretty-code seems to add the language there)
    const language = 
      chunk.properties.className
        .find((className: string) => className.startsWith('language-'))
        ?.replace('language-', '');

    if (language) {
      chunk.properties['data-language'] = language;
    }
  },
  // Use fancy VSCode-like line numbers
  onVisitLine(node: RehypeNode) {
    if (node.children.length === 0) {
      // Add a zero-width space, so empty lines are also highlighted
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  // Add VS Code-like line highlighting
  onVisitHighlightedLine(node: RehypeNode) {
    node.properties.className.push('highlighted')
  },
  // Add VS Code-like line numbers
  onVisitHighlightedWord(node: RehypeNode) {
    node.properties.className = ['word']
  }
}

// Define custom components for header tags
const mdxComponents = {
  h1: ({ children }: { children: ReactNode }) => <h1 className="text-2xl font-bold text-white mt-10 mb-6">{children}</h1>,
  h2: ({ children }: { children: ReactNode }) => <h2 className="text-xl font-bold text-white mt-8 mb-4">{children}</h2>,
  h3: ({ children }: { children: ReactNode }) => <h3 className="text-lg font-semibold text-white mt-6 mb-3">{children}</h3>,
  h4: ({ children }: { children: ReactNode }) => <h4 className="text-base font-semibold text-white mt-5 mb-2">{children}</h4>,
  h5: ({ children }: { children: ReactNode }) => <h5 className="text-sm font-medium text-white mt-4 mb-2">{children}</h5>,
  h6: ({ children }: { children: ReactNode }) => <h6 className="text-xs font-medium text-white mt-4 mb-2">{children}</h6>,
  p: ({ children }: { children: ReactNode }) => <p className="text-base text-gray-300 my-4">{children}</p>,
  ul: ({ children }: { children: ReactNode }) => <ul className="list-disc pl-6 my-4 text-gray-300">{children}</ul>,
  ol: ({ children }: { children: ReactNode }) => <ol className="list-decimal pl-6 my-4 text-gray-300">{children}</ol>,
  li: ({ children }: { children: ReactNode }) => <li className="my-2">{children}</li>,
  // Add more components as needed
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  
  try {
    // Read the MDX file to get frontmatter
    const filePath = path.join(process.cwd(), 'content', `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data: frontMatter, content } = matter(fileContent)
    
    return (
      <div className="min-h-screen bg-black text-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors duration-200 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span className="relative">
              Go back
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
          <MDXLayout frontMatter={frontMatter}>
            <ClientMarkdown>
              {/* Direct server rendering of MDX with rehype-pretty-code */}
              <MDXRemote 
                source={content} 
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]]
                  }
                }}
              />
            </ClientMarkdown>
          </MDXLayout>
        </div>
      </div>
    )
  } catch (e) {
    console.error(e)
    notFound()
  }
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export const dynamicParams = false

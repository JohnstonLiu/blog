'use client'

import type { MDXComponents } from 'mdx/types'
import { useMDXComponents as useBaseMDXComponents } from '@mdx-js/react'
import { ReactNode } from 'react'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const baseComponents = useBaseMDXComponents(components)
  
  return {
    ...baseComponents,
    h1: ({ children }: { children: ReactNode }) => (
      <h1 className="text-2xl font-bold text-white mt-10 mb-6">{children}</h1>
    ),
    h2: ({ children }: { children: ReactNode }) => (
      <h2 className="text-xl font-bold text-white mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children: ReactNode }) => (
      <h3 className="text-lg font-semibold text-white mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }: { children: ReactNode }) => (
      <h4 className="text-base font-semibold text-white mt-5 mb-2">{children}</h4>
    ),
    h5: ({ children }: { children: ReactNode }) => (
      <h5 className="text-sm font-medium text-white mt-4 mb-2">{children}</h5>
    ),
    h6: ({ children }: { children: ReactNode }) => (
      <h6 className="text-xs font-medium text-white mt-4 mb-2">{children}</h6>
    ),
    p: ({ children }: { children: ReactNode }) => (
      <p className="text-base text-gray-300 my-4">{children}</p>
    ),
    a: ({ href, children }: { href?: string, children: ReactNode }) => (
      <a href={href} className="text-blue-400 hover:underline">{children}</a>
    ),
    strong: ({ children }: { children: ReactNode }) => (
      <strong className="text-white">{children}</strong>
    ),
    ul: ({ children }: { children: ReactNode }) => (
      <ul className="list-disc pl-6 my-4 text-gray-300">{children}</ul>
    ),
    ol: ({ children }: { children: ReactNode }) => (
      <ol className="list-decimal pl-6 my-4 text-gray-300">{children}</ol>
    ),
    li: ({ children }: { children: ReactNode }) => (
      <li className="my-2">{children}</li>
    ),
    // We don't need to define code/pre here as rehype-pretty-code handles them
  }
}
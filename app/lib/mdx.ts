import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content')

/* Function which uses file system to collect all *.mdx files from the content directory */
export function getAllPosts() {
  const files = fs.readdirSync(postsDirectory)
  
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(postsDirectory, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data: frontMatter } = matter(fileContent)
      
      return {
        slug: file.replace(/\.mdx$/, ''),
        frontMatter,
      }
    })
    .sort((post1, post2) => {
      // Sort by date if you have date in frontmatter
      const date1 = post1.frontMatter.date ?? ''
      const date2 = post2.frontMatter.date ?? ''
      return date1 > date2 ? -1 : 1
    })

  return posts
} 

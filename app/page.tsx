import Link from "next/link";
import { getAllPosts } from './lib/mdx';

// Helper function to format dates consistently
function formatDate(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <header className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-3 border-b border-gray-800 gap-4 sm:gap-6">
            <h1 className="text-lg font-semibold text-white">johnston&apos;s blog</h1>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link 
                href="https://johnstonliu.me" 
                target="_blank"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200 relative group"
              >
                johnstonliu.me
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="mailto:johnstonliu2004@gmail.com"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200 relative group"
              >
                email
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="https://github.com/johnstonliu" 
                target="_blank"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200 relative group"
              >
                github
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="https://linkedin.com/in/johnstonliu" 
                target="_blank"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200 relative group"
              >
                linkedin
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </header>

        <p className="text-gray-300 mb-8 px-3">
          Chances are, you found this place through my other <a href="https://johnstonliu.me" target="_blank" className="text-white hover:text-gray-400 transition-colors duration-200">website</a>. 
          This is my blog where I write about technical topics primarily in software engineering, and occasionally other things that interest me. Feel free to reach out with the links above if you&apos;d like to chat.
        </p>
        
        <div className="space-y-2">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link 
                href={`/${post.slug}`}
                className="flex items-center justify-between py-2 px-3 hover:bg-gray-900 rounded-lg transition-colors duration-200"
              >
                <h2 className="text-base font-medium text-white relative group-hover:text-white">
                  {post.frontMatter.title || post.slug}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                </h2>
                {post.frontMatter.date && (
                  <span className="text-xs text-gray-400">
                    {formatDate(post.frontMatter.date)}
                  </span>
                )}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

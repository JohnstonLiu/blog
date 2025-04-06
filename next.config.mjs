import createMDX from '@next/mdx'

const withMDX = createMDX({
    /* maybe useless because of non-remote rendering */
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

export default withMDX(nextConfig)

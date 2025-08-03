import createMDX from '@next/mdx'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}
 
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
        ['remark-gfm', { }], 
        ['remark-toc', { heading: 'The Table' }],
    ],
    rehypePlugins: [
        ['rehype-slug', { }],
        ['rehype-autolink-headings', { behavior: 'append', properties: { className: ['anchor'] } }],
    ],
  },
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)

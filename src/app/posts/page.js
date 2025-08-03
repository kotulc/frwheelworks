import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';

// Helper to recursively get all .md files under a directory
function getAllMarkdownFiles(dir, base = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const relPath = path.join(base, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(filePath, relPath));
    } else if (file.endsWith('.md')) {
      results.push(relPath);
    }
  });
  return results.reverse(); // Reverse to show latest posts first
}

export default function PostsIndex() {
  const postsDir = path.join(process.cwd(), 'src/pages/posts');
  const files = getAllMarkdownFiles(postsDir);

  // Read and parse all markdown files
  const posts = files.map(file => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: meta, content: mdContent } = matter(content);
    const html = marked(mdContent);
    return { file, html, meta };
  });

  // Sort by date (descending), fallback to filename if no date
  posts.sort((a, b) => {
    if (a.meta?.date && b.meta?.date) {
      return new Date(b.meta.date) - new Date(a.meta.date);
    }
    if (a.meta?.date) return -1;
    if (b.meta?.date) return 1;
    return b.file.localeCompare(a.file);
  });

  return (
    <div>
      <h1>All Posts</h1>
      {posts.map(post => (
        <div key={post.file} style={{ marginBottom: 40 }}>
          <h2>{post.meta?.title || post.file}</h2>
          {post.meta?.date && <div>
            <em>
              {typeof post.meta.date === 'string' ? post.meta.date : post.meta.date?.toISOString?.().split('T')[0] || String(post.meta.date)}
            </em>
          </div>}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      ))}
    </div>
  );
}

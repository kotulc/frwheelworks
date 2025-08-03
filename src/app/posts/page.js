import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

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
  return results;
}

export default function PostsIndex() {
  const postsDir = path.join(process.cwd(), 'src/pages/posts');
  const files = getAllMarkdownFiles(postsDir);

  // Read and parse all markdown files
  const posts = files.map(file => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const html = marked(content);
    return { file, html };
  });

  return (
    <div>
      <h1>All Posts</h1>
      {posts.map(post => (
        <div key={post.file} style={{ marginBottom: 40 }}>
          <h2>{post.file}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      ))}
    </div>
  );
}

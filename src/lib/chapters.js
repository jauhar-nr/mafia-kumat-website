import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Membaca daftar bab dari folder (chapters) secara statis di server.
 * Mengembalikan array { slug, title, description } yang sudah diurutkan berdasarkan slug.
 */
export function getChapters() {
  const chaptersDir = path.join(process.cwd(), 'src/app/materi/(chapters)');
  if (!fs.existsSync(chaptersDir)) return [];

  const entries = fs.readdirSync(chaptersDir, { withFileTypes: true });

  const chapters = entries
    .filter(entry => entry.isDirectory())
    .map(entry => {
      const slug = entry.name;
      const filePath = path.join(chaptersDir, slug, 'page.mdx');
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        return {
          slug,
          title: data.title || slug,
          description: data.description || '',
        };
      }
      return null;
    })
    .filter(Boolean);

  // Mengurutkan berdasarkan nama folder (slug) agar urut (01, 02, dst)
  return chapters.sort((a, b) => a.slug.localeCompare(b.slug));
}

import Link from 'next/link';
import { MiniNavbar } from '../../../components/MiniNavbar';
import { ChapterNavigation } from '../../../components/ChapterNavigation';
import { ReadingProgress } from '../../../components/ReadingProgress';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Fungsi untuk membaca daftar bab dari CMS secara statis
function getChapters() {
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
        return { slug, title: data.title || slug };
      }
      return null;
    })
    .filter(Boolean);
  return chapters.sort((a, b) => a.slug.localeCompare(b.slug));
}

export default function MateriLayout({ children }) {
  const chapters = getChapters();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ReadingProgress />
      <MiniNavbar backHref="/materi" backText="Kembali" />
      
      <main className="container markdown-body" style={{ padding: '4rem 2rem', maxWidth: '800px', flex: 1 }}>
        {children}
        
        {/* Navigasi Bab Sebelumnya/Selanjutnya */}
        <ChapterNavigation chapters={chapters} />
      </main>
      
      <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--border)', textAlign: 'center', marginTop: 'auto' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--gray-medium)' }}>
          &copy; {new Date().getFullYear()} Tim Mafia Kumat.
        </p>
      </footer>
    </div>
  );
}

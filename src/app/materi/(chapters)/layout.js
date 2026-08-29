import { MiniNavbar } from '../../../components/MiniNavbar';
import { ChapterNavigation } from '../../../components/ChapterNavigation';
import { ReadingProgress } from '../../../components/ReadingProgress';
import { TableOfContents } from '../../../components/TableOfContents';
import { ScrollToTop } from '../../../components/ScrollToTop';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { getChapters } from '../../../lib/chapters';

export default function MateriLayout({ children }) {
  const chapters = getChapters();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ReadingProgress />
      <MiniNavbar backHref="/materi" backText="Kembali" />
      
      <main className="container markdown-body" style={{ padding: '4rem 2rem', maxWidth: '800px', flex: 1 }}>
        {/* Breadcrumbs + waktu baca */}
        <Breadcrumbs chapters={chapters} />

        {/* Table of Contents */}
        <TableOfContents />

        {children}
        
        {/* Navigasi Bab Sebelumnya/Selanjutnya */}
        <ChapterNavigation chapters={chapters} />
      </main>

      {/* Tombol kembali ke atas */}
      <ScrollToTop />
      
      <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--border)', textAlign: 'center', marginTop: 'auto' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--gray-medium)' }}>
          &copy; {new Date().getFullYear()} Tim Mafia Kumat.
        </p>
      </footer>
    </div>
  );
}

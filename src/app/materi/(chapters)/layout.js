import { MiniNavbar } from '../../../components/MiniNavbar';
import { ChapterNavigation } from '../../../components/ChapterNavigation';
import { ReadingProgress } from '../../../components/ReadingProgress';
import { TableOfContents } from '../../../components/TableOfContents';
import { ScrollToTop } from '../../../components/ScrollToTop';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { Footer } from '../../../components/Footer';
import { getChapters } from '../../../lib/chapters';

export default function MateriLayout({ children }) {
  const chapters = getChapters();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ReadingProgress />
      <MiniNavbar backHref="/materi" backText="Kembali" />
      
      <div className="materi-grid-layout" style={{ flex: 1, padding: '4rem 2rem' }}>
        <aside className="toc-sidebar">
          <TableOfContents />
        </aside>
        
        <main className="markdown-body" style={{ minWidth: 0 }}>
          <Breadcrumbs chapters={chapters} />
          {children}
          <ChapterNavigation chapters={chapters} />
        </main>
      </div>

      <ScrollToTop />
      <Footer />
    </div>
  );
}

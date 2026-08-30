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
      
      <main className="container markdown-body" style={{ padding: '4rem 2rem', maxWidth: '800px', flex: 1 }}>
        <Breadcrumbs chapters={chapters} />
        <TableOfContents />
        {children}
        <ChapterNavigation chapters={chapters} />
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}

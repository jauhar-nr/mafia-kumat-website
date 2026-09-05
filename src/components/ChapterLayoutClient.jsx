'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MiniNavbar } from './MiniNavbar';
import { ChapterSidebar } from './ChapterSidebar';
import { TableOfContents } from './TableOfContents';
import { Breadcrumbs } from './Breadcrumbs';
import { ChapterNavigation } from './ChapterNavigation';
import { ReadingProgress } from './ReadingProgress';
import { ScrollToTop } from './ScrollToTop';
import { Footer } from './Footer';
import { LatexCopyOverlay } from './LatexCopyOverlay';

export function ChapterLayoutClient({ chapters = [], topic, currentChapter, children }) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const pathname = usePathname();

  const backHref = topic ? `/materi/${topic.slug}` : '/materi';
  const backText = topic ? 'Overview Topik' : 'Silabus';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ReadingProgress />

      <MiniNavbar 
        backHref={backHref} 
        backText={backText} 
        onToggleChapters={() => setIsMobileDrawerOpen(true)} 
      />

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isMobileDrawerOpen && (
        <div 
          className="chapter-drawer-backdrop animate-fade-in"
          onClick={() => setIsMobileDrawerOpen(false)}
        >
          <div 
            className="chapter-drawer-content animate-slide-right"
            onClick={(e) => e.stopPropagation()}
          >
            <ChapterSidebar 
              chapters={chapters} 
              topic={topic}
              isMobile={true} 
              onClose={() => setIsMobileDrawerOpen(false)} 
            />
          </div>
        </div>
      )}

      {/* 3-Column Grid Container */}
      <div className="container materi-grid-container" style={{ flex: 1 }}>
        <div className="materi-grid-layout">
          {/* Kolom 1: Navigasi Bab (Kiri) */}
          <aside className="chapter-sidebar-desktop-col">
            <div className="sticky-sidebar-inner">
              <ChapterSidebar chapters={chapters} topic={topic} />
            </div>
          </aside>

          {/* Kolom 2: Konten Materi (Tengah) */}
          <main className="markdown-body" style={{ minWidth: 0, position: 'relative' }}>
            <Breadcrumbs chapters={chapters} topic={topic} chapter={currentChapter} />
            <LatexCopyOverlay key={pathname} />
            {children}
            <ChapterNavigation chapters={chapters} topic={topic} />
          </main>

          {/* Kolom 3: Table of Contents (Kanan) */}
          <aside className="toc-sidebar-desktop-col">
            <div className="sticky-sidebar-inner">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>

      <ScrollToTop />
      <Footer />
    </div>
  );
}

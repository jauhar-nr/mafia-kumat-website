'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ChapterSidebar({ chapters = [], isMobile = false, onClose }) {
  const pathname = usePathname();
  const currentSlug = pathname.split('/').filter(Boolean).pop();

  return (
    <nav 
      className={`chapter-sidebar ${isMobile ? 'chapter-sidebar-mobile' : 'chapter-sidebar-desktop'}`}
      aria-label="Navigasi Bab"
    >
      {isMobile && (
        <div className="chapter-sidebar-mobile-header">
          <div style={{ fontWeight: '700', fontSize: '1rem' }}>Silabus Materi</div>
          <button 
            onClick={onClose}
            className="chapter-sidebar-close-btn"
            aria-label="Tutup daftar bab"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      <div className="chapter-sidebar-header">
        <span className="chapter-sidebar-title">Daftar Bab</span>
        <Link href="/materi" className="chapter-sidebar-all-link" onClick={isMobile ? onClose : undefined}>
          Semua Materi &rarr;
        </Link>
      </div>

      <div className="chapter-sidebar-list">
        {chapters.map((chapter, index) => {
          const isActive = chapter.slug === currentSlug;
          const chapterNumber = String(index + 1).padStart(2, '0');

          return (
            <Link
              key={chapter.slug}
              href={`/materi/${chapter.slug}`}
              onClick={isMobile ? onClose : undefined}
              className={`chapter-sidebar-item ${isActive ? 'chapter-sidebar-item-active' : ''}`}
            >
              <div className="chapter-sidebar-item-num">BAB {chapterNumber}</div>
              <div className="chapter-sidebar-item-title">{chapter.title}</div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

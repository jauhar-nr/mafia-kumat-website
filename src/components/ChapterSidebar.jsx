'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ChapterSidebar({ chapters = [], isMobile = false, onClose }) {
  const pathname = usePathname();
  const currentSlug = pathname.split('/').filter(Boolean).pop();

  // Kelompokkan bab berdasarkan topik utama (track)
  const groupedTracks = chapters.reduce((acc, chapter) => {
    const trackName = chapter.track || 'Fisika & Mekanika Kuantum';
    if (!acc[trackName]) {
      acc[trackName] = [];
    }
    acc[trackName].push(chapter);
    return acc;
  }, {});

  return (
    <nav
      className={`chapter-sidebar ${isMobile ? 'chapter-sidebar-mobile' : 'chapter-sidebar-desktop'}`}
      aria-label="Navigasi Materi"
    >
      {isMobile && (
        <div className="chapter-sidebar-mobile-header">
          <div style={{ fontWeight: '700', fontSize: '1rem' }}>Silabus Materi</div>
          <button
            onClick={onClose}
            className="chapter-sidebar-close-btn"
            aria-label="Tutup daftar materi"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      <div className="chapter-sidebar-header">
        <span className="chapter-sidebar-title">Lintasan Belajar</span>
        <Link href="/materi" className="chapter-sidebar-all-link" onClick={isMobile ? onClose : undefined}>
          Semua Materi &rarr;
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
        {Object.entries(groupedTracks).map(([trackName, trackChapters]) => (
          <div key={trackName}>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--gray-medium)',
                marginBottom: '0.45rem',
                paddingLeft: '0.5rem',
              }}
            >
              {trackName}
            </div>

            <div className="chapter-sidebar-list">
              {trackChapters.map((chapter) => {
                const isActive = chapter.slug === currentSlug;
                return (
                  <Link
                    key={chapter.slug}
                    href={`/materi/${chapter.slug}`}
                    onClick={isMobile ? onClose : undefined}
                    className={`chapter-sidebar-item ${isActive ? 'chapter-sidebar-item-active' : ''}`}
                  >
                    <div className="chapter-sidebar-item-title">{chapter.title}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

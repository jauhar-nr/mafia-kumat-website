'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ChapterSidebar({ chapters = [], topic, isMobile = false, onClose }) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const currentSlug = segments[segments.length - 1];

  // Mode 1: Jika berada dalam konteks Topik spesifik (2-level architecture)
  if (topic) {
    return (
      <nav
        className={`chapter-sidebar ${isMobile ? 'chapter-sidebar-mobile' : 'chapter-sidebar-desktop'}`}
        aria-label="Navigasi Bab Topik"
      >
        {isMobile && (
          <div className="chapter-sidebar-mobile-header">
            <div style={{ fontWeight: '700', fontSize: '1rem' }}>Silabus Bab</div>
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

        <div className="chapter-sidebar-header" style={{ marginBottom: '0.5rem' }}>
          <Link
            href={`/materi/${topic.slug}`}
            className="chapter-sidebar-all-link"
            onClick={isMobile ? onClose : undefined}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            &larr; Overview Topik
          </Link>
        </div>

        <div style={{ padding: '0 0.5rem', marginBottom: '1.25rem' }}>
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--gray-medium)',
              marginBottom: '0.35rem',
            }}
          >
            {topic.track}
          </div>
          <div
            style={{
              fontSize: '1.15rem',
              fontWeight: '800',
              color: 'var(--foreground)',
              lineHeight: '1.3',
            }}
          >
            {topic.title}
          </div>
        </div>

        <div
          style={{
            fontSize: '0.72rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--gray-medium)',
            marginBottom: '0.5rem',
            paddingLeft: '0.5rem',
          }}
        >
          Daftar Bab ({chapters.length})
        </div>

        <div className="chapter-sidebar-list">
          {chapters.map((ch) => {
            const isActive = ch.slug === currentSlug;
            return (
              <Link
                key={ch.slug}
                href={`/materi/${topic.slug}/${ch.slug}`}
                onClick={isMobile ? onClose : undefined}
                className={`chapter-sidebar-item ${isActive ? 'chapter-sidebar-item-active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.6rem',
                  padding: '0.65rem 0.85rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    fontFamily: 'monospace',
                    color: isActive ? 'var(--background)' : 'var(--gray-medium)',
                    flexShrink: 0,
                  }}
                >
                  {ch.chapterNumber < 10 ? `0${ch.chapterNumber}` : ch.chapterNumber}
                </span>
                <span className="chapter-sidebar-item-title" style={{ fontSize: '0.9rem' }}>
                  {ch.title}
                </span>
              </Link>
            );
          })}
        </div>

        <div style={{ marginTop: '2rem', paddingLeft: '0.5rem' }}>
          <Link
            href="/materi"
            onClick={isMobile ? onClose : undefined}
            style={{
              fontSize: '0.82rem',
              color: 'var(--gray-medium)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            &larr; Lihat Semua Lintasan Belajar
          </Link>
        </div>
      </nav>
    );
  }

  // Mode 2: Legacy fallback jika topic tidak disertakan
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

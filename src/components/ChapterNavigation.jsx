'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ChapterNavigation({ chapters = [], topic }) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const currentSlug = segments[segments.length - 1];

  const currentIndex = chapters.findIndex((c) => c.slug === currentSlug);

  if (currentIndex === -1) return null;

  const currentChapter = chapters[currentIndex];
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const topicSlug = topic?.slug || (segments.length >= 2 ? segments[segments.length - 2] : '');

  const getChapterUrl = (chapter) => {
    if (topicSlug && topicSlug !== 'materi') {
      return `/materi/${topicSlug}/${chapter.slug}`;
    }
    return `/materi/${chapter.slug}`;
  };

  return (
    <div
      style={{
        marginTop: '5rem',
        paddingTop: '3rem',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {prevChapter ? (
          <Link
            href={getChapterUrl(prevChapter)}
            style={{ flex: 1, textDecoration: 'none', minWidth: '240px' }}
          >
            <div
              className="glass-card"
              style={{
                padding: '1.4rem',
                height: '100%',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: 'var(--gray-medium)',
                  marginBottom: '0.35rem',
                }}
              >
                &larr; Bab {prevChapter.chapterNumber || currentIndex}
              </div>
              <div
                style={{
                  fontWeight: '700',
                  fontSize: '1.08rem',
                  color: 'var(--foreground)',
                }}
              >
                {prevChapter.title}
              </div>
            </div>
          </Link>
        ) : (
          <div style={{ flex: 1, minWidth: '240px' }} />
        )}

        {nextChapter ? (
          <Link
            href={getChapterUrl(nextChapter)}
            style={{
              flex: 1,
              textDecoration: 'none',
              textAlign: 'right',
              minWidth: '240px',
            }}
          >
            <div
              className="glass-card"
              style={{
                padding: '1.4rem',
                height: '100%',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: 'var(--gray-medium)',
                  marginBottom: '0.35rem',
                }}
              >
                Bab {nextChapter.chapterNumber || currentIndex + 2} &rarr;
              </div>
              <div
                style={{
                  fontWeight: '700',
                  fontSize: '1.08rem',
                  color: 'var(--foreground)',
                }}
              >
                {nextChapter.title}
              </div>
            </div>
          </Link>
        ) : (
          <div style={{ flex: 1, minWidth: '240px' }} />
        )}
      </div>

      {topic && (
        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          <Link
            href={`/materi/${topic.slug}`}
            style={{
              fontSize: '0.88rem',
              fontWeight: '600',
              color: 'var(--gray-medium)',
              textDecoration: 'none',
            }}
          >
            &uarr; Kembali ke Overview {topic.title}
          </Link>
        </div>
      )}
    </div>
  );
}

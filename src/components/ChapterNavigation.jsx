'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ChapterNavigation({ chapters }) {
  const pathname = usePathname();
  // Mengambil bagian terakhir dari URL (misal: "01-statistika")
  const currentSlug = pathname.split('/').filter(Boolean).pop();

  const currentIndex = chapters.findIndex(c => c.slug === currentSlug);

  // Jika tidak ditemukan, jangan render apa-apa
  if (currentIndex === -1) return null;

  const currentChapter = chapters[currentIndex];
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <>
      <div style={{ 
        marginTop: '5rem', 
        paddingTop: '3rem', 
        borderTop: '1px solid var(--border)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        gap: '1rem', 
        flexWrap: 'wrap' 
      }}>
      {prevChapter ? (
        <Link href={`/materi/${prevChapter.slug}`} style={{ flex: 1, textDecoration: 'none', minWidth: '250px' }}>
          <div className="glass-card" style={{ padding: '1.5rem', height: '100%', transition: 'all 0.2s ease' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--gray-medium)', marginBottom: '0.5rem' }}>&larr; Bab Sebelumnya</div>
            <div style={{ fontWeight: '600', fontSize: '1.15rem', color: 'var(--foreground)' }}>{prevChapter.title}</div>
          </div>
        </Link>
      ) : <div style={{ flex: 1, minWidth: '250px' }} />}

      {nextChapter ? (
        <Link href={`/materi/${nextChapter.slug}`} style={{ flex: 1, textDecoration: 'none', textAlign: 'right', minWidth: '250px' }}>
          <div className="glass-card" style={{ padding: '1.5rem', height: '100%', transition: 'all 0.2s ease' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--gray-medium)', marginBottom: '0.5rem' }}>Bab Selanjutnya &rarr;</div>
            <div style={{ fontWeight: '600', fontSize: '1.15rem', color: 'var(--foreground)' }}>{nextChapter.title}</div>
          </div>
        </Link>
      ) : <div style={{ flex: 1, minWidth: '250px' }} />}
      </div>
    </>
  );
}

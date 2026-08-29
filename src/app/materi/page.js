import Link from 'next/link';
import { MiniNavbar } from '../../components/MiniNavbar';
import { getChapters } from '../../lib/chapters';

export const metadata = {
  title: 'Materi | Mafia Kumat',
};

export default function MateriIndex() {
  const chapters = getChapters();

  return (
    <>
      <MiniNavbar backHref="/" backText="Kembali" />
      <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
        <h1 className="animate-fade-up" style={{ fontSize: '3rem', marginBottom: '1rem', borderBottom: 'none' }}>Silabus Materi</h1>
        <p className="animate-fade-up delay-1" style={{ fontSize: '1.1rem', marginBottom: '3rem' }}>
          Pilih bab yang ingin kamu pelajari. Materi disusun berurutan dari dasar matematika hingga mekanika kuantum tingkat lanjut.
        </p>

        <div className="animate-fade-up delay-2" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {chapters.length === 0 ? (
            <p style={{ color: 'var(--gray-medium)' }}>Belum ada materi yang diterbitkan. Tim sedang menyusunnya!</p>
          ) : (
            chapters.map((chapter, idx) => (
              <Link key={idx} href={`/materi/${chapter.slug}`} style={{ display: 'block' }}>
                <div className="glass-card" style={{ padding: '1.5rem 2rem' }}>
                  <div style={{ color: 'var(--gray-medium)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    BAB {idx + 1}
                  </div>
                  <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{chapter.title}</h2>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '1rem' }}>{chapter.description}</p>
                </div>
              </Link>
            ))
          )}

        </div>
      </div>
    </>
  );
}

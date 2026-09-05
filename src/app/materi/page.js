import { Suspense } from 'react';
import { MiniNavbar } from '../../components/MiniNavbar';
import { getChapters, getTracksWithChapters } from '../../lib/chapters';
import MateriList from './MateriList';

export const metadata = {
  title: 'Silabus Materi | Mafia Kumat',
  description: 'Daftar topik pembelajaran komprehensif dari komunitas Mafia Kumat terstruktur dalam 4 lintasan belajar.',
};

export default function MateriIndex() {
  const chapters = getChapters();
  const tracks = getTracksWithChapters();

  return (
    <>
      <MiniNavbar backHref="/" backText="Beranda" />
      <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '860px' }}>
        <h1
          className="animate-fade-up"
          style={{ fontSize: '2.6rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.75rem', borderBottom: 'none' }}
        >
          Silabus Materi
        </h1>
        <p
          className="animate-fade-up delay-1"
          style={{ fontSize: '1.05rem', color: 'var(--gray-medium)', marginBottom: '2.5rem', lineHeight: '1.6' }}
        >
          Eksplorasi topik pembelajaran berdasarkan 4 lintasan utama Mafia Kumat, mulai dari fondasi matematika analitis hingga aplikasi kuantum material.
        </p>

        <Suspense fallback={<div style={{ padding: '2rem 0', color: 'var(--gray-medium)' }}>Memuat lintasan belajar...</div>}>
          <MateriList chapters={chapters} tracks={tracks} />
        </Suspense>
      </div>
    </>
  );
}

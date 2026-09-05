import { MiniNavbar } from '../../components/MiniNavbar';
import { getTopics, getTracksWithTopics } from '../../lib/topics';
import MateriList from './MateriList';

export const metadata = {
  title: 'Silabus Materi | Mafia Kumat',
  description: 'Daftar topik pembelajaran komprehensif dari komunitas Mafia Kumat terstruktur dalam 4 lintasan belajar.',
};

export default async function MateriIndex({ searchParams }) {
  const resolvedParams = (await searchParams) || {};
  const initialTrack = resolvedParams.track || 'all';
  const initialQuery = resolvedParams.q || '';

  const topics = getTopics();
  const tracks = getTracksWithTopics();

  return (
    <>
      <MiniNavbar backHref="/" backText="Beranda" />
      <div className="container materi-page-container" style={{ padding: '3rem 1.5rem 4rem', maxWidth: '1040px' }}>
        <h1
          className="animate-fade-up"
          style={{ fontSize: '2.4rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.5rem', borderBottom: 'none' }}
        >
          Silabus Materi
        </h1>
        <p
          className="animate-fade-up delay-1"
          style={{ fontSize: '1rem', color: 'var(--gray-medium)', marginBottom: '1.75rem', lineHeight: '1.6' }}
        >
          Eksplorasi topik pembelajaran berdasarkan 4 lintasan utama Mafia Kumat, mulai dari fondasi matematika analitis hingga aplikasi kuantum material.
        </p>

        <MateriList
          topics={topics}
          tracks={tracks}
          initialTrack={initialTrack}
          initialQuery={initialQuery}
        />
      </div>
    </>
  );
}

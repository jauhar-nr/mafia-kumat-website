import { MiniNavbar } from '../../components/MiniNavbar';
import { getChapters } from '../../lib/chapters';
import MateriList from './MateriList';

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
        <p className="animate-fade-up delay-1" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          Pilih bab yang ingin kamu pelajari. Materi disusun berurutan dari dasar matematika hingga mekanika kuantum tingkat lanjut.
        </p>

        <MateriList chapters={chapters} />
      </div>
    </>
  );
}

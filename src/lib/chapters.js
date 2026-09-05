import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * 4 Lintasan Belajar Mafia Kumat
 */
export const TRACKS = [
  {
    id: 'matematika-esensial-fisika',
    name: 'Matematika Esensial Fisika',
    description: 'Fondasi aljabar linear, kalkulus variasi, ruang Hilbert, dan metode analitis esensial untuk memodelkan hukum-hukum fisika modern.',
    badge: 'Matematika',
    icon: 'math',
  },
  {
    id: 'fisika-mekanika-kuantum',
    name: 'Fisika & Mekanika Kuantum',
    description: 'Eksplorasi mendalam fenomena mikroskopik, formalisme bra-ket Dirac, osilator harmonik, atom hidrogen, hingga teori perturbasi.',
    badge: 'Kuantum',
    icon: 'atom',
  },
  {
    id: 'mekanika-klasik',
    name: 'Mekanika Klasik',
    description: 'Formalisasi hukum gerak mulai dari prinsip aksi minimum, mekanika Lagrangian, formalisme Hamiltonian, hingga persamaan kanonik.',
    badge: 'Klasik',
    icon: 'classical',
  },
  {
    id: 'kuantum-material',
    name: 'Kuantum Material',
    description: 'Penerapan prinsip kuantum pada fisika zat padat, struktur kristal, teori pita energi, semikonduktor, hingga fenomena material modern.',
    badge: 'Material',
    icon: 'material',
  },
];

/**
 * Membaca seluruh topik materi dari direktori (chapters) secara statis di server.
 * Mengembalikan array topik materi yang terurut rapi berdasarkan Lintasan Belajar dan Nomor Urut.
 */
export function getChapters() {
  const chaptersDir = path.join(process.cwd(), 'src/app/materi/(chapters)');
  if (!fs.existsSync(chaptersDir)) return [];

  const entries = fs.readdirSync(chaptersDir, { withFileTypes: true });

  const chapters = entries
    .filter(entry => entry.isDirectory())
    .map(entry => {
      const slug = entry.name;
      const filePath = path.join(chaptersDir, slug, 'page.mdx');
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        return {
          slug,
          title: data.title || slug,
          track: data.track || 'Fisika & Mekanika Kuantum',
          order: typeof data.order === 'number' ? data.order : 99,
          description: data.description || '',
        };
      }
      return null;
    })
    .filter(Boolean);

  const trackOrderMap = TRACKS.reduce((acc, t, idx) => {
    acc[t.name] = idx;
    return acc;
  }, {});

  return chapters.sort((a, b) => {
    const trackA = trackOrderMap[a.track] ?? 99;
    const trackB = trackOrderMap[b.track] ?? 99;
    if (trackA !== trackB) return trackA - trackB;
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });
}

/**
 * Mengelompokkan topik materi ke dalam masing-masing Lintasan Belajar (Track).
 */
export function getTracksWithChapters() {
  const allChapters = getChapters();
  return TRACKS.map(track => ({
    ...track,
    chapters: allChapters.filter(c => c.track === track.name),
  }));
}

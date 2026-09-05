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

const TOPICS_DIR = path.join(process.cwd(), 'src/content/topics');
const CHAPTERS_DIR = path.join(process.cwd(), 'src/content/chapters');

/**
 * Membaca seluruh bab untuk topik tertentu dari direktori src/content/chapters/[topicSlug]
 */
export function getChaptersForTopic(topicSlug) {
  const dir = path.join(CHAPTERS_DIR, topicSlug);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

  const chapters = files.map(filename => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    const slugWithoutExt = filename.replace(/\.(mdx|md)$/, '');

    return {
      slug: data.slug || slugWithoutExt,
      title: data.title || slugWithoutExt,
      topic: data.topic || topicSlug,
      chapterNumber: typeof data.chapterNumber === 'number' ? data.chapterNumber : 1,
      description: data.description || '',
    };
  });

  return chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
}

/**
 * Membaca seluruh topik dari src/content/topics/*.json
 */
export function getTopics() {
  if (!fs.existsSync(TOPICS_DIR)) return [];

  const files = fs.readdirSync(TOPICS_DIR).filter(f => f.endsWith('.json'));

  const topics = files.map(filename => {
    const filePath = path.join(TOPICS_DIR, filename);
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(raw);
      const slug = data.slug || filename.replace(/\.json$/, '');
      const chapters = getChaptersForTopic(slug);

      return {
        ...data,
        slug,
        chapters,
        chapterCount: chapters.length,
      };
    } catch (err) {
      console.error(`Error reading topic file ${filename}:`, err);
      return null;
    }
  }).filter(Boolean);

  const trackOrderMap = TRACKS.reduce((acc, t, idx) => {
    acc[t.name] = idx;
    return acc;
  }, {});

  return topics.sort((a, b) => {
    const trackA = trackOrderMap[a.track] ?? 99;
    const trackB = trackOrderMap[b.track] ?? 99;
    if (trackA !== trackB) return trackA - trackB;
    if (a.order !== b.order) return (a.order ?? 99) - (b.order ?? 99);
    return a.title.localeCompare(b.title);
  });
}

/**
 * Mengambil satu topik berdasarkan slug-nya
 */
export function getTopicBySlug(topicSlug) {
  const filePath = path.join(TOPICS_DIR, `${topicSlug}.json`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    const chapters = getChaptersForTopic(topicSlug);

    return {
      ...data,
      slug: data.slug || topicSlug,
      chapters,
      chapterCount: chapters.length,
    };
  } catch (err) {
    console.error(`Error reading topic ${topicSlug}:`, err);
    return null;
  }
}

/**
 * Mengambil satu bab beserta konten MDX-nya
 */
export function getChapter(topicSlug, chapterSlug) {
  const topic = getTopicBySlug(topicSlug);
  if (!topic) return null;

  const dir = path.join(CHAPTERS_DIR, topicSlug);
  if (!fs.existsSync(dir)) return null;

  // Cari file yang slug-nya cocok
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  for (const filename of files) {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const slugWithoutExt = filename.replace(/\.(mdx|md)$/, '');
    const currentSlug = data.slug || slugWithoutExt;

    if (currentSlug === chapterSlug) {
      return {
        topic,
        chapter: {
          slug: currentSlug,
          title: data.title || currentSlug,
          chapterNumber: typeof data.chapterNumber === 'number' ? data.chapterNumber : 1,
          description: data.description || '',
          content,
        },
      };
    }
  }

  return null;
}

/**
 * Mengelompokkan topik ke dalam masing-masing lintasan belajar
 */
export function getTracksWithTopics() {
  const allTopics = getTopics();
  return TRACKS.map(track => ({
    ...track,
    topics: allTopics.filter(t => t.track === track.name),
  }));
}

/**
 * Mendapatkan semua parameter rute untuk generateStaticParams pada halaman Overview
 */
export function getAllTopicParams() {
  const topics = getTopics();
  return topics.map(t => ({ topicSlug: t.slug }));
}

/**
 * Mendapatkan semua parameter rute untuk generateStaticParams pada halaman Bab
 */
export function getAllChapterParams() {
  const topics = getTopics();
  const params = [];
  for (const topic of topics) {
    for (const chapter of topic.chapters) {
      params.push({
        topicSlug: topic.slug,
        chapterSlug: chapter.slug,
      });
    }
  }
  return params;
}

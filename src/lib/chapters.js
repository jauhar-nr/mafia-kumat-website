import { TRACKS, getTopics, getTracksWithTopics, getTopicBySlug, getChaptersForTopic } from './topics';

export { TRACKS };

/**
 * Backward compatibility helper:
 * Mengembalikan array topik (yang sebelumnya disebut chapters di halaman silabus).
 */
export function getChapters() {
  const topics = getTopics();
  return topics.map(topic => ({
    slug: topic.slug,
    title: topic.title,
    track: topic.track,
    order: topic.order,
    description: topic.description,
    chapters: topic.chapters,
    chapterCount: topic.chapterCount,
  }));
}

/**
 * Backward compatibility helper:
 * Mengembalikan track yang berisikan topik-topik.
 */
export function getTracksWithChapters() {
  const tracks = getTracksWithTopics();
  return tracks.map(track => ({
    ...track,
    chapters: track.topics,
  }));
}

import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import { notFound } from 'next/navigation';
import { ChapterLayoutClient } from '../../../../components/ChapterLayoutClient';
import { YouTubePlayer } from '../../../../components/YouTubePlayer';
import { GDrivePDF } from '../../../../components/GDrivePDF';
import { PDFViewer } from '../../../../components/PDFViewer';
import { getChapter, getAllChapterParams } from '../../../../lib/topics';

export async function generateStaticParams() {
  return getAllChapterParams();
}

export async function generateMetadata({ params }) {
  const { topicSlug, chapterSlug } = await params;
  const result = getChapter(topicSlug, chapterSlug);
  if (!result) return { title: 'Materi Tidak Ditemukan | Mafia Kumat' };

  return {
    title: `${result.chapter.title} - ${result.topic.title} | Mafia Kumat`,
    description: result.chapter.description || `Pembahasan ${result.chapter.title} pada topik ${result.topic.title}`,
  };
}

export default async function ChapterPage({ params }) {
  const { topicSlug, chapterSlug } = await params;
  const result = getChapter(topicSlug, chapterSlug);

  if (!result) {
    notFound();
  }

  const { topic, chapter } = result;

  // Compile MDX on the server
  const { default: Content } = await evaluate(chapter.content, {
    ...runtime,
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeSlug],
  });

  return (
    <ChapterLayoutClient
      topic={topic}
      chapters={topic.chapters}
      currentChapter={chapter}
    >
      <Content components={{ YouTubePlayer, GDrivePDF, PDFViewer }} />
    </ChapterLayoutClient>
  );
}

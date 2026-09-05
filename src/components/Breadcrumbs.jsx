'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Breadcrumbs({ chapters = [], topic, chapter }) {
  const pathname = usePathname();

  // If topic and chapter are explicitly passed
  if (topic && chapter) {
    return (
      <nav className="breadcrumbs-wrapper" aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <span className="breadcrumb-sep">/</span>
        <Link href="/materi">Materi</Link>
        <span className="breadcrumb-sep">/</span>
        <Link href={`/materi/${topic.slug}`}>{topic.title}</Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{chapter.title}</span>
      </nav>
    );
  }

  // Fallback for legacy URL inspection
  const segments = pathname.split('/').filter(Boolean);
  const currentSlug = segments[segments.length - 1];
  const currentChapter = chapters.find((c) => c.slug === currentSlug);

  if (!currentChapter) return null;

  return (
    <nav className="breadcrumbs-wrapper" aria-label="Breadcrumb">
      <Link href="/">Beranda</Link>
      <span className="breadcrumb-sep">/</span>
      <Link href="/materi">Materi</Link>
      <span className="breadcrumb-sep">/</span>
      <span className="breadcrumb-current">{currentChapter.title}</span>
    </nav>
  );
}

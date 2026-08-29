'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Breadcrumbs({ chapters }) {
  const pathname = usePathname();
  const currentSlug = pathname.split('/').filter(Boolean).pop();
  const currentChapter = chapters.find(c => c.slug === currentSlug);

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

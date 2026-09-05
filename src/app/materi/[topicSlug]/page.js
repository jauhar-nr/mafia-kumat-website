import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MiniNavbar } from '../../../components/MiniNavbar';
import { Footer } from '../../../components/Footer';
import { getTopicBySlug, getAllTopicParams } from '../../../lib/topics';

export async function generateStaticParams() {
  return getAllTopicParams();
}

export async function generateMetadata({ params }) {
  const { topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);

  if (!topic) {
    return {
      title: 'Topik Tidak Ditemukan | Mafia Kumat',
    };
  }

  return {
    title: `${topic.title} - Overview Topik | Mafia Kumat`,
    description: topic.description,
  };
}

export default async function TopicOverviewPage({ params }) {
  const { topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);

  if (!topic) {
    notFound();
  }

  const chapters = topic.chapters || [];
  const firstChapter = chapters.length > 0 ? chapters[0] : null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MiniNavbar backHref="/materi" backText="Silabus Materi" />

      <main style={{ flex: 1, padding: '3.5rem 1.5rem 5rem' }}>
        <div className="container" style={{ maxWidth: '920px', margin: '0 auto' }}>
          
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="animate-fade-up"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: 'var(--gray-medium)',
              marginBottom: '1.75rem',
            }}
          >
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Beranda
            </Link>
            <span>/</span>
            <Link href="/materi" style={{ color: 'inherit', textDecoration: 'none' }}>
              Materi
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--foreground)', fontWeight: '600' }}>
              {topic.title}
            </span>
          </nav>

          {/* Topic Title & Meta Header */}
          <header className="animate-fade-up" style={{ marginBottom: '2.5rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  color: 'var(--foreground)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '999px',
                  background: 'color-mix(in srgb, var(--foreground) 7%, transparent)',
                  border: '1px solid var(--border)',
                }}
              >
                {topic.track}
              </span>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: 'var(--gray-medium)',
                }}
              >
                • {chapters.length} Bab Tersedia
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                fontWeight: '850',
                letterSpacing: '-0.03em',
                lineHeight: '1.15',
                marginBottom: '1rem',
                borderBottom: 'none',
              }}
            >
              {topic.title}
            </h1>

            <p
              style={{
                fontSize: '1.12rem',
                color: 'var(--gray-medium)',
                lineHeight: '1.7',
                maxWidth: '780px',
                marginBottom: '2rem',
              }}
            >
              {topic.description}
            </p>

            {firstChapter && (
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link
                  href={`/materi/${topic.slug}/${firstChapter.slug}`}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <span>Mulai Belajar: Bab 1</span>
                  <span>&rarr;</span>
                </Link>
                <a
                  href="#silabus-bab"
                  className="btn btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <span>Daftar Silabus Bab</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </a>
              </div>
            )}
          </header>

          {/* Cover Image Banner (Opsional jika admin menyertakan gambar) */}
          {topic.coverImage && topic.coverImage.trim() !== '' && (
            <div
              className="animate-fade-up delay-1"
              style={{
                marginBottom: '3.5rem',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                background: 'var(--gray-light)',
                aspectRatio: '16 / 8',
                position: 'relative',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={topic.coverImage}
                alt={`Ilustrasi sampul ${topic.title}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          )}

          {/* Academic Info Grid: Authors & References */}
          {((topic.references && topic.references.length > 0) || (topic.authors && topic.authors.length > 0)) && (
            <section
              className="animate-fade-up delay-1"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.25rem',
                marginBottom: '3.5rem',
              }}
            >
              {/* References Card */}
              {topic.references && topic.references.length > 0 && (
                <div
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    borderRadius: '14px',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--gray-medium)',
                      marginBottom: '0.65rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    <span>Buku Referensi Utama</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.15rem', fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--foreground)' }}>
                    {topic.references.map((ref, idx) => (
                      <li key={idx} style={{ marginBottom: '0.35rem' }}>{ref}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Authors Card */}
              {topic.authors && topic.authors.length > 0 && (
                <div
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    borderRadius: '14px',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--gray-medium)',
                      marginBottom: '0.65rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Penyusun & Kontributor</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.15rem', fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--foreground)' }}>
                    {topic.authors.map((author, idx) => (
                      <li key={idx} style={{ marginBottom: '0.35rem' }}>{author}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Chapters Roadmap / Syllabus List */}
          <section id="silabus-bab" style={{ marginBottom: '3rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '0.75rem',
              }}
            >
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, borderBottom: 'none' }}>
                Silabus & Urutan Bab
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--gray-medium)', fontWeight: '600' }}>
                {chapters.length} Bab
              </span>
            </div>

            {chapters.length === 0 ? (
              <div
                style={{
                  padding: '2.5rem',
                  textAlign: 'center',
                  border: '1px dashed var(--border)',
                  borderRadius: '14px',
                  color: 'var(--gray-medium)',
                }}
              >
                Bab materi untuk topik ini sedang dalam tahap penyusunan oleh tim Mafia Kumat.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {chapters.map((chapter) => (
                  <Link
                    key={chapter.slug}
                    href={`/materi/${topic.slug}/${chapter.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div
                      className="glass-card"
                      style={{
                        padding: '1.4rem 1.75rem',
                        borderRadius: '14px',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1.5rem',
                        transition: 'transform 0.15s ease, border-color 0.15s ease',
                      }}
                    >
                      {/* Chapter Number Badge */}
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          background: 'color-mix(in srgb, var(--foreground) 7%, transparent)',
                          border: '1px solid var(--border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '800',
                          fontSize: '1rem',
                          color: 'var(--foreground)',
                          flexShrink: 0,
                        }}
                      >
                        {chapter.chapterNumber < 10 ? `0${chapter.chapterNumber}` : chapter.chapterNumber}
                      </div>

                      {/* Chapter Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem',
                            marginBottom: '0.35rem',
                          }}
                        >
                          <h3
                            style={{
                              fontSize: '1.18rem',
                              fontWeight: '700',
                              margin: 0,
                              color: 'var(--foreground)',
                            }}
                          >
                            {chapter.title}
                          </h3>
                          <span
                            style={{
                              fontSize: '0.82rem',
                              fontWeight: '600',
                              color: 'var(--gray-medium)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              flexShrink: 0,
                            }}
                          >
                            Baca Bab &rarr;
                          </span>
                        </div>

                        {chapter.description && (
                          <p
                            style={{
                              margin: 0,
                              fontSize: '0.9rem',
                              lineHeight: '1.6',
                              color: 'var(--gray-medium)',
                            }}
                          >
                            {chapter.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

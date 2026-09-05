'use client';
import Link from 'next/link';
import { useState, useMemo } from 'react';

export default function MateriList({
  topics = [],
  chapters = [],
  tracks = [],
  initialTrack = 'all',
  initialQuery = '',
}) {
  // Support both topics or legacy chapters prop
  const items = topics.length > 0 ? topics : chapters;

  const [selectedTrack, setSelectedTrack] = useState(initialTrack);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [expandedTopics, setExpandedTopics] = useState({});

  const toggleAccordion = (slug) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const isSearching = searchQuery.trim().length > 0;
  const queryLower = searchQuery.toLowerCase().trim();

  // Filter topics and chapters based on search query and track
  const filteredTopics = useMemo(() => {
    return items
      .map((topic) => {
        const matchesTrack =
          selectedTrack === 'all' || topic.track === selectedTrack;

        if (!matchesTrack) return null;

        const topicTitleMatches = topic.title.toLowerCase().includes(queryLower);
        const topicDescMatches = (topic.description || '').toLowerCase().includes(queryLower);

        // Filter chapters that match query
        const matchedChapters = (topic.chapters || []).filter((ch) => {
          if (!isSearching) return true;
          return (
            ch.title.toLowerCase().includes(queryLower) ||
            (ch.description || '').toLowerCase().includes(queryLower)
          );
        });

        const hasChapterMatch = matchedChapters.length > 0;
        const matchesSearch = !isSearching || topicTitleMatches || topicDescMatches || hasChapterMatch;

        if (!matchesSearch) return null;

        return {
          ...topic,
          matchedChapters,
          hasDirectChapterMatch: isSearching && hasChapterMatch,
        };
      })
      .filter(Boolean);
  }, [items, selectedTrack, queryLower, isSearching]);

  return (
    <>
      {/* Search Input */}
      <div className="animate-fade-up delay-1" style={{ marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="search"
            placeholder="Cari topik atau bab materi (contoh: Efek Fotolistrik, Ruang Hilbert, Lagrange)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.95rem 1.25rem 0.95rem 2.85rem',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              background: 'color-mix(in srgb, var(--background) 92%, var(--foreground))',
              color: 'var(--foreground)',
              fontSize: '0.98rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--gray-medium)',
              pointerEvents: 'none',
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* Track Filter Tabs */}
      <div
        className="animate-fade-up delay-1"
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          marginBottom: '2rem',
          scrollbarWidth: 'none',
        }}
      >
        <button
          onClick={() => setSelectedTrack('all')}
          style={{
            padding: '0.45rem 0.9rem',
            borderRadius: '999px',
            fontSize: '0.82rem',
            fontWeight: '600',
            border: '1px solid',
            borderColor: selectedTrack === 'all' ? 'var(--foreground)' : 'var(--border)',
            background: selectedTrack === 'all' ? 'var(--foreground)' : 'transparent',
            color: selectedTrack === 'all' ? 'var(--background)' : 'var(--gray-medium)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.15s ease',
          }}
        >
          Semua Lintasan ({items.length})
        </button>

        {tracks.map((track) => {
          const trackCount = items.filter((c) => c.track === track.name).length;
          const isActive = selectedTrack === track.name;

          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.name)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: '600',
                border: '1px solid',
                borderColor: isActive ? 'var(--foreground)' : 'var(--border)',
                background: isActive ? 'var(--foreground)' : 'transparent',
                color: isActive ? 'var(--background)' : 'var(--gray-medium)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {track.name} ({trackCount})
            </button>
          );
        })}
      </div>

      {/* Topics & Chapters List */}
      <div className="animate-fade-up delay-2">
        {filteredTopics.length === 0 ? (
          <div
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              border: '1px dashed var(--border)',
              borderRadius: '14px',
              color: 'var(--gray-medium)',
            }}
          >
            {items.length === 0
              ? 'Belum ada topik materi yang diterbitkan.'
              : 'Topik atau bab tidak ditemukan. Coba kata kunci lain atau pilih lintasan belajar berbeda.'}
          </div>
        ) : selectedTrack === 'all' && !isSearching ? (
          /* Grouped by Track when showing all without search */
          tracks.map((track) => {
            const trackTopics = items.filter((t) => t.track === track.name);
            // Skip empty tracks in "Semua Lintasan" view to keep list compact
            if (trackTopics.length === 0) return null;

            return (
              <section key={track.id} style={{ marginBottom: '2.25rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: '0.85rem',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '0.45rem',
                  }}
                >
                  <h2
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: '750',
                      letterSpacing: '-0.02em',
                      margin: 0,
                    }}
                  >
                    {track.name}
                  </h2>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--gray-medium)',
                      fontWeight: '600',
                    }}
                  >
                    {trackTopics.length} Topik
                  </span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '1rem',
                    alignItems: 'start',
                  }}
                >
                  {trackTopics.map((topic) => (
                    <TopicCard
                      key={topic.slug}
                      topic={topic}
                      isExpanded={Boolean(expandedTopics[topic.slug])}
                      onToggle={() => toggleAccordion(topic.slug)}
                      isSearching={false}
                      queryLower=""
                    />
                  ))}
                </div>
              </section>
            );
          })
        ) : (
          /* Flat list when specific track or actively searching */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1rem',
              alignItems: 'start',
            }}
          >
            {filteredTopics.map((topic) => {
              // Automatically expand accordion if user searched and chapters match
              const isOpen = isSearching || Boolean(expandedTopics[topic.slug]);
              return (
                <TopicCard
                  key={topic.slug}
                  topic={topic}
                  isExpanded={isOpen}
                  onToggle={() => toggleAccordion(topic.slug)}
                  isSearching={isSearching}
                  queryLower={queryLower}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function TopicCard({ topic, isExpanded, onToggle, isSearching, queryLower }) {
  const chapters = topic.chapters || [];
  const hasChapters = chapters.length > 0;
  const firstChapter = hasChapters ? chapters[0] : null;

  return (
    <div
      className="glass-card"
      style={{
        padding: 0,
        borderRadius: '14px',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
      }}
    >
      {/* Top Header Card */}
      <div style={{ padding: '1.15rem 1.35rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            marginBottom: '0.45rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: '700',
                color: 'var(--gray-medium)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {topic.track}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: '600',
                padding: '0.1rem 0.45rem',
                borderRadius: '999px',
                background: 'color-mix(in srgb, var(--foreground) 6%, transparent)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                flexShrink: 0,
              }}
            >
              {chapters.length} Bab
            </span>
          </div>

          <Link
            href={`/materi/${topic.slug}`}
            style={{
              fontSize: '0.78rem',
              fontWeight: '600',
              color: 'var(--foreground)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              textDecoration: 'none',
              padding: '0.22rem 0.55rem',
              borderRadius: '6px',
              background: 'color-mix(in srgb, var(--foreground) 5%, transparent)',
              border: '1px solid var(--border)',
              transition: 'all 0.15s ease',
              flexShrink: 0,
            }}
          >
            Overview &rarr;
          </Link>
        </div>

        <Link
          href={`/materi/${topic.slug}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <h3
            style={{
              fontSize: '1.18rem',
              fontWeight: '750',
              letterSpacing: '-0.02em',
              margin: '0 0 0.35rem 0',
              color: 'var(--foreground)',
              lineHeight: '1.3',
            }}
          >
            {topic.title}
          </h3>
        </Link>

        <p
          style={{
            margin: 0,
            fontSize: '0.86rem',
            lineHeight: '1.5',
            color: 'var(--gray-medium)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {topic.description}
        </p>

        {/* Action Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '0.85rem',
            paddingTop: '0.65rem',
            borderTop: '1px solid var(--border)',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          {hasChapters ? (
            <button
              onClick={onToggle}
              type="button"
              style={{
                background: 'transparent',
                border: 'none',
                padding: '0.2rem 0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.82rem',
                fontWeight: '600',
                color: 'var(--foreground)',
                cursor: 'pointer',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s ease',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              <span>
                {isExpanded ? 'Tutup Bab' : `Daftar Bab (${chapters.length})`}
              </span>
            </button>
          ) : (
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-medium)' }}>
              Bab sedang disusun
            </span>
          )}

          {firstChapter && (
            <Link
              href={`/materi/${topic.slug}/${firstChapter.slug}`}
              style={{
                fontSize: '0.82rem',
                fontWeight: '600',
                color: 'var(--foreground)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              Mulai: Bab 1 &rarr;
            </Link>
          )}
        </div>
      </div>

      {/* Collapsible Accordion Content — Ringkas & Ramping */}
      {isExpanded && hasChapters && (
        <div
          style={{
            borderTop: '1px solid var(--border)',
            background: 'color-mix(in srgb, var(--background) 70%, var(--foreground) 3%)',
            padding: '0.65rem 0.85rem 0.8rem',
          }}
        >
          <div
            style={{
              fontSize: '0.68rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--gray-medium)',
              marginBottom: '0.4rem',
              paddingLeft: '0.4rem',
            }}
          >
            Daftar Bab ({chapters.length}):
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
            {chapters.map((chapter) => {
              const isChapterMatch =
                isSearching &&
                (chapter.title.toLowerCase().includes(queryLower) ||
                  (chapter.description || '').toLowerCase().includes(queryLower));

              return (
                <Link
                  key={chapter.slug}
                  href={`/materi/${topic.slug}/${chapter.slug}`}
                  className="chapter-list-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                    padding: '0.35rem 0.6rem',
                    borderRadius: '6px',
                    border: isChapterMatch ? '1px solid var(--foreground)' : '1px solid transparent',
                    background: isChapterMatch
                      ? 'color-mix(in srgb, var(--foreground) 8%, transparent)'
                      : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        fontFamily: 'monospace',
                        color: 'var(--gray-medium)',
                        minWidth: '2.6rem',
                      }}
                    >
                      Bab {chapter.chapterNumber}
                    </span>
                    <span
                      style={{
                        fontSize: '0.86rem',
                        fontWeight: isChapterMatch ? '700' : '500',
                        color: 'var(--foreground)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {chapter.title}
                    </span>
                    {isChapterMatch && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: '700',
                          padding: '0.05rem 0.35rem',
                          borderRadius: '4px',
                          background: 'var(--foreground)',
                          color: 'var(--background)',
                          textTransform: 'uppercase',
                          flexShrink: 0,
                        }}
                      >
                        Cocok
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--gray-medium)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      marginLeft: '0.5rem',
                    }}
                  >
                    Baca &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

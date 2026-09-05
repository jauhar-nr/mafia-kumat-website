'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function MateriList({ chapters = [], tracks = [] }) {
  const searchParams = useSearchParams();
  const initialTrack = searchParams.get('track') || 'all';

  const [selectedTrack, setSelectedTrack] = useState(initialTrack);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter berdasarkan search query dan track yang dipilih
  const filteredChapters = chapters.filter((chapter) => {
    const matchesSearch =
      chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTrack =
      selectedTrack === 'all' || chapter.track === selectedTrack;

    return matchesSearch && matchesTrack;
  });

  return (
    <>
      {/* Search Input */}
      <div className="animate-fade-up delay-1" style={{ marginBottom: '1.5rem' }}>
        <input
          type="search"
          placeholder="Cari materi pembelajaran (contoh: Ruang Hilbert, Lagrange)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.9rem 1.25rem',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            background: 'color-mix(in srgb, var(--background) 90%, var(--foreground))',
            color: 'var(--foreground)',
            fontSize: '0.98rem',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Track Filter Tabs */}
      <div
        className="animate-fade-up delay-1"
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '2.5rem',
          scrollbarWidth: 'none',
        }}
      >
        <button
          onClick={() => setSelectedTrack('all')}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '999px',
            fontSize: '0.85rem',
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
          Semua Lintasan ({chapters.length})
        </button>

        {tracks.map((track) => {
          const trackCount = chapters.filter((c) => c.track === track.name).length;
          const isActive = selectedTrack === track.name;

          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.name)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
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

      {/* Chapters Content Display */}
      <div className="animate-fade-up delay-2">
        {/* State jika pencarian tidak menemukan hasil */}
        {filteredChapters.length === 0 ? (
          <div
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              border: '1px dashed var(--border)',
              borderRadius: '16px',
              color: 'var(--gray-medium)',
            }}
          >
            {chapters.length === 0
              ? 'Belum ada materi yang diterbitkan. Tim sedang menyusunnya!'
              : 'Materi tidak ditemukan. Coba kata kunci lain atau pilih topik yang berbeda.'}
          </div>
        ) : selectedTrack === 'all' && !searchQuery.trim() ? (
          /* Tampilan Grouped saat opsi "Semua" aktif dan tidak sedang search */
          tracks.map((track) => {
            const trackChapters = chapters.filter((c) => c.track === track.name);
            return (
              <section key={track.id} style={{ marginBottom: '3.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '0.65rem',
                  }}
                >
                  <h2
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: '750',
                      letterSpacing: '-0.02em',
                      margin: 0,
                    }}
                  >
                    {track.name}
                  </h2>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--gray-medium)',
                      fontWeight: '600',
                    }}
                  >
                    {trackChapters.length} Topik
                  </span>
                </div>

                {trackChapters.length === 0 ? (
                  <div
                    style={{
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px dashed var(--border)',
                      color: 'var(--gray-medium)',
                      fontSize: '0.9rem',
                    }}
                  >
                    Topik untuk lintasan ini sedang disiapkan oleh tim.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {trackChapters.map((chapter) => (
                      <ChapterCard key={chapter.slug} chapter={chapter} />
                    ))}
                  </div>
                )}
              </section>
            );
          })
        ) : (
          /* Tampilan Flat ketika filter track spesifik atau sedang search */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredChapters.map((chapter) => (
              <ChapterCard key={chapter.slug} chapter={chapter} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function ChapterCard({ chapter }) {
  return (
    <Link href={`/materi/${chapter.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div
        className="glass-card"
        style={{
          padding: '1.6rem 2rem',
          borderRadius: '14px',
          transition: 'var(--transition)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}
        >
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: '600',
              color: 'var(--gray-medium)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {chapter.track}
          </span>
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: '600',
              color: 'var(--foreground)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            Buka Topik &rarr;
          </span>
        </div>

        <h3
          style={{
            fontSize: '1.35rem',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            margin: '0.25rem 0 0.65rem 0',
            color: 'var(--foreground)',
          }}
        >
          {chapter.title}
        </h3>

        <p
          style={{
            margin: 0,
            fontSize: '0.94rem',
            lineHeight: '1.6',
            color: 'var(--gray-medium)',
          }}
        >
          {chapter.description}
        </p>
      </div>
    </Link>
  );
}

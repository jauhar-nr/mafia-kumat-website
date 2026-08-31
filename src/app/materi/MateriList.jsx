'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function MateriList({ chapters }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChapters = chapters.filter(chapter => 
    chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    chapter.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="animate-fade-up delay-1" style={{ marginBottom: '2rem' }}>
        <input 
          type="search" 
          placeholder="Cari materi (contoh: mekanika)..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            background: 'color-mix(in srgb, var(--background) 90%, var(--foreground))',
            color: 'var(--foreground)',
            fontSize: '1rem',
            outline: 'none',
          }}
        />
      </div>

      <div className="animate-fade-up delay-2" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredChapters.length === 0 ? (
          <p style={{ color: 'var(--gray-medium)' }}>
            {chapters.length === 0 
              ? 'Belum ada materi yang diterbitkan. Tim sedang menyusunnya!' 
              : 'Materi tidak ditemukan. Coba kata kunci lain.'}
          </p>
        ) : (
          filteredChapters.map((chapter, idx) => {
            // Find actual chapter index to display correct BAB number
            const originalIdx = chapters.findIndex(c => c.slug === chapter.slug);
            return (
              <Link key={idx} href={`/materi/${chapter.slug}`} style={{ display: 'block' }}>
                <div className="glass-card" style={{ padding: '1.5rem 2rem' }}>
                  <div style={{ color: 'var(--gray-medium)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    BAB {originalIdx + 1}
                  </div>
                  <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{chapter.title}</h2>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '1rem' }}>{chapter.description}</p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
}

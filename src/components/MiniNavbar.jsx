'use client';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function MiniNavbar({ backHref = "/", backText = "Kembali", onToggleChapters }) {
  return (
    <nav 
      style={{ 
        padding: '0.85rem 0', 
        borderBottom: '1px solid var(--border)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        background: 'color-mix(in srgb, var(--background) 85%, transparent)', 
        backdropFilter: 'blur(12px)', 
        WebkitBackdropFilter: 'blur(12px)' 
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onToggleChapters && (
            <button
              onClick={onToggleChapters}
              className="mini-nav-chapters-btn"
              type="button"
              aria-label="Buka daftar bab"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <span>Daftar Bab</span>
            </button>
          )}

          <Link href="/" style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.05em' }}>
            Mafia <span style={{ color: 'var(--gray-medium)' }}>Kumat</span>
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <Link href={backHref} style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--gray-medium)' }}>
            &larr; {backText}
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

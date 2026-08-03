'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav 
      style={{ 
        padding: '1.5rem 0', 
        borderBottom: '1px solid var(--border)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100,
        background: 'color-mix(in srgb, var(--background) 85%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
    >
      <div className="container nav-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ whiteSpace: 'nowrap', fontWeight: '800', fontSize: '1.25rem', letterSpacing: '-0.05em' }} onClick={() => setIsMenuOpen(false)}>
          Mafia <span style={{ color: 'var(--gray-medium)' }}>Kumat</span>
        </Link>
        
        {/* Tombol Hamburger (Hanya Muncul di HP) */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* Menu Desktop */}
        <div className="nav-links desktop-menu" style={{ display: 'flex', alignItems: 'center', fontWeight: '600' }}>
          <Link href="/materi" style={{ color: 'var(--gray-medium)' }}>Materi</Link>
          <Link href="/people" style={{ color: 'var(--gray-medium)' }}>Tim Pengajar</Link>
          <Link href="/about" style={{ color: 'var(--gray-medium)' }}>Tentang</Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {isMenuOpen && (
        <div className="mobile-dropdown animate-fade-down" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'color-mix(in srgb, var(--background) 95%, transparent)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.8rem',
          alignItems: 'center',
          fontWeight: '600',
          fontSize: '1.1rem',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
        }}>
          <Link href="/materi" onClick={() => setIsMenuOpen(false)}>Materi</Link>
          <Link href="/people" onClick={() => setIsMenuOpen(false)}>Tim Pengajar</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)}>Tentang</Link>
          <div style={{ marginTop: '0.5rem', transform: 'scale(1.1)' }}>
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <nav 
      style={{ 
        padding: '1.5rem 0', 
        borderBottom: '1px solid var(--border)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100,
        // Using color-mix to create a transparent version of our hex variables for the glass effect
        background: 'color-mix(in srgb, var(--background) 85%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: '800', fontSize: '1.25rem', letterSpacing: '-0.05em' }}>
          Mafia <span style={{ color: 'var(--gray-medium)' }}>Kumat</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontSize: '0.9rem', fontWeight: '600' }}>
          <Link href="/materi" style={{ color: 'var(--gray-medium)' }}>Materi</Link>
          <Link href="/people" style={{ color: 'var(--gray-medium)' }}>Tim Pengajar</Link>
          <Link href="/about" style={{ color: 'var(--gray-medium)' }}>Tentang</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

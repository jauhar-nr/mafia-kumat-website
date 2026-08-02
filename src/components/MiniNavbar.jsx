import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function MiniNavbar({ backHref = "/", backText = "Kembali" }) {
  return (
    <nav 
      style={{ 
        padding: '1rem 0', 
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
        <Link href="/" style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.05em' }}>
          Mafia <span style={{ color: 'var(--gray-medium)' }}>Kumat</span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link href={backHref} style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--gray-medium)' }}>
            &larr; {backText}
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

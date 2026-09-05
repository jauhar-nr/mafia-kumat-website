import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.05em' }}>
            Mafia <span style={{ color: 'var(--gray-medium)' }}>Kumat</span>
          </Link>
          <span style={{ color: 'var(--border)' }}>·</span>
          <a
            href="https://www.youtube.com/@MafiaKumat"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--gray-medium)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '500' }}
            aria-label="YouTube Mafia Kumat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
        </div>

        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--gray-medium)', textAlign: 'center', lineHeight: '1.6' }}>
          Seluruh materi di situs ini dilisensikan di bawah{' '}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'underline', color: 'var(--foreground)', textUnderlineOffset: '3px' }}
          >
            Creative Commons (CC BY-NC-SA 4.0)
          </a>.
        </p>

        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--gray-medium)' }}>
          &copy; {new Date().getFullYear()} Tim Mafia Kumat. Dibangun dengan Next.js.
        </p>
      </div>
    </footer>
  );
}

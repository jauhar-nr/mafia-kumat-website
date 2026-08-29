import { MiniNavbar } from '../../components/MiniNavbar';

export default function MateriLoading() {
  return (
    <>
      <MiniNavbar backHref="/" backText="Kembali" />
      <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
        <div className="skeleton" style={{ height: '3rem', width: '55%', marginBottom: '1rem' }} />
        <div className="skeleton" style={{ height: '1.1rem', width: '80%', marginBottom: '3rem' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton-card glass-card" style={{ padding: '1.5rem 2rem' }}>
              <div className="skeleton" style={{ height: '0.9rem', width: '12%', marginBottom: '0.75rem' }} />
              <div className="skeleton" style={{ height: '1.5rem', width: '65%', marginBottom: '0.75rem' }} />
              <div className="skeleton" style={{ height: '1rem', width: '90%' }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

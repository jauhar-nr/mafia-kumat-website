export function GDrivePDF({ id, title }) {
  if (!id) return null;

  return (
    <div className="glass-card" style={{ margin: '2.5rem 0', padding: '0', overflow: 'hidden' }}>
      {title && (
        <div style={{ 
          padding: '1rem 1.5rem', 
          background: 'rgba(var(--foreground), 0.02)', 
          borderBottom: '1px solid var(--border)',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          {title}
        </div>
      )}
      <div style={{ position: 'relative', width: '100%', paddingTop: '141.4%' /* A4 Aspect Ratio */ }}>
        <iframe 
          src={`https://drive.google.com/file/d/${id}/preview`} 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            border: 'none',
            background: 'var(--gray-light)'
          }} 
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  );
}

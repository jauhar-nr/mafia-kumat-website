export function PDFViewer({ url, title = "Lampiran PDF" }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <div className="glass-card" style={{ 
        padding: '1.5rem', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1.5rem', 
        marginTop: '2.5rem', 
        marginBottom: '2.5rem',
        borderLeft: '4px solid var(--accent)',
        transition: 'transform 0.2s ease, background 0.2s ease'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <div style={{ fontSize: '2.5rem' }}>📄</div>
        <div>
          <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--foreground)' }}>{title}</h4>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', color: 'var(--gray-medium)' }}>
            Klik untuk melihat atau mengunduh dokumen ini.
          </p>
        </div>
      </div>
    </a>
  );
}

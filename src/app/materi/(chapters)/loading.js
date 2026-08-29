export default function ChapterLoading() {
  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="skeleton" style={{ height: '0.9rem', width: '40%', marginBottom: '2rem' }} />
      <div className="skeleton" style={{ height: '2.5rem', width: '75%', marginBottom: '1rem' }} />
      <div className="skeleton" style={{ height: '1rem', width: '25%', marginBottom: '3rem' }} />

      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="skeleton" style={{ height: '1.1rem', width: `${95 - (i % 3) * 10}%`, marginBottom: '1rem' }} />
      ))}

      <div className="skeleton" style={{ height: '1.8rem', width: '55%', marginTop: '3rem', marginBottom: '1.5rem' }} />
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="skeleton" style={{ height: '1.1rem', width: `${90 - (i % 2) * 15}%`, marginBottom: '1rem' }} />
      ))}
    </div>
  );
}

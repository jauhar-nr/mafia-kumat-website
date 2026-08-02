export function YouTubePlayer({ videoId }) {
  return (
    <div 
      style={{ 
        margin: '2rem 0', 
        borderRadius: '16px', 
        overflow: 'hidden',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        aspectRatio: '16/9',
        width: '100%',
        backgroundColor: 'var(--gray-light)',
      }}
    >
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ display: 'block' }}
      ></iframe>
    </div>
  );
}

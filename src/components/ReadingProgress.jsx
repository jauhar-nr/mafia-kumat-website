'use client';
import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [useJs, setUseJs] = useState(false);

  useEffect(() => {
    // Feature detect CSS scroll timeline
    if (!CSS.supports('animation-timeline', 'scroll()')) {
      setUseJs(true);
      
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        
        const maxScroll = docHeight - winHeight;
        if (maxScroll <= 0) {
          setProgress(0);
          return;
        }
        
        const currentProgress = (scrollY / maxScroll) * 100;
        setProgress(currentProgress);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '4px',
      backgroundColor: 'transparent',
      zIndex: 9999,
    }}>
      <div className={useJs ? "" : "reading-progress-bar"} style={{
        height: '100%',
        backgroundColor: 'var(--foreground)',
        ...(useJs ? { width: `${progress}%`, transition: 'width 0.1s ease-out' } : {})
      }} />
    </div>
  );
}

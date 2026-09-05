'use client';
import { useState, useEffect, useRef } from 'react';

export function LatexCopyOverlay() {
  const [activeBlock, setActiveBlock] = useState(null);
  const [copied, setCopied] = useState(false);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    const article = document.querySelector('.markdown-body');
    if (!article) return;

    const showButtonForBlock = (block) => {
      if (!block) return;
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

      const annotation = block.querySelector('annotation[encoding="application/x-tex"]') || block.querySelector('annotation');
      const tex = annotation?.textContent?.trim();
      if (!tex) return;

      const articleRect = article.getBoundingClientRect();
      const blockRect = block.getBoundingClientRect();

      // Hitung posisi relatif terhadap .markdown-body
      const top = blockRect.top - articleRect.top + 8;
      const right = articleRect.right - blockRect.right + 10;

      setActiveBlock({ top, right, tex });
      setCopied(false);
    };

    const handleMouseOver = (e) => {
      const block = e.target.closest('.katex-display');
      if (block) {
        showButtonForBlock(block);
      }
    };

    const handleMouseOut = (e) => {
      const block = e.target.closest('.katex-display');
      if (block) {
        hideTimerRef.current = setTimeout(() => {
          setActiveBlock(null);
          setCopied(false);
        }, 400);
      }
    };

    const handleClick = (e) => {
      const block = e.target.closest('.katex-display');
      if (block) {
        showButtonForBlock(block);
      }
    };

    article.addEventListener('mouseover', handleMouseOver);
    article.addEventListener('mouseout', handleMouseOut);
    article.addEventListener('click', handleClick);

    return () => {
      article.removeEventListener('mouseover', handleMouseOver);
      article.removeEventListener('mouseout', handleMouseOut);
      article.removeEventListener('click', handleClick);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  if (!activeBlock) return null;

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!activeBlock.tex) return;

    try {
      await navigator.clipboard.writeText(activeBlock.tex);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Gagal menyalin LaTeX:', err);
    }
  };

  const handleMouseEnterOverlay = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  };

  const handleMouseLeaveOverlay = () => {
    hideTimerRef.current = setTimeout(() => {
      setActiveBlock(null);
      setCopied(false);
    }, 300);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: `${activeBlock.top}px`,
        right: `${activeBlock.right}px`,
        zIndex: 50,
        pointerEvents: 'auto',
      }}
      onMouseEnter={handleMouseEnterOverlay}
      onMouseLeave={handleMouseLeaveOverlay}
    >
      <button
        type="button"
        className={`copy-latex-btn ${copied ? 'copied' : ''}`}
        onClick={handleCopy}
        aria-label="Salin kode LaTeX"
        title="Salin rumus LaTeX"
      >
        {copied ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Tersalin</span>
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>LaTeX</span>
          </>
        )}
      </button>
    </div>
  );
}

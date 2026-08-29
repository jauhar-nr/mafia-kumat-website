'use client';
import { useEffect, useState } from 'react';

export function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const article = document.querySelector('.markdown-body');
    if (!article) return;

    const elements = article.querySelectorAll('h1, h2, h3');
    const items = Array.from(elements).map((el, idx) => {
      if (!el.id) {
        el.id = `heading-${idx}`;
      }
      return {
        id: el.id,
        text: el.textContent,
        level: parseInt(el.tagName.charAt(1)),
      };
    });
    setHeadings(items);

    // Track heading aktif saat scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  const handleClick = (e, id, closeMobile = false) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    if (closeMobile) setIsOpen(false);
  };

  return (
    <>
      {/* Desktop TOC — fixed sidebar di kiri */}
      <nav className="toc-desktop" aria-label="Daftar Isi">
        <div className="toc-title">Daftar Isi</div>
        <ul className="toc-list">
          {headings.map((heading) => (
            <li key={heading.id} className={`toc-item toc-level-${heading.level}`}>
              <a
                href={`#${heading.id}`}
                className={activeId === heading.id ? 'toc-active' : ''}
                onClick={(e) => handleClick(e, heading.id)}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile TOC — collapsible di atas konten */}
      <div className="toc-mobile">
        <button onClick={() => setIsOpen(!isOpen)} className="toc-mobile-btn">
          <span>📑 Daftar Isi ({headings.length})</span>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {isOpen && (
          <ul className="toc-list animate-fade-down">
            {headings.map((heading) => (
              <li key={heading.id} className={`toc-item toc-level-${heading.level}`}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id, true)}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

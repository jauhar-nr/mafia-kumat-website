'use client';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const isManualScrollRef = useRef(false);
  const scrollTimerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    let headingElements = [];

    const frameId = requestAnimationFrame(() => {
      const article = document.querySelector('.markdown-body');
      if (!article) return;

      const elements = article.querySelectorAll('h1, h2, h3, h4');
      const validElements = Array.from(elements).filter(
        (el) => el.id && el.textContent.trim().length > 0
      );

      const items = validElements.map((el) => ({
        id: el.id,
        text: el.textContent,
        level: parseInt(el.tagName.charAt(1), 10),
      }));

      headingElements = validElements;
      setHeadings(items);

      // Inisialisasi activeId jika belum ada
      if (items.length > 0) {
        setActiveId(items[0].id);
      }
    });

    const handleScroll = () => {
      if (isManualScrollRef.current) return;
      if (headingElements.length === 0) return;

      // Jika pengguna sudah berada di dasar halaman, aktifkan heading terakhir
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (atBottom) {
        setActiveId(headingElements[headingElements.length - 1].id);
        return;
      }

      // Ambil heading aktif berdasarkan posisi viewport (threshold 110px untuk navbar)
      let currentId = headingElements[0].id;
      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= 110) {
          currentId = el.id;
        } else {
          break;
        }
      }

      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [pathname]);

  if (headings.length < 2) return null;

  const handleClick = (e, id, closeMobile = false) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    // Kunci scrollspy sementara agar highlight tidak berpindah liar selama animasi scroll
    isManualScrollRef.current = true;
    setActiveId(id);

    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 850);

    target.scrollIntoView({ behavior: 'smooth' });

    if (window.history?.pushState) {
      window.history.pushState(null, '', `#${id}`);
    }

    if (closeMobile) setIsOpen(false);
  };

  return (
    <>
      {/* Desktop TOC — fixed sidebar di kanan */}
      <nav className="toc-desktop" aria-label="Daftar Isi">
        <div className="toc-title">Di Halaman Ini</div>
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
        <button onClick={() => setIsOpen(!isOpen)} className="toc-mobile-btn" type="button">
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
                  className={activeId === heading.id ? 'toc-active' : ''}
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

import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function getChapters() {
  const chaptersDir = path.join(process.cwd(), 'src/app/materi/(chapters)');
  if (!fs.existsSync(chaptersDir)) return [];
  const entries = fs.readdirSync(chaptersDir, { withFileTypes: true });
  const chapters = entries
    .filter(entry => entry.isDirectory())
    .map(entry => {
      const slug = entry.name;
      const filePath = path.join(chaptersDir, slug, 'page.mdx');
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        return { slug, title: data.title || slug, description: data.description || '' };
      }
      return null;
    })
    .filter(Boolean);
  return chapters.sort((a, b) => a.slug.localeCompare(b.slug));
}

export default function Home() {
  const chapters = getChapters().slice(0, 3);
  return (
    <main
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Navigation */}
      <nav
        style={{
          padding: "1.5rem 0",
          borderBottom: "1px solid var(--border)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "color-mix(in srgb, var(--background) 85%, transparent)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontWeight: "800",
              fontSize: "1.25rem",
              letterSpacing: "-0.05em",
            }}
          >
            Mafia <span style={{ color: "var(--gray-medium)" }}>Kumat</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              fontSize: "0.9rem",
              fontWeight: "600",
            }}
          >
            <Link href="/materi" style={{ color: "var(--gray-medium)" }}>
              Materi
            </Link>
            <Link href="/people" style={{ color: "var(--gray-medium)" }}>
              Tim Pengajar
            </Link>
            <Link href="/about" style={{ color: "var(--gray-medium)" }}>
              Tentang
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "6rem 0",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <h1
              className="animate-fade-up"
              style={{
                fontSize: "clamp(3rem, 8vw, 5.5rem)",
                lineHeight: "1.05",
              }}
            >
              Fisika Kuantum <br />
              <span style={{ color: "var(--gray-medium)" }}>Material.</span>
            </h1>
            <p
              className="animate-fade-up delay-1"
              style={{
                fontSize: "1.25rem",
                maxWidth: "600px",
                marginTop: "1.5rem",
              }}
            >
              Platform pembelajaran dari komunitas Mafia Kumat. Eksplorasi
              materi komprehensif mulai dari matematika esensial, fisika
              kuantum, hingga sains material modern.
            </p>
            <div
              className="animate-fade-up delay-2"
              style={{ display: "flex", gap: "1rem", marginTop: "3rem" }}
            >
              <Link href="/materi" className="btn btn-primary">
                Mulai Belajar
              </Link>
              <Link href="/materi" className="btn btn-secondary">
                Lihat Silabus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section
        style={{ padding: "6rem 0", backgroundColor: "var(--gray-light)" }}
      >
        <div className="container">
          <h2
            className="animate-fade-up"
            style={{ fontSize: "2.5rem", marginBottom: "3rem" }}
          >
            Apa yang akan kamu pelajari?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {chapters.length === 0 ? (
              <p style={{ color: 'var(--gray-medium)' }}>Belum ada materi yang diterbitkan.</p>
            ) : (
              chapters.map((chapter, idx) => (
                <div key={idx} className={`glass-card animate-fade-up delay-${idx + 1}`}>
                  <div style={{ color: 'var(--gray-medium)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    BAB {idx + 1}
                  </div>
                  <h3 style={{ fontSize: "1.5rem", marginTop: 0 }}>
                    {chapter.title}
                  </h3>
                  <p>{chapter.description}</p>
                  <Link
                    href={`/materi/${chapter.slug}`}
                    style={{
                      fontWeight: "600",
                      borderBottom: "1px solid var(--accent)",
                    }}
                  >
                    Baca Selengkapnya &rarr;
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "3rem 0",
          borderTop: "1px solid var(--border)",
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        <div className="container">
          <p style={{ margin: 0, fontSize: "0.9rem" }}>
            &copy; {new Date().getFullYear()} Tim Mafia Kumat. Dibangun dengan
            Next.js.
          </p>
        </div>
      </footer>
    </main>
  );
}

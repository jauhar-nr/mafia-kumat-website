import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";
import { Navbar } from "../components/Navbar";
import { getChapters } from "../lib/chapters";

export default function Home() {
  const chapters = getChapters().slice(0, 3);
  return (
    <main
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Navigation */}
      {/* Navigation */}
      <Navbar />

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
              <Link href={chapters.length > 0 ? `/materi/${chapters[0].slug}` : '/materi'} className="btn btn-primary">
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

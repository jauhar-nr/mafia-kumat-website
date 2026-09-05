import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { GrapheneLatticeAnimation } from "../components/GrapheneLatticeAnimation";
import { getTracksWithTopics, getTopics } from "../lib/topics";

function TrackIcon({ type }) {
  if (type === "math") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="4" x2="20" y2="4" />
        <polyline points="4 4 14 12 4 20" />
        <line x1="4" y1="20" x2="20" y2="20" />
      </svg>
    );
  }
  if (type === "atom") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" />
      </svg>
    );
  }
  if (type === "classical") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v10" />
        <path d="M7 17a5 5 0 0 0 10 0" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    );
  }
  // material
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

export default function Home() {
  const tracks = getTracksWithTopics();
  const allTopics = getTopics();

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "6rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient 3D Tilted Graphene Lattice */}
        <GrapheneLatticeAnimation />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
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
                lineHeight: "1.6",
              }}
            >
              Platform pembelajaran dari komunitas Mafia Kumat. Eksplorasi
              materi komprehensif mulai dari matematika esensial, fisika
              kuantum, hingga sains material modern.
            </p>
            <div
              className="animate-fade-up delay-2"
              style={{ display: "flex", gap: "1rem", marginTop: "3rem", flexWrap: "wrap" }}
            >
              <Link
                href={allTopics.length > 0 ? `/materi/${allTopics[0].slug}` : '/materi'}
                className="btn btn-primary"
              >
                Mulai Belajar
              </Link>
              <Link href="/materi" className="btn btn-secondary">
                Lihat Silabus Materi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Learning Tracks Section */}
      <section
        style={{ padding: "6rem 0", backgroundColor: "var(--gray-light)" }}
      >
        <div className="container">
          <div style={{ marginBottom: "3.5rem" }}>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--gray-medium)",
                marginBottom: "0.5rem",
              }}
            >
              Lintasan Belajar
            </div>
            <h2
              className="animate-fade-up"
              style={{ fontSize: "2.4rem", margin: 0, fontWeight: "800" }}
            >
              Lintasan Fisika Kuantum Material
            </h2>
            <p
              style={{
                color: "var(--gray-medium)",
                fontSize: "1.05rem",
                marginTop: "0.75rem",
                maxWidth: "680px",
                lineHeight: "1.6",
              }}
            >
              Materi disusun dalam 4 lintasan utama yang saling berkesinambungan,
              mulai dari fondasi matematika analitis hingga fenomena kuantum pada material padat.
            </p>
          </div>

          <div className="tracks-grid-2x2">
            {tracks.map((track, idx) => (
              <div
                key={track.id}
                className={`glass-card animate-fade-up delay-${idx + 1}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "2rem",
                  borderRadius: "16px",
                  transition: "var(--transition)",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "12px",
                        background: "color-mix(in srgb, var(--foreground) 7%, transparent)",
                        border: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--foreground)",
                      }}
                    >
                      <TrackIcon type={track.icon} />
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        padding: "0.28rem 0.65rem",
                        borderRadius: "999px",
                        background:
                          track.topics.length > 0
                            ? "color-mix(in srgb, var(--accent) 10%, transparent)"
                            : "color-mix(in srgb, var(--foreground) 4%, transparent)",
                        color:
                          track.topics.length > 0
                            ? "var(--foreground)"
                            : "var(--gray-medium)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {track.topics.length > 0
                        ? `${track.topics.length} Topik Tersedia`
                        : "Segera Hadir"}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.35rem",
                      fontWeight: "750",
                      letterSpacing: "-0.02em",
                      marginTop: 0,
                      marginBottom: "0.85rem",
                      lineHeight: "1.3",
                    }}
                  >
                    {track.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.94rem",
                      lineHeight: "1.65",
                      color: "var(--gray-medium)",
                      marginBottom: "1.75rem",
                    }}
                  >
                    {track.description}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: "1.25rem",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  {track.topics.length > 0 ? (
                    <Link
                      href={`/materi?track=${encodeURIComponent(track.name)}`}
                      style={{
                        fontSize: "0.92rem",
                        fontWeight: "600",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        color: "var(--foreground)",
                      }}
                    >
                      Jelajahi Topik &rarr;
                    </Link>
                  ) : (
                    <span style={{ fontSize: "0.88rem", color: "var(--gray-medium)" }}>
                      Topik sedang disusun
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

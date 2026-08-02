import { Navbar } from "../../components/Navbar";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Tim Pengajar | Mafia Kumat",
};

// Data tim pengajar (callback ke referensi GitHub)
const teamMembers = [
  {
    name: "Eddwi Hesky Hasdeo",
    role: "Supervisor & Peneliti",
    affiliation: "Pusat Riset Kuantum (BRIN)",
    bio: "Ahli kuantum (asli).",
    image: "/people/people-hesky.jpg",
  },
  {
    name: "Imaddudin Akmal",
    role: "Kontributor Konten",
    affiliation: "Universitas Gadjah Mada (UGM)",
    bio: "Ahli kuantum.",
    image: "/people/people-akmal.jpeg",
  },
  {
    name: "Jauhar Nur Ramadhan",
    role: "Kontributor Konten",
    affiliation: "Universitas Indonesia (UI)",
    bio: "Ahli kuantum.",
    image: "/people/people-jauhar.jpg",
  },
  {
    name: "Naufal Lutfian Hakim",
    role: "Kontributor Konten",
    affiliation: "Mafia Kumat",
    bio: "Ahli kuantum.",
    image: "/people/people-naufal.jpeg",
  },
  {
    name: "Yovan Fabiano Maitlen",
    role: "Kontributor Konten",
    affiliation: "Mafia Kumat",
    bio: "Ahli kuantum.",
    image: "/people/people-yovan.jpeg",
  },
];

export default function PeoplePage() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />

      <main
        className="container"
        style={{ flex: 1, padding: "4rem 2rem", maxWidth: "1000px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1
            className="animate-fade-up"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              marginBottom: "1rem",
              lineHeight: "1.1",
            }}
          >
            Di Balik{" "}
            <span style={{ color: "var(--gray-medium)" }}>Mafia Kumat.</span>
          </h1>
          <p
            className="animate-fade-up delay-1"
            style={{
              fontSize: "1.1rem",
              maxWidth: "600px",
              margin: "0 auto",
              color: "var(--gray-medium)",
            }}
          >
            Mengenal lebih dekat para pengajar, peneliti, dan pengembang yang
            mendedikasikan waktunya untuk menyederhanakan semesta kuantum.
          </p>
        </div>

        <div
          className="animate-fade-up delay-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "2rem",
              }}
            >
              {/* Avatar Placeholder / Image */}
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "var(--gray-light)",
                  border: "1px solid var(--border)",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  color: "var(--gray-medium)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  member.name.charAt(0)
                )}
              </div>

              <h2 style={{ fontSize: "1.25rem", margin: "0 0 0.25rem 0" }}>
                {member.name}
              </h2>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "var(--accent)",
                  marginBottom: "0.25rem",
                }}
              >
                {member.role}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--gray-medium)",
                  marginBottom: "1rem",
                }}
              >
                {member.affiliation}
              </div>

              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </main>

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
            &copy; {new Date().getFullYear()} Tim Mafia Kumat.
          </p>
        </div>
      </footer>
    </div>
  );
}

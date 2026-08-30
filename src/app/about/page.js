import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Tentang | Mafia Kumat",
};

export default function AboutPage() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />

      <main
        className="container"
        style={{ flex: 1, padding: "4rem 2rem", maxWidth: "800px" }}
      >
        <h1
          className="animate-fade-up"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            marginBottom: "2rem",
            lineHeight: "1.1",
            textAlign: "center",
          }}
        >
          Manifesto{" "}
          <span style={{ color: "var(--gray-medium)" }}>Kuantum.</span>
        </h1>

        <div
          className="animate-fade-up delay-1"
          style={{
            fontSize: "1.15rem",
            lineHeight: "1.8",
            color: "var(--foreground)",
          }}
        >
          <p style={{ marginBottom: "1.5rem" }}>
            <strong>Mafia Kumat</strong> (Maniak Fisika Kuantum Material) lahir
            dari sebuah kegelisahan: mengapa materi fisika tingkat lanjut selalu
            terasa kaku, membosankan, dan sulit diakses secara visual?
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            Buku cetak fisika kuantum seringkali tebal dan penuh dengan
            persamaan panjang yang mengintimidasi. Sementara itu, sumber belajar
            digital bahasa Indonesia di bidang ini sangat terbatas. Kami hadir
            untuk mendobrak dinding pembatas tersebut.
          </p>
          <p style={{ marginBottom: "3rem" }}>
            Misi utama kami adalah menyajikan semesta kuantum melalui antarmuka
            web modern yang premium, interaktif, dan mudah dimengerti.
          </p>
        </div>

        <div
          className="animate-fade-up delay-3"
          style={{
            textAlign: "center",
            padding: "3rem 0",
            borderTop: "1px solid var(--border)",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
            Siap menjelajahi realitas?
          </h2>
          <Link
            href="/materi"
            className="btn btn-primary"
            style={{ marginTop: "1rem" }}
          >
            Mulai Belajar Sekarang
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

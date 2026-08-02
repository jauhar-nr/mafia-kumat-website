import { Navbar } from "../../components/Navbar";
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
            <strong>Mafia Kumat</strong> (Matematika & Fisika Kuantum Material)
            lahir dari sebuah kegelisahan: mengapa materi fisika tingkat lanjut
            selalu terasa kaku, membosankan, dan sulit diakses secara visual?
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

        {/*
        <h2
          className="animate-fade-up delay-2"
          style={{
            fontSize: "2rem",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          3 Pilar Utama
        </h2>

        <div
          className="animate-fade-up delay-3"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
        >
          <div className="glass-card" style={{ padding: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>📏</span> Akurasi Matematis
              Terjaga
            </h3>
            <p style={{ margin: 0, fontSize: "0.95rem" }}>
              Berbeda dengan situs pop-sains, kami tidak membuang rumus
              matematika. Lewat mesin LaTeX dan render yang tajam, kami membuat
              persamaan Schrödinger senyaman dibaca layaknya puisi.
            </p>
          </div>

          <div className="glass-card" style={{ padding: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>🎨</span> Pengalaman Visual
              Premium
            </h3>
            <p style={{ margin: 0, fontSize: "0.95rem" }}>
              Desain monokromatik, interaksi halus, dan tata letak membaca
              layaknya medium.com. Kami memastikan matamu tidak cepat lelah saat
              mempelajari matriks hermit.
            </p>
          </div>

          <div className="glass-card" style={{ padding: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>🌐</span> Akses Terbuka (Open
              Web)
            </h3>
            <p style={{ margin: 0, fontSize: "0.95rem" }}>
              Tidak perlu mengunduh PDF yang memakan memori, tidak perlu
              instalasi. Setiap materi, simulasi, dan video pembelajaran
              langsung terbuka di layar gawai milikmu.
            </p>
          </div>
        </div>
        */}

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

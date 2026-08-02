# Dokumen Spesifikasi Teknis - Website Belajar Fisika Kuantum

Dokumen ini berisi rangkuman arsitektur, teknologi, dan alur kerja untuk proyek website pembelajaran fisika kuantum. Dokumen ini berfungsi sebagai panduan utama bagi _Web Developer_ dalam mengelola dan mengembangkan website.

## 1. Arsitektur & Teknologi Utama (_Tech Stack_)

Website ini dibangun dengan pendekatan **Jamstack** (statis, cepat, dan sangat aman) menggunakan teknologi berikut:

- **Framework Utama**: **Next.js** (React-based). Digunakan untuk _routing_ dan rendering halaman statis (_Static Site Generation/SSG_).
- **Styling**: **Vanilla CSS**. Digunakan untuk kontrol penuh terhadap desain, menciptakan estetika monokrom (hitam, putih, abu-abu) yang premium, elegan, dan kaya akan _micro-animations_.
- **Format Konten**: **MDX (Markdown + JSX)**. Memungkinkan penulisan materi standar (Markdown), _rendering_ rumus matematika (LaTeX via KaTeX/MathJax), dan penyisipan komponen React (seperti _video player_ interaktif) langsung di dalam materi.
- **Sistem Manajemen Konten (CMS)**: **Git-based CMS** (contoh: Decap CMS atau Outstatic). Memberikan _dashboard_ visual bagi tim non-teknis untuk menulis materi tanpa perlu melakukan _coding_.
- **Hosting & Deployment**: **GitHub Pages** (via GitHub Organization) dengan **GitHub Actions** untuk publikasi otomatis (_CI/CD_).

---

## 2. Struktur Folder Utama

Berikut adalah gambaran struktur _repository_ setelah Next.js diinstal:

```text
quantum-physics-website/
├── public/                 # Aset statis yang dapat diakses publik
│   ├── admin/              # File konfigurasi untuk Dashboard Admin (CMS)
│   ├── uploads/            # Direktori tempat media (PDF, Gambar) hasil upload dari CMS disimpan
│   └── favicon.ico         # Ikon website
├── src/
│   ├── app/                # Pengatur rute halaman (Home, About, People) - App Router Next.js
│   ├── components/         # Komponen React yang dapat digunakan ulang (Navbar, Footer, VideoPlayer, MathRender)
│   └── styles/             # File Vanilla CSS utama (variabel warna monokrom, desain sistem)
├── content/                # (Atau direktori khusus dari CMS) Tempat penyimpanan file materi (.mdx)
├── .env.local              # File rahasia (environment variables) lokal, tidak di-push ke GitHub
├── package.json            # Daftar dependensi (NPM) dan skrip proyek
└── next.config.mjs         # Konfigurasi Next.js (termasuk setting output: 'export' untuk GitHub Pages)
```

---

## 3. Fitur Website Utama

1. **Desain Premium Monokrom**: Tampilan bersih, minimalis, dengan transisi halaman yang mulus dan _hover effects_ yang membuat web terasa _hidup_. Responsif untuk HP, Tablet, dan Laptop.
2. **Dukungan Rumus Matematika (LaTeX)**: Kemampuan me-_render_ persamaan kompleks (seperti mekanika kuantum) dengan jernih menggunakan sintaks standar LaTeX di dalam file Markdown.
3. **Video Player Terintegrasi**: Menggunakan YouTube (mode _Unlisted_) untuk menampung video pembelajaran guna menghemat batas ukuran dan _bandwidth_ server, disajikan dengan komponen antarmuka _player_ khusus agar serasi dengan tema.
4. **Galeri/Viewer PDF**: Dukungan untuk melampirkan catatan tulis tangan hasil _scan_ yang dapat dilihat langsung atau diunduh oleh pengunjung.
5. **Dashboard Admin (CMS)**: Antarmuka berbasis web (seperti WordPress) di alamat `/admin` untuk mempermudah tim non-teknis membuat dan mengedit konten.

---

## 4. Alur Kerja (_Workflow_)

Proyek ini memisahkan tugas antara **Developer** dan **Tim Konten**.

### A. Alur Kerja Tim Konten (Penulis Materi)

1. Tim _login_ ke Dashboard Admin (`tim-kuantum.github.io/admin`).
2. Menulis materi seperti di MS Word, menempelkan (_paste_) rumus LaTeX, dan memasukkan _link_ YouTube _Unlisted_.
3. Jika butuh melampirkan gambar/PDF, gunakan fitur _Media Library_ (Drag-and-Drop) di CMS.
4. Klik **"Publish" / "Save"**. CMS akan otomatis mengirim file Markdown baru ke GitHub dan memicu proses _deployment_ ke _live website_.

### B. Alur Kerja Developer (Perawatan & Pengembangan)

1. Tarik (_pull_) perubahan konten terbaru dari GitHub ke lokal laptop.
2. Jika ada permintaan fitur komponen baru (misal: "Kotak Peringatan Kuis"), buat komponen di `src/components/QuizAlert.jsx`.
3. Atur _styling_ di CSS jika ada yang kurang rapi di ukuran layar tertentu.
4. Lakukan _testing_ secara lokal (`npm run dev`).
5. Jika sudah aman, _commit_ dan _push_ perubahan kode ke GitHub.

---

## 5. Security (Keamanan)

- **Tanpa Database Runtime**: Karena website bersifat statis, tidak ada celah untuk _SQL Injection_ atau eksploitasi server.
- **Otentikasi Aman**: Login admin diatur melalui protokol OAuth GitHub. Selama akun GitHub anggota tim aman (menggunakan 2FA), isi website akan selalu aman.
- **SSL (Gembok Hijau)**: Ditangani secara otomatis oleh GitHub Pages, menjamin enkripsi _traffic_ pengunjung.

---

## 6. Daftar Perintah Terminal Penting

Developer hanya perlu menggunakan perintah dasar Node.js / NPM:

- `npm install`
  Mengunduh dan menginstal semua paket perangkat lunak yang dibutuhkan proyek. (Dijalankan saat pertama kali men-clone _repository_).
- `npm run dev`
  Menyalakan server lokal untuk _development_. Buka `http://localhost:3000` di _browser_ untuk melihat perubahan kode secara langsung (_hot-reload_).
- `npm run build`
  Melakukan simulasi kompilasi akhir untuk memastikan tidak ada kode atau format Markdown yang _error_ sebelum web benar-benar di-_publish_.

'use client';

import { useEffect, useRef } from 'react';

/**
 * GrapheneLatticeAnimation
 * Animasi latar struktur kisi grafena heksagonal 3D
 * - Bergerak ke bawah perlahan secara tak hingga (seamless infinite loop)
 * - Sudut pandang perspektif 3D miring (tilted plane)
 * - Warna abu-abu karbon (graphite slate)
 * - Pudar lembut di tepian (fade in/out tanpa border atau outline)
 * - Auto-pause saat di luar viewport untuk efisiensi daya (0% CPU)
 */
export function GrapheneLatticeAnimation() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animIdRef = useRef(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Parameter kisi sarang lebah (honeycomb)
    const a = 36; // Panjang ikatan C-C (pixels)
    const periodY = 3 * a; // Periode pengulangan vertikal kisi
    const deltaX = Math.sqrt(3) * a; // Jarak antar kolom
    const deltaY = 1.5 * a; // Jarak antar baris

    // Kecepatan gerakan ke bawah (pixels per frame)
    const speed = 0.35;
    let offsetY = 0;
    let time = 0;

    // Matriks rotasi 3D (kemiringan sudut pandang / perspective tilt)
    // Pitch: miring ke belakang ~62 derajat
    const pitch = (60 * Math.PI) / 180;
    // Yaw: miring diagonal ~ -18 derajat
    const yaw = (-20 * Math.PI) / 180;
    // Roll: miring halus ~ 8 derajat
    const roll = (8 * Math.PI) / 180;

    const cosP = Math.cos(pitch);
    const sinP = Math.sin(pitch);
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const cosR = Math.cos(roll);
    const sinR = Math.sin(roll);

    const render = () => {
      if (!isVisibleRef.current) {
        animIdRef.current = requestAnimationFrame(render);
        return;
      }

      time += 0.015;
      offsetY = (offsetY + speed) % periodY;

      // Bersihkan kanvas
      ctx.clearRect(0, 0, width, height);

      // Deteksi tema (Dark vs Light)
      const theme = document.documentElement.getAttribute('data-theme');
      const isDark = theme === 'dark' || theme === 'red' || !theme;

      // Titik tengah proyeksi
      const centerX = width * 0.52;
      const centerY = height * 0.48;
      const fov = 420;
      const cameraDist = 480;

      // Jumlah baris dan kolom yang meng-cover area layar miring
      const cols = Math.ceil(width / deltaX) + 8;
      const rows = Math.ceil(height / deltaY) + 12;

      const projectedAtoms = [];
      const bonds = [];
      const atomMap = new Map();

      // 1. Bangun kisi heksagonal dengan pergeseran vertikal kontinu
      for (let r = -Math.floor(rows / 2) - 2; r <= Math.floor(rows / 2) + 4; r++) {
        const rowShift = (Math.abs(r) % 2 === 1 ? deltaX * 0.5 : 0);

        for (let c = -Math.floor(cols / 2) - 2; c <= Math.floor(cols / 2) + 2; c++) {
          const x0 = c * deltaX + rowShift;
          const y0 = r * deltaY + offsetY;

          // 2 subkisi per unit cell heksagonal
          const p1 = { x: x0, y: y0 - 0.5 * a, key: `${r}_${c}_1`, r, c, sub: 1 };
          const p2 = { x: x0, y: y0 + 0.5 * a, key: `${r}_${c}_2`, r, c, sub: 2 };

          [p1, p2].forEach((p) => {
            // Riak kuantum / gelombang termal nanometer (out-of-plane wave)
            const wave =
              Math.sin(p.x * 0.014 + time * 0.9) * Math.cos(p.y * 0.016 - time * 0.7) * 14 +
              Math.sin(p.y * 0.025 + time * 1.2) * 6;

            // Transformasi Rotasi 3D (Yaw -> Pitch -> Roll)
            // 1. Yaw (Y)
            const x1 = p.x * cosY + wave * sinY;
            const z1 = -p.x * sinY + wave * cosY;

            // 2. Pitch (X)
            const y2 = p.y * cosP - z1 * sinP;
            const z2 = p.y * sinP + z1 * cosP;

            // 3. Roll (Z)
            const x3 = x1 * cosR - y2 * sinR;
            const y3 = x1 * sinR + y2 * cosR;
            const z3 = z2;

            // Proyeksi Perspektif
            const depth = z3 + cameraDist;
            if (depth <= 20) return;

            const scale = fov / depth;
            const screenX = centerX + x3 * scale;
            const screenY = centerY + y3 * scale;

            // Fade out di pinggiran kanvas (radial / edge fade)
            const normDistX = (screenX - centerX) / (width * 0.52);
            const normDistY = (screenY - centerY) / (height * 0.52);
            const distSq = normDistX * normDistX + normDistY * normDistY;
            const edgeFade = Math.max(0, Math.min(1, 1.4 - distSq * 1.15));

            // Depth fade (bagian jauh lebih redup)
            const depthFade = Math.max(0.2, Math.min(1.0, 1.0 - (depth - 350) / 450));
            const alpha = edgeFade * depthFade;

            if (alpha > 0.01 && screenX >= -50 && screenX <= width + 50 && screenY >= -50 && screenY <= height + 50) {
              const atomObj = {
                key: p.key,
                x2D: screenX,
                y2D: screenY,
                z: z3,
                scale,
                alpha,
                radius: Math.max(2.0, 4.8 * (scale / 0.9)),
              };
              projectedAtoms.push(atomObj);
              atomMap.set(p.key, atomObj);
            }
          });

          // Ikatan kimia C-C:
          // A. Ikatan vertikal antara p1 dan p2 dalam sel yang sama
          bonds.push([p1.key, p2.key]);

          // B. Ikatan diagonal dari p2 ke atom p1 di baris bawahnya
          const isOddRow = Math.abs(r) % 2 === 1;
          const leftCol = isOddRow ? c : c - 1;
          const rightCol = isOddRow ? c + 1 : c;

          bonds.push([p2.key, `${r + 1}_${leftCol}_1`]);
          bonds.push([p2.key, `${r + 1}_${rightCol}_1`]);
        }
      }

      // 2. Gambar Ikatan Kimia (Bonds)
      for (let i = 0; i < bonds.length; i++) {
        const [k1, k2] = bonds[i];
        const a1 = atomMap.get(k1);
        const a2 = atomMap.get(k2);
        if (!a1 || !a2) continue;

        const bondAlpha = Math.min(a1.alpha, a2.alpha);
        if (bondAlpha <= 0.015) continue;

        ctx.beginPath();
        ctx.moveTo(a1.x2D, a1.y2D);
        ctx.lineTo(a2.x2D, a2.y2D);

        if (isDark) {
          // Mode Gelap: Garis abu-abu slate karbon transparan
          ctx.strokeStyle = `rgba(148, 163, 184, ${bondAlpha * 0.28})`;
          ctx.lineWidth = Math.max(0.8, 1.3 * (a1.scale + a2.scale) * 0.5);
        } else {
          // Mode Terang: Garis grafit karbon halus
          ctx.strokeStyle = `rgba(71, 85, 105, ${bondAlpha * 0.24})`;
          ctx.lineWidth = Math.max(0.9, 1.4 * (a1.scale + a2.scale) * 0.5);
        }
        ctx.stroke();
      }

      // 3. Gambar Atom Karbon (Carbon Spheres)
      for (let i = 0; i < projectedAtoms.length; i++) {
        const atom = projectedAtoms[i];
        if (atom.alpha <= 0.02) continue;

        const r = atom.radius;

        // A. Shading Inti Atom Karbon
        const coreGrad = ctx.createRadialGradient(
          atom.x2D - r * 0.35,
          atom.y2D - r * 0.35,
          r * 0.1,
          atom.x2D,
          atom.y2D,
          r
        );

        if (isDark) {
          // Karbon slate bercahaya lembut
          coreGrad.addColorStop(0, `rgba(241, 245, 249, ${atom.alpha * 0.95})`);
          coreGrad.addColorStop(0.45, `rgba(148, 163, 184, ${atom.alpha * 0.8})`);
          coreGrad.addColorStop(1, `rgba(51, 65, 85, ${atom.alpha * 0.6})`);
        } else {
          // Grafit arang halus
          coreGrad.addColorStop(0, `rgba(148, 163, 184, ${atom.alpha * 0.95})`);
          coreGrad.addColorStop(0.5, `rgba(71, 85, 105, ${atom.alpha * 0.85})`);
          coreGrad.addColorStop(1, `rgba(15, 23, 42, ${atom.alpha * 0.7})`);
        }

        ctx.beginPath();
        ctx.arc(atom.x2D, atom.y2D, r, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();

        // B. Kilau Halus (Specular Dot)
        if (atom.alpha > 0.4 && r > 2.5) {
          ctx.beginPath();
          ctx.arc(atom.x2D - r * 0.32, atom.y2D - r * 0.32, r * 0.28, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(255, 255, 255, ${atom.alpha * 0.6})`
            : `rgba(255, 255, 255, ${atom.alpha * 0.45})`;
          ctx.fill();
        }
      }

      animIdRef.current = requestAnimationFrame(render);
    };

    animIdRef.current = requestAnimationFrame(render);

    // Optimasi performa modern: Jeda animasi saat di luar viewport (0% CPU)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { rootMargin: '100px' }
    );

    observer.observe(container);

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-graphene-visual">
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}

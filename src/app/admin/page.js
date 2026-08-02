'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function AdminPage() {
  useEffect(() => {
    // Menyembunyikan warning bawaan dari Decap CMS yang tidak berbahaya (karena perbedaan versi React 19)
    const originalError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('Warning: Failed prop type: Invalid prop `children`')) return;
      originalError(...args);
    };

    import('decap-cms-app').then((CMS) => {
      // Mendaftarkan tombol khusus "Kotak Lampiran PDF" di menu "+" Editor Markdown
      CMS.default.registerEditorComponent({
        id: "pdf-viewer",
        label: "Sisipkan Kotak PDF",
        fields: [
          { name: "title", label: "Judul Kotak", widget: "string", default: "Lampiran PDF" },
          { name: "url", label: "Pilih File PDF", widget: "file" }
        ],
        pattern: /^<PDFViewer url="(.*?)" title="(.*?)" \/>$/,
        fromBlock: function(match) {
          return {
            url: match[1],
            title: match[2]
          };
        },
        toBlock: function(obj) {
          return `<PDFViewer url="${obj.url || ''}" title="${obj.title || 'Lampiran PDF'}" />`;
        },
        toPreview: function(obj) {
          return `[Kotak Lampiran PDF: ${obj.title || ''}]`;
        }
      });

      CMS.default.init({
        config: {
          local_backend: true,
          backend: {
            name: 'git-gateway',
            branch: 'master',
          },
          media_folder: 'public/media',
          public_folder: '/media',
          collections: [
            {
              name: 'materi',
              label: 'Materi Belajar',
              folder: 'src/app/materi/(chapters)',
              create: true,
              path: '{{slug}}/page',
              extension: 'mdx',
              format: 'frontmatter',
              fields: [
                { label: 'Judul Bab', name: 'title', widget: 'string' },
                { label: 'Deskripsi', name: 'description', widget: 'text' },
                { label: 'Isi Materi (Gunakan Markdown)', name: 'body', widget: 'markdown' },
              ],
            },
          ],
        },
      })
    })
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Menyembunyikan style bawaan website kita agar tidak bertabrakan dengan CMS */
        body { margin: 0; background: #fff !important; color: #000 !important; overflow-x: auto; }
        .nc-app { font-family: sans-serif; }
      ` }} />
      {/* Container utama untuk Decap CMS */}
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="beforeInteractive" />
      <div id="nc-root" />
    </>
  )
}

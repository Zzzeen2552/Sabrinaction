# SABRINACTION

Studio micro drama untuk memproduksi micro drama vertikal (±60 detik) dengan Sabrina, asisten virtual BRI, sebagai tokoh merek. Alurnya mengikuti [zenstory-ai/drama-skills](https://github.com/zenstory-ai/drama-skills).

## Menjalankan

```powershell
python -m http.server 5173 --bind 127.0.0.1
```

Lalu buka http://127.0.0.1:5173. Bisa juga langsung buka `index.html` di browser. Tidak perlu install apa pun.

## Alur

| Tab | Isi | Skill agen |
|---|---|---|
| Ringkasan | Brief seri, langkah berikutnya, progres tiap episode | `/short-drama-develop` |
| Sabrina & Aset | Character bible, boleh/jangan, frasa kunci visual, karakter utama/pendukung, galeri character sheet per pemeran (unggah banyak / seret, beri label, lihat besar) | `/short-drama-assets`, `/short-drama-image-prompts` |
| Cerita | 7 beat: hook 3 detik → cliffhanger | `/short-drama-develop` |
| Naskah | Editor Markdown + pratinjau naskah | `/short-drama-write` |
| Storyboard | Mode editor (inspector shot, preview 9:16, timeline teks/video/suara/SFX — klik klip, seret tepi kanan untuk durasi, spasi untuk putar, ←/→ pindah shot), plus mode kartu & daftar dengan bar ritme dan impor JSON | `/short-drama-storyboard` |
| Prompt | Prompt first-frame & video, disusun otomatis | `/short-drama-video-prompts` |
| Produksi | Status gambar/video/suara per shot | `/short-drama-produce`, `/short-drama-edit` |
| Review | Cek otomatis + checklist kepatuhan brand | `/short-drama-review` |
| Ekspor | Markdown per episode, cadangan/impor JSON | — |

Tombol **⧉ Perintah** menyalin permintaan lengkap (brief seri, batasan Sabrina, beat, naskah, shot) untuk ditempel ke Claude Code atau Codex yang sudah memasang skill-nya:

```powershell
npx skills add zenstory-ai/drama-skills -y -g
```

Dashboard tidak memanggil API generate apa pun. Sesuai prinsip drama-skills, generate berbayar baru dijalankan di agen setelah pratinjau batch dikonfirmasi.

## Data

Semua data tersimpan di `localStorage` browser. Gambar first frame dan video per shot (unggah atau seret ke preview Storyboard) disimpan di IndexedDB browser yang sama dan **tidak** ikut cadangan JSON — simpan file aslinya di folder proyek. Cadangkan secara rutin lewat **Ekspor → Cadangan JSON**. Proyek contoh ada di `data/sample.js`.

## Catatan

- Tampilan, suara, dan frasa kunci Sabrina di proyek contoh masih placeholder. Sesuaikan dengan aset resmi dan brand guideline dari tim BRI.
- Checklist kepatuhan adalah panduan produksi internal, bukan pengganti persetujuan tim legal/kepatuhan.

## Proyek bawaan

Di **Ekspor & proyek** ada dua proyek yang bisa dimuat (proyek aktif disimpan otomatis dan bisa dikembalikan):

- **Sabrina Siaga** (`data/sample.js`): contoh micro drama 60 detik edukasi anti-penipuan.
- **Proyek dari deck klien** (`data/mentor-boy.js` + gambar di `data/deck/`): **hanya lokal**, tidak ikut repo karena materinya rahasia. Bila file ini ada, dashboard memuatnya otomatis sebagai proyek aktif; bila tidak ada, dashboard memakai Sabrina Siaga.

## KV per adegan

Di Storyboard ada panel **KV per adegan** (dan grup *KV adegan* di inspector). Unggah atau seret key visual per scene; KV dipakai sebagai latar preview selama shot belum punya first frame, ikut tampil di naskah dan timeline, dan disebut sebagai referensi di perintah storyboard, prompt video, dan produksi.

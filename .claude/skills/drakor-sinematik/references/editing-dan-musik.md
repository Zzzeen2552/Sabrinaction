# Editing & musik

Angka di file ini adalah titik mulai. Kalau `selera-tim.md` punya aturan untuk hal yang sama, pakai yang di sana.

## Ritme potong

- **Potong di emosi, bukan di kalimat.** Tetap di wajah pendengar setelah kalimat penting; reaksi adalah isinya.
- **Tahan sedikit lebih lama** dari nyaman di momen tenang (0,5–1,5 detik ekstra). Drakor percaya penonton mau menunggu.
- **Komedi**: setup → pemicu → potong ke reaksi → tahan → (opsional) potong lagi ke reaksi kedua. Jangan isi jeda canggung dengan musik atau efek.
- **Smash cut** boleh untuk kesenjangan citra vs kenyataan ("Aku pasti tenang." → potong ke tokoh panik), sekali-dua kali per episode.
- **J-cut/L-cut**: biarkan suara adegan berikut masuk lebih dulu, atau suara adegan sebelumnya tertinggal — transisi terasa halus dan sinematik.
- **Montase** berirama musik, diakhiri satu shot yang ditahan agar penonton mendarat.
- Ritme episode bergelombang: tenang → naik → tenang → puncak → napas → penutup.

## Musik & suara

- **Hening dan ambience dulu.** Suara ruangan (AC, mesin antrean, ketikan, hujan) membuat dunia terasa nyata.
- **Score tipis** (piano, gitar akustik, string lembut) untuk transisi dan kehangatan; masuk dan keluar pelan.
- **OST/lagu tema** hanya di puncak emosi, sekali per episode, dan dibiarkan cukup lama. Momen tanpa dialog + OST adalah ciri khas drakor.
- **Komedi**: musik ringan pizzicato/ukulele boleh untuk adegan, tapi jangan stinger di setiap lelucon; jeda hening sering lebih lucu.
- **Hindari** dentuman dramatis, efek "boing", dan musik tegang yang terus-menerus.
- Loudness akhir untuk platform sosial sekitar −14 LUFS integrated (sesuaikan target platform).

## Warna

- **Color match ke video acuan** setelah klip disambung: samakan rata-rata dan sebaran tiap kanal R/G/B dengan acuan (kecerahan, kontras, rona). Hasil generate cenderung lebih terang, kontras, dan dingin daripada film; grade ini yang membuatnya terasa sinematik.
- Grade satu kali untuk seluruh adegan, bukan per klip, supaya sambungan tidak terlihat.
- Dashboard punya preset grade per episode (Produksi → Color grade): Netral, Kafe indie Korea, Pagi hangat, Kantor biru bersih, Malam tenang, Kenangan pastel. Preset ikut masuk paket OpenFilm sebagai `grade.svg` dan ter-render ke MP4; padanan ffmpeg-nya tertulis di BACA-SAYA. Pilih preset sesuai suasana adegan (lihat palet per suasana di `sinematografi-vertikal.md`).

## Subtitle & teks

- Subtitle mengikuti naskah kata per kata, maksimal 2 baris, tidak menutupi wajah.
- Teks layar ([TEKS]) minimal dan bergaya bersih (sans-serif, putih/aksen merek), muncul di zona aman.
- Kartu judul/penutup sederhana; biarkan gambar terakhir episode bernapas sebelum kartu muncul.

## Di OpenFilm

Paket dari dashboard (`EP00X-openfilm/film.html`) berisi satu clip per shot, subtitle, dan kartu penutup.
- Atur titik potong di clip gambar; tambahkan reaksi dan jeda dengan memperpanjang clip (`#t=` dan `at`).
- Musik/ambience sebagai `<audio>` di track sendiri; pakai `fade` (overrides) untuk masuk-keluar pelan.
- Transisi = clip yang tumpang tindih + fade, bukan efek wipe.
- Jangan ubah track yang `locked`; cek dengan `openfilm look`, render dengan target loudness.
- **Rough cut dulu**: render satu rentang pendek (`openfilm render 0-20`) untuk dinilai user; render penuh setelah catatannya masuk ke `selera-tim.md`.
- Tulis alasan setiap titik potong penting di catatan editing.

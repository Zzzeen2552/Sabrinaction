# Mikro-ekspresi di prompt video

Model video cenderung melebih-lebihkan emosi: senyum jadi lebar, sedih jadi menangis, kaget jadi mulut menganga. Drakor justru hidup dari perubahan kecil di wajah. Cara mendapatkannya: pecah emosi menjadi tanda fisik yang sangat kecil, tetapkan urutan perubahannya per shot, dekatkan kamera ke bagian wajah yang berubah, dan larang versi yang berlebihan secara eksplisit.

Pola ini diadaptasi dari uji ekspresi halus pada MiniMax H3 yang dibagikan user (adegan menahan tangis, 7 shot, 12 detik).

## Lima blok prompt

1. **Global setup.** Fotorealistis live-action, rasio, lokasi, siapa saja yang tampil, tema emosinya dalam satu kalimat, dan aturan suara (ambience apa saja, tanpa musik).
2. **Character lock.** Tokoh → gambar referensinya (`Sabrina: Picture 1`). Sama persis di semua generate.
3. **Continuity lock.** Hal yang harus konsisten (arah angin, rambut, benda di tangan, cahaya) dan **tangga emosi**: keadaan emosi tiap tokoh per shot, ditulis sebagai urutan. Contoh: `tears welling but not falling → lips pressed to hold them back → eyes closed in a bitter smile → hand clenching clothing → only in shot 06 does a single tear fall → shot 07 calms`. Sebutkan satu-satunya momen "pelepasan" yang diizinkan. Tambahkan juga **tangga kondisi properti**: siapa memegang benda penting dan dalam keadaan apa di setiap shot (`[Shot 3] the cup is still held by both of them — her fingers on the lid, his thumb on the side`), dan pastikan dialog cocok dengan kondisi itu.
4. **Shot breakdown.** Per shot: rentang waktu persis, durasi, gerak kamera (untuk close-up ekspresi: kamera diam total), dan gambar: framing, arah pandang, lalu 2–4 tanda fisik kecil secara berurutan.
5. **Negative constraints.** Daftar larangan di akhir: tanpa ekspresi berlebihan, tanpa wajah terdistorsi, tanpa goyang kamera, tanpa push-in cepat, tanpa tokoh lain, tanpa musik; identitas, rambut, kostum, cahaya konsisten di semua shot. Ulangi batas pelepasan ("only one tear, only in shot 06").

Untuk H3 format Ref2VA (dashboard SABRINACTION), blok 1–3 masuk ke awal `detailed_description`, blok 4 adalah `[Shot N]`, dan blok 5 jadi paragraf terakhir `detailed_description`.

## Framing yang memperlihatkan mikro-ekspresi

- **Extreme close-up satu mata**: mata yang dekat tajam, mata lain blur di balik batang hidung. Untuk air mata menggenang, pupil bergetar, bulu mata berkedip menahan.
- **Extreme close-up bibir**: hanya dari bawah hidung sampai dagu. Untuk bibir ditekan, napas tertahan, dagu bergetar, senyum yang ditahan.
- **Close-up tangan/benda**: jari mengencang, buku jari memucat, ibu jari mengusap gelas, kain terlipat dalam. Emosi pindah ke tangan.
- **Close-up wajah yang diulang** (shot 01 dan shot 04 framing sama): perubahan kecil di antara keduanya jadi terlihat.
- Kamera diam total di semua close-up ekspresi; gerak hanya di shot penutup, dan hampir tak terlihat.

## Kosakata tanda fisik (bahasa Inggris untuk prompt)

- **Mata**: `eyes glistening`, `tears welling along the lower eyelid but not falling`, `pupils tremble slightly`, `gaze shifts to the upper left and back`, `eyelashes flutter as she fights not to blink`, `a slow blink held a beat too long`, `eyes dart down to the cup, then back up`.
- **Bibir & rahang**: `lips press together and tremble slightly`, `lips part as if to speak, then close`, `a restrained breath through barely parted lips`, `chin quivers almost imperceptibly`, `jaw tightens`, `swallows`.
- **Senyum**: `the faintest bitter smile that collapses almost immediately`, `one corner of her mouth twitches up before she presses it flat`, `a suppressed smile she hides by looking down`, `a smile reaches the eyes but not the mouth`.
- **Napas & tubuh**: `breath catches`, `a short exhale through the nose`, `shoulders rise with a held breath`, `fingers tighten, knuckles pale`.
- **Jangan dipakai**: perubahan warna kulit seperti `ears flush pink`, `cheeks blush red`. Model video membuatnya menyala seperti cat, tidak natural (uji EP006 v6, telinga Boy merah terang). Ganti dengan aksi: menelan ludah, mengusap tengkuk, menunduk sebentar.
- **Komedi halus (romcom)**: `eyes widen by a millimeter`, `freezes mid-blink`, `a tiny double take`, `swallows`, `rubs the back of his neck`, `presses lips together to stop a laugh`, `looks away and back too quickly`.

## Aturan menulis

- Tulis tanda fisik, jangan label emosi. `She is sad` → `tears well along her lower eyelid; she presses her lips together`.
- 2–4 tanda per shot, berurutan dalam waktu. Lebih dari itu, model mencampurnya jadi wajah aneh.
- Satu pelepasan per adegan (satu air mata, satu senyum utuh, satu tawa tertahan yang bocor), di shot yang ditentukan. Sebelumnya semua ditahan.
- Shot ekspresi pendek (1,2–2,6 detik) dan banyak, bukan satu shot panjang.
- Untuk komedi, mikro-ekspresi pendengar sering lebih lucu dari kalimat pembicara: beri pendengar ECU sendiri.

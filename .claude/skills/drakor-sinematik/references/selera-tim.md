# Selera tim

File ini adalah ingatan selera tim. Isinya aturan yang lahir dari catatan revisi user, ditulis sekonkret mungkin supaya bisa dipakai lagi di episode berikutnya. Prinsip umum skill ada di file referensi lain; di sini hanya keputusan tim yang sudah teruji.

Aturan di file ini **mengalahkan** angka umum di referensi lain, karena ini yang sudah disetujui tim. Aturan merek/kepatuhan proyek tetap di atas semuanya.

## Cara mencatat catatan revisi

Setiap kali user memberi catatan ("kecepetan", "leluconnya kurang nendang", "Sabrina terlalu genit", "musiknya kepagian"), sebelum memperbaiki:

1. **Terjemahkan jadi aturan yang bisa dicek.** Utamakan angka (detik, jumlah, karakter). Kalau tidak bisa diukur, tulis larangan/anjuran konkret dengan contoh singkat.
   - "Kecepetan" di adegan canggung → `Tahan reaksi setelah pemicu komedi minimal 1,2 detik.`
   - "Sabrina terlalu genit" → `Sabrina tidak mengedip, tidak menyentuh rambut saat bicara; senyum tipis, bukan tertawa lebar.`
2. **Cek bentrok.** Kalau aturan baru bertentangan dengan aturan lama, ganti yang lama (jangan simpan keduanya) dan catat alasannya.
3. **Tulis ke bagian "Aturan" di bawah**, di kategori yang pas, dengan tanggal dan asal catatannya (episode/adegan). Jangan menyalin naskah, isi deck, atau materi rahasia klien ke sini — cukup aturannya.
4. **Beri tahu user** satu baris: aturan apa yang ditambah atau diganti.
5. **Terapkan** ke perbaikan yang sedang dikerjakan.

Satu catatan bisa jadi lebih dari satu aturan; satu aturan sebaiknya hanya mengatur satu hal. Kalau catatan hanya berlaku untuk satu adegan tertentu dan bukan selera umum, jangan dicatat di sini — perbaiki saja adegannya.

## Aturan

Angka bertanda *(awal)* adalah titik mulai dari prinsip skill, belum dikonfirmasi tim. Ganti dengan aturan dari catatan user begitu ada, dan hapus tanda *(awal)*-nya.

### Ritme & editing
- Jeda antar kalimat dalam percakapan biasa maksimal 0,4 detik; jeda lebih panjang hanya kalau disengaja (canggung, ragu, subteks). *(awal)*
- Tahan reaksi setelah pemicu komedi 0,8–1,5 detik sebelum potong atau lanjut. *(awal)*
- Momen tenang/emosional ditahan 0,5–1,5 detik lebih lama dari selesai aksinya. *(awal)*
- Shot pembuka adegan (wide/establishing) 3–6 detik. *(awal)*
- Shot montase 1,5–3 detik, diakhiri satu shot yang ditahan minimal 2 detik. *(awal)*
- Smash cut maksimal 2 per episode. *(awal)*
- Gambar terakhir episode ditahan minimal 1 detik sebelum kartu penutup; kartu penutup 3 detik. *(awal)*

### Kamera & gambar
- Satu generate video berisi 3–5 shot dengan cut dan ganti angle (wide/OTS → reverse → close-up reaksi → insert), bukan satu shot panjang. Shot tunggal > 5 detik hanya untuk establishing atau momen sendiri. (2026-11-24 · uji EP006-SC001, "satu shot panjang, harusnya cut to cut ganti angle")
- Adegan tidak langsung dibuka dengan dialog. Beri jeda sinematik 6–10 detik dulu: detail atmosfer (mis. ECU tangan barista menuang kopi, menulis nama di gelas) → rack focus ke latar yang memperlihatkan tokoh datang → establishing yang indah → reaksi kecil tokoh. Dialog pertama baru masuk setelah itu. Langsung masuk dialog terasa seperti dracin. (2026-11-24 · uji EP006-SC001 v3, "cinematografinya belum muncul… perlu jeda cinematic yang memanjakan mata")
- Ritme potong mengikuti video acuan user (26 shot dalam ±60 detik, rata-rata ±2,4 detik): sekitar 13 shot per 30 detik, kebanyakan 1,5–3,2 detik, dengan satu-dua shot panjang 5–7 detik sebagai napas di awal atau akhir. Posisi kamera terus berpindah: wide utama dari minimal dua sisi ruangan (mis. dari pintu dan dari balik konter), shot dari luar menembus kaca jendela/pintu, close-up tiap tokoh, insert tangan atau benda, lalu kembali ke wide utama. Jangan dua shot berturut-turut dari posisi kamera yang sama. (2026-11-24 · "perhatikan juga cut to cut dan multiple angle dari video referensi")
- Angle favorit tim (dari video acuan): (1) macro insert alat dan satu tangan yang sedang bekerja, mis. steam wand di pitcher susu, metal mesin di depan, depth of field sangat tipis; (2) tokoh latar yang punya kepribadian, difoto frontal medium di tempat kerjanya (barista di balik konter, mengelap pitcher, senyum tipis yang tahu sesuatu); (3) POV dari dalam ke luar jendela: jalan dan orang lalu-lalang, tepi kusen jendela kabur di depan. Pakai minimal satu dari ini di setiap adegan. (2026-11-24 · "beberapa angle favorit")
- Percakapan memakai shot–reverse shot dengan aturan 180°: posisi tokoh di layar (kiri/kanan) tetap sama di semua shot adegan. (2026-11-24 · uji EP006-SC001)
- Setiap prompt gambar dan video wajib memuat frasa persis ini di awal deskripsi gaya: `Photoreal, natural skin texture, shot on 35mm film,`. (2026-11-24 · uji EP006 v5)
- Kulit harus matte dan natural, tidak berminyak — dicegah sejak generate, bukan hanya diperbaiki saat grading. Setiap prompt memuat: `natural matte skin with a light powdered finish, no oily shine, sweat or glossy highlights on the forehead, nose or cheeks; soft diffused key light`. Hindari kata `glowing skin`, `dewy`, `glistening skin`, `sweat`, `hard key light`. Saat grading, jangan naikkan kecerahan dengan gain linear yang mendorong highlight kulit ke putih; pakai kurva dengan highlight roll-off. (2026-11-24 · "skin tone masih oily banget… bukan hanya di grading, tapi juga di video generation")
- Cahaya harus terasa alami dengan sumber yang jelas, seperti film indie Korea: cahaya jendela siang hari yang lembut (boleh mendung), kontras rendah, hitam sedikit terangkat, palet redup (zaitun/teal, kayu hangat, putih kusam), sisi wajah yang jauh dari jendela lebih gelap. Hindari kata yang membuatnya seperti lampu atau iklan (`soft golden glow`, `light shafts through steam`, `creamy bokeh lights`, `golden hour`). (2026-11-24 · uji EP006 v5 "cahaya matahari seperti cahaya lampu"; diperbarui dengan video acuan user "tone color dan lighting jadi lebih cinematic")
- Setiap adegan video memakai satu gambar acuan lokasi (`<Environment 1>`) yang mengunci tata ruang, warna, dan cahaya di semua shot dan semua generate adegan itu. Lokasi dibuat kecil dan terasa dipakai sehari-hari, bukan mewah. (2026-11-24 · video acuan user)
- `overall_soundscape` ditulis dengan cap waktu per suara (mis. "door chime at 00:02.000, footsteps 00:03.000–00:06.000"), karena tanpa waktu H3 mengabaikan ambience. Lapisan SFX tetap disiapkan saat editing. (2026-11-24 · video acuan user)
- Aksi per shot dibuat sederhana (satu aksi jelas), larangan secukupnya. Prompt yang terlalu panjang dan penuh larangan membuat akting kaku. (2026-11-24 · video acuan user)
- Insert detail dibuat sesederhana dan serasional mungkin: satu tangan, satu aksi yang memang dilakukan orang itu (mis. barista cukup satu tangan memegang/menyerahkan gelas, tidak perlu menulis nama). (2026-11-24 · uji EP006 v5)
- Tampilan harus fotorealistis, bukan glossy AI: tekstur kulit dan pori terlihat, rambut tidak terlalu rapi, cahaya bersumber dengan bayangan lembut, depth of field lensa sungguhan, sedikit grain. (2026-11-24 · uji EP006-SC001, "kurang realistic")
- Slow motion maksimal 1 momen per episode. *(awal)*
- Gerak kamera di adegan komedi: statis kecuali ada alasan jelas. *(awal)*

- Tulis posisi tokoh terhadap ruang secara eksplisit, terutama di reverse shot: siapa berdiri di sisi mana dari meja/konter dan apa yang terlihat di belakang mereka. Tanpa ini model bisa menaruh tokoh di posisi yang mengubah perannya (mis. Boy terlihat seperti barista di balik bar). (2026-11-24 · uji EP006-SC001 v2, "posisi Boy jadi kayak barista")

### Musik & suara
- OST/lagu tema maksimal sekali per episode, minimal 15 detik saat masuk. *(awal)*
- Tidak ada efek suara kartun atau stinger di lelucon. *(awal)*
- Loudness akhir −14 LUFS integrated. *(awal)*

### Subtitle & teks
- Maksimal 2 baris per potongan subtitle, ±35 karakter per baris, minimal 1 detik tampil. *(awal)*

### Naskah & akting
- Tokoh yang bicara selalu menatap lawan bicaranya. Di setiap shot, tulis eksplisit siapa melihat ke mana (mis. "looking screen-right at Boy, just off camera"); jangan biarkan tokoh bicara ke kamera atau ke arah kosong. (2026-11-24 · uji EP006-SC001, "Sabrina ngomong ke arah yang salah")
- Logika properti dan aksi harus masuk akal di dunia nyata. Sebelum menulis prompt, cek: siapa memegang apa, dari mana benda itu datang, dan kenapa. Contoh: Boy yang menunggu punya kopinya sendiri di meja; kopi untuk Sabrina masih tertutup tutup plastik karena belum diminum. (2026-11-24 · uji EP006 v5, "harusnya Boy punya kopi sendiri, kopi Sabrina tertutup")
- Tulis "tangga kondisi properti" per shot di continuity lock, sama seperti tangga emosi: siapa memegang benda penting di setiap shot dan dalam keadaan apa. Dialog harus cocok dengan kondisi itu (mis. "Boleh saya pegang sendiri?" diucapkan saat gelas MASIH dipegang berdua; Boy baru melepas di shot berikutnya). (2026-11-24 · uji EP006 v5, "pas 'boleh saya pegang sendiri' dia udah pegang sendiri cupnya")
- Prompt video wajib punya detail mikro-ekspresi: tangga emosi per shot (continuity lock), extreme close-up mata/bibir/tangan untuk momen penting, 2–4 tanda fisik kecil per shot, satu pelepasan emosi saja per adegan, dan blok negative constraints. Ikuti `mikro-ekspresi.md`. (2026-11-24 · uji EP006-SC001 v2, "tambahkan detail micro expression")
- Jangan meminta perubahan warna kulit (telinga/pipi memerah) di prompt video; hasilnya menyala tidak natural. Malu ditunjukkan lewat aksi kecil. (2026-11-24 · uji EP006 v6, "kuping memerah di 0:24 nggak natural")
- Warna akhir disamakan dengan video acuan saat editing (color match per kanal: kecerahan, kontras, rona), bukan diharapkan dari prompt saja. Target saat ini = video acuan kafe user: luma ±69, sebaran nada ±40, rona hangat R>G>B (±79/68/54). (2026-11-24 · "color tone kok masih beda dengan video reference")
- Akting natural, tidak kaku: setiap shot punya gerak kecil yang hidup (napas, kedip, melirik sebelum bicara, jeda setengah detik, tangan memainkan benda) dan pendengar ikut bereaksi. Larang pose diam seperti foto. (2026-11-24 · uji EP006-SC001, "aktingnya kaku")

### Tokoh
- Tokoh pendukung (barista, satpam, nasabah, dll.) harus jelas berbeda dari tokoh utama dalam minimal tiga hal: usia, bentuk tubuh/wajah, gaya rambut atau rambut wajah, kacamata/aksesori, dan warna pakaian. Jangan pakai pola "pemuda Indonesia, kemeja terang" kalau Boy juga begitu. Kalau tokoh pendukung tampil wajahnya, beri dia gambar acuan sendiri (character sheet) supaya model tidak meminjam wajah tokoh utama dari sheet lain. (2026-11-24 · uji EP006 v6, "barista masih mirip si Boy")
- (belum ada — isi dari catatan user, mis. kebiasaan, batas gestur, cara bicara per tokoh)

## Riwayat perubahan

Satu baris per perubahan: tanggal · asal catatan · aturan yang ditambah/diganti.

- 2026-11-24 · uji RunningHub EP006-SC001 ("kurang realistic, Sabrina ngomong ke arah yang salah, akting kaku, satu shot panjang") · tambah 3 aturan Kamera & gambar (multi-cut per generate, 180°, fotorealistis) dan 2 aturan Naskah & akting (arah pandang eksplisit, akting hidup).
- 2026-11-24 · uji EP006-SC001 v2 ("tambahkan detail micro expression", dengan prompt uji ekspresi H3 sebagai acuan) · tambah aturan mikro-ekspresi + file referensi mikro-ekspresi.md.
- 2026-11-24 · uji EP006-SC001 v3 ("posisi Boy kayak barista"; "cinematografinya belum muncul, perlu jeda cinematic sebelum dialog") · tambah aturan blocking eksplisit dan aturan opening sinematik 6–10 detik.
- 2026-11-24 · uji EP006 v5 ("banyak yang nggak rasional": barista tak perlu menulis, cahaya matahari seperti lampu, Boy perlu kopi sendiri dan kopi Sabrina tertutup, selalu pakai frasa photoreal) · tambah aturan frasa wajib, cahaya matahari nyata, insert sederhana, dan logika properti.
- 2026-11-24 · video acuan user (kafe, look indie Korea) · aturan cahaya diganti jadi cahaya jendela alami kontras rendah; tambah aturan acuan lokasi `<Environment 1>`, soundscape bercap waktu, dan prompt ringkas.
- 2026-11-24 · uji EP006 v6 ("color tone masih beda", "kuping memerah nggak natural") · tambah color match ke acuan saat editing; larang perubahan warna kulit di prompt.
- 2026-11-24 · uji EP006 v6 ("barista masih mirip si Boy") · tambah aturan tokoh pendukung harus beda minimal di tiga ciri dan punya sheet sendiri bila wajahnya tampil.
- 2026-11-24 · grade Blue BRI ("skin tone masih oily") · tambah aturan kulit matte di prompt dan larangan gain linear pada highlight kulit.

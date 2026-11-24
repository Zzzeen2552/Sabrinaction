---
name: drakor-sinematik
description: Menulis, menyutradarai, dan menyunting micro drama / web series vertikal dengan rasa drakor (drama Korea) — adegan sinematik, komedi natural, emosi yang dibangun lewat subteks — bukan gaya dracin (drama pendek China) yang serba tampar, teriak, dan twist murahan. Pakai skill ini setiap kali menulis atau memperbaiki beat, naskah, dialog, storyboard/shot list, prompt first frame atau video, rencana editing/musik, atau me-review episode untuk SABRINACTION / Sabrina BRI, dan juga untuk drama pendek lain saat user minta hasil yang "sinematik", "kayak drakor", "lucu tapi natural", "nggak lebay", "nggak kayak dracin", atau mengeluh hasilnya terasa murahan, kaku, atau sinetron.
---

# Drakor sinematik

Skill ini mengubah cara menulis dan menyutradarai drama pendek: dari logika dracin (kejutan tiap 10 detik, emosi diteriakkan, tokoh hitam-putih) ke logika drakor (tokoh yang terasa nyata, emosi lewat jeda dan detail, komedi dari karakter, gambar yang dibiarkan bernapas). Format tetap vertikal 9:16 dan tetap harus memikat dalam 3 detik pertama — yang berubah adalah *cara* memikat.

## Kenapa bedanya penting

Penonton dracin bertahan karena kaget. Penonton drakor bertahan karena peduli pada tokohnya. Kaget habis cepat dan harus dinaikkan terus (makin keras, makin absurd); peduli menumpuk dari episode ke episode. Untuk tokoh merek seperti Sabrina, hanya yang kedua yang membangun rasa percaya — dan rasa percaya adalah produk bank.

| Aspek | Dracin (hindari) | Drakor (tuju) |
|---|---|---|
| Hook | Tamparan, teriakan, pengkhianatan di detik 1 | Gambar atau situasi yang janggal dan spesifik, memancing "kenapa?" |
| Emosi | Diucapkan: "Aku sangat sedih!" | Ditunjukkan: tangan berhenti di gagang pintu, napas ditahan |
| Konflik | Musuh jahat tanpa alasan | Dua orang yang sama-sama benar dari sudut masing-masing |
| Komedi | Efek suara "boing", mimik lebay, slapstick | Situasi canggung, reaksi, salah paham kecil, deadpan, callback |
| Dialog | Eksposisi, semua menjelaskan perasaannya | Subteks; orang bicara soal kopi padahal maksudnya "aku kangen" |
| Ritme | Potong cepat terus, rata | Bervariasi: wide yang diam lama, lalu rentetan close-up saat memuncak |
| Kamera | Zoom kejut, dutch angle, whip setiap beat | Gerak termotivasi, komposisi bersih, framing yang bercerita |
| Cahaya & warna | Terang rata, saturasi tinggi | Cahaya punya sumber (jendela, lampu meja), palet per suasana/timeline |
| Musik | Stinger dramatis di setiap kalimat | Hening dulu; OST masuk di puncak emosi, sekali, dan dibiarkan |
| Akhir episode | Cliffhanger palsu (ternyata mimpi) | Pertanyaan emosional yang jujur, atau satu momen hangat yang menggantung |

## Alur kerja

Kerjakan tahap yang diminta saja, tapi baca bagian tahap sebelumnya bila keputusannya memengaruhi (mis. storyboard butuh tahu beat komedinya di mana).

0. **Baca `references/selera-tim.md` dulu**, di tahap apa pun. Itu aturan yang sudah disepakati tim dari revisi sebelumnya, dan mengalahkan angka umum di referensi lain.
1. **Pahami tokoh dulu.** Sebelum menulis adegan, tulis untuk tiap tokoh di adegan itu: apa yang dia inginkan di adegan ini, apa yang dia sembunyikan, dan satu kebiasaan kecil yang khas (cara memegang tumbler, kata yang sering dia salah ucap). Komedi dan emosi yang natural tumbuh dari sini, bukan dari lelucon yang ditempel.
2. **Cerita & naskah** → baca `references/naskah-dan-komedi.md`.
3. **Storyboard & sinematografi** → baca `references/sinematografi-vertikal.md`.
4. **Prompt gambar & video** → baca `references/prompt-visual.md`; untuk prompt video yang menampilkan emosi atau reaksi, baca juga `references/mikro-ekspresi.md`.
5. **Editing & musik** (termasuk paket OpenFilm) → baca `references/editing-dan-musik.md`.
6. **Cek akhir** dengan daftar di bawah sebelum menyerahkan hasil.

## Belajar dari catatan revisi

Prinsip umum membuat hasil "cukup drakor"; selera tim membuatnya terasa milik tim ini. Agen pandai mengikuti aturan tapi lemah menebak selera, jadi selera harus ditulis jadi aturan.

Setiap kali user memberi catatan atas hasil (naskah terlalu cerewet, potongan kecepetan, musik kepagian, ekspresi tokoh kelewatan), ubah catatan itu jadi aturan yang bisa dicek — angka bila mungkin — dan catat di `references/selera-tim.md` sebelum memperbaiki, ikuti cara di file itu. Sebutkan ke user aturan apa yang ditambah. Catatan yang hanya berlaku untuk satu adegan tidak perlu dicatat.

Untuk editing, kerjakan **rough cut dulu**: rangkai dan render potongan pendek (satu adegan, mis. `openfilm render 0-20`) untuk dinilai, baru render penuh setelah catatannya masuk.

## Batasan Sabrina / BRI

Sabrina adalah wajah merek bank. Komedi boleh menertawakan situasi dan kecanggungan, tapi Sabrina tidak pernah jadi bahan olok-olok yang merendahkan, tidak pernah ceroboh soal keamanan nasabah, dan informasi perbankan yang diucapkan harus benar (BRI tidak pernah meminta PIN/OTP/password; arahkan ke kanal resmi). Kalau proyek punya character bible, boleh/jangan, atau checklist kepatuhan (di dashboard atau dokumen yang diberikan), ikuti itu — skill ini mengatur gaya, bukan menggantikan aturan merek. Nasabah dan pihak ketiga digambarkan dengan hormat; humor tidak boleh menyasar kelas sosial, logat daerah, atau penampilan fisik.

## Format keluaran

Ikuti format dashboard SABRINACTION agar hasil bisa langsung ditempel atau diimpor:

- **Naskah**: Markdown. Judul adegan memakai id episode dan adegan persis seperti di naskah proyek, mis. `## EP001-SC002 INT · Banking Hall BRI · Pagi` (dashboard membaca adegan dari pola ini; jangan ganti jadi `## SC002 …`). Dialog `Nama: kalimat` atau `Nama (arahan): kalimat`; `(VO)` untuk suara batin. Baris khusus: `[VO]`, `[OS]`, `[SFX] …`, `[TEKS] …` (teks di layar). Baris lain dianggap aksi. Tulis aksi singkat dan bisa difilmkan, termasuk jeda (`Hening. Boy menatap tumbler yang bocor.`).
- **Storyboard**: JSON array, satu objek per shot, field `id, scene, title, dur, scale, move, purpose, start, action, end, cast, sound, dialog`. `scale` salah satu dari `Wide | Medium | Medium close-up | Close-up | Ekstrem dekat | Insert layar`; `move` salah satu dari `Statis | Dorong pelan | Tarik mundur | Orbit pelan | Pan | Tilt | Handheld halus`. Kalau perintah dari dashboard memberi skema lain, ikuti perintah itu. Detail lensa, cahaya, dan blocking yang tidak punya field masuk ke `purpose`/`start`/`action`.
- **Prompt**: bahasa Inggris untuk model gambar/video, satu prompt per shot dengan gerak kamera terukur dan style anchor adegan yang sama persis di setiap shot (lihat referensi prompt).
- Sertakan **catatan sutradara** singkat (3–6 butir) di luar blok naskah/JSON: niat emosional adegan, di mana tawa diharapkan, dan motif visual yang dipakai. Ini membantu tim produksi menjaga rasa yang sama.

## Cek akhir

Jawab jujur sebelum menyerahkan; perbaiki yang gagal.

- Apakah 3 detik pertama memancing rasa ingin tahu **tanpa** kekerasan, teriakan, atau trik kaget?
- Bisakah setiap tokoh utama dijelaskan keinginannya di adegan ini dalam satu kalimat?
- Adakah minimal satu momen di mana emosi ditunjukkan lewat tindakan/diam, bukan diucapkan?
- Apakah lelucon tetap lucu kalau efek suaranya dihapus? (Kalau tidak, itu bukan lelucon karakter.)
- Apakah ada kalimat yang hanya menjelaskan hal yang sudah terlihat di gambar? Hapus.
- Apakah ritme shot bervariasi — ada yang diam lama, ada yang cepat — dan setiap gerak kamera punya alasan?
- Apakah cahaya punya sumber yang masuk akal dan palet sesuai suasana adegan?
- Apakah musik/OST ditahan sampai benar-benar dibutuhkan?
- Apakah pesan merek terasa lahir dari cerita, bukan iklan yang diselipkan?
- Apakah semua aturan merek/kepatuhan proyek terpenuhi?
- Apakah semua aturan di `references/selera-tim.md` dipatuhi, dan catatan revisi baru dari user sudah dicatat di sana?

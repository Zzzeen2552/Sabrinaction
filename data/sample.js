/* Proyek contoh: seri micro drama edukasi anti-penipuan bersama Sabrina.
   Semua isi bisa diubah dari dashboard; ini hanya titik awal. */
window.SASTORY_SAMPLE = {
  version: 1,
  project: {
    title: "Sabrina Siaga",
    logline: "Setiap episode, satu warga hampir tertipu modus kejahatan perbankan — dan satu pertanyaan ke Sabrina membalikkan keadaan dalam 60 detik.",
    goal: "Edukasi keamanan transaksi & kenalkan Sabrina sebagai tempat bertanya 24 jam",
    product: "Sabrina (asisten virtual BRI) · BRImo",
    audience: "Nasabah 35–60 th, pelaku UMKM, orang tua yang baru pakai mobile banking",
    platform: "TikTok · Instagram Reels · YouTube Shorts",
    aspect: "9:16",
    epSeconds: 60,
    epCount: 6,
    style: "stylized 3D animation, warm natural lighting, soft cinematic depth of field",
    tone: "Hangat, menegangkan di awal, lega dan lucu di akhir",
    cta: "Ragu? Tanya Sabrina dulu."
  },
  sabrina: {
    name: "Sabrina",
    fullName: "SABRINA — Smart BRI New Assistant",
    role: "Asisten virtual berbasis AI milik BRI (sejak 2018) yang melayani nasabah 24 jam lewat chat, termasuk WhatsApp: info layanan, cek saldo, simulasi KPR, cari ATM/kantor cabang terdekat, dan rekomendasi merchant promo.",
    verified: false,
    refImage: "",
    look: "BELUM DIVERIFIKASI — unggah gambar resmi Sabrina dari tim brand, lalu tulis ulang bagian ini. Placeholder sementara: perempuan muda Indonesia, ramah dan cerdas, rambut hitam sebahu, senyum tenang; berpendar lembut saat 'keluar' dari layar ponsel.",
    outfit: "Blazer biru tua dengan aksen oranye di kerah, kemeja putih, pin kecil bulat di dada tanpa tulisan.",
    lock: "Sabrina, a friendly young Indonesian woman virtual assistant with shoulder-length black hair and a calm smile, navy-blue blazer with an orange collar accent over a white blouse, soft blue holographic glow around her edges",
    voice: "Perempuan, 25-an, jernih, tempo sedang, hangat tapi tegas saat memperingatkan.",
    personality: "Sabar, sigap, tidak menggurui; menjelaskan dengan kalimat pendek; sesekali jenaka.",
    catchphrase: "Ragu? Tanya Sabrina dulu.",
    dos: [
      "Sabrina hanya menjawab lewat chat/percakapan yang dibuka pengguna",
      "Kemampuan yang ditampilkan sesuai layanan nyata: info produk, cek saldo, simulasi KPR, lokasi ATM/cabang, promo merchant",
      "Arahkan ke kanal resmi BRI untuk tindak lanjut",
      "Pesan keamanan: jangan bagikan PIN, OTP, password, CVV"
    ],
    donts: [
      "Sabrina menyadap telepon atau membaca SMS pengguna",
      "Sabrina meminta data rahasia dalam bentuk apa pun",
      "Menjanjikan hadiah, bunga, atau imbal hasil",
      "Menyebut nomor/tautan yang belum diverifikasi tim brand"
    ]
  },
  assets: [
    { id: "ratna", kind: "Karakter", tier: "utama", name: "Bu Ratna", desc: "58 th, pensiunan guru yang kini jualan kue dari rumah. Cekatan, gampang panik kalau soal uang.", lock: "Bu Ratna, a warm plump Indonesian woman in her late fifties, grey-streaked hair in a low bun, maroon batik house dress with a flour-dusted cream apron" },
    { id: "herman", kind: "Karakter", tier: "pendukung", name: "\"Pak Herman\" (penipu)", desc: "Hanya suara di telepon. Ramah berlebihan, lalu mendesak.", lock: "" },
    { id: "dimas", kind: "Karakter", tier: "pendukung", name: "Dimas", desc: "24 th, cucu Bu Ratna, pengemudi ojol. Muncul di EP002.", lock: "Dimas, a lean Indonesian man in his mid-twenties with a short undercut, green ride-hailing jacket over a black T-shirt" },
    { id: "warung", kind: "Lokasi", name: "Warung Kue Bu Ratna", desc: "Teras rumah yang jadi warung: etalase kaca berisi kue lapis & klepon, lantai tegel, rolling door terbuka, matahari pagi.", lock: "a small Indonesian home bakery stall on a front porch, glass display case of kue lapis and klepon, patterned tile floor, open rolling shutter, warm morning sun" },
    { id: "hp", kind: "Properti", name: "Ponsel Bu Ratna", desc: "Ponsel lama, casing flip merah muda, sudut layar retak.", lock: "an older smartphone in a pink flip case with a cracked top corner" },
    { id: "loyang", kind: "Properti", name: "Loyang & adonan", desc: "Loyang aluminium, adonan kue lapis setengah jadi.", lock: "an aluminium baking tray with half-layered kue lapis batter" }
  ],
  episodes: [
    {
      id: "EP001",
      title: "OTP Bukan Oleh-oleh",
      beats: {
        hook: "SMS: 'Rekening Anda akan DIBLOKIR hari ini.' Telepon langsung berdering.",
        setup: "Bu Ratna sedang membuat kue pesanan, tangan penuh tepung.",
        conflict: "\"Pak Herman dari bank\" mendesak Bu Ratna menyebutkan kode OTP agar rekening 'tidak diblokir'.",
        twist: "Bu Ratna menahan telepon dan bertanya ke Sabrina lewat chat — jawabannya tegas: bank tidak pernah meminta OTP.",
        message: "Jangan pernah bagikan OTP, PIN, atau password kepada siapa pun, termasuk yang mengaku petugas bank.",
        cta: "Ragu? Tanya Sabrina dulu.",
        cliff: "Ponsel berdering lagi: video call dari 'Dimas' — tapi suaranya bukan suara cucunya."
      },
      script: "## EP001-SC001 INT · Warung Kue Bu Ratna · Pagi\n\nPonsel merah muda bergetar di samping loyang. Layarnya menyala.\n\n[TEKS] SMS: Rekening Anda akan DIBLOKIR hari ini.\n\n[SFX] Nada dering lama, nyaring.\n\nBu Ratna mengelap tangan bertepung ke celemek, mengangkat telepon.\n\nBu Ratna: Halo?\n\n[OS] Pak Herman: Selamat pagi, Ibu Ratna. Saya Herman dari bank. Rekening Ibu terdeteksi bermasalah dan akan diblokir hari ini.\n\nBu Ratna (panik): Diblokir? Uang pesanan kue saya di situ semua, Pak!\n\n[SFX] Notifikasi SMS masuk.\n\n[OS] Pak Herman: Tenang, Bu. Saya kirim kode verifikasi. Tolong bacakan enam angkanya.\n\nBu Ratna menatap layar. Jarinya berhenti di atas angka-angka itu.\n\nBu Ratna (pelan): Empat... tujuh...\n\nIa berhenti. Menekan tombol bisu, lalu membuka chat Sabrina.\n\n[TEKS] Chat: Ada petugas bank minta kode OTP, saya kasih nggak?\n\nSabrina melangkah keluar dari cahaya layar, berdiri di samping etalase.\n\nSabrina: Jangan, Bu. Bank tidak pernah meminta OTP, PIN, atau password lewat telepon.\n\n[OS] Pak Herman: Bu? Bu Ratna? Cepat, Bu, waktunya tinggal satu menit!\n\nBu Ratna menegakkan punggung. Tatapannya berubah.\n\nBu Ratna (tegas): Maaf, Pak. Kata Sabrina, bank nggak pernah minta OTP.\n\nIa menutup telepon. Napasnya lepas. Sabrina mengedipkan sebelah mata.\n\n[TEKS] Ragu? Tanya Sabrina dulu.\n\n[SFX] Ponsel berdering lagi.\n\n[TEKS] Panggilan video: Dimas\n\n[OS] \"Dimas\": Nek, ini Dimas. HP-ku hilang, tolong transfer dulu ya...\n\nBu Ratna mengernyit. Itu bukan suara cucunya.\n",
      shots: [
        { id: "001", scene: "SC001", title: "Diblokir hari ini", dur: 3, scale: "Insert layar", move: "Statis", purpose: "Hook 3 detik: ancaman langsung terbaca.", start: "Ponsel merah muda tergeletak di samping loyang, layar menyala menampilkan SMS ancaman.", action: "Ponsel bergetar, adonan di loyang ikut bergetar halus.", end: "Getaran berhenti sesaat, layar masih menyala.", cast: ["hp", "loyang", "warung"], sound: "Nada dering lama, nyaring.", dialog: "", prod: { img: "jadi", vid: "jadi", vo: "-" } },
        { id: "002", scene: "SC001", title: "Tangan bertepung", dur: 4, scale: "Medium", move: "Dorong pelan", purpose: "Kenalkan Bu Ratna di dunianya.", start: "Bu Ratna di balik etalase, tangan bertepung, menoleh ke ponsel.", action: "Ia mengelap tangan ke celemek dan mengangkat telepon.", end: "Ponsel di telinga, alis sedikit terangkat.", cast: ["ratna", "warung", "hp"], sound: "Dering berhenti.", dialog: "Bu Ratna: Halo?", prod: { img: "jadi", vid: "jadi", vo: "jadi" } },
        { id: "003", scene: "SC001", title: "Pak Herman dari bank", dur: 6, scale: "Close-up", move: "Statis", purpose: "Ancaman masuk; wajah berubah panik.", start: "Wajah Bu Ratna tenang mendengarkan.", action: "Mendengar kata 'diblokir', matanya melebar, tangan kiri menekan dada.", end: "Wajah panik, bibir terbuka.", cast: ["ratna", "hp"], sound: "Suara penipu dari telepon, ramah berlebihan.", dialog: "Pak Herman (OS): Rekening Ibu terdeteksi bermasalah dan akan diblokir hari ini.", prod: { img: "jadi", vid: "antre", vo: "jadi" } },
        { id: "004", scene: "SC001", title: "Enam angka", dur: 3, scale: "Insert layar", move: "Statis", purpose: "Tunjukkan OTP sebagai benda berharga.", start: "Layar ponsel menampilkan SMS kode verifikasi 6 digit (disamarkan).", action: "Notifikasi meluncur turun.", end: "Kode terpampang, ibu jari Bu Ratna masuk dari bawah frame.", cast: ["hp"], sound: "Notifikasi SMS.", dialog: "", prod: { img: "antre", vid: "belum", vo: "-" } },
        { id: "005", scene: "SC001", title: "Empat... tujuh...", dur: 4, scale: "Medium close-up", move: "Dorong pelan", purpose: "Titik bahaya: hampir terlambat.", start: "Bu Ratna menatap layar, bibir mulai bergerak.", action: "Ia membaca dua angka, lalu terdiam ragu.", end: "Jari menggantung di atas layar.", cast: ["ratna", "hp", "warung"], sound: "Detak jam dinding menonjol.", dialog: "Bu Ratna: Empat... tujuh...", prod: { img: "antre", vid: "belum", vo: "belum" } },
        { id: "006", scene: "SC001", title: "Tanya Sabrina", dur: 5, scale: "Insert layar", move: "Statis", purpose: "Aksi kunci penonton: bertanya dulu.", start: "Layar menunjukkan tombol bisu ditekan.", action: "Bu Ratna membuka chat Sabrina dan mengetik pertanyaan.", end: "Pesan terkirim, indikator 'mengetik' muncul.", cast: ["hp"], sound: "Bunyi ketik ponsel.", dialog: "", prod: { img: "belum", vid: "belum", vo: "-" } },
        { id: "007", scene: "SC001", title: "Sabrina keluar dari layar", dur: 6, scale: "Medium", move: "Orbit pelan", purpose: "Momen hero Sabrina; pesan utama.", start: "Cahaya biru dari layar ponsel memenuhi warung.", action: "Sabrina melangkah keluar dari cahaya, berdiri di samping etalase, bicara menatap Bu Ratna.", end: "Sabrina tersenyum tenang, satu tangan terangkat memberi tanda 'stop'.", cast: ["sabrina", "ratna", "warung"], sound: "Denting lembut saat Sabrina muncul.", dialog: "Sabrina: Jangan, Bu. Bank tidak pernah meminta OTP, PIN, atau password lewat telepon.", prod: { img: "belum", vid: "belum", vo: "belum" } },
        { id: "008", scene: "SC001", title: "Waktunya satu menit", dur: 5, scale: "Close-up", move: "Statis", purpose: "Tekanan terakhir; balik arah emosi.", start: "Bu Ratna mendengar suara mendesak dari telepon.", action: "Ia menegakkan punggung; tatapan berubah dari panik jadi tegas.", end: "Rahang mengeras, pandangan lurus ke kamera.", cast: ["ratna", "hp"], sound: "Suara penipu mulai membentak.", dialog: "Pak Herman (OS): Cepat, Bu, waktunya tinggal satu menit!", prod: { img: "belum", vid: "belum", vo: "belum" } },
        { id: "009", scene: "SC001", title: "Kata Sabrina...", dur: 6, scale: "Medium close-up", move: "Statis", purpose: "Payoff: Bu Ratna menang.", start: "Bu Ratna mengangkat ponsel ke telinga.", action: "Ia mengucapkan penolakan, lalu menutup telepon dengan mantap.", end: "Ponsel turun ke meja, Bu Ratna menghembuskan napas.", cast: ["ratna", "hp", "warung"], sound: "Bunyi telepon ditutup.", dialog: "Bu Ratna: Maaf, Pak. Kata Sabrina, bank nggak pernah minta OTP.", prod: { img: "belum", vid: "belum", vo: "belum" } },
        { id: "010", scene: "SC001", title: "Kedipan", dur: 6, scale: "Wide", move: "Tarik mundur", purpose: "Lega + CTA.", start: "Bu Ratna dan Sabrina di warung yang terang.", action: "Sabrina mengedipkan sebelah mata; Bu Ratna tertawa kecil sambil kembali ke adonan.", end: "Komposisi lebar, ruang kosong di atas untuk teks CTA.", cast: ["sabrina", "ratna", "warung", "loyang"], sound: "Musik ringan naik.", dialog: "", prod: { img: "belum", vid: "belum", vo: "-" } },
        { id: "011", scene: "SC001", title: "\"Nek, ini Dimas\"", dur: 7, scale: "Close-up", move: "Dorong pelan", purpose: "Cliffhanger ke EP002.", start: "Ponsel berdering lagi di meja; layar menampilkan panggilan video.", action: "Bu Ratna mengangkat, mendengar, lalu mengernyit curiga.", end: "Wajah Bu Ratna mengeras, freeze.", cast: ["ratna", "hp"], sound: "Dering; musik berhenti mendadak.", dialog: "\"Dimas\" (OS): Nek, ini Dimas. HP-ku hilang, tolong transfer dulu ya...", prod: { img: "belum", vid: "belum", vo: "belum" } }
      ],
      review: { checks: { hook: true, sabrinaRole: true }, notes: "" }
    },
    {
      id: "EP002",
      title: "Cucu Palsu",
      beats: {
        hook: "Video call 'Dimas' dengan layar gelap: \"Nek, tolong transfer dulu ya...\"",
        setup: "Bu Ratna baru saja lolos dari penipu OTP.",
        conflict: "Penipu menyamar sebagai cucu, minta transfer darurat ke rekening 'teman'.",
        twist: "Bu Ratna tanya Sabrina cara memastikan; Sabrina menyarankan menelepon nomor Dimas yang tersimpan. Dimas asli sedang narik ojol, HP-nya aman.",
        message: "Verifikasi permintaan uang lewat kanal lain sebelum transfer.",
        cta: "Ragu? Tanya Sabrina dulu.",
        cliff: "Dimas pulang membawa kabar: ia 'menang undian' dari pesan WhatsApp."
      },
      script: "",
      shots: [],
      review: { checks: {}, notes: "" }
    },
    {
      id: "EP003",
      title: "Undian Berhadiah",
      beats: {
        hook: "Dimas teriak: \"Nek! Aku menang motor!\"",
        setup: "Pesan WhatsApp berisi tautan klaim hadiah dan formulir data.",
        conflict: "Formulir meminta nomor kartu dan PIN untuk 'biaya administrasi'.",
        twist: "",
        message: "Waspadai undian yang meminta data kartu, PIN, atau transfer biaya.",
        cta: "Ragu? Tanya Sabrina dulu.",
        cliff: ""
      },
      script: "",
      shots: [],
      review: { checks: {}, notes: "" }
    }
  ]
};

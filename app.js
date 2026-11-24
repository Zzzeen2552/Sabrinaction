/* SABRINACTION — dashboard tanpa dependensi.
   Alur mengikuti zenstory-ai/drama-skills:
   develop → write → assets → image/storyboard → video prompts → produce → edit → review. */
(() => {
  "use strict";

  const KEY = "sastory.v1";
  const BEATS = [
    ["hook", "Hook 3 detik", "Gambar/kalimat pertama yang bikin jempol berhenti."],
    ["setup", "Situasi", "Siapa, di mana, sedang apa."],
    ["conflict", "Konflik / modus", "Tekanan yang datang — modus penipuan atau masalah finansial."],
    ["twist", "Titik balik (Sabrina)", "Momen tokoh bertanya ke Sabrina dan keadaan berbalik."],
    ["message", "Pesan edukasi", "Satu kalimat yang harus diingat penonton."],
    ["cta", "CTA", "Ajakan di akhir episode."],
    ["cliff", "Cliffhanger", "Pengait ke episode berikutnya."]
  ];
  const SCALES = ["Wide", "Medium", "Medium close-up", "Close-up", "Ekstrem dekat", "Insert layar"];
  const SCALE_EN = { "Wide": "wide shot", "Medium": "medium shot", "Medium close-up": "medium close-up", "Close-up": "close-up", "Ekstrem dekat": "extreme close-up", "Insert layar": "insert close-up of a phone screen" };
  const CLOSE = new Set(["Close-up", "Ekstrem dekat", "Insert layar"]);
  const MOVES = ["Statis", "Dorong pelan", "Tarik mundur", "Orbit pelan", "Pan", "Tilt", "Handheld halus"];
  const MOVE_EN = { "Statis": "static camera", "Dorong pelan": "slow push-in", "Tarik mundur": "slow pull-back", "Orbit pelan": "slow orbit around the subject", "Pan": "smooth pan", "Tilt": "smooth tilt", "Handheld halus": "subtle handheld" };
  const PROD_KEYS = [["img", "Gambar"], ["vid", "Video"], ["vo", "Suara"]];
  const PROD_CYCLE = ["belum", "antre", "jadi", "-"];
  const STAGES = [
    ["naskah", "Cerita & Naskah"], ["storyboard", "Storyboard"],
    ["prompt", "Prompt"], ["produksi", "Produksi"], ["review", "Review"]
  ];

  // ---------- ikon (garis 1.7px, gaya editor) ----------
  const P = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/><path d="M8 7h7M8 11h5"/>',
    text: '<path d="M5 6V4h14v2"/><path d="M12 4v16"/><path d="M9 20h6"/>',
    film: '<rect x="3" y="5" width="15" height="14" rx="2"/><path d="m18 10 4-2.5v9L18 14"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="m6 6 2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    rec: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    export: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 17v3h16v-3"/>',
    music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    prev: '<path d="M6 5v14"/><path d="M19 5 9 12l10 7z" fill="currentColor"/>',
    next: '<path d="M18 5v14"/><path d="M5 5l10 7-10 7z" fill="currentColor"/>',
    play: '<path d="M7 4.5v15l12-7.5z" fill="currentColor"/>',
    pause: '<rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>'
  };
  const ico = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;

  // ---------- state ----------
  const clone = (o) => JSON.parse(JSON.stringify(o));
  let S;
  try { S = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { S = null; }
  // Proyek aktif = proyek lokal dari deck (bila file-nya ada). Browser yang masih menyimpan proyek contoh lama
  // dipindahkan sekali secara otomatis; proyek lama disimpan sebagai "proyek sebelumnya".
  (() => {
    const MB = window.SASTORY_TEMPLATES && window.SASTORY_TEMPLATES["mentor-boy"];
    let done = false;
    try { done = !!localStorage.getItem(KEY + ".mb-init"); } catch (e) {}
    if (MB && !done && (!S || !S.project || !S.templateId)) {
      try { if (S && S.project) localStorage.setItem(KEY + ".prev", JSON.stringify(S)); } catch (e) {}
      S = clone(MB);
      try { localStorage.setItem(KEY + ".mb-init", "1"); localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
    }
  })();
  if (!S || !S.project) S = clone((window.SASTORY_TEMPLATES || {})["mentor-boy"] || window.SASTORY_SAMPLE);
  let saveT;
  const save = () => {
    clearTimeout(saveT);
    saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage penuh/diblokir */ } }, 250);
  };
  let theme = "light";
  try { theme = localStorage.getItem(KEY + ".theme") || "dark"; } catch (e) { theme = "dark"; }
  document.documentElement.dataset.theme = theme;

  // ---------- helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const sum = (a, f) => a.reduce((t, x) => t + (f ? f(x) : x), 0);
  const fmtSec = (s) => { s = Math.round(s); return s >= 60 ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : `${s} dtk`; };
  const words = (t) => (String(t || "").trim().match(/\S+/g) || []).length;
  const toast = (msg) => { const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => (t.hidden = true), 1800); };
  const copy = async (text, msg = "Disalin ke clipboard") => {
    try { await navigator.clipboard.writeText(text); }
    catch (e) { const ta = document.createElement("textarea"); ta.value = text; document.body.append(ta); ta.select(); document.execCommand("copy"); ta.remove(); }
    toast(msg);
  };
  const download = (name, text, type = "text/markdown") => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: type + ";charset=utf-8" }));
    a.download = name; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  const epById = (id) => S.episodes.find((e) => e.id === id);
  const assetById = (id) => id === "sabrina" ? { id: "sabrina", kind: "Karakter", name: S.sabrina.name, lock: S.sabrina.lock, desc: S.sabrina.role } : S.assets.find((a) => a.id === id);
  const allCast = () => [assetById("sabrina"), ...S.assets];
  const ensureEp = (ep) => {
    ep.beats = ep.beats || {}; ep.shots = ep.shots || []; ep.script = ep.script || "";
    ep.review = ep.review || { checks: {}, notes: "" }; ep.review.checks = ep.review.checks || {};
    ep.shots.forEach((s) => { s.cast = s.cast || []; s.prod = s.prod || { img: "belum", vid: "belum", vo: "belum" }; if (!s.uid) s.uid = Math.random().toString(36).slice(2, 10); });
    return ep;
  };
  S.episodes.forEach(ensureEp);
  // migrasi data lama: field baru Sabrina + ganti placeholder lama dengan versi bertanda "belum diverifikasi"
  (() => {
    const fresh = window.SASTORY_SAMPLE.sabrina, s = S.sabrina;
    if (s.verified == null) s.verified = false;
    if (s.refImage == null) s.refImage = "";
    if (!s.fullName) s.fullName = fresh.fullName;
    if (/^Asisten virtual BRI — tempat bertanya/.test(s.role)) s.role = fresh.role;
    if (/^Perempuan muda Indonesia, ramah dan cerdas/.test(s.look)) s.look = fresh.look;
    if (!S.templateId && !s.dos.some((d) => /layanan nyata/.test(d))) s.dos.splice(1, 0, fresh.dos[1]);
    if (!s.sheets) s.sheets = [];
    S.assets.forEach((a) => {
      if (a.kind === "Karakter" && !a.tier) { const f = window.SASTORY_SAMPLE.assets.find((x) => x.id === a.id); a.tier = (f && f.tier) || "pendukung"; }
      if (!a.sheets) a.sheets = [];
    });
  })();

  // ---------- media per shot (IndexedDB; terlalu besar untuk localStorage) ----------
  // kunci: "<epId>|<uid shot>|img" (first frame) atau "...|vid" (klip hasil generate)
  const MEDIA = new Map(); // kunci -> { url, type, name, size }
  let mediaDB = null;
  const mkey = (ep, s, kind) => `${ep.id}|${s.uid}|${kind}`;
  const media = (ep, s, kind) => (s && s.uid ? MEDIA.get(mkey(ep, s, kind)) : null);
  function openMediaDB() {
    return new Promise((res) => {
      try {
        const rq = indexedDB.open("sastory-media", 1);
        rq.onupgradeneeded = () => rq.result.createObjectStore("media");
        rq.onsuccess = () => res(rq.result);
        rq.onerror = () => res(null);
      } catch (e) { res(null); }
    });
  }
  const idb = (mode, fn) => new Promise((res, rej) => {
    if (!mediaDB) return rej(new Error("penyimpanan media tidak tersedia di browser ini"));
    const tx = mediaDB.transaction("media", mode); const st = tx.objectStore("media");
    const out = fn(st); tx.oncomplete = () => res(out && out.result); tx.onerror = () => rej(tx.error);
  });
  async function loadMedia() {
    mediaDB = await openMediaDB(); if (!mediaDB) return;
    const keys = await idb("readonly", (st) => st.getAllKeys());
    const vals = await idb("readonly", (st) => st.getAll());
    (keys || []).forEach((k, i) => { const b = vals[i]; if (b) MEDIA.set(k, { url: URL.createObjectURL(b), type: b.type, name: b.name || "", size: b.size }); });
  }
  async function putMedia(ep, s, kind, blob) {
    const k = mkey(ep, s, kind);
    await idb("readwrite", (st) => st.put(blob, k));
    const old = MEDIA.get(k); if (old) URL.revokeObjectURL(old.url);
    MEDIA.set(k, { url: URL.createObjectURL(blob), type: blob.type, name: blob.name || "", size: blob.size });
  }
  async function delMedia(ep, s, kind) {
    const k = mkey(ep, s, kind);
    try { await idb("readwrite", (st) => st.delete(k)); } catch (e) {}
    const old = MEDIA.get(k); if (old) URL.revokeObjectURL(old.url);
    MEDIA.delete(k);
  }
  function shrinkImage(file, max = 1280) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => {
        const k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(img.src);
        c.toBlob((b) => (b ? res(b) : rej(new Error("gagal mengompres"))), "image/jpeg", 0.88);
      };
      img.onerror = () => rej(new Error("gambar tidak bisa dibaca"));
      img.src = URL.createObjectURL(file);
    });
  }
  async function attachMedia(ep, s, file) {
    const isVid = /^video\//.test(file.type), isImg = /^image\//.test(file.type);
    if (!isVid && !isImg) return toast("Format tidak didukung — pakai gambar atau video");
    try {
      if (isImg) { const b = await shrinkImage(file); await putMedia(ep, s, "img", new File([b], file.name.replace(/.[^.]+$/, "") + ".jpg", { type: "image/jpeg" })); s.prod.img = "jadi"; }
      else { await putMedia(ep, s, "vid", file); s.prod.vid = "jadi"; }
      save(); toast(`${isImg ? "First frame" : "Video"} shot ${s.id} disimpan`);
    } catch (err) { toast("Gagal menyimpan: " + err.message); }
    renderChrome(route()); if ($("#ed-preview")) refreshEditor(true); else render();
  }
  const fmtSize = (b) => b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`;

  // ---------- character sheet / referensi per aset ----------
  // metadata (label, nama file) di S; gambarnya di IndexedDB dengan kunci "asset|<id>|<acak>"
  // pemilik galeri: id aset ("sabrina", "ratna", …) atau KV adegan "kv:<epId>:<scene>"
  function ownerInfo(id) {
    if (String(id).startsWith("kv:") && id.endsWith(":_")) { const e = id.split(":")[1]; return { id, name: `${e} · KV belum dipetakan`, sub: "", kind: "KV", file: `${e}-KV` }; }
    if (String(id).startsWith("kv:")) { const [, e, sc] = id.split(":"); const h = (scenesOf(epById(e)).find((x) => x.sc === sc) || {}).heading; return { id, name: `${e} · ${sc}`, sub: h || "", kind: "KV", file: `${e}-${sc}-KV` }; }
    const a = assetById(id); return a ? { id, name: a.name, sub: "", kind: a.kind, file: a.id } : null;
  }
  const kvId = (ep, sc) => `kv:${ep.id}:${sc}`;
  function sheetsOf(id) {
    if (String(id).startsWith("kv:")) {
      const [, e, sc] = id.split(":"); const ep = epById(e); if (!ep) return [];
      ep.kv = ep.kv || {}; return (ep.kv[sc] = ep.kv[sc] || []);
    }
    if (id === "sabrina") return (S.sabrina.sheets = S.sabrina.sheets || []);
    const a = S.assets.find((x) => x.id === id);
    return a ? (a.sheets = a.sheets || []) : [];
  }
  const sheetLabelDefault = (kind, n) => (kind === "KV" ? ["Key visual", "Alternatif", "Mood & lighting", "Blocking"] : kind === "Karakter" ? ["Depan · samping · belakang", "Ekspresi", "Kostum detail", "Close-up wajah"] : kind === "Lokasi" ? ["Plate lokasi", "Sudut lain", "Malam"] : ["Sheet properti", "Detail"])[n] || `Referensi ${n + 1}`;
  async function addSheets(id, files, quiet) {
    const imgs = [...files].filter((f) => /^image\//.test(f.type));
    if (!imgs.length) return quiet ? 0 : toast("Pilih file gambar (JPG/PNG/WebP)");
    const a = ownerInfo(id); const list = sheetsOf(id);
    let ok = 0;
    for (const f of imgs) {
      try {
        const b = await shrinkImage(f, 2048); // sheet butuh detail, jadi batasnya lebih besar
        const key = `${a && a.kind === "KV" ? "kv" : "asset"}|${id}|${Math.random().toString(36).slice(2, 10)}`;
        const file = new File([b], f.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
        await idb("readwrite", (st) => st.put(file, key));
        MEDIA.set(key, { url: URL.createObjectURL(file), type: file.type, name: file.name, size: file.size });
        list.push({ key, label: sheetLabelDefault(a ? a.kind : "Karakter", list.length), name: file.name });
        ok++;
      } catch (err) { toast("Gagal menyimpan: " + err.message); }
    }
    save(); if (quiet) return ok;
    render(); if (ok) toast(`${ok} ${a && a.kind === "KV" ? "KV" : "referensi"} ditambahkan ke ${a ? a.name : id}`);
    return ok;
  }
  async function removeSheet(id, key) {
    const list = sheetsOf(id); const i = list.findIndex((x) => x.key === key); if (i < 0) return;
    list.splice(i, 1); save();
    try { await idb("readwrite", (st) => st.delete(key)); } catch (e) {}
    const m = MEDIA.get(key); if (m) URL.revokeObjectURL(m.url); MEDIA.delete(key);
    render();
  }
  // gambar referensi: dari IndexedDB (unggahan) atau dari file di folder proyek (src, mis. data/deck/…)
  const shMedia = (sh) => MEDIA.get(sh.key) || (sh.src ? { url: sh.src, name: sh.name || sh.src.split("/").pop(), size: 0, file: true } : null);
  const firstSheet = (id) => { const sh = sheetsOf(id).find((x) => shMedia(x)); return sh ? shMedia(sh).url : (id === "sabrina" && S.sabrina.refImage) || ""; };
  const castChip = (id, cls = "") => {
    const a = assetById(id); if (!a) return "";
    const u = a.kind === "Karakter" ? firstSheet(id) : "";
    return `<span class="chip ${cls}">${u ? `<img class="mini" src="${u}" alt="">` : ""}${esc(a.name)}</span>`;
  };
  function sheetGallery(id, variant) {
    const compact = variant === true; const big = variant === "big";
    const a = ownerInfo(id); if (!a) return "";
    const list = sheetsOf(id);
    const what = a.kind === "KV" ? "KV adegan" : a.kind === "Karakter" ? "character sheet" : a.kind === "Lokasi" ? "plate lokasi" : "sheet properti";
    return `<div class="sheets ${compact ? "compact" : ""} ${big ? "big" : ""} ${a.kind === "KV" ? "kv" : ""}" data-sheet-drop="${esc(id)}">
      ${list.map((sh) => { const m = shMedia(sh); return `<figure class="sheet ${m ? "" : "missing"}">
        <button class="sheet-img" data-act="sheet-view" data-id="${esc(id)}" data-key="${esc(sh.key)}" title="Lihat besar">${m ? `<img src="${m.url}" alt="${esc(sh.label)}">` : `<span>File tidak ada di browser ini</span>`}</button>
        <figcaption><input type="text" data-sheet-label="${esc(id)}" data-key="${esc(sh.key)}" value="${esc(sh.label)}" aria-label="Label referensi"><button class="x" data-act="sheet-del" data-id="${esc(id)}" data-key="${esc(sh.key)}" title="Hapus">✕</button></figcaption>
      </figure>`; }).join("")}
      <label class="sheet-add" title="Unggah atau seret gambar ke sini"><input type="file" accept="image/*" multiple data-act="sheet-upload" data-id="${esc(id)}" hidden><b>+</b><span>${list.length ? "Tambah" : `Unggah ${what}`}</span><small>atau seret gambar ke sini</small></label>
    </div>`;
  }
  function openSheetViewer(id, key) {
    const list = sheetsOf(id).filter((x) => shMedia(x)); const i = list.findIndex((x) => x.key === key);
    if (i < 0) return;
    const sh = list[i], m = shMedia(sh), a = ownerInfo(id);
    const d = $("#drawer");
    d.innerHTML = `<div class="viewer" role="dialog" aria-label="Referensi ${esc(a.name)}">
      <div class="viewer-head"><div><b>${esc(a.name)}</b>${a.sub ? ` <small>${esc(a.sub)}</small>` : ""} · ${esc(sh.label)} <small>${esc(m.name)}${m.size ? " · " + fmtSize(m.size) : m.file ? " · file proyek" : ""} · ${i + 1}/${list.length}</small></div>
        <div class="row"><button class="btn sm" data-act="sheet-view" data-id="${esc(id)}" data-key="${esc(list[(i - 1 + list.length) % list.length].key)}" ${list.length > 1 ? "" : "disabled"}>←</button><button class="btn sm" data-act="sheet-view" data-id="${esc(id)}" data-key="${esc(list[(i + 1) % list.length].key)}" ${list.length > 1 ? "" : "disabled"}>→</button><a class="btn sm" href="${m.url}" download="${esc(a.file)}-${esc(sh.label.replace(/\W+/g, "-"))}.jpg">⇩ Unduh</a><button class="btn sm" data-act="drawer-close">Tutup ✕</button></div></div>
      <img src="${m.url}" alt="${esc(sh.label)}">
    </div>`;
    d.classList.add("dark"); d.hidden = false;
  }
  // daftar adegan episode: dari judul adegan di naskah, lalu adegan yang dipakai shot
  function scenesOf(ep) {
    if (!ep) return [];
    const out = []; const seen = new Set();
    String(ep.script || "").split(/\r?\n/).forEach((l) => {
      const m = l.match(/^#{1,3}\s+(.*)$/); if (!m) return;
      const sc = (m[1].match(/(SC\d+)/i) || [])[1]; if (!sc || seen.has(sc.toUpperCase())) return;
      seen.add(sc.toUpperCase()); out.push({ sc: sc.toUpperCase(), heading: m[1].replace(/^\S*SC\d+\s*/i, "").trim() });
    });
    (ep.shots || []).forEach((s) => { if (s.scene && !seen.has(s.scene)) { seen.add(s.scene); out.push({ sc: s.scene, heading: "" }); } });
    return out;
  }
  const kvFirst = (ep, sc) => { const sh = sheetsOf(kvId(ep, sc)).find((x) => shMedia(x)); return sh ? shMedia(sh).url : ""; };
  const kvNames = (ep, sc) => sheetsOf(kvId(ep, sc)).map((x) => `${x.label} (${x.name || "gambar"})`);

  // ---------- suara acuan per tokoh ----------
  // Satu contoh suara (10–20 dtk, satu sumber tetap) per tokoh; filenya di IndexedDB "voice|<id>|<acak>".
  const voiceOwner = (id) => (id === "sabrina" ? S.sabrina : S.assets.find((x) => x.id === id && x.kind === "Karakter"));
  const voiceMedia = (id) => { const o = voiceOwner(id); return o && o.voiceRef ? MEDIA.get(o.voiceRef.key) : null; };
  const voiceFile = (id) => { const o = voiceOwner(id); const ext = ((o && o.voiceRef && o.voiceRef.name) || "").match(/\.(\w+)$/); return `voice-${id}.${ext ? ext[1].toLowerCase() : "mp3"}`; };
  async function setVoice(id, f) {
    const o = voiceOwner(id); if (!o || !f) return;
    if (!/^audio\//.test(f.type) && !/\.(mp3|wav|m4a|ogg)$/i.test(f.name)) return toast("Pilih file audio (MP3/WAV)");
    if (f.size > 20 * 1048576) return toast("Maksimal 20 MB (batas slot audio RunningHub)");
    const key = `voice|${id}|${Math.random().toString(36).slice(2, 10)}`;
    try {
      await idb("readwrite", (st) => st.put(f, key));
      if (o.voiceRef) await delVoice(id, true);
      MEDIA.set(key, { url: URL.createObjectURL(f), type: f.type, name: f.name, size: f.size });
      o.voiceRef = { key, name: f.name }; save(); render(); toast(`Suara acuan ${id === "sabrina" ? S.sabrina.name : o.name} disimpan`);
    } catch (e) { toast("Gagal menyimpan suara: " + e.message); }
  }
  async function delVoice(id, quiet) {
    const o = voiceOwner(id); if (!o || !o.voiceRef) return; const key = o.voiceRef.key;
    try { await idb("readwrite", (st) => st.delete(key)); } catch (e) {}
    const m = MEDIA.get(key); if (m) URL.revokeObjectURL(m.url); MEDIA.delete(key);
    if (!quiet) { delete o.voiceRef; save(); render(); }
  }
  function voiceBlock(id) {
    const o = voiceOwner(id); if (!o) return ""; const v = o.voiceRef; const m = voiceMedia(id);
    return `<div class="voice-ref">${m ? `<audio controls preload="none" src="${m.url}"></audio><small class="muted">${esc(v.name)}${m.size ? " · " + fmtSize(m.size) : ""}</small><a class="btn sm" href="${m.url}" download="${esc(voiceFile(id))}" title="Unduh untuk diunggah ke slot audio">⇩</a><button class="btn sm danger" data-act="voice-del" data-id="${esc(id)}">Hapus</button>` : v ? `<small class="muted">File suara tidak ada di browser ini — unggah lagi.</small>` : `<small class="muted">Belum ada. Tanpa acuan, suara dikarang ulang di setiap generate.</small>`}<label class="btn sm">⇧ ${v ? "Ganti" : "Unggah"} suara<input type="file" accept="audio/*,.mp3,.wav" data-act="voice-upload" data-id="${esc(id)}" hidden></label></div>`;
  }
  // tokoh yang berbicara di sebuah shot (dari baris dialog "Nama: …")
  function speakersOf(s) {
    const cands = [["sabrina", S.sabrina.name], ...S.assets.filter((a) => a.kind === "Karakter").map((a) => [a.id, a.name])];
    const lines = String(s.dialog || "").split(/\n/).map((l) => l.replace(/^\[(VO|OS)\]\s*/i, "").toLowerCase());
    return cands.filter(([, n]) => { const w = String(n).split(/\s|\(/)[0].toLowerCase(); return w && lines.some((l) => l.startsWith(w)); }).map(([id]) => id);
  }

  // ---------- KV massal & setting dari KV ----------
  // Unggah banyak KV sekaligus: dipetakan ke adegan dari nama file (…SC002…); sisanya masuk kotak "belum dipetakan" (kv:<ep>:_).
  const KV_INBOX = "_";
  async function addKvBulk(ep, files) {
    const byNum = {}; scenesOf(ep).forEach((x) => { byNum[+x.sc.replace(/\D/g, "")] = x.sc; });
    const groups = {};
    [...files].filter((f) => /^image\//.test(f.type)).forEach((f) => {
      const n = (f.name.match(/SC[\s_-]*0*(\d+)/i) || [])[1];
      const sc = n && byNum[+n] ? byNum[+n] : KV_INBOX; (groups[sc] = groups[sc] || []).push(f);
    });
    if (!Object.keys(groups).length) return toast("Pilih file gambar (JPG/PNG/WebP)");
    toast("Menyimpan KV…");
    let ok = 0, inbox = 0;
    for (const sc of Object.keys(groups)) { const n = await addSheets(kvId(ep, sc), groups[sc], true); ok += n; if (sc === KV_INBOX) inbox += n; }
    kvOpen = true; render();
    toast(`${ok} KV ditambahkan · ${ok - inbox} langsung ke adegan${inbox ? ` · ${inbox} perlu dipilih adegannya` : ""}`);
  }
  function moveKv(ep, from, to, key) {
    const a = sheetsOf(kvId(ep, from)); const i = a.findIndex((x) => x.key === key); if (i < 0 || !to) return;
    const [sh] = a.splice(i, 1); const b = sheetsOf(kvId(ep, to)); sh.label = sheetLabelDefault("KV", b.length); b.push(sh);
    save(); render(); toast(`KV dipindah ke ${to}`);
  }
  function kvInbox(ep) {
    const id = kvId(ep, KV_INBOX); const list = sheetsOf(id); if (!list.length) return "";
    const sc = scenesOf(ep);
    return `<div class="kv-inbox"><div class="kv-h"><b>Belum dipetakan</b><span>Nama file tanpa nomor adegan. Pilih adegan untuk tiap KV (atau beri nama file seperti <code>SC002-meja.jpg</code>).</span><small>${list.length} gambar</small></div>
      <div class="kv-inbox-list">${list.map((sh) => { const m = shMedia(sh); return `<figure class="sheet">
        <button class="sheet-img" data-act="sheet-view" data-id="${esc(id)}" data-key="${esc(sh.key)}" title="${esc(sh.name || "")}">${m ? `<img src="${m.url}" alt="">` : "<span>File tidak ada</span>"}</button>
        <figcaption><select data-kv-move="${esc(sh.key)}" aria-label="Pindahkan ke adegan"><option value="">Adegan…</option>${sc.map((x) => `<option value="${esc(x.sc)}">${esc(x.sc)} ${esc(x.heading.slice(0, 28))}</option>`).join("")}</select><button class="x" data-act="sheet-del" data-id="${esc(id)}" data-key="${esc(sh.key)}" title="Hapus">✕</button></figcaption></figure>`; }).join("")}</div></div>`;
  }
  // Lokasi ↔ adegan: cocok bila kata penting nama lokasi muncul di judul adegan (mis. "Banking Hall BRI" ↔ "INT · Banking Hall BRI · Pagi").
  const LOC_STOP = new Set(["int", "ext", "pagi", "siang", "sore", "malam", "dan", "the", "montase", "lanjutan", "flashback"]);
  const locWords = (s) => String(s || "").toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !LOC_STOP.has(w));
  const locMatch = (a, heading) => { const t = locWords(a.name); const h = new Set(locWords(heading)); return t.length > 0 && t.filter((w) => h.has(w)).length >= Math.min(2, t.length); };
  function kvForLocation(a) {
    const out = [];
    S.episodes.forEach((ep) => scenesOf(ep).forEach((x) => {
      if (!locMatch(a, x.heading)) return;
      const sheets = sheetsOf(kvId(ep, x.sc)).filter((sh) => shMedia(sh));
      out.push({ ep, sc: x.sc, heading: x.heading, sheets });
    }));
    return out;
  }
  const settingAuto = (a) => a && a.kind === "Lokasi" && a.settingMode === "auto";
  async function exportKvZip(assetId) {
    const locs = assetId ? [assetById(assetId)].filter(Boolean) : S.assets.filter(settingAuto);
    const files = [];
    for (const a of locs) for (const g of kvForLocation(a)) for (const [i, sh] of g.sheets.entries()) {
      try { files.push({ name: `kv-setting/${a.id}/${g.ep.id}-${g.sc}-${i + 1}.jpg`, data: await fetchBytes(shMedia(sh).url) }); } catch (e) {}
    }
    if (!files.length) return toast(assetId ? "Belum ada KV dari adegan yang cocok dengan lokasi ini" : "Belum ada KV untuk lokasi mode otomatis");
    const el = document.createElement("a"); el.href = URL.createObjectURL(makeZip(files)); el.download = `kv-setting${assetId ? "-" + assetId : ""}.zip`;
    document.body.append(el); el.click(); el.remove(); setTimeout(() => URL.revokeObjectURL(el.href), 4000);
    toast(`${files.length} KV dikemas · ekstrak ZIP-nya di folder kerja agen`);
  }

  // ---------- parsing & derived data ----------
  const DLG_RE = /^([^:\[\]#]{1,40}?)\s*(?:\(([^)]*)\))?\s*:\s+(.+)$/;
  function parseScript(src) {
    const blocks = [];
    String(src || "").split(/\r?\n/).forEach((raw, ln) => {
      const n0 = blocks.length;
      parseLine(raw);
      if (blocks.length > n0) blocks[blocks.length - 1].ln = ln; // baris sumber, untuk edit dari pratinjau
    });
    return blocks;
    function parseLine(raw) {
      const line = raw.trim();
      if (!line) return;
      let m;
      if ((m = line.match(/^#{1,3}\s+(.*)$/))) return blocks.push({ t: "sh", text: m[1] });
      if ((m = line.match(/^\[(OS|VO)\]\s*(.*)$/i))) {
        const d = m[2].match(DLG_RE);
        return blocks.push({ t: "dlg", tag: m[1].toUpperCase(), who: d ? d[1].trim() : "", paren: d ? d[2] || "" : "", text: d ? d[3] : m[2] });
      }
      if ((m = line.match(/^\[(TEKS|SFX)\]\s*(.*)$/i))) return blocks.push({ t: m[1].toLowerCase(), text: m[2] });
      if ((m = line.match(DLG_RE)) && !/[.!?]$/.test(m[1])) return blocks.push({ t: "dlg", tag: "", who: m[1].trim(), paren: m[2] || "", text: m[3] });
      blocks.push({ t: "act", text: line });
    }
  }
  function scriptStats(ep) {
    const b = parseScript(ep.script);
    const dl = b.filter((x) => x.t === "dlg");
    const w = sum(dl, (x) => words(x.text));
    return {
      blocks: b,
      scenes: b.filter((x) => x.t === "sh").length,
      lines: dl.length,
      speakers: [...new Set(dl.map((x) => x.who).filter(Boolean))],
      dialogSec: w / 2.5 + dl.length * 0.4, // ±2,5 kata/detik untuk bahasa Indonesia, plus jeda
      hasSabrina: dl.some((x) => x.who.toLowerCase().includes(S.sabrina.name.toLowerCase()))
    };
  }
  const avgLimit = () => ((+S.project.epSeconds || 60) > 120 ? 8 : 5);
  const shotSec = (ep) => sum(ep.shots, (s) => +s.dur || 0);
  const scaleIdx = (s) => { const i = SCALES.indexOf(s); return i < 0 ? 0 : i + 1; };
  function splitDialog(d) {
    const m = String(d || "").match(/^([^:]{1,40}?)\s*(?:\(([^)]*)\))?\s*:\s*(.+)$/);
    return m ? { who: m[1].replace(/"/g, "").trim(), paren: m[2] || "", text: m[3] } : { who: "", paren: "", text: d || "" };
  }
  function lockParts(shot) {
    const cast = (shot.cast || []).map(assetById).filter(Boolean);
    return {
      loc: cast.filter((a) => a.kind === "Lokasi" && a.lock).map((a) => a.lock),
      chars: cast.filter((a) => a.kind === "Karakter" && a.lock).map((a) => a.lock),
      props: cast.filter((a) => a.kind === "Properti" && a.lock).map((a) => a.lock)
    };
  }
  // frasa wajib di setiap prompt gambar/video (permintaan tim, 2026-11-24)
  const PHOTO_LOCK = "Photoreal, natural skin texture, shot on 35mm film.";
  function firstFramePrompt(shot) {
    if (shot.ff) return shot.ff;
    const p = lockParts(shot);
    const out = [`${S.project.aspect} vertical ${SCALE_EN[shot.scale] || "shot"}.`];
    if (p.loc.length) out.push(`Setting: ${p.loc.join("; ")}.`);
    if (p.chars.length) out.push(`Characters: ${p.chars.join("; ")}.`);
    if (p.props.length) out.push(`Props: ${p.props.join("; ")}.`);
    out.push(`Opening frame: ${shot.start || "(isi titik awal shot)"}`.replace(/\.?$/, "."));
    if (shot.scale === "Insert layar") out.push("Keep the phone screen content plain and blank for a post-production overlay.");
    out.push(`${PHOTO_LOCK} Style: ${S.project.style}. No text, no logo, no watermark.`);
    return out.join(" ");
  }
  function videoPrompt(shot) {
    if (shot.mv) return shot.mv;
    const p = lockParts(shot);
    const out = [];
    const who = [...p.chars, ...p.loc].join("; ");
    out.push(`${S.project.aspect} vertical ${SCALE_EN[shot.scale] || "shot"}${who ? ` — ${who}` : ""}.`);
    out.push(`Start: ${shot.start || "-"}`.replace(/\.?$/, "."));
    out.push(`Action: ${shot.action || "-"}`.replace(/\.?$/, "."));
    out.push(`Camera: ${MOVE_EN[shot.move] || "static camera"}.`);
    if (shot.dialog) {
      const d = splitDialog(shot.dialog);
      const off = /OS|telepon/i.test(d.paren) || /OS/.test(shot.dialog);
      if (/\bVO\b/.test(d.paren)) out.push(`Voice-over narration by ${d.who} in Indonesian (no lip movement): "${d.text}"`);
      else out.push(off
        ? `An off-screen voice (${d.who}) from the phone says in Indonesian: "${d.text}"`
        : `${d.who} says in Indonesian${d.paren ? ` (${d.paren})` : ""}, with clear lip-sync: "${d.text}"`);
    }
    if (shot.sound) out.push(`Sound: ${shot.sound}`.replace(/\.?$/, "."));
    out.push(`End on: ${shot.end || "-"}`.replace(/\.?$/, "."));
    out.push(`Duration ${shot.dur || 0}s. ${PHOTO_LOCK} Style: ${S.project.style}. No subtitles, captions or on-screen text; no logo.`);
    return out.join(" ");
  }

  // ---------- stage status ----------
  function stageInfo(ep, key) {
    const target = +S.project.epSeconds || 60;
    if (key === "cerita") {
      const n = BEATS.filter(([k]) => (ep.beats[k] || "").trim()).length;
      const core = ["hook", "conflict", "twist", "message"].every((k) => (ep.beats[k] || "").trim());
      return { dot: core ? "ok" : n ? "mid" : "no", num: `${n}/${BEATS.length}`, done: core };
    }
    if (key === "naskah") {
      const st = scriptStats(ep);
      const b = stageInfo(ep, "cerita");
      const dot = st.lines && b.done ? (st.hasSabrina ? "ok" : "mid") : st.lines || b.num !== `0/${BEATS.length}` ? "mid" : "no";
      return { dot, num: `${b.num} beat · ${st.lines ? `${st.lines} dialog` : "naskah kosong"}`, done: b.done && st.lines > 0, beatsDone: b.done };
    }
    if (key === "storyboard") {
      const t = shotSec(ep);
      const okDur = Math.abs(t - target) <= target * 0.15;
      return { dot: ep.shots.length ? (okDur ? "ok" : "mid") : "no", num: ep.shots.length ? `${ep.shots.length} shot · ${fmtSec(t)}` : "0 shot", done: ep.shots.length > 0 };
    }
    if (key === "prompt") {
      const ready = ep.shots.filter((s) => s.start && s.action && s.end && s.cast.length).length;
      return { dot: !ep.shots.length ? "no" : ready === ep.shots.length ? "ok" : "mid", num: `${ready}/${ep.shots.length}`, done: ep.shots.length > 0 && ready === ep.shots.length };
    }
    if (key === "produksi") {
      const p = prodStats(ep);
      return { dot: !p.total ? "no" : p.done === p.total ? "ok" : p.done || p.queue ? "mid" : "no", num: p.total ? `${Math.round((p.done / p.total) * 100)}%` : "–", done: p.total > 0 && p.done === p.total };
    }
    if (key === "review") {
      const r = reviewChecks(ep);
      const bad = r.auto.filter((c) => c.level === "bad").length;
      const warn = r.auto.filter((c) => c.level === "warn").length;
      const manualLeft = r.manual.filter((c) => !ep.review.checks[c.key]).length;
      const issues = bad + warn + manualLeft;
      return { dot: bad ? "bad" : issues ? "mid" : "ok", num: issues ? `${issues} catatan` : "lolos", done: !issues };
    }
    return { dot: "no", num: "" };
  }
  function prodStats(ep) {
    let total = 0, done = 0, queue = 0;
    ep.shots.forEach((s) => PROD_KEYS.forEach(([k]) => {
      const v = s.prod[k] || "belum";
      if (v === "-") return;
      total++; if (v === "jadi") done++; if (v === "antre") queue++;
    }));
    return { total, done, queue };
  }

  // ---------- review ----------
  const MANUAL = [
    ["sabrinaRole", "Sabrina digambarkan sesuai kemampuan nyata: menjawab lewat chat yang dibuka pengguna, tidak menyadap/memantau telepon atau SMS."],
    ["noRealData", "Tidak ada nomor rekening, kode OTP, nomor telepon, atau tautan asli yang bisa disalahgunakan di layar maupun dialog."],
    ["officialChannel", "Nama, logo, dan kanal resmi yang disebut sudah diverifikasi tim brand/komunikasi."],
    ["legal", "Disclaimer regulasi (mis. OJK/LPS) dicantumkan sesuai arahan tim legal bila menyebut produk."],
    ["noPromise", "Tidak menjanjikan hadiah, bunga, atau imbal hasil."],
    ["visualGuide", "Tampilan Sabrina sesuai brand guideline terbaru."],
    ["safeZone", "Teks layar & subtitle berada di zona aman 9:16 (tidak tertutup UI TikTok/Reels)."]
  ];
  function reviewChecks(ep) {
    const target = +S.project.epSeconds || 60;
    const auto = [];
    const add = (level, text, link) => auto.push({ level, text, link });
    const st = scriptStats(ep);
    const t = shotSec(ep);

    if (!(ep.beats.hook || "").trim()) add("bad", "Hook belum ditulis.", "cerita");
    else if (ep.shots[0] && +ep.shots[0].dur > 3) add("warn", `Shot pertama ${ep.shots[0].dur} dtk — hook idealnya terbaca dalam 3 detik.`, "storyboard");
    else add("ok", "Hook ada dan masuk 3 detik pertama.");

    if (!(ep.beats.cliff || "").trim()) add("warn", "Belum ada cliffhanger ke episode berikutnya.", "cerita");
    else add("ok", "Cliffhanger sudah ada.");

    if (!st.lines) add("bad", "Naskah masih kosong.", "naskah");
    else if (!st.hasSabrina) add("bad", `${S.sabrina.name} belum punya dialog di naskah.`, "naskah");
    else add("ok", `${S.sabrina.name} berbicara di naskah.`);

    if (st.lines && S.project.cta && !ep.script.toLowerCase().includes(S.project.cta.toLowerCase().replace(/[.!]$/, ""))) add("warn", `CTA seri ("${S.project.cta}") belum muncul di naskah.`, "naskah");

    // pesan keamanan: Sabrina tidak boleh terdengar meminta data rahasia
    st.blocks.filter((b) => b.t === "dlg" && b.who.toLowerCase().includes(S.sabrina.name.toLowerCase())).forEach((b) => {
      if (/(PIN|OTP|password|kata sandi|CVV)/i.test(b.text) && !/(jangan|tidak|tak|bukan|nggak|gak|never)/i.test(b.text))
        add("bad", `Dialog Sabrina menyebut data rahasia tanpa larangan: "${b.text}"`, "naskah");
    });

    if (!ep.shots.length) add("bad", "Storyboard belum dibuat.", "storyboard");
    else {
      const diff = t - target;
      if (Math.abs(diff) > target * 0.15) add("warn", `Total durasi ${fmtSec(t)} vs target ${fmtSec(target)} (selisih ${diff > 0 ? "+" : ""}${diff} dtk).`, "storyboard");
      else add("ok", `Durasi ${fmtSec(t)} sesuai target ${fmtSec(target)}.`);
      const avg = t / ep.shots.length;
      if (avg > avgLimit()) add("warn", `Rata-rata ${avg.toFixed(1)} dtk/shot — format ini idealnya ≤ ${avgLimit()} dtk.`, "storyboard");
      if (!ep.shots.some((s) => s.cast.includes("sabrina"))) add("warn", `${S.sabrina.name} tidak muncul di shot mana pun.`, "storyboard");
      const incomplete = ep.shots.filter((s) => !(s.start && s.action && s.end));
      if (incomplete.length) add("warn", `${incomplete.length} shot belum lengkap titik awal/aksi/akhir: ${incomplete.map((s) => s.id).join(", ")}.`, "storyboard");
      const dense = ep.shots.filter((s) => s.dialog && words(splitDialog(s.dialog).text) / Math.max(1, +s.dur) > 3);
      if (dense.length) add("warn", `Dialog terlalu padat untuk durasinya di shot ${dense.map((s) => s.id).join(", ")} (> 3 kata/detik).`, "storyboard");
      const noLock = new Set();
      ep.shots.forEach((s) => s.cast.forEach((id) => { const a = assetById(id); if (a && !a.lock && a.kind !== "Karakter") noLock.add(a.name); if (a && a.kind === "Karakter" && !a.lock) noLock.add(a.name); }));
      if (noLock.size) add("warn", `Aset tanpa frasa kunci visual dipakai di shot: ${[...noLock].join(", ")}. Wajah/kostum bisa berubah antar shot.`, "sabrina");
      const noSheet = [...new Set(ep.shots.flatMap((s) => s.cast))].map(assetById).filter((a) => a && a.kind === "Karakter" && a.lock && !sheetsOf(a.id).length);
      if (noSheet.length) add("warn", `Pemeran tampil tanpa character sheet: ${noSheet.map((a) => `${a.name} (${tierOf(a)})`).join(", ")}. Unggah sheet sebelum produksi.`, "sabrina");
      else if (ep.shots.some((s) => s.cast.some((id) => (assetById(id) || {}).kind === "Karakter"))) add("ok", "Semua pemeran yang tampil punya character sheet.");
    }
    if (!S.sabrina.verified) add("warn", `Visual ${S.sabrina.name} belum diverifikasi dengan aset resmi BRI — prompt masih memakai deskripsi placeholder.`, "sabrina");
    const manual = (Array.isArray(S.checks) && S.checks.length ? S.checks : MANUAL).map(([key, text]) => ({ key, text }));
    return { auto, manual };
  }

  // ---------- agent prompts (salin ke Claude Code / Codex) ----------
  function brief() {
    const p = S.project, s = S.sabrina;
    return [
      `Konteks seri: "${p.title}" — ${p.logline}`,
      `Tujuan: ${p.goal}. Produk: ${p.product}. Audiens: ${p.audience}. Platform: ${p.platform}.`,
      `Format: ${p.aspect}, ±${p.epSeconds} detik/episode, ${p.epCount} episode. Tone: ${p.tone}. Gaya visual: ${p.style}. CTA: "${p.cta}".`,
      `Tokoh utama merek: ${s.fullName || s.name} — ${s.role} Kepribadian: ${s.personality}. Suara: ${s.voice}.`,
      `Penampilan: ${s.look} Kostum: ${s.outfit}${s.verified ? "" : " (CATATAN: visual belum diverifikasi dengan aset resmi — jangan dianggap final)"}`,
      `Frasa kunci visual ${s.name} (wajib dipakai apa adanya di setiap prompt): ${s.lock}`,
      `Boleh: ${s.dos.join("; ")}.`,
      `Jangan: ${s.donts.join("; ")}.`,
      `Semua dialog dan teks layar dalam Bahasa Indonesia sehari-hari; prompt gambar/video dalam bahasa Inggris.`
    ].join("\n");
  }
  const tierOf = (a) => a.id === "sabrina" ? "utama" : a.kind === "Karakter" ? (a.tier === "utama" ? "utama" : "pendukung") : "";
  const sheetNames = (id) => sheetsOf(id).map((sh) => `${sh.label} (${sh.name || "gambar"})`);
  const castText = () => allCast().map((a) => {
    const sh = sheetNames(a.id);
    return `- [${a.kind}${tierOf(a) ? " " + tierOf(a) : ""}] ${a.name}: ${a.desc}${a.lock ? ` | frasa kunci: ${a.lock}` : ""}${sh.length ? ` | referensi terlampir: ${sh.join(", ")}` : ""}`;
  }).join("\n");
  const kvBlock = (ep) => { const l = scenesOf(ep).filter((x) => sheetsOf(kvId(ep, x.sc)).length); return l.length ? `\n\nKV adegan terlampir (acuan warna, cahaya, tata ruang):\n${l.map((x) => `- ${x.sc}${x.heading ? " " + x.heading : ""}: ${kvNames(ep, x.sc).join(", ")}`).join("\n")}` : ""; };
  const beatsText = (ep) => BEATS.map(([k, l]) => `- ${l}: ${ep.beats[k] || "(kosong)"}`).join("\n");
  const shotsText = (ep) => ep.shots.map((s) => `- ${s.id} [${s.scene}] ${s.title} · ${s.dur}s · ${s.scale} · ${s.move}\n  awal: ${s.start}\n  aksi: ${s.action}\n  akhir: ${s.end}${s.dialog ? `\n  dialog: ${s.dialog}` : ""}`).join("\n");
  const SHOT_SCHEMA = `[{"id":"001","scene":"SC001","title":"...","dur":3,"scale":"${SCALES.join("|")}","move":"${MOVES.join("|")}","purpose":"...","start":"...","action":"...","end":"...","cast":["sabrina", ${S.assets.map((a) => `"${a.id}"`).slice(0, 3).join(", ")}],"sound":"...","dialog":"Nama: kalimat"}]`;

  function agentPrompt(kind, ep, assetId) {
    const head = brief();
    const id = ep && ep.id;
    switch (kind) {
      case "sheetlock": {
        const a = assetById(assetId); const sh = sheetNames(assetId);
        return `/short-drama-assets\nSaya lampirkan ${sh.length} character sheet/referensi untuk ${a.name} (${a.kind}${tierOf(a) ? ", karakter " + tierOf(a) : ""}) di seri "${S.project.title}":\n${sh.map((x) => `- ${x}`).join("\n")}\n\nLihat semua gambarnya, lalu tulis ulang visual setting ${a.name} HANYA dari yang benar-benar terlihat (jangan menambah detail).\n\nKembalikan:\n1. Deskripsi (Bahasa Indonesia): wajah/rambut/usia kesan/postur${a.kind === "Karakter" ? ", kostum dan aksesori" : ", bentuk, warna, material"}.\n2. Frasa kunci (bahasa Inggris, satu kalimat, ≤ 45 kata) yang ditempel apa adanya ke setiap prompt agar konsisten antar shot. Tanpa logo/teks.\n3. Hal yang tidak konsisten antar sheet (kalau ada), supaya bisa dibetulkan sebelum produksi.\n\nGaya visual seri: ${S.project.style}.\nDeskripsi saat ini: ${a.desc || "-"} | ${a.lock || "-"}`;
      }
      case "develop":
        return `/short-drama-develop\nKembangkan rencana seri micro drama ini menjadi story engine dan peta ${S.project.epCount} episode. Setiap episode: satu modus/kebutuhan finansial, satu momen tokoh bertanya ke ${S.sabrina.name}, satu pesan edukasi, dan cliffhanger.\n\n${head}\n\nEpisode yang sudah ada:\n${S.episodes.map((e) => `- ${e.id} ${e.title}: ${e.beats.conflict || "-"}`).join("\n")}\n\nKembalikan per episode dalam format: Judul / Hook 3 detik / Situasi / Konflik / Titik balik / Pesan / CTA / Cliffhanger.`;
      case "beats":
        return `/short-drama-develop\nPertajam beat ${id} "${ep.title}" agar kuat untuk micro drama ±${S.project.epSeconds} detik.\n\n${head}\n\nBeat saat ini:\n${beatsText(ep)}\n\nKembalikan tujuh beat yang sama (Hook 3 detik, Situasi, Konflik, Titik balik, Pesan, CTA, Cliffhanger), masing-masing satu-dua kalimat.`;
      case "write":
        return `/short-drama-write\nTulis naskah ${id} "${ep.title}" (±${S.project.epSeconds} detik, vertikal ${S.project.aspect}).\n\n${head}\n\nBeat:\n${beatsText(ep)}\n\nKarakter & aset:\n${castText()}\n\nFormat keluaran (agar bisa ditempel ke dashboard):\n- Judul adegan: "## ${id}-SC001 INT · Lokasi · Waktu"\n- Aksi: paragraf biasa, hanya yang terlihat/terdengar.\n- Dialog: "Nama: kalimat" atau "Nama (arahan): kalimat".\n- Suara dari luar layar: "[OS] Nama: kalimat"; narasi: "[VO] Nama: kalimat".\n- Teks di layar: "[TEKS] ..."; efek suara: "[SFX] ...".\nDialog pendek (≤ 12 kata per kalimat), ${S.sabrina.name} wajib berbicara di titik balik, tutup dengan CTA "${S.project.cta}".`;
      case "assets":
        return `/short-drama-assets\nRapikan visual setting (karakter, kostum, lokasi, properti) untuk seri "${S.project.title}" dan beri setiap aset satu frasa kunci bahasa Inggris yang bisa ditempel apa adanya ke prompt agar konsisten antar shot.\n\n${head}\n\nAset saat ini:\n${castText()}\n\n${S.episodes.filter((e) => e.script).map((e) => `Naskah ${e.id}:\n${e.script}`).join("\n\n")}\n\nKembalikan daftar: Jenis / Nama / Deskripsi / Frasa kunci.`;
      case "lockref":
        return `/short-drama-assets\nSaya lampirkan gambar resmi ${S.sabrina.name} (asisten virtual BRI) dari tim brand. Lihat gambarnya, lalu tulis ulang visual setting ${S.sabrina.name} hanya dari yang benar-benar terlihat — jangan menambah detail yang tidak ada di gambar.\n\nKembalikan tiga bagian:\n1. Penampilan (Bahasa Indonesia): wajah, rambut/penutup kepala, usia kesan, gaya render (2D/3D/realistis).\n2. Kostum (Bahasa Indonesia): pakaian, warna, aksesori.\n3. Frasa kunci (bahasa Inggris, satu kalimat, ≤ 45 kata) yang bisa ditempel apa adanya ke setiap prompt gambar/video agar wajah dan kostum konsisten. Hindari menulis logo atau teks di pakaian.\n\nGaya visual seri: ${S.project.style}.\nDeskripsi saat ini (placeholder): ${S.sabrina.look} | ${S.sabrina.outfit} | ${S.sabrina.lock}`;
      case "images":
        return `/short-drama-image-prompts\nTulis prompt gambar referensi (character sheet 3 tampak + ekspresi untuk setiap karakter utama dan pendukung yang tampil, plate lokasi, sheet properti). Lewati aset yang sudah punya referensi terlampir kecuali saya minta. Karakter yang hanya suara tidak perlu sheet.\n\n${head}\n\nAset:\n${castText()}\n\nBelum punya sheet: ${allCast().filter((a) => a.lock && !sheetsOf(a.id).length).map((a) => a.name).join(", ") || "(semua sudah punya)"}`;
      case "storyboard":
        return `/short-drama-storyboard\nPecah naskah ${id} "${ep.title}" menjadi storyboard micro drama ${S.project.aspect}, total ±${S.project.epSeconds} detik, rata-rata ≤ 5 detik/shot, shot pertama ≤ 3 detik sebagai hook.\n\n${head}\n\nAset (pakai id-nya di "cast"):\n${allCast().map((a) => `- ${a.id}: ${a.name} (${a.kind})`).join("\n")}\n\nNaskah:\n${ep.script || "(belum ada — tulis dulu dengan /short-drama-write)"}${kvBlock(ep)}\n\nSetiap shot: titik awal, aksi, titik akhir yang bisa digambar; satu dialog maksimal per shot.\nKembalikan HANYA JSON array dengan skema berikut agar bisa diimpor ke dashboard:\n${SHOT_SCHEMA}`;
      case "video":
        return `/short-drama-video-prompts\nTulis ulang prompt first-frame dan prompt video ${id} "${ep.title}" dalam bahasa Inggris yang natural, satu per shot. Pakai frasa kunci aset apa adanya. Dialog tetap Bahasa Indonesia di dalam tanda kutip, dengan lip-sync. Tanpa subtitle/teks di video.\n\n${head}\n\nAset:\n${castText()}${kvBlock(ep)}\n\nShot:\n${shotsText(ep)}\n\nKembalikan per shot: "SHOT <id>" lalu "First frame:" dan "Video:". Bila ada KV adegan, samakan warna, cahaya, dan tata ruang dengan KV-nya.`;
      case "produce": {
        const jobs = [];
        ep.shots.forEach((s) => PROD_KEYS.forEach(([k, l]) => { if ((s.prod[k] || "belum") === "belum") jobs.push(`- ${l} · shot ${s.id} "${s.title}" (${s.dur}s)`); }));
        return `/short-drama-produce\nSiapkan PRATINJAU batch produksi ${id} "${ep.title}". Jangan menjalankan generate apa pun sebelum saya konfirmasi jumlah, isi, gambar referensi, dan parameter.\n\nJob yang belum dibuat (${jobs.length}):\n${jobs.join("\n") || "- (semua sudah dibuat)"}\n\nGambar referensi per shot (lampirkan character sheet pemeran yang muncul + first frame shot itu sebagai frame awal video):\n${ep.shots.map((s) => {
          const refs = s.cast.map(assetById).filter((a) => a && a.lock).map((a) => { const sh = sheetNames(a.id); return `${a.name}: ${sh.length ? sh.join(", ") : a.kind === "Karakter" ? "BELUM ADA CHARACTER SHEET" : "tanpa referensi (pakai frasa kunci)"}`; });
          const kv = kvNames(ep, s.scene);
          return `- SHOT ${s.id}: ${refs.join(" · ") || "(tanpa pemeran)"}${kv.length ? ` · KV ${s.scene}: ${kv.join(", ")}` : ""}`;
        }).join("\n")}\nJangan generate shot yang karakternya (utama maupun pendukung) belum punya character sheet sampai saya konfirmasi.\n\nPrompt video per shot:\n${ep.shots.map((s) => `SHOT ${s.id}: ${videoPrompt(s)}`).join("\n\n")}`;
      }
      case "setting": {
        const locs = assetId ? [assetById(assetId)].filter(Boolean) : S.assets.filter(settingAuto);
        const zip = assetId ? `kv-setting-${assetId}.zip` : "kv-setting.zip";
        return `Buat setting reference (plate lokasi) dengan GPT Image berdasarkan KV adegan, untuk seri "${S.project.title}".
Alat: model gambar OpenAI (GPT Image). Pakai OpenAI API kalau OPENAI_API_KEY sudah ada di environment (edit gambar dengan KV sebagai gambar referensi); kalau tidak ada, pakai ChatGPT lewat Claude in Chrome di akun saya. Jangan memasukkan password, API key, atau data pembayaran; berhenti dan beri tahu saya kalau diminta.
File KV: ekstrak ${zip} (tombol "⇩ KV acuan (ZIP)" di Aset → Lokasi) → kv-setting/<id lokasi>/<episode>-<adegan>-<n>.jpg.
Pakai skill drakor-sinematik untuk rasa gambar (cahaya bersumber, palet per suasana, style anchor yang sama).

Langkah:
1. Lihat semua KV per lokasi. Tulis deskripsi ruang (Bahasa Indonesia) dan frasa kunci lokasi (bahasa Inggris, satu kalimat, ≤ 45 kata, tanpa orang, tanpa logo/teks) HANYA dari yang terlihat di KV.
2. PRATINJAU: per lokasi, daftar gambar yang akan dibuat, prompt bahasa Inggris, KV acuan, dan perkiraan biaya. Jangan generate sebelum saya konfirmasi.
3. Per lokasi buat 3 gambar vertikal ${S.project.aspect}: (a) plate wide kosong dari sudut KV utama, (b) sudut balik untuk shot lawan bicara, (c) detail area kerja atau versi waktu lain bila adegan memakainya. Tanpa orang, tanpa teks/logo terbaca; tata ruang, cahaya, dan palet sama dengan KV.
4. Simpan ke setting/<id lokasi>-1.jpg, -2.jpg, -3.jpg dan kembalikan deskripsi + frasa kunci per lokasi, siap ditempel ke Aset → Lokasi. Saya seret gambarnya ke galeri lokasi.

Lokasi:
${locs.map((a) => { const g = kvForLocation(a); return `- [${a.id}] ${a.name}: ${a.desc || "-"}${a.lock ? ` | frasa kunci sekarang: ${a.lock}` : ""}\n${g.length ? g.map((x) => `  KV acuan ${x.ep.id} ${x.sc} "${x.heading}": ${x.sheets.length} gambar (${x.sheets.map((sh) => sh.label).join(", ")})`).join("\n") : "  (belum ada adegan dengan KV yang cocok)"}`; }).join("\n") || "- (belum ada lokasi dengan mode otomatis)"}`;
      }
      case "runninghub": {
        const url = S.project.rhUrl || RH_DEFAULT; const dir = `${id}-runninghub`;
        const noSheet = [...new Set(ep.shots.flatMap((s) => s.cast))].map(assetById).filter((a) => a && a.kind === "Karakter" && a.lock && !sheetsOf(a.id).length).map((a) => a.name);
        return `Workflow KV otomatis ${id} "${ep.title}" — ref2movie di RunningHub lewat Claude in Chrome (browser saya, akun RunningHub saya sendiri).
Aplikasi: ${url} (MiniMax H3, gambar referensi → video + suara).
Tulis ulang setiap prompt dengan skill h3-prompt-writing mode Ref2VA (enam bagian: subject_definitions, summary, retention_analysis, detailed_description, overall_soundscape, non_diegetic_music; label <Subject N>/<Picture N> konsisten; durasi 4–15 dtk per generate). Pakai skill drakor-sinematik untuk rasa adegan: gerak kamera kecil dan termotivasi, akting mikro, tanpa teks di layar. Dialog tetap Bahasa Indonesia kata per kata di dalam <d>[Indonesian] …</d>; VO dengan "says in an off-screen voiceover" dan bibir tertutup. non_diegetic_music: N/A (musik ditambahkan saat editing). Gabungkan 3–5 shot berurutan dalam satu adegan menjadi SATU generate 10–15 dtk dengan cut di dalam klip ([Shot 2] At 00:03.000, the shot cuts to…) dan ganti angle (OTS/two-shot → reverse close-up → insert → reaksi), bukan satu shot panjang per generate. Tetapkan posisi kiri/kanan layar tiap tokoh (aturan 180°) dan tulis arah pandang di setiap shot (tokoh yang bicara menatap lawan bicaranya, tidak ke kamera). Akting natural dengan gerak kecil (napas, kedip, melirik) dan reaksi pendengar. Detail mikro-ekspresi wajib (references/mikro-ekspresi.md di skill drakor-sinematik): character lock, continuity lock berisi tangga emosi tiap tokoh per shot, extreme close-up mata/bibir/tangan di momen penting dengan kamera diam, 2–4 tanda fisik kecil per shot, satu pelepasan emosi saja per adegan, dan paragraf negative constraints di akhir detailed_description. Setiap prompt wajib memuat frasa "Photoreal, natural skin texture, shot on 35mm film," di awal deskripsi gaya. Logika properti dan aksi harus masuk akal (siapa memegang apa dan kenapa); cahaya alami dengan sumber jelas (cahaya jendela lembut, kontras rendah, palet redup), bukan cahaya lampu atau iklan. Tokoh pendukung yang tampil (barista, satpam, nasabah) harus jelas berbeda dari tokoh utama minimal di tiga ciri (usia, bentuk wajah/tubuh, rambut atau kumis, kacamata, warna pakaian) dan pakai sheet sendiri bila wajahnya terlihat. Pakai satu gambar acuan lokasi per adegan sebagai <Environment 1> (plate lokasi dari Aset → Lokasi bila ada), dan tulis overall_soundscape dengan cap waktu per suara. Tampilan fotorealistis (tekstur kulit, cahaya bersumber, depth of field lensa sungguhan, grain tipis). Ikuti juga aturan di selera-tim.md skill drakor-sinematik. Unduh hasil per kelompok sebagai ${id}-<shot awal>-<shot akhir>.mp4. Tunjukkan pengelompokan shot dan prompt H3 hasil tulis ulang di pratinjau.

Langkah:
1. Buka aplikasinya di tab baru. Baca dulu form inputnya (slot gambar referensi, prompt, durasi, rasio, jumlah) dan laporkan field yang ada sebelum mengisi apa pun.
2. PRATINJAU dulu: tabel shot → gambar referensi yang diunggah → prompt → durasi → perkiraan biaya/kredit dari halaman. Jangan klik Run (立即运行) sebelum saya konfirmasi.
3. Setelah saya konfirmasi, jalankan SATU shot dulu sebagai uji, tunjukkan hasilnya, lalu lanjut batch setelah saya OK.
4. Rasio ${S.project.aspect}. Unduh setiap hasil ke folder ${dir}/ (minta izin saya untuk unduhan pertama).
5. KV otomatis: dari klip yang jadi di tiap adegan, ambil satu frame paling representatif (ffmpeg) dan simpan sebagai ${id}-<adegan>-KV.jpg di ${dir}/. Saya seret ke galeri KV dan video ke Produksi di dashboard.
6. Jangan memasukkan password, kode OTP, atau data pembayaran. Kalau diminta login, top-up, atau persetujuan, berhenti dan beri tahu saya.
7. ${noSheet.length ? `Lewati shot berisi ${noSheet.join(", ")} (belum ada character sheet) sampai saya konfirmasi.` : "Semua karakter yang tampil sudah punya character sheet."}
8. Suara konsisten: untuk setiap tokoh yang berbicara dan punya suara acuan, unggah filenya ke slot audio (maksimal 3 per generate) dan tulis di subject_definitions "<Audio n> is the voice-timbre reference for <Subject k> (Sn)". Deskripsi suara tiap tokoh ditulis sama persis di setiap prompt. Kalau ada rekaman dialog per shot di ${dir}/audio/<id shot>.mp3|wav, unggah rekaman itu sebagai audio yang disalin apa adanya (lip-sync ke rekaman), bukan sekadar acuan.

Suara tokoh (unduh dengan tombol ⇩ di Sabrina / Aset → karakter):
${(() => { const ids = [...new Set(ep.shots.flatMap(speakersOf))]; return ids.map((sid) => { const o = voiceOwner(sid); const nm = sid === "sabrina" ? S.sabrina.name : o.name; const desc = sid === "sabrina" ? S.sabrina.voice : ""; return `- ${nm}: ${voiceMedia(sid) ? voiceFile(sid) : "BELUM ADA SUARA ACUAN — H3 akan mengarang suara, bisa beda antar shot"}${desc ? ` | deskripsi: ${desc}` : ""}`; }).join("\n") || "- (tidak ada dialog)"; })()}

${head}

Gambar referensi per shot (file akan saya lampirkan/tunjukkan lokasinya; nama sesuai daftar):
${ep.shots.map((s) => {
          const refs = s.cast.map(assetById).filter((a) => a && a.lock).map((a) => { const sh = sheetNames(a.id); return `${a.name}: ${sh.length ? sh.join(", ") : a.kind === "Karakter" ? "BELUM ADA CHARACTER SHEET" : "tanpa referensi (pakai frasa kunci)"}`; });
          const kv = kvNames(ep, s.scene);
          const sp = speakersOf(s).map((sid) => `${sid === "sabrina" ? S.sabrina.name : voiceOwner(sid).name} ${voiceMedia(sid) ? `(${voiceFile(sid)})` : "(tanpa acuan)"}`);
          return `- SHOT ${s.id} [${s.scene}]: ${refs.join(" · ") || "(tanpa pemeran)"}${kv.length ? ` · KV manual ${s.scene}: ${kv.join(", ")}` : ""}${sp.length ? ` · suara: ${sp.join(", ")}` : ""}`;
        }).join("\n")}

Prompt video per shot:
${ep.shots.map((s) => `SHOT ${s.id} (${s.dur} dtk): ${videoPrompt(s)}`).join("\n\n")}`;
      }
      case "edit":
        return `Pakai skill OpenFilm (npx skills add openfilm/openfilm; manualnya: npx -y openfilm@latest).\nEdit ${id} "${ep.title}" di folder ${id}-openfilm (hasil Ekspor → Editing di SABRINACTION: film.html 1080×1920, ${S.project.aspect}, target ±${S.project.epSeconds} detik). Rapikan titik potong dan tulis alasannya. Subtitle tetap kata per kata dari naskah (captions/subtitle.vtt). Teks layar ([TEKS]) jadi page overlay di zona aman. Pertahankan kartu penutup "${S.project.cta}". Tambahkan voice-over, musik, dan SFX sebagai clip audio bila filenya ada. Color grade episode: ${gradeOf(ep).name} (grade.svg di paket; setara ffmpeg ${gradeLut(gradeOf(ep))}) — jangan dihapus kecuali saya minta. Jangan mengubah track yang locked. Cek dengan openfilm look, lalu render dengan target loudness untuk platform ${S.project.platform}. Jangan memakai layanan generate berbayar tanpa konfirmasi saya.\n\nNaskah:\n${ep.script}\n\nShot:\n${shotsText(ep)}`;
      case "review": {
        const r = reviewChecks(ep);
        return `/short-drama-review\nReview ${id} "${ep.title}" — naskah, storyboard, dan prompt. Fokus: kekuatan hook 3 detik, kejelasan modus, konsistensi visual ${S.sabrina.name}, kesinambungan antar shot (arah pandang, posisi, properti), dan kepatuhan pesan keamanan perbankan.\n\n${head}\n\nTemuan otomatis dashboard:\n${r.auto.filter((c) => c.level !== "ok").map((c) => `- ${c.text}`).join("\n") || "- (tidak ada)"}\n\nNaskah:\n${ep.script}\n\nShot:\n${shotsText(ep)}\n\nKembalikan daftar masalah: lokasi · bukti · dampak · usulan perbaikan. Jangan mengubah dokumen langsung.`;
      }
    }
    return "";
  }
  const agentBtn = (kind, label, cls = "", asset = "") => `<button class="btn ${cls}" data-act="agent" data-kind="${kind}"${asset ? ` data-asset="${esc(asset)}"` : ""} title="Salin perintah untuk ditempel ke Claude Code / Codex">⧉ ${esc(label)}</button>`;

  // ---------- routing ----------
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    if (parts[0] === "ep" && epById(parts[1])) return { page: !parts[2] || parts[2] === "cerita" ? "naskah" : parts[2], ep: epById(parts[1]), sub: parts[3] };
    if (parts[0] === "sabrina") return { page: "sabrina" };
    if (parts[0] === "ekspor") return { page: "ekspor" };
    return { page: "home" };
  }
  let currentEpId = S.episodes[0] && S.episodes[0].id;

  function renderChrome(r) {
    $("#proj-title").textContent = S.project.title;
    document.title = `SABRINACTION · ${S.project.title}`;
    const ep = r.ep || epById(currentEpId) || S.episodes[0];
    if (r.ep) currentEpId = r.ep.id;
    $("#ep-switch").innerHTML = S.episodes.length ? `<select id="ep-select" aria-label="Pilih episode">
      ${S.episodes.map((e) => `<option value="${e.id}" ${ep && e.id === ep.id ? "selected" : ""}>${e.id} · ${esc(e.title)}</option>`).join("")}
      <option value="__new">+ Episode baru…</option></select>` : `<button class="btn sm" data-act="new-ep">+ Episode</button>`;
    const STAGE_ICO = { cerita: "book", naskah: "book", storyboard: "film", prompt: "spark", produksi: "rec", review: "check" };
    const link = (href, icon, label, on, dot, title) => `<a href="${href}" class="${on ? "on" : ""}" title="${esc(title || label)}"><span class="ico">${ico(icon)}${dot ? `<i class="dot ${dot}"></i>` : ""}</span><span class="lbl">${label}</span></a>`;
    let html = link("#/", "home", "Ringkasan", r.page === "home") + link("#/sabrina", "user", "Character", r.page === "sabrina", "", "Character, lokasi & properti");
    if (ep) {
      html += `<span class="sep"></span>`;
      STAGES.forEach(([k, l]) => {
        const inf = stageInfo(ep, k);
        html += link(`#/ep/${ep.id}/${k}`, STAGE_ICO[k], l, r.ep && r.page === k, inf.dot, `${l} · ${inf.num}`);
      });
    }
    html += `<span class="sep"></span>` + link("#/ekspor", "export", "Ekspor", r.page === "ekspor");
    $("#stagebar").innerHTML = html;
    $("#me").innerHTML = S.sabrina.refImage ? `<img src="${S.sabrina.refImage}" alt="">` : esc((S.sabrina.name || "S")[0]);
  }

  function render() {
    const r = route();
    renderChrome(r);
    const app = $("#app");
    const views = { home: viewHome, sabrina: viewSabrina, ekspor: viewExport, cerita: viewNaskah, naskah: viewNaskah, storyboard: viewStoryboard, prompt: viewPrompt, produksi: viewProduksi, review: viewReview };
    app.innerHTML = (views[r.page] || viewHome)(r.ep, r);
    if (r.page === "naskah") app.querySelector(".script-src")?.addEventListener("input", onScriptInput);
    if (r.page === "storyboard") syncVideo();
  }

  // ---------- views ----------
  function viewHome() {
    const p = S.project;
    const target = +p.epSeconds || 60;
    const eps = S.episodes;
    const allShots = sum(eps, (e) => e.shots.length);
    const prod = eps.reduce((a, e) => { const s = prodStats(e); a.t += s.total; a.d += s.done; return a; }, { t: 0, d: 0 });
    const issues = sum(eps, (e) => reviewChecks(e).auto.filter((c) => c.level !== "ok").length);

    const next = [];
    eps.forEach((e) => {
      if (next.length >= 3) return;
      const bad = reviewChecks(e).auto.find((c) => c.level === "bad" && stageInfo(e, "cerita").done && e.shots.length);
      if (bad) return next.push({ ep: e, text: bad.text, href: `#/ep/${e.id}/${bad.link || "review"}`, kind: "review" });
      const miss = STAGES.find(([k]) => k !== "review" && !stageInfo(e, k).done);
      if (miss) {
        const map = { naskah: stageInfo(e, "naskah").beatsDone ? ["Tulis naskah", "write"] : ["Lengkapi beat cerita", "beats"], storyboard: ["Pecah jadi storyboard", "storyboard"], prompt: ["Lengkapi shot & prompt", "video"], produksi: ["Produksi gambar/video/suara", "produce"] };
        next.push({ ep: e, text: map[miss[0]][0], href: `#/ep/${e.id}/${miss[0]}`, kind: map[miss[0]][1] });
      }
    });
    if (eps.length < p.epCount && next.length < 3) next.push({ text: `Rencanakan ${p.epCount - eps.length} episode lagi`, kind: "develop" });

    return `
    <div class="page-head">
      <div><h1>${esc(p.title)}</h1><p>${esc(p.logline)}</p></div>
      <div class="row">${agentBtn("develop", "Perintah kembangkan seri")}<button class="btn" data-act="edit-brief">✎ Brief seri</button></div>
    </div>
    <div class="grid g4">
      ${metric("Episode", `${eps.length}<small> / ${p.epCount}</small>`, `Target ${fmtSec(target)} per episode`)}
      ${metric("Shot di storyboard", `${allShots}`, `${fmtSec(sum(eps, shotSec))} total durasi`)}
      ${metric("Produksi selesai", prod.t ? `${Math.round((prod.d / prod.t) * 100)}<small>%</small>` : "–", `${prod.d} dari ${prod.t} job gambar/video/suara`)}
      ${metric("Catatan review", `${issues}`, issues ? "Buka tab Review tiap episode" : "Semua cek otomatis lolos", issues ? "warn" : "ok")}
    </div>
    <div class="grid g2 section">
      <div class="card">
        <div class="card-h"><h2>Langkah berikutnya</h2></div>
        <div class="next">${next.map((n, i) => `<div class="next-item"><span class="n">${i + 1}</span><div class="grow">${n.ep ? `<b>${n.ep.id}</b> · ` : ""}${esc(n.text)}</div>${n.href ? `<a class="btn sm" href="${n.href}">Buka</a>` : ""}${n.kind ? `<button class="btn sm" data-act="agent" data-kind="${n.kind}" data-ep="${n.ep ? n.ep.id : ""}">⧉ Perintah</button>` : ""}</div>`).join("") || `<div class="hint">Semua episode sudah sampai tahap akhir. Lanjut ke Ekspor.</div>`}</div>
      </div>
      <div class="card">
        <div class="card-h"><h2>${esc(S.sabrina.name)}</h2><a class="btn sm" href="#/sabrina">Character bible →</a></div>
        <dl class="kv">
          <dt>Peran</dt><dd>${esc(S.sabrina.role)}</dd>
          <dt>Kepribadian</dt><dd>${esc(S.sabrina.personality)}</dd>
          <dt>Catchphrase</dt><dd>“${esc(S.sabrina.catchphrase)}”</dd>
          <dt>Muncul di</dt><dd>${eps.filter((e) => e.shots.some((s) => s.cast.includes("sabrina"))).map((e) => `<span class="chip brand">${e.id}</span>`).join(" ") || "<span class='muted'>belum ada shot</span>"}</dd>
        </dl>
      </div>
    </div>
    <div class="card section">
      <div class="card-h"><h2>Progres per episode</h2><button class="btn sm primary" data-act="new-ep">+ Episode baru</button></div>
      <div class="table-wrap"><table class="matrix">
        <thead><tr><th>Episode</th>${STAGES.map(([, l]) => `<th>${l}</th>`).join("")}<th>Durasi</th></tr></thead>
        <tbody>${eps.map((e) => `<tr>
          <td><a href="#/ep/${e.id}/cerita"><b>${e.id}</b> ${esc(e.title)}</a></td>
          ${STAGES.map(([k]) => { const inf = stageInfo(e, k); return `<td><a class="cell" href="#/ep/${e.id}/${k}"><i class="dot ${inf.dot}"></i>${esc(inf.num)}</a></td>`; }).join("")}
          <td>${e.shots.length ? fmtSec(shotSec(e)) : "–"}</td></tr>`).join("")}
        </tbody></table></div>
    </div>
    <div class="card section">
      <div class="card-h"><h2>Alur kerja</h2><span class="muted">Mengikuti 12 skill drama-skills · tombol ⧉ menyalin perintah untuk agen</span></div>
      <div class="grid g4">
        ${[["1 · Cerita", "/short-drama-develop", "Peta seri & beat episode"], ["2 · Naskah", "/short-drama-write", "Naskah per episode"], ["3 · Aset", "/short-drama-assets · image-prompts", "Sabrina & frasa kunci visual"], ["4 · Storyboard", "/short-drama-storyboard", "Shot, durasi, first frame"], ["5 · Prompt", "/short-drama-video-prompts", "Prompt video per shot"], ["6 · Produksi", "/short-drama-produce", "Generate setelah konfirmasi"], ["7 · Edit", "/short-drama-edit", "Cut list, subtitle, CTA"], ["8 · Review", "/short-drama-review", "Cek cerita, visual, kepatuhan"]].map(([a, b, c]) => `<div class="hint"><b>${a}</b><br><code>${b}</code><br>${c}</div>`).join("")}
      </div>
    </div>`;
  }
  function metric(k, v, t, st) {
    const badge = st === "ok" ? `<span class="st-ok">✓ sesuai</span>` : st === "warn" ? `<span class="st-warn">⚠ cek</span>` : st === "bad" ? `<span class="st-bad">✕</span>` : "";
    return `<div class="card metric"><div class="k"><span>${k}</span>${badge}</div><div class="v">${v}</div><div class="t">${t}</div></div>`;
  }

  function viewSabrina() {
    const s = S.sabrina;
    const field = (path, label, multi) => multi
      ? `<label class="f">${label}<textarea data-bind="${path}" rows="${multi}">${esc(get(path))}</textarea></label>`
      : `<label class="f">${label}<input type="text" data-bind="${path}" value="${esc(get(path))}"></label>`;
    const listEdit = (key, label) => `<div><div class="card-h"><h3>${label}</h3><button class="btn sm" data-act="list-add" data-key="${key}">+ Tambah</button></div>
      <div class="list-edit">${s[key].map((v, i) => `<div class="li"><input type="text" data-bind="sabrina.${key}.${i}" value="${esc(v)}"><button class="btn sm danger" data-act="list-del" data-key="${key}" data-i="${i}">✕</button></div>`).join("")}</div></div>`;
    const tIn = (path) => `<input type="text" data-bind="${path}" value="${esc(get(path))}">`;
    const tTa = (path, rows = 2, cls = "", ph = "") => `<textarea data-bind="${path}" rows="${rows}" class="${cls}" placeholder="${esc(ph)}">${esc(get(path))}</textarea>`;
    return `
    <div class="page-head">
      <div><h1>${esc(s.name)} — character bible ${s.verified ? `<span class="chip ok">visual terverifikasi</span>` : `<span class="chip warn">visual belum diverifikasi</span>`}</h1><p>Satu sumber kebenaran untuk tampilan, suara, dan batasan peran ${esc(s.name)} di semua episode.</p></div>
      <div class="row">${agentBtn("assets", "Perintah rapikan aset")}${agentBtn("images", "Perintah prompt gambar referensi", "primary")}</div>
    </div>
    <div class="card char-hero">
      <div class="char-media">
        ${sheetGallery("sabrina", "big")}
        <div class="row">
          <label class="btn sm">⇧ ${s.refImage ? "Ganti" : "Unggah"} foto profil<input type="file" accept="image/*" data-act="ref-upload" hidden></label>
          ${s.refImage ? `<button class="btn sm danger" data-act="ref-del">Hapus foto profil</button>` : ""}
          ${agentBtn("sheetlock", "Frasa kunci dari sheet", "sm", "sabrina")}
        </div>
        <label class="verify ${s.verified ? "ok" : ""}"><input type="checkbox" data-act="verify" ${s.verified ? "checked" : ""}> Visual sudah sesuai aset resmi BRI</label>
      </div>
      <table class="ftable"><tbody>
        <tr><th>Nama</th><td>${tIn("sabrina.name")}</td><th>Nama lengkap</th><td>${tIn("sabrina.fullName")}</td></tr>
        <tr><th>Catchphrase</th><td>${tIn("sabrina.catchphrase")}</td><th>Suara</th><td>${tTa("sabrina.voice")}</td></tr>
        <tr><th>Suara acuan <small>10–20 dtk, satu sumber tetap · dipakai di setiap generate</small></th><td colspan="3">${voiceBlock("sabrina")}</td></tr>
        <tr><th>Peran</th><td colspan="3">${tTa("sabrina.role")}</td></tr>
        <tr><th>Kepribadian</th><td colspan="3">${tTa("sabrina.personality")}</td></tr>
        <tr><th>Penampilan</th><td>${tTa("sabrina.look", 3)}</td><th>Kostum</th><td>${tTa("sabrina.outfit", 3)}</td></tr>
        <tr><th>Frasa kunci <small>EN · ditempel ke setiap prompt</small></th><td colspan="3">${tTa("sabrina.lock", 2, "mono")}</td></tr>
      </tbody></table>
    </div>
    <div class="grid g2 section">
      <div class="card">${listEdit("dos", "✓ Sabrina boleh / harus")}</div>
      <div class="card">${listEdit("donts", "✕ Jangan pernah")}</div>
    </div>
    <div class="section page-head"><div><h2>Pemeran & visual setting</h2><p>Karakter utama, karakter pendukung, lokasi, dan properti. Unggah character sheet tiap pemeran dan isi frasa kunci agar wajah & kostum sama di setiap shot.</p></div>
      <div class="row"><button class="btn sm primary" data-act="asset-add" data-kind="Karakter" data-tier="utama">+ Karakter utama</button><button class="btn sm" data-act="asset-add" data-kind="Karakter" data-tier="pendukung">+ Karakter pendukung</button><button class="btn sm" data-act="asset-add" data-kind="Lokasi">+ Lokasi</button><button class="btn sm" data-act="asset-add" data-kind="Properti">+ Properti</button></div></div>
    ${[["Karakter utama", (a) => a.kind === "Karakter" && a.tier === "utama"], ["Karakter pendukung", (a) => a.kind === "Karakter" && a.tier !== "utama"], ["Lokasi", (a) => a.kind === "Lokasi"], ["Properti", (a) => a.kind === "Properti"]].map(([title, fn]) => {
      const list = S.assets.map((a, i) => [a, i]).filter(([a]) => fn(a));
      if (!list.length) return "";
      const isChar = title.startsWith("Karakter");
      return `<h3 class="section">${title} <small>(${list.length})</small></h3><div class="${isChar ? "char-list" : "grid g2"}" style="margin-top:10px">${list.map(([a, i]) => {
        const nSheet = sheetsOf(a.id).length;
        const nShot = sum(S.episodes, (e) => e.shots.filter((s) => s.cast.includes(a.id)).length);
        const status = isChar ? (nSheet ? `<span class="chip ok">${nSheet} sheet</span>` : a.lock ? `<span class="chip warn">belum ada sheet</span>` : `<span class="chip">hanya suara?</span>`) : (nSheet ? `<span class="chip ok">${nSheet} referensi</span>` : "");
        return `
        <div class="card char-row ${isChar ? "" : "small"}">
          <div class="char-media">${sheetGallery(a.id, "big")}</div>
          <div class="char-info">
            <table class="ftable"><tbody>
              <tr><th>Nama</th><td ${isChar ? "" : 'colspan="3"'}>${tIn(`assets.${i}.name`)}</td>${isChar ? `<th>Peran</th><td><select data-asset-tier="${i}"><option value="utama" ${a.tier === "utama" ? "selected" : ""}>Utama</option><option value="pendukung" ${a.tier !== "utama" ? "selected" : ""}>Pendukung</option></select></td>` : ""}</tr>
              <tr><th>Deskripsi</th><td colspan="3">${tTa(`assets.${i}.desc`)}</td></tr>
              <tr><th>Frasa kunci <small>EN</small></th><td colspan="3">${tTa(`assets.${i}.lock`, 2, "mono", isChar ? "Kosongkan untuk karakter yang hanya suara" : "")}</td></tr>
              <tr><th>Info</th><td colspan="3"><div class="row"><span class="muted mono">id: ${esc(a.id)} · ${nShot} shot</span>${status}</div></td></tr>
              ${isChar ? `<tr><th>Suara acuan</th><td colspan="3">${voiceBlock(a.id)}</td></tr>` : ""}
              ${a.kind === "Lokasi" ? (() => { const g = kvForLocation(a); const nKv = sum(g, (x) => x.sheets.length); const auto = settingAuto(a);
                return `<tr><th>Setting</th><td colspan="3"><div class="row"><div class="seg"><button class="${auto ? "" : "on"}" data-act="setting-mode" data-i="${i}" data-v="manual">Manual</button><button class="${auto ? "on" : ""}" data-act="setting-mode" data-i="${i}" data-v="auto">Otomatis dari KV</button></div>
                  <small class="muted">${auto ? `${nKv} KV dari ${g.length} adegan cocok${g.length ? ` (${g.map((x) => `${x.ep.id} ${x.sc}`).join(", ")})` : " — beri nama lokasi yang sama dengan judul adegan"}` : "Unggah plate lokasi sendiri di galeri."}</small></div>
                  ${auto ? `<div class="row" style="margin-top:8px"><button class="btn sm" data-act="setting-kv-zip" data-id="${esc(a.id)}" ${nKv ? "" : "disabled"}>⇩ KV acuan (ZIP)</button>${agentBtn("setting", "Perintah setting (GPT Image)", "sm primary", a.id)}</div>` : ""}</td></tr>`; })() : ""}
            </tbody></table>
            <div class="row" style="justify-content:flex-end">${nSheet ? agentBtn("sheetlock", "Frasa kunci dari sheet", "sm", a.id) : ""}<button class="btn sm danger" data-act="asset-del" data-i="${i}">Hapus ${esc(a.kind.toLowerCase())}</button></div>
          </div>
        </div>`; }).join("")}</div>`;
    }).join("")}`;
  }

  function epHead(ep, title, sub, actions = "") {
    return `<div class="page-head"><div><span class="chip accent">${ep.id}</span> <h1 style="display:inline;margin-left:6px">${esc(title)}</h1><p>${sub}</p></div><div class="row">${actions}</div></div>`;
  }

  const storyOpen = {};
  function viewNaskah(ep) {
    const st = scriptStats(ep);
    const nBeat = BEATS.filter(([k]) => (ep.beats[k] || "").trim()).length;
    const open = storyOpen[ep.id] != null ? storyOpen[ep.id] : nBeat < BEATS.length || !st.lines;
    return epHead(ep, "Cerita & Naskah", `${nBeat}/${BEATS.length} beat · ${st.scenes} adegan · ${st.lines} dialog · estimasi dialog ±${Math.round(st.dialogSec)} dtk dari target ${S.project.epSeconds} dtk`,
      `${agentBtn("beats", "Perintah pertajam beat")}${agentBtn("write", "Perintah tulis naskah", "primary")}<button class="btn danger" data-act="del-ep">Hapus episode</button>`) + `
    <div class="card story-card">
      <div class="story-title"><label class="f">Judul episode<input type="text" data-bind="ep:title" data-chrome="1" value="${esc(ep.title)}"></label></div>
      <details class="story-beats" data-story="${esc(ep.id)}" ${open ? "open" : ""}>
        <summary><b>Cerita · 7 beat</b> <small>${nBeat}/${BEATS.length} terisi</small><span class="beat-dots">${BEATS.map(([k, l]) => `<i class="dot ${(ep.beats[k] || "").trim() ? "ok" : "no"}" title="${esc(l)}"></i>`).join("")}</span></summary>
        <div class="beats">${BEATS.map(([k, l, h]) => `
          <div class="beat ${k === "hook" ? "hook" : ""}">
            <div class="lbl"><span>${l}</span>${(ep.beats[k] || "").trim() ? `<span class="st-ok">✓</span>` : ""}</div>
            <textarea data-bind="ep:beats.${k}" data-chrome="1" placeholder="${esc(h)}">${esc(ep.beats[k] || "")}</textarea>
          </div>`).join("")}</div>
      </details>
    </div>
    <h2 class="section" style="margin-bottom:10px">Naskah</h2>
    <div class="hint" style="margin-bottom:14px">Format: <code>## ${ep.id}-SC001 INT · Lokasi · Waktu</code> · <code>Nama: dialog</code> · <code>Nama (arahan): dialog</code> · <code>[OS] Nama: …</code> · <code>[VO] Nama: …</code> · <code>[TEKS] …</code> · <code>[SFX] …</code> · paragraf lain = aksi.</div>
    <div class="split">
      <div class="card"><div class="card-h"><h3>Sumber (Markdown)</h3><span class="muted" id="script-count">${words(ep.script)} kata</span></div>
        <textarea class="script-src" spellcheck="false" placeholder="Tempel naskah dari /short-drama-write di sini…">${esc(ep.script)}</textarea></div>
      <div class="card"><div class="card-h"><h3>Pratinjau naskah</h3><span class="muted">Pembicara: ${st.speakers.map(esc).join(", ") || "–"}</span></div>
        <div class="screenplay" id="screenplay">${renderScreenplay(st.blocks)}</div></div>
    </div>`;
  }
  // Pratinjau bisa diedit langsung: tiap blok tahu baris sumbernya (data-ln) dan dirakit ulang ke Markdown.
  const ce = (part, text, ph) => `<span class="ed" contenteditable="plaintext-only" spellcheck="false" data-part="${part}" data-ph="${esc(ph || "")}">${esc(text)}</span>`;
  function renderScreenplay(blocks) {
    if (!blocks.length) return `<div class="empty"><h3>Naskah masih kosong</h3>Tulis di sumber Markdown, atau salin perintah untuk agen di kanan atas.</div>`;
    const sab = S.sabrina.name.toLowerCase();
    return blocks.map((b) => {
      const at = `data-ln="${b.ln}" data-t="${b.t}" data-tag="${esc(b.tag || "")}"`;
      if (b.t === "sh") { const ep = route().ep; const sc = ((b.text.match(/(SC\d+)/i) || [])[1] || "").toUpperCase(); const u = ep && sc ? kvFirst(ep, sc) : ""; return `<div class="sh sp-b ${u ? "has-kv" : ""}" ${at}>${u ? `<img src="${u}" alt="KV ${esc(sc)}">` : ""}${ce("text", b.text)}</div>`; }
      if (b.t === "act") return `<p class="act sp-b" ${at}>${ce("text", b.text)}</p>`;
      if (b.t === "teks") return `<p class="fx sp-b" ${at}><span class="tag teks">TEKS</span>${ce("text", b.text)}</p>`;
      if (b.t === "sfx") return `<p class="fx sp-b" ${at}><span class="tag sfx">SFX</span>${ce("text", b.text)}</p>`;
      return `<div class="dlg sp-b ${b.who.toLowerCase().includes(sab) ? "sab" : ""}" ${at}><span class="who">${b.tag ? `<span class="tag ${b.tag.toLowerCase()}">${b.tag}</span>` : ""}${ce("who", b.who, "Nama")}</span><span class="paren">(${ce("paren", b.paren, "arahan")})</span>${ce("text", b.text, "Dialog")}</div>`;
    }).join("");
  }
  function blockLine(el) {
    const part = (k) => { const x = el.querySelector(`[data-part="${k}"]`); return x ? x.textContent.replace(/\s*\n\s*/g, " ").trim() : ""; };
    const t = el.dataset.t, text = part("text");
    if (t === "sh") return `## ${text}`;
    if (t === "teks") return `[TEKS] ${text}`;
    if (t === "sfx") return `[SFX] ${text}`;
    if (t === "act") return text;
    const paren = part("paren");
    return `${el.dataset.tag ? `[${el.dataset.tag}] ` : ""}${part("who")}${paren ? ` (${paren})` : ""}: ${text}`;
  }
  function onPreviewEdit(el) {
    const ep = route().ep; const b = el.closest(".sp-b"); if (!ep || !b) return;
    const lines = String(ep.script || "").split(/\r?\n/);
    lines[+b.dataset.ln] = blockLine(b);
    ep.script = lines.join("\n"); save();
    const src = $(".script-src"); if (src) src.value = ep.script;
    $("#script-count").textContent = `${words(ep.script)} kata`;
    clearTimeout(onScriptInput.t);
    onScriptInput.t = setTimeout(() => renderChrome(route()), 400);
  }
  function onScriptInput(e) {
    const ep = route().ep;
    ep.script = e.target.value; save();
    $("#screenplay").innerHTML = renderScreenplay(parseScript(ep.script));
    $("#script-count").textContent = `${words(ep.script)} kata`;
    clearTimeout(onScriptInput.t);
    onScriptInput.t = setTimeout(() => renderChrome(route()), 400);
  }

  let boardMode = "editor", boardScene = "";

  // ---------- editor storyboard: inspector · preview · timeline ----------
  const edSel = {};      // epId -> shot id terpilih
  const edTime = {};     // epId -> posisi playhead (detik)
  let edZoom = 1, playT = null;
  const PPS = () => 20 * edZoom; // piksel per detik
  const fmtTC = (s) => { s = Math.max(0, s); const m = Math.floor(s / 60), sec = Math.floor(s % 60), f = Math.floor((s % 1) * 24); return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}:${String(f).padStart(2, "0")}`; };
  const fmtMS = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const shotStarts = (ep) => { let t = 0; return ep.shots.map((s) => { const a = t; t += +s.dur || 0; return a; }); };
  function selShot(ep) {
    let s = ep.shots.find((x) => x.id === edSel[ep.id]);
    if (!s && ep.shots[0]) { s = ep.shots[0]; edSel[ep.id] = s.id; }
    return s;
  }
  function shotAt(ep, t) {
    const st = shotStarts(ep);
    for (let i = ep.shots.length - 1; i >= 0; i--) if (t >= st[i]) return ep.shots[i];
    return ep.shots[0];
  }
  function selectShot(ep, s, keepTime) {
    edSel[ep.id] = s.id;
    if (!keepTime) edTime[ep.id] = shotStarts(ep)[ep.shots.indexOf(s)] || 0;
  }

  function mediaSlots(ep, s) {
    const slot = (kind, label, accept, hint) => {
      const m = media(ep, s, kind);
      const prev = m ? (kind === "img" ? `<img src="${m.url}" alt="">` : `<video src="${m.url}" muted preload="metadata"></video>`) : `<span>${hint}</span>`;
      return `<div class="slot ${m ? "has" : ""}" data-drop="${kind}">
        <div class="slot-prev">${prev}</div>
        <div class="slot-meta"><b>${label}</b><small>${m ? `${esc(m.name || (kind === "img" ? "gambar" : "video"))} · ${fmtSize(m.size)}` : "Belum ada"}</small>
          <div class="row"><label class="btn sm">${m ? "Ganti" : "Unggah"}<input type="file" accept="${accept}" data-act="media-upload" data-kind="${kind}" hidden></label>${m ? `<button class="btn sm danger" data-act="media-del" data-kind="${kind}">Hapus</button>` : ""}</div></div>
      </div>`;
    };
    return slot("img", "First frame", "image/*", "Gambar") + slot("vid", "Video shot", "video/*", "Video") +
      `<small>Hasil generate dari /short-drama-produce. Seret file langsung ke preview juga bisa. Media disimpan di browser ini (IndexedDB), tidak ikut cadangan JSON.</small>`;
  }

  function shotForm(ep, s, inline) {
    const i = ep.shots.indexOf(s);
    const opt = (list, v) => list.map((x) => `<option ${x === v ? "selected" : ""}>${x}</option>`).join("");
    const ta = (k, label, rows = 2) => `<label class="f">${label}<textarea data-sbind="${k}" rows="${rows}">${esc(s[k] || "")}</textarea></label>`;
    const tx = (k, label) => `<label class="f">${label}<input type="text" data-sbind="${k}" value="${esc(s[k] || "")}"></label>`;
    const cast = `<div class="row">${allCast().map((a) => `<label class="chip ${s.cast.includes(a.id) ? "brand" : ""}" style="cursor:pointer"><input type="checkbox" data-cast="${a.id}" ${s.cast.includes(a.id) ? "checked" : ""} hidden>${a.kind === "Karakter" && firstSheet(a.id) ? `<img class="mini" src="${firstSheet(a.id)}" alt="">` : ""}${esc(a.name)}</label>`).join("")}</div>`;
    const nav = `<div class="row"><button class="btn sm" data-act="shot-nav" data-d="-1" ${i ? "" : "disabled"} title="Shot sebelumnya">←</button><button class="btn sm" data-act="shot-nav" data-d="1" ${i < ep.shots.length - 1 ? "" : "disabled"} title="Shot berikutnya">→</button>${inline ? "" : `<button class="btn sm" data-act="drawer-close">Tutup ✕</button>`}</div>`;
    return `
      <div class="${inline ? "insp-head" : "drawer-head"}"><h2>${ico("film")}<span><span class="mono" style="color:var(--brand)">${esc(s.id)}</span> Shot</span></h2>${nav}</div>
      <div class="insp-row"><span>Judul</span><input type="text" data-sbind="title" value="${esc(s.title)}"></div>
      <div class="insp-row"><span>Shot</span><div class="pair"><div class="fld"><i>#</i><input type="text" data-sbind="id" value="${esc(s.id)}"></div><input type="text" data-sbind="scene" value="${esc(s.scene)}" title="Adegan"></div></div>
      <div class="insp-row"><span>Durasi</span><div class="stepper"><button type="button" data-act="dur-step" data-d="-0.5" title="Kurangi 0,5 dtk">−</button><input type="number" min="0.5" max="15" step="0.5" data-sbind="dur" value="${esc(s.dur)}"><button type="button" data-act="dur-step" data-d="0.5" title="Tambah 0,5 dtk">+</button><em>dtk</em></div></div>
      <div class="insp-row"><span>Ukuran</span><select data-sbind="scale"><option value="">—</option>${opt(SCALES, s.scale)}</select></div>
      <div class="insp-row"><span>Kamera</span><select data-sbind="move">${opt(MOVES, s.move)}</select></div>
      <details class="grp" open><summary>Media</summary><div class="grp-body">${mediaSlots(ep, s)}</div></details>
      <details class="grp" ${sheetsOf(kvId(ep, s.scene)).length ? "" : "open"}><summary>KV adegan ${esc(s.scene)} <small class="muted" style="font-weight:400;margin-left:auto;margin-right:10px">${sheetsOf(kvId(ep, s.scene)).length || ""}</small></summary><div class="grp-body">${sheetGallery(kvId(ep, s.scene), true)}<small>Dipakai sebagai referensi visual semua shot di ${esc(s.scene)}, dan tampil di preview selama shot belum punya first frame.</small></div></details>
      <details class="grp" open><summary>Gerak & isi</summary><div class="grp-body">${ta("start", "Titik awal (first frame)")}${ta("action", "Aksi")}${ta("end", "Titik akhir")}${ta("purpose", "Tujuan shot", 2)}</div></details>
      <details class="grp" open><summary>Suara</summary><div class="grp-body">${tx("dialog", "Dialog — Nama: kalimat · Nama (OS): kalimat")}${tx("sound", "SFX / musik")}</div></details>
      <details class="grp" ${inline ? "" : "open"}><summary>Aset di shot</summary><div class="grp-body">${cast}</div></details>
      <details class="grp"><summary>Prompt first frame</summary><div class="grp-body"><div class="prompt-box" id="dr-ff">${esc(firstFramePrompt(s))}</div><button class="btn sm" data-act="copy-prompt" data-i="${i}" data-f="ff">${ico("copy").replace("<svg", '<svg width="14" height="14"')} Salin prompt</button></div></details>
      <div class="insp-foot"><button class="btn sm danger" data-act="shot-del">Hapus shot</button><button class="btn sm" data-act="shot-dup">Duplikat</button></div>`;
  }

  function previewHTML(ep, s) {
    const t = edTime[ep.id] || 0;
    const total = shotSec(ep) || 1;
    const st = shotStarts(ep)[ep.shots.indexOf(s)] || 0;
    const d = s.dialog ? splitDialog(s.dialog) : null;
    const img = media(ep, s, "img"), vid = media(ep, s, "vid");
    const bg = vid ? `<video class="ph-media" src="${vid.url}" ${img ? `poster="${img.url}"` : ""} playsinline preload="auto" data-offset="${Math.max(0, t - st)}"></video>`
      : img ? `<img class="ph-media" src="${img.url}" alt="First frame shot ${esc(s.id)}">`
      : kvFirst(ep, s.scene) ? `<img class="ph-media kvbg" src="${kvFirst(ep, s.scene)}" alt="KV adegan ${esc(s.scene)}">` : "";
    return `<div class="preview">
      <div class="phone ${s.cast.includes("sabrina") && !bg ? "has-sab" : ""} ${bg ? "has-media" : ""}" data-drop="1" title="Seret gambar first frame atau video ke sini">
        ${bg}
        <div class="ph-top"><span>${esc(ep.id)} · ${esc(s.scene)}</span><span>${vid ? "VIDEO" : img ? "FIRST FRAME" : bg ? "KV ADEGAN" : esc(S.project.aspect)}</span></div>
        ${bg ? "<div></div>" : `<div><div class="ph-title">${esc(s.title)}</div><div class="ph-desc">${esc(s.start)}</div><div class="ph-drop">⇩ Seret gambar / video ke sini</div></div>`}
        <div style="display:flex;flex-direction:column;gap:30px">${d ? `<div class="ph-sub">${d.who ? `<b>${esc(d.who)}:</b> ` : ""}${esc(d.text)}</div>` : "<div></div>"}
          <div class="ph-time" style="position:static"><span>${fmtTC(t)}</span><div class="track"><i style="width:${Math.min(100, (t / total) * 100)}%"></i></div></div></div>
      </div>
      <div class="pv-info">
        <div class="kicker">SHOT ${esc(s.id)} · ${fmtMS(st)}–${fmtMS(st + (+s.dur || 0))} · ${esc(s.scale || "ukuran?")} · ${esc(s.move || "statis")}</div>
        <h3>${esc(s.title)}</h3>
        ${s.purpose ? `<div class="muted" style="color:#8b8b93">${esc(s.purpose)}</div>` : ""}
        <div class="sae"><b>Awal</b><span>${esc(s.start || "—")}</span><b>Aksi</b><span>${esc(s.action || "—")}</span><b>Akhir</b><span>${esc(s.end || "—")}</span>${s.sound ? `<b>SFX</b><span>${esc(s.sound)}</span>` : ""}</div>
        <div class="row">${s.cast.map((id) => castChip(id, id === "sabrina" ? "brand" : "")).join("")}</div>
        <div class="prompt-head" style="margin:0"><span>Prompt video</span><button class="btn sm" data-act="copy-prompt" data-i="${ep.shots.indexOf(s)}" data-f="mv">Salin</button></div>
        <div class="prompt-box">${esc(videoPrompt(s))}</div>
      </div>
    </div>`;
  }

  function timelineHTML(ep, s) {
    const target = +S.project.epSeconds || 60;
    const total = shotSec(ep);
    const span = Math.max(total, target) + 5;
    const pps = PPS(), W = span * pps;
    const st = shotStarts(ep);
    const t = edTime[ep.id] || 0;
    const step = edZoom >= 1.5 ? 2 : edZoom >= 0.8 ? 5 : 10;
    const ticks = []; for (let x = 0; x <= span; x += step) ticks.push(`<span style="left:${x * pps}px">${fmtMS(x)}</span>`);
    const clip = (cls, sh, i, inner, title) => `<button class="clip ${cls} ${sh === s ? "on" : ""}" style="left:${st[i] * pps + 1}px;width:${Math.max(4, (+sh.dur || 0) * pps - 3)}px" data-act="ed-select" data-id="${esc(sh.id)}" title="${esc(title)}">${inner}${cls.startsWith("vid") ? `<span class="grip" data-grip="${esc(sh.id)}"></span>` : ""}</button>`;
    const lane = (cls, icon, label, items) => `<div class="tl-track ${cls}"><div class="tl-label" title="${label}">${ico(icon)}</div><div class="tl-lane" style="width:${W}px">${items}</div></div>`;
    const textClips = ep.shots.map((sh, i) => sh.dialog ? clip("text", sh, i, `${ico("text")}<span>${esc(sh.dialog)}</span>`, sh.dialog) : "").join("");
    const vidClips = ep.shots.map((sh, i) => { const n = Math.max(1, Math.round((+sh.dur || 0) * pps / 46)); const im = media(ep, sh, "img"); const kvu = im ? "" : kvFirst(ep, sh.scene); const fr = im ? `<i style="background:#111 url('${im.url}') center/cover"></i>` : kvu ? `<i class="kvf" style="background:#111 url('${kvu}') center/cover"></i>` : "<i></i>"; return clip(`vid ${sh.cast.includes("sabrina") ? "sab" : ""} ${media(ep, sh, "vid") ? "has-vid" : ""}`, sh, i, `<span class="frames">${fr.repeat(n)}</span><span class="meta"><b>${esc(sh.id)}</b>${esc(sh.title)}</span>`, `${sh.id} ${sh.title} · ${sh.dur}s`); }).join("");
    const voiceClips = ep.shots.map((sh, i) => sh.dialog ? clip("voice", sh, i, `${ico("mic")}<span>${esc(splitDialog(sh.dialog).who || "Suara")}</span>`, sh.dialog) : "").join("");
    const sfxClips = ep.shots.map((sh, i) => sh.sound ? clip("sfx", sh, i, `${ico("music")}<span>${esc(sh.sound)}</span>`, sh.sound) : "").join("");
    return `<div class="tl-bar">
        <div class="tl-tools"><button data-act="shot-dup" title="Duplikat shot">${ico("copy")}</button><button data-act="shot-add" title="Tambah shot">${ico("plus")}</button><button data-act="agent" data-kind="video" title="Salin perintah prompt video">${ico("spark")}</button><button data-act="mode" data-v="card" title="Tampilan kartu">${ico("layers")}</button><button data-act="shot-del" title="Hapus shot">${ico("trash")}</button></div>
        <div class="tl-time"><span>${fmtTC(t)} /</span> ${fmtTC(total)}</div>
        <div class="tl-zoom"><button data-act="zoom" data-d="1" title="Perbesar">+</button><button data-act="zoom" data-d="-1" title="Perkecil">−</button><button data-act="zoom" data-d="0" title="Pas lebar">⤢</button></div>
      </div>
      <div class="tl-scroll" id="tl-scroll"><div class="tl-inner" style="width:${W + 52}px">
        <div class="tl-ruler" data-ruler="1" style="width:${W}px">${ticks.join("")}</div>
        ${lane("", "text", "Teks / dialog", textClips)}
        ${lane("video", "film", "Video", vidClips)}
        ${lane("", "mic", "Suara", voiceClips)}
        ${lane("", "music", "SFX & musik", sfxClips)}
        <div class="tl-target" style="left:${52 + target * pps}px"><b>target ${target}s</b></div>
        <div class="tl-playhead" id="tl-playhead" style="left:${52 + t * pps}px"></div>
      </div></div>`;
  }

  function viewEditor(ep) {
    const s = selShot(ep);
    return `<div class="editor">
      <aside class="panel inspector" id="ed-inspector">${shotForm(ep, s, true)}</aside>
      <section class="panel stage">
        <div id="ed-preview">${previewHTML(ep, s)}</div>
        <div class="transport">
          <div class="file">${esc(ep.id)}_${esc(ep.title.replace(/\s+/g, "_"))}.mp4</div>
          <div class="ctl"><button data-act="ed-step" data-d="-1" title="Shot sebelumnya">${ico("prev")}</button><button class="play" data-act="ed-play" id="ed-play" title="Putar (spasi)">${ico(playT ? "pause" : "play")}</button><button data-act="ed-step" data-d="1" title="Shot berikutnya">${ico("next")}</button></div>
          <div class="right">${agentBtn("storyboard", "Perintah storyboard", "sm")}<button class="btn sm" data-act="import-shots">⇩ Impor JSON</button></div>
        </div>
      </section>
      <section class="panel timeline" id="ed-timeline">${timelineHTML(ep, s)}</section>
    </div>`;
  }
  function refreshEditor(withInspector) {
    const r = route(); if (r.page !== "storyboard" || boardMode !== "editor" || !$("#ed-preview")) return;
    const ep = r.ep, s = selShot(ep); if (!s) return;
    const sc = $("#tl-scroll") ? $("#tl-scroll").scrollLeft : 0;
    $("#ed-preview").innerHTML = previewHTML(ep, s);
    $("#ed-timeline").innerHTML = timelineHTML(ep, s);
    $("#tl-scroll").scrollLeft = sc;
    if (withInspector) $("#ed-inspector").innerHTML = shotForm(ep, s, true);
    syncVideo();
  }
  function syncVideo() {
    const v = $(".phone video.ph-media"); if (!v) return;
    const off = +v.dataset.offset || 0;
    const go = () => { try { v.currentTime = Math.min(off, Math.max(0, (v.duration || off) - 0.05)); } catch (e) {} if (playT) v.play().catch(() => {}); };
    if (v.readyState >= 1) go(); else v.addEventListener("loadedmetadata", go, { once: true });
  }
  function keepPlayheadVisible(ep) {
    const sc = $("#tl-scroll"); if (!sc) return;
    const x = 52 + (edTime[ep.id] || 0) * PPS();
    if (x < sc.scrollLeft + 40 || x > sc.scrollLeft + sc.clientWidth - 40) sc.scrollLeft = x - sc.clientWidth / 3;
  }
  function stopPlay() { clearInterval(playT); playT = null; const b = $("#ed-play"); if (b) b.innerHTML = ico("play"); const v = $(".phone video.ph-media"); if (v) v.pause(); }
  function togglePlay() {
    const ep = route().ep; if (!ep || !ep.shots.length) return;
    if (playT) return stopPlay();
    const total = shotSec(ep);
    if ((edTime[ep.id] || 0) >= total - 0.05) edTime[ep.id] = 0;
    $("#ed-play").innerHTML = ico("pause");
    let last = performance.now();
    setTimeout(() => { const v = $(".phone video.ph-media"); if (v) { const st = shotStarts(ep)[ep.shots.indexOf(selShot(ep))] || 0; try { v.currentTime = Math.max(0, (edTime[ep.id] || 0) - st); } catch (e) {} v.play().catch(() => {}); } }, 0);
    playT = setInterval(() => {
      const r = route(); if (r.page !== "storyboard" || r.ep !== ep) return stopPlay();
      const now = performance.now(); edTime[ep.id] = Math.min(total, (edTime[ep.id] || 0) + (now - last) / 1000); last = now;
      const s = shotAt(ep, edTime[ep.id]);
      if (s.id !== edSel[ep.id]) { edSel[ep.id] = s.id; refreshEditor(true); }
      else {
        const ph = $("#tl-playhead"); if (ph) ph.style.left = `${52 + edTime[ep.id] * PPS()}px`;
        const tt = $(".tl-time"); if (tt) tt.innerHTML = `<span>${fmtTC(edTime[ep.id])} /</span> ${fmtTC(total)}`;
        const tr = $(".phone .track i"); if (tr) tr.style.width = `${(edTime[ep.id] / total) * 100}%`;
        const tc = $(".phone .ph-time span"); if (tc) tc.textContent = fmtTC(edTime[ep.id]);
      }
      keepPlayheadVisible(ep);
      if (edTime[ep.id] >= total) stopPlay();
    }, 50);
  }

  let kvOpen = true;
  // Workflow KV per episode: "manual" (KV diunggah sendiri) atau "auto" (ref2movie RunningHub lewat Claude in Chrome).
  const RH_DEFAULT = "https://www.runninghub.ai/zh-cn/ai-detail/2123294967665070082";
  const kvAuto = (ep) => ep && ep.kvMode === "auto";
  const kvModeSeg = (ep) => `<div class="seg" title="Workflow KV episode ini"><button class="${kvAuto(ep) ? "" : "on"}" data-act="kv-mode" data-v="manual">KV manual</button><button class="${kvAuto(ep) ? "on" : ""}" data-act="kv-mode" data-v="auto">KV otomatis</button></div>`;
  function kvStrip(ep) {
    const sc = scenesOf(ep); if (!sc.length) return "";
    const total = sum(sc, (x) => sheetsOf(kvId(ep, x.sc)).length);
    const auto = kvAuto(ep);
    return `<details class="card kv-strip" ${kvOpen ? "open" : ""} data-kvstrip="1">
      <summary><span><b>KV per adegan</b> <small>${auto ? "otomatis" : "manual"} · ${total} gambar · ${sc.length} adegan</small></span><span class="kv-thumbs">${sc.map((x) => { const u = kvFirst(ep, x.sc); return u ? `<img src="${u}" alt="" title="${esc(x.sc)}">` : `<i title="${esc(x.sc)} belum ada KV">${esc(x.sc.replace(/^SC0*/, ""))}</i>`; }).join("")}</span></summary>
      <div class="kv-mode-row">${kvModeSeg(ep)}<small class="muted">${auto
        ? "KV dibuat otomatis: Claude in Chrome menjalankan ref2movie di RunningHub dari character sheet & plate lokasi, lalu mengambil satu frame per adegan sebagai KV. Seret hasilnya ke sini; KV manual tetap boleh ditambahkan sebagai acuan."
        : "KV dimasukkan manual: seret atau unggah gambar KV ke tiap adegan. KV dipakai sebagai acuan warna, cahaya, dan tata ruang semua shot di adegan itu."}</small><label class="btn sm" title="Pilih banyak gambar sekaligus. Nama file yang memuat nomor adegan (SC002…) langsung masuk ke adegannya.">⇧ Unggah beberapa KV<input type="file" accept="image/*" multiple data-act="kv-bulk" hidden></label>${auto ? agentBtn("runninghub", "Perintah RunningHub (Claude in Chrome)", "sm primary") : ""}</div>
      ${kvInbox(ep)}
      <div class="kv-grid">${sc.map((x) => `<div class="kv-scene"><div class="kv-h"><b class="mono">${esc(x.sc)}</b> <span>${esc(x.heading)}</span><small>${ep.shots.filter((s) => s.scene === x.sc).length} shot</small></div>${sheetGallery(kvId(ep, x.sc), true)}</div>`).join("")}</div>
    </details>`;
  }
  function viewStoryboard(ep) {
    const target = +S.project.epSeconds || 60;
    const t = shotSec(ep);
    const n = ep.shots.length;
    const avg = n ? t / n : 0;
    const closeN = ep.shots.filter((s) => CLOSE.has(s.scale)).length;
    const unset = ep.shots.filter((s) => !SCALES.includes(s.scale)).length;
    const scenes = [...new Set(ep.shots.map((s) => s.scene))];
    const shots = boardScene ? ep.shots.filter((s) => s.scene === boardScene) : ep.shots;
    const seg = `<div class="seg"><button class="${boardMode === "editor" ? "on" : ""}" data-act="mode" data-v="editor">Editor</button><button class="${boardMode === "card" ? "on" : ""}" data-act="mode" data-v="card">Kartu</button><button class="${boardMode === "list" ? "on" : ""}" data-act="mode" data-v="list">Daftar</button></div>`;
    const actions = boardMode === "editor" && n ? `${seg}<button class="btn primary" data-act="shot-add">+ Shot</button>`
      : `${seg}<button class="btn" data-act="import-shots">⇩ Impor JSON</button>${agentBtn("storyboard", "Perintah storyboard")}<button class="btn primary" data-act="shot-add">+ Shot</button>`;
    const sub = `${n} shot · ${fmtSec(t)} dari target ${target} dtk · rata-rata ${avg.toFixed(1)} dtk/shot · ${n ? Math.round((closeN / n) * 100) : 0}% shot dekat`;
    let html = epHead(ep, "Storyboard", sub, actions);
    html += kvStrip(ep);
    if (n && boardMode === "editor") return html + viewEditor(ep);
    if (!n) return html + `<div class="card empty"><h3>Belum ada shot</h3><p>Tambah shot manual, atau minta agen memecah naskah lalu tempel JSON-nya lewat <b>Impor JSON</b>.</p><div class="row" style="justify-content:center">${agentBtn("storyboard", "Salin perintah storyboard", "primary")}<button class="btn" data-act="import-shots">⇩ Impor JSON</button></div></div>`;
    const durSt = Math.abs(t - target) <= target * 0.1 ? "ok" : Math.abs(t - target) <= target * 0.2 ? "warn" : "bad";
    html += `<div class="grid g4">
      ${metric("Total durasi", `${t}<small> dtk</small>`, `Target ${target} dtk (±10%)`, durSt)}
      ${metric("Rata-rata per shot", `${avg.toFixed(2)}<small> dtk</small>`, `Format ${fmtSec(+S.project.epSeconds || 60)}: ≤ ${avgLimit()} dtk`, avg <= avgLimit() ? "ok" : "warn")}
      ${metric("Shot dekat", `${Math.round((closeN / n) * 100)}<small>%</small>`, "Close-up, ekstrem dekat, insert · ≥ 45% untuk layar HP", closeN / n >= 0.45 ? "ok" : "warn")}
      ${metric("Hook", `${ep.shots[0].dur}<small> dtk</small>`, "Shot pertama ≤ 3 dtk", +ep.shots[0].dur <= 3 ? "ok" : "warn")}
    </div>`;
    // rhythm bar
    const total = Math.max(t, target);
    const sceneSegs = [];
    ep.shots.forEach((s) => { const last = sceneSegs[sceneSegs.length - 1]; if (last && last.scene === s.scene) last.dur += +s.dur || 0; else sceneSegs.push({ scene: s.scene, dur: +s.dur || 0 }); });
    const ticks = []; for (let x = 0; x <= total; x += 10) ticks.push(x);
    html += `<div class="card section"><div class="card-h"><h2>Bar ritme</h2><span class="muted">lebar = durasi · warna = ukuran shot · garis atas = shot dekat · klik untuk membuka shot</span></div>
      <div class="rhythm">
        <div class="rhythm-scenes">${sceneSegs.map((g) => `<span style="width:${(g.dur / total) * 100}%">${esc(g.scene)}</span>`).join("")}</div>
        <div class="rhythm-track">${ep.shots.map((s) => `<button class="sc-${scaleIdx(s.scale)} ${CLOSE.has(s.scale) ? "close" : ""}" style="flex:0 0 calc(${((+s.dur || 0) / total) * 100}% - 2px)" data-act="shot-open" data-id="${s.id}" title="${esc(s.id)} ${esc(s.title)} · ${s.dur}s · ${esc(s.scale)}">${esc(s.id.replace(/^0+/, ""))}</button>`).join("")}</div>
        <div class="rhythm-target" style="left:${(target / total) * 100}%"><b>target ${target}s</b></div>
        <div class="rhythm-axis">${ticks.map((x) => `<span style="left:${(x / total) * 100}%">${x}s</span>`).join("")}</div>
      </div>
      <div class="legend">${SCALES.map((s, i) => `<span><i class="sc-${i + 1}"></i>${s}</span>`).join("")}<span><i class="sc-0"></i>Belum diisi${unset ? ` (${unset})` : ""}</span></div>
    </div>`;
    html += `<div class="row section">${["", ...scenes].map((sc) => `<button class="chip ${boardScene === sc ? "brand" : ""}" data-act="scene" data-v="${esc(sc)}">${sc || "Semua"}</button>`).join("")}</div>`;
    if (boardMode === "list") {
      html += `<div class="card section table-wrap"><table class="shot-list"><thead><tr><th>#</th><th>Judul</th><th>Adegan</th><th>Dtk</th><th>Ukuran</th><th>Kamera</th><th>Aksi</th><th>Dialog</th></tr></thead><tbody>
        ${shots.map((s) => `<tr data-act="shot-open" data-id="${s.id}"><td class="mono">${esc(s.id)}</td><td><b>${esc(s.title)}</b></td><td>${esc(s.scene)}</td><td>${s.dur}</td><td>${esc(s.scale)}</td><td>${esc(s.move)}</td><td>${esc(s.action)}</td><td class="line-say">${esc(s.dialog)}</td></tr>`).join("")}
      </tbody></table></div>`;
    } else {
      html += `<div class="shots section">${shots.map((s) => `
        <div class="card shot" data-act="shot-open" data-id="${s.id}">
          <div class="thumb ${s.cast.includes("sabrina") && !media(ep, s, "img") ? "has-sab" : ""}" ${media(ep, s, "img") ? `style="background:#111 url('${media(ep, s, "img").url}') center/cover"` : kvFirst(ep, s.scene) ? `style="background:#111 url('${kvFirst(ep, s.scene)}') center/cover"` : ""}><span>${esc(s.scene)}${media(ep, s, "vid") ? " ▶" : ""}</span><span class="dur">${s.dur}s</span></div>
          <div class="shot-body">
            <div class="shot-title"><span class="id">${esc(s.id)}</span>${esc(s.title)}</div>
            <div class="row"><span class="chip">${esc(s.scale || "ukuran?")}</span><span class="chip">${esc(s.move || "kamera?")}</span>${s.cast.includes("sabrina") ? `<span class="chip accent">${esc(S.sabrina.name)}</span>` : ""}</div>
            <div class="sae"><b>Awal</b><span>${esc(s.start)}</span><b>Aksi</b><span>${esc(s.action)}</span><b>Akhir</b><span>${esc(s.end)}</span></div>
            ${s.dialog ? `<div class="line-say">🎙 ${esc(s.dialog)}</div>` : ""}
          </div>
        </div>`).join("")}</div>`;
    }
    return html;
  }

  function viewPrompt(ep) {
    let html = epHead(ep, "Prompt", "Prompt first-frame & video disusun otomatis dari shot + frasa kunci aset. Ubah teks untuk mengunci versi manual.",
      `<button class="btn" data-act="copy-all-prompts">⧉ Salin semua prompt</button>${agentBtn("video", "Perintah tulis ulang prompt (EN)", "primary")}`);
    if (!ep.shots.length) return html + `<div class="card empty"><h3>Belum ada shot</h3><a href="#/ep/${ep.id}/storyboard">Buat storyboard dulu →</a></div>`;
    html += ep.shots.map((s) => {
      const i = ep.shots.indexOf(s);
      const missing = [!s.start && "titik awal", !s.action && "aksi", !s.end && "titik akhir", !s.cast.length && "aset"].filter(Boolean);
      const img = media(ep, s, "img"), vid = media(ep, s, "vid"), kvu = kvFirst(ep, s.scene);
      const pv = vid ? `<video src="${vid.url}" ${img ? `poster="${img.url}"` : ""} muted playsinline preload="metadata" controls></video>`
        : img ? `<img src="${img.url}" alt="First frame shot ${esc(s.id)}">`
        : kvu ? `<img class="kv" src="${kvu}" alt="KV ${esc(s.scene)}">` : `<span>${esc(s.scale || "Shot")}</span>`;
      const pvLabel = vid ? "VIDEO" : img ? "FIRST FRAME" : kvu ? "KV ADEGAN" : "BELUM ADA GAMBAR";
      return `<div class="card prompt-row">
        <div class="pr-preview"><div class="pr-frame ${s.cast.includes("sabrina") && !img && !kvu && !vid ? "has-sab" : ""}">${pv}<i>${pvLabel}</i><b>${s.dur}s</b></div></div>
        <div class="pr-info">
          <div class="pr-id"><span class="mono">SHOT ${esc(s.id)}</span> · ${esc(s.scene)}</div>
          <h3>${esc(s.title)}</h3>
          <div class="row"><span class="chip">${esc(s.scale || "ukuran?")}</span><span class="chip">${esc(s.move || "kamera?")}</span>${missing.length ? `<span class="chip warn">kurang: ${missing.join(", ")}</span>` : `<span class="chip ok">lengkap</span>`}</div>
          <div class="sae"><b>Awal</b><span>${esc(s.start || "—")}</span><b>Aksi</b><span>${esc(s.action || "—")}</span><b>Akhir</b><span>${esc(s.end || "—")}</span></div>
          ${s.dialog ? `<div class="line-say">🎙 ${esc(s.dialog)}</div>` : ""}
          <div class="row">${s.cast.map((id) => castChip(id, id === "sabrina" ? "accent" : (assetById(id) || {}).lock ? "brand" : "warn")).join("")}</div>
          <div><button class="btn sm" data-act="shot-open" data-id="${s.id}">Edit shot</button></div>
        </div>
        <div class="pr-col">
          <div class="prompt-head"><span>First frame (gambar)${s.ff ? " · manual" : ""}</span><span class="row">${s.ff ? `<button class="btn sm" data-act="prompt-reset" data-i="${i}" data-f="ff">↺ Otomatis</button>` : ""}<button class="btn sm" data-act="copy-prompt" data-i="${i}" data-f="ff">⧉ Salin</button></span></div>
          <div class="prompt-box ${s.ff ? "edited" : ""}" contenteditable="plaintext-only" data-prompt="${i}" data-f="ff">${esc(firstFramePrompt(s))}</div>
        </div>
        <div class="pr-col">
          <div class="prompt-head"><span>Video (${s.dur}s)${s.mv ? " · manual" : ""}</span><span class="row">${s.mv ? `<button class="btn sm" data-act="prompt-reset" data-i="${i}" data-f="mv">↺ Otomatis</button>` : ""}<button class="btn sm" data-act="copy-prompt" data-i="${i}" data-f="mv">⧉ Salin</button></span></div>
          <div class="prompt-box ${s.mv ? "edited" : ""}" contenteditable="plaintext-only" data-prompt="${i}" data-f="mv">${esc(videoPrompt(s))}</div>
        </div>
      </div>`;
    }).join("");
    return html;
  }

  function viewProduksi(ep) {
    const p = prodStats(ep);
    const auto = kvAuto(ep);
    let html = epHead(ep, "Produksi", "Status generate per shot. Klik status untuk mengganti: belum → antre → jadi → tidak perlu.",
      `${kvModeSeg(ep)}${auto ? agentBtn("runninghub", "Perintah RunningHub", "primary") : agentBtn("produce", "Perintah pratinjau batch", "primary")}${agentBtn("edit", "Perintah edit & render")}<button class="btn" data-act="export-openfilm" data-ep="${ep.id}" ${ep.shots.length ? "" : "disabled"} title="ZIP film.html untuk OpenFilm">⇩ Paket OpenFilm</button>`);
    if (!ep.shots.length) return html + `<div class="card empty"><h3>Belum ada shot</h3><a href="#/ep/${ep.id}/storyboard">Buat storyboard dulu →</a></div>`;
    const by = (k) => { let d = 0, q = 0, t = 0; ep.shots.forEach((s) => { const v = s.prod[k] || "belum"; if (v === "-") return; t++; if (v === "jadi") d++; if (v === "antre") q++; }); return { d, q, t }; };
    html += `<div class="grid g4">
      ${metric("Total job", `${p.done}<small> / ${p.total}</small>`, `${p.queue} sedang antre`, p.total && p.done === p.total ? "ok" : "")}
      ${PROD_KEYS.map(([k, l]) => { const b = by(k); return `<div class="card metric"><div class="k"><span>${l}</span><span>${b.d}/${b.t}</span></div><div class="bar"><i class="b-ok" style="width:${b.t ? (b.d / b.t) * 100 : 0}%"></i><i class="b-warn" style="width:${b.t ? (b.q / b.t) * 100 : 0}%"></i></div><div class="t">${b.q} antre · ${b.t - b.d - b.q} belum</div></div>`; }).join("")}
    </div>
    ${auto
      ? `<div class="hint section">⚙ <b>Workflow KV otomatis</b>: salin <b>Perintah RunningHub</b> ke Claude Code yang tersambung ke Claude in Chrome. Agen membuka aplikasi ref2movie MiniMax di RunningHub (akunmu sendiri), menyiapkan pratinjau dan biaya, dan baru menekan Run setelah kamu konfirmasi. Hasil video dan KV per adegan diunduh ke folder <code>${esc(ep.id)}-runninghub/</code>, lalu diseret ke dashboard.
        <label class="rh-url">Aplikasi RunningHub <input type="text" data-bind="project.rhUrl" value="${esc(S.project.rhUrl || RH_DEFAULT)}" spellcheck="false"></label></div>`
      : `<div class="hint section">⚠ Sesuai prinsip <b>drama-skills</b>: generate berbayar baru dijalankan setelah pratinjau batch dikonfirmasi. Dashboard ini tidak memanggil API apa pun — salin perintah pratinjau ke agen, periksa, lalu konfirmasi di sana.</div>`}
    ${gradeCard(ep)}
    <div class="card section table-wrap"><table class="shot-list"><thead><tr><th>#</th><th>Shot</th><th>Dtk</th>${PROD_KEYS.map(([, l]) => `<th>${l}</th>`).join("")}<th></th></tr></thead><tbody>
      ${ep.shots.map((s, i) => `<tr><td class="mono">${esc(s.id)}</td><td><b>${esc(s.title)}</b><br><small>${esc(s.scale)} · ${s.dialog ? "ada dialog" : "tanpa dialog"}</small></td><td>${s.dur}</td>
        ${PROD_KEYS.map(([k]) => { const v = s.prod[k] || "belum"; return `<td><button class="status s-${v === "-" ? "na" : v}" data-act="prod" data-i="${i}" data-k="${k}">${v === "-" ? "tidak perlu" : v}</button></td>`; }).join("")}
        <td><button class="btn sm" data-act="copy-prompt" data-i="${i}" data-f="mv">⧉ Prompt video</button></td></tr>`).join("")}
    </tbody></table></div>`;
    return html;
  }

  function viewReview(ep) {
    const r = reviewChecks(ep);
    const ic = { ok: "✓", warn: "!", bad: "✕" };
    const doneManual = r.manual.filter((c) => ep.review.checks[c.key]).length;
    return epHead(ep, "Review", "Cek otomatis dari dashboard + checklist kepatuhan brand yang wajib dicentang manusia.", agentBtn("review", "Perintah review independen", "primary")) + `
    <div class="grid g2">
      <div class="card"><div class="card-h"><h2>Cek otomatis</h2><span class="muted">${r.auto.filter((c) => c.level === "ok").length}/${r.auto.length} lolos</span></div>
        ${r.auto.map((c) => `<div class="check"><span class="ic ${c.level}">${ic[c.level]}</span><div style="flex:1">${esc(c.text)}</div>${c.link && c.level !== "ok" ? `<a class="btn sm" href="${c.link === "sabrina" ? "#/sabrina" : `#/ep/${ep.id}/${c.link}`}">Perbaiki</a>` : ""}</div>`).join("")}
      </div>
      <div class="card"><div class="card-h"><h2>Kepatuhan brand & keamanan</h2><span class="muted">${doneManual}/${r.manual.length} dicentang</span></div>
        ${r.manual.map((c) => `<label class="check"><input type="checkbox" data-act="check" data-key="${c.key}" ${ep.review.checks[c.key] ? "checked" : ""}><div>${esc(c.text)}</div></label>`).join("")}
        <div class="hint" style="margin-top:10px">Checklist ini panduan internal produksi, bukan pengganti persetujuan tim legal/kepatuhan.</div>
      </div>
    </div>
    <div class="card section"><label class="f">Catatan review<textarea data-bind="ep:review.notes" rows="5" placeholder="Hasil review dari /short-drama-review atau masukan tim…">${esc(ep.review.notes)}</textarea></label></div>`;
  }

  function templates() {
    const t = Object.assign({ "sabrina-siaga": window.SASTORY_SAMPLE }, window.SASTORY_TEMPLATES || {});
    return Object.entries(t).filter(([, v]) => v && v.project);
  }
  let prevProject = null;
  try { prevProject = JSON.parse(localStorage.getItem(KEY + ".prev") || "null"); } catch (e) {}
  function switchProject(data, label) {
    try { localStorage.setItem(KEY + ".prev", JSON.stringify(S)); prevProject = clone(S); } catch (e) { /* terlalu besar → tetap lanjut */ }
    S = clone(data); S.assets = S.assets || []; S.episodes.forEach(ensureEp);
    currentEpId = S.episodes[0] && S.episodes[0].id;
    save(); location.hash = "#/"; render(); toast(`Proyek dimuat: ${label}`);
  }
  function viewExport() {
    const cur = S.templateId || "";
    return `<div class="page-head"><div><h1>Ekspor & proyek</h1><p>Ganti proyek, unduh dokumen produksi per episode (Markdown), atau cadangkan seluruh proyek (JSON).</p></div></div>
    <div class="card"><div class="card-h"><h2>Proyek tersedia</h2>${prevProject ? `<button class="btn sm" data-act="restore-prev">↺ Kembalikan proyek sebelumnya (${esc(prevProject.project ? prevProject.project.title : "?")})</button>` : ""}</div>
      <div class="grid g2">${templates().map(([id, t]) => `<div class="next-item"><div class="grow"><b>${esc(t.project.title)}</b>${(cur ? cur === id : id === "sabrina-siaga" && S.project.title === t.project.title) ? ` <span class="chip ok">aktif</span>` : ""}<br><small>${esc(t.project.logline).slice(0, 150)}…</small><br><small>${t.episodes.length} episode · ${fmtSec(t.project.epSeconds)} / episode</small></div><button class="btn sm ${id === "mentor-boy" ? "primary" : ""}" data-act="load-template" data-id="${esc(id)}">Muat</button></div>`).join("")}</div>
      <p class="muted" style="margin-bottom:0">Memuat proyek mengganti data di browser ini. Proyek yang sedang aktif disimpan otomatis dan bisa dikembalikan dengan satu klik (cadangan JSON tetap disarankan).</p>
    </div>
    <div class="grid g2 section">
      <div class="card"><div class="card-h"><h2>Proyek</h2></div>
        <div class="row"><button class="btn primary" data-act="export-json">⇩ Cadangan JSON</button><button class="btn" data-act="import-json">⇧ Impor JSON</button><button class="btn danger" data-act="reset">↺ Kembalikan contoh</button></div>
        <p class="muted">Data tersimpan di browser ini. Cadangkan JSON secara rutin atau sebelum pindah perangkat.</p>
        <div class="row"><button class="btn" data-act="export-bible">⇩ Character bible & visual setting.md</button></div>
      </div>
      <div class="card"><div class="card-h"><h2>Dokumen untuk agen</h2></div>
        <p class="muted" style="margin-top:0">Simpan di folder proyek agar <code>/short-drama-*</code> bisa membaca: <code>Naskah.md</code>, <code>Visual-Setting.md</code>, <code>Storyboard.md</code>, <code>Prompt-Video.md</code>.</p>
        <h3 style="margin-bottom:6px">Editing & render: OpenFilm</h3>
        <p class="muted" style="margin:0">Kolom <b>Editing</b> mengunduh ZIP per episode: <code>film.html</code> vertikal 1080×1920, subtitle dari dialog, video / first frame / KV tiap shot, dan kartu penutup. Ekstrak, lalu jalankan <code>npx -y openfilm@latest open</code> untuk mengedit di Studio atau <code>… render</code> untuk MP4. Timeline bisa diekspor lagi ke DaVinci Resolve / Premiere dari Studio.</p>
      </div>
    </div>
    <div class="card section table-wrap"><table class="matrix"><thead><tr><th>Episode</th><th>Naskah</th><th>Storyboard</th><th>Prompt video</th><th>Semua</th><th>Editing (OpenFilm)</th></tr></thead><tbody>
      ${S.episodes.map((e) => `<tr><td><b>${e.id}</b> ${esc(e.title)}</td>
        <td><button class="btn sm" data-act="export-doc" data-ep="${e.id}" data-doc="naskah" ${e.script ? "" : "disabled"}>⇩ .md</button></td>
        <td><button class="btn sm" data-act="export-doc" data-ep="${e.id}" data-doc="storyboard" ${e.shots.length ? "" : "disabled"}>⇩ .md</button></td>
        <td><button class="btn sm" data-act="export-doc" data-ep="${e.id}" data-doc="prompt" ${e.shots.length ? "" : "disabled"}>⇩ .md</button></td>
        <td><button class="btn sm primary" data-act="export-doc" data-ep="${e.id}" data-doc="all">⇩ Paket .md</button></td>
        <td><button class="btn sm" data-act="export-openfilm" data-ep="${e.id}" ${e.shots.length ? "" : "disabled"} title="ZIP berisi film.html, subtitle, media shot, dan kartu penutup">⇩ film.html (.zip)</button></td></tr>`).join("")}
    </tbody></table></div>`;
  }

  // ---------- ekspor OpenFilm (film.html, https://github.com/openfilm/openfilm) ----------
  // satu ZIP per episode: film.html 1080×1920 + subtitle WebVTT + media shot + kartu penutup.
  // Shot tanpa media memakai KV adegan (zoom pelan) atau kartu slate, supaya film tetap bisa diputar & di-render.
  const CRC_T = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = (u8) => { let c = 0xffffffff; for (let i = 0; i < u8.length; i++) c = CRC_T[(c ^ u8[i]) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  function makeZip(files) { // files: [{ name, data: Uint8Array | string }], metode simpan (tanpa kompresi)
    const enc = new TextEncoder(); const parts = []; const central = []; let off = 0;
    const d = new Date(); const dt = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate(), tm = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
    for (const f of files) {
      const name = enc.encode(f.name); const data = typeof f.data === "string" ? enc.encode(f.data) : f.data; const crc = crc32(data);
      const h = new DataView(new ArrayBuffer(30));
      [[0, 0x04034b50, 4], [4, 20, 2], [6, 0x0800, 2], [8, 0, 2], [10, tm, 2], [12, dt, 2], [14, crc, 4], [18, data.length, 4], [22, data.length, 4], [26, name.length, 2], [28, 0, 2]].forEach(([o, v, n]) => n === 4 ? h.setUint32(o, v, true) : h.setUint16(o, v, true));
      const c = new DataView(new ArrayBuffer(46));
      [[0, 0x02014b50, 4], [4, 20, 2], [6, 20, 2], [8, 0x0800, 2], [10, 0, 2], [12, tm, 2], [14, dt, 2], [16, crc, 4], [20, data.length, 4], [24, data.length, 4], [28, name.length, 2], [30, 0, 2], [32, 0, 2], [34, 0, 2], [36, 0, 2], [38, 0, 4], [42, off, 4]].forEach(([o, v, n]) => n === 4 ? c.setUint32(o, v, true) : c.setUint16(o, v, true));
      parts.push(new Uint8Array(h.buffer), name, data); central.push(new Uint8Array(c.buffer), name);
      off += 30 + name.length + data.length;
    }
    const csize = central.reduce((a, b) => a + b.length, 0); const e = new DataView(new ArrayBuffer(22));
    [[0, 0x06054b50, 4], [8, files.length, 2], [10, files.length, 2], [12, csize, 4], [16, off, 4]].forEach(([o, v, n]) => n === 4 ? e.setUint32(o, v, true) : e.setUint16(o, v, true));
    return new Blob([...parts, ...central, new Uint8Array(e.buffer)], { type: "application/zip" });
  }
  const vttTime = (t) => { const ms = Math.round(t * 1000); const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60; return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(ms % 1000).padStart(3, "0")}`; };
  const vttEsc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/-->/g, "→");
  const t3 = (n) => Math.round(n * 1000) / 1000;
  const extOf = (type, name) => (String(name).match(/\.(\w{2,4})$/) || [])[1] || ({ "video/mp4": "mp4", "video/webm": "webm", "video/quicktime": "mov", "image/png": "png", "image/webp": "webp" }[type] || (/^video/.test(type) ? "mp4" : "jpg"));
  function ofCard({ kicker = "", title = "", sub = "", note = "" }) {
    return `<!doctype html>
<html lang="id"><head><meta charset="utf-8"><style>
html,body{margin:0;width:100%;height:100%;background:#0f0f10;color:#fff;font-family:Arial,Helvetica,sans-serif}
.w{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 9vw}
.k{font-size:3.6vw;letter-spacing:.35em;color:#ff5b24;margin-bottom:2.5vh;text-transform:uppercase}
.j{font-size:8.5vw;font-weight:700;line-height:1.12}
.s{font-size:3.8vw;opacity:.75;margin-top:2.5vh;line-height:1.45}
.n{position:absolute;left:6vw;right:6vw;bottom:6vh;font-size:2.8vw;opacity:.5;line-height:1.4}
</style></head><body><div class="w"><div class="k">${esc(kicker)}</div><div class="j">${esc(title)}</div><div class="s">${esc(sub)}</div></div><div class="n">${esc(note)}</div>
<script>
const w = document.querySelector(".w");
window.film = { frame(t) { const o = Math.min(1, t / 0.4); w.style.opacity = o; w.style.translate = "0 " + (1 - o) * 30 + "px"; } };
if (!window.filmHost) { const t0 = performance.now(); const l = () => { film.frame((performance.now() - t0) / 1000); requestAnimationFrame(l); }; l(); }
</script></body></html>
`;
  }
  async function fetchBytes(url) { const r = await fetch(url); if (!r.ok) throw new Error(r.status); return new Uint8Array(await r.arrayBuffer()); }
  // ---------- preset color grade ----------
  // Tiap preset = transfer linear per kanal (out = a·in + b, skala 0–255). Dipakai sama persis di pratinjau dashboard
  // (SVG feColorMatrix), di paket OpenFilm (grade.svg → ikut ter-render), dan untuk ffmpeg (lutrgb).
  const GRADES = [
    { id: "netral", name: "Netral", desc: "Tanpa grade, warna asli hasil generate", m: [1, 0, 1, 0, 1, 0] },
    { id: "indie", name: "Kafe indie Korea", desc: "Hangat redup, kontras rendah, hitam terangkat (dari video acuan)", m: [0.6647, 23.64, 0.7331, 10.01, 0.694, 4.21] },
    { id: "pagi", name: "Pagi hangat", desc: "Keemasan lembut untuk rumah, kos, momen hangat", m: [0.92, 18, 0.86, 12, 0.74, 6] },
    { id: "kantor", name: "Kantor biru bersih", desc: "Sejuk dan rapi, nuansa biru BRI", m: [0.88, 6, 0.93, 10, 0.98, 22] },
    { id: "malam", name: "Malam tenang", desc: "Lebih gelap dan dingin untuk adegan malam", m: [0.78, 0, 0.72, 4, 0.74, 16] },
    { id: "pastel", name: "Kenangan pastel", desc: "Pudar, kontras sangat rendah untuk kilas balik", m: [0.62, 70, 0.62, 64, 0.64, 66] },
  ];
  const gradeOf = (ep) => GRADES.find((g) => g.id === ((ep && ep.grade) || "netral")) || GRADES[0];
  const gradeMatrix = (g) => { const [ar, br, ag, bg, ab, bb] = g.m; const f = (x) => (x / 255).toFixed(4); return `${ar} 0 0 0 ${f(br)}  0 ${ag} 0 0 ${f(bg)}  0 0 ${ab} 0 ${f(bb)}  0 0 0 1 0`; };
  const gradeLut = (g) => { const [ar, br, ag, bg, ab, bb] = g.m; return `lutrgb=r='clip(${ar}*val+${br},0,255)':g='clip(${ag}*val+${bg},0,255)':b='clip(${ab}*val+${bb},0,255)'`; };
  const gradeSvg = (g) => `<svg xmlns="http://www.w3.org/2000/svg"><filter id="grade" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${gradeMatrix(g)}"/></filter></svg>\n`;
  // contoh warna untuk ubin preset bila episode belum punya gambar: kulit, kayu, dinding, kemeja biru
  const GRADE_SWATCH = [[214, 170, 140], [150, 105, 70], [232, 228, 218], [120, 150, 200]];
  const gradeApply = (g, [r, gg, b]) => { const [ar, br, ag, bg, ab, bb] = g.m; const c = (v) => Math.max(0, Math.min(255, Math.round(v))); return `rgb(${c(ar * r + br)},${c(ag * gg + bg)},${c(ab * b + bb)})`; };
  function ensureGradeDefs() {
    if (document.getElementById("grade-defs")) return;
    document.body.insertAdjacentHTML("beforeend", `<svg id="grade-defs" width="0" height="0" style="position:absolute" aria-hidden="true">${GRADES.map((g) => `<filter id="gr-${g.id}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${gradeMatrix(g)}"/></filter>`).join("")}</svg>`);
  }
  function gradeSample(ep) {
    for (const s of ep.shots) { const m = media(ep, s, "img"); if (m) return m.url; }
    for (const x of scenesOf(ep)) { const u = kvFirst(ep, x.sc); if (u) return u; }
    return "";
  }
  function gradeCard(ep) {
    ensureGradeDefs();
    const cur = gradeOf(ep); const u = gradeSample(ep);
    return `<div class="card section grade-card"><div class="row" style="justify-content:space-between;align-items:baseline"><h3 style="margin:0">Color grade <small class="muted">${esc(cur.name)}</small></h3><small class="muted">Dipakai di paket OpenFilm dan ikut ter-render ke MP4. ${u ? "Pratinjau memakai gambar episode ini." : "Belum ada gambar episode; pratinjau memakai contoh warna."}</small></div>
      <div class="grade-grid">${GRADES.map((g) => `<button class="grade-tile ${g.id === cur.id ? "on" : ""}" data-act="grade" data-v="${g.id}" title="${esc(g.desc)}">
        ${u ? `<span class="gt-img" style="background-image:url('${u}');filter:url(#gr-${g.id})"></span>` : `<span class="gt-sw">${GRADE_SWATCH.map((c) => `<i style="background:${gradeApply(g, c)}"></i>`).join("")}</span>`}
        <b>${esc(g.name)}</b><small>${esc(g.desc)}</small></button>`).join("")}</div></div>`;
  }

  async function buildOpenFilm(ep) {
    const files = []; const clips = []; const subs = []; const slates = []; const kvDone = new Map(); const warn = [];
    const W = 1080, H = 1920; let t = 0, nVid = 0, nImg = 0, nKv = 0, nSlate = 0;
    const grade = gradeOf(ep); const gcls = grade.id === "netral" ? "" : " graded";
    const box = `left: 0px; top: 0px; width: ${W}px; height: ${H}px`;
    for (const s of ep.shots) {
      const dur = t3(Math.max(0.5, +s.dur || 0)); const at = t3(t); const id = `shot-${s.id}`;
      const vid = media(ep, s, "vid"), img = media(ep, s, "img");
      let clip = "";
      try {
        if (vid) { const f = `media/${ep.id}-${s.id}.${extOf(vid.type, vid.name)}`; files.push({ name: f, data: await fetchBytes(vid.url) }); clip = `<video id="${id}" src="${f}#t=0,${dur}" at="${at}" class="shot${gcls}" style="${box}"></video>`; nVid++; }
        else if (img) { const f = `media/${ep.id}-${s.id}.${extOf(img.type, img.name)}`; files.push({ name: f, data: await fetchBytes(img.url) }); clip = `<img id="${id}" src="${f}#t=0,${dur}" at="${at}" class="shot still${gcls}" style="${box}">`; nImg++; }
      } catch (e) { warn.push(`media shot ${s.id} tidak terbaca`); }
      if (!clip) {
        const sh = sheetsOf(kvId(ep, s.scene)).find((x) => shMedia(x));
        let f = sh ? kvDone.get(sh.key) : null;
        if (sh && f === undefined) {
          const m = shMedia(sh); f = `media/kv-${s.scene}-${kvDone.size + 1}.${extOf(m.type || "", m.name || m.url)}`;
          try { files.push({ name: f, data: await fetchBytes(m.url) }); } catch (e) { f = null; warn.push(`KV ${s.scene} tidak terbaca`); }
          kvDone.set(sh.key, f);
        }
        if (f) { clip = `<img id="${id}" src="${f}#t=0,${dur}" at="${at}" class="shot kv${gcls}" style="${box}">`; nKv++; }
        else {
          const f2 = `pages/${id}.html`;
          files.push({ name: f2, data: ofCard({ kicker: `${ep.id} · ${s.scene} · shot ${s.id}`, title: s.title || `Shot ${s.id}`, sub: [s.scale, s.move].filter(Boolean).join(" · "), note: s.action || "" }) });
          clip = `<iframe id="${id}" src="${f2}#t=0,${dur}" at="${at}"></iframe>`; nSlate++;
        }
      }
      clips.push(`  ${clip}`);
      slates.push(`${vttTime(at)} --> ${vttTime(at + dur)} line:4% position:50% align:center\n${vttEsc(`${s.id} · ${s.title || ""}`)}`);
      const lines = String(s.dialog || "").split(/\n+/).map((x) => x.trim()).filter(Boolean);
      // potong kalimat panjang jadi subtitle ≤ ±70 karakter (2 baris di 1080 px), waktu sebanding panjang teks
      const pieces = [];
      lines.forEach((ln) => {
        const m = ln.match(DLG_RE); const who = m ? m[1].trim() : ""; const vo = !!(m && /VO|OS/i.test(m[2] || "")); const text = m ? m[3] : ln;
        let cur = "";
        (text.match(/[^.!?…]+[.!?…]*\s*/g) || [text]).forEach((sent) => {
          sent.split(/(?<=,)\s+/).forEach((part) => {
            if (cur && (cur + " " + part).trim().length > 70) { pieces.push({ who, vo, text: cur.trim() }); cur = ""; }
            cur = (cur + " " + part).trim();
          });
        });
        if (cur) pieces.push({ who, vo, text: cur.trim() });
      });
      const chars = pieces.reduce((n, p) => n + p.text.length, 0) || 1; let acc = 0;
      pieces.forEach((p) => {
        const a = at + (dur * acc) / chars + 0.08; acc += p.text.length; const b = at + (dur * acc) / chars - 0.08;
        subs.push(`${vttTime(a)} --> ${vttTime(Math.max(a + 0.4, b))} line:76% position:50% align:center size:88%\n${p.who ? `<v ${vttEsc(p.who)}>` : ""}${p.vo ? `<i>${vttEsc(p.text)}</i>` : vttEsc(p.text)}`);
      });
      t += dur;
    }
    const endLen = 3; const cta = String(S.project.cta || "").split(/\s+[—–-]\s+/);
    files.push({ name: "pages/penutup.html", data: ofCard({ kicker: S.sabrina.name || "Sabrina", title: cta[0] || S.project.title, sub: cta.slice(1).join(" — ") || `${ep.id} · ${ep.title}` }) });
    clips.push(`  <iframe id="penutup" src="pages/penutup.html#t=0,${endLen}" at="${t3(t)}"></iframe>`);
    const total = t3(t + endLen);
    const css = "STYLE\n::cue { font-family: Arial, Helvetica, sans-serif; font-size: 52px; font-weight: 700; color: #fff; background: transparent; text-shadow: 0 0 8px #000, 0 2px 4px #000, 0 0 2px #000; }\n::cue(i) { color: #ffe2b8; }\n";
    files.push({ name: "captions/subtitle.vtt", data: `WEBVTT\n\n${css}\n${subs.join("\n\n")}\n` });
    files.push({ name: "captions/nomor-shot.vtt", data: `WEBVTT\n\nSTYLE\n::cue { font-family: monospace; font-size: 30px; color: #fff; background: rgba(255, 91, 36, .85); }\n\n${slates.join("\n\n")}\n` });
    const film = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=${W}, height=${H}">
<title>${esc(`${S.project.title} ${ep.id} · ${ep.title}`)}</title>
<style>
  .shot { object-fit: cover; }
  .kv { animation: kv-zoom var(--clip-length) linear both; }
  @keyframes kv-zoom { from { scale: 1; } to { scale: 1.08; } }
${gcls ? `  /* color grade: ${grade.name} (grade.svg) */\n  .graded { filter: url(grade.svg#grade); }\n` : ""}</style>
</head>
<body>
<section title="Nomor shot (sembunyikan sebelum render final)" hidden>
  <track kind="captions" src="captions/nomor-shot.vtt" srclang="id" label="Nomor shot">
</section>
<section title="Subtitle">
  <track kind="subtitles" src="captions/subtitle.vtt" srclang="id" label="Indonesia">
</section>
<section title="Gambar">
${clips.join("\n")}
</section>
</body>
</html>
`;
    files.unshift({ name: "film.html", data: film });
    if (gcls) files.push({ name: "grade.svg", data: gradeSvg(grade) });
    const dir = `${ep.id}-openfilm`;
    files.push({ name: "BACA-SAYA.txt", data: `${S.project.title} — ${ep.id} "${ep.title}"
Diekspor dari SABRINACTION untuk OpenFilm (https://github.com/openfilm/openfilm).

Durasi ${fmtSec(total)} (${ep.shots.length} shot + kartu penutup ${endLen} dtk), 1080×1920.
Isi gambar: ${nVid} video · ${nImg} first frame · ${nKv} KV adegan (zoom pelan) · ${nSlate} kartu slate (belum ada media).
Color grade: ${grade.name}${gcls ? ` (grade.svg, ikut ter-render). Setara ffmpeg: -vf "${gradeLut(grade)}"` : " (tanpa grade)"}.
${warn.length ? `Peringatan: ${warn.join("; ")}\n` : ""}
Butuh Node 22.2+ dan ffmpeg. Ekstrak ZIP ini, lalu di dalam folder ${dir}:

  npx -y openfilm@latest look      cek film & lihat lembar kontak
  npx -y openfilm@latest open      buka di OpenFilm Studio (edit potongan, subtitle, warna)
  npx -y openfilm@latest render    render MP4 di samping film.html

Track "Nomor shot" disembunyikan (hidden). Tampilkan di Studio untuk review, sembunyikan lagi sebelum render final.
Subtitle diambil dari kolom dialog tiap shot. Kalau media shot diperbarui di dashboard, ekspor ulang — perubahan manual
di Studio tersimpan di film.html, jadi salin dulu film.html lama bila perlu.
` });
    return { blob: makeZip(files.map((f) => ({ ...f, name: `${dir}/${f.name}` }))), name: `${dir}.zip`, stats: { nVid, nImg, nKv, nSlate, total, warn } };
  }
  async function exportOpenFilm(ep) {
    if (!ep || !ep.shots.length) return toast("Episode ini belum punya shot");
    toast("Menyiapkan paket OpenFilm…");
    try {
      const r = await buildOpenFilm(ep);
      const a = document.createElement("a"); a.href = URL.createObjectURL(r.blob); a.download = r.name; document.body.append(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      const st = r.stats; toast(`${r.name} · ${fmtSec(st.total)} · ${st.nVid} video, ${st.nImg} gambar, ${st.nKv} KV, ${st.nSlate} slate${st.warn.length ? " · ada peringatan" : ""}`);
    } catch (e) { toast("Gagal ekspor OpenFilm: " + e.message); }
  }

  // ---------- markdown export ----------
  function mdBible() {
    const s = S.sabrina;
    return `# ${S.project.title} — Character bible & visual setting\n\n## ${s.fullName || s.name}\n\n- Status visual: ${s.verified ? "sudah diverifikasi dengan aset resmi" : "BELUM diverifikasi (placeholder)"}\n- Peran: ${s.role}\n- Penampilan: ${s.look}\n- Kostum: ${s.outfit}\n- Suara: ${s.voice}\n- Kepribadian: ${s.personality}\n- Catchphrase: ${s.catchphrase}\n- Frasa kunci: ${s.lock}\n\n### Boleh\n${s.dos.map((x) => `- ${x}`).join("\n")}\n\n### Jangan\n${s.donts.map((x) => `- ${x}`).join("\n")}\n\n${S.assets.map((a) => `## ${a.kind} · ${a.name}\n\n- id: ${a.id}\n- ${a.desc}\n- Frasa kunci: ${a.lock || "(hanya suara / belum ada)"}\n`).join("\n")}`;
  }
  function mdDoc(ep, doc) {
    if (doc === "naskah") return `# ${ep.id} · ${ep.title}\n\n> Beat — Hook: ${ep.beats.hook || "-"} · Pesan: ${ep.beats.message || "-"} · CTA: ${ep.beats.cta || "-"}\n\n${ep.script}`;
    if (doc === "storyboard") return `# ${ep.id} Storyboard\n\n${ep.shots.map((s) => `## SHOT-${ep.id}-${s.id} · ${s.title}\n\n- Adegan: ${ep.id}-${s.scene}\n- Durasi: ${s.dur}s\n- Tujuan: ${s.purpose || "-"}\n- Ukuran shot: ${s.scale}\n- Kamera: ${s.move}\n- Titik awal: ${s.start}\n- Aksi: ${s.action}\n- Titik akhir: ${s.end}\n- Aset: ${s.cast.map((id) => (assetById(id) || {}).name).filter(Boolean).join(", ")}\n- Suara: ${s.sound || "-"}\n- Dialog: ${s.dialog || "-"}\n\n### Prompt first frame\n> ${firstFramePrompt(s)}\n`).join("\n")}`;
    if (doc === "prompt") return `# ${ep.id} Prompt Video\n\n${ep.shots.map((s) => `## MOTION-${ep.id}-${s.id} · ${s.title}\n\n- Shot: SHOT-${ep.id}-${s.id}\n- Durasi: ${s.dur}s\n\n### Prompt siap salin\n> ${videoPrompt(s)}\n`).join("\n")}`;
    return ["naskah", "storyboard", "prompt"].map((d) => mdDoc(ep, d)).join("\n\n---\n\n");
  }

  // ---------- drawer: shot editor & brief ----------
  let drawerShot = null;
  const editorTarget = () => {
    const r = route();
    if (r.page !== "storyboard" || boardMode !== "editor" || !r.ep || !$("#ed-inspector")) return null;
    const s = selShot(r.ep); return s ? { ep: r.ep, s } : null;
  };
  const cur = () => drawerShot || editorTarget();
  function openShot(ep, id) {
    const s = ep.shots.find((x) => x.id === id);
    if (!s) return;
    drawerShot = { ep, s };
    const d = $("#drawer");
    d.innerHTML = `<div class="drawer-panel" role="dialog" aria-label="Edit shot" style="padding:0 0 30px;gap:0">${shotForm(ep, s, false).replace('class="drawer-head"', 'class="drawer-head" style="padding:12px 18px;top:0"')}</div>`;
    d.hidden = false;
  }
  function openBrief() {
    drawerShot = null;
    const p = S.project;
    const f = (k, label, rows, type = "text") => rows ? `<label class="f">${label}<textarea data-bind="project.${k}" data-chrome="1" rows="${rows}">${esc(p[k])}</textarea></label>` : `<label class="f">${label}<input type="${type}" data-bind="project.${k}" data-chrome="1" value="${esc(p[k])}"></label>`;
    const d = $("#drawer");
    d.innerHTML = `<div class="drawer-panel" role="dialog" aria-label="Brief seri"><div class="drawer-head"><h2>Brief seri</h2><button class="btn sm" data-act="drawer-close">Tutup ✕</button></div>
      ${f("title", "Judul seri")}${f("logline", "Logline", 3)}${f("goal", "Tujuan kampanye", 2)}${f("product", "Produk / layanan")}${f("audience", "Target audiens", 2)}${f("platform", "Platform")}
      <div class="grid g3">${f("aspect", "Rasio")}${f("epSeconds", "Detik / episode", 0, "number")}${f("epCount", "Jumlah episode", 0, "number")}</div>
      ${f("tone", "Tone")}${f("style", "Gaya visual (EN, masuk ke prompt)", 2)}${f("cta", "CTA seri")}
    </div>`;
    d.hidden = false;
  }
  function closeDrawer() { const d = $("#drawer"); d.hidden = true; d.classList.remove("dark"); drawerShot = null; render(); }

  // ---------- binding ----------
  function resolve(path) {
    if (path.startsWith("ep:")) return [route().ep, path.slice(3)];
    return [S, path];
  }
  function get(path) {
    const [root, p] = resolve(path);
    return p.split(".").reduce((o, k) => (o == null ? o : o[k]), root);
  }
  function set(path, val) {
    const [root, p] = resolve(path);
    const ks = p.split(".");
    const last = ks.pop();
    const obj = ks.reduce((o, k) => o[k], root);
    obj[last] = typeof obj[last] === "number" ? +val : val;
    save();
  }

  document.addEventListener("input", (e) => {
    const el = e.target;
    if (el.dataset.bind) {
      set(el.dataset.bind, el.value);
      if (el.dataset.chrome) { clearTimeout(set.t); set.t = setTimeout(() => renderChrome(route()), 300); }
    } else if (el.dataset.sbind && cur()) {
      const c = cur(), k = el.dataset.sbind;
      c.s[k] = k === "dur" ? Math.max(0, +el.value || 0) : el.value;
      if (k === "id") { c.s.id = el.value.trim() || c.s.id; if (!drawerShot) edSel[c.ep.id] = c.s.id; }
      const ff = $("#dr-ff"); if (ff) ff.textContent = firstFramePrompt(c.s);
      save();
      if (!drawerShot) { clearTimeout(refreshEditor.t); refreshEditor.t = setTimeout(() => { refreshEditor(false); renderChrome(route()); }, 180); }
    } else if (el.dataset.sheetLabel) {
      const sh = sheetsOf(el.dataset.sheetLabel).find((x) => x.key === el.dataset.key);
      if (sh) { sh.label = el.value; save(); }
    } else if (el.dataset.part && el.closest("#screenplay")) {
      onPreviewEdit(el);
    } else if (el.dataset.prompt != null) {
      const ep = route().ep; const s = ep.shots[+el.dataset.prompt];
      s[el.dataset.f] = el.textContent.trim();
      el.classList.add("edited"); save();
    }
  });
  document.addEventListener("toggle", (e) => { if (!e.target.dataset) return; if (e.target.dataset.kvstrip) kvOpen = e.target.open; if (e.target.dataset.story) storyOpen[e.target.dataset.story] = e.target.open; }, true);
  document.addEventListener("change", (e) => {
    const el = e.target;
    if (el.id === "ep-select") {
      if (el.value === "__new") return newEpisode();
      const r = route();
      const page = r.ep ? r.page : "cerita";
      location.hash = `#/ep/${el.value}/${page}`;
    } else if (el.dataset.cast && cur()) {
      const s = cur().s, id = el.dataset.cast;
      s.cast = el.checked ? [...new Set([...s.cast, id])] : s.cast.filter((x) => x !== id);
      el.parentElement.className = `chip ${el.checked ? "brand" : ""}`;
      const ff = $("#dr-ff"); if (ff) ff.textContent = firstFramePrompt(s); save();
      if (!drawerShot) refreshEditor(false);
    } else if (el.dataset.act === "verify") {
      S.sabrina.verified = el.checked; save(); render();
    } else if (el.dataset.act === "voice-upload" && el.files[0]) {
      setVoice(el.dataset.id, el.files[0]);
    } else if (el.dataset.act === "kv-bulk" && el.files.length) {
      const ep = route().ep; if (ep) addKvBulk(ep, el.files);
    } else if (el.dataset.kvMove != null) {
      const ep = route().ep; if (ep) moveKv(ep, KV_INBOX, el.value, el.dataset.kvMove);
    } else if (el.dataset.act === "sheet-upload" && el.files.length) {
      addSheets(el.dataset.id, el.files);
    } else if (el.dataset.assetTier != null) {
      S.assets[+el.dataset.assetTier].tier = el.value; save(); render();
    } else if (el.dataset.act === "media-upload" && el.files[0]) {
      const c = cur(); if (c) attachMedia(c.ep, c.s, el.files[0]);
    } else if (el.dataset.act === "ref-upload" && el.files[0]) {
      const img = new Image();
      img.onload = () => {
        const k = Math.min(1, 640 / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        S.sabrina.refImage = c.toDataURL("image/jpeg", 0.85);
        URL.revokeObjectURL(img.src); save(); render(); toast("Gambar referensi disimpan");
      };
      img.onerror = () => toast("Gambar tidak bisa dibaca");
      img.src = URL.createObjectURL(el.files[0]);
    } else if (el.dataset.act === "check") {
      const ep = route().ep; ep.review.checks[el.dataset.key] = el.checked; save(); render();
    } else if (el.dataset.bind === "project.epSeconds" || el.dataset.bind === "project.epCount") {
      set(el.dataset.bind, Math.max(1, +el.value || 1));
    }
  });

  function newEpisode() {
    const n = S.episodes.length + 1;
    const id = `EP${String(n).padStart(3, "0")}`;
    const title = (prompt(`Judul ${id}:`, "Episode baru") || "").trim();
    if (!title) { render(); return; }
    S.episodes.push(ensureEp({ id, title, beats: { cta: S.project.cta }, script: "", shots: [] }));
    save(); location.hash = `#/ep/${id}/cerita`; render();
  }
  function pasteDialog(title, placeholder, onOk) {
    drawerShot = null;
    const d = $("#drawer");
    d.innerHTML = `<div class="drawer-panel"><div class="drawer-head"><h2>${esc(title)}</h2><button class="btn sm" data-act="drawer-close">Tutup ✕</button></div>
      <textarea id="paste-src" rows="18" class="mono" placeholder="${esc(placeholder)}"></textarea>
      <div class="row"><button class="btn primary" id="paste-ok">Impor</button><span class="muted" id="paste-err"></span></div></div>`;
    d.hidden = false;
    $("#paste-src").focus();
    $("#paste-ok").onclick = () => {
      try { onOk($("#paste-src").value); closeDrawer(); }
      catch (err) { $("#paste-err").textContent = "Gagal: " + err.message; }
    };
  }
  const extractJson = (txt) => { const m = txt.match(/[\[{][\s\S]*[\]}]/); if (!m) throw new Error("tidak menemukan JSON"); return JSON.parse(m[0]); };

  document.addEventListener("click", (e) => {
    const ruler = e.target.closest("[data-ruler]");
    if (ruler) {
      const ep = route().ep; stopPlay();
      edTime[ep.id] = Math.max(0, Math.min(shotSec(ep), (e.clientX - ruler.getBoundingClientRect().left) / PPS()));
      edSel[ep.id] = shotAt(ep, edTime[ep.id]).id; refreshEditor(true); return;
    }
    if (e.target.closest("[data-grip]")) return;
    const el = e.target.closest("[data-act]");
    if (e.target.id === "drawer") return closeDrawer();
    if (!el || el.tagName === "INPUT") return;
    const act = el.dataset.act;
    const r = route();
    const ep = r.ep;
    switch (act) {
      case "agent": {
        const target = el.dataset.ep ? epById(el.dataset.ep) : ep || epById(currentEpId);
        copy(agentPrompt(el.dataset.kind, target, el.dataset.asset), el.dataset.kind === "sheetlock" ? "Perintah disalin — tempel ke Claude Code bersama file sheet-nya" : "Perintah disalin — tempel ke Claude Code");
        break;
      }
      case "edit-brief": openBrief(); break;
      case "drawer-close": closeDrawer(); break;
      case "new-ep": newEpisode(); break;
      case "del-ep":
        if (confirm(`Hapus ${ep.id} "${ep.title}"? Naskah dan storyboard episode ini ikut terhapus.`)) {
          S.episodes = S.episodes.filter((x) => x !== ep); save(); location.hash = "#/";
        }
        break;
      case "mode": stopPlay(); boardMode = el.dataset.v; render(); break;
      case "setting-mode": { const a = S.assets[+el.dataset.i]; if (!a) break; a.settingMode = el.dataset.v === "auto" ? "auto" : "manual"; save(); render(); toast(`${a.name}: setting ${a.settingMode === "auto" ? "otomatis dari KV" : "manual"}`); break; }
      case "setting-kv-zip": exportKvZip(el.dataset.id); break;
      case "grade": { const ep = route().ep; if (!ep) break; ep.grade = el.dataset.v; save(); render(); toast(`${ep.id}: color grade ${gradeOf(ep).name}`); break; }
      case "voice-del": { const o = voiceOwner(el.dataset.id); if (o && confirm(`Hapus suara acuan ${el.dataset.id === "sabrina" ? S.sabrina.name : o.name}?`)) delVoice(el.dataset.id); break; }
      case "kv-mode": { const ep = route().ep; if (!ep) break; ep.kvMode = el.dataset.v === "auto" ? "auto" : "manual"; save(); render(); toast(`${ep.id}: workflow KV ${ep.kvMode === "auto" ? "otomatis (RunningHub)" : "manual"}`); break; }
      case "scene": boardScene = el.dataset.v; render(); break;
      case "shot-open": openShot(ep, el.dataset.id); break;
      case "shot-nav": {
        const c = cur(); if (!c) break;
        const i = c.ep.shots.indexOf(c.s) + +el.dataset.d; const nx = c.ep.shots[i];
        if (!nx) break;
        if (drawerShot) { render(); openShot(c.ep, nx.id); } else { selectShot(c.ep, nx); refreshEditor(true); keepPlayheadVisible(c.ep); }
        break;
      }
      case "ed-select": {
        const s = ep.shots.find((x) => x.id === el.dataset.id); if (!s) break;
        stopPlay(); selectShot(ep, s); refreshEditor(true); break;
      }
      case "ed-step": {
        const s = selShot(ep); const nx = ep.shots[ep.shots.indexOf(s) + +el.dataset.d];
        if (nx) { stopPlay(); selectShot(ep, nx); refreshEditor(true); keepPlayheadVisible(ep); }
        break;
      }
      case "ed-play": togglePlay(); break;
      case "dur-step": {
        const c = cur(); if (!c) break;
        c.s.dur = Math.max(0.5, Math.min(15, (+c.s.dur || 0) + +el.dataset.d));
        const inp = el.parentElement.querySelector("input"); if (inp) inp.value = c.s.dur;
        save(); renderChrome(route());
        if (!drawerShot) refreshEditor(false);
        break;
      }
      case "zoom": {
        const d = +el.dataset.d;
        if (d === 0) { const sc = $("#tl-scroll"); edZoom = sc ? Math.max(0.3, (sc.clientWidth - 70) / ((Math.max(shotSec(ep), +S.project.epSeconds || 60) + 5) * 20)) : 1; }
        else edZoom = Math.min(4, Math.max(0.3, edZoom * (d > 0 ? 1.4 : 1 / 1.4)));
        refreshEditor(false); break;
      }
      case "shot-add": {
        const last = ep.shots[ep.shots.length - 1];
        const id = String(ep.shots.length + 1).padStart(3, "0");
        ep.shots.push({ id, scene: last ? last.scene : "SC001", title: "Shot baru", dur: 3, scale: "Medium", move: "Statis", purpose: "", start: "", action: "", end: "", cast: last ? [...last.cast] : [], sound: "", dialog: "", prod: { img: "belum", vid: "belum", vo: "belum" } });
        save();
        if (boardMode === "editor") { selectShot(ep, ep.shots[ep.shots.length - 1]); render(); keepPlayheadVisible(ep); }
        else { render(); openShot(ep, id); }
        break;
      }
      case "shot-dup": {
        const c0 = cur(); if (!c0) break;
        const { ep: e2, s } = c0; const i = e2.shots.indexOf(s);
        const c = clone(s); c.id = s.id + "b"; c.prod = { img: "belum", vid: "belum", vo: "belum" };
        e2.shots.splice(i + 1, 0, c); save();
        if (drawerShot) { render(); openShot(e2, c.id); } else { selectShot(e2, c); render(); }
        break;
      }
      case "shot-del": {
        const c0 = cur(); if (!c0) break;
        const { ep: e2, s } = c0;
        if (confirm(`Hapus shot ${s.id}?`)) {
          const i = e2.shots.indexOf(s);
          e2.shots = e2.shots.filter((x) => x !== s); save();
          delMedia(e2, s, "img"); delMedia(e2, s, "vid");
          if (drawerShot) closeDrawer(); else { const nx = e2.shots[Math.min(i, e2.shots.length - 1)]; if (nx) selectShot(e2, nx); render(); }
        }
        break;
      }
      case "import-shots":
        pasteDialog("Impor shot dari JSON", "Tempel JSON array hasil /short-drama-storyboard…", (txt) => {
          const arr = extractJson(txt);
          if (!Array.isArray(arr) || !arr.length) throw new Error("harus berupa array shot");
          const replace = !ep.shots.length || confirm(`Ganti ${ep.shots.length} shot yang ada? (Batal = tambahkan di belakang)`);
          const ids = new Set(allCast().map((a) => a.id));
          const shots = arr.map((x, i) => ensureEp({ shots: [{
            id: String(x.id || i + 1).padStart(3, "0"), scene: x.scene || "SC001", title: x.title || `Shot ${i + 1}`, dur: +x.dur || 3,
            scale: SCALES.includes(x.scale) ? x.scale : "", move: MOVES.includes(x.move) ? x.move : "Statis", purpose: x.purpose || "",
            start: x.start || "", action: x.action || "", end: x.end || "", cast: (x.cast || []).filter((c) => ids.has(c)), sound: x.sound || "", dialog: x.dialog || ""
          }] }).shots[0]);
          ep.shots = replace ? shots : ep.shots.concat(shots); save(); toast(`${shots.length} shot diimpor`);
        });
        break;
      case "copy-prompt": {
        const e2 = cur() ? cur().ep : ep; const s = e2.shots[+el.dataset.i];
        copy(el.dataset.f === "ff" ? firstFramePrompt(s) : videoPrompt(s)); break;
      }
      case "prompt-reset": { const s = ep.shots[+el.dataset.i]; delete s[el.dataset.f]; save(); render(); break; }
      case "copy-all-prompts":
        copy(ep.shots.map((s) => `SHOT ${s.id} · ${s.title} (${s.dur}s)\nFirst frame: ${firstFramePrompt(s)}\nVideo: ${videoPrompt(s)}`).join("\n\n"), `${ep.shots.length} prompt disalin`); break;
      case "prod": {
        const s = ep.shots[+el.dataset.i], k = el.dataset.k;
        const cur = s.prod[k] || "belum";
        s.prod[k] = PROD_CYCLE[(PROD_CYCLE.indexOf(cur) + 1) % PROD_CYCLE.length]; save(); render(); break;
      }
      case "ref-del": S.sabrina.refImage = ""; save(); render(); break;
      case "sheet-view": openSheetViewer(el.dataset.id, el.dataset.key); break;
      case "sheet-del": {
        const sh = sheetsOf(el.dataset.id).find((x) => x.key === el.dataset.key);
        if (sh && confirm(`Hapus "${sh.label}" dari ${ownerInfo(el.dataset.id).name}?`)) removeSheet(el.dataset.id, el.dataset.key);
        break;
      }
      case "media-del": {
        const c = cur(); if (!c) break;
        const kind = el.dataset.kind;
        if (!confirm(`Hapus ${kind === "img" ? "gambar first frame" : "video"} shot ${c.s.id} dari browser ini?`)) break;
        delMedia(c.ep, c.s, kind).then(() => { if (drawerShot) { render(); openShot(c.ep, c.s.id); } else refreshEditor(true); });
        break;
      }
      case "list-add": S.sabrina[el.dataset.key].push(""); save(); render(); break;
      case "list-del": S.sabrina[el.dataset.key].splice(+el.dataset.i, 1); save(); render(); break;
      case "asset-add": {
        const kind = el.dataset.kind;
        const name = (prompt(`Nama ${kind === "Karakter" ? `karakter ${el.dataset.tier || "pendukung"}` : kind.toLowerCase()} baru:`) || "").trim(); if (!name) break;
        let id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "aset";
        while (assetById(id)) id += "-2";
        S.assets.push(Object.assign({ id, kind, name, desc: "", lock: "", sheets: [] }, kind === "Karakter" ? { tier: el.dataset.tier || "pendukung" } : {})); save(); render(); break;
      }
      case "asset-del": {
        const a = S.assets[+el.dataset.i];
        if (confirm(`Hapus aset "${a.name}"? Aset ini juga dilepas dari semua shot.`)) {
          sheetsOf(a.id).slice().forEach((sh) => removeSheet(a.id, sh.key));
          S.assets.splice(+el.dataset.i, 1);
          S.episodes.forEach((e2) => e2.shots.forEach((s) => (s.cast = s.cast.filter((c) => c !== a.id))));
          save(); render();
        }
        break;
      }
      case "export-json": download(`${S.project.title.replace(/\W+/g, "-")}.json`, JSON.stringify(S, null, 2), "application/json"); break;
      case "import-json":
        pasteDialog("Impor proyek dari JSON", "Tempel isi file cadangan JSON…", (txt) => {
          const d = extractJson(txt); if (!d.project || !Array.isArray(d.episodes)) throw new Error("bukan file proyek SABRINACTION");
          S = d; S.episodes.forEach(ensureEp); S.assets = S.assets || []; save(); toast("Proyek diimpor");
        });
        break;
      case "reset":
        if (confirm("Kembalikan ke proyek contoh? Proyek aktif disimpan sebagai 'proyek sebelumnya'.")) switchProject(window.SASTORY_SAMPLE, window.SASTORY_SAMPLE.project.title);
        break;
      case "load-template": {
        const t = templates().find(([id]) => id === el.dataset.id); if (!t) break;
        if (confirm(`Muat proyek "${t[1].project.title}"? Proyek aktif ("${S.project.title}") disimpan sebagai proyek sebelumnya.`)) switchProject(t[1], t[1].project.title);
        break;
      }
      case "restore-prev":
        if (prevProject && confirm(`Kembalikan "${prevProject.project.title}"? Proyek aktif sekarang bertukar posisi jadi proyek sebelumnya.`)) switchProject(prevProject, prevProject.project.title);
        break;
      case "export-bible": download("Character-Bible.md", mdBible()); break;
      case "export-openfilm": exportOpenFilm(epById(el.dataset.ep)); break;
      case "export-doc": {
        const e2 = epById(el.dataset.ep); const doc = el.dataset.doc;
        const names = { naskah: "Naskah", storyboard: "Storyboard", prompt: "Prompt-Video", all: "Paket" };
        download(`${e2.id}-${names[doc]}.md`, mdDoc(e2, doc)); break;
      }
    }
  });
  // seret character sheet ke galeri aset
  document.addEventListener("dragover", (e) => { const z = e.target.closest("[data-sheet-drop]"); if (z) { e.preventDefault(); z.classList.add("drop-on"); } });
  document.addEventListener("dragleave", (e) => { const z = e.target.closest("[data-sheet-drop]"); if (z && !z.contains(e.relatedTarget)) z.classList.remove("drop-on"); });
  document.addEventListener("drop", (e) => {
    const z = e.target.closest("[data-sheet-drop]"); if (!z) return;
    e.preventDefault(); e.stopImmediatePropagation(); z.classList.remove("drop-on");
    if (e.dataTransfer && e.dataTransfer.files.length) addSheets(z.dataset.sheetDrop, e.dataTransfer.files);
  });
  // seret file gambar/video ke preview atau slot media
  document.addEventListener("dragover", (e) => {
    const z = e.target.closest("[data-drop]"); if (!z || !cur()) return;
    e.preventDefault(); z.classList.add("drop-on");
  });
  document.addEventListener("dragleave", (e) => { const z = e.target.closest("[data-drop]"); if (z) z.classList.remove("drop-on"); });
  document.addEventListener("drop", (e) => {
    const z = e.target.closest("[data-drop]"); if (!z) return;
    e.preventDefault(); z.classList.remove("drop-on");
    const c = cur(); const f = e.dataTransfer && e.dataTransfer.files[0];
    if (c && f) attachMedia(c.ep, c.s, f);
  });
  // geser tepi kanan klip video untuk mengubah durasi (langkah 0,5 dtk)
  document.addEventListener("pointerdown", (e) => {
    const g = e.target.closest("[data-grip]"); if (!g) return;
    e.preventDefault(); e.stopPropagation();
    const ep = route().ep; const s = ep.shots.find((x) => x.id === g.dataset.grip); if (!s) return;
    stopPlay(); selectShot(ep, s, true);
    const x0 = e.clientX, d0 = +s.dur || 0;
    const clipEl = g.parentElement;
    const move = (ev) => {
      s.dur = Math.max(0.5, Math.min(15, Math.round((d0 + (ev.clientX - x0) / PPS()) * 2) / 2));
      clipEl.style.width = `${Math.max(4, s.dur * PPS() - 3)}px`;
      clipEl.title = `${s.id} · ${s.dur}s`;
    };
    const up = () => { removeEventListener("pointermove", move); removeEventListener("pointerup", up); save(); refreshEditor(true); renderChrome(route()); toast(`Shot ${s.id}: ${s.dur} dtk`); };
    addEventListener("pointermove", move); addEventListener("pointerup", up);
  });
  document.addEventListener("keydown", (e) => {
    // pratinjau naskah: satu blok = satu baris sumber, jadi Enter tidak membuat baris baru
    if (e.key === "Enter" && e.target.closest && e.target.closest("#screenplay .ed")) { e.preventDefault(); e.target.blur(); return; }
    const tag0 = (e.target.tagName || "").toLowerCase();
    const typing = ["input", "textarea", "select"].includes(tag0) || e.target.isContentEditable;
    if ($("#drawer").hidden && !typing && editorTarget()) {
      if (e.key === " ") { e.preventDefault(); togglePlay(); return; }
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const { ep, s } = editorTarget(); const nx = ep.shots[ep.shots.indexOf(s) + (e.key === "ArrowRight" ? 1 : -1)];
        if (nx) { stopPlay(); selectShot(ep, nx); refreshEditor(true); keepPlayheadVisible(ep); }
        return;
      }
    }
    if ($("#drawer").hidden) return;
    if (e.key === "Escape") return closeDrawer();
    const tag = (e.target.tagName || "").toLowerCase();
    if (drawerShot && !["input", "textarea", "select"].includes(tag) && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
      const { ep, s } = drawerShot; const i = ep.shots.indexOf(s) + (e.key === "ArrowRight" ? 1 : -1);
      if (ep.shots[i]) { render(); openShot(ep, ep.shots[i].id); }
    }
  });
  $("#btn-theme").addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(KEY + ".theme", theme); } catch (e) {}
  });
  window.addEventListener("hashchange", () => { stopPlay(); $("#drawer").hidden = true; drawerShot = null; render(); window.scrollTo(0, 0); });
  render();
  loadMedia().then(() => { if (MEDIA.size) render(); }).catch(() => {});
})();

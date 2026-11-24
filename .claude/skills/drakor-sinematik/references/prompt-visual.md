# Prompt gambar & video bergaya drakor

Prompt ditulis dalam bahasa Inggris untuk model generate. Struktur yang konsisten membuat hasil antar shot terasa satu film.

**Frasa wajib di setiap prompt (permintaan tim):** `Photoreal, natural skin texture, shot on 35mm film,` di awal deskripsi gaya. Cahaya ditulis alami dengan sumber jelas (cahaya jendela lembut, kontras rendah, palet redup ala film indie Korea), bukan cahaya lampu atau iklan. Untuk video, lampirkan satu gambar acuan lokasi sebagai `<Environment 1>` dan tulis `overall_soundscape` dengan cap waktu. Lihat juga aturan terbaru di `selera-tim.md`.

## Struktur prompt first frame

```
[shot size + lens feel], [subject: identity lock phrase + wardrobe], [pose/expression — subtle, specific],
[setting + one textured detail], [light source + direction + quality], [color palette/grade],
[composition note for 9:16], [film texture], vertical 9:16
```

Contoh:
```
Medium close-up, 50mm lens feel, shallow depth of field. Sabrina (shoulder-length dark bob, warm brown eyes,
white blouse, blue BRI lanyard) pausing mid-sentence, eyes lowered, the faint start of a smile.
Quiet BRI banking hall in the early morning, chairs still neatly aligned, a paper cup on the counter.
Soft window light from camera left, gentle negative fill on the right, warm practical lamps in the background.
Muted blue and warm wood palette, natural skin tones, soft contrast. Subject in upper third, space below for
subtitles. Subtle film grain, cinematic Korean drama look. Vertical 9:16.
```

## Kosakata yang membantu

- **Rasa lensa**: `35mm lens feel` (lingkungan + tokoh), `50mm` (natural), `85mm portrait, creamy bokeh` (intim), `wide 24mm` (ruang, kesepian).
- **Cahaya**: `soft window light`, `motivated practical lighting`, `warm desk lamp glow`, `golden hour backlight`, `overcast diffused daylight`, `neon spill`, `phone screen glow on face`, `rim light separating hair`.
- **Grade**: `muted pastel`, `desaturated cool grey`, `warm amber`, `teal shadows and warm highlights (subtle)`, `soft contrast, lifted blacks`, `natural skin tones`.
- **Tekstur**: `subtle film grain`, `gentle halation on highlights`, `clean digital cinema`.
- **Ekspresi**: tulis aksi mikro, bukan label emosi — `holding back a laugh, lips pressed`, `glancing away then back`, `breath caught`, alih-alih `happy` atau `sad`.

## Prompt video (gerak)

```
[camera move + speed], [what the subject does — one clear action with start and end],
[micro-acting], [environmental motion], [duration] seconds, keep identity and lighting consistent with the first frame.
```

Contoh:
```
Slow push-in. Boy straightens his name tag, realizes it is upside down, flips it — still upside down — and freezes.
Tiny eye-widen, then a resigned exhale. Background customers move softly out of focus. 4 seconds.
Keep identity, wardrobe and lighting consistent with the first frame.
```

Prinsip:
- Satu aksi jelas per klip; aksi rumit pecah jadi beberapa shot.
- Gerak kamera pelan dan termotivasi; **ukur** gerakannya (lihat tabel di bawah) — "slow push-in" saja sering ditafsirkan model sebagai zoom cepat.
- Akting mikro dan jeda ditulis eksplisit — model video cenderung melebih-lebihkan, jadi minta `subtle`, `restrained`, `natural`.
- Untuk dialog dengan lip-sync, sebutkan siapa yang bicara; untuk VO, tegaskan `no lip movement, internal monologue`. Panjang kalimat harus muat di durasi klip (±2,5 kata per detik untuk bicara santai).
- Subtitle, teks layar, dan musik ditambahkan saat editing, jadi tutup prompt video dengan `No on-screen text, no subtitles, no music.` agar model tidak menempelkan huruf atau lagu.

## Model MiniMax H3

H3 membuat video sekaligus suara dan punya format prompt sendiri. Kalau targetnya H3 (mis. lewat RunningHub) dan skill `h3-prompt-writing` terpasang, tulis prompt dengan format skill itu: Ref2VA untuk gambar referensi, I2VA kalau ada first frame. Isinya tetap mengikuti skill ini:
- Gerak kamera pakai kosakata H3 dengan amplitudo kecil (`pushes in with small amplitude at slow speed`, `holds a static shot`). Untuk komedi, static shot.
- Dialog Bahasa Indonesia kata per kata di `<d>[Indonesian] …</d>`; arahan bicara ("pelan, setengah berbisik") ditulis di luar `<d>` dalam bahasa Inggris.
- `overall_soundscape` diisi ambience nyata (AC, ketikan, antrean). Hening adalah pilihan yang sah.
- `non_diegetic_music: N/A`. Musik dan OST ditambahkan saat editing supaya bisa ditahan sampai puncak emosi.
- Style anchor adegan masuk ke deskripsi lingkungan dan cahaya di setiap shot, kalimatnya sama persis.

**Satu generate = satu rangkaian potongan, bukan satu shot.** H3 bisa memotong di dalam satu klip (`[Shot 2] At 00:03.000, the shot cuts to…`), jadi gabungkan 3–5 shot storyboard yang berurutan menjadi satu generate 10–15 detik dengan grammar drakor: OTS/two-shot pembuka → reverse close-up → insert benda → reaksi.
- **Aturan 180° dan arah pandang:** tetapkan sekali siapa di kiri dan siapa di kanan layar, lalu di setiap shot tulis arah pandangnya: `Sabrina, on screen left, looks screen-right at Boy, just off camera`. Di reverse shot, arah pandang dibalik. Tanpa ini, model sering membuat tokoh bicara ke kamera atau ke ruang kosong.
- **OTS untuk dialog:** `over-the-shoulder from behind Boy's right shoulder, his shoulder soft in the foreground` membuat arah bicara jelas dan terasa difilmkan sungguhan.
- **Akting hidup:** setiap shot butuh satu gerak kecil yang spesifik (menarik napas sebelum bicara, melirik ke gelas lalu kembali, ibu jari mengusap sisi gelas) dan pendengar bereaksi. Tulis `natural, understated performance with small breaths and blinks; no posing`.
- **Realisme:** `photorealistic, shot on a cinema camera with a 50mm lens, natural skin texture with visible pores, slightly imperfect hair, soft motivated window light with gentle shadows, shallow depth of field, subtle film grain`. Hindari `perfect`, `flawless`, `beautiful` yang menarik ke tampilan AI yang licin.
- Jaga dialog per potongan pendek (satu kalimat per shot) dan beri cut waktu yang cukup untuk kalimat itu (±2,5 kata per detik) plus jeda reaksi.

## Gerak kamera terukur

Model video lebih patuh pada gerak yang diberi jarak, sudut, kecepatan, dan tinggi kamera. Terjemahkan field `move` dashboard begini (angka kecil = rasa drakor; jangan dibesarkan tanpa alasan):

| `move` dashboard | Prompt bahasa Inggris |
|---|---|
| Statis | `Locked-off static camera at eye level, no camera movement.` |
| Dorong pelan | `Slow push-in from medium to medium close-up at eye level, about ten centimeters per second, over four seconds.` |
| Tarik mundur | `Slow pull-back from close-up to medium-wide, revealing the room behind her, over five seconds.` |
| Orbit pelan | `Slow arc of about thirty degrees around the subject at eye level, constant speed.` |
| Pan | `Slow pan of about twenty degrees to the left following his gaze, over three seconds.` |
| Tilt | `Slow tilt up from her hands to her face over two seconds.` |
| Handheld halus | `Subtle handheld breathing, slight sway of two to three degrees, no shake.` |

Tambahan yang sering berguna: tinggi kamera (`eye level`, `slightly low angle at chest height`), jarak ke subjek (`one and a half meters from the subject`), dan rack focus untuk memindahkan perhatian tanpa memotong (`focus slowly shifts from the name tag in the foreground to Sabrina's face`).

## Style anchor per adegan

Satu kalimat 15–25 kata berisi palet, sumber cahaya, lensa, dan tekstur — ditulis sekali per adegan, lalu **disalin persis sama** di setiap prompt first frame dan video dalam adegan itu. Ini yang paling ampuh menjaga shot-shot terasa satu film.

```
Style anchor: soft window light from camera left, muted BRI blue and warm wood palette, 50mm lens feel, natural skin, subtle film grain, Korean drama look.
```

- Taruh di akhir prompt, sebelum `Vertical 9:16`.
- Ganti anchor hanya bila suasana/timeline berubah (lihat palet per suasana di `sinematografi-vertikal.md`), dan catat di catatan sutradara.
- Frasa kunci identitas tokoh terpisah dari anchor; keduanya disalin persis.

## Prompt multi-shot bertimer

Beberapa model (mis. Veo, Kling, Sora) bisa membuat satu klip berisi beberapa shot. Pakai hanya untuk rangkaian pendek yang memang satu napas (mis. setup → pemicu → reaksi), total ≤10 detik:

```
[Shot 1 | 00:00-00:03] Medium, locked-off at eye level. Boy pins on his name tag and smiles at the mirror.
Style anchor: <anchor adegan>.
[Shot 2 | 00:03-00:05] Insert close-up, static. The name tag reads upside down.
Style anchor: <anchor adegan>.
[Shot 3 | 00:05-00:09] Medium close-up, slow push-in about ten centimeters per second. Boy notices, freezes, then a small resigned exhale.
Style anchor: <anchor adegan>.
No on-screen text, no subtitles, no music. Vertical 9:16.
```

- Ulangi style anchor di setiap blok shot — model cenderung melenceng di shot kedua dan ketiga.
- Untuk perpindahan di dalam satu klip, tulis secara fisik (`the camera pushes past his shoulder to her face`), bukan istilah editing (`cut to`).
- Kalau hasil multi-shot tidak stabil, kembali ke satu prompt per shot dan sambung di editing.

(Teknik gerak terukur, style anchor, dan blok bertimer diadaptasi dari CinePrompt, huihuihui-wq/cibeprompt, lisensi MIT; preset gayanya tidak dipakai karena tidak ada yang bernuansa drakor.)

## Hindari

`dramatic`, `epic`, `intense emotion`, `crying hysterically`, `shocked face`, `crash zoom`, `dutch angle`, `oversaturated`, `HDR look`, `beauty filter`, dan efek kartun. Kata-kata itu menarik hasil ke arah sinetron/dracin.

## Konsistensi

- Pakai frasa kunci identitas tokoh dari character bible persis sama di setiap prompt.
- Pakai style anchor yang sama untuk semua shot dalam satu adegan; ubah hanya bila suasana berubah.
- Sebut referensi sheet/KV bila tersedia ("match the reference sheet for face and wardrobe").

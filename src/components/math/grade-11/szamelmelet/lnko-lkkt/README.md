# 3. Legnagyobb közös osztó, legkisebb közös többszörös (44. lecke, 128–131. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 128–131. oldal) alapján kidolgozott oktatási modul. A diákzónában a IV. Számelmélet fejezet **3.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** egy 240 cm széles és 320 cm hosszú szobát egyforma szélességű függőleges tapétacsíkokkal borítunk. A csík szélessége mindkét szám osztója; a közös osztók közül a legnagyobb a **80**, tehát 80 cm-es csíkokat vágunk.

**Kidolgozott feladat (fotópályázat):** a díjalapnak 6, 8 és 10 egyenlő részre is oszthatónak kell lennie.
- a) ezerrel osztható díjak esetén a legkisebb összeg [6; 8; 10] = 120 ⇒ **120 000 Ft** (20 000 / 15 000 / 12 000 Ft fejenként);
- b) legfeljebb 200 000 Ft esetén a 120 legnagyobb többszöröse: 1666 · 120 = **199 920 Ft**.

---

## 📐 Fő Fogalmak

- **Közös osztó, legnagyobb közös osztó:** jele **(a; b)**. Bármely két pozitív egésznek közös osztója az 1; közös osztóból véges sok van. Pl. (18; 120) = 6.
- **Relatív prímek:** (a; b) = 1, pl. (22; 75) = 1.
- **LNKO a prímtényezős felbontásból:** a **közös** prímtényezők az előforduló **legkisebb** hatványon. 4536 = 2³ · 3⁴ · 7, 528 = 2⁴ · 3 · 11 ⇒ (4536; 528) = 2³ · 3 = 24.
- **Közös többszörös, legkisebb közös többszörös:** jele **[a; b]**. Közös többszörös pl. a szorzat, végtelen sok van. Pl. [18; 120] = 360.
- **LKKT a prímtényezős felbontásból:** **minden** prímtényező az előforduló **legnagyobb** hatványon: [4536; 528] = 2⁴ · 3⁴ · 7 · 11 = 99 792.
- (1; n) = 1, [1; n] = n; két számra (a; b) · [a; b] = a · b.
- **Kiegészítés (nem a tankönyvből):** az euklideszi algoritmus – (a; b) = (b; r), az utolsó nem nulla maradék az LNKO.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** (675; 495) = 45; (1176; 252) = 84; (288; 528; 936) = 24; d) 7 · 13⁴.
- **2.** 477/318 = 3/2; 618/1545 = 2/5.
- **3.** nem prím c: (240; c) = 10 pl. 10, 50, 70; = 1 pl. 49, 77; = 240 pl. 240, 480.
- **4.** 84 × 126 négyzetekre: oldal 1, 2, 3, 6, 7, 14, 21, 42 cm; legtöbb 10 584, legkevesebb 6 négyzet.
- **5.** [36; 180] = 180; [15; 22] = 330; [600; 1260; 2340] = 163 800; d) 2³ · 3⁴ · 5 · 7² · 11³.
- **6.** 15/242 + 5/99 = 245/2178; 8/15 + 4/63 − 13/70 = 259/630 = 37/90.
- **7.** [16; 20; 24] = 240; 1000 és 2000 között 4 db: 1200, 1440, 1680, 1920.
- **8.** nem prím c: [20; c] = 60 pl. 6, 12, 15; = 20 pl. 4, 10; = 220 pl. 22, 44, 55.
- **9.** 84 × 126-os téglalapokból a legkisebb négyzet oldala 252 cm, 6 téglalap; más: 504 cm (24 db), 756 cm (54 db).
- **HF 1.** a) LNKO 2³ · 5⁷, LKKT 2⁵ · 3 · 5⁸; b) LNKO 1, LKKT a szorzat; c) LNKO 2² · 5³, LKKT 2⁴ · 5⁸.
- **HF 2.** (740; 63) = 1, [740; 63] = 46 620; (39; 351) = 39, [39; 351] = 351; (12; 36; 144) = 12, [12; 36; 144] = 144.
- **HF 3.** a) pl. 6, 18, 30; b) pl. 9, 18, 72; c) 16.
- **HF 4.** [8; 6] = 24 nap. **HF 5.** (330; 420) = 30 cm-es lap, 154 db.
- **Ráadás:** 28 és 496 tökéletes; 12 és 100 bővelkedő, 34 és 1024 szűkölködő; 220–284 és 1184–1210 barátságos számpár.

> **⚠️ CSAPDA:** a két szabály felcserélése – (4536; 528) ≠ 2⁴ · 3⁴. LNKO: közös prímek, legkisebb kitevő; LKKT: minden prím, legnagyobb kitevő.

> Megjegyzés: a 3. és 8. feladat „d) legkisebb c” kérdésénél a „nem prím” feltétel az 1-et is megengedi ((240; 1) = 1, [20; 1] = 20) – a modul ezért csak példákat ad.

---

## 💻 Elkészített Komponensek

1. **`GcdLcmFigures.tsx`**:
   - `WallpaperStripsSvg`: a 240 és 320 cm-es fal 80 cm-es csíkokkal.
   - `PrimeVennSvg`: a 4536 és 528 prímtényezőinek Venn-diagramja (metszet: LNKO, unió: LKKT).
   - `CommonMultiplesSvg`: 6, 8, 10 többszörösei számegyenesen, közös többszörösök 120, 240.
   - `SquareTilingSvg`: a 84 × 126-os téglalap 42 cm-es négyzetekre bontva.
   - `EuclidRectangleSvg`: az euklideszi algoritmus téglalap-négyzet szemléltetése (126; 84) = 42.
2. **`GcdLcmTheory.tsx`**: bevezető, LNKO és LKKT definíciói és meghatározása, kidolgozott díjfeladat, euklideszi algoritmus, feladatok eredményei, ráadás, csapda.
   - **I. Laboratórium:** prímtényezős Venn-diagram (két tetszőleges szám: csak a-ban / közös / csak b-ben, LNKO, LKKT, ellenőrzés a · b-vel).
   - **II. Laboratórium:** euklideszi algoritmus lépésenként (maradékos osztások táblázata, utolsó nem nulla maradék, LKKT a szorzatból).
3. **`GcdLcmMatcher.tsx`**: 3 szint × 8 pár (fogalmak; LNKO-értékek; LKKT-értékek és alkalmazások).
4. **`GcdLcmSorter.tsx`**: 3 szint × 3 kategória × 9 elem (LNKO / LKKT / egyik sem; relatív prím / osztója / egyéb; LNKO = 6 / 12 / 24).
5. **`GcdLcmQuiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel, 6 kérdésnél ábrával, 3 puskakártyával (progress id: `g11-num-lnko-lkkt-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic4GcdLcm.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

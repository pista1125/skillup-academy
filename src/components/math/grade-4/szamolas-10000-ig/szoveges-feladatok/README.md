# 6. Szöveges feladatok (I. témakör, 6. lecke – TK 23–27., MF I/18.)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 23–27. oldal) és munkafüzet (`OH-MAT04MA_I`, 18. oldal) alapján kidolgozott modul. Számkör: 1000-ig (néhol 10 000-ig).

---

## 🎯 Tananyag áttekintés

### A megoldás lépései (TK 23/1.)
Jegyezd le az adatokat, keress összefüggést → írj műveletet, készíts táblázatot, rajzot → becsüld meg az eredményt → számolj → ellenőrizd → válaszolj írásban.
Mintapélda: a tanulók ötödrésze 154 gyerek → 154 · 5 = 770 (becslés 150 · 5 = 750) → „770 tanuló jár ebbe az iskolába.”

### A tankönyv feladatai és eredményeik
| Feladat | Módszer | Eredmény |
|---|---|---|
| 2. Futóverseny: 613 versenyző, 88 lány, 3 · 88 fiú | szakaszos ábra | 261 felnőtt |
| 3. 800 m-es verseny, Manó a táv felénél, Mona 535 m-re a céltól | szakaszok | Manó van közelebb, 135 m köztük |
| 4. 22 gyerek párosával, a párok 50 cm-re | számegyenes | 11 pár, 10 köz → 5 m |
| 6. Kristóf : anyukája : nagymamája = 1 : 3 : 6, együtt 110 év | színes rudak | 11, 33, 66 év |
| 7. 1 m-es léc, az egyik darab 4-szer akkora | színes rudak | 20 cm és 80 cm |
| 8. Ádám 140 m/perc, Roland 60 m/perc, 1000 m | táblázat | 5 perc, 700 m és 300 m |
| 9. 30 db 5 és 6 fős szoba, 164 ágy | táblázat, próbálgatás | 16 ötfős, 14 hatfős |
| 10. Távolugrás (2 m 8 cm, 19 dm, 179 cm) | sorba rendezés | Ferkó 208 cm, Ákos = Dénes 190 cm, Bence 179 cm |
| 11. a) 4 fiú, Dániel az első | elágazásos rajz | 6 sorrend |
| 12. Máté 350 Ft, Ádám 650 Ft | játékpénz | Ádám 150 Ft-ot ad |
| 13. · 3, + 60 → 300 | visszafelé számolás | 80 |
| 17. Bendegúz + 10 osztálytárs, 20 szelet, 2-2 szelet | gondolkodás | 11 gyerek → 22 szelet kellett volna |
| 18–20. Felesleges adatok (gerely, könyv mérete, lányok/fiúk) | | Gábor 52 m, Karesz 51 m, Manó 50 m; 465 Ft; 56 tanuló |
| 21–23. Hiányzó adatok (kör hossza, alma ára) | | 22: 5 óra, 985 néző, 98 perc |

### Munkafüzet (MF I/18.)
50 és 20 forintosok, összesen 500 Ft (pl. 8 db 50-es + 5 db 20-as; legfeljebb 25 érme); 3 különböző szalvéta 5 színből (10 lehetőség); hiányzó adat (620 m – mennyi van még?); „kétszeresét 10-zel szoroztam, 800” → 40.

> **⚠️ CSAPDA:** 11 pár között csak 10 köz van (5 m, nem 5 m 50 cm). Bendegúz a saját magát felejtette ki. A 650 literes hordóba nem fér 730 l (MF I/9/5.).

---

## 💻 Elkészített komponensek

1. **`WordProblems1000Figures.tsx`**
   - `SolvingStepsSvg`: a megoldás 6 lépése lépcsőként.
   - `RunnersBarSvg`: futóverseny szakaszos ábrája (88, 3 · 88, ?, összesen 613).
   - `PairsLineSvg`: 11 pár a számegyenesen 50 cm-enként.
   - `ColorRodsSvg`: színes rudak (1 + 3 + 6 kocka = 110 év).
   - `MeetingPathSvg`: Ádám és Roland találkozása 1000 m-es úton.
   - `CoinsShareSvg`: Máté és Ádám pénzérméi.
2. **`WordProblems1000Theory.tsx`**: a 6 lépés a sportnapos példán, 4 kidolgozott rajzos példa (szakaszos ábra, számegyenes, színes rudak, táblázat), további ötletek táblázatban, felesleges és hiányzó adatok, csapda.
   - **I. Labor – Lépésről lépésre:** 3 feladat (sportnap, könyvvásárlás, futóverseny), mindegyik 6 lépésben választós kérdésekkel és azonnali visszajelzéssel.
   - **II. Labor – Találkozás-labor:** percenkénti léptetés, mozgó szereplők, automatikusan bővülő táblázat, 4 sebességpár.
3. **`WordProblems1000Matcher.tsx`**: 3 szint × 8 pár (művelet; megoldás; melyik rajz segít).
4. **`WordProblems1000Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (összeadás / kivonás / szorzás; felesleges / hiányzó / minden adat megvan; becslés kb. 500 / 750 / 1000).
5. **`WordProblems1000Quiz.tsx`**: 30 kérdés (10 / 10 / 10), 15 ábrával, kérdéstípus-jelvényekkel, 3 puskakártyával. Progress-azonosító: `g4-count-szoveges-quiz`.

---

## 🧪 Tesztelés

`src/test/grade4Topic1WordProblems1000.test.tsx` – a 4 komponenst és mind a 6 SVG ábrát rendereli.

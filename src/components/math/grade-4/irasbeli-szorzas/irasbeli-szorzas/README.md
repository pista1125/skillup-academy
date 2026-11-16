# 2. Írásbeli szorzás (tankönyv 138–143. oldal, munkafüzet II. 53–62. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 138–143. oldal) és munkafüzet (`OH-MAT04MA_II`, 53–62. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a VII. fejezet (Írásbeli szorzás) 2. leckéje.

---

## 🎯 Tananyag Áttekintés

- **TK 138/1.:** Mona minden este 12 oldalt olvas, 2 hét = 14 este. Adatok → terv (12 · 14) → becslés (12 ≈ 10, 14 ≈ 10, 10 · 10 = 100, a szorzat biztosan nagyobb) → számítás: **az egyesekkel kezdünk** (12 · 4 = 48, helyi érték szerint a szorzandó alá), aztán a tízesekkel (12, **egy hellyel balra tolva**, az egyesek helyére 0 írható: 120), végül összeadjuk a részletszorzatokat (168) → **ellenőrzés a tényezők felcserélésével** (14 · 12 = 28 + 140 = 168) → válasz. Elnevezések: tényezők, részletszorzatok, szorzat.
- **TK 138/2–3., 139/4–7.:** szorzások becsléssel és ellenőrzéssel (13 · 13, 21 · 14, 34 · 12, 75 · 27, 29 · 48, 86 · 59 …), páros/páratlan szorzatok, 132 kg tizenháromszorosa, kirándulóhelyek táblázata (Csesznek 23 fő, 150 Ft …), betűs feladat, műveleti sorrend (36 · (9140 − 8872), 2088 + 223 · 34, 23 · 35 · 12 …).
- **TK 140/8.:** 26 gyerek · 24 filctoll, becslés 30 · 20 = 600; a szorzás **kezdhető az egyesekkel** (144, alatta 48 balra tolva) **vagy a tízesekkel** (48, alatta 144 jobbra tolva), mindkettő 624.
- **TK 140/9–10., 141–143/11–28.:** gyakorló szorzások, település-megfejtés; **rövidebb írásmód**, ha a szorzó egyik jegye 1: 85 · 16 (a 85 az első részletszorzat, + 510 → 1360), 85 · 61 = 5185; túraútvonal 15 km · 52 hét, Baradla belépő 700 Ft · 13, nyílláncok, nyitott mondatok (245 · 32, 329 · 27 > □), túzokok, vonatjegyek 375 Ft.
- **MF II. 53–62.:** becslés tízesre kerekített értékkel (86 · 23 ↔ 23 · 86), a hortobágyi **Kilenclyukú híd** (7 szorzás, 9 szám; a két pár nélküli szám 1827 és 1833 → 6 év alatt épült), betűrejtvény, 26 munkanap · 42 km, 350 Ft · 28 fő, háromjegyű · kétjegyű szorzások, szorzattáblázat és halmazábra, nyitott mondatok (6413 > B > 462 · 12), fürj–túzok–bivaly tömege, rackajuhok (149 · 65 és 149 · 44), buszos kirándulások, Bendegúz 17 km · 21 nap, szalamandra-szorzatok.

> **⚠️ CSAPDA:** a tízesekkel kapott részletszorzatot egy hellyel el kell tolni (24 · 26 ≠ 144 + 48 = 192); minden részletszorzat saját maradékokkal készül; a becslés (600) jelzi a nagy hibát.

### A régi README javított hibái
- A régi leírás LaTeX-et és **fordított** sorrendet adott meg kötelezőként („előbb a tízesekkel”, 146 · 34, „4380 + 584”); a tankönyv először az **egyesekkel** kezdi (138. o.), és csak a 140. oldalon mutatja meg mellékesen a tízesekkel kezdő változatot. A becslés is pontatlan volt (150 · 30): a tankönyv mindkét tényezőt **tízesre** kerekíti.
- Hiányzott az ellenőrzés a tényezők felcserélésével és a rövidebb írásmód (85 · 16).
- A lecke helyes száma a diákzónában: VII. fejezet 2. lecke.

---

## 💻 Elkészített Komponensek

1. **`WrittenMulTwoDigitFigures.tsx`**:
   - `WrittenMul2Layout`: általános, négyzethálós írásbeli szorzás-elrendezés (egyesekkel / tízesekkel kezdve, halvány 0, rövidebb írásmód, „?” elrejtés, sorcímkék, beágyazás).
   - `MonaReadingSvg` (12 · 14 címkékkel), `SwapCheckSvg` (14 · 12), `TwoWaysSvg` (24 · 26 kétféleképpen), `ShortcutSvg` (85 · 16), `EstimateSvg` (26 ≈ 30, 24 ≈ 20 számegyenesen), `BridgeSvg` (Kilenclyukú híd).
   - Exportált adatok: `WM2_COLORS`, `BRIDGE_NUMBERS`.
2. **`WrittenMulTwoDigitTheory.tsx`**: Mit tanulunk?, 12 · 14 lépésről lépésre, ellenőrzés felcseréléssel, 26 · 24 kétféle sorrendben, rövidebb írásmód (85 · 16, 85 · 61), „Vigyázz!” csapdák. Exportálja a `mul2Steps` (részletszorzatok és összeadás lépései maradékkal) és a `round10` függvényt.
   - **I. labor:** írásbeli szorzás lépésről lépésre (10 feladat, számjegygombok, maradékok kis számmal, segítség, becslés, ellenőrzés).
   - **II. labor:** a Kilenclyukú híd párosítója (szorzás → szorzat a híd nyílásában, becslési tipp hibánál, megfejtés: 6 év).
3. **`WrittenMulTwoDigitMatcher.tsx`**: 3 szint × 8 pár (kevés maradék; becslés; háromjegyű szorzandó is).
4. **`WrittenMulTwoDigitSorter.tsx`**: 3 szint × 3 kategória × 9 elem (becslés B: 600/1200/2400; páratlan / páros / 0-ra végződő szorzat; szorzat < 2000 / 2000–5000 / > 5000).
5. **`WrittenMulTwoDigitQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 15 kérdés ábrával (írásbeli elrendezés „?”-lel, kerekítő számegyenes, csoportok, híd, számegyenes-szakasz, táblázat), 3 puskakártyával.

Azonosítók: kvíz `g4-wmult-irasbeli-quiz`, párosító `g4-wmult-irasbeli-matcher`, csoportosító `g4-wmult-irasbeli-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic7WrittenMulTwoDigit.test.tsx` (4 komponens, 6 SVG ábra, részletszorzatok és szorzat számjegyei).

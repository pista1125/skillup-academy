# 6. Az idő mérése (II. Mérések, 6. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., **153–158. oldal**) és a **II. kötetes** munkafüzet (`OH-MAT04MA_II`, **72–77. oldal**) alapján kidolgozott modul 4. osztályosoknak. (A tankönyvben ez a lecke a könyv végén található, a diákzónában a II. Mérések fejezet 6. leckéje.)

---

## Tananyag Áttekintés

- **153. o.:** olvasmány: futóverseny 2000 m-en (7 perc 30 másodperc és 12 perc → különbség 4 perc 30 másodperc), az olimpiák története, a maratoni futás (2 óra 58 perc 50 másodperc).
- **154. o.:** események időrendje (1896, 2002, 2012 – korábban, később, előtte, utána); évszakok; ki melyik évszakban született (diagram); tegnapelőtt – tegnap – ma – holnap – holnapután.
- **155. o.:** napszakok (reggel, délelőtt, délben, délután, este, éjszaka) és tevékenységek; a kismutató 1 nap alatt 2-szer, 1 hét alatt 14-szer megy körbe; óraállások kétféle leolvasása (2 óra 30 perc, 14 óra 30 perc); szóbeli időpontok számokkal (negyed tíz, háromnegyed hét, fél 5 múlt 10 perccel, tíz perc múlva két óra, öt perc múlva fél négy); **menetrend** (Park 7:05, Híd 7:12, Dombtető 7:21, Központ 7:33, Liget 7:40, Iskola 7:46 – menetidők: Híd–Központ 21 perc, Központ–Iskola 13 perc, Kitti oda-vissza 68 perc, Boldizsár 50 perc → Dombtető–Iskola).
- **156. o.:** 48 órás rekordkísérlet (2 nap, 2880 perc); 60 nap kenuval (1440 óra); vacsorafőzés (16:00 → 16:27 → 17:50: 27 perc előkészítés, 1 óra 23 perc főzés, 1 óra 50 perc összesen); lágytojás (8 tojás egyszerre 3 perc, egyesével 24 perc = 1440 másodperc); az étkezések közötti idő.
- **157. o.:** időpont vagy időtartam (sportnap mondatai); 1000 m gyaloglás (7:05, 8:09, 8:53, 7:03 → másodpercben 425, 489, 533, 423; eltérés 110 másodperc); Hanna útja (negyedóra + 24 perc + 660 másodperc + 10 perc = 60 perc); 5 másodperc / 5 perc / 5 óra alatti tevékenységek.
- **158. o.:** cipőfűzőverseny stopperrel; átváltások (pl. 420 másodperc = 7 perc, 9000 másodperc = 150 perc; 17 perc = 1020 másodperc, 155 perc = 9300 másodperc); 2011-es berlini maraton (legjobb magyar 2:38:47, világrekord 2:03:38 → különbség 35 perc 9 másodperc).
- **Munkafüzet II. 72–77. o.:** az év eseményei és évszakok, hónapok, jeles napok; évek hónapokban (fél év = 6, háromnegyed év = 9, 6 és fél év = 78, 42 év = 504 hónap); napszakok; órák és kártyák (fél 4, negyed 12, háromnegyed 8 …); mutatók berajzolása; állatkert (majmok 09:28–10:05 = 37 perc, oroszlánok 10:10–10:28, vízilovak 10:32–10:48, zsiráfok 11:03–11:25); állatkerti meghívó (30 perces etetések, 15 perc szünet köztük, 5 perces origami); negyed, fél, háromnegyed alakok (háromnegyed 5 múlt 3 perccel = 4 óra 48 perc); másodperc → perc (4860 másodperc = 81 perc); 30 tojás 10-esével (9 perc); 24 lángos, egyszerre 3, 3 perc (24 perc, 10:08 → 10:32); olimpiák sorrendje (római számok); 800 m síkfutás (2:52 … 3:12, eltérés 20 másodperc).

## Mértékegységek

| Egység | Kapcsolat |
|---|---|
| perc | 1 perc = 60 másodperc |
| óra | 1 óra = 60 perc; negyedóra = 15 perc, félóra = 30 perc, háromnegyed óra = 45 perc |
| nap | 1 nap = 24 óra |
| hét | 1 hét = 7 nap |
| év | 1 év = 12 hónap (365 vagy 366 nap) |

> **Csapda:** úgy számolni, mintha egy órában 100 perc lenne (9:28-tól 10:05-ig nem 77, hanem 37 perc); a perc:másodperc alakot (7:05) nem 705 másodpercnek kell venni, hanem 7 · 60 + 5 = 425-nek.

> **Javítás a régi README-hez képest:** a korábbi leírás LaTeX-képleteket, angol jelöléseket (min, s, h), valamint évtizedet, évszázadot, évezredet és 3600 másodperces átváltásokat tartalmazott. A modul a tankönyv oldalait követi: perc, másodperc, óra, nap, hét, hónap, év; napszakok, menetrend, időtartamok.

---

## Elkészített Komponensek

1. **`TimeMeasureFigures.tsx`**
   - `ClockFace`: újrahasznosítható mutatós óra (SVG-csoport), `TIMETABLE`: a menetrend adatai.
   - `ClockReadingsSvg`: három óra kétféle leolvasással (2 óra 30 perc / 14 óra 30 perc …).
   - `TimeUnitsSvg`: nap → óra → perc → másodperc (· 24, · 60, · 60), hét és év.
   - `DayPartsSvg`: a napszakok egy 0–24 órás idővonalon.
   - `BusTimetableSvg`: a busz menetrendje (Park → Iskola).
   - `HannaRouteSvg`: Hanna útja négy szakaszban.
2. **`TimeMeasureTheory.tsx`**: mértékegységek, napszakok, óraleolvasás táblázattal, kidolgozott példák (menetrend, vacsora, tojás és lángos, Hanna útja, gyaloglás), csapda.
   - **Labor I – Állítsd be az órát!:** szóban adott időpont (pl. „fél 5 múlt 10 perccel”), a gyerek ± 1 óra / 5 perc / 1 perc gombokkal állítja a mutatós órát; egyezésnél mindkét leolvasást kiírja.
   - **Labor II – Időtartam-számoló:** generált feladatok (eltelt idő, befejezés időpontja, perc ↔ másodperc, nap → óra) 4 válaszgombbal, pontszámlálóval.
3. **`TimeMeasureMatcher.tsx`**: 3 szint × 8 pár (mértékegységek, szóbeli időpontok, átváltások és szöveges feladatok).
4. **`TimeMeasureSorter.tsx`**: 3 szint × 3 kategória × 9 elem (reggel / délután / este; időpont / időtartam / dátum; 1 percnél rövidebb / 1 perc és 1 óra között / 1 óránál hosszabb).
5. **`TimeMeasureQuiz.tsx`**: 30 kérdés (10–10–10), 13 kérdésnél ábra (mutatós és digitális órák, menetrend, állatkert, eredménytáblák, Hanna útja), 3 puskakártya.

Azonosítók: kvíz `g4-meas-ido-quiz`, párosító `g4-meas-ido-matcher`, csoportosító `g4-meas-ido-sorter`.

---

## Tesztelés

`src/test/grade4Topic2TimeMeasure.test.tsx` – a 4 komponens és mind az 5 SVG ábra renderelése.

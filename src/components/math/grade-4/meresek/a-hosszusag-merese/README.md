# 1. A hosszúság mérése (II. Mérések, 1. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., **53–56. oldal**) és munkafüzet (`OH-MAT04MA_I`, **44–47. oldal**) alapján kidolgozott modul 4. osztályosoknak.

---

## Tananyag Áttekintés

- **53. o. (fejezetnyitó):** Kitti öccse születésekor 3500 g és 57 cm volt – mennyiségek a mindennapokban.
- **54. o.:** a mértékegységek ismétlése: méter → deciméter (1 tized m) → centiméter (1 század m) → milliméter (1 ezred m); melyik hosszúságot milyen egységgel adjuk meg (Kitti lépése, Peti magassága, a füzet vastagsága, a szoba szélessége). 20 m kimérése lépésekkel; Benedek és Bendegúz a 20 m-es út két végéről indul – „Biztos / Lehet, de nem biztos / Lehetetlen” kártyák. Magasugrás: 158 cm és az egy és fél méter.
- **55. o.:** távolugrás (Marci 190 cm, 20 cm-rel kevesebb, mint Gergő → 210 cm); tárgyak csoportosítása: < 1 m, = 1 m, > 1 m; Rozi térképe (550 m, 340 m, 800 m, 480 m); mérés hurkapálcával, számolópálcikával, mérőszalaggal; szakaszok mérése milliméteres pontossággal.
- **56. o.:** a 0 kilométerkő-szobor (80 cm-es talapzat, 3 m magas szobor) – **1 km = 1000 m**; városok távolsága táblázatban (Nyíregyháza–Pécs 400 km, –Miskolc 80 km …); szakaszos ábra 236 km + 284 km + ? = 758 km; Luca 1500 m-re lakik (igaz/hamis állítások, vasútállomás 2 km).
- **Munkafüzet 44–47. o.:** mennyiségek csoportosítása (hosszúság, tömeg, űrtartalom); tárgyak mérése és halmazba sorolása; összehasonlítás (<, =, >: 6 m – 60 cm, 32 cm – 230 mm, 54 cm – 680 mm, 45 dm – 450 mm …); Tomi járművei (40, 60, 67, 45 mm) egymás mögött; „Keresd a párját!” (2000 m – 2 km, 20 cm – 2 dm, 200 dm – 20 m, 200 cm – 2 m); mértékegységek növekvő sorrendben váltószámokkal; repülési magasságok (10 km, 5 km, 2900 m, 1200 m); Máté 2 km 400 m-es futása a 400 m-es pályán (6 kör).

## Mértékegységek

| Egység | Jele | Kapcsolat |
|---|---|---|
| kilométer | km | 1 km = 1000 m |
| méter | m | 1 m = 10 dm = 100 cm = 1000 mm |
| deciméter | dm | 1 dm = 10 cm = 100 mm |
| centiméter | cm | 1 cm = 10 mm |
| milliméter | mm | – |

> **Csapda:** különböző mértékegységű hosszúságokat nem a számok alapján hasonlítunk! 32 cm = 320 mm > 230 mm. A „vasútállomás 2 km” 2000 m-t jelent, nem 200 m-t.

> **Javítás a régi README-hez képest:** a korábbi, cím alapján írt leírás LaTeX-képleteket és általános „becslési stratégiákat” tartalmazott; most a tankönyv tényleges feladatai (Gergő ugrása, Rozi térképe, 0 kilométerkő, városok távolságtáblázata, repülési magasságok, Máté futása) szerepelnek.

---

## Elkészített Komponensek

1. **`LengthMeasureFigures.tsx`**
   - `LengthUnitLadderSvg`: km → m → dm → cm → mm lépcső a váltószámokkal.
   - `RulerReadingSvg`: vonalzó, 6 cm 4 mm = 64 mm-es szakasz leolvasása.
   - `RoziMapSvg`: a tankönyvi térkép (Rozi háza, nagymama, zöldséges, iskola).
   - `WalkingTwinsSvg`: Benedek és Bendegúz a 20 m-es út két végén.
   - `FlightAltitudeSvg`: repülési magasságok (munkafüzet 7. feladat).
   - `RunningTrackSvg`: 400 m-es atlétikai pálya A, B, C, D pontokkal.
2. **`LengthMeasureTheory.tsx`**: mértékegységek, egységválasztás, mérés vonalzóval, kidolgozott példák (Gergő ugrása, 0 kilométerkő, Rozi útja, találkozás, repülési magasságok, Máté futása), csapda.
   - **Labor I – Vonalzó-mérő:** véletlen hosszúságú szakasz; a gyerek gombokkal állítja be a cm és mm értéket, azonnali visszajelzés.
   - **Labor II – Átváltó-gép:** generált átváltási feladatok (m → cm, km → m, m cm → cm, km m → m …) 4 válaszgombbal, tipikus hibákkal, pontszámlálóval.
3. **`LengthMeasureMatcher.tsx`**: 3 szint × 8 pár (mértékegységek, egyenlő hosszúságok, szöveges feladatok).
4. **`LengthMeasureSorter.tsx`**: 3 szint × 3 kategória × 9 elem (mm / m / km; < 1 m / = 1 m / > 1 m; biztos / lehet / lehetetlen).
5. **`LengthMeasureQuiz.tsx`**: 30 kérdés (10–10–10), 17 kérdésnél ábra (vonalzó, térkép, pálya, magasságok, szakaszos ábra, táblázat), 3 puskakártya.

Azonosítók: kvíz `g4-meas-hosszusag-quiz`, párosító `g4-meas-hosszusag-matcher`, csoportosító `g4-meas-hosszusag-sorter`.

---

## Tesztelés

`src/test/grade4Topic2LengthMeasure.test.tsx` – a 4 komponens és mind a 6 SVG ábra renderelése.

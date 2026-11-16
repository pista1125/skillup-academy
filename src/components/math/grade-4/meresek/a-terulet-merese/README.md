# 3. A terület mérése (II. Mérések, 3. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., **59–60. oldal**) és munkafüzet (`OH-MAT04MA_I`, **51–53. oldal**) alapján kidolgozott modul 4. osztályosoknak.

---

## Tananyag Áttekintés

- **59. o.:** a matematikafüzet lefedése nagy, majd kis négyzet alakú logikai lapokkal – kisebb lapból több kell. Járólapok számolása négyzetrácsos alakzatokon (A–D), sorba rendezés terület szerint. Takarók (patchwork) területének mérése különböző egységekkel: kis négyzet, fél négyzet (háromszög), dominó (2 négyzet), 2 · 2-es négyzet. Ágytakaró-tervezés; alakzatok lefedése kis háromszögekkel.
- **60. o.:** csempék (A kis négyzet, B fél négyzet, C dominó, D nagy négyzet) – hány darab kell egy fal lefedéséhez, hogyan változik a darabszám; síkidomok területének becslése és megszámolása (kereszt alakzatok, derékszögű háromszög); terülőminták; nyitott mondat: 25 színes lap területe > terülőminta területe > 17 színes lap területe.
- **Munkafüzet 51–53. o.:** alakzatok kiszínezése különböző egységekkel; téglalapok területe szorzással (6 · 2, 5 · 3, 7 · 3, 6 · 3, 5 · 6, 4 · 3, 4 · 5, 6 · 4); röplabdapálya 18 m × 9 m és strandröplabdapálya 16 m × 8 m (egység: 1 m-es négyzet → 162 és 128); Petiék lakásának alaprajza; négyzetbe írt alakzat és téglalapba írt háromszög – a nagyobb terület a kisebb 2-szerese; síkidom szétvágása és átrakása.

## Szabályok

- **Terület (T):** hány egység fedi le a síkidomot hézag és átfedés nélkül. Mindig meg kell adni az egységet.
- Téglalapnál: egy sorban lévő négyzetek száma · sorok száma.
- Kisebb egységből több, nagyobb egységből kevesebb darab kell.

> **Csapda:** a terület és a kerület összekeverése (a 4 · 3-as téglalap területe 12 kis négyzet, kerülete 14 egység).

> **Javítás a régi README-hez képest:** a korábbi leírás cm², dm², m² mértékegységeket és T = a · b képletet adott LaTeX-ben. A 4. osztályos tankönyv ezeket **nem** tanítja: a területet egységnégyzetekkel (és más egységekkel) való lefedéssel, megszámolással és a „sorok · oszlopok” szorzással méri. A modul ezt követi.

---

## Elkészített Komponensek

1. **`Area4Figures.tsx`**
   - `NotebookCoverSvg`: a füzet lefedése nagy (12) és kis (48) lapokkal.
   - `RowsColumnsSvg`: 6 · 3 = 18 kis négyzet sorokkal és oszlopokkal.
   - `UnitChoicesSvg`: ugyanaz a 4 · 4-es alakzat 4 különböző egységgel (16, 32, 8, 4 darab).
   - `VolleyballCourtsSvg`: röplabda- és strandröplabdapálya négyzetrácson.
   - `HalfAreaSvg`: négyzetbe írt alakzat és téglalapba írt háromszög (fél terület).
2. **`Area4Theory.tsx`**: fogalom, sorok és oszlopok, egységek, kidolgozott példák (sportpályák, fél terület, csempézés), csapda.
   - **Labor I – Téglalap-építő:** +/− gombokkal sorok és oszlopok; adott számú négyzetből kell téglalapot építeni, a megtalált téglalapok listája.
   - **Labor II – Egységváltó:** a 6 · 4-es takaró lefedése négyféle egységgel; tipp 4 válaszgombbal, utána a lefedés kirajzolódik.
3. **`Area4Matcher.tsx`**: 3 szint × 8 pár.
4. **`Area4Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (terület / kerület / egyik sem; T < 20 / = 20 / > 20; több / pontosan / kevesebb mint 24 darab).
5. **`Area4Quiz.tsx`**: 30 kérdés (10–10–10), 19 kérdésnél négyzetrácsos ábra, 3 puskakártya.

Azonosítók: kvíz `g4-meas-terulet-quiz`, párosító `g4-meas-terulet-matcher`, csoportosító `g4-meas-terulet-sorter`.

---

## Tesztelés

`src/test/grade4Topic2Area4.test.tsx` – a 4 komponens és mind az 5 SVG ábra renderelése.

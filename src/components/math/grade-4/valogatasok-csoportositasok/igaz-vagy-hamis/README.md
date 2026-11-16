# 4. Igaz vagy hamis? (VI. fejezet, 4. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 131–132. és 134. oldal) és a munkafüzet (`OH-MAT04MA II`, 51. oldal) alapján kidolgozott modul.

---

## 🎯 Tananyag Áttekintés

A fejezet állításai a kis „logikai szavakra” épülnek: **mindegyik / minden**, **van olyan / van közöttük**, **egyik sem / nincs olyan**, **nem mindegyik / nem minden**, valamint **több olyan … van**, **két olyan … van**. A modul a tankönyv szóhasználatát követi (nincs kvantor- vagy halmazjelölés).

### Tankönyvi feladatok
- **TK 132/1. b)** – a 131. oldali kép állatairól (jegesmedve, barnamedve, panda, farkas, hiúz, tigris, vidra, hóbagoly, rétisas, pingvin, kócsag, gém, teknős, szalamandra): „Van közöttük emlősállat.” (I) · „Nincs közöttük háziállat.” (I) · „Nem mindegyik madár.” (I) · „Egyik sem hal.” (I) · „Nincs olyan madár, amelyik ragadozó.” (H) · „Nem mindegyik madár tud repülni.” (I) · „Az emlősök között van ragadozó.” (I) · „Mindegyik vadon élő állat.” (I).
- **TK 132/3. a)** – A: 1246, 54, 600, 8002, 9998; B: 475, 33, 6606, 48, 9579; C: 1005, 8889, 77, 1001, 423. Hét állítás (pl. „Van olyan eleme, amelyik nem páros.” → B, C; „Nincs olyan eleme, amelyik nem páros.” → A).
- **TK 134/8.** logikai lapjai (A–H) – állítások a lapokról (pl. „Mindegyik kék lap háromszög.” – hamis, a D kék négyzet).

### Munkafüzet (MF II/51/10.)
Halmaz: 3063, 4016, 7000, 6624, 8808, 9705, 5939.
„A halmazban minden szám páratlan.” H · „Nem minden szám kisebb, mint a 10 000.” H · „Van olyan szám, amelyben a számjegyek összege 26.” I (5939) · „Nincs olyan szám, amelyben három egyforma számjegy van.” H (7000, 8808) · „Több olyan szám van, amelyben benne van a legkisebb alaki értékű számjegy.” I · „Két olyan szám van, amely ezresekre kerekített értéke a kisebb ezres számszomszédja.” I (3063, 4016).

A régi README Sudoku- és kvantorjelölés-részét elhagytuk: a tankönyv ezeken az oldalakon nem foglalkozik vele.

> **⚠️ CSAPDA:** „Nem mindegyik” ≠ „egyik sem”. A „nem mindegyik madár tud repülni” csak annyit jelent, hogy van kivétel (a pingvin). A „mindegyik” állítás cáfolatához egyetlen ellenpélda elég – de az ellenpéldának a megadott csoportból kell lennie.

---

## 💻 Elkészített Komponensek

1. **`TrueFalse4Figures.tsx`** – `AnimalsGlobeSvg`, `ThreeSetsSvg`, `MfSetSvg`, `QuantifierBoxesSvg`, `CounterexampleSvg`; adatok: `GLOBE_ANIMALS`, `TK_SETS`, `MF_SET`.
2. **`TrueFalse4Theory.tsx`** – állítások a képről, a kis szavak jelentése, ugyanazt jelentő állítások, TK 132/3. táblázat, MF-állítások indoklással, csapda.
   - **I. Laboratórium – Döntsd el!** a TK hét állítását kell I/H gombbal eldönteni az A, B vagy C halmazra, ellenőrzéssel.
   - **II. Laboratórium – Tedd igazzá!** számokat kell a halmazba tenni / kivenni úgy, hogy mindhárom állítás igaz legyen (élő I/H jelzés, 3 feladat).
3. **`TrueFalse4Matcher.tsx`** – 3 szint × 8 pár (ugyanazt jelenti; MF-halmaz; melyik halmazra igaz).
4. **`TrueFalse4Sorter.tsx`** – 3 szint × 3 kategória × 3 elem (kis szavak; melyik halmazra; jelentés).
5. **`TrueFalse4Quiz.tsx`** – 30 kérdés (10/10/10), indoklásos válaszlehetőségekkel, ábrákkal és jelvénnyel, 3 puskával.

---

## 🧪 Tesztelés

`src/test/grade4Topic6TrueFalse4.test.tsx` – renderelés, kérdésszám/szintek, a TK 132/3. állítások helyes halmazai, az MF-halmaz tényei, a „Tedd igazzá!” feladatok megoldhatósága, az I. labor ellenőrzése.

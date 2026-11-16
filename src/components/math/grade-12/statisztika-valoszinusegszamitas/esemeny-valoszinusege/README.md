# 7. Esemény valószínűsége (39. lecke, 90–91. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 39. lecke, 90–91. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a statisztika és valószínűségszámítás fejezet **7.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat:** három pénzérme (10, 20, 50 Ft); A: a 10 Ft-oson írás, B: pontosan egy fej. Az elemi események egyformán valószínűek: P(A) = 4/8 = 0,5, P(B) = 3/8 = 0,375, P(A + B) = 5/8 = 0,625, P(A · B) = 2/8 = 0,25.
(A tankönyvi oldalon valóban „P(A · B) = 2/8 = 0,125” áll – ez nyomdahiba, a modul a helyes 0,25-öt használja.)

---

## 📐 Elmélet

- **Klasszikus valószínűség:** ha az elemi események egyformán valószínűek (és számuk véges), P(A) = kedvező elemi események száma / összes elemi esemény száma.
- **Komplementer:** P(Ā) = 1 − P(A).
- **Egymást kizáró események:** P(A + B) = P(A) + P(B), P(A · B) = 0.
- **Független események:** P(A · B) = P(A) · P(B); a függetlenséget ennek az egyenlőségnek az ellenőrzésével bizonyítjuk (pl. két kocka egymástól független).

### Tankönyvi feladatok (a modulban feldolgozva)
- **1.** Háromjegyű számok (900): nincs 5-ös 648/900 = 0,72; legalább egy 5-ös 0,28; pontosan egy 5-ös 225/900 = 0,25.
- **2.** Társasjáték (fehér 1-es → 6-os): 6 lépés 1/9; 8 vagy 9 lépés 11/36; legfeljebb 4 lépés 1/12; legalább 10 lépés 1/4.
- **4.** Három érme: P(mindhárom azonos) = 1/4, P(több fej) = 1/2, P(ugyanannyi) = 0; A és B függetlenek (1/8 = 1/4 · 1/2).
- **HF 1.** Különböző jegyek 0,72; minden jegy < 4: 48/900 = 4/75.
- **HF 2.** 67 lakó (15 gyerek: 6 fiú, 9 lány; 52 felnőtt: 30 nő, 22 férfi): 15/67, 30/67, 58/67, 9/67.
- **HF 3.** Öt lány érkezése: P(Anna 3.) = P(Bea 4.) = 1/5, P(Cili–Dóri egymás után) = 2/5; P(A · B) = 1/20 ≠ 1/25 ⇒ nem függetlenek.
- **3.** Technikum: 165 lány, a fiúk aránya 75%, 270 kosárlabdázó, a lányok ≈ 18%-a kosarazik → 660 tanuló (495 fiú), 30 kosaras lány, 240 kosaras fiú. P(lány) = 0,25, P(kosaras) = 270/660 ≈ 0,409, P(nem kosaras lány) ≈ 0,205; E (kosaras) és F (fiú): P(E · F) ≈ 0,364 ≠ P(E) · P(F) ≈ 0,307 → nem függetlenek.

> **⚠️ CSAPDA:** P(A + B) = P(A) + P(B) csak kizáró eseményekre igaz (a három érménél 0,5 + 0,375 = 0,875 hibás, helyesen 0,625).

A korábbi README feltételes valószínűséget és axiómákat is tárgyalt, Ω jelöléssel; a tankönyv leckéje ezeket nem tartalmazza (H jelölés, klasszikus modell + függetlenség) – a modul a tankönyvet követi.

---

## 💻 Elkészített Komponensek

1. **`EventProbabilityFigures.tsx`**:
   - `CoinProbabilityVennSvg`: a három érme Venn-diagramja a valószínűségekkel.
   - `ClassicDiceSvg`: két kocka összegtáblázata, P(összeg 7) = 1/6.
   - `BoardGameStepsSvg`: a társasjáték lépéstáblázata.
   - `ThreeDigitSlotsSvg`: háromjegyű számok doboz-modellje (8 · 9 · 9).
   - `IndependentDiceSvg`: független események két kockával.
2. **`EventProbabilityTheory.tsx`**: kidolgozott feladat, szabálytáblázat, függetlenség, a tankönyv 1., 2., 4. feladata és a HF-ok, csapda.
   - **I. Laboratórium:** eseményválasztó két kockával (összeg, van hatos, szorzat páros, társasjáték-lépés; k csúszka) – kedvező/összes, tört, tizedes tört, komplementer; dobás-szimuláció (10/100/1000 dobás) relatív gyakorisággal.
   - **II. Laboratórium:** függetlenség-ellenőrző – két választható esemény, P(A · B) és P(A) · P(B) összevetése színezett táblázattal.
3. **`EventProbabilityMatcher.tsx`**: 3 szint × 8 pár (szabályok; érmék és kockák; tankönyvi feladatok).
4. **`EventProbabilitySorter.tsx`**: 3 szint × 3 kategória × 9 elem (0 / 1 / közte; 1/6 / 1/4 / 1/2; független / kizáró / egyik sem).
5. **`EventProbabilityQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 15 kérdésábrával, 3 puskakártyával.
- `probKit.tsx`: belső rajzsegédek – nem exportáljuk az `index.ts`-ből.

Aktivitás-azonosítók: `g12-stat-valoszinuseg-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic3EventProbability.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

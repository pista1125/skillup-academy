# 6. Események összege és szorzata (38. lecke, 88–89. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 38. lecke, 88–89. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a statisztika és valószínűségszámítás fejezet **6.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat:** három pénzérme (10, 20, 50 Ft); A: a 10 Ft-oson írás (III, IIF, IFI, IFF – 4 elemi esemény), B: pontosan egy fej (IIF, IFI, FII – 3). Az „A vagy B” 5, az „A és B” 2 elemi esemény esetén következik be (Venn-diagramról leolvasva).

---

## 📐 Elmélet

- **Összeg (A + B):** pontosan akkor következik be, ha A és B közül legalább az egyik bekövetkezik.
- **Szorzat (A · B):** pontosan akkor következik be, ha A és B is bekövetkezik.
- Egymást kizáró események szorzata a lehetetlen esemény; komplementer események összege a biztos esemény.
- Kiegészítés a modulban: |A + B| = |A| + |B| − |A · B|, De Morgan-azonosságok (az A + B komplementere Ā · B̄).

### Tankönyvi feladatok (a modulban feldolgozva)
- **1.** Egy hét időjárása (A: > 10 °C, B: > 5 mm, C: szél > 5 km/h): A + B hétfő, kedd, szerda, csütörtök, vasárnap; B · C csütörtök; B + C kedd, szerda, csütörtök, péntek, vasárnap; A · B · C egyik nap sem.
- **2.** Áramkör A, B, C kapcsolóval. ⚠️ A tankönyvi ábra a szövegből nem volt egyértelműen rekonstruálható; a modul a szövegelrendezés alapján A soros + (B ∥ C) kapcsolást rajzol, és ezt kifejezetten ki is mondja (lámpa ⇔ A · (B + C)).
- **3.** Lottó (S: négyzet- és köbszámok, J: 5-tel vagy 7-tel oszthatók, B: számjegyösszeg 9 vagy 10): 42, 45, 49, 63, 64 közül S + J mind az öt, J · B: 45, 63; S · J: 25, 49; S · B · J: 0 szám.
- **4–5.** Elemszám-korlátok: |A| = 18, |B| = 15 ⇒ 18 ≤ |A + B| ≤ 33, 0 ≤ |A · B| ≤ 15; |A · B| = 15, |A + B| = 16 ⇒ 15 ≤ |A|, |B| ≤ 16.
- **HF 1.** Koncert / színház / film 2023-as dátumokkal (K · S csak szombaton: febr. 11.). **HF 3.** |H| = 20, |A| = 12, |B| = 16 ⇒ 16 ≤ |A + B| ≤ 20, 8 ≤ |A · B| ≤ 12.

> **⚠️ CSAPDA:** |A + B| csak egymást kizáró eseményeknél |A| + |B|; általában le kell vonni |A · B|-t.

A korábbi README különbséget, teljes eseményrendszert és ∪/∩ jelölést tárgyalt; a tankönyv a lecke anyagában csak az összeget és a szorzatot definiálja (A + B, A · B jelöléssel) – a modul ezt követi.

---

## 💻 Elkészített Komponensek

1. **`EventAlgebraFigures.tsx`**:
   - `CoinEventsVennSvg`: a kidolgozott feladat Venn-diagramja a 8 elemi eseménnyel.
   - `SumProductVennSvg`: A + B és A · B színezve.
   - `WeatherWeekSvg`: a hét időjárási táblázata az A, B, C eseményekkel.
   - `SwitchCircuitSvg`: áramkör (A soros, B és C párhuzamos).
   - `CountBoundsSvg`: |A| = 18, |B| = 15 két szélső helyzete.
   - (belső segédek: `Circuit`, `SwitchGlyph`, `COIN_VENN_ITEMS`, `WEATHER`)
2. **`EventAlgebraTheory.tsx`**: kidolgozott feladat, definíciók táblázata, De Morgan, a tankönyv 1–5. feladata és HF-ok, csapda.
   - **I. Laboratórium:** H = {1, …, 20}; A, B választható tulajdonság (páros, 3-mal osztható, prím…), 9 művelet (A + B, A · B, Ā · B̄ …) színezett Venn-diagrammal és elemlistával.
   - **II. Laboratórium:** kapcsolók és lámpa – A, B, C ki/be, a bekövetkezett események, A · (B + C), igazságtáblázat.
3. **`EventAlgebraMatcher.tsx`**: 3 szint × 8 pár (jelölés; kockadobás halmazai; elemszámok).
4. **`EventAlgebraSorter.tsx`**: 3 szint × 3 kategória × 9 elem (Venn-tartományok; lámpa; igaz / hamis / kizárás esetén igaz).
5. **`EventAlgebraQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 13 kérdésábrával, 3 puskakártyával.
- `probKit.tsx`: belső rajzsegédek – nem exportáljuk az `index.ts`-ből.

Aktivitás-azonosítók: `g12-stat-esemenyalgebra-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic3EventAlgebra.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

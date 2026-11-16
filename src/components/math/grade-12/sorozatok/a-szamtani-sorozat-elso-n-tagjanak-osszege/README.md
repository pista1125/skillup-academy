# 4. A számtani sorozat első n tagjának összege (25. lecke, 58–59. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 25. lecke, 58–59. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a sorozatok fejezet **4.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** „Hogyan lehet a legegyszerűbben megfogni egy oroszlánt? – Fogunk kettőt, és elengedünk egyet.” – az összeget kétszer vesszük, majd felezzük.

**Kidolgozott feladat (díszkövek):** 50 sor, az elsőben 26 kő, soronként 2-vel több; az 50. sorban 124. Minden sort a „fordított” sorral kiegészítve 150 követ kapunk, 50 · 150 = 7500, ennek fele **3750** díszkő.

---

## 📐 Elmélet

- **Jelölés:** Sₙ = a₁ + a₂ + … + aₙ.
- **Az első és az n-edik taggal:** Sₙ = (a₁ + aₙ)/2 · n.
- **Az első taggal és a differenciával:** Sₙ = (2a₁ + (n − 1)d)/2 · n.
- **Bizonyítás:** Sₙ-t növekvő és csökkenő indexsorrendben felírva és összeadva 2Sₙ = n(a₁ + aₙ), mert a₂ + aₙ₋₁ = a₃ + aₙ₋₂ = … = a₁ + aₙ.
- **Ráadás:** a kis Gauss 1-től 40-ig: 20 pár, mindegyik 41 ⇒ 820.

### Tankönyvi feladatok (a modulban feldolgozva)
- **1.** Hiányzó adatok táblázata: (129; −10; 13) ⇒ a₁₃ = 9, S₁₃ = 897; (d = 5,3; n = 21; aₙ = 112) ⇒ a₁ = 6, S₂₁ = 1239; (d = −1; n = 27; aₙ = 48) ⇒ a₁ = 74, S₂₇ = 1647. A táblázat 3. sorának oszlopkiosztása a szövegből nem egyértelmű, ezért azt kihagytuk.
- **2.** a₁ = −65, aₙ = 65 ⇒ Sₙ = 0 minden n-re.
- **3.** (Érettségi, 2006) 55 egymást követő páratlan szám összege 3905 ⇒ az első 17, az 55. 125.
- **4.** Az első n pozitív páratlan szám összege n².
- **5.** Konzervgúla: 5 · 24 = 120 = 1 + 2 + … + 15 ⇒ a legalsó sorban 15, magasság 180 cm; 3 m-hez 25 sor, 325 konzerv.
- **6.** (Érettségi, 2015) Zsuzsa: 18 hónap, d = 200 Ft, 90 000 Ft ⇒ első 3300 Ft, utolsó 6700 Ft.
- **HF 1.** a₁ = 15, d = −1,2: S₁₀ = 96, S₁₆ = 96, S₂₆ = 0. **HF 2.** 100…1000: 495 550; páratlanok 45…945: 223 245; párosok −14…132: 4366. **HF 3.** Stadion: 19 710 ülőhely. **HF 4.** d = 2, a₂₅ = 43, S₂₅ = 475; d = −3, a₁ = 12, a₂₀ = −45, S₂₀ = −330.

> **⚠️ CSAPDA:** a tagok száma (aₙ − a₁)/d + 1 (100-tól 1000-ig 901, nem 900), és az (a₁ + aₙ) · n szorzatot felezni kell.

---

## 💻 Elkészített Komponensek

1. **`ArithmeticSumFigures.tsx`**:
   - `PavingRowsSvg`: a díszkősorok kiegészítése „fordított” sorokkal (mindegyik 150).
   - `GaussPairsSvg`: a kis Gauss párosítása (1 + 40 = 2 + 39 = … = 41).
   - `ReverseSumSvg`: Sₙ előre és visszafelé, 2Sₙ = n(a₁ + aₙ).
   - `CanPyramidSvg`: konzervgúla soronként eggyel több konzervvel.
   - `StaircaseRectangleSvg`: két „lépcső” téglalappá áll össze (2 + 3 + … + 8 = 35).
2. **`ArithmeticSumTheory.tsx`**: kidolgozott díszkő-feladat, képletek táblázata, bizonyítás, Gauss, a lecke feladatai, csapda.
   - **I. Laboratórium:** Gauss trükkje élőben – a₁, d, n csúszka, előre/vissza/összeg táblázat, mindkét képlet, élő „két lépcső” ábra.
   - **II. Laboratórium:** hány tag kell az adott összeghez? – a₁, d, célösszeg megadása, tankönyvi előbeállítások (konzervgúla, 55 páratlan szám, Zsuzsa, díszkő).
3. **`ArithmeticSumMatcher.tsx`**: 3 szint × 8 pár (összegek értéke; adatokból Sₙ; képletek jelentése).
4. **`ArithmeticSumSorter.tsx`**: 3 szint × 3 kategória × 9 elem (melyik képlet; az összeg előjele; tagszám).
5. **`ArithmeticSumQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 5 kérdésábrával, 3 puskakártyával.
- `seqKit.tsx`: belső rajzsegédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-seq-szamtani-osszeg-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic2ArithmeticSum.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

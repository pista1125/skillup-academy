# 9. A várható érték (41. lecke, 94–95. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 41. lecke, 94–95. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a statisztika és valószínűségszámítás fejezet **9.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat:** egy vurstli szerencsekereke 6 egyenlő cikkből áll (0 Ft kétszer, 100, 200, 900, 1200 Ft). a) A nyeremény várható értéke E = (2 · 0 + 100 + 200 + 900 + 1200) / 6 = **400 Ft**; b) 500 Ft-os pörgetési ár mellett a vállalkozó várható nyeresége 500 − 400 = **100 Ft**.

---

## 📐 Elmélet

- **Várható érték (ismétlés):** csak akkor értelmezhető, ha minden elemi esemény kimenetele valós számmal jellemezhető. Nagyszámú kísérletnél a kimenetelek átlaga egy jól meghatározható érték közelében lesz: ez a várható érték = a lehetséges kimenetelek valószínűségekkel súlyozott átlaga. Jele: **E**.
- **Megjegyzés:** a várható érték nem azonos a legvalószínűbb eredménnyel.
- **Fogalompárok:** relatív gyakoriság ↔ valószínűség; átlag, súlyozott átlag ↔ várható érték.

### Tankönyvi feladatok (a modulban feldolgozva)
- **1.** Szerencsekerék 300 Ft (80°), 2000 Ft (60°), 400 Ft (100°), 900 Ft (70°), 3000 Ft (50°) – a tankönyvi ábra szerint: E = 397 000 / 360 ≈ **1102,78 Ft**.
- **2.** Részvények három esetben (p = 0,5; 0,4; 0,1): A: 22%, −12%, 8% → E = **7%**; B: −2%, 16%, 10% → E = **6,4%**; fele-fele: **6,7%**.
- **3.** Fejek számának várható értéke 1, 2, 3 érmével: **0,5; 1; 1,5**.
- **HF 1.** Árfolyam 5640 (0,3), 5710 (0,6), 5120 Ft (0,1): E = **5630 Ft**; 5330 Ft-os jelenlegi árnál a várható hozam ≈ **5,63%**.
- **HF 2.** A 40. lecke céltáblája (belső kör átmérője feleakkora; 10, 20, 40, 50 pont): P(10) = P(20) = 3/8, P(40) = P(50) = 1/8, E = **22,5**.
- **Ráadás:** a kockázatot a szórással mérik: A: σ = √257 ≈ 16,0%, B: σ ≈ 8,6%, fele-fele: σ ≈ 3,85% (diverzifikációs hatás).

> **⚠️ CSAPDA:** a várható érték nem a legvalószínűbb érték, és nem is feltétlenül lehetséges kimenetel (kocka: E = 3,5).

---

## 💻 Elkészített Komponensek

1. **`ExpectedValue12Figures.tsx`**:
   - `LuckyWheelSvg`: a kidolgozott feladat szerencsekereke.
   - `WheelTableSvg`: eloszlás-táblázat és az E kiszámítása.
   - `AngleWheelSvg`: az 1. feladat kereke középponti szögekkel.
   - `StockScenarioSvg`: a két részvény modellezett hozamai és várható hozamai.
   - `CoinHeadsSvg`: a fejek számának eloszlása 3 érménél, E = 1,5.
   - `TargetBoardSvg`: a céltábla a valószínűségekkel.
2. **`ExpectedValue12Theory.tsx`**: kidolgozott feladat, elmélet, fogalompárok, tankönyvi feladatok és házi feladatok, ráadás (kockázat, diverzifikáció), csapda.
   - **I. Laboratórium:** szerencsekerék-szerkesztő – cikkek nyereménye és szöge csúszkákkal, élő E, legvalószínűbb nyeremény, szervező várható nyeresége a tét függvényében, pörgetés-szimuláció (az átlag E-hez közelít).
   - **II. Laboratórium:** kockázat és diverzifikáció – az A részvény aránya csúszkával, várható hozam, szórás és a szórás görbéje.
3. **`ExpectedValue12Matcher.tsx`**: 3 szint × 8 pár (fogalmak; kísérlet – E; feladateredmények).
4. **`ExpectedValue12Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (statisztika / valószínűségszámítás / nincs várható érték; kinek kedvez a játék; E = 1 / 2 / 3,5).
5. **`ExpectedValue12Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 10 kérdésábrával, 3 puskakártyával.
- `statKit.tsx`: belső rajzsegédek (a fejezet közös készletének másolata `SWheel` szerencsekerékkel; nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-stat-varhato-ertek-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic3ExpectedValue12.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.

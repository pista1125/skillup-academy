# 10. Számszomszédok, kerekítés (tankönyv 43–44. oldal, munkafüzet I. 34–35. oldal)

A magyar Oktatási Hivatal tankönyve (`OH-MAT04TA`, Matematika 4., 43–44. oldal) és munkafüzete (`OH-MAT04MA_I`, 34–35. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke a négyjegyű számok egyes, tízes, százas és ezres számszomszédjait, majd a kerekítést tanítja. A tankönyv a kerekítést a számegyenesen értelmezi: a kerekített érték az a szomszéd, amelyikhez a szám közelebb van; ha pont középen van, a nagyobbra kerekítünk; a kerek szám kerekített értéke önmaga. A jel: ≈.

---

## 📐 Fő tartalom

- **Számszomszédok (TK 43/1., MF 34/1–3., 35/5.):** 5364 → egyes: 5363, 5365; tízes: 5360, 5370; százas: 5300, 5400; ezres: 5000, 6000. 6491 → 6490 | 6492, 6490 | 6500, 6400 | 6500, 6000 | 7000.
- **Szabály (TK 43.):** 4200 ≈ 4000, 3800 ≈ 4000, 3500 ≈ 4000.
- **Debrida hegyei (TK 43/3.):** 5725, 2394, 8500, 4619, 9963, 3132, 7047 m; a százasra és ezresre is 10 000 m-re kerekedő hegy: 9963 m.
- **Csillék (TK 44/4.):** ezresre ≈ 7000 → 7449; ≈ 9000 → 8500; százasra ≈ 6500 → 6540; ≈ 2300 → 2250.
- **Pénztárcák (TK 44/5.):** Tádé 1260 ≈ 1000, Tóni 2420 ≈ 2000, Teó 1750 ≈ 2000, Tati 8500 ≈ 9000, Tódi 2720 ≈ 3000.
- **Visszafelé gondolkodás (TK 44/6–7.):** ezresre 8000 → 7500–8499; százasra 4500 → 4450–4549; tízesre 3250 → 3245–3254.
- **Munkafüzet (MF 34/4., 35/6.):** lámpások (százasra 4800 / ezresre 4000), színezős táblák (százasra 1500, ezresre 3000, tízesre és százasra azonos, százasra és ezresre azonos).

> **⚠️ CSAPDA:** Nem szabad lépcsőzetesen kerekíteni: 4449 ≈ 4000 (nem 4450 → 4500 → 5000), és 4545 százasra ≈ 4500 (nem 4600).

**Javítások:** a régi README LaTeX-jelölést használt ($4763$, $\rightarrow$) – ezt eltávolítottuk. A tankönyv 43. oldalán az 1. feladat táblázatában sajtóhiba van (az 5364 kisebb tízes szomszédja 5380 helyett helyesen 5360); a Tananyag ezt jelzi.

---

## 💻 Elkészített Komponensek

1. **`Rounding10000Figures.tsx`**:
   - `NeighboursTableSvg`: az 5364 számszomszédjainak táblázata (tankönyvi színekkel).
   - `RoundingNumberLineSvg`: ezresre kerekítés a 3000–5000 számegyenesen (4200, 3800, 3500 ≈ 4000).
   - `MountainsSvg`: Debrida hegyei a magasságukkal.
   - `MineCartsSvg`: a négy csille számai és kerekített értékei.
   - `ZoomNeighboursSvg`: „nagyító” – a 4763 ezres, százas és tízes szomszédjai.
   - `roundTo` segédfüggvény.
2. **`Rounding10000Theory.tsx`**: számszomszédok, kerekítési szabály, táblázat, kidolgozott példák (hegyek, csillék, kunyhók), csapda.
   - **I. Labor:** kerekítő számegyenes – szám beállítása gombokkal/csúszkával, tízes/százas/ezres választó, a két szomszéd, távolságok, eredmény.
   - **II. Labor:** a Varázshegy lámpásai – fel kell kapcsolni azokat, amelyek kerekített értéke megfelel; ellenőrzés, több forduló.
3. **`Rounding10000Matcher.tsx`**: 3 szint × 8 pár (tízesre, százasra, ezresre kerekítés).
4. **`Rounding10000Sorter.tsx`**: 3 szint × 3 kategória (százasra 1400/1500/1600; ezresre 2000/3000/4000; lefelé / felfelé / nem változik).
5. **`Rounding10000Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal, 3 puskakártyával. Azonosító: `g4-count-kerekites-quiz`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic1Rounding10000.test.tsx` (4 komponens, 5 ábra, kérdésszám és -szerkezet).

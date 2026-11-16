# 2. A hasáb (2. lecke, 8–9. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 2. lecke, 8–9. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a térgeometria fejezet **2.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** egy 3 egység élű bűvös kocka fedőlapjának sarokkockáit átlójuk mentén függőlegesen elvágják (4 háromszög alapú hasábot vágnak le). A megmaradt test **nyolcszög alapú egyenes hasáb**: 16 csúcs, 24 él (16 „vízszintes”, 8 „függőleges”), 10 lap; az alaplap 4 oldala 1, másik 4 oldala √2 egység, a magasság 3 egység.

---

## 📐 Elmélet

- **Hasáb:** olyan poliéder, amelyet az **alaplap** (tetszőleges sokszög), a vele egybevágó, **párhuzamos eltolással** kapott **fedőlap** és a **paralelogramma** alakú **oldallapok** határolnak. Élek: alapélek, fedőélek, oldalélek; bármely két oldalél egyenlő hosszú és párhuzamos.
- **Egyenes hasáb:** az oldallapok téglalapok; az oldalélek merőlegesek az alap- és fedőlap síkjára, így a **testmagasság (M) = oldalél**. Ami nem egyenes, az **ferde hasáb**.
- **Négyzetes oszlop (négyzetes hasáb):** négyzet alapú egyenes hasáb. **Téglatest:** téglalap alapú egyenes hasáb. **Kocka:** egyenlő élű téglatest.
- **Elnevezés:** az alaplap alakja + egyenes/ferde (pl. szabályos hatszög alapú egyenes hasáb, rombusz alapú ferde hasáb).
- **Kiegészítés (a feladatokból):** n-oldalú hasáb: 2n csúcs, 3n él, n + 2 lap; n(n − 1) lapátló, n(n − 3) testátló.

### Tankönyvi feladatok (a modulban feldolgozva)
- **1.** A′-ből a fedőlapon 5 átló (√5, √5, 2√2, √10, 3), 5 testátló (√14, √14, √17, √18, √19). **HF 1.** 20 alaplap-átló 4-féle hosszal, 40 testátló.
- **2.** Szabályos hatszög alapú tartószerkezet (a = 4 m, M = 5 m): merevítő rudak √73 ≈ 8,54 m és √89 ≈ 9,43 m.
- **3.** Szabályos háromszög alapú hirdetőoszlop (90 cm, 300 cm): fekve ≈ 77,9 cm magas; kettőt összeillesztve rombusz alapú hasáb, a legtávolabbi csúcsok ≈ 338,1 cm-re.
- **HF 2.** Igaz–hamis: páros számú lapátló (igaz), van testátló nélküli hasáb (igaz), oldalél ≥ magasság (igaz), hétszög alapú hasábnak 18 testátlója van (hamis, 28).
- A HF 3. (svájci csokoládé doboza) ábrája a szövegből nem egyértelmű, ezért nem dolgoztuk fel.

> **⚠️ CSAPDA:** Ferde hasábban a magasság nem az oldalél: M = oldalél · sin(hajlásszög) < oldalél.

---

## 💻 Elkészített Komponensek

1. **`PrismFigures.tsx`**:
   - `RubikOctaPrismSvg`: a megvágott bűvös kocka (nyolcszög alapú hasáb) és a fedőlap felülnézete rácson.
   - `PrismAnatomySvg`: ferde hasáb részei (alaplap, fedőlap, oldallap, alapél, oldalél, M).
   - `PrismTypesSvg`: ferde hasáb, egyenes hasáb, négyzetes oszlop.
   - `HexPrismDiagonalsSvg`: a hatszög alapú hasáb két testátló-típusa (a = 4 m, M = 5 m).
   - `TriPrismBillboardSvg`: a háromszög alapú hirdetőoszlop és a két oszlopból kapott rombusz alapú hasáb.
2. **`PrismTheory.tsx`**: bevezető, definíció, fajták táblázata, kidolgozott feladatok (átlók, merevítő rudak, hirdetőoszlop), átlószám-képletek, csapda.
   - **I. Laboratórium:** n-oldalú szabályos hasáb (Solid3DViewer) oldalszám-, magasság- és ferdeség-csúszkával; csúcs-, él-, lap-, lapátló- és testátlószám, Euler-ellenőrzés.
   - **II. Laboratórium:** hasábtípus-felismerő – alaplap-alak és egyenes/ferde választás, a test neve és forgatható 3D képe.
3. **`PrismMatcher.tsx`**: 3 szint × 8 pár (részek és fajták; darabszámok; átlók és távolságok).
4. **`PrismSorter.tsx`**: 3 szint × 3 kategória × 9 elem (egyenes / ferde / téglatest; csúcs / él / lap; igaz / hamis / függ).
5. **`PrismQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 13 kérdésábrával, 3 puskakártyával.
- `figKit.tsx`: belső rajzsegédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-ter-hasab-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic1Prism.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

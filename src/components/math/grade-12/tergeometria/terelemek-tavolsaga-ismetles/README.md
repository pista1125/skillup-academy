# 1. Térelemek távolsága (ismétlés) (1. lecke, 4–7. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 1. lecke, 4–7. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a térgeometria fejezet **1.** leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke két modellezési feladattal indít:
- **Négy hajó**, bármely kettő 40 m-re: három vitorlás a vízen egy 40 m oldalú szabályos háromszög csúcsaiban, a negyedik nem lehet ebben a síkban → **léghajó vagy tengeralattjáró** (szabályos tetraéder csúcsa).
- **A pók útja** egy 2 m × 4 m × 2,5 m-es szobában az E sarokból a legtávolabbi C sarokba:
  - a) fonálon (levegőben): az EC testátló, $EC = \sqrt{2{,}5^2 + 2^2 + 4^2} = \sqrt{26{,}25} \approx 5{,}12$ m;
  - b) a falakon: két szomszédos lap síkba terítése, három eset: $\sqrt{46{,}25} \approx 6{,}80$ (HG élen át), $\sqrt{36{,}25} \approx 6{,}02$ (AD élen át), $\sqrt{42{,}25} = 6{,}5$ (HD élen át). A legrövidebb a **leghosszabb élt** metsző út (≈ 6,02 m); az AD élen az A-tól ≈ 2,22 m-re fordul be.

---

## 📐 Elmélet

- **Térelemek:** pont, egyenes, sík, tér.
- **Kölcsönös helyzet:** két egyenes metsző / párhuzamos / kitérő (nincs közös síkjuk); egyenes és sík: illeszkedik / metszi / párhuzamos; két sík: metsző (metszésvonal) / párhuzamos.
- **Távolság:** két ponthalmaz távolsága a pontjaik távolságainak minimuma; közös pont esetén 0. Pont–egyenes és pont–sík: a merőleges szakasz hossza. Párhuzamos egyenesek, sík és vele párhuzamos egyenes, párhuzamos síkok: az egyik tetszőleges pontjának távolsága a másiktól.
- **Lapátló, testátló:** poliéder két csúcsát összekötő szakasz él vagy átló; lapra illeszkedő átló = lapátló, egyébként testátló.
- **Téglatest testátlója:** $e = \sqrt{a^2 + b^2 + c^2}$; **kocka:** $f = a\sqrt2$, $e = a\sqrt3$.

### Tankönyvi feladatok (a modulban feldolgozva)
- **1.** Lapátló 10 → testátló $5\sqrt6 \approx 12{,}25$. **HF 1.** Testátló 30 → lapátló $10\sqrt6 \approx 24{,}49$.
- **2.** AD = 7, AB = 12, AA′ = 5: az élek távolsága AD-től 0 / 5 / 12 / 13 m.
- **3.** 8 cm élű kocka testátlója és a többi csúcs: $8\sqrt6/3 \approx 6{,}53$ cm.
- **4.** Terem (élek összege 53,2 m, 4 : 6 : 9 → 2,8 × 4,2 × 6,3 m), lámpa 40 cm-es zsinóron: padlótól 2,4 m, legkisebb faltól 3,15 m, legközelebbi leghosszabb éltől ≈ 2,14 m.
- **HF 2. (érettségi 2007)** Antenna: ≈ 19 m magas; a 4 vászon területe ≈ 272,2 m².
- **HF 3.** 5 × 8 m-es alaprajz, átlósík: a másik két függőleges él ≈ 4,24 m-re van.
- **HF 4.** Szomszédos lapközéppontok 21,92 cm → él ≈ 31 cm; a lapközéppontok oktaédert alkotnak (6 csúcs, 12 él, 8 lap).

> **⚠️ CSAPDA:** A falakon mászó pók útja nem a testátló – a kiterített lapokon kell a téglalap átlóját számolni, és mindhárom kiterítést össze kell hasonlítani.

---

## 💻 Elkészített Komponensek

1. **`SpatialDistanceFigures.tsx`**:
   - `ShipsTetrahedronSvg`: a négy hajó – szabályos háromszög a vízen, léghajó / tengeralattjáró.
   - `SpiderBoxSvg`: a 2 × 4 × 2,5-es téglatest, az ACE derékszögű háromszög és az EC testátló.
   - `SpiderNetsSvg`: a három kiterítés (I., II., III.) a téglalapátlókkal.
   - `DistanceTypesSvg`: pont–egyenes, pont–sík, párhuzamos síkok távolsága.
   - `CubeDiagonalsSvg`: a kocka lapátlója és testátlója.
2. **`SpatialDistanceTheory.tsx`**: bevezető, kölcsönös helyzet táblázata, távolságok, lapátló–testátló, kidolgozott feladatok (pók, kocka, lámpa, téglatest élei), csapda.
   - **I. Laboratórium:** forgatható téglatest (Solid3DViewer) csúszkákkal; lapátló, testátló és a pók három falmenti útja, a legrövidebb kiemelve.
   - **II. Laboratórium:** a lámpa a teremben – az élösszeg és a zsinór csúszkával, a távolságok élőben és 3D-ben.
3. **`SpatialDistanceMatcher.tsx`**: 3 szint × 8 pár (fogalmak; átlók; távolságok feladatokban).
4. **`SpatialDistanceSorter.tsx`**: 3 szint × 3 kategória × 9 elem (élek helyzete; él / lapátló / testátló; távolság 0 / a / a√2).
5. **`SpatialDistanceQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 16 kérdésábrával, 3 puskakártyával.
- `figKit.tsx`: belső rajzsegédek (kavalier-vetület, takart élek, magyar derékszög-jelölés) – nem exportáljuk az `index.ts`-ből.

Aktivitás-azonosítók: `g12-ter-terelemek-tavolsaga-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic1SpatialDistance.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

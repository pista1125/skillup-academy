# 9. Térelemek hajlásszöge (tankönyv 10. lecke, 24–25. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 24–25. oldal) alapján kidolgozott oktatási modul. A tankönyvben ez a **10. lecke**, a diákzónában a térgeometria fejezet **9.** leckéje.

---

## 🎯 Tananyag Áttekintés

Kidolgozott feladat: egy **30 × 6 × 5 cm**-es téglatest alakú tárolóládában elfér-e két **31 cm**-es vékony fémpálca, és mekkora szöget zárnak be egymással és a legnagyobb lappal?
- A testátló e² = 5² + 6² + 30² ⇒ **e = 31 cm**, tehát a pálcák a testátlók mentén elférnek.
- Ugyanazon testátló mentén 0°; két különböző testátló (AG, HB) felezi egymást, HK = AK = 15,5 cm, AH = √61 ≈ 7,81 cm, sin(α/2) = 3,905 / 15,5 ⇒ **α ≈ 29,2°**.
- AG és az ABCD lap: a GAC háromszög C-nél derékszögű, sin β = 5 / 31 ⇒ **β ≈ 9,3°**.

---

## 📐 Elmélet

1. **Két egyenes:** két metsző egyenes hajlásszöge a két-két egyenlő szög közül a nem nagyobbik (legfeljebb 90°); párhuzamos egyeneseké 0°. (Kitérő egyeneseknél egy ponton át húzott párhuzamosaik szögét vesszük.)
2. **Egyenes és sík:** az egyenes merőleges a síkra, ha a sík minden egyenesére merőleges; elegendő, ha a döféspontban két síkbeli egyenesre merőleges. A hajlásszög az egyenes és a síkra eső merőleges vetületének szöge; párhuzamos esetben 0°.
3. **Két sík:** a metszésvonal tetszőleges pontjában a metszésvonalra merőlegesen, a két síkban állított egyenesek szöge; párhuzamos síkoké 0°.
- Egyik hajlásszög sem nagyobb 90°-nál; a számolás alkalmas derékszögű háromszögben, szögfüggvényekkel történik.

### Tankönyvi feladatok
- **1.** Négyzetes oszlop 5 × 5 × 9 cm: ABGH és ACGE téglalap; T = 5√106 ≈ 51,48 cm² és 45√2 ≈ 63,64 cm²; ABGH–alaplap ≈ 60,9°, ABGH–ABFE ≈ 29,1°, ABGH–BCGF 90°; ACGE–alaplap 90°, ACGE–oldallapok 45°.
- **2.** 6 cm élű kocka: AG és BCGF sík ≈ 35,3°; BDG és ABCD sík ≈ 54,7°.
- **3.** Szabályos hatszög alapú hasáb, leghosszabb testátló 14 cm, 60° az alaplappal ⇒ a = 3,5 cm, m ≈ 12,12 cm; rövidebb testátló ≈ 13,56 cm.
- **HF 1.** Téglatest 5,18 × 3,75 × 9,92 cm: AG–alaplap ≈ 57,2°; AG–AE ≈ 32,8°; AG–CE ≈ 65,6° = 2 · EAG∢ (igaz).
- **HF 2.** Négyzetes oszlop, T_alap = 1 dm², palást 280 cm² ⇒ a = 10 cm, m = 7 cm; AK ≈ 9,95 cm; AK–AB ≈ 59,83°; AK–alaplap ≈ 44,71°.

> **⚠️ CSAPDA:** az egyenes és sík szöge a vetülettel mért szög, nem egy tetszőleges síkbeli egyenessel (a ládánál AG–AB ≈ 14,6°, de AG–alaplap ≈ 9,3°). 90°-nál nagyobb kapott szög esetén a hajlásszög 180° − φ.

---

## 💻 Elkészített Komponensek

1. **`SpatialAnglesFigures.tsx`**:
   - `CrateDiagonalsSvg`: a láda AG és HB testátlója, α ≈ 29,2°.
   - `DiagonalBaseAngleSvg`: AG és az alaplap, GAC derékszögű háromszög, β ≈ 9,3°.
   - `LineLineAngleSvg`: két metsző egyenes (35° / 145°) és párhuzamosak.
   - `LinePlaneAngleSvg`: egyenes, merőleges vetület, hajlásszög.
   - `PlanePlaneAngleSvg`: két sík, metszésvonal, merőlegesek.
   - `SquarePrismPlaneSvg`: négyzetes oszlop ABGH síkja és az alaplap.
2. **`SpatialAnglesTheory.tsx`**: kidolgozott ládás feladat, definíciók, kidolgozott feladatok (oszlop, kocka, hatszög hasáb, HF), táblázat, csapda.
   - **I. Laboratórium:** forgatható téglatest (`Solid3DViewer`) AB, BC, AE csúszkával; választható pár: testátló–alaplap, testátló–él, két testátló, BDG sík–alaplap; kiemelt derékszögű háromszög és lépésenkénti számolás.
   - **II. Laboratórium:** létra és talaj – szakasz hossza és magassága ⇒ vetület, sin α, hajlásszög, rajzzal.
3. **`SpatialAnglesMatcher.tsx`**: 3 szint × 8 pár (definíciók, a kocka nevezetes szögei, tankönyvi feladatok).
4. **`SpatialAnglesSorter.tsx`**: 3 szint × 3 kategória × 9 elem (egyenes–egyenes / egyenes–sík / sík–sík; 0° / 90° / közte; igaz / hamis / adatfüggő).
5. **`SpatialAnglesQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdésábrákkal, 3 puskakártyával. Haladás-azonosító: `g12-ter-hajlasszog-quiz`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic1SpatialAngles.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.

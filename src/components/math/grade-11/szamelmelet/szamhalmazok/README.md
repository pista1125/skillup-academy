# 1. Számhalmazok (tankönyv 42. lecke, 120–123. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 120–123. oldal) alapján kidolgozott oktatási modul. A diákzónában a IV. fejezet (Számelmélet) 1. leckéje.

---

## 🎯 Tananyag Áttekintés

**1. kidolgozott feladat (Venn-diagram):** a racionális (Q), az egész (Z) és a természetes számok (N) halmaza egymásba ágyazódik: N ⊂ Z ⊂ Q.
- N: 12/2 = 6; 0; 3; 100; 7/7 = 1; (−10)/(−5) = 2.
- Z \ N: −4; −9; −5/5 = −1; −17; −13; −8/4 = −2.
- Q \ Z: 2,3; 8/7; 54/45; −46,071; 879/250; 3/5.
- Egyik halmaznak sem eleme: √8; √5.
- b) Két természetes szám összege, szorzata mindig természetes; 1 − 3 = −2 nem természetes; két egész szám összege és szorzata mindig egész; −9 : 3 = −3.
- c) A), B), C) igaz; D) hamis, pl. 3 : (−2) = −1,5.

---

## 📐 Elmélet

- **N** zárt az összeadásra és a szorzásra; a kivonás kivezet belőle. A két természetes szám különbségeként felírható számok az **egész számok**.
- **Z** zárt az összeadásra, a kivonásra és a szorzásra; az osztás kivezet belőle. A két egész szám hányadosaként felírható számok a **racionális számok**.
- **Q** zárt mind a négy alapműveletre (0-val nem osztunk).
- Minden racionális szám tizedes tört alakja **véges vagy végtelen szakaszos**. Az egyszerűsített tört tizedes tört alakja pontosan akkor véges, ha a nevező prímtényezős felbontásában csak a 2 és/vagy az 5 szerepel (ekkor a nevező bővíthető 10 hatványára): 13/8 = 1,625; 7/25 = 0,28; 3/60 = 1/20 = 0,05; 63/35 = 9/5 = 1,8.
- Végtelen szakaszos: 4/9 = 0,4̇; 5/6 = 0,83̇; 17/11 = 1,5̇4̇; 18/14 = 9/7 = 1,2̇85714̇. Jelölés: 2,132323… = 2,13̇2̇.
- **Megjegyzés:** 0,9̇ = 9 · 0,1̇ = 9 · 1/9 = 1.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **2. kidolgozott feladat (Lujza és Félix):** 3/10 = 0,3; 4/9 = 0,4̇; 13/8 = 1,625; 10/12 = 0,83̇; 7/25 = 0,28; 2111/990 = 2,13̇2̇; 21/28 = 0,75; 49/32 = 1,53125; 113/5 = 22,6; 17/11 = 1,5̇4̇.
- **1.** 13/20 véges; 45/72 = 5/8 véges; 21/16 véges; 25/15 = 5/3 végtelen szakaszos; 39/52 = 3/4 véges.
- **2.** A négy feltételnek eleget tevő számok: 2/4 = 1/2 és 6/8 = 3/4.
- **3.** A 40 felbontása: a) két különböző természetes szám összegére 20-féleképpen; b) két természetes szám szorzatára 4-féleképpen; c) két egész szám összegére végtelen sokféleképpen; d) két különböző előjelű egész szám hányadosaként sehogy.
- **HF 2.** A hamis (3 + (−5) = −2); B igaz; C hamis (2 · 1/2 = 1); D igaz (0,3̇ + 0,6̇ = 1); E igaz.
- **Ráadás:** 24,7̇ = 223/9; 24,173̇26̇ = 2 414 909 / 99 900; K = 6,4̇ = 58/9; L = 13,53̇ = 203/15; M = 71,81̇46̇ = 358 714 / 4995.

> **⚠️ CSAPDA:** előbb egyszerűsíts! 21/28 nevezőjében ott a 7, de 21/28 = 3/4 = 0,75 véges.

> Megjegyzés: a tankönyv szerint Félix azt mondja, hogy 3-as számlálóval „csak háromszor” kapunk végtelen szakaszos tizedes törtet; számolással csak két ilyen tört van (3/7 és 3/9 = 1/3), háromszor a 7-es számlálónál fordul elő (7/3, 7/6, 7/9). A modul a számolt eredményt közli. A 4. feladat és a HF 1., 3. feladat a forrásszövegben nem olvasható egyértelműen, ezért ezeket a modul nem dolgozza fel.

---

## 💻 Elkészített Komponensek

1. **`G11NumberSetsFigures.tsx`**:
   - `G11NumberSetsVennSvg`: Q ⊃ Z ⊃ N halmazábra a kidolgozott feladat 20 számával.
   - `G11ClosureOperationsSvg`: a kivonás kivezet N-ből, az osztás Z-ből.
   - `G11DecimalTypesSvg`: véges és végtelen szakaszos törtek a nevező prímtényezőivel.
   - `G11DenominatorRuleSvg`: döntési folyamat (egyszerűsíts → bontsd fel a nevezőt → csak 2 és 5?).
   - `G11RepeatingToFractionSvg`: Ráadás – 10A − A módszer (24,7̇ = 223/9).
2. **`G11NumberSetsTheory.tsx`**: Venn-feladat, zártsági táblázat, Lujza és Félix feladata, tizedes tört szabály, tankönyvi és házi feladatok, Ráadás, csapda.
   - **I. Laboratórium:** törtvizsgáló – egyszerűsítés, a nevező prímtényezős felbontása, véges / végtelen szakaszos döntés, tizedes tört alak hosszú osztással (szakaszjelöléssel), legszűkebb számhalmaz.
   - **II. Laboratórium:** szakaszos tizedes tört → közönséges tört (egészrész, előszakasz, szakasz), lépésenként a 10 hatványaival.
3. **`G11NumberSetsMatcher.tsx`**: 3 szint × 8 pár (tört ↔ tizedes tört; tört ↔ nevező felbontása; szakaszos tört ↔ közönséges tört).
4. **`G11NumberSetsSorter.tsx`**: 3 szint × 3 kategória (legszűkebb halmaz; a művelet eredménye; egész / véges / végtelen szakaszos).
5. **`G11NumberSetsQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdéstípus-címkékkel, 4 Venn-ábrás kérdéssel, 3 puskakártyával (progress id: `g11-num-szamhalmazok-quiz`).

A komponensnevek `G11` előtagot kaptak, mert a 9. évfolyamon már létezik `NumberSetsTheory`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic4NumberSets.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

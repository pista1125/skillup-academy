# 5. Nagyítás, kicsinyítés (V. fejezet, 5. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 126–127. oldal) és munkafüzet (`OH-MAT04MA_II`, 39. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

- **TK 126/1.** Nagyítás és kicsinyítés a mindennapokban: az éjjeli fényvetítő és a mesekönyv-projektor nagyítva vetíti ki a képet; a földgömb és a térkép a valóság **kicsinyített mása**. Eszközök: vetítő, projektor, nagyító, mikroszkóp; nagyítás a telefon képernyőjén.
- **TK 126/2.** Négyzethálós házikók: Ábel a felére kicsinyítette, Kata a kétszeresére nagyította a házat, Gábor ugyanolyan alakú és ugyanakkora házat rajzolt.
- **TK 127/3.** Fa és nyúl négyzethálón, kétszeresére nagyítva. *„Az eredeti és a kétszeresére nagyított rajz ugyanolyan alakú, de nem ugyanakkora. Ezek az alakzatok **hasonlók**.”*
- **TK 127/4.** Melyik alakzatpár hasonló? (két kör: igen; elnyújtott alakzatok: nem).
- **TK 127/5.** Rajzolás nyilas lépéssorral: 2→, 3↓, 2←, 3↑; a számok kétszerezése (hasonló, nagyított mása) és kettő hozzáadása (nem hasonló).
- **TK 127/6.** Helytelen nagyítás/kicsinyítés felismerése (elnyúlt kép).
- **MF 39/1.** Különböző hálókra másolt rajz – melyik lett hasonló?
- **MF 39/2.** Betűs lépéssor (j, b, f, l): 6f, 2j, 2l, 2j, 2f, 2j, 6l, 6b, majd a számok felezése: 3f, 1j, 1l, 1j, 1f, 1j, 3l, 3b.
- **MF 39/3.** Világtájas lépéssor: 1É, 1K, 1É, 2K, 1D, 2K, 1DNY, 4NY, majd négyszeres nagyítás.

> **⚠️ CSAPDA:** nagyításkor szorozni kell, nem hozzáadni. A 3 · 2-es téglalap kétszeres nagyítása 6 · 4-es, nem 5 · 4-es.

(A korábbi README `$2\times$`-szerű LaTeX-jelöléseket és „szögek ugyanakkorák maradnak” típusú, a tankönyvben nem szereplő megfogalmazásokat tartalmazott – ezeket a tankönyv szóhasználatára cseréltük.)

---

## 💻 Elkészített Komponensek

1. **`Scaling4Figures.tsx`**:
   - `MagnifierMapSvg`: nagyító a katicával, földgömb és térkép (nagyítás / kicsinyítés).
   - `HouseDrawingsSvg`: a tankönyvi négy házikó négyzethálón (eredeti, Ábel, Kata, Gábor).
   - `TreeDoubleSvg`: fa és kétszeresére nagyított mása (1 kis négyzet → 2 · 2).
   - `SimilarPairsSvg`: hasonló és nem hasonló alakzatpárok.
   - `ArrowStepsSvg`: 2→, 3↓, 2←, 3↑ kétszerezve és kettővel növelve.
   - `WrongScalingSvg`: jó nagyítás és elnyúlt (nem hasonló) kép.
2. **`Scaling4Theory.tsx`**: mindennapi példák, házikók táblázata, kétszeres nagyítás, hasonlóság, lépéssorok (nyilak, betűk, világtájak), csapda.
   - **I. Labor – Nagyító-rajzoló:** kattintással kell kiszínezni az alakzat kétszeresére nagyított vagy felére kicsinyített képét a négyzethálón; ellenőrzés cellánként (rossz helyen / hiányzik).
   - **II. Labor – Lépéssor-varázsló:** tankönyvi és munkafüzeti lépéssorok (téglalap, négyzet, vár, hajó) kétszerezése, háromszorozása, felezése, kettő hozzáadása; előbb tippelni kell, hasonló lesz-e, aztán megjelenik a rajz.
3. **`Scaling4Matcher.tsx`**: 3 szint × 8 pár (eszközök és fogalmak, téglalapok mérete, lépéssorok és darabszámok).
4. **`Scaling4Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (nagyítás / kicsinyítés / ugyanakkora; kétszeres / feles / nem hasonló; igaz / hamis / attól függ).
5. **`Scaling4Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal, 3 puskakártyával. Azonosítók: `g4-geom-nagyitas-quiz`, `-matcher`, `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade4Topic5Scaling4.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.

# 6. Eltolás (V. fejezet, 6. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 128. oldal) és munkafüzet (`OH-MAT04MA_II`, 40. oldal, „Eltolás, elforgatás” 1–3. feladat) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

- **TK 128/1.** A teadélutánra átrendezik a termet: Kati megkéri a fiúkat, hogy tolják arrébb a tanári asztalt, de rossz helyre kerül. Mit kellett volna megmondania? **Mekkora távolságra? Milyen irányban?**
- **TK 128/2.** Csoportmunka: a szék eltolásának irányát a **fő- és mellékvilágtájakkal**, a távolságot méterben adjuk meg. Például: *keletre 1 m; északkeletre 1 m.*
- **TK 128/3.** A vonatsablont az egyenes mentén eltoljuk, és az A, B, C, D pontoknál körberajzoljuk. Változott-e az alakzat formája és nagysága? (Nem.)
- **TK 128/4.** A busz egyenes úton halad, a megállók 5 cm-re vannak egymástól – rajzold le a megállókban álló buszokat.
- **MF 40/1.** Párban: a radír eltolása világtájak szerint, adott centiméterrel, méréssel ellenőrizve.
- **MF 40/2.** Jelölések 3 centiméterenként (0 cm, 3 cm, …), a kis háromszög eltolása a következő jelölésig.
- **MF 40/3.** A kis zöld négyzet eltolása: keletre 2 cm, északra 3 cm, északnyugatra 4 cm, nyugatra 7 cm.

> **⚠️ CSAPDA:** irány nélkül nincs eltolás („Told el 5 cm-rel!” – de merre?). Eltoláskor az alakzat nem fordul el és nem változik a mérete.

(A korábbi README „egybevágó”, „állástartás”, LaTeX-számok és „díszítősorok, parkettázás, animációk” tartalmat írt – ezek nem szerepelnek a tankönyvben; a tankönyv a fő- és mellékvilágtájakkal adja meg az irányt.)

---

## 💻 Elkészített Komponensek

1. **`Translation4Figures.tsx`**:
   - `DeskPushSvg`: a tanári asztal eltolása – „Mekkora távolságra?”, „Milyen irányban?”.
   - `CompassRoseSvg`: fő- és mellékvilágtájak (É, K, D, NY, ÉK, DK, DNY, ÉNY).
   - `ChairShiftSvg`: szék eltolása keletre és északkeletre (felülnézet, négyzetháló).
   - `TrainTemplateSvg`: vonatsablon az A, B, C, D pontoknál.
   - `GridShiftSvg`: háromszög eltolása négyzethálón, egyforma párhuzamos nyilakkal.
   - `BusStopsSvg`: buszok a 5 cm-enkénti megállókban.
2. **`Translation4Theory.tsx`**: irány + távolság, világtájak, mi változik és mi nem, eltolás négyzethálón, kidolgozott példák (busz, 3 cm-es jelölések, zöld négyzet), csapda.
   - **I. Labor – Eltoló gép:** 8 irányú gombokkal (és a billentyűzet nyilaival) kell az alakzatot a megadott irányba és távolságra tolni; az ellenőrzés kiírja, hová került.
   - **II. Labor – Rajzold meg az eltolt képet:** kattintással kell kiszínezni az eltolt alakzat négyzeteit; ellenőrzés cellánként.
3. **`Translation4Matcher.tsx`**: 3 szint × 8 pár (világtájak rövidítései, visszatolás, eltolások összegzése).
4. **`Translation4Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (eltolás / forgás / nagyítás; fő- / mellék- / nem világtáj; hová kerül a radír).
5. **`Translation4Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal, 3 puskakártyával. Azonosítók: `g4-geom-eltolas-quiz`, `-matcher`, `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade4Topic5Translation4.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.

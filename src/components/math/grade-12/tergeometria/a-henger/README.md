# 4. A henger (4. lecke, 12–13. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 4. lecke, 12–13. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a térgeometria fejezet **4.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** a fazék, a cilinder, a jéghoki korongja és a hirdetőoszlop alakja egyaránt **egyenes körhenger**. Papírlap két szemközti oldalát összeillesztve a szabadon maradt oldal hossza a kör kerülete, az összeragasztott oldalaké a henger magassága. Téglalapot (pl. névjegykártyát) egy tengely körül forgatva **forgáshenger** keletkezik. Az összetekert A4-es lap elbírja a tankönyvet.

---

## 📐 Elmélet

- Az **egyenes körhengert (forgáshengert)** két egybevágó, párhuzamos síkban lévő körlap (**alaplap**, **fedőlap**) és egy görbe felület (**palást**) határolja.
- A palást síkba kiterítve téglalap: egyik oldala az alapkör kerülete (2rπ), a másik a magasság (m).
- **Alkotók:** az alaplapra merőleges, palástra illeszkedő szakaszok; hosszuk = testmagasság.
- **Tengely:** a két körlap középpontját összekötő egyenes.
- **Tengelymetszet:** az alap- és fedőkör egy-egy párhuzamos átmérője és a végpontjaikba állított alkotók által alkotott téglalap (2r × m).
- (A régi README ferde síkmetszetet / ellipszist is tárgyalt; ez a tankönyvi leckében nem szerepel, kimaradt.)

### Tankönyvi feladatok (a modulban feldolgozva)
- **1.** A4 (29,5 × 21 cm), hosszabb oldalak összeragasztva: r ≈ 3,34 cm, tengelymetszet ≈ 197,2 cm².
- **2.** Igaz–hamis: négyzet tengelymetszetnél r : m = 1 : 2 (igaz); palást/alapkör = 2 · m/r (igaz); tengelymetszet = alapkör területe ⇒ m = (π/2) · r (igaz).
- **3.** Fakanál a 8 cm sugarú, 32 cm magas fazékban: √1280 ≈ 35,78 cm.
- **4.** Lámpaernyő (palást 1885 cm², 20 cm magas, 12 cm-es pálcák): R ≈ 15 cm, a foglalat átmérője 6 cm.
- **HF 1.** 2,6 × 4,5 cm-es téglalap: alapkör ≈ 63,62 cm² (rövidebb oldal körül) ill. ≈ 21,24 cm².
- **HF 2.** 32 cm-es négyzet fólia: ≈ 10,19 cm átmérőjű, 32 cm hosszú cső.
- **HF 3.** 16 cm átmérőjű, 10 cm magas torta 8 cikkre: 8π ≈ 25,13 cm² kakaós, 20π ≈ 62,83 cm² mázas felület cikkenként.

> **⚠️ CSAPDA:** Forgatásnál a tengelyen fekvő oldal a magasság, nem a sugár; papírhengernél a szabad oldal a kerület, nem az átmérő.

---

## 💻 Elkészített Komponensek

1. **`CylinderFigures.tsx`**:
   - `CylinderPartsSvg`: a henger részei (tengely, körlapok, alkotó, tengelymetszet).
   - `RectangleRotationSvg`: téglalap forgatása az oldalegyenese körül.
   - `PaperRollSvg`: az A4-es lap kétféle összeragasztása.
   - `SpoonInPotSvg`: a fakanál a fazékban – a tengelymetszet átlója.
   - `LampShadeSvg`: a lámpaernyő kerete felülnézetben.
2. **`CylinderTheory.tsx`**: bevezető, részek táblázata, forgáshenger, egyenlő oldalú henger, kidolgozott feladatok (A–D), csapda.
   - **I. Laboratórium:** téglalap forgatása – oldalak és tengely választása, forgatható 3D henger tengelymetszettel (Solid3DViewer).
   - **II. Laboratórium:** henger egy papírlapból – sugár, magasság, tengelymetszet, leghosszabb pálca élőben.
3. **`CylinderMatcher.tsx`**: 3 szint × 8 pár.
4. **`CylinderSorter.tsx`**: 3 szint × 3 kategória × 9 elem.
5. **`CylinderQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 11 kérdésábrával, 3 puskakártyával.
- `figKit.tsx`: belső rajzsegédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-ter-henger-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic1Cylinder.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

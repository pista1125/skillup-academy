# 3. Az űrtartalom mérése (2. osztály, VIII. Mérések)

## Források
- Tankönyv II. kötet (`OH-MAT02TA_II.pdf`), 108–110. o. – „Az űrtartalom mérése” (és a 101. o. nyitóoldal vödrei)
- Munkafüzet II. kötet (`OH-MAT02MA_II.pdf`), 70–72. o. (a 73. oldal már a fejezetzáró „Megálló”)

## Mit tartalmaznak a könyvoldalak?
- **TK II/108:** edények sorba rendezése űrtartalom szerint, 1 l-es mérőedény megtöltése 1 dl-es edénnyel (1 liter = □ dl), különböző poharakkal merítés, azonos üvegek vízszintje.
- **TK II/109:** 2 l, 3 l, 5 l kimérése 1 l-es és 1 dl-es edénnyel (táblázat), zsúr: 8 dl + 6 dl + 6 dl = □ liter, „5 pohár vagy 6 pohár – ki ivott többet?”.
- **TK II/110:** melyik edénybe fér több (áttöltés), kancsó mérése bögrével, pohárral, csészével; mérőedény választása; igaz–hamis állítások (8 l és 50 dl, evőkanál 6 dl…).
- **MF II/70:** l vagy dl az adott edényhez, mérőedény leolvasása dl-ben, „□ l □ dl” pótlás rajz alapján.
- **MF II/71:** mérőedények színezése (5 dl, 11 dl, 1 l, 15 dl, 20 dl, 2 l), dl-es és l-es műveletsorok, címkék párosítása.
- **MF II/72:** 100 l-es hordó (kiöntött – maradt), 2 l gyümölcslé 3 dl-es poharakba, fél literes termosz 1 dl-es csészékbe.

Mértékegységek a könyvben: **l, dl**, valamint **fél liter** és „□ l □ dl” alak. Centiliter, milliliter nincs.

## Mit csinál a DiákZóna-lecke?
- Melyikbe fér több (sorrend, áttöltés), mérés pohárral és bögrével (kisebb egységből több kell).
- 1 l = 10 dl, fél liter = 5 dl, mikor l, mikor dl; a mérőedény leolvasása („1 l fölött még 3 vonás = 13 dl = 1 l 3 dl”).
- Számolás l-rel és dl-rel: összeadás, maradék, átváltás, „hány pohár lesz tele”.
- **Labor I – Töltsd meg dl-es pohárral!:** a cél dl-ben vagy „□ l □ dl” alakban; a gyerek 1 dl-es poharanként tölt (vissza is önthet), az edény 2 l-ig beosztott. Ha az 1 l-t 1 pohárnak veszi, külön visszajelzést kap.
- **Labor II – Olvasd le a mérőedényt!:** véletlen vízszint 1–20 dl között, a gyerek a dl-gombok közül választ; tipikus hibák (az 1 l alatti 10 dl kihagyása, ±1 vonás) külön visszajelzést kapnak.

## Fájlok
- `CapacityG2Parts.tsx` – `JugPart`, `CupPart`, `MugPart`, `BucketPart`, `BottlePart`, `SpoonPart`, `lDl`, laborok (`PourLab`, `ReadJugLab`)
- `CapacityG2Figures.tsx` – `ContainersSvg`, `PourCompareSvg`, `CupCountSvg`, `LiterDlSvg`, `JugScaleSvg`
- `CapacityG2CardFigures.tsx` – `JugsCard`, `LitreCupsCard`, `CupsCard`
- `CapacityG2Theory.tsx`, `CapacityG2Quiz.tsx` (30 kérdés, 21 ábrával, `g2-meres-urtartalom-quiz`), `CapacityG2Matcher.tsx` (`g2-meres-urtartalom-matcher`), `CapacityG2Sorter.tsx` (`g2-meres-urtartalom-sorter`)
- Teszt: `src/test/grade2Topic8CapacityG2.test.tsx`

## Eltérések a tankönyvtől
- **MF II/71/3 címkék nem egyértelműek:** az öt üveghez/dobozhoz (2, 3, 5, 7, 10 dl) több hozzárendelés is elfogadható, a rajzok mérete nem dönti el. Nálunk minden párosításnak egy jó megoldása van (számolható vonások, poharak).
- **MF II/72/2 „Hány poharat tudunk megtölteni?”** (2 l, 3 dl-es poharak): 6 teli pohár és 2 dl marad – a kérdés nem mondja meg, a maradék számít-e. Nálunk „hány pohár lesz tele”, és a magyarázat kimondja a maradékot.
- **TK II/110/4 állítás** („Egyszerre le tudok nyelni 1 liter vizet.”) nem dönthető el egyértelműen; nálunk csak egyértelműen igaz/hamis mondatok vannak.
- **Csak l és dl** (és fél liter); a régi README centilitere (cl, 1 l = 100 cl) a 2. osztályos könyvben nincs, kihagytuk.
- **Kézi kísérletek** (vízzel töltögetés, üvegek vízszintje) helyett képernyős töltő- és leolvasólabor; a valódi töltögetést a tanári órára hagyjuk.
- **Szorzás csak kis számokkal** (4 · 2 dl), mert a fejezet a szorzótáblák után jön.
- **Munkafüzet-oldalak:** az űrtartalom az MF II/70–72. oldalon van (a lessons.json 71–73-at írt; a 73. a Megálló).
- Saját nevek, számok, helyzetek (a könyv zsúros és poharas feladatának ötlete saját számokkal).

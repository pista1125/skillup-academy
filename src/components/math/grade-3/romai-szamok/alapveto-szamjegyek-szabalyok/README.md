# 1. A római számjegyek és alapszabályok (II. A római számok)

## Források
- Tankönyv: OH-MAT03TA, 26. oldal („A római számok”, 1. feladat).
- Munkafüzet I.: OH-MAT03MA_I, 28. oldal (2–3. feladat: írás római számmal, párosítás).

## Mit tartalmaznak az oldalak?
- **TK 26/1. a):** a 2. évfolyamon tanult római számok ismétlése (I–XX), „milyen jelekre van szükség?” (I, V, X).
- **TK 26/1. b–c):** „Figyeljétek meg, hány azonos jel kerülhet egymás mellé!”, majd 21–30 táblázat (XXI…XXX) megfigyelésre.
- **TK 26/1. d):** római számok kirakása 3, 4, 5, 7 számolópálcikából.
- **MF I/28/2–3.:** arab számok átírása rómaira (13–35), arab–római párok színezése (14–37).
- A könyv és a munkafüzet csak az **I, V, X** jelet használja, legfeljebb **XXXIX**-ig.

## A DiákZóna lecke
- Az öt jel (I, V, X, L, C) kőtáblákon, minden jel saját színnel (a színek a teljes fejezetben azonosak).
- Érdekesség: „két V-ből lesz az X” (5 + 5 = 10) – emlékeztető a jelek értékéhez.
- **Három kimondott szabály**, mindegyik saját ábrával: 1) kisebb jel jobbra → hozzáadjuk (VI, XV, LX); 2) kisebb jel balra → elvesszük, csak IV, IX, XL, XC; 3) legfeljebb 3 egyforma jel, a V és az L nem ismétlődik.
- Mintapélda: XXIV jelenként (+10, +10, −1, +5), táblázat saját számokkal (XII, XVII, XIX, XXXV, LV, XC).
- Csapdák: 9 ≠ VIIII / VIV, 5 ≠ VX.
- **Labor I – Jelkirakó:** I/V/X/L/C gombokkal kell kirakni egy célszámot. Minden jel alatt látszik, hozzáadjuk-e (+) vagy elvesszük (−); a program megmondja, mi a hiba (4 egyforma jel, VV, rossz elvevés, pl. IL/IC/VX), vagy hogy kevesebb/több a kirakott szám. „Új feladat”: véletlen célszám (főleg 1–39, néha 40–100 kerek számai és L-es számok).
- **Labor II – Hozzáadjuk vagy elvesszük?** Két jelből álló szám (VI, IV, XL, XC, LV, XX…): 1. lépés a művelet kiválasztása, 2. lépés az érték; a visszajelzés a konkrét hibára utal (pl. „ez az összeadás lenne”).
- A lecke nem foglalkozik órával, fejezetszámokkal, pálcikás fejtörőkkel – ezek a 3. lecke témái.

## Komponensek
- `RomanBasicsG3Utils.ts`: `toRoman`, `romanValue`, `signOps`, `romanProblem` (hibakereső), `SIGN_COLOR`, `SIGN_VALUE`
- `RomanBasicsG3Figures.tsx`: `RomanSignsSvg`, `RomanOriginSvg`, `AddRuleSvg`, `SubtractRuleSvg`, `ThreeRuleSvg`, `WorkedXXIVSvg`
- `RomanBasicsG3Theory.tsx`: `RomanBasicsG3Theory`
- `RomanBasicsG3Quiz.tsx`: `RomanBasicsG3Quiz`, `ROMAN_BASICS_G3_QUESTIONS` (30 kérdés, 10/10/10, 21 ábrával) – `g3-rom-alapok-quiz`
- `RomanBasicsG3Matcher.tsx`: `RomanBasicsG3Matcher` (3 × 8 pár) – `g3-rom-alapok-matcher`
- `RomanBasicsG3Sorter.tsx`: `RomanBasicsG3Sorter` (3 szint × 3 kategória × 9 elem) – `g3-rom-alapok-sorter`

## Teszt
`src/test/grade3Topic2RomanBasicsG3.test.tsx` (a segédfüggvényeket 1–100 között és hibás alakokra is ellenőrzi)

## Eltérések a tankönyvtől
- **L és C jel:** a tankönyv (TK 26–27.) és a munkafüzet (MF I/28–29.) csak az I, V, X jelet használja XXXIX-ig. A DiákZóna fejezete a 100-as számkörhöz igazodik, ezért az L (50) és a C (100) is szerepel. Az első leckében csak röviden, kis példákkal (L, LX, XL, XC, LV), a súlypont az I, V, X marad.
- **A szabályokat a könyv nem mondja ki.** A TK 26/1. b–c) csak megfigyeltet („Figyeljétek meg…”, „Mit tapasztaltatok?”), az elvevés szabálya és az, hogy melyik jel állhat elvevőként, sehol nincs leírva. Nálunk három szabály van saját ábrával, szabálydobozzal, csapdákkal és puskával.
- **A V nem ismétlődik és nem vonható el:** a könyvben ez nem szerepel, pedig tipikus hiba (VV, VX). Nálunk külön szabály és hibakereső kérdések szólnak róla.
- **Nincs nulla:** a könyv nem említi, hogy a római számírásban nincs jel a nullára. Mi kimondjuk.
- **TK 26/1. d) kétértelmű:** „Melyik római számokat tudod kirakni 3 (4, 5, 7) számolópálcikából?” – nem derül ki, hogy minden pálcikát fel kell-e használni, és hogy a V és az X két pálcikából áll. Ezt a feladattípust nem vettük át. (A pálcikás fejtörők amúgy is a 3. lecke témái.)
- **Didaktikai változtatás:** a jelek mindenhol ugyanolyan színűek, és a Jelkirakó minden jel alá kiírja, hogy hozzáadjuk vagy elvesszük. Így a gyerek *látja* a szabályt, mielőtt kimondaná.
- Saját feladatok és helyzetek (kőtáblák, katonák pajzsa, amforák, betűkártyák); a könyv szereplői és feladatszövegei nem szerepelnek.

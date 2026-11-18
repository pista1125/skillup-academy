# 1. A hosszúság mérése (2. osztály, VIII. Mérések)

## Források
- Tankönyv I. kötet (`OH-MAT02TA_I.pdf`), 122–123. o. – „Hogyan mértek régen?”
- Tankönyv II. kötet (`OH-MAT02TA_II.pdf`), 101–105. o. – „Mérések” nyitóoldal, „A hosszúság mérése”
- Munkafüzet II. kötet (`OH-MAT02MA_II.pdf`), 63–65. o. (a 66. oldal már „A tömeg mérése”)

## Mit tartalmaznak a könyvoldalak?
- **TK I/122–123:** régi mértékegységek (arasz, kis- és nagyarasz, láb, hüvelyk, öl, lépés), becslés – mérés – eltérés táblázat, testméretek különbözősége, mértékegység választása rajzokhoz.
- **TK II/101:** mit lehet megmérni (tömeg, hosszúság, űrtartalom), összehasonlítás fonallal.
- **TK II/102:** mérés színes rudakkal (egységgel), ugyanaz a ceruza különböző rudakkal → más mérőszám.
- **TK II/103:** mérőeszközök (colstok, mérőszalag, szabó-mérőszalag, vonalzó); **1 m = 10 dm, 1 dm = 10 cm, 1 m = 100 cm**; saját arasz, lépés stb. becslése és mérése cm-ben.
- **TK II/104–105:** vonalak becslése és mérése fonallal, „□ cm = □ dm □ cm”, ceruzák mérése, 50 cm-es cérna becslése, adott hosszúság (1 dm 5 cm, 8 cm, 1 dm 3 cm) kijelölése, távolság mérőszalagtól.
- **MF II/63–65:** mit mérünk méterrel, 1 m / 1 dm / 1 cm a kézzel, magasságok becslése, 1 dm-nél rövidebb tárgyak, pad és tábla mérése „□ m □ dm”-ben, füzet és tolltartó mérése, csigaverseny 1 dm-es pályán.

Mértékegységek a könyvben: **cm, dm, m** (vegyesen „dm cm” és „m dm”). Milliméter, km nincs.

## Mit csinál a DiákZóna-lecke?
- Régi mértékegységek saját ábrával, és a tanulság: mindenkinél más az arasz → kell egy közös egység.
- Egységgel mérés (kis kocka és 2 cm-es rúd): nagyobb egységből kevesebb kell.
- cm, dm, m kapcsolata ábrával és táblázattal; „mutasd meg a kezeddel”.
- Mérőeszközök, mérés vonalzóval 3 lépésben (0 az elején!), nem a 0-tól mérés kivonással.
- Becslés – mérés – eltérés.
- **Labor I – Mérj vonalzóval!:** véletlen hosszú csík, a vonalzó balra-jobbra tolható; ha a gyerek a csík végét olvassa le, a visszajelzés megmondja, hogy nem a 0-nál kezdődik.
- **Labor II – Rakd ki dm-rel és cm-rel!:** adott hossz (11–99 cm vagy 100 cm) kirakása deciméteres rudakkal és centiméteres kockákkal; 10 kockánál jelzi, hogy cserélni kell egy rúdra.

## Fájlok
- `LengthG2Parts.tsx` – közös SVG-elemek (`RulerPart`, `StripePart`, `PencilPart`, `CubeRowPart`, `DmRodPart`) és a két labor (`RulerLab`, `DmCmLab`)
- `LengthG2Figures.tsx` – `OldUnitsSvg`, `UnitRodsSvg`, `CmDmMSvg`, `LengthToolsSvg`, `RulerZeroSvg`
- `LengthG2CardFigures.tsx` – kártyaképek (`RulerCard`, `BodyUnitCard`, `RodCard`, `TrackCard`, `MeterBarCard`, `DmBarCard`)
- `LengthG2Theory.tsx`, `LengthG2Quiz.tsx` (30 kérdés, 20 ábrával, `g2-meres-hosszusag-quiz`), `LengthG2Matcher.tsx` (`g2-meres-hosszusag-matcher`), `LengthG2Sorter.tsx` (`g2-meres-hosszusag-sorter`)
- Teszt: `src/test/grade2Topic8LengthG2.test.tsx`

## Eltérések a tankönyvtől
- **0 a vonalzón:** az MF II/64/1 vonalzóképén nincs kiírva a 0 (a skála „1 cm”-rel indul), pedig épp a 0-tól mérést tanítjuk. Nálunk minden vonalzón ott a 0; a törött vonalzós feladatnál kimondjuk, hogy nincs rajta 0.
- **Régi mértékegységek összehasonlítása:** a TK I/123/4 („10 nagyarasz □ 1 láb”, „4 hüvelyk □ 2 arasz”) csak feltételezett testméretekkel dönthető el, és személyenként más. Nálunk csak egyértelmű kérdés van: ki mért több arasszal → kinek nagyobb az arasza.
- **Szótagrejtvény (TK II/105/3) kihagyva:** a szótagok között „gramm” is van, ez 2. osztályban nem tanult mértékegység; a mérőszalag-rajzon a távolság sem mérhető le pontosan képernyőn.
- **Nem a 0-tól mérés:** a könyv csak gyakoroltatja; nálunk kimondott szabály („vég − eleje”), külön csapda és labor-visszajelzés.
- **Csak „dm cm” és „m dm” vegyes alak** (mint a könyvben); „m cm” alakot nem használunk, minden szám 100-on belül van.
- **Kézzel végzett mérések** (pad, terem, cérna, fonal) helyett képernyőn mérhető csíkok, rudak, vonalzó; a valós mérést a tanári órára hagyjuk.
- **Munkafüzet-oldalak:** a hosszúság a MF II/63–65. oldalon van; a 66. oldal már a tömeg mérése (a lessons.json 63–66-ot írt).
- Saját nevek, számok, helyzetek; a régi chapter-README dkg-ját és cl-jét nem használjuk (a könyv nem tanítja).

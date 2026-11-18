# 1. Számok 100-ig

## Források
- *Matematika 2. – tankönyv I. kötet* (`OH-MAT02TA_I.pdf`) 48–53. o.: Kitekintés 100-ig – tízesével csoportosítás (gyümölcsök, dió, babszem-tasakok, tallérok, pálcikacsomagok), 10 Ft-osok 10-től 100-ig, perselyek összehasonlítása, számegyenes tízesével, tízes szomszédok, a 0–99-es számtábla lépegetéssel, helyiérték-táblázat (tízes | egyes), golyós számoló (kék = 10, sárga = 1).
- *Tankönyv II. kötet* (`OH-MAT02TA_II.pdf`) 14–15., 38–39., 56., 72., 88–100. o.: Számok 0–60, 0–70, 0–80, 0–90, 0–100 – letakart számok a táblában, tízesek/egyesek táblázat, páros–páratlan nyitott mondatok, számjegykártyákból kétjegyű számok, „melyik számra gondoltam”, nyilas számegyenes, összekötős pontrajz, vonatos páros/páratlan válogatás, bélyeges 41–100-as tábla, számszomszédok, sorozatok.
- *Munkafüzet I. kötet* (`OH-MAT02MA_I.pdf`) 30–34. o.: ceruzacsomagok, labdák számlálása tízesével, rudak a számegyenesen, becslés és számolás, tojástartók, peták (10 és 1), pénztárcák, perselyek, 100 Ft többféleképpen.
- *Munkafüzet II. kötet* (`OH-MAT02MA_II.pdf`) 12–13., 24–25., 36–37., 44., 52–55. o.: kiradírozott számok a táblában, páros/páratlan szomszédok, állatok a táblában, „t + e” bontások, nyitott mondatok, vakondtúrásos tábla, relációk, számegyenesre kötés, sajtos sorrend, sorozatok, súlyzók, egyes/tízes/páros szomszéd, golyós számoló, perselyek, számkártyás kirakások.

## A DiákZóna-lecke
- **Tízesével 100-ig**: 10 rúd = 10 tízes = 100; kerek tízesek.
- **Tízesek és egyesek**: rúd + kocka ábra, helyiérték-táblázat, bontás (`63 = 60 + 3`), csere: 10 egyes = 1 tízes (`5 tízes + 13 egyes = 63`).
- **Számszomszédok**: egyes szomszéd, tízes szomszéd, kerek tízes tízes szomszédai (`60 < 70 < 80`), páros/páratlan az utolsó számjegy alapján.
- **Százas tábla (1–100)**: jobbra +1, balra −1, lefelé +10, felfelé −10.
- **Összehasonlítás**: előbb a tízesek, aztán az egyesek; számegyenes.
- **Pénz**: 10, 20, 50 Ft-os érmék 100 Ft-ig.
- **2 interaktív labor**:
  1. *Rakd ki rudakkal!* – véletlen szám 51–100 között; rúd/kocka ± gombok, „10 kocka → 1 rúd” csere, célzott visszajelzés (rossz tízes / rossz egyes / be nem váltott 10 kocka).
  2. *Lépegess a százas táblán!* – kezdő szám + irány + lépésszám, koppintás a célmezőre; hiba esetén a szabály (sor/oszlop, ±1/±10).

## Fájlok és teszt
- `Numbers100G2Parts.tsx` – közös SVG-elemek a III. témakörhöz (`RodsPart`, `NumberLinePart`, `HundredChartPart`, `CoinPart`, `PlaceTablePart`) és a két labor (`RodBuilderLab`, `ChartWalkLab`)
- `Numbers100G2Figures.tsx` – tananyag-ábrák (`TensToHundredSvg`, `PlaceValueSvg`, `NeighboursSvg`, `HundredChartSvg`, `CompareSvg`, `CoinsSvg`)
- `Numbers100G2CardFigures.tsx` – kártyaképek (`RodsCard150`, `RodsCard80`, `LineCard150`, `ChartCard`, `CoinCard150`)
- `Numbers100G2Theory.tsx` – tananyag
- `Numbers100G2Quiz.tsx` – 30 kérdés (`g2-c100-szamok-quiz`), ebből 21 ábrával
- `Numbers100G2Matcher.tsx` – 3 × 8 pár (`g2-c100-szamok-matcher`)
- `Numbers100G2Sorter.tsx` – 3 × 3 × 9 elem (`g2-c100-szamok-sorter`)
- Teszt: `src/test/grade2Topic3Numbers100G2.test.tsx`

## Eltérések a tankönyvtől
- **Egy leckében a teljes 100-as számkör.** A tankönyv spirálisan, 10-esével bővít (0–60, 0–70, 0–80, 0–90, 0–100), közben szorzótáblákkal. A DiákZóna egy leckébe gyűjti a számfogalmat 100-ig, szorzás nélkül (pl. a TK II/56. o. „a 4 többszörösei” feladatát nem vesszük át, mert ez a fejezet csak + és − műveletet használ).
- **Egységes százas tábla.** A TK I/50. o. 0–99-es táblát használ (a 0 a bal felső sarokban), a TK II/91. o. és az MF II/52. o. viszont 1–100-as elrendezést. A DiákZóna mindenhol az **1–100-as** táblát használja (minden sor kerek tízessel végződik), hogy a „lefelé +10” szabály mindig ugyanúgy nézzen ki.
- **Nincs kerekítés és nincs százas helyi érték.** A korábbi, cím alapján írt leírás kerekítést és „SZ, T, E” táblázatot említett. A 2. osztályos könyv ezt nem tanítja: csak tízes és egyes van, a 100 = 10 tízes. Kerekítés helyett a **tízes szomszédokat** gyakoroljuk.
- **„Páros/páratlan szomszéd” helyett egyértelmű fogalmak.** Az MF II/13. és 53. o., valamint a TK II/39/4. („páratlan számszomszédja a 65”) nincs pontosan definiálva: páros számnál a „páros szomszéd” 2-vel arrébb van (52 < 54 < 56), páratlannál 1-gyel (46 < 47 < 48), és a 39/4. feladatnak több jó megoldása is lehet. A DiákZóna csak az egyes és a tízes szomszédot használja, a párosságot pedig az utolsó számjegyről dönteti el.
- **Egy kártya = egy megoldás.** A TK II/72/2. feladatban két kártya ugyanarra a pontra mutat (8 tízes + 5 egyes és 15 egyes + 7 tízes is 85), és a fejezet címe „0-tól 90-ig”, a számegyenes mégis 100-ig tart. A Párosítóban minden kártyának pontosan egy párja van.
- **Kiírt szavak a rövidítések helyett.** A könyv „8 t + 3 e” rövidítést is használ; a 7–8 évesek miatt mindenhol kiírjuk: *tízes*, *egyes*.
- **Saját feladatok és szereplők.** A könyv szereplőit (Vakond Vili, Hangya Hanna, Máté, Lili, Dávid stb.) és képeit nem vesszük át; saját számok, rúd-kocka, pénz- és táblaábrák szerepelnek. A papíron statikus kirakást és lépegetést két élő labor váltja ki azonnali visszajelzéssel.

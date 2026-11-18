# 1. Szorzás 2-vel

## Források
- Tankönyv I. kötet (`OH-MAT02TA_I.pdf`): 24–27. o. *A szorzás előkészítése*, 28–31. o. *A szorzás*, 40–42. o. *Szorzás, osztás 2-vel* (43. o. Megálló).
- Munkafüzet I. kötet (`OH-MAT02MA_I.pdf`): 16–17. o. *A szorzás előkészítése*, 18–20. o. *A szorzás*, 24–27. o. *Szorzás, osztás 2-vel*.

## Mit tartalmaznak a könyvoldalak?
- **Előkészítés (TK 24–27, MF 16–17):** egyenlő tagú összeadás képekről (zacskók, kosarak), korongok csoportosítása kettesével/négyesével/ötösével, kettesével növekvő sorozat, lépegetés a számegyenesen, rajzolás műveletek alapján.
- **A szorzás (TK 28–31, MF 18–20):** „10 csomag, mindegyikben 2 uborka: 2 + 2 + … = 20. Így is mondhatjuk: 10-szer 2 = 20. Rövidebben: 10 · 2 = 20.” Az első tényező a csoportok száma, a második a csoport nagysága. Elnevezések: **tényezők**, **szorzat**. Sorok-oszlopok (2 · 4 és 4 · 2 ugyanarról a képről), **a tényezők felcserélhetők**.
- **2-es szorzótábla (TK 40–42, MF 24–27):** zoknipárok, rollerkerekek táblázata `0 · 2`-től `10 · 2`-ig, mérleghinta-táblázat, „kétszerese / fele” nyíldiagram, borsóhüvely-szorzatok, szorzókorong.

## A DiákZóna lecke
- **Tananyag:** egyenlő csoportok (zacskók) → egyenlő tagú összeadás → `3 · 2` jele és olvasata („háromszor kettő”), tényezők/szorzat; rácspontok sorokban és oszlopokban, felcserélhetőség; a 2-es szorzótábla táblázatban és a számegyenesen; kétszerese; 3 mintapélda (biciklik, zoknipárok, hiányzó tényező); „Vigyázz!” (`4 · 2` ≠ `4 + 2`, `0 · 2 = 0`).
- **Labor I – Zacskó-töltő:** a gyerek zacskókat tesz le (mindegyikben 2 golyó), amíg `n · 2` ki nem rakódik, majd kiválasztja a szorzatot. Célzott tippek (első/második tényező összekeverése, `n + 2` hiba). „Új feladat” gomb.
- **Labor II – Kettes ugrások:** két feladattípus véletlenszerűen: `n · 2 = ?` (ugrálj, hol álltál meg?) és `□ · 2 = N` (hányat kell ugrani?).
- **Kvíz:** 30 kérdés (10/szint), 19 kérdésábra. **Párosító:** 3 × 8 pár, **Csoportosító:** 3 × 3 × 9 elem, szintenként ≥ 4 kártyaábra.
- Számkör: ≤ 20; csak `+`, `−`, `·`.

## Fájlok
- `Mult2G2Parts.tsx` — közös SVG-elemek (`BagsPart`, `ArrayPart`, `JumpLinePart`, `BikePart`, `SockPairPart`) és a két labor (`BagsLab`, `JumpLab`)
- `Mult2G2Figures.tsx` — `EqualGroupsSvg`, `MultSignSvg`, `ArrayCommuteSvg`, `TwoTableLineSvg`, `BikesDoubleSvg`, `DoubleSvg`
- `Mult2G2CardFigures.tsx` — `BagsCard`, `ArrayCard`, `JumpsCard`, `SocksCard`, `PodCard`
- `Mult2G2Theory.tsx`, `Mult2G2Quiz.tsx` (`g2-szorzas-2-quiz`), `Mult2G2Matcher.tsx` (`g2-szorzas-2-matcher`), `Mult2G2Sorter.tsx` (`g2-szorzas-2-sorter`)
- Teszt: `src/test/grade2Topic4Mult2G2.test.tsx`

## Eltérések a tankönyvtől
- **Saját feladatok és szereplők:** a könyv szereplői (Manó, Mona, Lili, Bendegúz, Éva és Réka stb.) és történetei helyett saját helyzetek (zacskók, biciklik, padok, hinták, zoknik a szárítón) és saját nevek.
- **Csak a 2-es tábla:** a könyv a 2-vel való szorzás előtt (TK 25–31) már 3-mal, 4-gyel, 5-tel csoportosít és szoroz (pl. `5 · 4 = 20`, `3 · 4`), a Megálló (TK 43/4b) pedig `· 4`-et kér. A DiákZóna első szorzásleckéje csak a 2-es szorzótáblát használja (a felcserélhetőségnél `2 · 5 = 5 · 2` formában), a többi tábla a saját leckéjében jön.
- **Osztás külön leckében:** a könyv a 2-es szorzást és osztást együtt tanítja (TK 40–42, MF 24–27). Itt a IV. fejezet szabálya szerint csak `+`, `−`, `·` szerepel; az osztás a V. fejezet „Osztás 2-vel” leckéjébe került. A „hány hinta kell 14 gyereknek?” típusú kérdést hiányzó tényezőként (`□ · 2 = 14`) kezeljük.
- **Rácspontok mindig 2 sorban:** a könyv rácsai (TK 29/3) 3 oszloposak, ahol a kettes csoportok csak függőlegesen olvashatók ki. Nálunk a rácspontok 2 sorban állnak, így a sorok (`2 · 5`) és az oszlopok (`5 · 2`) is közvetlenül láthatók.
- **Olvasat kiemelése:** a könyv a „10-szer 2” formát használja; mi a teljes szóbeli olvasatot is megadjuk („háromszor kettő”), és következetesen az első tényező a „hányszor”, a második a „mennyit”, ahogy a könyv is (TK 28, 31).
- **Interaktivitás:** a papíron rajzolós feladatok (TK 26/1, MF 17) helyett zacskó-töltő és számegyenes-ugráló labor ad azonnali visszajelzést.

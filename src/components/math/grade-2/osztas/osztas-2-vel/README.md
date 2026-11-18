# 1. Osztás 2-vel

## Források
- Tankönyv I. kötet (`OH-MAT02TA_I.pdf`): 32–35. o. *Az osztás előkészítése*, 36–38. o. *Az osztás*, 39. o. *A maradékos osztás előkészítése*, 40–42. o. *Szorzás, osztás 2-vel* (43. o. Megálló).
- Munkafüzet I. kötet (`OH-MAT02MA_I.pdf`): 21. o. *Az osztás előkészítése*, 22–23. o. *Az osztás*, 24–27. o. *Szorzás, osztás 2-vel*.

## Mit tartalmaznak a könyvoldalak?
- **Előkészítés (TK 32–35, MF 21):** csomagolás négyesével/kettesével/ötösével („Ennyi csomagom lett”), szétosztás polcokra, tányérokra, tálcákra („Mindegyikre ugyanannyi jusson”), azonos képek = azonos számok (`18 = ● + ●`), egyenlő részekre színezés.
- **Az osztás (TK 36–38, MF 22–23):** rudak („háromszor olyan hosszú”, „harmada”, „kétszer”, „fele”). **Bennfoglalás:** „12-ben a 4 megvan 3-szor, mert 4 + 4 + 4 = 12. 12 osztva 4-gyel egyenlő 3. Így írjuk: 12 : 4 = 3.” **Egyenlő részekre osztás:** „12 negyedrésze 3, mert 4 · 3 = 12.” Mindkettő neve: **osztás**. Ellenőrzés: `16 : 4 = □, mert □ · 4 = 16`.
- **Maradékos osztás előkészítése (TK 39):** diók két gyereknek, tornyok kockákból — „Ennyi maradt”; a kimaradó elemek száma a **maradék**. (A maradékos osztás írásmódja csak a „Maradékos osztás 3-mal” leckében jelenik meg, TK 83.)
- **Osztás 2-vel (TK 40–42, MF 24–27):** rollerkerék-táblázat `0 : 2`-től `20 : 2`-ig, „fele / kétszerese” nyíldiagram, osztókorong, zokni- és cipőpárok, csomagolás kettesével.

## A DiákZóna lecke
- **Tananyag:** csomagolás kettesével (bennfoglalás, „a 10-ben a 2 megvan 5-ször”), szétosztás 2 egyenlő részre („a 8 fele 4”), a `:` jel és olvasata („12 osztva 2-vel egyenlő 6”), ellenőrzés szorzással, szorzás–osztás párok táblázata, fele/kétszerese, „Marad-e valami?” (páros/páratlan, maradék), 3 mintapélda, „Vigyázz!” (`12 : 2` ≠ `12 − 2`; 2-es csomagolásnál legfeljebb 1 maradhat).
- **Labor I – Szétosztás két tányérra:** a gyerek „1-1 sütit” tesz a két tányérra (kerekasztal-módszer), amíg lehet, majd megadja, mennyi jutott egy tányérra és mennyi maradt (0 vagy 1). Páros és páratlan feladatok vegyesen, „Új feladat”.
- **Labor II – Csomagolj kettesével!:** kettes kereteket rak a korongok köré, majd megadja a csomagok számát; páratlan számnál megmutatja a maradékot.
- **Kvíz:** 30 kérdés (10/szint), 19 kérdésábra. **Párosító:** 3 × 8 pár, **Csoportosító:** 3 × 3 × 9 elem, szintenként ≥ 4 kártyaábra.
- Számkör: ≤ 20; `+`, `−`, `·`, `:`.

## Fájlok
- `Div2G2Parts.tsx` — közös SVG-elemek (`DotsPart`, `PlatePart`, `DivArrayPart`, `HalfDoublePart`) és a két labor (`ShareLab`, `PackLab`)
- `Div2G2Figures.tsx` — `PackingSvg`, `SharingSvg`, `DivSignSvg`, `MultDivLinkSvg`, `HalfDoubleSvg`, `RemainderSvg`
- `Div2G2CardFigures.tsx` — `PackCard`, `ShareCard`, `HalfCard`
- `Div2G2Theory.tsx`, `Div2G2Quiz.tsx` (`g2-osztas-2-quiz`), `Div2G2Matcher.tsx` (`g2-osztas-2-matcher`), `Div2G2Sorter.tsx` (`g2-osztas-2-sorter`)
- Teszt: `src/test/grade2Topic5Div2G2.test.tsx`

## Eltérések a tankönyvtől
- **Számkör és tábla:** a TK 38. oldal mintapéldája `27 : 3 = 9` — ez túllépi a 20-as számkört, és a 3-as tábla itt még nem ismert. A DiákZóna minden példája a 2-vel való osztásból, 20-on belül van (`12 : 2 = 6`).
- **Csak 2-vel osztunk:** a könyv az osztás bevezetésénél 3-mal, 4-gyel, 5-tel, 8-cal is oszt (TK 32–38, MF 22–23). Mi a fogalmakat (bennfoglalás, részekre osztás, ellenőrzés szorzással) a 2-vel mutatjuk be; a többi osztó a saját leckéjében jön.
- **Maradék írásmód nélkül:** a könyv 2-vel nem tanít külön maradékos osztást, csak előkészíti (TK 39). Ezért nálunk sincs maradékos jelölés, csak szóban: „4 csomag, 1 marad”, „5 jut, 1 marad” — ugyanúgy, ahogy a könyv („Ennyi csoport / Ennyi maradt”).
- **Saját feladatok és szereplők:** a könyv szereplői és történetei (Kata, Laci, Dani, Bendegúz, Babszem Jankó stb.) helyett saját helyzetek (sütik tányéron, kesztyűpárok, csónakok, tolltartók) és saját nevek.
- **Kevesebb olvasás:** a könyv rúdösszehasonlítását („háromszor olyan hosszú”, „harmada”) kihagytuk; a „fele” fogalmát a fele/kétszerese nyíldiagram és a két tányér mutatja.
- **Interaktivitás:** a nyilazós szétosztás (TK 34/3, 37/3) helyett élő szétosztó és csomagoló labor ad azonnali visszajelzést, a gyerek tipikus hibáját megnevezve (pl. az összeset adja meg, vagy kivon a hányados helyett).

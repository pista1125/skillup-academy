# 5. Szorzás 6-tal

## Források
- Tankönyv II. kötet (`OH-MAT02TA_II.pdf`, PDF-oldal = nyomtatott + 2): 23–25. o. *Szorzás, osztás 6-tal*, 26–27. o. *A 2-es, 3-as, 6-os szorzótáblák kapcsolata* (28. o. szöveges feladatok).
- Munkafüzet II. kötet (`OH-MAT02MA_II.pdf`): 19–21. o. *Szorzás, osztás 6-tal*.

## Mit tartalmaznak a könyvoldalak?
- **TK 23:** 6 hosszú rudak egymás után a mérőszalagon, mozdony logikai lapokból (6 lap), békaugrás hatosával a 0–60-as levélspirálon.
- **TK 24:** ceruzás dobozok (6 db) — táblázat `0 · 6`-tól `10 · 6`-ig ismételt összeadással, mellette a bennfoglalás (`12 : 6`); matricaalbum-táblázat.
- **TK 25:** 6 szakkörösnek vett eszközök (`6 · 10`, `6 · 6`, `6 · 3` …), hiányzó számok (`□ · 6 = 18`, `□ : 6 = 7`), „hatszorosa / hatoda” nyíldiagramok.
- **TK 26–27:** bolha (2), béka (3), szöcske (6) ugrásai a 0–30 számegyenesen, „Ezek a számok a □ többszörösei”, közös többszörösök; rovarlábak (`2 · 6`, `3 · 6`, `6 · 6`); rudak mérlegen; „házak” `· 2`, `· 3`, `· 6` szabállyal; láncnyilak `· 2` majd `· 3` = `· 6` (és `: 3` majd `: 2` = `: 6`).
- **MF 19–21:** színezett téglalapokról szorzás, kép–művelet párosítás, `6 · 6`, `6 · 3`, `6 · 2` párhuzamos oszlopok, a 6 többszöröseinek színezése, hiányzó tényezők, árak összehasonlítása (`9 · 6 Ft`), helyes szorzat kiválasztása, összehasonlítás (`6 · 6 □ 50 − 16`).

## A DiákZóna lecke
- **Tananyag:** tojásdobozok (6-6 tojás) → `6 + 6 + 6 + 6` → `4 · 6` („négyszer hat”); hatos ugrások 0–60, a 6 többszörösei; a 6-os szorzótábla („mindig 6-tal több”); **a 2-es, 3-as és 6-os tábla kapcsolata**: 1–30 tábla a 2 és a 3 többszöröseivel (közös = a 6 többszörösei), kék-piros tojásos doboz (`4 · 3 + 4 · 3 = 4 · 6`), duplázó táblázat, láncnyíl (`· 3`, majd `· 2` = `· 6`); felcserélés rácspontokkal, „hatszorosa”; 3 mintapélda (méhecskék lábai, duplázás `8 · 6`, hiányzó tényező `□ · 6 = 42`); Vigyázz! (`7 · 6 ≠ 7 + 6`, duplázás ≠ „+ 3”).
- **Labor I – Tojásdoboz-töltő:** dobozok hozzáadása/elvétele, amíg `n · 6` ki nem rakódik, majd a szorzat kiválasztása; célzott tippek (tényezők összekeverése, `n + 6`). „Új feladat”.
- **Labor II – Duplázó:** két lépés: először `n · 3` (kék tojások), aztán `n · 6` (az összes); tipp, ha a gyerek csak 3-at ad hozzá a duplázás helyett.
- **Kvíz:** 30 kérdés (10/szint), 22 kérdésábra. **Párosító:** 3 × 8 pár, **Csoportosító:** 3 × 3 × 9 elem, szintenként ≥ 4 kártyaábra.
- Számkör: ≤ 60; csak `+`, `−`, `·`.

## Fájlok
- `Mult6G2Parts.tsx` — közös SVG-elemek (`EggBoxPart`, `EggBoxesPart`, `DicePart`, `ArrayPart`, `BeePart`, `JumpLinePart`, `ChainPart`) és a két labor (`EggBoxLab`, `DoubleLab`)
- `Mult6G2Figures.tsx` — `EggBoxesSvg`, `SixJumpsSvg`, `TablesLinkSvg`, `DoubleThreeSvg`, `ChainSvg`, `Array6Svg`
- `Mult6G2CardFigures.tsx` — `BoxesCard`, `DiceCard`, `JumpsCard`, `ArrayCard`, `ChainCard`, `ProductCard`
- `Mult6G2Theory.tsx`, `Mult6G2Quiz.tsx` (`g2-szorzas-6-quiz`), `Mult6G2Matcher.tsx` (`g2-szorzas-6-matcher`), `Mult6G2Sorter.tsx` (`g2-szorzas-6-sorter`)
- Teszt: `src/test/grade2Topic4Mult6G2.test.tsx`

## Eltérések a tankönyvtől
- **Osztás külön leckében:** a könyv a 6-tal való szorzást és osztást együtt tanítja (TK 24 táblázat `: 6` oszlopa, TK 25/2 és 25/3 „hatoda”, TK 27/3 jobb oldali `: 3`, `: 2` láncai, MF 19–21 osztásai). A IV. fejezet szabálya szerint itt csak `+`, `−`, `·` szerepel; az osztás és a „hatoda” az *V. Osztás / 5. Osztás 6-tal* leckébe került.
- **Saját feladatok és szereplők:** a könyv szereplői (Bolha Benedek, Béka Brekeke, Szöcske Jenő, Éva néni, Sári, Máté, Peti stb.), ceruzás dobozai és matricaalbuma helyett tojásdobozok, dobókockák, méhecskék, székek és saját nevek.
- **Fizikai eszközök helyett képernyő:** a logikai lapos mozdony (TK 23/2), a mérőszalagra rakott rudak (TK 23/1) és a mérleges rúdösszehasonlítás (TK 27/1) eszközt igényel, ezeket kihagytuk; a kapcsolatot az 1–30 táblával és a kék-piros tojásos dobozzal mutatjuk meg.
- **Kapcsolat egy lépésben érthetően:** a könyv a `· 2`, majd `· 3` láncot csak kitöltetni hagyja („Mondd el, mit tapasztaltál!”). A DiákZóna kimondja a szabályt (a 6-os tábla a 3-as tábla kétszerese), táblázatban megmutatja, és a Duplázó laborban gyakoroltatja.
- **Más tábla nem keveredik bele:** a MF 20/2 és 21/1 feladatai `6 · 10`, `8 · 3`, `9 · 2` szorzatokat és 50 fölötti kivonásokat is kérnek; a kvízben a 6-os tábla mellett csak a duplázáshoz szükséges 3-as tábla szerepel.
- **Interaktivitás:** a papíron színezős ugrálás (TK 23/3, 26/1) helyett tojásdoboz-töltő és duplázó labor ad azonnali visszajelzést.

# 2. A különbség becslése (VIII. Írásbeli kivonás)

## Források
- Tankönyv (OH-MAT03TA) **88. o.**: 365 Ft − 245 Ft becslése százasra (400 − 200 = 200) és tízesre (370 − 250 = 120) kerekítve, „melyik becslés a pontosabb?”; 500 Ft-ból vásárlás becsléssel (olló 363, logikai lap 275, radír 74, ecset 97, pohár 59 Ft); buborékok és buborékfújók párosítása tízesre kerekített becsléssel.
- Munkafüzet II **5. o.**: százasra kerekítés táblázatban, becslés ceruzákon, becsült érték színezése a 0–500 sávon, mennyiségek (dkg, cm, dl) összehasonlítása és becslése kétféleképpen.

## A DiákZóna lecke
Kerekítés százasra (a tízeseket nézzük) és tízesre (az egyeseket nézzük) számegyenesen, a becslés lépései („előbb kerekíts, aztán vonj ki”), a két becslés összevetése a pontos értékkel (382 − 145: 300 / 230 / 237), becslés vásárláskor, a becslés mint ellenőrzés (ha messze van, számolj újra).

- **Labor I – Becslő gép:** három lépés (kisebbítendő kerekítése, kivonandó kerekítése, a becsült különbség), választható mód (százasra / tízesre). Célzott tippek (rossz kerekítési mód, rossz irány, a pontos eredményt adta meg becslés helyett). A végén megmutatja a pontos különbséget és azt, hogy melyik becslés lett volna pontosabb.
- **Labor II – Becslés-sáv:** a 0–500 dobozok közül kell kiválasztani a százasra becsült különbséget; utána számegyenesen látszik, hol van a pontos eredmény.

## Komponensek
`DiffEstimateG3Figures.tsx` (RoundHundredsSvg, RoundTensSvg, CompareEstimatesSvg, EstimateStripSvg, ShopEstimateSvg, EstimateCheckSvg), `DiffEstimateG3CardFigures.tsx` (MiniRound, MiniTwoTags, SortRound, SortCheck), `DiffEstimateG3Theory.tsx` (exportálja a `roundTo` segédfüggvényt is), `DiffEstimateG3Quiz.tsx` (`DIFF_ESTIMATE_G3_QUESTIONS`, 30 kérdés), `DiffEstimateG3Matcher.tsx`, `DiffEstimateG3Sorter.tsx`, `index.ts`. A közös rajzelemek: `../haromjegyu-szamok-kivonasa/ThreeDigitSubG3Parts.tsx`.
Teszt: `src/test/grade3Topic8DiffEstimateG3.test.tsx`. Aktivitás-azonosító: `g3-wsub-becsles`.

## Eltérések a tankönyvtől
- **Munkafüzet 5. o., 1. b):** a táblázatban a **247** szerepel, a ceruzán viszont **458 − 347** áll – a két adat ellentmond egymásnak (valószínűleg 458 − 247 akart lenni). Nálunk minden becslés pontosan azokkal a számokkal dolgozik, amelyeket előbb kerekítettünk.
- **Tankönyv 88. o., 2. e):** „három poharat” – a polcon nem egyértelmű, melyik árcédula a poháré (59 Ft vagy 97 Ft), és a feladat szorzást is kér (3 · 59) egy becslési leckében. Nálunk egy tárgy = egy ár, a kép és a szöveg mindig ugyanazt mutatja.
- **Tankönyv 91. o., 9. feladat** (a 3. leckéhez tartozik, de a becslésről szól): százasra kerekítve a 226 − 174 becslése 200 − 200 = **0**, a 265 − 183 és 353 − 271 becslése 100, holott a különbség 52 és 82. A könyv nem szól arról, hogy ilyenkor a százasra kerekítés használhatatlan. Nálunk külön kérdés mutatja meg (251 − 149 ≈ 200, pedig 102), és megtanítjuk, hogy a tízesre kerekített becslés általában pontosabb.
- A kerekítés szabályát (5-től, 50-től felfelé) számegyenesen, a középső jelöléssel újra megmutatjuk, mielőtt becslünk – a könyv ezt már tudottnak veszi.
- A becslést ellenőrzésként is használjuk („jó lehet az eredmény?”), a 3. lecke előkészítéseként.
- Saját számok, saját helyzetek (szalag cm-ben, kifli, tornaterem, könyv oldalai); a könyv szereplőit nem használjuk.

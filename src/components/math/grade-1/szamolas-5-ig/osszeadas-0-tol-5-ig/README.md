# 7. Összeadás 0-tól 5-ig (1. osztály – II. Számolás 0-tól 5-ig)

**Források:** OH-MAT01TA_I 58–61. o., OH-MAT01MA_I 34–35. o. (PDF-oldal = nyomtatott + 1; a lessons.json szerinti MF 36–37. oldal már kivonás, az a következő leckéhez tartozik)

## A könyv oldalai
„A tányéron 4 szilva van, kapott még 1-et” – dominóval (4 | 1), „Így írjuk: 4 + 1 = 5, így mondjuk: 4 meg 1 egyenlő 5. Ez a művelet az összeadás.” Képtörténetek nyíllal (hozzáteszünk), „Írj a képről összeadást”, kéttagú dominók, „eggyel több” rajzolása, két színű almák: 3 + 1 = 1 + 3 (felcserélhetőség), műveletek párosítása képekhez (3 + 2, 1 + 4, 5 + 0, 0 + 5 …), két összeadás egy képről, rajz készítése műveletekhez, számolás (□ = 0 + 2 …). Munkafüzet: képtörténetek, mókusok zsákjai, alakzatok, kosarak a számegyenesen.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`Osszeadas0Tol5IgG1Mese`, 11 oldal, 8 koppintós feladat): Pötyi uzsonnát rendez. 3 eper + Zümi hoz 1-et → összesen; „Így írjuk: 3 + 1 = 4”, „így mondjuk: 3 meg 1 egyenlő 4”; tízes keret két színnel (2 + 2); Csigusz gombái → melyik összeadás illik (2 + 3); két kéz ujjai (1 + 3); 3 + 1 = 1 + 3 két színű almákkal; 4 + 0 (üres kosár); Zümi ugrásai a számegyenesen (2-ről 3-at); kéttagú dominó (1 | 4).
- **Játszótér** (`AddFramePlayground`): „Rakj ki: 2 piros + 3 kék!” – a gyerek gombokkal korongokat tesz a tízes keretbe, majd 0–5 számgombbal megmondja, mennyi összesen; a végén megjelenik a művelet (2 + 3 = 5). Új feladat gomb. Összeg mindig ≤ 5.
- **Játék** (`Osszeadas0Tol5IgG1Jatek`): Kérdések 3 × 8 (`OSSZEADAS_0_TOL_5_IG_G1_QUESTIONS`), Párosító 3 szint (`..._PAIRS`: keret ↔ szám, művelet ↔ dominó, művelet ↔ eredmény), Válogató 3 szint (`..._SORT`: összesen 3/4, eredmény 4/5, eredmény 3/4/5).

Fájlok: `Osszeadas0Tol5IgG1Scenes.tsx`, `Osszeadas0Tol5IgG1Parts.tsx`, `Osszeadas0Tol5IgG1Mese.tsx`, `Osszeadas0Tol5IgG1Jatek.tsx`, `index.ts` (közös képek: `../a-negy/ANegyG1Scenes.tsx`). Teszt: `src/test/grade1Topic2Osszeadas0Tol5IgG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját történetek (uzsonna, Zümi és Csigusz hoz valamit) a könyv családi jelenetei helyett; a könyv bevezető példája 4 + 1 = 5, nálunk 3 + 1 = 4.
- Írás helyett a gyerek választ: „Melyik összeadás illik a képhez?” (a helyes mellett más, szintén legfeljebb 5 összegű műveletek), illetve „Mennyi …?” számgombokkal.
- A □-es feladatokat (□ = 2 + 2) nem vettük át; a nyitott mondat későbbi lecke. Helyette „Mennyi?” kérdés és kérdőjel van.
- A számegyenesen ugrálás (Zümi) a munkafüzet „kösd a számegyeneshez” feladatát idézi meg; a könyv itt még nem ugrásokkal ad össze.
- Az „eggyel több” (a csőrbe írt szám) és a pálcikás szabálykövetés kimaradt; a kivonást (−) egyáltalán nem használjuk.
- A lessons.json MF 34–37. oldala közül csak a 34–35. tartozik ide; a 36–37. a kivonás leckéé.

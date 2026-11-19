# 10. A húsz (1. osztály – VI. Számkörbővítés, számolás 20-ig)

**Források:** OH-MAT01TA_II 112–115. o. (A húsz, Számolás 0-tól 20-ig), OH-MAT01MA_II 68–71. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
- **A húsz (TK 112, MF 68):** strandkép („Miből van húsz? Miből van kevesebb, több?”), a 20 számjegye, két 5|5 dominó, két 10-es labdaháló, a 20 a 0–21-es számegyenesen és számszomszédai, „20 lapátot / a 20. lapátot”, halak számlálása és összehasonlítása (<, >, =); MF: miből van 20, páros számok 11–20, „Melyik nagyobb? Mennyivel?”.
- **Számolás 0-tól 20-ig (TK 113–115, MF 69–71):** műveletek képről (sapkák, lótuszok, labdák), horgászok és halak (11 + 8, 14 + 6, 12 + 8 … melyiket nem fogta ki senki: 16 + 2), úszógumik színezése (15-nél kisebb / 15 / nagyobb: 14 + 6, 20 − 8, 8 + 7, 9 + 6, 12 − 7, 7 + 9, 9 + 8, 16 − 8), □-es pótlás (9 + □ = 14, 20 − □ = 6), szöveges feladatok (12 + 8 hal, 20 vitorlásból 12 célba ért), háromtagú láncok, kavicsdobás, homokvár (5-tel több, kettővel több); MF: 20 − □ kártyák, nyitott mondatok számegyenesen, bontások 20-ra, páros/páratlan/egy-/kétjegyű vitorlások, kombinatorika, társasjáték.
- **Tízen átlépés a könyvben:** továbbra is a tízre pótlás / a tízig visszaszámolás (9 + 8 = 9 + 1 + 7, 12 − 7 = 12 − 2 − 5); a 20-ra kiegészítés a második tízes megtöltése (14 + 6).

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`AHuszG1Mese`, „Pötyi és az epres kosarak”, 12 oldal, 10 mini-feladat): 20 érett eper; két kosár, mindegyikben 10 hely (2 tízes, 0 egyes); két tízes keret, két tízesrúd, két dominó; 10 + 10; a 20 a számegyenesen (kisebb szomszéd 19); kettesével számolás, a 20 páros; két kéz és két láb ujjai ötösével (5, 10, 15, 20); 14 + □ = 20 (üres helyek); 20 − 8 (Csigusz elvisz 8 epret); 12 − 7 = 12 − 2 − 5.
- **Játszótér** (`RodsPlayground`): „Rudak és kockák” – a táblán egy szám (10–20, gyakran 20), a gyerek tízesrudakat és egyes kockákat rak ki, Pötyi megmondja, kevés/sok a rúd vagy a kocka.
- **Játék** (`AHuszG1Jatek`): Kérdések 3 × 8 (`A_HUSZ_G1_QUESTIONS`; 1. szint: számlálás, számjegy, keretek, rudak, dominó, ujjak; 2. szint: 10 + 10, kiegészítés 20-ra, 14 + 6, 20 − 10, számsorok egyesével/kettesével, ugrás, páros; 3. szint: jelek, 12 − 7 és 9 + 8 a tízen át, történetek (12 + 8, 20 − 12), 18 < □ < 20, mennyivel nagyobb), Párosító (eprek ↔ szám; keretek ↔ tízesrudak; a horgászos feladat műveletei ↔ eredmény), Válogató (20 / nem 20; páros / páratlan 11–20; a könyv úszógumis feladata: 15-nél kevesebb / pont 15 / több).

Fájlok: `AHuszG1Scenes.tsx` (`RodsScene`/`MiniRods` – tízesrudak 0–20, `BasketsScene` – két 10-es kosár eperrel, `PairsScene` – párba állítás, `HandsFeetScene`; a „Számolás 20-ig” lecke is használja), `AHuszG1Parts.tsx`, `AHuszG1Mese.tsx`, `AHuszG1Jatek.tsx`, `index.ts`. Közös képek: `../a-tizenot/ATizenotG1Scenes.tsx`. Teszt: `src/test/grade1Topic6AHuszG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese (epres kert, két tízes kosár) a könyv strandképe helyett; a lecke egyben feldolgozza a „Számolás 0-tól 20-ig” oldalakat is.
- Számkör: 0–20. A könyv a 20 mindkét szomszédját kéri (a számegyenes 21-ig megy) – nálunk csak a kisebb szomszéd (19), a számegyenes 20-ig tart.
- A „20 lapát / a 20. lapát” színezése, a táblázatok, a kombinatorika (hajók sorrendje), a társasjáték és a homokvár-feladat (két feltételes, „5-tel több” visszafelé) kimaradt; a horgászos párosítás és az úszógumis színezés Párosító, illetve Válogató lett.
- A „Melyik nagyobb? Mennyivel?” (MF 68/3) egy kérdésben, számegyenessel (20 és 17).
- A két kéz és két láb ujjai (20) saját ötlet az ötösével számoláshoz.
- Könyvhiba nem volt (a horgászok, úszógumik, pótlások, láncok és szöveges feladatok eredményei rendben).

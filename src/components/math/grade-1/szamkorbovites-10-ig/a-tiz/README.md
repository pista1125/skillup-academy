# 17. A tíz (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 120–123. o., OH-MAT01MA_I 62–63. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
TK 120: téli etetőkép („Miből van tíz? Tíznél több / kevesebb?”), két kéz, dominó 5|5, a 10 számjegy, vers, 10 gyerek párban, a 10 a számegyenesen (0–11) és számszomszédai, számlálás oszlopdiagramba. TK 121: a 10 írása (1 és 0), mogyorók csoportosítása tízesével, madáretetők összehasonlítása jellel és „mennyivel több?”. TK 122: sárgarépás kosarak jelek szerint, diós zsákok (páros szám), magok az etetőkbe jelek szerint. TK 123: a 10 bontásai rudakkal és táblázatban (10 = 10 + 0 … 0 + 10), 10 napraforgómag három madárnak (10 = 3 + 2 + 5). MF 62: számsor < jelekkel 0–10, számszomszédok fákon, nyitott mondatok (6 < □ < 10), hóemberek pöttyrajzzal és „mennyivel több”. MF 63: számházak (8, 10), a 10 felbontása 3 tagra, alma–körte kiegészítés 10-re és 7-re.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ATizG1Mese`, „Pötyi és a madáretető”, 12 oldal, 7 mini-feladat): a barátok madáretetőt építenek; 9 madár eszik, jön még 1: 9 meg 1 az 10; Pötyi két szárnya tele (5 és 5); a 10 írása (egyes és mellé nulla); 10 ujj, dominó 5|5, teli tízes keret; a 10 a számegyenesen, kisebb szomszédja; 10 hógolyó; 10 madár > 8 madár; párba állítás: mennyivel több; 6 + □ = 10 (Pötyi pöttyei).
- **Játszótér** (`FillTenPlayground`): „Töltsd meg a keretet!” – a tízes keretben 1–9 piros korong, a gyerek kék korongokkal tele tölti; Pötyi pöttyei együtt nőnek, a végén Pötyi kimondja a bontást („7 meg 3 az 10”).
- **Játék** (`ATizG1Jatek`): Kérdések 3 × 8 (`A_TIZ_G1_QUESTIONS`): számlálás, a 10 számjegy, ujjkép, dominó, teli keret, számegyenes, összehasonlítás, mennyivel több, üres helyek, kiegészítés 10-re, bontás, tízesbarátok, 5 + 5 = 10, elrepülő madár, a 10 páros, 9 < □, egylépéses történet. Párosító 3 szint (`A_TIZ_G1_PAIRS`; 3. szint: tízesbarátok kerettel), Válogató 3 szint (`A_TIZ_G1_SORT`; 3. szint: melyik összeg pont 10).

Fájlok: `ATizG1Scenes.tsx` (`FeederScene` 0–10 madárral, érkező/elrepülő madarakkal; `FeederFriendsScene`, `PotyiWingsScene`, `TwoRowsScene`, `PairsScene` – a 18–20. lecke is innen importál), `ATizG1Parts.tsx`, `ATizG1Mese.tsx`, `ATizG1Jatek.tsx`, `index.ts`. Közös képek a `a-nyolc` leckéből (`CountBox`, `CompareBoxes`, `TwoHands`, `EqCard`, `HopLine`). Teszt: `src/test/grade1Topic3ATizG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese (a barátok madáretetője) a népes téli kép helyett; a tízet a 9 madár + 1 érkező és Pötyi két teli szárnya vezeti be.
- A könyv a 10 két számszomszédját kéri, a számegyenesen a 11 is szerepel (TK 120/1 b). A 11 még nem ismert, ezért nálunk csak a kisebb szomszéd (9) szerepel, a számegyenes 10-ig megy. „Tíznél több” mennyiséget nem kérdezünk.
- A „tízes” és „egyes” szavakat (helyiérték) nem használjuk; csak annyit mondunk: a 10 az első szám, amit két számjeggyel írunk (egyes és mellé nulla).
- A 10 teljes bontástáblázata (TK 123/1) és a háromtagú bontás (TK 123/2, MF 63/2) a 18. leckébe került; itt kiegészítés (6 + □ = 10, üres helyek a keretben) és a tízesbarátok párosítója szerepel.
- Kimaradt: színezés, oszlopdiagram, csoportosítás karikázással, vers, rajzolás jelek szerint (koppintós felületen nem értelmes). Az alma–körte feladat (MF 63/3, összeg 7 is) helyett csak 10-re egészítünk ki.

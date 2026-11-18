# 10. Gyakorlás, tudáspróba (2. osztály, V. Osztás)

Az V. témakör (1–9. lecke: osztás 2-vel … 10-zel) záró összefoglaló leckéje és 90 kérdéses tudáspróbája.

## Források
- **Tankönyv I. kötet** (`OH-MAT02TA_I.pdf`, PDF-oldal = nyomtatott + 1): *Megálló* 43–44., 77–78., 108–110., 132–133. o.
- **Tankönyv II. kötet** (`OH-MAT02TA_II.pdf`, PDF-oldal = nyomtatott + 2): *Megálló* 30–32., 51–52., 69–70., 82–87. o.
- **Munkafüzet II. kötet** (`OH-MAT02MA_II.pdf`): *Szorzás, osztás 0-tól 100-ig* 59–62. o.

## Mit tartalmaznak a könyvoldalak?
- **TK I/109–110:** betűrejtvény vegyes műveletekkel (`21 : 3`, `24 : 4`, `27 : 3`, `32 : 4`, `28 : 4`), állatos „ismertető” (`20 : 4`, `28 : 4` méter).
- **TK I/132:** kesztyűpárok: „Ha 5 párt tesz egy dobozba, hány dobozra lesz szüksége? Mindegyik doboz tele lesz?” (felfelé kerekítés és teli dobozok).
- **TK II/30:** egyenlő értékű tollak (`24 : 6`, `54 : 6`, `42 : 6`, `30 : 5` ↔ `8 · 6`, `3 · 3`, `6 · 5`), papírbolti csomagok táblázata (hány csomag?), árak `7 · 6 : 6` alakban.
- **TK II/82:** díjugrató pálya (`63 : 9 m`, `54 : 9 m`, `72 : 9 m`, `81 : 9 m`), hegymászó-út (`18 : 3`).
- **MF II/59–62:** osztások és eredmények színezése (`72 : 8`, `42 : 7`, `18 : 6`, `64 : 8`, `12 : 6`, `100 : 10`, `30 : 6`, `16 : 4`, `21 : 3`), társasjáték („mondjatok olyan osztást, amelynek az eredménye …”), „48 és a 6 hányadosa”, nyitott mondat `35 : 7 < ♥ < 81 : 9`.

## A DiákZóna lecke
- **Tananyag:** „Amit már tudsz” táblázat mind a 9 osztásról (bennfoglaló tábla + segítség), a kétféle osztás (bennfoglalás: „hány csoport lesz?”, részekre osztás: „mennyi jut egyre?”), műveletcsalád (6, 8, 48) és ellenőrzés szorzással, fele / harmada / negyede szalagmodellen, maradékos osztás a könyv jelölésével („Ennyi csoport: 5, Ennyi maradt: 3”, ellenőrzés `5 · 4 + 3 = 23`) táblázattal, „hány lesz tele?” és „hány kell?” különbsége, 3 mintapélda, „Vigyázz!” (túl nagy maradék; az osztás nem kivonás).
- **Labor I – Vegyes osztás-gyakorló:** osztó (2–10 vagy vegyes) és feladattípus (osztás, -ad része, hiányzó osztandó `□ : 6 = 7`, hiányzó osztó `42 : □ = 7`, rövid szöveges) választható; pontszámláló időmérés nélkül, tipikus hibákra célzott tipp (kivonás az osztás helyett, egy csoport eltérés, szorzás a „-ad része” helyett).
- **Labor II – Maradék-edző:** két mód. *Maradékos osztás:* n korong (≤ 60), a gyerek beírja: „Ennyi csoport” és „Ennyi maradt”; ha a maradék ≥ az osztó, figyelmeztet, egyébként a `q · d + r` ellenőrzést mutatja, jó válasznál kiszínezi a csoportokat. *Hány csónak kell?:* felfelé kerekítés, célzott tipp, ha a gyerek a parton hagyja a maradékot.
- **Kvíz:** 90 kérdés (30 / 30 / 30), 60 kérdés ábrával (tányérok, karikázott csoportok, maradékos csoportosítás „Ennyi csoport / maradt” dobozokkal, „hány kell” tárolók, műveletcsalád-háromszög, ugrások, nyílképek, szalagmodell, mini szorzótábla, érmék), minden kérdésnek saját típusjelvénye; 3 puskakártya. `+ − · :`, minden szám ≤ 100.
- **Párosító:** 3 szint × 8 pár (csoportosítás és szétosztás; minden tábla és maradék; két lépés és „hány kell”). **Csoportosító:** 3 szint × 3 kategória × 9 elem (eredmény 3/5/7; maradék 0/1/2; „hány kell” 4/5/6). Szintenként legalább 4 kártyaábra.

## Komponensek
- `DivExamG2Parts.tsx` — `RESZE`, `esevel`, kérdésábrák (`QPlates`, `QRemainder`, `QBoxNeed`, `HolderIcon`, `QFamily`), generátorok (`makeDivTask`, `makeRemTask`), laborok (`DivMixLab`, `RemainderLab`). Az általános elemeket (`QFig`, `QGroups`, `QJumps`, `QChain` …, labor-UI) a `../../szorzas/gyakorlas-tudasproba/MultExamG2Parts.tsx` adja.
- `DivExamG2Figures.tsx` — `GroupingSvg`, `SharingSvg`, `FamilySvg`, `PartsSvg`, `RemainderSvg`, `RoundUpSvg`
- `DivExamG2CardFigures.tsx` — `PlatesCard`, `RemainderCard`, `BoatsCard` (+ a szorzásos tudáspróba `JumpsCard`, `ArrayCard`, `ChainCard`, `CoinsCard` kártyái)
- `DivExamG2Theory.tsx`, `DivExamG2Quiz.tsx` (`DIV_EXAM_G2_QUESTIONS`, `g2-osztas-tudasproba-quiz`), `DivExamG2Matcher.tsx` (`g2-osztas-tudasproba-matcher`), `DivExamG2Sorter.tsx` (`g2-osztas-tudasproba-sorter`)
- Teszt: `src/test/grade2Topic5DivExamG2.test.tsx`

## Eltérések a tankönyvtől
- **Maradékos osztás a könyv jelölésével:** egységesen „Ennyi csoport: □, ennyi maradt: □” és ellenőrzés `5 · 4 + 3 = 23`; sehol nem írunk „43 : 8 = 5 maradék 3” alakot (a 7-tel osztásnál a könyvben felbukkanó „8 : 7 = □ marad □” formát sem). A teszt ellenőrzi, hogy ilyen alak ne kerüljön a kvízbe.
- **A maradék kisebb, mint az osztó:** a könyv ezt sehol nem mondja ki általánosan. Nálunk a quickRule, egy „Vigyázz!” doboz (22 korong 5-ösével: „3 csoport, maradt 7” hiba), két kvízkérdés (melyik nem lehet maradék; legnagyobb maradék) és a Maradék-edző visszajelzése is kiemeli.
- **„Hány lesz tele?” és „hány kell?” szétválasztva:** a TK I/132/2 egy feladatban kérdezi („hány dobozra lesz szüksége? Mindegyik doboz tele lesz?”), és a munkafüzet több feladatában (lásd a 4. és 8. osztás-lecke README-jét) összemosódik a kettő. Nálunk külön kérdés, külön ábra és a tananyagban két kártya mutatja a különbséget (34 tojás: 5 teli, 6 kell).
- **Mértékegység az osztásban:** a TK II/82/2 „`63 : 9 m = □ m`” alakot ír (métert osztunk számmal, az eredmény is méter), ami a 2. osztályban félreérthető. Nálunk a mértékegység a szövegben van, a műveletben csak számok.
- **Nincs háromlépéses vagy háromtényezős lánc egy műveletben:** a TK II/30/3 `7 · 6 : 6 = □ Ft` ára 7 Ft (1 Ft-os érme nincs). Nálunk a hasonló „oda-vissza” feladat (`7 · 8 : 8`) pénz nélkül szerepel, a pénzes osztások csak valódi címletekkel (5, 10, 20, 50 Ft) és 10 Ft-ra kerek eredménnyel.
- **Nyitott mondat osztással nem:** az MF II/62/1 `35 : 7 < ♥ < 81 : 9` rendben van, de a `□ : 5 < 3` típusú mondatokat (nem egész eredményű osztásokat engednének) nem használjuk; az osztásos összehasonlítás mindig két kiszámolható osztás között történik (`36 : 4 □ 5 · 2`).
- **„Osztható” szó helyett csoportosítás:** a „7-tel osztható” helyett „7-esével csoportosítva semmi se marad” megfogalmazás (a 2. osztályos könyv az oszthatóságot még nem tanítja); a „3-mal és 4-gyel is osztható” fejtörőnél maradék nélküli osztásként magyarázzuk.
- **Csak osztásos tartalom:** a Megállók képkereső, logikai, kombinatorikai, valószínűségi és bűvösnégyzet-feladatait nem vettük át (ezek nem a témakörhöz tartoznak).
- **Saját tartalom:** a könyv szereplői és helyzetei (állatkert, díjugratás, papírbolt, Gergő, Rozi stb.) helyett saját nevek, sütik tányéron, tojásdobozok, csónakok, kisbuszok, polcok, cukros zacskók.

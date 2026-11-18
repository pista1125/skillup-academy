# 10. Gyakorlás, tudáspróba (2. osztály, IV. Szorzás)

A IV. témakör (1–9. lecke: szorzás 2-vel … 10-zel) záró összefoglaló leckéje és 90 kérdéses tudáspróbája.

## Források
- **Tankönyv I. kötet** (`OH-MAT02TA_I.pdf`, PDF-oldal = nyomtatott + 1): *Megálló* 43–44., 77–78., 108–110., 132–133. o.
- **Tankönyv II. kötet** (`OH-MAT02TA_II.pdf`, PDF-oldal = nyomtatott + 2): *Megálló* 30–32., 51–52., 69–70., 82–87. o.
- **Munkafüzet II. kötet** (`OH-MAT02MA_II.pdf`): *Szorzás, osztás 0-tól 100-ig* 59–62. o.

## Mit tartalmaznak a könyvoldalak?
- **TK I/108–110:** „Mi változott?” kép, sorba nem illő állat, `△ + ○ + □ = 40` táblázat, csökkenő lépésű sorozat; örökbefogadási oklevelek műveletekkel (`7 · 4`, `9 · 4`, `4 · 4`, `16 + 16`), betűrejtvény vegyes `+ − · :` műveletekkel, medvék és barlangok (`8 · 4 + 6`), állatos „ismertető” számokkal.
- **TK I/132–133:** labirintus, kesztyűpárok („Ha 5 párt tesz egy dobozba, hány dobozra lesz szüksége?”), mezős útkereső, mesterségek és szerszámok (`7 · 5`, `6 · 5`, `9 · 10`, `7 · 3` besorolása páros/páratlan és 40/50 szerint).
- **TK II/30–32:** egyenlő értékű tollak párosítása (`8 · 6`, `3 · 3`, `24 : 6` …), papírbolti csomagok táblázata, árak háromtényezős szorzatokból (`2 · 4 · 6`, `7 · 6 : 6`), szorzópárbaj dobókockával, biztos / lehet / lehetetlen, pénzfeldobás, kombinatorika.
- **TK II/82–87:** labdák elrendezése (`3 · 9 + 3 · 3 = 36`), díjugrató pálya (`4 · 9 m`, `63 : 9 m`), műveletcsaládok, hegymászó-utak (számjegyek összege 9 / páros számjegyek), labdák kapukba (`8 · 9`, `2 · 2 · 4`), éremtáblázat, súlycsoportok, nyitott mondatok (`> 3 · 2 · 9`, `8 · 9 > ○ > 4 · 9`), kombinatorika, bűvös négyzetek, számpiramisok.
- **MF II/59–62:** meggyszemek (két szám szorzata a levélen), osztások és eredményeik színezése, rágógumis csomagok (5 piros + 3 kék, 7 csomag), dobókockás társasjáték, állítás ↔ művelet háromszög, csoportmunka, nyitott mondatok (`5 · 9 < ☼ < 50`), szorzókártyák nyitott mondatokhoz, háromtényezős szorzatok táblázata.

## A DiákZóna lecke
- **Tananyag:** „Amit már tudsz” táblázat mind a 9 tábláról (szorzatok + segítség), a szorzás jelentése (egyforma csoportok, „háromszor négy”, tényező, szorzat, 0 és 1), felcserélhetőség rácspontokkal, a teljes 10 × 10-es szorzótábla, a táblák kapcsolata (2–4–8 duplázás, 3–6–9, 5–10 pénzzel), „-szorosa” és a „-szor annyi / -val több” különbsége, 3 mintapélda (két lépés, hiányzó tényező, nyitott mondat), „Vigyázz!” (· ≠ +, előbb szorzunk).
- **Labor I – Vegyes szorzótábla-gyakorló:** tábla (2–10 vagy vegyes) és feladattípus (szorzat, hiányzó tényező □, -szorosa, „a tábla segít”) választható; „Ellenőrzés”, „Új feladat”, pontszámláló időmérés nélkül, tipikus hibákra célzott tipp (összeadás a szorzás helyett, egy lépés elcsúszás, kivonás a hiányzó tényezőnél, duplázás helyett hozzáadás).
- **Labor II – Szorzótábla-detektív:** 10 × 10-es rács; a gyerek megkeresi az összes mezőt, ahol a szorzat a megadott szám (2–4 hely). Ellenőrzéskor a jó mezők zölden, a rosszak pirosan, a saját szorzatukkal jelennek meg; tipp a felcserélésre.
- **Kvíz:** 90 kérdés (30 / 30 / 30), 59 kérdés ábrával (zsákok, rácspontok, ugrások, érmék, számsor, műveletlánc, táblázat, szalagmodell, mini szorzótábla), minden kérdésnek saját típusjelvénye; 3 puskakártya. Csak `+`, `−`, `·`; minden szám ≤ 100.
- **Párosító:** 3 szint × 8 pár (képek → szorzat; minden tábla; két lépés). **Csoportosító:** 3 szint × 3 kategória × 9 elem (eredmény 12/18/20; 40-hez viszonyítás; hiányzó szám 6/7/8). Szintenként legalább 4 kártyaábra.

## Komponensek
- `MultExamG2Parts.tsx` — közös rajzelemek és kérdésábrák (`QFig`, `QGroups`, `QDots`, `QArray`, `QJumps`, `QSeq`, `QChain`, `QArrowMap`, `QCompare`, `QTable`, `CoinG`, `QCoins`, `QTags`, `QStrips`, `QGrid10`), nyelvi segédek (`SZOROSA`, `az`, `es`), generátorok (`makeMultTask`, `cellsFor`, `makeDetectiveTarget`), laborok (`MultMixLab`, `DetectiveLab`), közös labor-UI (`LabBox`, `LabButton`, `Feedback`, `NumInput`, `useTaskTrainer`). A *DivExamG2* lecke is innen importál.
- `MultExamG2Figures.tsx` — `MultMeaningSvg`, `CommuteArraySvg`, `ProductGridSvg`, `Links248Svg`, `Links369Svg`, `Link510Svg`
- `MultExamG2CardFigures.tsx` — `GroupsCard`, `ArrayCard`, `JumpsCard`, `CoinsCard`, `ChainCard` (150 × 80 / 80 × 80)
- `MultExamG2Theory.tsx`, `MultExamG2Quiz.tsx` (`MULT_EXAM_G2_QUESTIONS`, `g2-szorzas-tudasproba-quiz`), `MultExamG2Matcher.tsx` (`g2-szorzas-tudasproba-matcher`), `MultExamG2Sorter.tsx` (`g2-szorzas-tudasproba-sorter`)
- Teszt: `src/test/grade2Topic4MultExamG2.test.tsx`

## Eltérések a tankönyvtől
- **Csak szorzás:** a könyv Megálló-oldalai (TK I/109/2, I/110/2, II/30/1, II/82/2, MF II/59/2, 61/1) vegyesen kérnek `:` műveleteket is. A IV. fejezet szabálya szerint itt csak `+`, `−`, `·` szerepel; az osztásos részek a *V. Osztás / 10. Gyakorlás, tudáspróba* leckébe kerültek.
- **Nincs háromtényezős szorzat:** a TK II/30/3 (`2 · 4 · 6`, `5 · 2 · 6`, `3 · 3 · 6`), TK II/83/2 (`2 · 2 · 4`), TK II/85/3 (`> 3 · 2 · 9`, `< 2 · 2 · 9`) és MF II/62/4 (három szám szorzata) a 2. osztályban nem tanított háromtényezős szorzást kér. Helyette két lépésben, láncnyíllal (`3 → · 2 → · 4`) gyakoroltatunk.
- **Végtelen sok megoldás helyett felsorolható nyitott mondat:** a TK II/85/3 („Sorolj fel közülük néhányat!”, pl. `○ > 54`) nyitott végű. A DiákZóna nyitott mondatai mindig véges, felsorolható megoldáshalmazt adnak (`□ · 7 < 30` → 0, 1, 2, 3, 4), és a 0-t is számba vesszük.
- **Kétértelmű párosítás:** az MF II/62/2-ben a `63 < ♥ < 76` mondathoz két kártya is illik (`9 · 8 = 72`, `8 · 8 = 64`), a `19 < ♣ < 34` mondathoz három (`7 · 3`, `9 · 3`, `8 · 3`), miközben a feladat egy-egy összekötést sugall. A TK II/30/1-ben a 9-es tollhoz két másik toll is tartozik (`3 · 3` és `54 : 6`). Nálunk minden párosítónak pontosan egy párja van (a teszt ellenőrzi).
- **Valódi forint:** a TK II/30/3 árai (`7 · 6 : 6 = 7 Ft` papír) 1 Ft-os pontossággal adnak árat, ilyen érme nincs. Nálunk csak 5, 10, 20, 50, 100 Ft-os érmék és 5-re, 10-re végződő összegek szerepelnek.
- **„-szor annyi” vs. „-val több”:** a könyv mindkettőt használja, de nem állítja szembe. A DiákZóna szalagmodellel és külön csapdakérdéssel mutatja meg a különbséget (9 háromszorosa = 27, de 3-mal több = 12).
- **A táblák kapcsolata egy helyen:** a könyvben szétszórva szerepel (2–4: TK I/104, 3–6–9: TK II/26–27 és 78, 5–10: TK I/127). Itt egy szakaszban, ábrával és a „Tábla segít” laborfeladattal foglaljuk össze.
- **Kihagyott, nem szorzásos tartalom:** a Megállók képkereső, logikai, kombinatorikai, valószínűségi, éremtáblázatos, súlycsoportos és bűvösnégyzet-feladatai nem a szorzás témakörhöz tartoznak, ezeket nem vettük át. A TK II/84/2 éremtáblázata (USA: 46 + 29 + 29 = 104) a 100-as számkört is túllépi.
- **Saját tartalom:** a könyv szereplői (Fruzsina, Bence, Szilárd, Sára, Manó, Gergő, Rozi stb.) és állatkerti / sportos helyzetei helyett saját nevek, zsákok, tojásdobozok, pókok, triciklik, radírok és érmék.

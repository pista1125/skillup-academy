# 2. Osztás 3-mal

## Források
- *Matematika 2. – Tankönyv I. kötet* (`OH-MAT02TA_I.pdf`): 72. o. (Számok többszörösei), 73–76. o. (Szorzás, osztás 3-mal), 83. o. (Maradékos osztás 3-mal).
- *Matematika 2. – Munkafüzet I. kötet* (`OH-MAT02MA_I.pdf`): 46–52. o. (Szorzás, osztás 3-mal), 53. o. (Maradékos osztás 3-mal).

## Mit tartalmaznak az oldalak?
- **TK 72.**: többszörösök 0–30 között, ugrásszám ↔ érkezési hely („Ide jutott – ennyit ugrott idáig”).
- **TK 73–76.**: labdák csoportosítása hármasával, szorzás és osztás a képről; a 3-as tábla mellett a bennfoglaló tábla (`0 : 3 = 0`, `3 : 3 = 1` … `30 : 3 = 10`); „háromszorosa / harmada” nyíldiagramok; ceruzák csoportosítása; képek ↔ műveletsorok (`24 : 3`, `30 : 3`, `30 : 10`).
- **TK 83.**: maradékos osztás tevékenységgel – kerekasztal-módszer (25 korong, 28 kocka 3 gyerek között), „Csoportosíts hármasával! Ennyi csoport: □, ennyi maradt: □”.
- **MF 49–52.**: keretezés hármasával, képek ↔ osztások, összehasonlítás (`21 : 3 □ 7 · 2`), szabálytáblázat (`♥ : 3 = ●`), „hány barátjának” típusú bennfoglalás, „harmadannyi” szöveges feladat.
- **MF 53.**: babszemek 3 fazékba („Ennyi bab került 1 fazékba / Ennyi maradt”), saláták hármasával, golyók 3-as dobozokba.

## A DiákZóna lecke
- Tananyag: a kétféle osztás (csoportosítás hármasával = bennfoglalás; szétosztás 3 egyenlő részre körbeosztással = részekre osztás), a „harmada”, a bennfoglaló tábla szorzásos ellenőrzéssel, `0 : 3 = 0`, **maradékos osztás 3-mal** karikázással és visszafelé ugrálással, a maradék csak 0, 1, 2 lehet; mintapéldák, Vigyázz-doboz.
- 2 labor: **Szétosztás 3 tányérra** (tányérra koppintás / „Körbe: mindenkinek 1”, doboz-számláló, maradékos feladatok is) és **Karikázz hármasával!** (karikák rakása, a kimaradt korongok számának kiválasztása), mindkettő „Új feladat” gombbal.
- Kvíz 30 kérdés (10/szint), 19 kérdésábrával; Párosító 3 × 8 pár (eredmény / kép–osztás–ellenőrzés / maradékos osztás); Csoportosító 3 × 3 × 9 elem (eredmény / maradék / mennyi jut egynek).

## Jelölés (maradékos osztás)
A tankönyv és a munkafüzet 2. osztályban **nem ír jeles alakot** a maradékos osztásra; szavakkal rögzít: „Ennyi csoport: 4, ennyi maradt: 2”, „Ennyi bab került 1 fazékba / Ennyi maradt”. A DiákZóna ezt követi: „4 csoport, maradt 2”, „4 jutott, 2 maradt”, „14-ben a 3 megvan 4-szer, maradt 2”, az ellenőrzést két lépésben írja: `4 · 3 = 12, és 12 + 2 = 14`. Nem használunk `14 : 3 = 4 (2)` vagy „maradék” jeles alakot.

## Fájlok és teszt
- `Div3G2Parts.tsx` – közös SVG-elemek (`PlatePart`, `RingedDotsPart`, `JumpBackPart`), `szor()`, `ban()` ragképzők, laborok (`ShareLab3`, `GroupLab3`)
- `Div3G2Figures.tsx` – `GroupByThreeSvg`, `ShareThreePlatesSvg`, `TripleThirdSvg`, `RemainderGroupsSvg`, `JumpBackRemSvg`, `RemainderRuleSvg`
- `Div3G2CardFigures.tsx` – kártyaképek (150 × 80 és 80 × 80): `PlatesCard`, `PileCard`, `RingsCard`, `DotsBy3Card`, `ThirdArrowCard`, `JumpBackCard`
- `Div3G2Theory.tsx`, `Div3G2Quiz.tsx` (`g2-osztas-3-quiz`), `Div3G2Matcher.tsx` (`g2-osztas-3-matcher`), `Div3G2Sorter.tsx` (`g2-osztas-3-sorter`)
- Teszt: `src/test/grade2Topic5Div3G2.test.tsx`

## Eltérések a tankönyvtől
- **Külön osztás-lecke**: a tankönyv a szorzással együtt (73–76.) tanítja a 3-mal való osztást, a maradékos osztást pedig külön, később (83.). A DiákZóna egy leckében, a szorzás után mutatja be mindkettőt, a maradékost a lecke végén.
- **Mindkét osztásfajta néven nevezve**: a könyv vegyesen használja a csoportosítást (TK 73., 76.) és a szétosztást (TK 83. kerekasztal, MF 53. fazekak). A DiákZóna külön szakaszban, külön ábrával és külön laborral mutatja a kettőt, és mindkettőnél ugyanazzal a szorzással ellenőriz.
- **Fordított („harmadannyi”) szöveg kihagyva**: a MF 52/3 („harmadannyian járnak focizni, mint úszni … focizni 7-en”) fordított szövegezésű, 7–8 évesen gyakori a 7 : 3 hibás próbálkozás. Helyette egyenes kérdés: „Melyik szám harmada a 7?” (nyíldiagrammal).
- **A „maradék” mérete kimondva**: a TK 83. csak tevékenységet ad; a DiákZóna kimondja és ábrán mutatja (12, 13, 14, 15), hogy hármasával csak 0, 1 vagy 2 maradhat, és a Vigyázz-doboz a „4 csoport, maradt 4” hibát mutatja be.
- **„Hány doboz kell?” helyzet**: saját, kétlépéses feladat (14 ceruza → 5 doboz), mert a maradéknak is kell hely – a könyvben ilyen nincs, de a maradékos osztás valós értelmét mutatja.
- **Saját szereplők**: a könyv sárkányai és tárgyai helyett sütik, eprek, gyöngyök, matricák, pálcikák, ceruzák, csapatok; minden szám saját.
- **Számkör ≤ 30, csak + − · :** – a könyv 3-as táblás oldalán (MF 50/1, TK 76/2) előforduló 2-es és 10-es táblás feladatokat (`30 : 10`, `7 · 2`) nem vettük át, a lecke a 3-mal való osztásra koncentrál.

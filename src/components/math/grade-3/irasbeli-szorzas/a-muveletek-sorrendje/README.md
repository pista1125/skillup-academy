# 5. A műveletek sorrendje (3. osztály, XIII. Írásbeli szorzás)

## Források
- Tankönyv: OH-MAT03TA, 130–131. oldal („A műveletek sorrendje”).
- Munkafüzet: OH-MAT03MA_II, 60–61. oldal.

## Mi van a könyvben?
- TK 130: színjátszó előadás két úton (2 · (60 + 270) és 2 · 60 + 2 · 270); műveletsorok zárójellel és anélkül (3 · 250 – 120, 3 · (250 – 120), 750 – 124 · 3…); skanzen-térkép, a nyilakon műveletsorok (távolság a bejárattól).
- TK 131: könyvjelzők (125 + 205 · 3, 125 · 3 + 205, (125 + 205) · 3); „kétszer annyi / háromszor annyi, összesen” szöveges feladatok; „Melyik számra gondoltam?”; egyenlő értékű műveletsor-párok (A–H); visszajáró pénz (3 képeslap, 1000 Ft); szöveges feladat alkotása tervhez.
- MF 60–61: dobókockás műveletsorok, vegyes műveletsorok zárójellel, belépőjegyek ára (felnőtt/diák/nyugdíjas), céltábla pontjai.

## Mit csinál a DiákZóna-lecke?
- Szabály-plakát: 1. zárójel → 2. szorzás, osztás → 3. összeadás, kivonás balról jobbra.
- Saját mintapéldák: két polc könyv (126 + 126 · 3), mozi két úton (3 · (50 + 230) = 3 · 50 + 3 · 230), állatkert-térkép műveletsorokkal, „ugyanazok a számok, más eredmény” (740 ↔ 990).
- Csapda: 90 + 110 · 4 balról jobbra (800) ↔ jó sorrend (530); „a zárójelben lévő mindkét számot szorozd”.
- **Labor I – Lépésről lépésre:** véletlen műveletsor 1000-ig. A gyerek rákoppint az elsőként elvégzendő műveleti jelre (célzott tipp: „Van zárójel!”, „A szorzás előbb jön!”, „Balról jobbra!”), beírja a részeredményt, a műveletsor rövidül, a lépések listája megmarad.
- **Labor II – Keresd a párját!** a · (b ± c) mellé három műveletsor; a két rossz a tipikus hiba (csak az egyik számot szorozta). Utána az eredményt is beírja.
- Kvíz: 30 kérdés (10/10/10), 21 ábrával (műveletsor színes jelekkel, dobozok, csomagok, szakaszos ábra, bolt).
- Párosító: kép ↔ terv (dobozok + még, dobozok − elfogyott, csomagok), műveletsor ↔ eredmény (az első lépés kiemelve), egyenlő értékű párok csomag-képpel.
- Csoportosító: „mit számolsz először” (jelminta-képek), eredmény szerint (600/720/840), szöveg ↔ terv-minta (□ · □ + □, (□ + □) · □, □ · □ − □).

## Komponensek
- `OrderOpsMulG3Figures.tsx`: `OrderRuleMulSvg`, `CinemaTwoWaysSvg`, `ZooMapSvg`, `ShelvesSvg`, `OrderTrapMulSvg`
- `OrderOpsMulG3CardFigures.tsx`: `GroupsCard`, `StepCard`, `PackCard`, `OpsSmall`, `GroupsSmall`
- `OrderOpsMulG3Parts.tsx`: kiértékelő (`parse`, `steps`, `nextIdx`, `applyAt`, `evalStr`), generátorok (`genExpr`, `genTwinTask`)
- `OrderOpsMulG3Theory.tsx`, `OrderOpsMulG3Quiz.tsx` (`ORDER_OPS_MUL_G3_QUESTIONS`), `OrderOpsMulG3Matcher.tsx` (`ORDER_OPS_MUL_G3_MATCHER_LEVELS`), `OrderOpsMulG3Sorter.tsx` (`ORDER_OPS_MUL_G3_SORTER_LEVELS`)
- Azonosítók: kvíz `g3-wmul-sorrend-quiz`, párosító `g3-wmul-sorrend-matcher`, csoportosító `g3-wmul-sorrend-sorter`.

## Teszt
`src/test/grade3Topic13OrderOpsMulG3.test.tsx`

## Eltérések a tankönyvtől
- **Hiányzó szabály (TK 130–131):** a két oldalon egyszer sincs kimondva a sorrend szabálya, csak „Ügyelj a helyes sorrendre!”. Nálunk szabály-plakát és háromlépéses szabály a lecke elején.
- **Megtévesztő jel (TK 130/1.):** Elvira és Elek műveletsora után ugyanaz a ▲ áll, így a gyerek számolás előtt „látja”, hogy egyenlők. Nálunk a két utat külön kiszámoljuk, és csak a végén derül ki, hogy ugyanannyi (840).
- **Felesleges zárójel magyarázat nélkül (TK 131/8. H: 968 – (5 · 135)):** a könyv nem mondja meg, hogy itt a zárójel nem változtat semmit. Nálunk a párosítóban ez a pár külön szerepel, és a „mit számolsz először” csoportosítóban látszik, mikor számít a zárójel.
- **Didaktikai változtatás:** a könyv nem mutatja meg a tipikus hibát (balról jobbra számolás, csak az egyik szám szorzása a zárójel felbontásakor). Nálunk csapda-doboz, és a laborok ezekre a hibákra célzott tippet adnak.
- **Didaktikai változtatás:** a „szöveges feladat alkotása tervhez” (TK 131/10.) papíron nyitott feladat; mi fordítva gyakoroltatjuk: a gyerek a szöveghez választja a tervet (csoportosító 3. szint, kvíz).
- Saját számok és helyzetek (polc, mozi, állatkert, pékség, uszoda, bolt) a könyv színjátszó, skanzen- és könyvjelzős feladatai helyett.

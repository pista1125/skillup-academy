# 4. Összeadás 20-as számkör

## Útmutató források
- *Matematika 2. osztályosoknak I. kötet* (`OH-MAT02TA_I__teljes.pdf`, 12–14., 16–17. o.)
- *Matematika munkafüzet 2. osztályosoknak I. kötet* (`OH-MAT02MA_I__teljes.pdf`, 7–8., 10–14. o.)

## Tananyag tartalma és felépítése
- **10 + egyesek** (`10 + 6 = 16`, tagok felcserélhetősége).
- **Összeadás tízesátlépés nélkül** a 0–10-es analógia („kistesó”) segítségével (`4 + 3 = 7` → `14 + 3 = 17`, fordított egyenlet `□ = 15 + 4`).
- **Összeadás tízesátlépéssel (10-re pótlással)**: `2 × 10`-es keret és kétugrásos számegyenes (`7 + 5 = 7 + 3 + 2 = 12`, `8 + 5 = 8 + 2 + 3 = 13`).
- **Háromtagú összegek** 10-es párok keresésével, 20-as bontások, műveletcsaládok, kétoldalú egyenletek, nyitott mondatok (`0–20` tartományban), szabálytáblázatok, számpiramisok és egyértelmű 3×3-as bűvös négyzet.
- **2 interaktív labor**:
  1. *Tízesátlépés a 20-as keretben* — korongok pakolása és összegellenőrzés véletlenszerű feladatokkal.
  2. *Egyensúly-mérleg* — kétoldalú egyenlőségek megoldása élőben billenő mérleggel.

## Fájlok és teszt
- `Add20G2Parts.tsx` — megosztott SVG elemek (`TwentyFramePart`, `TwoRowBeadsPart`)
- `Add20G2Figures.tsx` — tananyag-ábrák (`TenPlusOnesBeadsSvg`, `AnalogyNoCrossSvg`, `BridgingTwentyFrameSvg`, `TwoHopNumberLineSvg`, `AdditionPyramidSvg`, `MagicSquareSvg`)
- `Add20G2CardFigures.tsx` — kártyaképek a Párosító (`150 × 80`) és Csoportosító (`80 × 80`) játékokhoz
- `Add20G2Theory.tsx` — interaktív tananyag
- `Add20G2Matcher.tsx` — 3 × 8 párosító (`g2-c20-osszeadas20-matcher`)
- `Add20G2Sorter.tsx` — 3 × 3 × 9 csoportosító (`g2-c20-osszeadas20-sorter`)
- `Add20G2Quiz.tsx` — 30 kérdéses kvíz (`g2-c20-osszeadas20-quiz`)
- Teszt: `src/test/grade2Topic1Add20G2.test.tsx`

## Eltérések a tankönyvtől
- **Szigorú 0–20 számkör**: A munkafüzet 14. oldalának 3. feladatában két sorozat **21**-gyel indul (`21, 19, 17, ...` és `21, 18, 15, ...`), holott a fejezet címe *0-tól 20-ig*. A DiákZóna tananyaga és minden feladata szigorúan a **0–20** számkörön belül marad (sem az összeg, sem a sorozatok tagjai nem lépik túl a 20-at).
- **Egyértelmű 3×3-as bűvös négyzet**: A tankönyv 16. oldalának 4. feladatában a bűvös négyzetek túl kevés megadott számot tartalmaznak, így több különböző kitöltés is lehetséges külön szabály nélkül. A DiákZóna bűvös négyzetei elegendő megadott cellát tartalmaznak ahhoz, hogy minden hiányzó mező egyértelműen kiszámítható legyen.
- **Egyesített vagy saját kontextus**: A tankönyv a 12–17. oldalakon keverve tárgyalja az összeadást és a kivonást; itt külön altémában gyakoroljuk mélyebben az összeadást, kizárólag saját nevekkel, számokkal és képekkel.
- **Jelölés és interaktivitás**: Betűs változók (`a, b, x`), LaTeX-jelölés, szorzás/osztás nélkül dolgozunk; az ismeretlent `□`, `△`, `●` és `?` jelöli, a papíron statikus tízesátlépést pedig élő 20-as keretes és mérleges labor teszi kipróbálhatóvá.

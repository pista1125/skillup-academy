# 3. Kivonás 10-es számkör (2. osztály, I. Számolás 0-tól 20-ig)

**Források (útmutató):** tankönyv OH-MAT02TA/I 10–11. oldal, munkafüzet OH-MAT02MA/I 6. és 14/1. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 10–11. (kivonás részei):** képes műveletcsaládok (összeadás és kivonás együtt), számegyeneshez kapcsolt kivonások, páros/páratlan eredmények, nyitott egyenlőtlenségek (`10 − 7 > □`), kifejezések összehasonlítása (`<, =, >`), 10-es gyöngysor kivonásai.
- **MF 6. és 14/1.:** képes 4-es műveletcsaládok, számegyenesre kötés, hiányzó kisebbítendő és kivonandó pótlása (`7 − □ = 1`, `□ − 5 = 2`, `□ − 4 = 0`), valamint a 10-es kivonókerék (`10 − 2..9`).

## Mit csinál a DiákZóna lecke?

Saját számokkal, saját ábrákkal és hétköznapi helyzetekkel gyakoroltatja a 0–10 közötti kivonást: az elvétel, a hiányzó rész és a különbség értelmezését, a 4 tagú műveletcsaládot, az összeadással történő ellenőrzést, a 0 kivonását és önmagából való kivonást, a számegyenesen való visszalépést, a 10-es kivonókereket, valamint a nyitott egyenlőtlenségeket.

## Komponensek

1. **`Sub10G2Parts.tsx`** – megosztott rajzelemek (`DiscG`, `Line010G`).
2. **`Sub10G2Figures.tsx`** – 5 teljes méretű tananyagábra: `CrossedDiscsSubSvg`, `BeadStringSubSvg`, `FactFamilyCardSvg`, `BackwardJumpLineSvg`, `RadialTenWheelSvg`.
3. **`Sub10G2CardFigures.tsx`** – kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz: `CrossedDiscsCard`, `TenFrameSubCard`, `WheelStepCard`.
4. **`Sub10G2Theory.tsx`** – elméleti összefoglaló, csapdadoboz (`□ − 4 = 3`), mintapéldák és 2 interaktív labor:
   - **Labor I – Vedd el a korongokat!** Kattintható korongok áthúzással, azonnali visszajelzéssel és összeadásos ellenőrzéssel.
   - **Labor II – Pótold a hiányzó számot és ellenőrizd!** Véletlen feladatok (`9 − 4 = □`, `8 − □ = 5`, `□ − 3 = 4`) 0–10 számegyenessel és 0–10 számgombokkal.
5. **`Sub10G2Quiz.tsx`** – `SUB10_G2_QUESTIONS`: 30 kérdés (10/10/10), 20 ábrás kérdéssel, `questionTypeBadge` címkékkel és 3 puskával. Azonosító: `g2-c20-kivonas10-quiz`.
6. **`Sub10G2Matcher.tsx`** – `SUB10_G2_MATCHER_LEVELS`: 3 szint × 8 pár (ábrás és szöveges kártyák). Azonosító: `g2-c20-kivonas10-matcher`.
7. **`Sub10G2Sorter.tsx`** – `SUB10_G2_SORTER_LEVELS`: 3 szint × 3 kategória × 9 elem (különbség értéke, nulla-páros-páratlan, összehasonlítás 4-gyel). Azonosító: `g2-c20-kivonas10-sorter`.

**Teszt:** `src/test/grade2Topic1Sub10G2.test.tsx`

## Eltérések a tankönyvtől

- **Összeadás és kivonás külön leckében:** a tankönyv 10–11. oldalán az összeadás és a kivonás együtt szerepel. A DiákZóna a kivonásnak külön tananyagot és kvízt szentel a biztos alapozásért, miközben a műveletcsaládokon keresztül megőrzi a szoros kapcsolatot az összeadással.
- **Saját feladatok és szereplők:** a könyv szereplőit és feladatait nem vettük át; minden ábra és szöveges helyzet eredeti.
- **Betűs képletek és LaTeX nélkül:** a korábbi vázlatos `README.md` betűs jelöléseket (`a − 0 = a`, `a − a = 0`) és LaTeX-et használt; ezeket 2. osztályos jelölésre (`9 − 0 = 9`, `7 − 7 = 0`, `□`) cseréltük.
- **Nyitott egyenlőtlenségek (`10 − 7 > □`):** külön kiemeljük, hogy a `0` is a `0–10` számkör része, így a `0` is jó megoldás.
- **Tudatos didaktikai bővítés:** a két interaktív laborban a tanuló közvetlenül húzhatja át a korongokat, illetve a 0–10 számegyenesen ellenőrizheti a hiányzó kisebbítendőt és kivonandót, minden jó megoldásnál látva az összeadásos ellenőrzést.

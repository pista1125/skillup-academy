# 6. Szöveges feladatok (0-tól 20-ig)

## Források (útmutatóként)
- **Tankönyv I (`OH-MAT02TA_I`)**: 18–19. o. (*Szöveges feladatok – A játszótéren*, *Szöveges feladatok – Az uszodában*)
- **Munkafüzet I (`OH-MAT02MA_I`)**: 9–15. o. szöveges és grafikonos feladatai (9/1–3, 10/2, 10/4, 11/3, 13/1, 13/3, 14/2, 15/1, 15/3)

## Tananyag és feladatok köre
- Szöveges feladat megoldásának **5 lépése**: adatok kigyűjtése, kérdés megértése, terv (nyitott mondat `□`-tal), számolás és ellenőrzés, szöveges válasz.
- **20-as négyzetrácsos szalagmodell** kapcsos zárójellel és **összehasonlító szalagok**.
- Egylépéses feladatok: egyesítés (`összesen`), elvétel (`mennyi maradt?`), hiányzó rész (`mennyi hiányzik?`), közvetlen összehasonlítás (`több`, `kevesebb`).
- **Fordított összehasonlítás csapdája**: *„Vince 14 kagylót gyűjtött, 5-tel többet, mint Sára”* → Sárának kevesebb van (`14 − 5 = 9`).
- **Kétlépéses feladatok**, próbálgatás táblázattal, oszlopdiagram-olvasás, és **egyenlő két részre osztás** párosítással (`□ + □ = egész`, osztásjel nélkül), szigorúan a `0–20`-as számkörben.

## Komponensek
- `WordProblems20G2Parts.tsx` — megosztott SVG elemek (`UnitStrip20Part`, `BracePart`).
- `WordProblems20G2Figures.tsx` — 6 teljes méretű tananyagábra (5 lépéses lépcső, 20-as szalagmodell, fordított összehasonlítás, kétlépéses szalag, oszlopdiagram, próbálgató táblázat).
- `WordProblems20G2CardFigures.tsx` — kis kártyaképek a Párosító (`150×80`) és a Csoportosító (`80×80`) játékhoz.
- `WordProblems20G2Theory.tsx` — interaktív tananyag `TheoryTrapBox`-szal és 2 véletlengeneráló laborral (`Új feladat`, `Ellenőrzés`).
- `WordProblems20G2Quiz.tsx` — 30 feladat 3 szinten (`WORDPROBLEMS20_G2_QUESTIONS`), 3 puskával, ~67% ábrával.
- `WordProblems20G2Matcher.tsx` — 3 szint × 8 pár (`WORDPROBLEMS20_G2_MATCHER_LEVELS`).
- `WordProblems20G2Sorter.tsx` — 3 szint × 3 kategória × 9 elem (`WORDPROBLEMS20_G2_SORTER_LEVELS`).
- Teszt: `src/test/grade2Topic1WordProblems20G2.test.tsx`.

## Eltérések a tankönyvtől
- **Eredeti történetek és nevek:** A tankönyv és munkafüzet neveit, helyzeteit nem vettük át; új, 2. osztályos mindennapi helyzetekkel (falevél, gesztenye, kagyló, zsetonos vásár, osztályszavazás) dolgozunk.
- **Szigorú 0–20 számkör:** A munkafüzet 14. oldal 3. feladatában szereplő 21-es kezdőértéket elkerültük; minden adat, részeredmény és válasz `0–20` között marad.
- **Kimeneti és táblázatos feltételek pontosítása:** A próba-táblázatban és válogatós feladatokban egyértelműen kimondjuk a feltételeket (például mindegyik színből legyen legalább 1, vagy `kék > sárga`).
- **Kiemelt fordított összehasonlítás és azonnali ellenőrzés:** A tankönyv csak a két példánál jelzi a kérdezős dobozzal a csapdát; a DiákZónában külön `TheoryTrapBox`, összehasonlító szalagmodell, és interaktív kétlépéses labor vezeti végig a gyereket a fordított összehasonlításokon.
- **Osztásjel nélküli egyenlő felezés:** A munkafüzet 15/1. feladatához hasonló egyenlő elosztást korongpárosítással és `□ + □ = egész` gondolkodással tanítjuk, hiszen a `:` jel csak későbbi témakörben jelenik meg.

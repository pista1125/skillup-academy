# 1. Számok 0-tól 20-ig (2. osztály, I. Számolás 0-tól 20-ig)

**Források (útmutató):** tankönyv OH-MAT02TA/I 4–9. oldal, munkafüzet OH-MAT02MA I. kötet 3–5. és 12/4. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 4–5.:** tárgyak számlálása 0-tól 20-ig, `1`-es és `10`-es korongok (`20 egyes = 2 tízes`), oszlopdiagram kiszínezése, összehasonlítás (`<, =, >`), igaz és hamis állítások kép alapján.
- **TK 6–7.:** 4×5-ös 1–20 táblázat hiányzó számokkal, növekvő összekötés és minta folytatása, utca páros és páratlan házszámai a számegyenesen (`0–20`), egyes számszomszédok, csökkenő sorrend, nyitott mondat (`10 < ● < 15`).
- **TK 8–9.:** kakukktojás (páros és páratlan felhők), 4 csoportos lufi-válogatás (egyjegyű és kétjegyű × páros és páratlan), útvonalak felsorolása színezéssel, darabszám és sorszám különbsége (`7` és `7.`).
- **MF 3–5. és 12/4.:** gyümölcsök és zöldségek számlálása tálcákon, számok leírása számmal és betűvel (`nulla`, `tizenegy`, ..., `húsz`), számszomszéd-házak és nyitott mondatok (`4 < □ < 6`), rács-sorszám (`3. sor 4. helye`).

## Mit csinál a DiákZóna lecke?

Saját számokkal, képekkel és interaktív eszközökkel gyakoroltatja a 0-tól 20-ig tartó számfogalmat: számlálás, `10 egyes = 1 tízes` beváltás, számok neve és helyiértéke, számegyenes, egyes számszomszédok, páros és páratlan számok (a `0`-val együtt), egyjegyű és kétjegyű számok, oszlopdiagram, 4×5-ös táblázat, valamint darabszám és sorszám (egydimenziós sorban és 2D rácsban).

## Komponensek

1. **`Numbers20G2Parts.tsx`** – újrahasznosítható SVG-elemek (`OneDisc`, `TenDisc`, `NumberLine0To20`).
2. **`Numbers20G2Figures.tsx`** – 6 teljes méretű tananyagábra: `DiscsPlaceValueSvg`, `NumberLine20Svg`, `EvenOddStreetSvg`, `Grid1To20Svg`, `BarCountChartSvg`, `OrdinalRowSvg`.
3. **`Numbers20G2CardFigures.tsx`** – kis kártyaikonok a Párosító (150×80) és a Csoportosító (80×80) játékhoz (`DiscsCard`, `DotsPairCard`, `LineArrowCard`, `OrdinalDotsCard`).
4. **`Numbers20G2Theory.tsx`** – szabályösszefoglaló, 3 mintapélda, csapdadoboz (`15` és `51`, `7` és `7.`), és **2 interaktív labor**:
   - **Labor I – Rakd ki a számot korongokkal!** (`10`-es és `1`-es korongok, `Beváltom: 10 db 1-es korong → 1 db 10-es korong`, `Ellenőrzés`, `Új feladat` 1-től 20-ig).
   - **Labor II – Találd meg a számegyenesen!** (kattintható `0–20`-as skála, egyes számszomszédok, helyiérték- és paritásfeladványok, `Ellenőrzés`, `Új feladat`).
5. **`Numbers20G2Quiz.tsx`** – `NUMBERS20_G2_QUESTIONS`: 30 kérdés (10+10+10), 19 kérdésnél SVG-ábra, minden kérdésnél jelvény és magyarázat, 3 puska. Azonosító: `g2-c20-szamok-quiz`.
6. **`Numbers20G2Matcher.tsx`** – `NUMBERS20_G2_MATCHER_LEVELS`: 3 szint × 8 pár, szintenként legalább 5 képes kártyával. Azonosító: `g2-c20-szamok-matcher`.
7. **`Numbers20G2Sorter.tsx`** – `NUMBERS20_G2_SORTER_LEVELS`: 3 szint × 3 kategória × 9 elem, szintenként 6 képes kártyával. Azonosító: `g2-c20-szamok-sorter`.

**Teszt:** `src/test/grade2Topic1Numbers20G2.test.tsx`

## Eltérések a tankönyvtől

- **Tiszta, egyértelműen megszámolható jelenetek (TK 4/2. játszótér):** a tankönyvi játszótérkép hátterében a kerítésen kívüli járdán is sétálnak gyerekek, ezért a „Hány fiú van a játszótéren?” kérdés válasza nem teljesen egyértelmű. A DiákZónában minden számlálós ábra tiszta, keretezett tálcát vagy rácsot használ, így a darabszám mindig kétségtelen.
- **Szigorú `0–20`-as számkör:** minden feladat, példa és opció szigorúan a `0–20` tartományban marad; nincs benne szorzás (`·`), osztás (`:`), törtjel (`/`), kerekítés, római szám, LaTeX-jelölés vagy betűs képlet (`a, b, x`).
- **Vizuális válogatás szorzás helyett (TK 8/3., MF 4/4.):** a többféle kombinációt (például 3 fagyiízből 2 különböző gombóc) a 2. osztályos tananyaghoz igazodva párba állítással és felsorolással kérdezzük, szorzásjelek nélkül.
- **Egyértelmű 2D rács-számozás (MF 12/4.):** a sorokat (`1. sor`, `2. sor`, `3. sor`) és oszlopokat (`1.`, `2.`, ...) kifejezetten feliratozzuk a sorszámos rácskérdésekben.
- **Saját nevek és feladatok:** a tankönyv szereplőit és konkrét szövegeit nem vettük át; minden ábra, példa és kérdés saját készítésű.

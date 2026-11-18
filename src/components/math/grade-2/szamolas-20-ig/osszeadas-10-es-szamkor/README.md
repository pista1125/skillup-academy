# 2. Összeadás 10-es számkör (2. osztály, I. Számolás 0-tól 20-ig)

**Források (útmutatóként):** tankönyv OH-MAT02TA/I 10–11. oldal, 14/2. oldal; munkafüzet OH-MAT02MA/I 6. oldal, 8/1. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 10–11. oldal:** két csoportról összeadások írása és a tagok felcserélhetősége; kártyák kapcsolása a 0–10-es számegyenes pontjaihoz; összegek páros vagy páratlan voltának vizsgálata; nyitott mondatok a 0–10-es számkörben; műveletek összehasonlítása `<, =, >` jelekkel (köztük `+ 0` esetek); 10-es gyöngysor kiegészítése.
- **TK 14/2. oldal:** számházak a 10 előállítására (összeadásokkal).
- **MF 6. oldal, 8/1. oldal:** képről összeadás, három szám kiválasztása adott összegre (7, 9, 10), számegyenes-párosítás, pótlás (`3 + □ = 8`, `□ + 5 = 6`), valamint a 10 bontáspárjai.

## Mit csinál a DiákZóna lecke?

Saját számokkal, saját figurákkal és gyermekközeli helyzetekkel gyakoroltatja a 0-tól 10-ig terjedő összeadást: a `tag + tag = összeg` elnevezést, a tagok felcserélhetőségét, a 0 hozzáadását, a 10 bontáspárjait gyöngysoron, tízes kereten és számházban, a 0–10-es számegyenesen való előreugrást, a háromtagú összeadásokat, a pótlást (`□`), az összehasonlítást, a nyitott mondatokat és az összeg paritását.

## Komponensek

1. **`Add10G2Parts.tsx`** – közös rajzelemek (`DiscGroupSvg`, `BeadString10G`, `TenFrameG`).
2. **`Add10G2Figures.tsx`** – 6 elméleti ábra: `JoiningGroupsSvg`, `CommutativeAndZeroSvg`, `TenBeadStringSvg`, `TenBondHouseSvg`, `JumpNumberLine10Svg`, `ComparisonCardSvg`.
3. **`Add10G2CardFigures.tsx`** – kis kártyaképek a Párosító (`150×80`) és a Csoportosító (`80×80`) játékhoz: `DiscAddCard`, `TenFrameCard`, `DicePairCard`, `JumpLineCard`, `NumberBondCard`.
4. **`Add10G2Theory.tsx`** – elmélet + két interaktív labor:
   - **Labor I – Pótold a gyöngysort!** Véletlen célösszeg (6–10) és adott zöld gyöngyök kiegészítése sárga gyöngyökkel, azonnali visszajelzéssel és „Új feladat” gombbal.
   - **Labor II – Válassz 3 kártyát!** Öt számkártyából pontosan három kiválasztása adott célszámhoz (7–10), élő összegzéssel és ellenőrzéssel.
5. **`Add10G2Quiz.tsx`** – `ADD10_G2_QUESTIONS`: 30 kérdés (10/10/10), 20 ábrával, badge-dzsel, 3 puskával. Azonosító: `g2-c20-osszeadas10-quiz`.
6. **`Add10G2Matcher.tsx`** – `ADD10_G2_MATCHER_LEVELS`: 3 szint × 8 pár (képről összeadás, 10 bontása és csere, három tag és pótlás). Azonosító: `g2-c20-osszeadas10-matcher`.
7. **`Add10G2Sorter.tsx`** – `ADD10_G2_SORTER_LEVELS`: 3 szint × 3 kategória × 9 elem (6-hoz viszonyítás, páros/páratlan/10, hiányzó tag). Azonosító: `g2-c20-osszeadas10-sorter`.

**Teszt:** `src/test/grade2Topic1Add10G2.test.tsx`

## Eltérések a tankönyvtől

- **Összeadás és kivonás külön leckében:** a tankönyv (10–11. o.) és a munkafüzet (6. o.) egyben tárgyalja a 10-es számkör összeadását és kivonását. A DiákZóna tanmenete különválasztja a két műveletet (2. lecke: Összeadás 10-es számkör, 3. lecke: Kivonás 10-es számkör), hogy a gyerekek előbb biztosan rögzítsék a 10-es bontásokat és az összeadási tényeket.
- **Szigorú 0–10-es számkör:** a munkafüzet 6/3. feladatának számegyenese 11-ig tart (`3 + 7`-ig vannak a műveletek), a 14/2. számházban pedig 10-nél nagyobb számokból történő kivonás is szerepel. Ebben a leckében minden tag és minden összeg szigorúan 0 és 10 közé esik.
- **Betűs képletek elhagyása:** a tankönyvhöz hasonlóan nem használunk betűs változókat, csak `□`, `△`, `○` jelöléseket és konkrét számpéldákat.
- **Tudatos didaktikai változtatások:**
  - A 10-es bontást egyszerre támogatja a gyöngysor, a 2×5-ös tízes keret és a számház.
  - A háromtagú összeadás és a pótlás interaktív laborban is gyakorolható azonnali, hibára szabott visszajelzéssel.
  - Saját feladatokat és saját neveket (Bence, Lilla, Nóra, Gergő) használunk; a könyv feladatait és szereplőit nem vettük át.

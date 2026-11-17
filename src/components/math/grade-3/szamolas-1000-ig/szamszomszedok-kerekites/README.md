# 2. Számszomszédok, kerekítés (3. osztály, XI. Számolás 0-tól 1000-ig)

**Források:** tankönyv OH-MAT03TA 111. oldal, munkafüzet OH-MAT03MA II. kötet 36–37. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 111.:** három számegyenes (540–660, 740–860, 880–1000) sűrű osztással és betűkkel jelölt pontokkal; egyes, tízes, százas szomszédok; kerekítés tízesre és százasra; „tízesre kerekítve 570”, „százasra kerekítve 800” – hány elem lehetett; igaz/hamis állítások a kerekítésről; dobókockás háromjegyű szám és „Biztos / Lehet, de nem biztos / Lehetetlen”.
- **MF 36.:** számegyenes 750–900, szomszédtáblázat (764, 810, 857, 899), közelebbi tízes / százas szomszéd bekeretezése, kerekítés tízesre és százasra (611 … 999), letakart jegyes számok („2□5 tízesre 300”, „□17 százasra 300”, „a legnagyobb szám, amely tízesre 370”).
- **MF 37.:** öt-öt szám adott kerekített értékhez (740, 990, 700, 900), a legkisebb és legnagyobb szám (tízesre 820, százasra 600), számok az 1, 6, 8 jegyekből és kerekítésük, valószínűség építőelem-zacskóval.

**Újdonság az V. fejezethez (500-ig) képest:** a szomszédok és a kerekítés 1000-ig; **az 1000 mint kerekített érték** (995–999 tízesre, 950–999 százasra); sűrűbb (2-es, 5-ös) osztású számegyenesek; a „legkisebb / legnagyobb szám adott kerekített értékhez” önálló feladattípus.

## Mit csinál a DiákZóna lecke?

Saját számokkal és helyzetekkel gyakoroltatja a hat szomszédot, a tízesre és százasra kerekítést (szabály: „Tízesre nézd az egyest, százasra a tízest!”), a kerekítést az 1000 közelében, a kétféle kerekítés összevetését (és a kétszeri kerekítés csapdáját), a visszafelé gondolkodást (melyik számokból lesz 600), a letakart jegyes „biztos / lehet / lehetetlen” döntést és a becslést (árak, oldalszámok).

## Komponensek

1. **`Rounding1000G3Parts.tsx`** – `roundTen`, `roundHundred`, a laborok generátorai (`makeTwoWay`, `makeGuess`, `guessFits`). A rajzelemeket az 1. lecke `Numbers1000G3Parts.tsx` fájljából veszi.
2. **`Rounding1000G3Figures.tsx`** – `NeighboursSvg` (a 683 hat szomszédja), `TenRoundSvg` (871–874 le, 875–879 fel), `HundredRoundSvg` (738 ≈ 700, 762 ≈ 800), `NearThousandSvg` (996 és 952 ≈ 1000), `TwoWaysSvg` (849 ≈ 850 és 849 ≈ 800), `BackwardsSvg` (550-től 649-ig ≈ 600).
3. **`Rounding1000G3CardFigures.tsx`** – `MiniRoundLine`, `MiniHidden` (párosító), `SortLine` (csoportosító); a csoportosító az 1. lecke `SortCards` ábráját is használja.
4. **`Rounding1000G3Theory.tsx`** – szomszédok (táblázat, kerek szám szomszédai), kerekítés tízesre, százasra, közel az 1000-hez, kétféle kerekítés, visszafelé, biztos / lehet / lehetetlen, 3 mintapélda (965 kétféleképpen; kb. 430 matrica; becslés a boltban), „Vigyázz!” (849 ≈ 850 ≈ 900 hiba; 997 ≈ 1000).
   - **Labor I – Kerekítsd kétféleképpen!** Véletlen szám (sok csapdaszám: tízes jegye 4 és egyes jegye 5–9, illetve 950 fölötti). A szám a számegyenesen áll; két sor gomb: tízesre és százasra. Célzott tippek: „Ez kerek százas, most a tízes szomszédok közül válassz”, „Ez tízesre kerekített érték”, „Ne kerekíts kétszer!”, „Nézd a tízest: 4 …”. Sorozatszámláló.
   - **Labor II – Gondoltam egy számra.** „A számom tízesre (százasra) kerekítve 740.” Nyolc számkártyából mind ki kell jelölni, amelyik lehet. Ellenőrzés után zöld = jó, piros = rossz, kék keret = kimaradt; „Javítok” gomb; a végén a szabály (735-től 744-ig).
5. **`Rounding1000G3Quiz.tsx`** – `ROUNDING_1000_G3_QUESTIONS`: 30 kérdés (10/10/10), 20 kérdésnél ábra (számegyenes, számkártya, árcédula, könyvek), minden kérdésnél badge, 3 puska. Azonosító: `g3-c1000-kerekites-quiz`.
6. **`Rounding1000G3Matcher.tsx`** – `ROUNDING_1000_G3_MATCHER_LEVELS`, 3 szint × 8 pár (tízesre; százasra; „gondoltam egy számra” letakart jeggyel és legkisebb/legnagyobb számmal), szintenként 4 képes kártya. `g3-c1000-kerekites-matcher`.
7. **`Rounding1000G3Sorter.tsx`** – `ROUNDING_1000_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 3 elem (≈ 700 / 800 / 900; tízesre le / fel / marad; letakart jegy: biztosan / lehet / biztosan nem ≈ 600), szintenként 6–9 képes elem. `g3-c1000-kerekites-sorter`.

**Teszt:** `src/test/grade3Topic11Rounding1000G3.test.tsx`

## Eltérések a tankönyvtől

- **Nincs egyértelmű megoldás (MF 36/1. c):** „keretezd be azt a tízes számszomszédot, amely a számhoz közelebb esik” – a 810 kerek tízes, két tízes szomszédja (800 és 820) **egyforma messze** van. Nálunk kimondjuk: a kerek tízes tízesre kerekítve marad (810 ≈ 810), a szomszédai egyforma messze vannak.
- **Tört a XIV. fejezet előtt (TK 111/3.):** „A 195 tízesre kerekített értéke megegyezik a **négyszáz felével**.” A „fele” itt egy mennyiség törtrésze, ami csak a XIV. fejezetben jön. Nálunk ilyen állítás nincs.
- **Ki nem írt osztásérték (TK 111/1.):** a számegyeneseken 2-es (illetve 5-ös) a kis osztás, de ezt a gyereknek kell kitalálnia, és a betűk a sűrű vonalak között nehezen olvashatók. Nálunk a kérdés mindig megmondja, mennyit ér egy kis osztás, és kevés, jól látható osztás van.
- **Témán kívüli valószínűség (MF 37/7.):** színes építőelemek húzása zacskóból – nem kerekítés. Nem vettük át; a „biztos / lehet / lehetetlen” gondolkodást letakart jegyes kerekítéssel gyakoroltatjuk (a TK 111/4. b nyomán).
- **Kétféle szóhasználat:** a tankönyv „szomszéd”, a munkafüzet „számszomszéd” szót használ. Nálunk egységesen: egyes, tízes, százas szomszéd.
- **Tudatos didaktikai változtatások:**
  - A könyv nem mondja ki, melyik jegyet kell nézni. Nálunk: „Tízesre nézd az egyest, százasra nézd a tízest!”, ábrával (849).
  - A kétszeri kerekítés (849 ≈ 850 ≈ 900) tipikus hibáját csapdadoboz, laborbeli célzott tipp és rossz válaszlehetőség is mutatja.
  - Az 1000 körüli kerekítés (995–999, 950–999) külön szakaszt kapott, mert itt jelenik meg először.
  - A „melyik számokra gondolhattam” (MF 37/5.) feladatból koppintós labor lett azonnali, elemenkénti visszajelzéssel.
  - Saját számok és helyzetek; a könyv szereplőit (Feri, Zsófi) és az építőelemes történetet nem vettük át.

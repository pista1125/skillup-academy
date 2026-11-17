# 2. Számok helye a számegyenesen (3. osztály, III. Számolás 0-tól 200-ig)

**Források:** tankönyv OH-MAT03TA 32. oldal, munkafüzet OH-MAT03MA I. kötet 39. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 32/1.:** két számegyenes (0–100 és 100–200, tízes beosztás), betűkkel jelölt pontok leolvasása, összevetés a számtáblával.
- **TK 32/2.:** a számegyenes színes részére eső számok felsorolása (különböző kezdőpontok).
- **TK 32/3.:** távolugrás mérőszalagon 0–200 cm (195, 165, 180, 155 cm).
- **TK 32/4.:** számegyenes-részletek „négyzetekkel” – ötös (175 … 190) és huszonötös (100 … 200) lépésköz.
- **MF 39.:** egyes beosztású számegyenesek (0–100, 100–170) leolvasása, növények helye a számegyenesen és „melyik szám áll közöttük”, igaz-hamis állítások (között, ugyanolyan távolságra), számok bejelölése 100–200 között, szöcskeugrások jobbra-balra.

## Mit csinál a DiákZóna lecke?

Saját számokkal: a számegyenes 0–200, „mennyit ér egy osztás?” (1, 2, 5, 10, 20, 25 lépésköz), ránagyítás egy tízes szakaszra, mérőszalag cm-ben, szöcskeugrások (egy és két lépésben), „között”, „pont középen”, „ugyanolyan messze”, legközelebbi szám.

## Komponensek

1. **`NumberLine200G3Figures.tsx`** – `NumberLine0to200Svg` (0–200 tízesével, A–D pontok), `ZoomLineSvg` (100–200 → ránagyítás a 140–150 részre, 146), `ScaleStepsSvg` (1-es, 5-ös, 10-es beosztás), `TapeMeasureSvg` (mérőszalag, 165 cm), `GrasshopperSvg` (152-től 5-öt jobbra), `MiddleSvg` (165 a 160 és 170 között középen).
2. **`NumberLine200G3Parts.tsx`** – általános számegyenes-rajzoló (`NLine`), ugrásív, szöcske, mérőszalag.
3. **`NumberLine200G3CardFigures.tsx`** – kártyaábrák: `LineCard`, `HopCard` (párosító), `DotLineCard`, `ScaleCard`, `HopSmallCard` (csoportosító).
4. **`NumberLine200G3Theory.tsx`** – Mit tanulunk?, a számegyenes 0–200, mennyit ér egy osztás, ránagyítás, mérőszalag, szöcskeugrás, pont középen, 3 mintapélda, „Vigyázz!” (100 és 120 között 4 lépés: a „?” 115, nem 103; lépést számolj, ne vonást).
   - **Labor I – Tedd a helyére!** Véletlen 20 egységnyi számegyenes-részlet 0 és 200 között; a gyerek a vonásra koppint; hibánál megmondja, hány lépéssel és merre van a keresett szám. „Új feladat”.
   - **Labor II – Mennyit ér egy osztás?** Véletlen beosztás (2, 5, 10, 20), két felírt szám, „?” egy vonásnál; 4 válaszgomb a tipikus hibákkal (1-et ér egy osztás, egy vonással elcsúszott, 10-et ér egy osztás); a tipp a konkrét hibára utal. „Új feladat”.
5. **`NumberLine200G3Quiz.tsx`** – `NUMBER_LINE_200_G3_QUESTIONS`: 30 kérdés (10/10/10), 28 kérdésnél ábra, minden kérdésnél badge, 3 puska. Azonosító: `g3-c200-szamegyenes-quiz`.
6. **`NumberLine200G3Matcher.tsx`** – `NUMBER_LINE_200_G3_MATCHER_LEVELS`, 3 szint × 8 pár (előtte/utána/között; pont középen; szöcskeugrások), szintenként 4 képes kártya. `g3-c200-szamegyenes-matcher`.
7. **`NumberLine200G3Sorter.tsx`** – `NUMBER_LINE_200_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 9 elem (0–100 / 100–150 / 150–200; lépésköz 1 / 5 / 10; a szöcske 150 alá / pont 150-re / 150 fölé érkezik), szintenként 4 képes elem. `g3-c200-szamegyenes-sorter`.

**Teszt:** `src/test/grade3Topic3NumberLine200G3.test.tsx`

## Eltérések a tankönyvtől

- **Értelmetlen hosszú vonások (TK 32/2. a):** a 0–100 számegyenesen a 60-nál és a 80-nál hosszabb a vonás, a kerek ötvenes (50) viszont nincs kiemelve. Ez félrevezeti a gyereket („ott valami fontos szám van”). Nálunk a hosszabb vonás mindig ugyanazt jelöli: kerek tízest, illetve az ábrán jelzett kerek ötvenest/százast.
- **Hiányzó lépés: „mennyit ér egy osztás?”** A könyv már a 32/4. b) feladatban 25-ös lépésközt kér (100 és 200 között 4 lépés), de a beosztás leolvasásának módját sehol nem tanítja. Nálunk külön szakasz, ábra, csapdadoboz és Labor tanítja: „Keress két felírt számot, számold meg a lépéseket!” – összeadással (5 + 5 + 5 + 5 = 20), osztás nélkül.
- **Számegyenes betűs pontjai (TK 32/1.):** a „B” és az „E” két vonás közé esik (25, 85); a könyv nem mondja, hogy ilyenkor a két vonás közepét kell nézni. Mi ezt a „pont középen” résszel előbb megtanítjuk, és csak utána kérdezünk ilyet.
- **Szöcskeugrás (MF 39/4. b):** a könyv csak szöveggel kérdez; nálunk az ugrások ívekkel látszanak, és külön figyelmeztetünk: a lépéseket számold, ne a vonásokat (a kiinduló számot nem számoljuk bele).
- **Tudatos didaktikai változtatások:**
  - A ránagyítás ábrája megmutatja, hogyan lesz egy tízes szakaszból egyesével beosztott számegyenes.
  - A mérőszalagon 5 cm-es beosztás van, a leolvasást a 100 cm-től és 150 cm-től kiindulva tanítjuk.
  - Saját számok és helyzetek; a könyv szereplőit (Ágnes, Béla, Csaba, Dénes) és a növényes feladatot nem vettük át.

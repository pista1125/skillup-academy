# 2. A szorzat becslése (3. osztály, XIII. Írásbeli szorzás)

**Források:** tankönyv OH-MAT03TA 124. oldal, munkafüzet OH-MAT03MA II. kötet 50–51. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 124.:** 2 · 335 Ft = 335 Ft · 2 becslése százasra (335 ≈ 300, 300 · 2 = 600) és tízesre (335 ≈ 340, 340 · 2 = 680); „Melyik becslés a pontosabb?”; árak (235, 345, 265, 180 Ft) · 3 becslése százasra; 10 szorzat becslése tízesre (321 · 2 … 114 · 7); „kétszer annyi” szöveges feladat (124 alsós); könyvjelző 165 Ft · 2, 3, 4, 5 százasra és tízesre.
- **MF 50.:** képeslap 185 Ft, 1–5 db táblázat százasra; szöveges feladatok tízesre (215 · 4, 302 · 3, 113 · 2); becsült szorzatok összekötése (132 · 3 ↔ 390 stb.).
- **MF 51.:** táblázat: becslés százasra és tízesre, és a kettő különbsége (244 · 2, 133 · 2, 132 · 3, 234 · 2, 212 · 4); könyvvásár árlistával (2 · 431, 3 · 332, 4 · 218, 2 · 302 + 3 · 125).

**A könyv módszere:** a háromjegyű tényezőt kerekítjük (az egyjegyűt nem), százasra vagy tízesre, és a kerek számmal fejben szorzunk. A tízesre kerekített becslés a pontosabb.

## Mit csinál a DiákZóna lecke?

Kerekítés felidézése számegyenesen (5-től felfelé) → két becslés ugyanarra a szorzatra, összevetés a pontos értékkel → **új: több lesz vagy kevesebb?** (lefelé kerekítettünk → a pontos több; felfelé → kevesebb) → mire jó a becslés (elég-e a pénz, ellenőrzés). Saját helyzetek: joghurt, füzet, sütemény, kis maci, gyöngyök, állatkert, bábszínház, kifestő és zsírkréta. Minden szám és szorzat legfeljebb 1000.

## Komponensek

1. **`ProductEstimateG3Parts.tsx`** – `roundTo`, `roundH`, `roundT` (5-től felfelé); kérdésábrák: `EstLineQ` (számegyenes-szakasz a kerekítéshez), `BarsQ` (becslések szalagokkal). A közös elemek a `szorzas-egyjegyu-szammal/MulOneDigitG3Parts.tsx`-ből jönnek.
2. **`ProductEstimateG3Figures.tsx`** – `RoundLinesSvg` (345 százasra és tízesre), `TwoEstimatesSvg` (345 · 2: 600, 700, pontos 690), `UpDownSvg` (lefelé → több, felfelé → kevesebb), `EnoughMoneySvg` (1000 Ft elég 4 füzetre?).
3. **`ProductEstimateG3CardFigures.tsx`** – `CardRound`, `CardTag` (párosító), `SortTag`, `SortTagMul` (csoportosító).
4. **`ProductEstimateG3Theory.tsx`** – tananyag + 2 labor:
   - **Labor I – Becslőgép:** véletlen háromjegyű szám · 2…4 (minden érték ≤ 1000), „Százasra / Tízesre” kapcsoló, számegyenes. 1. lépés kerekítés, 2. lépés a kerek szám szorzása; a végén a pontos szorzat és a különbség. Célzott tipp a számegyenes közepéről.
   - **Labor II – Több vagy kevesebb?** A gép megmutatja a tízesre kerekített becslést, a gyerek eldönti, hogy a pontos szorzat több vagy kevesebb lesz; magyarázat és pontszám.
5. **`ProductEstimateG3Quiz.tsx`** – `PRODUCT_ESTIMATE_G3_QUESTIONS`: 30 kérdés (10/10/10), 23 ábrával, badge mindenhol, 3 puska. `g3-wmul-becsles-quiz`.
6. **`ProductEstimateG3Matcher.tsx`** – `PRODUCT_ESTIMATE_G3_MATCHER_LEVELS`: kerekítés tízesre (számegyenes-kártyák); becslés százasra (árcédulák); becslés tízesre. `g3-wmul-becsles-matcher`.
7. **`ProductEstimateG3Sorter.tsx`** – `PRODUCT_ESTIMATE_G3_SORTER_LEVELS`: kerekítés százasra (≈ 300 / 400 / 500); becslés tízesre (≈ 600 / 800 / 900); a pontos szorzat több lesz / kevesebb lesz / pont annyi. `g3-wmul-becsles-sorter`.

**Teszt:** `src/test/grade3Topic13ProductEstimateG3.test.tsx`

## Eltérések a tankönyvtől

- **Számkörből kilógó feladat (TK 124/2.):** 345 Ft · 3 – a százasra kerekített becslés 300 · 3 = 900, de a pontos ár 1035 Ft, ez túl van az 1000-es számkörön. Ráadásul a becslés azt sugallja, hogy „belefér 1000-be”, pedig nem: épp ez a lefelé kerekítés csapdája. Nálunk minden pontos szorzat is legfeljebb 1000, és külön megtanítjuk: lefelé kerekítéskor a pontos érték több lesz.
- **Hiányzó „miért” (TK 124/1. b):** a könyv megkérdezi, melyik becslés a pontosabb, de nem mondja ki a választ. Nálunk ábrán látszik a két becslés és a pontos érték, és kimondjuk: a tízesre kerekítés pontosabb.
- **Kimondatlan kerekítési szabály (TK 124/5., MF 51/5.):** a 165 és a 125 pont a tízesek közepén van, a könyv nem emlékeztet, hogy ilyenkor felfelé kerekítünk. Nálunk ez tananyag, külön kvízkérdés (125 · 3, 165 · 5, 195 · 2) és párosító-kártya.
- **Tudatos didaktikai változtatások:**
  - Új rész: **„Több lesz vagy kevesebb?”** – a kerekítés irányából megmondjuk, hogy a pontos szorzat nagyobb vagy kisebb a becslésnél (Labor II, csoportosító 3. szint). Erre épül az „Elég a pénz?” feladattípus.
  - **Ellenőrzés becsléssel:** hibás számolások felismerése (198 · 4 = 492?), előkészítve a 3. lecke írásbeli szorzását.
  - Csapda: „A kis számot ne kerekítsd!” (236 · 3 ≈ 240 · 0 hibája), és a ≈ jel jelentése.
  - Saját szereplők és helyzetek; a könyv szereplői (Mona, Manó, Emese, Petra stb.) és adatai nem szerepelnek.

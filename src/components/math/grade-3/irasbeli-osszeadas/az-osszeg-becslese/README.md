# 2. Az összeg becslése (3. osztály, VII. Írásbeli összeadás)

**Források:** tankönyv OH-MAT03TA 76. oldal, munkafüzet OH-MAT03MA I. kötet 82–83. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 76.:** 295 Ft + 132 Ft becslése kétféleképpen: **százasra** kerekített tagokkal (300 + 100 = 400, „B: 400”) és **tízesre** kerekített tagokkal (300 + 130 = 430, „B: 430”); melyik becslés a pontosabb; csuprok árai egy ágasfán (szín és minta szerint választott csuprok árának becslése); fajátékok árai, két játék árának becslése százasra, majd tízesre.
- **MF 82.:** becslés százasra kerekített tagokkal kockákon (128 + 256 … 247 + 335); tízesre kerekítés táblázatban, becslés tízesre; bábok: becsült összeg színezése a 0–500-as táblázatban.
- **MF 83.:** háromjegyű számok a 0, 1, 2, 3 jegyekből, összeadások, amelyek becsült összege 500; „Meg tudja-e venni Jutka az 500 forintos tollat?” tízesre kerekítve; társasjáték-pálya becslendő összegekkel.

## Mit csinál a DiákZóna lecke?

Saját számokkal (füzet 187 Ft + toll 238 Ft, könyv + ceruza, játékok, kirándulók, bögrék) tanítja a becslés két lépését: 1. kerekítsd mindkét tagot (tízesre: nézd az egyest; százasra: nézd a tízest), 2. add össze a kerekített számokat; jelölés: ≈ és **B:**. Számegyenesen mutatja, melyik becslés van közelebb a pontos összeghez, és hogy ez **nem mindig** a tízesre kerekített. Két alkalmazás: „Elég az 500 Ft?” (és mikor kell mégis pontosan számolni) és **hibakeresés becsléssel**. Minden szám 500-on belül.

## Komponensek

1. **`SumEstimateG3Parts.tsx`** – `ELine` (számegyenes pontokkal, alá írt felirattal), `ApproxPair` („a ≈ b”), `Wallet` (pénztárca bankjeggyel), `roundTen`, `roundHundred`. (A közös rajzelemek a `../haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Parts.tsx`-ből jönnek.)
2. **`SumEstimateG3Figures.tsx`** – `EstimateTwoWaysSvg` (187 + 238 százasra és tízesre), `EstimateLineSvg` (B: 400, pontos 425, B: 430 a számegyenesen), `NotAlwaysSvg` (135 + 165: itt a százasra kerekített a pontosabb), `BudgetSvg` (236 Ft + 178 Ft, elég az 500 Ft?), `ErrorCheckSvg` (236 + 145 = 281? – a becslés leleplezi).
3. **`SumEstimateG3CardFigures.tsx`** – `MiniLine` (párosító: számegyenes-darab ponttal), `SortCalc` (csoportosító: kiszámolt összeadás füzetlapon). Árcédula-kártyák: `MiniTags`, `SortTags` az 1. leckéből.
4. **`SumEstimateG3Theory.tsx`** – miért becslünk, két út, melyik van közelebb, „nem mindig!”, 3 mintapélda (elég az 500 Ft?; ha nagyon közel a határ – 247 + 251; hibakeresés), „Vigyázz!” (a becslés nem = jel; az 5-ös szabály).
   - **Labor I – Becslő:** tízesre / százasra mód, véletlen feladat. Lépésenként: kerekítsd az 1. tagot (2 gomb), a 2. tagot (2 gomb), majd add össze (4 gomb). Végül számegyenesen a becslés és a pontos összeg, az eltéréssel. Célzott tippek („Nézd az egyest! 6 áll ott…”, „Ez a pontos összeg, most a kerekített számokat add össze!”).
   - **Labor II – Hibavadász:** véletlen összeadás „kiszámolt” eredménnyel (kb. a fele helyes, a többi 100-zal eltér). A gyerek becsül, és dönt: „Jó lehet” / „Biztosan hibás”. Visszajelzés a becsléssel és a pontos eredménnyel; sorozatszámláló.
5. **`SumEstimateG3Quiz.tsx`** – `SUM_ESTIMATE_G3_QUESTIONS`: 30 kérdés (10/10/10), 22 kérdésnél ábra (≈ kártyák, számegyenes, becslőkártya, árcédulák pénztárcával, füzetlap, szalagok), badge mindenhol, 3 puska. `g3-wadd-becsles-quiz`.
6. **`SumEstimateG3Matcher.tsx`** – `SUM_ESTIMATE_G3_MATCHER_LEVELS`: kerekítés (számegyenes-kártyák); becslés tízesre (árcédula-kártyák ↔ „B: …”); melyik a pontos összeg (becsléssel párosítható). `g3-wadd-becsles-matcher`.
7. **`SumEstimateG3Sorter.tsx`** – `SUM_ESTIMATE_G3_SORTER_LEVELS`: B: 300 / 400 / 500 (százasra); B: 370 / 380 / 390 (tízesre); hibavadász (jó lehet / túl kicsi / túl nagy). `g3-wadd-becsles-sorter`.

**Teszt:** `src/test/grade3Topic7SumEstimateG3.test.tsx`

## Eltérések a tankönyvtől

- **„Melyik becslés a pontosabb?” (TK 76/1. b):** a könyv példája azt sugallja, hogy a tízesre kerekített becslés a pontosabb – ez általában igaz, de nem mindig. Nálunk ellenpélda is van: 135 + 165 = 300, itt a százasra kerekített becslés (300) telitalálat, a tízesre kerekített (310) eltér.
- **Számkör-túllépés (MF 82/1. C, D, E):** 225 + 296 = 521, 198 + 312 = 510, 247 + 335 = 582 – kilépnek az addig tanult 500-as számkörből. Nálunk minden összeg legfeljebb 500.
- **Kétféle jelölés:** a tankönyv „B: 400”, a munkafüzet „B.: 400” alakban írja a becslést. Nálunk egységesen a tankönyvi **B:** jelölés.
- **Hiányzó figyelmeztetés:** a könyv „elég a pénz?” típusú feladataiban (MF 83/5.) nem esik szó arról, mi a teendő, ha a becslés nagyon közel van a határhoz. Nálunk külön mintapélda és kvízkérdés: 247 + 251 – a becslés 500, pontosan kell számolni (498, elég).
- **Tudatos didaktikai változtatások:**
  - A becslés két lépése (kerekítés, összeadás) a laborban külön lépésként jelenik meg, a végén számegyenes mutatja az eltérést.
  - A becslés mint **ellenőrzés** (hibakeresés) saját labort, kvízkérdéseket és csoportosító szintet kapott – ez a következő lecke (írásbeli összeadás) önellenőrzését készíti elő.
  - Az 5-ös szabályt (245 ≈ 250, 250 ≈ 300) külön kiemeljük, mert a becslésnél itt hibáznak a legtöbben.
  - Saját szereplők és helyzetek (Bori, Dani, kirándulás, bögrék); a könyv szereplői (Emese, Áron) és a kézművesvásár árai nem szerepelnek.

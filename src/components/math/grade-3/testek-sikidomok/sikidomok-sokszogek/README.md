# 3. Síkidomok, sokszögek (3. osztály, X. Testek, síkidomok)

**Források:** tankönyv OH-MAT03TA 104–105. oldal; munkafüzet OH-MAT03MA II/27–29. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 104/1.:** halmazábra: síkidomok, benne a sokszögek; keret: „Azokat a síkidomokat, amelyeket csak egyenes szakaszok határolnak, sokszögeknek nevezzük.” Síkidomok besorolása. **104/2.:** táblázat: háromszögek, négyszögek csúcsainak és oldalainak száma; „A sokszögeket oldalaik és csúcsaik száma szerint nevezik el.” Oldalak, csúcsok számolása.
- **TK 105/3.:** sokszögek, négyszögek, téglalapok, négyzetek kiválasztása. **105/4.:** sokszögek pálcikából. **105/5.:** igaz–hamis („Minden négyzet téglalap.”, „A kör nem tartozik a sokszögek közé.”). **105/6.:** kakukktojás soronként. **105/7.:** pálcikás rejtvények (négyzetek).
- **MF II/27–29.:** testek / síkidomok / vonalak; színezés és darabszám; táblázat (csúcsok, oldalak, sokszög neve); halmazábra (négyszögek, háromszögek); igaz–hamis; kakukktojás; alakzatok kiegészítése vonalzóval négyszöggé, háromszöggé, téglalappá, négyzetté; síkidomsor folytatása.

A könyv szavai: *síkidom, sokszög, egyenes szakasz / egyenes vonal, görbe vonal, oldal, csúcs, háromszög, négyszög, ötszög, hatszög, téglalap, négyzet, kör, egyenlő hosszúságú oldalak*. **Derékszög nincs** – nálunk sincs (a téglalap sarka „olyan, mint a füzetlap sarka”); a mappa korábbi README-je derékszöget és a kör tulajdonságait írta, ezek nem e lecke anyagai.

## Mit csinál a DiákZóna lecke?

Egyenes és görbe vonalak; síkidomok és sokszögek (csak egyenes vonalak határolják); oldalak és csúcsok (ugyanannyi), a nevek (háromszög … hatszög); a befelé mutató csúcs is csúcs; téglalap és négyzet, „minden négyzet téglalap”; pálcikás feladatok (külön sokszögek, maradékkal: „17 : 4 = 4, marad 1” – a könyv jelölése), hány háromszög / négyzet van egy ábrán.

## Komponensek

1. **`PolygonsG3Parts.tsx`** – síkidomkészlet (`SHAPES`: 26 síkidom, közte 9 nem sokszög; egységes kitöltőszín, hogy a szín ne árulja el a választ), `ShapeG` (opcionális csúcspöttyökkel), `Stick`, `StickGrid` (pálcikák), rajz-ellenőrzők: `straightVertex`, `selfCrossing`, `isRect`, `isSquare`.
2. **`PolygonsG3Figures.tsx`** – `LinesSvg`, `PlaneShapesSvg`, `SidesVerticesSvg`, `PolygonNamesSvg`, `RectSquareSvg`.
3. **`PolygonsG3CardFigures.tsx`** – `ShapeCard`, `LineCard`, `StickGridCard`, `TwoTrianglesCard`, `SplitTriangleCard`, `TwoShapesCard`.
4. **`PolygonsG3Theory.tsx`** – Mit tanulunk? (vonalak), síkidomok és sokszögek, oldalak és csúcsok, nevek, téglalap és négyzet, 3 mintapélda, „Vigyázz!” (a befelé mutató sarok is csúcs; nem minden négyszög téglalap).
   - **Labor I – Rajzolj a pöttyrácson!** Feladat pl. „Rajzolj ötszöget!”, „Rajzolj négyzetet!”, „Rajzolj olyan négyszöget, amelyik nem téglalap!”. A gyerek pöttyről pöttyre koppint, a kezdőpontra visszakoppintva bezárja a sokszöget. Ellenőrzés: ha egy ponton egyenesen megy tovább a vonal (ott nincs csúcs), pirossal jelzi; ha a vonalak keresztezik egymást, szól; különben megszámolja a csúcsokat, téglalapnál/négyzetnél a sarkokat és az oldalakat is (pl. „Ez téglalap, de nem egyenlő mind a 4 oldala.”). Visszavonás, Törlés, Új feladat.
   - **Labor II – Milyen síkidom ez?** Véletlen síkidom a 26-ból; gombok: nem sokszög / háromszög / négyszög / ötszög / hatszög. Rossz válasznál célzott segítség (görbe rész, „Ezt csak egyenes vonalak határolják”), és megjelennek a csúcspöttyök. Hibátlan sorozat számláló, Új feladat.
5. **`PolygonsG3Quiz.tsx`** – `POLYGONS_G3_QUESTIONS`: 30 kérdés (10/10/10), 25 kérdésnél ábra, badge-ek, 3 puska. `g3-geom-sokszogek-quiz`.
6. **`PolygonsG3Matcher.tsx`** – `POLYGONS_G3_MATCHER_LEVELS`: síkidom ↔ név (8/8 kép); leírás ↔ síkidom képe (8/8); számolós feladatok ↔ szám (5/8 kép). `g3-geom-sokszogek-matcher`.
7. **`PolygonsG3Sorter.tsx`** – `POLYGONS_G3_SORTER_LEVELS`: testek / síkidomok / vonalak; háromszögek / négyszögek / nem sokszögek; ötszögek / hatszögek / téglalapok (a négyzet is). Kategóriánként 4–6 kép. `g3-geom-sokszogek-sorter`.

**Teszt:** `src/test/grade3Topic10PolygonsG3.test.tsx` (a síkidomkészlet és a rajz-ellenőrzők helyességét is vizsgálja).

## Eltérések a tankönyvtől

- **Kétféle szó ugyanarra:** a tankönyv „egyenes szakaszok”-at ír (TK 104/1), a munkafüzet „egyenes vonalak”-at (MF II/28/4b). Mi „egyenes vonalak (szakaszok)”-at mondunk, a szakasz szót csak zárójelben, mert a szakaszt a könyv nem definiálja.
- **Szemre eldönthetetlen négyzet (TK 105/3):** az elforgatott piros négyzet (I) és a barna rombusz (C) egymás mellett van, „Válaszd ki a négyzeteket!” – papíron, mérés nélkül nem dönthető el, melyik négyzet. Nálunk a „Melyik négyzet?” kérdés négyzethálón van, a pöttyrácsos laborban a gép a sarkokat és az oldalakat pontosan ellenőrzi.
- **Definíció nélküli téglalap, négyzet:** a könyv a „Minden négyzet téglalap.” állítást eldönteti (TK 105/5), de a 3. osztályos anyag sehol nem mondja ki, mi a téglalap és a négyzet. Nálunk: téglalap = olyan négyszög, aminek minden sarka olyan, mint a füzetlap sarka (a szemközti oldalak egyenlők); négyzet = olyan téglalap, aminek mind a 4 oldala egyenlő – ezért minden négyzet téglalap. Derékszöget nem vezetünk be.
- **Fogalom a tanítása előtt:** az ötszög és a hatszög szó már a TK 14. oldalán (maradékos osztás, 4. feladat) szerepel, jóval azelőtt, hogy a könyv a sokszögek elnevezését tanítja (104. o.). Nálunk a nevek itt, a számlálásból születnek („a név a számból jön”).
- **A befelé mutató csúcs:** a könyv sokszögei közt van nyílhegy alakú (konkáv) négyszög (TK 104/1a), de a csúcsok számolásánál nem figyelmeztet, hogy a befelé mutató sarok is csúcs. Nálunk ez a „Vigyázz!” doboz témája, és van rá kvízkérdés.
- **Színek:** a könyv ábráin a sokszögek gyakran más színűek, mint a többi síkidom (pl. 104/1a), ami elárulhatja a választ. Nálunk a feladatokban minden síkidom egyforma színű.
- **Tudatos didaktikai változtatások:** a vonalzós kiegészítés (MF II/29/6) helyett pöttyrácsos rajzolás azonnali ellenőrzéssel; a pálcikás rejtvények helyett (TK 105/7) számolós pálcikafeladatok és „Hány négyzetet látsz?”; saját alakzatok (házikó, ajtó, nyíl), saját számok.

# 1. Síkidomok, sokszögek (V. Síkidomok és testek, 1. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., **111–116. oldal**) és munkafüzet (`OH-MAT04MA_II`, **24–28. oldal**) alapján kidolgozott modul 4. osztályosoknak.

---

## Tananyag Áttekintés

- **111. o.:** témakör-nyitó történet (iglu, kocka és henger alakú házak).
- **112. o.:** ötletbörze: síkidomok ⊃ sokszögek ⊃ négyszögek; igaz/hamis állítások („Minden sokszög síkidom.”, „Minden síkidom sokszög.” …); Manó csoportosítása: *van beugró része / nincs beugró része*; sokszögek kifeszítése a szöges táblán.
- **113. o.:** párhuzamos egyenesek előállítása papírhajtogatással; párhuzamos szakaszok a létrán, a sínen, a kottán, a polcon; négyszögek két párhuzamos egyenes között.
- **114. o.:** párhuzamos szakaszok keresése; derékszög hajtogatással; az olló két élének szöge: derékszögnél kisebb / derékszögű / derékszögnél nagyobb.
- **115. o.:** derékszög az órán (4:10, 6:00, 3:00, 8:10); alakzatok csoportosítása a derékszögeik száma szerint; **téglalap**: olyan négyszög, amelynek minden szöge derékszög; **négyzet**: olyan téglalap, amelynek minden oldala egyenlő hosszú; „téglalap, de nem négyzet”, „négyszög, de nem téglalap”; tűz-víz játék a négyzet alakú szobában (égtájak).
- **116. o.:** a négyzet átlói hajtogatással; a sokszög **csúcsa, oldala, átlója**; a téglalap szemközti csúcsait átlók kötik össze; melyik sokszögnek nincs átlója (háromszög); hajtogatott „modern kép” sokszögei.
- **Munkafüzet 24–28. o.:** sokszögek színezése oldalszám szerint; állatrajzok síkidomokból; párhuzamos vonalak (eszkimószán, hótalp); derékszöget alkotó vonal rajzolása; állítások síkidomokra (görbe vonal, 4 csúcs és 4 oldal, párhuzamos oldalpár, egyenlő oldalpár); szókártyák halmazábrába (síkidom, sokszög, háromszög, négyszög, téglalap, négyzet, ötszög); a négy állításnak megfelelő síkidom; kiegészítés háromszöggé, négyzetté, téglalappá …; átdarabolás téglalappá; „Két nem szomszédos csúcsot összekötő szakasz az átló.” – átlók egy csúcsból; pontok összekötése; biztos / lehet, de nem biztos / lehetetlen események síkidomokkal.

## Szabályok

- **Síkidomot** egyenes vagy görbe vonal is határolhat; a **sokszöget** csak egyenes szakaszok. Ahány csúcsa van, annyi oldala.
- **Párhuzamos egyenesek:** sosem találkoznak (hajtogatással állítjuk elő).
- **Derékszög:** hajtogatással vagy derékszögű vonalzóval mérjük; jele negyedkörív ponttal.
- **Téglalap:** minden szöge derékszög. **Négyzet:** olyan téglalap, amelynek minden oldala egyenlő hosszú.
- **Átló:** két nem szomszédos csúcsot összekötő szakasz. Egy csúcsból (csúcsok száma − 3) átló húzható; a háromszögnek nincs átlója.

> **Csapda:** a 4 egyenlő oldalú, de ferde négyszöget négyzetnek mondani – a négyzetnek minden szöge derékszög.

> **Javítás a régi README-hez képest:** a korábbi leírás hegyes-/tompaszögű háromszögeket, rombuszt, paralelogrammát, trapézt, deltoidot, „merőleges” és „metsző” egyeneseket, valamint LaTeX jelöléseket (a ∥ b, a ⊥ b, 90°) tartalmazott. A 4. osztályos tankönyv ezeket **nem** használja: a szögeket „derékszögnél kisebb / derékszög / derékszögnél nagyobb” kategóriákkal, a négyszögeket a téglalap–négyzet–„négyszög, de nem téglalap” felosztással tanítja, és bevezeti a *beugró rész* fogalmát és az átlót. A modul ezt követi.

---

## Elkészített Komponensek

1. **`Polygons4Figures.tsx`**
   - `PlaneShapesSvg`: síkidomok ⊃ sokszögek ⊃ négyszögek (tankönyv 112. o.).
   - `ParallelLinesSvg`: kétszer félbehajtott lap hajtásvonalai és a létra fokai.
   - `AngleTypesSvg`: derékszögnél kisebb, derékszög (negyedkörív + pont), derékszögnél nagyobb.
   - `RectSquareSvg`: téglalap és négyzet, minden sarkukban derékszögjel.
   - `PolygonPartsSvg`: a sokszög csúcsa, oldala, átlója; az ABCD téglalap két átlója.
   - `DentShapesSvg`: van beugró része / nincs beugró része.
   - `Polygons4RightMark`: segédkomponens a magyar derékszögjelhez.
2. **`Polygons4Theory.tsx`**: síkidom és sokszög, beugró rész, párhuzamos egyenesek, derékszög (hajtogatás, óra), téglalap és négyzet, csúcs–oldal–átló, kidolgozott példák (téglalap, de nem négyzet; az ötszög átlói; tűz-víz játék), csapda.
   - **Labor I – Sokszög-rajzoló a pontrácson:** pontokra kattintva sokszöget rajzol a gyerek; a program megmondja a nevét, a csúcsok/oldalak számát, megjelöli a derékszögeket, jelzi a beugró részt, felismeri a téglalapot és a négyzetet, és ellenőrzi a feladatot (háromszög, téglalap, négyzet, nem téglalap négyszög, ötszög, beugró részes hatszög).
   - **Labor II – Átlóhúzó:** háromszög, négyszög, ötszög, hatszög, nyolcszög; csúcsról csúcsra kattintva átlót húz, a szomszédos csúcsnál figyelmeztet („ez oldal”), számolja az átlókat egy csúcsból és összesen.
3. **`Polygons4Matcher.tsx`**: 3 szint × 8 pár (csúcsok és oldalak, fogalmak, átlók száma).
4. **`Polygons4Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (3 / 4 / 5+ oldalú; derékszögnél kisebb / derékszög / nagyobb; négyzet / téglalap / nem téglalap négyszög).
5. **`Polygons4Quiz.tsx`**: 30 kérdés (10–10–10), 22 kérdésnél ábra (rács, óra, sokszögek, szoba), minden kérdésnek típus-címkéje van, 3 puskakártya.

Azonosítók: kvíz `g4-geom-sokszogek-quiz`, párosító `g4-geom-sokszogek-matcher`, csoportosító `g4-geom-sokszogek-sorter`.

---

## Tesztelés

`src/test/grade4Topic5Polygons4.test.tsx` – a 4 komponens és mind a 6 SVG ábra renderelése.

# 2. Számszomszédok, kerekítés (3. osztály, V. Számolás 0-tól 500-ig)

**Források:** tankönyv OH-MAT03TA 56–57. oldal, munkafüzet OH-MAT03MA I. kötet 65–67. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 56.:** díjugrató pálya kanyargós „számvonallal” (0–500 m), melyik két százas között vannak az akadályok; három számegyenes (100–200, 200–300, 400–500) színes pontokkal: egyes, tízes és **százas szomszédok**, melyikhez van közelebb; szabálydoboz: **kerekítés százasra** (a közelebbi százas szomszéd, egyenlő távolságnál a nagyobb; 426 ≈ 400, 389 ≈ 400, 350 ≈ 400).
- **TK 57.:** mely állítások közelítő értékek (lovas adatok); számok gyűjtése adott tízesre / százasra kerekített értékhez; kerekítés tízesre (16…495) és százasra (98…490); feltételes feladatok; letakart számjegy (3□6 ≈ 400, 42□ ≈ 430…); „Biztos / Lehet, de nem biztos / Lehetetlen” a 3□4 számra.
- **MF 65.:** számok helye a 200–230 és a 300–500 számegyenesen, egyes szomszédok, legközelebbi százas; mely számok kerekített értéke 130 / 490; közelebbi százas szomszéd bekarikázása (240, 357, 170, 470).
- **MF 66.:** szomszédtáblázat kisebb/nagyobb százas, tízes, egyes oszlopokkal (277, 300, 436, 463); ugyanazon számok kerekítése százasra és tízesre; oszlopdiagram lovak ugrásáról, tízesre kerekítés.
- **MF 67.:** „Melyik számra gondoltam?” (tízesre 350, 270; százasra 500 és tízesre 450), szomszédok virágon (356, 478, 489), etető: mi a szabály (százasra kerekítés).

**Újdonság a III. fejezethez (200-ig) képest:** a **százas szomszéd** és a **kerekítés százasra** itt jelenik meg először (TK 56. szabálydoboz). A tízesre kerekítés 500-ig bővül; megjelenik a két kerekítés összevetése és a letakart számjegyes „biztos / lehet / lehetetlen” gondolkodás.

## Mit csinál a DiákZóna lecke?

Saját számokkal és helyzetekkel (iskola, jegy, játékbolt, kerítés, fák) gyakoroltatja a hat szomszédot (egyes, tízes, százas), a tízesre kerekítést (ismétlés 500-ig), a százasra kerekítést (a tízes jegyét nézzük; 5-nél felfelé; kerek százas marad), a „visszafelé” gondolkodást (melyik számokból lesz 300: 250-től 349-ig), a letakart számjegyet és a becslést. Minden szám (a rossz válaszok és a laborok számai is) 500-on belül van.

## Komponensek

1. **`Rounding500G3Parts.tsx`** – `RLine` (számegyenes osztásokkal, pontokkal, sávokkal, kerekítési ívekkel), `PriceTag`, `DigitCards`, `roundTen`, `roundHundred`.
2. **`Rounding500G3Figures.tsx`** – `NeighboursLadderSvg` (a 368 hat szomszédja), `HundredLineSvg` (a 368 a 300 és 400 között, a 360–370 sávval), `TenRuleSvg` (241–244 le, 245–249 fel), `HundredRuleSvg` (201–249 → 200, 250–299 → 300), `TwoWaysSvg` (374 ≈ 370 és 374 ≈ 400), `ExactOrNotSvg` (kb. 400 tanuló ↔ pontosan 460 Ft-os jegy), `ToyShopSvg` (289, 345, 108 Ft).
3. **`Rounding500G3CardFigures.tsx`** – kártyaikonok: `MiniHLine`, `MiniRow` (párosító), `SortHLine`, `HiddenCard` (csoportosító).
4. **`Rounding500G3Theory.tsx`** – hat szomszéd (táblázat, kerek számok szomszédai), tízesre kerekítés ismétlése, százasra kerekítés (új), pontosan vagy körülbelül, 3 mintapélda (374 kétféleképpen; melyik számokból lesz 300; játékbolt), „Vigyázz!” (349 ≈ 300, nem 400; 98 ≈ 100).
   - **Labor I – Hat szomszéd:** véletlen szám 101–499 között (néha kerek tízes vagy kerek százas). Lépésenként kell megtalálni a kisebb/nagyobb egyes, tízes, majd százas szomszédot; a megtalált tízes és százas szomszédok a számegyenesen is megjelennek. Célzott tippek (a szám nem lehet a saját szomszédja; ez kerek százas, most tízest keresünk; ez nem kerek százas…).
   - **Labor II – Kerekítő:** két mód (tízesre / százasra). A szám a számegyenesen áll a két szomszéd között; két (kerek számnál három) nagy gomb. A százasra módban sok a „csapdaszám” (pl. 347): ha a gyerek felfelé kerekít, külön tipp figyelmeztet a kétszeri kerekítésre. Jó válasznál ív mutatja az irányt; sorozatszámláló.
5. **`Rounding500G3Quiz.tsx`** – `ROUNDING_500_G3_QUESTIONS`: 30 kérdés (10/10/10), 26 kérdésnél ábra (számegyenes, szomszédsor, letakart jegy, árcédula, fák), minden kérdésnél badge, 3 puska. Azonosító: `g3-c500-kerekites-quiz`.
6. **`Rounding500G3Matcher.tsx`** – `ROUNDING_500_G3_MATCHER_LEVELS`, 3 szint × 8 pár (szomszédok; kerekítés tízesre és százasra; gondoltam egy számot), szintenként 4–5 képes kártya. `g3-c500-kerekites-matcher`.
7. **`Rounding500G3Sorter.tsx`** – `ROUNDING_500_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 3 elem (≈ 200 / 300 / 400; le / fel / marad százasra; letakart jegy: biztosan / lehet / biztosan nem ≈ 300), szintenként 6 képes elem. `g3-c500-kerekites-sorter`.

**Teszt:** `src/test/grade3Topic5Rounding500G3.test.tsx`

## Eltérések a tankönyvtől

- **A szabály nem működik a kerek százasokra (TK 56. szabálydoboz, 2. e):** „a százasra kerekített érték az a százas szomszéd, amelyikhez közelebb van; egyenlő távolságnál a nagyobb”. A 300 százas szomszédai a 200 és a 400, mindkettő 100-ra van – a szabály szó szerint 400-at adna. A könyv ezt csak „beszéljétek meg” kérdésként hagyja. Nálunk kimondott szabály: a kerek százas marad (400 ≈ 400), a szomszédai viszont 300 és 500 (a szám nem lehet a saját szomszédja).
- **Hiányzik, mit kell nézni (TK 56.):** a szabály távolságokról beszél, de nem mondja ki, hogy százasra a **tízesek** jegye dönt. Nálunk: „Százasra: nézd a tízest! Tízesre: nézd az egyest!” – ábrával (374 ≈ 370 és 374 ≈ 400).
- **Kétszeri kerekítés (sehol nincs a könyvben):** a 349 ≈ 350 ≈ 400 tipikus gyerekhiba. Nálunk csapdadoboz, laborbeli célzott tipp és rossz válaszként is megjelenik (349 ≈ 300, 149 ≈ 100).
- **Ellentmondó adat (TK 57/3. d ↔ MF 66/7. a):** a tankönyv szerint a díjugratás „jelenlegi világrekordja 247 cm”, a munkafüzet szerint Huaso „sokáig tartotta” a rekordot – mintha már nem az övé lenne. (Huaso 1949-es, 247 cm-es rekordja ma is él.) A lovas adatokat nem vettük át.
- **Vitatható „közelítő érték” állítások (TK 57/3.):** „a póni tömege 100 kg”, „a ló tömege 400 kg” lehet pontos mérés és kerekített érték is, a feladat mégis döntést vár. Nálunk egyértelmű példapár: „kb. 400 tanuló” ↔ „a jegy pontosan 460 Ft”.
- **Nehezen olvasható számvonal (TK 56/1.):** a kanyargós pályán a 0–500 m-es jelölések nem egyenesen, nem egyenletesen követik egymást, ezért nehéz eldönteni, melyik két százas között van egy akadály. Nálunk mindig egyenes, egyenletes beosztású számegyenes szerepel.
- **Kétféle szóhasználat:** a tankönyv „százas szomszédot”, a munkafüzet „tízes számszomszédot”, „százas számszomszédot” ír. Nálunk egységesen: egyes, tízes, százas szomszéd.
- **Tudatos didaktikai változtatások:**
  - A tízesre kerekítést 500-ig röviden ismételjük, mielőtt a százasra kerekítés jön; a két kerekítést egy ábrán vetjük össze.
  - A „visszafelé” kérdés (melyik számokból lesz 300, hány ilyen szám van) mintapéldát, kvízkérdést és párosító kártyát kapott.
  - A letakart számjegyes „biztos / lehet / lehetetlen” típust (TK 57/8.) saját számokkal a kvízbe és a Csoportosító 3. szintjére vittük, ahol a gyerek kártyaképről dönt.
  - Ahol a 10-es beosztású számegyenesen a szám megtévesztően közel látszana egy osztáshoz (149 a 150-hez), ott ábraként a számjegykártyákat mutatjuk, nem a számegyenest.
  - Saját számok és helyzetek; a könyv szereplőit (Barbara, Ráró, Csillag, Huaso, a lónevek) és a lovas történetet nem vettük át.

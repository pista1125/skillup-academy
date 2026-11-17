# 3. Írásbeli összeadás (3. osztály, VII. Írásbeli összeadás)

**Források:** tankönyv OH-MAT03TA 77–80. oldal, munkafüzet OH-MAT03MA I. kötet 84–90. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 77.:** a megoldás menete (Adatok – Terv – Becslés – Számítás – Ellenőrzés – Válasz); 252 + 115 színes sz / t / e táblázatban, három lépésben („Az összeadást a legkisebb helyi értéken kezdjük”); ellenőrzés a tagok felcserélésével; beváltás nélküli összeadások; háromtagú összeadások.
- **TK 78.:** 146 + 238: **beváltás az egyeseknél** (korongos helyiérték-táblázat zöld nyíllal, „14 e = 1 t + 4 e … a tízest a tízesekhez adjuk”, „Hozzáadjuk a beváltott tízest. 7 t + 1 t = 8 t”); gyakorlás; erőmérő verseny táblázata.
- **TK 79.:** 152 + 273: **beváltás a tízeseknél**; gyakorlás, állítások kiegészítése; számok képzése adott jegyekből.
- **TK 80.:** 175 + 285: **beváltás az egyeseknél és a tízeseknél is**; becslés százasra, rejtvény (a sorba rendezett összegek betűiből szó); betűk a számegyenesen, betűk értékének összeadása.
- **MF 84–90.:** becslés + írásbeli összeadás négyzethálós füzetben, összehasonlítás, „Melyik számra gondoltam?”, számkerekek, színezők, **hiányzó számjegyek** pótlása (MF 87/14., 90/24.), „Mely számjegyeket takarhatják a négyzetek?” (MF 89/21.), összegpiramis, számkártyák.

**Elrendezés a könyvben:** a tagok helyi érték szerint egymás alatt, felül sz / t / e fejléc (piros, kék, sárga), a „+” jel az alsó tag sorában balra, alatta vonal és az összeg. A beváltott jegyet **sehova nem írja le** – csak szóban „hozzáadja”. A tagokat fentről lefelé adja össze, a beváltott jegyet a végén adja hozzá. Számkör: minden összeg 500 alatt marad.

## Mit csinál a DiákZóna lecke?

A könyv elrendezését követi (fejléc, színek, „+” helye, jobbról balra), és kimondott, rövid szöveggel kíséri a lépéseket: **„7 meg 6 az 13. Leírom a 3-at, maradt 1. 5 meg 2 az 7, meg 1 az 8.”** A maradékot (beváltott jegyet) eleinte **kis zöld számként** a következő oszlop fölé írjuk; a laborban ez kikapcsolható, hogy a gyerek fokozatosan fejben tartsa. Saját példák: 231 + 147, 157 + 226, 163 + 254, 168 + 275, 125 + 136 + 118, könyvtár, papírgyűjtés, múzeum. Minden összeg legfeljebb 500.

## Komponensek

1. **`WrittenAddG3Column.tsx`** – **újrahasznosítható** írásbeli összeadás-rajz (a fejezet többi leckéje és a későbbi fejezetek is importálhatják):
   - `WrittenAddG3Column` (önálló `<svg>`), `WrittenAddG3ColumnG` (beágyazható `<g>`, `x`, `y`), `columnAddSize(props)` → `{ w, h }`.
   - Propok: `addends` (tagok, 2–3 db, szám vagy jegy-szöveg), `result`, `carries` (beváltott jegyek jobbról számolt oszloponként: `[null, 1]` = 1 a tízesek fölött), `cols` (3 vagy 4), `header`, `colored`, `highlight` (kiemelt oszlop jobbról), `grid`, `carryRow`, `noResult`, `cell`, `className`.
   - Jegy-szövegben: `'?'` = keresett jegy (piros doboz), `'_'` = üres kitöltendő doboz, `' '` = még nincs leírva; a szöveg jobbra igazodik (pl. `' 84'`, `'1?5'`, `'35 '` = rossz helyre írt 35).
   - Segédek: `addSteps(addends)` (oszloponkénti lépések: jegyek, hozott maradék, összeg, leírt jegy, maradék), `spokenStep(step)` („8 meg 5 az 13. Leírom a 3-at, maradt 1.”), `placeName`, `placePlural`, `suffixA`.
2. **`WrittenAddG3Figures.tsx`** – `ThreeStepsSvg` (231 + 147 három lépésben), `CarryOnesSvg` (157 + 226: helyiérték-táblázat elemekkel + írásbeli alak), `CarryTensSvg` (163 + 254), `CarryBothSvg` (168 + 275 kimondott lépésekkel), `CheckSwapSvg` (ellenőrzés felcseréléssel), `ThreeTermsSvg` (125 + 136 + 118).
3. **`WrittenAddG3CardFigures.tsx`** – `MiniCol` (párosító: két tag egymás alatt), `SortCol` (csoportosító: kis írásbeli összeadás, eredménnyel vagy anélkül).
4. **`WrittenAddG3Theory.tsx`** – egymás alá írás, három lépés, beváltás az egyeseknél / tízeseknél / kétszer, ellenőrzés, három tag, szöveges feladat a könyv lépéseivel (Adatok … Válasz, saját példa), „Vigyázz!” (elfelejtett maradék, jobbra igazítás, jobbról balra).
   - **Labor I – Lépésről lépésre (kulcslabor):** véletlen feladat négy típusban (beváltás nélkül / egyeseknél / tízeseknél / kétszer), összeg ≤ 499. A gyerek oszloponként, az egyesekkel kezdve, számbillentyűzeten írja be a leírandó jegyet; jó válasznál megjelenik a jegy, a maradék kis zöld számként átkerül a következő oszlop fölé, és kiíródik a kimondott lépés. Célzott tippek: elfelejtett maradék („Ne felejtsd el a maradékot! 5 meg 2 az 7, meg 1 az 8.”), a kétjegyű összeg elejét írta le, rossz összeadás. **„Mutasd meg!”** gomb: animált bemutatás lépésenként (1,6 mp-enként). „Maradék kis számmal” kapcsoló.
   - **Labor II – Számjegy-nyomozó:** egy írásbeli összeadásban egy jegy (bármelyik tagban vagy az összegben) „?”. A gyerek billentyűzeten adja meg; rossz válasznál kipróbálja helyette a gép: „ha 4 lenne a helyén, 147 + 236 = 383 lenne, nem 393”.
5. **`WrittenAddG3Quiz.tsx`** – `WRITTEN_ADD_G3_QUESTIONS`: 30 kérdés (10/10/10), 24 kérdésnél ábra (főleg a `WrittenAddG3Column`: ?-es összeg, kiemelt oszlop, maradék, hiányzó jegy, hibás számolás; szalagok), badge mindenhol, 3 puska. `g3-wadd-irasbeli-quiz`.
6. **`WrittenAddG3Matcher.tsx`** – `WRITTEN_ADD_G3_MATCHER_LEVELS`: beváltás nélkül; egy beváltás; kétszer beváltás, három tag, hiányzó jegy – szintenként 4 írásbeli-kártya. `g3-wadd-irasbeli-matcher`.
7. **`WrittenAddG3Sorter.tsx`** – `WRITTEN_ADD_G3_SORTER_LEVELS`: hol kell beváltani (nincs / egyeseknél / tízeseknél); mekkora az összeg (400 alatt / 400–450 / 450 fölött); hibavadász (jó / elfelejtett maradék / rossz helyre írt szám). `g3-wadd-irasbeli-sorter`.

**Teszt:** `src/test/grade3Topic7WrittenAddG3.test.tsx` (a `addSteps` / `spokenStep` segédeket is ellenőrzi).

## Eltérések a tankönyvtől

- **A beváltott jegy nincs leírva (TK 78–80.):** a könyv csak annyit mond: „a tízest a tízesekhez adjuk”, de az írásbeli alakban sehol sem látszik, hova kerül a beváltott 1. Kezdőknek ez a leggyakoribb hibaforrás (elfelejtett maradék). Nálunk a maradék eleinte kis zöld számként a következő oszlop fölé kerül, a laborban ez kikapcsolható – így a gyerek fokozatosan tér át a fejben tartásra.
- **Hiányzik a kimondott forma:** a könyv „6 e + 8 e = 14 e … 7 t + 1 t = 8 t” alakban ír. Nálunk a szokásos, rövid szóbeli forma szerepel: „8 meg 6 az 14. Leírom a 4-et, maradt 1. … meg 1 az 8.” (a könyv sorrendjében: előbb a tagok, aztán a maradék).
- **Törtfogalom a VII. fejezetben (TK 77/2. b):** „Mindegyik összeg nagyobb a 400 felénél” – a „fele” a XIV. fejezet (törtek) anyaga. Nálunk nincs ilyen megfogalmazás.
- **Félrevezető adatrögzítés (TK 79/7.):** „rózsaszín szalag < piros szalag, 152 cm, 273 cm, ?” – a 273 cm a **különbség** („273 cm-rel többet”), de úgy áll a sorban, mintha az egyik szalag hossza lenne. Nálunk a „…-mal többet” feladatoknál szalagos modell van, a különbség külön felirattal.
- **Pontatlan válasz (TK 78/4.):** a kérdés „Hány darab ékszer ez összesen?”, a válasz „384 karkötőt és nyakláncot vitt” – helyesen: „384 ékszert vitt”. Nálunk a válasz mindig a kérdésre felel.
- **Számkör:** a könyv írásbeli összeadásai 500 alatt maradnak (a 1000-es számkör a XII. fejezetben jön) – ezt követjük.
- **Tudatos didaktikai változtatások:**
  - A helyiérték-táblázatos elemes ábra (mint TK 78–80.) és az írásbeli alak egy képen, egymás mellett.
  - Animált, lépésenkénti labor billentyűzettel és célzott hibaüzenetekkel; „Mutasd meg!” bemutató.
  - A „hiányzó számjegy” típus (MF 87/14., 90/24.) saját labort kapott, ahol a rossz tippet a gép kipróbálja és megmutatja, mi jönne ki.
  - A becslés (2. lecke) az ellenőrzés része: a szöveges mintapéldában és a kvízben a becslés és a pontos eredmény összevetése.
  - Saját szereplők és helyzetek (könyvtár, papírgyűjtés, múzeum, Panni); a könyv szereplői (Anna, Gergő, a varrónő) és adatai nem szerepelnek.

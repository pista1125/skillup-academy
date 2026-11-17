# 4. A hosszúság mérése (3. osztály, IV. Mérések)

**Források:** tankönyv OH-MAT03TA 142–145. oldal, munkafüzet OH-MAT03MA II. kötet 75–77. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 142.:** díszkert-kép (alakzatok, mérés cm-es pontossággal); ismétlés: 1 m = 10 dm = 100 cm csíkokkal; átváltás (3 dm = 30 cm, 1 m, 2 dm, 8 dm, fél m, 50 cm); cérnadarabok levágása mérés nélkül, becslés és eltérés.
- **TK 143.:** tárgyak keresése (< 1 dm, > 1 m, 1 dm és 1 m között); állatok hossza szakaszokról (pannon gyík, teknős, levelibéka, csiga), sorba rendezés; 150 cm-es vízisikló fonalból, kisaraszban.
- **TK 144.:** szökőkút magassága dm-ben és cm-ben; a milliméter bevezetése (1 cm = 10 mm, 1 dm = 10 cm = 100 mm, 1 m = 10 dm = 100 cm = 1000 mm), vonalzó mm-beosztással; könyvvastagság mm-ben, könyvtorony.
- **TK 145.:** színes rudakból épített sorok hossza mm-ben; hurkapálcika-darabok becslése és mérése; 75 mm-es szakasz kiegészítése 1 dm-re; békák útja (töröttvonal) mérése; négyzethálós rajzolás nyilak szerint.
- **MF 75–77.:** kézfej, kar, lépés becslése és mérése dm-ben és cm-ben; egyenes és görbe vonalak hossza; szakaszok rajzolása (békák hossza); kígyók hossza m és dm, kerekítés egész méterre; rovarok útja mm-ben; békák útvonala négyzethálón (1 négyzetoldal = 10 cm); ugrások az egyenes mentén, hiányzó ugrás (1 m 9 dm = □ cm).

## Mit csinál a DiákZóna lecke?

Saját példákkal és számokkal tanítja a négy egységet (mm, cm, dm, m) és a váltószámokat; a vonalzó helyes használatát (a 0-tól mérünk; ha nem a 0-nál kezdődik, végpont − kezdőpont); a milliméteres leolvasást (5 cm 7 mm = 57 mm); a jó egység kiválasztását és a becslést; az átváltást (· 10, : 10 „lépcső”); a négyzetrácsos utakat (1 kis négyzet oldala 10 cm); rövid szöveges feladatokat (hiányzó ugrás, maradék szalag, könyvtorony, lépések).

## Komponensek

1. **`LengthG3Figures.tsx`** – `LengthUnitsSvg` (1 m = 10 dm = 100 cm csíkokkal), `RulerMmSvg` (ceruza 5 cm 7 mm = 57 mm), `RulerStartSvg` (a 0-tól mérünk / 8 − 2 = 6 cm), `WhichUnitSvg` (hangya mm, ceruza cm, padlap dm, ajtó m), `UnitStairsSvg` (m → dm → cm → mm, · 10), `GridWalkSvg` (csiga útja, 9 · 10 cm = 90 cm), `BookTowerSvg` (3 · 18 mm = 54 mm).
2. **`LengthG3Parts.tsx`** – rajzelemek: vonalzó (mm/cm beosztás, a 0 nem a szélén), szakasz, ceruza, négyzetrácsos út nyilakkal, hangya, ajtó, könyv.
3. **`LengthG3CardFigures.tsx`** – kártyaábrák: `RulerCard`, `PathCard`, `BarCard` (1 dm-es mintához mérve), `AntCard`, `LadybugCard`, `PencilCard`, `SpoonCard`, `DoorCard`, `TreeCard`, `BusCard`.
4. **`LengthG3Theory.tsx`** – Mit tanulunk?, az egységek, a milliméter, hogyan mérj vonalzóval, melyik egységgel mérjünk (becslés), átváltás, 3 mintapélda, „Vigyázz!” (1 m 5 cm ≠ 15 cm; 3 dm > 25 cm).
   - **Labor I – Olvasd le a vonalzót!** Véletlen hosszúságú kék szakasz mm-es vonalzón, néha nem a 0-nál kezdődik. A gyerek cm és mm léptetővel állítja be a hosszt; a hibára szabott tippet kap (a végpontot olvasta le / a mm-t számolta el / a cm-t). „Új feladat”.
   - **Labor II – Váltsd át!** Véletlen átváltások (m dm → dm, m cm → cm, cm mm → mm, cm → m cm, mm → cm mm, dm → cm) 4 gombbal; a rossz válaszok tipikus hibák (egymás mellé írás, rossz váltószám). Hibánál levezetést mutat, pontszámláló.
5. **`LengthG3Quiz.tsx`** – `LENGTH_G3_QUESTIONS`: 30 kérdés (10/10/10), 19 kérdésnél ábra, minden kérdésnél badge, 3 puska. Azonosító: `g3-meas-hosszusag-quiz`.
6. **`LengthG3Matcher.tsx`** – `LENGTH_G3_MATCHER_LEVELS`, 3 szint × 8 pár (vonalzó ↔ cm, egységek ↔ váltás; mm-es vonalzó és eltolt kezdetű szakasz, átváltások; négyzetrácsos utak ↔ cm, számolás hosszúságokkal), szintenként 4 képes kártya. `g3-meas-hosszusag-matcher`.
7. **`LengthG3Sorter.tsx`** – `LENGTH_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 9 elem (mm-rel / cm-rel / m-rel mérjük; rövidebb / pont / hosszabb 1 dm-nél; rövidebb / pont / hosszabb 1 m-nél), szintenként 4–7 képes elem. `g3-meas-hosszusag-sorter`.

**Teszt:** `src/test/grade3Topic4LengthG3.test.tsx`

## Eltérések a tankönyvtől

- **Színes rudak hossza (TK 145/9.):** a rajzon a rudak színe nem felel meg a színesrúd-készletnek, és egymásnak is ellentmond (a kék rúd csak 3 kocka hosszú, a D) sorban rövidebb a sárgánál; az E) sorban a piros rúd kétszer olyan hosszú, mint a rózsaszín, a B) sorban viszont a rózsaszín 2 kocka). Így a feladat a rajzról nem oldható meg biztosan. Nálunk nincs színesrúd-feladat; a hosszakat vonalzón, csíkokon és négyzetrácson olvassuk le, ahol a rajz méretarányos.
- **Tört a hosszúságnál (TK 142/2. b „fél m”, TK 143/4. d „negyede”, MF 77/7. „fél m”):** a fél és a negyed a törtekhez tartozik (XIV. fejezet). Nálunk minden hosszúság egész mértékegységben szerepel (50 cm, 25 cm), törtszó nincs.
- **Kilométer (régi leírás):** a korábbi README a kilométert is felsorolta, de a 3. osztályos tankönyv ezen oldalain nincs km. Nálunk csak mm, cm, dm és m van.
- **Képletek, LaTeX nélkül:** a régi README képletekkel és LaTeX-szel írt; nálunk egyszerű mondatok és a könyv jelölései (· és :) vannak.
- **Tudatos didaktikai változtatások:**
  - A könyv csak kimondja, hogy a 0-tól mérünk; nálunk külön ábra és laborfeladat mutatja meg, mi történik, ha a szakasz nem a 0-nál kezdődik (végpont − kezdőpont), és a labor erre a hibára külön tippet ad.
  - Az átváltáshoz „lépcsőt” rajzoltunk (m → dm → cm → mm, mindig · 10), és csapdadoboz figyelmeztet az egymás mellé írásra (1 m 5 cm ≠ 15 cm).
  - A könyv állatos és békás adatai (pannon gyík, levelibéka, vízisikló, kígyók, Breki) helyett saját tárgyak és számok szerepelnek (ceruza, szekrény, szalag, könyvtorony, csiga és katica útja).
  - A kerekítés egész méterre (MF 76/4. b) egy számegyenes-ábrával szerepel (4 m 7 dm ≈ 5 m), hogy látszódjon, melyik egész méterhez van közelebb.

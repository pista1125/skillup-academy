# 2. Írásbeli kivonás 1000-ig (3. osztály, XII. Írásbeli műveletek 1000-ig)

**Források:** tankönyv OH-MAT03TA 118–121. oldal, munkafüzet OH-MAT03MA II. kötet 44–47. oldal (vegyes összeadás–kivonás oldalak).

## Mit tartalmaznak a könyv oldalai?

- **TK 118.:** hegycsúcsok magassága (1000 − 318, 923 − 214), különbségek a magasságok között.
- **TK 119.:** becslés százasra, majd kivonások és hiányzó kivonandók (pl. 962 − □ = 573); betűrejtvény (357 − 266, 999 − 174); szakaszos ábra: mennyivel távolabb?
- **TK 120–121.:** „Melyik számra gondoltam?” (827 és 398 különbsége, 976 tízes szomszédjánál 658-cal kisebb), táblázat (hányan nem ebédelnek), nyitott mondatok (1000 − (264 + 685) > □), „véletlenül kivonta hozzáadás helyett”.
- **MF II/44–47.:** számrejtvény (856 − 514, 999 − 205), szakaszos ábra (1000 m-es futás: ki mennyire van a céltól), hiányzó számjegyek kivonásban, színező (1000 − 496).

## Mit csinál a DiákZóna lecke?

**Módszer: a hagyományos pótlásos-maradékos írásbeli kivonás (a tanító döntése)**, a VIII. fejezet újrahasznosított `WrittenSubG3Column` komponensével és `subSteps` / `spokenSubStep` / `carryMarks` segédeivel: „7-hez 5, az 12. Leírom az 5-öt, maradt 1.” – a maradékot a következő kivonandó-jegyhez adjuk („6 meg 1 az 7”). Újdonság a VIII. fejezethez képest (ott a kisebbítendő ≤ 499 volt): a kisebbítendő 1000-ig; **0 a kisebbítendőben** (704 − 258: „6-hoz 4, az 10”), **kerek százasból** (600 − 274), **az 1000-ből** (1000 − 347, négy oszlop, háromszor marad 1; az ezreseknél „1-hez 0, az 1” – a 0-t a szám elejére nem írjuk). Ellenőrzés összeadással. Saját példák: 832 − 467, 704 − 258, 600 − 274, 1000 − 347, kirakó, két iskola, túra, hegyek.

## Komponensek

1. **`WrittenSub1000G3Parts.tsx`** – `stepsSub` (3 vagy 4 oszlop), `isLeadStep` (az 1000 ezres oszlopa), `spokenSub`, `partialDiff`, `carryMarksSub`, tipikus hibák (`forgotSub` = elfelejtett maradék, `swappedSub` = fordított pótlás), `subHint` (célzott tipp, a 0-ra külön), `makeSubTask` (ismétlés / 0 a tízeseknél / kerek százasból / az 1000-ből), `opts4`, `ThousandBar` (0–1000 sáv), `Wallet`.
2. **`WrittenSub1000G3Figures.tsx`** – `RecapSubSvg` (832 − 467), `ZeroTensSubSvg` (704 − 258), `RoundHundredSubSvg` (600 − 274), `ThousandSubSvg` (1000 − 347 négy oszlopban), `CheckAddSubSvg` (653 + 347 = 1000), `PuzzleBarSvg` (1000 darabos kirakó).
3. **`WrittenSub1000G3CardFigures.tsx`** – `MiniSub` (párosító, 3 vagy 4 oszlop, eredménnyel is), `SortSub` (csoportosító), `MiniPay` (pénztárca − ár).
4. **`WrittenSub1000G3Theory.tsx`** – csak a `WrittenSub1000G3Theory` exportja.
   - **Labor I – Lépésről lépésre:** négy feladattípus; oszloponként előbb „Meddig pótolsz?” (a jegyig vagy 10-zel többig, maradt 1), aztán a jegy billentyűzeten; az 1000-nél az ezres oszlopban „Nem írok semmit / Leírom a 0-t” döntés; végül ellenőrzés összeadással. Célzott tippek (elfelejtett maradék, fordított pótlás, 0 felül). „Mutasd meg!” bemutató, maradék-jelek kapcsolója.
   - **Labor II – Mennyi hiányzik az 1000-hez?** Négy helyzet (kirakó, futóverseny, gyűjtés, könyvsorozat), sáv 0–1000-ig; a rossz választ a gép kipróbálja („ennyi + ennyi = …, ez nem 1000”), a jó válasz után megjelenik az ellenőrző összeadás.
5. **`WrittenSub1000G3Quiz.tsx`** – `WRITTEN_SUB_1000_G3_QUESTIONS`: 30 kérdés (10/10/10), 24 ábrával, badge mindenhol, 3 puska. `g3-wops-kivonas-quiz`.
6. **`WrittenSub1000G3Matcher.tsx`** – `WRITTEN_SUB_1000_G3_MATCHER_LEVELS`: 0 a kisebbítendőben; az 1000-ből; ellenőrzés (kivonás ↔ összeadás). `g3-wops-kivonas-matcher`.
7. **`WrittenSub1000G3Sorter.tsx`** – `WRITTEN_SUB_1000_G3_SORTER_LEVELS`: hányszor marad 1 (1 / 2 / 3); mekkora a különbség (300 alatt / 300–600 / 600 fölött); hibavadász (jó / elfelejtett maradék / fordított pótlás). `g3-wops-kivonas-sorter`.

**Teszt:** `src/test/grade3Topic12WrittenSub1000G3.test.tsx` (a generátort, a pótlásos kimondott lépéseket az 1000 − 347-re és a tipikus hibákat is ellenőrzi).

## Eltérések a tankönyvtől

- **Módszer:** a könyv a felváltásos kivonást használja; a tanító döntése szerint nálunk a hagyományos **pótlásos-maradékos** módszer van (egységesen a VIII. fejezettel).
- **Hiányzik a 0-s kisebbítendő és az 1000-ből való kivonás írásbeli alakja:** a könyv ilyen feladatokat ad (TK 118/2.: 1000 − 318; MF 47/9.: 1000 − 496), de nem mutatja meg, mi történik a 0-knál. Nálunk külön szakasz a 0 a tízeseknél, a kerek százas és az 1000 esetére (négy oszlop, „a szám elejére 0-t nem írunk”).
- **Számkör-túllépés (TK 118/2.):** a Kékes magassága 900 + 114 = 1014 m, így a „legmagasabb és legalacsonyabb csúcs különbsége” 1000 fölötti számmal indul. Nálunk minden szám legfeljebb 1000.
- **Törtfogalom túl korán (TK 120/7. f):** „a kilencszáz fele” – a XIV. fejezet anyaga. Nálunk nincs.
- **Tudatos didaktikai változtatások:** saját számok, helyzetek és szereplők (a könyv szereplői nem szerepelnek); a „véletlenül kivonta hozzáadás helyett” feladattípus (TK 121/14.) saját számokkal, két lépésben; „Mennyi hiányzik az 1000-hez?” labor sávos modellel (a MF 45/5. futóverseny-ábrájának interaktív változata); ellenőrző trükk az 1000-hez (egyesek 10-re, a többi 9-re) csak ellenőrzésként, a fő módszer a pótlásos marad.

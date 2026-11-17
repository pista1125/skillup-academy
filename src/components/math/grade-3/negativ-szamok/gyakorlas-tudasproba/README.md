# 4. Gyakorlás, tudáspróba (3. osztály, IX. Ismerkedés a negatív számokkal)

**Források:** tankönyv OH-MAT03TA 98–99. oldal, munkafüzet OH-MAT03MA II. kötet 19–22. oldal. (A fejezetnek nincs külön Megálló/Kitekintő oldala – a tudáspróba a teljes fejezet anyagából, saját feladatokkal készült.)

## Mit tartalmaznak a könyv oldalai?

- **TK 98.:** időjárás-jelentés térképpel (öt város hőmérséklete), a hőmérő és a Celsius-fok (°C), a „–3 °C (olvasd: mínusz három celziusz-fok)” írásmód; hőmérők leolvasása (–25…35 °C-os skála), beállítás műanyag hőmérőn.
- **TK 99.:** melegedés/hűlés és a változás mértéke, mérés bent és kint, növekvő sorrend, igaz–hamis állítások, hűtő és fagyasztók, rekord hidegek.
- **MF 19.:** hőmérőfajták (fürdővíz-, kinti, lázmérő) és használatuk; kéthetes időjárás-előrejelzés (piros: nappal, kék: éjjel), fagypont alatti napok.
- **MF 20.:** hőmérők leolvasása, csökkenő sorrend; heti reggeli grafikon leolvasása; „Tedd igazzá!” relációk (3 °C < …, –5 °C < …).
- **MF 21–22.:** változások szóval, bent–kint különbség, igaz–hamis, napi táblázat (reggel → dél → este), melegedett/hűlt nyilakkal, számegyenes leolvasása (csak a –1, 0, 1 kiírva).

## Mit csinál a DiákZóna lecke?

A három lecke anyagát foglalja össze és gyakoroltatja: **hőmérő és fagypont** (1. lecke; lift és búvár: a 0 mint határ), **számegyenes** (2. lecke: balra mínusz, lépések a 0-tól, szomszédok, sorozatok, álló számegyenes), **összehasonlítás és változások** (3. lecke: hidegebb = lejjebb = kisebb, sorrend, melegedett/hűlt, hány fokkal, mennyi lett, a 0-n átlépve két részben). Számok: –20 és 25 között, változások legfeljebb 25 fok.

## Komponensek

1. **`NegExamG3Parts.tsx`** – a három lecke rajzelemeinek közös gyűjtője (újraexportálás): hőmérő, ház, lift, búvár, időjárás-jelentés (1. lecke), számegyenes (2. lecke), változás-hőmérő, kártyák, grafikon, táblázat (3. lecke).
2. **`NegExamG3Figures.tsx`** – `ExamThermoSvg` (fagypont, 0 fölött/alatt), `ExamBuildingSvg`, `ExamLineSvg`, `ExamOrderSvg`, `ExamChangeSvg` (–3 → 6: 3 fok + 6 fok), `ExamTwoPartsSvg` (ugrások a számegyenesen a 0-ig, aztán tovább).
3. **`NegExamG3CardFigures.tsx`** – a három lecke kártyaábrái egy helyen (`ThermoCard`, `LiftButtonCard`, `MiniHouseCard`, `DiverCard`, `NLCard`, `ChangeCard`, `changeWindow`).
4. **`NegExamG3Theory.tsx`** – „Amit már tudsz” (5 rövid szakasz ábrával), 3 vegyes mintapélda (lift a 0-n át, kétlépéses hőmérséklet-változás, sorba rendezés), „Vigyázz!” (–2 → 6 nem 4 fok; a –9 °C hidegebb; a 0 °C éppen fagypont).
   - **Labor I – Vegyes feladatok:** 5 feladattípus (hőmérő, számegyenes, hidegebb, hány fokkal, mennyi lett) vagy vegyesen, véletlen számokkal, 4 válasz, célzott tipp, pontszámláló.
   - **Labor II – Időjárás-napló:** reggeli érték + „délig melegedett …”, „estére hűlt …”; a gyerek ▲/▼ gombokkal állítja be a déli és az esti értéket; cellánkénti visszajelzés. Minden feladatban legalább egyszer átlépjük a 0-t.
5. **`NegExamG3Quiz.tsx`** – `NEG_EXAM_G3_QUESTIONS`: 90 kérdés (30/30/30), 65 kérdésnél ábra, badge mindenhol, 3 puska. `g3-neg-tudasproba-quiz`.
6. **`NegExamG3Matcher.tsx`** – `NEG_EXAM_G3_MATCHER_LEVELS`: hőmérő ↔ érték, kiolvasás; számegyenes, búvár, ház ↔ szám; változás-kártyák és „mennyi lett?”. `g3-neg-tudasproba-matcher`.
7. **`NegExamG3Sorter.tsx`** – `NEG_EXAM_G3_SORTER_LEVELS`: 0-nál kisebb / éppen 0 / 0-nál nagyobb (hőmérő, számegyenes, lift, búvár); hidegebb, mint –4 °C / –3…–1 °C / 0 °C vagy melegebb; 4 / 6 / 9 lépés (hőmérséklet, lift, búvár). `g3-neg-tudasproba-sorter`.

**Teszt:** `src/test/grade3Topic9NegExamG3.test.tsx`

## Eltérések a tankönyvtől

- **Nincs Megálló-oldal:** a könyvben ennek a fejezetnek nincs összefoglaló vagy ellenőrző oldala. A tudáspróba saját feladatsor a TK 98–99. és az MF 19–22. oldal feladattípusaiból.
- **Számkör:** a könyv skálái –25 °C-tól 35 °C-ig mennek, és szerepel a –89 °C, a –35 °C és a 24 °C – (–9 °C) = 33 fokos különbség is. Nálunk a leghidegebb érték –15 °C (kártyán), a kérdésekben –14 °C, a legnagyobb különbség 25 fok.
- **Egységes szóhasználat:** a könyv a változásra hétféle szót használ (melegedett, csökkent, növekedett, emelkedett, enyhült, hűlt, fagyosabb lett). Nálunk „melegedett … fokkal” / „hűlt … fokkal”, a hőmérsékletnél °C, a változásnál „fok”.
- **Pluszjel:** a TK 99/6. egyszer „+2 °C”-ot ír; nálunk sehol nincs pluszjel, a pozitív értékek előjel nélküliek.
- **A 0 °C nem „fagypont alatti”:** a könyv a „fagypont alá süllyed” kérdésnél (MF 19/2.) nem tér ki a 0 °C-ra. Nálunk külön kérdés és puska mondja ki, hogy a 0 °C éppen a fagypont, és nem a 0 alatt van (pl. a fagyos éjszakák megszámolásánál).
- **Tudatos didaktikai változtatások:**
  - A 0 mint határ a liftnél (földszint) és a búvárnál (vízfelszín) is előkerül, így a „két részben számolás” (a 0-ig, aztán tovább) nem csak hőmérőn gyakorolható.
  - A kétlépéses változások (MF 22/10.) a laborban interaktív napló lettek, ahol a gyerek a hőmérő gombjaival lép.
  - Saját szereplők (Zoli, Bori) és saját számok; a könyv szereplői és adatai nem szerepelnek.

# 9. Az idő mérése (3. osztály, IV. Mérések)

**Források:** tankönyv OH-MAT03TA 138–141. oldal, munkafüzet OH-MAT03MA II. kötet 71–74. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 138.:** hajómenetrend (két járat, 10 megálló, indulási időpontok percre pontosan): menetidő, ki hol száll le 1 óra 20 perc után, a két hajó közti eltérés; öt mutatós óra leolvasása „a napszakoknak megfelelően” (délelőtti és délutáni/esti alak), többféle kifejezés („negyed 10, 9 óra múlt 15 perccel”), játék óra állítása 10 perccel korábbra, 20 perccel későbbre.
- **TK 139.:** moziműsor (kezdés + játékidő → befejezés, szünet), érkezés–távozás két órán (eltelt idő), melyik órával mérjük a 11 másodperces futást (stopper), mutatós órák összehasonlítása, a mutatók szerepe; szabálykeret: „A percnél kisebb mértékegység a másodperc. 1 perc = 60 másodperc.”
- **TK 140.:** másodpercek érzékelése (tapsolás, 30 másodperc, 60 másodperc), becslés és mérés 1 perc alatt, stopperóra-leolvasás (60 másodperces számlap), 45 másodperc alatt hajtogatott csónak – 5, 8, 10 csónak ideje.
- **TK 141.:** éves naptár (hét napjai, hányadik nap, mennyi idő a szünetig), táborok napjai (júliusi egyhetes, augusztus 3–16.), évszakok, oszlopdiagram a születések évszakáról, „biztos – lehetetlen – lehet” állítások (február 29.).
- **MF 71.:** időegységek növekvő sorrendje, születési dátum, évszak, névnap; balatoni hajómenetrend (indulás/érkezés, várakozás, menetidő).
- **MF 72.:** mutatós órák leolvasása percre pontosan, délelőtti és délutáni alakban; eltelt idő két óra között; átváltás percre (5 óra, 3 óra 19 perc, 7 óra 38 perc); mutatók berajzolása (18 óra 18 perc, 14 óra 55 perc); 1 óra 15 perc vagy 75 perc.
- **MF 73.:** mi tart 8 másodpercig, 8 percig, 8 óráig; sorozat ±25/±35 másodperccel; mennyi lesz az idő 18 másodperc múlva (óra–perc–másodperc); stopper: „1 perc 1 negyede / 1 harmada / fele”.
- **MF 74.:** tájfutóverseny eredményei (óra:perc:másodperc), helyezések, különbségek; időmérés régen; mennyi van még a következő egész óráig (perc + másodperc).

**A könyv 3. osztályban tanítja:** mutatós óra leolvasása percre pontosan; a „negyed, fél, háromnegyed” kifejezéseket; a 24 órás alakot a napszakoknak megfelelően (14 óra 55 perc, 18:45); digitális kijelzést és menetrendi írásmódot (11:30); a másodpercet (1 perc = 60 másodperc) és a stoppert; óra–perc–másodperc átváltásokat; eltelt idő számítását; naptárt, hónapokat, évszakokat. A könyv a mértékegységeket kiírja (másodperc, perc, óra), rövidítést (s, min, h, mp) nem használ – mi is kiírjuk.

## Mit csinál a DiákZóna lecke?

Saját időpontokkal és helyzetekkel (buszmenetrend Óvártól az Iskoláig, mozi, kirándulás, papírhajó, egy lábon állás, nyári tábor) gyakoroltatja: mutatós és digitális óra leolvasása, napszakok (+12), átváltás (óra ↔ perc, perc ↔ másodperc), eltelt idő két ugrással (először az egész óráig), másodpercek átlépése a következő percbe, naptár és a napok számolása (az első napot is beleszámolva). Minden szám 1000 alatt marad.

## Komponensek

1. **`TimeG3Parts.tsx`** – közös rajzelemek: `ClockFace` (mutatós óra percvonásokkal, kis-, nagy- és másodpercmutatóval), `Clock`, `StopwatchFace` (60 másodperces stopper), `DigitalFace`, `SunIcon`, `MoonIcon`, `MonthGrid` (hétfővel kezdődő naptárlap), segédfüggvények `hm`, `hmWords`, `durWords`.
2. **`TimeG3Figures.tsx`** – `TimeUnitsStairsSvg` (az egységek sorrendje és átváltásai), `ClockPartsSvg` (a mutatók szerepe), `QuarterClocksSvg` (7 óra, negyed 8, fél 8, háromnegyed 8), `MorningEveningSvg` (9:15 és 21:15 ugyanazon az órán), `ElapsedJumpsSvg` (9:40 → 10:00 → 10:25 = 45 perc), `StopwatchCalendarSvg` (stopper 23 másodperc + júliusi naptár egyhetes táborral).
3. **`TimeG3CardFigures.tsx`** – kártyaikonok: `MiniClock` (nap/hold jellel), `MiniTwoClocks`, `MiniStopwatch`, `MiniDigital`, `SortSweep` (a nagymutató útja zöld cikkel), tevékenység-ikonok (`EyeIcon`, `BallIcon`, `ToothbrushIcon`, `EggPotIcon`, `BedMoonIcon`, `MountainIcon`, `SchoolIcon`).
4. **`TimeG3Theory.tsx`** – mértékegységek táblázattal és két átváltási példával; óraleolvasás (5 perces lépések, negyed/fél/háromnegyed, „9 óra múlt 15 perccel”); délelőtt–délután–este (+12); eltelt idő ugrásokkal; 3 mintapélda (mese vége 14:50 + 45 perc; 1 perc 50 másodperc + 25 másodperc; tábor napjai); hónapok napjai, évszakok; „Vigyázz!” (1 óra 30 perc ≠ 130 perc; 8:45 → 9:20 nem 75 perc).
   - **Labor I – Óraállító:** véletlen célidőpont („negyed 5”, „16:35”, „7 óra 25 perc”) – a gyerek gombokkal (±1 óra, ±5 perc, ±1 perc) vagy a számlapra koppintva állítja a mutatókat. „Percre pontosan” kapcsoló. Célzott visszajelzés: jó a nagymutató, de rossz a kismutató (pl. „fél 8” nem 8:30), 24 órás alaknál „16 − 12 = 4”, perceknél melyik számra mutasson a nagymutató.
   - **Labor II – Mennyi idő telt el?:** véletlen kezdés és vége két mutatós órán (kérésre számokkal is). Lépésenként: 1. ugrás az egész óráig, 2. ugrás a végéig, majd az összeg; a megoldott ugrások ívként megjelennek az időszalagon. A rossz válaszok között ott a tipikus „százas” hiba (9:20 − 8:45 = 75).
5. **`TimeG3Quiz.tsx`** – `TIME_G3_QUESTIONS`: 30 kérdés (10/10/10), 21 kérdésnél ábra (mutatós óra, két óra, stopper, digitális kijelző, naptár, menetrend, moziműsor), minden kérdésnél badge, 3 puska. Azonosító: `g3-meas-ido-quiz`.
6. **`TimeG3Matcher.tsx`** – `TIME_G3_MATCHER_LEVELS`, 3 szint × 8 pár (óra ↔ negyed/fél/háromnegyed és egységek; napszak + óra ↔ 24 órás alak és átváltások; két óra / stopper ↔ eltelt idő), szintenként 4 képes kártya. `g3-meas-ido-matcher`.
7. **`TimeG3Sorter.tsx`** – `TIME_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 9 elem (néhány másodperc / perc / óra tevékenység-ikonokkal; délelőtt / délután / este digitális kijelzőkkel; 15 / 30 / 45 perc a nagymutató útjával), szintenként 6–8 képes elem. `g3-meas-ido-sorter`.

**Teszt:** `src/test/grade3Topic4TimeG3.test.tsx`

## Eltérések a tankönyvtől

- **Törtek a stopperes feladatban (MF 73/11.):** „1 perc 1 negyede / 1 harmada / fele” – a törteket a könyv csak a XIV. fejezetben tanítja. Mi másodpercben mondjuk: 15, 20, 30 másodperc; a „fél perc = 30 másodperc” kifejezést (amit a TK 140/8. is használ) megtartjuk.
- **Táborozás napjai (TK 141/15.):** „egy hét … Mikor kezdődik, ha július 12-én ér véget?” – a könyv nem mondja meg, hogy az első és az utolsó napot is számoljuk-e (július 6. vagy 5.). Mi mindig kimondjuk: „mindkét nap táborban vagy”, és a naptárlapon megszámoljuk a napokat (13–17. = 5 nap; a 17 − 13 = 4 tipikus hibát a magyarázat külön említi).
- **Várakozás a révnél (MF 71/3.):** „… percet vagy … percet” – két különböző választ sugall, de a menetrendben mindkét várakozás 5 perc. Nálunk egy menetrendi kérdésre egy egyértelmű válasz tartozik.
- **Cipő befűzése (MF 73/8.):** nem egyértelmű, hogy 8 másodperc vagy 8 perc – a gyerekek tapasztalata eltér. A csoportosítóban csak egyértelmű tevékenységek vannak (pislogás, fogmosás, éjszakai alvás …).
- **A korábbi README hibái:** „1 év = 52 hét” (valójában 52 hét és 1-2 nap), az s/min/h jelek – a könyv ezeket nem használja. Nálunk 1 év = 12 hónap = 365 nap (szökőévben 366), és a mértékegységek kiírva szerepelnek.
- **Tudatos didaktikai változtatások:**
  - Az eltelt időt mindig ugyanazzal a módszerrel számoljuk: **első ugrás az egész óráig, aztán a végéig** – időszalagon ívekkel. A könyv ezt a módszert nem mutatja meg, csak kérdez.
  - A „százas” hibát (8:45 → 9:20 = 75 perc; 1 óra 30 perc = 130 perc) csapdadobozban és rossz válaszként is szerepeltetjük.
  - A mutatós órán a kismutató a percekkel együtt halad (fél 9-kor félúton van) – így látszik, miért „fél 9” és nem „fél 8”.
  - Egy óraállás – két időpont: a nap és a hold jele mutatja, mikor kell 12-t hozzáadni.
  - Saját szereplők és helyzetek (Dani, Lili, Bence; Óvár–Iskola busz); a könyv szereplőit (Patrik, Manó, Hanna, Saci …) nem vettük át.

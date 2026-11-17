# 3. Összehasonlítás és változások (3. osztály, IX. Ismerkedés a negatív számokkal)

**Források:** tankönyv OH-MAT03TA 99. oldal (és a 98. oldal hőmérői), munkafüzet OH-MAT03MA II. kötet 21–22. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 99.:** 3. reggel –3 °C, délben 9 °C: melegedett vagy hűlt, hány fokkal változott; 4. mérés az osztályteremben és az udvaron; 5. öt hőmérséklet (7, –5, 0, –14, 12 °C) növekvő sorrendbe a műanyag hőmérőn; 6. igaz–hamis állítások (hidegebb/melegebb, „6 °C-ról 8 °C-ot csökkent”, „–4 °C-ról 0 °C-ra”), a hamisakat igazzá kell tenni; 7. hűtő és fagyasztók (5, –6, –12, –18 °C), hány fokkal hidegebb; 8. a Föld és Magyarország leghidegebb mért hőmérséklete (–89 °C, –35 °C), kutatómunka.
- **MF 21.:** 6. „reggelre 9 °C-ot csökkent” típusú leírásokból bejelölni a hőmérőn; 7. bent–kint táblázat, a különbség kitöltése (pl. 24 °C és –9 °C); 9. igaz–hamis állítások.
- **MF 22.:** 10. táblázat: reggeli érték, délelőtti és délutáni változás szóval (melegedett, csökkent, növekedett, emelkedett, enyhült, hűlt, hidegebb/kevesebb/fagyosabb lett), a déli és esti érték kiszámítása, kérdések; 11. nyilas feladat: melegedett (M) vagy hűlt (H), hány fokkal (pl. 9 °C → –4 °C); 12. számok leolvasása számegyenesről.

Számkör: kis egész számok. A könyv itt a hőmérőn lépked, műveletet negatív számokkal nem ír fel; a változást mindig szóval mondja („melegedett 5 fokkal”, „hűlt 3 fokkal”).

## Mit csinál a DiákZóna lecke?

Saját számokkal és helyzetekkel (hajnal, délután, éjjel, hűtő és fagyasztó saját értékekkel, bent–kint táblázat, heti grafikon) tanítja:
1. **Melyik a hidegebb?** – ami lejjebb van a hőmérőn; a hidegebb a kisebb szám (–6 °C < –1 °C).
2. **Sorba rendezés** – növekvő: a leghidegebbtől, csökkenő: a legmelegebbtől.
3. **Melegedett vagy hűlt?** – fölfelé megy a hőmérő: melegedett, lefelé: hűlt.
4. **Hány fokkal változott?** – lépések számolása a hőmérőn; ha mindkét érték a 0 ugyanazon oldalán van, kivonással is; ha **átlépünk a 0-n**, két részben: a 0-ig, aztán tovább (–4 °C → 5 °C: 4 + 5 = 9 fok).
5. **Mennyi lett?** – kiinduló érték + változás (7 °C, hűlt 9 fokkal → –2 °C), és visszafelé is (3. szint).

A hőmérsékletek –15 °C és 22 °C között vannak, a változások és különbségek legfeljebb 24 fokosak.

## Komponensek

1. **`NegChangesG3Parts.tsx`** – az 1. lecke (`NegEverydayG3Parts`) hőmérőjére épül (`Thermo`, `ThermoRow`, `ForecastSvg`, `fmt`, `fmtC` – mínuszjel: „–3 °C”). Saját: `ChangeThermoSvg` (hőmérő két leolvasással: üres karika = előtte, teli = utána, lila nyíl, igény szerint a 0-nál kettéosztva, „?” a keresett érték helyén), `TempCardsSvg` (hőmérséklet-kártyák sorban), `WeekChartSvg` (reggeli hőmérsékletek grafikonja), `TempTableSvg` (bent–kint táblázat), `CompareThermosSvg`, `changeText()`, `diff()`.
2. **`NegChangesG3Figures.tsx`** – `ColderWarmerSvg`, `OrderSvg`, `UpDownSvg`, `WarmUpSvg` (3 → 8), `BothBelowSvg` (–8 → –3), `AcrossZeroSvg` (–4 → 5, 4 fok + 5 fok), `CoolDownSvg` (6 → –2, 6 fok + 2 fok).
3. **`NegChangesG3CardFigures.tsx`** – `ChangeCard` (párosító: fekvő skála görbe nyíllal; csoportosító: álló hőmérő nyíllal), `TwoThermoCard` (két hőmérő: előtte – utána); az 1. leckéből `ThermoCard`, `BigTextCard`.
4. **`NegChangesG3Theory.tsx`** – hidegebb/melegebb, sorrend, fölfelé–lefelé, hány fokkal (négy eset), 3 mintapélda (változás a 0-n át; „hűlt 9 fokkal” – mennyi lett; igaz–hamis állítás igazzá tétele), „Vigyázz!” (–2 → 5 nem 3 fok; a –9 °C hidegebb, mint a –4 °C).
   - **Labor I – Állítsd be a hőmérőt!** Kiinduló érték + „melegedett/hűlt k fokkal”; a gyerek ▲/▼ gombokkal fokonként mozgatja az oszlopot (lépésszámláló), majd ellenőriz. Célzott visszajelzés: rossz irány, kevés/sok lépés.
   - **Labor II – Mennyit változott?** Két leolvasás a hőmérőn; 4 válasz (jó, fordított irány, a 0-n átlépésnél tipikus „kivonós” hiba). Jó válasz után a nyíl kettéosztva mutatja a két részt.
   - **Labor III – Sorba rendezés:** 5 véletlen hőmérséklet, növekvő vagy csökkenő sorrend koppintással; a sorrend < / > jelekkel épül fel, hibánál tipp.
5. **`NegChangesG3Quiz.tsx`** – `NEG_CHANGES_G3_QUESTIONS`: 30 kérdés (10/10/10), 22 kérdésnél ábra, badge mindenhol, 3 puska. `g3-neg-valtozasok-quiz`.
6. **`NegChangesG3Matcher.tsx`** – `NEG_CHANGES_G3_MATCHER_LEVELS`: változás a 0 egyik oldalán; átlépés a 0-n; „mennyi lett?” (hőmérő-kártyák). `g3-neg-valtozasok-matcher`.
7. **`NegChangesG3Sorter.tsx`** – `NEG_CHANGES_G3_SORTER_LEVELS`: melegedett / hűlt / nem változott; 3 / 5 / 8 fokkal; –2 °C / 0 °C / 3 °C lett. `g3-neg-valtozasok-sorter`.

**Teszt:** `src/test/grade3Topic9NegChangesG3.test.tsx` (a párosító és csoportosító szöveges kártyáinak helyességét is számolja).

## Eltérések a tankönyvtől

- **„+2 °C” (TK 99/6. 2. állítás):** a könyv itt egyszer pluszjellel írja a pozitív hőmérsékletet, máshol sehol. Nálunk egységesen előjel nélkül: 2 °C (a mínusz csak a 0 alatti értékek előtt áll).
- **A változás szavai (MF 22/10.):** a könyv egy táblázatban hétféle szót használ (melegedett, csökkent, növekedett, emelkedett, enyhült, hűlt, „hidegebb/kevesebb/fagyosabb lett”) magyarázat nélkül; a „csökkent 3 °C-ot” és a „3 °C-kal” keveredik. Nálunk egységesen „melegedett … fokkal” / „hűlt … fokkal”; a „fok” és a „°C” különbsége: a hőmérséklet °C, a változás „fok”.
- **Kétértelmű mondat (MF 21/6. 2. nap):** „A tegnap reggeli hőmérséklet nőtt 6 °C-kal” – nem derül ki, hogy a tegnap reggeli érték nőtt-e, vagy ahhoz képest lett melegebb ma reggel. Nálunk minden változásnál ki van mondva, mihez képest.
- **Táblázat-szerkezet (MF 22/10.):** a „Délelőtt” sorban áll a változás, a „Dél” sorba kell írni az eredményt – ez a sorok neveiből nem következik. Nálunk a kétlépéses feladatok mondatban vannak („Délig melegedett 7 fokkal, estére hűlt 5 fokkal”).
- **Számkör (TK 99/8., MF 21/7.):** –89 °C és –35 °C különbsége (54), illetve 24 °C és –9 °C (33) messze a tanult kis számok fölött van. Nálunk a legnagyobb különbség 24 fok, a leghidegebb érték –15 °C (fagyasztó).
- **Grafikon (MF 20/4.):** a könyv a reggeli méréseket összekötő vonallal ábrázolja, mintha a hőmérséklet napközben egyenletesen változna. Nálunk is van grafikon, de a kérdések csak a jelölt pontokra (reggelekre) vonatkoznak, és ezt ki is mondjuk.
- **Tudatos didaktikai változtatások:**
  - A könyv a változás kiszámításához csak a műanyag hőmérőt ajánlja. Nálunk kimondott stratégia van: a 0 egyik oldalán kivonás vagy lépkedés, a 0-n átlépve **két részben** (a 0-ig, aztán tovább) – ezt az ábra kettéosztott nyila is mutatja.
  - A leggyakoribb hiba (–2 °C → 5 °C „3 fok”) a „Vigyázz!” dobozban, a Labor II válaszaiban és a kvíz zavaró válaszaiban is szerepel.
  - A „hidegebb” és a „kisebb” összekapcsolása (–6 °C < –1 °C) a MF 20/5. relációs feladatát készíti elő.
  - Saját szereplő (Zsófi) és saját számok; a könyv szereplői (Viki, Bence) és adatai (–3 → 9, 7/–5/0/–14/12, 5/–6/–12/–18 °C) nem szerepelnek.

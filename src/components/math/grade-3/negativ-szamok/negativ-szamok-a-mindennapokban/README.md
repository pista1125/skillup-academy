# 1. Negatív számok a mindennapokban (3. osztály, IX. Ismerkedés a negatív számokkal)

**Források:** tankönyv OH-MAT03TA 98. oldal (1–2. feladat, a hőmérő- és Celsius-fok-keret), kitekintésként 99/4, 99/7; munkafüzet OH-MAT03MA II/19–20. oldal (1–3. feladat).

## Mit tartalmaznak a könyv oldalai?

- **TK 98/1.:** időjárás-jelentés térképpel, 5 város hőmérőjével (skála –10…30, felirat 10-esével). Keret: „A hőmérsékletet hőmérővel mérjük. … Celsius-fok, jele: °C. A 0 °C-nál alacsonyabb hőmérsékletet negatív mérőszámmal jelöljük. Például: –3 °C (olvasd: mínusz három celziusz-fok).”
- **TK 98/2.:** hat hőmérő leolvasása (–25…35, felirat 5-önként), beállítás a műanyag hőmérőn.
- **TK 99/4.:** hőmérséklet mérése a teremben és az udvaron, időjárás-jelentés készítése. **99/7.:** hűtő 5 °C, fagyasztók –6, –12, –18 °C.
- **MF II/19/1.:** hőmérőfajták (fürdővíz-hőmérő, kinti hőmérő, lázmérő) párosítása helyzetképekkel. **II/19/2.:** kéthetes időjárás-előrejelzés piros (nappali) és kék (éjszakai) körökkel; mely napokon süllyed a hőmérséklet fagypont alá?
- **MF II/20/3.:** hat hőmérő (–10…20, felirat 10-esével) leolvasása és sorba rendezése.

A könyv a negatív számot **csak a hőmérséklettel** vezeti be; műveletet negatív számokkal nem végeztet (a változásokat szövegesen, hőmérőn lépkedve kéri – ez a 3. lecke témája).

## Mit csinál a DiákZóna lecke?

Saját példák, saját adatok (nincs térkép, nincsenek a könyv városai, szereplői). Sorrend: mit jelent a „mínusz” → a hőmérő részei (°C, skála, 1 vonal = 1 fok, fagypont) → fagypont fölött / alatt (olvadó hóember, befagyott tócsa) → hőmérőfajták → időjárás-jelentés nappal–éjjel → **kitekintés:** mínusz a liftben (földszint 0, pince –1, mélygarázs –2) és a víz alatt (vízfelszín 0, a búvár –3 m). Számkör: –20…+40, a gyakorlatban főleg –15…+20.

Mínuszjel mindenhol a tankönyv szövegének nagykötőjele: **–3 °C** (a `fmt` / `fmtC` segédfüggvény írja ki).

## Komponensek

1. **`NegEverydayG3Parts.tsx`** – közös rajzelemek a teljes fejezethez: `Thermo` (álló hőmérő, 1 fokos vonalak, 5-ös vagy 10-es felirat, fagypont-vonal), `ThermoSvg`, `ThermoRow`, `BuildingSvg` (ház-metszet lift-gombokkal), `ForecastSvg` (piros/kék körös előrejelzés), `LiftPanelSvg`, `DiverSvg`, hőmérőfajta-ikonok, `fmt`, `fmtC`. A 2. lecke is ezt használja.
2. **`NegEverydayG3Figures.tsx`** – `ThermoPartsSvg`, `AboveBelowZeroSvg`, `ThermoTypesSvg`, `WeekForecastSvg`, `LiftBuildingSvg`, `DiverDepthSvg`.
3. **`NegEverydayG3CardFigures.tsx`** – kártyaábrák: `ThermoCard` (párosítóban fekvő, csoportosítóban álló hőmérő 10 fokos ablakkal), `LiftButtonCard`, `MiniHouseCard`, `DiverCard`, `BigTextCard`, `IconCard` (lázmérő, beteg arc, ágy, orvosi táska, fürdőhőmérő-hal, kád, kacsa, szappan, kinti hőmérő, havas fa, ablak, hóember, fagyasztó, hűtő, strand, jég).
4. **`NegEverydayG3Theory.tsx`** – 8 rész + 2 labor:
   - **Labor I – Állítsd be a hőmérőt!** Célhőmérséklet (–12…20, többnyire mínusz); a gyerek a skálára koppint vagy a „▲ melegebb / ▼ hidegebb” gombbal állít. Célzott visszajelzés: előjelcsere („A mínusz azt jelenti: a 0 alatt!”), 1–2 fok eltérés („Számold újra a vonalakat a 0-tól!”). Pontszámláló, „Új feladat”.
   - **Labor II – Olvasd le!** Véletlen hőmérséklet, 5-ös vagy 10-es feliratú skála, 4 válasz (helyes, ellentétes előjelű, ±1, ±2). Tipp a hiba fajtája szerint.
5. **`NegEverydayG3Quiz.tsx`** – `NEG_EVERYDAY_G3_QUESTIONS`: 30 kérdés (10/10/10), 25 kérdésnél ábra, mindegyiknél badge, 3 puska. Azonosító: `g3-neg-mindennapok-quiz`.
6. **`NegEverydayG3Matcher.tsx`** – `NEG_EVERYDAY_G3_MATCHER_LEVELS`: hőmérő (kerek értékek) ↔ „–5 °C”, szóban ↔ számmal; hőmérő (vonalszámlálás) + ház-metszet ↔ szám; helyzet-kép ↔ hőmérséklet / szint / mélység. `g3-neg-mindennapok-matcher`.
7. **`NegEverydayG3Sorter.tsx`** – `NEG_EVERYDAY_G3_SORTER_LEVELS`: hol látod a mínuszt (hőmérséklet / lift / víz alatt); mit vegyél fel (fagy / hűvös / meleg, hőmérő-képek); melyik hőmérővel mérjük (lázmérő / fürdővíz-hőmérő / kinti hőmérő). Kategóriánként 4–5 képes elem. `g3-neg-mindennapok-sorter`.

**Teszt:** `src/test/grade3Topic9NegEverydayG3.test.tsx` (30 kérdés, 10/szint, badge, `correctAnswer: 0`, különböző opciók, nincs kötőjeles mínusz a szövegekben; párosító 3 × 8, csoportosító 3 × 3 × 9, képek száma).

## Eltérések a tankönyvtől

- **Kétféle mínuszjel a könyvben:** a szöveg nagykötőjelet ír („–3 °C”), de a TK 98/2 hőmérőinek skáláján és a MF II/19/2 előrejelzés köreiben rövid kötőjel áll („-5”, „-10”, „-1”). Nálunk szövegben és ábrán is mindig ugyanaz a jel: –.
- **Definiálatlan szavak:** a TK keret „negatív mérőszámról” beszél, de nem mondja ki, mi a negatív szám; a „fagypont” szót a MF II/19/2 úgy használja („fagypont alá süllyed”), hogy a keretben nem szerepel. Nálunk külön rész szól róla: 0 °C = fagypont, ekkor fagy meg a víz; ami a 0 alatt van, az elé mínuszt írunk, és ezek a negatív számok. Azt is kimondjuk, hogy a 0 °C nem fagypont *alatti* (kvíz-csapda is épül rá).
- **Háromféle skála szó nélkül:** a TK 98/1 hőmérői 10-esével, a TK 98/2 hőmérői 5-önként, a MF II/20/3 hőmérői 10-esével vannak feliratozva, 1 fokos vonalakkal – a könyv ezt nem mondja ki. Nálunk: „1 vonal = 1 fok”, „keresd meg a 0-t, onnan számolj”, és a 10-es feliratú hőmérőnél a kérdés szövege is jelzi („Itt csak 10-esével van felirat”).
- **Új jel magyarázat nélkül:** a TK 99/6 egyik állítása „+2 °C”-ot ír; a plusz előjelet a könyv sehol nem vezeti be. Mi a 0 fölötti hőmérsékletet előjel nélkül írjuk (2 °C), ahogy a könyv minden más helyen.
- **Adat nélküli kérdés:** a TK 99/4b („Mely hónapokban van hidegebb az udvaron, mint az osztályteremben?”) a 4a mai mérésére épülne, de havi adatot nem ad. Nem használjuk.
- **Túl nagy számok:** a TK 99/8 –89 °C-ot és –35 °C-ot hoz, és a különbségüket kéri (két negatív szám különbsége) – ez messze túlmegy a 3. osztályos „kis egész számokon”. Nálunk a számkör –20…+40, a hűtő/fagyasztó adatai (5 °C, –18 °C) csak felismerésre szerepelnek.
- **Kitekintés a könyvön túl (tudatos):** a könyv csak a hőmérsékletet mutatja. A TERV.md szerint a liftet (földszint 0, pince –1, mélygarázs –2) is bevesszük, és egy búváros példát (vízfelszín 0, –3 m), mert a gyerek így látja, hogy a mínusz mindig „a 0 alatt” jelent. Az adósságot nem vesszük be: a könyvben nincs, és pénzzel a negatív szám elvontabb (a 4. osztály tanítja).
- **Tudatos didaktikai változtatások:**
  - A könyv rögtön a kész hőmérőt olvastatja; mi előbb megmutatjuk a hőmérő részeit, és a laborban a gyerek maga állítja be a hőmérőt (a könyv műanyag hőmérőjének digitális párja), azonnali, hibára szabott visszajelzéssel.
  - A leggyakoribb hibára (a mínusz lehagyása, ha az oszlop a 0 alatt ér véget) külön „Vigyázz!” doboz és laborvisszajelzés épül.
  - A sorba rendezés, összehasonlítás (hidegebb / melegebb) és a hőmérséklet-változás a 3. lecke témája, ezért itt nincs.

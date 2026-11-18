# 4. Az idő mérése

## Források
- Tankönyv I. kötet (`OH-MAT02TA_I.pdf`), 84–85. o. — *Nap, napszak, óra*
- Tankönyv II. kötet (`OH-MAT02TA_II.pdf`), 35. o. — *Év, évszak, hónap*; 36–37. o. — *Időmérés*; 54–55. o. — *Időmérés*
- Munkafüzet I. kötet (`OH-MAT02MA_I.pdf`), 54–55. o. — *Az idő mérése*
- Munkafüzet II. kötet (`OH-MAT02MA_II.pdf`), 23–24. o. — *Az idő mérése*; 36. o. — *Az időmérés* (a tartalomjegyzék 35. oldalt ír, de a 35. oldal a *Maradékos osztás 7-tel*)

## Mit tartalmaznak a könyv oldalai?
- **TK I/84–85, MF I/54–55:** napszakok (hajnal, reggel, délelőtt, dél, délután, este, éjjel; MF: éjfél), 1 nap = 24 óra, óralap belső 1–12 és külső 13–24 számokkal, egész órák leolvasása és berajzolása, két név (8 óra – 20 óra), digitális kijelző (07:00, 19:00), eltelt egész órák (12-től 18 óráig, 20-tól 24 óráig, kelés–fekvés, napkelte–napnyugta), nyitvatartási táblázat.
- **TK II/35:** évszakok sorrendje, a 12 hónap naptárban, évszakok színezése, 30 és 31 napos hónapok, február 28 nap, szökőév (29 nap).
- **TK II/36–37, MF II/24:** 1 óra = 60 perc, a nagymutató útja (eltelt percek színezett körcikkel), idő leolvasása óra + perc alakban, két napszak szerint (2 óra 30 perc – 14 óra 30 perc), „1 óra múlva”, „30 perc múlva”, „5 perccel ezelőtt”, érkezés kiszámítása (7 óra 30 perc + 15 perc), összehasonlítás (1 óra, 65 perc, fél óra, 30 perc), digitális óra: hány perc az egész óráig.
- **TK II/54–55, MF II/23, 36:** napok ↔ hetek átváltása (7, 14 … 70 nap), „31 nap = 4 hét + 3 nap”, hét napjai a naptárban („ha március 3-a hétfő…”), logikai feladat a hét napjaival, időpont és időtartam megkülönböztetése, napok számolása dátumok között, időtartamok sorba rendezése, hét és nap összehasonlítása.

## Mit csinál a DiákZóna-lecke?
- **Tananyag:** napszakok a Nap útjával, 24 órás óralap és a „+ 12” trükk, kis- és nagymutató, ötösével számolt percek, 15 / 30 / 60 perc körcikkekkel, digitális óra, a hét napjai, napok ↔ hetek táblázat, évszakok és hónapok, 30/31 napos hónapok, szökőév, időpont – időtartam, 3 kidolgozott példa, „Vigyázz!” (felcserélt mutatók, éjfélen át számolás).
- **Labor I – Állítsd be az órát!:** véletlen időpont (1–23 óra, 5 perces lépés); a mutatókat gombokkal (± 1 óra, ± 5 perc) vagy a számra koppintva lehet állítani; a kismutató a percekkel együtt halad. A visszajelzés megnevezi a tipikus hibát (felcserélt mutatók, perc helyett szám, a kismutató helye fél után).
- **Labor II – Naptárjáték:** véletlen hónap (helyes napszámmal) és kezdőnap; feladatok: „1 hét múlva”, „k nap múlva”, „a hónap második keddje”, „a hónap utolsó napja” — koppintás a naptárlapon, azonnali visszajelzés.
- **Kvíz:** 30 kérdés (10/szint), 23 ábrával.
- **Párosító:** egész órák és mértékegységek → óra és perc, digitális óra, két név → eltelt idő, egész óráig hiányzó perc, hét–nap.
- **Csoportosító:** kevesebb / pontosan / több mint 1 óra → tavaszi, nyári, őszi hónap (római számos naptárlapokkal is) → 2, 3, 4 hét.

## Fájlok és teszt
- `TimeG2Parts.tsx` — `ClockPart`, `DigitalPart`, `CalendarPart`, `timeText`, laborok: `ClockSetterLab`, `CalendarLab`
- `TimeG2Figures.tsx` — `DayPartsSvg`, `Clock24Svg`, `HandsSvg`, `MinuteSectorsSvg`, `WeekSvg`, `YearSvg`
- `TimeG2CardFigures.tsx` — `ClockCard`, `DigitalCard`, `SectorCard`, `SpanCard`, `UntilHourCard`, `MonthCard`, `WeeksCard`
- `TimeG2Theory.tsx`, `TimeG2Quiz.tsx` (`g2-meres-ido-quiz`), `TimeG2Matcher.tsx` (`g2-meres-ido-matcher`), `TimeG2Sorter.tsx` (`g2-meres-ido-sorter`)
- Teszt: `src/test/grade2Topic8TimeG2.test.tsx`

## Eltérések a tankönyvtől
- **Saját feladatok, saját nevek és számok**; a könyv szereplői (Kata, Lili, Bence, Réka, Gergő, Peti, Zoli) nem szerepelnek.
- **„negyed”, „háromnegyed” nincs:** a könyv ezeket a szavakat nem tanítja, csak „15 perc”, „45 perc” alakot és a „fél óra = 30 perc” kifejezést (MF II/24/3). Mi is így írjuk; a „fél 8” típusú kifejezést sem használjuk.
- **Éjfél = 24 óra:** a könyvet követjük (TK I/84, MF I/54: „24 óra”, „20-tól 24 óráig”); a digitális „0:00” alakot nem vezetjük be.
- **Az évszakok hónapjai** a könyv színezős feladata (TK II/35/2) alapján, az iskolai szokás szerint: tavasz III–V, nyár VI–VIII, ősz IX–XI, tél XII–II. A csillagászati évszakhatárokat (március 21. stb.) nem említjük.
- **MF II/36/3 „12 hónap ○ 52 hét”:** a könyv nem tanítja, hogy egy évben kb. 52 hét van, és a válasz (365 nap > 364 nap) 2. osztályban nem kikövetkeztethető → nem használjuk. Ugyanitt a „2 hét ○ 1 hónap”, „5 hét ○ 1 hónap” csak úgy dönthető el, ha tudjuk, hogy egy hónap 28–31 nap — ezt nálunk mindig konkrét hónappal kérdezzük.
- **MF II/24/4 (4:28, 1:41):** egyperces pontosságú leolvasást csak digitális órán kérünk; mutatós órán 5 perces lépésekben maradunk (a könyvben is így van).
- **TK II/36/2 és 36/4:** az ábrákon a kismutató pontosan egy számon áll, pedig a percek miatt már a következő felé kellene járnia (pl. 9 óra 5 perc). Nálunk a kismutató mindig a percekkel együtt halad, és ezt a tananyag ki is mondja („Vigyázz!”, laborvisszajelzés).
- **Szorzás csak a hét–nap átváltásnál** (3 · 7 = 21), az osztás kifejezést („42 nap = 6 hét”) nem írjuk ki műveletként; a „teljes hét + maradék nap” feladat (TK II/54/1) 30 napra, összeadással-kivonással magyarázva szerepel.
- **TK II/55/1 (Budapest-kirándulás logikai táblázat)** és **TK II/37/4 (metró 3 percenként)** kihagyva: hosszú olvasnivaló 7–8 éveseknek; helyette rövid nyitvatartási tábla (két sor).
- **Interaktív eszközök** a papír helyett: állítható mutatós óra, kattintható naptár, véletlen „Új feladat”.

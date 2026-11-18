# 4. Szorzás 5-tel

## Források
- Tankönyv I. kötet (`OH-MAT02TA_I.pdf`, nyomtatott oldalszám): **124–129. o.**
  - 124–126.: „Szorzás, osztás 5-tel” – 5 fős csoportok ujjai, ötösével csoportosítás (kalapok, gombok, tányérok), vásári árusítóhelyek 5 méterenként a számegyenesen, 5-ös szorzó- és bennfoglalótábla kezekkel, pótlásos feladatok, „ötszöröse / ötöde” nyilak.
  - 127–128.: „Az 5-ös és 10-es szorzótábla kapcsolata” – ötösével és tízesével lépkedés a számegyenesen, 5-ös/10-es táblázat, `6 · 5 = □ · 10` típusú pótlás, fazekas-táblázat (2, 5, 10 naponta), csoportosítás 5-ösével és 10-esével, „5 többszöröse, de 10-nek nem” hordók.
  - 129.: „Szöveges feladatok – Vásárban” – körhinta, patkószög, életkor, hordó, agyag, bábelőadás, persely.
- Munkafüzet I. kötet (`OH-MAT02MA_I.pdf`): **75–78. o.** – összeadás és szorzás képről, szorzattáblázat, igaz/hamis szívek, szabályos léggömbök, veréb és béka a számegyenesen, 5 és 10 többszörösei (csészék), mézeskalács-táblázat, összehasonlítás, „négyszer annyi” szöveges feladatok.

## A DiákZóna lecke
A könyv a szorzást és az osztást együtt tanítja. Ez a lecke **csak a szorzást** veszi (a műveletek: + − ·). Az osztás és a maradékos osztás a `osztas/osztas-5-tel` leckében van.
- Ötösével csoportosítunk: 1 kéz = 5 ujj, `5 + 5 + 5 = 3 · 5 = 15`.
- Az 5-ös szorzótábla `0 · 5`-től `10 · 5`-ig, ugrások a számegyenesen, a szorzat **0-ra vagy 5-re** végződik (páros/páratlan szorzó), szomszéd szorzat (`9 · 5 = 50 − 5`).
- Az 5-ös és a 10-es tábla kapcsolata: `2 · 5 = 1 · 10`, …, `10 · 5 = 5 · 10`, 5 Ft-os és 10 Ft-os érmék, „csak az 5-ös táblában” (5, 15, 25, 35, 45).
- Szöveges feladatok vásárban (zsetonnal, saját helyzetekkel), „ötször annyi”, kétlépéses feladatok.
- **2 labor:** *Kezek és ujjak* (kezek felrakása, a szorzat kiválasztása, hibára célzott visszajelzés); *Fizess 5 Ft-ossal és 10 Ft-ossal!* (ugyanazt az árat kétféle érmével kell kifizetni, ebből látszik, hogy 5 Ft-osból kétszer annyi kell).

## Fájlok
- `Mult5G2Parts.tsx` – közös SVG elemek (kéz, érme, zseton, pöttyök, számegyenes, vásári rajzok) és a két labor
- `Mult5G2Figures.tsx` – `HandsGroupsSvg`, `FiveJumpsNumberLineSvg`, `FiveTenLinesSvg`, `CoinsFiveTenSvg`, `FairPricesSvg`
- `Mult5G2CardFigures.tsx` – kártyaábrák (150 × 80 és 80 × 80)
- `Mult5G2Theory.tsx` – tananyag
- `Mult5G2Quiz.tsx` – 30 kérdés (`g2-szorzas-5-quiz`), 26 ábrával
- `Mult5G2Matcher.tsx` – 3 × 8 pár (`g2-szorzas-5-matcher`)
- `Mult5G2Sorter.tsx` – 3 × 9 elem (`g2-szorzas-5-sorter`)
- Teszt: `src/test/grade2Topic4Mult5G2.test.tsx`

## Eltérések a tankönyvtől
- **Szorzás és osztás szétválasztva:** a könyv („Szorzás, osztás 5-tel”) egy oldalon kéri a szorzó- és a bennfoglalótáblát. Itt csak szorzás van; a TK 129/1. (körhinta, 25 : 5) és 129/3. (életkor, 45 : 5) valójában osztás, ezért ezek típusa az osztásos leckébe került.
- **TK 129/7. (persely):** „Melyikük gyűjtött több pénzt?” – a helyes válasz az, hogy *egyikük sem*, mert 5 · 10 = 10 · 5 = 50. A kérdés azt sugallja, hogy van egy nagyobb. Nálunk a hasonló feladat (4 · 10 és 8 · 5) válaszlehetőségei között ott van az „Ugyanannyit gyűjtöttek”, és ez a helyes.
- **TK 127/3. (fazekas):** a táblázat 9 napig megy, így 9 · 10 = 90 is kell, ami túllépi az 5-ös tábla 50-es határát. Nálunk az 5-ös és 10-es összehasonlítás mindig 50-ig marad (`10 · 5 = 5 · 10`).
- **MF 76/1.:** az 5-ös tábla gyakorlásában váratlanul `7 · 4` is szerepel. Nálunk az 5-ös gyakorlás csak 5-ös szorzásokat tartalmaz.
- **Pénz és árak:** a könyv kitalált „peták” pénzt használ. Mi az érmék megszámolásánál valódi forintot (5, 10 Ft) használunk, az árakhoz viszont vásári **zsetont**, mert 5 Ft-os perec a valóságban nincs.
- **„Ötször annyi”:** a munkafüzet „négyszer annyi” feladatait (MF 78/1.) az 5-ös táblához igazítottuk, és szakaszos ábrát adtunk mellé. A csapda: az „5-tel több” nem ugyanaz, mint az „ötször annyi”.
- Az óralap (5 perces lépések) a régi README-ben szerepelt, de ezeken az oldalakon nincs benne, ezért kimaradt.
- Saját feladatok, számok és szereplők; a könyv mesterei (kádár, patkolókovács, mézeskalácsos) nem szerepelnek.

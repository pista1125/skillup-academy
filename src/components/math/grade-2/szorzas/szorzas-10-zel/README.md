# 9. Szorzás 10-zel

## Források
- Tankönyv I. kötet (`OH-MAT02TA_I.pdf`, nyomtatott oldalszám): **56–57. o.** és **127–128. o.**
  - 56.: „Szorzás, osztás 10-zel” – befőttesüvegek szilvával, `10 + 10 + … = □ · 10` táblázat 0-tól 10-ig a bennfoglalással együtt, címkék és gyümölcsrajzok táblázata, szorzás és osztás képről (2 × 10 csipkebogyó).
  - 57.: pótlás (`□ · 10 = 60`, `4 · □ = 40`, `100 : □ = 10`), mérleg 10 kg-os ládákkal, gyümölcsök kosárba (`80 > ● > 50` típusú nyitott mondatok).
  - 127–128.: „Az 5-ös és 10-es szorzótábla kapcsolata” – ötösével és tízesével lépkedés, 5-ös/10-es táblázat, `6 · 5 = □ · 10`, fazekas-táblázat, csoportosítás 5-ösével és 10-esével, „5 többszöröse, de 10-nek nem” hordók.
- Munkafüzet I. kötet (`OH-MAT02MA_I.pdf`): **37–39. o.** – cukorkasorok és szorzások, tojástartók táblázata, sütis csomagok, csoportosítás 10-esével, pótlások, dióhalmok, `<, >, =` összehasonlítás (2-es és 10-es tábla), nyitott mondatok.

## A DiákZóna lecke
A könyv a szorzást és az osztást együtt tanítja. Ez a lecke **csak a szorzást** veszi (műveletek: + − ·). Az osztás és a maradékos osztás az `osztas/osztas-10-zel` leckében van.
- Tízesével csoportosítunk: tízesrudak, `10 + 10 + 10 + 10 = 4 · 10 = 40`, „4 tízes = 40”.
- A 10-es szorzótábla `0 · 10`-től `10 · 10 = 100`-ig, számegyenes 0–100, a szorzat mindig 0-ra végződik, felcserélhetőség (`10 · 6 = 6 · 10`), `0 · 10 = 0`.
- Tojástartók, 10 kg-os ládák a mérlegen, valódi forint: 10 Ft-osok számolása, `50 Ft = 5 · 10 Ft`, `100 Ft = 10 · 10 Ft`.
- Az 5-ös és a 10-es tábla kapcsolata: `1 · 10 = 2 · 5`, …, `5 · 10 = 10 · 5`, átváltás 5 Ft-os és 10 Ft-os között.
- Rövid, legfeljebb kétlépéses szöveges feladatok (persely, matricák, mérleg, „mennyivel több”).
- **2 labor:** *Tízesrudak* (rudak felrakása, a szorzat kiválasztása, hibára célzott visszajelzés: `+` és `·` keverése, egy rúddal elszámolás); *Gyűjts a perselybe!* (`□ · 10 = 70`: annyi 10 Ft-ost kell bedobni, hogy kijöjjön az összeg; nincs futó összeg, a gyerek számol).

## Fájlok
- `Mult10G2Parts.tsx` – közös SVG elemek (tízesrúd, egyeskocka, érme, tojástartó, láda, kéz, persely, számegyenes 0–100) és a két labor (`RodsLab`, `PiggyLab`)
- `Mult10G2Figures.tsx` – `TenRodsSvg`, `TenJumpsSvg`, `FiveTenLinkSvg`, `CoinsTenSvg`, `EggBoxesSvg`
- `Mult10G2CardFigures.tsx` – kártyaábrák (150 × 80 és 80 × 80)
- `Mult10G2Theory.tsx` – tananyag
- `Mult10G2Quiz.tsx` – 30 kérdés (`g2-szorzas-10-quiz`), 25 ábrával
- `Mult10G2Matcher.tsx` – 3 × 8 pár (`g2-szorzas-10-matcher`)
- `Mult10G2Sorter.tsx` – 3 × 9 elem (`g2-szorzas-10-sorter`)
- Teszt: `src/test/grade2Topic4Mult10G2.test.tsx`

## Eltérések a tankönyvtől
- **Szorzás és osztás szétválasztva:** a TK 56–57. és az MF 37–39. a szorzó- és a bennfoglalótáblát együtt kéri. Itt csak szorzás van; a `30 : 10`, `□ : 10 = 9` típusú feladatok az osztásos leckébe kerültek.
- **Sorrend:** a könyvben a 10-es tábla (56. o.) jóval az 5-ös előtt van, a kapcsolatuk pedig a 127. oldalon. A DiákZóna-sorrendben a 10-es a 9. lecke, ezért a gyerekek már ismerik az 5-ös táblát, és a kapcsolatot rögtön itt tárgyaljuk.
- **TK 57/1.:** a 10-es pótlások közé `10 : 2`, `20 : 2` és `5 · 2` keveredik. Nálunk a gyakorlás csak 10-es (és a kapcsolatnál 5-ös) műveleteket tartalmaz.
- **TK 57/2. (mérleg):** a harmadik képen két, egymást takaró ládaoszlop áll, a hátsó ládák nem számolhatók meg biztosan. A DiákZóna mérlegén a ládák egymás mellett, jól láthatóan állnak.
- **TK 57/3. (kosarak):** a `80 > ● > 50` és `20 < ⬢ < 50` kosárba két-két gyümölcs is kerül; a feladat ezt nem mondja ki, ezért sok gyerek kosaranként egyet keres. Nálunk a hasonló „kevesebb / pontosan / több, mint 50” válogatásnál egyértelmű, hogy egy dobozba több kártya kerül.
- **Pénz:** a könyv kitalált pénzt használ; mi valódi forintot (5, 10, 50 Ft-os) használunk, árak helyett számolásra, átváltásra és perselyre, mert ezek a valóságban is így vannak.
- **Csapda kiemelve:** `7 · 10 = 17` (a + és a · keverése) és `0 · 10 = 0` (nem 10) – a könyv nem emeli ki, nálunk „Vigyázz!” doboz és kvízkérdés is van rá.
- Saját feladatok, számok és szereplők; a könyv befőttesüveges, címkés és fazekas feladatai nem szerepelnek.

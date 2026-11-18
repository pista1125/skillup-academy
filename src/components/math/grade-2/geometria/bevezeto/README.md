# 1. Tájékozódás, vonalak, logikai lapok (2. osztály, VII. Geometria)

## Források
- **TK II/4–5, 9** (Testek, síkidomok fejezet tájékozódós részei): táblázatbeli helyek kóddal (A1, D3 …), lépés a táblázatban nyilak szerint (↓ → ↑ ←), rajzolás négyzetrácson nyilak szerint a piros ponttól, logikai lapos sor folytatása („csak egy tulajdonságban térjen el”).
- **TK II/7–8**: logikai lapos sorok, kakukktojás, ábrák építése logikai lapokból.
- **TK II/22** (2. feladat): térkép útkereszteződésekkel, „föl, le, jobbra, balra” szavak.
- **TK I/5**: történetmondás „előtt, mögött, jobbra, balra” szavakkal.
- **TK II/118–119** (Játékok logikai lapokkal): telefonos játék, tulajdonságok szerinti kizárás („Sima. Nem négyzet. Piros. Nem kék. Nagy.”), út építése egy tulajdonságnyi eltéréssel, legrövidebb út két lap között, kapuőrjáték.
- **MF II/4–5** (Testek, síkidomok, vonalak): testek / síkidomok / vonalak csoportosítása, „Egyenes vonalak határolják / Görbe vonalak határolják”.

## Mit tanul a gyerek a DiákZónán?
- **Merre van?** fent, lent, fölött, alatt, jobbra, balra, között, előtte, mögötte (polc és sorban álló gyerekek ábrája).
- **Lépések négyzetrácson**: 1 nyíl = 1 lépés; nyílsor olvasása és írása; mezőkód (betű = oszlop, szám = sor).
- **Vonalak**: egyenes, görbe, törött vonal; nyitott és zárt vonal; síkidom határa.
- **Logikai lapok**: 4 tulajdonság (forma, szín, méret, lyuk), lánc egy eltéréssel, kakukktojás, kitalálós, kapuőr.
- **2 interaktív labor**:
  1. *Hova ér a robot?* – véletlen nyílsor, a gyerek a rácson rákoppint a célmezőre; a hiba típusát (jobbra/balra vagy föl/le csere) megnevezi.
  2. *Logikai lánc* – 4 lapból a pontosan egy dologban eltérőt kell kiválasztani; a lánc nő, a hibánál megmondja, hány és milyen tulajdonság más.

## Fájlok és teszt
- `GeoIntroG2Parts.tsx` – logikai lap rajz és segédfüggvények, rács, nyíl, robot, tárgyikonok, a két labor
- `GeoIntroG2Figures.tsx` – `PositionSceneSvg`, `QueueSvg`, `GridWalkSvg`, `TableCodesSvg`, `LinesSvg`, `OpenClosedSvg`, `LogicSetSvg`, `LogicChainSvg`
- `GeoIntroG2CardFigures.tsx` – kártyaképek (vonal, nyíl, logikai lap, útvonal)
- `GeoIntroG2Theory.tsx` – tananyag
- `GeoIntroG2Quiz.tsx` – 30 kérdés (`g2-geo-bevezeto-quiz`)
- `GeoIntroG2Matcher.tsx` – 3 × 8 pár (`g2-geo-bevezeto-matcher`)
- `GeoIntroG2Sorter.tsx` – 3 × 3 × 9 elem (`g2-geo-bevezeto-sorter`)
- Teszt: `src/test/grade2Topic7GeoIntroG2.test.tsx`

## Eltérések a tankönyvtől
- **Egységes mezőkód**: a tankönyv II/5. oldalán a betű az oszlopot, a szám a sort jelöli (A–D oszlop, 1–3 sor), a II/13. oldalon viszont fordítva (A–E sor, 1–7 oszlop). A DiákZóna mindenhol egy szabályt használ: **előbb a betű (oszlop, fölül), aztán a szám (sor, oldalt)**.
- **Saját témakör a tájékozódásnak**: a tankönyvben a tájékozódás, a vonalak és a logikai lapok szétszórva, a Testek/Síkidomok és a Szimmetria leckék közé ékelve, illetve a kötet végén (II/118–119) szerepelnek. Itt egy leckébe gyűjtöttük őket.
- **Törött vonal, nyitott/zárt vonal**: a munkafüzet csak az „egyenes vonal” és „görbe vonal” szavakat használja; a törött vonal és a nyitott/zárt vonal a NAT 1–2. évfolyamos tartalma, ezért röviden, képpel bevezettük.
- **Szemben álló társ jobb–bal kezének kérdése** (gyakori hiba) külön csapdaként szerepel; a könyvben ilyen feladat nincs.
- **Nincsenek számolási feladatok a geometriai táblázatokban**: a munkafüzet II/11. oldalán tükrözős számtáblás játék szorzásokkal van; a geometria leckéiben nem kérünk műveletet, csak darabszámot.
- **Logikai készlet**: a négy tulajdonságot (forma, szín, méret, lyuk) és a négy formát (kör, háromszög, négyzet, téglalap) a könyv csak a feladatokból sejteti; mi táblázatban kimondjuk.
- Minden feladat, név és ábra saját; a tankönyv szereplőit és történeteit nem használjuk.

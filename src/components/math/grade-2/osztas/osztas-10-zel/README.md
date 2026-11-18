# 9. Osztás 10-zel

## Források
- Tankönyv I. kötet (`OH-MAT02TA_I.pdf`, nyomtatott oldalszám): **56–57. o.** és **127–128. o.**
  - 56.: „Szorzás, osztás 10-zel” – befőttesüvegek szilvával; „Hány üvegre van szükség?” oszlop: `0 : 10 = 0`, `10 : 10 = 1` … `100 : 10 = □`; címkék és gyümölcsrajzok táblázata (visszafelé is), osztások képről.
  - 57.: pótlások `30 : 10 = □`, `□ : 10 = 9`, `100 : □ = 10`, `10 : □ = 1`; a 10-es pótlások közé keveredik `10 : 2`, `20 : 2`.
  - 127–128.: „Az 5-ös és 10-es szorzótábla kapcsolata” – csoportosítás 5-ösével és 10-esével (a tankönyvben szorzással és osztással lejegyezve), `6 · 5 = □ · 10`.
- Munkafüzet I. kötet (`OH-MAT02MA_I.pdf`): **37–39. o.** – csoportosítás 10-esével (`20 : 10 = □`), pótlások (`60 : 10`, `1 = □ : 10`), almák tálakra („Hány tálra van szükség?”), dióhalmok csoportosítása szorzással és osztással, nyitott mondatok (`40 : 10 < ◆ < 4 · 2`).

## A DiákZóna lecke
A könyv a szorzást és az osztást együtt tanítja; a szorzás a `szorzas/szorzas-10-zel` leckében van. Ez a lecke az osztásról szól (műveletek: + − · :).
- **Bennfoglalás:** hány tízes van benne? 60 tojás → 6 tartó, `60 : 10 = 6`.
- **Szétosztás 10 részre:** 30 dió 10 tányérra, `30 : 10 = 3`; mindkettőt ugyanúgy írjuk.
- A 10-es bennfoglaló tábla `0 : 10`-től `100 : 10`-ig, a szorzás segít (`70 : 10 = 7, mert 7 · 10 = 70`).
- **Tízszerese és tizede** oda-vissza nyilakkal.
- **Pénz:** hány 10 Ft-os? `80 : 10 = 8`; egy 50 Ft-os felváltása.
- **Maradékos osztás 10-zel** a könyv jelölésével: „Ennyi csoport: 4, Ennyi maradt: 7”, ellenőrzés `4 · 10 + 7 = 47`. A csoportok száma a tízesek száma, a maradék az egyesek száma; a maradék mindig kevesebb, mint 10. Felfelé kerekítés: 34 gyerek, egy csónakba 10 fér → 4 csónak kell.
- **2 labor:** *Pakold tartókba!* (tojások tartókba pakolása tízesével, utána `n : 10` eredményének kiválasztása); *Maradékos osztás 10-zel* (kockák összekötése tízes rudakká, „Ennyi csoport / Ennyi maradt” léptetők, hibára célzott visszajelzés: van még 10 kocka kint, a maradék 10 vagy több).

## Fájlok
- `Div10G2Parts.tsx` – közös SVG elemek (tízesrúd, egyeskocka, érme, tojástartó, tojás, láda, tányér, rúd+kocka csoport, csónak, számegyenes) és a két labor (`EggPackLab`, `BundleLab`)
- `Div10G2Figures.tsx` – `EggPackingSvg`, `SharingTenSvg`, `TenthArrowsSvg`, `CoinsSplitSvg`, `RemainderRodsSvg`, `BoatsRoundUpSvg`
- `Div10G2CardFigures.tsx` – kártyaábrák (`TargetCard150`, `JumpCard150`, `PlatesCard150`, `CoinSwapCard150`, `RodsCubesCard150`, `TargetCard80`, `RodsCubesCard80`, `EggNumCard80`)
- `Div10G2Theory.tsx`, `Div10G2Quiz.tsx` (`g2-osztas-10-quiz`, 30 kérdés, 21 ábrával), `Div10G2Matcher.tsx` (`g2-osztas-10-matcher`), `Div10G2Sorter.tsx` (`g2-osztas-10-sorter`)
- Teszt: `src/test/grade2Topic5Div10G2.test.tsx`

## Eltérések a tankönyvtől
- **Maradékos osztás 10-zel – saját kiegészítés:** a könyv ezeken az oldalakon nem tanít maradékos osztást 10-zel. Mivel a DiákZóna-sorrendben a gyerekek a többi maradékos osztást már ismerik, itt természetes folytatásként szerepel: a csoportok száma a tízesek, a maradék az egyesek száma (`47 = 4 · 10 + 7`). A könyv jelölését használjuk („Ennyi csoport / Ennyi maradt”), nem írunk „47 : 10 = 4 maradék 7” alakot.
- **„A maradék kevesebb, mint 10”:** „Vigyázz!” doboz, labor-visszajelzés és egy „Javítsd ki!” kvízkérdés (47 → 3 csoport, maradt 17 hibás).
- **TK 57/1.:** a 10-es pótlások közé `10 : 2` és `20 : 2` keveredik (a 2-es bennfoglalás). Nálunk a gyakorlás csak 10-zel oszt; más táblát csak összehasonlításnál (`80 : 10` és `3 · 3`) használunk.
- **Szétválasztott fejezetek:** a TK 56–57. és az MF 37–39. együtt kéri a szorzást és az osztást; a 10-es szorzás a „9. Szorzás 10-zel” leckében van, itt az osztás áll a középpontban.
- **Pénz:** a könyv kitalált pénzt használ; mi valódi forintot (10 és 50 Ft-os) használunk felváltásra és számolásra. 1 Ft-os érme nincs, ezért a pénzes maradékos feladatokat elhagytuk.
- **Felfelé kerekítés:** a könyv nem kérdezi, hány tálca / tartó *kell*, ha marad; a DiákZóna kiemeli (csónakok, tojástartók), mert a gyerekek gyakran a teli csoportok számát mondják.
- Saját feladatok, számok és szereplők; a könyv szilvás, címkés és almás feladatai nem szerepelnek.

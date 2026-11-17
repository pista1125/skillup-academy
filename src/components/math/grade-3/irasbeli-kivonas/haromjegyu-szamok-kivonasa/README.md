# 1. Háromjegyű számok kivonása (VIII. Írásbeli kivonás)

## Források
- Tankönyv (OH-MAT03TA) **86–87. o.**: játékbolt-kép árakkal (500 Ft-ból mit lehet venni, igaz-hamis állítások), sorbarendezés (4 játék a kosárba), kerek százas elvétele játékpénzzel (485 Ft − 300 Ft; 470 − 100 … 475 − 300), kerek tízesek kivonása százasátlépéssel (430 − 350, 420 − 180 …), mennyi marad 500 Ft-ból (80, 160, 305, 465, 285, 395, 345, 245 Ft).
- Munkafüzet II (OH-MAT03MA_II) **4. o.**: különbség, „mennyivel kisebb/nagyobb” kerek százassal; persely érméi és vásárlás; kerek tízesek különbségei (490 − 230, 400 − 270, 420 − 280 …).

## A DiákZóna lecke
Fejben számolás az írásbeli kivonás előtt, saját példákkal: kerek százas elvétele (465 − 200), kerek tízesek felváltás nélkül (470 − 230) és felváltással (420 − 180: 1 százas = 10 tízes), visszaugrás a számegyenesen (420 − 100 − 80), pótlás 500-ig (500 − 285: +15, +200), játékbolt saját árakkal.

- **Labor I – Felváltó:** korongok a helyiérték-táblázatban; a gyerek maga váltja fel a százast 10 tízesre („Felváltok”), majd elveszi a kivonandót (áthúzott korongok) és kiválasztja a maradékot. Ha felváltás nélkül próbál elvenni, a gép szól. Három feladattípus, „Új feladat” gomb.
- **Labor II – Mennyi marad?:** véletlen pénztárca-összeg és játék-ár (kerek százas / kerek tízesek felváltással / 500-ból pótlással), a tipikus hibához igazított tippek, sorozatszámláló.

## Komponensek
`ThreeDigitSubG3Parts.tsx` (közös rajzelemek a fejezet 1–3. leckéjének: érme, korong-cella, árcédula, játékikonok, `opts4`, `hoz` rag), `ThreeDigitSubG3Figures.tsx` (SubHundredsSvg, ExchangeTensSvg, JumpBackSvg, FillUpSvg, ToyShopSvg, NoExchangeTensSvg), `ThreeDigitSubG3CardFigures.tsx`, `ThreeDigitSubG3Theory.tsx`, `ThreeDigitSubG3Quiz.tsx` (`THREE_DIGIT_SUB_G3_QUESTIONS`, 30 kérdés), `ThreeDigitSubG3Matcher.tsx`, `ThreeDigitSubG3Sorter.tsx`, `index.ts`.
Teszt: `src/test/grade3Topic8ThreeDigitSubG3.test.tsx`. Aktivitás-azonosító: `g3-wsub-haromjegyu`.

## Eltérések a tankönyvtől
- Saját árak, saját játékok, saját szereplők (a könyv Flóra/Sára/Mona/Ábel/Gergő/Dóri/Zalán neveit nem használjuk).
- A tankönyv 86. oldali sorbarendezési feladata (4 játék a kosárban) a VI. fejezet témája – itt kihagytuk, hogy a lecke a kivonásra figyeljen.
- A könyv a kerek tízesek kivonását (430 − 350) csak gyakorló sorként adja; mi előbb korongokkal kirakjuk és megmutatjuk a **felváltást** (1 százas = 10 tízes), mert az írásbeli kivonás (3. lecke) pontosan erre épül.
- A „mennyi marad 500 Ft-ból” feladatokhoz kifejezetten megtanítjuk a **pótlást** számegyenesen (285 → 300 → 500); a könyv itt csak a feladatot adja.
- Tipikus hiba külön csapdadobozban: „420 − 180 = 360” (a tízeseknél fordítva vonták ki).
- Számkör: a könyvhöz hűen 500-ig maradunk (a fejezet 1000-ig engedne, de az a XII. fejezet anyaga).

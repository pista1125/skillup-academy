# 4. A tükrözés (V. Síkidomok és testek, 4. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., **123–125. oldal**) és munkafüzet (`OH-MAT04MA_II`, **37–38. oldal**) alapján kidolgozott modul 4. osztályosoknak.

---

## Tananyag Áttekintés

- **Tankönyv 123. o.:** melyik állatnak nem a tükörképe látszik a vízen (jegesmedve, pingvin, fóka, kutya); melyik az eszkimó kislány **tükörképe**; tükörkép keresése négyzetrácson; ábrák (kutya, ló, lépcső) tükörképének megrajzolása a füzetbe, ellenőrzés tükörrel.
- **124. o.:** logikai lapokból kirakott építmények tükörképe – „A piros vonal a tükör helyét jelzi.”; félbehajtott írólapból kivágott minták; **szimmetriatengelyek** jelölése pálcikával (eszkimó ruhamotívumok, síkidomok: háromszög, téglalap, négyzet, derékszögű háromszög, ferde négyszög; Parlament, Szent István-bazilika, hópehely); szimmetrikus képek gyűjtése a tengelyek száma szerint.
- **125. o.:** az emberi arc nem pontosan szimmetrikus; tükör a színes rudakból épített téglatestek belsejében; építmény és tükörképe; szimmetrikus testek rudakból; alaprajz szerinti építés és a tükörkép megépítése (piros vonal = tükör); páros játék: építmény és tükörképe.
- **Munkafüzet 37. o.:** szimmetriatengelyek száma képeken; logikai lapos szimmetrikus építmények másik fele; síkidomok összes szimmetriatengelye (négyzet, téglalap, háromszög, trapéz, kör – végtelen sok, deltoid, ferde négyszög, csokornyakkendő).
- **Munkafüzet 38. o.:** tükrözés a tengelyre négyzetrácson (a–h), helikopter és kutya tükörképe (a piros vonal a **tükörtengely**), Rubik-kocka színezése tükörkép szerint.

## Szabályok

- A tükörkép ugyanakkora és ugyanolyan alakú, mint az eredeti, de fordított (a jobbra mutató zászló balra mutat).
- Minden pont tükörképe ugyanolyan messze van a tükörtengelytől, a másik oldalon; függőleges tengelynél ugyanabban a sorban, vízszintesnél ugyanabban az oszlopban.
- Szimmetrikus alakzat: a szimmetriatengely mentén összehajtva a két fele fedi egymást. Négyzet: 4, téglalap: 2, egyenlő oldalú háromszög: 3, egyforma szárú „vödör” négyszög: 1, ferde négyszög: 0, kör: végtelen sok.

> **Csapda:** a minta egyszerű átmásolása (eltolása) a tengely túloldalára tükrözés helyett; a téglalap átlóját tengelynek hinni.

> **Javítás a régi README-hez képest:** a korábbi leírás „geometriai transzformáció”, „PP' ⊥ t” jelölés (LaTeX), „merőlegesség”, „körüljárási irány” fogalmakat használt, és „szabályos háromszöget” említett. A 4. osztályos tankönyv ezek helyett a **tükörkép**, **tükör** (piros vonal), **tükörtengely**, **szimmetrikus** és **szimmetriatengely** szavakkal, tükörrel, hajtogatással, logikai lapokkal és négyzetrácson tanít; jelölések nélkül. A modul ezt követi.

---

## Elkészített Komponensek

1. **`Reflection4Figures.tsx`**
   - `WaterMirrorSvg`: fóka és fa tükörképe a vízen (vízszintes tükörtengely).
   - `GridDogSvg`: kutya és tükörképe négyzetrácson, függőleges tükörtengellyel.
   - `FoldCutSvg`: félbehajtott lapból kivágott, kinyitva szimmetrikus minta.
   - `ShapeAxesSvg`: négyzet (4), téglalap (2), egyenlő oldalú háromszög (3), kör (végtelen sok), „vödör” négyszög (1), ferde négyszög (0), szív (1) szimmetriatengelyei.
   - `FlagFlipSvg`: a jobbra mutató zászló tükörképe balra mutat.
   - `BlocksMirrorSvg`: logikai lapokból rakott vonat és tükörképe.
   - Segédek: `Reflection4Grid`, `DOG_CELLS`, `Reflection4Cell` típus.
2. **`Reflection4Theory.tsx`**: tükörkép a vízen és a tükörben, tükrözés négyzetrácson, a tükörkép fordított, szimmetrikus alakzatok és tengelyeik (táblázat), kidolgozott példák, csapda (eltolás ≠ tükrözés).
   - **Labor I – Tükrözés négyzetrácson:** 5 minta (kutya, ház, szétszórt pöttyök – függőleges tengely; fenyőfa, hajó – vízszintes tengely); a gyerek kattintással kiszínezi a tükörképet, az ellenőrzés zöld kerettel jelzi a hiányzó, piros X-szel a rossz négyzeteket. „Szimmetria-gép” mód: amit balra rajzol, a jobb oldalon azonnal megjelenik a tükörképe.
   - **Labor II – Tükörtengely-kereső:** 6 síkidom (négyzet, téglalap, egyenlő oldalú háromszög, „vödör” négyszög, ferde négyszög, kör); egy szaggatott vonalra kattintva a síkidom lila tükörképe megjelenik – ha ráillik, a vonal tükörtengely (zöld lesz); végül a gyerek megtippeli a tengelyek számát.
3. **`Reflection4Matcher.tsx`**: 3 szint × 8 pár (fogalmak, tengelyek száma, tükrözés rácson).
4. **`Reflection4Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (szimmetrikus / nem / végtelen sok tengely; 1 / 2 / 3+ tengely; tükörkép balra / jobbra / a tengelyen).
5. **`Reflection4Quiz.tsx`**: 30 kérdés (10–10–10), 22 kérdésnél ábra (rács tengellyel, síkidomok, zászlók, vonat, alaprajz), minden kérdésnek típus-címkéje van, 3 puskakártya.

Azonosítók: kvíz `g4-geom-tukrozes-quiz`, párosító `g4-geom-tukrozes-matcher`, csoportosító `g4-geom-tukrozes-sorter`.

---

## Tesztelés

`src/test/grade4Topic5Reflection4.test.tsx` – a 4 komponens és mind a 6 SVG ábra renderelése.

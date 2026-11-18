# 14. Számolás 0-tól 9-ig (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 112–115. o., OH-MAT01MA_I 58–60. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
TK 112: korongokról összeadás és a csere (8 + 1, 1 + 8), két-két összeadás képekről (bögrék, hátizsákok), számolás nyíl szerint (3 —+5→ □), mesekép mókusokról. TK 113: kivonások képekről (törött poharak, feltört diók: 9 − 2, 9 − 7), rajzolás kivonások szerint (7 − 3 … 9 − 6). TK 114: összeadás és kivonás korongokról, számolás (1 + 7, 9 − 2, 9 − □ = 2, □ − 7 = 2), háromtagú kártyák a számegyenesen (2 + 7 − 5, 3 + 3 + 3, 5 + 4 − 1). TK 115: számkártyák színezése (= 6, < 6, > 6), számegyenes: „● > 7”, „2 < ● < 7”, sorozat szabály szerint (−2, +3), bingójáték. Munkafüzet 58–60: összeadás képekről, háromtagú összeadások (3 + 3 + 3, 2 + 2 + 5), nyíl szerint számolás, kivonás képekről, □ − 5 = 4, műveletek színezése eredmény szerint, „hányat kell lépni, hogy a 9-re érjen” (8 + □ = 9), eredmények a számegyenesen, „6 + 3 > △ > 1 + 3”.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`Szamolas0Tol9IgG1Mese`, 11 oldal, 7 mini-feladat): „Pötyi és a mézeskalács-sütés” – 6 csillag + 3 szív süti (6 + 3), a tálca megfordítva (3 + 6, csere), Zümi mézes kanalai nyíl szerint (3 —+5→ □), Csigusz kóstol (9 − 2) és ugyanarról a képről 9 − 7 = 2, süti-doboz 9 hellyel (4 + □ = 9), Zümi elvisz néhányat (9 − □ = 3), három tányér (3 + 3 + 3), „6 + 3 ? 8” jel.
- **Játszótér** (`CookieCalcPlayground`): „Süti-számoló” – véletlen összeadás vagy kivonás 9-ig a tálca képével (két fajta süti / áthúzott sütik), a gyerek a 0–9 gombokkal felel, a □ kitöltődik, Pötyi visszajelez.
- **Játék** (`Szamolas0Tol9IgG1Jatek`): Kérdések 3 × 8 (`SZAMOLAS_0_TOL_9_IG_G1_QUESTIONS`), Párosító 3 szint (`…_PAIRS`: kép ↔ művelet, művelet ↔ eredmény, nyitott mondat ↔ hiányzó szám), Válogató 3 szint (`…_SORT`: összeadás vagy kivonás képe; pont 9 vagy nem; eredmény < 5, = 5, > 5).

Fájlok: `Szamolas0Tol9IgG1Scenes.tsx` (BakeryScene, TrayScene, ArrowCard, SlotBox, PlatesScene), `Szamolas0Tol9IgG1Parts.tsx`, `Szamolas0Tol9IgG1Mese.tsx`, `Szamolas0Tol9IgG1Jatek.tsx`, `index.ts`. Felhasznált közös képek: `a-kilenc` (ünnepi ikonok, `XBox`, `XRow`), `a-nyolc` (`EqCard`, `HopLine`). Teszt: `src/test/grade1Topic3Szamolas0Tol9IgG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese és tárgyak (mézeskalács-sütés, Zümi méze, tálcák, dobozok, tányérok) a könyv poharai, diói, mókusai helyett.
- A számegyenesek a könyvben 10-ig tartanak; nálunk 9-ig (a 10 még nem ismert).
- A „2 < ● < 7” típusú, több megoldású feladat (TK 115, MF 60/3) koppintós formában egy megoldásúra szűkült: „7 < □ < 9”. A △ jel helyett □-t használunk.
- A „rajzolj a kivonás szerint”, a színezős, a bingó- és a mesélős feladatok kimaradtak; a „mondd el, mikor mit számoltál ki” gondolatot a mese 6. oldala (ugyanaz a kép: 9 − 2 és 9 − 7) adja.
- A szabály szerinti sorozat (−2, +3, TK 115/3) kimaradt: két váltakozó szabály túl sok egyszerre olvasás nélkül; a két lépéses számolást a „2 + 7 − 5” és a kis történet (9 − 3 − 2) gyakoroltatja.
- A háromtagú díszítés (TK 111, „9 = 1 + 5 + 3”) innen, a három tányérral jelenik meg.

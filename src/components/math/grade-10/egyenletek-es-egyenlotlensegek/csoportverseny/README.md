# 8. Csoportverseny (65. lecke)

## Tananyag Áttekintés
Kooperatív csapatverseny és interaktív kihívások a 10. osztályos algebrai egyenletek és egyenlőtlenségek fejezetéből (OH-MAT10TA/II 65. lecke):
- Gyorsasági gyökkeresés fejben (Viète-reflexek, hiányos másodfokú egyenletek).
- Detektív hibakeresés levezetésekben (hamis gyökök leleplezése, gyökvesztés elkerülése, relációjelek).
- Csapatstaféta előjeltáblázattal és törtes/abszolútértékes feltételekkel.
- A felelősségmegosztás 4 kooperatív szerepköre: Levezető, Kikötésfelelős, Előjelelemző és Időgazda.

---

## Modul Komponensek

1. **Vizuális elemek (`GroupCompetitionFigures.tsx`)**:
   - `TeamChallengeRelaySvg`: A 4 állomásos kooperatív staféta architektúrája.
   - `ErrorHuntStepAnalysisSvg`: Detektív hibakeresés lépésről lépésre.
   - `SpeedVieteDuelSvg`: Gyorsasági Viète-párbaj stopperóra alatt.
   - `SignChartSprintSvg`: Előjeltáblázat sprint levezetése és határok elemzése.
   - `ScoreboardTournamentSvg`: Bajnokság eredménytáblája és pontozási stratégiája.

2. **Tananyag (`GroupCompetitionTheory.tsx`)**:
   - Jobb felső `quickRule` blokk: **FONTOS SZABÁLYOK** a versenyre.
   - 1. A csoportverseny felépítése és kooperatív szerepek.
   - 2. A hiba-detektív: Tipikus algebrai csapdák leleplezése.
   - 3. Villámkérdések és gyorsasági algebrai reflexek.
   - 4. Kidolgozott csapatfeladatok mintalevezetéssel és pontozással.
   - 5. Tipikus versenytaktikai csapdák és pontozási stratégia.
   - 6. **Interaktív Csoportverseny Aréna és Szimulátor** (3 interaktív állomással a tananyag legvégén).

3. **Párosító játék (`GroupCompetitionMatcher.tsx`)**:
   - 3 nehézségi szint × 8 feladványpár (24 pár).
   - 1. Szint: Villámfeladványok és gyökök.
   - 2. Szint: Detektív feladványok és hibaokok.
   - 3. Szint: Bajnokok ligája és összetett halmazok.

4. **Rendszerező játék (`GroupCompetitionSorter.tsx`)**:
   - 3 nehézségi szint × 3 kategória (szintenként 9 kártya).
   - 1. Szint: Megoldási stratégiák (Azonnali szorzattá alakítás, Kikötéses négyzetre emelés, Megoldóképlet).
   - 2. Szint: Valós gyökök száma a diszkrimináns alapján (D > 0, D = 0, D < 0).
   - 3. Szint: Műveletek ekvivalenciája versenyben (Ekvivalens lépés, Gyökvesztés veszélye, Hamis gyököt hozó lépés).

5. **Kvíz (`GroupCompetitionQuiz.tsx`)**:
   - 30 kérdés 3 szinten (10 kérdés/szint) puskákkal, tippekkel és részletes levezetésekkel.
   - Beépített játékváltó a Párosító és Rendszerező játékokhoz.

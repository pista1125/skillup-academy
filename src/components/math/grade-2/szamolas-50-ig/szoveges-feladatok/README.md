# 5. Szöveges feladatok (2. osztály, II. témakör, 50-ig)

## Források
- **Tankönyv I. kötet** (`OH-MAT02TA_I.pdf`): 81. o. (*A zöldségesnél*), 82. o. (*A kertben*), 96. o. (*Állatkertben*), 120. o. (*Vásárban*).
- **Munkafüzet I. kötet:** a II. témakör oldalainak szöveges feladatai (külön szöveges oldal nincs).

## Mit tartalmaznak a tankönyvi oldalak?
- **TK 81. o.:** elvétel képpel (30 káposztából elvisznek), háromtagú összeg, „…-cel több” (közvetlen), „héttel több, mint” (fordított szövegezés).
- **TK 82. o.:** csupa szorzásos/részes feladat (6 sor × 3 hagyma, 8 sor × 3-3 árvácska, 24 harmada).
- **TK 96. o.:** összevonás, fordított szövegezésű összehasonlítás, hiányzó rész, háromtagú összeg, két lépés (39 − 14 − 6 − 8), parkolóhelyek, kombinatorikai játék.
- **TK 120. o.:** „…-cal több”, háromtagú méter-összeg, két elvétel 50-ből, fordított Ft-os feladat, hordós és dl-es feladat.

## Mit csinál a DiákZóna lecke?
- Saját történetek, saját nevek és számok, **szigorúan 0–50**, csak + és −.
- Tananyag: a megoldás 4 lépése (Mit tudunk? – Mit kérdez? – Számolok – Válaszolok); összevonás/hozzáadás szalagmodellel; elvétel és hiányzó rész (egész − rész, ellenőrzés összeadással); összehasonlítás („mennyivel több?”) két szalaggal; **csavaros (fordított) szöveg** („ez 9-cel több, mint…” → kivonás); két lépéses feladat; mintapéldák; „Vigyázz!” csapdadoboz.
- **Labor I – Melyik művelet?:** 7 feladattípus (hozzáadás, elvétel, még mennyi kell, mennyivel több, …-val több, …-val kevesebb, csavaros szöveg) vagy vegyes; a gyerek előbb a műveletet (+/−) választja, aztán az eredményt; a visszajelzés megnevezi, miért az a művelet, és jelzi, ha a fordított művelet eredményét választotta; pontszámláló.
- **Labor II – Szalagos ábra:** „X-nek ennyi van, Y-nak ennyivel több/kevesebb” – a gyerek a második szalagot ±1, ±10 gombokkal állítja be (közös 50-es mérce), a visszajelzés szól, ha rossz irányba állította.

## Fájlok
- `WordProblems50G2Parts.tsx` – `BarModelPart`, `CompareBarsPart`, `DotsPart`, generátorok (`makeWordTask`, `makeCompareTask`, `WORD_KINDS`)
- `WordProblems50G2Figures.tsx` – `WordStepsSvg`, `JoinBarSvg`, `TakeBarSvg`, `CompareDiffSvg`, `TrickyCompareSvg`, `TwoStepBarSvg`
- `WordProblems50G2CardFigures.tsx` – `DotsCard`, `BarCard`, `CompareCard` (150 × 80 és 80 × 80)
- `WordProblems50G2Theory.tsx`, `WordProblems50G2Quiz.tsx` (30 kérdés, `g2-c50-szoveges-quiz`), `WordProblems50G2Matcher.tsx` (`g2-c50-szoveges-matcher`), `WordProblems50G2Sorter.tsx` (`g2-c50-szoveges-sorter`)
- Teszt: `src/test/grade2Topic2WordProblems50G2.test.tsx`

## Eltérések a tankönyvtől
- **Témakör-tisztaság:** a TK 82. oldala (*A kertben*) teljes egészében szorzásos és „harmada” típusú feladat, ezek a szorzás/osztás fejezetbe tartoznak; a II. témakörben csak + és − van, ezért ezt az oldalt nem dolgoztuk fel.
- **Mértékegység-váltás kihagyva:** a TK 120/6 („ötliteres hordóban 34 dl”) liter–deciliter átváltást kér, ami ennél a témakörnél még nem szerepel; kihagytuk.
- **Félrevezető szövegezés:** a TK 120/5 („43 darab 5 l-es hordót … 15-tel többet, mint a 20 l-esekből”) két fölösleges számot (5 l, 20 l) is tartalmaz egy 7–8 éves gyereknek; nálunk a fordított szövegezésű feladatokban csak a szükséges két szám szerepel.
- **Rövidebb szövegek (didaktikai döntés):** a tankönyv több feladata hosszú, háromtagú szöveg (pl. 96/5: 39 − 14 − 6 − 8); mi rövid, egylépéses vagy legfeljebb kétlépéses feladatokat adunk, egy mondat = egy adat.
- **Kombinatorikai játék (TK 96/7)** nem számolási feladat, kimaradt.
- **Saját kontextusok:** a zöldséges/állatkert/vásár helyzeteit, neveit és számait nem vettük át (pl. a 33 gida / 14 nyúl, a 24 + 17 huszár helyett saját számok).
- **Plusz a papírhoz képest:** szalagmodell minden típushoz, élő művelet-választó labor és állítható szalagos összehasonlító labor.

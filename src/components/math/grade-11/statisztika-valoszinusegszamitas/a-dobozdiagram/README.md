# 3. A dobozdiagram (tankönyv 55. lecke, 166–171. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 166–171. oldal) alapján kidolgozott oktatási modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 3. leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** a *Pénzcsinálók* (Moneyball, 2011) című film – a sportolók mérhető adatainak tudatos, statisztikai értelmezése.

**1. kidolgozott feladat (EB 2021, magyar válogatott, legnagyobb sebességek):** 18 adat növekvő sorrendben:
19,0 23,8 25,0 25,6 26,1 26,3 27,4 28,1 28,8 29,0 29,2 29,7 29,9 30,8 31,3 31,5 31,5 33,8 (km/h).
- a) „Közepes” / „Gyors” határa a medián: (28,8 + 29,0) / 2 = **28,9 km/h**.
- b) Az alsó „fél” mediánja **26,1 km/h**: „Közepes”, aki legalább 26,1 km/h, de 28,9 km/h-nál lassabb.
- c) A felső „fél” mediánja **30,8 km/h**; „Villám”: Botka, Fiola, Nego, Szalai Attila (a határon lévő Kleinheisler besorolása programfüggő).
- d) Gulácsi Péter a kapus.

---

## 📐 Elmélet

- **Kvartilisek:** Q₁ (alsó kvartilis) – az adatok kb. negyede kisebb vagy egyenlő; Q₃ (felső kvartilis) – az adatok kb. negyede nagyobb vagy egyenlő.
- **Eljárás:** növekvő sorrend; páros elemszámnál a mediánnal kettéosztjuk az adatokat, páratlan elemszámnál a mediánt (csak a középső elemet) elhagyjuk; Q₁ és Q₃ a két „fél” mediánja.
  - 8 adat 1 2 3 3 4 5 6 6 → 2,5; 3,5; 5,5
  - 9 adat 1 2 3 3 4 5 5 6 6 → 2,5; 4; 5,5
  - 10 adat 1 2 3 3 4 5 5 6 6 7 → 3; 4,5; 6
  - 11 adat 1 2 3 3 4 5 5 6 6 7 8 → 3; 5; 6
- Más meghatározások is léteznek (pl. MS Excel); decilisek, percentilisek.
- **Terjedelem** = max − min; **félterjedelem** = Q₃ − Q₁ (az adatok kb. 50%-a ebbe a sávba esik; rendszerint nem a terjedelem fele!).
- Jelölés: Q₀ = minimum, Q₁, Q₂ = medián, Q₃, Q₄ = maximum.
- **Dobozdiagram** (box-plot, sodrófadiagram): doboz Q₁-től Q₃-ig, benne vonal a mediánnál, a vonalak a minimumig és a maximumig. Példa: 5, 18, 38, 46, 80 → terjedelem 75, félterjedelem 28.
- **Kiugró adat:** Q₁-nél legalább 1,5 · (Q₃ − Q₁)-gyel kisebb vagy Q₃-nál legalább ennyivel nagyobb; külön ponttal jelöljük, a vonalak ilyenkor a legszélső nem kiugró adatig tartanak.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **2. kidolgozott feladat (gyakorisági táblázat):** 4, 5, 5, 7, 8, 8, 8, 8, 10, 10, 12 → min 4, Q₁ = 5, medián 8, Q₃ = 10, max 12. A dobozdiagramból az adatok nem állíthatók vissza.
- **3. feladat (Rubik-kocka-döntő, Budapest 2019, 44 eredmény):** min 21, Q₁ = 31, medián 34, Q₃ = 40, max 53; kiugró adat nincs (határok: 17,5 és 53,5).
- A tankönyv 1., 2., 4.–7. feladata és a házi feladatok ábrákon alapulnak, amelyek a forrásszövegből nem olvashatók ki; a kvíz hasonló (saját adatokkal készült) dobozdiagram-leolvasási, összehasonlítási, hiányzó-adat és „igaz / hamis / nem dönthető el” feladatokat tartalmaz.

> **⚠️ CSAPDA:** a félterjedelem nem a terjedelem fele: 5, 18, 38, 46, 80 esetén (80 − 5) / 2 = 37,5, de Q₃ − Q₁ = 28.

---

## 💻 Elkészített Komponensek

1. **`BoxPlotFigures.tsx`**:
   - `BoxPlotSpeedsSvg`: a 18 sebesség negyedekre bontva (Lassú / Közepes / Gyors / Villám).
   - `BoxPlotAnatomySvg`: a dobozdiagram részei (Q₀ … Q₄, terjedelem, félterjedelem).
   - `BoxPlotExampleSvg`: a tankönyvi példa (5, 18, 38, 46, 80).
   - `BoxPlotFrequencySvg`: gyakorisági táblázatból pontdiagram és dobozdiagram.
   - `BoxPlotOutlierSvg`: kiugró adatok és a módosított vonalak.
   - `BoxPlotRubikSvg`: a Rubik-döntő dobozdiagramja.
2. **`BoxPlotTheory.tsx`**: EB-feladat, kvartilisek táblázata, terjedelem / félterjedelem / dobozdiagram, kiugró adatok, gyakorisági táblázat, Rubik-feladat, csapda.
   - **I. Laboratórium:** húzható (vagy beírható) adatpontok egy 0–30 skálán, élő dobozdiagram, ötszámos összefoglaló, terjedelem, félterjedelem, kiugró adatok és határaik.
   - **II. Laboratórium:** gyakorisági táblázat (+/− gombok) → felsorolt adatok színezve (alsó fél, medián, felső fél) és élő dobozdiagram.
3. **`BoxPlotMatcher.tsx`**: 3 szint × 8 pár (fogalmak; adatsokaság ↔ medián; adatsokaság ↔ Q₁, medián, Q₃).
4. **`BoxPlotSorter.tsx`**: 3 szint × 3 kategória × 9 elem (hová esik az adat; igaz / hamis / nem dönthető el; kiugró adat).
5. **`BoxPlotQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 14 kis dobozdiagram-ábrával, kérdéstípus-címkékkel, 3 puskakártyával (progress id: `g11-stat-dobozdiagram-quiz`; matcher: `g11-stat-dobozdiagram-matcher`, sorter: `g11-stat-dobozdiagram-sorter`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5BoxPlot.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.

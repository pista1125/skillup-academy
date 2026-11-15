# 2. Diagramok (tankönyv 54. lecke, 162–165. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 162–165. oldal) alapján kidolgozott oktatási modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 2. leckéje.

---

## 🎯 Tananyag Áttekintés

**Elmélet:**
1. **Súlyozott átlag:** az elemeket megszorozzuk a gyakoriságukkal, a szorzatokat összeadjuk, és osztjuk a gyakoriságok összegével.
2. **Diagramok:** oszlopdiagram (gyakoriságok összehasonlítása), kördiagram (az egész részei, középponti szög = gyakoriság : összes · 360°), sávdiagram (megoszlás egy téglalapon), vonaldiagram (változás követése).

### Feladatok (node-dal ellenőrizve)
- **1. (kompetenciamérés, 2013)** Zenekar: 20 vonós, 16 fúvós, 7 ütős, 2 egyéb (45 fő) – arányok 44,4%, 35,6%, 15,6%, 4,4%; középponti szögek 160°, 128°, 56°, 16°. A feladat négy diagramja közül a hibásat kell megtalálni.
- **2. (érettségi, 2011)** Színház: 120 fiatalabb (52,5% / 35% / 12,5%) és 80 idősebb (18,75% / 37,5% / 43,75%). a) 0,1875 · 80 = **15** fő; b) (42 + 30) : 200 = **36%**.
- **3. (érettségi, 2011)** 30 diák pontszámai két feladatban, oszlopdiagram: átlag, medián, kördiagram (1 diák = 12°).
- **4.** Góllövők a 2021-es Eb-n (csoportosított oszlopdiagram): módusz, medián, átlag, terjedelem.
- **HF 1.** 320 tanuló jegyei sávdiagramon (halmozott %: 0; 3,1; 15,6; 57,8; 87,5; 100) ⇒ gyakoriságok 10, 40, 135, 95, 40; terjedelem 4, módusz 3, medián 3, átlag 1075 : 320 ≈ 3,36.
- **HF 2. (érettségi, 2018)** Kördiagram, 30 diák: 24°, 120°, 132°, 84° ⇒ 2, 10, 11, 7 diák; a) legalább 2 órát 18 diák; b) mindhárom eszközt **13** diák használja.
- **Ráadás 1.** IMDb-szavazatok: összesen 1 012 963, átlag ≈ 8,92; a 10-esek relatív gyakorisága ≈ 53,75%; a 9,2-es átlaghoz ≈ 359 981 további 10-es kellene.
- **Ráadás 2.** Big Voice: 8 szavazó, átlag ≈ 9,8 ⇒ 6 db 10-es és 2 db 9-es.
- **Ráadás 3.** Korfák: 1950 piramis → 1990 harang → 2020 urna (öregedő népesség).

> **⚠️ CSAPDA:** különböző létszámú csoportok százalékait nem szabad egyszerűen átlagolni: a 10-nél többször színházba járók aránya 25%, nem (12,5% + 43,75%) : 2 = 28,125%.

> Megjegyzés: a 3. és 4. feladat oszlopdiagramjainak értékei, a HF 3. (kockadobás) diagramja és a korfák pontos adatai a forrásszövegből nem olvashatók ki, ezért a modul ezeknél csak a módszert mutatja be; a kvíz kockadobásos és hőmérsékletes diagramjai, valamint a korfák saját, szemléltető adatok. A Ráadás 2. b)–d) feladatai (szavazók táblázata) nem kerültek feldolgozásra.

---

## 💻 Elkészített Komponensek

1. **`StatChartsFigures.tsx`** (újrahasznosítható `PieChart`, `StackedBar`, `LineChart`, `PyramidShape` komponensekkel; az oszlopdiagram a 1. lecke `MiniBarChart` komponense; kategóriaszínek validált, rögzített sorrendben):
   - `StatChartsOrchestraSvg`: a zenekar oszlop- és kördiagramon.
   - `StatChartsTheaterSvg`: színházba járás két korcsoportban – megoszlási sávdiagram.
   - `StatChartsTypesSvg`: ugyanaz az adatsor oszlop-, kör-, sáv- és vonaldiagramon.
   - `StatChartsGradesBandSvg`: 320 tanuló jegyei sávdiagramon, halmozott százalékokkal, mediánjelöléssel.
   - `StatChartsInternetPieSvg`: napi internetezés kördiagramon, szögjelöléssel.
   - `StatChartsPyramidSvg`: sematikus korfák (piramis, harang, urna).
2. **`StatChartsTheory.tsx`**: elmélet, kidolgozott feladatok, házi feladatok, Ráadás, csapda.
   - **I. Laboratórium:** kördiagram-készítő – 4 kategória csúszkával, arányok és középponti szögek táblázata, élő kördiagram.
   - **II. Laboratórium:** egy adatsor négy diagramon (oszlop / kör / sáv / vonal váltógomb), súlyozott átlag lépésenként, halmozott százalékok, medián és módusz.
3. **`StatChartsMatcher.tsx`**: 3 szint × 8 pár (diagram/fogalom ↔ leírás; arány ↔ középponti szög; darabszám ↔ középponti szög).
4. **`StatChartsSorter.tsx`**: 3 szint × 3 kategória (melyik diagram illik; mi olvasható le a sávdiagramról; igaz / hamis / nem dönthető el).
5. **`StatChartsQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdéstípus-címkékkel, 22 diagramos kérdéssel, 3 puskakártyával (progress id: `g11-stat-diagramok-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5StatCharts.test.tsx` fájlban található, a 4 komponenst és mind a 6 ábrát ellenőrzi.

# 6. Gyakorlás (tankönyv 57. lecke, 178–179. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 178–179. oldal) alapján kidolgozott oktatási modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 6. leckéje: a statisztikai rész összefoglaló gyakorlása érettségi feladatokkal.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** Big Data – a 2010-es évek „adatforradalma”, ajánlórendszerek, útvonaltervezők, egészségügy, logisztika.

**Összefoglalás:** átlag, medián, módusz; alsó és felső kvartilis (a mediánnal kettéosztott sor két felének mediánja, páratlan elemszámnál a medián kimarad); terjedelem, félterjedelem (Q3 − Q1), szórás σ = √(Σ(xᵢ − x̄)²/n); dobozdiagram, kiugró adat.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1. (érettségi, 2020) kördiagram:** 14 év 14%, 15 év 18%, 16 év 23%, 17 év 21%, 18 év 10%, 19 év 8%, 20 év 6%. Terjedelem 6 év, módusz 16 év, medián 16 év; Q1 = 15, Q3 = 17 (dobozdiagram: 14 | 15 | 16 | 17 | 20); súlyozott átlag 16,43 év.
- **2. (érettségi alapján, 2009):** 6; 4; 5; 5; 1; 10; 7; 6; 11; 2; 6; 5 → a) 5 elhagyásával a medián 6; b) 11 elhagyásával az alsó kvartilis 4; c) 6 elhagyásával a felső kvartilis 7.
- **3. (érettségi alapján, 2021):** b) ha az átlag nem változott, az új dolgozó fizetése a korábbi átlag; c) ha az átlagot vesszük hozzá új adatként, σ′ = σ · √(n/(n + 1)), a szórás csökken (σ = 0 esetén 0 marad).
- **4. Milák Kristóf (200 m pillangó):** 50 m-es szakaszok: 24,66; 28,22; 28,69; 29,16 s; átlag 27,6825 s, szórás ≈ 1,78 s.
- **HF 1. (érettségi, 2021):** 77, 60, 83, 73, 90 → a 6. mérkőzésen 450 − 383 = 67 pont kell.
- **HF 2.:** a hiányzó adat 20; dobozdiagram 15 | 17 | 20 | 20,5 | 22; σ ≈ 2,18.
- **HF 3. (érettségi, 2012):** a) átlagéletkor 289/13 ≈ 22,2 év; b) a kezdőcsapat: 19, 22, 22, 24, 26, 31 (a feltételeknek a 18, 22, 22, 24, 28, 30 is megfelelne, de ezek az életkorok nincsenek a keretben).

> **⚠️ CSAPDA:** a félterjedelem nem a terjedelem fele, hanem Q3 − Q1.

> Megjegyzés: a forrásszöveg kördiagramjánál a 16 és 17 év címkéi a 23% és 21% szeletek mellett egymáshoz közel állnak; a modul a 16 év = 23%, 17 év = 21% leolvasást használja (a medián és a kvartilisek ettől függetlenül ugyanazok). A 3. feladat fizetési diagramjának és az 5. feladat (íjászat) oszlopdiagramjának számadatai a szövegből nem olvashatók ki, ezért a 3. feladat általános formában, az íjászfeladat saját adatokkal (7: 2, 8: 5, 9: 8, 10: 5 találat) szerepel a kvízben.

---

## 💻 Elkészített Komponensek

1. **`StatisticsPracticeFigures.tsx`**:
   - `StatisticsPracticeAgePieSvg`: a diákok életkor szerinti megoszlása (kördiagram).
   - `StatisticsPracticeAgeBoxPlotSvg`: ugyanennek dobozdiagramja.
   - `StatisticsPracticeTwelveNumbersSvg`: a 12 szám rendezve, egy szám elhagyása után Q1, Me, Q3 helye.
   - `StatisticsPracticeSplitTimesSvg`: Milák Kristóf 50 m-es szakaszidői az átlaggal.
   - `StatisticsPracticeMissingDataSvg`: a házi feladat 9 adatának dobozdiagramja.
   - segédek: `StatisticsPracticePieChart`, `StatisticsPracticeBoxPlot`.
2. **`StatisticsPracticeTheory.tsx`**: összefoglaló táblázat, a tankönyvi feladatok kidolgozva, csapda.
   - **I. Laboratórium:** adatsor-elemző – átlag, medián, módusz, terjedelem, Q1, Q3, félterjedelem, szórás és élő dobozdiagram.
   - **II. Laboratórium:** új adat hozzávétele (csúszka, „az átlagot veszem hozzá”, kiugró adat) – hogyan változik az átlag, a medián, a terjedelem és a szórás.
3. **`StatisticsPracticeMatcher.tsx`**: 3 szint × 8 pár (mutató ↔ jelentés; adatsor ↔ Q1; Me; Q3; adatsor ↔ szórás).
4. **`StatisticsPracticeSorter.tsx`**: 3 szint × 3 kategória × 9 elem (középérték / szóródás / diagram; nő / csökken / nem változik; σ < 1 / 1 ≤ σ < 2 / σ ≥ 2).
5. **`StatisticsPracticeQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdéstípus-címkékkel, 8 ábrás kérdéssel (kördiagram, dobozdiagram, oszlopdiagram), 3 puskakártyával (progress id: `g11-stat-statisztika-gyakorlas-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5StatisticsPractice.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

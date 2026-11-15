# 14. Gyakorlás (tankönyv 64. lecke, 200–201. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 200–201. oldal) alapján kidolgozott gyakorló modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 14. leckéje: a valószínűségszámítási rész (7–13. lecke) összefoglalása és gyakorlása.

---

## 🎯 Tananyag Áttekintés

**Összefoglaló:** klasszikus valószínűség (kedvező / összes, komplementer), várható érték, egyszerre húzás, visszatevés nélküli mintavétel, független kísérletek ismétlése, visszatevéses mintavétel (binomiális eloszlás) – döntési térképpel: melyik modellt mikor használjuk.

---

## 📐 Elmélet: legalább, legfeljebb (200–201. o.)

- Az összes lehetséges kimenetel valószínűségének összege 1 – ezért sokszor egyszerűbb a komplementerrel számolni.
- 5 kísérletnél: **P(legfeljebb 2) = P(0) + P(1) + P(2)**; **P(legalább 2) = 1 − [P(0) + P(1)]**.
- A „legalább kétszer” és a „legfeljebb kétszer” **nem** egymás komplementere: mindkettő tartalmazza a „pontosan kétszer” esetet.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** Bence, 6 óra, mindegyiken 0,05: a 6 · 0,05 = 0,3 hibás (az esetek nem zárják ki egymást). a) 1 − 0,95⁶ ≈ 0,2649; b) legalább két órán: 1 − 0,95⁶ − 6 · 0,05 · 0,95⁵ ≈ 0,0328.
- **2.** Dobozdiagram, egy mérés 0,25 eséllyel ≤ Q₁ és 0,25 eséllyel > Q₃; 6 mérés: a) pontosan egyszer > 15,9: 6 · 0,25 · 0,75⁵ ≈ 0,356; b) legalább egyszer: 1 − 0,75⁶ ≈ 0,822; c) mind a (14,5; 15,9] sávban: 0,5⁶ = 1/64 ≈ 0,0156.
- **3.** Vajas pirítós, p = 0,62, 10 szelet: a) 0,38¹⁰ ≈ 0,00006; b) 0,62¹⁰ ≈ 0,0084; c) 1 − 0,62¹⁰ ≈ 0,9916; d) pontosan 7: ≈ 0,2319; e) 7-nél több: ≈ 0,2017; f) legfeljebb 7: ≈ 0,7983.
- **4.** Vírushordozó (2%) a buszon: 30 fő ≈ 0,4545; 20 fő ≈ 0,3324; 10 fő ≈ 0,1829.
- **5.** (Érettségi, 2020) Bolygók: a) 1/2 · 1/4! = 1/48 ≈ 0,0208; b) legalább egy Föld 2 húzásból: visszatevéssel 15/64 ≈ 0,234, visszatevés nélkül 1/4 – visszatevés nélkül nagyobb.
- **HF 1.** 50 gyöngy, 10 selejtes, 5 húzás visszatevéssel: a) 0,8⁵ = 0,32768; b) 0,2⁵ = 0,00032; c) pontosan 1 selejtes (20%): 0,4096.
- **HF 2.** Kocka 10-szer: a) (5/6)¹⁰ ≈ 0,1615; b) (1/6)¹⁰ ≈ 1,65 · 10⁻⁸; c) legalább 8 hatos ≈ 0,0000194; d) legfeljebb 2 hatos ≈ 0,7752.
- **HF 3.** 50 palack, p(hibás) = 0,08: a) 0,92⁵⁰ ≈ 0,0155; b) 0,08⁵⁰ ≈ 1,4 · 10⁻⁵⁵; c) ≈ 0,9845; d) ≈ 1; e) pontosan 4 hibás ≈ 0,2037; f) legfeljebb 4 ≈ 0,6290.

> **⚠️ CSAPDA:** nem kizáró események valószínűségét nem szabad összeadni (Bence: 6 · 0,05 = 0,3; vírus: 30 · 0,02 = 0,6) – helyesen 1 − (1 − p)ⁿ.

> **Megjegyzés (bizonytalan):** a 2. feladat dobozdiagramjának számai a szövegből nem olvashatók ki teljesen. A feladat c) pontja alapján a modul Q₁ = 14,5 és Q₃ = 15,9 értékkel számol; a bajuszok végei és a medián az ábrán szándékosan érték nélkül szerepelnek (a feladathoz nem kellenek).

---

## 💻 Elkészített Komponensek

1. **`ProbabilityPracticeFigures.tsx`**:
   - `ProbabilityPracticeAtLeastAtMostSvg`: „legfeljebb 2” és „legalább 2” a 0–5 sikerszámokon, a közös „pontosan 2” kiemelésével.
   - `ProbabilityPracticeBoxPlotSvg`: a 2. feladat dobozdiagramja a 0,25 / 0,5 / 0,25 valószínűségi sávokkal.
   - `ProbabilityPracticeToastSvg`: a 10 pirítós binomiális eloszlása (p = 0,62), pontosan 7 / 7-nél több kiemeléssel.
   - `ProbabilityPracticeVirusSvg`: 1 − 0,98ⁿ görbéje 10, 20, 30 utasnál.
   - `ProbabilityPracticePlanetsSvg`: Judit bolygósorrendje (érettségi, 2020), 1/48.
   - `ProbabilityPracticeModelMapSvg`: döntési térkép – klasszikus, visszatevés nélküli, binomiális modell.
2. **`ProbabilityPracticeTheory.tsx`**: összefoglaló táblázat, legalább/legfeljebb elmélet, a tankönyv 1–5. feladata és a házi feladatok megoldással, csapda.
   - **I. Laboratórium – legalább, legfeljebb kalkulátor:** n, p, k csúszka, 5 kérdéstípus (pontosan / legalább / legfeljebb / több / kevesebb), kiemelt oszlopok, a rövidebb út (közvetlen vagy komplementer) kijelzése; tankönyvi előbeállítások.
   - **II. Laboratórium – legalább egy:** p és n csúszka, célérték (50 / 90 / 95 / 99%), 1 − (1 − p)ⁿ görbe, a szükséges kísérletszám és a hibás n · p becslés összevetése.
3. **`ProbabilityPracticeMatcher.tsx`**: 3 szint × 8 pár (képletek; tankönyvi feladatok; binomiális kérdések).
4. **`ProbabilityPracticeSorter.tsx`**: 3 szint × 3 kategória × 9 elem (modellválasztás; rövidebb számolási út; valószínűség nagysága).
5. **`ProbabilityPracticeQuiz.tsx`**: 30 vegyes kérdés 3 szinten (10/10/10), kérdéstípus-címkékkel, sikerszám-, dobozdiagram-, pirítós-, busz-, bolygó- és urnaábrákkal, 3 puskakártyával (progress id: `g11-stat-valoszinuseg-gyakorlas-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5ProbabilityPractice.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.

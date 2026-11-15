# 19. Binomiális együtthatók (19. lecke, 56–59. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 56–59. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke egy kötésmintával indul: Anita hétszemenként ismétlődő mintát köt, a 7 szemből 3 sima és 4 fordított. A 7 rekesz közül kell kiválasztani a sima szemek 3 helyét – a kiválasztás sorrendje nem számít:
$$\frac{7 \cdot 6 \cdot 5}{3!} = \binom{7}{3} = 35.$$

---

## 📐 Fő Fogalmak és Összefüggések

- **Kiválasztás sorrend nélkül:** ha n különböző elem közül k darabot választunk ki (minden elemet legfeljebb egyszer, a sorrend nem számít), a lehetőségek száma $\binom{n}{k}$.
  - Nem számít a sorrend, ha részhalmazt választunk; ha két elem kapcsolata szimmetrikus (kézfogás, szakasz végpontjai, mérkőzés); ha a kiválasztottak ugyanolyan szerepbe kerülnek.
- **Kétféle elem sorba rendezése:** 3 egyforma piros és 5 egyforma sárga elem sorrendjeinek száma $\binom{8}{3} = \binom{8}{5} = 56$ (a piros elemek helyeit választjuk ki).
- **Binomiális együtthatók:** az $\binom{n}{k}$ (k, n ∈ ℕ, n ≥ k) megadja egy n elemű halmaz k elemű részhalmazainak számát. Értelmezett k = 0 és n = 0 esetén is: $\binom{n}{0} = 1$, $\binom{0}{0} = 1$.
- **Számológéppel:** nCr funkció, pl. $\binom{11}{6}$ → `11 nCr 6` = 462.
- **Faktoriálisos alak:** $\binom{n}{k} = \dfrac{n!}{k!\,(n-k)!}$ (a szorzatos alakot (n − k)!-sal bővítve).
- **Szimmetria:** $\binom{n}{k} = \binom{n}{n-k}$ – 11 gyerekből a kimenő 6 kiválasztása egyben a bent maradó 5 kiválasztása.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** Kamilla 11 tantárgyából hétfőn 6: **a)** $\binom{11}{6}$ = 462 kiválasztás; **b)** 11 · 10 · 9 · 8 · 7 · 6 = 332 640 órarend.
- **2.** 7 · 6 / 2 = 21: A (kézfogás), C (körmérkőzés), D (7 pont szakaszai), F (2 kártyalap); 7 · 6 = 42: B (SMS), E (titkár és jegyző), G (hajók).
- **3.** 7 elemű halmaz részhalmazai: 1, 7, 21, 35, 35, 21, 7, 1 (szimmetrikus); összesen 128 = 2⁷.
- **4.** 32 lapos magyar kártya: **a)** $\binom{32}{3}$ = 4960; **b)** a maradék 29 lapból 2: $\binom{29}{2}$ = 406.
- **5.** 4 jegyű számok egyesekből és kettesekből: **a)** 5; **b)** 11; **c)** 14; **d)** 11.
- **6.** Múzeum (Kompetenciamérés 2011): **a)** 14 órakor 127 − 93 = 34 fő bent ⇒ $\binom{34}{3}$ = 5984; **b)** az utolsó fél órában / záráskor 164 − 136 = 28 fő távozik ⇒ $\binom{28}{4}$ = 20 475.
- **HF 1.** $\binom{11}{5} = \binom{11}{6}$ = 462 (ugyanannyi); az 5 keddi tárgyból 5! = 120 órarend, kevesebb, mint a hétfői 6! = 720.
- **HF 2.** 15 színből 4: $\binom{15}{4}$ = 1365. **HF 3.** 6 lila és 3 sárga gyöngy egy sorban: $\binom{9}{3}$ = 84.
- **HF 4.** (medicinlabda, Kompetenciamérés 2014) – az oszlopdiagram adatai a szöveges tankönyvkivonatból nem olvashatók ki, ezért a modul nem dolgozza fel.

> **⚠️ CSAPDA:** A rendezett és a rendezetlen kiválasztás összekeverése. 7 emberből titkár és jegyző: 7 · 6 = 42 (két különböző szerep, számít a sorrend), két egyenrangú küldött: $\binom{7}{2}$ = 21.

---

## 💻 Elkészített Komponensek

1. **`BinomialCoefficientsFigures.tsx`**:
   - `ScarfPatternSvg`: a 7 rekeszes sálminta, 3 sima szem, $\binom{7}{3}$ = 35.
   - `TwoColorRowSvg`: 3 piros és 5 sárga elem sorban, $\binom{8}{3} = \binom{8}{5}$ = 56.
   - `CircleChordsSvg`: 7 pont a körvonalon, minden pár összekötve (21 szakasz), 21 vagy 42?
   - `SubsetCountsSvg`: egy 7 elemű halmaz k elemű részhalmazainak száma oszlopdiagramon, szimmetria, 128 = 2⁷.
   - `MuseumVisitorsSvg`: a Földrajzi Múzeum érkező/távozó táblázata a bent lévők számával.
2. **`BinomialCoefficientsTheory.tsx`**: bevezető, kiválasztás sorrend nélkül, kétféle elem sorba rendezése, kiszámítás (szorzatos, faktoriálisos, nCr), speciális értékek táblázata, szimmetria, kidolgozott feladatok, házi feladatok eredményei, csapda.
   - **I. Laboratórium:** n alatt a k kalkulátor (n, k csúszka), kattintható rekeszek / véletlen kiválasztás, rendezett szám ÷ k!, szimmetrikus pár, tankönyvi előbeállítások.
   - **II. Laboratórium:** egy n elemű halmaz részhalmazai elemszám szerint (oszlopdiagram), a szimmetrikus pár kiemelése, összeg = 2ⁿ.
3. **`BinomialCoefficientsMatcher.tsx`**: 3 szint × 8 pár (fogalmak és képletek, értékek, tankönyvi feladatok).
4. **`BinomialCoefficientsSorter.tsx`**: 3 szint × 3 kategória (melyik modell; 21 / 35 / 56; mindig igaz / hamis / n-től, k-tól függ).
5. **`BinomialCoefficientsQuiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel és szükség szerint ábrával, 3 puskakártyával (progress id: `g11-comb-binomialis-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic2BinomialCoefficients.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

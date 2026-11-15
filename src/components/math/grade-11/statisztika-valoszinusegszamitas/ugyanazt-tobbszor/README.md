# 12. Ugyanazt többször (tankönyv 62. lecke, 192–195. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 192–195. oldal) alapján kidolgozott oktatási modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 12. leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat (Özséb tizenegyesei):** Özséb 10-ből 7 tizenegyest rúg be, ezt úgy modellezzük, hogy minden rúgása az előzőktől függetlenül 0,7 valószínűséggel megy be. Két rúgásnál:
- a) mindkettő bemegy: 0,7 · 0,7 = **0,49**;
- b) az első bemegy, a második nem: 0,7 · 0,3 = **0,21**;
- c) egyik bemegy, a másik nem (két eset, összeadjuk): 0,21 + 0,21 = **0,42**;
- d) egyik sem megy be: 0,3 · 0,3 = **0,09**.
Ellenőrzés: 0,49 + 0,42 + 0,09 = 1.

---

## 📐 Elmélet

- **Ugyanazt többször:** ha ugyanazt a kísérletet ismételjük (kockadobás, állandó hibaszázalékkal dolgozó gép, valaki mindig ugyanolyan valószínűséggel végez el valamit), a kísérletek **függetlenek**, és egy esemény valószínűsége minden alkalommal ugyanaz: bekövetkezik p, nem következik be 1 − p.
- n kísérletből **minden alkalommal** bekövetkezik: pⁿ.
- **Csak az első** alkalommal következik be: p · (1 − p)ⁿ⁻¹.
- **Pontosan egyszer** következik be: n · p · (1 − p)ⁿ⁻¹ (n egyenlő valószínűségű, egymást kizáró eset).
- **Megjegyzés:** most nem a „kedvező / összes eset” képlettel számolunk, hanem a lépésenként ismert valószínűségeket szorozzuk. Fontos feltétel a függetlenség – ez nem teljesül visszatevés nélküli húzásnál, a tizenegyeseknél pedig egyszerűsített modell.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** Kató (p = 0,6) ötször dob: a) 0,6⁵ = 0,07776; b) 0,4⁵ = 0,01024; c) 0,6 · 0,4⁴ = 0,01536; d) 5 · 0,01536 = 0,0768.
- **2.** Kocka háromszor: a) 1/216; b) 25/216 ≈ 0,1157; c) 75/216 = 25/72 ≈ 0,3472.
- **3.** Gép, p = 0,05, 20 termék: a) 0,05²⁰ ≈ 9,5 · 10⁻²⁷; b) 0,95²⁰ ≈ 0,3585; c), d) 0,05 · 0,95¹⁹ ≈ 0,0189; e) 20 · 0,05 · 0,95¹⁹ ≈ 0,3774.
- **4.** Ötödikre az első hatos: (5/6)⁴ · 1/6 ≈ 0,0804. a) elsőre hatos (1/6) valószínűbb, mint hogy a második az első hatos (5/36); b) a 4. dobás először kisebb 5-nél: (1/3)³ · 2/3 = 2/81 ≈ 0,0247; c) az 5. dobás először osztója 5-nek: (2/3)⁴ · 1/3 = 16/243 ≈ 0,0658.
- **5.** Szerencsekerék: 2p(1 − p) = 0,48 ⇒ p = 0,6 vagy p = 0,4.
- **HF 1.** Négy kockadobás: a) (5/6)⁴ ≈ 0,4823; b), c) 125/1296 ≈ 0,0965; d) 500/1296 ≈ 0,3858.
- **HF 2.** A harmadik dobás az első hatos: 25/216 ≈ 0,1157.
- **HF 3.** Érme 8-szor: mind fej = mind írás = 1/256; pontosan egy fej = pontosan egy írás = 1/32.

### Ráadás: valószínűségi feladatok megoldása gráf segítségével (195. o.)
A kígyó 0,8 valószínűséggel mar, a játékos háromszor lép kígyós mezőre. Irányított fagráf: egy ág valószínűsége az élekre írt valószínűségek szorzata. 0 marás: 0,2³ = 0,008; 1 marás: 3 · 0,8 · 0,2² = 0,096; 2 marás: 3 · 0,8² · 0,2 = 0,384; 3 marás: 0,8³ = 0,512 (összegük 1).

> **⚠️ CSAPDA:** „pontosan egyszer” nem azonos a „csak az első alkalommal” esettel – a sikert n helyre tehetjük, ezért n-nel szorzunk (Kató: 0,0768, nem 0,01536).

---

## 💻 Elkészített Komponensek

1. **`RepeatedTrialsFigures.tsx`**:
   - `RepeatedTrialsPenaltySvg`: Özséb két rúgásának négy kimenetele és valószínűségei.
   - `RepeatedTrialsChainSvg`: n kísérlet lánca – pⁿ és p · (1 − p)ⁿ⁻¹.
   - `RepeatedTrialsExactlyOnceSvg`: pontosan egy siker 5 lehetséges helyen ⇒ 5 · p · (1 − p)⁴.
   - `RepeatedTrialsSnakeTreeSvg`: a Ráadás háromszintű fagráfja (0,8 / 0,2) a levelek valószínűségével és a marások számával.
   - `RepeatedTrialsFirstSixSvg`: „csak az ötödik dobásra hatos” ⇒ (5/6)⁴ · 1/6 ≈ 0,0804.
2. **`RepeatedTrialsTheory.tsx`**: kidolgozott feladat, elmélet táblázattal, megjegyzések, tankönyvi és házi feladatok, Ráadás (fagráf), csapda.
   - **I. Laboratórium – valószínűségi fagráf:** n (1–3) és p csúszka, a k sikeres ágak kiemelése, ágvalószínűségek és a sikerszámok eloszlása.
   - **II. Laboratórium – hányszor sikerül n kísérletből?** n (1–20) és p csúszka, előbeállítások, oszlopdiagram, élő pⁿ, (1 − p)ⁿ, p · (1 − p)ⁿ⁻¹, n · p · (1 − p)ⁿ⁻¹ és „legalább egy”.
3. **`RepeatedTrialsMatcher.tsx`**: 3 szint × 8 pár (fogalmak és képletek; helyzet ↔ valószínűség; kifejezés ↔ érték).
4. **`RepeatedTrialsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (mindegyik / egyik sem / pontosan egy; valószínűség nagysága; első siker / legalább egy / adott helyen egy siker).
5. **`RepeatedTrialsQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdéstípus-címkékkel, kísérletsor-, fagráf-, kocka- és érmeábrákkal, 3 puskakártyával (progress id: `g11-stat-bernoulli-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5RepeatedTrials.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

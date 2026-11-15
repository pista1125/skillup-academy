# 21. Esetszétválasztás (21. lecke, 64–65. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 64–65. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat:** hányféleképpen osztható ki 3 egyforma jutalom 12 diák között, ha egy diák akár több jutalmat is kaphat?

Az „első jutalom 12-féle, a második 12-féle, a harmadik 12-féle” számolás nem célravezető: a jutalmak egyformák, ezért egyes eseteket többször számolunk – de nem mindegyiket ugyanannyiszor (a „mindhármat más kapja” esetet 3! = 6-szor, a többit kevesebbszer). Ezért **válasszuk külön az eseteket**:

1. mindegyik jutalmat ugyanaz kapja: **12**;
2. egy diák egy, egy másik két jutalmat kap (különböző szerep, számít a sorrend): 12 · 11 = **132**;
3. három diák kap 1-1 jutalmat: $\binom{12}{3}$ = **220**.

Az esetek egyszerre nem következhetnek be, ezért a lehetőségek száma 12 + 132 + 220 = **364**.

---

## 📐 A Módszer

- Válasszunk egy **szempontot**, amely szerint a lehetőségek egymást kizáró esetekre bomlanak (ki hány jutalmat kap, melyik az utolsó számjegy, mennyi a dobások összege…).
- Az esetek **zárják ki egymást**, és együtt **fedjék le** az összes lehetőséget.
- Esetenként a megszokott módszerekkel számolunk, majd az esetszámokat **összeadjuk**.
- Rokon ötlet a **komplementer**: összes eset − rossz esetek (pl. 4! − 3! = 18).

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** 3 × 3-as tábla: **a)** fehér és fekete bástya, nem ütik egymást: 9 · 4 = 36; **b)** két egyforma bástya: 18.
- **2.** 3 sávos zászló (piros, sárga, zöld, kék), szomszédos sávok különbözők, piros csak felül: felül piros 6 + felül nem piros 12 = **18**.
- **3.** (Érettségi 2010, ejtőernyős kitűző) – a tartományok szomszédsága csak az ábrán látható, ezért a modul nem dolgozza fel.
- **4.** 22 lépés, 4 dobás: összeg 24 → 1, 23 → 4, 22 → 10 ⇒ **15** dobássorozat.
- **5.** (Érettségi 2005, gyorsváltó) **a)** a Delfinek nem negyedikek: 4! − 3! = **18**; **b)** kettős holtverseny az élen (más holtversenyt nem feltételezve), a Delfinek nem utolsók: 12 − 3 = **9** eredménylista.
- **6.** (Érettségi 2015, tigrisek) 3 + 6-os felosztás: 4 · 10 = 40; 4 + 5-ös: 6 · 10 = 60 ⇒ **100**.
- **HF 1.** 3 egyforma csoki 10 fő között: a) 10; b) 90; c) 120; d) 220.
- **HF 2.** Négyjegyű, 5-tel osztható, különböző számjegyű: 504 (0-ra végződik) + 448 (5-re végződik) = **952**.
- **HF 3.** Párok: A–H = 84; B–I = 125; D–F = 120; E–G = 720; a C) (35) párja hiányzik – pl. J) „7 emberből 3 kiválasztása” = 35.

> **⚠️ CSAPDA:** Egyforma jutalmaknál a 12³ / 3! = 288 hibás: az osztás csak akkor helyes, ha minden esetet ugyanannyiszor számoltunk. Ellenőrzés: 12 · 1 + 132 · 3 + 220 · 6 = 1728 = 12³.

---

## 💻 Elkészített Komponensek

1. **`CaseAnalysisFigures.tsx`**:
   - `PrizeCasesSvg`: a 3 egyforma jutalom három esete (12, 132, 220 ⇒ 364).
   - `RookBoardSvg`: a 3 × 3-as tábla a fehér bástyával, kizárt sorral és oszloppal (36, 18).
   - `FlagStripesSvg`: a 3 sávos zászló két esete (6 + 12 = 18).
   - `DiceTargetSvg`: 4 dobás, legalább 22: esetek az összeg szerint (15).
   - `TigerEnclosuresSvg`: a tigrisek két lehetséges felosztása (40 + 60 = 100).
2. **`CaseAnalysisTheory.tsx`**: kidolgozott feladat, a módszer három lépése, komplementer, tankönyvi feladatok, összefoglaló táblázat, házi feladatok eredményei, csapda.
   - **I. Laboratórium:** egyforma jutalmak szétosztása (diákszám csúszka, 2/3/4 jutalom) – élő esettáblázat és a hibás nʳ / r! „gyors módszer” összevetése.
   - **II. Laboratórium:** dobássorozatok (dobások száma, lépések a célig) – esetek összeg szerint, ellenőrzés komplementerrel.
3. **`CaseAnalysisMatcher.tsx`**: 3 szint × 8 pár (módszerek; egyforma jutalmak; tankönyvi és érettségi feladatok).
4. **`CaseAnalysisSorter.tsx`**: 3 szint × 3 kategória (melyik módszer; melyik feladat esete; jó / hiányos / átfedő esetszétválasztás).
5. **`CaseAnalysisQuiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel és szükség szerint ábrával, 3 puskakártyával (progress id: `g11-comb-esetszetvalasztas-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic2CaseAnalysis.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

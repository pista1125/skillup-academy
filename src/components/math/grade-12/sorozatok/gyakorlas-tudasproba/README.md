# 10. Gyakorlás, tudáspróba (32. lecke, 72–73. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 32. lecke, 72–73. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a II. Sorozatok fejezet **10.**, fejezetzáró leckéje. Kiegészítő anyagként a törölt 31. lecke (Gyakorlás, 70–71. oldal) feladatait is felhasználtuk.

---

## 🎯 Tananyag Áttekintés

A fejezet összefoglalása (képlettár): a sorozat fogalma és megadása (képlet, rekurzió, utasítás), számtani és mértani sorozat, n-edik tag, első n tag összege, számtani és mértani közép, kamatos kamat, gyűjtőjáradék, hiteltörlesztés. Érettségi típusú feladatok és a tankönyv tudáspróbája; Ráadás: a Fibonacci-sorozat.

---

## 📐 Feladatok (ellenőrzött eredmények)

### Feladat (72. o.)
- **1.** a₁₅ = 21: a) S₁₅ = 52,5 ⇒ a₁ = −14, d = 2,5; b) S₁₅ = −52,5 ⇒ a₁ = −28, d = 3,5.
- **2.** Mértani táblázat: (120; 0,5; 10) ⇒ b₁₀ = 0,234375, S₁₀ = 239,765625; (−5; 3; 8) ⇒ b₈ = −10 935, S₈ = −16 400; (q = −2, n = 4, b₄ = 72) ⇒ b₁ = −9, S₄ = 45; (q = 2, n = 5, S₅ = 155) ⇒ b₁ = 5, b₅ = 80.
- **3.** Vetélkedő: 3800 Ft, −200 Ft, 29 000 Ft ⇒ 10 versenyző (n = 29 nem ad értelmes megoldást).
- **4. (Érettségi, 2016)** Péter: I. 15 240 000 Ft; II. ≈ 15 870 704 Ft ⇒ a II. ajánlat jobb.

### Tudáspróba
- **1.** a₂ = 5, a₈ = 14 ⇒ d = 1,5; S₂₀ = 355.
- **2.** Betyár: 2³² − 1 = 4 294 967 295 fillér ≈ 42 949 673 Ft.
- **3.** a₁ = 8, d = 1,5, Sₙ = 1233 ⇒ n = 36.
- **4.** 7 fiú: a középső 10,24%, a legkisebb ≈ 5,24%, jótékony célra 0,8⁷ ≈ 20,97%.
- **5.** Kinga: 5 × 450 000 Ft év elején, 9% ⇒ ≈ 2 935 501 Ft.

### A 31. (Gyakorlás) lecke felhasznált feladatai
- Csoportverseny: K = 20, L = 5, M = 1180, N = 1, P = 2, Q = 7, R = 6 ⇒ 59x² − 45x − 14 = 0, pozitív gyök: 1.
- Vera (érettségi 2017): d = 1/6 perc, az utolsó 4 feladat 19 perc.
- Webszerver: a₁₀ = 19 mp, S₁₀ = 100 mp; 10%-os növeléssel ≈ 2,36 mp és ≈ 15,94 mp.
- Anna (érettségi 2021): számtani terv 56 700 m, mértani terv ≈ 33 461 m.
- Sierpiński-háromszög: a 20. ábrán 3¹⁹ fekete háromszög, Tₙ = 3/4 · Tₙ₋₁, (3/4)¹⁹ ≈ 0,42%.
- Anikó gyűjtőszámlája és Manhattan (a 8. lecke kvízében).

### Ráadás
- Fibonacci nyulai: f₁ = f₂ = 1, fₙ = fₙ₋₂ + fₙ₋₁; egy év után f₁₃ = 233 pár (464 nyúl származott az első pártól).

> **⚠️ CSAPDA:** a számtani összegképlet [(a₁ + aₙ)/2 · n] mértani sorozatra nem alkalmazható: Péter II. ajánlatánál így ≈ 16,97 millió Ft jönne ki a helyes ≈ 15,87 millió Ft helyett.

A korábbi README „önértékelő kérdései” nem a tankönyvből származtak; a modul a tankönyv feladatait dolgozza fel.

---

## 💻 Elkészített Komponensek

1. **`SequencesPracticeExamFigures.tsx`**:
   - `ChapterMapSvg`: a fejezet felépítése.
   - `StairsFibonacciSvg`: a lépcsőfeladat (aₙ = aₙ₋₁ + aₙ₋₂).
   - `HorseshoeNailsSvg`: Betyár 32 patkószege.
   - `InheritanceSvg`: a gazda hagyatékának felosztása.
   - `SalaryOffersSvg`: Péter két fizetési ajánlata.
   - `RabbitsSvg`: Fibonacci nyulai hónapról hónapra.
2. **`SequencesPracticeExamTheory.tsx`**: képlettár (10 téma), gyakorló feladatok (1–4.), a tudáspróba megoldásai, további érettségi feladatok a 31. leckéből, Fibonacci-ráadás, csapda.
   - **I. Laboratórium:** sorozatépítő – számtani / mértani / Fibonacci-típusú sorozat a₁, d, q és n csúszkával; aₙ, Sₙ, pontgrafikon.
   - **II. Laboratórium:** fizetési ajánlatok – számtani és mértani béremelés összevetése tetszőleges időtartamra.
3. **`SequencesPracticeExamMatcher.tsx`**: 3 szint × 8 pár (képletek; számolások; szöveges és érettségi feladatok).
4. **`SequencesPracticeExamSorter.tsx`**: 3 szint × 3 kategória × 9 elem (megadás módja; számtani / mértani / egyik sem; aₙ / Sₙ / n).
5. **`SequencesPracticeExamQuiz.tsx`**: **90 kérdés** 3 szinten (30/30/30) a teljes fejezetből, 17 kérdésábrával, 3 puskakártyával.
- Rajzsegédek: `../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit.tsx`.

Aktivitás-azonosítók: `g12-seq-tudasproba-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic2SequencesPracticeExam.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.

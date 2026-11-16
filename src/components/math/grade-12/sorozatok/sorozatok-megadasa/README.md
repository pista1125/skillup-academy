# 2. Sorozatok megadása (23. lecke, 54–55. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 23. lecke, 54–55. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a sorozatok fejezet **2.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** az első n pozitív páratlan szám összege n² (1 = 1, 1 + 3 = 4, 1 + 3 + 5 = 9, 1 + 3 + 5 + 7 = 16; az „L” alakok négyzetté egészítenek ki). Így az 1; 4; 9; 16; … sorozat háromféleképpen is megadható: aₙ = n², aₙ = 1 + 3 + … + (2n − 1), illetve a₁ = 1 és aₙ = aₙ₋₁ + (2n − 1).

---

## 📐 Elmélet

- **Képlettel:** az n-edik tag n függvényében (n ∈ ℤ⁺), pl. aₙ = 3n + 2.
- **Rekurzív módon:** az n-edik tag az előtte álló tag(ok) ismeretében; az első (néhány) tagot is meg kell adni, pl. a₁ = 1, a₂ = 2, n > 2 esetén aₙ = aₙ₋₁ + aₙ₋₂.
- **Utasítással, körülírással:** pl. a pozitív négyzetszámok növekvő sorozata; a 3/11 tizedes tört alakjában a tizedesvessző után az n-edik helyen álló számjegy.

### Kidolgozott feladat
- A 8-cal osztva 5 maradékot adó pozitív számok: 5; 13; 21; 29; 37; … Rekurzívan a₁ = 5, aₙ = aₙ₋₁ + 8; képlettel a 8k + 5 alakban k helyére n − 1-et írva aₙ = 8n − 3.

### Tankönyvi feladatok (a modulban feldolgozva)
- **1.** Páros pozitív egészek (2n), természetes számok (n − 1), 3-mal osztva 1 maradék (3n − 2), 7-tel osztva 4 maradék (7n − 3) – képlettel és rekurzívan.
- **2. a)** a₁ = 3, aₙ = 2aₙ₋₁ − 4: 3; 2; 0; −4; −12; −28; −60; −124. **2. b)** a₁ = √3, aₙ = 2 + √3 · aₙ₋₁: √3; 5; 2 + 5√3; 17 + 2√3; 8 + 17√3; 53 + 8√3; 26 + 53√3; 161 + 26√3.
- **3.** aₙ: 5; 7; 9; … (2n + 3); bₙ: 8; 4; 2; … (16/2ⁿ); cₙ = cₙ₋₁ − cₙ₋₂: 3; 1; −2; −3; −1; 2 – hat tagonként periodikus.
- **4.** aₙ = 8 · (−1)ⁿ: a₁₂ = 8, a₁₇ = −8, értékkészlete kételemű, az első 25 tag összege −8.
- **5.** (Érettségi, 2021 nyomán) Biztonsági őr: a 100. napon dolgozik; a 100. nap reggelén 67, a 125. nap reggelén 84 munkanapja van.
- **HF 1.** cₙ = n(n − 1) + 2: c₁ = 2, c₁₀ = 92, c₁₀₀ = 9902; 8, 74, 602 a 3., 9., 25. tag.
- **HF 2.** a₄ = −8 < b₄ = −6; illetve a₄ = 20 > b₄ = 19.
- **HF 3.** (Érettségi, 2021) a₁ = 5, aₙ = −2aₙ₋₁ + 1: a₂ = −9, a₃ = 19, a₆ = −149.
- **HF 4.** 24 / −23 váltakozó tagok: S₁₀ = 5, S₁₅ = 31.

> **⚠️ CSAPDA:** Elcsúszott sorszám – a 8k + 5 alakból nem aₙ = 8n + 5, hanem aₙ = 8n − 3 lesz; rekurzióhoz kezdőtag is kell.

---

## 💻 Elkészített Komponensek

1. **`SequenceDefinitionFigures.tsx`**:
   - `OddSumSquaresSvg`: a páratlan számok összege mint négyzet („L” alakok).
   - `DefinitionModesSvg`: a három megadási mód példákkal.
   - `Mod8ChainSvg`: az 5; 13; 21; … sorozat +8-as lépésekkel és a 8n − 3 képlettel.
   - `GuardScheduleSvg`: a biztonsági őr 6 napos ciklusa.
   - `PeriodicRecursionSvg`: a cₙ = cₙ₋₁ − cₙ₋₂ sorozat periodikus pontgrafikonja.
2. **`SequenceDefinitionTheory.tsx`**: bevezető, megadási módok táblázata, kidolgozott feladat, megoldott feladatok (képlet ↔ rekurzió, rekurzív sorozatok, őr, váltakozó előjel), csapda.
   - **I. Laboratórium:** maradékos sorozatok – osztó és maradék csúszkával, utasítás, rekurzió és képlet egyszerre, tagonkénti egyezés-ellenőrzés.
   - **II. Laboratórium:** rekurziógép (aₙ = p·aₙ₋₁ + s vagy aₙ = p·aₙ₋₁ + s·aₙ₋₂), tankönyvi előbeállításokkal és pontgrafikonnal.
3. **`SequenceDefinitionMatcher.tsx`**: 3 szint × 8 pár (utasítás ↔ képlet; rekurzió ↔ képlet; feladatok eredményei).
4. **`SequenceDefinitionSorter.tsx`**: 3 szint × 3 kategória × 9 elem (megadási mód; az őr naptára; melyik sorozat tagja).
5. **`SequenceDefinitionQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 5 kérdésábrával, 3 puskakártyával.
- `seqKit.tsx`: belső rajzsegédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-seq-megadas-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic2SequenceDefinition.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

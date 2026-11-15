# 8. Háromszögek hasonlósága (72. lecke, 124–125. oldal)

A magyar Nemzeti Köznevelési Portál és az Oktatási Hivatal hivatalos tankönyve (`OH-MAT10TA/II`, 124–125. oldal) és munkafüzete (`OH-SNE-MAT10M-2`) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A háromszögek hasonlóságának igazolásához nincs szükség mindhárom szög és mindhárom oldalpár arányának egyidejű vizsgálatára. A modul a 4 szükséges és elégséges alapesetet, a hibás alapeset cáfolatát, a terepi mérések szögátlagolását (a 3 matróz zátonyos feladata), a felhőkarcolók szélcsatorna-modelljének skálázását, valamint a téglalapos és derékszögű trapézos érettségi geometriai konfigurációkat dolgozza fel.

---

## 📐 A Háromszögek Hasonlóságának 4 Alapesete

1. **I. alapeset (sz-sz):**
   - Ha két háromszögben **két-két szög egyenlő nagyságú** ($\alpha_1 = \alpha_2$ és $\beta_1 = \beta_2$), akkor a két háromszög hasonló.
   - *Megjegyzés:* A harmadik szög $\gamma = 180^\circ - (\alpha + \beta)$ miatt automatikusan egyezik.

2. **II. alapeset (o-sz-o):**
   - Ha két háromszögben **két-két oldal hosszának aránya megegyezik és az általuk közbezárt szög nagysága egyenlő** ($\frac{a_1}{a_2} = \frac{b_1}{b_2}$ és $\gamma_1 = \gamma_2$), akkor a két háromszög hasonló.

3. **III. alapeset (o-o-o):**
   - Ha a két háromszögben **mindhárom oldal hosszának aránya páronként egyenlő**:
     $$\frac{a_1}{a_2} = \frac{b_1}{b_2} = \frac{c_1}{c_2} = \lambda$$

4. **IV. alapeset (o-o-sz):**
   - Ha két háromszögben **két-két oldal hosszának aránya és a nagyobbik oldallal szemben fekvő szög nagysága egyenlő** ($a > b$ és $\alpha_1 = \alpha_2$), akkor a két háromszög hasonló.

> **⚠️ HALÁLOS CSAPDA:** Ha a szög a **kisebbik** oldallal áll szemben, a feltétel NEM garantálja a hasonlóságot, mert a szerkesztés két nem hasonló háromszöget (egy hegyesszögűt és egy tompaszögűt) eredményezhet!

---

## 💻 Elkészített Komponensek

1. **`TriangleSimilarityFigures.tsx`**:
   - `FourSimilarityCasesSvg`: A 4 hasonlósági alapeset áttekintő ábrája a tankönyv 124. oldala alapján.
   - `ThreeSailorsSvg`: A 3 matróz zátonyra futott hajójának szögbemérése és parttól való távolsága ($1 : 1000$ méretarány, $92\text{ m}$).
   - `HourglassTrianglesSvg`: Homokóra alakzat metsző egyenesekkel (váltószögek $\implies$ I. alapeset).
   - `RectangleQuarterPointSvg`: $ABCD$ téglalap negyedelőponttal ($CP=2\text{ cm}, PD=6\text{ cm}$, átló metszése, $\lambda = 4$, $QC \approx 3,33\text{ cm}$).
   - `TrapezoidRightTrianglesSvg`: Derékszögű trapéz hasonló derékszögű háromszögekből ($AB=9, AC=15, BC=12$, $\lambda=5/3$, $K=66\text{ cm}, T=204\text{ cm}^2$).
   - `SkyscraperModelVibrationSvg`: 280 méteres épület 1,4 méteres modellje ($\lambda=200$, $1\text{ cm} \to 2\text{ m}$ valódi kilengés).

2. **`TriangleSimilarityTheory.tsx`**:
   - Részletes elméleti bemutatás, aranyszabály, halálos csapda kiemelés, PDF összefoglaló letöltési lehetőség.
   - **I. Laboratórium:** Interaktív alapeset-tesztelő (sz-sz és o-sz-o), azonnali szög- és oldalellenőrzés, kerület- és területarány ($\lambda$ és $\lambda^2$).
   - **II. Laboratórium:** Tankönyvi esettanulmányok interaktív tabokkal (matrózok, felhőkarcoló, téglalap, derékszögű trapéz).

3. **`TriangleSimilarityMatcher.tsx`**:
   - 3 nehézségi szint (Kezdő, Haladó, Mester), szintenként 8 pár = összesen 24 tanító párosítás.

4. **`TriangleSimilaritySorter.tsx`**:
   - 3 nehézségi szint, szintenként 3 kategória az alapesetek, geometriai kapcsolatok és matematikai állítások szerint.

5. **`TriangleSimilarityQuiz.tsx`**:
   - 30 kérdésből álló interaktív kvíz (azonnali visszajelzés, vizsga mód, időmérő), 3 részletes puskafüllel.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade10Topic9TriangleSimilarity.test.tsx` fájlban található, mind a 6 komponenst és SVG ábrát ellenőrzi.

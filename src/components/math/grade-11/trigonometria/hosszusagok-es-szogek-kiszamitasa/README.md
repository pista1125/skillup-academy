# 5. Hosszúságok és szögek kiszámítása (5. lecke, 16–19. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 16–19. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke összefoglalja a hegyesszögek szögfüggvényeiről tanultakat, és megmutatja, hogyan számíthatók ki hosszúságok és szögek síkidomokban és gyakorlati helyzetekben. A tankönyv tanácsai: **keress derékszögű háromszöget**, **jelöld be, hol van a derékszög**, **jelöld be a feladatban szereplő szögeket**, **azonosítsd az oldalakat** (átfogó, szög melletti, szöggel szemközti befogó). A lecke végén Ráadásként a **kotangens** szögfüggvény szerepel.

---

## 📐 Legfontosabb Ismeretek

- $\sin\alpha = \dfrac{\text{szöggel szemközti befogó}}{\text{átfogó}}$, $\cos\alpha = \dfrac{\text{szög melletti befogó}}{\text{átfogó}}$, $\text{tg}\,\alpha = \dfrac{\text{szöggel szemközti befogó}}{\text{szög melletti befogó}}$
- $\text{tg}\,\alpha = \dfrac{\sin\alpha}{\cos\alpha}$, $\sin^2\alpha + \cos^2\alpha = 1$

### Kidolgozott feladatok
- **1.** Egyenlő szárú háromszög: alap 12 cm, a szárhoz tartozó magasság 10,8 cm. Az ABD derékszögű háromszögben $\sin\alpha = 10{,}8/12 = 0{,}9$ ⇒ α ≈ 64,2°, a szárszög 180° − 2 · 64,2° = 51,6°. Az alaphoz tartozó magassággal kapott BFC háromszögben $\cos 64{,}2° = 6/x$ ⇒ $x = 6 : \cos 64{,}2° \approx 13{,}8$ cm a szár.
- **2.** Új út (trapéz): AB = 30 km, BC = 25 km, CD = 20 km, BAD∢ = 37°, BC ∥ AD. A két magasság behúzása után: m = 30 · sin 37° ≈ 18,1 km, AP ≈ 24 km; sin δ = m/20 ⇒ δ ≈ 64,5°, QD = 20 · cos δ ≈ 8,6 km. AD ≈ 57,6 ≈ 58 km, tehát az új út kb. **17 km-rel rövidebb** a 75 km-es régi útnál, és D-ből 64,5°-os CDA∢-gel kell indulni.

### Tankönyvi feladatok
- **2.** Emelődaru (gém 4–12 m, szög 10°–60°): legnagyobb távolság 12 · cos 10° ≈ 11,8 m; legkisebb 4 · cos 60° = 2 m; legnagyobb magasság 12 · sin 60° ≈ 10,4 m; legrövidebb karral 4 · sin α ≈ 0,7–3,5 m.
- **5.** Szabadság-szobor (talapzat 47 m, szobor 46 m, távolság 70 m): alja ≈ 33,9°, teteje ≈ 53,0°, a szobor ≈ 19,2°-os szögben látszik.
- **HF 1.** 712 m-es hegyről 6°-kal lefelé, 435 m légvonalban ⇒ a szomszédos hegy ≈ 666,5 m.
- **HF 2.** Húrtrapéz: 8,4 cm-es alapon 113°-os szögek, m = 10,2 cm ⇒ szár ≈ 11,1 cm, másik alap ≈ 17,1 cm, terület ≈ 129,8 cm².
- **HF 3.** 230 m-es, 21,3°-os út, antenna csúcsa 39,8° alatt ⇒ antenna ≈ 95 m.
- (A 3. templomsisak és a 4. derékszögű trapéz alakú telek feladat ábrája a szövegből nem rekonstruálható egyértelműen, ezért a modulban nem szerepel.)

### Ráadás: a kotangens
- **Definíció:** $\text{ctg}\,\alpha = \dfrac{\text{szög melletti befogó}}{\text{szöggel szemközti befogó}} = \dfrac{b}{a}$.
- $\text{ctg}\,\alpha = \dfrac{1}{\text{tg}\,\alpha} = \dfrac{\cos\alpha}{\sin\alpha} = \text{tg}(90° - \alpha)$; számológépen a tangens reciprokaként (1/x) számoljuk.
- sin α = 0,55 ⇒ cos α ≈ 0,835, tg α ≈ 0,659; tg α = 4 ⇒ sin α = 4/√17 ≈ 0,970, cos α = 1/√17 ≈ 0,243.
- Azonosságok: tg α · cos α = sin α; (1 − cos α)(1 + cos α) = sin²α; (1 + tg α)/(1 + ctg α) = tg α; 1/cos²α − 1 = tg²α; (sin α + cos α)² − 1 = 2 sin α cos α (ennek nincs párja).

> **⚠️ CSAPDA:** Ha az ismeretlen a nevezőben van ($\cos 64{,}2° = 6/x$), nem szorozni, hanem osztani kell: $x = 6 : \cos 64{,}2°$. Az átfogó sosem lehet rövidebb a befogónál. A számológép legyen DEG módban!

---

## 💻 Elkészített Komponensek

1. **`RightTriangleSolvingFigures.tsx`**:
   - `SolvingStepsSvg`: a tankönyv négy tanácsa és a három szögfüggvény egy derékszögű háromszögön.
   - `IsoscelesAltitudeSvg`: az 1. kidolgozott feladat két derékszögű háromszöge (ABD és BFC).
   - `TrapezoidRoadSvg`: az A – B – C – D útvonal és az új AD út, a trapéz felbontása (2. kidolgozott feladat).
   - `CraneArmSvg`: az emelődaru gémje (k, α, d, h).
   - `StatueOfLibertySvg`: a Szabadság-szobor látószöge 70 m-ről.
   - `CotangentSvg`: Ráadás – a kotangens definíciója.
   - Minden derékszög magyar jelöléssel (negyedkörív ponttal) szerepel.
2. **`RightTriangleSolvingTheory.tsx`**: tanácsok és képlettáblázat, két kidolgozott feladat, gyakorlati feladatok, házi feladatok táblázata, kotangens, csapda.
   - **I. Laboratórium:** derékszögű háromszög megoldó – 5 adateset (két befogó; befogó + átfogó; átfogó + szög; szemközti/melletti befogó + szög), lépésenkénti megoldás és méretarányos rajz.
   - **II. Laboratórium:** emelődaru – gémhossz- és szögcsúszka, élő d = k · cos α és h = k · sin α.
3. **`RightTriangleSolvingMatcher.tsx`**: 3 szint × 8 pár (szögfüggvények, képletek átrendezése, tankönyvi eredmények).
4. **`RightTriangleSolvingSorter.tsx`**: 3 szint × 3 kategória × 9 elem (sin / cos / tg; szorzás / osztás / szög visszakeresése; igaz / hamis / adatfüggő).
5. **`RightTriangleSolvingQuiz.tsx`**: 30 kérdés 3 szinten, 3 puskakártyával.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic1RightTriangleSolving.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.

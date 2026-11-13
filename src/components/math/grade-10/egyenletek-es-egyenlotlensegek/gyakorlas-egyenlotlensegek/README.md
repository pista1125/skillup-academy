# 5. Gyakorlás – Törtes és abszolútértékes egyenlőtlenségek (63. lecke)

## Tananyag Áttekintés
Összetett másodfokú, törtes és abszolútértékes egyenlőtlenségek megoldásának gyakorlása, a nevezővel való átbeszorzás veszélyei, közös nevezőre hozás, előjeltáblázatok és egyenlőtlenség-rendszerek számegyeneses metszetképzése.

---

## Modul Komponensek
- **`InequalitiesPracticeTheory.tsx`**: Részletes elmélet 5 fejezettel, érettségi mintafeladatokkal, jobb felső „FONTOS SZABÁLYOK” kártyával, valamint a 6. fejezetben interaktív dinamikus törtes szimulátorral és ellenőrző kvízzel.
- **`InequalitiesPracticeFigures.tsx`**: Egyedi SVG illusztrációk kompakt (260px) méretezéssel (törtes előjeltáblázat, abszolútérték sáv, tilos átbeszorozni veszélytábla, intervallum-metszet, abszolútértékes parabola).
- **`InequalitiesPracticeMatcher.tsx`**: 3 szint × 8 pár = 24 feladat (alapvető relációk, közös nevezős feladatok, összetett másodfokú abszolútértékek és rendszerek).
- **`InequalitiesPracticeSorter.tsx`**: 3 szint × 3 kategória (megoldáshalmaz szerkezete, alkalmazandó megoldási módszer, szabályok vs. tévhitek).
- **`InequalitiesPracticeQuiz.tsx`**: 3 szint × 10 kérdés = 30 kérdés részletes magyarázatokkal, puskakártyákkal és beágyazott párosító/rendszerező játékmóddal.

---

## Fő Megoldási Stratégiák
1. **Tilos ismeretlennel beszorozni:** Mindig nullára rendezünk és közös nevezőre hozunk: $\frac{P(x)}{Q(x)} \lessgtr 0$.
2. **Kikötési kötelezettség:** A nevező zérushelyénél ($Q(x) = 0$) a zárójel megengedő reláció esetén is kötelezően NYÍLT!
3. **Abszolútérték felbontása:**
   - $|A| \le d \iff -d \le A \le d$ (egyetlen korlátos sáv).
   - $|A| \ge d \iff A \le -d \text{ vagy } A \ge d$ (két külső félegyenes uniója).
4. **Egyenlőtlenség-rendszerek:** Az egyes feltételek megoldáshalmazainak metszetét ($I_1 \cap I_2$) vesszük.

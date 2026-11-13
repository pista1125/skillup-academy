# 4. Másodfokú egyenlőtlenségek (62. lecke)

## Tananyag Áttekintés
Másodfokú egyenlőtlenségek ($ax^2 + bx + c \gtrless 0$) megoldása grafikus módszerrel (parabola zérushelyei és állása), algebrai úton (szorzattá alakítás, előjeltáblázat), valamint törtes és különleges diszkriminánsú esetekben.

---

## Modul Komponensek
- **`QuadraticInequalitiesTheory.tsx`**: Részletes elmélet 5 fejezettel, érettségi mintafeladatokkal, jobb felső „FONTOS SZABÁLYOK” kártyával, valamint a 6. fejezetben dinamikus interaktív parabola-paraméter laboratóriummal.
- **`QuadraticInequalitiesFigures.tsx`**: Egyedi SVG illusztrációk kompakt (260px) méretezéssel ($D > 0$, $D = 0$, $D < 0$ parabola esetek, előjeltáblázat és számegyenes).
- **`QuadraticInequalitiesMatcher.tsx`**: 3 szint × 8 pár = 24 feladat (alapvető hiányos egyenlőtlenségek, kétgyökös $D > 0$ normál alakok, lefelé nyíló és speciális határesetek).
- **`QuadraticInequalitiesSorter.tsx`**: 3 szint × 3 kategória (megoldáshalmaz alakja, diszkrimináns előjele és tengelymetszése, igaz szabályok vs. tévhitek).
- **`QuadraticInequalitiesQuiz.tsx`**: 3 szint × 10 kérdés = 30 kérdés részletes magyarázatokkal, puskakártyákkal és beágyazott párosító/rendszerező játékmóddal.

---

## Fő Megoldási Stratégiák
1. **0-ra rendezés:** Mindig $ax^2 + bx + c \gtrless 0$ alakra hozzuk az egyenlőtlenséget.
2. **Grafikus módszer (parabola):**
   - Zérushelyek ($x_1, x_2$) meghatározása megoldóképlettel vagy szorzattá alakítással.
   - Parabola állása ($a > 0 \implies \cup$, $a < 0 \implies \cap$).
   - Leolvasás: $a > 0$ esetén $>0$ a két gyökön kívül, $<0$ a két gyök között.
3. **Különleges diszkriminánsú esetek:**
   - $D = 0$: érinti a tengelyt (egyetlen pont $\{x_0\}$, $\mathbb{R} \setminus \{x_0\}$, $\mathbb{R}$ vagy $\emptyset$).
   - $D < 0$: a parabola lebeg a tengely felett/alatt (megoldás a teljes $\mathbb{R}$ vagy $\emptyset$).
4. **Törtes egyenlőtlenségek:**
   - Tilos ismeretlennel beszorozni!
   - A tört előjele megegyezik a szorzatéval, a nevező nem lehet 0 (a nevező gyökénél a zárójel nyílt).

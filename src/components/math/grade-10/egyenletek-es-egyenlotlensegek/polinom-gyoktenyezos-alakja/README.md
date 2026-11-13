# 6. Polinom gyöktényezős alakja (64. lecke)

## Tananyag Áttekintés
A másodfokú polinomok szorzattá alakítása a gyökök segítségével ($ax^2 + bx + c = a(x - x_1)(x - x_2)$), az 'a' főegyüttható szerepe és elhagyásának veszélye, algebrai törtek egyszerűsítése és kikötései, $D = 0$ és $D < 0$ határesetek, valamint egyenletalkotás adott gyökökből.

---

## Modul Komponensek
- **`RootFactorizationTheory.tsx`**: Részletes elmélet 5 fejezettel, kidolgozott érettségi feladatokkal, jobb felső „FONTOS SZABÁLYOK” kártyával, valamint a 6. fejezetben interaktív szimulátorral és ellenőrző kvízzel.
- **`RootFactorizationFigures.tsx`**: Egyedi SVG illusztrációk kompakt (260px) méretezéssel (alapképlet, hiányzó 'a' csapdája, tört egyszerűsítése, diszkrimináns esetek, egyenletalkotás).
- **`RootFactorizationMatcher.tsx`**: 3 szint × 8 pár = 24 feladat (normált polinomok, főegyütthatós és törtes feladatok, összetett egyenletalkotás).
- **`RootFactorizationSorter.tsx`**: 3 szint × 3 kategória (felbonthatóság jellege, főegyüttható 'a' szerepe, tételek vs. tévhitek).
- **`RootFactorizationQuiz.tsx`**: 3 szint × 10 kérdés = 30 kérdés részletes magyarázatokkal, puskakártyákkal és beágyazott párosító/rendszerező játékmóddal.

---

## Fő Tételek és Képletek
1. **A gyöktényezős alak tétele:**
   $$ax^2 + bx + c = a(x - x_1)(x - x_2)$$
2. **Különleges diszkriminánsú esetek:**
   - $D = 0 \implies x_1 = x_2 = x_0$, a szorzat teljes négyzet: $a(x - x_0)^2$.
   - $D < 0 \implies$ nem bontható fel valós elsőfokú tényezők szorzatára.
3. **Algebrai törtek egyszerűsítése:**
   - A számlálót és nevezőt gyöktényezős alakra hozzuk, és a közös tényezőket egyszerűsítjük.
   - A nevező zérushelyeit egyszerűsítés előtt kötelező kikötni, és a kikötés egyszerűsítés után is megmarad!

# 3. Szöveges feladatok összekeverésről (8. osztály)

## Modul Áttekintés
Ez a modul a 8. osztályos III. Egyenletek témakör **3. altémáját** valósítja meg: keverési és elegyítési feladatok matematikai modellje, oldatok töménysége (tömegszázalék), hígítás tiszta vízzel (0%), töményítés sóval (100%), víz elpárologtatása, ötvözetek finomsága (karát, ezrelék) és folyadékok hőmérséklet-keveredése (kalorimetria).

---

## Modul Komponensei

1. **`MixingWordProblemsTheory.tsx`**: Interaktív tananyag `TheoryTemplate` sablonnal.
   - **Témák**:
     1. A Keverési Feladatok Alapelve és a Megmaradási Törvény ($m_1 p_1 + m_2 p_2 = m_ö p_ö$).
     2. Speciális Esetek: Hígítás ($0\%$), Töményítés ($100\%$) és Elpárologtatás ($m_ö = m_1 - m_{\text{elp}}$).
     3. Ötvözetek, Arany és Karát Számítás ($24 \text{ karát} = 100\%$, $1 \text{ karát} = 1/24 \approx 4,167\%$).
     4. Különböző Hőmérsékletű Folyadékok Keverése (Kalorimetria: $m_1 T_1 + m_2 T_2 = m_ö T_k$).
     5. **Interaktív Keverési Labor Szimulátor** (az elméleti szekciók után elhelyezve):
        - Két oldat lombikos keverése valós idejű folyadékszinttel és töménységgel.
        - Hígítás / töményítés / elpárologtatás csúszkákkal.
     6. Részletesen Kidolgozott Mintapéldák (két oldat keverése, hígítás vízzel, 14K/18K aranyötvözet).
     7. Gyakori Csapdahelyzetek és Típustévesztések (`TheoryTrapBox`: százalékok átlagolásának tilalma, víz 0%-os töménysége, só össztömeg-növelő hatása).
     8. Szöveges Ellenőrzés és Mértékegység Egyeztetés (liter vs kg, logikai józansági határ).

2. **`MixingWordProblemsQuiz.tsx`**: 30 kérdéses adaptív kvíz `QuizTemplate` sablonnal.
   - **6 CheatSheet kártya** SVG illusztrációkkal (megmaradási alapegyenlet, hígítás 0%, töményítés 100%, víz elpárolgása, karát rendszer, hőmérséklet keveredés).
   - **3 Nehézségi szint** (10-10 kérdés szintenként):
     - **1. Szint**: Alapfogalmak és töménység (tömegszázalék definíció, tiszta só számítás, tiszta víz 0%, 14/18/24 karát).
     - **2. Szint**: Két oldat keverése és hígítás (egyenletmegoldások, ismeretlen tömegek, aranyötvözet karát, vízelpárologtatás).
     - **3. Szint**: Összetett és versenyfeladatok (kétismeretlenes feladatok, több lépéses műveletek, kalorimetria, edények közötti átöntés).
   - **Beágyazott Játékmódok**:
     - Matcher (Párosító kártyajáték)
     - Sorter (Csoportosító játék)

3. **`MixingWordProblemsMatcher.tsx`**: Interaktív kártyapárosító játék `MatcherTemplate` alapon.
   - 3 szint $\times$ 10 pár (Alapfogalmak, Keverési egyenletek, Számításos eredmények).

4. **`MixingWordProblemsSorter.tsx`**: Csoportosító gyakorló játék `SorterTemplate` alapon.
   - 3 szint $\times$ 12 elem (Keverési folyamatok, Anyagok töménysége, Modell egyenletek).

---

## Integráció
- `Grade8View.tsx`: A 3. szekcióban kizárólag **2 kártya** szerepel:
  1. `Keverési Feladatok Tananyag` (`g8-eq-mixing-theory`)
  2. `Gyakorló Kvíz` (`g8-eq-mixing`)
- `MathPage.tsx`: Lazy betöltés, teljes körű oda-vissza navigáció Tananyag és Kvíz között.

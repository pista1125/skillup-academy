# 3. Írásbeli osztás egyjegyű osztóval (tankönyv 93–100. oldal, munkafüzet II. 4–12. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 93–100. oldal) és a **II. kötetes** munkafüzet (`OH-MAT04MA_II`, 4–12. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a III. fejezet (Írásbeli műveletek 0-tól 10 000-ig) 3. leckéje.

---

## 🎯 Tananyag Áttekintés

- **TK 93. (nyitó):** kirándulás az Aggteleki-cseppkőbarlangba (Baradla–Domica, 25 km).
- **TK 94/1–3.:** osztás bontással: Mona zsebpénze 2840 Ft : 2; 2820 : 2 = 2000 : 2 + 800 : 2 + 20 : 2 = 1000 + 400 + 10 = 1410; útvonalak hossza.
- **TK 95/1.:** 3693 : 3 (külföldön élő diákok). **Becslés:** 3'693 : 3 = . . . . (a vessző jelöli az első részosztandót, a pontok a hányados jegyeit) → 1000 < a hányados < 2000. **Számítás a legnagyobb helyi értékkel kezdve:** 3 E : 3 = 1 E, 6 sz : 3 = 2 sz, 9 t : 3 = 3 t, 3 e : 3 = 1 e. Ellenőrzés szorzással (1231 · 3) vagy összeadással.
- **TK 96/4.:** 750 Ft : 3 – Panna játék pénzzel (7 sz : 3 = 2 sz, marad 1 sz → 15 t), Luca írásban **hosszú alakban** (kivonásokkal), Viktória **rövid alakban**: „a kivonásokat fejben végezzük, és csak a maradékot írjuk le a megfelelő helyi érték alá”.
- **TK 97/6–8.:** 2872 Ft : 2 = 1436 Ft (temperafesték) korongokkal, hosszú és rövid alakban: 2 E : 2 = 1 E, 8 sz : 2 = 4 sz, 7 t : 2 = 3 t marad 1 t, 1 t + 2 e = 12 e, 12 e : 2 = 6 e; kitűzők osztása 3-mal, 4-gyel, 6-tal; hiányzó osztandó / osztó.
- **TK 98/9–14.:** 734 m : 2 = 367 m (busz a barlangnál), 5840 Ft ötöde, diákjegy 3150 Ft harmada, Baradlamanó túra 8250 Ft : 5, kitűzők (5000 − 400) : 4.
- **TK 99/15–17.:** **maradékos osztás:** 224 cm szalag 3 részre: ha a legnagyobb helyi értéken nem megy, a következő helyi értéknél kezdünk (22'4 : 3 = . . → 70 < h < 80); 224 : 3 = 74, marad 2; ellenőrzés: 74 · 3 = 222, 222 + 2 = 224; kakukktojás maradékok szerint (7319 : 4, 6813 : 5 …), ki melyik osztást végezte (236 : 6, 962 : 2, 1421 : 6, 1124 : 4).
- **TK 100/18–21.:** színkódos osztások, számhalmaz-válogatás, Béke-barlang 7182 m (harmada), Szabadság-barlang 3030 m (hatoda), barlangtúrák sorrendje.
- **MF II. 4–12.:** bontásos osztás szorzásos ellenőrzéssel (240 : 2, 4800 : 4 bögre), pontokkal a hányados jegyeinek száma, táblázat (osztandó / osztó / hányados), labdák csomagolása, állítások hányadosokról (917 : 7 = 131 …), kutyaólak, ing + 5 póló 10 000 Ft-ból, irányítószámok maradékból (9277 : 8 → marad 5), láncszámolás 9072 : 3 : 4 : 6, nyitott mondat 7344 : 2 > □ + 100, maradék-táblázat.

> **⚠️ CSAPDA:** ha egy helyi értéken nincs meg az osztó, a hányadosba **0** kerül (3150 : 3 = 1050, nem 105); a maradék mindig kisebb az osztónál.

### A régi README javított hibái
- A régi leírás „írásbeli bennfoglalás balról jobbra, részmaradékok lehozása” általános szöveget adott. Most a tankönyvi alak szerepel: becslés pontokkal és vesszővel, a lépések „7 sz : 3 = 2 sz, mert 2 sz · 3 = 6 sz, marad 1 sz” mondattal, a **hosszú** (kivonásokkal) és a **rövid** alak (csak a maradékok a helyi értékek alatt), és az ellenőrzés szorzással (+ maradék).
- A munkafüzeti oldalak a **II. kötetben** vannak (MF II. 4–12.), nem az I. kötetben.
- A lecke helyes száma a diákzónában: III. fejezet 3. lecke.

---

## 💻 Elkészített Komponensek

1. **`WrittenDivisionFigures.tsx`**:
   - `divSteps(a, d)`: az osztás lépései (részosztandó, hányados-számjegy, maradék).
   - `DivLayout`: általános osztás-ábra rövid vagy hosszú alakban, helyiérték-oszlopokkal és vesszőkkel.
   - `DivShortFormSvg`, `DivLongFormSvg`: 2872 : 2 = 1436 rövid és hosszú alakban.
   - `DivRemainderSvg`: 224 cm szalag : 3 = 74 cm, marad 2 cm, ellenőrzéssel.
   - `DivSplitSvg`: 2820 : 2 bontással.
   - `CoinShareSvg`: 750 Ft : 3 pénzzel (Panna).
2. **`WrittenDivisionTheory.tsx`**: Mit tanulunk?, bontás, becslés (hány jegyű a hányados), 3693 : 3 lépései, 750 : 3 felváltással, 2872 : 2 hosszú és rövid alakban, maradékos osztás, „Vigyázz!” (kimaradt 0, maradék ≥ osztó). Exportálja a `shareStates` segédfüggvényt.
   - **I. labor:** írásbeli osztás rövid alakban – minden lépésben a hányados számjegye, majd a maradék kiválasztása; a maradék mellé lejön a következő számjegy; segítség, ellenőrzés.
   - **II. labor:** „Osszuk szét igazságosan!” – helyiérték-korongok szétosztása és felváltása lépésenként (750 : 3, 960 : 4, 852 : 3).
3. **`WrittenDivisionMatcher.tsx`**: 3 szint × 8 pár (bontással, felváltással, maradékkal).
4. **`WrittenDivisionSorter.tsx`**: 3 szint × 3 kategória × 9 elem (hány jegyű a hányados; maradék 3-mal osztva 0/1/2; hányados < 1000 / 1000–2000 / > 2000).
5. **`WrittenDivisionQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 19 kérdés ábrával (osztás-elrendezés, bontás, egyenlő részek, árcédulák), 3 puskakártyával.

Azonosítók: kvíz `g4-wops-osztas-quiz`, párosító `g4-wops-osztas-matcher`, csoportosító `g4-wops-osztas-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic3WrittenDivision.test.tsx` (4 komponens, 5 SVG ábra, osztás lépései, korongos szétosztás).

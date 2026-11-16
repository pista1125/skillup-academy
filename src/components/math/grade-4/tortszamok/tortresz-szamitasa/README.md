# 5. Törtrész kiszámítása, szöveges feladatok (tankönyv 148–152. oldal, munkafüzet II. 66–71. és 83. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., „A törtszámok” fejezet, 148–152. oldal) és munkafüzet (`OH-MAT04MA_II`, 66–71. oldal, valamint a 83. oldal 9. feladata) alapján kidolgozott oktatási modul. A diákzónában ez a VIII. fejezet 5. leckéje.

A tankönyv a törtrészt szóval írja („12-nek a 3 negyede”, „300 Ft-nak a 2 harmadába kerül”), a számolást pedig a munkafüzet műveletkártyái szerint két lépésben végzi: **előbb osztás, aztán szorzás** (300 : 3 · 2). Számláló, nevező és törtvonal nem szerepel.

---

## 🎯 Tananyag Áttekintés

- **Tankönyv 148. o., 4. feladat**: 12 bonbon igazságos szétosztása 2, 3, 4, 6, 12 gyerek között (6, 4, 3, 2, 1 db) – korongokkal.
- **Munkafüzet 68. o., 8. feladat**: írószerek 300 Ft törtrészeiért – fele 150, 2 harmada 200, 5 ötöde 300, 4 ötöde 240, 5 hatoda 250 Ft (műveletkártyák: 300 : 2, 300 : 3 · 2, 300 : 5 · 5, 300 : 5 · 4, 300 : 6 · 5).
- **Munkafüzet 68. o., 9. feladat**: 4000 Ft-nak a 3 negyede 3000, 1 ötöde 800, 3 ötöde 2400, 2 tizede 800, 2 nyolcada 1000, 4 nyolcada 2000 Ft.
- **Munkafüzet 68. o., 7. feladat**: Palkó 60 autója – 1 tizede kék (6), 1 hatoda sárga (10), 1 negyede zöld (15), 1 harmada piros (20), fehér 60 − 51 = 9.
- **Tankönyv 150. o., 14. feladat • Munkafüzet 69–70. o., 10., 13., 14. feladat**: fél méter = 50 cm; a méter negyede 25, 2 negyede 50, 3 negyede 75 cm; 200 cm 1 tizede 20, 1 ötöde 40, 1 negyede 50 cm; 1 tized dm = 1 cm = 10 mm, 4 tized dm = 4 cm = 40 mm; 3 tized m = 3 dm = 30 cm = 300 mm; 1 ötöd m = 20 cm; 4 ötöd m = 8 dm = 80 cm = 800 mm.
- **Tankönyv 150. o., 13. feladat**: 24 papírtányér – fiúk 12, lányok 8, felnőttek 4.
- **Tankönyv 151. o., 17. a) és 18. feladat**: 684 km fele 342 km; az 1 kg liszt 5 tizede 500 g (maradt 500 g); a 30 dkg vaj 1 harmada 10 dkg = 100 g; 1 és negyed óra = 75 perc; a 24 pogácsa negyede 6; 15 l szörp – málna 5 l, eper 5 l, szeder 5 l = 5000 ml.
- **Munkafüzet 71. o., 17. feladat**: a 400 literes dézsa 6 tizede 240 l, még 4 tized = 160 l hiányzik.
- **Munkafüzet 78. o., 4. feladat** (Ellenőrizd a tudásodat!): a 2400 értékű téglalap színezett részei (pl. 1 tizenketted = 200).
- **Munkafüzet 83. o., 9. feladat**: nomád tábor, 180 diák – kék sátor 90, zöld sátor a maradék harmada 30, jurta 60.
- **Tankönyv 152. o., 20. feladat**: társasjáték – a mező színének megfelelő szám (1200, 2400, 6000, 3200) megadott része (pl. 6000 3 tizede = 1800).

> **⚠️ CSAPDA:** 12-nek a 3 negyede nem 12 : 3 · 4 = 16, hanem 12 : 4 · 3 = 9. Az 1 egésznél kisebb rész mindig kevesebb, mint az egész. A „maradék fele/harmada” a maradékból számolandó, nem az egészből.

### A régi README javított hibái
- LaTeX-képletek (`\frac{3}{4}`, `\implies`, `: \text{nevező}`) helyett a tankönyv szavas írásmódja és a munkafüzet műveletkártyái (300 : 3 · 2).
- A „számláló”, „nevező” kifejezések a 4. osztályos könyvekben nem szerepelnek; helyettük „hány egyenlő részre vágjuk” (osztás) és „hány részt veszünk” (szorzás).
- A régi példák (36-nak a 3/4 része, 1 óra 2/3 része, 1000 Ft 3/10 része) nem a könyvből valók; helyettük a tankönyv és a munkafüzet saját feladatai szerepelnek.

---

## 💻 Elkészített Komponensek

1. **`FractionOfAmountFigures.tsx`**:
   - `TwoStepDiscsSvg`: 12-nek a 3 negyede korongokkal, 12 : 4 = 3, 3 · 3 = 9.
   - `PriceBarsSvg`: a 300 Ft-os írószerek csíkjai és műveletkártyái (`PRICE_CARDS`).
   - `CarCollectionSvg`: Palkó 60 autója színek szerint (`CAR_GROUPS`).
   - `MeterTapeSvg`: kétszer félbehajtott mérőszalag, a méter negyedei.
   - `ClockPartsSvg`: negyed óra, fél óra, 3 negyed óra (`ClockFaceG`).
   - `SyrupSvg`: a 15 liter szörp felosztása.
   - Segédek: `partOf`, `partOfSteps`, `DiscGroupsG`, `ClockFaceG` (a csík `BarG` és a `vel` rag-segéd a 4. lecke ábrafájljából).
2. **`FractionOfAmountTheory.tsx`**: Mit tanulunk? (bonbon-táblázat), pénz, hosszúság, idő és tömeg, „Nézzük meg együtt!” (tányérok, szörp, autók, nomád tábor), „Vigyázz!” csapda. Exportálja: `DISC_TASKS`, `STEP_TASKS`.
   - **I. labor – Korongosztó:** 8 feladat (12, 18, 20, 24, 30 korong); a gyerek kiválasztja, hány egyenlő csoportba rakja a korongokat, majd kiszínezi a kért csoportokat; ellenőrzés a két lépés kiírásával.
   - **II. labor – Törtrész két lépésben:** 8 feladat pénzzel, cm-rel, perccel, grammal, literrel, méterrel; előbb az 1 rész értékét, aztán a kért részt kell beírni; a csík az 1. lépés után kiírja az egyes részek értékét.
3. **`FractionOfAmountMatcher.tsx`**: 3 szint × 8 pár (1 rész kiszámítása; törtrész mértékegységgel; több rész két lépésben).
4. **`FractionOfAmountSorter.tsx`**: 3 szint × 3 kategória × 9 elem (eredmény 5/10/20; a méter törtrésze 50 cm-hez képest; 15/30/45 perc).
5. **`FractionOfAmountQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 16 kérdés ábrával (korongok, csík, óra, mérőszalag, téglalap, dézsa, tányérok), minden kérdésnek saját jelvénye, 3 puskakártya.

Azonosítók: kvíz `g4-frac-tortresz-quiz`, párosító `g4-frac-tortresz-matcher`, csoportosító `g4-frac-tortresz-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic8FractionOfAmount.test.tsx` (4 komponens, 6 SVG ábra, kvízszerkezet, a törtrész-számítás tankönyvi értékei, a csoportosító és a párosító helyessége).

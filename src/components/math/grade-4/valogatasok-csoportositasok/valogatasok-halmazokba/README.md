# 1. Válogatások halmazokba (VI. fejezet, 1. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 131–132. és 134. oldal) és a munkafüzet (`OH-MAT04MA II`, 48–51. oldal) alapján kidolgozott modul.

---

## 🎯 Tananyag Áttekintés

A fejezet nyitóképe (TK 131.): Manóék az állatkerti kirándulásra készülnek. Karesz javaslata: a védett emlősök legyenek az **alaphalmaz** elemei, az „A” részhalmazba az Európában, a „B”-be az Amerikában élő emlősök kerüljenek. A hód és a hiúz mindkét kontinensen él, ezért a két halmaz **közös részébe** kerül; a koala egyikbe sem, csak az alaphalmazba.

A lecke halmazjelölés (∈, ∩, ∪, {…}) nélkül, csak **halmazábrákkal** (karikák, keret, címkék) dolgozik.

### Tankönyvi feladatok
- **TK 132/2.** Tisza-tavi Ökocentrum: Vidraetetést néztek / Csónakáztak. Csak vidraetetés: Dóri, Tamás, Lajos, Norbi, Gergő; mindkettő: Éva, Zsolti, Sári, Magdi, Gertrúd, Tibi, Sanyi, Anti; csak csónakázás: András, Zsuzsi, Józsi. (Kérdések: „…, de nem csónakáztak”, „mindkét programon”.)
- **TK 132/3. b)** Számok – Páros számok – Négyjegyű számok halmazábra az A, B, C halmaz számaival (1246, 54, 600, 8002, 9998; 475, 33, 6606, 48, 9579; 1005, 8889, 77, 1001, 423).
- **TK 134/7.** Síkidomok: görbe vonal is / egyenes vonal is határolja; sokszögek a síkidomokon belül.
- **TK 134/8.** Logikai lapok három karikában (Kék, Lyukas, Háromszög), a részek 1–8-ig számozva: 1 csak kék, 2 kék+lyukas, 3 csak lyukas, 4 kék+háromszög, 5 mindhárom, 6 lyukas+háromszög, 7 csak háromszög, 8 egyik sem. A tankönyv lapjai: A→6, B→4, C→8, D→1, E→3, F→2, G→5, H→7.

### Munkafüzeti feladatok (MF II/48–51.)
- **1.** ÁLLATOK: Madár / Háziállat (közös: kacsa, tyúk, liba; kívül: őz).
- **2.** Egymásba ágyazott halmazok: Növény → benne Gyümölcs → benne „Szörp készülhet belőle”.
- **3–4.** Címkék számokra (számjegyösszeg 11; tízesre kerekítve 370; összegek: 2510, 4290, 9600, 3986, 3570).
- **5.** Az 50 / a 20 többszörösei (közös: 5600, 7200, 9500, 4200; csak 50: 2350, 8150; csak 20: 4580, 8060, 1040; kívül: 1530).
- **6.** Nem illik bele: 303, 2074 (5 többszörösei); 1001, 215 (2 többszörösei).
- **8.** Kakukktojás: 3517, 8128, 6195. **9.** Műveletek eredménye szerint (1500 / 2800 / 7200). **11.** Síkidomok, sokszögek, négyszögek.

> **⚠️ CSAPDA:** a közös részbe kerülő elemet (kacsa: madár is, háziállat is) nem szabad csak az egyik karikába tenni – mindig mindkét címkét meg kell vizsgálni.

---

## 💻 Elkészített Komponensek

1. **`SetSortingFigures.tsx`** – `OtterBoatSvg`, `AnimalVennSvg`, `NestedSetsSvg`, `NumberSetsSvg`, `LogicBlocksVennSvg`, `LogicBlocksRowSvg`, `OddOneOutSvg`; közös segédek a fejezethez: `Venn2`, `Venn3Frame`, `LogicBlock`, `logicRegion`, `venn3RegionAt`.
2. **`SetSortingTheory.tsx`** – szavak (alaphalmaz, címke, közös rész), vidraetetés-példa, számok halmazai, halmaz a halmazban, kakukktojás, csapda.
   - **I. Laboratórium – Tedd a helyére!** kártyák elhelyezése kétkarikás halmazábrában kattintással (3 feladat: állatok, 50/20 többszörösei, páros/négyjegyű), ellenőrzéssel.
   - **II. Laboratórium – Logikai lapok három karikában:** a lapot a számozott részbe kell tenni (kattintás az ábrán vagy 1–8 gomb), visszajelzés a három kérdéssel.
3. **`SetSortingMatcher.tsx`** – 3 szint × 8 pár (halmazos szavak; ki hol van; logikai lapok).
4. **`SetSortingSorter.tsx`** – 3 szint × 3 kategória × 3 elem (madár/háziállat; 50 és 20 többszörösei; síkidomok).
5. **`SetSortingQuiz.tsx`** – 30 kérdés (10/10/10), ábrákkal és kérdéstípus-jelvénnyel, 3 puskával.

---

## 🧪 Tesztelés

`src/test/grade4Topic6SetSorting.test.tsx` – a 4 komponens és 7 ábra renderelése, a kérdések száma/szintjei, a logikai lapok régiói (TK 134/8.), a laborok adatai.

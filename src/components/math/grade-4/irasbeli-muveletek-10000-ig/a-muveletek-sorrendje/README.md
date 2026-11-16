# 7. A műveletek sorrendje – 10 000-ig (tankönyv 106–107. oldal, munkafüzet II. 21–23. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 106–107. oldal) és munkafüzet (`OH-MAT04MA_II`, 21–23. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a III. fejezet (Írásbeli műveletek) 7. leckéje. Az I. fejezet 4. leckéjének (`szamolas-10000-ig/a-muveletek-sorrendje`, 1000-es számkör) folytatása: ugyanaz a szabály, de 10 000-es számkörben, írásbeli részszámításokkal, szöveges és nyitott mondatos feladatokkal.

---

## 🎯 Tananyag Áttekintés

- **Szabály:** zárójel → szorzás, osztás balról jobbra → összeadás, kivonás balról jobbra.
- **Tankönyv 106. o.**
  - **1. feladat** – Mona: 2550 Ft : 2 + 3450 Ft : 2 = 3000 Ft; Manó: (2550 Ft + 3450 Ft) : 2 = 3000 Ft – mindketten helyesen osztottak.
  - **2. feladat** – szövegből műveletsor: (6540 + 3120) : 3 = 3220; (8915 − 4875) : 2 = 2020; (5543 − 4129) · 5 = 7070; (1312 + 2879) · 2 = 8382.
  - **3. feladat** – szöveges feladat alkotása: 3 · 450 + 1450 = 2800 és 3 · (450 + 1450) = 5700.
  - **4. feladat** – vasúti kocsik: N 2658 + 7161 : 3 = 5045, O 7464 − 2268 : 6 = 7086, T (2658 + 7161) : 3 = 3273, P (7464 − 2268) : 6 = 866, U (7464 − 2268) : 6 · 2 = 1732, K 3450 + 1456 · 4 = 9274 → növekvő sorrendben **PUTNOK**.
- **Tankönyv 107. o.**
  - **5. feladat** – tábori tájékoztató: 9000 : (7953 − 7053) = 10, (6875 − 5475) : 100 = 14 (10–14 éves), 9400 : 100 − 66 = 28 (július 28.), 7794 : 3 − 2595 = 3 (augusztus 3.), 1657 · 4 + 2872 = 9500 Ft, 1294 · 7 − 9026 = 32 fő.
  - **6. feladat** – Hanna és Péter: 6120 − 6120 : 3 = 4080 Ft, még 6000 − 4080 = 1920 Ft kell.
  - **7. feladat** – Karcsi: 10 000 − (6450 + 3 · 285) = 2695 Ft visszajáró; pulóver (10 000 − 1450) : 3 = 2850 Ft.
  - **8. feladat** – nyitott mondatok: 696 > □; 46 < □; 6804 > □ > 4347; 3104 < □ < 4348; 5843 > □ > 5329.
  - **9. feladat** – műveleti jelek pótlása 4800 ■ 60 ■ 10: + + (4870), : · (800), + · (5400), − : (4794), − · (4200), : + (90).
- **Munkafüzet II. 21. o.** – sorrend jelölése körökben: 4264 − 1316 · 3 = 316, (4264 − 1316) · 3 = 8844, 9464 − 3518 + 1325 = 7271, 5 · 1614 : 3 = 2690, 1386 + 2634 : 6 = 1825, (1386 + 2634) : 6 = 670; lékhorgászat: 4201 > □ > 4150 → 4197-es hal, 5051 < □ < 7995 → 5734-es hal.
- **Munkafüzet II. 22. o.** – épületek a térképen: soproni tűztorony 6301, tihanyi apátság 5302, esztergomi bazilika 182, szegedi dóm 1722, pécsi székesegyház 1721, Parlament 181.
- **Munkafüzet II. 23. o.** – kidobós: Párducok 9342, 973, 8702, 1616, 3772, 6825 (4 páros); Tigrisek 2451, 619, 8922, 3440, 8587, 8269 (2 páros) → kevesebben estek ki a Tigrisekből, ők állnak nyerésre.

> **⚠️ CSAPDA:** „A 6540 és a 3120 összegének a harmada” nem 6540 + 3120 : 3 (= 7580), hanem (6540 + 3120) : 3 = 3220 – az összeget zárójelbe kell tenni.

### A régi README javított hibái
- A régi README LaTeX-képleteket használt ($$4000 - 300 \cdot 8 + 600 : 3$$, $( \dots )$), és a mintapéldái (4000 − 300 · 8 + 600 : 3, (4000 − 300) · 2 − 1200 : 4) nem a tankönyvből valók.
- Helyette a tankönyv és a munkafüzet valódi feladatai szerepelnek, 4. osztályos jelöléssel.

---

## 💻 Elkészített Komponensek

1. **`OrderOfOps10000Figures.tsx`**:
   - `OrderLadderSvg`: a sorrend lépcsője 10 000-es példákkal.
   - `MonaManoSvg`: Mona és Manó gondolatbuborékai a két műveletsorral.
   - `TrainWagonsSvg`: a hat vasúti kocsi betűkkel és műveletsorokkal (segédek: `Wagon`, `WAGONS`).
   - `OpenSentenceLineSvg`: 3104 < □ < 4348 számegyenesen, üres karikás végpontokkal.
   - `FishHookSvg`: lékhorgászat a hat számozott hallal.
2. **`OrderOfOps10000Theory.tsx`**: Mit tanulunk?, munkafüzeti műveletsorok lépésenként táblázatban, Mona és Manó, szövegből műveletsor, tábor és bevásárlás, nyitott mondatok, lékhorgászat, „Vigyázz!” csapda. Exportálja az `evaluate`, `evalSteps`, `SIGN_TASKS`, `WAGON_ORDER` segédeket.
   - **I. labor:** „Jelfelrakó” – a tankönyv 9. feladata: két műveleti jel kiválasztása (+ − · :) a 4800 ■ 60 ■ 10 kifejezésbe; a gép lépésenként, a helyes sorrendben számol, és jelzi, igaz-e az állítás (6 feladvány).
   - **II. labor:** „Hová megy a vonat?” – a kocsikra kattintva növekvő sorrendben kell összeállítani a szerelvényt; rossz választásnál figyelmeztetés, a végén a PUTNOK felirat.
3. **`OrderOfOps10000Matcher.tsx`**: 3 szint × 8 pár (munkafüzeti műveletsorok; épületek és vasúti kocsik; szövegből műveletsor).
4. **`OrderOfOps10000Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (mivel kezdünk; eredmény < 1000 / 1000–5000 / > 5000 a kidobós feladatokból; a zárójel hatása).
5. **`OrderOfOps10000Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 22 kérdésnél ábra (műveletsor-kártya körökkel, vasúti kocsi, Mona és Manó, jelfelrakó, számegyenes, halak), kérdéstípus-jelvények, 3 puskakártya.

Azonosítók: kvíz `g4-wops-sorrend-quiz`, párosító `g4-wops-sorrend-matcher`, csoportosító `g4-wops-sorrend-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic3OrderOfOps10000.test.tsx` (4 komponens, 5 SVG ábra, kiértékelés lépésenként, jelfelrakó és PUTNOK).

# 2. Válogatások táblázatokba (VI. fejezet, 2. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 133–134. oldal) és a munkafüzet (`OH-MAT04MA II`, 49–50. oldal) alapján kidolgozott modul.

---

## 🎯 Tananyag Áttekintés

**TK 133/4.** – a lecke magja: ugyanazt a 11 ceruzát három gyerek háromféleképpen válogatja szét két szempont (kék – nem kék, radíros – nem radíros) szerint:
- **Kitti:** elágazásos rajz – ceruzák → kékek / nem kékek → radíros / nem radíros (4 ágvég).
- **Manó:** 2 × 2-es táblázat – oszlopok: *Kék ceruza*, *Nem kék ceruza*; sorok: *Radíros ceruza*, *Nem radíros ceruza*.
- **Mona:** két csoport közös résszel (A: az összes ceruza, B: kékek, C: radírosak).

A ceruzák a tankönyvi kép szerint: kék radíros 2, kék radír nélküli 3, nem kék radíros 5 (piros, lila, sárga, 2 zöld), nem kék radír nélküli 1 (sárga) – összesen 11.

További tankönyvi anyag:
- **TK 133/5.** Vízi állatok csoportosítása többféleképpen (cápa, béka, aranyhal, csikóhal, csiga, bálna, rák, polip, kagyló, delfin …). A modulban: Hal / Nem hal × Emlős / Nem emlős – a „Hal – Emlős” mező üres marad.
- **TK 134/6.** Vonalak: vékony – vastag, folytonos – szaggatott, egyenes – görbe (szaggatott vonal, pontvonal, szabadkézi vonal).
- **TK 132/3.** és **MF II/49/5.** számai táblázatba válogatva (Páros / Nem páros × Négyjegyű / Nem négyjegyű; 50 és 20 többszörösei), a halmazábra részeinek megfeleltetve.

> **⚠️ CSAPDA:** a sor és az oszlop szempontjának összekeverése (a „nem” szó az oszlop címében van, nem a sorban) – mindig két külön kérdést kell feltenni: melyik sor? melyik oszlop?

---

## 💻 Elkészített Komponensek

1. **`TableSortingFigures.tsx`** – `PencilTreeSvg`, `PencilTableSvg`, `PencilVennSvg`, `LineTypesSvg`, `AnimalTableSvg`, `ThreeWaysSvg`; segédek: `Pencil`, `TK_PENCILS`, `WATER_ANIMALS`.
2. **`TableSortingTheory.tsx`** – háromféle válogatás, táblázat olvasása (sor- és oszlopösszegek), üres mező, vonalak, csapda.
   - **I. Laboratórium – Válogass táblázatba!** elemek kattintásos elhelyezése 2 × 2-es táblázatba (ceruzák, vízi állatok, logikai lapok), ellenőrzéssel.
   - **II. Laboratórium – Táblázat és halmazábra egyszerre:** a tankönyv 15 számát a táblázatba kell tenni, a halmazábra párhuzamosan kitöltődik.
3. **`TableSortingMatcher.tsx`** – 3 szint × 8 pár (táblázatos szavak; melyik mezőbe; mező ↔ halmazábra-rész).
4. **`TableSortingSorter.tsx`** – 3 szint × 3 kategória × 3 elem (vízi állatok; számok; logikai lapok).
5. **`TableSortingQuiz.tsx`** – 30 kérdés (10/10/10), ábrákkal és kérdéstípus-jelvénnyel, 3 puskával.

---

## 🧪 Tesztelés

`src/test/grade4Topic6TableSorting.test.tsx` – a 4 komponens és 6 ábra renderelése, kérdésszám/szintek, a tankönyvi ceruzák darabszámai, az üres mező, a II. labor működése.

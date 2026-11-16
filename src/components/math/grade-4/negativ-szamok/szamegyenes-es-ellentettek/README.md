# 2. Számegyenes és ellentettek (tankönyv 90–91. oldal, munkafüzet I. 84–86. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 90–91. oldal) és munkafüzet (`OH-MAT04MA_I`, 84–86. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a IV. fejezet 2. leckéje.

---

## 🎯 Tananyag Áttekintés

- **8. feladat (90. o.)**: Mona és Manó számegyenese −10-től 10-ig – kék pontok a 0-tól balra („a 0-tól balra a negatív számok vannak”), piros pontok a 0-tól jobbra („a 0-tól jobbra a pozitív számok vannak”); c) számegyenes 100-as osztásokkal (A–J betűk).
- **Ellentett számok**: a tankönyv a 8. b) feladatban azt kérdezi, hol vannak a számok a 0-hoz viszonyítva; a lecke ebből vezeti be az ellentett szám fogalmát 4. osztályos szinten (ugyanolyan messze a 0-tól, a két oldalán: 4 és −4; a 0 ellentettje a 0). Formális jelölés nincs.
- **11. feladat (90. o.)**: Melyik számra gondoltam? – 5, −5, 7, −3, −11, −9, −4 (a −3 kisebb szomszédja), −3 (a −4 nagyobb szomszédja).
- **12. feladat (90. o.)**: a szöcske a 3-ról jobbra 4 → 7; balra 7 → −4; jobbra 6, majd balra 10 → −1.
- **13–15. feladat (91. o.)**: tengerszint, akváriumi halak merülési mélysége (cm, oszlopdiagram), állatok élőhelye a vízfelszínhez viszonyítva (pl. kardszárnyú delfin: 0 m és −200 m között).
- **Munkafüzet I. 84.**: számok helye a számegyenesen; lépegetés a 0-tól (jobbra 5, balra 6, jobbra 1, balra 4, balra 4, balra 4, jobbra 7, jobbra 10, balra 17 → −12).
- **Munkafüzet I. 85.**: számegyenes 1000-es osztásokkal; búvárok oszlopdiagramja (A −28 m, B −8 m, C −14 m, D −23 m, E −7 m; legközelebb a felszínhez E; 56 m-ig hátralévő út dm-ben és cm-ben).
- **Munkafüzet I. 86.**: számszomszédok táblázata (−15: −20, −16, −14, −10; −37: −40, −38, −36, −30; −29: −30, −30, −28, −20; −41: −50, −42, −40, −40); számok jelölése −20…20-as számegyenesen.
- Az összehasonlítás (<, >), a sorba rendezés és a nyitott mondatok (90. o., 9–10. feladat) a 3. leckében szerepelnek.

> **⚠️ CSAPDA:** a −15 kisebb számszomszédja nem a −14, hanem a −16 – a kisebb szám mindig balra van.

### A régi README javított hibái
- LaTeX-jelölések ($+a$ és $-a$, $>0$) és betűs általánosítás helyett konkrét számpéldák, 4. osztályos szövegezés.
- A „távolság a 0-tól” itt lépésszámként jelenik meg, abszolútérték-jelölés nélkül.

---

## 💻 Elkészített Komponensek

1. **`NumberLineOppositesFigures.tsx`**:
   - `NumberLineSvg`: −10…10 számegyenes kék/piros pontokkal és a tankönyvi szövegbuborékokkal.
   - `OppositesSvg`: 4 és −4 ellentett pár ívekkel.
   - `GrasshopperSvg`: a szöcske 4 ugrása a 3-ról a 7-re.
   - `DiversSvg`: a búvárok oszlopdiagramja (`DIVERS` adatok).
   - `NeighboursSvg`: a −15 egyes és tízes számszomszédjai.
   - `ScaledLineSvg`: számegyenes 100-as osztásokkal.
   - Segéd: `NumberLineGroup` (általános, kattintható számegyenes ugrásívekkel), `fmtNum`.
2. **`NumberLineOppositesTheory.tsx`**: Mit tanulunk?, ellentett számok, „Melyik számra gondoltam?” táblázat, szöcske és hosszú lépegetés, számszomszédok, osztásköz és mélységek, „Vigyázz!” csapda. Exportálja: `landing`, `opposite`, `HOP_TASKS`.
   - **I. labor:** „Hová ugrik a szöcske?” – 6 ugrássor (tankönyv és munkafüzet), a gyerek az érkezési pontra kattint, helyes válasz után megjelennek az ugrásívek.
   - **II. labor:** „Keresd az ellentettjét!” – a megadott szám ellentettjére kell kattintani, visszajelzés a 0-tól mért lépésszámmal.
3. **`NumberLineOppositesMatcher.tsx`**: 3 szint × 8 pár (ellentett párok, gondolt számok, szöcskeugrások).
4. **`NumberLineOppositesSorter.tsx`**: 3 szint × 3 kategória × 9 elem (balra / 0 / jobbra; érkezési hely; 5, 10, 20 lépésre a 0-tól).
5. **`NumberLineOppositesQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal (számegyenesek „?” jelöléssel, szöcske, búvárdiagram), 3 puskakártyával.

Azonosítók: kvíz `g4-neg-szamegyenes-quiz`, párosító `g4-neg-szamegyenes-matcher`, csoportosító `g4-neg-szamegyenes-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic4NumberLineOpposites.test.tsx` (4 komponens, 6 SVG ábra, kattintható számegyenes, kvízszerkezet, ugrások és ellentettek).

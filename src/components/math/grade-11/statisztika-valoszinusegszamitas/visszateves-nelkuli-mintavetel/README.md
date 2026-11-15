# 11. Visszatevés nélküli mintavétel (tankönyv 61. lecke, 190–191. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 190–191. oldal) alapján kidolgozott oktatási modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 11. leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat:** 4 piros és 6 sárga golyó közül véletlenszerűen 5-öt húzunk. Összes eset: (10 alatt 5) = 252.
- a) mindegyik sárga: (6 alatt 5) = 6 ⇒ 6/252 ≈ **0,024**;
- b) pontosan 3 sárga: 3 sárga **és** 2 piros: (6 alatt 3) · (4 alatt 2) = 20 · 6 = 120 ⇒ 120/252 ≈ **0,476**.
- Megjegyzés: „és” kötőszónál a két eseménynek egyszerre kell teljesülnie, ilyenkor rendszerint össze kell szorozni a lehetőségek számát.

---

## 📐 Elmélet

- **Mintavétel:** néhány elem kiválasztása egy halmazból; azt vizsgáljuk, hány kiválasztott elem rendelkezik egy tulajdonsággal (nyerő szám, korcsoport, hibás termék).
- **Visszatevés nélküli mintavétel:** a kiválasztott elemet nem tesszük vissza – akár egyszerre, akár egymás után húzunk.
- Pontosan 2 elem az m elemű csoportból (k elemű mintában): kedvező esetek (m alatt 2) · (n − m alatt k − 2), ezt osztjuk (n alatt k)-val. Általában: P(pontosan j) = (m alatt j) · (n − m alatt k − j) / (n alatt k).
- A modul kiegészítésként a valószínűségi fát is bemutatja (egy ág mentén szorzás, több út esetén összeadás): 4 piros, 6 sárga, 2 húzás ⇒ P(PP) = 4/10 · 3/9 = 2/15, P(pontosan 1 piros) = 8/15 = (4 alatt 1) · (6 alatt 1) / (10 alatt 2).

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** Helsinki 1952: 16 arany, 10 ezüst, 16 bronz, mégis 77 érmes a 189 indulóból – a csapatversenyekben minden csapattag érmet kap, és valaki több érmet is nyerhetett. Öt induló: pontosan 2 érmes (77 alatt 2) · (112 alatt 3) / (189 alatt 5) ≈ 0,350. A Venn-diagram leolvasása szerint (43 + 2 + 3 + 3 =) 51 aranyérmes: mind aranyérmes ≈ 0,0012; pontosan 2 aranyérmes ≈ 0,287.
- **2.** Vonószenekar (14 hegedű, 4 brácsa, 4 cselló, 2 nagybőgő; (24 alatt 2) = 276): a) 91/276 ≈ 0,330; b) 140/276 ≈ 0,507; c) 56/276 ≈ 0,203.
- **3.** Anglia–Magyarország 3 : 6 (1953), 12 játékos, 3 gólszerző, 3 kiválasztott: 0: 84/220; 1: 108/220; 2: 27/220; 3: 1/220; a gólszerzők számának várható értéke 165/220 = 0,75.
- **HF 1.** 36 diák, 5 gitáros, 4 kiválasztott: a) pontosan 1 gitáros 22 475 / 58 905 ≈ 0,382; b) pontosan 2: 4650 / 58 905 ≈ 0,079.
- **HF 2.** 35 tanuló, 10 télen született, 4 kiválasztott: a) mind télen 210 / 52 360 ≈ 0,004; b) pontosan 3: 3000 / 52 360 ≈ 0,057.
- **HF 3.** 50 pohár, 3 csorba, 4 kiválasztott: a) mind csorba: 0 (lehetetlen); b) mind ép 178 365 / 230 300 ≈ 0,774; c) 2 csorba és 2 ép 3243 / 230 300 ≈ 0,014.

> **⚠️ CSAPDA:** „3 sárga és 2 piros” esetén a lehetőségeket szorozni kell: (6 alatt 3) · (4 alatt 2) = 120, nem 20 + 6 = 26.

> Megjegyzés: az 1. feladat Venn-diagramjának számai (43, 2, 3, 5, 3, 6, 15; összegük 77) a forrásszövegben elcsúszva szerepelnek; az aranyérmesek 51-es száma attól független, hogy a két 3-as közül melyik a hármas metszet. A modul ezt leolvasott, nem a tankönyvben kiszámolt értékként kezeli.

---

## 💻 Elkészített Komponensek

1. **`SamplingWithoutReplacementFigures.tsx`**:
   - `SamplingWithoutReplacementUrnSvg`: a kidolgozott feladat urnája (innen 2 piros, innen 3 sárga).
   - `SamplingWithoutReplacementModelSvg`: az általános modell – pontosan 2 elem az egyik csoportból.
   - `SamplingWithoutReplacementTreeSvg`: valószínűségi fa két húzásra (4 piros, 6 sárga).
   - `SamplingWithoutReplacementOrchestraSvg`: a vonószenekar (2. feladat).
   - `SamplingWithoutReplacementGoalsSvg`: a gólszerzők számának eloszlása és várható értéke (3. feladat).
2. **`SamplingWithoutReplacementTheory.tsx`**: kidolgozott feladat, elmélet, valószínűségi fa, tankönyvi és házi feladatok, csapda.
   - **I. Laboratórium – valószínűségi fa-építő:** piros / sárga golyók és 1–3 húzás csúszkával; a fa ágain a feltételes valószínűségek, a leveleken az utak valószínűsége; a „pontosan j piros” utak kiemelése és összegzése, összevetve a kombinációs képlettel.
   - **II. Laboratórium – hány „jó” elem lesz a mintában?** n, m, k csúszkával; a pontosan j elem valószínűségeinek oszlopdiagramja, összegük, a legvalószínűbb j és a várható érték (k · m / n); előbeállítások a tankönyvi feladatokból.
3. **`SamplingWithoutReplacementMatcher.tsx`**: 3 szint × 8 pár (fogalmak és szabályok; esetek száma; helyzet ↔ valószínűség).
4. **`SamplingWithoutReplacementSorter.tsx`**: 3 szint × 3 kategória × 9 elem (mintavétel fajtája; szorzás / összeadás / komplementer; valószínűség nagysága).
5. **`SamplingWithoutReplacementQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdéstípus-címkékkel, urna-, fa- és csoportábrákkal, 3 puskakártyával (progress id: `g11-stat-visszateves-nelkul-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5SamplingWithoutReplacement.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

# 9. Várható érték (tankönyv 59. lecke, 184–187. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 184–187. oldal) alapján kidolgozott oktatási modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 9. leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető (Zsóka téglái):** három kockával dobva az összeg négypontonként egy téglát ér. 100 szimulált dobás módusza 9, átlaga 10,55 lett. Sok dobás átlaga a **várható érték** körül ingadozik, ami három kockánál **10,5** – ezt soha nem dobhatjuk ki, mert az összeg egész.
- Ráadás (a modul számolása): a téglák számának várható értéke 487/216 ≈ 2,25 (nem 10,5 : 4 = 2,625, a lefelé kerekítés miatt).

---

## 📐 Elmélet

- **Összetartozó fogalmak:** relatív gyakoriság ↔ valószínűség; átlag, súlyozott átlag ↔ várható érték.
- A várható érték csak akkor értelmezhető, ha a kimenetelt valós szám adja meg (pontszám, osztályzat, golyók vagy hibás elemek száma). Nagyszámú kísérlet átlagos eredményéről ad információt, **nem azonos a legvalószínűbb eredménnyel**.
- **Várható érték = a lehetséges kimeneteleknek a valószínűségekkel súlyozott átlaga.** Jele: E (elterjedt az M is): E = x₁ · p₁ + x₂ · p₂ + … + xₙ · pₙ.
- Példa: 100 sorsjegyből 95 nem nyer, 5 nyer 1000 Ft-ot ⇒ E = 0,95 · 0 + 0,05 · 1000 = 50 Ft; 100 Ft-os jegyár mellett „nem éri meg”.
- **A számolás lépései:** 1) táblázat az összes kimenetellel; 2) minden kimenetel valószínűsége; 3) szorzatok összege. Ellenőrzés: a valószínűségek összege 1.
- **Méltányos (igazságos) játék:** a nyeremény várható értéke 0.

### Kidolgozott feladat (185. o.)
A kereskedő sorsjegyei: 9800 db nem nyer, 180 db 500 Ft, 19 db 2000 Ft, 1 db 10 000 Ft. Összesen 10 000 db; p = 0,98; 0,018; 0,0019; 0,0001 (összegük 1).
E = 0 · 0,98 + 500 · 0,018 + 2000 · 0,0019 + 10 000 · 0,0001 = **13,8 Ft**.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** Angéla ötösnél fizet 50 Ft-ot, máskor kap 15 Ft-ot: E(Angéla) = 25/6 ≈ 4,17 Ft, E(Panni) = −25/6 ≈ −4,17 Ft. Igazságos lenne pl. 75 Ft-os fizetéssel ötösnél, vagy 10 Ft-tal nem ötösnél.
- **2.** Egy kockadobás: E = 21/6 = 3,5.
- **3.** Farsangi tombola: P(1000 Ft) = 10/500 = 0,02; P(0 Ft) = 0,98; E = 20 Ft.
- **4.** 3 érme, fejek száma: p = 1/8, 3/8, 3/8, 1/8; E = 1,5.
- **HF 1.** Részvény: 5428 Ft (0,6) vagy 4370 Ft (0,4) ⇒ E = 5004,8 Ft.
- **HF 2.** Tombola (1250 / 200 / 40 / 8 / 2 db; 0 / 300 / 600 / 1500 / 5000 Ft): 1500 szelvény, E = 106 000 / 1500 ≈ 70,67 Ft.

> **⚠️ CSAPDA:** a nyeremények egyszerű átlaga ((0 + 500 + 2000 + 10 000) : 4 = 3125 Ft) nem a várható érték – súlyozni kell a valószínűségekkel!

> Megjegyzés: az 5. feladat dobozdiagramjának értékei és a HF 3. oszlopdiagramjának oszlopmagasságai a forrásszövegből nem olvashatók ki egyértelműen, ezért ezeket a modul nem dolgozza fel (a kvíz 29. kérdése egy hasonló, saját adatokkal készült oszlopdiagramos feladat).

---

## 💻 Elkészített Komponensek

1. **`ExpectedValueFigures.tsx`**:
   - `ExpectedValueThreeDiceSvg`: három kocka összegének eloszlása (216 eset), E = 10,5 jelöléssel.
   - `ExpectedValueConceptsSvg`: relatív gyakoriság ↔ valószínűség, átlag ↔ várható érték.
   - `ExpectedValueStepsSvg`: a várható érték kiszámításának három lépése.
   - `ExpectedValueLotterySvg`: a kidolgozott feladat négyféle sorsjegye és a szorzatok.
   - `ExpectedValueFairGameSvg`: Angéla és Panni kockajátéka „mérlegen”.
2. **`ExpectedValueTheory.tsx`**: bevezető, fogalompárok, módszer, kidolgozott feladat, igazságos játék, tankönyvi és házi feladatok, csapda.
   - **I. Laboratórium – Méltányos-e a játék?** nyerő kockalapok kijelölése, nyeremény / fizetés csúszkával, élő várható érték, méltányos nyeremény javaslata és szimuláció (10 / 100 / 1000 játék átlaga).
   - **II. Laboratórium – eloszlástáblázat:** szerkeszthető táblázat (érték, darabszám), valószínűségek, szorzatok sávokkal, várható érték; előbeállítások a tankönyvi feladatokból.
3. **`ExpectedValueMatcher.tsx`**: 3 szint × 8 pár (fogalmak; kísérlet ↔ várható érték; eloszlástáblázat ↔ várható érték).
4. **`ExpectedValueSorter.tsx`**: 3 szint × 3 kategória × 9 elem (kinek kedvez a játék; E nagysága; összetett játékok és sorsjegyek).
5. **`ExpectedValueQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdéstípus-címkékkel, kocka-, érme-, eloszlástáblázat- és oszlopdiagram-ábrákkal, 3 puskakártyával (progress id: `g11-stat-varhato-ertek-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5ExpectedValue.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

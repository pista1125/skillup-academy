# 10. Két vagy több elemet húzunk egyszerre (tankönyv 60. lecke, 188–189. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 188–189. oldal) alapján kidolgozott oktatási modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 10. leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat (ötös lottó, 0 találat):** 90 számból 5-öt húznak. Összes eset: (90 alatt 5) = 43 949 268. Kedvező: mind az 5 megjelölt szám a 85 nem nyerő közül való: (85 alatt 5) = 32 801 517.
p = 32 801 517 / 43 949 268 ≈ **0,746**.

---

## 📐 Elmélet

- Egy n elemű halmaz elemei két csoportba különülnek el (nyerő / nem nyerő, egyik / másik osztály, egyik / másik szín, hibás / hibátlan). Véletlenszerűen kiválasztunk k elemet.
- Annak valószínűsége, hogy **mind a k elem az m elemű csoportból** kerül ki:
  **p = (m alatt k) / (n alatt k)** – n: összes elem, m: az adott tulajdonságú elemek, k: kiválasztott elemek száma.
- **Binomiális együttható:** ha n elemből k-t választunk sorrend nélkül, a lehetőségek száma (n alatt k); számológépen `nCr`. Pl. (10 alatt 3) = 10 · 9 · 8 / 3! = 10! / (3! · 7!) = 120.
- Egyszerre húzás = visszatevés nélküli húzás: 15/28 · 14/27 = (15 alatt 2) / (28 alatt 2) = 5/18.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** Egyenlők: (10 alatt 3) = (10 alatt 7) = 10 · 9 · 8 / 3! = 120; (10 alatt 4) = (10 alatt 6) = 10 · 9 · 8 · 7 / 4! = 210; (10 alatt 2) = (10 alatt 8) = 10 · 9 / 2 = 45; pár nélkül: (10 alatt 5) = 252.
- **2.** 28 faktos (15 + 13), 2 diák: a) 105/378 = 5/18 ≈ 0,278; b) 78/378 = 13/63 ≈ 0,206.
- **3.** 14 könyv (10 prózai, ebből 2 Dosztojevszkij; 4 vers), 2 könyv: a) 45/91 ≈ 0,495; b) 6/91 ≈ 0,066; c) 1/91 ≈ 0,011; d) 28/91 = 4/13 ≈ 0,308.
- **4.** Minden lottószám > 10: (80 alatt 5) / (90 alatt 5) = 24 040 016 / 43 949 268 ≈ 0,547.
- **6.** 29 nyári olimpia (Afrika 0, Amerika 7, Ausztrália 2, Ázsia 4, Európa 16), 3 kiválasztva, (29 alatt 3) = 3654: a) 35/3654 ≈ 0,0096; b) 4/3654 ≈ 0,0011; c) 286/3654 ≈ 0,078.
- **HF 1.** 1–20, mindkettő osztója 20-nak (6 osztó): 15/190 = 3/38 ≈ 0,079.
- **HF 2.** 32 lapos magyar kártya, 3 lap: a) mind makk 56/4960 ≈ 0,0113; b) egyik sem makk 2024/4960 ≈ 0,408.
- **HF 3.** 32 jegy (18 a 412-es, 14 a 413-as kocsiba), 4 barátnő: a) 3060/35 960 ≈ 0,085; b) 1001/35 960 ≈ 0,028; c) 4061/35 960 ≈ 0,113.

> **⚠️ CSAPDA:** egyszerre húzáskor nem számolhatunk úgy, mintha visszatennénk: 15/28 · 15/28 ≈ 0,287 hibás, a helyes 15/28 · 14/27 = 5/18 ≈ 0,278.

> Megjegyzés: a 6. feladat oszlopdiagramjának értékei a forrásszövegből nem olvashatók ki; a modul a valós adatokat használja (a 2021-es tokiói olimpiával bezárólag 29 nyári olimpia; az 1956-os olimpia Melbourne-nél, Ausztráliánál szerepel). Az 5. feladat gráfja a forrásszövegből nem rekonstruálható, ezért azt a modul nem dolgozza fel.

---

## 💻 Elkészített Komponensek

1. **`SimultaneousDrawFigures.tsx`**:
   - `SimultaneousDrawLottoSvg`: a 90 lottószám (5 nyerő, 85 nem nyerő), összes és kedvező eset.
   - `SimultaneousDrawGroupsSvg`: az általános modell (n elem, m és n − m elemű csoport, k kiválasztott).
   - `SimultaneousDrawBinomialPairsSvg`: az 1. feladat egyenlő binomiális együtthatói, a pár nélküli (10 alatt 5).
   - `SimultaneousDrawBookshelfSvg`: a 3. feladat könyvespolca.
   - `SimultaneousDrawOlympicsSvg`: nyári olimpiák kontinensenként (6. feladat).
   - Segédkomponens: `SvgBinom` (binomiális együttható SVG-ben).
2. **`SimultaneousDrawTheory.tsx`**: lottó-kidolgozott feladat, általános képlet, binomiális együttható, tankönyvi és házi feladatok, csapda.
   - **I. Laboratórium – urnamodell kombinációkkal:** piros / kék golyók és a húzott golyók száma csúszkával; P(mind piros) = (m alatt k) / (n alatt k) és az egymás utáni szorzatalak; véletlen húzás és 1000-es szimuláció relatív gyakorisággal.
   - **II. Laboratórium – n alatt a k és a lottó:** binomiális együttható kiszámítása szorzat alakban, szimmetria; „minden lottószám nagyobb t-nél” csúszka; 0 találat az ötös, hatos és skandináv lottón.
3. **`SimultaneousDrawMatcher.tsx`**: 3 szint × 8 pár (binomiális együttható ↔ érték; egyenlő kifejezések; helyzet ↔ valószínűség).
4. **`SimultaneousDrawSorter.tsx`**: 3 szint × 3 kategória × 9 elem (melyik együtthatóval egyenlő; valószínűség nagysága; melyik képlet kell).
5. **`SimultaneousDrawQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdéstípus-címkékkel, urna-, csoport- és oszlopdiagram-ábrákkal, 3 puskakártyával (progress id: `g11-stat-egyszerre-huzas-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5SimultaneousDraw.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

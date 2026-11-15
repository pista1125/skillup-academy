# 17. Sorba rendezés (17. lecke, 52–53. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 52–53. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke egy cirkuszi felvonulásból indul: 5 vadállat (tigris, oroszlán, párduc, leopárd, elefánt) vonul szorosan egymás után.
- **a)** Az összes sorrend: 5 · 4 · 3 · 2 · 1 = **5! = 120**.
- **b)** A tigris és az oroszlán közvetlenül egymás után: kettőjüket egy „objektumnak” tekintve 4! = 24 sorrend, és az oroszlán a tigris előtt is lehet ⇒ **2 · 4! = 48**.
- **c)** Nem egymás után: **5! − 2 · 4! = 72**.
- **d)** Körbevonulás (senki sem „első”): a T-O-P-L-E sor ugyanaz, mint az O-P-L-E-T, P-L-E-T-O, L-E-T-O-P, E-T-O-P-L ⇒ **120 : 5 = 24**.

---

## 📐 Elmélet

- **Sorba rendezés:** n különböző elem sorrendjeinek száma n · (n − 1) · … · 1 = **n!** (n faktoriális). Megállapodás szerint **0! = 1**.
- **Megkötések:**

| Megkötés | Ötlet |
|---|---|
| Néhány elem helye meg van határozva | Ezeket rögzítjük, a többit sorba rendezzük a maradék helyekre. |
| Két elemnek egymás mellé kell kerülnie | Egy elemnek tekintjük: (n − 1)! sorrend, a két elem sorrendje kétféle ⇒ 2 · (n − 1)!. |
| Két elem nem kerülhet egymás mellé | Az összesből kivonjuk az egymás melletti eseteket: n! − 2 · (n − 1)!. |

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** (Érettségi, 2015) Öttusa: 5 A, 4 B, 3 C akadály, típuson belül szabad sorrend ⇒ 5! · 4! · 3! = 17 280.
- **2.** 10 tanuló a tornapadon: a) 10! = 3 628 800; b) Csilla–Panni egymás mellett: 2 · 9! = 725 760; c) Zoli–Gábor nem egymás mellett: 10! − 2 · 9! = 2 903 040; d) Csilla–Panni egymás mellett, Zoli–Gábor nem: 2 · 9! − 2 · 2 · 8! = 564 480.
- **3.** 12 tanuló kimegy: a) 12! = 479 001 600; b) Csilla–Panni a két utolsó: 2 · 10! = 7 257 600; c) Zoli, Gábor, Peti az első három: 3! · 9! = 2 177 280.
- **4.** 3 lány, 3 fiú váltakozva (L, F, L, F, L, F): 3! · 3! = 36.
- **5.** Tíz számjegykártya: a) 10! = 3 628 800; b) csökkenő sorrend: 1; c) tízjegyű szám: 10! − 9! = 3 265 920; d) 10-zel osztható: 9! = 362 880; e) 3-mal osztható: mind a 3 265 920 (a jegyösszeg 45).
- **6.** 7 fiú és 7 lány táncoló párokba: 7! = 5040.
- **HF 1.** 9 tanuló: a) 9! = 362 880; b) András bal, Bence jobb szélen: 7! = 5040.
- **HF 2.** (Érettségi nyomán, 2005) Színház, 4 hely: a) 24; b) Anna–Béla egymás mellett: 12; c) nem egymás mellett: 12.
- **HF 3.** 35 állomás: a) 35 · 34 = 1190 jegy; b) legfeljebb 595 különböző ár.
- **HF 4.** a) 0! = 1; b) 11!/(5! · 6!) = 462; c) 11!/(5! + 6!) = 47 520; d) 10!/9! = 10; e) 19!/20! = 0,05; f) (5!)² = 14 400.

> **⚠️ CSAPDA:** ha két elemet egy „objektumnak” tekintünk, a blokkon belüli sorrendet (2-féle) is figyelembe kell venni – a tigris–oroszlán esetben 4! = 24 helyett 2 · 4! = 48, és a „nem egymás után” eset 5! − 4! = 96 helyett 5! − 2 · 4! = 72.

---

## 💻 Elkészített Komponensek

1. **`PermutationsFigures.tsx`**:
   - `CircusParadeSvg`: az 5 vadállat és az 5 · 4 · 3 · 2 · 1 rekeszes szorzat.
   - `AdjacentBlockSvg`: a tigris–oroszlán blokk két sorrendje (2 · 4! = 48; 72).
   - `CircularParadeSvg`: körbevonulás, az 5 elforgatás ugyanaz (120 : 5 = 24).
   - `AlternatingSeatsSvg`: lány–fiú váltakozó ültetés (3! · 3! = 36).
   - `FactorialGrowthSvg`: 0!–8! értékei oszlopdiagramon (logaritmikus magasság).
2. **`PermutationsTheory.tsx`**: bevezető, faktoriális, megkötések táblázata, kidolgozott feladatok (1–6.), házi feladatok eredményei, csapda.
   - **I. Laboratórium:** 3–6 elem sorrendjeinek gépi leszámlálása megkötésekkel (egymás mellett, nem egymás mellett, rögzített szélek, kör) és összevetés a képlettel.
   - **II. Laboratórium:** faktoriális-számológép (0!–25!, BigInt, kifejtés, jegyszám) és a 4. házi feladat kifejezései.
3. **`PermutationsMatcher.tsx`**: 3 szint × 8 pár (faktoriálisok; megkötéses sorrendek; nagy esetszámok).
4. **`PermutationsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (melyik ötlet; nagyságrend; igaz / hamis / n-től függ).
5. **`PermutationsQuiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel és 8 kérdésnél ábrával, 3 puskakártyával (progress id: `g11-comb-sorba-rendezes-quiz`; matcher: `g11-comb-sorba-rendezes-matcher`, sorter: `g11-comb-sorba-rendezes-sorter`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic2Permutations.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

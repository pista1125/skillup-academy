# 18. Amikor nem számít a kiválasztás sorrendje (18. lecke, 54–55. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 54–55. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat:** hány 4 elemű részhalmaza van a H = {a, b, c, d, e, f, g, h, i} halmaznak? Ha sorban választjuk ki a 4 elemet, 9 · 8 · 7 · 6 lehetőség van. Egy részhalmaznál azonban nem számít a kiválasztás sorrendje (az 1-3-2-4 és a 4-2-3-1 ugyanaz), így minden részhalmazt 4! = 24-szer számoltunk:
$$\frac{9 \cdot 8 \cdot 7 \cdot 6}{4!} = 126.$$

---

## 📐 Elmélet

Az n elemű halmaz k elemű részhalmazainak számát (n ≥ k pozitív egészek) megkapjuk, ha
1. kiválasztunk egy első, egy második, …, egy k-adik elemet: n · (n − 1) · … · (n − k + 1)-féleképpen;
2. ezt elosztjuk a kiválasztott k elem sorrendjeinek számával, k!-sal.

Jele: $\binom{n}{k}$, kiolvasva **„n alatt a k”**. Például $\binom{10}{3} = \frac{10 \cdot 9 \cdot 8}{3!} = 120$, $\binom{12}{4} = \frac{12 \cdot 11 \cdot 10 \cdot 9}{4!} = 495$.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** {A; n; d; o; r}: a) 1 elemű: 5; b) 2 elemű: 10; c) 3 elemű: 10; d) 4 elemű: 5.
- **2.** 3 elemű részhalmazok, ha |B| = 3, 4, 5, 6: 1, 4, 10, 20.
- **3.** Röplabda, 6 csapat, mindenki mindenkivel egyszer: $\binom{6}{2} = 15$ mérkőzés.
- **4.** 9 unoka: a) 3 unoka különböző feladatra: 9 · 8 · 7 = 504; b) 3 unoka főzi a vacsorát: $\binom{9}{3} = 84$.
- **5.** 5 lapból egyszerre 2: $\binom{5}{2} = 10$.
- **6.** Lift (12 fő, 4 személyes): a) 495; b) 70; c) 1; d) 3 menetben: 495 · 70 · 1 = 34 650.
- **7.** Két nyeremény, 90 résztvevő: a) egyforma, egy-egy: 4005; b) különböző, egy-egy: 8010; c) különböző, akár mindkettő: 8100; d) egyforma, akár mindkettő: 4005 + 90 = 4095.
- **HF 1.** a) 7 résztvevő kézfogásai: 21; b) konvex hétszög összekötő szakaszai: 21 (7 oldal + 14 átló).
- **HF 2.** 25 fős osztály, 3 küldött: a) különböző vetélkedők: 25 · 24 · 23 = 13 800; b) mindhárman matematikán: 2300.
- **HF 3.** 8 elemű halmaz legfeljebb 3 elemű részhalmazai: 1 + 8 + 28 + 56 = 93 (az üres halmazzal együtt; nélküle 92).
- **HF 4.** Lyukasztós buszjegy, 9 szám: a) 3 lyuk: 84; b) 4 lyuk: 126.

> **⚠️ CSAPDA:** ha nem számít a sorrend (pl. mindhárom küldött ugyanazon a vetélkedőn indul), a sorban kiválasztott esetek számát k!-sal osztani kell: 25 · 24 · 23 = 13 800 helyett 13 800 : 3! = 2300. Fordítva: különböző szerepek (feladat, nyeremény) esetén nem szabad osztani.

---

## 💻 Elkészített Komponensek

1. **`CombinationsFigures.tsx`**:
   - `SubsetOvercountSvg`: a kidolgozott feladat – 9 · 8 · 7 · 6 sorban, az {1; 2; 3; 4} részhalmaz 4!-szor számolva, 126.
   - `BinomialNotationSvg`: az „n alatt a k” jelölés (10 alatt a 3, 12 alatt a 4).
   - `VolleyballMatchesSvg`: 6 csapat teljes gráfja (15 mérkőzés).
   - `HeptagonSegmentsSvg`: konvex hétszög oldalai és átlói (21 szakasz, 14 átló).
   - `LiftGroupsSvg`: 12 fő 3 menetben (495 · 70 · 1 = 34 650).
   - `TicketPunchSvg`: lyukasztós buszjegy 9 számmal (84 és 126).
2. **`CombinationsTheory.tsx`**: kidolgozott feladat, elmélet két lépésben, „számít a sorrend / nem számít” táblázat, kidolgozott feladatok (1–7.), házi feladatok eredményei, csapda.
   - **I. Laboratórium:** részhalmaz-számláló (n ≤ 90, k ≤ 10, BigInt; sorrendes szám, k!, „n alatt a k”; n ≤ 7 esetén a részhalmazok felsorolása; tankönyvi és ötöslottó előbeállítások).
   - **II. Laboratórium:** nyereménysorsolás – egyforma / különböző nyeremény, egy ember nyerhet-e kettőt; képlet, eredmény és kis esetszámnál teljes felsorolás.
3. **`CombinationsMatcher.tsx`**: 3 szint × 8 pár („n alatt a k” értékek; sorrenddel vagy anélkül; lift és nyereménysorsolás).
4. **`CombinationsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (számít-e a sorrend / ismétlés; 2, 3 vagy 4 elemű kiválasztás; igaz / hamis / adatfüggő).
5. **`CombinationsQuiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel és 9 kérdésnél ábrával, 3 puskakártyával (progress id: `g11-comb-kombinacio-quiz`; matcher: `g11-comb-kombinacio-matcher`, sorter: `g11-comb-kombinacio-sorter`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic2Combinations.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.

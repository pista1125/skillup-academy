# 6. Fejezeti Összefoglalás: Testek (8. osztály)

## Tananyag Áttekintés
A **VII. Testek** fejezet teljes anyagának szintézise:
1. **Hasábok és egyenes körhenger** (egyenes testek, $V = T_a \cdot m$, $T_p = K_a \cdot m$, $A = 2T_a + T_p$)
2. **Gúlák és egyenes körkúp** (csúcsos testek, $V = \frac{T_a \cdot m}{3}$, $A = T_a + T_p$)
3. **Pitagorasz-tétel térbeli alkalmazása** (testátló, oldalmagasság $m_o$, alkotó $a$)
4. **Gömb és Föld geometriai modellje** ($A = 4\pi r^2$, $V = \frac{4}{3}\pi r^3$, $R \approx 6370\text{ km}$, $K \approx 40\,000\text{ km}$, $A \approx 510\text{ M km}^2$)
5. **Hasonlóság a térben és dimenziók** ($k \implies k^2 \implies k^3$)
6. **Mértékegység-váltások és valós fizikai alkalmazások** ($1\text{ m}^3 = 1000\text{ liter}$, tömeg $m = \rho \cdot V$)

---

## Modul Komponensei

| Fájl | Típus | Leírás |
|---|---|---|
| [`SolidsSummaryTheory.tsx`](./SolidsSummaryTheory.tsx) | **Interaktív Tananyag** | 6 elméleti fejezet, interaktív 5-testű méretezési laboratórium (kocka, hasáb, henger, gúla, gömb), azonnali képlettár és ellenőrző kvízek |
| [`SolidsSummaryQuiz.tsx`](./SolidsSummaryQuiz.tsx) | **Témazáró Kvíz** | **90 feladat 3 szinten (pontosan 30 feladat szintenként)**, levezetésekkel, 4 képletkártyával, beépített Wordwall játékmódokkal |
| [`SolidsSummaryMatcher.tsx`](./SolidsSummaryMatcher.tsx) | **Párosító Játék** | 3 szinten 24 kártyapár (8 pár/szint) SVG geometriai ábrákkal |
| [`SolidsSummarySorter.tsx`](./SolidsSummarySorter.tsx) | **Csoportosító Játék** | 3 szinten 36 elem (12 elem/szint, 3 kategória/szint) |
| [`Chapter7SolidsSummaryQuiz.tsx`](./Chapter7SolidsSummaryQuiz.tsx) | **Kompatibilitási Export** | Visszafelé kompatibilis átirányítás a 90 feladatos új kvízre |
| [`index.ts`](./index.ts) | **Barrel Export** | Tiszta és egységes export modul |

---

## Képlettár és Összefoglaló Táblázat

| Test típusa | Felszín ($A$) | Térfogat ($V$) | Kulcsösszefüggés (Pitagorasz) |
|---|---|---|---|
| **Kocka ($a$)** | $A = 6a^2$ | $V = a^3$ | Testátló: $d = a\sqrt{3}$, lapátló: $d_l = a\sqrt{2}$ |
| **Téglatest ($a, b, c$)** | $A = 2(ab + bc + ac)$ | $V = a \cdot b \cdot c$ | Testátló: $d = \sqrt{a^2 + b^2 + c^2}$ |
| **Egyenes hasáb** | $A = 2T_a + K_a \cdot m$ | $V = T_a \cdot m$ | Palást: $T_p = K_a \cdot m$ |
| **Egyenes körhenger ($r, m$)** | $A = 2r^2\pi + 2\pi r m$ | $V = r^2\pi \cdot m$ | $T_p = 2\pi r m$ |
| **Négyzet alapú gúla** | $A = a^2 + 2a m_o$ | $V = \frac{a^2 \cdot m}{3}$ | $m_o = \sqrt{m^2 + (a/2)^2}$ |
| **Egyenes körkúp** | $A = r^2\pi + r\pi a$ | $V = \frac{r^2\pi \cdot m}{3}$ | Alkotó: $a = \sqrt{m^2 + r^2}$ |
| **Gömb ($r$)** | $A = 4\pi r^2$ | $V = \frac{4}{3}\pi r^3$ | Köré írt hengernek 2/3 része |
| **Föld modell ($R$)** | $A \approx 510\text{ M km}^2$ | $V \approx 1083\text{ Mrd km}^3$ | $R \approx 6370\text{ km}, K \approx 40\,000\text{ km}$ |

---

## Kvíz Struktúra (30 feladat szintenként = 90 feladat)
- **1. Szint (1–30. feladat):** Alapfogalmak, definíciók, közvetlen képletbehelyettesítések, mértékegység-átváltások ($m^3 \leftrightarrow dm^3 \leftrightarrow liter$), Euler-poliédertétel.
- **2. Szint (31–60. feladat):** Térbeli Pitagorasz-tétel alkalmazása (oldalmagasság, testmagasság, testátló, alkotó), hiányzó adatok visszaszámítása felszínből/térfogatból, Arkhimédész-arányok ($2:3$).
- **3. Szint (61–90. feladat):** Hasonlóság törvényei ($k \to k^2 \to k^3$), sűrűség és tömegszámítások, vízbe merítéses feladatok, Eratoszthenész Föld-mérése és időzónák, összetett geometriai szöveges feladatok.

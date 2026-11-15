# 4. A szögfüggvények tulajdonságai (4. lecke, 14–15. oldal)

A magyar Nemzeti Köznevelési Portál és az Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, 14–15. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke kidolgozott feladata a szabályos háromszög és az egyenlő szárú derékszögű háromszög segítségével meghatározza a nevezetes szögek (30°, 45°, 60°) szögfüggvényeinek pontos értékét. Az elméleti rész négy tulajdonságot rendszerez: a pótszögek szögfüggvényeit, a tangens kifejezését szinusszal és koszinusszal, a $\sin^2\alpha + \cos^2\alpha = 1$ azonosságot (egységnyi átfogójú háromszögből, Pitagorasz-tétellel), valamint a hegyesszögek szögfüggvényeinek értékkészletét. A feladatok valós helyzeteket dolgoznak fel: Montserrat drótkötélpálya ellentmondó adatai, siklóernyőzés, Budavári Sikló, épület magassága emelkedési szögből, medence aljának lejtése.

---

## 📐 Fő összefüggések

| α | sin α | cos α | tg α |
|---|:---:|:---:|:---:|
| 30° | $\frac{1}{2}$ | $\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{3}}{3}$ |
| 45° | $\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{2}}{2}$ | $1$ |
| 60° | $\frac{\sqrt{3}}{2}$ | $\frac{1}{2}$ | $\sqrt{3}$ |

1. **Pótszögek:** $\sin\beta = \frac{b}{c} = \cos\alpha$ és $\cos\beta = \frac{a}{c} = \sin\alpha$ — hegyesszög szinusza egyenlő pótszögének koszinuszával.
2. **Tangens:** $\operatorname{tg}\alpha = \frac{\sin\alpha}{\cos\alpha}$.
3. **Pitagoraszi azonosság:** egységnyi átfogónál $a = \sin\alpha$, $b = \cos\alpha$, így $\sin^2\alpha + \cos^2\alpha = 1$.
4. **Értékkészlet hegyesszögre:** $0 < \sin\alpha < 1$, $0 < \cos\alpha < 1$, $0 < \operatorname{tg}\alpha$.

> **⚠️ CSAPDA:** $\sin^2\alpha$ a szinusz értékének négyzete, $(\sin\alpha)^2$ — nem $\sin(\alpha^2)$.

---

## 🧮 Tankönyvi feladatok ellenőrzött eredményei

| Feladat | Eredmény |
|---|---|
| 1. Montserrat: 82°, 680 m, 535 m | 680 · sin 82° ≈ 673 m ≠ 535 m, az adatok ellentmondanak (a 82° csak a legmeredekebb szakasz) |
| 3. siklóernyő | 80 · sin 35° ≈ 45,9 m > 50 · sin 58° ≈ 42,4 m |
| 4. sin α = 0,8 | cos α = 0,6; tg α = 4/3 |
| 5. sin²37° + sin 37° − cos 53° + sin²53° | 1 |
| HF 1. Budavári Sikló (50 m, 95 m) | ≈ 31,8° |
| HF 2. a) b) c) Montserrat | ≈ 51,9°; ≈ 540,3 m; ≈ 673,4 m |
| HF 3. Sándor (8 m, 1,6 m, 70°) | ≈ 23,6 m |
| HF 4. medence (20 m, 120 → 160 cm) | ≈ 1,15° |

---

## 💻 Elkészített Komponensek

1. **`TrigPropertiesFigures.tsx`**:
   - `SpecialAnglesSvg`: szabályos háromszög fele (30°–60°) és egyenlő szárú derékszögű háromszög (45°).
   - `ComplementaryAnglesSvg`: pótszögek szinusza és koszinusza.
   - `UnitHypotenuseSvg`: egységnyi átfogó, $\sin^2\alpha + \cos^2\alpha = 1$.
   - `MontserratCableCarSvg`: a 82°-os és a valós (≈ 51,9°-os) pálya összevetése.
   - `ParasailingSvg`: két kötélhossz és emelkedési szög.
   - `BuildingElevationSvg`: épület magassága emelkedési szögből, szemmagassággal.
2. **`TrigPropertiesTheory.tsx`**: nevezetes szögek levezetése és táblázata, pótszögek, tangens, Pitagoraszi azonosság csapdával, értékkészlet, alkalmazások.
   - **I. Laboratórium:** szögcsúszka; élőben ellenőrzi a pótszög-, a tangens- és a $\sin^2 + \cos^2 = 1$ összefüggést (sávdiagrammal).
   - **II. Laboratórium:** „egyikből a másik” – sin vagy cos megadásával kiszámolja a másik szögfüggvényt, a tangenst és a szöget.
3. **`TrigPropertiesMatcher.tsx`**: 3 szint × 8 pár (nevezetes értékek, azonosságok, tankönyvi eredmények).
4. **`TrigPropertiesSorter.tsx`**: 3 szint × 3 kategória (melyik nevezetes szög; mindig/néha/soha igaz; melyik eszközzel számolunk).
5. **`TrigPropertiesQuiz.tsx`**: 30 kérdés 3 szinten, magyarázatokkal, 3 puskával.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade11Topic1TrigProperties.test.tsx`.

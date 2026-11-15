# 22. Gyakorlás – összeszámlálási ötletek (22. lecke, 66–69. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 66–69. oldal) alapján kidolgozott gyakorló modul.

---

## 🎯 Tananyag Áttekintés

A lecke egy „helyes válaszok útvesztőjével” indul, amely a fejezet eddigi modelljeit ismétli (10 elemű halmaz 4 elemű részhalmazai: 210; 7 karakteres 0–1 kód: 128; 5 gyerek sorba: 120; 3 kockadobás: 216; 3 fehér + 4 piros bábu: 35; titkár és jegyző 10 gyerekből: 90; 8 fős döntő dobogója: 336; háromjegyű számok: 900). Ezután összetett összeszámlálási feladatokon gyakoroljuk, hogyan bontsuk egy feladat megoldását **lépésekre** (szorzás) és **különálló esetekre** (összeadás), és mikor érdemes a **„rossz” eseteket** levonni az összesből.

---

## 📐 Ötletek az összeszámláláshoz (Elmélet)

| Helyzet | Ötlet |
|---|---|
| Az esetek jól összeszámolható, átfedés nélküli csoportokra bonthatók | Esetszétválasztás: a csoportok lehetőségeit összeadjuk |
| Egy konkrét eset lépések, döntések sorozatával áll elő | Ha minden döntés ugyanannyiféleképpen folytatható, szorzunk |
| A kimaradó eseteket könnyebb megszámolni | „Jó” = összes − „rossz” |
| Tárgyakhoz embereket vagy emberekhez tárgyakat? | Nézőpontváltás – a „rekeszek” feliratát mi választjuk |
| Kevés eset | Rendszerezett felsorolás |
| Sok elem | Gondold végig kevesebb elemmel |

### Kidolgozott feladatok
- **1. Négysávos zászló** 6 színből, kétszínű, két-két sáv azonos színű: melyik sáv egyezik a felsővel – 3; színezés 6 · 5 = 30 ⇒ **3 · 30 = 90**.
- **2. Háromjegyű számok, amelyekben van 9-es:** négy hibás gondolatmenet (100 és 90: kimaradó esetek; 280 és 200: többször számolt esetek, pl. 299). Helyesen: **900 − 8 · 9 · 9 = 900 − 648 = 252**, vagy esetszétválasztás a 9-esek száma szerint: 81 + 72 + 72 + 9 + 9 + 8 + 1 = 252.

### Érettségi feladatok (ellenőrzött eredmények)
- **1. (2012)** Kitűző 3 mezővel, 5 színnel: **a)** háromszínű 5 · 4 · 3 = **60**; **b)** kétszínű 125 − 5 − 60 = **60**.
- **2. (2014)** Szökőkút 6 vízsugárral, 3 színnel, 3-3 azonos színű: C(3; 2) · C(6; 3) = 3 · 20 = **60**.
- **3. (2018)** Háromgombócos, kétféle ízű fagylalt 6 ízből, számít a sorrend: 6 · 5 · 3 = **90**.
- **4. (2018)** 12 pad (4 oszlop × 3 sor), Julcsi és Tercsi egymás melletti padban: 9 · 2 · 10! = **18 · 10! = 65 318 400**.

### Házi feladatok
- **HF 1.** 3 házaspár egy sorban, mindenki a párja mellett: 3! · 2³ = **48**.
- **HF 2.** Vasúti fülke 4 + 4 üléssel, Juci és Piri egymás mellett vagy szemben: (6 + 4) · 2 · 6! = **14 400**.
- **HF 3.** 8 csapat első fordulója: 7 · 5 · 3 · 1 = **105**.
- **HF 4.** Rejtvény: 4! = 24 (R), 4 · 5 · 5 = 100 (N), C(7; 2) = 21 (A/Y), 1 + 9 + 36 + 84 = 130 (A), C(7; 2) = 21 (Y/A) ⇒ **ARANY** (János).

> **⚠️ CSAPDA:** Esetszétválasztásnál az esetek nem fedhetik egymást. A „9-es az 1., 2. vagy 3. helyen” felbontás a 299-et kétszer, a 999-et háromszor számolja (280 a helyes 252 helyett).

---

## 💻 Elkészített Komponensek

1. **`CombinatoricsPractice2Figures.tsx`**:
   - `PracticeMazeSvg`: a bevezető útvesztő kérdései és helyes válaszai.
   - `FlagColoringSvg`: a négysávos zászló 3 sávelrendezése és a 3 · 30 = 90.
   - `FountainColoringSvg`: a hat vízsugár (kék-sárga-sárga-kék-sárga-kék).
   - `ExamRoomSvg`: a 4 × 3 pados vizsgaterem az egymás melletti padpárokkal.
   - `NineDigitComplementSvg`: 900 − 648 = 252 szalagdiagram.
2. **`CombinatoricsPractice2Theory.tsx`**: útvesztő, a fejezet modelljeinek összefoglaló táblázata, kidolgozott feladatok, összeszámlálási ötletek, 4 érettségi feladat, hibakereső táblázat, házi feladatok eredményei, csapda.
   - **I. Laboratórium:** „Van benne d számjegy?” – n jegyű számok (n = 2–5), összes − rossz, élő ellenőrzés az összes szám végignézésével.
   - **II. Laboratórium:** Színezés-számláló – n mező, k szín: pontosan j színt használó színezések táblázata (összeg = kⁿ), valamint a „fele-fele két szín” eset; előbeállítások: kitűző, zászló, szökőkút.
3. **`CombinatoricsPractice2Matcher.tsx`**: 3 szint × 8 pár (ötletek, feladat ↔ képlet, tankönyvi eredmények).
4. **`CombinatoricsPractice2Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (sorrend/ismétlés; komplementer / esetszétválasztás / szorzat; helyes / kimaradó / többször számolt).
5. **`CombinatoricsPractice2Quiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel és 8 kérdésnél ábrával (zászló, kitűző, szökőkút, vizsgaterem, vasúti fülke), 3 puskakártyával (progress id: `g11-comb-gyakorlas-masodik-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic2CombinatoricsPractice2.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

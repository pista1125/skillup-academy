# 5. Nyitott mondatok (I. témakör, 5. lecke – TK 22. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 22. oldal) és a munkafüzet (`OH-MAT04MA_I`) nyitott mondatos feladatai alapján kidolgozott modul. A leckéhez nincs külön munkafüzeti oldal; a gyakorló feladatok a MF I/11. (13. feladat), I/16. (2. feladat) és I/18. (4. feladat) oldalairól, valamint a TK 25. (13. feladat) és 29. oldaláról (Megálló 5–6.) származnak.

---

## 🎯 Tananyag áttekintés (TK 22.)

- **1. feladat:** szöveges nyitott mondatok kiegészítése („□ egyjegyű szám van” → 10; „A magyar ábécében □ háromjegyű mássalhangzó van” → 1 (dzs); „Magyarország legnagyobb folyója a □” → Duna; „A gólyának □ lába van, mint a fecskének” → ugyanannyi).
- **2. feladat:** „A(z) □ nehezebb, mint a(z) □.” – járművek (busz, autó, motor, kerékpár) beírásával igaz és hamis állítás.
- **3. feladat:** 367 > □ > 67 – a számkártyák közül a **365, 366, 287** teszi igazzá (403, 811, 954, 368 túl nagy; 67 és 56 túl kicsi).
- **4. feladat:** Sanyi 200 m-t leúszott, az edzésadagja 250 m. A szöveget legpontosabban a **200 m + □ m = 250 m** tükrözi; □ = 50.
- **5. feladat:** azonos jelek azonos számot jelölnek: ● + ● = 100 → 50; ▲+▲+▲+▲ = 200 → 50; ■+■+■ = 180 → 60; ▲+▲ = 1000 → 500.

### Gyakorló feladatok forrásai
- Pótlás visszafelé számolással (TK 29/6.): □ + 254 = 522 → 268; □ − 560 = 330 → 890; □ · 6 = 480 → 80; □ : 9 = 80 → 720; 562 + □ = 741 → 179; 803 − □ = 427 → 376.
- „Mely számok teszik igazzá?” (TK 29/5., MF I/11/13., I/16/2.): 37 · 10 − 350 > □ → 0…19; 500 : 10 + 413 > □ → 0…462; (590 − 340) · 3 < □ → 751-től; 487 + 58 − 229 > □ → 0…315; 220 − □ < 800 : 8 : 4 → 196-tól.
- Gondoltam egy számra (TK 25/13., MF I/18/4.): · 3, + 60 → 300 ⇒ 80; kétszeresét · 10 → 800 ⇒ 40.

> **⚠️ CSAPDA:** □ − 560 = 330 esetén nem 560 − 330-at, hanem 330 + 560-at kell számolni. A < és > jel nem engedi meg az egyenlőséget (20 > □ esetén a 20 nem megoldás).

---

## 💻 Elkészített komponensek

1. **`OpenSentencesFigures.tsx`**
   - `OpenSentenceCardsSvg`: 367 > □ > 67 és a tankönyvi számkártyák (zöld = igaz, piros = hamis).
   - `BalanceScaleSvg`: mérleg, □ + 240 = 600.
   - `SameSymbolsSvg`: a TK 5. feladatának jeles egyenlőségei.
   - `SwimBarSvg`: Sanyi úszása szakaszos ábrán (200 m + □ m = 250 m).
   - `SolutionsNumberLineSvg`: az 5 > □ megoldásai a számegyenesen.
   - `ThinkNumberArrowsSvg`: „Gondoltam egy számra” nyíldiagram oda-vissza műveletekkel.
2. **`OpenSentencesTheory.tsx`**: mi a nyitott mondat, egy vagy több megoldás, visszafelé számolás (4 alapeset + előbb számolj), szövegből nyitott mondat, jeles feladványok, csapda.
   - **I. Labor – Cédulás próbálgatás:** 4 nyitott mondat, számkártyák koppintással a □ helyére, azonnali igaz/hamis visszajelzés, számláló.
   - **II. Labor – Mérleg-labor:** ±1/±10/±100 gombokkal keresd a □ értékét, a mérleg dől vagy egyensúlyba kerül.
3. **`OpenSentencesMatcher.tsx`**: 3 szint × 8 pár (hiányzó szám; melyik művelettel számolod; az összes megoldás).
4. **`OpenSentencesSorter.tsx`**: 3 szint × 3 kategória × 9 elem (igaz / hamis / nyitott; összeadással / kivonással / szorzással-osztással; 1 / több / nincs megoldás).
5. **`OpenSentencesQuiz.tsx`**: 30 kérdés (10 / 10 / 10), 15 ábrával, kérdéstípus-jelvényekkel, 3 puskakártyával. Progress-azonosító: `g4-count-nyitott-mondatok-quiz`.

---

## 🧪 Tesztelés

`src/test/grade4Topic1OpenSentences.test.tsx` – a 4 komponenst és mind a 6 SVG ábrát rendereli.

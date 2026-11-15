# 8. Számrendszerek II. (49. lecke, 146–149. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 146–149. oldal) alapján kidolgozott oktatási modul. A diákzónában a IV. Számelmélet fejezet **8.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat:** írjuk fel a 315-öt 6-os számrendszerben! 315 tojást hatosával csomagolunk: 6 tojás egy tojástartóba, 6 tojástartó egy dobozba (36 tojás), 6 doboz egy raklapra (216 tojás).

- **Első módszer (ismételt maradékos osztás):** 315 = 52 · 6 + **3**; 52 = 8 · 6 + **4**; 8 = 1 · 6 + **2**; marad **1** raklap. A maradékokat alulról felfelé olvasva 315 = **1243₆**.
- **Második módszer (a legnagyobb helyi értékkel kezdve):** 1 raklap (marad 99), 99 = 2 · 36 + 27, 27 = 4 · 6 + 3.
- 315 = 1 · 6³ + 2 · 6² + 4 · 6 + 3.

**10-nél nagyobb alap:** a 12-es rendszerben A = 10 és B = 11; a 16-os (hexadecimális) rendszerben A–F = 10–15.

**Ráadás – számrendszerek az informatikában II.:**
- 2 → 4: a biteket jobbról kettes csoportokba osztjuk (1011₂ = 23₄; 110000111₂ = 12013₄; visszafelé 12₄ = 110₂, 3012₄ = 11000110₂).
- 2 → 8: hármas, 2 → 16: négyes csoportok: 1110111100010101₂ = 167425₈ = EF15₁₆; 7AD₁₆ = 11110101101₂.
- Összeadás kettesben: 0 + 0 = 0, 0 + 1 = 1, 1 + 1 = 10₂ (átvitel); 1101100₂ + 101010₂ = 10010110₂ (108 + 42 = 150).

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** a) 2222₃ = 80 > 100₄ = 16; b) 40 = 101000₂ (két 1-es), 40 = 1111₃ (négy 1-es) – a hármas alakban több.
- **2.** a) 1011101111₂ = 751; b) 491 = 111101011₂; c) 542 = 2302₆ = 1403₇ = 1036₈.
- **3.** a) ABA₁₂ = 1582, BAB₁₂ = 1715, BABA₁₂ = 20590, ABBA₁₂ = 19006; b) 420 = 2B0₁₂, 1848 = 10A0₁₂, 287 = 1BB₁₂; c) 1000₁₂ − 111₁₂ = 1571 ≠ 1715, tehát hamis.
- **4.** 31 _ _₄: a szám 208 és 223 között bármelyik egész lehet.
- **5.** Peti kártyái: A = 1-es, B = 2-es, C = 4-es, E = 8-as, D = 16-os helyi érték; a megnevezett kártyák első számait összeadja.
- **Ráadás 1.** 16-os rendszer: 10₁₆ = 16, FF₁₆ = 255, FFF₁₆ = 4095. **2.** kétjegyű 240, háromjegyű 3840, négyjegyű 61 440. **3.** 10110₂ páros, 4324₅ páratlan, 20121₃ páros, 4531₆ páratlan. **4.** 509, a következő 1013. **5.** 2301₅ · 11₅ = 30311₅; 2301₅ · 21₅ = 103321₅; 1403₆ · 22₆ = 35310₆; 501₆ · 23₆ = 20323₆. **6.** 4 · 4! = 96 szám, mind (100%) páros; páratlan alapnál a jegyek összegének párossága dönt. **7.** x = 5. **8.** a0b₅ = b0a₇: 51 és 102, azaz 2 szám. **9.** n · q = 15.
- **HF 1.** 768 = 30000₄ = 2145₇ = 1043₉. **HF 2.** a) 17 + 18 = 35 = 100011₂; b) 42 + 39 = 81 = 1010001₂ – a gép mindkétszer jól számolt. **HF 3.** a) igen, 140₇ = 77; b) 8-as rendszerben (145₈ = 101); c) 1001₂ = 9 éjszaka. **HF 4.** 3333₄ = 255 = 11111111₂. **HF 5.** # = 1.

> **⚠️ CSAPDA:** a biteket mindig **jobbról** csoportosítjuk. Balról kezdve 110000111₂-ből a hibás 30031₄ jönne ki a helyes 12013₄ helyett; az ismételt osztás maradékait pedig alulról felfelé kell olvasni (nem 3421₆, hanem 1243₆).

---

## 💻 Elkészített Komponensek

1. **`NumeralSystems2Figures.tsx`**:
   - `EggPackingSvg`: 315 tojás raklapra, dobozba, tojástartóba csomagolva (1243₆).
   - `DivisionChainSvg`: az ismételt osztás 6-tal, maradékok alulról felfelé.
   - `BinaryToQuaternarySvg`: 110000111₂ kettes csoportokban → 12013₄.
   - `BinOctHexSvg`: 1110111100010101₂ hármas és négyes csoportokban → 167425₈ és EF15₁₆.
   - `BinaryAdditionSvg`: 1101100₂ + 101010₂ = 10010110₂ átvitelekkel.
   - `NumberCardsSvg`: Peti 5 számkártyája (a kettes helyi értékek).
2. **`NumeralSystems2Theory.tsx`**: kidolgozott feladat két módszerrel, 12-es és 16-os rendszer, bitcsoportosítás (Ráadás), összeadás kettesben, tankönyvi feladatok, csapda.
   - **I. Laboratórium:** átváltó ismételt osztással (tetszőleges szám, alapszám 2–16, tankönyvi gyorsgombok) – élő osztástábla és helyiérték-ellenőrzés.
   - **II. Laboratórium:** 12 bites kapcsolósor – hármas és négyes csoportok, 8-as, 16-os és tízes érték, a 3 jegyű hexakód színmintája.
3. **`NumeralSystems2Matcher.tsx`**: 3 szint × 8 pár (számjegyek és bitcsoportok; átváltások; tankönyvi feladatok).
4. **`NumeralSystems2Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (melyik értékkel egyenlő; páros, páratlan vagy hibás alak; hány bites csoportok kellenek).
5. **`NumeralSystems2Quiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel és szükség szerint ábrával, 3 puskakártyával (progress id: `g11-num-szamrendszer-masodik-quiz`; párosító: `g11-num-szamrendszer-masodik-matcher`; csoportosító: `g11-num-szamrendszer-masodik-sorter`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic4NumeralSystems2.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.

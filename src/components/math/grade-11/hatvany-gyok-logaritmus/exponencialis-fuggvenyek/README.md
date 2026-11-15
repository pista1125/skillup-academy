# 7. Exponenciális függvények (tankönyvi 32. lecke, 96–97. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 96–97. oldal) alapján kidolgozott oktatási modul. A diákzónában a III. fejezet 7. része.

---

## 🎯 Tananyag Áttekintés

A lecke a számológéppel ábrázolt x ↦ 2ˣ függvénnyel indul, amelynek értelmezési tartománya a {−2,6; −2,5; …; 3,1} halmaz: a grafikon **58 pontból** áll, a függvény szigorúan monoton növekvő, értékkészletének legkisebb eleme 2^(−2,6) ≈ 0,165, legnagyobb eleme 2^(3,1) ≈ 8,574. Más értelmezési tartományon is biztosan megmarad a szigorú monoton növekedés.

Az eddigi műveletekkel a kitevő csak racionális lehet; felsőbb matematikával a hatvány **irracionális kitevőre** is kiterjeszthető úgy, hogy a szigorú monotonitás és az azonosságok megmaradnak. Pl. 1,414 < √2 < 1,415 ⇒ 2^1,414 < 2^√2 < 2^1,415, azaz 2,665 < 2^√2 < 2,667; számológéppel 2^√2 ≈ **2,665**.

---

## 📐 Fő Fogalmak

- **Kettes alapú exponenciális függvény:** a valós számok halmazán értelmezett x ↦ 2ˣ; grafikonja folytonos vonal. Df = R, Rf = R⁺, szigorúan monoton növekvő, nincs szélsőértéke, nincs zérushelye.
- **Definíció:** ha a > 0 és a ≠ 1, akkor az R-en értelmezett x ↦ aˣ függvény az **a alapú exponenciális függvény** (exponens = hatványkitevő).
- **Tulajdonságok:** Rf = R⁺; 1 < a esetén szigorúan monoton növekvő, 0 < a < 1 esetén szigorúan monoton csökkenő; nincs szélsőértéke, nincs zérushelye; grafikonja átmegy a (0; 1) ponton.
- **Megjegyzés:** az x ↦ 1ˣ konstans függvény, ezért nem soroljuk az exponenciális függvények közé.

### Tankönyvi feladatok (node-dal ellenőrzött eredmények)
- **1.** f(x) = 3ˣ, g(x) = 0,5ˣ, h(x) = 1,5ˣ ábrázolása értéktáblázattal; d) 3^(7/8) ≈ 2,615 (2 és 3 között), 3^(−3/5) ≈ 0,517 (0 és 1), 0,5^(−5/4) ≈ 2,378 (2 és 3), 1,5^(3/2) ≈ 1,837 (1 és 2). *(A kivonatban a kitevők törtként olvashatók: 7/8, −3/5, −5/4, 3/2.)*
- **2.** Hozzárendelési szabály leolvasása négyzethálós grafikonról – a tankönyvi ábrák a szövegkivonatban nem láthatók, ezért a II. labor saját, rácspontos grafikonokkal gyakoroltatja.
- **3.** (3/4)ˣ, (4/3)ˣ, (3/4)⁻ˣ, (4/3)⁻ˣ: (3/4)⁻ˣ = (4/3)ˣ és (4/3)⁻ˣ = (3/4)ˣ, csak két különböző grafikon, egymás tükörképei az y tengelyre.
- **HF 1.** f(x) = 0,25ˣ: f(0) = 1, f(1) = 0,25, f(−1) = 4, f(−5) = 1024, f(5) = 1/1024; f(a) · f(−a) = 1; 0,25ˣ = 3 ⇒ x ≈ −0,79.
- **HF 2.** f = 3ˣ, g = (1/3)ˣ, h = 9ˣ: P₁(1/2; √3), P₂(−1; 1/3), P₇(1/3; ∛3) → f; P₈(−2; 9) → g; P₃(−1/2; 1/3) → h; P₆(0; 1) mindhárom; P₄(1; 0) egyik sem. *(A P₅ pont koordinátái a szövegkivonatból nem olvashatók ki egyértelműen, ezért kimaradt.)*
- **HF 3.** 5ˣ, (1/5)ˣ, 5⁻ˣ: g = h, a grafikonjuk az 5ˣ tükörképe az y tengelyre.

> **⚠️ CSAPDA:** A negatív kitevő reciprokot jelent, nem negatív előjelet (2⁻³ = 1/8). Az exponenciális függvény sosem 0 és sosem negatív, a grafikon nem metszi az x tengelyt. a⁻ˣ = (1/a)ˣ, ezért pl. 2⁻ˣ csökkenő.

---

## 💻 Elkészített Komponensek

1. **`ExponentialFunctionsFigures.tsx`** (exportálja az `expPath` segédfüggvényt is):
   - `ExponentialFunctionsDiscreteSvg`: 2ˣ az 58 elemű halmazon (pontgrafikon).
   - `ExponentialFunctionsBase2Svg`: y = 2ˣ grafikonja a tulajdonságokkal.
   - `ExponentialFunctionsFamilySvg`: 0,4ˣ, 0,8ˣ, 1,2ˣ, 1,5ˣ, 2ˣ közös koordináta-rendszerben.
   - `ExponentialFunctionsMirrorSvg`: 3ˣ és (1/3)ˣ – tükrözés az y tengelyre.
   - `ExponentialFunctionsIrrationalSvg`: 2^√2 két racionális kitevő közé szorítva.
2. **`ExponentialFunctionsTheory.tsx`**: bevezető, irracionális kitevő, kettes alapú és a alapú exponenciális függvény, feladatmegoldások (értéktáblázat, becslés, tükrözés, házi feladatok), csapda.
   - **I. Laboratórium:** aˣ felfedező – alap csúszka (0,1–4, gyorsgombok, a = 1 konstans eset), x-nyomkövetés, (1/a)ˣ tükörkép kapcsoló, tulajdonságok élőben.
   - **II. Laboratórium:** grafikon-nyomozó (rácspontból az alap kitalálása, 8 feladat, ellenőrzés) és pontillesztés a HF 2. pontjaival.
3. **`ExponentialFunctionsMatcher.tsx`**: 3 szint × 8 pár (függvényértékek; fogalmak; azonos alakok és becslések).
4. **`ExponentialFunctionsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (növekvő / csökkenő / nem exponenciális; 0–1, 1–2, > 2; melyik grafikonon a pont).
5. **`ExponentialFunctionsQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), minden kérdésen típus-címke, 10 kérdésen grafikon-ábra, 3 puskakártya (progress id: `g11-exp-exponencialis-fuggveny-quiz`; matcher: `…-matcher`, sorter: `…-sorter`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3ExponentialFunctions.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

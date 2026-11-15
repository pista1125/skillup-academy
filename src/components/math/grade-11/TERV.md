# 11. osztály – Fejlesztési terv (jóváhagyásra vár)

## 0. Források

| Forrás | Hol van | Megjegyzés |
|---|---|---|
| **OH-MAT11TA** – Matematika 11. tankönyv (280 oldal, 81 lecke) | Firebase Storage `11_osztaly/`; letöltve: `scratch/g11/OH-MAT11TA.pdf` + `.txt` | Ez a fő forrás |
| **OH-MAT912GY** – 9–12. gyakorló és feladatgyűjtemény | Storage `10_osztaly/` mappában | 11-es munkafüzet helyett ez használható |
| **OH-MAT912AE** – emelt szintű érettségihez | Storage `11_osztaly/` | Ráadás- és nehezebb (Mester szintű) feladatokhoz |
| **OH-FGV912GY** – függvénytáblázat | Storage `11_osztaly/` | Puskákhoz, képletekhez |
| 11-es munkafüzet (MA / SNE) | **Nincs** a Storage-ban és a gépen sem | Kérdés a felhasználóhoz |

## 1. Egy lecke csomagja (a 10. osztály mintájára)

Minden leckemappában (`grade-11/<fejezet>/<lecke>/`):

1. `README.md` – **a tankönyv oldalai alapján pontosítva** (a mostani README-k egy része csak cím alapján készült: pl. a 37. lecke a tankönyvben exponenciális egyenletek modellezése logaritmussal, a README viszont logaritmus-azonosságokat ír).
2. `XxxFigures.tsx` – SVG ábrák a tankönyvi ábrák alapján.
3. `XxxTheory.tsx` – elmélet + kidolgozott feladatok + **1–2 interaktív labor**.
4. `XxxQuiz.tsx` – 30 kérdés, 3 szinten (Kezdő/Haladó/Mester), magyarázattal, lépésenkénti levezetéssel, puskával, vizsga móddal.
5. `XxxMatcher.tsx` – 3 szint × 8 pár.
6. `XxxSorter.tsx` – 3 szint × 3 kategória.
7. `index.ts`, unit teszt (`src/test/grade11...test.tsx`).
8. Bekötés: `Grade11Activities.tsx` (új), `MathActivityRouter` (`g11-` ág), `Grade11View` (a „Hamarosan” kártyák élesítése). A `gradeSectionsConfig.ts` 11-es szekciói már megvannak.

Gyakorlás/tudáspróba leckéknél: összefoglaló elmélet + érettségi típusú feladatok, vizsga mód.
Csoportverseny leckénél: a 10-es csoportverseny mintája.

## 2. Leckénkénti terv

### I. Trigonometria (1–15. lecke, 6–49. o.)

| # | Lecke | Interaktív labor / fő tartalom |
|---|---|---|
| 1 | Hegyesszög tangense | Lejtő-meredekség csúszkával (szög ↔ tg ↔ %-os emelkedő), víztorony árnyékmérés |
| 2 | Számolás szögek tangensével | Számológép-szimulátor (tan, tan⁻¹, DEG/RAD csapda), hiányzó befogó |
| 3 | Hegyesszög szinusza, koszinusza | Háromszög húzható csúccsal, élő sin/cos; létra a falnak |
| 4 | A szögfüggvények tulajdonságai | Pótszög-összefüggések, sin²α+cos²α=1 vizuálisan, nevezetes szögek levezetése (négyzet, szabályos háromszög) |
| 5 | Hosszúságok és szögek kiszámítása | „Derékszögű háromszög megoldó”: 2 adat → lépésenkénti megoldás |
| 6 | Új területképlet | Húzható háromszög, T = ab·sinγ/2 élőben |
| R | Ráadás – Milyen magas a torony? | Két mérési pont, két szög → magasság (megközelíthetetlen talppont) |
| 7 | Tompaszög és derékszög szinusza | Egységkör-labor 0–180°, sin(180°−α) = sin α |
| 8 | A szinusztétel | Háromszög + köré írt kör, a/sin α = 2R élőben |
| 9 | Alkalmazások | „Két megoldás” esete (kisebbik oldallal szemközti szög) szerkesztő laborban |
| 10 | Tompaszög és derékszög koszinusza | Egységkör, cos előjele, cos(180°−α) = −cos α |
| 11 | A koszinusztétel | Pitagorasz általánosítása; döntési fa: szinusz- vagy koszinusztétel? |
| 12 | Sokszögek és szögfüggvények | Négyszög felbontása, paralelogramma T = ab·sin α, átlók |
| 13 | A kör és a szabályos sokszögek | n-csúszka: beírt/köré írt kör, terület → πr² közelítés |
| 14 | Csoportverseny | Csapatverseny mód |
| 15 | Gyakorlás, tudáspróba | Vizsga mód, érettségi feladatok |
| T | Témazáró feladatgyűjtemény (46–49. o.) | **Új mappa** |

### II. Kombinatorika, gráfok (16–25. lecke, 50–79. o.)

| # | Lecke | Interaktív labor / fő tartalom |
|---|---|---|
| 16 | Jelszavak | Jelszóerősség-kalkulátor (karakterkészlet^hossz, feltörési idő), PIN-kódok |
| 17 | Sorba rendezés | Fagyigombóc/zenelista sorrend-animáció, ismétléses permutáció |
| 18 | Amikor nem számít a sorrend | Lottószimulátor, bizottság-választó; „számít-e a sorrend?” döntő |
| 19 | Binomiális együtthatók | Interaktív Pascal-háromszög (összeg, szimmetria, 2ⁿ), rácsút-számlálás |
| 20 | Gyakorlás | Modellválasztó döntési fa (sorrend? ismétlés? → képlet) |
| 21 | Esetszétválasztás | Összeadási szabály, komplementer („legalább egy”), szita Venn-diagrammal |
| 22 | Gyakorlás | Kártya- és kockás feladatok |
| 23 | Gráfok jellemzői | Gráfszerkesztő: csúcs/él rajzolás, fokszám, kézfogási lemma ellenőrzése |
| 24 | Kombinatorika és gráfok | Fák, „rajzold meg egy vonallal” Euler-vonal játék |
| 25 | Gyakorlás, tudáspróba | Vizsga mód |
| T | Témazáró feladatgyűjtemény (76–79. o.) | README már van |

### III. Hatvány, gyök, logaritmus (26–41. lecke, 80–119. o.)

| # | Lecke | Interaktív labor / fő tartalom |
|---|---|---|
| 26 | Hatványozás – ismétlés | Azonosság-párosító, normálalak-átváltó |
| 27 | Számok n-edik gyöke | Páros/páratlan gyökkitevő grafikonon, értelmezési tartomány |
| 28 | Racionális számok a kitevőben I. | a^(p/q) ↔ gyök átíró gyakorló |
| 29 | Racionális számok a kitevőben II. | Lépésenkénti egyszerűsítő |
| 30 | Gyakorlás | |
| 31 | Pénzügyi számítások | Kamatoskamat-kalkulátor grafikonnal, egyszerű vs. kamatos kamat |
| 32 | Exponenciális függvények | a^x csúszkával (0<a<1, a>1), aszimptota |
| 33 | Exponenciális folyamatok | Baktérium-/népességszaporodás szimuláció, kettőződési idő |
| 34 | Felezési idő | Bomlás-szimulátor, radiokarbon kormeghatározás |
| 35 | A logaritmus fogalma | „Kitevőkereső”: a^? = b; log ↔ hatvány átíró |
| 36 | A tízes alapú logaritmus | lg számológéppel, logaritmikus skálák (pH, decibel, Richter); ráadás: logarléc |
| 37 | Hatvány, gyök, logaritmus | **Exponenciális egyenletek valós modellekben** (a^x = b → x = lg b / lg a; BSE-modell, érettségi) – README javítandó |
| 38 | Gyakorlás | Érettségi logaritmusos feladatok |
| 39 | Exponenciális egyenlőtlenségek | Grafikus megoldás, monotonitás (0<a<1 → relációjel fordul) |
| 40 | Gyakorlás | |
| 41 | Gyakorlás, tudáspróba | Vizsga mód |
| T | Témazáró feladatgyűjtemény (118–119. o.) | **Új mappa** |

### IV. Számelmélet (42–52. lecke, 120–159. o.)

| # | Lecke | Interaktív labor / fő tartalom |
|---|---|---|
| 42 | Számhalmazok | N ⊂ Z ⊂ Q ⊂ R halmazábra (húzd a számot a helyére), műveleti zártság |
| 43 | Osztó, többszörös | Eratoszthenész szitája, prímtényező-fa |
| 44 | LNKO, LKKT | Prímtényezős Venn-diagram, euklideszi algoritmus lépésenként |
| 45 | Oszthatósági szabályok, maradékok | Szabályellenőrző (melyik szabály teljesül és miért) |
| 46 | Oszthatóság és logika | Szükséges / elégséges feltétel válogató, indirekt bizonyítás |
| 47 | Oszthatósági feladatok | Kifejezés-teszter (pl. n³ − n osztható 6-tal) |
| 48 | Számrendszerek I. | Bitkapcsolós bináris átváltó, Neumann János |
| 49 | Számrendszerek II. | Hexa/oktál, bitcsoportosítás, színkódok (#RRGGBB) |
| 50 | Gyakorlás | |
| 51 | Racionális, irracionális számok | Szakaszos tizedes tört → közönséges tört, √2 bizonyítás sorba rendezve |
| 52 | Gyakorlás, tudáspróba | Vizsga mód |
| T | Témazáró feladatgyűjtemény (158–159. o.) | **Új mappa** |

### V. Statisztika és valószínűségszámítás (53–65. lecke, 160–211. o.)

| # | Lecke | Interaktív labor / fő tartalom |
|---|---|---|
| 53 | Adatrendezés – statisztikai jellemzők | Adatsor-szerkesztő: átlag, medián, módusz, terjedelem élőben |
| 54 | Diagramok | Diagramkészítő + félrevezető diagram felismerése |
| 55 | A dobozdiagram | Húzható adatpontok → élő dobozdiagram, kvartilisek |
| 56 | Adatsokaság szórása | Eltérések négyzetei vizuálisan, szórás változása |
| R | Ráadás – Számológéppel | 1-VAR STAT útmutató |
| 57 | Gyakorlás | |
| 58 | Valószínűség – ismétlés | Kocka-/érmeszimulátor, relatív gyakoriság → valószínűség |
| R | Ráadás – Gyakorlás | Geometriai valószínűség (célba dobás) |
| 59 | Várható érték | Szerencsejáték-tervező: méltányos-e? |
| 60 | Két vagy több elemet húzunk egyszerre | Urnamodell kombinációkkal |
| 61 | Visszatevés nélküli mintavétel | Valószínűségi fa-építő |
| 62 | Ugyanazt többször | Binomiális eloszlás oszlopdiagram (n, p csúszka) |
| 63 | Visszatevéses mintavétel | |
| 64 | Gyakorlás | |
| R | Ráadás – Visszatevéssel vagy anélkül? | Összehasonlító szimuláció |
| 65 | Gyakorlás, tudáspróba | Vizsga mód |
| T | Témazáró feladatgyűjtemény (208–211. o.) | **Új mappa** |

### VI. Koordinátageometria (66–81. lecke, 212–265. o.)

| # | Lecke | Interaktív labor / fő tartalom |
|---|---|---|
| 66 | Vektorok összeadása | Húzható vektorok, háromszög- és paralelogramma-módszer |
| 67 | Két vektor különbsége | |
| 68 | Vektorok számszorosa | λ-csúszka |
| R | Ráadás – Vektor felbontása | Lejtőn ható erők |
| 69 | Vektorok a koordináta-rendszerben | Rács, helyvektor, hossz |
| 70 | Távolság, kerület, terület | Húzható sokszögcsúcsok → K és T |
| 71 | Felezőpont | Osztópont csúszkával, súlypont |
| 72 | Gyakorlás csoportban | |
| 73 | Egyenesek a koordináta-rendszerben | Irány- és normálvektor |
| 74 | Az egyenes egyenlete | Két pont → élő egyenlet |
| 75 | A kör egyenlete | Középpont/sugár húzása → egyenlet; teljes négyzetté kiegészítés |
| 76 | Körrel kapcsolatos feladatok | Egyenes–kör metszés (0/1/2 pont), érintő |
| 77 | Meredekség, iránytangens | m-csúszka, irányszög |
| 78 | Egyenesek metszéspontja | Két egyenes ↔ egyenletrendszer |
| 79 | Merőleges, párhuzamos egyenesek | m₁·m₂ = −1 vizuálisan |
| 80 | Gyakorlás | Háromszög nevezetes vonalai koordinátákkal |
| 81 | Gyakorlás, tudáspróba | Vizsga mód |
| T | Témazáró feladatgyűjtemény (262–265. o.) | **Új mappa** |

### Kiegészítők

- **Bevezetés (4–5. o.)** – 10-es ismétlő bemelegítő modul (opcionális).
- **Ráadás – Mindennapi pénzügyeink (266–273. o.)** – új modul; a meglévő `tools/debt-asset-model` újrahasznosítható.
- **Év végi ismétlés** – a 10-es mintájára.

## 3. Közös 11-es építőelemek (egyszer kell megírni)

`grade-11/shared/`: koordináta-rendszer + függvényrajzoló (exp, log, egyenes, kör), egységkör, háromszög húzható csúcsokkal, gráfszerkesztő, valószínűség-szimulátor. Érintéses (pointer events) támogatással mobilra.

## 4. Munkamenet

Fejezetenként haladunk (I → VI), fejezetenként egy commit (`11I`, `11II`, …). Minden lecke előtt: tankönyvi oldalak elolvasása → README pontosítása → komponensek → bekötés → teszt → `npm test` + `npm run build`.

## 5. Projektfejlesztési javaslatok

Lásd a beszélgetésben (A: kódszerkezet, B: funkciók, C: megjelenés).

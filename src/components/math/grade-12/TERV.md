# 12. osztály – Fejlesztési terv

## Döntések (2026-11-16, jóváhagyva)

- Rendszerező összefoglalás: **„B” változat**, 10 lecke (a 4. fejezetnél átírjuk a konfigurációt és a nézetet).
- A témazáró feladatgyűjtemények kimaradnak; a Sorozatok témazáró szekciója törölve.
- Próbaérettségi nem kell.
- **Minden sima „Gyakorlás” alfejezet törölve** (térgeometria: 8., 15., 19.; sorozatok: 31.; statisztika: 43. tankönyvi lecke). A záró „Gyakorlás, tudáspróba” marad.
- Új leckeszámok: I. Térgeometria 18 lecke, II. Sorozatok 10, III. Statisztika 11, IV. Rendszerező 10. Az alábbi táblázatokban a törölt Gyakorlás sorok már nem készülnek.
- Sorrend: I → IV, fejezetenként commit (`12I`…), legfeljebb 4 ágens párhuzamosan.

## 0. Források

| Forrás | Hol van | Megjegyzés |
|---|---|---|
| **OH-MAT12TA** – Matematika 12. tankönyv (192 oldal, 44 lecke + rendszerező összefoglalás + 3 próbaérettségi) | Firebase Storage `12_osztaly/`; letöltve: `scratch/g12/OH-MAT12TA.pdf` + `.txt` | A fő forrás |
| OH-MAT912GY, OH-MAT912AE, OH-FGV912GY | Storage `12_osztaly/` | A 11-es döntés szerint nem használjuk, csak a tankönyvet |

A `grade-12/**/README.md` fájlok címei és leckeszámai egyeznek a tankönyv tartalomjegyzékével, de a vázuk a címek alapján készült. Ezért minden lecke előtt a tankönyvi oldalak alapján javítani kell őket.

## 1. A munka módja (ugyanúgy, mint a 11. osztálynál)

- **Sablonok:** a 11-es `TheoryTemplate`, `QuizTemplate`, `MatcherTemplate` és `SorterTemplate` (a hat fejezetben azonosak, csak a címkék térnek el) bemásolva a 4 fő témakör mappájába:
  `grade-12/tergeometria/`, `grade-12/sorozatok/`, `grade-12/statisztika-valoszinusegszamitas/`, `grade-12/rendszerezo-osszefoglalas/`.
  Átírandó: `chapterId`, az alapértelmezett badge (pl. `12. OSZTÁLY • I. TÉRGEOMETRIA`) és a kérdéstípus alapcímkéje.
- **Egy lecke csomagja:** `README.md` (javítva) · `XxxFigures.tsx` · `XxxTheory.tsx` (elmélet, kidolgozott feladatok, 1–2 interaktív labor) · `XxxQuiz.tsx` (3 szint × 10 kérdés, magyarázattal, lépésenkénti levezetéssel, puskával, vizsga móddal) · `XxxMatcher.tsx` (3 × 8 pár) · `XxxSorter.tsx` (3 × 3 kategória) · `index.ts` · unit teszt.
- **Tudáspróba-leckék:** a kvíz 3 × 30 kérdés a teljes fejezetből.
- **Kvízábrák:** ahol segít, kérdésenként SVG-ábra (`figure`), ahol az ismeretlen „?”. Minden kérdésnek saját `questionTypeBadge`.
- **Derékszög:** negyedkörív ponttal, soha nem négyzettel. A térbeli ábrákon is (pl. magasság és alaplap).
- **Számozás:** a diákoknak megjelenő címekben a diákzóna témakörön belüli szekciószáma áll, nem a tankönyvi szám. Például a 22. Számsorozatok lecke a II. témakör 1. leckéje.
- **Bekötés:** új `activities/Grade12Activities.tsx`, `g12-` ág a `MathActivityRouter`-ben, a `Grade12View` „Hamarosan” kártyáinak élesítése. A `gradeSectionsConfig.ts` 12-es szekciói már megvannak.
- **Közös térgeometriai elem (új):** egy egyszerű, forgatható 3D drótváz-néző SVG-ben (kocka, hasáb, gúla, henger, kúp, gömb, csonka testek), egérrel és érintéssel. Csak a térgeometria mappájában, nem közös refaktor.
- **Munkamenet:** fejezetenként haladunk (I → IV), legfeljebb 4 párhuzamos ágenssel. Fejezetenként egy commit (`12I`, `12II`, `12III`, `12IV`), utána riport. Minden fejezet végén `npm test` és `npm run build`.

## 2. Leckénkénti terv

### I. Térgeometria (1–21. lecke, 4–47. o.)

| # | Lecke | Interaktív labor / fő tartalom |
|---|---|---|
| 1 | Térelemek távolsága (ismétlés) | Forgatható téglatest; a pók legrövidebb útja: testátló és a három kiterítés összehasonlítása |
| 2 | A hasáb | Hasábtípus-felismerő (egyenes, ferde, szabályos, paralelepipedon), n-oldalú hasáb csúszkával |
| 3 | A hasáb felszíne és térfogata | Háló kiterítése animálva; Cavalieri-elv: „kártyapakli” egyenes és ferde hasáb |
| 4 | A henger | Téglalap forgatása, tengelymetszet, egyenlő oldalú henger |
| 5 | A henger felszíne és térfogata | Palást kiterítése; konzervdoboz-optimalizáló (adott V mellett a legkisebb A) |
| 6 | A gömb, a gömb szeletelése | Metszősík csúszkával: ϱ = √(R² − d²); gömbsüveg, gömbszelet, gömbréteg |
| 7 | A gömb felszíne és térfogata | Archimédesz: henger − kúp = félgömb (Cavalieri), 1 : 2 : 3 arány |
| 8 | Gyakorlás | Testek egymásba írása (kocka a gömbben, gömb a hengerben) |
| 9 | Hasonló testek felszíne, térfogata | λ-csúszka: λ, λ², λ³ együtt (dinnye, fagylalt) |
| 10 | Térelemek hajlásszöge | Forgatható kocka: kitérő élek, testátló és lap, két sík szöge; lejtők, háztetők |
| 11 | A gúla | Szabályos gúla: m, mₐ és az oldalél derékszögű háromszögei kiemelve |
| 12 | A gúla felszíne és térfogata | Gúlaháló; 3 egybevágó gúla = kocka (V = T·m/3), tetraéder |
| 13 | A forgáskúp | Derékszögű háromszög megforgatása („Forgassunk meg egy háromszöget!”) |
| 14 | A forgáskúp felszíne és térfogata | Palást körcikkként: középponti szög 360°·r/a csúszkával |
| 15 | Gyakorlás | Gúlák és kúpok, hajlásszögek |
| 16 | A csonkagúla és a csonkakúp | Csonkolás csúszkával, hasonlóság a levágott kis testtel |
| 17 | A csonkagúla és a csonkakúp felszíne | Trapéz oldallapok, körgyűrűcikk palást |
| 18 | A csonkagúla és a csonkakúp térfogata | Nagy gúla − kis gúla → a képlet levezetése lépésenként |
| 19 | Gyakorlás | Vödör, virágcserép, tető |
| 20 | Térgeometria a hétköznapi életben | Anyagszükséglet- és tömegkalkulátor (sűrűség, festék, csomagolás) |
| 21 | Gyakorlás, tudáspróba | 3 × 30 kérdés, vizsga mód |

### II. Sorozatok (22–32. lecke, 52–75. o.)

| # | Lecke | Interaktív labor / fő tartalom |
|---|---|---|
| 22 | Számsorozatok | Pontgrafikon; monotonitás és korlátosság vizsgálója |
| 23 | Sorozatok megadása | Explicit ↔ rekurzív átíró, Fibonacci, „mi a következő tag?” |
| 24 | Számtani sorozatok | a₁ és d csúszka; nézőtér, tetőcserepek |
| 25 | A számtani sorozat első n tagjának összege | A kis Gauss trükkje animálva (a sorozat és a fordítottja egymás alatt) |
| 26 | Mértani sorozatok | q-csúszka (növő, csökkenő, alternáló); „Rajzolj bele még egyet!” (egymásba írt négyzetek) |
| 27 | A mértani sorozat első n tagjának összege | Búzaszemek a sakktáblán, az összegképlet levezetése |
| 28 | Vegyes feladatok | Számtani, mértani vagy egyik sem? Felismerő |
| 29 | Pénzügyi feladatok I. – tőkebefektetések | Kamatos kamat és gyűjtőjáradék kalkulátor grafikonnal |
| 30 | Pénzügyi feladatok II. – hitelek és kockázatok | Annuitásos törlesztőtábla-generátor, THM, amortizáció |
| 31 | Gyakorlás | Futamidő kiszámítása logaritmussal |
| 32 | Gyakorlás, tudáspróba | 3 × 30 kérdés, vizsga mód |

### III. Statisztika és valószínűségszámítás (33–44. lecke, 76–103. o.)

| # | Lecke | Interaktív labor / fő tartalom |
|---|---|---|
| 33 | Statisztikai adatgyűjtés | Gyakorisági táblázat építő (abszolút, relatív, kumulált) |
| 34 | Statisztikai jellemzők | Adatsor-szerkesztő: átlag, medián, módusz, szórás élőben |
| 35 | Diagramok (4 oldal) | „Diagram a dobozban”: húzható adatok → dobozdiagram; hisztogram; félrevezető diagram |
| 36 | Számítások osztályközepekkel | Osztályszélesség csúszkával: becsült és valódi átlag |
| 37 | Az eseménytér | Két kocka 6 × 6 táblázata, Ω felsorolása |
| 38 | Események összege és szorzata | Venn-féle eseményalgebra (A + B, A·B, Ā), De Morgan |
| 39 | Esemény valószínűsége | Klasszikus modell, független történések |
| 40 | Geometriai valószínűség | Céltábla és szerencsekerék szimuláció |
| 41 | A várható érték | Szerencsejáték-tervező: igazságos-e? |
| 42 | Mintavételek (4 oldal) | Visszatevéses és visszatevés nélküli összehasonlítás (lottó, minőségellenőrzés) |
| 43 | Gyakorlás | Részvény és kockázat, összetett feladatok |
| 44 | Gyakorlás, tudáspróba | 3 × 30 kérdés, vizsga mód |

### IV. Rendszerező összefoglalás (108–175. o.) – a felosztás nyitott kérdés

**„A” változat (a mostani diákzóna szerint):** 5 lecke, mindegyikben fogalomtár, képlettár, kidolgozott érettségi feladatok és 3 × 30 kérdéses kvíz.

| # | Lecke | Oldal |
|---|---|---|
| 1 | Halmazok, logika, kombinatorika, gráfok | 108–115 |
| 2 | Számtan, algebra | 116–127 |
| 3 | Függvények, sorozatok | 128–143 |
| 4 | Geometria (elemi geometria, transzformációk és alakzatok, vektorok és koordinátageometria) | 144–165 |
| 5 | Statisztika, valószínűségszámítás | 166–175 |

**„B” változat (a tankönyv alblokkjai szerint):** 10 kisebb lecke, 10/10/10 kérdéses kvízzel.
1. Halmazok, logika · 2. Kombinatorika, gráfok · 3. Számtan · 4. Algebra · 5. Függvények · 6. Sorozatok · 7. Elemi geometria · 8. Geometriai transzformációk, síkbeli és térbeli alakzatok · 9. Vektorok, koordinátageometria · 10. Statisztika, valószínűségszámítás.
Ehhez át kell írni a `gradeSectionsConfig.ts`-t és a `Grade12View`-t.

## 3. Nyitott kérdések

1. Rendszerező összefoglalás: „A” (5 lecke) vagy „B” (10 lecke)?
2. Témazáró feladatgyűjtemények (48., 74. és 104. o.): a 11-es döntés szerint kihagyjuk őket? A Sorozatok fejezetben a diákzónán már van ilyen szekció („Hamarosan” kártyával).
3. Próbaérettségi feladatsorok (176–185. o., 3 sor): kihagyjuk, vagy készüljön belőlük időre menő „érettségi szimulátor”?

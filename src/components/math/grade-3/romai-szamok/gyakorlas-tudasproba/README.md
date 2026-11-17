# 4. Gyakorlás, tudáspróba (3. osztály, II. A római számok)

## Források
- Tankönyv (OH-MAT03TA) 26–27. o. (a fejezet összes feladata), valamint a fejezeten kívüli római feladatok: TK 154. o. 15. feladat (helyezések római számmal).
- Munkafüzet I. 28–29. o. (átírás, párosítás, dominó, sorba rendezés), MF I. 5. o. 8. feladat (betűvel – számmal – római számmal), MF II. 90. o. 20. feladat (római → arab).
- A sorban megadott MF I. 30–34. o. („Ellenőrizd a tudásodat!”, „Gyakorolj!”) **nem tartalmaz római feladatot**, csak a 100-as számkör műveleteit – ezért ezeket nem használtuk.

## Mit csinál a DiákZóna-lecke?
- **Tananyag – „Amit már tudsz”:** az öt jel (I, V, X, L, C), hozzáadás és elvétel (IV, IX, XL, XC), legfeljebb 3 egyforma jel, építés tízesekből és egyesekből (47 = XL + VII), kerek tízesek a számegyenesen, összehasonlítás (XLIX < LI), a mindennapok és a pálcikás fejtörők összefoglalója, vegyes mintapéldák (68 → LXVIII, XCIV → 94, XXXV + XIV = XLIX), csapdák (IIII, XXXX, IC, VV).
- **Labor I – Római számkirakó:** az I, V, X, L, C gombokkal ki kell rakni egy véletlen számot (1–100). Ellenőrzéskor a gép megmondja a konkrét hibát (4 egyforma jel, VV, szabálytalan kivonás, nem szabályos alak), vagy hogy mennyit raktál ki és az kevesebb/több. Segítség: tízesek + egyesek bontás.
- **Labor II – Vegyes feladatgép:** római → arab, arab → római, <, >, =, „mi jön utána?”, óra, hónap – vagy vegyesen; azonnali magyarázat, pontszám.
- **Kvíz:** 90 kérdés (30/szint), 59 ábrával.
- **Párosító / Csoportosító:** kártyaképekkel (pálcikás számok és műveletek, tízesrudak + egyeskockák).

## Komponensek
`RomanExamG3Figures.tsx` (RomanSignsSummarySvg, RomanBuildSvg, RomanTensLineSvg, RomanTrapsSvg, RomanCompareSvg), `RomanExamG3Utils.ts` (toRoman, romanValue, romanIssue, explainRoman, explainWrite, makeTask), `RomanExamG3CardFigures.tsx` (MiniRodsCard), `RomanExamG3Theory.tsx`, `RomanExamG3Quiz.tsx` (ROMAN_EXAM_G3_QUESTIONS), `RomanExamG3Matcher.tsx` (ROMAN_EXAM_G3_MATCHER_LEVELS), `RomanExamG3Sorter.tsx` (ROMAN_EXAM_G3_SORTER_LEVELS), `index.ts`. A közös római rajzolók a `../romai-szamok-a-mindennapokban/RomanEverydayG3Parts.tsx` fájlban vannak.

Teszt: `src/test/grade3Topic2RomanExamG3.test.tsx`. Azonosítók: kvíz `g3-rom-tudasproba-quiz`, párosító `g3-rom-tudasproba-matcher`, csoportosító `g3-rom-tudasproba-sorter`.

## Eltérések a tankönyvtől
- **Nincs a könyvben fejezetzáró római felmérő**, és az MF I. 30–34. oldalán sincs római feladat; a tudáspróba saját feladatsor a fejezet 1–3. leckéjének anyagából.
- **Számkör:** a könyv csak az I, V, X jelet tanítja (legfeljebb XXXIX). A DiákZóna fejezet 100-ig megy, az L és a C jellel (XL, L, XC, C) – ezt a tudáspróba is kérdezi, de a kérdések kb. fele 39-en belül marad.
- **A 99 helyes alakja:** külön csapdaként tanítjuk, hogy a 99 nem IC, hanem XC + IX = XCIX (a kisebb jel csak IV, IX, XL, XC párban állhat elöl).
- **Műveletek római számokkal:** mindig arab számra írjuk át, ott számolunk, és ha kell, visszaírjuk – a könyv ezt nem mondja ki, nálunk ez a „trükk”.
- **Saját anyag:** minden feladat saját számokkal és helyzetekkel készült (pajzs, kőtábla, vonat, naptár, könyv), a könyv szereplői nélkül; a disztraktorok tipikus gyerekhibák (IV ↔ VI, IX ↔ XI, XL 60-nak olvasva, IIII, XXXX, IC).

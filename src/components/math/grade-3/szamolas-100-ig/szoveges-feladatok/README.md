# 5. Szöveges feladatok (3. osztály, I. Számolás 0-tól 100-ig)

## Források
- Tankönyv: OH-MAT03TA, 16–17. oldal („Szöveges feladatok”).
- Munkafüzet: OH-MAT03MA_I, 22–23. oldal.

## Mi van a könyvben?
- TK 16: az 5 lépés (adatok – számfeladat/rajz/táblázat – számolás – ellenőrzés – válasz); „9-cel több”; elvétel; hiányzó rész szakaszos ábrával (lánc); bennfoglalás (18 dl, 2 dl-es poharak); időtartam két órával.
- TK 17: részekre osztás rajzzal (palacsinták hatoda, harmada); elágazásos rajz (kalap–tányér–pohár, 27 válogatás); próbálgatás táblázattal (életkorok).
- MF 22–23: adatok lejegyzése (persely), szakaszok felirata, táblázat (lábak száma), „melyik művelet?” (24 tanuló, ugyanaz a két szám négy történetben), osztás, idő (sétahajó), lépcsőfokok.

## Mit csinál a DiákZóna-lecke?
Saját történetekkel és számokkal (≤ 100) gyakoroltatja ugyanezt:
- a megoldás 5 lépése lépcső-ábrával és kidolgozott példával („7-tel több”);
- szakaszos ábra (kerítésfestés), elágazásos rajz (2 sapka · 3 sál), próbálgatás táblázattal (kétszer annyi), időtartam órákkal;
- csapda: „52 cm, ez 9 cm-rel hosszabb a kéknél” → kivonás;
- **Labor I – Melyik művelet kell?** véletlen egylépéses feladat (összevonás, elvétel, több/kevesebb, hiányzó rész, szorzás, részekre osztás, bennfoglalás, csapda) szalagos/dobozos ábrával; előbb a műveletet kell kiválasztani (célzott tipp a rossz választásra), utána kiszámolni.
- **Labor II – Lépésről lépésre:** véletlen kétlépéses feladat végigvezetve az 5 lépésen (adatok kiválasztása, terv két számfeladattal, két részeredmény beírása, ellenőrzés, válaszmondat kiválasztása).
- Kvíz: 30 kérdés (10/10/10), 23 kérdés ábrával; 1. szint egylépéses, 2. szint nehezebb számok/ábraolvasás, 3. szint kétlépéses.

## Komponensek
- `WordProblems100G3Figures.tsx`: `FiveStepsSvg`, `MoreThanSvg`, `SegmentModelSvg`, `TreeDiagramSvg`, `TryTableSvg`, `ClockTripSvg`
- `WordProblems100G3Clock.tsx`: `ClockFace` (arab számos óralap, belső segéd)
- `WordProblems100G3Theory.tsx`, `WordProblems100G3Quiz.tsx` (`WORD_PROBLEMS_100_G3_QUESTIONS`), `WordProblems100G3Matcher.tsx`, `WordProblems100G3Sorter.tsx`
- Azonosítók: kvíz `g3-c100-szoveges-quiz`, párosító `g3-c100-szoveges-matcher`, csoportosító `g3-c100-szoveges-sorter`.

## Teszt
`src/test/grade3Topic1WordProblems100G3.test.tsx`

## Eltérések a tankönyvtől
- **Törtek túl korán:** a TK 17/6. feladat a palacsinták „hatodát”, „harmadát” kéri, a 17/8. „feleannyi” idős lányokról szól, a 16/5. b) a találkozó „első felét”. A törteket a 3. osztály csak a XIV. témakörben tanulja, ezért a DiákZóna itt „egyenlően elosztja” / „kétszer annyi” megfogalmazást használ.
- **TK 16/5. b) kétértelmű és nem egész órára jön ki:** 15 és 20 óra között 5 óra telik el, ennek „első fele” 2 óra 30 perc, így a haza­menetel ideje 17 óra 30 perc. A szöveg ezt nem jelzi, és itt még törtet is kér. Mi csak egész órás időtartamokat adunk.
- **MF 23/6. óra római számokkal:** az óralapon római számok vannak, pedig a római számokat a II. témakör tanítja. A DiákZóna óráin arab számok vannak.
- **TK 17/7. háromszintes elágazás (3 · 3 · 3 = 27):** ez 8–9 évesen nagyon nehéz. Mi kétszintes elágazással (2 · 3, illetve „elfogyott a sajt” esetén 3 · 2) dolgozunk.
- **Didaktikai változtatás:** a könyv az 5 lépést egy keretben egyszerre adja meg. Nálunk a II. labor lépésenként végigvezet rajta, azonnali visszajelzéssel. A kétlépéses feladatokat két külön számfeladattal írjuk fel (□, △), mert a műveletek sorrendje csak a következő (6.) leckében jön.
- **Didaktikai változtatás:** külön tanítjuk a „-val hosszabb/több a másiknál” csapdát (ilyenkor kivonás kell), és a csoportosító 3. szintjén a „hiányzik egy adat” esetet is.

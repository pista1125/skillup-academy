# 2. Törtrészek: fele, harmada, negyede (3. osztály, XIV. Ismerkedés a törtekkel)

## Források
- Tankönyv: OH-MAT03TA, 134–135. oldal (1. c–e, 3–6. feladat).
- Munkafüzet: OH-MAT03MA_II, 67–69. oldal (1–12. feladat).

## Mi van a könyvben?
- TK 134/1 c–e: a negyedekre hajtott lap 1 negyede kék, „4 negyed”, „3 negyed” kapcsos zárójellel.
- TK 135/3–5: körök, kockák, csíkok – „hányad részét színeztük?” (1 ketted … 1 hatod, 2 negyed).
- TK 135/6: színes rudak: a bordó / narancssárga rúd hányad része a fehér, rózsaszín, piros, (citrom)sárga rúd; ha a lila az egész, melyik rúd az 1 ketted, 1 harmad, 1 hatod része.
- MF 67–69: zöld rúd részei, elfogyott tortarészek, téglalapok (1 negyed, 1 ketted, 1 hatod), szakaszok, 1 negyed – 1 harmad – 1 ketted összehasonlítása, háromszínű szőnyeg (1 harmad + 1 ketted + 1 hatod), zászlók („1 harmada piros”), méterrúd (1 tized m = 1 dm), mérőedény (hányad részéig van tele).

## Mit csinál a DiákZóna-lecke?
- Szabály egyszerűen: **hány egyenlő rész az egész → a név; hány színes → a szám** („4 részből 3 színes: 3 negyed”). Kétféle szóhasználat: „1 ketted rész” = „a fele”, „1 negyed rész” = „a negyede”.
- 4 negyed = 1 egész; mennyi hiányzik az egészhez (3 negyed + 1 negyed). Melyik rész nagyobb: ugyanakkora csíkokon 1 ketted > 1 harmad > 1 negyed > 1 hatod.
- Színes rudak (csak a könyv által megnevezett rudak: fehér 1, rózsaszín 2, piros 4, sárga 5, lila 6, bordó 8, narancssárga 10), zászló, mérőedény, méterrúd.
- Csapda: a fehér részeket is számolni kell (1 piros + 2 fehér ≠ 1 ketted); „a 6 nagyobb, mint a 4, de 1 hatod kisebb, mint 1 negyed”.
- **Labor I – Színező:** „Színezz ki 3 negyed részt!” – véletlen kör, csík vagy rács (2–10 rész); koppintással színez/töröl, ellenőrzéskor célzott tipp (fordítva színezett, túl sok, túl kevés).
- **Labor II – Hányad része?** véletlen ábra, 4 válaszgomb a tipikus hibákkal (a fehér részek száma lett a név; a fehér részeket számolta; az egészet mondta); minden hibára saját magyarázat.
- Kvíz: 30 kérdés (10/10/10), 28 ábrával. Párosító: 1 rész neve (kör, zászló, rács, mérőedény), több rész (3 negyed, 5 hatod…), az egész és a rudak. Csoportosító: fele / harmada / negyede; kevesebb, mint a fele / pont a fele / több, mint a fele; harmadok / negyedek / hatodok.
- A mennyiségek törtrésze (a 12 negyede, 1 m ötöde cm-ben) a 3. leckében jön; itt csak a mérőedény és a méterrúd képes példája szerepel.

## Komponensek
- `FractionPartsG3Figures.tsx`: `PartNamesSvg`, `QuartersSvg`, `MissingPartSvg`, `CompareUnitsSvg`, `RodPartsSvg`, `EverydayPartsSvg`
- `FractionPartsG3CardFigures.tsx`: `FracCard`, `FlagCard`, `CupCard`, `RodCard`
- `FractionPartsG3Parts.tsx`: színes rudak (`Rod`, `RODS`), zászlók (`Flag`), `Cup`, `MeterStick`, `FracView`, generátorok (`genFracTask`, `nameOptions`, `fracName`)
- `FractionPartsG3Theory.tsx`, `FractionPartsG3Quiz.tsx` (`FRACTION_PARTS_G3_QUESTIONS`), `FractionPartsG3Matcher.tsx` (`FRACTION_PARTS_G3_MATCHER_LEVELS`), `FractionPartsG3Sorter.tsx` (`FRACTION_PARTS_G3_SORTER_LEVELS`)
- Azonosítók: kvíz `g3-frac-tortreszek-quiz`, párosító `g3-frac-tortreszek-matcher`, csoportosító `g3-frac-tortreszek-sorter`.

## Teszt
`src/test/grade3Topic14FractionPartsG3.test.tsx`

## Eltérések a tankönyvtől
- **MF 67/1 – nem kirakható „zöld rúd”:** a feladat egy olyan zöld rúd felét, harmadát, negyedét és hatodát kéri, amely 12 kocka hosszú lenne – ilyen rúd a készletben nincs (a leghosszabb a 10-es narancssárga). Nálunk csak a készletben létező rudakkal dolgozunk (narancssárga 10, bordó 8, lila 6).
- **TK 135/6 c – meg nem nevezett rúd:** „a lila rúd 1 ketted része” egy 3 kocka hosszú rúd, amelynek színét a könyv sehol nem nevezi meg. Ezt a kérdést kihagytuk; a lila rúdnál csak az 1 harmad (rózsaszín) és az 1 hatod (fehér) szerepel.
- **Következetlen színnév (TK 135/6 b):** ugyanaz az 5-ös rúd egyszer „citromsárga”, máshol „sárga”. Nálunk mindig „sárga rúd”.
- **TK 135/5 e – „heted” bevezetés nélkül:** a 7 részre osztott oszlopból 4 zöld (4 heted), de a hetedet a könyv sehol nem nevezi meg. Nálunk csak a bevezetett nevek (ketted, harmad, negyed, ötöd, hatod, nyolcad, tized) szerepelnek.
- **Tipikus hiba kimondva:** a könyv nem tér ki arra, hogy a gyerekek a színes részt a fehérekhez viszonyítják (1 piros, 2 fehér → „1 ketted”). Nálunk csapda-doboz, labor-visszajelzés és kvíz-tévesztők épülnek erre.
- **Összehasonlítás csak ugyanakkora egészekkel:** az MF 68/5 téglalapjai egyformák, de ezt a feladat nem mondja ki. Nálunk minden összehasonlításnál kiírjuk: „ugyanakkora csíkok / torták”.
- **Didaktikai változtatás:** a „3 negyed” után külön foglalkozunk azzal, mennyi hiányzik az egészhez (3 negyed + 1 negyed = 1 egész), és hogy 3 harmad, 4 negyed, 10 tized = 1 egész.
- Saját helyzetek (pizza, csoki, szőnyeg, szalag) és saját nevek; a könyv szereplőit nem használjuk. A zászlós feladatokban a magyar és a lengyel zászló szerepel.

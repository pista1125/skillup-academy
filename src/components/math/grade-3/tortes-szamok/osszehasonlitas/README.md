# 3. Törtrész mennyiségekből (3. osztály, XIV. Ismerkedés a törtekkel)

## Források
- Tankönyv: OH-MAT03TA, 136–137. oldal (8–16. feladat).
- Munkafüzet: OH-MAT03MA_II, 69–70. oldal (11–16. feladat).

## Mi van a könyvben?
- TK 136: számok fele, harmada, negyede, tizede (táblázatok 1000-ig); negyed kg kenyér dkg-ban; 1 m-es cső ötöde cm-ben; „két és fél dl” cl-ben, az 1 kg cukor tizedének felhasználása után a maradék, „1 és fél óra” percben; 4 óra harmada, negyede, fele, hatoda, nyolcada, tizede.
- TK 137: szakasz mérése, a fele/harmada/negyede; visszafelé: milyen hosszú a szakasz, amelynek a fele 5 cm, harmada 3 cm…; 1000 m-es út két végéről egymás felé (negyed + negyed, fél + ötöd, tized + ötöd); 1 m-es fonat fele, negyede, ötöde, tizede.
- MF 69–70: méterrúd tizede és fele dm-ben, mérőedény töltöttsége, számok tizede/ötöde/fele/negyede (150–1000), kiflis kétlépéses feladat (fele, a maradék harmada), bonbonos doboz, 480 m-es futópálya negyede és fele.

## Mit csinál a DiákZóna-lecke?
- Egyetlen szabály: **a része = osztás** (fele : 2, harmada : 3, negyede : 4 …), mértékeknél **előbb átváltás** (1 kg = 100 dkg, 1 m = 100 cm, 1 l = 10 dl, 1 dl = 10 cl, 1 óra = 60 perc).
- Konkrét → képi → jel: almák egyenlő sorokban, csík részekre osztva, óralap körcikkekkel, mérőhenger, cm-es vonalzó, út két végéről.
- Visszafelé gondolkodás (ha a fele 6 cm, az egész 2 · 6), „mennyi maradt?” és „egymás felé” kétlépéses feladatok.
- **Labor I – Oszd szét egyenlően!** tárgyak tálakba osztása kattintással, utána a válasz kiválasztása, „Új feladat”.
- **Labor II – Mennyi a része?** véletlen mérték (kg, m, óra, l, dl, cm) és rész; célzott tipp, ha a gyerek nem vált át, vagy a maradékot adja meg.
- Kvíz: 30 kérdés (10/10/10), 20 ábrával. Párosító: pöttyök/csíkok/óralap/mérőhenger/szakasz ↔ érték. Csoportosító: „Egy rész: 2/3/5”, „15/20/30 perc”, „50/25/20 cm”.

## Komponensek
- `FractionAmountsG3Figures.tsx`: `ShareApplesSvg`, `QuarterKgSvg`, `FifthMeterSvg`, `ClockPartsSvg`, `SegmentPartsSvg`, `HalfLitreSvg`, `RoadSvg`
- `FractionAmountsG3CardFigures.tsx`: `MiniObjs`, `MiniStrip`, `MiniClock`, `MiniJug`, `MiniSeg`, `MiniWhole`, `SortObjs`, `SortClock`, `SortStrip`
- `FractionAmountsG3Parts.tsx`: rajzelemek (`ObjRows`, `Strip`, `ClockPie`, `Jug`, `SegmentRuler`, `Road`), szavak (`PART_OF`, `PART_NAME`), labor-generátorok (`makeShareTask`, `makeUnitTask`)
- `FractionAmountsG3Theory.tsx`, `FractionAmountsG3Quiz.tsx` (`FRACTION_AMOUNTS_G3_QUESTIONS`), `FractionAmountsG3Matcher.tsx` (`FRACTION_AMOUNTS_G3_MATCHER_LEVELS`), `FractionAmountsG3Sorter.tsx` (`FRACTION_AMOUNTS_G3_SORTER_LEVELS`)
- Azonosítók: kvíz `g3-frac-mennyisegek-quiz`, párosító `g3-frac-mennyisegek-matcher`, csoportosító `g3-frac-mennyisegek-sorter`.

## Teszt
`src/test/grade3Topic14FractionAmountsG3.test.tsx`

## Eltérések a tankönyvtől
- **Rejtett második lépés (TK 136/11. b):** „Az 1 kg cukor tizedét használták fel. Hány dkg maradt?” – a gyerekek többsége a 10 dkg-ot írja. Nálunk külön „Mit kérdez a feladat?” figyelmeztetés, és a kvízben a 10 dkg tipikus rossz válaszként szerepel.
- **Vegyes szám magyarázat nélkül (TK 136/11. a, c: „két és fél dl”, „1 és fél óra”):** a könyv itt használ először 1-nél nagyobb törtet. Nálunk szétbontjuk: 2 dl + fél dl = 20 cl + 5 cl, 1 óra + fél óra = 60 + 30 perc (ábrával).
- **Visszafelé feladat szabály nélkül (TK 137/14.):** a könyv csak „Rajzolj!”-t kér. Nálunk „Visszafelé is megy!” tipp: ha a fele 5 cm, az egész 2 · 5 cm; csík-ábra, ahol az egész a „?”.
- **Az átváltás lépése nincs kiírva (TK 136/9–10.):** nálunk mindig két lépés: 1. átváltás, 2. osztás; a labor felismeri, ha a gyerek átváltás nélkül oszt (negyed kg ≠ 4 dkg).
- **A mappa neve (osszehasonlitas) félrevezető:** a TK 136–137 a törtrész kiszámításáról szól. Az összehasonlítást (MF 68/5.: 1 negyed < 1 harmad < 1 ketted) egy kvízkérdésben kapcsoljuk ide: „minél kevesebb részre osztasz, annál nagyobb egy rész”.
- **Didaktikai változtatás:** mennyiségeknél a „fele, harmada, negyede” alakot használjuk (a könyv itt is), a részek nevénél a „1 negyed” alakot – mindkettő szóval, törtjel nélkül.
- Saját számok és helyzetek (mandarin, liszt, palacsinta, szalag, léc) a könyv Julcsi-, Barnabás-, fonat- és futóverseny-feladatai helyett.

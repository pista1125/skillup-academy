# 4. Gyakorlás, tudáspróba (3. osztály, XIV. Ismerkedés a törtekkel)

## Források
- Tankönyv: OH-MAT03TA, 134–137. oldal (a teljes fejezet; külön Megálló oldal nincs).
- Munkafüzet: OH-MAT03MA_II, 67–70. oldal.

## Mi van a könyvben?
- TK 134–135: írólap hajtogatása (negyedek), „4 negyed”, „3 negyed”; torták egyenlő részei; körök, kockák, téglalapok színezett része; színes rudak (bordó, narancssárga, lila mint 1 egész).
- TK 136–137: számok és mennyiségek fele, harmada, negyede, tizede; kg–dkg, m–cm, dl–cl, óra–perc; szakaszok; visszafelé (a fele 5 cm → az egész); 1000 m-es út két végéről.
- MF 67–70: rudak, torták, téglalapok színezése, „1 negyed / 1 harmad / 1 ketted” összehasonlítása (<, >, =), zászlók, gyümölcsök, méterrúd, mérőedény, számok része, kiflis és futópályás szöveges feladat.

## Mit csinál a DiákZóna-lecke?
- Elmélet: „Amit már tudsz” – egyenlő részek és nevük, az egész (2 ketted = 4 negyed = 1 egész), összehasonlítás (1 nyolcad < 1 negyed < 1 harmad < 1 ketted; 3 ötöd > 2 ötöd), színes rudak, törtrész mennyiségekből + visszafelé; három vegyes mintapélda; csapdák.
- **Labor I – Színezd ki!** kattintható kör vagy csík n részre; a gyerek kiszínezi a „k n-ed” részt, ellenőrzés; célzott tipp, ha fordítva színezett (a fehér részek száma), ha túl sokat vagy túl keveset. „Új feladat”.
- **Labor II – Vegyes feladatok:** 5 feladattípus gombbal (a rész neve, mennyi a része, mértékek, az egész, melyik nagyobb), véletlen számok 1000-ig, azonnali visszajelzés magyarázattal, pontszámláló.
- Kvíz: 90 kérdés (30/30/30), 59 ábrával. Párosító: körök/csíkok ↔ nevek; mennyiségek; rudak és az egész. Csoportosító: „1 harmad / 1 negyed / 1 hatod”, „kevesebb / pont / több, mint 1 ketted”, „egy rész: 100 / 50 / 25”.

## Komponensek
- `FractionsExamG3Figures.tsx`: `PieNamesSvg`, `WholeStripsSvg`, `RodsSvg`, `AmountsSvg`
- `FractionsExamG3CardFigures.tsx`: `CardPie`, `CardBar`, `CardRod`, `SmallPie`, `SmallBar`, `SmallGrid` (+ a 3. lecke kártyaikonjai)
- `FractionsExamG3Parts.tsx`: `Pie`, `Bar`, `Grid`, `Rod`, `ROD`, `partName`, `makeColorTask`, `colorHint`, `makeMixTask`, `MIX_KINDS` (a 3. lecke rajzelemeire épül)
- `FractionsExamG3Theory.tsx`, `FractionsExamG3Quiz.tsx` (`FRACTIONS_EXAM_G3_QUESTIONS`), `FractionsExamG3Matcher.tsx` (`FRACTIONS_EXAM_G3_MATCHER_LEVELS`), `FractionsExamG3Sorter.tsx` (`FRACTIONS_EXAM_G3_SORTER_LEVELS`)
- Azonosítók: kvíz `g3-frac-tudasproba-quiz`, párosító `g3-frac-tudasproba-matcher`, csoportosító `g3-frac-tudasproba-sorter`.

## Teszt
`src/test/grade3Topic14FractionsExamG3.test.tsx`

## Eltérések a tankönyvtől
- **Nincs fejezetzáró ellenőrzés a könyvben:** a XIV. fejezet 4 oldal, Megálló nélkül, a TK 138-on már „Az idő mérése” kezdődik. A tudáspróba anyagát a TK 134–137 és az MF 67–70 feladattípusaiból állítottuk össze, saját számokkal.
- **Összehasonlítás szabály nélkül (MF 68/5.):** a munkafüzet <, >, = jelet kér a negyed, harmad, ketted közé, de a könyv nem mondja ki a szabályt. Nálunk: „Több részre vágod → kisebb egy rész”, csíkokkal az egész alatt, és csapda-doboz a „8 > 4, tehát 1 nyolcad > 1 negyed” hibára.
- **Az egyenlőség feltétele csak képen (TK 134/2., MF 67/2.):** nálunk külön kérdések és csoportosító-kártyák mutatják, hogy nem egyenlő szeletekre nem mondhatjuk, hogy „1 negyed”.
- **Színes rudak színnév alapján:** a könyv csak a színt nevezi meg (pl. „rózsaszín rúd”), a hosszát nem. A DiákZóna-ábrákon látszanak a kockahatárok, és a válaszokban a kockaszám is szerepel (rózsaszín = 2 kocka), így a rudak nélkül is megoldható.
- **„Két és fél dl”, „1 és fél óra” (TK 136/11.):** szétbontva tanítjuk (2 dl + fél dl; 2 óra + fél óra, három óralappal).
- Saját számok és helyzetek (pizza, mandarin, kakaó, film, szalag, golyók), a könyv szereplői (Julcsi, Barnabás, Emma, Magdi…) nélkül.

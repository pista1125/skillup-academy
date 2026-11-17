# 3. Írásbeli szorzás egyjegyű szorzóval (3. osztály, XIII. Írásbeli szorzás)

## Források
- Tankönyv: OH-MAT03TA, 125–128. oldal.
- Munkafüzet: OH-MAT03MA_II, 52–57. oldal.

## Mi van a könyvben?
- **TK 125:** könyvtári szekrények (232 · 3): adatok, terv, becslés, összeadással és írásban számolva. Elrendezés: sz/t/e fejléc, a szorzandó mellett jobbra „· 3”, alatta vonal és a szorzat; lépések „3 · 2 e = 6 e”. Elnevezések: szorzandó, szorzó, tényezők, szorzat. Gyakorlás váltás nélkül.
- **TK 126:** 214 · 3 korongokkal (váltás az egyeseknél: „A 2 egyest leírjuk, az 1 tízest a tízesek szorzatához adjuk majd”), ellenőrzés összeadással; gyakorló sorok, elnevezéses feladatok, hiányzó szorzó.
- **TK 127:** 243 · 3 (váltás a tízeseknél), lepkés rejtvény (a szorzatok csökkenő sorrendje egy lepkefaj nevét adja).
- **TK 128:** 157 · 2 (váltás mindkét helyen), háromszorosok, igaz/hamis állítások, sorozat, kétlépéses szöveges feladat (színház).
- **MF 52–57:** becslés százasra és tízesre kerekítve, planetáriumi jegyek táblázata, szabálykereső táblázat, „mely számok teszik igazzá”, számrejtvény, mozi/bábszínház szöveges feladatok, hiányos műveletek pótlása.

**A könyv módszere:** jobbról balra szorzunk; a beváltott tízest/százast nem írja le, csak „hozzáadjuk”. A kimondott formát („maradt”) a könyv nem adja meg.

## Mit csinál a DiákZóna-lecke?
- Elrendezés pontosan a könyv szerint (szorzó jobbra a szorzandó mellett, vonal alatta, sz/t/e színek).
- Kimondás a hagyományos módon: „4-szer 8 az 32. Leírom a 2-t, maradt 3. 4-szer 7 az 28, meg 3 az 31. …”
- Sorrend: elnevezések → korongokkal kirakva (126 · 3) → írásban lépésről lépésre (178 · 4, kétszer marad) → becslés + számolás + ellenőrzés (162 · 4) → mintafeladat (pékség: 156 · 3) → csapdák (elfelejtett maradék, nulla a közepén: 204 · 4, összeadás szorzás helyett).
- **Labor I – Szorozz lépésről lépésre!** Véletlen feladat 4 fajtából (váltás nélkül / egyeseknél / tízeseknél / kétszer). Előbb becslés, aztán oszloponként számbillentyűvel írja be a jegyet; a „maradt” zöld kis számként megjelenik (kikapcsolható). „Mutasd meg!” gomb animálva lejátssza. Célzott tippek: elfelejtett maradék, fordítva leírt jegyek, összeadás szorzás helyett. A végén ellenőrzés összeadással.
- **Labor II – Hol a hiba?** Egy „gyerek megoldása” jelenik meg: jó, vagy tipikus hibás (elfelejtett maradék / a maradékot írta le). A gyerek megmondja, melyik oszlopnál hibázott először, vagy hogy minden jó. Magyarázat kimondott lépéssel, sorozatszámláló.
- Kvíz: 30 kérdés (10/10/10), 27 ábrával. Párosító: oszlopos szorzások → szorzat; kétszer marad; hiányzó szorzó/jegy, ár. Csoportosító: hol kell váltani; mennyi maradt az egyeseknél; melyik kerek százashoz van közel a szorzat.

## Komponensek
- `WrittenMulG3Column.tsx` – **újrahasznosítható** oszlopos írásbeli szorzás: `WrittenMulG3Column` (önálló SVG), `WrittenMulG3ColumnG` (beágyazható `<g>`), `columnMulSize`, `mulSteps`, `spokenMulStep`, `carriesAfter`, `placePluralMul`, `placeAtMul`. Jelölés: '?' piros doboz, '_' üres doboz, ' ' még nincs leírva; `carries` jobbról indexelve.
- `WrittenMulG3Parts.tsx` – labor-generátorok: `genMul`, `mulKindOf`, `genHunt`, `simulateMul`, `roundTens`.
- `WrittenMulG3Figures.tsx`: `WrittenMulNamesSvg`, `WrittenMulDiscsSvg`, `WrittenMulStepsSvg`, `WrittenMulCheckSvg`, `WrittenMulZeroSvg`
- `WrittenMulG3CardFigures.tsx`: `MulColCard`, `PriceCard`, `StripSmall`
- `WrittenMulG3Theory.tsx`, `WrittenMulG3Quiz.tsx` (`WRITTEN_MUL_G3_QUESTIONS`), `WrittenMulG3Matcher.tsx` (`WRITTEN_MUL_G3_MATCHER_LEVELS`), `WrittenMulG3Sorter.tsx` (`WRITTEN_MUL_G3_SORTER_LEVELS`)
- Azonosítók: kvíz `g3-wmul-irasbeli-quiz`, párosító `g3-wmul-irasbeli-matcher`, csoportosító `g3-wmul-irasbeli-sorter`.

## Teszt
`src/test/grade3Topic13WrittenMulG3.test.tsx`

## Eltérések a tankönyvtől
- **Hiányzó kimondott forma:** a könyv csak „3 · 4 e = 12 e = 1 t + 2 e” alakban írja a lépést, a gyerek a füzetben nem tudja, mit mondjon. Nálunk a hagyományos kimondás: „4-szer 8 az 32. Leírom a 2-t, maradt 3.” – ugyanúgy, mint az írásbeli összeadásnál és kivonásnál („maradt”).
- **A „maradt” szám nem látszik:** a könyv nem írja le a beváltott számot, ezért a kezdő gyerek gyakran elfelejti. Nálunk eleinte kicsi zöld szám jelzi a következő oszlop fölött (a laborban kikapcsolható, hogy később fejben tartsa).
- **Felcserélt sorrend a lépésekben (TK 125):** a feladat 232 · 3, a lépés mégis „3 · 2 e”. Ez helyes (a tényezők felcserélhetők), de összezavarhatja a gyereket. Nálunk a kimondásban következetesen a szorzó áll elöl („3-szor 2”), és ezt a „Mit tanulunk?” rész kimondja.
- **Nulla a szorzandó közepén:** a könyv gyakoroltatja (308 · 2, 209 · 4, 307 · 3), de nem figyelmeztet rá. Nálunk külön ábra és csapda: 204 · 4 = 816 (nem 806), mert a nullánál is hozzáadjuk, ami maradt.
- **Didaktikai változtatás:** a könyv háromszor ugyanazt a mintát mutatja (egyeseknél / tízeseknél / mindkettőnél vált). Nálunk ez a négy fajta a laborban választható, és a csoportosító első szintje épp ezt gyakoroltatja („hol kell váltani?”).
- **Didaktikai változtatás:** hibakereső labor és kvízkérdés a két leggyakoribb hibával (elfelejtett maradék, a maradékot írja le az egyes helyett).
- **Didaktikai változtatás:** a korongos kirakásnál a 10 egyest bekarikázzuk és nyíllal visszük át a tízesekhez (mint a könyv), és alá írjuk: „10 egyes = 1 tízes”.
- A könyv sok feladatában (pl. TK 128/11. „Minden szorzat kisebb 900-nál”, 305 · 3 = 915) a szorzat 900 fölé megy – ez rendben van, 1000 alatt marad. Nálunk minden szorzat legfeljebb 999.
- Saját számok és helyzetek (gyöngy, alma, mesekönyv, mozijegy, matrica, pékség, kert) a könyv könyvtári, lepkés, színházi feladatai és szereplői (Mona, Manó, Réka) helyett.

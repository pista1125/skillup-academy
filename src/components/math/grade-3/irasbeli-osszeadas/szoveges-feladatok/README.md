# 5. Szöveges feladatok (3. osztály, VII. Írásbeli összeadás)

**Források:** tankönyv OH-MAT03TA 82. oldal (és a 77–78. oldal mintamegoldásai), munkafüzet OH-MAT03MA I. kötet 93–95. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 82.:** egy kidolgozott vásárlós feladat (két ár összege) a megoldás 7 lépésével: elolvasás, adatok és összefüggések, számfeladat (rajz/táblázat), becslés, számítás, összevetés és ellenőrzés, írásbeli válasz. Gyakorló feladatok: „…-val többet” (két lépés: délután, aztán egész nap), „…-val kevesebben, mint” (két lépés), három tag összege.
- **TK 77–78.:** a mintamegoldások „Adatok – Terv – Becslés – Számítás – Ellenőrzés – Válasz” felépítéssel.
- **MF 93.:** plakát leolvasása (időpontok, belépő), logikai sorrend-feladat, „…-val kevesebb, mint” típusú feladat.
- **MF 94.:** két szám összege (pompos), étlap: alap + két feltét ára, kombinációk.
- **MF 95.:** lépéshossz (dm és m), napok számolása, futóverseny szakaszos ábrával.

## Mit csinál a DiákZóna lecke?

Hat rövid lépés (Adatok → Terv → Becslés → Számítás → Ellenőrzés → Válasz), mindig **szakaszos ábrával (csíkkal)**: ami több, az hosszabb, a kérdés helyén „?”. Saját mintapéldák: könyvtári kölcsönzés (236 + 158, teljes megoldás oszlopos írásbeli összeadással), múzeumi jegyek „176-tal több” két lépésben, szalagok „127 cm-rel rövidebb, mint” csapdával, három tag (gyümölcsös stand), étlap leolvasása (palacsinta + feltétek), táblázat leolvasása, „Elég a pénz?”, felesleges adat felismerése.

## Komponensek

1. **`AddWordProblemsG3Parts.tsx`** – `ColumnFig` (oszlopos írásbeli összeadás kérdésábra a 3. lecke közös `WrittenAddG3Column` komponensével), `ListTableFig`, `TagsFig`, `MenuBoardG`/`MenuFig` (krétatáblás étlap), `round10`, `round100`, `sumNoCarry` (beváltás nélküli hibás összeg), `carriesOf`. A csíkokat és az alapelemeket a 4. lecke `SumChangesG3Parts.tsx` fájljából veszi.
2. **`AddWordProblemsG3Figures.tsx`** – `WordStepsSvg` (6 lépés), `WordLibrarySvg` (csík + írásbeli összeadás), `WordMoreSvg` („176-tal több”), `WordLessThanSvg` (csapda: „rövidebb, mint”), `WordThreeSvg` (három tag), `WordMenuSvg` (étlap).
3. **`AddWordProblemsG3CardFigures.tsx`** – `MiniTags`, `MiniBar`, `MiniCompare` (párosító), `SortTags`, `SortCompare` (csoportosító).
4. **`AddWordProblemsG3Theory.tsx`** – `AddWordProblemsG3Theory`, `makeWordTask`, `wordHint`, `makeCompareWord`.
   - **Labor I – Lépésről lépésre:** véletlen szöveges feladat (összesen 2 vagy 3 taggal, „…-val több”, csapdás „…-val kevesebb, mint”; külön „Csapdás feladat” gomb). 1. Terv: a jó művelet kiválasztása (a kivonás és a dupla tag a csapda) → megjelenik a csík; 2. Becslés tízesre kerekítve; 3. Számítás: oszlopos írásbeli összeadás üres eredménnyel, a végén a beváltott jegyekkel. Célzott tippek: „Elfelejtetted a maradékot!”, „Nézd meg a becslést: ez messze van!”, „Vigyázz, a szöveg becsap! … a több.” Végül ellenőrzés (becslés, felcserélés) és mondatos válasz.
   - **Labor II – Ki gyűjtött többet?:** két gyerek, „…-val többet” vagy „ez …-val kevesebb, mint” megfogalmazással. 1. Ki gyűjtött többet? 2. Melyik művelet (+ vagy −)? → csík; 3. a másik gyerek gyűjtése írásban; 4. a kettő együtt (kétlépéses feladat).
5. **`AddWordProblemsG3Quiz.tsx`** – `ADD_WORD_PROBLEMS_G3_QUESTIONS`: 30 kérdés (10/10/10), 22 ábrával (csík, árcédula, oszlopos összeadás, étlap, táblázat), minden kérdésnél badge, 3 puska. Azonosító: `g3-wadd-szoveges-quiz`. Minden szám ≤ 1000.
6. **`AddWordProblemsG3Matcher.tsx`** – `ADD_WORD_PROBLEMS_G3_MATCHER_LEVELS`: árcédulák és csíkok ↔ összeg; összehasonlító csíkok és „több / kevesebb, mint” mondatok ↔ eredmény; három részből álló csík és kétlépéses feladatok ↔ eredmény. `g3-wadd-szoveges-matcher`.
7. **`AddWordProblemsG3Sorter.tsx`** – `ADD_WORD_PROBLEMS_G3_SORTER_LEVELS`: két ár < / = / > 500 Ft; három ár: elég 800 Ft-ból és marad / pontosan / nem elég; ugyanaz az eredmény (323 / 421 / 500) különböző megfogalmazásokból. Szintenként 6 képes elem. `g3-wadd-szoveges-sorter`.

**Teszt:** `src/test/grade3Topic7AddWordProblemsG3.test.tsx`

## Eltérések a tankönyvtől

- **Kétféle lépéslista:** a TK 77–78. oldal „Adatok – Terv – Becslés – Számítás – Ellenőrzés – Válasz” szerint old meg, a TK 82. oldal viszont egy 7 pontos, hosszú mondatokból álló listát ad, más szavakkal. 8–9 évesnek ez sok olvasás, és a kettő nem egyezik. Mi a rövid, 6 lépéses változatot használjuk mindenhol (ábrán is).
- **Melyik kerekítéssel becsüljünk?** A TK 77–78. tízesre kerekít (252 ≈ 250, 146 ≈ 150), a TK 82. százasra (125 ≈ 100, 355 ≈ 400 → B: 500, a pontos 480), és nem mondja meg, mikor melyiket. Nálunk alapból tízesre kerekítünk (a labor is így kéri); százasra csak akkor, ha a feladat kimondja.
- **Szakaszos ábra:** az MF 95/8. kéri, hogy „Készíts szakaszos ábrát”, de a könyv sehol nem mutatja meg, hogyan kell, és a „…-val kevesebben, mint” csapdás feladatoknál (TK 82/3., MF 93/3.) sem ad rajzot. Nálunk minden ilyen feladat csíkkal indul, és a csapda külön leckerészt és labort kapott.
- **Meghatározhatatlan kérdés (MF 93/1.):** „Hány hétvégén választhatjuk a programokat?” – a plakáton „november 25-től december 23-ig, minden szombaton” áll, de nincs évszám, így a szombatok száma (4 vagy 5) a plakátból nem dönthető el. Ilyen kérdést nem tettünk be.
- **Számkörön és témán kívüli feladatok (MF 95.):** a lépéshosszos feladat (4 dm és 8 dm lépés, 800 m) m → dm átváltást és osztást kér, a válasz (Peti 2000 lépése) túllépi az 1000-es számkört, és nincs köze az írásbeli összeadáshoz. A futóverseny (MF 95/8.) kivonást kér (a VIII. fejezet anyaga), és szándékosan kétféle megoldású. Ezeket kihagytuk.
- **Saját szereplők és helyzetek:** a kézművesvásáros történeteket (Bálint, gyertyakészítő, fazekas, zoknibáb, pompos, Gergő, Kálmi, Jenő, András, Ábris, Bence, Csaba) nem vettük át. Saját helyzetek: könyvtár, cukrászda, múzeum, cirkusz, papírgyűjtés, palacsintázó; saját nevek (Ádám, Dóri, Panni, Bori, Luca, Botond, Emma, Vince, Hédi, Benedek).
- **Tudatos didaktikai változtatások:**
  - Minden mintapélda a csíkkal indul; a csíkon a hosszabb rész mutatja, ki a több, így a „kevesebb, mint” megfogalmazás nem vezeti félre a gyereket.
  - Két csapdát külön is tanítunk (csapdadobozban): a „kevesebb” szó nem mindig kivonás, és a válasz egész mondat mértékegységgel.
  - Felesleges adat felismerése (a 26 gyerek nem kell egy gyerek költségéhez) és „Melyik kérdésre felel ez a művelet?” – a TK 84/8. „Alkossatok szöveges feladatot!” ötletéből.
  - A kvíz rossz válaszai a tipikus hibák: elfelejtett maradék (pl. 515 a 625 helyett), kivonás összeadás helyett, csak az első lépés eredménye kétlépéses feladatnál.

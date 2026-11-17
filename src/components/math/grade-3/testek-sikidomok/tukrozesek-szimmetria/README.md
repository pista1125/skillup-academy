# 4. Tükrözések, szimmetria (3. osztály, X. Testek, síkidomok)

**Források:** tankönyv OH-MAT03TA 106–107. oldal, munkafüzet OH-MAT03MA II. kötet 30–31. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 106.:** fényképek (tengeri csillag, pillangó, népi minta, Parlament, autókerék): melyik szimmetrikus, ellenőrzés tükörrel; szimmetrikus tárgyak a teremben; melyik síkidomot vágtuk ki a félbehajtott papírból (4 × 2 választás); kivágás félbehajtott papírból (pillangó, pikk, nyíl); sokszögek piros vonalakkal (téglalap 2, négyzet 4, sárkány 1, trapéz 1, háromszög 1 vonallal): „Melyik sokszögnek hány tükörtengelye van?”
- **TK 107.:** síkidomok félbehajtása, tükörtengelyek száma, kakukktojás (négyzet, téglalap, egyenlő szárú derékszögű háromszög, félkör, „ferde” háromszög, kör, ív); szimmetrikus minták (mandalák); tükröződés vízben (béka, gém, zebra fotó); melyik két állat egymás tükörképe; tükörkép kirakása logikai lapokból.
- **MF 30.:** félbehajtott papírból kivágás; tükörképek ellenőrzése tükörrel (ferde, vízszintes és függőleges tengely); szimmetrikus tárgyak másik felének kiválasztása.
- **MF 31.:** színezés a tükörtengely túloldalán (síkidomok); alakzat kiegészítése négyzethálón (függőleges, vízszintes és **ferde** tengely); tengelyesen tükrös ábrák színezése, tengelyek berajzolása (tulipán, szív, csillag, levél); a pillangó tükörképe négyzethálón.

Fogalmak a könyvben: **szimmetrikus**, **tükörtengely**, **tükörkép**, **tengelyesen tükrös**.

## Mit csinál a DiákZóna lecke?

A „félbehajtás” élményéből indul: fél szív a hajtásnál → kinyitva egész szív. Kimondja a szabályt (a két fele hajtás után **pontosan fedi** egymást), és megkülönbözteti a tükörképet az eltolástól. Négyzetrácson a **kockák számolásával** tükröz (ugyanannyi kocka a tengelytől, a túloldalon, ugyanabban a sorban). Megmutatja a síkidomok tükörtengelyeinek számát (téglalap 2, négyzet 4, sárkány alakú négyszög és 2 egyforma oldalú háromszög 1, minden oldalán egyforma háromszög 3, kör akárhány, ferde négyszög 0), és a betűket függőleges / vízszintes / mindkét / nincs tengely szerint. Csapda: a téglalap átlója nem tükörtengely.

## Komponensek

1. **`SymmetryG3Parts.tsx`** – közös rajzelemek és logika (a fejezetzáró tudáspróba is használja): `QFig`, `AxisLine` (piros szaggatott tengely), `GridG`, `CellsG`, `RightAngle` (negyedkörív + pont), `Heart`, `HalfHeart`, `House`, `Tree`, `Butterfly`, `Letter` / `LETTER_PATHS`, `BigArrow`, `Flag`, `reflectPt`; Labor I: `makeGridTask`, `checkGrid`, `mirrorCell`, `FIRST_GRID_TASK`; Labor II: `FOLD_SHAPES` (20 próba), `isSymmetricFold` (a tükrözött csúcsokból számolja ki, tényleg tükörtengely-e), `FoldArt`, `axisFrame`.
2. **`SymmetryG3Figures.tsx`** – `SymmetryFoldSvg`, `SymmetryButterflySvg`, `SymmetryGridSvg`, `SymmetryAxesSvg`, `SymmetryLettersSvg`, `SymmetryWaterSvg`.
3. **`SymmetryG3CardFigures.tsx`** – `MiniHalf`, `MiniDot`, `MiniShape` (párosító), `SortObj`, `SortLetter`, `SortShape` (csoportosító).
4. **`SymmetryG3Theory.tsx`** – `SymmetryG3Theory`.
   - **Labor I – Tükrözz a négyzetrácson!** 10 × 10-es rács, álló vagy fekvő tengely; a bal (felső) félen véletlen, összefüggő, 2 színű minta. A gyerek színt választ, és a túloldalon kockákra koppint. „Ellenőrzöm”: rossz helyű / rossz színű kockák piros keretben, célzott üzenet („Számold meg: hány kockára van az eredeti a tengelytől?”, „Még 2 kocka hiányzik.”). „Tükörrel megnézem”: halvány előnézet, mint a valódi tükör.
   - **Labor II – Hajtsd félbe!** Síkidom vagy betű egy piros szaggatott vonallal; a gyerek tippel (Igen, az / Nem az), aztán a rajz **animáltan félbehajlik** a vonal mentén: látszik, hogy a két fele fedi-e egymást. Utána magyarázat (pl. „Az átló két egyforma háromszögre vágja, de hajtásnál a csúcsok kilógnak.”).
5. **`SymmetryG3Quiz.tsx`** – `SYMMETRY_G3_QUESTIONS`: 30 kérdés (10/10/10), 27 ábrával, minden kérdésnél badge, 3 puska. Azonosító: `g3-geom-tukrozes-quiz`.
6. **`SymmetryG3Matcher.tsx`** – `SYMMETRY_G3_MATCHER_LEVELS`: fél ábra a tengelynél ↔ az egész neve; pont a rácson ↔ hol lesz a tükörképe; síkidom ↔ tükörtengelyeinek száma. Mind a 24 kártyapárnak van képe. `g3-geom-tukrozes-matcher`.
7. **`SymmetryG3Sorter.tsx`** – `SYMMETRY_G3_SORTER_LEVELS`: tárgyak és betűk függőleges / vízszintes / nincs tengely szerint; síkidomok nincs / pontosan 1 / több tengely szerint. Minden elemnek van képe. `g3-geom-tukrozes-sorter`.

**Teszt:** `src/test/grade3Topic10SymmetryG3.test.tsx` (a labor-generátorok és az összes hajtás-próba geometriai ellenőrzésével).

## Eltérések a tankönyvtől

- **Hiányzó meghatározás:** a könyv a „szimmetrikus”, „tükörtengely”, „tengelyesen tükrös” szavakat definíció nélkül, felváltva használja. Nálunk egy mondat: „Ha félbehajtod, és a két fele pontosan fedi egymást, az ábra szimmetrikus; a hajtás vonala a tükörtengely.” A „tengelyesen tükrös” szót zárójelben említjük.
- **Fényképek (TK 106/1., 107/6.):** a Parlament fotója perspektívával, a folyóval készült, a valódi tárgyak csak *majdnem* szimmetrikusak. Mi a döntést igénylő kérdésekhez pontos rajzokat használunk; a hétköznapi tárgyaknál kimondjuk a „majdnem” szót.
- **TK 106/3. háromszöge:** a háromszögön csak 1 piros vonal van, pedig szabályos háromszögnek látszik (annak 3 tükörtengelye van). Nálunk külön szerepel a 2 egyforma oldalú (1 tengely) és a minden oldalán egyforma háromszög (3 tengely), és a kérdés szövege megmondja, hogy minden oldal egyforma.
- **A kör (TK 107/4.):** a „végtelen sok” fogalmat 3. osztályban nem tanítjuk; azt mondjuk: „akárhány – minden vonal, ami a közepén átmegy”.
- **TK 107/7. „Melyik két állatra igaz…”:** a megfogalmazás egyetlen párt sugall, a döntést a fotószerű rajzok apró részletei (csíkok, tüskék, fejtartás) adják. Nálunk a tükörkép-kérdések egyszerű, pontos ábrán vannak, egyetlen jó válasszal, és a rossz válaszok a tipikus hibák (eltolás, fejjel lefelé fordítás).
- **MF 31/5. ferde tengely négyzethálón:** a ferde tengelyre tükrözés négyzethálón nem kockaszámolás, ez 3. osztályban túl nehéz. Mi négyzethálón csak álló és fekvő tengellyel tükrözünk; ferde tengely a hajtogató laborban szerepel (négyzet átlója, téglalap átlója).
- **MF 31/6. levél és csillag:** a levél erezete nem pontosan tükrös, a csillag 7 ágú; nem világos, kell-e színezni. Ilyen „majdnem” ábrát nem teszünk eldöntendő kérdésbe.
- **Szakszavak:** a 3. osztályos könyv nem nevezi meg a trapézt, a paralelogrammát, a deltoidot, az egyenlő szárú és a szabályos háromszöget; ezért mi sem (a 3. lecke is „ferde négyszög”-et mond). Leíró neveket használunk: „sárkány alakú négyszög”, „ferde négyszög”, „háromszög, minden oldala egyforma”.
- **Saját anyag:** a könyv fotóit, szereplőit és mintáit nem vettük át; saját rajzok (házikók, fenyő, pillangó, nyíl, betűk), saját rácsfeladatok és számok.
- **Tudatos didaktikai változtatások:**
  - A téglalap átlója mint **csapda** külön szerepel (elméletben, kvízben, laborban): „Két egyforma rész még nem elég.”
  - A **tükörkép és az eltolás** különbségét kimondjuk, és a kvíz rossz válaszai között ott az eltolt alak.
  - Négyzetrácson a szabály a **kockák számolása a tengelytől**; a kvízben a pont és a tükörképe közti távolság (2 + 2 = 4) kétlépéses feladat.
  - A tükör és a papírhajtogatás helyett a képernyőn **animált hajtás** és **tükör-előnézet** van, azonnali, a hibát megmutató visszajelzéssel.
  - A betűket függőleges / vízszintes / mindkét / nincs tengely szerint rendezzük (a könyv betűkkel nem foglalkozik, de a szimmetria felismerését jól gyakoroltatja).

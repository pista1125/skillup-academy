# 3. Számszomszédok, kerekítés (3. osztály, III. Számolás 0-tól 200-ig)

**Források:** tankönyv OH-MAT03TA 33–34. oldal, munkafüzet OH-MAT03MA I. kötet 40–41. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 33.:** számok leolvasása két számegyenesről (0–100, 100–200), egyes és tízes szomszédok; „gondoltam egy számot” (legnagyobb kétjegyű, legkisebb háromjegyű páratlan, 111); családtagok magassága 140/150/160 cm-es vonalak között („magasabb, de alacsonyabb”); mely állítások jelölnek közelítő értéket.
- **TK 34.:** számegyenesen jelölt számok tízes szomszédai, melyikhez vannak közelebb; az egyenlő távolságra lévő (5-re végződő) számok; szabálytábla: a ≈ jel, a kerekített érték a közelebbi tízes szomszéd, 5-ös egyesnél felfelé, a kerek tízes önmaga; árak becslése kerekítéssel, pénzből mit vehet meg a gyerek; hiányzó számjegyek (□46, 1□4, 15□ ≈ 150).
- **MF 40.:** táblázat egyes és tízes szomszédokkal (142, 160, 195, 199), körös színezés (kisebb/nagyobb tízes szomszéd), számkártyás rejtvények (pl. „Kisebb tízes szomszédom a 109 nagyobb tízes szomszédja”, „Páratlan szomszédom a 191”).
- **MF 41.:** kerek tízesek a számegyenesen, tízes szomszédok táblázata, kerekítés (114, 135, 178, 183, 122, 165), mely számok kerekített értéke 190, társasjáték kerekítéssel.

**Tízesre** kerekítünk. A százasra kerekítés a könyvben csak az V. témakörben (TK 56–57.) jön, ezért itt még nincs benne.

## Mit csinál a DiákZóna lecke?

Saját számokkal és helyzetekkel (napraforgók a magasságmérőnél, papírbolt, labda, ceruza, Panni és Marci magassága) gyakoroltatja az egyes és tízes szomszédokat, a ≈ jelet, a tízesre kerekítést (lefelé, 5-nél felfelé, kerek tízes marad), a visszafelé gondolkodást (melyik számokból lesz 150), a hiányzó számjegyet és a becslést. Minden szám 200-on belül marad.

## Komponensek

1. **`Rounding200G3Parts.tsx`** – `NumLine` (számegyenes-részlet pontokkal, ívekkel, sávokkal, választható feliratokkal), `PriceTag`, `DigitCards`.
2. **`Rounding200G3Figures.tsx`** – `NeighboursTrainSvg` (a 147 négy szomszédja vonatként), `NeighboursLineSvg` (139–151 nagyítva), `SunflowersSvg` (napraforgók 110–150 cm-es vonalak között), `RoundingRuleSvg` (131–134 → 130, 135–139 → 140), `ApproxSignSvg` (163 ≈ 160), `PriceTagsSvg` (78, 134, 165 Ft).
3. **`Rounding200G3CardFigures.tsx`** – kártyaikonok: `MiniRow`, `MiniLine` (párosító), `SortLine`, `MiniBlocks` (csoportosító).
4. **`Rounding200G3Theory.tsx`** – szomszédok (táblázat, kerek tízes szomszédai), pontosan vagy körülbelül, a ≈ jel, a kerekítés 3 szabálya, 3 mintapélda (196 ≈ 200; melyik számokból lesz 150; papírbolt), „Vigyázz!” (145 ≈ 150, 198 ≈ 200).
   - **Labor I – Szomszédkereső:** véletlen szám 101–199 között (külön gombbal kerek tízes is). Lépésenként kell megtalálni a kisebb/nagyobb egyes, majd a kisebb/nagyobb tízes szomszédot; a megtalált szomszédok a számegyenesen is megjelennek. Hibára célzott tipp (pl. „a szám nem lehet a saját szomszédja”, „ez a nagyobb tízes, most a kisebbet keresd”).
   - **Labor II – Kerekítő:** véletlen szám (gyakran 5-re végződő vagy kerek tízes), a számegyenesen a két tízes szomszéd között; két (kerek tízesnél három) nagy gomb. Hibánál lépésszámláló tipp, 5-ös egyesnél külön szabály-emlékeztető; jó válasznál nyíl mutatja az irányt; sorozatszámláló.
5. **`Rounding200G3Quiz.tsx`** – `ROUNDING_200_G3_QUESTIONS`: 30 kérdés (10/10/10), 20 kérdésnél ábra (számegyenes, szomszédsor, növények, árcédula, számkártyák), minden kérdésnél badge, 3 puska. Azonosító: `g3-c200-kerekites-quiz`.
6. **`Rounding200G3Matcher.tsx`** – `ROUNDING_200_G3_MATCHER_LEVELS`, 3 szint × 8 pár (egyes szomszédok; kerekítés; gondoltam egy számot), szintenként 4 képes kártya. `g3-c200-kerekites-matcher`.
7. **`Rounding200G3Sorter.tsx`** – `ROUNDING_200_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 9 elem (le / fel / marad; ≈ 120 / 130 / 140; kirakott számok ≈ 150 / 160 / 170), szintenként 5 képes elem. `g3-c200-kerekites-sorter`.

**Teszt:** `src/test/grade3Topic3Rounding200G3.test.tsx`

## Eltérések a tankönyvtől

- **„Kékkel jelölt számok” (TK 34/5.):** a feladat kékkel jelölt számokról beszél, de a 85 és a 185 zölddel van jelölve, a 30, 100, 130 narancssárgával. Nálunk a számegyenesen a kérdezett szám mindig egy színnel, a keresett mindig piros „?”-lel látszik.
- **Kerekítés a pénztárnál (TK 34/6. b):** a könyv azt kérdezi, „mennyit kell fizetni” tízesre kerekítve. A boltban készpénznél valójában 5 forintra kerekítenek (127 Ft → 125 Ft), nem tízesre. Nálunk a kérdés: „Körülbelül mennyibe kerül?” – ez becslés, nem fizetés.
- **A kerek tízes szomszédai és kerekítése:** a könyv szabálya („a kerekített érték a közelebbi tízes szomszéd”) a kerek tízesekre nem működik, ezért külön szabályt ad. Mi kimondjuk: a 160 tízes szomszédai 150 és 170 (a szám nem lehet a saját szomszédja), de a 160 tízesre kerekítve 160. Ez a laborban és a kvízben is szerepel.
- **Közelítő értékek (TK 33/4.):** a „személymérlegen legfeljebb 200 kg-ot lehet mérni” mondat nem közelítő érték, hanem felső határ; a feladat így vitatható. Mi egyértelmű példát adunk („kb. 150 gyerek volt a műsoron” ↔ a buszjegy árát pontosan kell tudni).
- **Páratlan szomszéd (MF 40/3.):** a „páratlan számszomszédom a 191” (= 189) olyan fogalmat használ, amely ezeken az oldalakon nincs elmagyarázva. Nálunk csak egyes és tízes szomszéd szerepel.
- **Tudatos didaktikai változtatások:**
  - A szabály előtt a gyerek „lát”: napraforgók a vonalak között, majd a számegyenesen a 131–139 színes sávja mutatja, merre megy a szám.
  - A „visszafelé” kérdés (melyik számokból lesz 150, hány ilyen szám van) külön mintapéldát és kvízkérdéseket kapott.
  - A tipikus hibák (145 ≈ 140; 198 ≈ 190; a 190 szomszédja a 190) csapdadobozban és rossz válaszként is megjelennek.
  - Saját számok és szereplők (Panni, Marci); a könyv szereplőit (Attila, Anna, Zoli, Ági, Bence, Andor…) nem vettük át.

# 2. Egynél kisebb törtek (tankönyv 149., 151–152. oldal, munkafüzet II. 66–67. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 149. és 151–152. oldal) és munkafüzet (`OH-MAT04MA_II`, 66–67. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a VIII. fejezet (A törtszámok) 2. leckéje.

---

## 🎯 Tananyag Áttekintés

A tankönyvben nincs külön „egynél kisebb törtek” lecke: a 147–152. oldal feladatai vegyesen használják a több részből álló törteket. Ez a lecke azokat a feladatokat gyűjti össze, ahol **több egyenlő részt** veszünk (2 harmad, 3 negyed, 7 tized), de kevesebbet, mint az egész.

- **7. feladat (149. o.)**: „Mindegyik ábra 1 egészet ér. Hányad része kék, hányad része sárga?” – 3 × 4-es rácsok (1 negyed kék / 3 negyed sárga, 1 harmad kék / 2 harmad sárga, fele-fele).
- **8. feladat (149. o.)**: 12 pohár, 4 piros és 8 sárga – a poharak 1 harmada piros, 2 harmada sárga.
- **9. feladat (149. o.)**: az éhes kisegér háromszor megeszi a megmaradt sajt felét – 1 nyolcad marad.
- **10. feladat (149. o.)**: négyzetrácsos figurák színes és fehér része.
- **16. feladat (151. o.)**: zászlók – Karesz: 1 harmad piros, nincs zöld → Németország; Manó: 2 harmad piros → Ausztria; Gergő: 1 harmad piros, 1 harmad fehér, tóhoz utaznak → Magyarország; Bálint: 1 ketted fehér → Monaco; a görög zászló a kakukktojás.
- **19. feladat (152. o.)**: parkoló 12 autóval (3 kék, 3 piros, 6 zöld) – igaz/hamis állítások („Az autók 1 kettede piros vagy kék.” igaz, „1 harmada zöld” hamis).
- **Munkafüzet II. 67., 2–6.**: zászló 1 harmada sárga, 2 harmada kék; a 9 kis négyzetből álló négyzet harmada (3 kis négyzet); 12 négyzet 1 negyede sárga, 2 negyede zöld; Janka 10 lövése tizedekkel (kártyák: 1, 2, 3, 4, 8 tized); gyöngysorok sárga és piros része.
- **Munkafüzet II. 66., 1. a)**: felek, harmad, negyed, ötöd, hatod részek – a törtek összehasonlítása (1. b) a 4. leckére marad.

Szóhasználat a tankönyv szerint: „3 negyed”, „2 harmad része piros”, „a lövések 8 tizede”; számláló/nevező és számjegyes törtalak nincs.

> **⚠️ CSAPDA:** 3 színes és 1 fehér rész esetén a fehér rész nem „1 harmad”, hanem 1 negyed – a tört neve mindig az összes egyenlő rész számából jön.

### A régi README javított hibái
- A régi README LaTeX-es törtekkel ($\frac{3}{5}$), számláló–nevező szabályokkal és a tankönyvben nem szereplő definíciókkal dolgozott. Helyettük a tankönyv szavai és valódi feladatai (rácsok, poharak, zászlók, céltábla, kisegér, parkoló) szerepelnek.

---

## 💻 Elkészített Komponensek

1. **`ProperFractionsFigures.tsx`**:
   - `ThreeQuartersSvg`: 3 negyed pizzán és szalagon.
   - `GridColorsSvg`: a 149. oldali kék–sárga rácsok.
   - `CupsSvg`: 12 pohár 3 csoportban (1 harmad piros).
   - `CountryFlagsSvg`: Ausztria, Németország, Görögország, Monaco, Magyarország zászlója.
   - `BeadsSvg`: gyöngysorok (2 harmad, 3 harmad, 3 negyed).
   - `ArcherySvg`: céltábla 10 lövéssel (3 kék, 4 sárga, 1 piros, 2 mellé).
   - `CheeseSvg`: a kisegér sajtja három nap után.
   - `ParkingSvg`: parkoló 12 autóval.
   - Segédek: `CountryFlagG`, `CupG`, `CarG`, `BeadsG`, `TargetG`, `GridG`, `ARCHERY_HITS`, `PARKING` (a pizza/szalag/csoki elemek az 1. lecke `FractionIntro4Figures.tsx` fájljából jönnek).
2. **`ProperFractionsTheory.tsx`**: Mit tanulunk?, leolvasás két kérdéssel (táblázat), rácsok és poharak kidolgozva, zászlók, gyöngyök és céltábla, kisegér, „Vigyázz!” csapda. Exportálja: `readParts`, `STRIP_TASKS`, `STRIP_PARTS`, `BEAD_TASKS`.
   - **I. labor – Csokitábla-színező:** a csokit 2–10 egyenlő részre töröd, kockákat színezel; a 2 harmad … 7 tized feladatkártyák ellenőrzik a törést és a színezést, a színes és a világos rész is leolvasható.
   - **II. labor – Gyöngyfűzés:** gyöngysor átszínezése (pl. 4 gyöngy, 3 negyede piros), a piros és a sárga rész azonnali leolvasásával.
3. **`ProperFractionsMatcher.tsx`**: 3 szint × 8 pár (hány rész közül hány; színes rész → fehér rész; helyzetek).
4. **`ProperFractionsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (1 harmad / 2 harmad / 3 negyed; fehér: 1 negyed / 1 harmad / 2 ötöd; Németország / Ausztria / Magyarország).
5. **`ProperFractionsQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 23 kérdés ábrával, 3 puskakártyával.

Azonosítók: kvíz `g4-frac-egynel-kisebb-quiz`, párosító `g4-frac-egynel-kisebb-matcher`, csoportosító `g4-frac-egynel-kisebb-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic8ProperFractions.test.tsx` (4 komponens, 8 SVG ábra, kvíz-, párosító- és csoportosító-szerkezet, leolvasás, céltábla- és parkolóadatok).

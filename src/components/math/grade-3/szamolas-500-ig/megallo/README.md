# 5. Megálló – tudáspróba (3. osztály, V. Számolás 0-tól 500-ig)

A V. fejezet záró leckéje: az egész fejezet (1–4. lecke) ismétlése és 90 kérdéses tudáspróbája.

## Források

- **Tankönyv (OH-MAT03TA):** Megálló 64–66. o., Kitekintő 67. o.; az egész fejezet 52–63. o.
- **Munkafüzet I. (OH-MAT03MA_I):** a fejezet 61–76. o.

## Mi van a tankönyvi oldalakon?

- **TK 64.:** „Hány lovat látsz?” (egymásba rajzolt lovak), különbségkereső két képen; mely számok tízesre kerekített értéke 140, illetve 470 (számegyenes-részlettel).
- **TK 65.:** melyik százashoz van közelebb a jelölt szám (440, 359, 270, 470); nyitott mondatok (330 < □ < 340, 495 < □ < 500 …); 500-nál kisebb háromjegyű számok az 5, 1, 3, 8 kártyákból és kerekítésük; két számjegy törlése az 5 2 7 1 9 sorból (a legkisebb háromjegyű szám), valódi értékek; három bűvös négyzet.
- **TK 66.:** sorozatok megadott szabállyal (380 − 90 − 80 …; 10 + 10 · 4 …; 400 : 4 + 140 …); 320 néző 40-es sorokban; takarmány egy hétre (20 ló, 10 kg széna + 1 kg abrak naponta); almás visszafelé feladat („a megmaradt almák felét”); lóverseny-társasjáték 40 mezővel.
- **TK 67. (Kitekintő):** lovas érdekességek műveletsorokkal (Kincsem 54 győzelme, 247 cm, kb. 70 km/óra, 62 év); kiválasztás (4 gyerek, 2 ló); sorrend-logika (4 ló); magasság szerinti sorrend nyilakkal.
- **MF 61–76.:** a fejezet leckéinek feladatai (számok, szomszédok, kerekítés, összeadás–kivonás, szorzás–osztás) – a tudáspróba ezek típusait is felhasználja.

## Mit csinál a DiákZóna lecke?

Saját feladatok, saját számok és helyzetek (könyvtár, futókör, bábszínház, busz, tojás, fasor, persely, papírbolt 500 Ft-os bankjeggyel) – a könyv feladattípusait gyakoroljuk, de nem másoljuk.

- **Elmélet:** „Amit már tudsz” táblázat a fejezet leckéiről, 6 ábra (247 számképpel és helyiérték-táblázattal; számegyenes 0–500; 374 kétféle kerekítése; 270 + 160 bontással; műveletcsalád 7 · 60 = 420-ból; vásárlás 500 Ft-ból), szomszéd- és kerekítéstáblázat, 4 kidolgozott vegyes feladat (beváltás, vásárlás, bennfoglalás, sorozat), „Vigyázz!” (kétszeri kerekítés 349 ≈ 350 ≈ 400; négyszázhat ≠ 46; előbb a szorzás).
- **Labor I – Vegyes feladatok:** 8 feladattípus (számírás betűvel adott számból, szomszédok, kerekítés tízesre/százasra, összeadás, kivonás, szorzás, osztás, műveleti sorrend), nagy számgombokkal, „Új feladat (vegyes)” vagy típusválasztó gombok; minden szám 0 és 500 között. A visszajelzés a konkrét hibára reagál („Felcserélted a tízeseket és az egyeseket”, „Kétszer kerekítettél!”, „Ez egyes szomszéd”, „Átléptél egy kerek százast!”, „Ne hagyd le a nullát!”, „Balról jobbra számoltál”). Pontszámláló.
- **Labor II – Sorozat-gép:** a könyv TK 66/9. feladatának ötletéből. Véletlen sorozat 6 taggal (állandó lépés, pl. − 40; vagy váltakozó szabály, pl. + 30, · 2 vagy : 4, + 120); az első 3 tag látszik, a gyerek nyilanként kitölti a következő hármat. Hibánál tipp: „Ez az előző szám. Még el kell végezni: 210 − 70.”
- **Kvíz:** 90 kérdés (30/30/30), 55 ábrával (számkép, helyiérték-táblázat, számegyenes, kerekítési szakasz, érmék, ugrások, csík, tányérok, rúdcsoportok, műveletlánc, számkártyák, árcédulák, bűvös négyzet, fasor), mind típusjelvénnyel, 3 puskakártya. Egyetlen szám (a rossz válaszokban sem) nagyobb 500-nál – teszt ellenőrzi.
- **Párosító:** 3 szint × 8 pár, szintenként 4 képes kártya (számkép és érmék ↔ szám; kerekítési szakasz ↔ kerek szám; ugrás, tányérok, rúdcsoportok, csík ↔ eredmény).
- **Csoportosító:** 3 szint × 3 kategória × 9 elem (2 / 3 / 4 százas van benne – számképek is; százasra kerekítve ≈ 200 / 300 / 400 árcédulákkal; eredmény 240 / 360 / 480 zsákokkal és ugrásokkal), szintenként 4–5 képes elem.

## Komponensek

- `Count500ExamG3Figures.tsx`: `Count500BlocksSvg`, `Count500NumberLineSvg`, `Count500RoundingSvg`, `Count500AddSubSvg`, `Count500MulDivSvg`, `Count500MoneySvg`
- `Count500ExamG3Parts.tsx`: kérdésábrák (`BlocksFig`, `PlaceFig`, `NLFig`, `RoundFig`, `CoinsRow`, `ChainFig`, `DigitCards`, `TagsFig`, `MagicFig`, `TreesFig`, `TimesFig`); az érme, a lap, a rúd és a számegyenes a 3. leckéből jön, további kérdésábrák a 3. és a 4. lecke `*QuizParts.tsx` fájljaiból
- `Count500ExamG3CardFigures.tsx`: kártyaképek (`MiniBlocks`, `MiniRoundLine`, valamint a 3–4. leckéből `MiniCoins`, `MiniJump`, `MiniBar500`, `MiniRodGroups`, `MiniShare`, `SortBlocks`, `SortTags`, `SortBags`, `SortJump`)
- `Count500ExamG3Theory.tsx`: `Count500ExamG3Theory`, `makeCount500Task`, `makeChainTask`, `numberWord`, `roundTen`, `roundHundred`
- `Count500ExamG3Quiz.tsx`: `Count500ExamG3Quiz`, `COUNT500_EXAM_G3_QUESTIONS` (azonosító: `g3-c500-tudasproba-quiz`)
- `Count500ExamG3Matcher.tsx`: `Count500ExamG3Matcher`, `COUNT500_EXAM_G3_MATCHER_LEVELS` (`g3-c500-tudasproba-matcher`)
- `Count500ExamG3Sorter.tsx`: `Count500ExamG3Sorter`, `COUNT500_EXAM_G3_SORTER_LEVELS` (`g3-c500-tudasproba-sorter`)

Teszt: `src/test/grade3Topic5Count500ExamG3.test.tsx`

## Eltérések a tankönyvtől

1. **Számkörön kívüli feladat (TK 66/11.):** 20 ló, lovanként naponta 10 kg széna + 1 kg abrak, egy hétre: 20 · 11 · 7 = 1540 kg. Az eredmény messze 500 fölött van (az 1000-es számkör a XI. fejezetben jön), és a 20 · 11 kétjegyű · kétjegyű szorzás. A feladatot nem vettük át; a tudáspróbában minden szám (a rossz válaszok is) 500-on belül van.
2. **Törtszó túl korán (TK 66/12.):** „Fecskének a megmaradt almák **felét** adta” – a törteket csak a XIV. fejezet tanítja. Helyette visszafelé gondolkodós „Gondoltam egy számot” feladatok vannak összeadással, kivonással, szorzással (□ − 170 = 260, □ : 7 = 60).
3. **„Szám” a „számjegy” helyett (TK 65/7. b–c):** „a százasok helyén álló **számjegy** valódi értéke”, de „a százasok és tízesek helyén álló **számok** valódi értékeinek különbsége”. Helyesen: számjegyek. Nálunk mindig „jegy” / „számjegy” (a 1. lecke szóhasználatával egyezően).
4. **0 a bűvös négyzetben (TK 65/8., 2. négyzet):** a 30, 240, 90 / … / 210 négyzet egyetlen megoldásában az alsó középső mező **0** (30 + 120 + 210 = 360, 150 + 0 + 210 = 360). Ez helyes, de a gyerek könnyen hibának hiszi, és a feladat nem figyelmeztet rá. Saját bűvös négyzetünkben (összeg 450) minden szám pozitív kerek tízes.
5. **Még nem tanult műveletek a társasjátékon (TK 66/13.):** „125 + 125” és „310 − 54 : 6” nem kerek számokkal való fejszámolást kér (125 + 125 = 250, 310 − 9 = 301), pedig a fejezet csak kerek tízesekkel számol. A tudáspróba műveletei kerek tízesekkel dolgoznak; nem kerek számok csak a számfogalmi, szomszéd- és kerekítési kérdésekben vannak.
6. **Nem matematikai feladatok (TK 64/1–2.):** a lovak megszámolása az egymásba rajzolt képen és a különbségkereső figyelemjáték; a Kitekintő lovas adatai (km/óra) más fejezet anyagát is érintik. Ezeket nem vettük át.
7. **Tudatos didaktikai változtatások:**
   - A Megálló vegyes, egyszeri feladatai helyett véletlen feladatgenerátor (8 típus) ad azonnali, hibára szabott visszajelzést; a sorozatos feladatból (TK 66/9.) Sorozat-gép labor lett.
   - A kerekítésnél mindig kis szakaszt rajzolunk a két szomszéddal, és külön csapdadoboz tanítja, hogy százasra nem kerekítünk kétszer (349 ≈ 300).
   - A társasjáték és a lovas történetek helyett saját helyzetek; a „fasor” kérdés (280 m, 40 m-enként, a két végén is fa: 8 fa) a bennfoglalás egy gyakori csapdáját (köz ↔ fa) mutatja meg.
   - Saját nevek (Dani, Kata, Bence, Bori); a könyv szereplőit (Gábor, Eszter, Nóri, Attila, a lónevek) nem vettük át.

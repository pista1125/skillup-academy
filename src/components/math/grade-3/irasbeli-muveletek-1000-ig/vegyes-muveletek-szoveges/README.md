# 4. Vegyes műveletek és szöveges feladatok (3. osztály, XII. Írásbeli műveletek 1000-ig)

## Források
- Tankönyv: OH-MAT03TA, 118–121. oldal (hegycsúcsok magassága, rejtvény betűkkel, utcai távolságok, „bűvös” háromszög és téglalap, „Melyik számra gondoltam?”, iskolai táblázat, szakaszos ábra, számkártyák).
- Munkafüzet: OH-MAT03MA_II, 44–47. oldal.

## Mi van a könyvben?
- Összeadás és kivonás 1000-ig, becsléssel (százasra kerekítve) és a hiányzó tag vagy kivonandó megkeresésével.
- Adatok kiolvasása térképről, rajzról és táblázatból, utcai távolságok, kétlépéses szöveges feladatok, szakaszos ábra, számkártyákból képzett háromjegyű számok.

## Mit csinál a DiákZóna-lecke?
- Rövid, saját mintapéldák: táblázat olvasása (nyári táborok), hiányzó szám (□) ellenőrzéssel, kétlépéses „fagyizó” feladat, visszafelé gondolkodás („gondoltam egy számot”).
- „Vigyázz!” doboz: a „több” szó mellett is lehet kivonás (ha azt kérdezik, mennyi volt az egyik rész).
- **Labor I – Útvonaltervező:** véletlen utca három-négy hellyel és távolságokkal. A gyerek kiszámolja a kérdezett útvonal hosszát. Célzott tippet kap, ha csak egy szakaszt írt be, vagy ha az összes szakaszt összeadta. Van „Új feladat” gomb.
- **Labor II – Melyik szám hiányzik?** Véletlen □-es nyitott mondat (□ + a = b, a + □ = b, a − □ = b, □ − a = b), tippel arról, melyik műveletet kell elvégezni. Van „Új feladat” gomb.
- Kvíz: 30 kérdés (10/10/10), ábrákkal (táblázat, útvonal, szakaszos ábra, bűvös háromszög és téglalap, számkártyák, pénz, írásbeli oszlop letakart jeggyel, sorozat, futópálya). Párosító: hiányzó szám, útvonal, két lépés. Csoportosító: „hogyan találod meg a □-et”, „mennyi az eredmény”, „hány lépés kell”.

## Komponensek
- `MixedOps1000G3Figures.tsx`: `MixedOps1000MapSvg`, `MixedOps1000TableSvg`, `MixedOps1000MissingSvg`, `MixedOps1000TwoStepSvg`, `MixedOps1000ReverseSvg`
- `MixedOps1000G3CardFigures.tsx`: `MiniBar`, `MiniRoute`, `MiniCoins`, `MiniRows`
- `MixedOps1000G3Parts.tsx`: kvízábrák (`TableFig`, `RouteFig`, `BarFig`, `RowsFig`, `TriangleFig`, `RectFig`, `CardsFig`, `CoinsFig`, `SeqFig`, `TrackFig`) és labor-generátorok (`genRoute`, `genMissing`)
- `MixedOps1000G3Theory.tsx`, `MixedOps1000G3Quiz.tsx` (`MIXED_OPS_1000_G3_QUESTIONS`), `MixedOps1000G3Matcher.tsx` (`MIXED_OPS_1000_G3_MATCHER_LEVELS`), `MixedOps1000G3Sorter.tsx`
- Azonosítók: kvíz `g3-wops-vegyes-quiz`, párosító `g3-wops-vegyes-matcher`, csoportosító `g3-wops-vegyes-sorter`.

## Teszt
`src/test/grade3Topic12MixedOps1000G3.test.tsx`

## Eltérések a tankönyvtől
- **Számkörön kívüli eredmény (TK 118/2. c):** a Kékes magassága 900 + 114 = 1014 m, ez túllépi a fejezet 0–1000-es számkörét. A DiákZóna minden eredménye legfeljebb 1000.
- **Tört túl korán (TK 120/7. f: „a kilencszáz felének…”):** a „fele” mint törtrész csak a XIV. témakörben jön. Nálunk a „Melyik számra gondoltam?” feladatok csak összeget és különbséget használnak.
- **Didaktikai változtatás:** a könyv utcai távolságos feladata egyetlen rajz. Nálunk az útvonaltervező labor mindig új utcát és új kérdést ad, a kvíz útvonalas ábrái pedig egyenként jelölik a kérdezett szakaszt.
- **Didaktikai változtatás:** a hiányzó szám keresésénél a labor mindig megmutatja, melyik művelettel kapjuk meg a □-et (pl. „□ − 462 = 237”: add össze a különbséget és a kivonandót), és visszahelyettesítéssel ellenőriz.
- A könyv szereplői, hegycsúcsai, iskolai táblázata és városnév-rejtvénye helyett saját adatokat használunk (nyári táborok, saját utca, fagyizó, mozijegy).
- *Megjegyzés:* az eredeti ágens-riport egy API-hiba miatt elveszett. Ezt a README-t a kész lecke és a tankönyvoldalak alapján írtam újra.

# 3. Írásbeli kivonás (VIII. Írásbeli kivonás)

## Források
- Tankönyv (OH-MAT03TA) **89–93. o.**
  - 89. o.: 497 − 354 helyiérték-táblázatban, három lépés (egyesek, tízesek, százasok), „Számolhatunk pótlással is” (4 e + 3 e = 7 e …), ellenőrzés összeadással és kivonással; gyakorló sorok felváltás nélkül; két szöveges feladat.
  - 90. o.: 383 − 147 – **felváltás az egyeseknél** korongokkal: „3 egyesből nem tudunk 7 egyest elvenni, ezért 1 tízest felváltunk egyesekre. 13 e − 7 e = 6 e. A kisebbítendőből elvesszük azt az 1 tízest… 8 t − 1 t = 7 t, 7 t − 4 t = 3 t.” Adatok – Terv – Becslés – Számítás – Ellenőrzés – Válasz.
  - 91. o.: 346 − 163 – **felváltás a tízeseknél**; gyakorló sorok, labdás párosítás.
  - 92. o.: 315 − 128 – felváltás az egyeseknél és a tízeseknél is.
  - 93. o.: 405 − 248 – **0 a tízesek helyén**: „1 százast felváltunk 9 tízesre és 10 egyesre”; letakart számjegyek; hiányzó kisebbítendő/kivonandó; szöveges feladatok.
- Munkafüzet II **6–11. o.**: becslés, számítás, ellenőrzés táblázatban; láncszámolás; hibás kivonások javítása (7. feladat); hiányzó számok; szabálykeresés táblázatban; társasjátékok.

## Az algoritmus: a könyv és a DiákZóna
A tankönyv a **felváltásos** (bontásos) módszert tanítja: ha a kisebbítendő jegye kevés, 1-et felváltunk a következő helyi értékről, és a következő oszlopban a kisebbítendőből vesszük el a felváltott 1-et. A pótlást csak felváltás nélküli oszlopra mutatja.

**A tanító döntése alapján a DiákZóna a hagyományos pótlásos-maradékos módszert tanítja.** Minden oszlopban a kivonandó jegyétől (+ az előző maradék) pótolunk a kisebbítendő jegyéig; ha az kisebb, 10-zel többig pótolunk, és „maradt 1”, amit a következő kivonandó-jegyhez adunk. Például 532 − 167: „7-hez 5, az 12. Leírom az 5-öt, maradt 1.” – „6 meg 1 az 7. 7-hez 6, az 13. Leírom a 6-ot, maradt 1.” – „1 meg 1 az 2. 2-höz 3, az 5. Leírom a 3-at.” → 365. A maradék kis zöld 1-esként a következő kivonandó-jegy mellé írható (a laborokban ki-be kapcsolható). Az ellenőrzés összeadással ugyanaz marad.

## A DiákZóna lecke
Pótlás maradék nélkül (486 − 253); miért marad 1 (pótlás számegyenesen: 7-hez 5, az 12, átléptük a 10-et); maradt 1 az egyeseknél (372 − 145), a tízeseknél (428 − 175), kétszer (421 − 186), 0 a tízeseknél (403 − 157: 6-hoz 4, az 10); ellenőrzés összeadással (és kivonással); szöveges feladat a könyv lépéseivel (moziterem: 364 − 178).

- **Labor I – Lépésről lépésre:** írásbeli oszlop + „pótló sáv” (0–19 számegyenes: honnan pótolunk, meddig). Minden oszlopnál: „8 meg 1 az 9. 9-től pótolsz. Meddig?” (a kisebbítendő jegyéig, vagy 10-zel többig – „maradt 1”; hibás válaszra magyarázat), majd számbillentyűzet a leírandó jegyhez („9-hez mennyi kell, hogy 16 legyen?”). A maradék zöld 1-esként a következő kivonandó-jegy mellé kerül (ki-be kapcsolható). A kimondott lépések naplóban jelennek meg („7-hez 5, az 12. Leírom az 5-öt, maradt 1.”). Tipikus hibákra célzott tipp (elfelejtett maradék, fordított pótlás). „Mutasd meg!” – animált bemutató. A végén ellenőrzés összeadással. Öt feladattípus + „Új feladat”.
- **Labor II – Hibavadász:** egy „gyerek” elvégzett kivonása – jó vagy hibás? A gép tipikus hibákat generál (elfelejtett maradék, fordított pótlás, százas-tévedés). Hibásnál a jó eredményt is ki kell választani; a visszajelzés megmondja, mi volt a hiba.

## Komponensek
- `WrittenSubG3Column.tsx` – **újrahasznosítható** írásbeli kivonás-oszlop (a VIII. fejezet tudáspróbája és a XII. fejezet is használja). Props: `minuend`, `subtrahend`, `result`, `carries` (maradék-jelek jobbról, pl. `[null, 1, 1]`: kis zöld 1-es a kivonandó-jegy mellett), `exchanges` (régi, felváltásos jelölés – már nem használjuk, kompatibilitás miatt maradt), `op` ('−' vagy '+' az ellenőrzéshez), `cols`, `header`, `colored`, `highlight`, `grid`, `exchangeRow`, `noResult`, `cell`, `className`; jegy-szövegben `'?'` = keresett, `'_'` = üres doboz, `' '` = még nincs. Beágyazható `WrittenSubG3ColumnG` + `columnSubSize`. Segédek: `subSteps(a, b)` (oszloponként: digit, need, carryIn, from, target, carryOut, write), `carryMarks`, `carryCount`, `spokenSubStep` („6 meg 1 az 7. 7-hez 6, az 13. Leírom a 6-ot, maradt 1.”), `whyTenText`, `fillUpText`, `suffixHoz`.
- `WrittenSubG3Figures.tsx` (StepsNoExchangeSvg, FillUpStepsSvg = pótlás számegyenesen, ExchangeOnesSvg / ExchangeTensSvg / ExchangeBothSvg / ZeroTensSvg = maradékos lépések – a régi nevek megmaradtak, CheckSvg, WordPlanSvg), `WrittenSubG3CardFigures.tsx` (MiniCol), `WrittenSubG3Theory.tsx`, `WrittenSubG3Quiz.tsx` (`WRITTEN_SUB_G3_QUESTIONS`, 30 kérdés), `WrittenSubG3Matcher.tsx`, `WrittenSubG3Sorter.tsx`, `index.ts`.
- Teszt: `src/test/grade3Topic8WrittenSubG3.test.tsx` (az algoritmus helyességét is ellenőrzi 100–500 között). Aktivitás-azonosító: `g3-wsub-irasbeli`.

## Eltérések a tankönyvtől
- **Módszer (a tanító döntése):** a könyv (89–93. o.) a felváltásos módszert tanítja; a DiákZóna a hagyományos **pótlásos-maradékos** írásbeli kivonást használja („7-hez 5, az 12. Leírom az 5-öt, maradt 1. 6 meg 1 az 7 …”). Minden kimondott lépés, magyarázat, ábra, labor és rossz válasz (pl. „elfelejtette a maradékot”) ehhez igazodik. A korongos felváltás az 1. leckében (fejben számolás) megmaradt.
- **Maradék jelölése:** a maradékot kis zöld 1-es mutatja a következő kivonandó-jegy mellett; a laborban ki lehet kapcsolni, a kvíz ábrái jelölés nélküliek (kivéve, ahol épp a maradékról kérdezünk).
- **0 a tízeseknél (93. o.):** a könyv felváltással (9 tízes és 10 egyes) intézi el; pótlással ez egyszerűbb: „6-hoz 4, az 10, maradt 1” – külön lépésként kimondjuk, és a laborban külön feladattípus.
- **12. feladat (92. o.)** „Gyakorold az írásbeli kivonást!” sorában a 266 − 157 és a 437 − 145 csak egyszer kíván felváltást, miközben a mintapélda (315 − 128) kétszeres felváltást mutat – a könyv nem jelzi a típusváltást. Nálunk a feladattípus mindig meg van nevezve (labor gombjai, csoportosító 1. szint).
- **91. o. 9. feladat:** a „százasra kerekített becslés” több tételnél értelmetlen (226 − 174 ≈ 0) – lásd a 2. lecke README-jét; mi tízesre kerekítve becslünk a szöveges feladatban.
- A szöveges feladat lépéseit (Adatok – Terv – Becslés – Számítás – Ellenőrzés – Válasz) megtartottuk, de saját történettel (moziterem, menza, tulipán, lufi, futóverseny).
- Ellenőrzés: a könyv háromféle ellenőrzést mutat egyszerre; mi az összeadásosat tesszük első helyre („különbség + kivonandó = kisebbítendő”), a kivonásosat „vagy”-ként.
- Saját számok mindenhol; a munkafüzet „hibás kivonások” feladatának mintájára készült kvízkérdés is saját számokkal (326 − 118 = 218?).
- Számkör: 500-ig, ahogy a könyv (a 1000-ig terjedő írásbeli kivonás a XII. fejezetben jön).

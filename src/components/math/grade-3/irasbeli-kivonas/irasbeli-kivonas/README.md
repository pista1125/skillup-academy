# 3. Írásbeli kivonás (VIII. Írásbeli kivonás)

## Források
- Tankönyv (OH-MAT03TA) **89–93. o.**
  - 89. o.: 497 − 354 helyiérték-táblázatban, három lépés (egyesek, tízesek, százasok), „Számolhatunk pótlással is” (4 e + 3 e = 7 e …), ellenőrzés összeadással és kivonással; gyakorló sorok felváltás nélkül; két szöveges feladat.
  - 90. o.: 383 − 147 – **felváltás az egyeseknél** korongokkal: „3 egyesből nem tudunk 7 egyest elvenni, ezért 1 tízest felváltunk egyesekre. 13 e − 7 e = 6 e. A kisebbítendőből elvesszük azt az 1 tízest… 8 t − 1 t = 7 t, 7 t − 4 t = 3 t.” Adatok – Terv – Becslés – Számítás – Ellenőrzés – Válasz.
  - 91. o.: 346 − 163 – **felváltás a tízeseknél**; gyakorló sorok, labdás párosítás.
  - 92. o.: 315 − 128 – felváltás az egyeseknél és a tízeseknél is.
  - 93. o.: 405 − 248 – **0 a tízesek helyén**: „1 százast felváltunk 9 tízesre és 10 egyesre”; letakart számjegyek; hiányzó kisebbítendő/kivonandó; szöveges feladatok.
- Munkafüzet II **6–11. o.**: becslés, számítás, ellenőrzés táblázatban; láncszámolás; hibás kivonások javítása (7. feladat); hiányzó számok; szabálykeresés táblázatban; társasjátékok.

## Az algoritmus, ahogy a könyv tanítja
A tankönyv a **felváltásos** (bontásos) módszert tanítja, nem a pótlásos-maradékos („7-hez 6, az 13, marad 1”) eljárást: ha a kisebbítendő jegye kevés, 1-et felváltunk a következő helyi értékről, és a következő oszlopban a **kisebbítendőből** vesszük el a felváltott 1-et. A pótlást csak felváltás nélküli oszlopra mutatja („4 egyeshez 3 egyest kell adni, hogy 7 egyes legyen”). Az oszlopba a könyv semmilyen „maradékot” nem ír. DiákZóna ezt követi.

## A DiákZóna lecke
Felváltás nélkül (486 − 253) – elvétellel és pótlással; felváltás az egyeseknél (372 − 145), a tízeseknél (428 − 175), mindkettőnél (421 − 186), 0 a tízeseknél (403 − 157); ellenőrzés összeadással (és kivonással); szöveges feladat a könyv lépéseivel (moziterem: 364 − 178).

- **Labor I – Lépésről lépésre:** írásbeli oszlop + korongos helyiérték-táblázat egyszerre. Minden oszlopnál: „Kell felváltani?” (Igen/Nem, hibás válaszra magyarázat), majd számbillentyűzet a leírandó jegyhez. A korongok valóban átkerülnek (zölden keretezve a felváltott 10), az elvett korongok áthúzódnak; az oszlopban zöld kis számok mutatják a felváltás utáni értékeket (ki-be kapcsolható). A kimondott lépések naplóban jelennek meg a könyv szavaival (felváltás nélküli oszlopnál pótlással is). Tipikus hibákra célzott tipp (fordított kivonás, a felváltott 1 elfelejtése). „Mutasd meg!” – animált bemutató. A végén ellenőrzés összeadással. Öt feladattípus + „Új feladat”.
- **Labor II – Hibavadász:** egy „gyerek” elvégzett kivonása – jó vagy hibás? A gép tipikus hibákat generál (elfelejtett felváltás, fordított kivonás, százas-tévedés). Hibásnál a jó eredményt is ki kell választani; a visszajelzés megmondja, mi volt a hiba.

## Komponensek
- `WrittenSubG3Column.tsx` – **újrahasznosítható** írásbeli kivonás-oszlop (a VIII. fejezet tudáspróbája és a XII. fejezet is használja). Props: `minuend`, `subtrahend`, `result`, `exchanges` (felváltás utáni értékek jobbról, pl. `[13, 7]`; az eredeti jegy áthúzva), `op` ('−' vagy '+' az ellenőrzéshez), `cols`, `header`, `colored`, `highlight`, `grid`, `exchangeRow`, `noResult`, `cell`, `className`; jegy-szövegben `'?'` = keresett, `'_'` = üres doboz, `' '` = még nincs. Beágyazható `WrittenSubG3ColumnG` + `columnSubSize`. Segédek: `subSteps(a, b)`, `exchangeMarks`, `spokenSubStep` (a könyv szavaival, a 0-s tízes esetét is), `fillUpText` (pótlás).
- `WrittenSubG3Figures.tsx` (StepsNoExchangeSvg, FillUpStepsSvg, ExchangeOnesSvg, ExchangeTensSvg, ExchangeBothSvg, ZeroTensSvg, CheckSvg, WordPlanSvg), `WrittenSubG3CardFigures.tsx` (MiniCol), `WrittenSubG3Theory.tsx`, `WrittenSubG3Quiz.tsx` (`WRITTEN_SUB_G3_QUESTIONS`, 30 kérdés), `WrittenSubG3Matcher.tsx`, `WrittenSubG3Sorter.tsx`, `index.ts`.
- Teszt: `src/test/grade3Topic8WrittenSubG3.test.tsx` (az algoritmus helyességét is ellenőrzi 100–500 között). Aktivitás-azonosító: `g3-wsub-irasbeli`.

## Eltérések a tankönyvtől
- **Felváltás jelölése:** a könyv az oszlopba semmit nem ír, a felváltott értéket fejben kell tartani (90–93. o.). A gyerekek ezt a legkönnyebben a felváltott 1 elfelejtésével rontják el (MF 8. o. 7. feladat hibái is ilyenek). Nálunk a tanulás elején kis zöld számok mutatják a felváltás utáni értéket (12, 6), és ki lehet kapcsolni őket – a kvíz ábrái a könyvhöz hűen jelölés nélküliek.
- **Pótlás:** a könyv a pótlást csak felváltás nélküli esetre mutatja; mi is csak ott használjuk, nem keverjük a felváltással (nem tanítjuk a könyvben nem szereplő „maradékos” pótlást).
- **0 a tízeseknél (93. o.):** a könyv egy képpel és egy mondattal intézi el; nálunk külön lépésként kimondjuk és a laborban külön feladattípus („9 tízesre és 10 egyesre”).
- **12. feladat (92. o.)** „Gyakorold az írásbeli kivonást!” sorában a 266 − 157 és a 437 − 145 csak egyszer kíván felváltást, miközben a mintapélda (315 − 128) kétszeres felváltást mutat – a könyv nem jelzi a típusváltást. Nálunk a feladattípus mindig meg van nevezve (labor gombjai, csoportosító 1. szint).
- **91. o. 9. feladat:** a „százasra kerekített becslés” több tételnél értelmetlen (226 − 174 ≈ 0) – lásd a 2. lecke README-jét; mi tízesre kerekítve becslünk a szöveges feladatban.
- A szöveges feladat lépéseit (Adatok – Terv – Becslés – Számítás – Ellenőrzés – Válasz) megtartottuk, de saját történettel (moziterem, menza, tulipán, lufi, futóverseny).
- Ellenőrzés: a könyv háromféle ellenőrzést mutat egyszerre; mi az összeadásosat tesszük első helyre („különbség + kivonandó = kisebbítendő”), a kivonásosat „vagy”-ként.
- Saját számok mindenhol; a munkafüzet „hibás kivonások” feladatának mintájára készült kvízkérdés is saját számokkal (326 − 118 = 218?).
- Számkör: 500-ig, ahogy a könyv (a 1000-ig terjedő írásbeli kivonás a XII. fejezetben jön).

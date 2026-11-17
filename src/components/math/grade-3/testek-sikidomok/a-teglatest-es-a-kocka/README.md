# 2. A téglatest és a kocka (3. osztály, X. Testek, síkidomok)

**Források:** tankönyv OH-MAT03TA 102–103. oldal; munkafüzet OH-MAT03MA II/25–26. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 102/1.:** téglatestek építése kis kockákból; keret: „Ezeknek a testeknek a neve téglatest. – Ez a test a kocka.”; kockák kiválasztása tárgyfotók közül; téglatest alakú tárgyak a teremben. **102/2.:** téglatest építése 12, 20, 24, 30 kis kockából (több megoldás), majd színes rudakból. **102/3.:** építmények kiegészítése kockává („Legalább hány kis kocka kell még?”).
- **TK 103/4.:** a kocka és a téglatest lapjai, egyforma lapok kifestése, a lapok körberajzolása; keret: a kocka és a téglatest hálója, „A kockát hat négyzet alakú lap, a téglatestet hat téglalap alakú lap határolja.” **103/5.:** „Melyik testre gondoltunk?” állítások a lapokról. **103/6.:** kakukktojás.
- **MF II/25–26.:** dobozok (téglatest / kocka), kódtáblázat, hálók kiszínezése, téglatestek és kockák bekarikázása, alaprajz szerinti építés + kiegészítés kockává, egy színes téglatest hálójának kiszínezése.

A könyv szavai: *téglatest, kocka, lap, határolja, testháló, kis kocka, kockává kiegészít*. **Él, csúcs (testnél), nézetek nincsenek** – a mappa korábbi README-je ezeket írta (12 él, 8 csúcs, elölnézet…), mi nem vezetjük be őket.

## Mit csinál a DiákZóna lecke?

A téglatest 6 téglalap alakú lapja, a **szemben lévő lapok egyformák** (3 pár, legfeljebb 3-féle lap), a kocka 6 egyforma négyzete, **a kocka is téglatest**; a kocka és a téglatest **hálója** (nem minden 6 négyzet jó!); téglatest építése kis kockákból **rétegenként** (egy réteg: egy sorban · sorok száma; a takart kockák is számítanak), kiegészítés kockává. Saját feladatok: dobókocka szemközti lapjai (összesen 7 pötty), matricák a dobozokon, 4 kockás rudak.

## Komponensek

1. **`CuboidG3Parts.tsx`** – `Box` (téglatest dobozba igazítva, takart élek szaggatottak; az 1. lecke `PolySolid` rajzolóját használja), `cuboidPlan`, kockaháló-ellenőrző `foldsToCube` (a kockát cellánként végiggörgeti a hálón), `CUBE_NETS_OK` (9 jó háló), `CUBE_NETS_BAD` (9 rossz alakzat), `NetGrid`, `CuboidNet` (téglatest hálója), `DieFace`.
2. **`CuboidG3Figures.tsx`** – `CuboidsAndCubeSvg`, `OppositeFacesSvg`, `CubeNetSvg`, `LayersSvg`, `CompleteCubeSvg`.
3. **`CuboidG3CardFigures.tsx`** – `BoxCard`, `NetCard`, `CuboidNetCard`, `CubesCard`, `DieCard`.
4. **`CuboidG3Theory.tsx`** – Mit tanulunk?, a téglatest lapjai (3 pár), a kocka és a hálója, építés rétegenként, kiegészítés kockává, 3 mintapélda, „Vigyázz!” (a takart kockák; egy 12 kockás rúdnak is 6 lapja van).
   - **Labor I – Forgasd meg a téglatestet!** Animáltan forgatható téglatest (oldalra / előre billentve, 90°-onként), a takart élek szaggatottak. A gyerek a lapokra koppint, a lap a méretének megfelelő színt kap (a szemközti lapok egyformák → ugyanaz a szín). 6/6 után: „Hányféle méretű lapja van?” (1 – kocka, 2 – két négyzet végű, 3). „Új feladat”: másik téglatest.
   - **Labor II – Építs téglatestet!** Cél: N kis kocka (6, 8, 12, 16, 18, 24). Léptetőkkel: egy sorban / sorok / rétegek; élőben megépül, kiírja a szorzatot. Gyűjti a különböző megoldásokat (az elforgatott ugyanannak számít), mutatja, hány van összesen. „Új feladat”.
5. **`CuboidG3Quiz.tsx`** – `CUBOID_G3_QUESTIONS`: 30 kérdés (10/10/10), 27 kérdésnél ábra, badge-ek, 3 puska. `g3-geom-teglatest-quiz`.
6. **`CuboidG3Matcher.tsx`** – `CUBOID_G3_MATCHER_LEVELS`: kép/kérdés ↔ tulajdonság (5/8 kép); kis kockás téglatest ↔ kockák száma (8/8); „Egészítsd ki kockává!” építmény ↔ „még N kocka” (8/8). `g3-geom-teglatest-matcher`.
7. **`CuboidG3Sorter.tsx`** – `CUBOID_G3_SORTER_LEVELS`: kocka / téglatest, de nem kocka / nem téglatest; kocka hálója / téglatest hálója / nem lesz belőle kocka (27 kép, egyszínű hálók); 8 / 12 / 18 kis kocka. `g3-geom-teglatest-sorter`.

**Teszt:** `src/test/grade3Topic10CuboidG3.test.tsx` (a hálók besorolását is ellenőrzi a `foldsToCube` függvénnyel).

## Eltérések a tankönyvtől

- **„Melyik testre gondoltunk?” (TK 103/5b):** „Van négyzet alakú lapja.” – erre a képen három test is igaz (a négyzet végű hasáb, a négyzet alapú gúla és a kocka), a kérdés mégis egy testre kérdez. Nálunk minden rejtvény pontosan egy testre igaz (az 1. lecke laborja ezt a géppel garantálja).
- **„Hány különböző méretű lap határolja a téglatestet?” (TK 103/4b):** nincs egyetlen válasza (3, 2 vagy kocka esetén 1). Nálunk: legfeljebb 3-féle; két négyzet végnél 2; kockánál 1 – a labor mindhárom esetet megmutatja.
- **A kocka is téglatest (TK 102 kerete):** a nyilak a kockára is mutatnak a „téglatest” felirattól, de ezt a könyv nem mondja ki, és rögtön utána „Ez a test a kocka.” áll. Nálunk kimondjuk: a kocka olyan téglatest, amelynek minden lapja egyforma négyzet; a csoportosítóban ezért „téglatest, de nem kocka” a címke.
- **Rossz háló magyarázat nélkül (MF II/25/2d):** a 6 négyzet egy sorban hálóként szerepel a kiszínezendők között, de sehol nem derül ki, hogy ebből nem lesz kocka. Nálunk „Nem minden 6 négyzet jó!” doboz, kvízkérdés és egy egész csoportosító-szint szól erről (a besorolást program ellenőrzi).
- **A takart kockák:** a könyv rajzain sok kis kocka nem látszik, a szöveg ezt nem jelzi. Nálunk a rétegenkénti számolás a módszer, a „Vigyázz!” doboz szerint a látható kockák száma a tipikus hiba.
- **Tudatos didaktikai változtatások:** forgatható, festhető téglatest (a könyvben fogkrémes dobozt kell festeni); a 12, 20, 24, 30 kockás feladat helyett a laborban a gép gyűjti a különböző megoldásokat; saját feladat a dobókocka szemközti lapjairól (7 pötty) – ez a könyvben nincs, de a „szemközti lapok” fogalmát gyakoroltatja.

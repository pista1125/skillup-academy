# 4. A különbség változásai

**Fejezet:** VIII. Írásbeli kivonás (`irasbeli-kivonas`, topicId `g3-written-subtraction`)
**Activity base id:** `g3-wsub-valtozasok` (`-quiz`, `-matcher`, `-sorter`)

## Források
- Tankönyv (OH-MAT03TA) **94. o.** – A különbség változásai
- Munkafüzet II (OH-MAT03MA_II) **12–13. o.**

## Mit tartalmaznak a könyv oldalai?
- **TK 94/1:** három pénzes szöveges feladat (ugyanannyi pénz, más árú vásárlás; különböző pénz, ugyanaz az ár; ugyanannyi pénz, más maradék → ki költött többet).
- **TK 94/2:** kivonáspárok összehasonlítása „számítás nélkül”, majd ellenőrzés írásbeli kivonással.
- **TK 94/3:** A − B = C táblázat, rajzok a hiányzó számok helyén, szabálykeresés.
- **TK 94/4:** korkülönbség 15 év múlva.
- **MF II/12/1–2:** a kisebbítendő / a kivonandó / mindkettő változik (nyilas láncok, oszlopos kivonások).
- **MF II/13/3:** ikrek ugyanannyi pénzzel, szakaszos ábra; **13/4:** <, >, = számolás nélkül; **13/5:** pénztárca áthúzott érmékkel.

## Mit csinál a DiákZóna lecke?
Saját példákkal, saját szereplőkkel (Nóri, Ádám, Panna, Levente, Luca, Olivér, Lili, Bence, Botond, Márk, Hanga, Panni, Emma) tanítja a három szabályt:
1. a **kisebbítendő** változik → a különbség **ugyanarra** változik;
2. a **kivonandó** változik → a különbség **fordítva** változik („ha többet veszel el, kevesebb marad”);
3. **mindkettő ugyanannyival, ugyanarra** változik → a különbség **nem változik** (korkülönbség, állandó különbség táblázat);

és ebből az **okos kivonást** (435 − 198 = 437 − 200), valamint az összehasonlítást számolás nélkül.
Színkód végig: kisebbítendő = kék, kivonandó = narancs, különbség = zöld; a változás nyila zöld (+) vagy piros (−).

- **Labor I – Különbség-változtató:** a gyerek ±1/±10/±100 gombokkal változtatja a kisebbítendőt és a kivonandót, közben élő csíkos ábra mutatja a különbséget (zöld rész). Cél: „a különbség legyen 10-zel kisebb / ne változzon …”. A visszajelzés megmondja, mennyit változott a különbség, és külön jelzi a tipikus hibát („Pont fordítva lett! Ha a kivonandó nő, a különbség csökken.”). A kivonandó sosem lehet nagyobb a kisebbítendőnél (nincs negatív szám).
- **Labor II – Számolás nélkül!:** véletlen kivonáspárok, <, =, > választás; a rossz válasznál célzott tipp (ha a gyerek a kivonandó változását „összeadásként” kezeli), jó válasznál indoklás + számolt ellenőrzés.
- **Kvíz:** 30 kérdés (10/10/10), 22 ábrával (kivonás-sorok változásnyilakkal, pénztárca, árcédulák, életkor-táblázat, állandó különbség táblázat, csíkos ábra, okos kivonás).
- **Párosító:** 1. szint egy szám változik (kép + különbség → új különbség), 2. szint két szám változik (kép → „90-nel nő” …), 3. szint okos kivonás (kép → eredmény).
- **Csoportosító:** 1. szint nő / marad / csökken, 2. szint 10-zel nő / 10-zel csökken / nem változik, 3. szint 450 − 250 = 200-hoz hasonlítás.

## Komponensek
- `DiffChangesG3Parts.tsx` – közös rajzelemek (DiffRowsG/Fig, DiffBarsG, DiffTableFig, CompareFig, Coin, PriceTag, NumBox, ins/changeText/signed)
- `DiffChangesG3Figures.tsx` – DiffChangesMinuendSvg, DiffChangesSubtrahendSvg, DiffChangesWalletSvg, DiffChangesAgeSvg, DiffChangesTableSvg, DiffChangesCleverSvg
- `DiffChangesG3CardFigures.tsx` – MiniTwoChanges, MiniShift, SortChange (kártyaábrák)
- `DiffChangesG3Theory.tsx` – DiffChangesG3Theory (+ makeGoalTask, checkGoal, makeCompareTask, goalText)
- `DiffChangesG3Quiz.tsx` – DiffChangesG3Quiz, DIFF_CHANGES_G3_QUESTIONS
- `DiffChangesG3Matcher.tsx` – DiffChangesG3Matcher, DIFF_CHANGES_G3_MATCHER_LEVELS
- `DiffChangesG3Sorter.tsx` – DiffChangesG3Sorter, DIFF_CHANGES_G3_SORTER_LEVELS
- Teszt: `src/test/grade3Topic8DiffChangesG3.test.tsx`

## Eltérések a tankönyvtől
- **TK 94/2 „Melyik a nagyobb? Mennyivel?”** – a b), e) és f) párban a két különbség **egyenlő** (120 = 120, 120 = 120, 139 = 139), a kérdés mégis azt sugallja, hogy az egyik nagyobb. Nálunk az összehasonlításnál mindig van „Egyenlők.” / „=” lehetőség, és a kérdés így szól: „Melyik jel illik a körbe?”.
- **TK 94/1b ábra:** a két persely között „100 Ft >” jel áll – ez nem szabályos jelölés (a relációs jel mellé írt összeg), könnyű félreérteni. Nálunk szöveg és csíkos ábra mutatja, kinek mennyivel több.
- **TK 94/3:** a hiányzó számok helyén tárgyrajzok (ütő, korcsolya, gördeszka, labda) állnak, a könyv máshol □ △ ○ jelet használ. Nálunk egységesen piros „?” jelöli a keresett számot.
- **MF II/12/2 d):** a lánc következő kivonásai már ki vannak nyomtatva (elárulják a lépést), és a nyilak felirata (pl. „− 20”) nem egyértelmű, hogy a kisebbítendőre vagy a kivonandóra vonatkozik. Nálunk mindkét számnak saját, színes nyila van, és a keresett érték „?”.
- **MF II/13/3 szakaszos ábra:** csak az elköltött összegek (320 Ft, 310 Ft) szakasza látszik, a megmaradt pénzt a gyereknek kell „kiolvasnia” a hiányzó részből. Nálunk a különbség (ami marad) külön, zöld színnel látszik a csíkon.
- **Didaktikai változtatás:** a könyv csak felfedeztet („Keressetek összefüggéseket!”), a szabályt nem mondja ki. Nálunk a felfedezés után röviden, egyszerű szavakkal kimondjuk a három szabályt, és külön „Vigyázz!” dobozban kiemeljük a leggyakoribb hibát: a kivonandó nő → a különbség **csökken**.
- **Didaktikai változtatás:** az okos kivonást (kerek kivonandóra kiegészítés mindkét szám azonos változtatásával) az állandó különbség alkalmazásaként külön tanítjuk, és szembeállítjuk az összeadás „átrakásos” trükkjével (VII. fejezet 4. lecke), mert a gyerekek gyakran összekeverik (435 − 198 ≠ 433 − 200).
- **Didaktikai változtatás:** a laborban élő csíkos ábra mutatja, hogyan nő vagy fogy a különbség, miközben a gyerek a két számot változtatja – ezt papíron nem lehet.
- **Számkör:** a könyv VIII. fejezete (TK 86–97, MF II/4–18) végig 500-as számkörben marad, a 0–1000 számkör csak a XI. fejezetben jön. Ezért a lecke minden száma (a laborok véletlen feladatai is) legfeljebb 500.

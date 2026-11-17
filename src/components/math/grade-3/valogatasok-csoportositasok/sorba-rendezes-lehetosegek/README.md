# 3. Sorba rendezés és lehetőségek (VI. Válogatások, csoportosítások)

## Források
- Tankönyv (OH-MAT03TA): **68–73. o.** (a fejezet oldalai), valamint a könyv többi apró sorrend- és lehetőség-feladata:
  **4/1d** (3 tagú család sorrendje), **9/6** (kétjegyű számok számkártyákból), **23/6** (útvonalak), **55/13** (háromjegyű számok 3 kártyából, 0-val is),
  **63/14** (lóverseny-sorrend feltétellel), **65/6** (500-nál kisebb számok kártyákból), **67/2–4** (Kitekintő: párválasztás, ki hányadik, nyilas magassági sorrend), **86/2** (4 játék sorrendje feltétellel).
- Munkafüzet I (OH-MAT03MA_I): **77–80. o.** (igaz/hamis állítások halmazokról: 77/2, 77/3, 80/10b).

## Mit tartalmaznak a könyv oldalai?
- TK 68–73: csoportosítás tulajdonság szerint, logikai lapok, válogatási fa (69/5), halmazábrák, **igaz/hamis állítások** a logikai lapokról („mindegyik”, „van közöttük olyan”, „nincs közöttük olyan”, 70/9), jelekkel megadott lap (70/11), adatkártyák több feltétellel (72/15), kakukktojás, sorozat folytatása (72/17).
- A „hányféleképpen?” és a sorba rakás a fejezetben **nincs külön tanítva**: a könyv a fenti oldalakon szétszórtan, módszer nélkül kérdezi („Gyűjtsétek össze az összes lehetőséget!”).
- MF 77–80: halmazábrába írás, „Melyik lapot vennétek el, hogy igaz legyen az állítás?” (77/2), I/H állítások számhalmazról (77/3) és élőlényekről (80/10b).

## Mit csinál a DiákZóna-lecke?
- **Sorba rendezés**: növekvő / csökkenő sorrend (kockatornyok, számok ≤ 500), nyilas ábra („a nyíl az alacsonyabbtól a magasabb felé mutat”).
- **Hányféle sorrend?** 2 dolog → 2, 3 dolog → 6; rendszerezés: *először az első helyet rögzítjük* (3 · 2 = 6), a lehetőségek fája.
- **Számkártyák**: háromjegyű számok 3 kártyából; ha van 0, csak 4 szám (a 0 nem állhat elöl); legnagyobb / legkisebb / páros szám.
- **Párosítás**: öltözetek (2 póló · 3 nadrág = 6), útvonalak (2 · 3 = 6) – szorzunk, nem adunk össze; és a „sorrend mindegy” eset (2 gombóc 3 ízből = 3).
- **Igaz vagy hamis?** „minden”, „van olyan”, „egyik sem / nincs olyan” logikai lapokra és számokra.
- 2 labor: **Sorrendkereső** (golyók vagy 0–4 számkártyák; a gyerek kirakja a sorrendeket, a gép jelzi az ismétlést és a 0-val kezdődő „számot”, számolja a megtaláltakat, tippet ad) és **Igaz vagy hamis?** (6 véletlen logikai lap + véletlen állítás; a válasz után bekeretezi a cáfoló / igazoló lapot).

## Komponensek
- `ArrangementsG3Theory` – tananyag (topicId `g3-grouping`)
- `ArrangementsG3Quiz` – 30 kérdés (`ARRANGEMENTS_G3_QUESTIONS`), topicId `g3-grp-lehetosegek-quiz`
- `ArrangementsG3Matcher` – 3 × 8 pár (`ARRANGEMENTS_G3_MATCHER_LEVELS`), `g3-grp-lehetosegek-matcher`
- `ArrangementsG3Sorter` – 3 szint × 3 kategória × 9 elem (`ARRANGEMENTS_G3_SORTER_LEVELS`), `g3-grp-lehetosegek-sorter`
- Ábrák: `ArrangementsG3Figures` (OrderByHeightSvg, ArrowOrderSvg, ThreeOrdersSvg, OrderTreeSvg, DigitCardsSvg, OutfitsSvg, StatementsSvg), kártyaábrák: `ArrangementsG3CardFigures`, közös elemek: `ArrangementsG3Parts` (a logikai lapot az 1. lecke `SortingByPropertyG3Parts` fájlja rajzolja, hogy a fejezetben mindenhol ugyanúgy nézzen ki).
- Teszt: `src/test/grade3Topic6ArrangementsG3.test.tsx`

## Eltérések a tankönyvtől
1. **A módszert tanítjuk, nem csak kérdezzük.** A könyv (TK 4/1d, 55/13, 65/6, 63/14, 67/2, 86/2) többször kérdezi, „hányféle sorrendben”, „gyűjtsd össze az összes lehetőséget”, de sehol nem mutatja meg, hogyan lehet biztosan mindet megtalálni. A DiákZóna lépésről lépésre tanítja: első hely rögzítése → csere, lehetőségek fája, táblázat; és előbb 2, aztán 3 elemmel.
2. **TK 4/1d** a tanév legelső leckéjében, eszköz nélkül kérdezi a 3 tagú család sorrendjeit. Nálunk ez itt, a rendszerezés után jön.
3. **TK 55/13b** (4, 3, 0 kártyák) csak annyit kérdez: „Mit tapasztaltatok?”. Mi kimondjuk a szabályt: a 0 nem állhat elöl, ezért 6 helyett csak 4 háromjegyű szám van – és a laborban a gép külön jelzi, ha a gyerek 0-val kezd.
4. **TK 65/6** („500-nál kisebb számok, minél több megoldás”) nyitva hagyja, hány megoldás van. Mi mindig pontos darabszámot kérünk és ellenőrzünk (pl. 1, 4, 6 kártyából 4 ilyen szám).
5. **MF 77/3** „Van olyan szám, amelyben benne van a legkisebb alaki értékű számjegy” – nehézkes és félrevezető megfogalmazás (az alaki érték maga a számjegy; a mondat egyszerűen a 0-t jelenti). Nálunk az állítások rövidek, egy tulajdonságot mondanak ki.
6. **MF 80/10b** „Van olyan élőlény…, amely nem növényevő és nem emlős” – a listában növények és gomba is vannak (kökény, őzlábgomba), rájuk a „növényevő” szó nem értelmezhető, így az állítás kétértelmű. Mi csak olyan tulajdonságról mondunk állítást, amely minden elemre egyértelműen igaz vagy hamis.
7. **Jelölés egységesítése.** A könyv a nem lyukas lapot egyszer „nem lyukas”-nak (TK 70/11), máskor „sima”-nak (MF 79/9) hívja. A fejezet leckéi egységesen a „lyukas / nem lyukas” szópárt használják. A TK 70/9 ábráján a „kék” lapok világos égszínkékek – mi egyértelmű kéket rajzolunk.
8. **„Minden” – „van olyan” – „egyik sem” szabálya.** A könyv (TK 70/9, MF 77/2–3) gyakoroltatja, de nem mondja ki, mikor hamis egy „minden” állítás. Nálunk: „egy rossz is elég, és hamis”, „egy jó is elég, és igaz”; a laborban a gép bekeretezi a cáfoló lapot. A kettős tagadást („Egyik lap sem nem lyukas”) a generátor kizárja.
9. **Szorzás vagy összeadás?** Az öltözet- és útvonalfeladatoknál (TK 23/6) külön „Vigyázz!” doboz figyelmeztet a tipikus 2 + 3 = 5 hibára; a kvíz rossz válaszai között ez a hiba szerepel.
10. **Sorrend számít / nem számít.** TK 67/2 (két ló, négy gyerek) a párválasztást ugyanúgy kérdezi, mint a sorrendet. Mi külön megmutatjuk, hogy a „csoki-eper” ugyanaz a fagyi, mint az „eper-csoki” (3 ízből 2 gombóc = 3, nem 6).
11. Saját feladatok, saját számok és szereplők (Levi, Panna, Dóri, Kata, Dani, Bori…); minden kirakott szám ≤ 500 (a labor számkártyái 0–4 közül kerülnek ki).

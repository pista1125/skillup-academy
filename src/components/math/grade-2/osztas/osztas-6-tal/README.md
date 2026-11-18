# 5. Osztás 6-tal

## Források
- Tankönyv II. kötet (`OH-MAT02TA_II.pdf`, PDF-oldal = nyomtatott + 2): 23–25. o. *Szorzás, osztás 6-tal*, 26–27. o. *A 2-es, 3-as, 6-os szorzótáblák kapcsolata*, 28. o. szöveges feladatok, 29. o. *Maradékos osztás 6-tal*.
- Munkafüzet II. kötet (`OH-MAT02MA_II.pdf`): 19–21. o. *Szorzás, osztás 6-tal*, 22. o. *Maradékos osztás 6-tal*.

## Mit tartalmaznak a könyvoldalak?
- **TK 23–25:** hatos ugrások, ceruzás dobozok táblázata (`12 : 6`-tól `60 : 6`-ig, mellette a szorzás), matricaalbum (oldalak ↔ matricák), hiányzó számok (`36 : 6 = □`, `□ : 6 = 7`, `24 : □ = 4`), „hatszorosa / hatoda” nyíldiagramok.
- **TK 27/3:** láncnyilak — `: 3`, majd `: 2` (és fordítva) ugyanaz, mint `: 6` (`24 → 8 → 4`, `18 → 9 → 3`, `30 → 10 → 5`).
- **TK 28:** szöveges feladatok (60 rajzszög 6-osával, 54 lap hatosával).
- **TK 29:** írószerek hatosával gumizva — „Ennyi csomagja lett / Ennyi darab nem került csomagba”, `□ · 6 + □ = □□`; 16 szál virág hatosával csokorba.
- **MF 19–22:** színezett téglalapokról osztás, kép–művelet párosítás (`24 : 6`, `12 : 6`), csomagolás hatosával táblázatban, azonos rajzok = azonos számok, csoportosítás hatosával (ecsetek, filcek), 25 szék hatosával sorokba, 56 szalvéta.

## A DiákZóna lecke
- **Tananyag:** dobozolás hatosával (bennfoglalás, „a 18-ban a 6 megvan 3-szor”), szétosztás 6 tányérra (egyenlő részekre osztás, „a 12 hatoda 2”), a `:` jel olvasata, szorzás–osztás párok táblázata, ellenőrzés szorzással, hatoda/hatszorosa nyíldiagram, lépésenkénti osztás (`: 3`, majd `: 2`), **maradékos osztás 6-tal** (`23 = 3 · 6 + 5`, a maradék 0–5), 3 mintapélda (tojásdobozok, hat barát, csokrok maradékkal), Vigyázz! (`24 : 6` ≠ `24 − 6`; legfeljebb 5 maradhat).
- **Labor I – Dobozolj hatosával!:** a gyerek dobozokat tölt meg a kint lévő tojásokból (6-6), amíg lehet; aztán megadja a dobozok számát és a maradékot (0–5). Maradékos és maradék nélküli feladatok vegyesen, „Új feladat”.
- **Labor II – Szétosztás 6 tányérra:** „1-1 sütit minden tányérra” gombbal oszt, majd megadja, mennyi jutott egy tányérra; tipp a kivonásos hibára (`n − 6`).
- **Kvíz:** 30 kérdés (10/szint), 20 kérdésábra. **Párosító:** 3 × 8 pár, **Csoportosító:** 3 × 3 × 9 elem, szintenként ≥ 4 kártyaábra.
- Számkör: ≤ 60; `+`, `−`, `·`, `:`.

## Fájlok
- `Div6G2Parts.tsx` — közös SVG-elemek (`EggBoxPart`, `EggBoxesPart`, `LooseEggsPart`, `PlatePart`, `SixPlatesPart`, `DicePart`, `JumpLinePart`, `ArrowPairPart`, `ChainPart`) és a két labor (`PackLab6`, `ShareLab6`)
- `Div6G2Figures.tsx` — `PackSixSvg`, `ShareSixSvg`, `MultDivPairSvg`, `SixthSvg`, `StepDivSvg`, `RemainderSixSvg`
- `Div6G2CardFigures.tsx` — `LooseCard`, `PackedCard`, `PlatesCard`, `JumpsCard`, `SixthCard`
- `Div6G2Theory.tsx`, `Div6G2Quiz.tsx` (`g2-osztas-6-quiz`), `Div6G2Matcher.tsx` (`g2-osztas-6-matcher`), `Div6G2Sorter.tsx` (`g2-osztas-6-sorter`)
- Teszt: `src/test/grade2Topic5Div6G2.test.tsx`

## Eltérések a tankönyvtől
- **Ellentmondó szöveg javítva:** a MF 22/3 szerint 56 szalvétát „egyenlően szétosztottak, mindenkinek 6 jutott”, majd azt kérdezi, maradt-e szalvéta (56 = 9 · 6 + 2). Ha egyenlően mind szét lett osztva, nem maradhat — nálunk a maradékos feladatok mindig „csomagolsz / dobozolsz, mennyi marad kint?” formájúak.
- **Kétértelmű kérdés javítva:** a MF 22/2 „25 széket hatosával sorokba rendezik. Hány sorba került szék?” — a válasz 4 teli sor vagy 5 sor (az ötödikben 1 szék) is lehet. A DiákZóna mindig külön kérdezi: „Hány doboz telik meg?” és „Mennyi marad?”.
- **Táblán kívüli osztás kerülve:** a MF 20/1 `32 : □ = 4` és `□ : 4 = 9` feladatai a 8-as és a 4-es táblát kérik a 6-os leckében, a MF 21/4 `21 : 3`-at. A lépésenkénti osztásnál (TK 27/3) csak olyan példát használunk, ahol mindkét lépés a már ismert 2-es és 3-as táblában van (`24 : 3 = 8`, `8 : 2 = 4`; `18 : 2 = 9`, `9 : 3 = 3`).
- **Maradékos írásmód:** a könyv `□ · 6 + □ = □□` keretet ad (TK 29); mi ugyanezt teljes alakban írjuk (`23 = 3 · 6 + 5`), mellette szóban: „3 doboz lett, és maradt 5”. Kimondjuk és gyakoroltatjuk, hogy a maradék legfeljebb 5.
- **Saját feladatok és szereplők:** a könyv szereplői (Ádám, Lilla, Éva néni, Máté, Viki stb.) és tárgyai (filcek, zsírkréták, rajzszögek, gemkapcsok) helyett tojásdobozok, sütik tányéron, cseresznye, padok, csokrok, matricák és saját nevek.
- **Interaktivitás:** a papíron karikázós csoportosítás (TK 29/1, MF 22/1) helyett élő dobozoló és szétosztó labor ad azonnali visszajelzést, a gyerek tipikus hibáját megnevezve (az összeset adja meg, vagy kivon a hányados helyett).

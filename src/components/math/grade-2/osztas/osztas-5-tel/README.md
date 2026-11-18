# 4. Osztás 5-tel

## Források
- Tankönyv I. kötet (`OH-MAT02TA_I.pdf`, nyomtatott oldalszám):
  - **124–126. o.** „Szorzás, osztás 5-tel” – bögrék szétosztása 5 tálcára, a bennfoglalótábla kezekkel („Hány kézen van 15, 35, 50 ujj?”), `35 : 5 = □` és `□ : 5 = 10` pótlás, csizmás láda-táblázat, „ötszöröse / ötöde” nyilak.
  - **127–129. o.** az 5-ös és 10-es tábla kapcsolata és a vásári szöveges feladatok (körhinta: 25 gyerek ötösével, életkor: 45 ötöde).
  - **130–131. o.** „Maradékos osztás 5-tel” – puszedli 5 családtagnak (28), csoportosítás ötösével `4 · 5 + 1 = 21` mintára, perec 23 petákért, gombok ingekre (33), csomagolás-táblázat, `19 = □ · 5 + ○` a legnagyobb számmal.
- Munkafüzet I. kötet (`OH-MAT02MA_I.pdf`): **75–79. o.** – édességek csoportosítása és osztás, igaz/hamis szívek (`40 : 5 = 6` hamis), összehasonlítás, „ötször annyi” / „ötöde” szöveges feladatok (perec, mézeskalács, hordó), maradékos osztás `4 · 5 + 2` mintára, palacsinta 5 gyereknek, fakanál-csomagolás táblázat.

## A DiákZóna lecke
Az osztás 5-tel két jelentése és a maradékos osztás (műveletek: + − · :).
- **Bennfoglalás:** hány ötös van benne? (ujjak → kezek, 5 Ft-osok, visszaugrás a számegyenesen).
- **Részekre osztás:** szétosztás 5 tányérra körönként; mindkettőt `:` jellel írjuk.
- **Ötszöröse / ötöde**, szorzás–osztás kapcsolat, osztótábla `5 : 5`-től `50 : 5`-ig, `0 : 5 = 0`.
- **Maradékos osztás a könyv jelölésével:** `23 = 4 · 5 + 3`, ill. `□ · 5 + ○ = 23`; a maradék mindig kisebb 5-nél.
- Szöveges feladatok (vásári zseton, padok, csomagolás, „ötször annyi” → ötöde), kétlépéses feladatok.
- **2 labor:** *Szétosztás 5 tányérra* (körönkénti osztás, „ennyi jut” és „ennyi maradt”); *Csomagolj ötösével!* (zacskózás, majd `□ · 5 + ○ = N` kitöltése, célzott hibaüzenet, ha a maradék ≥ 5).

## Fájlok
- `Div5G2Parts.tsx` – csoportosított pöttyök, tányér, keksz és a két labor (a kéz, érme, zseton, számegyenes elemeket a `szorzas/szorzas-5-tel/Mult5G2Parts.tsx`-ből veszi)
- `Div5G2Figures.tsx` – `FingersToHandsSvg`, `SharePlatesSvg`, `FifthArrowsSvg`, `BackJumpsSvg`, `RemainderGroupsSvg`
- `Div5G2CardFigures.tsx` – kártyaábrák (150 × 80 és 80 × 80; a `TargetCard*`-ot a Mult5G2 leckéből újraexportálja)
- `Div5G2Theory.tsx` – tananyag
- `Div5G2Quiz.tsx` – 30 kérdés (`g2-osztas-5-quiz`), 24 ábrával
- `Div5G2Matcher.tsx` – 3 × 8 pár (`g2-osztas-5-matcher`)
- `Div5G2Sorter.tsx` – 3 × 9 elem (`g2-osztas-5-sorter`)
- Teszt: `src/test/grade2Topic5Div5G2.test.tsx`

## Eltérések a tankönyvtől
- **TK 131/1. (gombok):** 33 gombot 3 gombos ingekre kell varrni – ez 11 ing, ami túllépi a 3-as szorzótáblát (10 · 3 = 30), és ebben a leckében nem az 5-tel osztás a téma. Nálunk minden maradékos feladat az 5-ös táblán belül marad (50-ig, legfeljebb 10 teli ötös).
- **MF 79/3. (fakanál):** „Hány zacskóra van szükség?” – a táblázat a *teli* zacskók számát várja (42 → 8), pedig a kérdés szó szerint azt kérdezi, hány zacskó kell (ez 9 lenne, a maradéknak is kell egy). Nálunk mindig „hány lesz **tele**” a kérdés, és külön feladat tanítja a különbséget (22 golyó: 4 teli zacskó, de 5 zacskó kell mindegyikhez).
- **TK 131/3.:** a `19 = 6 · □ + ○` és `39 = 9 · □ + ○` sorok a 6-os és 9-es szorzót keverik be, amit a gyerekek még nem tanultak. Nálunk csak a `□ · 5 + ○` alak szerepel.
- **Jelölés:** a könyv a maradékos osztást csak `4 · 5 + 1 = 21` alakban írja (nincs „maradék” jel az osztásban). Ezt követjük; a maradékot szóban mondjuk („3 marad”), és ○ jelöli.
- **MF 76/2. hamis szívek** (`40 : 5 = 6`, `30 : 5 = 5`) helyett igaz/hamis választó kérdés, ahol a rossz válaszok ugyanezek a tipikus hibák.
- **Pénz:** a könyv kitalált „peták” pénzét vásári zsetonra cseréltük; valódi forintot (5, 10 Ft) csak az érmék számolásánál használunk.
- A könyv a szorzást és az osztást egy leckében tanítja; nálunk a szorzás a `szorzas/szorzas-5-tel` leckében van, itt a szorzás csak ellenőrzésre és a maradékos alakban szerepel.
- Saját feladatok, számok és szereplők (keksz, golyó, ceruza, matrica, zseton).

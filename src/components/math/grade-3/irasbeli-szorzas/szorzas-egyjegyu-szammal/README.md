# 1. Szorzás egyjegyű számmal (3. osztály, XIII. Írásbeli szorzás)

**Források:** tankönyv OH-MAT03TA 122–123. oldal, munkafüzet OH-MAT03MA II. kötet 48–49. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 122.:** fejezetnyitó kép (könyvtár, nyitvatartás), adatleolvasás oszlopdiagramról, szorzások alkotása a képről.
- **TK 123.:** kerek tízesek szorzása egyjegyű számmal **pénzzel** (2 · 340 Ft = 340 Ft · 2, 100 Ft-os és 10 Ft-os érmék); szorzások (120 · 3 … 430 · 2); számok képzése számkártyákból és szorzásuk; **bontás**: 280 · 2 = 200 · 2 + 80 · 2 = 400 + 160 (kapcsos zárójellel); „Mely számok teszik igazzá?” (□ · 40 < 360 stb.).
- **MF 48–49.:** bélyegek (10 Ft, 100 Ft) – összeadás és szorzás; táblázat a felcserélhetőségről (7 · 110 = 110 · 7); képeslap feladása 4 · 120 Ft; minta: 4 · 180 = 4 · 100 + 4 · 80 = 400 + 320; ártáblázatok (130 Ft, 180 Ft, 150 Ft); szorzóláncok (140 ·2→ ·2→, alul az összevont szorzó).

**A könyv módszere:** csak **kerek tízeseket** (110–490) szoroz egyjegyű számmal, pénzzel kirakva, majd százasokra és tízesekre bontva. Egyesekkel is rendelkező számot (pl. 124) ebben a leckében még nem szoroz.

## Mit csinál a DiákZóna lecke?

A könyv sorrendjét követi: pénz → tízesek („12 tízes · 3 = 36 tízes”) → bontás → felcserélhetőség → szorzólánc → szöveges feladat. A végén **kitekintő** (3 · 124 = 300 + 60 + 12), amely előkészíti a 3. lecke írásbeli szorzását. Saját példák és helyzetek: belépő 230 Ft, 120 · 3 tízesekkel, zsírkréta 160 Ft, bábszínház, sütemény, füzet. Minden szorzat legfeljebb 1000.

## Komponensek

1. **`MulOneDigitG3Parts.tsx`** – a fejezet 1–3. leckéjének közös elemei: a VII. fejezet rajzelemeinek (érme, százaslap, tízesrúd, árcédula, tárgyikonok) újraexportálása; `szor(n)` („3-szor”, „5-ször”), `targy(n)` („a 2-t”, „az 5-öt”, „a 10-et”), `opts`, `ChoiceRow`, `KeyPad`, `CoinRow`, `MiniBlocks`, `BraceDown`, `QBox`, `OpArrow`; kérdésábrák: `CoinsQ`, `BlocksQ`, `TagQ`, `ChainQ`, `SplitQ`, `NumLineQ`, `CardsQ`.
2. **`MulOneDigitG3Figures.tsx`** – `CoinsMulSvg` (230 Ft · 3 pénzzel), `TensMulSvg` (120 · 3 = 36 tízes), `SplitMulSvg` (280 · 2 bontással), `SwapSvg` (4 · 120 = 120 · 4), `ChainSvg` (140 ·2 ·2 = ·4), `ThreePartSvg` (kitekintő: 3 · 124).
3. **`MulOneDigitG3CardFigures.tsx`** – `CardCoins`, `CardBlocks` (párosító), `SortBlocks`, `SortChain` (csoportosító).
4. **`MulOneDigitG3Theory.tsx`** – tananyag + 2 labor:
   - **Labor I – Bontsd és szorozd!** Véletlen kerek tízes (110–490) · 2…6, szorzat ≤ 1000, pénzsorokkal kirakva. Három lépés gombokkal: százasok · m, tízesek · m, összeadás. Célzott tipp: „40 = 4 tízes. 4 tízes · 3 = 12 tízes.”
   - **Labor II – Melyik szám illik?** „□ · 40 < 360” típus; a gyerek bejelöli az 1–9 közötti összes jó számot, ellenőrzés után színes visszajelzés (zöld jó, piros rossz, sárga kimaradt) és magyarázat az első hibához.
5. **`MulOneDigitG3Quiz.tsx`** – `MUL_ONE_DIGIT_G3_QUESTIONS`: 30 kérdés (10/10/10), 19 ábrával, badge mindenhol, 3 puska. `g3-wmul-egyjegyu-quiz`.
6. **`MulOneDigitG3Matcher.tsx`** – `MUL_ONE_DIGIT_G3_MATCHER_LEVELS`: kerek tízesek; bontással; egyesekkel is / hiányzó szám / lánc. `g3-wmul-egyjegyu-matcher`.
7. **`MulOneDigitG3Sorter.tsx`** – `MUL_ONE_DIGIT_G3_SORTER_LEVELS`: mekkora a szorzat (500 alatt / 500–800 / 800 fölött); ugyanannyi (600 / 800 / 900); mennyivel szoroztunk (·2 / ·3 / ·4). `g3-wmul-egyjegyu-sorter`.

**Teszt:** `src/test/grade3Topic13MulOneDigitG3.test.tsx`

## Eltérések a tankönyvtől

- **Számkörből kilógó feladat (MF 49/4.):** „6 · 180 = ?” – az eredmény 1080, ez túl van a 3. osztályos 1000-es számkörön. Nálunk minden szorzat legfeljebb 1000.
- **Végtelen sok megoldás (TK 123/5. c):** „□ · 40 > 360” – nincs megadva, milyen számok közül válasszunk, így végtelen sok jó szám van. Nálunk mindig kimondjuk: **1-től 9-ig** keresd a jó számokat.
- **„Mely számok teszik igazzá?” túl sok megoldással (TK 123/5. e):** „120 · 4 < □ < 210 · 3” – 149 szám jó, ezeket nem lehet felsorolni. Nálunk ilyenkor egy jó számot kell kiválasztani a felkínáltak közül.
- **A fejezetnyitó oldal (TK 122.) nem szorzás:** a könyvtáras kép és a diagram adatleolvasás; ebből nálunk csak a szöveges feladat helyzete maradt meg.
- **Tudatos didaktikai változtatások:**
  - A pénz és a bontás közé beiktattuk a **„tízesekkel ugyanúgy”** lépést (120 · 3 = 12 tízes · 3 = 36 tízes): így a gyerek a már tudott szorzótáblára épít.
  - A „Ne add hozzá, szorozd!” csapda (280 · 2 ≠ 200 · 2 + 80) a leggyakoribb bontási hibát mutatja meg.
  - Kitekintő a 3 · 124-re (három részre bontás), hogy a 3. lecke írásbeli szorzása ismerős legyen.
  - Saját szereplők és helyzetek; a könyv szereplői (Mona, Manó, Gergő) és adatai nem szerepelnek.

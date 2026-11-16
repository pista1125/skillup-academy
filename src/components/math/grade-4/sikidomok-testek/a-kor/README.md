# 2. A kör (V. Síkidomok és testek, 2. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., **117. oldal**) és munkafüzet (`OH-MAT04MA_II`, **29–30. oldal**) alapján kidolgozott modul 4. osztályosoknak.

---

## Tananyag Áttekintés

- **Tankönyv 117. o.:** kör alakú tárgyak (óra, gomb, érem, kerék, pénzérme, óriáskerék) – mi a közös bennük; a hulahoppkarika közepén álló gyerek és a karika pontjai ugyanolyan messze vannak egymástól; pénzérme körberajzolása; **kör rajzolása körzővel** (pont kijelölése, a körző hegyének beszúrása, körbeforgatás); érdekes formák körökből (ötkarika, malacka, virág); hány kört látsz (egymásba rajzolt és egymásba fonódó körök).
- **Munkafüzet 29. o.:** tárgyak, amelyekkel kört lehet rajzolni (termosz, pohár – nem: olló, vonalzó, répa, körte); **körlapok** kiválasztása ovális és sokszög alakzatok közül; szakaszok lemérése és kör rajzolása 3 cm-es, 2 cm-es, 1 cm-es **körzőnyílással** az O pontból.
- **Munkafüzet 30. o.:** a kör-hernyó: körök az O1–O5 pontból 13 mm-es, 15 mm-es, 1 cm-es, 1 cm-es, 13 mm-es körzőnyílással; 10 cm-es körzőnyílással rajzolt kör, kisebb és nagyobb körök ugyanazzal a középponttal; körökből álló minták színezési szabálya.

## Szabályok

- A kör minden pontja ugyanolyan messze van a kör **középpontjától** (jele: O).
- **Körvonal:** a kör széle; **körlap:** a körvonal a belsejével együtt. A kör síkidom, de nem sokszög.
- Körzővel rajzolunk: pont → körzőnyílás beállítása vonalzón → beszúrás → körbeforgatás.
- Nagyobb körzőnyílás → nagyobb kör. A kör szélessége a középponton át kétszerese a körzőnyílásnak (a modul ezt csak szövegesen, „a kör szélessége” néven használja).

> **Csapda:** a körzőnyílások összehasonlítása különböző mértékegységben (1 cm < 13 mm, mert 1 cm = 10 mm).

> **Javítás a régi README-hez képest:** a korábbi leírás „a sík azon pontjainak halmaza” definíciót, *r* és *d* betűjelöléseket és LaTeX képletet (d = 2 · r) adott. A 4. osztályos tankönyv és munkafüzet a **sugár** és az **átmérő** szót nem használja: a *középpont*, *körvonal*, *körlap*, *körző* és *körzőnyílás* fogalmakkal dolgozik. A modul ezt követi.

---

## Elkészített Komponensek

1. **`Circle4Figures.tsx`**
   - `RoundThingsSvg`: óra, gomb, érem, kerék, pénzérme.
   - `HulaHoopSvg`: a karika minden pontja ugyanolyan messze van az O középponttól.
   - `CompassStepsSvg`: a körzőhasználat 3 lépése.
   - `CircleOrNotSvg`: körvonal, körlap, ovális és tojás (nem kör).
   - `ConcentricSvg`: 1, 2, 3 cm-es körzőnyílással rajzolt körök közös középponttal, négyzethálón.
   - `CirclePatternsSvg`: ötkarika, malacka, virág körökből.
   - `Circle4Compass`: körző-rajz segédkomponens (a laborhoz is).
2. **`Circle4Theory.tsx`**: kör alakú tárgyak, középpont, körvonal és körlap, körzőhasználat, körzőnyílás és mértékváltás (táblázat), kidolgozott példák (kör-hernyó, hány kör), csapda.
   - **Labor I – Körző-labor:** a gyerek a rácson kiválasztja a beszúrás helyét, csúszkával beállítja a körzőnyílást (5–40 mm, vonalzón is látszik), egy második csúszkával körbeforgatja a körzőt, és a program ellenőrzi a feladatot (pl. „O pontból 13 mm-es körzőnyílással”). A körök a lapon maradnak (céltábla, minták).
   - **Labor II – Kör vagy nem kör?:** a pötty csúszkával körbejárja az alakzat szélét, közben élőben látszik a távolság a középponttól; a gyerek eldönti, kör-e (ovális, kör, négyzet, kisebb kör, hatszög).
3. **`Circle4Matcher.tsx`**: 3 szint × 8 pár (fogalmak, mértékváltás, szélesség ↔ körzőnyílás).
4. **`Circle4Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (körrajzolás tárgyakkal; kör / görbe, de nem kör / sokszög; 2 cm-nél kisebb / egyenlő / nagyobb körzőnyílás).
5. **`Circle4Quiz.tsx`**: 30 kérdés (10–10–10), 15 kérdésnél ábra, minden kérdésnek típus-címkéje van, 3 puskakártya.

Azonosítók: kvíz `g4-geom-kor-quiz`, párosító `g4-geom-kor-matcher`, csoportosító `g4-geom-kor-sorter`.

---

## Tesztelés

`src/test/grade4Topic5Circle4.test.tsx` – a 4 komponens és mind a 6 SVG ábra renderelése.

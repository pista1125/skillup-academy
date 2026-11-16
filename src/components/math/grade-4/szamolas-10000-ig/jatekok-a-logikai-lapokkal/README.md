# 8. Játékok a logikai lapokkal (I. témakör, 8. lecke – TK 31–32.)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 31–32. oldal) alapján kidolgozott modul. A leckéhez nincs munkafüzeti oldal.

> **Javítás a korábbi README-hez képest:** a készletben **3 forma** van (kör, négyzet, háromszög) – téglalap nincs; a negyedik tulajdonság a **lyukas / nem lyukas**, nem a vastagság. 4 szín · 3 forma · 2 méret · 2 = **48 lap**. (A tankönyv: „nem kör, tehát négyzet vagy háromszög”.)

---

## 🎯 Tananyag áttekintés

- **Tulajdonságok:** szín (piros, sárga, kék, zöld), forma (kör, négyzet, háromszög), méret (nagy, kicsi), lyukas / nem lyukas. Nincs két egyforma lap.
- **1. feladat – sorozatok:** egy tulajdonság változik (kicsi → nagy sárga négyzet; piros négyzet → lyukas piros négyzet; sárga → kék négyzet), illetve két tulajdonság (nagy piros háromszög → kicsi lyukas piros háromszög; nagy zöld kör → kicsi kék kör; nagy zöld kör → kicsi zöld háromszög).
- **2. feladat – szűrés állításokkal:** Négyzet vagy kör (32) → Csak görbe vonal határolja (16) → Nem lyukas (8) → Nem kék, és nem zöld (4) → Ha sárga, akkor kicsi (3) → Nem kicsi (1): **nagy, piros, nem lyukas kör**.
- **3. feladat – barkochba** igen/nem kérdésekkel.
- **4. feladat – hazudós barkochba:** minden válasz hamis → a lap: kicsi, kék, nem lyukas négyzet.
- **5. feladat – közös tulajdonságok száma:** nagy piros kör (0), kicsi lyukas sárga háromszög (2), kicsi lyukas kék négyzet (3) → a gondolt lap: **kicsi, zöld, lyukas négyzet**.
- **6. feladat – Rontó játék:** „Minden elem sárga” → „kicsi” → „kék vagy sárga” → „háromszög vagy kör”.
- **7. feladat – Én vagyok a szarka:** a kivett lap kikövetkeztetése a maradékból.

### Számolások (ellenőrizve a 48 lap felsorolásával)
piros: 12, kör: 16, nagy: 24, piros kör: 4, nagy piros: 6, kicsi és lyukas: 12, piros vagy kör: 24, nem piros és nem kicsi: 18, a nagy piros lyukas körtől pontosan 1 tulajdonságban különböző: 7.

> **⚠️ CSAPDA:** „piros vagy kör” nem 12 + 16 = 28, mert a 4 piros kört kétszer számolnánk. A „Ha sárga, akkor kicsi” a nem sárga lapokra is igaz.

---

## 💻 Elkészített komponensek

1. **`LogicBlocks4Figures.tsx`** (+ közös segédek: `BlockShapeG`, `ALL_BLOCKS`, `blockName`, típusok)
   - `LogicSetPropertiesSvg`: a 4 tulajdonság és a 4 · 3 · 2 · 2 = 48.
   - `OneChangeSequencesSvg`: TK 31/1. – egy tulajdonság változik.
   - `TwoChangeSequencesSvg`: TK 31/1. – két tulajdonság változik.
   - `CommonPropertiesSvg`: TK 32/5. – közös tulajdonságok táblázata.
   - `SpoilerGameSvg`: TK 32/6. – Rontó játék sorai.
2. **`LogicBlocks4Theory.tsx`**: a készlet, hány lap van egy-egy tulajdonsággal, sorozatok, szűrés állításokkal (és, vagy, nem, ha … akkor), hazudós barkochba, közös tulajdonságok, Rontó, szarka, csapda.
   - **I. Labor – Tulajdonság-szűrő:** szín (+ „nem”), forma, méret, lyuk gombok; mind a 48 lap látszik, a nem megfelelők elhalványulnak, darabszám kiírva.
   - **II. Labor – Barkochba:** a gép gondol egy lapra, a gyerek igen/nem kérdéseket tesz fel, a kizárt lapok elhalványulnak, a lapra koppintva tippelhet.
3. **`LogicBlocks4Matcher.tsx`**: 3 szint × 8 pár (hány ilyen lap; mit jelent az állítás; mi változott).
4. **`LogicBlocks4Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (nagy-lyukas / nagy-nem lyukas / kicsi; „Ha sárga, akkor kicsi” igaz-hamis; 1 / 2 / 3–4 változás).
5. **`LogicBlocks4Quiz.tsx`**: 30 kérdés (10 / 10 / 10), 14 ábrával, kérdéstípus-jelvényekkel, 3 puskakártyával. Progress-azonosító: `g4-count-logikai-lapok-quiz`.

---

## 🧪 Tesztelés

`src/test/grade4Topic1LogicBlocks4.test.tsx` – a 4 komponenst és mind az 5 SVG ábrát rendereli.

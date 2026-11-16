# 7. A római számok (I. témakör, 7. lecke – TK 28., MF I/19.)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 28. oldal) és munkafüzet (`OH-MAT04MA_I`, 19. oldal) alapján kidolgozott modul.

> **Javítás a korábbi README-hez képest:** a 4. osztályos tankönyv és munkafüzet csak az **I, V, X** jeleket használja, **1-től 39-ig** (pl. XXXIX). Az L, C, D, M jelek és az 1000-ig terjedő római számok nem szerepelnek a könyvben, ezért a modul sem tanítja őket.

---

## 🎯 Tananyag áttekintés

- **Jelek:** I = 1, V = 5, X = 10.
- **Összeadás:** a kisebb jel a nagyobb után → hozzáadjuk (VI = 6, XV = 15, XXVIII = 28).
- **Kivonás:** I a V vagy X előtt → elvesszük (IV = 4, IX = 9, XIX = 19, XXXIX = 39).
- Egy jel legfeljebb háromszor állhat egymás mellett, a V nem ismétlődik; nincs helyiérték és nincs 0.

### Tankönyv (TK 28.)
1. Római számmal: 37 = XXXVII, 5 = V, 9 = IX, 35 = XXXV, 26 = XXVI, 19 = XIX, 25 = XXV, 11 = XI, 28 = XXVIII.
2. Növekvő sorrend: IV, VI, IX, XI, XV, XX.
3. Számalkotás megadott jelekből (ugyanazokból a jelekből két szám, pl. X, V, I → XVI és XIV).
4. Képeslap: irányítószám XXIX = 29 → Mosolyfalva; VIII. kerület; XIX/25. → 19. emelet; XI. 2. → november.
5. Fejtörő: zöld = a húsz fele = X, kék = X tizede = I, sárga = I ötszöröse = V → XVI.

### Munkafüzet (MF I/19.)
1. Úszósapkák: V = 5, II = 2, XXV = 25, X = 10, XX = 20, VII = 7, XXX = 30; előttük/utánuk induló rajtszámok (pl. XXIV és XXVI).
2. Gyufaszálas egyenlőségek (pl. XXX − XI = XXI → XXX − IX = XXI).
3. Kerületek: XXI = 21, XVIII = 18, XXIV = 24, IX = 9, XXXII = 32, XXXIX = 39.

> **⚠️ CSAPDA:** IIII, VIIII, XVIIII hibás (4 egyforma jel); IXX nem 19; XII nem 102 (nincs helyiérték).

---

## 💻 Elkészített komponensek

1. **`RomanNumerals4Figures.tsx`**
   - `RomanSignsSvg`: az I, V, X jelek és értékük.
   - `RomanRulesSvg`: VI / IV / XI / IX – összeadás és kivonás szabálya.
   - `SwimCapsSvg`: úszósapkák római rajtszámokkal (MF I/19/1.).
   - `PostcardSvg`: Mona és Manó képeslapja (TK 28/4.).
   - `RomanClockSvg`: római számos óralap (3 óra).
   - `MatchsticksSvg`: gyufaszálas feladvány XXX − XI = XXI.
2. **`RomanNumerals4Theory.tsx`**: jelek, szabályok táblázattal, 4 kidolgozott példa (37, 19, sorba rendezés, számalkotás), mindennapi használat (képeslap, úszósapkák, óra, gyufaszálas fejtörő), csapda.
   - **I. Labor – Római átváltó:** 1–39 csúszkával és ± gombokkal, színes jelkártyák és felbontás (pl. 24 = 10 + 10 + (5 − 1)).
   - **II. Labor – Rakd ki!:** I, V, X gombokkal kell kirakni a kért számot; az ellenőrzés jelzi a hibás írásmódot és a túl kicsi/nagy értéket.
3. **`RomanNumerals4Matcher.tsx`**: 3 szint × 8 pár (kis számok; TK/MF számai; római számok körülöttünk).
4. **`RomanNumerals4Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (10 alatt / 10–19 / 20 felett; helyes / 4 egyforma jel / rossz sorrend; kisebb / egyenlő / nagyobb, mint XV).
5. **`RomanNumerals4Quiz.tsx`**: 30 kérdés (10 / 10 / 10), 14 ábrával, kérdéstípus-jelvényekkel, 3 puskakártyával. Progress-azonosító: `g4-count-romai-quiz`.

---

## 🧪 Tesztelés

`src/test/grade4Topic1RomanNumerals4.test.tsx` – a 4 komponenst és mind a 6 SVG ábrát rendereli.

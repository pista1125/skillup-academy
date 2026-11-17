# 4. Összefüggések, következtetések (3. osztály, XIII. Írásbeli szorzás)

## Források
- Tankönyv: OH-MAT03TA, 129. oldal („Összefüggések, következtetések”).
- Munkafüzet: OH-MAT03MA_II, 58–59. oldal.

## Mi van a könyvben?
- TK 129: hangversenyterem sorai (táblázat készítése 2–10 sorra); szorzótáblázat betűkkel/jelekkel letakart szorzatokkal, nyilakkal a tényezők és a szorzat változásáról; „változtasd meg a tényezőket úgy, hogy a szorzat 2-szeres legyen / ne változzon” (50 · 4); egyenlő szorzatok számolás nélkül (112 · 4 = 224 · 2); „ha egy szám kétszerese 300, mennyi a hatszorosa?”; 4 képeslap 440 Ft → 8 képeslap.
- MF 58–59: tárlók és lepkék táblázata, rovarok csápjai és lábai (20, 40, 80 rovar), 4 → 40 és 3 → 6 szorzótáblázat, „· 2 és : 2” nyilas szorzatpárok (4 · 4 = 8 · 2), skanzenes ár-következtetések (3 db 330 Ft → 6 db).

## Mit csinál a DiákZóna-lecke?
- Szabályok egyszerű mondatokban, saját példákkal: egyik tényező 2-szeres / 3-szoros / 10-szeres → a szorzat is annyiszoros; egyik · 2, másik : 2 → a szorzat nem változik; felcserélhetőség.
- Ábrák: táblázat nyilakkal (20, 40, 80 sor), pöttyrács (3 · 4 → 6 · 4), egyeskocka → tízesrúd (3 · 4 → 3 · 40), pöttyrács átrendezése (4 · 6 = 8 · 3), ár-következtetés (2 füzet 180 Ft → 6 füzet).
- Csapda: „2 lufi 150 Ft, mennyi 4 lufi?” – a gyakori hiba a darabszámmal szorzás (150 · 4); és: ha mindkét tényező 2-szeres, a szorzat 4-szeres.
- **Labor I – Szorzat-változtató:** véletlen ismert szorzat, a tényezők alatt nyíl (· 2, · 3, · 10, vagy · 2 és : 2). A gyerek először kiválasztja, hogyan változik a szorzat, utána beírja az új szorzatot. Célzott tipp, ha a régi szorzatot írja be, vagy ha a „nem változik” esetben kétszerez.
- **Labor II – Következtess!** „n db → ár, m db → ?” véletlen számokkal. 1. lépés: hányszor annyit veszel (gomb), 2. lépés: az ár. Felismeri, ha a gyerek a darabszámmal szorzott, vagy összeadott.
- Kvíz: 30 kérdés (10/10/10), 21 ábrával. Párosító: ismert → új szorzat, mini-táblázat, egyenlő szorzatok, ár-következtetés. Csoportosító: „2-szeres / 10-szeres / nem változik”, egyenlő szorzatok dobozokkal, árak.

## Komponensek
- `MulRelationsG3Figures.tsx`: `MulRelTableSvg`, `MulRelDotsSvg`, `MulRelTimesTenSvg`, `MulRelSameSvg`, `MulRelPriceSvg`
- `MulRelationsG3CardFigures.tsx`: `ChangeCard`, `TableCard`, `PriceCard`, `ChangeSmall`, `BoxesSmall`, `PriceSmall`
- `MulRelationsG3Parts.tsx`: labor-generátorok (`genChange`, `genPrice`)
- `MulRelationsG3Theory.tsx`, `MulRelationsG3Quiz.tsx` (`MUL_RELATIONS_G3_QUESTIONS`), `MulRelationsG3Matcher.tsx` (`MUL_RELATIONS_G3_MATCHER_LEVELS`), `MulRelationsG3Sorter.tsx` (`MUL_RELATIONS_G3_SORTER_LEVELS`)
- Azonosítók: kvíz `g3-wmul-osszefuggesek-quiz`, párosító `g3-wmul-osszefuggesek-matcher`, csoportosító `g3-wmul-osszefuggesek-sorter`.

## Teszt
`src/test/grade3Topic13MulRelationsG3.test.tsx`

## Eltérések a tankönyvtől
- **Következetlen jelölés a táblázatban (TK 129/2.):** ugyanaz a szám kétféle jelet kap: a 120 helyén egyszer „A”, a 60-as sorban „▲” áll; a 240 egyszer „C”, egyszer „■”; a 180 „B” és „●”. A gyerek azt hiheti, hogy más számot jelölnek. A DiákZóna táblázataiban a keresett szám mindig egyetlen piros „?”.
- **Tört szóhasználat túl korán (TK 129/3. b: „a felére csökkenjen”):** a törtek csak a XIV. témakörben jönnek. Nálunk: „2-vel elosztjuk”, „: 2”.
- **A „ne változzon” eset magyarázat nélkül (TK 129/3. c):** a könyv csak kérdezi. Nálunk pöttyrács mutatja, hogy 4 · 6 és 8 · 3 ugyanannyi pötty (sorok · 2, oszlopok : 2).
- **Didaktikai változtatás:** a könyv az ár-következtetésnél nem mutatja a tipikus hibát. Nálunk külön csapda és a labor is felismeri, ha a gyerek a darabszámmal szoroz (2 lufi 150 Ft → 4 lufi ≠ 150 · 4).
- **Didaktikai változtatás:** a „mindkét tényező 2-szeres → a szorzat 4-szeres” esetet külön kiemeljük (kvíz, vigyázz-doboz), mert a gyerekek gyakran 2-szeresre tippelnek.
- Saját számok és helyzetek (füzet, lufi, mézeskalács, kréta, bélyeg, busz) a könyv hangverseny-, lepke- és skanzenes feladatai helyett.

# 3. Római számok 11-től 20-ig

## Források
- *Matematika 2. osztályosoknak I. kötet* (`OH-MAT02TA_I.pdf`), **46–47. oldal**: 11–20 sor a táblán, a 10 alatti és feletti római számok összevetése (az azonos jelek bekarikázása), pajzsok (XI, XII), kártyák a 0–20 számegyenesen (XIII, XVI, XVII, XIX).
- *Matematika munkafüzet 2. osztályosoknak I. kötet* (`OH-MAT02MA_I.pdf`), **28–29. oldal**: 11–20 táblázat kitöltése, toronyóra XI és XII jelekkel, hónapok jelölése (XI., XII.).

## Mit csinál a DiákZóna-lecke?
- A minta: **X + az első tízes** (XI = X + I … XIX = X + IX, XX = X + X), két soros színes ábrán, pálcikás kirakással (X + VII = XVII).
- Számegyenes 0–20 (a 0 fölött nincs római szám), összehasonlítás két úton (átírás, vagy „mindkettő X-szel kezdődik, nézd a többit”), sorba rendezés.
- XI és XII az órán (egész órák).
- Egyszerű + és − csak átírással, 20-on belül (XII + V, XX − VI).
- 2 labor: **Hol van a számegyenesen?** (lila nyíl mozgatása ±1/±5 lépéssel a római szám helyére, tipp: X + …), **Rakd sorba!** (4 római kártya koppintása növekvő sorrendben, azonnali visszajelzés).

## Fájlok és teszt
- `Roman20G2Parts.tsx` – `RomanLineLab`, `makeLineTarget`, `RomanOrderLab`, `makeOrderTask` (közös segédek: `../romai-szamok-ertelmezese/RomanIntroG2Parts.tsx`)
- `Roman20G2Figures.tsx` – `TenPlusPatternSvg`, `XPlusSticksSvg`, `RomanLine20Svg`, `CompareTwentySvg`, `ClockElevenTwelveSvg`
- `Roman20G2CardFigures.tsx` – közös kártyaképek + `TenAndOnesCard80`
- `Roman20G2Theory.tsx`, `Roman20G2Quiz.tsx` (`g2-romai-20-quiz`, 30 kérdés), `Roman20G2Matcher.tsx` (`g2-romai-20-matcher`), `Roman20G2Sorter.tsx` (`g2-romai-20-sorter`)
- Teszt: `src/test/grade2Topic6Roman20G2.test.tsx`

## Eltérések a tankönyvtől
- **A minta kimondása**: a TK 47/2 csak azt kéri, hogy karikázzuk be az azonos jeleket. Nálunk kimondjuk a szabályt: „elöl az X, utána az első tízes római alakja”, és piros X-szel jelöljük.
- **„20-nál kisebb” helyett „20-ig”**: a TK 47/1 „20-nál kisebb” számokról beszél, de az XX is a tananyag része. Nálunk 1-től 20-ig.
- **Számegyenes 0-val**: a könyv számegyenese 0-tól indul, de nem mondja, hogy a 0-nak nincs római jele – mi kimondjuk.
- **Összehasonlítás stratégiával**: a könyvben nincs összehasonlító feladat római számokkal; nálunk két egyszerű út van, és csapda: nem a jelek száma számít.
- **Csak I, V, X, legfeljebb XX**: semmilyen feladat nem lép 20 fölé (L, C a 3. osztályban jön).
- **Óra**: csak egész órák; a „3 óra múlva” feladat 12-n belül marad.
- **Saját feladatok**: pajzsok és katonák helyett pálcika, tízesrúd + egyeskocka, könyvoldal, saját számok.

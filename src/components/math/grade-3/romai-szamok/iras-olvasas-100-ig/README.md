# 2. Római számok írása és olvasása 100-ig (II. A római számok)

## Források
- Tankönyv: OH-MAT03TA, 26–27. oldal („A római számok”: 1. c) 21–30 táblázat, 6. társasjáték olvasásra).
- Munkafüzet I.: OH-MAT03MA_I, 28–29. oldal (2. írás, 3. párosítás, 4. növekvő sorrend, 5. dominó, 6. kártyapárok, 7. kirakó, 8. hiányzó római vagy arab számok).
- Kapcsolódó: MF I/6/8. táblázat („Tízesek és egyesek összegével – Római számmal”, pl. 1 t + 9 e = 10 + 9 = XIX).

## Mit tartalmaznak az oldalak?
- Római számok írása és olvasása **XXXIX-ig**, csak I, V, X jelekkel; sorba rendezés (hadihajók), párosítás, hiányzó párok kitöltése, olvasós társasjáték.
- A könyv nem ad írási/olvasási módszert: a gyerek a táblázatokból következtet.

## A DiákZóna lecke
- **Módszer: tízesrész + egyesrész.** 94 = 90 + 4 = XC + IV = XCIV (tízesrudakkal és egyeskockákkal is).
- Két segítő sor: a kerek tízesek (X … C) és az egyesek (I … IX) római alakja. Figyeltetjük a párhuzamot: IV ↔ XL, IX ↔ XC.
- Olvasás: a számot kettévágjuk az első I vagy V jelnél (LXX | VIII = 70 + 8 = 78).
- Számegyenes 0–100 a kerek tízesek római alakjával („a 0-nak nincs jele”).
- Összehasonlítás és számszomszédok: XXXVIII < L („a hosszabb nem mindig a nagyobb”), XXXIX → XL, XLIX → L.
- Csapdák: 99 ≠ IC, 45 ≠ VL.
- **Labor I – Római átváltó:** −10/−1/+1/+10 gombokkal (1–100) állítható szám; tízesrudak és kockák, a tízesrész, az egyesrész és az egész szám római alakja egyszerre változik. „Új szám” gomb.
- **Labor II – Írd le! Olvasd le!** Váltakozó feladatok: írásnál a tízesrészt és az egyesrészt kell kiválasztani a két sorból (visszajelzés: „nézd meg a tízeseket / az egyeseket”), olvasásnál 4 válaszból kell választani. A rossz válaszok tipikus hibák (minden jel összeadása, ±10, ±1, ±2); ha a gyerek az elvevést felejtette el, ezt a program meg is mondja. „Új feladat”: véletlen szám 11–100 között.
- Nincs benne óra, fejezetszám, kerület, évszázad vagy pálcikás fejtörő – ezek a 3. lecke témái.

## Komponensek
- `RomanReadWriteG3Utils.ts`: `toRoman`, `romanValue`, `splitRoman`, `sumAllSigns`, `TENS_ROMAN`, `ONES_ROMAN`, `SIGN_COLOR`
- `RomanReadWriteG3Figures.tsx`: `TensOnesTableSvg`, `WriteStepsSvg`, `ReadStepsSvg`, `LengthTrapSvg`, `RomanNumberLineSvg`
- `RomanReadWriteG3Theory.tsx`: `RomanReadWriteG3Theory`
- `RomanReadWriteG3Quiz.tsx`: `RomanReadWriteG3Quiz`, `ROMAN_READ_WRITE_G3_QUESTIONS` (30 kérdés, 10/10/10, 21 ábrával) – `g3-rom-iras-olvasas-quiz`
- `RomanReadWriteG3Matcher.tsx`: `RomanReadWriteG3Matcher` (3 × 8 pár) – `g3-rom-iras-olvasas-matcher`
- `RomanReadWriteG3Sorter.tsx`: `RomanReadWriteG3Sorter` (3 szint × 3 kategória × 9 elem) – `g3-rom-iras-olvasas-sorter`

## Teszt
`src/test/grade3Topic2RomanReadWriteG3.test.tsx`

## Eltérések a tankönyvtől
- **Számkör: 100-ig, L és C jellel.** A tankönyv és a munkafüzet csak XXXIX-ig megy (I, V, X). A DiákZóna a fejezet 100-as számköréhez igazodik: az 1. szint 40 alatti számokkal dolgozik (ez a könyv anyaga), a 2–3. szint 100-ig megy.
- **Nincs módszer a könyvben.** A TK 26/1. c) csak felsorolja a 21–30 római alakját („Mit tapasztaltatok?”). Mi kimondjuk az írás és az olvasás lépéseit (tízesrész + egyesrész), és összekötjük a munkafüzet tízes–egyes bontásával (MF I/6/8.).
- **Hosszúság ≠ nagyság:** a sorba rendezős feladatok (MF I/28/4. hadihajók) nem figyelmeztetnek arra, hogy a hosszabb római szám nem feltétlenül nagyobb (XXXVIII < XL). Nálunk ez külön ábra, csapda és kvízkérdés.
- **Tipikus hibák külön:** IC (99), VL (45), XXXX (40), LXXXX (90) – a könyvben nincsenek hibás alakok, nálunk tanulságos rossz válaszként szerepelnek.
- **Didaktikai változtatás:** tízesrudak és egyeskockák kapcsolják össze a helyiértékes bontást a római alakkal (konkrét → képi → jel).
- Saját számok és helyzetek (mérföldkövek, hajók amforákkal); a könyv szereplői és feladatai (Petra, Kata, Márk, hadihajók, római katonás kirakó) nem szerepelnek.

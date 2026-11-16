# 8. Kitekintő (II. Mérések, 8. lecke – dúsító fejtörők)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., **69. oldal**, Kitekintő) alapján kidolgozott rövid dúsító modul 4. osztályosoknak. (Ehhez az oldalhoz nem tartozik munkafüzeti feladat.)

---

## Tananyag Áttekintés

- **1. feladat – tartályok diagramja:** traktor üzemanyagtartálya 100 l, autóbusz üzemanyagtartálya 300 l, személyautó üzemanyagtartálya 50 l, mezőgazdasági helikopter vegyszertartálya 800 l; igaz/hamis állítások; a legkisebb és a legnagyobb közötti különbség: 800 − 50 = 750 l.
- **2. feladat – nagyapa szőlőleve (Gárdonyi Géza története alapján):** 8 liter szőlőlé, egy üres 5 literes és egy üres 3 literes üveg; a barátnak a felét, 4 litert kell kimérni csak átöntögetéssel. Egy legrövidebb (7 lépéses) megoldás: (8,0,0) → (3,5,0) → (3,2,3) → (6,2,0) → (6,0,2) → (1,5,2) → (1,4,3) → (4,4,0).
- **3. feladat – békaverseny:** kecskebéka 1 m-es, erdei béka 185 cm-es ugrások; ugrásonként 85 cm-rel nő a különbség → 425 : 85 = **5. ugrás**.
- **4. feladat – debridai vásár:** 2 ló = 4 szamár, 2 szamár = 5 kecske → 4 ló = 8 szamár = **20 kecske**.
- **5. feladat – Mona golyói:** legalább 7 golyó kell, hogy biztosan legyen piros → 6 kék; legalább 13 kell, hogy biztosan legyen kétféle → 12 piros (összesen 18).

> **Megjegyzés:** a tankönyv 2. b) feladata „5 liter” kimérését kérdezi, miközben a szöveg (és a történet) 4 liter átmérését kéri. A modul a 4 literes változatot dolgozza fel.

> **Javítás a régi README-hez képest:** a korábbi leírás régi magyar mértékegységeket (hüvelyk, rőf, öl, font, akó, icce), tizedestörteket, LaTeX-et és csillagászati érdekességeket tartalmazott, amelyek nem szerepelnek a tankönyv 69. oldalán. A modul a tényleges öt fejtörőt dolgozza fel.

---

## Elkészített Komponensek

1. **`MeasurementsOutlookFigures.tsx`**
   - `TankChartSvg`: a négy jármű tartályainak oszlopdiagramja (adat: `TANKS`).
   - `GrapeJuiceJugsSvg`: a 8, 5 és 3 literes üveg (megadható töltöttségi állapottal).
   - `FrogJumpsSvg`: a két béka ugrásai két számegyenesen.
   - `MarketTradeSvg`: cserearányok a vásárban (ló, szamár, kecske).
   - `MarbleBoxSvg`: Mona golyós doboza a két feltétellel.
2. **`MeasurementsOutlookTheory.tsx`**: problémamegoldási lépések, a diagram leolvasása táblázattal, a négy fejtörő kidolgozott megoldása, „biztos – lehetetlen – lehet” kártya, csapda (a 425 cm-t nem a 185 cm-rel kell osztani), továbbgondolás.
   - **Labor I – Mérd ki a 4 liter szőlőlevet!:** három koppintható üveg, valódi átöntési szabályokkal (amíg az egyik ki nem ürül vagy a másik meg nem telik), lépésszámláló, siker-visszajelzés.
   - **Labor II – Békaverseny:** 4 változat (pl. 100 cm / 185 cm, 425 cm előny); tipp 4 gombbal, majd „Ugrás!” gombbal lépésenként animált ugrások és élő különbségkijelzés.
3. **`MeasurementsOutlookMatcher.tsx`**: 3 szint × 8 pár (adatok, lépésenkénti számolás, fejtörők megoldásai).
4. **`MeasurementsOutlookSorter.tsx`**: 3 szint × 3 kategória × 9 elem (hosszúság / űrtartalom / darabszám; < 100 l / = 100 l / > 100 l; biztos / lehetetlen / lehet, de nem biztos).
5. **`MeasurementsOutlookQuiz.tsx`**: 30 kérdés (10–10–10), 20 kérdésnél ábra (tartály-diagram, üvegek, béka-ugrások, cserearány, golyós doboz), 3 puskakártya.

Azonosítók: kvíz `g4-meas-kitekinto-quiz`, párosító `g4-meas-kitekinto-matcher`, csoportosító `g4-meas-kitekinto-sorter`.

---

## Tesztelés

`src/test/grade4Topic2MeasurementsOutlook.test.tsx` – a 4 komponens és mind az 5 SVG ábra renderelése.

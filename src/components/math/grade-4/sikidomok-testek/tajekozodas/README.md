# 8. Tájékozódás (V. fejezet, 8. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 130. oldal) és munkafüzet (`OH-MAT04MA_II`, 41. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

- **TK 130/1.** Magyarország mezőkre osztott térképe (oszlopok A–I, sorok 1–5). a) Melyik város van a G1, A2, C5, B4, F3 mezőben? *„A G1 azt jelenti, hogy a G jelű oszlop 1-es mezőjében van a keresett város.”* b) Eger, Békéscsaba, Kaposvár, Baja, Nyíregyháza helyének megadása kóddal.
- **TK 130/2.** Bábuk helye a sakktáblán (oszlopok a–h, sorok 1–8); világos és sötét bábuk: király, vezér, bástya, futó, huszár, gyalog. Több azonos bábu esetén mindegyik helyét meg kell adni.
- **MF 41/1.** Az állatkert térképe (A–F, 1–6): melyik állat van a B2, A2, B4, E5 helyén; a zebra, medve, krokodil, tigris helyének megadása kóddal.
- **MF 41/2.** Haladás a négyzetrács oldala mentén a megadott irányok szerint (1D, 2NY, 3É, …, átlós ÉK, ÉNY, DK, DNY lépésekkel) – zárt ábra rajzolása.

A modul a tankönyvi térkép és sakkállás pontos leolvasása helyett saját, jól olvasható ábrákat használ (Kisváros térképe A–F × 1–5, saját sakkállás), hogy a kérdések egyértelműek legyenek.

> **⚠️ CSAPDA:** a kódban előbb az oszlop betűje, aztán a sor száma áll (D1, nem 1D). A tankönyvi térképen az 1. sor felül van, a sakktáblán alul – nézd meg, merre nőnek a számok!

(A korábbi README nézetekről – elöl-, oldal-, felülnézet, alaprajz, kockaépítmények – szólt; ezek nem ennek a leckének a tartalmai. A tankönyv 130. oldala a mezőkódokról és a sakktábla-szerű jelölésről szól.)

---

## 💻 Elkészített Komponensek

1. **`Orientation4Figures.tsx`** (exportálja a `TownMap`, `ChessBoard`, `PlaceIcon` segédkomponenseket és a `MAP_PLACES`, `CHESS_POSITION` adatokat is):
   - `TownMapSvg`: a Kisváros térképe ikonokkal (kút, templom, iskola, uszoda, mozi, posta, fagyizó, bolt, park, pékség, focipálya, könyvtár).
   - `CodeReadingSvg`: a C4 kód leolvasása (oszlop + sor találkozása).
   - `ChessBoardSvg`: sakktábla a–h, 1–8 jelöléssel és bábukkal.
   - `ChessPiecesSvg`: a bábuk neve, világos és sötét jele.
   - `GridWalkSvg`: házikó rajzolása lépéssorral (4K, 3É, 2ÉNY, 2DNY, 3D).
2. **`Orientation4Theory.tsx`**: mezőkódok a térképen, a kód leolvasása, sakktábla-szerű jelölés, haladás a négyzetrácson, csapda.
   - **I. Labor – Mezőkód-kereső:** a térképen a megadott kódú mezőre kell kattintani, illetve a kiemelt hely kódját kell kiválasztani (a fordított sorrendet külön jelzi).
   - **II. Labor – Séta a négyzetrácson:** 8 irányú gombokkal (és a billentyűzet nyilaival) lépésenként kell követni a lépéssort (házikó, lépcső, hajó, plusz jel); a rossz lépést jelzi, a kész ábrát kiszínezi.
3. **`Orientation4Matcher.tsx`**: 3 szint × 8 pár (sakkbábuk és jelölések, a térkép kódjai, hová érsz).
4. **`Orientation4Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (oszlop / sor / mező; világos / sötét / nem sakkbábu; északabbra / ugyanabban a sorban / délebbre).
5. **`Orientation4Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal, 3 puskakártyával. Azonosítók: `g4-geom-tajekozodas-quiz`, `-matcher`, `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade4Topic5Orientation4.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

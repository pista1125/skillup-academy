# 3. Szorzás és osztás 1000-ig (tankönyv 17–20. oldal, munkafüzet I. 12–15. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 17–20. oldal) és munkafüzet (`OH-MAT04MA_I`, 12–15. oldal) alapján kidolgozott oktatási modul. A diákzónában ez az I. fejezet 3. leckéje.

---

## 🎯 Tananyag Áttekintés

- **Szorzás képről, ismételt összeadás** (1–2. feladat): állatok lábai – daru 2, foltos szalamandra 4, havasi cincér 6 láb; igaz/hamis állítások.
- **Szorzótábla, hiányzó tényező, hiányzó osztó/osztandó** (3. feladat: 6 · □ = 30, 24 : □ = 8, □ : 9 = 8).
- **Maradékos osztás** (4. feladat, védett virágok): a szirmokon lévő számokat a középen lévő 3-mal, 4-gyel, 6-tal, 8-cal osztjuk; **a maradék mindig kisebb, mint az osztó**.
- **Pénzérmék** (5. és 7. feladat): 50 Ft – kerecsensólyom, 20 Ft – magyar nőszirom, 5 Ft – nagy kócsag; 8 kócsag + 3 nőszirom = 100 Ft; „biztos / lehet / lehetetlen”.
- **Szorzás és osztás kerek tízesekkel, százasokkal** (9–11. feladat): tavi triatlon táblázata (5 · 40, 320 : 80, 360 : 30 …), a 60 műveletes táblázat (60 · 5, 2 · 340, 640 : 80, 1000 : 50 …), bűvös négyzetek.
- **Kisvasút** (12. feladat): 180 : 9 + 490 : 70 + 720 : 80 + 280 : 40 + 210 : 70 + 150 : 30 + 120 : 6 = 71 utas.
- **Írásbeli szorzás egyjegyű szorzóval** (13. feladat): becslés tízesre kerekítve (214 ≈ 210, B: 630), az egyesekkel kezdünk; **szorzandó, szorzó (= tényezők), szorzat**; ellenőrzés összeadással (214 + 214 + 214 = 642).
- **Gyakorlás** (14–15. feladat): azonos szorzatú párok (98 · 4 = 49 · 8, 213 · 4 = 142 · 6, 114 · 3 = 57 · 6; pár nélkül: 123 · 3), préselt növények 92 · 7 = 644.
- **Munkafüzet I. 12–15.**: ábrás értékkeresés, „kulcsok és házak”, betűrejtvény kerek szorzásokkal, pisztrángok (20 · 25 dkg), műveleti jelek pótlása, becslés és írásbeli szorzás (324 · 2, 124 · 4, 162 · 3, 148 · 6), szorzatok a számegyenesen (137 · 3, 97 · 5, 78 · 6, 9 · 48, 7 · 62, 8 · 56).

> **⚠️ CSAPDA:** a maradék nem lehet nagyobb az osztónál (29 : 3 ≠ 8, maradék 5), írásbeli szorzásnál pedig a maradékot hozzá kell adni a következő szorzathoz (214 · 3 ≠ 632).

### A régi README javított hibái
- LaTeX-képletek helyett 4. osztályos jelölés.
- A régi leírás „tagokra bontással” szorzott; a tankönyv ebben a leckében már az **írásbeli szorzást** ismétli becsléssel és ellenőrzéssel, ezt dolgoztuk fel.

---

## 💻 Elkészített Komponensek

1. **`MulDiv1000Figures.tsx`**:
   - `LadybugLegsSvg`: 4 katica lábai, 6 + 6 + 6 + 6 = 4 · 6.
   - `RemainderFlowerSvg`: maradékos osztás virágon (osztó: 3).
   - `RoundTensSvg`: 4 · 60 = 240 tízes rudakkal.
   - `WrittenMultSvg`: 214 · 3 = 642 sz–t–e oszlopokban, nevekkel.
   - `CoinsSvg`: 50, 20 és 5 Ft-os érmék védett élőlényekkel.
   - `TrainDivisionSvg`: kisvasút osztásokkal.
   - (segéd: `Ladybug` – a kvízábrák is ezt használják)
2. **`MulDiv1000Theory.tsx`**: Mit tanulunk? (lábak táblázata), maradékos osztás, kerek számok táblázata, pénzérmék, kisvasút, írásbeli szorzás lépései, „Vigyázz!” csapda. Exportálja a `multSteps` segédfüggvényt.
   - **I. labor:** igazságos osztozkodás – cukorkák szétosztása csúszkákkal, hányados és maradék tippelése, szétosztás megjelenítése.
   - **II. labor:** írásbeli szorzás lépésről lépésre (számjegy-gombok, maradék kijelzése, ellenőrzés összeadással).
3. **`MulDiv1000Matcher.tsx`**: 3 szint × 8 pár (szorzótábla, kerek számok, írásbeli szorzás).
4. **`MulDiv1000Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (maradék 3-mal osztva; egy-/két-/háromjegyű eredmény; szorzandó/szorzó/szorzat).
5. **`MulDiv1000Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal (katicák, cukorkaosztás, virág, érmék, triatlon-táblázat, írásbeli szorzás), 3 puskakártyával.

Azonosítók: kvíz `g4-count-szorzas-1000-quiz`, párosító `g4-count-szorzas-1000-matcher`, csoportosító `g4-count-szorzas-1000-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic1MulDiv1000.test.tsx` (4 komponens, 6 SVG ábra, írásbeli szorzás lépései).

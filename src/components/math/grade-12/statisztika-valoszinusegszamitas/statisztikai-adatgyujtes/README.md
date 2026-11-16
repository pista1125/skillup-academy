# 1. Statisztikai adatgyűjtés (33. lecke, 76–77. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 33. lecke, 76–77. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a statisztika és valószínűségszámítás fejezet **1.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** a Literary Digest 1936-ban 2,4 millió válasz alapján Alfred Landon +19%-os győzelmét jósolta, de Roosevelt +24%-kal nyert. A hiba oka: csak a saját olvasóikat, az autó- és telefontulajdonosokat kérdezték (mind vagyonosabb rétegek) – a minta erősen torzított volt. A Gallup 50 000 fős reprezentatív mintával pontos becslést adott.

---

## 📐 Elmélet

- Az adatgyűjtésnél meg kell határozni a gyűjtés **körülményeit**, **módszertanát** és a **kiválasztott mintát**.
- **Reprezentatív** a mintavétel, ha a mintához tartozó adatok megfelelő módon tükrözik a teljes adatsokaságot.
- Kritériumok: ha a válaszadók elkülönülő csoportokba sorolhatók (életkor, iskolai végzettség, lakókörnyezet…), a csoportok **létszámarányai** a mintában közelítőleg ugyanazok legyenek, mint a sokaságban; a **minta nagysága** is lényeges.
- Arányos (rétegzett) minta: egy osztályból n · Nᵢ / N főt választunk; kerekítés után az összeg legyen pontosan n.

### Tankönyvi feladatok (a modulban feldolgozva)
- **1.** Város: 6600 nő + 6400 férfi = 13 000 lakos, 8 osztály. 2000 fős minta: ×2000/13 000 (a kerekített összeg 1999, az egyik ,46-os értéket felfelé kerekítjük: 297, 197, 349, 172 / 248, 302, 284, 151). P(férfi, szakiskola) = 1963/13 000 ≈ 0,151 = 302/2000; érettségizett nő (felsőfokúak is!) ≈ 521/2000 ≈ 0,26.
- **2.** Kártya 60%, kupon 25%, mindkettő 12%: csak kártya 48%, csak kupon 13%, egyik sem 27%; P(valamelyik) = 0,73; 10 000 vásárlóból 2700 egyiket sem használja.
- **3.** Biztosító: 5000 ügyfél, 72% (3600) rendszeres vezető, 6% (300) baleset, a nem rendszereseknél 9%: 126 fő; rendszeres 174 fő; P = 174/300 = 0,58.
- **HF 1.** KSH 2021, külföldi látogatók (15 osztály): oszlopösszegek 9260, 6295, 5729, 1482, 2488 (25 254 ezer), a minta 365, 250, 226, 60, 99. Nemzetek szerint reprezentatív, tartózkodási idő szerint nem (1 naposak 84,1% ↔ 74,5%). Legfeljebb 3 éjszakás látogató német: 1578/23 335 ≈ 0,068.

> **⚠️ CSAPDA:** a nagy minta nem pótolja a reprezentativitást (2,4 millió torzított válasz ↔ 50 000 reprezentatív).

---

## 💻 Elkészített Komponensek

1. **`StatDataCollectionFigures.tsx`**:
   - `LiteraryDigestSvg`: sokaság, torzított (Literary Digest) és reprezentatív (Gallup) minta.
   - `StratifiedSampleSvg`: a város 8 osztálya és a 2000 fős arányos minta kerekítéssel.
   - `CouponVennSvg`: kártya/kupon Venn-diagram százalékokkal.
   - `InsuranceTreeSvg`: a biztosító ügyfeleinek fadiagramja.
   - `VisitorSharesSvg`: a látogatók nemzetek szerinti aránya a sokaságban és a mintában.
2. **`StatDataCollectionTheory.tsx`**: bevezető, reprezentatív minta kritériumai, kidolgozott feladatok (1–3., HF 1.), csapda.
   - **I. Laboratórium:** reprezentatív minta építő – mintanagyság-csúszka, arányos elosztás a legnagyobb maradékok módszerével, torzított mintavétel összehasonlítása.
   - **II. Laboratórium:** két szempont Venn-diagramon – P(A), P(B), P(A · B) csúszkák, P(A + B) és az „egyik sem” létszám.
3. **`StatDataCollectionMatcher.tsx`**: 3 szint × 8 pár (fogalmak; arányos minta; valószínűségek).
4. **`StatDataCollectionSorter.tsx`**: 3 szint × 3 kategória × 9 elem (jó/torzított/túl kicsi minta; Venn-tartományok; valószínűségek).
5. **`StatDataCollectionQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 13 kérdésábrával, 3 puskakártyával.
- `statKit.tsx`: belső rajzsegédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-stat-adatgyujtes-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic3StatDataCollection.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.

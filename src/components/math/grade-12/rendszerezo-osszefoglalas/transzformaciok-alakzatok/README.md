# 8. Geometriai transzformációk, síkbeli és térbeli alakzatok – rendszerező összefoglalás (151–157. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., Rendszerező összefoglalás, „Geometria” blokk – Geometriai transzformációk, síkbeli és térbeli alakzatok rész, 151–157. oldal) alapján kidolgozott érettségi ismétlő modul. A diákzónában ez a IV. Rendszerező összefoglalás fejezet **8.** leckéje.

---

## 🎯 Tananyag Áttekintés

Egybevágósági transzformációk és szimmetriák (tengelyes, középpontos, forgás), háromszögek egybevágósága, középpontos hasonlóság és hasonlósági transzformáció, a hasonló alakzatok kerület-, terület-, felszín- és térfogataránya, középvonal; Pitagorasz- és Thalész-tétel, körérintő, középponti szög; szögfüggvények (kiterjesztés tompaszögre, összefüggések), szinusz- és koszinusztétel; síkidomok területe, a kör és a körcikk, testek felszíne és térfogata.

---

## 📐 Fogalmak, tételek, módszerek (tankönyvi táblázat)

- **D – Geometriai / egybevágósági transzformáció:** kölcsönösen egyértelmű leképezés; távolságtartó (tükrözések, forgatás, eltolás).
- **D – Szimmetriák:** tengelyes (pl. egyenlő szárú háromszög, deltoid, húrtrapéz, kör), középpontos (paralelogramma, téglalap, rombusz, négyzet, kör), forgásszimmetria (négyzet 90°, szabályos ötszög 72°, hatszög 60°, téglalap 180°).
- **T – Háromszögek egybevágóságának és hasonlóságának alapesetei.**
- **D – Középpontos hasonlóság:** OP′ = k · OP; k > 1 nagyítás, 0 < k < 1 kicsinyítés, negatív k: |k| arányú hasonlóság + O-ra tükrözés. **T:** minden hasonlóság = középpontos hasonlóság + egybevágóság; szabályos n-szögek, körök hasonlók.
- **T – Arányok:** kerület |k|, terület k², felszín k², térfogat |k|³. **Középvonal:** párhuzamos a harmadik oldallal, fele olyan hosszú.
- **T – Pitagorasz, Thalész (és megfordításaik), érintő ⊥ sugár, érintőszakaszok egyenlők, középponti szög ∝ ív ∝ körcikk.**
- **D/T – Szögfüggvények:** sin, cos, tg derékszögű háromszögben; sin 90° = 1, cos 90° = 0; tompaszögre sin α = sin(180° − α), cos α = −cos(180° − α), tg α = −tg(180° − α); sin α = cos(90° − α); sin² α + cos² α = 1; tg α = sin α/cos α.
- **T – Szinusztétel:** a : b = sin α : sin β; **koszinusztétel:** c² = a² + b² − 2ab · cos γ.
- **T – Területek:** háromszög a · mₐ/2 = ab · sin γ/2; paralelogramma a · mₐ = ab · sin γ; deltoid e · f/2; trapéz (a + c)/2 · m; kör 2rπ, r²π; körcikk r²π · α/360°.
- **T – Testek:** hasáb, gúla, csonkagúla, henger, kúp, csonkakúp, gömb felszíne és térfogata.

### Kidolgozott feladatok
4. **Függőhíd:** 750 m hosszú, 120 m magas körív sugara: 375² = 120 · (2r − 120) (hasonló háromszögek, Thalész) vagy (r − 120)² + 375² = r² ⇒ r ≈ 646 m ≈ 650 m.
5. **Szakaszok, szögek:** a) tg α = 3,2/6,2 ⇒ α ≈ 27,3°, p ≈ 5,51 cm, φ ≈ 27,3°, q ≈ 1,47 cm; b) d = 3/cos 33,7° ≈ 3,61 cm; c) PQR (4,4; 5,3; 6,4 cm): β ≈ 82,0° (koszinusztétel), δ ≈ 42,9° (szinusztétel; a 137,1° nem lehet).

### Feladatok (a modulban feldolgozva)
- **I. rész:** B1 0,72 cm; B2 r = √74/2 ≈ 4,30 cm; B3 BC ≈ 12,0; B4 315°; B5 ≈ 80,4°; B6 H, H, I, H; B7 1,75π ≈ 5,50 m²; B8 7,0 cm; B9 d ≈ 12,65 m; B10 512-szeres; B11 igen (5, 12, 13); B12 62°, merőleges, hasonlók, kisebb.
- **II. rész:** P2 szabályos nyolcszög (a = 12): átlók ≈ 22,17 és ≈ 31,36, körök területaránya cos² 22,5° ≈ 0,854, hasáb V ≈ 6953; P4 gömb (R = 10): ∛2000 ≈ 12,6 cm, 75π ≈ 235,6 cm², √75 ≈ 8,66 cm; P5 P₂Q₂ = 2 cm, P₁Q₁ = 4 cm, a trapéz 1/3 rész.
- A P1 (súlyzó) és P3 (rajz, cserép) feladatot a modul nem dolgozza fel.

> **⚠️ CSAPDA:** felszín 64-szeres ⇒ k = 8 ⇒ térfogat 512-szeres (nem 64); a szögek hasonlóságnál nem változnak. Szinusztételnél a kétféle szögmegoldást ellenőrizni kell.

> **Megjegyzés:** a mappa korábbi README-je nem létezett; a tartalom a tankönyvi blokk alapján készült.

---

## 💻 Elkészített Komponensek

1. **`TransformationsSolidsSummaryFigures.tsx`**:
   - `SymmetryTypesSvg`: deltoid tengellyel, paralelogramma középponttal, szabályos ötszög 72°-os forgásszimmetriával.
   - `CentralSimilaritySvg`: középpontos hasonlóság k = 1,5 és k = −0,5 aránnyal.
   - `PythagorasThalesSvg`: Pitagorasz-tétel és Thalész-tétel (derékszög negyedkörívvel).
   - `TrigRatiosSvg`: szemközti/melletti befogó és átfogó.
   - `BridgeArcSvg`: 4. kidolgozott feladat (függőhíd).
   - `AreaFormulasSvg`: háromszög, paralelogramma, deltoid, trapéz területe.
   - `CosineLawSvg`: 5. c) kidolgozott feladat (PQR háromszög).
2. **`TransformationsSolidsSummaryTheory.tsx`**: D/T/M táblázatok, terület- és testképlettár, 2 kidolgozott feladat, a feladatsor eredményei, csapda.
   - **I. Laboratórium:** középpontos hasonlóság k csúszkával (−2…2,5), kép-háromszög, |k|, k², |k|³.
   - **II. Laboratórium:** háromszög két oldalból és a közbezárt szögből: koszinusztétel, szögek, terület, élő rajz.
3. **`TransformationsSolidsSummaryMatcher.tsx`**: 3 szint × 8 pár (tételek; képletek; feladatok eredményei).
4. **`TransformationsSolidsSummarySorter.tsx`**: 3 szint × 3 kategória × 9 elem (szimmetriák; k, k², k³; megoldó tétel).
5. **`TransformationsSolidsSummaryQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 11 kérdésábrával, 3 puskakártyával.
- `sumKit.tsx`: belső rajz- és geometriai segédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-sum-transzformaciok-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic4TransformationsSolidsSummary.test.tsx` fájlban található, a 4 komponenst és mind a 7 SVG ábrát ellenőrzi.

# 3. A hasáb felszíne és térfogata (3. lecke, 10–11. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 3. lecke, 10–11. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a térgeometria fejezet **3.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat – a kalapácsfej:** 7,87 g/cm³ sűrűségű vasból készült, M = 3 cm magas egyenes hasáb; alaplapja egy 8 × 2,5 cm-es téglalap és egy szimmetrikus trapéz (alapjai 2,5 és 0,5 cm, a magassága 5 cm). $T = 8 \cdot 2{,}5 + \frac{2{,}5 + 0{,}5}{2} \cdot 5 = 27{,}5$ cm², $V = 82{,}5$ cm³; a nyél 23%-ot foglal el, így a vas térfogata ≈ 63,53 cm³, tömege ≈ **500 g**.

---

## 📐 Elmélet

- **Egyenes hasáb felszíne:** a lapok területének összege; az oldallapok (téglalapok) együtt alkotják a **palástot**, amely kiterítve $K_{alaplap} \times M$-es téglalap:
  $$A = 2 \cdot T_{alaplap} + K_{alaplap} \cdot M$$
- **Térfogat (egyenes és ferde hasáb):** $V = T_{alaplap} \cdot M$.
- **Megjegyzések:** kocka $V = a^3$; téglatest $V = abc$; ferde hasáb felszíne $A = 2 \cdot T_{alaplap} + T_{palást}$, ahol a palást paralelogrammák területének összege.
- (A régi README Cavalieri-elvet is említett; a tankönyv a 3. leckében nem nevesíti, a modulban csak a kártyapakli-szemléltetés jelenik meg.)

### Tankönyvi feladatok (a modulban feldolgozva)
- **1.** Három egyenes hasáb, M = 85 mm: szabályos hatszög (a = 24 mm) T ≈ 1496,5 mm², A ≈ 152,3 cm², V ≈ 127,2 cm³; derékszögű háromszög (befogók 45 és 28 mm, átfogó 53 mm) T = 630 mm², A = 119,7 cm², V = 53,55 cm³; rombusz (a = 52 mm, 60°) T ≈ 2341,7 mm², A ≈ 223,6 cm², V ≈ 199,0 cm³.
- **2.** 6 m-es, 96 kg-os, C alakú keresztmetszetű fémgerenda (140 × 60 mm, 10 mm-es övek, 7 mm-es gerinc): T = 20,4 cm², ρ ≈ 7,84 g/cm³, A ≈ 30 401 cm².
- **3.** A 2. lecke nyolcszög alapú hasábja: V = 21, A = 26 + 12√2 ≈ 42,97.
- **4.** Szabályos háromszög alapú hasáb, T_palást = √3 · T_alaplap ⇒ M = a/4 (tehát az állítás fordítva igaz); a = 8 cm ⇒ V = 32√3 ≈ 55,43 cm³; 3-szoros nagyítás: A 9-szeres, V 27-szeres.
- **HF 1.** Élek 12, 16, 14 cm, V = 2688 cm³; +2 cm-es élekkel 4032 cm³ (1,5-szeres).
- **HF 2.** Dobogó felszíne alsó lapok nélkül: 24 525 cm².
- **HF 3.** Árok: 37,5 cm mély, 120 m-en 112 500 liter.
- **HF 4.** 2240 literes hatszög alapú medence (M = a/2): a ≈ 1,2 m, a locsolófej hatósugara ≤ ≈ 1,04 m.

> **⚠️ CSAPDA:** Ferde hasábnál a térfogatot a magassággal (nem az oldaléllel) kell számolni; a felszínben mindkét alaplap szerepel.

---

## 💻 Elkészített Komponensek

1. **`PrismAreaVolumeFigures.tsx`**:
   - `HammerHeadSvg`: a kalapácsfej hasábja a méretekkel.
   - `PrismNetSvg`: derékszögű háromszög alapú egyenes hasáb hálója (palást = K · M).
   - `OctaBaseAreaSvg`: a nyolcszög alaplap területe és kerülete rácson.
   - `IBeamSvg`: a fémgerenda C alakú keresztmetszete és számításai.
   - `DrainSvg`: a vízelvezető árok trapéz keresztmetszete.
   - `CardDeckSvg`: kártyapakli – egyenes és ferde hasáb azonos térfogattal.
2. **`PrismAreaVolumeTheory.tsx`**: kidolgozott feladat, képletek, mértékegység-táblázat, kidolgozott feladatok (A–E), HF-eredmények, csapda.
   - **I. Laboratórium:** szabályos n-oldalú hasáb hálójának animált kiterítése (Solid3DViewer), élő A és V számítás.
   - **II. Laboratórium:** kártyapakli elcsúsztatása (Solid3DViewer) – a térfogat állandó, a felszín nő.
3. **`PrismAreaVolumeMatcher.tsx`**: 3 szint × 8 pár (képletek; számolás; gyakorlati feladatok).
4. **`PrismAreaVolumeSorter.tsx`**: 3 szint × 3 kategória × 9 elem (terület/térfogat/hossz; melyik képlet; térfogatváltozás).
5. **`PrismAreaVolumeQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 14 kérdésábrával, 3 puskakártyával.
- `figKit.tsx`: belső rajzsegédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-ter-hasab-felszin-terfogat-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic1PrismAreaVolume.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.

# 3. Geometriai hozzárendelések (69. lecke)

## Tananyag Áttekintés
A geometriai leképezések, transzformációk, hasonlóságok és egybevágóságok axiomatikus hierarchiája; a merőleges vetítés (ortogonális projekció) tulajdonságai a síkban és a térben, a vetület hossza és szöge ($|a'| = |a| \cdot \cos\alpha$), a napóra és gnomón fizikai modellje, műszaki rajzok vetületi rendszere (Monge-féle képsíkok), valamint a mechanikai munka skaláris szorzata ($W = F_{\parallel} \cdot s = F \cdot s \cdot \cos\alpha$).

---

## Fő Fogalmak és Összefüggések

- **Hierarchia a geometriai hozzárendelésekben:**
  - **Geometriai hozzárendelés (leképezés):** Olyan reláció/függvény, melynek értelmezési tartománya és értékkészlete is a tér/sík pontjainak halmaza.
  - **Geometriai transzformáció:** Kölcsönösen egyértelmű (bijektív) leképezés a teljes síkról önmagára (minden pontnak egyértelmű képe és ősképe van).
  - **Hasonlósági transzformáció ($\lambda > 0$):** Távolságarány-tartó, szögtartó, egyenestartó bijekció.
  - **Egybevágósági transzformáció ($\lambda = 1$):** Távolságtartó (izometrikus) hasonlóság (tengelyes tükrözés, forgatás, eltolás, középpontos tükrözés).

- **Merőleges vetítés egyenesre / síkra (Ortogonális projekció):**
  - **Nem transzformáció:** Nem bijektív, mivel egy egyenesre merőleges egyenes valamennyi pontja egyetlen pontba vetül (információvesztés, dimenziócsökkenés 2D $\to$ 1D vagy 3D $\to$ 2D).
  - **Szakasz vetületének hossza:** $|a'| = |a| \cdot \cos\alpha$, ahol $\alpha$ a szakasz és a vetítési egyenes/sík hajlásszöge ($0^\circ \le \alpha \le 90^\circ$).
  - **Szélsőértékek és tulajdonságok:**
    - Ha $\alpha = 0^\circ$ (párhuzamos): $|a'| = |a|$ (valódi nagyság).
    - Ha $\alpha = 90^\circ$ (merőleges): $|a'| = 0$, a szakasz képe egyetlen pont!
    - Mindig fennáll: $0 \le |a'| \le |a|$.
    - Körvonal merőleges vetülete a síkban: egy $2r$ hosszúságú zárt szakasz ($[-r; r]$).

- **Gyakorlati és természettudományos alkalmazások:**
  - **Gnomón és napóra:** Párhuzamos napsugarak (árnyékvetés), a szög és árnyékhossz trigonometrikus kapcsolata.
  - **Műszaki rajz (Képsíkrendszer):** Elölnézet, felülnézet és oldalnézet ortogonális vetületekből épül fel, megőrizve a képsíkkal párhuzamos élek valódi hosszát.
  - **Fizikai munka:** $W = F_{\parallel} \cdot s = F \cdot s \cdot \cos\alpha$ (az elmozdulás irányú vetületi erő végez csak mechanikai munkát).

---

## Elkészült Komponensek és Források

A tananyag és a feladatok a hivatalos **OH-MAT10TA/II** tankönyv 69. leckéjének (108–111. oldal) és az **OH-SNE-MAT10M-2** munkafüzetnek a feldolgozásával készültek:

1. **`GeometricMappingsFigures.tsx`**:
   - `TransformationHierarchySvg`: Euler-Venn diagram a leképezések, transzformációk, hasonlóságok és egybevágóságok viszonyáról.
   - `OrthogonalProjectionSvg`: Szakasz merőleges vetítése egyenesre derékszögű vetítősugarakkal és vetületi formulával ($|a'| = |a|\cos\alpha$).
   - `SundialProjectionSvg`: Napóra és gnomón fizikai árnyékvetése állítható napszöggel.
   - `TechnicalDrawingViewsSvg`: Térbeli test (L-profil) Monge-rendszerű 3 vetülete (főnézet, felülnézet, oldalnézet).
   - `VectorWorkProjectionSvg`: Fizikai vektoriális felbontás és mechanikai munka $F_{\parallel} = F\cos\alpha$ vetületéből.

2. **`GeometricMappingsTheory.tsx`**:
   - **Laboratórium I:** Interaktív Szakaszvetítés Szögszimulátor (állítható szög és hajlás, valós idejű $\cos\alpha$ vetülethossz-számítás).
   - **Laboratórium II:** Geometriai Hozzárendelés Döntési Mátrix (5 tankönyvi szituáció: merőleges vetítés, tükrözés, hasonlóság, centrális projekció, körvetület).
   - 5 részletes elméleti fejezet és érettségi buktatók (`TheoryTrapBox`, `TheoryCallout`).
   - Fejléc jobb oldalán kiemelt aranyszabályok kártya (`quickRule`).
   - PDF export funkció (`grade10-geometric-mappings-theory`).

3. **`GeometricMappingsMatcher.tsx`**:
   - 3 nehézségi szint × 8 pár = 24 összetartozó fogalompár, vetületi képlet, fizikai és műszaki összefüggés.

4. **`GeometricMappingsSorter.tsx`**:
   - 3 szintű csoportosító játék:
     - 1. szint: Hozzárendelés kategóriák (Nem bijektív leképezés, Egybevágósági transzformáció, Hasonlósági transzformáció).
     - 2. szint: Szakaszvetület viselkedése a hajlásszög függvényében ($\alpha = 0^\circ$, $0^\circ < \alpha < 90^\circ$, $\alpha = 90^\circ$).
     - 3. szint: Állítások matematikai igazságtartalma (Mindig igaz, Lehet igaz de nem mindig, Matematikai képtelenség / hamis).

5. **`GeometricMappingsQuiz.tsx`**:
   - 3 nehézségi szint × 10 feladat = 30 válogatott, tankönyvi feladatokon alapuló kérdés részletes levezetésekkel.
   - 3 beépített CheatSheet kártya és közvetlen játékmód-váltás.

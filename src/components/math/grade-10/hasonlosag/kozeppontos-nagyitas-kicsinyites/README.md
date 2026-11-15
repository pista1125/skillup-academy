# 1. Középpontos nagyítás, kicsinyítés (67. lecke)

## Tananyag Áttekintés
A középpontos hasonlósági transzformáció szemléletes és szabatos tárgyalása: nagyítás és kicsinyítés adott $O$ középpontból és $\lambda$ arányossági tényezővel, a képpontok szerkesztése, a párhuzamosság- és szögtartás elve, a negatív hasonlósági arányok értelmezése (180°-os átfordulás/középpontos tükrözés), valamint a kerület- ($|\lambda|$) és területarányok ($\lambda^2$) összefüggései.

---

## Fő Fogalmak és Összefüggések

- **A középpontos hasonlóság definíciója:**
  - Adott egy rögzített $O$ pont (centrum) és egy $\lambda \neq 0$ valós szám (hasonlósági arány).
  - Bármely $P$ pont képe az a $P'$ pont, amelyre $\vec{OP'} = \lambda \cdot \vec{OP}$, azaz távolságban: $|OP'| = |\lambda| \cdot |OP|$.
  - Ha $|\lambda| > 1$: **középpontos nagyítás**; ha $0 < |\lambda| < 1$: **középpontos kicsinyítés**; ha $\lambda = 1$: **identitás**; ha $\lambda = -1$: **középpontos tükrözés**.
  - Egyetlen fixpont van: az $O$ centrum ($O' = O$).

- **Geometriai alaptulajdonságok:**
  - **Egyenestartás:** Egyenes képe egyenes. Ha az egyenes átmegy $O$-n, akkor önmagába megy át (fixegyenes, de nem pontonként fix!). Ha nem megy át $O$-n, akkor képe vele párhuzamos egyenes ($e' \parallel e$).
  - **Szögtartás:** A képalakzat szögei pontosan megegyeznek az eredeti szögekkel ($\alpha' = \alpha$).
  - **Aránytartás:** Egy alakzaton belüli bármely két belső szakasz hosszának aránya nem változik meg.
  - **Távolságarány:** $|A'B'| = |\lambda| \cdot |AB|$.

- **Méretek skálázódása dimenziónként:**
  - Kerületarány (1D): $\frac{K'}{K} = |\lambda|$
  - Területarány (2D): $\frac{T'}{T} = \lambda^2$
  - Térfogatarány (3D): $\frac{V'}{V} = |\lambda|^3$

- **Szerkesztési eljárások és alkalmazások:**
  - Centrum ($O$) megszerkesztése megfelelő pontpárok összekötésével ($AA' \cap BB' = O$).
  - Négyzet szerkesztése háromszögbe segédnégyzetből indított centrális nagyítással.
  - Szabályos gúla párhuzamos síkmetszetei ($T_k = k^2 \cdot T_{\text{alap}}$).

---

## Elkészült Komponensek és Források

A tananyag és a feladatok a hivatalos **OH-MAT10TA/II** tankönyv 67. leckéjének (102–105. oldal) és az **OH-SNE-MAT10M-2** munkafüzetnek (III., VI. és VII. fejezet) a feldolgozásával készültek:

1. **`CentralDilationFigures.tsx`**:
   - `DilationCenterSvg`: Középpontos nagyítás ($O$ centrum, $ABC$ és nagyított $A'B'C'$, vetítősugarak, párhuzamosság).
   - `NegativeRatioSvg`: Negatív arányú hasonlóság ($\lambda = -1{,}5$, $O$ a két alakzat között, 180°-os átfordulás).
   - `AreaPerimeterRatioSvg`: Kerület- ($|\lambda|$) és területarány ($\lambda^2$) szemléltetése felosztott négyzetekkel.
   - `SquareInTriangleSvg`: Háromszögbe írt négyzet szerkesztése hasonlósággal (Tankönyv 105. o. Emelt szint).
   - `PyramidSliceSvg`: Gúla párhuzamos síkmetszetei és területarányai (Tankönyv 104. o. 3. feladat).

2. **`CentralDilationTheory.tsx`**:
   - **Laboratórium I:** Dinamikus Dilatáció és Skálázó Szimulátor ($\lambda \in [-2; 2{,}5]$ valós idejű alakzat- és arányszámítás).
   - **Laboratórium II:** Tankönyvi Példatár & Geometriai Szcenáriók (6 interaktív forgatókönyv és bizonyítás).
   - 5 részletes elméleti fejezet definíciókkal, táblázatokkal, érettségi mintapéldákkal és tipikus csapdákkal.
   - Fejléc jobb oldalán kiemelt aranyszabályok kártya (`quickRule`).
   - PDF export funkció (`grade10-central-dilation-theory`).

3. **`CentralDilationMatcher.tsx`**:
   - 3 nehézségi szint × 8 pár = 24 összetartozó fogalom, számítás és érettségi alkalmazás.

4. **`CentralDilationSorter.tsx`**:
   - 3 szintű csoportosító játék (Arányok minősítése, Geometriai mennyiségek változása, Igazságok vs. Tévhitek).

5. **`CentralDilationQuiz.tsx`**:
   - 3 nehézségi szint × 10 feladat = 30 válogatott, részletes levezetésekkel és tippekkel ellátott kérdés.
   - Beépített CheatSheet kártyák és Wordwall stílusú Párosító / Csoportosító játékmódok.

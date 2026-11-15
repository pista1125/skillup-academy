# 4. Hasonlóság (70. lecke)

## Tananyag Áttekintés
A síkbeli és térbeli hasonlósági transzformáció axiomatikus felépítése (középpontos hasonlóság és egybevágóság kompozíciója), a szögtartás és aránytartás tulajdonságai, a metrikus skálázási törvények ($\lambda$ szakaszok és kerület, $\lambda^2$ területek és felszínek, $\lambda^3$ térfogatok és tömegek), csonkagúla szintezések, valamint mérnöki tervrajzok méretaránya és angolszász mértékegységek átszámítása.

---

## Fő Fogalmak és Összefüggések

- **Hasonlósági transzformáció és hasonló alakzatok:**
  - **Definíció:** Középpontos hasonlóság és egybevágósági transzformáció kompozíciója.
  - **Hasonlóság aránya ($\lambda > 0$):** Megfelelő szakaszok aránya: $\frac{a'}{a} = \lambda$.
  - **Szögtartás:** Megfelelő szögek egyenlők: $\alpha' = \alpha$, $\beta' = \beta$.
  - **Egybevágóság viszonya:** Speciális hasonlóság, ahol $\lambda = 1$. Minden egybevágó alakzat hasonló, de nem minden hasonló alakzat egybevágó.

- **Metrikus arányok és dimenzióváltás:**
  - **Hosszak és Kerületek:** $\frac{K'}{K} = \frac{a'}{a} = \frac{m_a'}{m_a} = \frac{r'}{r} = \lambda$.
  - **Területek és Felszínek:** $\frac{T'}{T} = \frac{A'}{A} = \lambda^2$.
  - **Térfogatok és Tömegek:** $\frac{V'}{V} = \frac{m'}{m} = \lambda^3$ (azonos sűrűségű homogén anyag esetén).
  - **Gúla 4 egyenlő szintre osztása (HF 3):**
    - Alaplapok területe: $1 : 4 : 9 : 16$ ($\lambda^2$).
    - Rétegek (csonkagúlák) térfogata: $1 : 7 : 19 : 37$ ($1^3, 2^3-1^3, 3^3-2^3, 4^3-3^3$).

- **Műszaki tervrajzok és méretarány ($M = 1 : N$):**
  - Rajzbeli $1\text{ cm}$ a valóságban $N\text{ cm}$-nek felel meg (pl. $1:100$ esetén $1\text{ cm} = 1\text{ m}$).
  - Valódi felület: $T_{\text{valós}} = T_{\text{rajz}} \cdot N^2$.
  - Angolszász láb mértékegység: $1\text{ ft} \approx 0{,}3\text{ m} = 30\text{ cm}$.

---

## Elkészült Komponensek és Források

A tananyag és a feladatok a hivatalos **OH-MAT10TA/II** tankönyv 70. leckéjének (112–115. oldal) és az **OH-SNE-MAT10M-2** munkafüzetnek a feldolgozásával készültek:

1. **`SimilarityFigures.tsx`**:
   - `SimilarityCompositionSvg`: Hasonlóság előállítása középpontos nagyítás és egybevágóság (tükrözés/forgatás) egymásutánjaként.
   - `RectanglePartitionSvg`: Téglalap arányos felosztása hasonló résztéglalapra ($3 \times 12\text{ cm} \to 3 \times 0{,}75\text{ cm}$, oldalarány $4:1$).
   - `PerimeterAreaScaleSvg`: Síkidom méreteződése ($\lambda, \lambda^2$): $1\times 1$, $2\times 2$, $3\times 3$ rétegek, kerületek $1:2:3$, területek $1:4:9$.
   - `PyramidLayersSvg`: Gúla 4 egyenlő magasságú szintre osztása, alaplapok $\lambda^2$ és térfogatok $\lambda^3$ aránya.
   - `ScaleMapBlueprintSvg`: Tervrajz modell ($M = 1:100$), amerikai mértékegységek ($1\text{ ft} = 0{,}3\text{ m}$) és felületi szorzók.

2. **`SimilarityTheory.tsx`**:
   - **Laboratórium I:** Hasonlósági Skálázó & Metrikus Kalkulátor (állítható $\lambda$ csúszka, 4-féle alakzat, azonnali kerület-, terület- és térfogat-frissítés).
   - **Laboratórium II:** Tankönyvi Hasonlósági Esettanulmányok & Döntési Mátrix (4 interaktív tankönyvi feladat: 3-féle oldalillesztés, egyenlő szárú háromszög méretezése, téglalap darabolása, gúla szintezése).
   - 5 részletes elméleti fejezet, érettségi buktatók (`TheoryTrapBox`), aranyszabályok (`quickRule`) és PDF export.

3. **`SimilarityMatcher.tsx`**:
   - 3 nehézségi szint $\times$ 8 pár = **24 kártyapár** (definíciók, arányok, számításos feladatok, érettségi tételek).

4. **`SimilaritySorter.tsx`**:
   - 3 szintű csoportosító játék:
     - 1. szint: Alakzatpárok geometriai hasonlósága (Mindig hasonlók, Csak feltételesen, Soha nem hasonlók).
     - 2. szint: Hasonlósági skálázódás hatványkitevője ($\lambda^1, \lambda^2, \lambda^3$).
     - 3. szint: Állítások matematikai igazságtartalma (Mindig igaz, Feltételesen igaz, Matematikai képtelenség).

5. **`SimilarityQuiz.tsx`**:
   - 3 nehézségi szint $\times$ 10 feladat = **30 válogatott feladat** részletes levezetésekkel a tankönyvi példák alapján.
   - 3 beépített CheatSheet kártya és közvetlen játékmód-váltás.

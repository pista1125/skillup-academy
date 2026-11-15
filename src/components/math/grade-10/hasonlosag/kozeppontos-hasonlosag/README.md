# 2. Középpontos hasonlóság (68. lecke)

## Tananyag Áttekintés
A középpontos hasonlóság strukturális, algebrai és geometriai tulajdonságai: invariáns elemek (fixpontok és fixegyenesek), körök középpontos hasonlósága és érintői ($H_k$ és $H_b$), a hasonlóság és a középpontos hasonlóság szigorú megkülönböztetése (párhuzamosság elve, négyzetek és kockák esete), valamint térbeli testek (gúlák és gömbök) skálázódása.

---

## Fő Fogalmak és Összefüggések

- **Invariáns elemek a középpontos hasonlóságban:**
  - **Fixpont:** Ha $\lambda \neq 1$, pontosan 1 fixpont létezik a síkban/térben: az $O$ hasonlósági centrum ($O' = O$).
  - **Fixegyenesek:** Az $O$ centrumra illeszkedő egyenesek mindegyike önmagába képződik le ($e' = e$). Ezek az egyenesek **nem pontonként fixek** (pontjaik elmozdulnak az egyenesen, kivéve $O$-t).
  - **Nem fixegyenesek:** Az $O$-ra nem illeszkedő egyenesek képe velük párhuzamos egyenes ($e' \parallel e$).

- **Körök és gömbök hasonlósága:**
  - Bármely két, különböző sugarú síkbeli kör ($r_1 \neq r_2$) mindig középpontosan hasonló egymáshoz.
  - A két körhöz a centrális egyenesen két kitüntetett hasonlósági pont tartozik:
    * **Külső hasonlósági pont ($H_k$):** a külső közös érintők metszéspontja ($\lambda = \frac{r_2}{r_1} > 0$).
    * **Belső hasonlósági pont ($H_b$):** a belső közös érintők metszéspontja ($\lambda = -\frac{r_2}{r_1} < 0$).
  - Bármely két térbeli gömb mindig középpontosan hasonló.

- **Hasonlóság vs. Középpontos hasonlóság (Tankönyv 107. o. 1–2. feladat):**
  - Két alakzat csak akkor középpontosan hasonló, ha megfelelő oldalaik páronként párhuzamosak.
  - Bár minden négyzet és kocka hasonló egymáshoz, elforgatottság esetén **nem középpontosan hasonlók**.
  - A szög szárait metsző párhuzamosok háromszögei ($\triangle OAD \sim \triangle OBE$) középpontosan hasonlók az $O$ csúcsból, de a köztük lévő trapézok ($ABED$ és $BCFE$) **nem középpontosan hasonlók**.

---

## Elkészült Komponensek és Források

A tananyag és a feladatok a hivatalos **OH-MAT10TA/II** tankönyv 68. leckéjének (106–107. oldal) és az **OH-SNE-MAT10M-2** munkafüzetnek a feldolgozásával készültek:

1. **`HomothetyFigures.tsx`**:
   - `CircleHomothetySvg`: Két kör külső ($H_k$) és belső ($H_b$) hasonlósági pontja a centrálison, közös érintőkkel.
   - `CircleTouchingDilationSvg`: Körvonalra illeszkedő centrum ($O$) és $\lambda = 0{,}5$ miatti belső körérintés (107. o. HF 1b).
   - `InvariantLinesSvg`: Fixpont ($O$) és fixegyenesek vs. párhuzamos képegyenesek ($g' \parallel g$).
   - `AngleInterceptThalesSvg`: Szögszárakat metsző párhuzamosok (háromszögek hasonlósága vs. trapézok cáfolata).
   - `PyramidDilationSvg`: Szabályos gúla nagyítása az $E$ csúcsból ($\lambda = 2, 8, 100, \sqrt{2}$, 107. o. 4-5. feladat).

2. **`HomothetyTheory.tsx`**:
   - **Laboratórium I:** Körök Hasonlósági Centrum Kereső (Különálló, belső érintésű és invariáns módok).
   - **Laboratórium II:** Tankönyvi Geometriai Cáfolatok & Döntési Mátrix (6 interaktív forgatókönyv).
   - 4 részletes elméleti fejezet és érettségi buktatók (`TheoryTrapBox`, `TheoryCallout`).
   - Fejléc jobb oldalán kiemelt aranyszabályok kártya (`quickRule`).
   - PDF export funkció (`grade10-homothety-theory`).

3. **`HomothetyMatcher.tsx`**:
   - 3 nehézségi szint × 8 pár = 24 összetartozó fogalompár, érintőtétel és geometriai cáfolat.

4. **`HomothetySorter.tsx`**:
   - 3 szintű csoportosító játék (Alakzatpárok minősítése, Invarianciák rendszere, Matematikai igazságok vs. Tévhitek).

5. **`HomothetyQuiz.tsx`**:
   - 3 nehézségi szint × 10 feladat = 30 válogatott, tankönyvi feladatokon alapuló kérdés részletes indoklásokkal.
   - 3 beépített CheatSheet kártya és közvetlen játékmód-váltás.

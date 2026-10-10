# 6. Összetett százalékszámítási feladatok (7. osztály)

## Tananyag Áttekintés
Többlépéses és egymást követő árváltozások, az összesített szorzótényezők módszere ($q_{\text{össz}} = q_1 \cdot q_2$), gépi amortizáció és értékvesztés, pályázati költségvetések és maradékmegosztások, valamint geometriai alakzatok (négyzet és téglalap) oldal- és területi transzformációi.

---

## Moduláris Rendszerösszetevők

1. **ComplexPercentTheory.tsx**:
   - Részletes elmélet a szorzótényezők alkalmazásáról ($q = 1 \pm p/100$).
   - **Interaktív Többlépéses Árváltozás Szimulátor:** Kiinduló ár, két független százalékos lépés, összesített szorzótényező és végső összeg valós idejű levezetéssel.
   - **Interaktív Geometriai Százalék-Szimulátor (Négyzet ➔ Téglalap):** Az oldalak különféle százalékos módosítása, a kerület- és területváltozás élő összehasonlítása.
   - A $+p\%$ majd $-p\%$ csapdájának matematikai bizonyítása.
   - A semleges pár ($+25\%$ majd $-20\% \implies 1,00$) törvényszerűsége.
   - Ipari amortizáció és költségvetési felosztások (Toldi-tanya, jótékonysági koncert).

2. **ComplexPercentQuiz.tsx**:
   - 30 kérdés 3 nehézségi szinten (10 Könnyű, 10 Közepes, 10 Nehéz), lépésről lépésre kidolgozott részletes magyarázatokkal.
   - 4 infókártya SVG ábrákkal kísért összefoglalókkal.
   - Beépített felületváltó (Kvíz $\leftrightarrow$ Párkereső $\leftrightarrow$ Csoportosító $\leftrightarrow$ Elmélet).

3. **ComplexPercentMatcher.tsx**:
   - 3 nehézségi szint, szintenként 8 pár (összesen 24 pár).
   - *1. szint:* Kétszeri változások és szorzótényezők.
   - *2. szint:* Gyakorlati többlépéses feladatok (gép, csizma, internet).
   - *3. szint:* Pályázatok, geometria és összetett helyzetek.

4. **ComplexPercentSorter.tsx**:
   - 3 szint, szintenként 3 kategória × 4 kártya (összesen 36 elem).
   - *1. szint:* A kétszeri változás hatása az eredetihez képest (*Kisebb*, *Egyenlő*, *Nagyobb*).
   - *2. szint:* Az összesített szorzótényező ($q$) nagysága (*q < 0,90*, *0,90 ≤ q ≤ 1,10*, *q > 1,10*).
   - *3. szint:* Szöveges problémák modellje (*Láncolt árváltozás*, *Költségvetési maradék*, *Geometriai transzformáció*).

---

## Főbb Szabályok és Képletek

- **Összesített szorzótényező:** $q_{\text{össz}} = q_1 \cdot q_2 = \left(1 \pm \frac{p_1}{100}\right) \cdot \left(1 \pm \frac{p_2}{100}\right)$
- **Végső érték:** $\text{Végső} = \text{Eredeti} \cdot q_{\text{össz}}$
- **A semleges pár:** $1{,}25 \cdot 0{,}80 = 1{,}00 \implies$ a $+25\%$ utáni $-20\%$ adja vissza a pontos eredetit!
- **Geometriai felületváltozás:** $T_{\text{új}} = q_a \cdot q_b \cdot T_{\text{régi}}$

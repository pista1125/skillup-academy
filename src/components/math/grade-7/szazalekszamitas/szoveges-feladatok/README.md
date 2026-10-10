# 7. Szöveges feladatok (7. osztály)

## Tananyag Áttekintés
Gyakorlati problémák modellezése és megoldása: pénzügyi és vásárlási döntések (lakásvásárlási előleg, bankhitel, kamat, vagyonszerzési illeték), receptek és összetevők arányai (gyümölcssaláta), populációk növekedése (tengerimalacok féléves szaporodása), készletkiárusítás és visszatöltés (jégkrém eladása), valamint fordított arányosságú közös munkavégzés (takarítási idő hatékonyságnövekedéssel).

---

## Moduláris Rendszerösszetevők

1. **WordProblemsTheory.tsx**:
   - A szöveges feladatok megoldásának 5 lépéses modellje.
   - **Interaktív Lakásvásárlási és Hitel Felosztó:** Vételár, 15% előleg, 30% bankhitel, 4% vagyonszerzési illeték vizuális forrásmegoszlással.
   - **Interaktív Készletvisszatöltési Kalkulátor:** 55% jégkrém eladása után a megmaradt 45%-ra számított +122,2%-os visszatöltés dinamikus szemléltetése.
   - Receptarányok (gyümölcssaláta 8:4:6:5 arány) és fordított arányosságú munkavégzés (Eszter és Kristóf takarítása 6 óra ➔ 4 óra).

2. **WordProblemsQuiz.tsx**:
   - 30 kidolgozott kérdés 3 nehézségi szinten (10 Könnyű, 10 Közepes, 10 Nehéz), lépésről lépésre kidolgozott részletes magyarázatokkal.
   - 4 infókártya SVG ábrákkal kísért összefoglalókkal.
   - Beépített felületváltó (Kvíz $\leftrightarrow$ Párkereső $\leftrightarrow$ Csoportosító $\leftrightarrow$ Elmélet).

3. **WordProblemsMatcher.tsx**:
   - 3 nehézségi szint, szintenként 8 pár (összesen 24 pár).
   - *1. szint:* Gyors arányok és szöveges részletek (Görögország, laptop hitel, tablet ár, edzés létszám).
   - *2. szint:* Pénzügyek, statisztika és alapváltások (lakásvásárlás, illeték, jégkrém, Szofi jegyei, fogmosás).
   - *3. szint:* Receptek, munkavégzés és populációk (takarítás, tengerimalacok, gyümölcssaláta, tablet bevétel).

4. **WordProblemsSorter.tsx**:
   - 3 szint, szintenként 3 kategória × 4 kártya (összesen 36 elem).
   - *1. szint:* Keresett mennyiség típusa a szövegben (*Alap*, *Részmennyiség*, *Százalékláb*).
   - *2. szint:* Valós életbeli témakör és kontextus (*Pénzügy*, *Gasztronómia*, *Munka & Geometria*).
   - *3. szint:* Matematikai megoldási összefüggés (*Közvetlen arányosság*, *Fordított arányosság*, *Alapváltás*).

---

## Főbb Szabályok és Képletek

- **Lakásvásárlási költségvetés:** $\text{Előleg} = \text{Ár} \cdot 0{,}15$, $\text{Hitel} = \text{Ár} \cdot 0{,}30$, $\text{Illeték} = \text{Ár} \cdot 0{,}04$
- **Készlet visszatöltése:** $p\% = \frac{\text{Eladott \%}}{\text{Maradt \%}} \cdot 100\%$
- **Fordított arányosságú munkavégzés:** $t_{\text{együtt}} = \frac{t_{\text{egyedül}}}{1 + \text{hatékonyság}} = \frac{6}{1{,}5} = 4\text{ óra}$

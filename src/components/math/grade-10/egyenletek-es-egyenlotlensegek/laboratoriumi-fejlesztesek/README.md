# 3. Ráadás – Laboratóriumi fejlesztések

## Tananyag Áttekintés
Kísérleti, műszaki és laboratóriumi problémák matematikai leírása: összetett egyenletek gyakorlati kontextusban, hígítási feladatok, fizikai-kémiai összefüggések és technológiai számítások.

---

## Fő Modellezési Témák

- **Keverési és hígítási egyenletek:**
  - Különböző koncentrációjú oldatok összeöntése és kívánt töménység beállítása.
  - Tömegmegmaradás és oldott anyag megmaradásának egyenlete: $m_1 \cdot w_1 + m_2 \cdot w_2 = (m_1 + m_2) \cdot w_{\text{új}}$.
  - Speciális esetek: tiszta víz hozzáadása ($w = 0\%$), tiszta só/sav ($w = 100\%$), víz elpárologtatása (bepárlás: $- m_{\text{víz}}$).

- **Együttes munkavégzés és harmonikus áramlási modellek:**
  - Két vagy több csap együttes töltési ideje: $\frac{1}{t_1} + \frac{1}{t_2} = \frac{1}{T_{\text{együtt}}}$.
  - Időkülönbség esetén másodfokúvá alakuló törtes egyenlet ($x^2 - x - 6 = 0$).
  - Fizikai megszorítás: $t > 0$, a negatív gyök kizárása.

- **Műszaki és optikai formulák rendezése:**
  - Párhuzamos ellenállások: $\frac{1}{R_e} = \frac{1}{R_1} + \frac{1}{R_2} \implies R_e = \frac{R_1 R_2}{R_1 + R_2}$.
  - Lencsetörvény: $\frac{1}{f} = \frac{1}{t} + \frac{1}{k} \implies f = \frac{tk}{t+k}$.
  - Kinetikus sebesség: $v = \sqrt{\frac{2E_k}{m}}$.

- **Kétszeres lépcsőzetes hígítás:**
  - $V$ literből $x$ litert kivéve és vízzel feltöltve kétszer egymás után: $c_2 = c_0 \cdot \left(1 - \frac{x}{V}\right)^2$.

---

## Elkészült Komponensek és Modulok

1. **`LabDevelopmentFigures.tsx`**:
   - `MixingBeakersSvg`: Két mérőlombik összeöntése közös lombikba anyagmérleggel.
   - `ParallelFlowTubesSvg`: Két cső tölt egy közös tartályt a teljesítmények összegzésével.
   - `DilutionStepsSvg`: Lépcsőzetes hígítás folyamata és másodfokú leírása.
   - `TechnicalFormulaBridgeSvg`: Párhuzamos ellenállás és lencsetörvény algebrai hídja.
   - `LabBalanceBeakerSvg`: 3 oszlopos keverési táblázat modell.

2. **`LabDevelopmentTheory.tsx`**:
   - 5 elméleti fejezet kidolgozott mintapéldákkal és érettségi buktatókkal.
   - Jobb oldali kiemelt aranyszabályok kártya (`quickRule`).
   - 6. fejezetként a tananyag végén **Interaktív Laboratórium**: Kétkomponensű oldatkeverő szimulátor csúszkákkal és együttes csapfeltöltési kalkulátor.

3. **`LabDevelopmentQuiz.tsx`**:
   - 3 szint × 10 kérdés = 30 válogatott, gyakorlati laborfeladat.
   - Szintek előtti CheatSheet kártyák és beépített mini-játékok.

4. **`LabDevelopmentMatcher.tsx`**:
   - 3 szint × 8 pár = 24 párkereső feladat.

5. **`LabDevelopmentSorter.tsx`**:
   - 3 szint × 3 kategória (Probléma típusa, Végső töménység tartománya, Szabályok és tévhitek).

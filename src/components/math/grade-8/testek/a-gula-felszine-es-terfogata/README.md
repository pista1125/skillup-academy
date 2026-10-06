# 3. A gúla felszíne és térfogata (8. osztály)

Ez a modul a hivatalos 8. osztályos matematika tanterv (**OH-MAT08TA**) **VII. Testek** fejezetének 3. alfejezetét dolgozza fel interaktív módon.

---

## 📚 Tananyag Áttekintés

A gúla felszínének és térfogatának kiszámítása, a palástterület felbontása háromszögekre, a harmadoló térfogatképlet ($V = \frac{T_a \cdot m}{3}$), valamint a Pitagorasz-tétel alkalmazása a gúla belső derékszögű háromszögeiben.

### Főbb Képletek:
* **Felszín ($A$):**
  $$A = T_a + T_p$$
  * $T_a$: Alapterület (sokszög területe, pl. négyzetnél $a^2$, téglalapnál $a \cdot b$, szabályos háromszögnél $\frac{a^2\sqrt{3}}{4}$)
  * $T_p$: Palástterület (az oldallapok területeinek összege, szabályos gúlánál: $T_p = 2 \cdot a \cdot m_o = \frac{K_a \cdot m_o}{2}$)
* **Térfogat ($V$):**
  $$V = \frac{T_a \cdot m}{3}$$
  * *Minden gúla térfogata pontosan harmada a vele azonos alapterületű és magasságú hasáb térfogatának!*
* **Pitagorasz-kapcsolatok szabályos négyzet alapú gúlában:**
  1. **Belső felezősík:** $m^2 + \left(\frac{a}{2}\right)^2 = m_o^2$ (átfogó: $m_o$)
  2. **Oldallap felezősíkja:** $m_o^2 + \left(\frac{a}{2}\right)^2 = b^2$ (átfogó: $b$)
  3. **Átlós metszet:** $m^2 + \left(\frac{d}{2}\right)^2 = b^2$ (ahol $d = a\sqrt{2}$)

---

## 🎮 Modul Komponensek

1. **[`PyramidSurfaceVolumeTheory.tsx`](./PyramidSurfaceVolumeTheory.tsx)**
   * Interaktív Gúla Számítási Labor valós idejű csúszkákkal ($a, m$) és dinamikus 3D vázlattal.
   * Részletes elmélet, kidolgozott mintapéldák levezetésekkel.
   * Tipikus csapdák és típushibák dobozok.
   * Önellenőrző mini kvíz azonnali magyarázattal.
   * PDF export funkció.

2. **[`PyramidSurfaceVolumeQuiz.tsx`](./PyramidSurfaceVolumeQuiz.tsx)**
   * 30 feladat 3 nehézségi szinten (10 / szint).
   * Látványos geometriai SVG ábrák a kulcsfeladványokhoz.
   * Részletes levezetések és azonnali didaktikus magyarázatok.
   * CheatSheet puskakártyák.

3. **[`PyramidSurfaceVolumeMatcher.tsx`](./PyramidSurfaceVolumeMatcher.tsx)**
   * Kártyás párosító játék 3 szinten $\times$ 8 pár = 24 pár képletekkel, Pitagorasz-kapcsolatokkal és számításokkal.

4. **[`PyramidSurfaceVolumeSorter.tsx`](./PyramidSurfaceVolumeSorter.tsx)**
   * Csoportosító játék 3 szinten $\times$ 12 elem = 36 elem (Felszín vs Térfogat, Szakaszok szerepe, Matematikai állítások igazságértéke).

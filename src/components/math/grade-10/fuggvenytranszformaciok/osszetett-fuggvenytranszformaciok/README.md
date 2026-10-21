# 5. Összetett függvénytranszformációk (24. lecke)

## Tananyag Áttekintés
Több transzformációs lépés egymás utáni alkalmazása: eltolások, nyújtások, tükrözések és abszolútérték-képzés. A transzformációs lépések helyes sorrendje és a kanonikus alak általánosítása más alapfüggvényekre (abszolútérték-függvény, négyzetgyökfüggvény).

---

## Fő Témakörök és Transzformációs Lépések

- **A transzformációk helyes végrehajtási sorrendje:**
  - $f(x) \longrightarrow f(x - u) \longrightarrow a \cdot f(x - u) \longrightarrow a \cdot f(x - u) + v$.
  - 1. lépés: Vízszintes eltolás ($u$).
  - 2. lépés: Nyújtás/zsugorítás és $x$-tengelyes tükrözés ($a$).
  - 3. lépés: Függőleges eltolás ($v$).

- **Alkalmazás más alapfüggvényekre:**
  - **Abszolútérték-függvény:** $g(x) = a|x - u| + v$ (V-alakú grafikon, töréspont: $(u; v)$).
  - **Négyzetgyökfüggvény:** $h(x) = a\sqrt{x - u} + v$ (kezdőpont: $(u; v)$, értelmezési tartomány: $x \ge u$).
  - **Egészrész és törtrész függvények** transzformációi.

- **Abszolútérték kívül és belül:**
  - $|f(x)|$: Az $x$-tengely alatti részt felhajtjuk (tükrözzük az $x$-tengelyre).
  - $f(|x|)$: Csak a nemnegatív $x$-ekhez tartozó jobb oldalt tartjuk meg, és tükrözzük az $y$-tengelyre (páros függvény keletkezik).

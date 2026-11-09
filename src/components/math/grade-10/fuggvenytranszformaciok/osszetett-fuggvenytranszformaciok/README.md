# 5. Altéma: Összetett függvénytranszformációk

## Tananyag Áttekintés
Több transzformációs lépés egymás utáni alkalmazása: eltolások, nyújtások, tükrözések és külső abszolútérték-képzés. A transzformációs lépések helyes sorrendje, a kanonikus alak általánosítása különböző alapfüggvényekre (másodfokú, abszolútérték, négyzetgyök), valamint gyakorlati szöveges modellezés (pattogó labda, lemez hajtogatási optimumok).

---

## Fő Témakörök és Transzformációs Lépések

- **A kanonikus alak általános képlete:**
  - $g(x) = a \cdot f(x - u) + v$.
  - $u$: vízszintes eltolás (ellentétes előjellel, $x = u$).
  - $a$: skálázás és tükrözés ($|a| > 1$: nyújtott, $|a| < 1$: zsugorított; $a < 0$: $x$-tengelyre tükrözött).
  - $v$: függőleges eltolás (változatlan előjellel, $y = v$).
  - Kitüntetett pont közvetlenül: $T(u; v)$ vagy $V(u; v)$.

- **A transzformációk szigorú végrehajtási sorrendje:**
  1. Vízszintes eltolás: $f(x) \longrightarrow f(x - u)$.
  2. Függőleges skálázás és tükrözés: $f(x - u) \longrightarrow a \cdot f(x - u)$.
  3. Függőleges eltolás: $a \cdot f(x - u) \longrightarrow a \cdot f(x - u) + v$.
  *(A függőleges hozzáadás mindig a legutolsó lépés, különben a konstans is megszorzódna $a$-val).*

- **Függvényjellemzés közvetlenül a kanonikus alakból:**
  - Ha $a > 0$: a görbe felfelé nyílik $\implies$ Globális minimum van az $x = u$ helyen, értéke $v$. Értékkészlet: $R_f = [v; \infty[$.
  - Ha $a < 0$: a görbe lefelé nyílik $\implies$ Globális maximum van az $x = u$ helyen, értéke $v$. Értékkészlet: $R_f = ]-\infty; v]$.
  - Szimmetriatengely: az $x = u$ függőleges egyenes.

- **Zérushelyek száma ránézésre:**
  - Ha a csúcspont és a szárak ellentétes térfélre mutatnak (pl. $a > 0$ és $v < 0$, vagy $a < 0$ és $v > 0$) $\implies 2$ zérushely.
  - Ha a csúcspont a tengelyen van ($v = 0$) $\implies 1$ zérushely.
  - Ha azonos térfélre esnek (nem érik el a tengelyt) $\implies 0$ zérushely.

- **Abszolútérték kívül és belül:**
  - Külső abszolútérték ($g(x) = |f(x)|$): Az $x$-tengely alatti negatív tartományt felhajtjuk (tükrözzük az $x$-tengelyre). Parabolánál $W$-alakú görbe keletkezik.
  - Belső abszolútérték ($g(x) = f(|x|)$): A bal oldalt elhagyva a jobb oldali képet áttükrözzük az $y$-tengelyre (páros függvény keletkezik).

- **Gyakorlati modellezés a tankönyvből:**
  - Pattogó labda íve: $h(x) = -a(x - d)^2 + h_{max}$.
  - Vályú keresztmetszet területe: $T(x) = -2(x - 2,5)^2 + 12,5$.

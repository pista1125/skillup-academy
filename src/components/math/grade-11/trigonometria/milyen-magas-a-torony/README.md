# 7. Ráadás – Milyen magas a torony?

## Tananyag Áttekintés
Gyakorlati trigonometrikus magasságmérés megközelíthetetlen alappontú tereptárgyak (tornyok, hegycsúcsok) esetén: két különböző pontból mért emelkedési szög és bázistávolság segítségével felírt egyenletrendszerek.

---

## Fő Modell és Megoldási Módszer

- **A megközelíthetetlen alappont problémája:**
  - Ha a torony lábához nem tudunk odamenni, két pontot jelölünk ki egy egyenes mentén ($A$ és $B$, távolságuk $d$).
  - Megmérjük az emelkedési szögeket: $\alpha$ az $A$ pontból, $\beta$ a közelebbi $B$ pontból ($\beta > \alpha$).

- **Algebrai levezetés:**
  - Legyen a torony magassága $m$, a torony talppontjától mért távolság $B$-től $x$.
  - $\mathrm{tg}\,\beta = \frac{m}{x} \implies x = \frac{m}{\mathrm{tg}\,\beta}$
  - $\mathrm{tg}\,\alpha = \frac{m}{d + x} \implies d + x = \frac{m}{\mathrm{tg}\,\alpha}$
  - Behelyettesítve $x$-et és kifejezve $m$-et:
    $$m = \frac{d}{\frac{1}{\mathrm{tg}\,\alpha} - \frac{1}{\mathrm{tg}\,\beta}} = \frac{d \cdot \mathrm{tg}\,\alpha \cdot \mathrm{tg}\,\beta}{\mathrm{tg}\,\beta - \mathrm{tg}\,\alpha}$$

- **Alternatív megoldás szinusztétellel:**
  - Az $ABT$ háromszögben szögek kiszámítása, majd oldalhossz szinusztétellel, végül derékszögű háromszögből a magasság.

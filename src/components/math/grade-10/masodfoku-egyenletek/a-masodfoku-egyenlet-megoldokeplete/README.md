# 3. A másodfokú egyenlet megoldóképlete (31. lecke)

## Tananyag Áttekintés
Az általános másodfokú egyenlet ($ax^2 + bx + c = 0$, $a \neq 0$) megoldóképletének levezetése a teljes négyzetté kiegészítés módszerével, valamint a képlet felépítésének megértése.

---

## A Megoldóképlet és Levezetése

- **A levezetés lépései:**
  1. Kiindulás: $ax^2 + bx + c = 0 \quad (a \neq 0)$.
  2. Beszorzás $4a$-val (hogy elkerüljük a kényelmetlen törteket): $4a^2 x^2 + 4abx + 4ac = 0$.
  3. Teljes négyzet észrevétele: $(2ax + b)^2 - b^2 + 4ac = 0$.
  4. Átrendezés: $(2ax + b)^2 = b^2 - 4ac$.
  5. Négyzetgyökvonás ($b^2 - 4ac \ge 0$ esetén): $2ax + b = \pm\sqrt{b^2 - 4ac}$.
  6. $x$ kifejezése:
     $$x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

- **A képlet elemei:**
  - $a$: másodfokú tag együtthatója (főegyüttható, $a \neq 0$).
  - $b$: elsőfokú (lineáris) tag együtthatója.
  - $c$: konstans tag (szabadtag).

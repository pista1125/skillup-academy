# 4. Geometria (Rendszerező összefoglalás)

## Fejezet Áttekintés
A középiskolai geometria mind a négy területének átfogó rendszerezése: síkgeometria, trigonometria, koordinátageometria és térgeometria képletei, tételei és érettségi típusfeladatai.

---

## 1. Síkgeometria

### Háromszögek:
- **Nevezetes vonalak és metszéspontjaik:**
  - Magasságvonalak $\to$ magasságpont ($M$).
  - Súlyvonalak $\to$ súlypont ($S$), amely a súlyvonalat 2 : 1 arányban osztja a csúcstól mérve.
  - Oldalfelező merőlegesek $\to$ a köré írt kör középpontja ($O$).
  - Belső szögfelezők $\to$ a beírt kör középpontja ($K$).
- **Területképletek:**
  $$T = \frac{a \cdot m_a}{2} = \frac{ab\sin\gamma}{2} = \sqrt{s(s-a)(s-b)(s-c)} = \frac{abc}{4R} = r \cdot s \quad \left(s = \frac{a+b+c}{2}\right)$$
- **Tételek:**
  - Pitagorasz-tétel: $a^2 + b^2 = c^2$
  - Thalész-tétel: a kör átmérőjéből a körív pontjai $90^\circ$-os szögben látszanak.
  - Kerületi és középponti szögek: $\mu = 2\varphi$ (ugyanazon az íven).
  - Húrnégyszög tétele: szemközti szögek összege $180^\circ$ ($\alpha + \gamma = \beta + \delta = 180^\circ$).
  - Érintőnégyszög tétele: szemközti oldalak összege egyenlő ($a + c = b + d$).

---

## 2. Trigonometria

- **Derékszögű háromszögben:**
  $$\sin\alpha = \frac{a}{c}, \quad \cos\alpha = \frac{b}{c}, \quad \tan\alpha = \frac{a}{b}$$
- **Azonosságok:** $\sin^2\alpha + \cos^2\alpha = 1$, $\tan\alpha = \frac{\sin\alpha}{\cos\alpha}$.
- **Általános háromszögre:**
  - **Szinusztétel:** $\frac{a}{\sin\alpha} = \frac{b}{\sin\beta} = \frac{c}{\sin\gamma} = 2R$
  - **Koszinusztétel:** $c^2 = a^2 + b^2 - 2ab\cos\gamma$

---

## 3. Koordinátageometria

- **Vektorok:** $\mathbf{v}(v_1, v_2)$, $|\mathbf{v}| = \sqrt{v_1^2 + v_2^2}$.
- **Szakasz felezőpontja:** $F\left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$.
- **Háromszög súlypontja:** $S\left(\frac{x_1 + x_2 + x_3}{3}, \frac{y_1 + y_2 + y_3}{3}\right)$.
- **Két pont távolsága:** $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.
- **Skaláris szorzat:** $\mathbf{a} \cdot \mathbf{b} = a_1 b_1 + a_2 b_2 = |\mathbf{a}||\mathbf{b}|\cos\varphi$.
  - Merőlegesség feltétele: $\mathbf{a} \cdot \mathbf{b} = 0$.
- **Egyenes egyenlete:**
  - Normálvektoros ($\mathbf{n}(A, B)$): $Ax + By = Ax_0 + By_0$.
  - Irányvektoros ($\mathbf{v}(v_1, v_2) \to \mathbf{n}(v_2, -v_1)$): $v_2 x - v_1 y = v_2 x_0 - v_1 y_0$.
  - Meredekséggel ($m$): $y - y_0 = m(x - x_0)$.
- **Kör egyenlete:** $(x - u)^2 + (y - v)^2 = r^2$ ($K(u, v)$ középpont, $r$ sugár).

---

## 4. Térgeometria

| Test | Felszín ($A$) | Térfogat ($V$) |
|---|---|---|
| **Hasáb** | $2T_a + K_a m$ | $T_a \cdot m$ |
| **Henger** | $2r\pi(r + m)$ | $r^2\pi m$ |
| **Gúla** | $T_a + T_p$ | $\frac{T_a \cdot m}{3}$ |
| **Forgáskúp** | $r\pi(r + a)$ | $\frac{r^2\pi m}{3}$ |
| **Gömb** | $4R^2\pi$ | $\frac{4}{3}R^3\pi$ |
| **Csonkakúp** | $\pi[R^2 + r^2 + (R+r)a]$ | $\frac{m\pi}{3}(R^2 + Rr + r^2)$ |

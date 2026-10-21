# 6. Távolság, kerület, terület (70. lecke)

## Tananyag Áttekintés
Két pont távolságának kiszámítása, síkidomok kerületének és területének meghatározása a csúcspontok koordinátáiból (Pitagorasz-tétel, Hérón-képlet, determináns/cipőfűző-formula).

---

## Fő Fogalmak és Képletek

- **Két pont távolsága ($d(A, B)$):**
  - Legyen $A(x_1; y_1)$ és $B(x_2; y_2)$:
    $$d(A, B) = |\vec{AB}| = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

- **Sokszögek kerülete ($K$):**
  - A csúcsok közötti távolságok (oldalhosszak) összege:
    $$K = d(A, B) + d(B, C) + \dots + d(N, A)$$

- **Háromszög területe csúcspontok koordinátáiból:**
  - Ha az egyik csúcs az origó $O(0; 0)$, a másik kettő $A(a_1; a_2)$ és $B(b_1; b_2)$:
    $$T = \frac{|a_1 b_2 - a_2 b_1|}{2}$$
  - Tetszőleges $A(x_A; y_A), B(x_B; y_B), C(x_C; y_C)$ csúcsok esetén:
    $$T = \frac{|(x_B - x_A)(y_C - y_A) - (y_B - y_A)(x_C - x_A)|}{2}$$

# 8. Biztos, lehetetlen, véletlen (57. lecke)

## Tananyag Áttekintés
Eseményalgebra és a valószínűség alaptulajdonságai: biztos esemény ($P=1$), lehetetlen esemény ($P=0$), komplementer esemény, események összege és metszete.

---

## Fő Eseménytípusok és Szabályok

- **Események típusai:**
  - **Biztos esemény ($I$ vagy $\Omega$):** Minden kísérletben biztosan bekövetkezik $\implies P(\Omega) = 1$.
  - **Lehetetlen esemény ($\emptyset$):** Soha nem következhet be $\implies P(\emptyset) = 0$.
  - **Véletlen esemény ($A$):** $0 \le P(A) \le 1$.

- **Műveletek eseményekkel:**
  - **Ellentett (komplementer) esemény ($\bar{A}$):** Nem következik be $A \implies P(\bar{A}) = 1 - P(A)$.
  - **Egymást kizáró események ($A \cap B = \emptyset$):**
    $$P(A \cup B) = P(A) + P(B)$$
  - **Általános események uniója:**
    $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

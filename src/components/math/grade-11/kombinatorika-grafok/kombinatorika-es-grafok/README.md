# 9. Kombinatorika és gráfok (24. lecke)

## Tananyag Áttekintés
Összefüggő gráfok, utak, körök, fák és Euler-vonalak: kombinatorikus hálózati feladatok és topológiai bejárhatóság.

---

## Fő Gráftípusok és Tételek

- **Séta, vonal, út, kör:**
  - Összefüggő gráf: bármely két csúcsa között vezet út.
  - Körmentes gráf: nem tartalmaz zárt utat (kört).

- **Fagráf (fa):**
  - Összefüggő, körmentes egyszerű gráf.
  - **A fa alaptulajdonsága:** Bármely $n$ csúcsú fának pontosan $n - 1$ éle van:
    $$|E| = n - 1$$
  - Ha egy $n$ csúcsú fa összefüggő és $n-1$ éle van $\iff$ körmentes.

- **Euler-vonal (egy vonallal megrajzolható ábrák):**
  - Olyan zárt vagy nyílt bejárás, amely a gráf minden élén pontosan egyszer halad át.
  - **Euler-tétel:**
    - Zárt Euler-vonal létezik $\iff$ a gráf összefüggő és **minden csúcs fokszáma páros**.
    - Nyílt Euler-vonal létezik $\iff$ a gráf összefüggő és **pontosan 2 páratlan fokszámú csúcsa van** (innen indul és ide érkezik a vonal).

- **Komplementer gráf és részgráfok:**
  - $G$ komplementere ($\bar{G}$): a hiányzó élekből álló gráf. $|E(G)| + |E(\bar{G})| = \binom{n}{2}$.

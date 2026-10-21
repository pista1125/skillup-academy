# 41. A várható érték (41. lecke)

## Tananyag Áttekintés
Diszkrét valószínűségi változó fogalma, eloszlása, a várható érték ($E(X)$) és a szórás ($D(X)$) kiszámítása, valamint az igazságos játék kritériuma.

---

## 1. Diszkrét Valószínűségi Változó

- **Definíció:** Olyan $X$ függvény, amely a véletlen kísérlet minden elemi eseményéhez egy valós számot rendel hozzá ($X: \Omega \to \mathbb{R}$).
- **Eloszlása:** Megadjuk az $X$ lehetséges felvett értékeit ($x_1, x_2, \dots, x_n$) és a hozzájuk tartozó valószínűségeket ($p_1, p_2, \dots, p_n$):
  $$p_i = P(X = x_i), \quad \sum_{i=1}^n p_i = 1$$

---

## 2. A Várható Érték ($E(X)$ vagy $M(X)$)

A valószínűségi változó lehetséges értékeinek a valószínűségekkel súlyozott átlaga:
$$E(X) = \sum_{i=1}^n x_i \cdot p_i = x_1 p_1 + x_2 p_2 + \dots + x_n p_n$$
- *Jelentése:* Ha a kísérletet nagyon sokszor elvégezzük, az $X$ értékek számtani közepe a várható értékhez tart (Nagy számok törvénye).

---

## 3. Igazságos Játék Fogalma

Egy szerencsejáték akkor tekinthető **igazságosnak**, ha a nettó nyereség (nyeremény mínusz tét) várható értéke pontosan 0:
$$E(\text{Nettó nyereség}) = E(\text{Nyeremény}) - \text{Tét} = 0 \iff E(\text{Nyeremény}) = \text{Tét}$$
- Ha $E(\text{Nyeremény}) < \text{Tét}$: a játék a játékos számára kedvezőtlen (a kaszinó/lottó mindig ilyen!).
- Ha $E(\text{Nyeremény}) > \text{Tét}$: a játék a játékos számára előnyös.

---

## 4. Valószínűségi Változó Szórása ($D(X)$)

A valószínűségi változó értékeinek a várható értéktől vett szóródását méri:
$$D^2(X) = \sigma^2 = \sum_{i=1}^n (x_i - E(X))^2 \cdot p_i = E(X^2) - [E(X)]^2$$
$$D(X) = \sqrt{D^2(X)}$$

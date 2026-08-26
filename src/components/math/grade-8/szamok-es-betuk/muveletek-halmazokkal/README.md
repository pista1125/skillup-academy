# 3. Műveletek halmazokkal (8. osztály)

## Tananyag Áttekintés
A halmazműveletek precíz értelmezése, grafikus ábrázolása Venn-diagramokon és alkalmazása kombinatorikai és szöveges feladatokban.

---

## Főbb Halmazműveletek

### 1. Metszet (Közös rész, $A \cap B$)
- **Definíció:** Azon elemek halmaza, amelyek **$A$-nak és $B$-nek is** elemei ($x \in A$ ÉS $x \in B$).
- *Tulajdonság:* Ha $A \cap B = \emptyset$, a két halmaz **diszjunkt** (nincs közös elemük).
- *Példa:* $A = \{1, 2, 3, 4\}$, $B = \{3, 4, 5, 6\} \implies A \cap B = \{3, 4\}$.

### 2. Unió (Egyesítés, $A \cup B$)
- **Definíció:** Azon elemek halmaza, amelyek **legalább az egyik** halmaznak elemei ($x \in A$ VAGY $x \in B$).
- *Példa:* $A = \{1, 2, 3, 4\}$, $B = \{3, 4, 5, 6\} \implies A \cup B = \{1, 2, 3, 4, 5, 6\}$.

### 3. Különbség ($A \setminus B$)
- **Definíció:** Azon elemek halmaza, amelyek **$A$-nak elemei, de $B$-nek nem** ($x \in A$ ÉS $x \notin B$).
- *Fontos:* $A \setminus B \neq B \setminus A$ (a kivonás nem felcserélhető!).
- *Példa:* $A = \{1, 2, 3, 4\}$, $B = \{3, 4, 5, 6\} \implies A \setminus B = \{1, 2\}$, míg $B \setminus A = \{5, 6\}$.

### 4. Komplementer (Kiegészítő halmaz, $\bar{A}$ vagy $A'$)
- **Definíció:** Adott $U$ alaphalmaz esetén az $U \setminus A$ halmazt nevezzük $A$ komplementerének. Azon $U$-beli elemek, amelyek **nem tartoznak $A$-hoz**.
- *Összefüggések:* $A \cup \bar{A} = U$, $A \cap \bar{A} = \emptyset$, $\bar{\bar{A}} = A$.

### 5. Elemszám-összefüggés (Szita-formula két halmazra)
$$\lvert A \cup B \rvert = \lvert A \rvert + \lvert B \rvert - \lvert A \cap B \rvert$$
$$\lvert A \setminus B \rvert = \lvert A \rvert - \lvert A \cap B \rvert$$

---

## Mintapélda (Felvételi típusfeladat)
Egy 28 fős osztályban mindenki tanul legalább egy idegen nyelvet. 18-an tanulnak angolul és 16-an németül. Hányan tanulják mindkét nyelvet?
- $\lvert A \cup N \rvert = 28$
- $\lvert A \cup N \rvert = \lvert A \rvert + \lvert N \rvert - \lvert A \cap N \rvert$
- $28 = 18 + 16 - \lvert A \cap N \rvert \implies 28 = 34 - \lvert A \cap N \rvert \implies \lvert A \cap N \rvert = 6$.
- *Válasz:* 6 diák tanulja mindkét nyelvet.

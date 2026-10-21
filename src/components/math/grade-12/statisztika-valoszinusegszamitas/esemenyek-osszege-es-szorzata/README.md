# 38. Események összege és szorzata (38. lecke)

## Tananyag Áttekintés
Az eseményalgebra műveletei (események összege, szorzata, különbsége), a teljes eseményrendszer fogalma, és a De Morgan-azonosságok valószínűségszámítási alkalmazása.

---

## Eseményműveletek

### 1. Események Összege (Uniója, $A + B$ vagy $A \cup B$)
- **Definíció:** Az az esemény, amely pontosan akkor következik be, ha az $A$ és $B$ események közül **legalább az egyik** bekövetkezik (akár $A$, akár $B$, akár mindkettő).
- Logikai megfelelője: a "VAGY" kötőszó ($\lor$).

### 2. Események Szorzata (Metszete, $A \cdot B$ vagy $A \cap B$)
- **Definíció:** Az az esemény, amely pontosan akkor következik be, ha az $A$ és $B$ események **mindegyike egyszerre** bekövetkezik.
- Logikai megfelelője: az "ÉS" kötőszó ($\land$).

### 3. Események Különbsége ($A \setminus B$)
- Az az esemény, hogy az $A$ esemény bekövetkezik, de a $B$ esemény NEM következik be.
- Egyenértékű felírás: $A \setminus B = A \cap \bar{B}$.

---

## Teljes Eseményrendszer

Az $A_1, A_2, \dots, A_n$ események **teljes eseményrendszert** alkotnak, ha:
1. **Páronként kizárják egymást:**
   $$A_i \cap A_j = \emptyset \quad (\text{ha } i \neq j)$$
2. **Együttesen lefedik a teljes eseményteret:**
   $$A_1 \cup A_2 \cup \dots \cup A_n = \Omega$$
*(A kísérlet elvégzésekor ezen események közül pontosan az egyik fog bekövetkezni!)*

---

## De Morgan-azonosságok Eseményekre

1. **Összeg ellentettje:**
   $$\overline{A \cup B} = \bar{A} \cap \bar{B}$$
   *(Annak az ellentettje, hogy "legalább az egyik bekövetkezik", az, hogy "egyik sem következik be".)*

2. **Szorzat ellentettje:**
   $$\overline{A \cap B} = \bar{A} \cup \bar{B}$$
   *(Annak az ellentettje, hogy "mindkettő bekövetkezik", az, hogy "legalább az egyik nem következik be".)*

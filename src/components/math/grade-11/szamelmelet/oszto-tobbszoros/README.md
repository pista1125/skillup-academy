# 2. Osztó, többszörös (43. lecke)

## Tananyag Áttekintés
Az oszthatóság definíciója az egész számok körében, alapvető tulajdonságai, valódi és nem valódi osztók, prímszámok és a számelmélet alaptétele.

---

## Fő Fogalmak és Alaptételek

- **Az oszthatóság definíciója:**
  - Legyenek $a, b \in \mathbb{Z}$. Azt mondjuk, hogy $a$ osztója $b$-nek (vagy $b$ többszöröse $a$-nak), ha létezik olyan $k \in \mathbb{Z}$ egész szám, amelyre:
    $$b = a \cdot k$$
  - Jelölés: $a \mid b$ ($a$ osztja $b$-t).

- **Oszthatósági alaptulajdonságok ($a, b, c \in \mathbb{Z}$):**
  - Reflexív: $a \mid a$.
  - Tranzitív: ha $a \mid b$ és $b \mid c$, akkor $a \mid c$.
  - Lineáris kombináció: ha $a \mid b$ és $a \mid c$, akkor bármely $x, y \in \mathbb{Z}$ esetén $a \mid (x \cdot b + y \cdot c)$.
  - Szorzat oszthatósága: ha $a \mid b$, akkor $a \mid (b \cdot c)$.

- **Prímszámok és összetett számok:**
  - Prímszám: olyan 1-nél nagyobb természetes szám, amelynek pontosan két pozitív osztója van (1 és önmaga).
  - Összetett szám: 1-nél nagyobb természetes szám, amelynek kettőnél több pozitív osztója van.

- **A számelmélet alaptétele:**
  - Minden 1-nél nagyobb természetes szám a szorzótényezők sorrendjétől eltekintve egyértelműen felbontható prímszámok szorzatára (kanonikus alak):
    $$n = p_1^{\alpha_1} \cdot p_2^{\alpha_2} \cdot \dots \cdot p_k^{\alpha_k}$$
  - A pozitív osztók száma: $d(n) = (\alpha_1 + 1)(\alpha_2 + 1)\dots(\alpha_k + 1)$.

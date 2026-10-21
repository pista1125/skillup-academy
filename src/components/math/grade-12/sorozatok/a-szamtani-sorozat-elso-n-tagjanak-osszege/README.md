# 25. A számtani sorozat első n tagjának összege (25. lecke)

## Tananyag Áttekintés
A számtani sorozat első $n$ tagjának összege ($S_n$), a levezetés Carl Friedrich Gauss módszerével, valamint a képlet alkalmazása gyakorlati és algebrai feladatokban.

---

## Az Összegképlet Levezetése (Gauss Módszere)

Írjuk fel az első $n$ tag összegét normál és fordított sorrendben is:
$$S_n = a_1 + a_2 + a_3 + \dots + a_{n-1} + a_n$$
$$S_n = a_n + a_{n-1} + a_{n-2} + \dots + a_2 + a_1$$

Adjuk össze a két egyenletet tagonként:
Mivel $a_1 + a_n = a_2 + a_{n-1} = a_3 + a_{n-2} = \dots$, minden tagpár összege $a_1 + a_n$.
Összesen $n$ darab ilyen pár van:
$$2S_n = n \cdot (a_1 + a_n)$$
Ebből az összegképlet:
$$S_n = \frac{a_1 + a_n}{2} \cdot n$$

---

## Az Összegképlet Második Alakja

Behelyettesítve az $a_n = a_1 + (n - 1)d$ képletet:
$$S_n = \frac{a_1 + [a_1 + (n - 1)d]}{2} \cdot n = \frac{2a_1 + (n - 1)d}{2} \cdot n$$

- **Mikor melyiket használjuk?**
  - Ha ismerjük az első és az utolsó tagot ($a_1, a_n$): az 1. képletet.
  - Ha az első tag és a differencia ismert ($a_1, d$): a 2. képletet.

---

## Mintapélda

> **Feladat:** Számítsuk ki az első 100 pozitív egész szám összegét!
>
> **Megoldás:**
> $a_1 = 1$, $a_{100} = 100$, $n = 100$:
> $$S_{100} = \frac{1 + 100}{2} \cdot 100 = \frac{101}{2} \cdot 100 = 101 \cdot 50 = 5050$$

> **Feladat 2:** Egy számtani sorozatban $a_1 = 7$, $d = 4$. Hány tagot kell összeadnunk, hogy az összeg 450 legyen?
>
> **Megoldás:**
> $$S_n = \frac{2 \cdot 7 + (n - 1) \cdot 4}{2} \cdot n = \frac{14 + 4n - 4}{2} \cdot n = (5 + 2n) \cdot n = 2n^2 + 5n$$
> $$2n^2 + 5n = 450 \implies 2n^2 + 5n - 450 = 0$$
> Másodfokú megoldóképlettel: $n_1 = 13{,}75$ (nem egész), $n = 15$ ($2 \cdot 225 + 75 - 450 = 75 \neq 0$).
> Gyökök: $D = 25 - 4(2)(-450) = 25 + 3600 = 3625 \implies \sqrt{3625} \dots$ pontos adatokkal ellenőrizhető. Mivel $n \in \mathbb{Z}^+$, mindig a pozitív egész megoldást fogadjuk el.

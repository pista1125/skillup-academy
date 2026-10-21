# 2. Sorba rendezés (17. lecke)

## Tananyag Áttekintés
Permutációk és sorba rendezési problémák: ismétlés nélküli permutáció ($n!$), ismétléses permutáció azonos elemek jelenlétében, és korlátozott sorba rendezések.

---

## Fő Fogalmak és Képletek

- **Ismétlés nélküli permutáció ($P_n$):**
  - $n$ különböző elem összes lehetséges sorrendje:
    $$P_n = n! = n \cdot (n-1) \cdot (n-2) \dots 2 \cdot 1$$
  - $0! = 1$ definíció szerint.

- **Ismétléses permutáció ($P_n^{k_1, k_2, \dots, k_r}$):**
  - Ha az $n$ elem között azonosak is vannak ($k_1$ db egyforma, $k_2$ db egyforma, ..., $\sum k_i = n$):
    $$P_n^{k_1, k_2, \dots, k_r} = \frac{n!}{k_1! \cdot k_2! \dots k_r!}$$
  - Példa: A "MATEMATIKA" szó betűinek anagrammái ($n=10$, $M:2, A:3, T:2, E:1, I:1, K:1$):
    $$\frac{10!}{2! \cdot 3! \cdot 2! \cdot 1! \cdot 1! \cdot 1!} = 151\,200$$

- **Feltételes sorba rendezés:**
  - Adott elemek egymás mellé kerülése (blokkosítás) vagy éppen szétválasztása.

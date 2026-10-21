# 1. Jelszavak (16. lecke)

## Tananyag Áttekintés
Kombinatorikai alapszabályok, szorzási és összeadási szabály, jelszavak, PIN-kódok és kódrendszerek erősségének és lehetséges számainak kiszámítása (ismétléses variáció).

---

## Fő Fogalmak és Képletek

- **A szorzási szabály (független döntések):**
  - Ha az első helyre $n_1$-féleképpen, a másodikra $n_2$-féleképpen választhatunk elemet, akkor a két döntés együttesen $n_1 \cdot n_2$-féleképpen hozható meg.

- **Ismétléses variáció ($V_n^{k, \text{ism}}$):**
  - $n$ különböző elemből választunk $k$ hosszúságú sorozatot úgy, hogy az elemek ismétlődhetnek, és a sorrend számít:
    $$V_n^{k, \text{ism}} = n^k$$
  - Példák: 4 jegyű PIN-kód ($10^4 = 10\,000$), 8 karakteres alfanumerikus jelszó ($62^8$).

- **Biztonság és kombinációk száma:**
  - Jelszó feltörésének ideje és jelszóerősség növelése a karakterkészlet és a hossz növelésével.

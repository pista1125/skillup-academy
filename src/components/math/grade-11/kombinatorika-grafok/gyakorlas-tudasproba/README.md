# 10. Gyakorlás, tudáspróba (25. lecke)

## Tananyag Áttekintés
A kombinatorika (permutáció, variáció, kombináció, binomiális tétel) és a gráfelmélet (csúcsok, élek, fokszámok, Euler-vonal, fák) összefoglaló ismétlése, típusfeladatok megoldása és tudáspróba.

---

## Fő Összefoglaló Témák és Kérdések

- **Melyik kombinatorikai modellt alkalmazzuk?**
  - Számít a sorrend vagy sem?
  - Minden elemet felhasználunk, vagy csak egy részét?
  - Ismétlődhetnek az elemek vagy sem?
  - Rendszerező táblázat:
    - Sorrend számít, minden elem: **Permutáció** ($n!$ vagy $\frac{n!}{k_1! \cdot \dots \cdot k_r!}$)
    - Sorrend számít, $k$ darab elem: **Variáció** ($\frac{n!}{(n-k)!}$ vagy $n^k$)
    - Sorrend nem számít: **Kombináció** ($\binom{n}{k}$ vagy $\binom{n+k-1}{k}$)

- **Gráfelméleti ellenőrzőlista:**
  - Létezhet-e megadott fokszámú gráf? (Kézfogási lemma: páratlan fokszámú csúcsok száma páros!)
  - Fa éleinek száma: $|E| = n - 1$.
  - Bejárható-e a gráf egy vonallal? (Páratlan csúcsok száma 0 vagy 2).
  - Teljes gráf éleinek száma: $\binom{n}{2} = \frac{n(n-1)}{2}$.

- **Típusfeladatok a tudáspróbához:**
  - Jelszó- és kódkészítési problémák feltételekkel.
  - Sorsolások, bizottságválasztások esetszétválasztással.
  - Gráfok modellezése ismeretségi, körmérkőzéses és úthálózati szituációkban.

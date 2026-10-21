# 43. Gyakorlás (43. lecke)

## Tananyag Áttekintés
Összetett feladatok megoldása eseményfákkal, feltételes valószínűségekkel, a teljes valószínűség tételével, és a binomiális eloszlás alkalmazása érettségi típusfeladatokban.

---

## Tipikus Érettségi Feladattípusok

### 1. Fadiagram és Teljes Valószínűség
> **Feladat:** Egy üzemben két automata gép csavarokat gyárt. Az A gép a termelés 60%-át adja, és 2%-ban gyárt selejtet. A B gép a termelés 40%-át adja, és 5%-ban gyárt selejtet.
> a) Mekkora a valószínűsége, hogy egy véletlenszerűen kiválasztott csavar selejtes?
> b) Ha a kiválasztott csavar selejtes, mekkora a valószínűsége, hogy azt az A gép gyártotta (Bayes-tétel)?
>
> **Megoldás:**
> - $P(A) = 0{,}6$, $P(\text{Sel} | A) = 0{,}02$
> - $P(B) = 0{,}4$, $P(\text{Sel} | B) = 0{,}05$
> 
> a) Teljes valószínűség tétele:
> $$P(\text{Sel}) = P(A) \cdot P(\text{Sel} | A) + P(B) \cdot P(\text{Sel} | B)$$
> $$P(\text{Sel}) = 0{,}6 \cdot 0{,}02 + 0{,}4 \cdot 0{,}05 = 0{,}012 + 0{,}020 = 0{,}032 \quad (3{,}2\%)$$
> 
> b) Bayes-tétel (feltételes valószínűség):
> $$P(A | \text{Sel}) = \frac{P(A \cap \text{Sel})}{P(\text{Sel})} = \frac{0{,}012}{0{,}032} = \frac{12}{32} = \frac{3}{8} = 0{,}375 \quad (37{,}5\%)$$

---

### 2. "Legalább egy" Feladattípus (Ellentett Esemény)
> **Feladat:** Egy szabályos dobókockát hatszor egymás után feldobunk. Mekkora a valószínűsége, hogy legalább egyszer 6-ost dobunk?
>
> **Megoldás:**
> - Az ellentett esemény: egyszer sem dobunk 6-ost (mind a 6 alkalommal 1, 2, 3, 4 vagy 5 jön ki).
> - Annak valószínűsége egy dobásnál, hogy nem 6-os: $p = \frac{5}{6}$.
> - Mivel a dobások függetlenek:
>   $$P(\text{egyszer sem 6-os}) = \left(\frac{5}{6}\right)^6 \approx 0{,}3349$$
> - Így a keresett valószínűség:
>   $$P(\text{legalább egy 6-os}) = 1 - \left(\frac{5}{6}\right)^6 = 1 - 0{,}3349 \approx 0{,}6651 \quad (66{,}51\%)$$

# 3. Legnagyobb közös osztó, legkisebb közös többszörös (44. lecke)

## Tananyag Áttekintés
A legnagyobb közös osztó ($\text{LNKO}$) és legkisebb közös többszörös ($\text{LKKT}$) fogalma, kiszámításuk kanonikus prímfelbontással és az euklideszi algoritmussal, valamint a relatív prímek fogalma.

---

## Fő Fogalmak és Algoritmusok

- **Legnagyobb közös osztó ($\text{LNKO}(a, b)$ vagy $(a, b)$):**
  - Az a legnagyobb pozitív egész szám, amely mindkét számot maradék nélkül osztja.
  - Prímtényezős felbontásból: a közös prímtényezők a legkisebb előforduló hatványkitevőn megszorozva.
  - Relatív prímek: ha $\text{LNKO}(a, b) = 1$.

- **Legkisebb közös többszörös ($\text{LKKT}[a, b]$ vagy $[a, b]$):**
  - Az a legkisebb pozitív egész szám, amelynek mindkét szám osztója.
  - Prímtényezős felbontásból: minden előforduló prímtényező a legnagyobb hatványkitevőn összeszorozva.

- **Alapösszefüggés:**
  $$\text{LNKO}(a, b) \cdot \text{LKKT}[a, b] = a \cdot b$$

- **Euklideszi algoritmus nagy számokra:**
  - Maradékos osztások láncolata: $a = b \cdot q_1 + r_1$, majd $b = r_1 \cdot q_2 + r_2$, ...
  - Az utolsó nem nulla maradék maga a legnagyobb közös osztó: $\text{LNKO}(a, b) = r_k$.

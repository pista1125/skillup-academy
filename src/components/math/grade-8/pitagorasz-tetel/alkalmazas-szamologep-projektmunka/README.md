# 5. A Pitagorasz-tétel alkalmazása számológép segítségével – Projektmunka (8. osztály)

## Tananyag Áttekintés
Számológéphasználat a Pitagorasz-tétel alkalmazásakor (négyzetre emelés, gyökvonás, műveleti sorrend, kerekítés és pontosság), valamint projektfeladatok (papírhajtogatás, Theodórosz spirálja / gyökcsiga, szerkesztés és modellezés).

---

## 1. Számológéphasználati Szabályok és Trükkök

1. **Műveleti sorrend zárójelekkel:**
   $$c = \sqrt{a^2 + b^2} \implies \sqrt{(a^2 + b^2)}$$
   *Mindig használj zárójelet a gyökjel alatt, ha a számológép nem húzza végig a gyökvonalat!*
2. **Kerekítés és mértékegységek:**
   - A tizedesjegyek számát a feladat szövege szerint kell megadni (pl. két tizedesjegyre kerekítve: $\sqrt{50} \approx 7{,}07$).
   - A köztes eredményeket a számológép memóriájában célszerű tárolni a kerekítési hibák halmozódásának elkerülésére.
3. **Becslés a gyökvonás előtt:**
   - Mivel $7^2 = 49$ és $8^2 = 64$, ezért $\sqrt{50}$ biztosan 7 és 8 közé esik, nagyon közel a 7-hez ($7{,}07$).

---

## 2. Projektmunka: „Számolj, szerkessz, vágj, hajtogass!”

### A. Theodórosz Spirálja (Gyökcsiga)
- Egységnyi ($1\text{ cm}$) befogójú egyenlő szárú derékszögű háromszögből indulunk ki: átfogója $\sqrt{1^2 + 1^2} = \sqrt{2}$.
- Ennek átfogójára merőlegesen újabb $1\text{ cm}$-es befogót emelünk: átfogója $\sqrt{(\sqrt{2})^2 + 1^2} = \sqrt{3}$.
- Ezt láncszerűen folytatva tetszőleges $\sqrt{n}$ ($n \in \mathbb{N}$) hosszúságú szakasz pontosan megszerkeszthető!
- $\sqrt{2}, \sqrt{3}, \sqrt{4}=2, \sqrt{5}, \sqrt{6}, \dots, \sqrt{17}$.

### B. Papírhajtogatásos Pitagorasz-bizonyítás
- Egy négyzet alakú papírlap sarkainak behajtásával, illetve 4 egybevágó derékszögű háromszög átrendezésével közvetlenül igazolható, hogy $a^2 + b^2 = c^2$.

# 13. Tizedes törtek szorzása természetes számmal

## Tananyag Áttekintés
Tizedestörtek szorzása $10, 100, 1000$-rel (tizedesvessző eltolása jobbra), valamint tizedestörtek szorzása tetszőleges természetes számmal írásbeli algoritmussal és a tizedesjegyek számlálásával.

---

## Főbb Szabályok

### 1. Szorzás $10, 100, 1000$-rel
- A tizedesvesszőt annyi hellyel visszük **jobbra**, ahány nulla van a szorzóban ($1, 2, 3$).
- $3{,}456 \cdot 10 = 34{,}56$
- $3{,}456 \cdot 100 = 345{,}6$
- $3{,}456 \cdot 1000 = 3456$

### 2. Szorzás Tetszőleges Egész Számmal
1. A szorzást elvégezzük úgy, mintha mindkét szám egész szám lenne (figyelmen kívül hagyva a tizedesvesszőt).
2. A kapott szorzatban a végétől (jobbról) annyi tizedesjegyet választunk le a tizedesvesszővel, ahány tizedesjegye volt a tizedestört szorzandónak.

### Példa:
$$4{,}25 \cdot 3 \implies 425 \cdot 3 = 1275 \implies 12{,}75$$

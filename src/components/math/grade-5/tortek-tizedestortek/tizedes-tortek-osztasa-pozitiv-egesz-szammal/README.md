# 14. Tizedes törtek osztása pozitív egész számmal

## Tananyag Áttekintés
Tizedestörtek osztása $10, 100, 1000$-rel (tizedesvessző eltolása balra), valamint tizedestörtek lépcsős írásbeli osztása pozitív egész számmal, a tizedesvessző kitétele a hányadosban, amikor elérjük az egész rész végét.

---

## Főbb Szabályok és Algoritmus

### 1. Osztás $10, 100, 1000$-rel
- A tizedesvesszőt annyi hellyel visszük **balra**, ahány nulla van az osztóban ($1, 2, 3$).
- $45{,}6 : 10 = 4{,}56$
- $45{,}6 : 100 = 0{,}456$
- $45{,}6 : 1000 = 0{,}0456$

### 2. Írásbeli Osztás Egész Számmal
1. Az osztást az egész résszel kezdjük.
2. Amikor az **egész rész végére érünk (és átlépjük a tizedesvesszőt)**, a hányadosba azonnal kirakjuk a **tizedesvesszőt**.
3. Folytatjuk az osztást a tizedesjegyek lehozásával. Ha elfogynak a tizedesjegyek, de még van maradék, nullákat hozunk le a maradék mellé.

### Példa:
$$7{,}5 : 2 = 3{,}75$$
- $7:2 = 3$, maradék $1$. Kirakjuk a vesszőt: $3{,}$.
- Lehozzuk az $5$-öt: $15:2 = 7$, maradék $1$.
- Lehozunk egy $0$-t: $10:2 = 5$, maradék $0$.

# 9. Kivonás, írásbeli kivonás

## Tananyag Áttekintés
A kivonás tagjai (kisebbítendő, kivonandó, különbség), az írásbeli kivonás pótlási és levonási algoritmusa, átlépések (tízes kölcsönkérése) és az eredmény ellenőrzése összeadással.

---

## Főbb Szabályok és Algoritmus

### 1. A Kivonás Tagjai
$$\text{kisebbítendő} - \text{kivonandó} = \text{különbség}$$
- A kivonás **nem felcserélhető** és **nem csoportosítható**!

### 2. Írásbeli Kivonás (Pótlási Módszer)
1. A számokat helyiértékek szerint egymás alá írjuk (kisebbítendő felül, kivonandó alul).
2. Jobbról balra (az egyesek helyén) pótoljuk az alsó számot a felsőhöz: *„Hányat kell adni $b$-hez, hogy $a$ legyen?”*
3. Ha $b > a$, akkor kölcsönveszünk egy tízest a bal oldali oszlopból ($10+a$), és a következő lépésben a kivonandóhoz hozzáadunk $1$-et (*„maradt az $1$”*).

### 3. Ellenőrzés
$$\text{különbség} + \text{kivonandó} = \text{kisebbítendő}$$

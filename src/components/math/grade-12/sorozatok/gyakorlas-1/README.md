# 31. Gyakorlás (31. lecke)

## Tananyag Áttekintés
Összetett érettségi típusú szöveges és pénzügyi feladatok gyakorlása, sorozatok felismerése és modellezése valós szituációkban, logaritmusos számítások a futamidőre.

---

## Mintapélda 1: Megtakarítás Kiszámítása

> **Feladat:** Egy szülő gyermeke születésekor és minden további születésnapján (az 1.-től a 18.-ig) 100 000 Ft-ot fizet be egy bankszámlára, amely évi 5% kamatos kamatot garantál. Mekkora összeg gyűlik össze a 18. születésnap utáni napon?
>
> **Megoldás:**
> - $a = 100\ 000\text{ Ft}$
> - $q = 1 + 0{,}05 = 1{,}05$
> - A befizetések száma: a születéskor (0. év) + 18 születésnapon = összesen $19$ befizetés.
> - A legutolsó befizetés nem kamatozik, a legelső 18 évig kamatozik:
>   $$S_{19} = 100\ 000 \cdot \frac{1{,}05^{19} - 1}{1{,}05 - 1} = 100\ 000 \cdot \frac{2{,}527 - 1}{0{,}05} \approx 3\ 054\ 000\text{ Ft}$$

---

## Mintapélda 2: Hitel Futamidejének Számítása Logaritmussal

> **Feladat:** 2 000 000 Ft hitelt vettünk fel évi 8% kamatra ($q = 1{,}08$). Évente 300 000 Ft-ot tudunk törleszteni. Hány év alatt fizetjük vissza a hitelt?
>
> **Megoldás:**
> $$H \cdot q^n = a \cdot \frac{q^n - 1}{q - 1}$$
> $$2\ 000\ 000 \cdot 1{,}08^n = 300\ 000 \cdot \frac{1{,}08^n - 1}{0{,}08}$$
> $$20 \cdot 1{,}08^n = 3 \cdot 12{,}5 \cdot (1{,}08^n - 1) = 37{,}5 \cdot 1{,}08^n - 37{,}5$$
> $$37{,}5 = 17{,}5 \cdot 1{,}08^n \implies 1{,}08^n = \frac{37{,}5}{17{,}5} \approx 2{,}143$$
> Mindkét oldal tízes alapú logaritmusát véve:
> $$n \cdot \lg 1{,}08 = \lg 2{,}143 \implies n = \frac{\lg 2{,}143}{\lg 1{,}08} \approx \frac{0{,}331}{0{,}0334} \approx 9{,}9\text{ év}$$
> Tehát a 10. évben fizetjük vissza teljesen a hitelt.

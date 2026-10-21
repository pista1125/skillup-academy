# 40. Geometriai valószínűség (40. lecke)

## Tananyag Áttekintés
A geometriai valószínűség modellje végtelen sok kimenetelű, folytonos kísérletekre: hosszúságok, területek és térfogatok aránya, céltáblás problémák, és a klasszikus találkozási feladat koordináta-geometriai modellezése.

---

## A Geometriai Valószínűség Definíciója

Amikor a véletlen kísérlet kimenetelei egy geometriai tartomány ($\Omega$) pontjai, és annak valószínűsége, hogy a véletlenszerű pont egy $A \subseteq \Omega$ résztartományba esik, egyenesen arányos a részhalmaz mértékével (és független a tartomány alakjától és helyétől):
$$P(A) = \frac{\text{kedvező mérték}}{\text{összes mérték}} = \frac{\mu(A)}{\mu(\Omega)}$$

---

## Dimenziók Szerinti Alkalmazások

1. **1 Dimenzió – Szakaszok (hosszúságok aránya):**
   Egy $L$ hosszúságú szakaszon véletlenszerűen kiválasztott pont egy $l$ hosszúságú részszakaszba esik:
   $$P(A) = \frac{l}{L}$$

2. **2 Dimenzió – Síkidomok (területek aránya):**
   Egy $T_\Omega$ területű tartományban egy $T_A$ területű célterület:
   $$P(A) = \frac{T_A}{T_\Omega}$$
   *Példa:* $R$ sugarú kör alakú céltáblán a belső $r$ sugarú kör eltalálásának valószínűsége:
   $$P = \frac{r^2\pi}{R^2\pi} = \left(\frac{r}{R}\right)^2$$

3. **3 Dimenzió – Testek (térfogatok aránya):**
   $$P(A) = \frac{V_A}{V_\Omega}$$

---

## A Találkozási Feladat

> **Feladat:** Anna és Béla megbeszélik, hogy 12:00 és 13:00 között találkoznak a kávézóban. Mindketten véletlenszerűen érkeznek a 60 perces idősávban, és legfeljebb 15 percet várnak a másikra. Mekkora a valószínűsége, hogy találkoznak?
>
> **Megoldás modellje:**
> - Legyen $x$ Anna, $y$ Béla érkezési ideje percekben ($0 \le x \le 60, 0 \le y \le 60$).
> - Az eseménytér $\Omega$ a $[0, 60] \times [0, 60]$ négyzet, területe $T_\Omega = 60 \times 60 = 3600$.
> - Akkor találkoznak, ha érkezéseik különbsége legfeljebb 15 perc: $|x - y| \le 15$.
> - Ez a terület az $y = x + 15$ és $y = x - 15$ egyenesek közötti sáv.
> - A nem találkozás területe a két sarokban lévő egyenlő szárú derékszögű háromszög, befogóik $60 - 15 = 45$:
>   $$T_{\text{nem}} = 2 \cdot \frac{45 \cdot 45}{2} = 45^2 = 2025$$
> - A találkozás területe: $T_A = 3600 - 2025 = 1575$.
> - A találkozás valószínűsége:
>   $$P(A) = \frac{1575}{3600} = \frac{7}{16} = 0{,}4375 \quad (43{,}75\%)$$

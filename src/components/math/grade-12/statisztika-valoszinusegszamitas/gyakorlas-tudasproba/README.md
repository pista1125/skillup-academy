# 44. Gyakorlás, tudáspróba (44. lecke)

## Tananyag Áttekintés
A 12. osztályos statisztika és valószínűségszámítás fejezet átfogó összefoglalása, képlettára, valamint a fejezetzáró önértékelő tudáspróba pontozási útmutatóval.

---

## Összefoglaló Képlettár

| Témakör | Képlet / Definíció | Megjegyzés |
|---|---|---|
| **Számtani közép (átlag)** | $\bar{x} = \frac{\sum f_i x_i}{N}$ | Érzékeny a kiugró értékekre |
| **Medián ($Me$)** | Rendezett sor középső eleme | Robusztus helyzeti mutató |
| **Szórás ($s$)** | $s = \sqrt{\frac{\sum f_i(x_i - \bar{x})^2}{N}}$ | Az átlagtól vett átlagos eltérés |
| **Klasszikus valószínűség** | $P(A) = \frac{k}{n} = \frac{|A|}{|\Omega|}$ | Egyenlően valószínű elemi események |
| **Összeadási tétel** | $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ | Ha kizáró: $P(A \cap B) = 0$ |
| **Feltételes valószínűség** | $P(A \mid B) = \frac{P(A \cap B)}{P(B)}$ | $P(A \cap B) = P(B)P(A \mid B)$ |
| **Geometriai valószínűség** | $P(A) = \frac{\mu(A)}{\mu(\Omega)}$ | Hossz, terület, térfogat aránya |
| **Várható érték** | $E(X) = \sum x_i p_i$ | Súlyozott elméleti átlag |
| **Binomiális eloszlás** | $P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$ | Visszatevéses mintavétel |
| **Hipergeometrikus eloszlás**| $P(X = k) = \frac{\binom{M}{k}\binom{N-M}{n-k}}{\binom{N}{n}}$ | Visszatevés nélküli mintavétel |

---

## Önértékelő Tudáspróba Kérdések

1. Egy dolgozat eredményei: öt darab 2-es, nyolc darab 3-as, tizenkét darab 4-es és öt darab 5-ös. Határozd meg az átlagot, a móduszt, a mediánt és a terjedelmet!
2. Egy dobozdiagramon a legkisebb érték 12, $Q_1 = 20$, $Me = 28$, $Q_3 = 35$, a maximum 50. Mennyi az interkvartilis terjedelem ($IQR$), és szimmetrikus-e az eloszlás?
3. Két szabályos kockával dobunk egyszerre. Mennyi a valószínűsége, hogy a dobott számok összege legalább 9?
4. Egy célpont egy 20 cm sugarú kör, amelyben a tízes találat egy belső, 4 cm sugarú kör. Feltéve, hogy a lövedék eltalálja a céltáblát, mekkora a tízes találat valószínűsége?
5. Egy 20 fős osztályba 12 fiú és 8 lány jár. Véletlenszerűen kiválasztanak 4 tanulót. Mekkora a valószínűsége, hogy pontosan 2 fiú és 2 lány lesz köztük?

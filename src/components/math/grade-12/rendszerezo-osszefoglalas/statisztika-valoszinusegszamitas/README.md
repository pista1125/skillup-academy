# 5. Statisztika, valószínűségszámítás (Rendszerező összefoglalás)

## Fejezet Áttekintés
A leíró statisztika mutatóinak, grafikonjainak, valamint a valószínűségszámítás alaptételeinek, eloszlásainak és érettségi pontszerző típusfeladatainak átfogó rendszerezése.

---

## 1. Leíró Statisztika

### Középértékek:
- **Számtani közép (átlag):** $\bar{x} = \frac{\sum x_i}{N} = \frac{\sum f_i x_i}{\sum f_i}$ (érzékeny a kiugró adatokra).
- **Medián ($Me$):** A nagyság szerint rendezett adatsor középső eleme (páratlan $N$-re a középső, párosra a két középső átlaga).
- **Módusz ($Mo$):** A leggyakoribb érték (lehet több is).
- **Kvártilisek:** $Q_1$ (alsó 25%), $Q_2 = Me$ (50%), $Q_3$ (felső 75%).

### Szóródási Mutatók:
- **Terjedelem ($R$):** $R = x_{\max} - x_{\min}$.
- **Interkvartilis terjedelem ($IQR$):** $IQR = Q_3 - Q_1$.
- **Szórás ($s$):** $s = \sqrt{\frac{\sum (x_i - \bar{x})^2}{N}} = \sqrt{\frac{\sum f_i(x_i - \bar{x})^2}{N}}$.

### Dobozdiagram (Boxplot):
Az 5 számos összefoglalás ábrázolása: $\min, \quad Q_1, \quad Me, \quad Q_3, \quad \max$.
- Doboz hossza = $IQR$.
- A medián helyzete a dobozon belül jelzi az eloszlás szimmetriáját vagy ferdeségét.

---

## 2. Valószínűségszámítás

### Alapfogalmak és Szabályok:
- **Klasszikus valószínűség:** $P(A) = \frac{\text{kedvező esetek}}{\text{összes eset}} = \frac{k}{n}$ (egyenlően valószínű elemi eseményekre).
- **Ellentett esemény:** $P(\bar{A}) = 1 - P(A)$.
  - *Tipp:* Ha a feladat szövegében az szerepel, hogy **"legalább egy"**, szinte mindig az ellentett eseménnyel ("egy sem") érdemes számolni!
- **Összeadási szabály:**
  - Független / tetszőleges eseményekre: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
  - Egymást kizáró eseményekre ($A \cap B = \emptyset$): $P(A \cup B) = P(A) + P(B)$.
- **Feltételes valószínűség és szorzási szabály:**
  $$P(A \mid B) = \frac{P(A \cap B)}{P(B)} \implies P(A \cap B) = P(B) \cdot P(A \mid B)$$
  - Ha $A$ és $B$ **független**: $P(A \cap B) = P(A) \cdot P(B)$.

---

## 3. Folytonos és Diszkrét Modellek

- **Geometriai valószínűség:**
  $$P(A) = \frac{\text{kedvező mérték}}{\text{összes mérték}} = \frac{\mu(A)}{\mu(\Omega)}$$
  (Hosszúságok, területek vagy térfogatok aránya).
- **Várható érték ($E(X)$):**
  $$E(X) = \sum_{i=1}^n x_i \cdot p_i$$
  - Igazságos játék: $E(\text{nyeremény}) = \text{tét}$.

---

## 4. Mintavételi Modellek

- **Visszatevéses mintavétel $\to$ Binomiális eloszlás:**
  $n$ független kísérlet, a siker valószínűsége $p$, a kudarcé $1 - p$:
  $$P(X = k) = \binom{n}{k} \cdot p^k \cdot (1 - p)^{n - k} \quad (k = 0, 1, \dots, n)$$
  $$E(X) = n \cdot p$$
- **Visszatevés nélküli mintavétel $\to$ Hipergeometrikus eloszlás (lottó, selejtek):**
  $$P(X = k) = \frac{\binom{M}{k} \cdot \binom{N - M}{n - k}}{\binom{N}{n}}$$

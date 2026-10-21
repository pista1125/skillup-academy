# 34. Statisztikai jellemzők (34. lecke)

## Tananyag Áttekintés
A minta helyzetét és elhelyezkedését leíró középértékek (módusz, medián, számtani közép, kvártilisek) és a szóródást leíró mutatók (terjedelem, interkvartilis terjedelem, variancia, szórás).

---

## 1. Középértékek

### Helyzeti Középértékek:
- **Módusz ($Mo$):** A mintában leggyakrabban előforduló érték (a legnagyobb gyakoriságú adat).
  - Lehet egyetlen módusz (unimodális), több módusz (bimodális / multimodális), vagy ha minden érték egyszer fordul elő, nincs módusz.
- **Medián ($Me$):** A nagyság szerint növekvő sorba rendezett adatsor középső eleme.
  - Ha az adatok száma $N$ páratlan: a pontosan középen lévő $\frac{N+1}{2}$-edik elem.
  - Ha $N$ páros: a két középső elem számtani közepe: $\frac{x_{N/2} + x_{N/2 + 1}}{2}$.
  - *Előnye:* Nem érzékeny a kiugró szélső értékekre (robusztus mutató)!

### Számított Középérték:
- **Számtani közép (átlag, $\bar{x}$):**
  - Egyszerű átlag: $\bar{x} = \frac{x_1 + x_2 + \dots + x_N}{N} = \frac{\sum x_i}{N}$
  - Súlyozott átlag (gyakorisági táblázatból): $\bar{x} = \frac{\sum f_i x_i}{\sum f_i} = \sum g_i x_i$

---

## 2. Kvártilisek
A sorba rendezett mintát 4 egyenlő részre osztó értékek:
- **Alsó kvártilis ($Q_1$):** Az adatok 25%-a kisebb vagy egyenlő nála (az alsó fél mediánja).
- **Középső kvártilis ($Q_2$):** Maga a medián ($Me$).
- **Felső kvártilis ($Q_3$):** Az adatok 75%-a kisebb vagy egyenlő nála (a felső fél mediánja).

---

## 3. Szóródási Mutatók

- **Terjedelem ($R$):** A legnagyobb és legkisebb elem különbsége:
  $$R = x_{\max} - x_{\min}$$
- **Interkvartilis terjedelem ($IQR$):** A felső és alsó kvártilis különbsége (a középső 50% terjedelme):
  $$IQR = Q_3 - Q_1$$
- **Szórásnégyzet (variancia, $s^2$):** Az átlagtól vett négyzetes eltérések átlaga:
  $$s^2 = \frac{1}{N} \sum_{i=1}^N (x_i - \bar{x})^2 = \frac{\sum f_i(x_i - \bar{x})^2}{N}$$
- **Szórás ($s$):** A variancia négyzetgyöke (mértékegysége megegyezik az adatokéval):
  $$s = \sqrt{\frac{1}{N} \sum_{i=1}^N (x_i - \bar{x})^2}$$

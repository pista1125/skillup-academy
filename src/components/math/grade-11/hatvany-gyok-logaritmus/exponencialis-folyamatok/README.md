# 8. Exponenciális folyamatok (33. lecke)

## Tananyag Áttekintés
Valós életbeli exponenciális folyamatok modellezése: baktériumtenyészetek szaporodása, népességnövekedés, fertőzések terjedése és hűlési folyamatok.

---

## Fő Modellek és Egyenletek

- **Exponenciális növekedési modell:**
  - $$N(t) = N_0 \cdot a^t = N_0 \cdot (1 + r)^t$$
    - $N_0$: kezdeti állapot / egyedszám ($t = 0$)
    - $a > 1$: növekedési tényező
    - $r = a - 1$: relatív növekedési ütem (% / 100)
    - $t$: eltelt idő

- **Kettőződési idő ($T_2$):**
  - Az az időtartam, amely alatt a mennyiség a kétszeresére nő:
    $$N(T_2) = 2 N_0 \implies a^{T_2} = 2 \implies T_2 = \frac{\log 2}{\log a}$$
  - Ekkor a modell írható így is:
    $$N(t) = N_0 \cdot 2^{\frac{t}{T_2}}$$

- **Newton-féle hűlési törvény:**
  - Egy forró test hőmérsékletének csökkenése a környezeti hőmérséklethez tartva:
    $$T(t) = T_{\text{környezet}} + (T_0 - T_{\text{környezet}}) \cdot a^t \quad (0 < a < 1)$$

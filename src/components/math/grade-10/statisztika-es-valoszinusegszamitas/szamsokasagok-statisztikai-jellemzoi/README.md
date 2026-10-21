# 4. Számsokaságok statisztikai jellemzői (53. lecke)

## Tananyag Áttekintés
Adathalmazok átfogó statisztikai leírása: helyzeti középértékek (átlag, módusz, medián) és szóródási mutatók (terjedelem, szórás).

---

## Fő Fogalmak és Mutatók

- **Helyzeti mutatók:**
  - **Módusz ($Mo$):** A mintában leggyakrabban előforduló érték.
  - **Medián ($Me$):** A rendezett adatsor középső eleme (páratlan $n$ esetén a középső, páros $n$ esetén a két középső számtani közepe).
  - Medián előnye: Robusztus, nem érzékeny az extrém kiugró értékekre.

- **Szóródási mutatók:**
  - **Terjedelem ($R$):** A legnagyobb és legkisebb érték különbsége: $R = x_{max} - x_{min}$.
  - **Átlagos abszolút eltérés:** $\frac{1}{n} \sum |x_i - \bar{x}|$.
  - **Szórás ($s$):** Az átlagtól vett négyzetes eltérések átlagának négyzetgyöke:
    $$s = \sqrt{\frac{1}{n}\sum_{i=1}^n (x_i - \bar{x})^2}$$

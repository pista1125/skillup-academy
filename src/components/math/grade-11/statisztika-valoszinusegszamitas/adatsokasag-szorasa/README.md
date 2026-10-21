# 4. Adatsokaság szórása (56. lecke)

## Tananyag Áttekintés
Az adatok átlagtól való eltérésének mérése: átlagos abszolút eltérés, variancia (tapasztalati szórásnégyzet) és szórás kiszámítása, geometriai és valószínűségi jelentése.

---

## Fő Fogalmak és Képletek

- **Eltérések az átlagtól:**
  - Az adatok átlagtól vett előjeles eltéréseinek összege mindig 0: $\sum (x_i - \bar{x}) = 0$.
  - Ezért az eltérések négyzeteit vizsgáljuk.

- **Variancia (szórásnégyzet, $s^2$ vagy $\sigma^2$):**
  - Az átlagtól vett négyzetes eltérések számtani közepe:
    $$s^2 = \frac{\sum_{i=1}^n (x_i - \bar{x})^2}{n} = \frac{\sum_{i=1}^n x_i^2}{n} - \bar{x}^2$$

- **Szórás ($s$ vagy $\sigma$):**
  - A szórásnégyzet négyzetgyöke (ugyanolyan mértékegységű, mint az alapadatok):
    $$s = \sqrt{\frac{\sum_{i=1}^n (x_i - \bar{x})^2}{n}}$$

- **A szórás értelmezése:**
  - Kis szórás: az adatok szorosan az átlag körül tömörülnek (homogén minta).
  - Nagy szórás: az adatok tág határok között szóródnak (heterogén minta).
  - Ha minden adathoz hozzáadunk $c$-t: a szórás változatlan marad.
  - Ha minden adatot megszorzunk $c$-vel: a szórás $|c|$-szeresére változik.

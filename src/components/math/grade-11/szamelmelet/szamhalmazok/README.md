# 1. Számhalmazok (42. lecke)

## Tananyag Áttekintés
A számhalmazok hierarchiája: természetes, egész, racionális, irracionális és valós számok rendszere, műveleti zártság, végtelen halmazok számossága és a számegyenes felépítése.

---

## Fő Fogalmak és Halmazhierarchia

- **Számhalmazok hierarchikus lánca:**
  $$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$$
  - $\mathbb{N}$: Természetes számok halmaza $\{0, 1, 2, 3, \dots\}$ vagy $\mathbb{N}^+ = \{1, 2, 3, \dots\}$
  - $\mathbb{Z}$: Egész számok halmaza $\{\dots, -2, -1, 0, 1, 2, \dots\}$
  - $\mathbb{Q}$: Racionális számok halmaza: $\left\{\frac{a}{b} \;\middle|\; a \in \mathbb{Z}, b \in \mathbb{Z}^+\right\}$
  - $\mathbb{Q}^* = \mathbb{R} \setminus \mathbb{Q}$: Irracionális számok (nem írhatók fel két egész szám hányadosaként, végtelen nem szakaszos tizedestörtek, pl. $\sqrt{2}, \pi, e$)
  - $\mathbb{R}$: Valós számok halmaza (a számegyenes folytonos pontjai)

- **Műveleti zártság:**
  - $\mathbb{N}$: zárt az összeadásra és szorzásra (de kivonásra és osztásra nem).
  - $\mathbb{Z}$: zárt az összeadásra, kivonásra és szorzásra.
  - $\mathbb{Q}$ és $\mathbb{R}$: zárt az összeadásra, kivonásra, szorzásra és nem nulla számmal való osztásra (testek).

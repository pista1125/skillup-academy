# 1. Mit tanultunk eddig? (ismétlés) (8. osztály)

## Tananyag Áttekintés
Térgeometriai alapismeretek összefoglalása: mértékegységek és átváltásuk ($1\text{ m}^3 = 1000\text{ dm}^3 = 1000\text{ liter}$), a kocka, a téglatest, az egyenes hasábok és a forgáshenger felszíne és térfogata.

---

## 1. Térfogat- és Felszínmértékegységek

### Felszín (Terület): Váltószám $100$
$$1\text{ m}^2 = 100\text{ dm}^2 = 10\,000\text{ cm}^2 = 1\,000\,000\text{ mm}^2$$

### Térfogat (Űrtartalom): Váltószám $1000$
$$1\text{ m}^3 = 1000\text{ dm}^3 = 1\,000\,000\text{ cm}^3$$
$$1\text{ dm}^3 = 1\text{ liter}, \quad 1\text{ cm}^3 = 1\text{ ml}, \quad 1\text{ m}^3 = 1000\text{ liter} = 10\text{ hektoliter (hl)}$$

---

## 2. Ismert Testek Képletei

| Test | Felszín ($A$) | Térfogat ($V$) | Megjegyzés |
|---|---|---|---|
| **Kocka ($a$)** | $A = 6a^2$ | $V = a^3$ | Testátló: $d = a\sqrt{3}$, Lapátló: $d_l = a\sqrt{2}$ |
| **Téglatest ($a, b, c$)** | $A = 2(ab + bc + ac)$ | $V = a \cdot b \cdot c$ | Testátló: $d = \sqrt{a^2 + b^2 + c^2}$ |
| **Egyenes hasáb** | $A = 2T_a + T_p = 2T_a + K_a \cdot m$ | $V = T_a \cdot m$ | $T_a$: alapterület, $K_a$: alapkerület, $m$: testmagasság |
| **Egyenes körhenger ($r, m$)** | $A = 2r^2\pi + 2r\pi \cdot m$ | $V = r^2\pi \cdot m$ | Alaplap: kör ($T_a = r^2\pi$, $K_a = 2r\pi$) |

---

## 🚀 Elkészült Modulok és Fájlok

- [**`SolidsReviewTheory.tsx`**](./SolidsReviewTheory.tsx): Részletes interaktív elmélet élő 3D Kocka, Téglatest, Körhenger wireframe rajzolóval és dinamikus űrmérték kalkulátorral, Pitagorasz-tétel térbeli alkalmazásával és csapda dobozokkal.
- [**`SolidsReviewQuiz.tsx`**](./SolidsReviewQuiz.tsx): 3 szint x 10 = 30 feladat részletes levezetésekkel, vizuális ábrákkal és beépített párosító/csoportosító játékmódokkal.
- [**`SolidsReviewMatcher.tsx`**](./SolidsReviewMatcher.tsx): 3 szint x 8 = 24 pár (képletek, mértékegységek, geometriai összefüggések).
- [**`SolidsReviewSorter.tsx`**](./SolidsReviewSorter.tsx): 3 szint x 12 = 36 elem besorolása (testtípusok, dimenziók, igaz/hamis állítások).
- [**`index.ts`**](./index.ts): Modul exportok gyűjteménye.

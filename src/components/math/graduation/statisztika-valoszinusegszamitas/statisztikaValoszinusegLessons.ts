export interface LessonContentMap {
  [subtopicId: string]: {
    intermediate: string;
    advanced: string;
  };
}

export const statisztikaValoszinusegLessons: LessonContentMap = {
  // 1. Leíró statisztika
  'g-descriptive-stats': {
    intermediate: `
# 📖 Leíró Statisztika – Adatok és Mutatók

## 1. Elméleti Összefoglaló

### 1.1. Helyzeti mutatók (Középértékek)
* **Átlag (Átlagérték):** Az adatok összege osztva az adatok számával:
  $$\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n}$$
* **Medián:** A sorba rendezett adatok középső eleme (ha $n$ páratlan), vagy a két középső elem átlaga (ha $n$ páros).
* **Módusz:** A leggyakrabban előforduló adat (vagy adatok).

### 1.2. Szóródási mutatók
* **Terjedelem ($R$):** A legnagyobb és legkisebb adat különbsége ($x_{\\max} - x_{\\min}$).
* **Szórás ($\\sigma$):** Az adatok átlagtól való eltérései négyzetének átlagából vont négyzetgyök.

---

## 2. Kidolgozott Példafeladat

**Kérdés:** Adott egy 5 fős csoport dolgozatainak pontszáma: $4, 6, 7, 7, 11$.
Számítsd ki az átlagot, mediánt, móduszt és a terjedelmet!

### Megoldás:
1. **Átlag:** $\\bar{x} = \\frac{4 + 6 + 7 + 7 + 11}{5} = \\frac{35}{5} = 7$.
2. **Medián:** A rendezett sor 3. (középső) eleme: $7$.
3. **Módusz:** A leggyakoribb elem: $7$ (2-szer fordul elő).
4. **Terjedelem:** $11 - 4 = 7$.
`,
    advanced: `
# 📖 Szórás és Szórásnégyzet (Variancia)

* **Variancia ($S^2$):** $S^2 = \\frac{1}{n} \\sum_{i=1}^n (x_i - \\bar{x})^2$.
* **Szórás ($S$):** $S = \\sqrt{S^2}$.
`
  },

  // 2. Valószínűségszámítás
  'g-probability': {
    intermediate: `
# 📖 A Valószínűségszámítás Elemei

## 1. Klasszikus Valószínűségi Modell
* **Laplace-féle klasszikus valószínűség:** Ha egy kísérlet kimenetei egyenlő valószínűségűek:
  $$P(A) = \\frac{k}{n} = \\frac{\\text{Kedvező események száma}}{\\text{Összes lehetséges esemény száma}}$$
* **Tulajdonságok:** $0 \\le P(A) \\le 1$.
* **Komplementer esemény:** $P(\\bar{A}) = 1 - P(A)$.

---

## 2. Kidolgozott Példafeladat

**Kérdés:** Egy szabályos dobókockával egyszer dobunk. Mi a valószínűsége, hogy 4-nél nagyobb számot dobunk?

### Megoldás:
1. Összes kimenetel ($n$): $\\{1, 2, 3, 4, 5, 6\\} \\Rightarrow n = 6$.
2. Kedvező kimenetelek ($k$): $\\{5, 6\\} \\Rightarrow k = 2$.
3. Valószínűség: $P = \\frac{2}{6} = \\frac{1}{3} \\approx 33,3\\%$.
`,
    advanced: `
# 📖 Feltételes Valószínűség és Binomiális Eloszlás

* **Feltételes valószínűség:** $P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$.
* **Binomiális eloszlás (n független kísérletből k sikeres):**
  $$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$$
`
  }
};

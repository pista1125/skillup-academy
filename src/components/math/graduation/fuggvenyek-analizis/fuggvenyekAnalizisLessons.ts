export interface LessonContentMap {
  [subtopicId: string]: {
    intermediate: string;
    advanced: string;
  };
}

export const fuggvenyekAnalizisLessons: LessonContentMap = {
  // 1. A függvény
  'g-function-concept': {
    intermediate: `
# 📖 A Függvény Fogalma és Alapjai

## 1. Elméleti Összefoglaló

### 1.1. Mi a függvény?
* **Definíció:** Egy $f$ hozzárendelést függvénynek nevezünk az $A$ halmazból a $B$ halmazba, ha az $A$ halmaz (értelmezési tartomány, $D_f$) minden egyes eleméhez a $B$ halmaz (értékkészlet, $R_f$) **pontosan egy** elemét rendeljük hozzá.
* **Jelölések:**
  * Hozzárendelési szabály: $f: x \\mapsto 2x + 3$ vagy $f(x) = 2x + 3$.
  * Értelmezési tartomány: $D_f \\subseteq \\mathbb{R}$.
  * Értékkészlet: $R_f = \\{ f(x) \\mid x \\in D_f \\}$.

---

## 2. Kidolgozott Példafeladat

**Kérdés:** Adott az $f(x) = 3x - 5$ lineáris függvény a $D_f = [-2, 4]$ zárt intervallumon.
1. Számítsd ki $f(-2)$ és $f(3)$ értékét!
2. Határozd meg a függvény értékkészletét ($R_f$)!

### Megoldás:
1. **Behelyettesítések:**
   * $f(-2) = 3(-2) - 5 = -6 - 5 = -11$
   * $f(3) = 3(3) - 5 = 9 - 5 = 4$
2. **Értékkészlet ($R_f$):** Mivel a függvény szigorúan monoton növekvő, az értékkészlet a két végpont képe közötti intervallum:
   $$R_f = [-11, 3(4)-5] = [-11, 7]$$
`,
    advanced: `
# 📖 Inverz Függvény és Összetett Függvények

## 1. Elmélet emelt szinten
* **Injektív (kölcsönösen egyértelmű) függvény:** Különböző elemekhez különböző képeket rendel: $x_1 \\neq x_2 \\Rightarrow f(x_1) \\neq f(x_2)$.
* **Inverz függvény ($f^{-1}$):** Csak injektív függvénynek létezik inverze. Grafikonja az $y = x$ egyenesre tengelyesen szimmetrikus.
`
  },

  // 2. Egyváltozós valós függvények
  'g-real-functions': {
    intermediate: `
# 📖 Nevezetes Függvények és Grafikonjaik

## 1. Első- és Másodfokú Függvények
* **Lineáris függvény:** $f(x) = mx + b$. Grafikonja egyenes. Meredeksége $m = \\tan \\alpha$, $y$-tengelymetszete $(0, b)$.
* **Másodfokú függvény:** $f(x) = ax^2 + bx + c$ ($a \\neq 0$). Grafikonja parabola.
  * Csúcsponti alak: $f(x) = a(x - u)^2 + v$, ahol $C(u, v)$ a csúcspont.
`,
    advanced: `
# 📖 Polinomok és Racionális Törtfüggvények

## 1. Aszimptóták
* A $f(x) = \\frac{1}{x-2} + 3$ hiperbola aszimptótái az $x = 2$ függőleges és az $y = 3$ vízszintes egyenes.
`
  },

  // 3. Sorozatok & Kamatos kamat
  'g-sequences': {
    intermediate: `
# 📖 Számtani és Mértani Sorozatok

## 1. Számtani Sorozat
* **Definíció:** Két szomszédos tag különbsége állandó ($d$, differencia): $a_n - a_{n-1} = d$.
* **n-edik tag:** $a_n = a_1 + (n-1)d$
* **Első n tag összege:** $S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n-1)d}{2} \\cdot n$

## 2. Mértani Sorozat
* **Definíció:** Két szomszédos tag hányadosa állandó ($q$, kvóciens): $\\frac{a_n}{a_{n-1}} = q$.
* **n-edik tag:** $a_n = a_1 \\cdot q^{n-1}$
* **Első n tag összege ($q \\neq 1$):** $S_n = a_1 \\cdot \\frac{q^n - 1}{q - 1}$
`,
    advanced: `
# 📖 Végtelen Mértani Sorok és Kamatszámítás

* **Végtelen mértani sor összege ($|q| < 1$):** $S = \\frac{a_1}{1 - q}$.
* **Kamatos kamat:** $T_n = T_0 \\cdot \\left(1 + \\frac{p}{100}\\right)^n$.
`
  },

  // 4. Analízis elemei (Középszint vs Emelt szint)
  'g-calculus-elements': {
    intermediate: `
# 📖 Az Analízis Elemei Középszinten

## 1. Követelmények Középszinten
A középszintű érettségin **NINCS differenciálszámítás (deriválás) és integrálszámítás**. 

A középszintű analízis témakör a következőkre összpontosít:
* **Függvények jellemzése:** értelmezési tartomány, értékkészlet, zérushely, menet (monotonitás), szélsőértékek (minimum, maximum), paritás (páros/páratlan).
* **Függvénytranszformációk:** $f(x)+c, f(x+c), c \\cdot f(x)$ grafikus ábrázolása és leolvasása.
* **Sorozatok:** számtani és mértani sorozatok tagjai és összegképletei.
* **Pénzügyi matematika:** kamatos kamat és alapvető járadékszámítások.

> 💡 **Megjegyzés:** Ha a differenciálszámítást vagy az integrálszámítást szeretnéd tanulmányozni, válts át az **Emelt szintű** nézetre a felső menüben!
`,
    advanced: `
# 📖 Differenciál- és Integrálszámítás

## 1. A Derivált Fogalma
* A függvény $x_0$ pontbeli deriváltja ($f'(x_0)$) a függvény grafikonjához az $(x_0, f(x_0))$ pontban húzott érintő meredeksége.

## 2. Alapvető Deriválási Szabályok
* $(x^n)' = n \\cdot x^{n-1}$
* $(c \\cdot f)' = c \\cdot f'$
* $(f + g)' = f' + g'$

## 3. Határozatlan és Határozott Integrál
* **Primitív függvény:** $F'(x) = f(x)$.
* **Newton-Leibniz formula:** $\\int_a^b f(x) dx = [F(x)]_a^b = F(b) - F(a)$.
`
  }
};

export interface LessonContentMap {
  [subtopicId: string]: {
    intermediate: string;
    advanced: string;
  };
}

export const szamelmeletAlgebraLessons: LessonContentMap = {
  // 1. Alapműveletek
  'g-basic-operations': {
    intermediate: `
# 📖 Alapműveletek – Elmélet és Példafeladatok

## 1. Elméleti Összefoglaló

### 1.1. Műveleti sorrend és szabályok
* **Zárójelek:** Mindig a legbensőbb zárójelben lévő műveleteket végezzük el először.
* **Műveleti erősségi sorrend:**
  1. Hatványozás, gyökvonás
  2. Szorzás, osztás (balról jobbra haladva)
  3. Összeadás, kivonás (balról jobbra haladva)

### 1.2. Előjelszabályok
* Két azonos előjelű szám szorzata/hányadosa **pozitív**: $(+) \\cdot (+) = +$, $(-)\\cdot(-) = +$.
* Két különböző előjelű szám szorzata/hányadosa **negatív**: $(+) \\cdot (-) = -$, $(-)\\cdot(+) = -$.

---

## 2. Kidolgozott Érettségi Példafeladatok

### 1. Feladat (Kifejezés kiszámítása)
**Kérdés:** Számítsd ki az alábbi kifejezés pontos értékét!
$$A = 12 - 4 \\cdot (3 - 8) + 18 : (-3)$$

#### Megoldás lépésről lépésre:
1. **Zárójel felbontása:** $3 - 8 = -5$.
2. **Szorzások és osztások elvégzése:**
   * $4 \\cdot (-5) = -20$, így a $- 4 \\cdot (-5) = +20$.
   * $18 : (-3) = -6$.
3. **Összeadás és kivonás:**
   $$A = 12 + 20 - 6 = 26$$
**Válasz:** A kifejezés értéke **26**.
`,
    advanced: `
# 📖 Műveleti Azonosságok és Struktúrák

## 1. Műveleti tulajdonságok a Valós Számokon
* **Kommutativitás (csereelvszerűség):** $a + b = b + a$ és $a \\cdot b = b \\cdot a$.
* **Asszociativitás (csoportosíthatóság):** $(a + b) + c = a + (b + c)$ és $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$.
* **Disztributivitás (széttagolhatóság):** $a \\cdot (b + c) = a \\cdot b + a \\cdot c$.

*(Megjegyzés: A kivonás és az osztás NEM kommutatív és NEM asszociatív!)*
`
  },

  // 2. A természetes számok halmaza, számelméleti ismeretek
  'g-natural-numbers': {
    intermediate: `
# 📖 Számelméleti Ismeretek – Prímszámok és Osztók

## 1. Elméleti Összefoglaló

### 1.1. Prímszámok és Összetett számok
* **Prímszám:** Olyan 1-nél nagyobb természetes szám, amelynek pontosan 2 pozitív osztója van (1 és önmaga). Elemük: $2, 3, 5, 7, 11, 13, 17, 19, 23, \\dots$ *(A 2 az egyetlen páros prím!)*
* **Összetett szám:** Olyan 1-nél nagyobb természetes szám, amelynek 2-nél több osztója van.
* **1-es szám:** Sem nem prím, sem nem összetett szám!

### 1.2. A Számelmélet Alaptétele
Minden 1-nél nagyobb természetes szám a tényezők sorrendjétől eltekintve **egyértelműen felírható prímszámok szorzataként**.

### 1.3. LNKO és LKKT
* **Legnagyobb Közös Osztó (LNKO):** A prímtényezős felbontásban a **közös prímalapok a legkisebb kitevőn**.
* **Legkisebb Közös Többszörös (LKKT):** A prímtényezős felbontásban előforduló **összes prímalap a legnagyobb kitevőn**.

---

## 2. Kidolgozott Példafeladat

**Feladat:** Határozd meg a $24$ és a $36$ legnagyobb közös osztóját és legkisebb közös többszörösét!

#### Megoldás lépésről lépésre:
1. **Prímtényezős felbontás:**
   $$24 = 2^3 \\cdot 3^1$$
   $$36 = 2^2 \\cdot 3^2$$
2. **LNKO(24, 36):** A közös alapok a legkisebb kitevőn:
   $$\\text{LNKO}(24, 36) = 2^2 \\cdot 3^1 = 4 \\cdot 3 = 12$$
3. **LKKT(24, 36):** Az összes alap a legnagyobb kitevőn:
   $$\\text{LKKT}(24, 36) = 2^3 \\cdot 3^2 = 8 \\cdot 9 = 72$$
`,
    advanced: `
# 📖 Prímszámok Végtelensége – Eukleidész Tétele

## Tétel: Végtelen sok prímszám létezik.

### Indirekt Bizonyítás:
1. Tegyük fel az ellenkezőjét: véges sok prímszám van, jelöljük őket így: $p_1, p_2, \\dots, p_n$.
2. Képezzük az alábbi számot: $N = (p_1 \\cdot p_2 \\cdot \\dots \\cdot p_n) + 1$.
3. Az $N$ szám 1-nél nagyobb, így van prímosztója. De ha elosztjuk bármelyik $p_i$ prímmel, a maradék mindig 1 lesz!
4. Így $N$-nek van egy olyan prímosztója, ami nem szerepel a $p_1, \\dots, p_n$ listában.
5. Ellentmondásra jutottunk, tehát a prímszámok száma valóban végtelen! $\\blacksquare$
`
  },

  // 3. Oszthatóság
  'g-divisibility': {
    intermediate: `
# 📖 Oszthatósági Szabályok

## 1. Elméleti Összefoglaló

* **2-vel osztható:** ha az utolsó számjegy páros (0, 2, 4, 6, 8).
* **3-mal osztható:** ha a számjegyek összege osztható 3-mal.
* **4-gyel osztható:** ha az utolsó két számjegyből álló szám osztható 4-gyel.
* **5-tel osztható:** ha az utolsó számjegy 0 vagy 5.
* **6-tal osztható:** ha 2-vel és 3-mal is osztható.
* **8-cal osztható:** ha az utolsó három számjegyből álló szám osztható 8-cal.
* **9-cel osztható:** ha a számjegyek összege osztható 9-cel.
* **10-zel osztható:** ha 0-ra végződik.

---

## 2. Kidolgozott Érettségi Feladat

**Kérdés:** Milyen számjegyet írhatunk az $x$ helyére a $457x$ négyjegyű számban, hogy az osztható legyen 6-tal?

#### Megoldás:
1. A 6-tal való oszthatóság feltétele: **2-vel ÉS 3-mal is osztható**.
2. **2-vel való oszthatóság:** $x$ csak páros számjegy lehet: $x \\in \\{0, 2, 4, 6, 8\\}$.
3. **3-mal való oszthatóság:** A számjegyek összege: $4 + 5 + 7 + x = 16 + x$.
   * Ha $x = 0 \\implies 16 + 0 = 16$ (Nem div 3)
   * Ha $x = 2 \\implies 16 + 2 = 18$ (**Osztható 3-mal!**)
   * Ha $x = 4 \\implies 16 + 4 = 20$ (Nem div 3)
   * Ha $x = 6 \\implies 16 + 6 = 22$ (Nem div 3)
   * Ha $x = 8 \\implies 16 + 8 = 24$ (**Osztható 3-mal!**)
4. **Válasz:** Az $x$ helyére a **2** vagy a **8** számjegy írható ($4572$ és $4578$).
`,
    advanced: `
# 📖 Kongruenciák és Moduláris Aritmetika

## Definíció:
Azt mondjuk, hogy az $a$ és $b$ egész számok **kongruensek modulo $m$** (ahol $m \\in \\mathbb{Z}^+$), ha $m$ osztja az $(a - b)$ különbséget.
Jelölése: $a \\equiv b \\pmod m$.

### Tulajdonságok:
* $a \\equiv b \\pmod m \\implies a^k \\equiv b^k \\pmod m$ tetszőleges $k \\in \\mathbb{N}$-re.
* Példa: Mennyi $5^{100}$ 4-gyel osztva?
  Mivel $5 \\equiv 1 \\pmod 4 \\implies 5^{100} \\equiv 1^{100} = 1 \\pmod 4$. A maradék **1**.
`
  },

  // 4. Számrendszerek
  'g-number-bases': {
    intermediate: `
# 📖 Számrendszerek

## 1. Elméleti Összefoglaló
A helyiértékes számrendszerekben a számjegyek az alapszám hatványait jelölik right-to-left haladva ($b^0, b^1, b^2, \\dots$).

### Átváltás $b$-s rendszerből 10-esbe:
$$1011_2 = 1 \\cdot 2^3 + 0 \\cdot 2^2 + 1 \\cdot 2^1 + 1 \\cdot 2^0 = 8 + 0 + 2 + 1 = 11_{10}$$

---

## 2. Kidolgozott Feladat

**Kérdés:** Írd át a $25_{10}$ tízes számrendszerbeli számot kettes (bináris) számrendszerbe!

#### Megoldás (Maradékos osztás módszerével):
* $25 : 2 = 12$, maradék: **1**
* $12 : 2 = 6$, maradék: **0**
* $6 : 2 = 3$, maradék: **0**
* $3 : 2 = 1$, maradék: **1**
* $1 : 2 = 0$, maradék: **1**

Alulról felfelé kiolvasva a maradékokat: $25_{10} = 11001_2$.
`,
    advanced: `
# 📖 Közvetlen Műveletek Számrendszerekben

Kettes számrendszerbeli összeadás táblázata:
$0 + 0 = 0$, $0 + 1 = 1$, $1 + 1 = 10_2$ (0-t írunk le, 1 az átvitel).
`
  },

  // 5. Racionális és irracionális számok
  'g-rational-irrational': {
    intermediate: `
# 📖 Racionális és Irracionális Számok

## 1. Elmélet
* **Racionális számok ($\\mathbb{Q}$):** Felírhatók két egész szám hányadosaként ($p/q$, ahol $q \\neq 0$). Tizedestört alakjuk **véges** vagy **végtelen szakaszos** (pl. $0.333... = 1/3$).
* **Irracionális számok:** Nem írhatók fel két egész hányadosaként. Tizedestört alakjuk **végtelen nem-szakaszos** (pl. $\\sqrt{2}, \\pi, e$).
`,
    advanced: `
# 📖 Indirekt Bizonyítás: $\\sqrt{2}$ Irracionális

*(Lásd a részletes bizonyítást az Indirekt Bizonyítások fejezetben!)*
`
  },

  // 6. Valós számok
  'g-real-numbers': {
    intermediate: `
# 📖 Valós Számok és Abszolút Érték

## 1. Abszolút érték fogalma
A szám távolsága a számegyenesen a nullától:
$$|x| = \\begin{cases} x, & \\text{ha } x \\ge 0 \\\\ -x, & \\text{ha } x < 0 \\end{cases}$$
`,
    advanced: `
# 📖 Valós Számok Teljessége

Minden felülről korlátos nemüres valós számhalmaznak létezik legkisebb felső korlátja (szuprémuma) $\\mathbb{R}$-ben.
`
  },

  // 7. Hatvány, gyök, logaritmus
  'g-powers-roots-log': {
    intermediate: `
# 📖 Hatvány, Gyök, Logaritmus Azonosságok

## 1. Hatványozás Azonosságai
* $a^n \\cdot a^m = a^{n+m}$
* $\\frac{a^n}{a^m} = a^{n-m}$
* $(a^n)^m = a^{n \\cdot m}$
* $(a \\cdot b)^n = a^n \\cdot b^n$
* $a^{-n} = \\frac{1}{a^n}$

## 2. Logaritmus Definíciója és Azonosságai
$\\log_a b = c \\iff a^c = b$ ($a > 0, a \\neq 1, b > 0$).
* $\\log_a(x \\cdot y) = \\log_a x + \\log_a y$
* $\\log_a(\\frac{x}{y}) = \\log_a x - \\log_a y$
* $\\log_a(x^k) = k \\cdot \\log_a x$

---

## 3. Kidolgozott Feladat
**Kérdés:** Számítsd ki a $\\log_2 12 + \\log_2 5 - \\log_2 15$ kifejezés értékét!

#### Megoldás:
$$\\log_2 12 + \\log_2 5 - \\log_2 15 = \\log_2 \\left( \\frac{12 \\cdot 5}{15} \\right) = \\log_2 \\left( \\frac{60}{15} \\right) = \\log_2 4 = 2$$
`,
    advanced: `
# 📖 Logaritmus Alapváltási Képlete

$$\\log_a b = \\frac{\\log_c b}{\\log_c a}$$
`
  },

  // 8. Betűkifejezések
  'g-expressions': {
    intermediate: `
# 📖 Algebrai Betűkifejezések

## Tagok összevonása és kiemelés
Az azonos változójú kifejezések együtthatóit összevonhatjuk:
$$4x^2y - 2xy + 3x^2y = 7x^2y - 2xy = xy(7x - 2)$$
`,
    advanced: `
# 📖 Polinomok Osztása
`
  },

  // 9. Nevezetes azonosságok
  'g-algebraic-identities': {
    intermediate: `
# 📖 Nevezetes Azonosságok

## 1. A 3 Legfontosabb Érettségi Azonosság
1. **Összeg négyzete:** $(a + b)^2 = a^2 + 2ab + b^2$
2. **Különbség négyzete:** $(a - b)^2 = a^2 - 2ab + b^2$
3. **Négyzetek különbsége:** $a^2 - b^2 = (a - b)(a + b)$

---

## 2. Kidolgozott Feladat
**Kérdés:** Alakítsd szorzattá a $9x^2 - 25$ kifejezést!

#### Megoldás:
Használjuk a $a^2 - b^2 = (a - b)(a + b)$ azonosságot, ahol $a = 3x$ és $b = 5$:
$$9x^2 - 25 = (3x - 5)(3x + 5)$$
`,
    advanced: `
# 📖 Köbös Azonosságok

* $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$
* $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$
`
  },

  // 10. Arányosság
  'g-proportionality': {
    intermediate: `
# 📖 Egyenes és Fordított Arányosság

* **Egyenes arányosság:** $y/x = k \\implies y = kx$.
* **Fordított arányosság:** $x \\cdot y = k \\implies y = k/x$.
`,
    advanced: `
# 📖 Összetett Arányossági Feladatok
`
  },

  // 11. Százalékszámítás
  'g-percentages': {
    intermediate: `
# 📖 Százalékszámítás

## Képlet:
$$\\text{Százalékérték} = \\text{Alap} \\cdot \\frac{\\text{Százalékláb}}{100}$$

### Példa:
Egy 40 000 Ft-os kabát árát 15%-kal csökkentik. Mi az új ár?
$$\\text{Új ár} = 40000 \\cdot (1 - 0.15) = 40000 \\cdot 0.85 = 34\\ 000 \\text{ Ft}$$
`,
    advanced: `
# 📖 Keverési Egyenletek
`
  },

  // 12. Egyenletek, egyenletrendszerek, egyenlőtlenségek
  'g-eq-systems-ineq': {
    intermediate: `
# 📖 Mérlegelv és Ekvivalens Átalakítások

* **Ekvivalens lépések:** Azonos szám hozzáadása/kivonása mindkét oldalhoz, nem-nulla számmal szorzás/osztás.
* **Nem ekvivalens lépések:** Négyzetre emelés (ellenőrzés kötelező!).
`,
    advanced: `
# 📖 Ekvivalencia Bizonyítások
`
  },

  // 13. Algebrai egyenletek, egyenletrendszerek
  'g-algebraic-equations': {
    intermediate: `
# 📖 Kétismeretlenes Egyenletrendszerek

## Behelyettesítő módszer
Az egyik egyenletből kifejezzük az egyik ismeretlent, majd behelyettesítjük a másikba.
`,
    advanced: `
# 📖 Gauss Elimináció
`
  },

  // 14. Elsőfokú egyenletek
  'g-linear-equations': {
    intermediate: `
# 📖 Elsőfokú Egyenletek

$ax + b = 0 \\implies x = -b/a$ ($a \\neq 0$).
`,
    advanced: `
# 📖 Paraméteres Elsőfokú Egyenletek
`
  },

  // 15. Másodfokú egyenletek
  'g-quadratic-equations': {
    intermediate: `
# 📖 Másodfokú Egyenletek és Megoldóképlet

## 1. Megoldóképlet
Az $ax^2 + bx + c = 0$ ($a \\neq 0$) másodfokú egyenlet gyökei:
$$x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

## 2. Diszkrimináns ($D = b^2 - 4ac$)
* **Ha $D > 0$:** 2 különböző valós gyök van.
* **Ha $D = 0$:** 1 egybeeső valós gyök van.
* **Ha $D < 0$:** Nincs valós gyök.

---

## 3. Kidolgozott Példafeladat
**Kérdés:** Oldd meg az $x^2 - 5x + 6 = 0$ egyenletet!

#### Megoldás:
$a = 1, b = -5, c = 6$.
$$x_{1,2} = \\frac{-(-5) \\pm \\sqrt{(-5)^2 - 4 \\cdot 1 \\cdot 6}}{2 \\cdot 1} = \\frac{5 \\pm \\sqrt{25 - 24}}{2} = \\frac{5 \\pm 1}{2}$$
$$x_1 = \\frac{6}{2} = 3, \\quad x_2 = \\frac{4}{2} = 2$$
**Válasz:** A megoldások: $x_1 = 3, x_2 = 2$.
`,
    advanced: `
# 📖 Viète-formulák

Ha $x_1, x_2$ a gyökök:
$$x_1 + x_2 = -\\frac{b}{a}, \\quad x_1 \\cdot x_2 = \\frac{c}{a}$$
`
  },

  // 16. Magasabb fokú egyenletek
  'g-higher-degree-equations': {
    intermediate: `
# 📖 Másodfokúra Visszavezethető Egyenletek

$x^4 - 5x^2 + 4 = 0 \\implies t = x^2 \\implies t^2 - 5t + 4 = 0$.
`,
    advanced: `
# 📖 Polinomok Gyöktényezős Alakja
`
  },

  // 17. Négyzetgyökös egyenletek
  'g-square-root-equations': {
    intermediate: `
# 📖 Négyzetgyökös Egyenletek

## 1. Kikötés és Ellenőrzés
* A négyzetgyök alatti kifejezés **nemnegatív** kell legyen.
* Négyzetre emelés után az **ellenőrzés kötelező**!
`,
    advanced: `
# 📖 Összetett Gyökös Egyenletek
`
  },

  // 18. Nem algebrai egyenletek
  'g-non-algebraic-equations': {
    intermediate: `
# 📖 Transzcendens Egyenletek
`,
    advanced: `
# 📖 Monotonitás és Gyökök Száma
`
  },

  // 19. Abszolútértékes egyenletek
  'g-abs-equations': {
    intermediate: `
# 📖 Abszolútértékes Egyenletek

$|x - 2| = 5 \\implies x - 2 = 5$ vagy $x - 2 = -5 \\implies x = 7$ vagy $x = -3$.
`,
    advanced: `
# 📖 Esetszétválasztás Számegyenesen
`
  },

  // 20. Exponenciális egyenletek
  'g-exponential-equations': {
    intermediate: `
# 📖 Exponenciális Egyenletek

Azonos alapra hozás: $2^{x+1} = 16 \\implies 2^{x+1} = 2^4 \\implies x + 1 = 4 \\implies x = 3$.
`,
    advanced: `
# 📖 Exponenciális Egyenletrendszerek
`
  },

  // 21. Logaritmusos egyenletek
  'g-logarithmic-equations': {
    intermediate: `
# 📖 Logaritmusos Egyenletek

$\\log_3(x - 1) = 2 \\implies x - 1 = 3^2 = 9 \\implies x = 10$ (Kikötés: $x - 1 > 0 \implies x > 1$).
`,
    advanced: `
# 📖 Összetett Logaritmus Egyenletek
`
  },

  // 22. Trigonometrikus egyenletek
  'g-trigonometric-equations': {
    intermediate: `
# 📖 Trigonometrikus Egyenletek

$\\sin x = \\frac{1}{2} \\implies x_1 = 30^\\circ + k \\cdot 360^\\circ$, $x_2 = 150^\\circ + k \\cdot 360^\\circ$ ($k \\in \\mathbb{Z}$).
`,
    advanced: `
# 📖 Addíciós Tételek Alkalmazása
`
  },

  // 23. Egyenlőtlenségek
  'g-inequalities': {
    intermediate: `
# 📖 Egyenlőtlenségek

Negatív számmal való szorzásnál/osztásnál a kacsacsőr **megfordul**!
$$-2x < 8 \\implies x > -4$$
`,
    advanced: `
# 📖 Törtes Egyenlőtlenségek Előjeltáblázata
`
  },

  // 24. Középértékek, egyenlőtlenségek
  'g-means-inequalities': {
    intermediate: `
# 📖 Számtani és Mértani Közép

* **Számtani közép:** $A = \\frac{a+b}{2}$
* **Mértani közép:** $G = \\sqrt{ab}$ ($a, b \\ge 0$)
`,
    advanced: `
# 📖 Számtani és Mértani Közép Egyenlőtlensége

$$\\frac{a+b}{2} \\ge \\sqrt{ab} \\quad (a, b \\ge 0)$$
*(Egyenlőség akkor és csak akkor áll fenn, ha $a = b$.)*
`
  }
};

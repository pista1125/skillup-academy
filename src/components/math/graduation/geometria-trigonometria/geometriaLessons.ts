export interface LessonContentMap {
  [subtopicId: string]: {
    intermediate: string;
    advanced: string;
  };
}

export const geometriaLessons: LessonContentMap = {
  // 1. Elemi geometria
  'g-elem-geom': {
    intermediate: `
# 📖 Elemi Geometria – Alapfogalmak és Szögek

## 1. Elméleti Összefoglaló

### 1.1. Alapfogalmak
* **Pont:** Alapfogalom, kiterjedése nincs. Jelölése nyomtatott nagybetűvel ($A, B, C$).
* **Egyenes:** Mindkét irányban végtelen, 1 dimenziós vonal. Két különböző pont egyértelműen meghatározza. Jelölése kisbetűvel ($e, f, g$).
* **Sík:** Végtelen 2 dimenziós felület. 3 nem egy egyenesbe eső pont egyértelműen meghatározza.
* **Félegyenes:** Az egyenes egy pontja által kettéosztott félegyenesek.
* **Szakasz:** Az egyenes két pontja közötti véges része (beleértve a végpontokat is).

### 1.2. Szögfajták és Szögpárok
* **Hegyesszög:** $0^\circ < \alpha < 90^\circ$
* **Derékszög:** $\alpha = 90^\circ$
* **Tompaszög:** $90^\circ < \alpha < 180^\circ$
* **Egyenesszög:** $\alpha = 180^\circ$
* **Pótszögek:** Két szög összege $90^\circ$ ($\alpha + \beta = 90^\circ$).
* **Kiegészítő szögek:** Két szög összege $180^\circ$ ($\alpha + \beta = 180^\circ$).
* **Csúcsszögek:** Két metsző egyenes által alkotott szemközti szögek (egyenlők!).
* **Mellékszögek:** Egyenes mentén egymás melletti szögek (összegük $180^\circ$).

---

## 2. Kidolgozott Érettségi Példafeladatok

### 1. Feladat (Szögek kiszámítása)
**Kérdés:** Két egyenes metszi egymást. Az egyik keletkezett szög $35^\circ$. Mekkorák a többi keletkezett szögek?

#### Megoldás lépésről lépésre:
1. A megadott szög csúcsszöge szintén $35^\circ$ (szemközt helyezkedik el).
2. A vele szomszédos mellékszög kiegészíti $180^\circ$-ra:
   $$180^\circ - 35^\circ = 145^\circ$$
3. Ennek a csúcsszöge is $145^\circ$.
4. **Válasz:** A keletkező szögek: **$35^\circ, 145^\circ, 35^\circ, 145^\circ$**.
`,
    advanced: `
# 📖 Eukleidészi Axiómarendszer

## Axiómák alapjai:
1. Két ponton át egyetlen egyenes fektethető.
2. Végtelen sok pont létezik a síkban.
3. Párhuzamossági axióma (Eukleidész 5. posztulátuma): Egy egyeneshez egy külső ponton át pontosan egy párhuzamos egyenes húzható.
`
  },

  // 2. Térelemek
  'g-spatial-elements': {
    intermediate: `
# 📖 Térelemek Kölcsönös Helyzete

## 1. Elméleti Összefoglaló

### 1.1. Egyenesek helyzete a térben
* **Metsző egyenesek:** Egy síkban vannak és van 1 közös pontjuk.
* **Párhuzamos egyenesek:** Egy síkban vannak és nincs közös pontjuk.
* **Kitérő egyenesek:** Nincsenek egy síkban (nincs közös pontjuk és nem párhuzamosak).

---

## 2. Kidolgozott Feladat
**Kérdés:** Egy kocka élei közül válasszunk ki kettőt! Lehetnek-e ezek kitérő egyenesek?

#### Megoldás:
Igen! Például az alapon futó $AB$ él és a hátsó-felső lapon futó $C'D'$ él kitérő egyenesek, mert nincsenek közös síkban.
`,
    advanced: `
# 📖 Térelemek Távolsága és Szöge

Kitérő egyenesek távolsága a két egyenesre illeszkedő párhuzamos síkok távolsága.
`
  },

  // 3. A távolságfogalom segítségével definiált ponthalmazok
  'g-geometric-loci': {
    intermediate: `
# 📖 Nevezetes Ponthalmazok a Síkban

## 1. Elméleti Összefoglaló
* **Körvonal:** A sík azon pontjainak halmaza, amelyek a középponttól ($O$) $r$ távolságra vannak.
* **Szakaszfelező merőleges:** A sík azon pontjainak halmaza, amelyek a szakasz két végpontjától ($A, B$) egyenlő távolságra vannak.
* **Szögfelező:** A sík azon pontjainak halmaza, amelyek a szög két szárától egyenlő távolságra vannak.
* **Párhuzamos egyenespár:** Egy $e$ egyenestől $d$ távolságra lévő pontok halmaza a síkban.
`,
    advanced: `
# 📖 Kúpszeletek Ponthalmazként

* **Parabola:** Egy fókuszponttól és egy vezéregyenestől egyenlő távolságra lévő pontok.
* **Ellipszis:** Két fókuszponttól vett távolságok összege állandó ($d_1 + d_2 = 2a$).
* **Hiperbola:** Két fókuszponttól vett távolságok különbségének abszolút értéke állandó ($|d_1 - d_2| = 2a$).
`
  },

  // 4. Geometriai transzformációk
  'g-geom-transformations': {
    intermediate: `
# 📖 Geometriai Transzformációk

## Irányítástartó és Irányításváltó Transzformációk
* **Egybevágósági transzformáció:** Távolságtartó hozzárendelés (az alakzat mérete és alakja nem változik).
* **Irányítástartó:** Eltolás, forgatás, középpontos tükrözés.
* **Irányításváltó:** Tengelyes tükrözés.
`,
    advanced: `
# 📖 Mátrixos Ábrázolás

Síkpontok transzformációja $2 \\times 2$-es mátrixokkal: $\\begin{pmatrix} x' \\\\ y' \\end{pmatrix} = M \\begin{pmatrix} x \\\\ y \\end{pmatrix}$.
`
  },

  // 5. Egybevágósági transzformációk
  'g-congruence-trans': {
    intermediate: `
# 📖 Egybevágósági Transzformációk

## Háromszögek egybevágóságának esetei (4 eset)
1. **(ooo):** Három oldal megegyezik.
2. **(szosz):** Két oldal és a közbezárt szög megegyezik.
3. **(oszoso):** Egy oldal és a rajta fekvő két szög megegyezik.
4. **(OOSz):** Két oldal és a nagyobbikkal szemközti szög megegyezik.
`,
    advanced: `
# 📖 Egybevágóságok Osztályozása

Minden síkbeli egybevágóság felbontható legfeljebb 3 tengelyes tükrözés szorzatára.
`
  },

  // 6. Hasonlósági transzformációk
  'g-similarity-trans': {
    intermediate: `
# 📖 Hasonlóság és Arányok

## 1. Elméleti Összefoglaló
Ha két alakzat hasonló $k$ aránnyal:
* Megfelelő **oldalaik, kerületük** aránya: $k$.
* **Területük** aránya: $k^2$.
* **Térfogatuk** aránya (testeknél): $k^3$.

---

## 2. Kidolgozott Feladat
**Kérdés:** Egy kocka élét 3-szorosára növeljük. Hányszorosára nő a felszíne és a térfogata?

#### Megoldás:
* Hasonlósági arány: $k = 3$.
* Felszín aránya: $k^2 = 3^2 = 9$-szeresére nő.
* Térfogat aránya: $k^3 = 3^3 = 27$-szeresére nő.
`,
    advanced: `
# 📖 Párhuzamos Szelők Tétele

Ha egy szög szárait párhuzamos egyenesekkel metsszük, a szárakon keletkező megfelelő szakaszok aránya megegyezik:
$$\\frac{a}{b} = \\frac{a'}{b'}$$
`
  },

  // 7. Egyéb transzformációk
  'g-other-transformations': {
    intermediate: `
# 📖 Merőleges Vetítés

A pontból az egyenesre bocsátott merőleges talppontja a pont vetülete.
`,
    advanced: `
# 📖 Affin Transzformációk
`
  },

  // 8. Síkbeli és térbeli alakzatok
  'g-shapes-3d-2d': {
    intermediate: `
# 📖 Konvex és Konkáv Alakzatok

* **Konvex:** Ha az alakzat bármely két pontját összekötő szakasz az alakzat része.
* **Konkáv:** Ha van olyan szakasza két belső pont között, amely kilép az alakzatból.
`,
    advanced: `
# 📖 Euler-féle Poliédertétel

Konvex poliéderekre:
$$C - É + L = 2$$
`
  },

  // 9. Síkbeli alakzatok
  'g-planar-shapes': {
    intermediate: `
# 📖 Konvex Sokszögek

## Képletek:
* **Belső szögek összege:** $(n - 2) \\cdot 180^\circ$
* **Átlók száma:** $\\frac{n(n - 3)}{2}$
`,
    advanced: `
# 📖 Területmérés Axiómái
`
  },

  // 10. Háromszögek
  'g-triangles': {
    intermediate: `
# 📖 Háromszögek Négy Nevezetes Vonala és Pontja

## 1. Nevezetes Vonalak és Metszéspontjaik
1. **Oldalfelező merőlegesek:** Metszéspontjuk a **körülírt kör középpontja ($O$)**.
2. **Belső szögfelezők:** Metszéspontjuk a **beírt kör középpontja ($K$)**.
3. **Magasságvonalak:** Metszéspontjuk a **magasságpont ($M$)**.
4. **Súlyvonalak:** Metszéspontjuk a **súlypont ($S$)**, amely 2:1 arányban osztja a súlyvonalat a csúcstól számítva.

## 2. Pitagorasz-tétel (Derékszögű háromszögre)
$$a^2 + b^2 = c^2$$

---

## 3. Kidolgozott Feladat
**Kérdés:** Egy derékszögű háromszög befogói 6 cm és 8 cm. Mekkora az átfogója és a területe?

#### Megoldás:
1. **Pitagorasz-tétellel az átfogó ($c$):**
   $$c^2 = 6^2 + 8^2 = 36 + 64 = 100 \\implies c = 10 \\text{ cm}$$
2. **Terület ($T$):**
   $$T = \\frac{a \\cdot b}{2} = \\frac{6 \\cdot 8}{2} = 24 \\text{ cm}^2$$
`,
    advanced: `
# 📖 Súlypont Koordinátái és Euler-egyenes

A háromszögben a magasságpont ($M$), a súlypont ($S$) és a körülírt kör középpontja ($O$) egy egyenesen (Euler-egyenes) fekszik, és $MS : SO = 2 : 1$.
`
  },

  // 11. Négyszögek
  'g-quadrilaterals': {
    intermediate: `
# 📖 Speciális Négyszögek

## Osztályozás
* **Trapéz:** Legalább 1 párhuzamos oldalpár. $T = \\frac{a + c}{2} \\cdot m$.
* **Paralelogramma:** 2 párhuzamos oldalpár. $T = a \\cdot m_a = ab \\sin\\gamma$.
* **Rombusz:** Minden oldala egyenlő. Átlói merőlegesen felezik egymást. $T = \\frac{e \\cdot f}{2}$.
* **Deltoid:** 2-2 szomszédos oldala egyenlő. Átlói merőlegesek. $T = \\frac{e \\cdot f}{2}$.
`,
    advanced: `
# 📖 Húrnégyszög és Érintőnégyszög

* **Húrnégyszög:** $\\alpha + \\gamma = \\beta + \\delta = 180^\circ$ (szemközti szögek összege $180^\circ$).
* **Érintőnégyszög:** $a + c = b + d$ (szemközti oldalak összege egyenlő).
`
  },

  // 12. Sokszögek
  'g-polygons': {
    intermediate: `
# 📖 Szabályos Sokszögek

Egy szabályos $n$-szög egy belső szöge:
$$\\alpha = \\frac{(n - 2) \\cdot 180^\circ}{n}$$
`,
    advanced: `
# 📖 Szabályos Sokszög Területe és Sugarai
`
  },

  // 13. Kör
  'g-circle': {
    intermediate: `
# 📖 Kör, Körcikk és Thalész-tétel

## Képletek:
* **Kerület:** $K = 2r\\pi = d\\pi$
* **Terület:** $T = r^2\\pi$
* **Thalész-tétel:** Az átmérőből a körvonal bármely pontjába húzott szög derékszög ($90^\circ$).
`,
    advanced: `
# 📖 Kerületi és Középponti Szögek Tétele

Ugyanahhoz az ívhez tartozó középponti szög kétszerese a kerületi szögnek: $\\beta = 2\\alpha$.
`
  },

  // 14. Térbeli alakzatok
  'g-spatial-shapes': {
    intermediate: `
# 📖 Testek Alaptípusai

* **Hasáb és Henger:** Párhuzamos alaplapok.
* **Gúla és Kúp:** 1 alaplap + csúcspont.
`,
    advanced: `
# 📖 Csonkatestek
`
  },

  // 15. Vektorok síkban és térben
  'g-vectors': {
    intermediate: `
# 📖 Vektorműveletek

* **Vektorok összeadása:** $\\vec{a}(a_1, a_2) + \\vec{b}(b_1, b_2) = \\vec{c}(a_1 + b_1, a_2 + b_2)$.
* **Vektor hossza:** $|\\vec{a}| = \\sqrt{a_1^2 + a_2^2}$.
`,
    advanced: `
# 📖 Skaláris Szorzat

$$\\vec{a} \\cdot \\vec{b} = |\\vec{a}| \\cdot |\\vec{b}| \\cdot \\cos\\varphi = a_1b_1 + a_2b_2$$
*(Ha $\\vec{a} \\cdot \\vec{b} = 0$, a két nemnulla vektor merőleges egymásra!)*
`
  },

  // 16. Trigonometria
  'g-trigonometry': {
    intermediate: `
# 📖 Trigonometria – Szinusz- és Koszinusztétel

## 1. Derékszögű Háromszög Szögfüggvényei
* $\\sin\\alpha = \\frac{\\text{szemközti}}{\\text{átfogó}}$
* $\\cos\\alpha = \\frac{\\text{szomszédos}}{\\text{átfogó}}$
* $\\tan\\alpha = \\frac{\\text{szemközti}}{\\text{szomszédos}}$

## 2. Általános Háromszögek Tételei
* **Szinusztétel:** $\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R$
* **Koszinusztétel:** $c^2 = a^2 + b^2 - 2ab \\cos\\gamma$

---

## 3. Kidolgozott Feladat
**Kérdés:** Egy háromszög két oldala $a = 5 \\text{ cm}$, $b = 8 \\text{ cm}$, a közbezárt szögük $\\gamma = 60^\circ$. Mekkora a harmadik oldal ($c$)?

#### Megoldás (Koszinusztétellel):
$$c^2 = 5^2 + 8^2 - 2 \\cdot 5 \\cdot 8 \\cdot \\cos 60^\circ$$
Mivel $\\cos 60^\circ = 0.5$:
$$c^2 = 25 + 64 - 80 \\cdot 0.5 = 89 - 40 = 49 \\implies c = 7 \\text{ cm}$$
**Válasz:** A harmadik oldal hossza **7 cm**.
`,
    advanced: `
# 📖 Addíciós Tételek

* $\\sin(\\alpha \\pm \\beta) = \\sin\\alpha\\cos\\beta \\pm \\cos\\alpha\\sin\\beta$
* $\\cos(\\alpha \\pm \\beta) = \\cos\\alpha\\cos\\beta \\mp \\sin\\alpha\\sin\\beta$
`
  },

  // 17. Koordinátageometria
  'g-coordinate-geometry': {
    intermediate: `
# 📖 Koordinátageometria Alapjai

## Felezőpont és Távolság
* **Szakasz felezőpontja:** $F\\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$
* **Két pont távolsága:** $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$
`,
    advanced: `
# 📖 Alakzatok Metszéspontjai
`
  },

  // 18. Pontok, vektorok
  'g-points-vectors': {
    intermediate: `
# 📖 Helyvektorok és Pontok

A $P(x, y)$ pontba mutató helyvektor $\\vec{p} = (x, y)$.
`,
    advanced: `
# 📖 Súlypont Koordinátái
$$S = \\left(\\frac{A_x + B_x + C_x}{3}, \\frac{A_y + B_y + C_y}{3}\\right)$$
`
  },

  // 19. Egyenes
  'g-line-equation': {
    intermediate: `
# 📖 Az Egyenes Egyenlete

## 1. Egyenletformák
* **Normálvektoros egyenlet:** $Ax + By = Ax_0 + By_0$, ahol $\\vec{n}(A, B)$ a merőleges normálvektor.
* **Irányvektoros egyenlet:** $-vx + uy = -vx_0 + uy_0$, ahol $\\vec{v}(u, v)$ a párhuzamos irányvektor.
* **Iránytényezős alak:** $y = mx + b$, ahol $m = \\tan\\alpha$ a meredekség.

---

## 2. Kidolgozott Feladat
**Kérdés:** Írd fel a $P_0(2, -3)$ ponton átmenő, $\\vec{n}(4, 5)$ normálvektorú egyenes egyenletét!

#### Megoldás:
$$A = 4, \\quad B = 5, \\quad x_0 = 2, \\quad y_0 = -3$$
$$4x + 5y = 4 \\cdot 2 + 5 \\cdot (-3)$$
$$4x + 5y = 8 - 15 \\implies 4x + 5y = -7$$
`,
    advanced: `
# 📖 Párhuzamos és Merőleges Egyenesek

* **Párhuzamos:** Normálvektoraik megegyeznek vagy arányosak ($\\vec{n}_1 \\parallel \\vec{n}_2$).
* **Merőleges:** Normálvektoraik skaláris szorzata null: $\\vec{n}_1 \\cdot \\vec{n}_2 = 0$.
`
  },

  // 20. Kör
  'g-circle-equation': {
    intermediate: `
# 📖 A Kör Egyenlete

## Képlet:
A $C(u, v)$ középpontú, $r$ sugarú kör egyenlete:
$$(x - u)^2 + (y - v)^2 = r^2$$

### Példa:
A $C(3, -2)$ középpontú, $r = 5$ sugarú kör egyenlete:
$$(x - 3)^2 + (y + 2)^2 = 25$$
`,
    advanced: `
# 📖 Kör Érintőjének Egyenlete
`
  },

  // 21. Parabola
  'g-parabola-equation': {
    intermediate: `
# 📖 A Parabola Egyenlete

Másodfokú egyenlet alakja: $y = a(x - u)^2 + v$, ahol $(u, v)$ a parabola tengelypópontja (csúcsa).
`,
    advanced: `
# 📖 Parabola Fókuszos Alakja ($x^2 = 2py$)
`
  },

  // 22. Kerület, terület
  'g-perimeter-area': {
    intermediate: `
# 📖 Területképletek Összefoglalója

* **Háromszög:** $T = \\frac{a \\cdot m_a}{2} = \\frac{ab \\sin\\gamma}{2}$
* **Négyszög / Paralelogramma:** $T = a \\cdot m_a$
* **Trapéz:** $T = \\frac{a + c}{2} \\cdot m$
* **Kör:** $T = r^2\\pi$, $K = 2r\\pi$
`,
    advanced: `
# 📖 Heron-képlet Háromszögre

$$T = \\sqrt{s(s - a)(s - b)(s - c)}, \\quad s = \\frac{a + b + c}{2}$$
`
  },

  // 23. Felszín, térfogat
  'g-surface-volume': {
    intermediate: `
# 📖 Testek Felszíne és Térfogata

## 1. Alapvető Testek Képletei
* **Kocka:** $V = a^3$, $A = 6a^2$
* **Téglatest:** $V = abc$, $A = 2(ab + bc + ac)$
* **Henger:** $V = r^2\\pi m$, $A = 2r^2\\pi + 2r\\pi m$
* **Gúla / Kúp:** $V = \\frac{A_{\\text{alap}} \\cdot m}{3}$
* **Gömb:** $V = \\frac{4}{3}r^3\\pi$, $A = 4r^2\\pi$

---

## 2. Kidolgozott Feladat
**Kérdés:** Mekkora a sugara és a térfogata annak a gömbnek, amelynek felszíne $36\\pi \\text{ cm}^2$?

#### Megoldás:
1. **Felszín képlete:** $A = 4r^2\\pi = 36\\pi \\implies 4r^2 = 36 \\implies r^2 = 9 \\implies r = 3 \\text{ cm}$.
2. **Térfogat képlete:**
   $$V = \\frac{4}{3} r^3 \\pi = \\frac{4}{3} \\cdot 3^3 \\cdot \\pi = \\frac{4}{3} \\cdot 27 \\cdot \\pi = 36\\pi \\text{ cm}^3$$
`,
    advanced: `
# 📖 Csonkakúp Térfogata

$$V = \\frac{m\\pi}{3}(R^2 + Rr + r^2)$$
`
  }
};

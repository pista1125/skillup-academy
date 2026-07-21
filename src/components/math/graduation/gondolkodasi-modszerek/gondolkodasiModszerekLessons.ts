export interface LessonContentMap {
  [subtopicId: string]: {
    intermediate: string;
    advanced: string;
  };
}

export const gondolkodasiModszerekLessons: LessonContentMap = {
  // 1. Halmazok
  'g-sets': {
    intermediate: `
# 📖 Halmazok – Elmélet és Kidolgozott Feladatok

## 1. Elméleti Összefoglaló

### 1.1. Alapfogalmak és jelölések
* **Halmaz fogalma:** A matematika alapfogalma, bizonyos dolgok, objektumok összességét jelenti. A halmaz elemeit egyértelműen meghatározott tulajdonságuk alapján gyűjtjük össze.
* **Eleme jelölés:** Ha az $x$ elem benne van az $A$ halmazban, azt így jelöljük: $x \\in A$. Ha $x$ nem eleme az $A$ halmaznak: $x \\notin A$.
* **Üres halmaz:** Az a halmaz, amelynek egyetlen eleme sincs. Jelölése: $\\emptyset$ vagy \\{\\}. *(Vigyázat: a $\\{\\emptyset\\}$ nem üres halmaz, hanem egy 1-elemű halmaz, aminek az eleme az üres halmaz!)*

### 1.2. Halmazok megadásának módjai
1. **Elemet felsorolásával:** $A = \\{1, 2, 3, 4, 5\\}$
2. **Közös tulajdonság megadásával:** $B = \\{x \\in \\mathbb{N} \\mid x \\text{ páros és } x < 10\\}$
3. **Venn-diagrammal (szemléltető körökkel):** Vizuális ábrázolás segítségével.

### 1.3. Halmazok egyenlősége és részhalmaz
* **Két halmaz egyenlő ($A = B$):** Ha elemeik pontosan megegyeznek, azaz minden $x \\in A \\Rightarrow x \\in B$ és minden $y \\in B \\Rightarrow y \\in A$.
* **Részhalmaz ($A \\subseteq B$):** Az $A$ halmaz részhalmaza a $B$ halmaznak, ha $A$ minden eleme eleme $B$-nek is.
* **Valódi részhalmaz ($A \\subset B$):** $A \\subseteq B$ és $A \\neq B$ (van olyan eleme $B$-nek, ami $A$-ban nincs benne).

---

## 2. Kidolgozott Érettségi Példafeladatok

### 1. Feladat (Alapfokú típusfeladat)
**Kérdés:** Adottak az alábbi halmazok:
$A = \\{x \\in \\mathbb{N} \\mid 1 \\le x \\le 10\\}$, 
$B = \\{x \\in A \\mid x \\text{ prím\\textsf{szám}}\\text{\\}}}$

Add meg az $A$ és $B$ halmaz elemeit felsorolással, és döntsd el, hogy igaz-e az $A \\subseteq B$ állítás!

#### Megoldás lépésről lépésre:
1. **Az $A$ halmaz elemei:** A 1 és 10 közötti természetes számok (beleértve az 1-et és 10-et is):
   $$A = \\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\}$$
2. **A $B$ halmaz elemei:** Az $A$-beli prímhatározás (a prímszámok 1-nél nagyobb természetes számok, amiknek pontosan 2 osztójuk van: 1 és önmaguk):
   $$B = \\{2, 3, 5, 7\\}$$
3. **Az $A \\subseteq B$ vizsgálata:** Az $A \\subseteq B$ azt jelentené, hogy $A$ minden eleme benne van $B$-ben. Mivel például $1 \\in A$, de $1 \\notin B$, ezért az állítás **HAMIS**. (Ezzel szemben a $B \\subseteq A$ állítás IGAZ lenne).

---

### 2. Feladat (Középszintű érettségi feladat)
**Kérdés:** Egy 30 fős osztályban megkérdezték a diákokat, hogy kik tanulnak angolul és kik németül.
- 20 diák tanul angolul ($A$)
- 12 diák tanul németül ($N$)
- 5 diák egyik nyelvet sem tanulja.

Hányan tanulják **mindkét** nyelvet?

#### Megoldás lépésről lépésre:
1. A teljes osztály létszáma: $|U| = 30$.
2. Mivel 5-en semmit sem tanulnak, a nyelvet tanulók száma: $|A \\cup N| = 30 - 5 = 25$.
3. A Logikai szita-klauzula szerint:
   $$|A \\cup N| = |A| + |N| - |A \\cap N|$$
4. Behelyettesítve az ismert adatokat:
   $$25 = 20 + 12 - |A \\cap N|$$
   $$25 = 32 - |A \\cap N| \\implies |A \\cap N| = 32 - 25 = 7$$
5. **Válasz:** Pontosan **7 diák** tanulja mindkét nyelvet.
`,
    advanced: `
# 📖 Halmazok – Emelt Szintű Elmélet és Bizonyítások

## 1. Emelt Szintű Elmélet

### 1.1. Halmazok axiomatikus felépítése (ZFC elemek)
* A matematika alapjait a Zermelo-Fraenkel halmazelmélet (ZFC) adja.
* A halmazelméletben elkerüljük a Russel-paradoxont (az olyan halmazok halmaza, amik nem tartalmazzák önmagukat elemlént) a gyűjtési axióma korlátozásával.

### 1.2. Hatványhalmaz ($P(A)$)
* Az $A$ halmaz **hatványhalmaza** az $A$ összes részhalmazának halmaza:
  $$\\mathcal{P}(A) = \\{ X \\mid X \\subseteq A \\}$$
* Ha $|A| = n$, akkor a hatványhalmaz számossága: $|\\mathcal{P}(A)| = 2^n$.

---

## 2. Emelt Szintű Bizonyítási Feladat

### Feladat:
Bizonyítsd be, hogy tetszőleges $A, B$ halmazok esetén $A \\subseteq B \\iff \\mathcal{P}(A) \\subseteq \\mathcal{P}(B)$!

#### Bizonyítás:
1. **$(\\Rightarrow)$ Irány:** Feltesszük, hogy $A \\subseteq B$. Legyen $X \\in \\mathcal{P}(A)$ tetszőleges. 
   Definíció szerint ez azt jelenti, hogy $X \\subseteq A$.
   Mivel $X \\subseteq A$ és $A \\subseteq B$, a részhalmaz reláció tranzitvitása miatt $X \\subseteq B$.
   Ez definíció szerint azt jelenti, hogy $X \\in \\mathcal{P}(B)$. Mivel ez minden $X$-re teljesül, $\\mathcal{P}(A) \\subseteq \\mathcal{P}(B)$.
2. **$(\\Leftarrow)$ Irány:** Feltesszük, hogy $\\mathcal{P}(A) \\subseteq \\mathcal{P}(B)$.
   Tudjuk, hogy $A \\subseteq A$, vagyis $A \\in \\mathcal{P}(A)$.
   A feltétel miatt ekkor $A \\in \\mathcal{P}(B)$ is teljesül.
   Ez definíció szerint pontosan azt jelenti, hogy $A \\subseteq B$. $\\blacksquare$
`
  },

  // 2. Halmazműveletek
  'g-set-operations': {
    intermediate: `
# 📖 Halmazműveletek – Elmélet és Feladatok

## 1. Elméleti Összefoglaló

### 1.1. Alapvető halmazműveletek
1. **Unió (Egyesítés) – $A \\cup B$:**
   $$A \\cup B = \\{ x \\mid x \\in A \\text{ vagy } x \\in B \\}$$
   *(Azok az elemek, amik legalább az egyik halmazban benne vannak).*

2. **Metszet (Közös rész) – $A \\cap B$:**
   $$A \\cap B = \\{ x \\mid x \\in A \\text{ és } x \\in B \\}$$
   *(Azok az elemek, amik mindkét halmazban benne vannak. Ha $A \\cap B = \\emptyset$, a két halmaz **diszjunkt**).*

3. **Különbség – $A \\setminus B$:**
   $$A \\setminus B = \\{ x \\mid x \\in A \\text{ és } x \\notin B \\}$$
   *(Azok az elemek, amik $A$-ban benne vannak, de $B$-ben nincsenek).*

4. **Komplementer (Kiegészítő halmaz) – $\\overline{A}$ vagy $A^c$:**
   Egy kijelölt $U$ alaphalmaz esetén:
   $$\\overline{A} = U \\setminus A = \\{ x \\in U \\mid x \\notin A \\}$$

---

## 2. Kidolgozott Érettségi Példafeladatok

### 1. Feladat (Halmazműveletek kiszámítása)
**Kérdés:** Legyen az alaphalmaz $U = \\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\}$.
Legyen $A = \\{2, 4, 6, 8, 10\\}$ és $B = \\{6, 7, 8, 9, 10\\}$.
Határozd meg az alábbi halmazokat:
a) $A \\cap B$
b) $A \\cup B$
c) $A \\setminus B$
d) $\\overline{A}$

#### Megoldás:
* **a) $A \\cap B$:** A közös elemek: $\\{6, 8, 10\\}$
* **b) $A \\cup B$:** Az összes elem összevonva (ismétlés nélkül): $\\{2, 4, 6, 7, 8, 9, 10\\}$
* **c) $A \\setminus B$:** Azok az $A$-beli elemek, amik nincsenek $B$-ben: $\\{2, 4\\}$
* **d) $\\overline{A}$:** Azok az $U$-beli elemek, amik nincsenek $A$-ban (a páratlan számok): $\\{1, 3, 5, 7, 9\\}$
`,
    advanced: `
# 📖 Halmazműveletek – De Morgan Azonosságok

## De Morgan törvények
Tetszőleges $A, B \\subseteq U$ halmazokra:
1. $\\overline{A \\cup B} = \\overline{A} \\cap \\overline{B}$ (Az unió komplementere a komplementerek metszete).
2. $\\overline{A \\cap B} = \\overline{A} \\cup \\overline{B}$ (A metszet komplementere a komplementerek uniója).

### Bizonyítás (Venn-diagramos és elemi úton):
Ha $x \\in \\overline{A \\cup B} \\iff x \\notin (A \\cup B) \\iff \\neg(x \\in A \\lor x \\in B) \\iff (x \\notin A) \\land (x \\notin B) \\iff x \\in \\overline{A} \\cap \\overline{B}$. $\\blacksquare$
`
  },

  // 3. Számosság, részhalmazok
  'g-cardinality': {
    intermediate: `
# 📖 Számosság és Logikai Szita

## 1. Elméleti Összefoglaló
* **Halmaz számossága ($|A|$):** A halmaz elemeinek száma véges halmazok esetén.
* **Hatványhalmaz elemeinek száma:** Ha $|A| = n$, akkor $A$-nak $2^n$ darab részhalmaza van.
* **Kétkomponensű szita formula:**
  $$|A \\cup B| = |A| + |B| - |A \\cap B|$$
* **Hromkomponensű szita formula:**
  $$|A \\cup B \\cup C| = |A| + |B| + |C| - |A \\cap B| - |A \\cap C| - |B \\cap C| + |A \\cap B \\cap C|$$

---

## 2. Kidolgozott Feladat

**Feladat:** Hány 3-mal vagy 5-tel osztható szám van 1 és 100 között (beleértve a 100-at is)?

#### Megoldás:
1. Legyen $A$ a 3-mal osztható számok halmaza: $|A| = \\lfloor 100 / 3 \\rfloor = 33$.
2. Legyen $B$ az 5-tel osztható számok halmaza: $|B| = \\lfloor 100 / 5 \\rfloor = 20$.
3. $A \\cap B$ a 15-tel osztható számok halmaza: $|A \\cap B| = \\lfloor 100 / 15 \\rfloor = 6$.
4. A szita formula alapján:
   $$|A \\cup B| = 33 + 20 - 6 = 47$$
**Válasz:** Pontosan **47** ilyen szám van.
`,
    advanced: `
# 📖 Halmazok Számossága (Végtelen Halmazok)

## Megszámlálható és Kontinuum Számosság
* **Megszámlálhatóan végtelen:** Azok a halmazok, amik bijekcióba hozhatók a természetes számok halmazával ($\\mathbb{N}$).
  - Példák: $\\mathbb{N}, \\mathbb{Z}, \\mathbb{Q}$.
* **Kontinuum számosság:** A valós számok halmazának ($\\mathbb{R}$) számossága.
  - Cantor átlós módszerével bizonyítható, hogy $|\\mathbb{N}| < |\\mathbb{R}|$.
`
  },

  // 4. Matematikai logika
  'g-logic': {
    intermediate: `
# 📖 Matematikai Logika

## 1. Logikai Alapműveletek
* **Kijelentés (ítélet):** Olyan kijelentő mondat, amelyről egyértelműen eldönthető, hogy igaz (I, 1) vagy hamis (H, 0).
* **Konjunkció ($A \\land B$, 'és'):** Csak akkor igaz, ha mindkét komponens igaz.
* **Diszjunkció ($A \\lor B$, 'vagy'):** Akkor igaz, ha legalább az egyik komponens igaz.
* **Negáció ($\\neg A$, 'tagadás'):** Ellenkezőjére fordítja az igazságértéket.

## 2. Kijelentések Tagadása (Érettségi Típusfeladat)
* **'Minden' tagadása:** "Van olyan..." (Létezik legalább egy, amire nem igaz).
* **'Létezik' tagadása:** "Egyetlen egy sincs..." (Minden elemre nem igaz).

### Példa:
* Állítás: *"Minden diák átment a vizsgán."*
* Helyes tagadás: *"Van olyan diák, aki nem ment át a vizsgán."*
`,
    advanced: `
# 📖 Implikáció és Ekvivalencia Igazságtáblája

## Implikáció ($A \\Rightarrow B$)
* Jelentése: "Ha A, akkor B".
* Igazságtábla:
  | A | B | A => B |
  |---|---|--------|
  | I | I |   I    |
  | I | H |   **H**  |
  | H | I |   I    |
  | H | H |   I    |
* **Kontrapozíció:** $(A \\Rightarrow B) \\iff (\\neg B \\Rightarrow \\neg A)$.
`
  },

  // 5. Fogalmak, tételek és bizonyítások
  'g-proofs': {
    intermediate: `
# 📖 Fogalmak és Bizonyítások

## 1. Definíció és Tétel
* **Definíció:** Új matematikai fogalom pontos leírása.
* **Tétel:** Igaz matematikai állítás, amelyet igazolnunk (bizonyítanunk) kell.

## 2. Bizonyítási Módszerek
1. **Direkt bizonyítás:** Ismert igaz állításokból logikai lépésekkel eljutunk a tétel állításához.
2. **Indirekt bizonyítás:** Feltesszük az állítás tagadását, majd ebből logikai ellentmondásra jutunk.
`,
    advanced: `
# 📖 Indirekt Bizonyítás – Példa

## Feladat: Bizonyítsd be, hogy $\\sqrt{2}$ irracionális szám!

### Bizonyítás (Indirekt módon):
1. Tegyük fel az ellenkezőjét: $\\sqrt{2}$ racionális szám, vagyis felírható $\\sqrt{2} = \\frac{p}{q}$ alakban, ahol $p, q \\in \\mathbb{Z}, q \\neq 0$ és a tört tovább nem egyszerűsíthető ($\\text{lnko}(p,q) = 1$).
2. Négyzetre emelve: $2 = \\frac{p^2}{q^2} \\implies p^2 = 2q^2$.
3. Ebből következik, hogy $p^2$ páros, így $p$ is páros. Legyen $p = 2k$.
4. Behelyettesítve: $(2k)^2 = 2q^2 \\implies 4k^2 = 2q^2 \\implies q^2 = 2k^2$.
5. Ebből következik, hogy $q^2$ is páros, így $q$ is páros.
6. **Ellentmondás!** Azt kaptuk, hogy $p$ és $q$ is páros, így a $\\frac{p}{q}$ tört egyszerűsíthető lenne 2-vel, ami ellentmond annak a feltételezésnek, hogy a tört nem egyszerűsíthető.
7. Ezért az eredeti feltételezésünk hamis volt, tehát $\\sqrt{2}$ valóban irracionális! $\\blacksquare$
`
  },

  // 6. Kombinatorika
  'g-combinatorics': {
    intermediate: `
# 📖 Kombinatorika

## 1. Alapképletek (Ismétlés nélkül)
1. **Permutáció ($P_n$):** $n$ elem összes lehetséges sorrendje:
   $$P_n = n! = 1 \\cdot 2 \\cdot 3 \\dots n$$
2. **Variáció ($V_n^k$):** $n$ elemből $k$ kiválasztása, ha a **sorrend számít**:
   $$V_n^k = \\frac{n!}{(n-k)!}$$
3. **Kombináció ($C_n^k$):** $n$ elemből $k$ kiválasztása, ha a **sorrend NEM számít**:
   $$C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}$$

---

## 2. Kidolgozott Feladatok

### 1. Feladat:
Egy futóverseny döntőjében 8 versenyző indul. Hányféleképpen alakulhat az első három helyezett (dobogósok) sorrendje?

#### Megoldás:
Mivel 8 elemből választunk ki 3-at és a sorrend számít (arany, ezüst, bronz), ez variáció:
$$V_8^3 = 8 \\cdot 7 \\cdot 6 = 336$$
**Válasz:** 336-féleképpen alakulhat a dobogó.

### 2. Feladat:
A lottón 90 számból 5-öt húznak ki. Hányféle szelvény tölthető ki?

#### Megoldás:
A kihúzás sorrendje nem számít, így kombinációról van szó:
$$\\binom{90}{5} = \\frac{90 \\cdot 89 \\cdot 88 \\cdot 87 \\cdot 86}{5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1} = 43\\ 949\\ 268$$
`,
    advanced: `
# 📖 Binomiális Tétel és Ismétléses Kombinatorika

## Binomiális Tétel
Tetszőleges $a, b \\in \\mathbb{R}$ és $n \\in \\mathbb{N}$ esetén:
$$(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k = \\binom{n}{0}a^n + \\binom{n}{1}a^{n-1}b + \\dots + \\binom{n}{n}b^n$$
`
  },

  // 7. Gráfok
  'g-graphs': {
    intermediate: `
# 📖 Gráfok Alapjai és Tételei

## 1. Elméleti Összefoglaló
* **Gráf ($G = (V, E)$):** Csúcsokból ($V$) és élekből ($E$) álló struktúra.
* **Csúcs fokszáma ($d(v)$):** Az adott csúcsból induló élek száma.
* **Fokszámösszeg-tétel (Kézfogási tétel):**
  Egy gráf csúcsai fokszámainak összege megegyezik az élek számának kétszeresével:
  $$\\sum_{v \\in V} d(v) = 2 \\cdot |E|$$
* **Következmény:** Minden grábban a páratlan fokszámú csúcsok száma páros!

---

## 2. Kidolgozott Példafeladat

**Kérdés:** Létezik-e olyan egyszerű gráf, amelynek csúcsainak fokszámai: $3, 3, 3, 2, 1$?

#### Megoldás:
1. Adjuk össze a fokszámokat: $3 + 3 + 3 + 2 + 1 = 12$.
2. A fokszámösszeg (12) páros, amivel a kézfogási tétel első feltétele teljesül.
3. Számoljuk meg a páratlan fokszámú csúcsokat: a 3, 3, 3 és 1 páratlan számok, vagyis **4 darab** páratlan fokszámú csúcs van. Mivel a 4 páros szám, a tétel következménye teljesül.
4. Nézzük meg a csúcsok számát: 5 csúcs van. A maximális fokszám egy 5 csúcsú egyszerű grábban $5 - 1 = 4$ lehet. Jelenleg a max fokszám 3, ami teljesülhet.
**Válasz:** Igen, létezik ilyen gráf!
`,
    advanced: `
# 📖 Fa Gráfok és Euler-Körök

## Fa Gráfok
* **Definíció:** Összefüggő, körmentes egyszerű gráf.
* **Tétel:** Egy $n$ csúcsú fa gráfnak pontosan $n - 1$ éle van.
* **Euler-vonal / kör:** Olyan séta, amely a gráf minden élén pontosan egyszer halad át. Euler-kör akkor és csak akkor létezik egy összefüggő grábban, ha **minden csúcs fokszáma páros**.
`
  }
};

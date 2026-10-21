# 1. Halmazok, logika, kombinatorika, gráfok (Rendszerező összefoglalás)

## Fejezet Áttekintés
A középiskolai matematika diszkrét matematikai pillérei: halmazelmélet, kijelentéslogika, kombinatorika és gráfelmélet érettségi fókuszú, átfogó rendszerezése.

---

## 1. Halmazelmélet

- **Alapműveletek:**
  - Metszet ($A \cap B$): a közös elemek ("ÉS").
  - Unió ($A \cup B$): legalább az egyikbe tartozó elemek ("VAGY").
  - Különbség ($A \setminus B$): $A$-beli, de nem $B$-beli elemek.
  - Komplementer ($\bar{A}$): az alaphalmaz azon elemei, amelyek nincsenek benne $A$-ban.
- **Elemszámok összefüggései:**
  - Két halmaz: $|A \cup B| = |A| + |B| - |A \cap B|$
  - Három halmaz (Szita-formula):
    $$|A \cup B \cup C| = |A| + |B| + |C| - (|A \cap B| + |A \cap C| + |B \cap C|) + |A \cap B \cap C|$$

---

## 2. Matematikai Logika

- **Állítás (kijelentés):** Olyan kijelentő mondat, amelyről egyértelműen eldönthető, hogy igaz ($I$) vagy hamis ($H$).
- **Műveletek:**
  - Tagadás ($\neg A$): megfordítja az igazságértéket.
  - Konjunkció ($A \land B$): csak akkor igaz, ha mindkettő igaz.
  - Diszjunkció ($A \lor B$): csak akkor hamis, ha mindkettő hamis.
  - Implikáció ($A \implies B$): csak akkor hamis, ha $A$ igaz és $B$ hamis ("ha $A$, akkor $B$").
  - Ekvivalencia ($A \iff B$): pontosan akkor igaz, ha azonos az igazságértékük.
- **Kondicionálisok vizsgálata:**
  - Eredeti: $A \implies B$
  - Megfordítás: $B \implies A$ (nem szükségszerűen egyenértékű az eredetivel!)
  - Kontrapozíció: $\neg B \implies \neg A$ (mindig logikailag egyenértékű az eredetivel!).
- **Bizonyítási módszerek:** Direkt bizonyítás, indirekt bizonyítás, teljes indukció.

---

## 3. Kombinatorika

| Típus | Sorrend számít? | Minden elem szerepel? | Ismétlés nélküli képlet | Ismétléses képlet |
|---|---|---|---|---|
| **Permutáció** | Igen | Igen | $P_n = n!$ | $P_n^{k_1, \dots, k_r} = \frac{n!}{k_1! \dots k_r!}$ |
| **Variáció** | Igen | Nem ($k < n$) | $V_n^k = \frac{n!}{(n-k)!}$ | $V_n^{k, \text{ism}} = n^k$ |
| **Kombináció** | Nem | Nem ($k \le n$) | $C_n^k = \binom{n}{k} = \frac{n!}{k!(n-k)!}$ | $C_n^{k, \text{ism}} = \binom{n+k-1}{k}$ |

---

## 4. Gráfelmélet

- **Alapfogalmak:** Csúcsok halmaza ($V$), élek halmaza ($E$).
- **Fokszámtétel:** A csúcsok fokszámainak összege megegyezik az élek számának kétszeresével:
  $$\sum_{v \in V} d(v) = 2 \cdot |E|$$
  - *Következmény:* Páratlan fokszámú csúcsból mindig páros sok van a gráfban!
- **Egyszerű gráf:** Nincs benne hurokél és többszörös él.
- **Teljes gráf ($K_n$):** Minden csúcspár össze van kötve: $|E| = \binom{n}{2} = \frac{n(n-1)}{2}$.
- **Fa:** Összefüggő és körmentes gráf. $n$ csúcsú fa éleinek száma: $|E| = n - 1$.
- **Euler-vonal:** Olyan vonal, amely a gráf minden élén pontosan egyszer halad végig. (Összefüggő gráfban létezik zárt Euler-vonal $\iff$ minden csúcs fokszáma páros).

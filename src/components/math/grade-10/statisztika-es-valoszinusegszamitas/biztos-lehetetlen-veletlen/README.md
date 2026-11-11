# 8. Biztos, lehetetlen, véletlen események

## Tananyag Áttekintés
Eseményalgebra és a valószínűség alaptulajdonságai: a valószínűségi spektrum (0-tól 1-ig), biztos esemény ($P = 1$), lehetetlen esemény ($P = 0$), véletlen esemény ($0 < P < 1$), komplementer (ellentett) események ($P(\bar{A}) = 1 - P(A)$), egymást kizáró események összeadási szabálya, és dinamikus valószínűségi egyenletek felállítása.

---

## Fő Eseménytípusok és Szabályok

- **Események típusai a valószínűség alapján:**
  - **Biztos esemény ($I$ vagy $\Omega$):** Minden kísérletben garantáltan bekövetkezik $\implies P(\Omega) = 1$ (100%).
  - **Lehetetlen esemény ($\emptyset$):** Egyetlen kísérlet során sem valósulhat meg $\implies P(\emptyset) = 0$ (0%).
  - **Véletlen esemény ($A$):** Bekövetkezhet, de nem biztos $\implies 0 < P(A) < 1$.

- **Műveletek eseményekkel és tételek:**
  - **Komplementer (ellentett) esemény ($\bar{A}$):**
    $$P(\bar{A}) = 1 - P(A) \iff P(A) + P(\bar{A}) = 1$$
    Alkalmazás: A „legalább egy” típusú kérdések azonnal megoldhatók: $P(\text{legalább egy}) = 1 - P(\text{egyik sem})$.
  - **Egymást kizáró események ($A \cap B = \emptyset$):**
    $$P(A \cup B) = P(A) + P(B)$$
  - **Általános események uniója:**
    $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

- **Dinamikus valószínűségi egyenletek:**
  - Készlet bővítése: $\frac{k + x}{n + x} = p_{\text{cél}}$
  - Készlet szűkítése: $\frac{k}{n - y} = p_{\text{cél}}$

---

## Elkészült Komponensek
- `EventCertaintyFigures.tsx`: Valószínűségi spektrum SVG (0..1), Venn-diagram (komplementerek), és gyöngyök dobozban megoszlási ábra.
- `EventCertaintyMatcher.tsx`: 3 szintű interaktív párosító modul (24 pár).
- `EventCertaintySorter.tsx`: 3 szintű sorbarendező modul (valószínűségi értékek növekvő sorrendben).
- `EventCertaintyTheory.tsx`: Átfogó tananyag 5 szabállyal a tetején, interaktív dinamikus müzliszelet- és golyókalkulátorral.
- `EventCertaintyQuiz.tsx`: 30 kérdéses 3 szintű kvíz puskakártyákkal és beágyazott párosító/rendező modulokkal.

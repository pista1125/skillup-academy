# 9. Valószínűség a gyakorlatban

## Tananyag Áttekintés
Gyakorlati valószínűségszámítási problémák modellezése: logikai szita módszere és Venn-diagramok, kétdimenziós gyakorisági és orvosi/donor táblázatok, biztosítási ügyfélcsoportok uniója és metszete, belépési sorrendek blokkosítása, és visszatevés nélküli iskolai mintavételek (felelések valószínűsége).

---

## Fő Gyakorlati Esetek és Mintavételek

- **Logikai szita és Venn-diagram:**
  - Két esemény uniója: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
  - „Egyik sem” esemény: $P(\overline{A \cup B}) = 1 - P(A \cup B)$.
  - „Csak az egyik” (szimmetrikus differencia): $P(\text{csak egyik}) = P(A) + P(B) - 2 \cdot P(A \cap B)$.
  - Példa: 36 fős osztály (9 matek, 18 töri, 3 mindkettő $\implies 6 + 15 + 3 = 24$ legalább egy, 12 egyik sem).

- **Kétdimenziós gyakorisági táblák:**
  - Sor- és oszlopösszegek (margók).
  - Vércsoportok és Rh-faktor (346 egység véradó): $P(0 \cup \text{Rh}+) = (191 + 292 - 161) / 346 = 322 / 346 \approx 93,1\%$.
  - Ügyfélbiztosítások (1000 ügyfél: 611 gépjármű, 389 lakás, 96 mindkettő $\implies 904$ legalább egy, 96 egyik sem).

- **Sorrendek és blokkosítás:**
  - $n$ személyből 2 egymás utáni belépése: $P = \frac{2}{n}$.
  - 5 barátnő belép a terembe: Anna és Kati egymás után: $2/5 = 40\%$, nem egymás után: $3/5 = 60\%$.
  - Felelés: 6 diákból 2 felel egymás után $\implies$ felelni fogsz: $1/6 + 1/6 = 1/3 \approx 33,3\%$.

---

## Elkészült Komponensek
- `PracticalProbFigures.tsx`: Venn-diagram (36 fős osztály), kétdimenziós vércsoport kereszttábla (346 donor), és sorrendi permutációk (Anna és Kati) SVG ábrák.
- `PracticalProbMatcher.tsx`: 3 szintű interaktív párosító modul (24 pár).
- `PracticalProbSorter.tsx`: 3 szintű sorbarendező modul (36 fős osztály, biztosítási ügyfelek, sorrendek).
- `PracticalProbTheory.tsx`: Átfogó elméleti tananyag 5 szabállyal a tetején, interaktív Venn-diagram laborral és vércsoport kereszttáblával.
- `PracticalProbQuiz.tsx`: 30 kérdéses 3 szintű kvíz puskakártyákkal és beágyazott párosító/rendező modulokkal.

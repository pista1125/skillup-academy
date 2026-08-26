# 2. Mit tudunk a halmazokról? (8. osztály)

## Tananyag Áttekintés
A halmazelmélet alapfogalmainak felfrissítése és kiterjesztése: halmazok megadása, elemi relációk, speciális halmazok és Venn-diagramos szemléltetés.

---

## Főbb Témakörök és Jelölések

### 1. Halmaz fogalma és megadása
- **Halmaz:** Bizonyos dolgok (elemek) összessége, amelyről minden dologra egyértelműen megmondható, hogy bele tartozik-e vagy sem.
- **Megadási módok:**
  1. **Felsorolással:** $A = \{2, 3, 5, 7, 11\}$
  2. **Közös tulajdonsággal (utasítással):** $B = \{x \in \mathbb{N} \mid x \text{ páros és } x < 10\}$
  3. **Venn-diagrammal:** Síkbeli zárt vonallal határolt területen belül ábrázolt elemek.

### 2. Jelölések és relációk
- **Eleme:** $x \in A$ ($x$ eleme az $A$ halmaznak).
- **Nem eleme:** $y \notin A$ ($y$ nem eleme az $A$ halmaznak).
- **Halmaz elemszáma:** $\lvert A \rvert$ (vagy $n(A)$). Véges halmaz esetén a halmazban lévő különböző elemek száma.

### 3. Speciális halmazok
- **Üres halmaz ($\emptyset$ vagy $\{\}$):** Olyan halmaz, amelynek egyetlen eleme sincs ($\lvert \emptyset \rvert = 0$).
  - *Példa:* „A 10-nél nagyobb egyjegyű számok halmaza.”
- **Alaphalmaz ($U$ vagy $\Omega$):** A vizsgálatban szóba jövő összes elem halmaza.

### 4. Részhalmaz és Valódi részhalmaz
- **Részhalmaz ($A \subseteq B$):** $A$ része $B$-nek, ha $A$ **minden eleme** eleme $B$-nek is.
  - Minden halmaz részhalmaza önmagának: $A \subseteq A$.
  - Az üres halmaz **minden halmaznak részhalmaza**: $\emptyset \subseteq A$.
  - Ha egy halmaznak $n$ eleme van, akkor a részhalmazainak száma **$2^n$**.
- **Valódi részhalmaz ($A \subset B$):** $A \subseteq B$ és $A \neq B$ (tehát $B$-ben van olyan elem, ami nincs $A$-ban).

### 5. Egyenlő halmazok
- Két halmaz akkor egyenlő ($A = B$), ha pontosan ugyanazok az elemeik ($A \subseteq B$ és $B \subseteq A$).
- Az elemek sorrendje és többszöri felírása **nem számít**: $\{1, 2, 3\} = \{3, 1, 2\} = \{1, 2, 2, 3\}$.

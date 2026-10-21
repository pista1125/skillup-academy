# 5. Állítás és megfordítása

## Tananyag Áttekintés
A matematikai tételek és definíciók többsége feltételes kijelentés formájában fogalmazódik meg: "Ha ..., akkor ...". Ebben az alfejezetben megismerjük az implikációt, az állítások megfordítását, a szükséges és elégséges feltételeket, valamint a logikai ekvivalenciát.

---

## Fő Témakörök és Fogalmak

- **Feltételes állítás (implikáció):**
  - Jelölése: $A \Rightarrow B$ (olvasd: "Ha $A$, akkor $B$").
  - $A$: feltétel (előtag, premissza), $B$: következmény (utótag, konklúzió).
  - Igazságértéke: Csak akkor hamis, ha $A$ igaz és $B$ hamis (igaz feltételből nem következhet hamis eredmény). Minden más esetben igaz!

- **Állítás megfordítása:**
  - Az $A \Rightarrow B$ állítás megfordítása: $B \Rightarrow A$ ("Ha $B$, akkor $A$").
  - **FONTOS ALAPELV:** Egy igaz állítás megfordítása **NEM** feltétlenül igaz!
    - *Példa:* "Ha egy négyszög négyzet, akkor téglalap." (Igaz)
    - *Megfordítása:* "Ha egy négyszög téglalap, akkor négyzet." (Hamis!)

- **Szükséges és elégséges feltétel:**
  - Ha $A \Rightarrow B$:
    - $A$ **elégséges feltétele** $B$-nek (ha $A$ teljesül, abból már biztosan következik $B$).
    - $B$ **szükséges feltétele** $A$-nak (ha $B$ nem teljesül, $A$ sem teljesülhet).

- **Ekvivalencia (akkor és csak akkor):**
  - Jelölése: $A \Leftrightarrow B$.
  - Pontosan akkor igaz, ha $A \Rightarrow B$ és $B \Rightarrow A$ egyszerre teljesül (oda-vissza igaz).

- **Kontrapozíció elve:**
  - Az $A \Rightarrow B$ implikáció logikailag egyenértékű a $\neg B \Rightarrow \neg A$ állítással.
  - Gyakran alkalmazzuk indirekt bizonyítások során.

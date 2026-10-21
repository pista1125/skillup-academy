# 3. VAGY művelet, ÉS művelet

## Tananyag Áttekintés
Két vagy több egyszerű kijelentést kötőszavak (logikai műveletek) segítségével összetett állításokká kapcsolhatunk össze. Ebben a leckében a két legalapvetőbb műveletet: a konjunkciót (ÉS) és a diszjunkciót (VAGY) vizsgáljuk meg.

---

## Fő Témakörök és Fogalmak

- **Konjunkció (ÉS művelet):**
  - Jelölése: $A \wedge B$ (olvasd: "$A$ és $B$").
  - $A \wedge B$ pontosan akkor igaz, ha **mindkét** részállítás ($A$ is és $B$ is) igaz.
  - Ha legalább az egyik hamis, a konjunkció hamis.
  - Kapcsolat a halmazelmélettel: metszetképzés ($A \cap B$).

- **Diszjunkció (megengedő VAGY művelet):**
  - Jelölése: $A \vee B$ (olvasd: "$A$ vagy $B$").
  - $A \vee B$ pontosan akkor igaz, ha **legalább az egyik** részállítás igaz (tehát ha mindkettő igaz, akkor is igaz!).
  - Csak akkor hamis, ha mindkét állítás hamis.
  - Kapcsolat a halmazelmélettel: unióképzés ($A \cup B$).

- **A hétköznapi nyelv és a matematikai logika eltérései:**
  - A köznyelvben a "vagy" gyakran kizáró értelmű ("Teát kérsz vagy kávét?").
  - A matematikában az alapértelmezett a **megengedő vagy**.
  - A kizáró vagy (XOR) jelentése: "vagy az egyik, vagy a másik, de nem mindkettő".

- **Műveleti tulajdonságok:**
  - Kommutativitás (felcserélhetőség): $A \wedge B = B \wedge A$, $A \vee B = B \vee A$
  - Asszociativitás (csoportosíthatóság): $(A \wedge B) \wedge C = A \wedge (B \wedge C)$
  - Disztributivitás (széttagolhatóság): $A \wedge (B \vee C) = (A \wedge B) \vee (A \wedge C)$

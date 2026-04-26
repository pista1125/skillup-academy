export default {
  id: 'S-K-43',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Ki a tettes? — több állítás',
  difficulty: 6,
  scenario: `Négy diák — **András, Bea, Csongor, Dóri** — közül **pontosan egy** törte el a kémcsövet. Az alábbiakat állították, és tudjuk, hogy **pontosan ketten mondtak igazat**.

- András: „Csongor volt."
- Bea: „Nem én voltam."
- Csongor: „András hazudik."
- Dóri: „Bea volt."`,
  question: 'Ki törte el a kémcsövet?',
  options: ['András', 'Bea', 'Csongor', 'Dóri'],
  answer: 'Bea',
  keywords: ['logika', 'igaz-hamis', 'kizárásos'],
  solution: `**Vegyük észre:** András és Csongor állításai **ellentmondóak** → **pontosan egyikük** mondott igazat.

Mivel összesen két igaz állítás van, a másik igaz állítás **Bea** vagy **Dóri** volt.

**Próba — „Bea volt":**

- András ($\\Rightarrow$ Csongor volt) → HAMIS.
- Bea ($\\Rightarrow$ nem én voltam) → HAMIS.
- Csongor ($\\Rightarrow$ András hazudik) → **IGAZ**.
- Dóri ($\\Rightarrow$ Bea volt) → **IGAZ**.

**Pontosan 2 igaz ✓** → a tettes **Bea**.

**A helyes válasz: Bea.**`
};

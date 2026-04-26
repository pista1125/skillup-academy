export default {
  id: 'S-A-07',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Háromjegyű számok kirakása',
  difficulty: 4,
  scenario: 'Az $1, 2, 3, 4$ **számjegyekből** — ismétlés nélkül — **háromjegyű** számokat rakunk ki.',
  question: 'Hányféle háromjegyű szám rakható ki?',
  visual: {
    type: 'treeDiagram',
    root: '3 jegyű szám',
    levels: [
      {
        label: 'Százas',
        branches: ['1', '2', '3', '4']
      },
      {
        label: 'Tízes',
        branches: ['3 lehetőség']
      },
      {
        label: 'Egyes',
        branches: ['2 lehetőség']
      }
    ]
  },
  options: ['12', '16', '24', '64'],
  answer: '24',
  keywords: ['permutáció', 'kombinatorika', 'szorzási elv'],
  solution: `**Szorzási szabály (ismétlés nélkül):**

- 1. jegy: **4** lehetőség
- 2. jegy: **3** maradék
- 3. jegy: **2** maradék

$$4 \\cdot 3 \\cdot 2 = \\mathbf{24}$$

**A helyes válasz: 24 szám.**`
};

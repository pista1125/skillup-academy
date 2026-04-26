export default {
  id: 'S-T-08',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Fagylaltgombócok — egyszerű összeszámlálás',
  difficulty: 2,
  scenario: 'A fagylaltozóban **4 féle** gombóc közül választhatsz: csokoládé, vanília, eper és pisztácia. Egy gombócot veszel, és hozzá **2 féle** öntet közül egyet: csoki vagy málna.',
  question: 'Hányféle **különböző** fagylalt-öntet párosítás lehetséges?',
  visual: {
    type: 'treeDiagram',
    root: 'Fagylalt',
    levels: [
      {
        label: 'Gombóc',
        branches: ['csoki', 'vanília', 'eper', 'pisztácia']
      },
      {
        label: 'Öntet',
        branches: ['csoki-öntet', 'málna']
      }
    ]
  },
  options: ['4', '6', '8', '10'],
  answer: '8',
  keywords: ['szorzási elv', 'kombinatorika', 'fadiagram'],
  solution: `**Szorzási szabály:**

$$4 \\cdot 2 = \\mathbf{8}$$

A fa mindegyik 4 ágánál 2-2 alsó ág van, összesen **8 levél**.

**A helyes válasz: 8.**`
};

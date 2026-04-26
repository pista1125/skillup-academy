export default {
  id: 'H-A-03',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Mozaik mintázat',
  difficulty: 4,
  scenario: 'Egy mozaik minta a következőképpen épül fel: minden új sor 2 kockával több az előzőnél. Az 1. sor 1 kockából áll.',
  question: 'Hány kockából áll a **10. sor**?',
  visual: {
    type: 'tileRows',
    rows: [
      {
        count: 1,
        label: '1. sor'
      },
      {
        count: 3,
        label: '2. sor'
      },
      {
        count: 5,
        label: '3. sor'
      },
      {
        count: 7,
        label: '4. sor'
      }
    ]
  },
  options: ['17', '19', '20', '21'],
  answer: '19',
  keywords: ['sorozat', 'szabálykövetés'],
  solution: `**Szabály felírása:**

$a_n = 1 + 2(n-1) = 2n - 1$

- $a_1 = 1$
- $a_{10} = 2 \\cdot 10 - 1 = \\mathbf{19}$ kocka`
};

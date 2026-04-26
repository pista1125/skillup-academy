export default {
  id: 'H-A-04',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Telefondíj — hozzárendelési szabály',
  difficulty: 5,
  scenario: 'Egy telefontarifa: **2 500 Ft havi alapdíj**, emellett percenként **12 Ft** a beszélgetés ára.',
  question: 'Mennyibe kerül a **45 perc** beszélgetést tartalmazó havidíj?',
  visual: {
    type: 'formula',
    formula: 'havidíj = 2500 + 12 · p',
    variables: [
      {
        name: 'p',
        desc: 'percek száma'
      }
    ],
    example: {
      p: 45
    }
  },
  options: ['2 540 Ft', '3 040 Ft', '4 500 Ft', '4 540 Ft'],
  answer: '3 040 Ft',
  keywords: ['hozzárendelési szabály', 'behelyettesítés'],
  solution: `**Behelyettesítés:**

$\\text{havidíj} = 2500 + 12 \\cdot 45 = 2500 + 540 = \\mathbf{3040}$ Ft.`
};

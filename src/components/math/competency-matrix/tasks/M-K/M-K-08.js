export default {
  id: 'M-K-08',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Zsebpénz részei',
  difficulty: 5,
  scenario: 'Botond **6 000 Ft** zsebpénzt kapott. Az összeg $\\tfrac{1}{3}$-át **könyvre**, $\\tfrac{1}{4}$-ét **ajándékra**, a maradékot **megtakarítja**.',
  question: 'Hány forintot tesz félre megtakarításként?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Könyv (1/3)',
        count: '?',
        unit: 'Ft',
        color: '#dbeafe'
      },
      {
        label: 'Ajándék (1/4)',
        count: '?',
        unit: 'Ft',
        color: '#fde68a'
      },
      {
        label: 'Megtakarítás',
        count: '?',
        unit: 'Ft',
        color: '#dcfce7'
      }
    ]
  },
  answer: '2 500 Ft',
  keywords: ['tört', 'rész-egész', 'közös nevező'],
  solution: `**Közös nevezős összeg a költéshez:**

1. Könyv: $\\tfrac{1}{3}$ → $\\tfrac{4}{12}$.
2. Ajándék: $\\tfrac{1}{4}$ → $\\tfrac{3}{12}$.
3. Elköltött rész: $\\tfrac{4}{12} + \\tfrac{3}{12} = \\tfrac{7}{12}$.
4. Megtakarítás része: $1 - \\tfrac{7}{12} = \\tfrac{5}{12}$.
5. Összeg: $6000 \\cdot \\tfrac{5}{12} = 500 \\cdot 5 = \\mathbf{2500}$ Ft.`
};

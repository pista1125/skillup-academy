export default {
  id: 'M-T-12',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Közös osztó',
  difficulty: 2,
  scenario: 'Adott két szám: **18** és **24**.',
  question: 'Melyik szám **közös osztója** mindkét számnak?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: '18 osztói',
        count: '1,2,3,6,9,18',
        color: '#dbeafe'
      },
      {
        label: '24 osztói',
        count: '1,2,3,4,6,8,12,24',
        color: '#fef3c7'
      }
    ]
  },
  options: ['4', '6', '9', '12'],
  answer: '6',
  keywords: ['közös osztó', 'oszthatóság'],
  solution: `**Közös osztó keresése:**

- A $18$ osztói: $1,2,3,6,9,18$.
- A $24$ osztói: $1,2,3,4,6,8,12,24$.
- **Közös:** $1, 2, 3, \\mathbf{6}$.

A megadott válaszok közül a **6** közös osztó.`
};

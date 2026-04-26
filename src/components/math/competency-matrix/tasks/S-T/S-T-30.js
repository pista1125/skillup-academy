export default {
  id: 'S-T-30',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Mit reggelizel? — kördiagram',
  difficulty: 2,
  scenario: 'A 100 megkérdezett diák közül milyen arányban választottak reggelit.',
  question: 'Hányan ettek **müzlit**?',
  visual: {
    type: 'pieChart',
    slices: [
      { label: 'Kenyér (50%)', value: 50, color: '#a16207' },
      { label: 'Müzli (25%)', value: 25, color: '#f59e0b' },
      { label: 'Tojás (15%)', value: 15, color: '#fde68a' },
      { label: 'Semmit (10%)', value: 10, color: '#e2e8f0' }
    ]
  },
  options: ['10', '15', '25', '50'],
  answer: '25',
  keywords: ['kördiagram', 'százalék'],
  solution: `**Ha 100 fő volt összesen, akkor 25% = 25 fő.**

**A helyes válasz: 25.**`
};

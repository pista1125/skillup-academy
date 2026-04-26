export default {
  id: 'M-K-25',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Medence — vízszint változás',
  difficulty: 6,
  scenario: 'Egy medence térfogata **36 m³**. A feltöltő csap **9 L/perc**, a leeresztő csap **3 L/perc**. Mindkettő nyitva van.',
  question: 'Hány **óra** alatt telik meg a medence (üresből)?',
  visual: {
    type: 'pool',
    volumeM3: 36,
    flowLmin: 6,
    label: 'Nettó feltöltés: 6 L/perc'
  },
  options: ['50 óra', '75 óra', '100 óra', '120 óra'],
  answer: '100 óra',
  keywords: ['térfogat', 'arány', 'munkaidő'],
  solution: `Nettó: $9 - 3 = 6$ L/perc. $36$ m³ $= 36\\,000$ L.

Perc: $36000 / 6 = 6000$. Óra: $6000 / 60 = \\mathbf{100}$.`
};

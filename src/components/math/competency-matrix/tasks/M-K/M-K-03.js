export default {
  id: 'M-K-03',
  contentArea: 'M',
  contentSub: '1.4.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Évfordulós körtáncok',
  difficulty: 6,
  scenario: 'Egy faluban **három évfordulós ünnepséget** tartanak: az egyiket **3 évente**, a másikat **4 évente**, a harmadikat **6 évente**. Az ünnepek először **2024-ben** estek egybe.',
  question: 'Melyik évben találkoznak legközelebb mindhárman ugyanabban az évben?',
  visual: {
    type: 'timelineYears',
    start: 2024,
    end: 2040,
    series: [
      {
        label: 'A (3 év)',
        step: 3,
        color: '#2563eb'
      },
      {
        label: 'B (4 év)',
        step: 4,
        color: '#16a34a'
      },
      {
        label: 'C (6 év)',
        step: 6,
        color: '#ef4444'
      }
    ]
  },
  answer: '2036',
  keywords: ['legkisebb közös többszörös', 'ciklus'],
  solution: `**Legkisebb közös többszöröst keresünk:**

- $3 = 3$
- $4 = 2^2$
- $6 = 2 \\cdot 3$
- **lkkt(3, 4, 6) = $2^2 \\cdot 3 = 12$**

Tehát 12 évente találkoznak. Legközelebb: $2024 + 12 = \\mathbf{2036}$.`
};

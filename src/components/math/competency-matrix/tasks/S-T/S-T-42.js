export default {
  id: 'S-T-42',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Napi alvásidő',
  difficulty: 2,
  scenario: 'Egy héten át feljegyezték, Peti hány órát aludt egy-egy éjjel.',
  question: 'Melyik nap aludt a **legkevesebbet**?',
  visual: {
    type: 'barChart',
    xLabel: 'Nap',
    yLabel: 'Óra',
    yMin: 0,
    yMax: 12,
    bars: [
      {
        label: 'H',
        value: 9,
        color: '#2563eb'
      },
      {
        label: 'K',
        value: 8,
        color: '#2563eb'
      },
      {
        label: 'Sze',
        value: 6,
        color: '#ef4444'
      },
      {
        label: 'Cs',
        value: 9,
        color: '#2563eb'
      },
      {
        label: 'P',
        value: 7,
        color: '#f59e0b'
      },
      {
        label: 'Szo',
        value: 10,
        color: '#22c55e'
      },
      {
        label: 'V',
        value: 11,
        color: '#22c55e'
      }
    ]
  },
  options: ['Hétfő', 'Szerda', 'Péntek', 'Vasárnap'],
  answer: 'Szerda',
  keywords: ['oszlopdiagram', 'minimum'],
  solution: `**A legkisebb oszlop (6 óra) a szerdához tartozik.**

**A helyes válasz: Szerda.**`
};

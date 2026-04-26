export default {
  id: 'H-T-12',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Vonat menetrend',
  difficulty: 2,
  scenario: 'A táblázat egy vonat megállóhelyeit és érkezési időit mutatja.',
  question: 'Mennyi **ideig** tart az út **Budapest és Szeged** között?',
  visual: {
    type: 'table',
    caption: 'Menetrend',
    headers: ['Állomás', 'Érkezés'],
    rows: [
      ['Budapest', '08:10'],
      ['Kecskemét', '09:25'],
      ['Kiskunfélegyháza', '09:55'],
      ['Szeged', '10:40']
    ]
  },
  options: ['1 óra 30 perc', '2 óra', '2 óra 30 perc', '3 óra'],
  answer: '2 óra 30 perc',
  keywords: ['táblázat', 'idő', 'menetrend'],
  solution: `**Időszámítás:**

Budapestről 08:10-kor indul, Szegedre 10:40-kor érkezik.

$10{:}40 - 08{:}10 = \\mathbf{2}$ óra $\\mathbf{30}$ perc.`
};

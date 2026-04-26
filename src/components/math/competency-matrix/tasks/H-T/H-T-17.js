export default {
  id: 'H-T-17',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Gyűjtés — osztályalap',
  difficulty: 2,
  scenario: 'Az osztály gyűjtését hetente jegyezték fel. A diagram a befizetett összeget mutatja.',
  question: 'Melyik héten fizették be a **legtöbbet**?',
  visual: {
    type: 'barChart',
    xLabel: 'Hét',
    yLabel: 'Ft',
    bars: [
      { label: '1. hét', value: 1800 },
      { label: '2. hét', value: 2400 },
      { label: '3. hét', value: 3200 },
      { label: '4. hét', value: 2100 }
    ]
  },
  options: ['1. hét', '2. hét', '3. hét', '4. hét'],
  answer: '3. hét',
  keywords: ['oszlopdiagram', 'adatleolvasás'],
  solution: 'A legmagasabb oszlop a **3. hét** — 3200 Ft.'
};

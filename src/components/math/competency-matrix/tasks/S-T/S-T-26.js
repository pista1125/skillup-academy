export default {
  id: 'S-T-26',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kvízverseny — igaz állítás',
  difficulty: 2,
  scenario: 'Az osztálybeli kvízversenyen Anna $8$, Béla $12$, Cili $10$ és Dani $6$ pontot ért el.',
  question: 'Melyik állítás **IGAZ**?',
  options: ['Mindenki legalább 10 pontot kapott.', 'Béla érte el a legtöbb pontot.', 'Cili kevesebb pontot szerzett, mint Anna.', 'Dani többet ért el Bélánál.'],
  answer: 'Béla érte el a legtöbb pontot.',
  keywords: ['logika', 'igaz állítás', 'összehasonlítás'],
  solution: `Pontok rendezve: $6 < 8 < 10 < 12$ → **Béla** a maximum.

- „Mindenki $\\geq 10$" → HAMIS (Anna 8, Dani 6).
- „Béla a legtöbb" → **IGAZ** ($12$).
- „Cili < Anna" → HAMIS ($10 > 8$).
- „Dani > Béla" → HAMIS ($6 < 12$).

**A helyes válasz: Béla érte el a legtöbb pontot.**`
};

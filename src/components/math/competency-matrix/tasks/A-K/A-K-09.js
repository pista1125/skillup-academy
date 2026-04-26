export default {
  id: 'A-K-09',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Túraútvonal égtájak szerint',
  difficulty: 7,
  scenario: 'Egy turista a **(0; 0)** pontból indul. Először **3 egységet északra** megy, majd **4 egységet keletre**, utána **2 egységet délre**, végül **1 egységet nyugatra**.',
  question: 'Hol lesz végül, és milyen **irányban** van a kiindulóponthoz képest?',
  visual: {
    type: 'compass',
    center: 'Start',
    points: [
      {
        label: 'Cél',
        direction: 'NE'
      }
    ]
  },
  answer: '(3; 1); északkeletre',
  keywords: ['égtájak', 'koordináta', 'útvonal'],
  solution: `**Lépések:**

1. Start: $(0;\\ 0)$.
2. $+3$ északra: $(0;\\ 3)$.
3. $+4$ keletre: $(4;\\ 3)$.
4. $-2$ délre: $(4;\\ 1)$.
5. $-1$ nyugatra: $(\\mathbf{3;\\ 1})$.

**Irány:** $x > 0$ és $y > 0$ → a kiindulóponttól **északkeletre** található.`
};

export default {
  id: 'H-K-03',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Takarékoskodás',
  difficulty: 7,
  scenario: 'Panni januárban **500 Ft**-tal kezdi gyűjteni a zsebpénzét, és **minden hónapban 200 Ft-tal többet** rak félre, mint az előzőben.',
  question: 'Mennyi pénz lesz összesen a malacperselyben **december végén** (12 hónap)?',
  visual: {
    type: 'table',
    caption: 'Havi befizetések',
    headers: ['Hónap', '1', '2', '3', '4', '...', '12'],
    rows: [
      ['Összeg (Ft)', '500', '700', '900', '1100', '...', '?']
    ]
  },
  options: ['9 600 Ft', '15 600 Ft', '19 200 Ft', '25 800 Ft'],
  answer: '19 200 Ft',
  keywords: ['számtani sorozat', 'összeg'],
  solution: `**Számtani sorozat összege:**

Első tag: $a_1 = 500$. Különbség: $d = 200$.

12. tag: $a_{12} = 500 + 11 \\cdot 200 = 500 + 2200 = 2700$ Ft.

**Összeg:** $S_{12} = \\dfrac{(a_1 + a_{12}) \\cdot 12}{2} = \\dfrac{(500+2700)\\cdot 12}{2} = \\dfrac{3200 \\cdot 12}{2} = \\mathbf{19\\,200}$ Ft.`
};

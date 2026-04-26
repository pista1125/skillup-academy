export default {
  id: 'H-K-08',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Színházlátogatók',
  difficulty: 6,
  scenario: 'Egy színház az első napon **80 nézőt** fogadott. Minden nap **15 nézővel többet**, mint az előző napon.',
  question: 'Hány nézőt fogadtak összesen az **első 10 nap** alatt?',
  visual: {
    type: 'table',
    caption: 'Napi látogatószám',
    headers: ['Nap', '1.', '2.', '3.', '...', '10.'],
    rows: [
      ['Nézők', '80', '95', '110', '...', '?']
    ]
  },
  options: ['1 400', '1 475', '1 550', '1 625'],
  answer: '1 475',
  keywords: ['számtani sorozat', 'összeg'],
  solution: `**Számtani sorozat:**

$a_1 = 80, d = 15$.

$a_{10} = 80 + 9 \\cdot 15 = 80 + 135 = 215$.

**Összeg:** $S_{10} = \\dfrac{(a_1 + a_{10}) \\cdot 10}{2} = \\dfrac{(80 + 215) \\cdot 10}{2} = \\dfrac{295 \\cdot 10}{2} = \\mathbf{1\\,475}$.`
};

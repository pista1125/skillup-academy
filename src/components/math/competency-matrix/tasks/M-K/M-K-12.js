export default {
  id: 'M-K-12',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Webshop — házhozszállítás',
  difficulty: 6,
  scenario: 'Egy webshopban **3 termék ára** 3200, 4800 és 6400 Ft. A szállítás **1200 Ft**, de **15 000 Ft felett ingyenes**.',
  question: 'Mennyit kell **összesen fizetni**?',
  visual: {
    type: 'table',
    caption: 'Kosár',
    headers: ['Termék', 'Ár'],
    rows: [
      ['Termék 1', '3200 Ft'],
      ['Termék 2', '4800 Ft'],
      ['Termék 3', '6400 Ft'],
      ['Szállítás', '? Ft']
    ]
  },
  options: ['13 200 Ft', '14 400 Ft', '15 600 Ft', '15 000 Ft'],
  answer: '15 600 Ft',
  keywords: ['összeg', 'feltétel', 'webshop'],
  solution: `Termékek: $3200 + 4800 + 6400 = 14\\,400$ Ft.

$14400 < 15000$, így kell szállítás: $+ 1200 = \\mathbf{15\\,600}$ Ft.`
};

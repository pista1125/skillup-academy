export default {
  id: 'M-K-36',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kert — kerítés és kapu',
  difficulty: 6,
  scenario: 'Egy téglalap alakú kertet **18 m × 12 m** méretűre kell bekeríteni. A kerítés ára **2800 Ft/m**, egy **3 m széles kapu** ára fixen **45 000 Ft** (a kaput a kerítés helyett építik be).',
  question: 'Mennyibe kerül a **teljes kerítés + kapu**?',
  visual: {
    type: 'rectangle',
    widthM: 18,
    heightM: 12,
    label: 'Kert (kapu 3 m)',
    unit: 'm'
  },
  options: ['168 000 Ft', '180 600 Ft', '204 600 Ft', '213 000 Ft'],
  answer: '204 600 Ft',
  keywords: ['kerület', 'költség', 'kert'],
  solution: `Kerület: $2 \\cdot (18+12) = 60$ m.

Kerítéshossz (kapu nélkül): $60 - 3 = 57$ m.

Kerítés ára: $57 \\cdot 2800 = 159\\,600$ Ft.

Kapu: $45\\,000$ Ft.

Összesen: $159\\,600 + 45\\,000 = \\mathbf{204\\,600}$ Ft.`
};

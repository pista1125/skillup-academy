export default {
  id: 'M-A-08',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'L-alakú kert',
  difficulty: 5,
  scenario: 'A kertész egy **L-alakú** virágágyást szeretne kialakítani az ábra szerinti méretekkel.',
  question: 'Mekkora a virágágyás területe?',
  visual: {
    type: 'polygonL',
    outer: {
      w: 8,
      h: 6
    },
    cut: {
      w: 3,
      h: 3
    },
    unit: 'm'
  },
  options: ['30 m²', '39 m²', '42 m²', '48 m²'],
  answer: '39 m²',
  keywords: ['terület', 'összetett alakzat'],
  solution: `**Terület számítása kivágással:**

1. A **befoglaló téglalap** területe: $8 \\cdot 6 = 48$ m².
2. A **kivágott** rész területe: $3 \\cdot 3 = 9$ m².
3. L-alak területe: $48 - 9 = \\mathbf{39}$ m².`
};

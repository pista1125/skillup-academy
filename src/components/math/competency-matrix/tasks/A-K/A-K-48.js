export default {
  id: 'A-K-48',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Ajándékcsomag — selyemszalag',
  difficulty: 7,
  scenario: `Egy kocka alakú ajándékdoboz éle **12 cm**. Körbekötjük selyemszalaggal:

- a szalag **mindkét lapközéppárt** körbefogja (vízszintes és függőleges síkban),
- a tetején egy **20 cm hosszú** masni készül.`,
  question: 'Hány cm szalag kell összesen?',
  visual: {
    type: 'box3d',
    box: { l: 12, w: 12, h: 12 },
    cubeEdge: 12,
    unit: 'cm'
  },
  options: ['68 cm', '96 cm', '116 cm', '140 cm'],
  answer: '116 cm',
  keywords: ['kerület', 'kocka', 'összetett'],
  solution: `**Egy kör** a kocka körül: $4 \\cdot 12 = 48$ cm.

**Két egymásra merőleges kör:** $2 \\cdot 48 = 96$ cm.

**Masni:** $+20$ cm.

**Összesen:** $96 + 20 = \\mathbf{116}$ cm.`
};

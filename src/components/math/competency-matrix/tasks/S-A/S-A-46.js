export default {
  id: 'S-A-46',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Napi rekordhőmérséklet — módusz',
  difficulty: 4,
  scenario: 'Egy héten át feljegyezték a napi maximum-hőmérsékleteket Celsius-fokban: $24, 27, 24, 26, 28, 24, 27$.',
  question: 'Mennyi a hőmérsékletek **módusza**?',
  options: ['24 °C', '26 °C', '27 °C', '28 °C'],
  answer: '24 °C',
  keywords: ['módusz', 'gyakoriság'],
  solution: `**Gyakoriságok:**

- $24$ → **3-szor** (a legtöbbször!)
- $26$ → 1-szer
- $27$ → 2-szer
- $28$ → 1-szer

A **módusz** a leggyakrabban előforduló érték: $\\mathbf{24}$ °C.

**A helyes válasz: 24 °C.**`
};

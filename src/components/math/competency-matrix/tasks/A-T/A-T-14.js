export default {
  id: 'A-T-14',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Óramutatók szöge',
  difficulty: 2,
  scenario: 'Egy analóg óra **3 órát** mutat.',
  question: 'Mekkora szöget zár be a kis- és a nagymutató?',
  visual: {
    type: 'clockPair',
    hour: 3,
    minute: 0
  },
  options: ['30°', '60°', '90°', '180°'],
  answer: '90°',
  keywords: ['szög', 'óra', 'derékszög'],
  solution: `A teljes kör **360°**, és az óralap **12 egyenlő részre** van osztva.

Egy óraosztás: $360° / 12 = 30°$.

3 óránál a mutatók **3 osztásnyira** vannak egymástól: $3 \\cdot 30° = \\mathbf{90°}$. Ez egy **derékszög**.`
};

export default {
  id: 'S-A-02',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Medián és terjedelem',
  difficulty: 5,
  scenario: 'Hét barát megmérte a magasságát (cm-ben). Az értékek növekvő sorrendben láthatók a táblázatban.',
  question: 'Mennyi a **medián** és a **terjedelem**?',
  visual: {
    type: 'table',
    caption: 'Magasságok (cm), növekvő sorrend',
    headers: ['Sorszám', '1.', '2.', '3.', '4.', '5.', '6.', '7.'],
    rows: [
      ['Magasság', '142', '146', '148', '150', '153', '156', '162']
    ]
  },
  options: ['medián = 148, terjedelem = 14', 'medián = 150, terjedelem = 20', 'medián = 150, terjedelem = 14', 'medián = 153, terjedelem = 20'],
  answer: 'medián = 150, terjedelem = 20',
  keywords: ['medián', 'terjedelem', 'rendezett minta'],
  solution: `**Medián (középső érték):**

7 elem rendezett sorában a középső a **4. elem**, azaz **150 cm**.

**Terjedelem:**

$$R = x_{\\max} - x_{\\min} = 162 - 142 = \\mathbf{20}$$

**A helyes válasz: medián = 150, terjedelem = 20.**`
};

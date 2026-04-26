export default {
  id: 'S-A-10',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Születésnapi torta — módusz és terjedelem',
  difficulty: 4,
  scenario: 'Egy születésnapi zsúron 10 gyereket kérdeztek meg, hány szelet tortát ettek. A válaszokat a pontdiagram mutatja.',
  question: 'Mennyi a **módusz** és a **terjedelem**?',
  visual: {
    type: 'dotPlot',
    xLabel: 'Szeletek száma',
    xMin: 0,
    xMax: 5,
    dots: [
      {
        x: 0,
        count: 1
      },
      {
        x: 1,
        count: 2
      },
      {
        x: 2,
        count: 4
      },
      {
        x: 3,
        count: 2
      },
      {
        x: 5,
        count: 1
      }
    ]
  },
  options: ['módusz = 2, terjedelem = 5', 'módusz = 2, terjedelem = 4', 'módusz = 3, terjedelem = 5', 'módusz = 4, terjedelem = 5'],
  answer: 'módusz = 2, terjedelem = 5',
  keywords: ['módusz', 'terjedelem', 'pontdiagram'],
  solution: `**Módusz (leggyakoribb érték):**

A **2** szelethez **4** pont tartozik, ez a legtöbb → módusz = **2**.

**Terjedelem:**

$$R = x_{\\max} - x_{\\min} = 5 - 0 = \\mathbf{5}$$

**A helyes válasz: módusz = 2, terjedelem = 5.**`
};

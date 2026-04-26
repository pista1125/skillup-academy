export default {
  id: 'S-T-38',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Menüválasztás',
  difficulty: 2,
  scenario: 'Az étteremben **3 féle** előétel, **4 féle** főétel és **2 féle** desszert közül választhatsz.',
  question: 'Hány különböző teljes menü állítható össze?',
  options: ['9', '14', '20', '24'],
  answer: '24',
  keywords: ['kombinatorika', 'szorzási elv'],
  solution: `**Szorzási elv:**

$$3 \\cdot 4 \\cdot 2 = \\mathbf{24}$$

**A helyes válasz: 24.**`
};

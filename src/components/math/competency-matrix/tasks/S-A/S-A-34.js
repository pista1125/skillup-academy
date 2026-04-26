export default {
  id: 'S-A-34',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Menüválasztás — fesztiválon',
  difficulty: 4,
  scenario: 'Egy fesztiválon **3 féle** szendvics, **4 féle** saláta és **2 féle** italcsomag közül választhatsz. Egy menü **1 szendvicsből, 1 salátából és 1 italból** áll.',
  question: 'Hány **különböző menü** állítható össze?',
  options: ['9', '14', '20', '24'],
  answer: '24',
  keywords: ['kombinatorika', 'szorzási elv'],
  solution: `**Szorzási elv:**

$$3 \\cdot 4 \\cdot 2 = \\mathbf{24}$$

**A helyes válasz: 24.**`
};

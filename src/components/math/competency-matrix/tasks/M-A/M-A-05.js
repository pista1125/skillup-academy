export default {
  id: 'M-A-05',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Zsákok pakolása',
  difficulty: 5,
  scenario: 'Egy raktárban **36 kg cukrot** és **48 kg lisztet** kell azonos méretű zsákokba tenni úgy, hogy **egy zsákban csak egyféle** legyen, és **minden zsák ugyanannyi kg**-ot tartalmazzon.',
  question: 'Legfeljebb hány kg lehet egy zsákban?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Cukor',
        count: 36,
        unit: 'kg',
        color: '#e0e7ff'
      },
      {
        label: 'Liszt',
        count: 48,
        unit: 'kg',
        color: '#fde68a'
      }
    ]
  },
  options: ['4 kg', '6 kg', '12 kg', '24 kg'],
  answer: '12 kg',
  keywords: ['legnagyobb közös osztó'],
  solution: `**Legnagyobb közös osztót keresünk:**

- $36 = 2^2 \\cdot 3^2$
- $48 = 2^4 \\cdot 3$
- **lnko(36, 48) = $2^2 \\cdot 3 = 12$**

Tehát 36-ot $36/12=3$, 48-at $48/12=4$ zsákra lehet felosztani.

**A helyes válasz: 12 kg.**`
};

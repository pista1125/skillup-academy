export default {
  id: 'M-K-24',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Születésnap — meghívók',
  difficulty: 6,
  scenario: 'Lacika **30 meghívót** ír a születésnapra. A fiúknak **3 meghívón több** lesz, mint a lányoknak. Egyenlő mennyiségű fiú és lány érkezik családtagonként (minden vendég egyedül jön).',
  question: 'Hány **fiút** hívott meg Lacika?',
  visual: {
    type: 'formula',
    formula: 'f + l = 30, f = l + 3',
    variables: [
      { name: 'f', desc: 'fiúk száma' },
      { name: 'l', desc: 'lányok száma' }
    ]
  },
  options: ['13,5', '15', '16', '16,5'],
  answer: '16,5',
  keywords: ['egyenletrendszer', 'születésnap'],
  solution: `$f + l = 30$ és $f = l + 3$.

$(l+3) + l = 30 \\Rightarrow 2l = 27 \\Rightarrow l = 13{,}5$.

$f = 13{,}5 + 3 = \\mathbf{16{,}5}$.

*Megjegyzés: nem egész megoldás mutatja, hogy a feltétel csak elméleti.*`
};

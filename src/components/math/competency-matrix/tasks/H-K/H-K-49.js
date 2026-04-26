export default {
  id: 'H-K-49',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Gyűjtés — páratlan számok',
  difficulty: 6,
  scenario: 'Egy zsebmalac az **1. napon 1 Ft-ot**, a **2. napon 3 Ft-ot**, az **n-edik napon (2n−1) Ft-ot** kap. **15 napig** gyűjt.',
  question: 'Mennyi pénz lesz benne összesen?',
  visual: {
    type: 'sequence',
    elements: ['1', '3', '5', '...', '29']
  },
  options: ['210', '215', '225', '230'],
  answer: '225',
  keywords: ['sorozat', 'négyzetszám'],
  solution: 'Az első $n$ páratlan szám összege $n^2$: $15^2 = \\mathbf{225}$ Ft.'
};

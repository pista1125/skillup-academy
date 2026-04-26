export default {
  id: 'M-K-39',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Keverési feladat — gyümölcslé',
  difficulty: 7,
  scenario: 'Egy **6 L**-es kancsóban **narancslé 30%-os koncentrációjú** (víz + narancs). Hozzáöntünk **4 L tiszta narancslevet**.',
  question: 'Mennyi lesz az új keverék **narancskoncentrációja**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Eredeti narancs', formula: '6 × 0.30', result: '1.8 L' },
      { label: 'Hozzáadott', formula: '4 L', result: '4.0 L' },
      { label: 'Összes térfogat', formula: '6 + 4', result: '10 L' }
    ]
  },
  options: ['38%', '50%', '58%', '70%'],
  answer: '58%',
  keywords: ['keverés', 'arány', 'százalék'],
  solution: `Eredeti narancs: $6 \\cdot 0{,}3 = 1{,}8$ L.

Új narancs összesen: $1{,}8 + 4 = 5{,}8$ L, teljes: $10$ L.

$5{,}8 / 10 = \\mathbf{58\\%}$.`
};

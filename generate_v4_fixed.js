const fs = require('fs');
const path = require('path');

const MAP_HTML = `
  <rect x="70" y="160" width="660" height="400" fill="white" stroke="#a1a1aa" stroke-width="2" />
  
  <path d="M 70 420 L 210 470 L 310 470 L 430 380 L 490 330 L 580 260" stroke="#94a3b8" stroke-width="8" fill="none" stroke-linejoin="round" />
  <path d="M 580 260 L 630 220 L 730 210" stroke="#94a3b8" stroke-width="8" fill="none" stroke-linejoin="round" />
  <path d="M 580 260 L 650 265 L 730 255" stroke="#94a3b8" stroke-width="8" fill="none" stroke-linejoin="round" />
  <path d="M 590 480 L 630 510 L 730 540" stroke="#94a3b8" stroke-width="8" fill="none" stroke-linejoin="round" />
  <path d="M 480 490 L 590 480" stroke="#94a3b8" stroke-width="8" fill="none" stroke-linejoin="round" />

  <path d="M 210 470 L 210 500 L 240 560" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 210 470 L 180 490 L 140 560" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 310 470 L 320 560" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 310 470 L 270 280 L 170 160" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 430 380 L 420 300 L 460 160" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 430 380 L 480 490" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 480 490 L 470 530 L 510 560" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 590 480 L 590 400 L 550 350 L 580 260" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />
  <path d="M 590 480 L 650 350 L 730 420" stroke="#cbd5e1" stroke-width="4" fill="none" stroke-linejoin="round" />

  <circle cx="210" cy="470" r="10" fill="#94a3b8" />
  <text x="210" y="450" font-family="Arial" font-size="20" font-weight="bold" fill="#64748b" text-anchor="middle">Erdőhát</text>

  <circle cx="310" cy="470" r="8" fill="#94a3b8" />
  <text x="310" y="450" font-family="Arial" font-size="16" fill="#64748b" text-anchor="middle">Majorpuszta</text>

  <circle cx="430" cy="380" r="8" fill="#94a3b8" />
  <text x="450" y="370" font-family="Arial" font-size="16" fill="#64748b" text-anchor="start">Zöldhát</text>

  <circle cx="580" cy="260" r="12" fill="#94a3b8" />
  <text x="540" y="245" font-family="Arial" font-size="22" font-weight="bold" fill="#64748b" text-anchor="middle">Zedújfalú</text>

  <circle cx="480" cy="490" r="8" fill="#94a3b8" />
  <text x="480" y="515" font-family="Arial" font-size="16" fill="#64748b" text-anchor="middle">Halászfalva</text>

  <circle cx="590" cy="480" r="8" fill="#94a3b8" />
  <text x="590" y="505" font-family="Arial" font-size="16" fill="#64748b" text-anchor="middle">Vártornya</text>
`;

function getSignXML(signs) {
  let textElements = '';
  let startY = signs.length === 1 ? 75 : (signs.length === 2 ? 55 : 35);
  
  signs.forEach((sign, idx) => {
    let textY = startY + idx * 40;
    
    if (sign.dir === 'left') {
      textElements += \`<path d="M 210 \${textY - 5} L 180 \${textY - 5} L 180 \${textY - 15} L 150 \${textY + 5} L 180 \${textY + 25} L 180 \${textY + 15} L 210 \${textY + 15} Z" fill="white" />\`;
      textElements += \`<text x="230" y="\${textY + 15}" fill="white" font-family="Arial" font-size="28" font-weight="bold" text-anchor="start">\${sign.text}</text>\`;
    } else if (sign.dir === 'right') {
      textElements += \`<text x="410" y="\${textY + 15}" fill="white" font-family="Arial" font-size="28" font-weight="bold" text-anchor="end">\${sign.text}</text>\`;
      textElements += \`<path d="M 430 \${textY - 5} L 460 \${textY - 5} L 460 \${textY - 15} L 490 \${textY + 5} L 460 \${textY + 25} L 460 \${textY + 15} L 430 \${textY + 15} Z" fill="white" />\`;
    } else if (sign.dir === 'straight') {
      textElements += \`<path d="M 310 \${textY + 15} L 310 \${textY - 5} L 300 \${textY - 5} L 320 \${textY - 25} L 340 \${textY - 5} L 330 \${textY - 5} L 330 \${textY + 15} Z" fill="white" />\`;
      textElements += \`<text x="360" y="\${textY + 15}" fill="white" font-family="Arial" font-size="28" font-weight="bold" text-anchor="start">\${sign.text}</text>\`;
    }
  });

  return \`
  <g transform="translate(80, 20)">
    <rect width="640" height="130" rx="10" fill="#71717a" stroke="white" stroke-width="4" />
    <rect width="630" height="120" x="5" y="5" rx="6" fill="#71717a" stroke="white" stroke-width="2" />
    \${textElements}
  </g>
  \`;
}

function getArrowXML(id, x, y, rot) {
  return \`
  <g transform="translate(\${x}, \${y}) rotate(\${rot})">
    <rect x="-15" y="-10" width="30" height="20" fill="black" />
    <path d="M 15 -14 L 30 0 L 15 14 Z" fill="black" />
    <text x="0" y="45" font-family="Arial" font-size="28" font-weight="bold" fill="black" transform="rotate(\${-rot})">\${id}</text>
  </g>
  \`;
}

const baseTasks = [
  { signs: [{ text: 'Zedújfalú', dir: 'left' }, { text: 'Majorpuszta', dir: 'right' }], pos: [{ x: 520, y: 485, rot: 180 }, { x: 425, y: 280, rot: 100, isCorrect: true }, { x: 380, y: 417, rot: -36 }, { x: 315, y: 520, rot: -90 }] },
  { signs: [{ text: 'Halászfalva', dir: 'straight' }, { text: 'Vártornya', dir: 'left' }], pos: [{ x: 450, y: 425, rot: 65, isCorrect: true }, { x: 540, y: 485, rot: 180 }, { x: 260, y: 470, rot: 0 }, { x: 610, y: 230, rot: -20 }] },
  { signs: [{ text: 'Erdőhát', dir: 'left' }, { text: 'Zöldhát', dir: 'right' }], pos: [{ x: 315, y: 510, rot: -90, isCorrect: true }, { x: 380, y: 417, rot: 144 }, { x: 260, y: 470, rot: 0 }, { x: 400, y: 340, rot: 60 }] },
  { signs: [{ text: 'Zedújfalú', dir: 'left' }, { text: 'Majorpuszta', dir: 'right' }, { text: 'Halászfalva', dir: 'straight'}], pos: [{ x: 425, y: 310, rot: 90, isCorrect: true }, { x: 380, y: 417, rot: -36 }, { x: 450, y: 440, rot: -115 }, { x: 530, y: 295, rot: 145 }] },
  { signs: [{ text: 'Vártornya', dir: 'straight' }, { text: 'Zedújfalú', dir: 'left' }], pos: [{ x: 530, y: 485, rot: -5, isCorrect: true }, { x: 615, y: 515, rot: -130 }, { x: 565, y: 375, rot: 90 }, { x: 450, y: 425, rot: 65 }] },
  { signs: [{ text: 'Vártornya', dir: 'right' }, { text: 'Zöldhát', dir: 'left' }], pos: [{ x: 485, y: 530, rot: -90, isCorrect: true }, { x: 540, y: 485, rot: 180 }, { x: 450, y: 425, rot: 65 }, { x: 580, y: 400, rot: 90 }] },
  { signs: [{ text: 'Zedújfalú', dir: 'straight' }, { text: 'Halászfalva', dir: 'right' }], pos: [{ x: 380, y: 417, rot: -36, isCorrect: true }, { x: 425, y: 310, rot: 90 }, { x: 450, y: 440, rot: -115 }, { x: 315, y: 510, rot: -90 }] },
  { signs: [{ text: 'Majorpuszta', dir: 'straight' }, { text: 'Halászfalva', dir: 'left' }], pos: [{ x: 510, y: 310, rot: 145, isCorrect: true }, { x: 380, y: 417, rot: -36 }, { x: 530, y: 485, rot: -5 }, { x: 425, y: 280, rot: 100 }] },
  { signs: [{ text: 'Erdőhát', dir: 'straight' }], pos: [{ x: 380, y: 417, rot: 144, isCorrect: true }, { x: 260, y: 470, rot: 0 }, { x: 315, y: 510, rot: -90 }, { x: 450, y: 425, rot: 65 }] },
  { signs: [{ text: 'Zedújfalú', dir: 'right' }, { text: 'Halászfalva', dir: 'left' }], pos: [{ x: 615, y: 515, rot: -130, isCorrect: true }, { x: 565, y: 375, rot: 90 }, { x: 530, y: 485, rot: -5 }, { x: 510, y: 310, rot: 145 }] }
];

const targetDir = path.join(__dirname, 'public', 'assets', 'competency', 'probameres-10');
if (!fs.existsSync(targetDir)) { fs.mkdirSync(targetDir, { recursive: true }); }

let competencyTasksData = [];

baseTasks.forEach((task, idx) => {
  // Shuffle positions to randomize which letter is correct
  let shuffledPos = [...task.pos].sort(() => Math.random() - 0.5);
  let correctIndex = shuffledPos.findIndex(p => p.isCorrect);
  let letters = ['A', 'B', 'C', 'D'];
  
  let arrows = shuffledPos.map((p, i) => ({ id: letters[i], x: p.x, y: p.y, rot: p.rot }));

  const svgContent = \`<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
\${getSignXML(task.signs)}
\${MAP_HTML}
\${arrows.map(a => getArrowXML(a.id, a.x, a.y, a.rot)).join('\\n')}
</svg>\`;

  fs.writeFileSync(path.join(targetDir, \`probameres_10_orient_\${idx + 1}.svg\`), svgContent);

  competencyTasksData.push({
    id: \`p10-\${idx + 1}\`,
    type: 'multiple-choice',
    context: \`Melyik betűvel jelzett nyíl mutatja a térképen, hogy hol vannak épp Csanádék, ha a nyilak az autók haladási irányát mutatják?\`,
    question: 'Jelöld meg a helyes válasz betűjelét!',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: correctIndex,
    points: 1,
    image: \`/assets/competency/probameres-10/probameres_10_orient_\${idx + 1}.svg\`
  });
});

console.log(JSON.stringify(competencyTasksData, null, 2));

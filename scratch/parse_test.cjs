const fs = require('fs');
const path = require('path');

const subtopics = [
  { folder: 'tablazatok', name: '1. Táblázatok' },
  { folder: 'diagramok', name: '2. Diagramok' },
  { folder: 'valtozasok-abrazolasa', name: '3. Változások ábrázolása' },
  { folder: 'grafikonok-a-mindennapokban', name: '4. Grafikonok a mindennapokban' },
  { folder: 'a-fuggveny-fogalma', name: '5. A függvény fogalma' },
  { folder: 'keszitsunk-grafikont', name: '6. Készítsünk grafikont!' },
  { folder: 'az-egyenes-es-forditott-aranyossag-fuggvenye', name: '7. Egyenes és fordított arányosság' },
  { folder: 'linearis-fuggvenyek', name: '8. Lineáris függvények' },
  { folder: 'egyenesek-meredeksege', name: '9. Egyenesek meredeksége' },
  { folder: 'abszoluterteek-fuggveny', name: '10. Abszolútérték-függvény' },
  { folder: 'fuggvenyek-jellemzese', name: '11. Függvények jellemzése' },
  { folder: 'szelsoertekek', name: '12. Szélsőértékek' },
  { folder: 'masodfoku-es-negyzetgyok-fuggveny', name: '13. Másodfokú és négyzetgyök-függvény' },
  { folder: 'gyakorlati-feladatok', name: '14. Gyakorlati feladatok & modellezés' },
  { folder: 'egyenletek-grafikus-megoldasa', name: '15. Egyenletek grafikus megoldása' },
  { folder: 'egyenlotlensegek', name: '16. Egyenlőtlenségek grafikus megoldása' },
  { folder: 'abszolut-ertekes-egyenletek', name: '17. Abszolútértékes egyenletek' }
];

const dir = path.join('src', 'components', 'math', 'grade-9', 'fuggvenyek');

// Simple regex or AST parser to extract questions from each level
function parseQuizQuestions(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Match levels: 1: { ... questions: [ ... ] }, 2: { ... }, 3: { ... }
  // We can find questions by finding { id: '...', ... } blocks
  const questionsByLevel = { 1: [], 2: [], 3: [] };
  
  // Split into level sections
  const level1Idx = content.indexOf('1: {');
  const level2Idx = content.indexOf('2: {', level1Idx + 1);
  const level3Idx = content.indexOf('3: {', level2Idx + 1);
  const endIdx = content.indexOf('export const', level3Idx + 1);

  const sections = [
    { level: 1, text: content.slice(level1Idx, level2Idx) },
    { level: 2, text: content.slice(level2Idx, level3Idx) },
    { level: 3, text: content.slice(level3Idx, endIdx > 0 ? endIdx : undefined) }
  ];

  for (const sec of sections) {
    // Find all question blocks inside questions: [ ... ]
    const qMatches = sec.text.match(/\{\s*id:\s*['"][^'"]+['"][\s\S]*?explanation:\s*['"][\s\S]*?['"]\s*\}/g);
    if (qMatches) {
      for (const qRaw of qMatches) {
        // Strip any figure: <... />
        const cleanRaw = qRaw.replace(/figure:\s*<[^>]+>,?\s*/g, '');
        try {
          // evaluate as JS object
          const fn = new Function(`return (${cleanRaw});`);
          const qObj = fn();
          questionsByLevel[sec.level].push(qObj);
        } catch (e) {
          // if eval fails, let's log
          // console.log("Eval error in " + filePath + ": " + e.message);
        }
      }
    }
  }

  return questionsByLevel;
}

let totalParsed = 0;
for (const st of subtopics) {
  const p = path.join(dir, st.folder);
  const qFile = fs.readdirSync(p).find(f => f.endsWith('Quiz.tsx'));
  const fullPath = path.join(p, qFile);
  const qByL = parseQuizQuestions(fullPath);
  const count = qByL[1].length + qByL[2].length + qByL[3].length;
  totalParsed += count;
  console.log(`${st.name.padEnd(40)} -> L1: ${qByL[1].length}, L2: ${qByL[2].length}, L3: ${qByL[3].length} (Total: ${count})`);
}

console.log(`Total parsed questions across all 17 subtopics: ${totalParsed}`);


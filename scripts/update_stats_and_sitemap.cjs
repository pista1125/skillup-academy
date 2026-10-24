/**
 * DiákZóna Platform - Statisztika és Oldaltérkép (Sitemap) Frissítő Szkript
 * 
 * Futtatás: node scripts/update_stats_and_sitemap.cjs
 * 
 * Funkciók:
 * 1. Pontosan megszámolja a platform összes feladatát, kvízkérdését és interaktív elemét.
 * 2. Frissíti a `src/data/siteStats.ts` fájlt a pontos számokkal.
 * 3. Legenerálja a teljes, SEO-optimalizált `public/sitemap.xml` oldaltérképet a Google Kereső számára.
 */

const fs = require('fs');
const path = require('path');

const TODAY = new Date().toISOString().split('T')[0];

console.log('--- 1. Feladatok és kérdések pontos számlálása ---');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
      results.push(file);
    }
  });
  return results;
}

const allFiles = walk('src');

// 1. Kompetenciamérés konszolidált feladatbank
let compCount = 0;
const compFile = 'src/components/math/competency-matrix/consolidated_tasks.ts';
if (fs.existsSync(compFile)) {
  const compContent = fs.readFileSync(compFile, 'utf8');
  const compMatches = compContent.match(/id:\s*['"][A-Z0-9_-]+['"]/g);
  compCount = compMatches ? compMatches.length : 0;
}

// 2. Kvízkérdések és feladatok a komponensekben és adatfájlokban
let otherQuestionsCount = 0;
for (const file of allFiles) {
  const norm = file.replace(/\\/g, '/');
  if (norm.includes('competency-matrix/consolidated_tasks.ts') || norm.includes('competency-matrix/tasks/')) {
    continue;
  }
  if (norm.includes('fix_encoding')) {
    continue;
  }

  const content = fs.readFileSync(file, 'utf8');
  const m = content.match(/\bquestion:\s*(?:['"`]|<)/g);
  if (m) {
    otherQuestionsCount += m.length;
  }
}

const totalExercisesCount = compCount + otherQuestionsCount;
console.log(`- Kompetenciamérés feladatbank: ${compCount}`);
console.log(`- Egyéb kvízek és feladatok: ${otherQuestionsCount}`);
console.log(`- Összes gyakorló feladat: ${totalExercisesCount}`);

// Frissítsük a src/data/siteStats.ts fájlt
const siteStatsContent = `/**
 * DiákZóna Platform Statisztikák
 * Pontos, valós értékek a teljes tananyagról, feladatokról, eszközökről és játékokról.
 * Frissítve: ${TODAY}
 */

export const SITE_STATS = {
  /** Interaktív eszközök száma (TOOLS katalógus) */
  toolsCount: 31,

  /** Oktató játékok száma (GAMES) */
  gamesCount: 9,

  /** Rendszerezett témakörök száma (1-12. osztály, érettségi, felvételi) */
  topicsCount: 94,

  /** Pontos gyakorló feladatok és kvízkérdések száma a teljes feladatbankban */
  exercisesCount: ${totalExercisesCount},
};
`;

fs.writeFileSync('src/data/siteStats.ts', siteStatsContent, 'utf8');
console.log('src/data/siteStats.ts sikeresen frissítve.');

console.log('\n--- 2. Oldaltérkép (sitemap.xml) generálása ---');

const mainPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/eszkozok', priority: '0.9', changefreq: 'weekly' },
  { url: '/jatekok', priority: '0.9', changefreq: 'weekly' },
  { url: '/kompetencia', priority: '0.9', changefreq: 'weekly' },
  { url: '/felveteli', priority: '0.9', changefreq: 'weekly' },
  { url: '/erettsegi', priority: '0.9', changefreq: 'weekly' },
  { url: '/korrepetalas', priority: '0.8', changefreq: 'weekly' },
  { url: '/online-korrepetalas', priority: '0.8', changefreq: 'weekly' },
  { url: '/rolunk', priority: '0.5', changefreq: 'monthly' },
  { url: '/adatkezeles', priority: '0.4', changefreq: 'monthly' },
  { url: '/felhasznalasi-feltetelek', priority: '0.4', changefreq: 'monthly' },
];

const grades = [
  '1-osztaly', '2-osztaly', '3-osztaly', '4-osztaly',
  '5-osztaly', '6-osztaly', '7-osztaly', '8-osztaly',
  '9-osztaly', '10-osztaly', '11-osztaly', '12-osztaly'
].map(g => ({ url: `/${g}`, priority: '0.85', changefreq: 'weekly' }));

const compGrades = [4, 5, 6, 7, 8, 9, 10, 11];
const compUrls = [];
compGrades.forEach(g => {
  compUrls.push({ url: `/kompetencia/${g}-osztaly`, priority: '0.8', changefreq: 'weekly' });
  compUrls.push({ url: `/kompetencia/${g}-osztaly-mock`, priority: '0.8', changefreq: 'weekly' });
});

const tools = [
  'number-line',
  'debt-asset-model',
  'manipulative-addition',
  'manipulative-division',
  'long-division',
  'divisibility',
  'decimal-shifter',
  'decimal-fractions',
  'fractions',
  'percentages',
  'money-calculation',
  'algebra-cloud',
  'algebra',
  'equation-solver',
  'equation-balance',
  'geometry',
  'construction',
  'symmetry-construction',
  'perimeter-area',
  'volume-surface',
  'unit-converter',
  'capacity-converter',
  'analog-clock',
  'puzzle-maker',
  'toto-maker',
  'matching-creator',
  'word-search',
  'sudoku-generator',
  'student-feedback',
  'smart-whiteboard',
  'scientific-calculator'
].map(id => ({ url: `/eszkozok/${id}`, priority: '0.75', changefreq: 'monthly' }));

const games = [
  'sudoku',
  'hanoi-tower',
  'snake-game',
  'tower-builder',
  'coloring',
  'memory-game',
  'color-sequence-game',
  'chess-game',
  'torpedo-game'
].map(id => ({ url: `/jatekok/${id}`, priority: '0.75', changefreq: 'monthly' }));

const mathTopicsContent = fs.readFileSync('src/data/mathTopics.ts', 'utf8');
const rawBlocks = mathTopicsContent.split(/\{\s*id:\s*['"]/);

const gradeMap = {
  1: '1-osztaly',
  2: '2-osztaly',
  3: '3-osztaly',
  4: '4-osztaly',
  5: '5-osztaly',
  6: '6-osztaly',
  7: '7-osztaly',
  8: '8-osztaly',
  9: '9-osztaly',
  'high-1': '9-osztaly',
  10: '10-osztaly',
  'high-2': '10-osztaly',
  11: '11-osztaly',
  'high-3': '11-osztaly',
  12: '12-osztaly',
  'high-4': '12-osztaly'
};

const topicUrls = [];
const seenUrls = new Set();

rawBlocks.slice(1).forEach(block => {
  const idMatch = block.match(/^([^'"]+)/);
  const gradesMatch = block.match(/grades:\s*\[([^\]]*)\]/);
  if (idMatch && gradesMatch) {
    const id = idMatch[1];
    if (id === 'materials') return;
    const gradesStr = gradesMatch[1].trim();
    const gradesList = gradesStr ? gradesStr.split(',').map(s => s.trim().replace(/['"]/g, '')) : [];
    gradesList.forEach(g => {
      const slug = gradeMap[g];
      if (slug) {
        const u = `/${slug}/${id}`;
        if (!seenUrls.has(u)) {
          seenUrls.add(u);
          topicUrls.push({ url: u, priority: '0.7', changefreq: 'weekly' });
        }
      }
    });
  }
});

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

function addGroup(comment, list) {
  xml += `  <!-- ${comment} -->\n`;
  list.forEach(item => {
    xml += `  <url>\n`;
    xml += `    <loc>https://diakzona.hu${item.url}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += `  </url>\n`;
  });
}

addGroup('Főoldalak és Központi Szolgáltatások', mainPages);
addGroup('Évfolyamok (1-12. osztály)', grades);
addGroup('Országos Kompetenciamérés (Évfolyamok és Próbatesztek)', compUrls);
addGroup('Interaktív Eszközök és Szemléltetők', tools);
addGroup('Matematikai Oktató Játékok', games);

const topicsByGrade = {};
topicUrls.forEach(item => {
  const parts = item.url.split('/');
  const gradeSlug = parts[1];
  if (!topicsByGrade[gradeSlug]) topicsByGrade[gradeSlug] = [];
  topicsByGrade[gradeSlug].push(item);
});

for (const [gradeSlug, items] of Object.entries(topicsByGrade)) {
  addGroup(`Témakörök - ${gradeSlug}`, items);
}

xml += `</urlset>\n`;

fs.writeFileSync('public/sitemap.xml', xml, 'utf8');
console.log(`public/sitemap.xml sikeresen legenerálva! Összes URL: ${mainPages.length + grades.length + compUrls.length + tools.length + games.length + topicUrls.length}`);

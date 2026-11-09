const fs = require('fs');

const content = fs.readFileSync('scratch/textbook_grade10_topic4.txt', 'utf-8');
const pages = content.split('====================================================\n=== TANKÖNYV PDF OLDAL: ');

pages.forEach(p => {
  if (!p.trim()) return;
  const num = p.substring(0, p.indexOf(' '));
  const text = p.substring(p.indexOf('\n\n') + 2);
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  console.log(`\n=== PAGE ${num} ===`);
  lines.slice(0, 10).forEach(l => console.log('  ' + l.trim()));
});


const fs = require('fs');
const path = require('path');
const lucide = require('lucide-react');

const viewsDir = 'c:/Users/Istvan/PycharmProjects/skillup-academy/src/components/math/views';
const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(viewsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Find all JSX tags
  const tags = new Set();
  const matches = content.matchAll(/<([A-Z][a-zA-Z0-9]+)/g);
  for (const m of matches) {
    tags.add(m[1]);
  }
  
  // Check which tags are not in lucide and not in standard view components
  const known = new Set([
    'SectionHeader', 'ActivityPlaceholder', 'MaterialGallery', 'Suspense',
    'Grade1MathModule', 'Grade2MathModule', 'AdmissionPrep', 'GraduationPrep', 'CompetencyMatrixHub'
  ]);
  
  const unknown = [];
  const lucideNeeded = [];
  for (const tag of tags) {
    if (known.has(tag)) continue;
    if (lucide[tag]) {
      lucideNeeded.push(tag);
    } else {
      unknown.push(tag);
    }
  }
  
  console.log(`\n--- ${file} ---`);
  console.log('Lucide icons used:', lucideNeeded.sort().join(', '));
  if (unknown.length > 0) {
    console.log('UNKNOWN/OTHER TAGS:', unknown.join(', '));
  }
}

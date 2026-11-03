const fs = require('fs');
const path = require('path');

const subtopics = [
  { folder: 'tablazatok', name: 'Táblázatok' },
  { folder: 'diagramok', name: 'Diagramok' },
  { folder: 'valtozasok-abrazolasa', name: 'Változások ábrázolása' },
  { folder: 'grafikonok-a-mindennapokban', name: 'Grafikonok a mindennapokban' },
  { folder: 'a-fuggveny-fogalma', name: 'A függvény fogalma' },
  { folder: 'keszitsunk-grafikont', name: 'Készítsünk grafikont!' },
  { folder: 'az-egyenes-es-forditott-aranyossag-fuggvenye', name: 'Egyenes és fordított arányosság' },
  { folder: 'linearis-fuggvenyek', name: 'Lineáris függvények' },
  { folder: 'egyenesek-meredeksege', name: 'Egyenesek meredeksége' },
  { folder: 'abszoluterteek-fuggveny', name: 'Abszolútérték-függvény' },
  { folder: 'fuggvenyek-jellemzese', name: 'Függvények jellemzése' },
  { folder: 'szelsoertekek', name: 'Függvények szélsőértékei' },
  { folder: 'masodfoku-es-negyzetgyok-fuggveny', name: 'Másodfokú és négyzetgyök-függvény' },
  { folder: 'gyakorlati-feladatok', name: 'Gyakorlati feladatok & modellezés' },
  { folder: 'egyenletek-grafikus-megoldasa', name: 'Egyenletek grafikus megoldása' },
  { folder: 'egyenlotlensegek', name: 'Egyenlőtlenségek grafikus megoldása' },
  { folder: 'abszolut-ertekes-egyenletek', name: 'Abszolútértékes egyenletek' }
];

const dir = path.join('src', 'components', 'math', 'grade-9', 'fuggvenyek');

function parseQuizQuestions(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const questionsByLevel = { 1: [], 2: [], 3: [] };
  
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
    const qMatches = sec.text.match(/\{\s*id:\s*['"][^'"]+['"][\s\S]*?explanation:\s*['"][\s\S]*?['"]\s*\}/g);
    if (qMatches) {
      for (const qRaw of qMatches) {
        const cleanRaw = qRaw.replace(/figure:\s*<[^>]+>,?\s*/g, '');
        try {
          const fn = new Function(`return (${cleanRaw});`);
          const qObj = fn();
          questionsByLevel[sec.level].push(qObj);
        } catch (e) {}
      }
    }
  }

  return questionsByLevel;
}

// Load all parsed questions
const allSubtopicQuestions = subtopics.map(st => {
  const p = path.join(dir, st.folder);
  const qFile = fs.readdirSync(p).find(f => f.endsWith('Quiz.tsx'));
  const fullPath = path.join(p, qFile);
  const qByL = parseQuizQuestions(fullPath);
  return { ...st, questions: qByL };
});

// Selection for Level 1: 30 questions
// 13 subtopics get 2, 4 subtopics get 1
const level1Questions = [];
subtopics.forEach((st, idx) => {
  const pool = allSubtopicQuestions[idx].questions[1];
  const count = idx < 13 ? 2 : 1;
  for (let k = 0; k < count; k++) {
    const q = pool[k] || pool[0];
    level1Questions.push({
      ...q,
      sourceSubtopic: `${idx + 1}. ${st.name}`
    });
  }
});

// Selection for Level 2: 30 questions
// 4 subtopics get 1, 13 subtopics get 2
const level2Questions = [];
subtopics.forEach((st, idx) => {
  const pool = allSubtopicQuestions[idx].questions[2];
  const count = idx < 4 ? 1 : 2;
  for (let k = 0; k < count; k++) {
    const q = pool[k] || pool[0];
    level2Questions.push({
      ...q,
      sourceSubtopic: `${idx + 1}. ${st.name}`
    });
  }
});

// Selection for Level 3: 30 questions
// 4 subtopics get 1, 13 subtopics get 2
const level3Questions = [];
subtopics.forEach((st, idx) => {
  const pool = allSubtopicQuestions[idx].questions[3];
  const count = idx < 4 ? 1 : 2;
  for (let k = 0; k < count; k++) {
    const q = pool[k] || pool[0];
    level3Questions.push({
      ...q,
      sourceSubtopic: `${idx + 1}. ${st.name}`
    });
  }
});

console.log(`Selected: L1=${level1Questions.length}, L2=${level2Questions.length}, L3=${level3Questions.length}`);

function formatQuestion(q, newId, figureCode) {
  const badge = `[${q.sourceSubtopic}] ${q.questionTypeBadge || ''}`.trim();
  const qText = JSON.stringify(q.question);
  const optionsStr = JSON.stringify(q.options, null, 2);
  const correct = q.correctAnswer;
  const hintStr = JSON.stringify(q.hint || '');
  const expStr = JSON.stringify(q.explanation || '');

  let figureLine = '';
  if (figureCode) {
    figureLine = `\n        figure: ${figureCode},`;
  }

  return `      {
        id: '${newId}',
        questionTypeBadge: ${JSON.stringify(badge)},
        question: ${qText},${figureLine}
        options: ${optionsStr},
        correctAnswer: ${correct},
        hint: ${hintStr},
        explanation: ${expStr}
      }`;
}

const level1Str = level1Questions.map((q, idx) => {
  const fig = idx === 0 ? '<ChapterMapSvg size={240} />' : undefined;
  return formatQuestion(q, `peq1-${idx + 1}`, fig);
}).join(',\n');

const level2Str = level2Questions.map((q, idx) => {
  const fig = idx === 0 ? '<ComprehensiveAnalysisSvg size={240} />' : undefined;
  return formatQuestion(q, `peq2-${idx + 1}`, fig);
}).join(',\n');

const level3Str = level3Questions.map((q, idx) => {
  const fig = idx === 0 ? '<DualMethodComparisonSvg size={240} />' : undefined;
  return formatQuestion(q, `peq3-${idx + 1}`, fig);
}).join(',\n');

const outputTsx = `import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PracticeExamMatcher } from './PracticeExamMatcher';
import { PracticeExamSorter } from './PracticeExamSorter';
import {
  ChapterMapSvg,
  ComprehensiveAnalysisSvg,
  DualMethodComparisonSvg
} from './PracticeExamFigures';
import { BookOpen, Target, Sparkles, AlertTriangle, CheckCircle, Trophy, HelpCircle } from 'lucide-react';

export interface PracticeExamQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Átfogó Kérdések (Könnyű)',
    subtitle: '30 feladat a teljes fejezetből: táblázatok, diagramok, egyenes/fordított arányosság, meredekség, alaptranszformációk és egyszerű egyenletek.',
    range: '1 - 30. feladat',
    focus: 'Átfogó Alapismeretek (1–17. altéma)',
    questions: [
${level1Str}
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számítások, Transzformációk és Függvényvizsgálat (Közepes)',
    subtitle: '30 feladat a teljes fejezetből: meredekség két pontból, parabola és gyökfüggvény csúcspontja, zérushelyek, intervallumos monotonitás, grafikus metszéspontok és szöveges modellezés.',
    range: '31 - 60. feladat',
    focus: 'Transzformációk, Jellemzés & Grafikus Megoldás',
    questions: [
${level2Str}
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Elemzés, Egyenlőtlenségek és Érettségi Szintű Feladatok (Nehéz)',
    subtitle: '30 összetett feladat: többváltozós esetszétválasztás, másodfokú zónák, paraméteres feladatok, fizikai/gazdasági szélsőérték-optimalizálás és szigorú érettségi típusfeladatok.',
    range: '61 - 90. feladat',
    focus: 'Érettségi Felkészülés & Szintézis',
    questions: [
${level3Str}
    ]
  }
};

const examCheatSheets: any[] = [
  {
    title: 'A 4 Alapvető Görbetípus és Csúcspont',
    icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
    badgeText: 'Alapfüggvények',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    content: (
      <div className="space-y-2 text-xs">
        <p className="text-slate-300">
          • <strong className="text-sky-300">Lineáris:</strong> f(x) = mx + b ➔ egyenes, meredekség = m, tengelymetszet = (0; b).
        </p>
        <p className="text-slate-300">
          • <strong className="text-purple-300">Hiperbola:</strong> g(x) = k / x ➔ x ≠ 0, kétágú görbe, x és y tengely aszimptota.
        </p>
        <p className="text-slate-300">
          • <strong className="text-rose-300">Abszolútérték:</strong> h(x) = a|x - u| + v ➔ V-alakú görbe, csúcspont: C(u; v).
        </p>
        <p className="text-slate-300">
          • <strong className="text-indigo-300">Másodfokú:</strong> p(x) = a(x - u)² + v ➔ parabola, csúcspont: C(u; v).
        </p>
      </div>
    )
  },
  {
    title: 'A 7 Szempontos Teljes Függvényjellemzés',
    icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    badgeText: 'Függvénytan',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong>1. D_f:</strong> Értelmezési tartomány (milyen x-ekre létezik?).</p>
        <p><strong>2. R_f:</strong> Értékkészlet (milyen y értékeket vesz fel?).</p>
        <p><strong>3. Zérushely:</strong> f(x) = 0 helyei (x-tengelymetszetek).</p>
        <p><strong>4. Szélsőérték:</strong> Minimum / Maximum helye (x) és értéke (y).</p>
        <p><strong>5. Monotonitás:</strong> Szigorúan növekvő vagy csökkenő intervallumok.</p>
        <p><strong>6. Paritás:</strong> Páros (y-tengelyre tükrös) vagy Páratlan (origóra tükrös).</p>
        <p><strong>7. Korlátosság:</strong> Alulról, felülről vagy mindkét oldalról korlátos-e.</p>
      </div>
    )
  },
  {
    title: 'Grafikus Egyenlet- és Egyenlőtlenség-megoldás',
    icon: <Trophy className="w-5 h-5 text-emerald-400" />,
    badgeText: 'Metszéspontok',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    content: (
      <div className="space-y-2 text-xs">
        <p className="text-slate-300">
          • <strong className="text-emerald-300">f(x) = g(x):</strong> A metszéspontok <em>x koordinátái</em> a gyökök!
        </p>
        <p className="text-slate-300">
          • <strong className="text-emerald-300">f(x) ≥ g(x):</strong> Azon x tartományok, ahol az f grafikonja a g <em>felett vagy rajta</em> halad.
        </p>
        <p className="text-slate-400 italic">
          Mindig ellenőrizd behelyettesítéssel az eredményt!
        </p>
      </div>
    )
  }
];

export const PracticeExamQuiz: React.FC<PracticeExamQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      chapterId="fuggvenyek"
      topicId="gyakorlas-tudasproba"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      title="18. Fejezeti témazáró próbadolgozat kvíz"
      subtitle="90 átfogó feladat 3 szinten (szintenként 30 kérdés): a fejezet összes altémájának (1–17.) teljes szintézise és felkészülés a témazáróra"
      levels={quizLevels}
      cheatSheets={examCheatSheets}
      matcherComponent={
        <PracticeExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <PracticeExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};
`;

const targetPath = path.join(dir, 'gyakorlas-tudasproba', 'PracticeExamQuiz.tsx');
fs.writeFileSync(targetPath, outputTsx, 'utf8');
console.log(`Successfully generated ${targetPath} with ${level1Questions.length + level2Questions.length + level3Questions.length} questions!`);


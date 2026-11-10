import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FinancialProblemsSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Pénzügyi feladatok csoportosítása modelljük szerint',
    subtitle: 'Válogasd szét a gazdasági feladványokat a megoldásukhoz használt matematikai modell alapján!',
    categories: [
      {
        id: 'cat-change',
        name: 'Árváltozás (Százalék)',
        description: 'Kétszeri egymást követő drágulás vagy akció, bázisváltozás.',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-interest',
        name: 'Kamatos kamat',
        description: 'Két kamatperiódus, megtakarítások, kamattényező q = 1 + p/100.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-revenue',
        name: 'Bevétel & Profit',
        description: 'Ár × Mennyiség modell, parabola csúcspont és optimalizálás.',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-share',
        name: 'Költségmegosztás',
        description: 'Fix összeg egyenlő elosztása diákok vagy vásárlók között.',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'fps1-1', content: 'Egy kabátot előbb 20%-kal drágítottak, majd 20%-kal leáraztak.', categoryId: 'cat-change' },
      { id: 'fps1-2', content: '500 000 Ft-ot kötöttünk le 2 évre, a végén 605 000 Ft lett.', categoryId: 'cat-interest' },
      { id: 'fps1-3', content: 'Minden 50 Ft áremelés hatására 10-zel kevesebb mozijegyet adunk el.', categoryId: 'cat-revenue' },
      { id: 'fps1-4', content: 'Egy 150 000 Ft-os sátor árát egyenlően dobják össze a túrázók.', categoryId: 'cat-share' },
      { id: 'fps1-5', content: 'Két egymást követő évben azonos p%-kal emelték a bérleti díjat.', categoryId: 'cat-change' },
      { id: 'fps1-6', content: 'Első év elején 1 milliót, második év elején 500 ezret tett be a bankba.', categoryId: 'cat-interest' },
      { id: 'fps1-7', content: 'Milyen jegyár mellett érhető el a színház maximális árbevétele?', categoryId: 'cat-revenue' },
      { id: 'fps1-8', content: 'Ketten visszaléptek a kirándulástól, ezért fejenként 1500 Ft-tal többet fizetnek.', categoryId: 'cat-share' },
      { id: 'fps1-9', content: 'Egy részvény ára két nap alatt kétszer egymás után p%-ot esett.', categoryId: 'cat-change' },
      { id: 'fps1-10', content: 'A pékség napi bevétele B(x) = (250 + x)(800 - 2x) forint.', categoryId: 'cat-revenue' }
    ]
  },
  2: {
    title: 'A kialakuló egyenlet algebrai típusa',
    subtitle: 'Válogasd szét a feladatokat az egyenlet felépítése és megoldási algoritmusa szerint!',
    categories: [
      {
        id: 'cat-pure',
        name: 'Tiszta másodfokú (q² = szám)',
        description: 'Csak négyzetes és konstans tag szerepel, közvetlen gyökvonással megoldható.',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-full',
        name: 'Teljes másodfokú (ax² + bx + c = 0)',
        description: 'Elsőfokú tag is van, megoldóképletet vagy diszkriminánst igényel.',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-fractional',
        name: 'Törtes másodfokú egyenlet',
        description: 'Az ismeretlen a nevezőben van, beszorzást és kikötést kíván.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'fps2-1', content: '100 000 · q² = 121 000', categoryId: 'cat-pure' },
      { id: 'fps2-2', content: '(3000 + x)(400 - 0,1x) = 1 224 000', categoryId: 'cat-full' },
      { id: 'fps2-3', content: '180 000 / (n - 3) - 180 000 / n = 3000', categoryId: 'cat-fractional' },
      { id: 'fps2-4', content: '50 000 · (1 - p²/10 000) = 48 200', categoryId: 'cat-pure' },
      { id: 'fps2-5', content: '500 000 · q² + 300 000 · q = 936 000', categoryId: 'cat-full' },
      { id: 'fps2-6', content: '60 000 / (n - 1) - 60 000 / n = 2000', categoryId: 'cat-fractional' },
      { id: 'fps2-7', content: '200 000 · q² = 288 000', categoryId: 'cat-pure' },
      { id: 'fps2-8', content: '-2x² + 300x - 4000 = 0 (bevételi cél)', categoryId: 'cat-full' },
      { id: 'fps2-9', content: '120 000 / (n - 2) - 120 000 / n = 5000', categoryId: 'cat-fractional' }
    ]
  },
  3: {
    title: 'Kapott gyökök gazdasági szűrése és értelmezése',
    subtitle: 'Döntsd el, hogy a matematikai gyökök közül melyik fogadható el és melyik vetendő el a valóságban!',
    categories: [
      {
        id: 'cat-accept',
        name: 'Elfogadható megoldás',
        description: 'Gazdaságilag értelmezhető, életszerű eredmény (pl. pozitív egész létszám, reális kamat).',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-reject-neg',
        name: 'Elvetendő (Negatív érték)',
        description: 'Személyek száma, fizetendő pénz vagy kamattényező nem lehet negatív.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-reject-absurd',
        name: 'Elvetendő (Abszurd / Vevővesztő)',
        description: 'Olyan extrém áremelés, ahol a vásárlók száma negatívvá válna (Q < 0).',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'fps3-1', content: 'Diákok száma a nyaraláskor: n = 15 fő', categoryId: 'cat-accept' },
      { id: 'fps3-2', content: 'Diákok száma a másodfokú egyenletből: n = -12 fő', categoryId: 'cat-reject-neg' },
      { id: 'fps3-3', content: 'Éves kamattényező: q = 1,08 (8% kamatláb)', categoryId: 'cat-accept' },
      { id: 'fps3-4', content: 'Kamattényező a tiszta egyenletből: q = -1,1', categoryId: 'cat-reject-neg' },
      { id: 'fps3-5', content: 'Optimális jegyáremelés: x = +500 Ft (350 néző)', categoryId: 'cat-accept' },
      { id: 'fps3-6', content: 'Áremelés: x = +5000 Ft, melynél a nézők száma: 400 - 500 = -100 fő', categoryId: 'cat-reject-absurd' },
      { id: 'fps3-7', content: 'Kabát leárazási százaléklába: p = 15%', categoryId: 'cat-accept' },
      { id: 'fps3-8', content: 'Árváltozásból adódó gyök: p = -30% az emelési feladatban', categoryId: 'cat-reject-neg' }
    ]
  }
};

export const FinancialProblemsSorter: React.FC<FinancialProblemsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-masodfoku-egyenletek',
  topicTitle = 'Pénzügyi Szöveges Feladatok Csoportosító'
}) => {
  const activeLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={activeLevel}
      levelConfig={sorterLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};


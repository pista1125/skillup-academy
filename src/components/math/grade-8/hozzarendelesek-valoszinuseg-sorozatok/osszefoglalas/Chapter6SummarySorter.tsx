import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Chapter6SummarySorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: A VI. Fejezet Témakörei és Fogalmai',
    subtitle: 'Válogasd szét a fogalmakat és feladatokat a 3 fő tématerület szerint!',
    categories: [
      {
        id: 'cat-functions',
        name: 'Arányosságok & Függvények',
        description: 'Egyenes és fordított arányosság, lineáris függvények és menetdiagramok',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-statistics',
        name: 'Statisztika & Valószínűség',
        description: 'Adatsorok, átlag, medián, kockadobás, események és stratégiai játékok',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-sequences',
        name: 'Sorozatok & Mintázatok',
        description: 'Számtani és mértani sorozatok, Fibonacci-számok, gyufaszálak és átlók',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'c6-s1-1', label: 'Origón átmenő egyenes grafikonja (y = k · x)', category: 'cat-functions' },
      { id: 'c6-s1-2', label: 'Kétágú hiperbola görbéje (y = k / x)', category: 'cat-functions' },
      { id: 'c6-s1-3', label: 'Zérushely meghatározása (f(x) = 0)', category: 'cat-functions' },
      { id: 'c6-s1-4', label: 'Út-idő menetdiagram és meredekség (sebesség)', category: 'cat-functions' },
      { id: 'c6-s1-5', label: 'Adatsor terjedelme és rendezett mediánja', category: 'cat-statistics' },
      { id: 'c6-s1-6', label: 'Klasszikus valószínűség képlete: P = k / n', category: 'cat-statistics' },
      { id: 'c6-s1-7', label: 'Két kocka dobása: a 36 elemi eset mátrixa', category: 'cat-statistics' },
      { id: 'c6-s1-8', label: '21 gyufás Nim-játék és tisztességes játék (Fair Play)', category: 'cat-statistics' },
      { id: 'c6-s1-9', label: 'a_n = a_1 + (n - 1) · d (számtani sorozat)', category: 'cat-sequences' },
      { id: 'c6-s1-10', label: 'a_n = a_1 · q^(n - 1) (mértani sorozat)', category: 'cat-sequences' },
      { id: 'c6-s1-11', label: 'Fibonacci-sorozat: 1, 1, 2, 3, 5, 8, 13...', category: 'cat-sequences' },
      { id: 'c6-s1-12', label: 'Konvex sokszög átlóinak száma: n · (n - 3) / 2', category: 'cat-sequences' }
    ]
  },
  2: {
    title: '2. Szint: Képletek és Alapösszefüggések Rendszerezése',
    subtitle: 'Rendszerezd az algebrai és statisztikai képleteket megfelelő alkalmazási területük szerint!',
    categories: [
      {
        id: 'cat-calc-funcs',
        name: 'Függvénytani Összefüggések',
        description: 'Meredekség, arányossági tényezők és tengelymetszetek',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-calc-prob',
        name: 'Valószínűségi & Statisztikai Képletek',
        description: 'Átlag, relatív gyakoriság és eseményvalószínűségek',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-calc-seq',
        name: 'Sorozat & Mintázat Képletek',
        description: 'Differencia, kvóciens, kézfogások és háromszögszámok',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'c6-s2-1', label: 'k = y / x (állandó hányados)', category: 'cat-calc-funcs' },
      { id: 'c6-s2-2', label: 'x · y = k (állandó szorzat)', category: 'cat-calc-funcs' },
      { id: 'c6-s2-3', label: 'a = (y_2 - y_1) / (x_2 - x_1) (meredekség)', category: 'cat-calc-funcs' },
      { id: 'c6-s2-4', label: 'x = -b / a (elsőfokú zérushely)', category: 'cat-calc-funcs' },
      { id: 'c6-s2-5', label: 'Relatív gyakoriság = k / N', category: 'cat-calc-prob' },
      { id: 'c6-s2-6', label: 'Számtani átlag: x̄ = (∑ x) / N', category: 'cat-calc-prob' },
      { id: 'c6-s2-7', label: 'Komplementer esemény: P(nem A) = 1 - P(A)', category: 'cat-calc-prob' },
      { id: 'c6-s2-8', label: 'P(legalább egy) = 1 - P(egyik sem)', category: 'cat-calc-prob' },
      { id: 'c6-s2-9', label: 'd = a_(n+1) - a_n (differencia)', category: 'cat-calc-seq' },
      { id: 'c6-s2-10', label: 'q = a_(n+1) / a_n (kvóciens)', category: 'cat-calc-seq' },
      { id: 'c6-s2-11', label: 'Háromszögszámok: T_n = n · (n + 1) / 2', category: 'cat-calc-seq' },
      { id: 'c6-s2-12', label: 'Kézfogások száma: K = n · (n - 1) / 2', category: 'cat-calc-seq' }
    ]
  },
  3: {
    title: '3. Szint: Igaz, Hamis és Matematikai Tévhitek',
    subtitle: 'Döntsd el a fejezet összefüggéseiről szóló állítások matematikai igazságtartalmát!',
    categories: [
      {
        id: 'cat-true',
        name: 'Matematikailag IGAZ',
        description: 'Minden esetben érvényes matematikai tétel vagy definíció',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-false',
        name: 'TÉVES / Tipikus Diákcsapda',
        description: 'Hibás elméleti állítás, gyakori tévedés vagy nem általánosítható következtetés',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'c6-s3-1', label: 'Az egyenes arányosság grafikonja mindig átmegy a (0; 0) origón.', category: 'cat-true' },
      { id: 'c6-s3-2', label: 'Ha egy mennyiség nő, és a másik is nő, akkor közöttük mindig egyenes arányosság van.', category: 'cat-false' },
      { id: 'c6-s3-3', label: 'A fordított arányosság hiperbolája soha nem érinti vagy metszi sem az x-, sem az y-tengelyt.', category: 'cat-true' },
      { id: 'c6-s3-4', label: 'Az f(x) = -3x + 5 függvény meredeksége pozitív, mert a +5 miatt emelkedik.', category: 'cat-false' },
      { id: 'c6-s3-5', label: 'Két kockával dobva a 7-es összegnek van a legnagyobb esélye (6/36 = 1/6).', category: 'cat-true' },
      { id: 'c6-s3-6', label: 'Ha egymás után 5 fejet dobtunk pénzérmével, a 6. dobásnál már jóval nagyobb eséllyel lesz írás.', category: 'cat-false' },
      { id: 'c6-s3-7', label: 'Páros darabszámú rendezett adatsornál a medián a két középső adat számtani közepe.', category: 'cat-true' },
      { id: 'c6-s3-8', label: 'Egy számsorozat szabályát mindig egyértelműen meghatározza az első két tagja.', category: 'cat-false' },
      { id: 'c6-s3-9', label: 'A számtani sorozat bármely belső tagja pontosan egyenlő a két szomszédja számtani közepével.', category: 'cat-true' },
      { id: 'c6-s3-10', label: 'A valószínűség értéke lehet 1,2 is, ha a kedvező esetek száma meghaladja a vártat.', category: 'cat-false' },
      { id: 'c6-s3-11', label: 'Menetdiagramon a vízszintes vonalszakasz azt jelenti, hogy a jármű áll (v = 0).', category: 'cat-true' },
      { id: 'c6-s3-12', label: 'A módusz mindig egyetlen konkrét szám, egy adatsornak sosem lehet két vagy több módusza.', category: 'cat-false' }
    ]
  }
};

export const Chapter6SummarySorter: React.FC<Chapter6SummarySorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-func-summary',
  topicTitle = 'VI. Fejezet Összefoglalás'
}) => {
  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={level}
      config={sorterLevels[level] || sorterLevels[1]}
      themeColor="emerald"
      onBack={onSwitchToQuiz}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default Chapter6SummarySorter;

import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SequencesSummarySorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const SEQUENCES_SUMMARY_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Milyen sorozat kezdete?',
    description: 'Számtani (nem konstans), mértani (nem konstans) vagy egyik sem?',
    categories: [
      { id: 'sz', name: 'számtani sorozat', color: 'blue' },
      { id: 'm', name: 'mértani sorozat', color: 'rose' },
      { id: 'e', name: 'egyik sem', color: 'amber' }
    ],
    items: [
      { id: 'sss101', text: '3; 9; 15; 21', categoryId: 'sz' },
      { id: 'sss102', text: '12; 7; 2; −3', categoryId: 'sz' },
      { id: 'sss103', text: '2; 4; 6; 8', categoryId: 'sz' },
      { id: 'sss104', text: '11; 13; 15; 17', categoryId: 'sz' },
      { id: 'sss105', text: '√5; √20; √45', categoryId: 'sz' },
      { id: 'sss106', text: '100; 110; 120; 130', categoryId: 'sz' },
      { id: 'sss107', text: '7; −2; −11; −20', categoryId: 'sz' },
      { id: 'sss108', text: '21; 19,6; 18,2; 16,8', categoryId: 'sz' },
      { id: 'sss109', text: '3; 10; 17; 24', categoryId: 'sz' },
      { id: 'sss110', text: '3; 6; 12; 24', categoryId: 'm' },
      { id: 'sss111', text: '108; −36; 12; −4', categoryId: 'm' },
      { id: 'sss112', text: '6; 12; 24; 48', categoryId: 'm' },
      { id: 'sss113', text: '2; 10; 50; 250', categoryId: 'm' },
      { id: 'sss114', text: '2,4; 1,92; 1,536', categoryId: 'm' },
      { id: 'sss115', text: '1; 0,9; 0,81; 0,729', categoryId: 'm' },
      { id: 'sss116', text: '−2; 10; −50; 250', categoryId: 'm' },
      { id: 'sss117', text: '4; 8; 16; 32', categoryId: 'm' },
      { id: 'sss118', text: '1; 1,08; 1,1664', categoryId: 'm' },
      { id: 'sss119', text: '2; 6; 12; 20', categoryId: 'e' },
      { id: 'sss120', text: '−9; 4; −5; −1', categoryId: 'e' },
      { id: 'sss121', text: '1; 4; 9; 16', categoryId: 'e' },
      { id: 'sss122', text: '1; 1/2; 1/3; 1/4', categoryId: 'e' },
      { id: 'sss123', text: '1; 2; 4; 7; 11', categoryId: 'e' },
      { id: 'sss124', text: '−2; 0; 4; 12', categoryId: 'e' },
      { id: 'sss125', text: '1; 1; 2; 3; 5', categoryId: 'e' },
      { id: 'sss126', text: '1; 2; 6; 24', categoryId: 'e' },
      { id: 'sss127', text: '5; 7; 10; 14', categoryId: 'e' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Általános tag szerint',
    description: 'Milyen sorozatot ad meg az általános tag (n ∈ N⁺)? A konstans sorozatokat most kihagytuk.',
    categories: [
      { id: 'sz', name: 'számtani', color: 'blue' },
      { id: 'm', name: 'mértani', color: 'rose' },
      { id: 'e', name: 'egyik sem', color: 'amber' }
    ],
    items: [
      { id: 'sss201', text: 'aₙ = 6n', categoryId: 'sz' },
      { id: 'sss202', text: 'eₙ = 6 + n', categoryId: 'sz' },
      { id: 'sss203', text: 'fₙ = n − 6', categoryId: 'sz' },
      { id: 'sss204', text: 'aₙ = 5 − 2n', categoryId: 'sz' },
      { id: 'sss205', text: 'aₙ = 3n + 1', categoryId: 'sz' },
      { id: 'sss206', text: 'aₙ = (n + 1)/2', categoryId: 'sz' },
      { id: 'sss207', text: 'aₙ = 7 − 3n', categoryId: 'sz' },
      { id: 'sss208', text: 'aₙ = 2n − 4', categoryId: 'sz' },
      { id: 'sss209', text: 'aₙ = −n', categoryId: 'sz' },
      { id: 'sss210', text: 'dₙ = 6ⁿ', categoryId: 'm' },
      { id: 'sss211', text: 'bₙ = 3 · 0,8ⁿ', categoryId: 'm' },
      { id: 'sss212', text: 'bₙ = 2ⁿ⁻⁴', categoryId: 'm' },
      { id: 'sss213', text: 'aₙ = 3 · 2ⁿ', categoryId: 'm' },
      { id: 'sss214', text: 'aₙ = 2 · (−1)ⁿ', categoryId: 'm' },
      { id: 'sss215', text: 'aₙ = 5 · (1/2)ⁿ', categoryId: 'm' },
      { id: 'sss216', text: 'aₙ = 10ⁿ', categoryId: 'm' },
      { id: 'sss217', text: 'aₙ = 2 · 5ⁿ⁻¹', categoryId: 'm' },
      { id: 'sss218', text: 'aₙ = 15,92 · 1,002ⁿ', categoryId: 'm' },
      { id: 'sss219', text: 'cₙ = n⁶', categoryId: 'e' },
      { id: 'sss220', text: 'cₙ = n(n + 1)', categoryId: 'e' },
      { id: 'sss221', text: 'aₙ = n²', categoryId: 'e' },
      { id: 'sss222', text: 'aₙ = 1/n', categoryId: 'e' },
      { id: 'sss223', text: 'aₙ = √n', categoryId: 'e' },
      { id: 'sss224', text: 'aₙ = 2ⁿ − 4', categoryId: 'e' },
      { id: 'sss225', text: 'aₙ = n² + 1', categoryId: 'e' },
      { id: 'sss226', text: 'aₙ = n + 2ⁿ', categoryId: 'e' },
      { id: 'sss227', text: 'aₙ = (−1)ⁿ + n', categoryId: 'e' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Pénzügyi helyzetek',
    description: 'Melyik pénzügyi modell írja le a helyzetet?',
    categories: [
      { id: 'kk', name: 'egyszeri betét kamatos kamata', color: 'emerald' },
      { id: 'gy', name: 'gyűjtőjáradék', color: 'purple' },
      { id: 'tr', name: 'hitel állandó törlesztése', color: 'teal' }
    ],
    items: [
      { id: 'sss301', text: '2 millió Ft-ot leköt 2 évre évi 8%-ra', categoryId: 'kk' },
      { id: 'sss302', text: '10 év után 32 millió Ft – mennyit tett be?', categoryId: 'kk' },
      { id: 'sss303', text: 'hány év alatt lesz másfélszeres a betét 6%-kal?', categoryId: 'kk' },
      { id: 'sss304', text: 'hány %-kal duplázódik a pénz 20 év alatt?', categoryId: 'kk' },
      { id: 'sss305', text: 'lottónyeremény 5 évre bankban 8%-kal', categoryId: 'kk' },
      { id: 'sss306', text: 'a cirkusz nettó bevétele havi 1%-kal egy évig', categoryId: 'kk' },
      { id: 'sss307', text: 'Aₙ = A₀ · (1 + p/100)ⁿ', categoryId: 'kk' },
      { id: 'sss308', text: 'egy összeget egyszer helyezünk el, nem nyúlunk hozzá', categoryId: 'kk' },
      { id: 'sss309', text: 'a nagyszülők születéskor egyszer betesznek 500 000 Ft-ot', categoryId: 'kk' },
      { id: 'sss310', text: '6 éven át minden év elején 1,2 millió Ft befizetése', categoryId: 'gy' },
      { id: 'sss311', text: 'havonta azonos összeget tesz félre ugyanarra a számlára', categoryId: 'gy' },
      { id: 'sss312', text: 'a · q · (qⁿ − 1)/(q − 1)', categoryId: 'gy' },
      { id: 'sss313', text: 'nyugdíj-előtakarékosság évi egyenlő befizetéssel', categoryId: 'gy' },
      { id: 'sss314', text: 'az alapösszeget egyenlő időközönként ugyanannyival növeljük', categoryId: 'gy' },
      { id: 'sss315', text: 'minden születésnapon 50 000 Ft kerül a gyerek számlájára', categoryId: 'gy' },
      { id: 'sss316', text: 'lakástakarék: havi 20 000 Ft befizetés 4 évig', categoryId: 'gy' },
      { id: 'sss317', text: 'évente azonos befizetés, a végén a felhalmozott összeg a kérdés', categoryId: 'gy' },
      { id: 'sss318', text: 'a·qⁿ + a·qⁿ⁻¹ + … + a·q (év eleji befizetések)', categoryId: 'gy' },
      { id: 'sss319', text: '1,5 millió Ft napelemhitel 4 egyenlő részletben', categoryId: 'tr' },
      { id: 'sss320', text: 'lakáshitel fix havi részlettel', categoryId: 'tr' },
      { id: 'sss321', text: 't = H · qⁿ · (q − 1)/(qⁿ − 1)', categoryId: 'tr' },
      { id: 'sss322', text: 'autóhitel visszafizetése 60 egyenlő havi részletben', categoryId: 'tr' },
      { id: 'sss323', text: 'H · qⁿ = t · (qⁿ⁻¹ + … + q + 1)', categoryId: 'tr' },
      { id: 'sss324', text: 'a felvett összeget azonos időközönként ugyanannyival fizetjük vissza', categoryId: 'tr' },
      { id: 'sss325', text: 'diákhitel törlesztése állandó havi összeggel', categoryId: 'tr' },
      { id: 'sss326', text: 'mennyi a fennmaradó tartozás 2 részlet után?', categoryId: 'tr' },
      { id: 'sss327', text: 'mekkora a havi részlet, ha 1 millió Ft-ot 2 év alatt fizetünk vissza?', categoryId: 'tr' }
    ]
  }
};

export const SequencesSummarySorter: React.FC<SequencesSummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-sum-sorozatok-sorter',
  topicTitle = '6. Sorozatok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="sorozatok"
      title={topicTitle}
      subtitle="Ismerd fel a számtani és mértani sorozatokat, és a pénzügyi modelleket!"
      levels={SEQUENCES_SUMMARY_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default SequencesSummarySorter;

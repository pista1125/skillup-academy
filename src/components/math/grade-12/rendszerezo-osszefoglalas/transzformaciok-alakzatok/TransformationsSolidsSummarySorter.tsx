import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TransformationsSolidsSummarySorterProps {
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

const TRANSFORMATIONS_SOLIDS_SUMMARY_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Szimmetriák",
    description: "Csak tengelyesen, csak középpontosan, vagy mindkét módon szimmetrikus?",
    categories: [
      { id: 'teng', name: "csak tengelyesen", color: 'blue' },
      { id: 'kozep', name: "csak középpontosan", color: 'rose' },
      { id: 'both', name: "tengelyesen és középpontosan is", color: 'emerald' }
    ],
    items: [
      { id: 'tss101', text: "egyenlő szárú (nem szabályos) háromszög", categoryId: 'teng' },
      { id: 'tss102', text: "szabályos háromszög", categoryId: 'teng' },
      { id: 'tss103', text: "deltoid (nem rombusz)", categoryId: 'teng' },
      { id: 'tss104', text: "húrtrapéz (nem téglalap)", categoryId: 'teng' },
      { id: 'tss105', text: "szabályos ötszög", categoryId: 'teng' },
      { id: 'tss106', text: "szabályos hétszög", categoryId: 'teng' },
      { id: 'tss107', text: "félkör", categoryId: 'teng' },
      { id: 'tss108', text: "az A nagybetű", categoryId: 'teng' },
      { id: 'tss109', text: "a T nagybetű", categoryId: 'teng' },
      { id: 'tss110', text: "paralelogramma (nem rombusz, nem téglalap)", categoryId: 'kozep' },
      { id: 'tss111', text: "az S nagybetű", categoryId: 'kozep' },
      { id: 'tss112', text: "a Z nagybetű", categoryId: 'kozep' },
      { id: 'tss113', text: "az N nagybetű", categoryId: 'kozep' },
      { id: 'tss114', text: "S alakú, kétlapátos szélkerék", categoryId: 'kozep' },
      { id: 'tss115', text: "négylapátos, egy irányba hajló forgószél", categoryId: 'kozep' },
      { id: 'tss116', text: "egy általános háromszög és egy külső pontra vett tükörképe együtt", categoryId: 'kozep' },
      { id: 'tss117', text: "ferde paralelogramma alakú járólap", categoryId: 'kozep' },
      { id: 'tss118', text: "téglalap (nem négyzet), amelynek két szemközti sarkát egyformán levágtuk", categoryId: 'kozep' },
      { id: 'tss119', text: "négyzet", categoryId: 'both' },
      { id: 'tss120', text: "téglalap", categoryId: 'both' },
      { id: 'tss121', text: "rombusz", categoryId: 'both' },
      { id: 'tss122', text: "kör", categoryId: 'both' },
      { id: 'tss123', text: "szabályos hatszög", categoryId: 'both' },
      { id: 'tss124', text: "szabályos nyolcszög", categoryId: 'both' },
      { id: 'tss125', text: "az H nagybetű", categoryId: 'both' },
      { id: 'tss126', text: "az X nagybetű", categoryId: 'both' },
      { id: 'tss127', text: "az O nagybetű", categoryId: 'both' }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Hányszorosára változik?",
    description: "Egy test vagy síkidom k = 2 arányú nagyításakor a mennyiség 2-szeres, 4-szeres vagy 8-szoros lesz?",
    categories: [
      { id: 'k1', name: "2-szeres (k)", color: 'blue' },
      { id: 'k2', name: "4-szeres (k²)", color: 'amber' },
      { id: 'k3', name: "8-szoros (k³)", color: 'purple' }
    ],
    items: [
      { id: 'tss201', text: "az oldalhossz", categoryId: 'k1' },
      { id: 'tss202', text: "a kerület", categoryId: 'k1' },
      { id: 'tss203', text: "a magasság", categoryId: 'k1' },
      { id: 'tss204', text: "a testátló", categoryId: 'k1' },
      { id: 'tss205', text: "a kör sugara", categoryId: 'k1' },
      { id: 'tss206', text: "a gömb sugara", categoryId: 'k1' },
      { id: 'tss207', text: "a súlyvonal hossza", categoryId: 'k1' },
      { id: 'tss208', text: "a beírt kör sugara", categoryId: 'k1' },
      { id: 'tss209', text: "a kúp alkotója", categoryId: 'k1' },
      { id: 'tss210', text: "a terület", categoryId: 'k2' },
      { id: 'tss211', text: "a felszín", categoryId: 'k2' },
      { id: 'tss212', text: "a kör területe", categoryId: 'k2' },
      { id: 'tss213', text: "a gömb felszíne", categoryId: 'k2' },
      { id: 'tss214', text: "a palást területe", categoryId: 'k2' },
      { id: 'tss215', text: "egy lap területe", categoryId: 'k2' },
      { id: 'tss216', text: "a tengelymetszet területe", categoryId: 'k2' },
      { id: 'tss217', text: "a festékszükséglet (azonos rétegvastagságnál)", categoryId: 'k2' },
      { id: 'tss218', text: "a háló területe", categoryId: 'k2' },
      { id: 'tss219', text: "a térfogat", categoryId: 'k3' },
      { id: 'tss220', text: "a gömb térfogata", categoryId: 'k3' },
      { id: 'tss221', text: "a tömeg (azonos anyagból)", categoryId: 'k3' },
      { id: 'tss222', text: "a befogadóképesség (liter)", categoryId: 'k3' },
      { id: 'tss223', text: "a kocka térfogata", categoryId: 'k3' },
      { id: 'tss224', text: "a henger térfogata", categoryId: 'k3' },
      { id: 'tss225', text: "a kúp térfogata", categoryId: 'k3' },
      { id: 'tss226', text: "a betöltött víz mennyisége", categoryId: 'k3' },
      { id: 'tss227', text: "a felhasznált anyag térfogata", categoryId: 'k3' }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Melyik eszközzel?",
    description: "Melyik tétellel érdemes megoldani a feladatot?",
    categories: [
      { id: 'pit', name: "Pitagorasz-tétel", color: 'teal' },
      { id: 'trig', name: "szögfüggvények derékszögű háromszögben", color: 'blue' },
      { id: 'cos', name: "szinusz- vagy koszinusztétel", color: 'rose' }
    ],
    items: [
      { id: 'tss301', text: "derékszögű háromszög átfogója a befogókból", categoryId: 'pit' },
      { id: 'tss302', text: "a téglalap átlója", categoryId: 'pit' },
      { id: 'tss303', text: "a kocka testátlója", categoryId: 'pit' },
      { id: 'tss304', text: "gömb síkmetszetének sugara: ϱ² = R² − d²", categoryId: 'pit' },
      { id: 'tss305', text: "a függőhíd ívének sugara: (r − 120)² + 375² = r²", categoryId: 'pit' },
      { id: 'tss306', text: "egyenlő szárú háromszög magassága az oldalakból", categoryId: 'pit' },
      { id: 'tss307', text: "két pont távolsága a koordináta-rendszerben", categoryId: 'pit' },
      { id: 'tss308', text: "derékszögű-e a 10, 24, 26 cm-es háromszög?", categoryId: 'pit' },
      { id: 'tss309', text: "a kúp alkotója r-ből és M-ből", categoryId: 'pit' },
      { id: 'tss310', text: "a téglalap oldala az átló és az oldal szögéből", categoryId: 'trig' },
      { id: 'tss311', text: "a lejtő hajlásszöge a magasságból és a hosszból", categoryId: 'trig' },
      { id: 'tss312', text: "az egyenlő szárú háromszög szára az alapból és az alapszögből", categoryId: 'trig' },
      { id: 'tss313', text: "oldalél és alaplap hajlásszöge szabályos gúlában", categoryId: 'trig' },
      { id: 'tss314', text: "torony magassága a látószögből és a távolságból", categoryId: 'trig' },
      { id: 'tss315', text: "a DEG háromszög α szöge két befogóból (tg α)", categoryId: 'trig' },
      { id: 'tss316', text: "a magasság talppontjának távolsága (p = 6,2 · cos α)", categoryId: 'trig' },
      { id: 'tss317', text: "létra dőlésszöge", categoryId: 'trig' },
      { id: 'tss318', text: "a lépcső emelkedési szöge", categoryId: 'trig' },
      { id: 'tss319', text: "általános háromszög szöge a három oldalból", categoryId: 'cos' },
      { id: 'tss320', text: "a harmadik oldal két oldalból és a közbezárt szögből", categoryId: 'cos' },
      { id: 'tss321', text: "a paralelogramma oldala az átlókból és szögükből", categoryId: 'cos' },
      { id: 'tss322', text: "a PQR háromszög δ szöge β ismeretében", categoryId: 'cos' },
      { id: 'tss323', text: "két oldal aránya a szemközti szögekből", categoryId: 'cos' },
      { id: 'tss324', text: "a szabályos nyolcszög legrövidebb átlója", categoryId: 'cos' },
      { id: 'tss325', text: "háromszög oldala egy oldalból és két szögből", categoryId: 'cos' },
      { id: 'tss326', text: "két hajó távolsága, ha 120°-os szögben haladnak", categoryId: 'cos' },
      { id: 'tss327', text: "a köré írt kör sugara egy oldalból és a szemközti szögből", categoryId: 'cos' }
    ]
  }
};

export const TransformationsSolidsSummarySorter: React.FC<TransformationsSolidsSummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-sum-transzformaciok-sorter',
  topicTitle = "8. Transzformációk, síkbeli és térbeli alakzatok – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="transzformaciok-alakzatok"
      title={topicTitle}
      subtitle="Csoportosítsd a síkidomokat szimmetriájuk szerint, a mennyiségeket a hasonlósági arány szerint és a feladatokat a megoldó tétel szerint!"
      levels={TRANSFORMATIONS_SOLIDS_SUMMARY_SORTER_LEVELS}
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

export default TransformationsSolidsSummarySorter;

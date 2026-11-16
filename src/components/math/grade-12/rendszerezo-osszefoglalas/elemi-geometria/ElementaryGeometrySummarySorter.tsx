import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ElementaryGeometrySummarySorterProps {
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

const ELEMENTARY_GEOMETRY_SUMMARY_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Szögpárok kapcsolata",
    description: "Egyenlők, 180° vagy 90° az összegük?",
    categories: [
      { id: 'eq', name: "egyenlők", color: 'blue' },
      { id: 's180', name: "összegük 180°", color: 'emerald' },
      { id: 's90', name: "összegük 90°", color: 'amber' }
    ],
    items: [
      { id: 'egs101', text: "csúcsszögek", categoryId: 'eq' },
      { id: 'egs102', text: "váltószögek", categoryId: 'eq' },
      { id: 'egs103', text: "egyállású szögek", categoryId: 'eq' },
      { id: 'egs104', text: "a paralelogramma szemközti szögei", categoryId: 'eq' },
      { id: 'egs105', text: "a húrtrapéz alapon fekvő szögei", categoryId: 'eq' },
      { id: 'egs106', text: "az egyenlő szárú háromszög alapon fekvő szögei", categoryId: 'eq' },
      { id: 'egs107', text: "a deltoid két egyenlő szemközti szöge", categoryId: 'eq' },
      { id: 'egs108', text: "a szabályos háromszög két szöge", categoryId: 'eq' },
      { id: 'egs109', text: "a szabályos ötszög két szöge", categoryId: 'eq' },
      { id: 'egs110', text: "mellékszögek", categoryId: 's180' },
      { id: 'egs111', text: "kiegészítő szögek", categoryId: 's180' },
      { id: 'egs112', text: "a paralelogramma egy oldalon fekvő szögei", categoryId: 's180' },
      { id: 'egs113', text: "a trapéz egy száron fekvő szögei", categoryId: 's180' },
      { id: 'egs114', text: "egy belső szög és a mellette fekvő külső szög", categoryId: 's180' },
      { id: 'egs115', text: "két nem egyenlő merőleges szárú szög", categoryId: 's180' },
      { id: 'egs116', text: "38° és 142°", categoryId: 's180' },
      { id: 'egs117', text: "78,5° és 101,5°", categoryId: 's180' },
      { id: 'egs118', text: "a háromszög három belső szöge", categoryId: 's180' },
      { id: 'egs119', text: "pótszögek", categoryId: 's90' },
      { id: 'egs120', text: "a derékszögű háromszög két hegyesszöge", categoryId: 's90' },
      { id: 'egs121', text: "15° és 75°", categoryId: 's90' },
      { id: 'egs122', text: "25° és 65°", categoryId: 's90' },
      { id: 'egs123', text: "20° és 70°", categoryId: 's90' },
      { id: 'egs124', text: "a négyzet átlója által kettévágott derékszög két része", categoryId: 's90' },
      { id: 'egs125', text: "36° és 54°", categoryId: 's90' },
      { id: 'egs126', text: "30° és 60° (fél szabályos háromszög hegyesszögei)", categoryId: 's90' },
      { id: 'egs127', text: "12,5° és 77,5°", categoryId: 's90' }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Hol van a pont?",
    description: "A háromszög belsejében, határán vagy rajta kívül?",
    categories: [
      { id: 'in', name: "belső pont", color: 'emerald' },
      { id: 'on', name: "a háromszög határán", color: 'blue' },
      { id: 'out', name: "a háromszögön kívül", color: 'rose' }
    ],
    items: [
      { id: 'egs201', text: "a hegyesszögű háromszög köré írt körének középpontja", categoryId: 'in' },
      { id: 'egs202', text: "a hegyesszögű háromszög magasságpontja", categoryId: 'in' },
      { id: 'egs203', text: "a súlypont (bármely háromszögben)", categoryId: 'in' },
      { id: 'egs204', text: "a beírt kör középpontja", categoryId: 'in' },
      { id: 'egs205', text: "a szabályos háromszög magasságpontja", categoryId: 'in' },
      { id: 'egs206', text: "a tompaszögű háromszög súlypontja", categoryId: 'in' },
      { id: 'egs207', text: "a tompaszögű háromszög beírt körének középpontja", categoryId: 'in' },
      { id: 'egs208', text: "a derékszögű háromszög súlypontja", categoryId: 'in' },
      { id: 'egs209', text: "a derékszögű háromszög beírt körének középpontja", categoryId: 'in' },
      { id: 'egs210', text: "a derékszögű háromszög köré írt körének középpontja", categoryId: 'on' },
      { id: 'egs211', text: "a derékszögű háromszög magasságpontja", categoryId: 'on' },
      { id: 'egs212', text: "a súlyvonal oldalon lévő végpontja", categoryId: 'on' },
      { id: 'egs213', text: "a beírt kör érintési pontjai", categoryId: 'on' },
      { id: 'egs214', text: "a hegyesszögű háromszög magasságának talppontja", categoryId: 'on' },
      { id: 'egs215', text: "egy oldal felezőpontja", categoryId: 'on' },
      { id: 'egs216', text: "egy belső szögfelező és a szemközti oldal metszéspontja", categoryId: 'on' },
      { id: 'egs217', text: "a háromszög csúcsai", categoryId: 'on' },
      { id: 'egs218', text: "az egyenlő szárú derékszögű háromszög magasságpontja", categoryId: 'on' },
      { id: 'egs219', text: "a tompaszögű háromszög köré írt körének középpontja", categoryId: 'out' },
      { id: 'egs220', text: "a tompaszögű háromszög magasságpontja", categoryId: 'out' },
      { id: 'egs221', text: "a 120°-os szöget tartalmazó háromszög K pontja", categoryId: 'out' },
      { id: 'egs222', text: "a 100°, 50°, 30°-os háromszög magasságpontja", categoryId: 'out' },
      { id: 'egs223', text: "a 95°, 45°, 40°-os háromszög köré írt körének középpontja", categoryId: 'out' },
      { id: 'egs224', text: "két külső szögfelező metszéspontja", categoryId: 'out' },
      { id: 'egs225', text: "a 10°, 20°, 150°-os háromszög magasságpontja", categoryId: 'out' },
      { id: 'egs226', text: "a 3, 4, 6 cm oldalú háromszög köré írt körének középpontja", categoryId: 'out' },
      { id: 'egs227', text: "tompaszögű háromszögben a hegyesszögű csúcsból induló magasság talppontja", categoryId: 'out' }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Milyen négyszög?",
    description: "Paralelogramma, deltoid (de nem paralelogramma) vagy trapéz (de nem paralelogramma)?",
    categories: [
      { id: 'par', name: "paralelogramma", color: 'purple' },
      { id: 'del', name: "deltoid, de nem paralelogramma", color: 'teal' },
      { id: 'tra', name: "trapéz, de nem paralelogramma", color: 'amber' }
    ],
    items: [
      { id: 'egs301', text: "négyzet", categoryId: 'par' },
      { id: 'egs302', text: "rombusz", categoryId: 'par' },
      { id: 'egs303', text: "téglalap", categoryId: 'par' },
      { id: 'egs304', text: "4 cm és 6 cm oldalú téglalap", categoryId: 'par' },
      { id: 'egs305', text: "60°-os szögű rombusz", categoryId: 'par' },
      { id: 'egs306', text: "átlói felezik egymást", categoryId: 'par' },
      { id: 'egs307', text: "szemközti oldalai párhuzamosak", categoryId: 'par' },
      { id: 'egs308', text: "szemközti oldalai egyenlő hosszúak", categoryId: 'par' },
      { id: 'egs309', text: "középpontosan szimmetrikus négyszög", categoryId: 'par' },
      { id: 'egs310', text: "konkáv deltoid", categoryId: 'del' },
      { id: 'egs311', text: "papírsárkány alakú négyszög", categoryId: 'del' },
      { id: 'egs312', text: "AB = AD = 4 cm, CB = CD = 7 cm", categoryId: 'del' },
      { id: 'egs313', text: "két-két szomszédos oldala egyenlő, de nem rombusz", categoryId: 'del' },
      { id: 'egs314', text: "egyik átlójának egyenesére szimmetrikus, de nem rombusz", categoryId: 'del' },
      { id: 'egs315', text: "átlói merőlegesek, de csak az egyik felezi a másikat", categoryId: 'del' },
      { id: 'egs316', text: "AB = BC = 5 cm, CD = DA = 9 cm", categoryId: 'del' },
      { id: 'egs317', text: "oldalai 3, 3, 8, 8 cm, egyik átlója szimmetriatengely", categoryId: 'del' },
      { id: 'egs318', text: "szabályos háromszög és egy vele közös alapú, nem szabályos egyenlő szárú háromszög (konvex) egyesítése", categoryId: 'del' },
      { id: 'egs319', text: "húrtrapéz (nem téglalap)", categoryId: 'tra' },
      { id: 'egs320', text: "derékszögű trapéz", categoryId: 'tra' },
      { id: 'egs321', text: "alapjai 8 cm és 5 cm", categoryId: 'tra' },
      { id: 'egs322', text: "pontosan egy pár párhuzamos oldala van", categoryId: 'tra' },
      { id: 'egs323', text: "egyenlő szárú trapéz 60°-os alapon fekvő szögekkel", categoryId: 'tra' },
      { id: 'egs324', text: "szabályos háromszögből az alappal párhuzamos egyenessel levágott négyszög", categoryId: 'tra' },
      { id: 'egs325', text: "a szabályos hatszög fele egy főátló mentén", categoryId: 'tra' },
      { id: 'egs326', text: "trapéz, amelynek szárai 3 cm és 5 cm", categoryId: 'tra' },
      { id: 'egs327', text: "trapéz, amelynek egyik száron fekvő szögei 70° és 110°, a másikon 80° és 100°", categoryId: 'tra' }
    ]
  }
};

export const ElementaryGeometrySummarySorter: React.FC<ElementaryGeometrySummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-sum-elemi-geometria-sorter',
  topicTitle = "7. Elemi geometria – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="elemi-geometria"
      title={topicTitle}
      subtitle="Csoportosítsd a szögpárokat, a nevezetes pontokat és a négyszögeket!"
      levels={ELEMENTARY_GEOMETRY_SUMMARY_SORTER_LEVELS}
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

export default ElementaryGeometrySummarySorter;

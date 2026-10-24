import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GraphsSorterProps {
  level?: DifficultyLevel;
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
    title: '1. Szint: Gráfelemek és Alapvető Formák Csoportosítása',
    subtitle: 'Rendszerezd az alapfogalmakat, különleges csúcsokat és gráfcsaládokat!',
    categories: [
      {
        id: 'cat-elements',
        name: 'Gráfelemek és Alapfogalmak',
        description: 'A gráfot alkotó pontok, vonalak és alapvető viszonyok',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-special-nodes',
        name: 'Különleges Csúcstípusok',
        description: 'Fokszám alapján azonosított speciális csúcsok',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-families',
        name: 'Szabályos Gráfcsaládok',
        description: 'Karakterisztikus szerkezetű és formájú gráfok',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      { id: 'gs1-1', label: 'Csúcs (V): a gráf alapelemét jelentő pont', category: 'cat-elements' },
      { id: 'gs1-2', label: 'Él (E): két csúcsot összekötő szakasz/vonal', category: 'cat-elements' },
      { id: 'gs1-3', label: 'Fokszám (d(v)): a csúcsból kiinduló élek száma', category: 'cat-elements' },
      { id: 'gs1-4', label: 'Szomszédos csúcsok: közvetlen éllel kapcsolt pontok', category: 'cat-elements' },
      { id: 'gs1-5', label: 'Izolált csúcs: olyan csúcs, amelyhez egyetlen él sem fut be', category: 'cat-special-nodes' },
      { id: 'gs1-6', label: 'Levélcsúcs (függőcsúcs): csak egyetlen él végpontja', category: 'cat-special-nodes' },
      { id: 'gs1-7', label: 'Centrumcsúcs: a csillaggráf központi csúcsa', category: 'cat-special-nodes' },
      { id: 'gs1-8', label: 'Páratlan fokú csúcs: amelyből páratlan sok él indul ki', category: 'cat-special-nodes' },
      { id: 'gs1-9', label: 'Teljes gráf (Kₙ): bármely két csúcs össze van kötve', category: 'cat-families' },
      { id: 'gs1-10', label: 'Körgráf (Cₙ): egyetlen zárt kör mentén elhelyezkedő csúcsok', category: 'cat-families' },
      { id: 'gs1-11', label: 'Fa (Tₙ): összefüggő és körmentes egyszerű gráf', category: 'cat-families' },
      { id: 'gs1-12', label: 'Útgráf (Pₙ): csúcsok egymás után fűzött nyílt láncolata', category: 'cat-families' }
    ]
  },
  2: {
    title: '2. Szint: Fokszám-sorozatok Megvalósíthatósága',
    subtitle: 'Döntsd el, hogy a fokszámokból készíthető-e egyszerű gráf, vagy melyik szabályt sértik!',
    categories: [
      {
        id: 'cat-valid',
        name: 'Létező Egyszerű Gráf (Valid)',
        description: 'Euler-tétel és a maximális fokszám korlátja is teljesül',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-odd-sum',
        name: 'Lehetetlen: Fokszámösszeg Páratlan',
        description: 'A kézfogási lemma (Euler-tétel) miatt nem létezhet',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-degree-limit',
        name: 'Lehetetlen: Túl Nagy Fokszám / Kötöttségi Hiba',
        description: 'Egyszerű gráfban d ≤ n - 1, hurokél és többszörös él tilos',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'gs2-1', label: '(2, 2, 2, 2) fokszámok 4 csúcs esetén', category: 'cat-valid' },
      { id: 'gs2-2', label: '(3, 3, 2, 2, 2) fokszámok 5 csúcs esetén', category: 'cat-valid' },
      { id: 'gs2-3', label: '(1, 1, 1, 1) fokszámok 4 csúcs esetén', category: 'cat-valid' },
      { id: 'gs2-4', label: '(3, 2, 1, 0) fokszámok 4 csúcs esetén', category: 'cat-valid' },
      { id: 'gs2-5', label: '(3, 3, 3, 3, 3) fokszámok 5 csúcs esetén', category: 'cat-odd-sum' },
      { id: 'gs2-6', label: '(1, 1, 1) fokszámok 3 csúcs esetén', category: 'cat-odd-sum' },
      { id: 'gs2-7', label: '(3, 2, 2, 2) fokszámok 4 csúcs esetén', category: 'cat-odd-sum' },
      { id: 'gs2-8', label: '(5, 3, 2, 1, 0) fokszámok 5 csúcs esetén', category: 'cat-odd-sum' },
      { id: 'gs2-9', label: '(4, 2, 2, 2) fokszámok 4 csúcs esetén', category: 'cat-degree-limit' },
      { id: 'gs2-10', label: '(5, 1, 1, 1, 0) fokszámok 5 csúcs esetén', category: 'cat-degree-limit' },
      { id: 'gs2-11', label: '(6, 3, 2, 1) fokszámok 4 csúcs esetén', category: 'cat-degree-limit' },
      { id: 'gs2-12', label: '(3, 3, 3, 1) fokszámok 4 csúcs esetén', category: 'cat-degree-limit' }
    ]
  },
  3: {
    title: '3. Szint: Nevezetes Gráfok és Struktúrák Tulajdonságai',
    subtitle: 'Kategorizáld a gráfokat szerkezetük, élszámuk és reguláris viszonyaik alapján!',
    categories: [
      {
        id: 'cat-trees',
        name: 'Fák és Körmentes Gráfok',
        description: 'Összefüggő, körmentes láncok, csillagok és fák',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-regular',
        name: 'Körök és Reguláris Gráfok',
        description: 'Azonos fokszámú, szabályos szimmetrikus gráfok',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-dense',
        name: 'Sűrű és Teljes Gráfok',
        description: 'Maximális vagy magas élkapcsolatú gráfok',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'gs3-1', label: '7 csúcsú fa gráf', category: 'cat-trees' },
      { id: 'gs3-2', label: '5 csúcsú útgráf (P₅)', category: 'cat-trees' },
      { id: 'gs3-3', label: '6 csúcsú csillaggráf (S₆)', category: 'cat-trees' },
      { id: 'gs3-4', label: '10 csúcsú fa alakú számítógéphálózat', category: 'cat-trees' },
      { id: 'gs3-5', label: '6 csúcsú körgráf (C₆)', category: 'cat-regular' },
      { id: 'gs3-6', label: '8 csúcsú 3-reguláris gráf', category: 'cat-regular' },
      { id: 'gs3-7', label: 'Kockagráf (kocka csúcsai és élei)', category: 'cat-regular' },
      { id: 'gs3-8', label: '5 csúcsú körgráf (C₅)', category: 'cat-regular' },
      { id: 'gs3-9', label: 'K₅ teljes gráf', category: 'cat-dense' },
      { id: 'gs3-10', label: 'K₆ teljes gráf', category: 'cat-dense' },
      { id: 'gs3-11', label: 'K₃,₃ teljes páros gráf', category: 'cat-dense' },
      { id: 'gs3-12', label: '10 fős társaság összes kölcsönös kézfogása (K₁₀)', category: 'cat-dense' }
    ]
  }
};

export const GraphsSorter: React.FC<GraphsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId,
  topicTitle
}) => {
  return (
    <SorterTemplate
      level={level}
      levelConfigs={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId || 'g9-komb-grafok-sorter'}
      topicTitle={topicTitle || 'Gráfok Csoportosító'}
      themeColor="emerald"
    />
  );
};

export default GraphsSorter;

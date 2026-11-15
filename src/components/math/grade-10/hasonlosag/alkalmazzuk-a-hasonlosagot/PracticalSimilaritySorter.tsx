import React from 'react';
import { SorterTemplate, SorterLevelData } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PracticalSimilaritySorterProps {
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
  [key: string]: any;
}

const PRACTICAL_SIMILARITY_SORTER_LEVELS: SorterLevelData[] = [
  {
    level: 1,
    title: '1. szint: Közvetett mérési módszerek és eszközök',
    description: 'Csoportosítsd a mérési feladatokat a használt geometriai módszer szerint!',
    categories: [
      { id: 'shadow', name: 'Árnyékmódszer (Párhuzamos napsugarak)', color: 'amber' },
      { id: 'mirror', name: 'Tükörmódszer (Optikai visszaverődés)', color: 'blue' },
      { id: 'thales', name: 'Thálész-kitűzés (Terepi derékszögek)', color: 'emerald' }
    ],
    items: [
      { id: 'i1', text: 'Péter és a fa magasságának mérése napsütésben', categoryId: 'shadow' },
      { id: 'i2', text: 'Gízai piramisok magasságának meghatározása a sivatagban', categoryId: 'shadow' },
      { id: 'i3', text: 'Villanyoszlop magasságának meghatározása függőleges mérőléccel', categoryId: 'shadow' },
      { id: 'i4', text: 'Templomtorony csúcsának megpillantása a talajra fektetett tükörben', categoryId: 'mirror' },
      { id: 'i5', text: 'Vízfelületen megcsillanó épületcsúcs optikai bemérése', categoryId: 'mirror' },
      { id: 'i6', text: 'Utcai térkő tükröződésében látott közlekedési lámpa magasságának kiszámítása', categoryId: 'mirror' },
      { id: 'i7', text: 'Tengeren horgonyzó ellenséges hajó parttól mért távolsága', categoryId: 'thales' },
      { id: 'i8', text: 'Széles folyó túlpartján lévő tereptárgy távolsága átkelés nélkül', categoryId: 'thales' },
      { id: 'i9', text: 'Mocsár túlsó partján lévő fa távolságának meghatározása kitűzéssel', categoryId: 'thales' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Biológiai és fizikai skálázódás hatványkitevői',
    description: 'Csoportosítsd a testi és fizikai jellemzőket a lineáris mérettel (λ) való skálázódásuk szerint!',
    categories: [
      { id: 'linear', name: 'Lineáris mérettel arányos (λ¹)', color: 'blue' },
      { id: 'surface', name: 'Felülettel arányos (λ²)', color: 'emerald' },
      { id: 'volume', name: 'Térfogattal / tömeggel arányos (λ³)', color: 'purple' }
    ],
    items: [
      { id: 'i10', text: 'Állat testhossza, magassága és végtaghossza', categoryId: 'linear' },
      { id: 'i11', text: 'Lépéshossz és ugrási magasság geometriai mérete', categoryId: 'linear' },
      { id: 'i12', text: 'Izomrostok keresztmetszete és abszolút izomerő', categoryId: 'surface' },
      { id: 'i13', text: 'Bőrfelület nagysága és hőleadási felület', categoryId: 'surface' },
      { id: 'i14', text: 'Tüdő léghólyagocskáinak összesített légzőfelülete', categoryId: 'surface' },
      { id: 'i15', text: 'Testtömeg és testsúly azonos szövetsűrűség esetén', categoryId: 'volume' },
      { id: 'i16', text: 'A szervezet teljes vértérfogata és a szív lökettérfogata', categoryId: 'volume' },
      { id: 'i17', text: 'Napi tápanyagszükséglet tömegarányos része', categoryId: 'volume' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Állítások igazságtartalma hasonlóság alkalmazásakor',
    description: 'Döntsd el a geometriai feladatokról és módszerekről szóló állítások igazságtartalmát!',
    categories: [
      { id: 'always_true', name: 'Mindig igaz állítás', color: 'emerald' },
      { id: 'cond_true', name: 'Feltételesen igaz állítás', color: 'amber' },
      { id: 'false_stmt', name: 'Matematikai tévedés / hamis', color: 'rose' }
    ],
    items: [
      { id: 'i18', text: 'Ha két négyszög hasonló, akkor megfelelő belső szögeik egyenlők', categoryId: 'always_true' },
      { id: 'i19', text: 'Egy téglalap minden oldalából azonos sávot levonva a belső téglalap nem hasonló az eredetihez', categoryId: 'always_true' },
      { id: 'i20', text: 'Bármely két szabályos háromszög alakú közlekedési tábla hasonló egymáshoz', categoryId: 'always_true' },
      { id: 'i21', text: 'Két négyszög hasonló egymáshoz, ha minden megfelelő szögük egyenlő', categoryId: 'false_stmt' },
      { id: 'i22', text: 'A hangya relatív ereje azért óriási, mert az izomzata teljesen más alapanyagú, mint az emberé', categoryId: 'false_stmt' },
      { id: 'i23', text: 'Egy 1 : 20 000 térképen a valódi távolság a térképi távolság 20 000-ed része', categoryId: 'false_stmt' },
      { id: 'i24', text: 'Árnyékméréssel felhős, borús időben is pontosan mérhető egy fa magassága', categoryId: 'cond_true' },
      { id: 'i25', text: 'Folyópartról átkelés nélkül mérhető a folyó szélessége', categoryId: 'cond_true' },
      { id: 'i26', text: 'Két háromszög hasonló, ha szögeik egyenlők', categoryId: 'always_true' }
    ]
  }
];

export const PracticalSimilaritySorter: React.FC<PracticalSimilaritySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-hasonlosag',
  topicTitle = 'Alkalmazzuk a hasonlóságot! – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      topicId={topicId}
      subtopicId="alkalmazzuk-a-hasonlosagot"
      title={topicTitle}
      subtitle="Rendszerezd a mérési eljárásokat, a biológiai skálázás hatványait és a geometriai tényeket!"
      levels={PRACTICAL_SIMILARITY_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      {...rest}
    />
  );
};

export default PracticalSimilaritySorter;


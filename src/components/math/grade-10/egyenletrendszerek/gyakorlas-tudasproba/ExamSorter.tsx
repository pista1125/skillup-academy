import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ExamSorterProps {
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
    title: 'Megoldásszám és Geometriai Helyzet',
    subtitle: 'Sorold be az egyenletrendszereket a megoldások száma szerint!',
    categories: [
      {
        id: 'cat-exam-one',
        name: 'Pontosan 1 Megoldás',
        description: 'Metsző egyenesek, határozott egyértelmű (x; y) számpár',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-exam-none',
        name: 'Nincs Megoldás (∅)',
        description: 'Párhuzamos egyenesek, algebrai ellentmondás (0 = k, k ≠ 0)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-exam-infinite',
        name: 'Végtelen Sok Megoldás',
        description: 'Egybeeső egyenesek, algebrai azonosság (0 = 0)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // 1 megoldás
      { id: 'es1-1', label: '2x + y = 7  és  x − y = 2 ⟹ (3; 1)', category: 'cat-exam-one' },
      { id: 'es1-2', label: 'y = 2x − 2  és  x + y = 7 (két bolha metszéspontja: (3; 4))', category: 'cat-exam-one' },
      { id: 'es1-3', label: '3x + 2y = 12  és  x = 2 ⟹ (2; 3)', category: 'cat-exam-one' },
      { id: 'es1-4', label: '5x − 3y = 1  és  2x + y = 7 ⟹ (2; 3)', category: 'cat-exam-one' },

      // 0 megoldás
      { id: 'es1-5', label: '2x + 3y = 6  és  4x + 6y = 5 (0 = 7 ellentmondás)', category: 'cat-exam-none' },
      { id: 'es1-6', label: 'y = 3x + 1  és  y = 3x − 4 (párhuzamos egyenesek)', category: 'cat-exam-none' },
      { id: 'es1-7', label: 'x + y = 5  és  x + y = 9 (0 = 4 ellentmondás)', category: 'cat-exam-none' },
      { id: 'es1-8', label: 'x² + y² = 9  és  y = 5 (kitérő egyenes, D < 0)', category: 'cat-exam-none' },

      // Végtelen sok
      { id: 'es1-9', label: '2x + 3y = 6  és  4x + 6y = 12 (azonosság: 0 = 0)', category: 'cat-exam-infinite' },
      { id: 'es1-10', label: 'x − y = 4  és  3x − 3y = 12 (II = 3 · I)', category: 'cat-exam-infinite' },
      { id: 'es1-11', label: 'y = 2x − 1  és  4x − 2y = 2 (egybeeső egyenesek)', category: 'cat-exam-infinite' },
      { id: 'es1-12', label: 'x/2 + y/3 = 1  és  3x + 2y = 6 (ugyanaz az egyenes)', category: 'cat-exam-infinite' }
    ]
  },
  2: {
    title: 'Egyenletrendszer Típusok és Módszerek',
    subtitle: 'Rendszerezd az egyenletrendszereket a matematikai struktúrájuk szerint!',
    categories: [
      {
        id: 'cat-type-linear2',
        name: 'Kétismeretlenes Lineáris',
        description: 'Standard elsőfokú 2x2 rendszer (behelyettesítés/elimináció)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-type-linear3',
        name: 'Háromismeretlenes Rendszer',
        description: 'Három változó (x, y, z), lépcsős Gauss-kiküszöbölés',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-type-nonlinear',
        name: 'Másodfokú / Törtes Rendszer',
        description: 'Másodfokú tag (kör, parabola, szorzat) vagy törtes segédváltozó (1/x)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Lineáris 2x2
      { id: 'es2-1', label: '7x + 4y = −10  és  8y − 9x = 210', category: 'cat-type-linear2' },
      { id: 'es2-2', label: '1,5x + y = 850  és  x + 1,25y = 800 (nagymama piaca)', category: 'cat-type-linear2' },
      { id: 'es2-3', label: '3a + 14sz = 99 000  és  2,4a + 9,33sz = 70 800 (bútor)', category: 'cat-type-linear2' },
      { id: 'es2-4', label: '5x + 4y = 380  és  2x + 3y = 222 (erdőgazdaság)', category: 'cat-type-linear2' },

      // 3x3
      { id: 'es2-5', label: 'x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2', category: 'cat-type-linear3' },
      { id: 'es2-6', label: 'x + y = 7, y + z = 9, z + x = 8 (ciklikus szimmetria)', category: 'cat-type-linear3' },
      { id: 'es2-7', label: 'a + b + c = 180, b = 2a, c = 3a (háromszög)', category: 'cat-type-linear3' },
      { id: 'es2-8', label: '2x + y − z = 1, x − y + z = 2, 3x + 2y + z = 10', category: 'cat-type-linear3' },

      // Nemlineáris / Törtes
      { id: 'es2-9', label: 'y = x²  és  y = x + 2 (parabola és szelő)', category: 'cat-type-nonlinear' },
      { id: 'es2-10', label: 'x² + y² = 25  és  y = x + 1 (kör és szelő)', category: 'cat-type-nonlinear' },
      { id: 'es2-11', label: '1/x + 1/y = 5  és  2/x − 1/y = 1 (segédváltozós 1/x)', category: 'cat-type-nonlinear' },
      { id: 'es2-12', label: 'x + y = 14  és  x · y = 45 (Viète-szimmetrikus másodfokú)', category: 'cat-type-nonlinear' }
    ]
  },
  3: {
    title: 'Szöveges Modellezési Területek',
    subtitle: 'Milyen gyakorlati területhez tartozik a feladat matematikai modellje?',
    categories: [
      {
        id: 'cat-app-motion',
        name: 'Mozgás és Sebesség (s = v · t)',
        description: 'Járművek, autós túra lejtőn/emelkedőn, körpályás lovasok, bolhák',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-app-commerce',
        name: 'Pénz, Vásárlás és Keverés',
        description: 'Büfé, piac, kávékeverék, 120 ezüst, banki kamat, biobolt',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-app-work-geometry',
        name: 'Munka, Terület és Parcellák',
        description: 'Két üzem gyártása, zenekari plakátok, székek és fordulók, erdő',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Mozgás
      { id: 'es3-1', label: 'Kisbusz, autó és teherautó menetideje és sebessége', category: 'cat-app-motion' },
      { id: 'es3-2', label: 'Két bolha ugrása a rácson: (0; −2)-ből és x + y = 7 vonalon', category: 'cat-app-motion' },
      { id: 'es3-3', label: '3000 m-es körpályán szembe és egy irányba induló lovasok', category: 'cat-app-motion' },
      { id: 'es3-4', label: 'Autós kirándulás 60 km/h emelkedőn és 120 km/h lejtőn', category: 'cat-app-motion' },

      // Pénz / Keverés
      { id: 'es3-5', label: 'Péter és Pál szendvics és ásványvíz vásárlása a büfében', category: 'cat-app-commerce' },
      { id: 'es3-6', label: 'Nagymama paradicsom és paprika vásárlása a piacon', category: 'cat-app-commerce' },
      { id: 'es3-7', label: 'Kétféle alkohol (20% és 30%) keverése 22%-osra', category: 'cat-app-commerce' },
      { id: 'es3-8', label: 'Két ember 120 ezüstös árujának közös kifizetése', category: 'cat-app-commerce' },

      // Munka / Terület
      { id: 'es3-9', label: 'Két üzem 480 alkatrész elkészítése 20 nap alatt', category: 'cat-app-work-geometry' },
      { id: 'es3-10', label: 'Három zenekar azonos 240 dm² területű óriásplakátja', category: 'cat-app-work-geometry' },
      { id: 'es3-11', label: 'Erdőgazdaság: Fenyő, tölgy és platán téglalap-parcellái', category: 'cat-app-work-geometry' },
      { id: 'es3-12', label: 'Székek átvitele: fordulónkénti darabszám és fordulók száma', category: 'cat-app-work-geometry' }
    ]
  }
};

export const ExamSorter: React.FC<ExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-egyenletrendszerek',
  topicTitle = '5. Gyakorlás, tudáspróba (Fejezeti záróteszt)'
}) => {
  const activeLvl = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <SorterTemplate
      title="5. Tudáspróba – Csoportosító Játék"
      subtitle="Csoportosítsd a feladatokat és rendszereket típusuk, megoldásszámuk és modelljük szerint!"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 11. LECKE"
      levels={sorterLevels}
      currentLevel={activeLvl}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};


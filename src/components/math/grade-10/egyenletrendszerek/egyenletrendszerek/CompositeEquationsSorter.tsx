import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CompositeEquationsSorterProps {
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
    title: 'Egyenletrendszerek Típusai és Struktúrája',
    subtitle: 'Sorold be a rendszereket a matematikai szerkezetük alapján!',
    categories: [
      {
        id: 'cat-3linear',
        name: 'Háromismeretlenes Lineáris',
        description: 'Három változó (x, y, z), lépcsős Gauss-eliminációval oldható meg',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-quadratic',
        name: 'Másodfokú Egyenletrendszer',
        description: 'Másodfokú tagot (x², y², xy) tartalmaz, görbe és egyenes metszése',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-word-model',
        name: 'Alkalmazott Szöveges Modell',
        description: 'Valós életbeli folyamat leírása (keverék, székek, mozgás, akció)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // 3-ismeretlenes
      { id: 'ces1-1', label: 'x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2', category: 'cat-3linear' },
      { id: 'ces1-2', label: 'x + y = 5, y + z = 7, x + z = 6 (ciklikus szimmetria)', category: 'cat-3linear' },
      { id: 'ces1-3', label: 'a + b + c = 180, b = 2a, c = 3a (háromszög szögei)', category: 'cat-3linear' },
      { id: 'ces1-4', label: '2x − y + 3z = 10, x + 4y − z = 5, 3x + y + 2z = 11', category: 'cat-3linear' },

      // Másodfokú
      { id: 'ces1-5', label: 'y = x²  és  y = x + 2 (parabola és szelő)', category: 'cat-quadratic' },
      { id: 'ces1-6', label: 'x² + y² = 25  és  x + y = 7 (kör és egyenes)', category: 'cat-quadratic' },
      { id: 'ces1-7', label: 'x + y = 14  és  x · y = 45 (szimmetrikus Viète-rendszer)', category: 'cat-quadratic' },
      { id: 'ces1-8', label: 'x² − y² = 72  és  x − y = 4 (két négyzet területe)', category: 'cat-quadratic' },

      // Szöveges modell
      { id: 'ces1-9', label: 'Székek és fordulók száma a díszteremben (x szék, y forduló)', category: 'cat-word-model' },
      { id: 'ces1-10', label: 'Kétféle kávé keverése: 3000 és 4000 Ft/kg-os fajtákból', category: 'cat-word-model' },
      { id: 'ces1-11', label: 'Mosógép energiafogyasztása melegítéskor és egyéb ciklusban', category: 'cat-word-model' },
      { id: 'ces1-12', label: 'Autós túra hegynek fel, völgybe le és sík terepen oda-vissza', category: 'cat-word-model' }
    ]
  },
  2: {
    title: 'Másodfokú Rendszerek Megoldásszáma',
    subtitle: 'Hány valós számpár teszi igazzá a rendszert a diszkrimináns alapján?',
    categories: [
      {
        id: 'cat-two-points',
        name: '2 Megoldáspár (Szelő, D > 0)',
        description: 'A kapott másodfokú egyenletnek két különböző valós gyöke van',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-one-point',
        name: '1 Megoldáspár (Érintő, D = 0)',
        description: 'A kapott másodfokú egyenletnek egyetlen kétszeres valós gyöke van',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-no-points',
        name: '0 Megoldás (Kitérő, D < 0)',
        description: 'Nincs valós közös pont, a diszkrimináns negatív (üres halmaz ∅)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // 2 megoldás
      { id: 'ces2-1', label: 'y = x²  és  y = x + 2 ⟹ x² − x − 2 = 0 (D = 9 > 0)', category: 'cat-two-points' },
      { id: 'ces2-2', label: 'x² + y² = 25  és  y = 3 ⟹ x = ±4', category: 'cat-two-points' },
      { id: 'ces2-3', label: 'x + y = 10  és  xy = 21 ⟹ u² − 10u + 21 = 0 (D = 16)', category: 'cat-two-points' },
      { id: 'ces2-4', label: 'y = x² − 4  és  y = 0 ⟹ x = ±2', category: 'cat-two-points' },

      // 1 megoldás
      { id: 'ces2-5', label: 'y = x² + 1  és  y = 2x ⟹ x² − 2x + 1 = 0 (D = 0, x = 1)', category: 'cat-one-point' },
      { id: 'ces2-6', label: 'x² + y² = 16  és  y = 4 ⟹ x = 0 egyetlen pont: (0; 4)', category: 'cat-one-point' },
      { id: 'ces2-7', label: 'x + y = 6  és  xy = 9 ⟹ u² − 6u + 9 = 0 (u = 3)', category: 'cat-one-point' },
      { id: 'ces2-8', label: 'y = −x²  és  y = 0 ⟹ x = 0 origó érintési pont', category: 'cat-one-point' },

      // 0 megoldás
      { id: 'ces2-9', label: 'x² + y² = 9  és  y = 5 ⟹ x² = −16 (lehetetlen a valósakban)', category: 'cat-no-points' },
      { id: 'ces2-10', label: 'y = x² + 3  és  y = x ⟹ x² − x + 3 = 0 (D = −11 < 0)', category: 'cat-no-points' },
      { id: 'ces2-11', label: 'x + y = 2  és  xy = 5 ⟹ u² − 2u + 5 = 0 (D = −16 < 0)', category: 'cat-no-points' },
      { id: 'ces2-12', label: 'x² + y² = 1  és  x + y = 3 ⟹ nincs közös pont', category: 'cat-no-points' }
    ]
  },
  3: {
    title: 'Szöveges Modellezési Stratégiák',
    subtitle: 'Milyen alapvető matematikai modellt kell felállítani a feladat szövege alapján?',
    categories: [
      {
        id: 'cat-mixture-strategy',
        name: 'Kétirányú Mérlegmodell (Tömeg + Érték)',
        description: 'Keverések, ötvözetek, százalékos engedmények és tiszta hatóanyagok',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-inverse-strategy',
        name: 'Inverz Szorzatmodell (xy kiesés)',
        description: 'Székek és fordulók, munkások és munkanapok, darabszám és egységár',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-motion-strategy',
        name: 'Többszakaszos Mozgásmodell (s = v · t)',
        description: 'Emelkedők, lejtők és sík utak felcserélődése oda-vissza úton',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      }
    ],
    items: [
      // Keverési mérleg
      { id: 'ces3-1', label: 'Kávé nagykerek: 3000 és 4000 Ft-osból 17,5 kg keverék', category: 'cat-mixture-strategy' },
      { id: 'ces3-2', label: '20%-os és 50%-os savoldat összeöntése 30%-osra', category: 'cat-mixture-strategy' },
      { id: 'ces3-3', label: 'Boltvezető akciója: 20% tej engedmény és 75 Ft tejföl engedmény', category: 'cat-mixture-strategy' },
      { id: 'ces3-4', label: 'Aranyötvözet: 14 karátos és 18 karátos arany egybeolvasztása', category: 'cat-mixture-strategy' },

      // Inverz szorzatmodell
      { id: 'ces3-5', label: 'Székek átvitele: 1-gyel több szék ⟹ 2-vel kevesebb forduló', category: 'cat-inverse-strategy' },
      { id: 'ces3-6', label: 'Kirándulás költsége: 3 fővel több utas ⟹ fejenként 500 Ft-tal kevesebb', category: 'cat-inverse-strategy' },
      { id: 'ces3-7', label: 'Könyv olvasása: napi 5 oldallal több ⟹ 4 nappal korábbi befejezés', category: 'cat-inverse-strategy' },
      { id: 'ces3-8', label: 'Árokásás: 2 munkással több ⟹ 3 nappal rövidebb munkaidő', category: 'cat-inverse-strategy' },

      // Mozgásmodell
      { id: 'ces3-9', label: 'Autós kirándulás 60 km/h emelkedőn és 120 km/h lejtőn oda-vissza', category: 'cat-motion-strategy' },
      { id: 'ces3-10', label: 'Folyón lefelé (v_h + v_f) és felfelé (v_h − v_f) evező csónak', category: 'cat-motion-strategy' },
      { id: 'ces3-11', label: 'Két kerékpáros találkozása eltérő sebességgel és indulási idővel', category: 'cat-motion-strategy' },
      { id: 'ces3-12', label: 'Sétáló mozgólépcső: állva 60 s, lépcsőzve 20 s alatt ér fel', category: 'cat-motion-strategy' }
    ]
  }
};

export const CompositeEquationsSorter: React.FC<CompositeEquationsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-egyenletrendszerek',
  topicTitle = '3. Egyenletrendszerek (Összetett és szöveges feladatok)'
}) => {
  const activeLvl = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <SorterTemplate
      title="3. Egyenletrendszerek – Csoportosító Játék"
      subtitle="Csoportosítsd a rendszereket típusuk, megoldásszámuk és modellezési stratégiájuk szerint!"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 9. LECKE"
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


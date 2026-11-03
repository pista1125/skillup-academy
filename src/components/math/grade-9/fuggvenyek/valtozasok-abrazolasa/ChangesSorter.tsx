import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ChangesSorterProps {
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
    title: '1. Szint: Pontok Besorolása Síknegyedek Szerint',
    subtitle: 'Sorold be a koordinátákkal megadott pontokat a megfelelő síknegyedbe!',
    categories: [
      {
        id: 'cat-q1',
        name: 'I. Síknegyed (+; +)',
        description: 'x > 0 és y > 0',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-q2',
        name: 'II. Síknegyed (-; +)',
        description: 'x < 0 és y > 0',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-q3',
        name: 'III. Síknegyed (-; -)',
        description: 'x < 0 és y < 0',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-q4',
        name: 'IV. Síknegyed (+; -)',
        description: 'x > 0 és y < 0',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // I. negyed
      { id: 'cs1-1', label: 'P(3; 8)', category: 'cat-q1' },
      { id: 'cs1-2', label: 'A(12; 4)', category: 'cat-q1' },
      { id: 'cs1-3', label: 'M(1; 1)', category: 'cat-q1' },
      // II. negyed
      { id: 'cs1-4', label: 'Q(-5; 6)', category: 'cat-q2' },
      { id: 'cs1-5', label: 'B(-2; 15)', category: 'cat-q2' },
      { id: 'cs1-6', label: 'N(-9; 3)', category: 'cat-q2' },
      // III. negyed
      { id: 'cs1-7', label: 'R(-4; -7)', category: 'cat-q3' },
      { id: 'cs1-8', label: 'C(-10; -1)', category: 'cat-q3' },
      { id: 'cs1-9', label: 'K(-2; -2)', category: 'cat-q3' },
      // IV. negyed
      { id: 'cs1-10', label: 'S(8; -3)', category: 'cat-q4' },
      { id: 'cs1-11', label: 'D(15; -6)', category: 'cat-q4' },
      { id: 'cs1-12', label: 'L(4; -9)', category: 'cat-q4' }
    ]
  },
  2: {
    title: '2. Szint: Folyamatszakaszok Osztályozása',
    subtitle: 'Sorold be a fizikai és mindennapi állapotokat a görbe jellege szerint!',
    categories: [
      {
        id: 'cat-inc',
        name: 'Növekvő Szakasz (m > 0)',
        description: 'A vizsgált mennyiség növekszik az idővel',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-const',
        name: 'Állandó / Vízszintes (m = 0)',
        description: 'Változatlan érték, nincs elmozdulás',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-dec',
        name: 'Csökkenő Szakasz (m < 0)',
        description: 'A vizsgált mennyiség fogyatkozik az idővel',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Növekvő
      { id: 'cs2-1', label: 'Felfelé mászás a hegycsúcsra', category: 'cat-inc' },
      { id: 'cs2-2', label: 'Vízforralóban melegedő víz hőmérséklete', category: 'cat-inc' },
      { id: 'cs2-3', label: 'Töltőre dugott telefon akkumulátora', category: 'cat-inc' },
      { id: 'cs2-4', label: 'Gyorsuló gépkocsi sebessége', category: 'cat-inc' },
      // Állandó
      { id: 'cs2-5', label: 'Piros lámpánál várakozó autó távolsága', category: 'cat-const' },
      { id: 'cs2-6', label: 'Padon ülő gyalogos út-idő grafikonja', category: 'cat-const' },
      { id: 'cs2-7', label: 'Termosztát által tartott szobahőmérséklet', category: 'cat-const' },
      { id: 'cs2-8', label: 'Álló folyadékszint elzárt csap mellett', category: 'cat-const' },
      // Csökkenő
      { id: 'cs2-9', label: 'Asztalra tett forró kávé hűlése', category: 'cat-dec' },
      { id: 'cs2-10', label: 'Lyukas vödörből szivárgó vízmennyiség', category: 'cat-dec' },
      { id: 'cs2-11', label: 'Fékező autó sebesség-idő értéke', category: 'cat-dec' },
      { id: 'cs2-12', label: 'Hegyoldalon lefelé ereszkedő túrázó tengerszint feletti magassága', category: 'cat-dec' }
    ]
  },
  3: {
    title: '3. Szint: Folyamatok Dinamikája és Meredeksége',
    subtitle: 'Kategorizáld a folyamatokat dinamikájuk és meredekségük változása alapján!',
    categories: [
      {
        id: 'cat-lin',
        name: 'Egyenletes (Lineáris, m = konstans)',
        description: 'Egységnyi idő alatt mindig azonos mértékű változás',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-acc',
        name: 'Gyorsuló (Konvex, meredekség nő)',
        description: 'Egyre meredekebb görbe, növekvő változási ütem',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-dec-rate',
        name: 'Lassuló (Konkáv, meredekség csökken)',
        description: 'Fokozatosan ellaposodó görbe, csillapodó változás',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    ],
    items: [
      // Egyenletes
      { id: 'cs3-1', label: 'Tempomattal haladó autó megtett útja', category: 'cat-lin' },
      { id: 'cs3-2', label: 'Egyenes hengerbe egyenletesen folyó víz magassága', category: 'cat-lin' },
      { id: 'cs3-3', label: 'Egyenes arányosság grafikonja (y = kx)', category: 'cat-lin' },
      { id: 'cs3-4', label: 'Állandó sebességű gyaloglás út-idő képe', category: 'cat-lin' },
      // Gyorsuló
      { id: 'cs3-5', label: 'Szabadesés út-idő parabolája (s = 5t²)', category: 'cat-acc' },
      { id: 'cs3-6', label: 'Korlátlan baktériumszaporodás exponenciális íve', category: 'cat-acc' },
      { id: 'cs3-7', label: 'Felfelé szűkülő lombik töltése', category: 'cat-acc' },
      { id: 'cs3-8', label: 'Álló helyzetből padlógázzal induló sportkocsi útja', category: 'cat-acc' },
      // Lassuló
      { id: 'cs3-9', label: 'Szobahőmérsékletre hűlő forró tea hőmérséklet-görbéje', category: 'cat-dec-rate' },
      { id: 'cs3-10', label: 'Felfelé szélesedő kehely töltése', category: 'cat-dec-rate' },
      { id: 'cs3-11', label: 'Fékezéskor a megállásig tartó sebességcsökkenés', category: 'cat-dec-rate' },
      { id: 'cs3-12', label: 'Szivárgó tartály, ahol a nyomás csökkenésével lassul a kifolyás', category: 'cat-dec-rate' }
    ]
  }
};

export const ChangesSorter: React.FC<ChangesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-func-valtozasok-sorter',
  topicTitle = '3. Változások ábrázolása'
}) => {
  return (
    <SorterTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      grade={9}
      chapterId="fuggvenyek"
      topicId={topicId}
      topicTitle={topicTitle}
      badge="9. Osztály • V. Függvények"
      levelConfigs={sorterLevels}
    />
  );
};


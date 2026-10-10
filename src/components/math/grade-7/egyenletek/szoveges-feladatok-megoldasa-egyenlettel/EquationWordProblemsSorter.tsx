import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EquationWordProblemsSorterProps {
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
    title: '1. Szint: Szöveges Feladattípusok Felismerése',
    subtitle: 'Milyen matematikai modellcsoportba tartozik az adott szöveges feladat?',
    instruction: 'Csoportosítsd a feladatokat a felállítási logikájuk szerint!',
    categories: [
      {
        id: 'c1',
        title: 'Számelméleti és összegzési',
        description: 'Számok összege, egymást követő egész számok, arányok'
      },
      {
        id: 'c2',
        title: 'Életkoros problémák',
        description: 'Idő múlása, szülő-gyermek életkorának viszonya'
      },
      {
        id: 'c3',
        title: 'Átrakásos és kétcsoportos',
        description: 'Két polc, doboz vagy személy közötti tárgy- vagy pénzmozgás'
      },
      {
        id: 'c4',
        title: 'Geometriai szöveges',
        description: 'Oldalhosszak, kerület (K) és terület (T) összefüggései'
      }
    ],
    items: [
      { id: 'i1', text: 'Három egymást követő páratlan szám összege 87.', categoryId: 'c1' },
      { id: 'i2', text: 'Egy szám 4-szeresénél 15-tel nagyobb a 75.', categoryId: 'c1' },
      { id: 'i3', text: 'Két szám aránya 3 : 7, összegük 120.', categoryId: 'c1' },
      { id: 'i4', text: 'Apa 38 éves, fia 10 éves, mikor lesz háromszorosa?', categoryId: 'c2' },
      { id: 'i5', text: 'Anya és lánya életkorának összege most 54 év.', categoryId: 'c2' },
      { id: 'i6', text: 'Hány év múlva lesz a három testvér együttes kora 60 év?', categoryId: 'c2' },
      { id: 'i7', text: 'Két polcon 90 könyv van; felsőről 10-et alsóra teszünk.', categoryId: 'c3' },
      { id: 'i8', text: 'Két dobozban 150 golyó van; egyikben kétszer annyi, mint a másikban.', categoryId: 'c3' },
      { id: 'i9', text: 'Zoli átadott 500 Ft-ot Bélának, így egyenlő lett a pénzük.', categoryId: 'c3' },
      { id: 'i10', text: 'Egy téglalap kerülete 48 cm, egyik oldala 4 cm-rel hosszabb.', categoryId: 'c4' },
      { id: 'i11', text: 'Egyenlő szárú háromszög alapja 6 cm-rel rövidebb a száránál.', categoryId: 'c4' },
      { id: 'i12', text: 'Téglalap szomszédos oldalainak aránya 2 : 5, K = 70 cm.', categoryId: 'c4' }
    ]
  },
  2: {
    title: '2. Szint: Mi a Legcélszerűbb Ismeretlen (x)?',
    subtitle: 'Milyen adatot érdemes x-nek választani a leggyorsabb és legegyszerűbb egyenlethez?',
    instruction: 'Csoportosítsd a feladatokat az ismeretlen optimális megválasztása szerint!',
    categories: [
      {
        id: 'c1',
        title: 'A legkisebb mennyiség vagy alapadat',
        description: 'Legfiatalabb testvér kora, rövidebb oldal, kisebbik szám'
      },
      {
        id: 'c2',
        title: 'Az eltelt vagy megelőző évek száma',
        description: 'Hány év múlva / hány évvel ezelőtt teljesül az arány'
      },
      {
        id: 'c3',
        title: 'Egyetlen rész értéke (Arányos osztás)',
        description: 'Aránypárok közös többszöröse (pl. 2x, 3x, 5x tagok)'
      }
    ],
    items: [
      { id: 'i13', text: 'Legfiatalabb testvér kora 3 különböző korú testvérnél', categoryId: 'c1' },
      { id: 'i14', text: 'Téglalap rövidebb oldala, ha a hosszabb 6 cm-rel több', categoryId: 'c1' },
      { id: 'i15', text: 'A kisebbik szám, ha a nagyobbik szám 3-szor akkora', categoryId: 'c1' },
      { id: 'i16', text: 'Kisebb polcon lévő könyvek száma, ha a másikon dupla annyi van', categoryId: 'c1' },
      { id: 'i17', text: 'Hány év múlva lesz a nagymama 4-szer olyan idős, mint az unokája', categoryId: 'c2' },
      { id: 'i18', text: 'Hány évvel ezelőtt volt az apa életkora a fia korának 5-szöröse', categoryId: 'c2' },
      { id: 'i19', text: 'Hány év múlva éri el a 3 gyermek együttes kora a 45 évet', categoryId: 'c2' },
      { id: 'i20', text: 'Hány év múlva lesz az anya kétszer annyi idős, mint a lánya', categoryId: 'c2' },
      { id: 'i21', text: '1 rész értéke, ha két szám aránya 3 : 5', categoryId: 'c3' },
      { id: 'i22', text: '1 rész értéke, ha egy kötél darabjainak aránya 2 : 3 : 7', categoryId: 'c3' },
      { id: 'i23', text: '1 rész értéke, ha egy háromszög szögeinek aránya 2 : 3 : 4', categoryId: 'c3' },
      { id: 'i24', text: '1 rész értéke 150 000 Ft 1 : 2 : 3 arányú szétosztásakor', categoryId: 'c3' }
    ]
  },
  3: {
    title: '3. Szint: Értelmezési Tartomány és Reális Megoldhatóság',
    subtitle: 'Milyen számhalmazban kell lennie a kapott gyöknek a valóságban?',
    instruction: 'Sorold be a feladatokat a megoldás valósághű feltételei szerint!',
    categories: [
      {
        id: 'c1',
        title: 'Pozitív egész szám (x ∈ N+)',
        description: 'Személyek száma, életkor, darabszám, tárgyak'
      },
      {
        id: 'c2',
        title: 'Pozitív racionális szám (x ∈ Q+)',
        description: 'Pénzösszeg, tömeg (kg), hosszúság (cm), űrtartalom'
      },
      {
        id: 'c3',
        title: 'Nincs valós megoldás (M = ∅)',
        description: 'Negatív életkor, törtdarab személy vagy ellentmondás'
      }
    ],
    items: [
      { id: 'i25', text: 'Hány tanuló jár az osztályba?', categoryId: 'c1' },
      { id: 'i26', text: 'Hány éves ma Kovács úr?', categoryId: 'c1' },
      { id: 'i27', text: 'Hány darab könyv van a polcon?', categoryId: 'c1' },
      { id: 'i28', text: 'Hány darab 50 Ft-os érme van a perselyben?', categoryId: 'c1' },
      { id: 'i29', text: 'Mennyibe került egy kiló alma a piacon?', categoryId: 'c2' },
      { id: 'i30', text: 'Mekkora a téglalap oldala centiméterben?', categoryId: 'c2' },
      { id: 'i31', text: 'Hány liter víz van a tartályban?', categoryId: 'c2' },
      { id: 'i32', text: 'Mennyi Zoli zsebpénze forintban?', categoryId: 'c2' },
      { id: 'i33', text: '3 testvér életkora, ahol az egyenletből x = -5 jön ki', categoryId: 'c3' },
      { id: 'i34', text: 'Autók száma a parkolóban, ahol x = 14,2 jön ki', categoryId: 'c3' },
      { id: 'i35', text: 'Személyek száma, ahol az egyenlet 0x = 8-ra egyszerűsödik', categoryId: 'c3' },
      { id: 'i36', text: 'Életkor, ahol a kiszámított jövőbeli kor kisebb a jelenleginél', categoryId: 'c3' }
    ]
  }
};

export const EquationWordProblemsSorter: React.FC<EquationWordProblemsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-eq-word-sorter',
  topicTitle = '4. Szöveges feladatok megoldása egyenlettel'
}) => {
  const activeLvl = (currentLevel ?? level) as DifficultyLevel;

  return (
    <SorterTemplate
      level={activeLvl}
      currentLevel={activeLvl}
      levels={sorterLevels}
      levelConfigs={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="amber"
    />
  );
};

export default EquationWordProblemsSorter;

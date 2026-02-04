import { Topic } from '@/types/education';

export const mathTopics: Record<number, Topic[]> = {
  1: [
    {
      id: 'addition-basic',
      title: 'Összeadás 10-ig',
      description: 'Alapvető összeadás kis számokkal',
      icon: '➕',
      lessons: [
        { id: 'add-10-intro', title: 'Bevezetés', type: 'theory' },
        { id: 'add-10-practice', title: 'Gyakorlás', type: 'practice' },
        { id: 'add-10-quiz', title: 'Teszt', type: 'quiz' },
      ],
    },
    {
      id: 'subtraction-basic',
      title: 'Kivonás 10-ig',
      description: 'Alapvető kivonás kis számokkal',
      icon: '➖',
      lessons: [
        { id: 'sub-10-intro', title: 'Bevezetés', type: 'theory' },
        { id: 'sub-10-practice', title: 'Gyakorlás', type: 'practice' },
        { id: 'sub-10-quiz', title: 'Teszt', type: 'quiz' },
      ],
    },
  ],
  2: [
    {
      id: 'addition-20',
      title: 'Összeadás 20-ig',
      description: 'Összeadás nagyobb számokkal',
      icon: '➕',
      lessons: [
        { id: 'add-20-intro', title: 'Bevezetés', type: 'theory' },
        { id: 'add-20-practice', title: 'Gyakorlás', type: 'practice' },
        { id: 'add-20-quiz', title: 'Teszt', type: 'quiz' },
      ],
    },
    {
      id: 'multiplication-intro',
      title: 'Szorzás alapjai',
      description: 'Ismerkedés a szorzással',
      icon: '✖️',
      lessons: [
        { id: 'mult-intro', title: 'Mi a szorzás?', type: 'theory' },
        { id: 'mult-2', title: '2-es szorzótábla', type: 'practice' },
        { id: 'mult-quiz', title: 'Teszt', type: 'quiz' },
      ],
    },
  ],
  3: [
    {
      id: 'multiplication-tables',
      title: 'Szorzótábla',
      description: '1-10-ig terjedő szorzótábla',
      icon: '✖️',
      lessons: [
        { id: 'mult-tables-intro', title: 'Szorzótábla áttekintés', type: 'theory' },
        { id: 'mult-tables-practice', title: 'Gyakorlás', type: 'practice' },
        { id: 'mult-tables-quiz', title: 'Teszt', type: 'quiz' },
      ],
    },
    {
      id: 'division-intro',
      title: 'Osztás alapjai',
      description: 'Ismerkedés az osztással',
      icon: '➗',
      lessons: [
        { id: 'div-intro', title: 'Mi az osztás?', type: 'theory' },
        { id: 'div-practice', title: 'Gyakorlás', type: 'practice' },
        { id: 'div-quiz', title: 'Teszt', type: 'quiz' },
      ],
    },
  ],
  4: [
    {
      id: 'multi-digit',
      title: 'Többjegyű számok',
      description: 'Műveletek nagyobb számokkal',
      icon: '🔢',
      lessons: [
        { id: 'multi-add', title: 'Többjegyű összeadás', type: 'theory' },
        { id: 'multi-sub', title: 'Többjegyű kivonás', type: 'theory' },
        { id: 'multi-practice', title: 'Gyakorlás', type: 'practice' },
        { id: 'multi-quiz', title: 'Teszt', type: 'quiz' },
      ],
    },
    {
      id: 'fractions-intro',
      title: 'Törtek alapjai',
      description: 'Bevezetés a törtekbe',
      icon: '🥧',
      lessons: [
        { id: 'frac-intro', title: 'Mi a tört?', type: 'theory' },
        { id: 'frac-equal', title: 'Egyenlő törtek', type: 'theory' },
        { id: 'frac-add', title: 'Törtek összeadása', type: 'practice' },
        { id: 'frac-quiz', title: 'Teszt', type: 'quiz' },
      ],
    },
  ],
  7: [
    {
      id: 'divisibility-powers-content',
      title: 'Hatványozás és oszthatóság',
      description: 'Prímtényezős felbontás és hatványozás szabályai',
      icon: '⚡',
      lessons: [
        { id: 'powers-intro', title: 'Hatványozás fogalma', type: 'theory' },
        { id: 'div-factor-practice', title: 'Prímtényezős felbontás', type: 'practice' },
        { id: 'div-powers-quiz', title: 'Összefoglaló teszt', type: 'quiz' },
      ],
    },
  ],
};

export const mathTypeLabels: Record<string, string> = {
  addition: 'Összeadás',
  subtraction: 'Kivonás',
  multiplication: 'Szorzás',
  division: 'Osztás',
  mixed: 'Vegyes műveletek',
  fractions: 'Törtek',
};

export interface MathTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  grades: number[];
}

export const mathTopics: MathTopic[] = [
  {
    id: 'basic-operations',
    title: 'Alapműveletek',
    description: 'Összeadás, kivonás, szorzás, osztás',
    icon: '🔢',
    color: 'from-blue-500 to-blue-600',
    grades: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'interactive-coloring',
    title: 'Interaktív színező',
    description: 'Számolj és színezz kedvedre!',
    icon: '🎨',
    color: 'from-pink-400 to-rose-500',
    grades: [1],
  },
  {
    id: 'geometry',
    title: 'Geometria',
    description: 'Alakzatok, területek, kerületek, térfogatok',
    icon: '📐',
    color: 'from-green-500 to-green-600',
    grades: [2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'algebra',
    title: 'Algebra és egyenletek',
    description: 'Egyenletek, kifejezések, ismeretlenek',
    icon: '🔤',
    color: 'from-purple-500 to-purple-600',
    grades: [5, 6, 7, 8],
  },
  {
    id: 'percentages',
    title: 'Százalékok',
    description: 'Százalékszámítás, arányok',
    icon: '📊',
    color: 'from-orange-400 to-amber-500',
    grades: [5, 6, 7, 8],
  },
  {
    id: 'materials',
    title: 'Tananyagok és Könyvek',
    description: 'Tankönyvek letöltése és interaktív tanórai használata',
    icon: '📚',
    color: 'from-indigo-500 to-purple-600',
    grades: [5, 6, 7],
  },
  {
    id: 'divisibility-powers',
    title: 'Hatványozás és oszthatóság',
    description: 'Hatványozás szabályai, oszthatósági szabályok, prímtényezőkre bontás',
    icon: '⚡',
    color: 'from-amber-400 to-orange-500',
    grades: [6, 7],
  },
  {
    id: 'word-problems',
    title: 'Szöveges feladatok',
    description: 'Gyakorlati problémák megoldása',
    icon: '📝',
    color: 'from-teal-500 to-teal-600',
    grades: [1, 2, 3, 4, 5, 6, 7, 8],
  },
];

export const gradeDescriptions: Record<number, string> = {
  1: '1. osztály',
  2: '2. osztály',
  3: '3. osztály',
  4: '4. osztály',
  5: '5. osztály',
  6: '6. osztály',
  7: '7. osztály',
  8: '8. osztály',
};

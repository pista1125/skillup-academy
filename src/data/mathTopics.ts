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
    id: 'fractions',
    title: 'Törtek',
    description: 'Törtek megértése és műveletek törtekkel',
    icon: '🥧',
    color: 'from-orange-500 to-orange-600',
    grades: [3, 4, 5, 6, 7, 8],
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
    color: 'from-pink-500 to-pink-600',
    grades: [5, 6, 7, 8],
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

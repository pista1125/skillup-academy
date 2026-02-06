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
    id: 'materials',
    title: 'Tananyagok és Könyvek',
    description: 'Tankönyvek letöltése és interaktív tanórai használata',
    icon: '📚',
    color: 'from-indigo-500 to-purple-600',
    grades: [5, 6, 7],
  },
  {
    id: 'divisibility-powers',
    title: 'Hatványozás, oszthatóság',
    description: 'Hatványozás szabályai, oszthatósági szabályok, prímtényezőkre bontás',
    icon: '⚡',
    color: 'from-amber-400 to-orange-500',
    grades: [6, 7],
  },
  {
    id: 'fractions',
    title: 'Törtek',
    description: 'Törtek értelmezése, összeadása, kivonása',
    icon: '🍕',
    color: 'from-orange-500 to-amber-600',
    grades: [5, 6],
  },
  {
    id: 'geometry',
    title: 'Geometria és tengelyes tükrözés',
    description: 'Alakzatok, területek, kerületek, térfogatok',
    icon: '📐',
    color: 'from-green-500 to-green-600',
    grades: [2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'percentages',
    title: 'Arány, százalék',
    description: 'Százalékszámítás, arányok',
    icon: '📊',
    color: 'from-orange-400 to-amber-500',
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
  {
    id: 'measurements',
    title: 'Kerület, terület, felszín, térfogat',
    description: 'Mértékegységek átváltása, számítások',
    icon: '📏',
    color: 'from-cyan-500 to-blue-500',
    grades: [6],
  },
  {
    id: 'statistics',
    title: 'Statisztika',
    description: 'Adatok elemzése, átlag, módusz, medián',
    icon: '📈',
    color: 'from-pink-500 to-rose-500',
    grades: [6, 7, 8],
  },
  {
    id: 'finance',
    title: 'Mindennapi pénzügyeink',
    description: 'Pénzügyi ismeretek, költségvetés',
    icon: '💰',
    color: 'from-emerald-500 to-teal-600',
    grades: [6, 7, 8],
  },
  {
    id: 'basic-operations',
    title: 'Alapműveletek',
    description: 'Összeadás, kivonás, szorzás, osztás',
    icon: '🔢',
    color: 'from-blue-500 to-blue-600',
    grades: [1, 2, 3, 4, 5],
  },
  {
    id: 'algebra',
    title: 'Algebra és egyenletek',
    description: 'Egyenletek, kifejezések, ismeretlenek',
    icon: '🔤',
    color: 'from-purple-500 to-purple-600',
    grades: [5, 7, 8],
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

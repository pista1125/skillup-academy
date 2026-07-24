import { LucideIcon } from 'lucide-react';
import { gondolkodasiTopic } from '../components/math/admission/gondolkodasi-modszerek-logika-kombinatorika/gondolkodasiLessons';
import { szamelmeletTopic } from '../components/math/admission/szamelmelet-es-szamok/szamelmeletLessons';
import { algebraTopic } from '../components/math/admission/algebra-es-egyenletek/algebraLessons';
import { szazalekTopic } from '../components/math/admission/szazalekszamitas/szazalekLessons';
import { fuggvenyekTopic } from '../components/math/admission/fuggvenyek-es-koordinata-rendszer/fuggvenyekLessons';
import { geometriaTopic } from '../components/math/admission/geometriai-alakzatok/geometriaLessons';
import { transzformacioTopic } from '../components/math/admission/geometriai-transzformaciok/transzformacioLessons';
import { haromszogVonalaiTopic } from '../components/math/admission/haromszogek-nevezetes-vonalai/haromszogVonalaiLessons';
import { meresTopic } from '../components/math/admission/meres-terulet-terfogat/meresLessons';
import { statisztikaTopic } from '../components/math/admission/statisztika/statisztikaLessons';

export interface AdmissionQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
}

export interface AdmissionSubtopicContent {
  id: string;
  title: string;
  level: number; // Nesting depth: 0, 1, 2...
  requirements9th: string;
  requirements6th: string;
  requirements8th: string;
  lesson9th: string;
  lesson6th: string;
  lesson8th: string;
  quiz9th?: AdmissionQuizQuestion[];
  quiz6th?: AdmissionQuizQuestion[];
  quiz8th?: AdmissionQuizQuestion[];
  quizEasy?: AdmissionQuizQuestion[];
  quizMedium?: AdmissionQuizQuestion[];
  quizHard?: AdmissionQuizQuestion[];
}

export interface AdmissionTopic {
  id: string;
  title: string;
  icon: string;
  color: string;
  subtopics: AdmissionSubtopicContent[];
}

export interface AdmissionExamPaper {
  year: number;
  type: '9-osztaly' | '6-osztaly' | '8-osztaly';
  duration: number; // minutes
  totalPoints: number;
  structure: string[];
}

export const admissionExamPapers: AdmissionExamPaper[] = [
  {
    year: 2024,
    type: '9-osztaly',
    duration: 45,
    totalPoints: 50,
    structure: [
      "1-4. feladat: Alapműveletek, törtek, tizedes törtek és egyszerű logika (15 pont)",
      "5-7. feladat: Százalékszámítás, egyenletek, arányosság és grafikonok (15 pont)",
      "8-10. feladat: Geometria (kerület, terület, szögek, térfogat) és összetett szöveges feladatok (20 pont)"
    ]
  },
  {
    year: 2024,
    type: '6-osztaly',
    duration: 45,
    totalPoints: 50,
    structure: [
      "1-5. feladat: Számolási készség, törtek, egyszerűbb logikai feladatok (20 pont)",
      "6-8. feladat: Mértékegység átváltás, szöveges feladatok, arányosság (15 pont)",
      "9-10. feladat: Geometriai alapok, kerület és terület (15 pont)"
    ]
  },
  {
    year: 2024,
    type: '8-osztaly',
    duration: 45,
    totalPoints: 50,
    structure: [
      "1-5. feladat: Egyszerű számolások, alapműveletek játékosan, sorozatok (20 pont)",
      "6-8. feladat: Logika, mérési alapok, egyszerű szöveges feladatok (15 pont)",
      "9-10. feladat: Síkidomok felismerése, kerület és terület számolása (15 pont)"
    ]
  },
  {
    year: 2023,
    type: '9-osztaly',
    duration: 45,
    totalPoints: 50,
    structure: [
      "1-4. feladat: Számolás, törtek, mértékegységek, táblázatok (15 pont)",
      "5-7. feladat: Halmazok, logika, kombinatorika, egyenletek (15 pont)",
      "8-10. feladat: Geometriai szerkesztések, terület- és térfogatszámítás, statisztika (20 pont)"
    ]
  }
];

export const admissionTopics: AdmissionTopic[] = [
  gondolkodasiTopic,
  szamelmeletTopic,
  algebraTopic,
  szazalekTopic,
  fuggvenyekTopic,
  geometriaTopic,
  transzformacioTopic,
  haromszogVonalaiTopic,
  meresTopic,
  statisztikaTopic
];

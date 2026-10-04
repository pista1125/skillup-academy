import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ReadingGraphsMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Grafikon Fogalmak és Menetdiagram Jelölések',
    subtitle: 'Párosítsd a menetdiagramok és grafikonok jellegzetes szakaszait a fizikai jelentésükkel!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Vízszintes szakasz a menetdiagramon',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="14" x2="46" y2="14" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="27" y="24" className="text-[6.5px] font-bold fill-amber-700" textAnchor="middle">v = 0 km/h</text>
          </svg>
        ),
        value: 'A test áll (nyugalomban van, pihenő, sebessége 0 km/h)'
      },
      {
        id: 'p2',
        prompt: 'Meredek emelkedő egyenes szakasz',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="10" y1="24" x2="44" y2="6" stroke="#0d9488" strokeWidth="2.5" />
            <text x="27" y="26" className="text-[6px] font-bold fill-teal-800" textAnchor="middle">Nagy meredekség</text>
          </svg>
        ),
        value: 'Gyors, nagy sebességű egyenletes haladás előre'
      },
      {
        id: 'p3',
        prompt: 'Lefelé lejtő egyenes szakasz',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="10" y1="6" x2="44" y2="24" stroke="#ef4444" strokeWidth="2.5" />
            <text x="27" y="26" className="text-[6px] font-bold fill-rose-800" textAnchor="middle">Visszaút</text>
          </svg>
        ),
        value: 'Visszafordulás és közeledés a kiindulási pont felé'
      },
      {
        id: 'p4',
        prompt: 'Két menetdiagram metszéspontja',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="22" x2="46" y2="6" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="8" y1="6" x2="46" y2="22" stroke="#ef4444" strokeWidth="1.5" />
            <circle cx="27" cy="14" r="3" fill="#10b981" />
          </svg>
        ),
        value: 'A két test találkozási helye (s) és időpontja (t)'
      },
      {
        id: 'p5',
        prompt: 'Értelmezési tartomány (D)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="16" x2="46" y2="16" stroke="#6366f1" strokeWidth="2" />
            <text x="27" y="12" className="text-[6.5px] font-black fill-indigo-800" textAnchor="middle">x tengely (idő)</text>
          </svg>
        ),
        value: 'A vízszintes tengelyen a megfigyelés teljes időtartama'
      },
      {
        id: 'p6',
        prompt: 'Értékkészlet (R)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="27" y1="4" x2="27" y2="24" stroke="#6366f1" strokeWidth="2" />
            <text x="27" y="16" className="text-[6px] font-black fill-indigo-800" textAnchor="middle">y tengely</text>
          </svg>
        ),
        value: 'A függőleges tengelyen felvett legkisebb és legnagyobb érték köze'
      },
      {
        id: 'p7',
        prompt: 'Grafikon zérushelye',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="6" y1="14" x2="48" y2="14" stroke="#94a3b8" strokeWidth="1" />
            <line x1="12" y1="24" x2="42" y2="4" stroke="#0d9488" strokeWidth="1.8" />
            <circle cx="27" cy="14" r="3" fill="#0d9488" />
          </svg>
        ),
        value: 'Ahol a grafikon átmetszi az x-tengelyt (a függvényérték y = 0)'
      },
      {
        id: 'p8',
        prompt: 'Grafikon maximuma',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 10 22 Q 27 4 44 22" fill="none" stroke="#6366f1" strokeWidth="2" />
            <circle cx="27" cy="8" r="3" fill="#6366f1" />
          </svg>
        ),
        value: 'A grafikon legmagasabb pontja: a csúcsérték és annak időpontja'
      }
    ]
  },
  2: {
    title: '2. Szint: Sebességszámítások és Pontleolvasás',
    subtitle: 'Határozd meg a sebességet, távolságot vagy hőmérséklet-ingadozást a grafikonról!',
    pairs: [
      {
        id: 'p9',
        prompt: '60 km út megtétele 2 óra alatt',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-emerald-800" textAnchor="middle">v = 60 / 2</text>
          </svg>
        ),
        value: 'Sebesség: v = 30 km/h (a szakasz meredeksége 30)'
      },
      {
        id: 'p10',
        prompt: '15 km gyaloglás 3 óra alatt',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-emerald-800" textAnchor="middle">v = 15 / 3</text>
          </svg>
        ),
        value: 'Sebesség: v = 5 km/h (átlagos gyalogló tempó)'
      },
      {
        id: 'p11',
        prompt: '0 km elmozdulás 1,5 órán át',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-amber-800" textAnchor="middle">1,5 óra pihenő</text>
          </svg>
        ),
        value: 'Sebesség: v = 0 km/h (90 perces állóhelyzet vagy ebéd)'
      },
      {
        id: 'p12',
        prompt: '120 km autópályán 1,5 óra alatt',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-emerald-800" textAnchor="middle">v = 120 / 1,5</text>
          </svg>
        ),
        value: 'Sebesség: v = 80 km/h (egyenletes autózás)'
      },
      {
        id: 'p13',
        prompt: 'P(3; 45) pont a menetdiagramon',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-indigo-800" textAnchor="middle">(3 h; 45 km)</text>
          </svg>
        ),
        value: 'A starttól számított 3 óra múlva a jármű 45 km távolságra van'
      },
      {
        id: 'p14',
        prompt: 'Hőmérséklet: max 22 °C, min 4 °C',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-blue-800" textAnchor="middle">22 - 4 = ?</text>
          </svg>
        ),
        value: 'Napi hőingadozás: 22 - 4 = 18 °C a két szélsőérték különbsége'
      },
      {
        id: 'p15',
        prompt: 'Összesen 100 km út 5 óra alatt pihenőkkel',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-blue-800" textAnchor="middle">100 / 5</text>
          </svg>
        ),
        value: 'A teljes túra átlagsebessége: v_átlag = 100 / 5 = 20 km/h'
      },
      {
        id: 'p16',
        prompt: '120 cm-es vízállás 20 perc alatt leürül (0 cm)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-blue-800" textAnchor="middle">120 / 20</text>
          </svg>
        ),
        value: 'A vízszint csökkenési sebessége: 120 / 20 = 6 cm/perc'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett Menetdiagramok és Találkozások',
    subtitle: 'Elemezz találkozásokat, átlagsebességeket és több szakaszból álló mozgásokat!',
    pairs: [
      {
        id: 'p17',
        prompt: 'Biciklis 20 km/h-val és gyalogos 10 km/h-val szemben',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6px] font-black fill-indigo-800" textAnchor="middle">60 km-ről egymásnak</text>
          </svg>
        ),
        value: '2 óra múlva találkoznak (60 / (20 + 10) = 2 h, 40 km-nél)'
      },
      {
        id: 'p18',
        prompt: 'Autó: 1h alatt 80 km, 1h pihenő, 1h alatt 70 km',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6.5px] font-black fill-emerald-800" textAnchor="middle">150 km / 3 h</text>
          </svg>
        ),
        value: 'Átlagsebesség a pihenővel együtt: 150 / 3 = 50 km/h'
      },
      {
        id: 'p19',
        prompt: 'Túrázó: 8 km fel (2h), 1h a csúcson, 8 km le (1h)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6.5px] font-black fill-emerald-800" textAnchor="middle">2 + 1 + 1 = ?</text>
          </svg>
        ),
        value: 'A teljes túra időtartama: 4 óra (értelmezési tartomány: [0; 4])'
      },
      {
        id: 'p20',
        prompt: 'Péter 12 km/h futó utoléri a 8 km/h Zolit (4 km előny)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6px] font-black fill-indigo-800" textAnchor="middle">Sebességdiff: 4 km/h</text>
          </svg>
        ),
        value: '1 óra múlva éri utol (4 km / 4 km/h = 1 óra, a metszéspont ideje)'
      },
      {
        id: 'p21',
        prompt: 'Hőmérséklet grafikon zérushelyei: 7:00 és 21:00',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6px] font-black fill-blue-800" textAnchor="middle">T = 0 °C átlépések</text>
          </svg>
        ),
        value: '7 és 21 óra között volt fagymentes, pozitív a hőmérséklet (14 órán át)'
      },
      {
        id: 'p22',
        prompt: 'Maximumhely: t = 14:00, Maximumérték: 28 °C',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6.5px] font-black fill-rose-800" textAnchor="middle">14:00 és 28 °C</text>
          </svg>
        ),
        value: 'A csúcsidő délután 14:00 volt, ekkor mérték a 28 °C legmelegebbet'
      },
      {
        id: 'p23',
        prompt: 'Felfelé hajló (domború) menetdiagram görbe',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 8 22 Q 32 20 46 6" fill="none" stroke="#0d9488" strokeWidth="2" />
          </svg>
        ),
        value: 'Gyorsuló mozgás: a meredekség és a sebesség folyamatosan nő'
      },
      {
        id: 'p24',
        prompt: 'Lefelé hajló (laposodó) menetdiagram görbe',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 8 22 Q 22 8 46 6" fill="none" stroke="#f59e0b" strokeWidth="2" />
          </svg>
        ),
        value: 'Lassuló mozgás: a meredekség csökken, a test sebessége fékez'
      }
    ]
  }
};

export const ReadingGraphsMatcher: React.FC<ReadingGraphsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g8-func-reading',
  topicTitle = 'Olvassunk a Grafikonról'
}) => {
  return (
    <MatcherTemplate
      level={level}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      themeColor="teal"
    />
  );
};

export default ReadingGraphsMatcher;

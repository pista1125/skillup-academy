import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PlottingGraphsMatcherProps {
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
    title: '1. Szint: Képletek és Tengelymetszetek',
    subtitle: 'Párosítsd a lineáris függvények hozzárendelési szabályát a grafikonjuk kezdőpontjával és irányával!',
    pairs: [
      {
        id: 'p1',
        prompt: 'f(x) = 2x - 3',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="24" x2="46" y2="4" stroke="#2563eb" strokeWidth="2" />
            <circle cx="20" cy="18" r="2.5" fill="#10b981" />
            <text x="27" y="26" className="text-[6px] font-bold fill-slate-600" textAnchor="middle">b = -3</text>
          </svg>
        ),
        value: 'y-metszet a (0; -3) pontban, meredekség a = +2 (emelkedő)'
      },
      {
        id: 'p2',
        prompt: 'g(x) = -x + 4',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="6" x2="46" y2="24" stroke="#ef4444" strokeWidth="2" />
            <circle cx="16" cy="10" r="2.5" fill="#10b981" />
            <text x="27" y="26" className="text-[6px] font-bold fill-slate-600" textAnchor="middle">b = +4</text>
          </svg>
        ),
        value: 'y-metszet a (0; 4) pontban, meredekség a = -1 (csökkenő)'
      },
      {
        id: 'p3',
        prompt: 'h(x) = 3x',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="10" y1="24" x2="44" y2="4" stroke="#0d9488" strokeWidth="2" />
            <circle cx="27" cy="14" r="2.5" fill="#10b981" />
            <text x="27" y="26" className="text-[6px] font-bold fill-slate-600" textAnchor="middle">Origó (0;0)</text>
          </svg>
        ),
        value: 'Átmegy az origón (0; 0), meredeksége a = +3 (egyenes arányosság)'
      },
      {
        id: 'p4',
        prompt: 'k(x) = -2x - 1',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="4" x2="46" y2="24" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="22" cy="13" r="2.5" fill="#10b981" />
            <text x="27" y="26" className="text-[6px] font-bold fill-slate-600" textAnchor="middle">b = -1</text>
          </svg>
        ),
        value: 'y-metszet a (0; -1) pontban, lejtése a = -2 (meredeken le)'
      },
      {
        id: 'p5',
        prompt: 'm(x) = 4',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="6" y1="12" x2="48" y2="12" stroke="#6366f1" strokeWidth="2.5" />
            <text x="27" y="22" className="text-[6px] font-bold fill-indigo-700" textAnchor="middle">Vízszintes</text>
          </svg>
        ),
        value: 'Vízszintes egyenes az y = 4 magasságban, meredeksége 0 (konstans)'
      },
      {
        id: 'p6',
        prompt: 'p(x) = 0,5x + 2',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="20" x2="46" y2="10" stroke="#06b6d4" strokeWidth="2" />
            <circle cx="20" cy="16" r="2.5" fill="#10b981" />
            <text x="27" y="26" className="text-[6px] font-bold fill-slate-600" textAnchor="middle">Lapos emelkedő</text>
          </svg>
        ),
        value: 'y-metszete a (0; 2) pont, 2 egység jobbra lépve 1 egységet emelkedik'
      },
      {
        id: 'p7',
        prompt: 'q(x) = -3x + 6',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="12" y1="4" x2="42" y2="24" stroke="#e11d48" strokeWidth="2" />
            <circle cx="34" cy="19" r="2.5" fill="#3b82f6" />
            <text x="27" y="26" className="text-[6px] font-bold fill-slate-600" textAnchor="middle">Zérushely: x = 2</text>
          </svg>
        ),
        value: 'y-metszete a (0; 6) pont, az x-tengelyt a (2; 0) pontban metszi'
      },
      {
        id: 'p8',
        prompt: 'r(x) = x - 5',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="24" x2="46" y2="8" stroke="#8b5cf6" strokeWidth="2" />
            <circle cx="16" cy="21" r="2.5" fill="#10b981" />
            <text x="27" y="26" className="text-[6px] font-bold fill-slate-600" textAnchor="middle">b = -5</text>
          </svg>
        ),
        value: 'y-metszete a (0; -5) pontban van, 45 fokos meredekségű (a = 1)'
      }
    ]
  },
  2: {
    title: '2. Szint: Lépésháromszög és Meredekség-Lépések',
    subtitle: 'Párosítsd a megadott meredekségi értékeket a rácshálón végzett pontos lépésekkel!',
    pairs: [
      {
        id: 'p2-1',
        prompt: 'Meredekség: a = +3',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="16" y1="22" x2="30" y2="22" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="30" y1="22" x2="30" y2="6" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="16" y1="22" x2="30" y2="6" stroke="#2563eb" strokeWidth="2" />
          </svg>
        ),
        value: '1 egység jobbra az x mentén, 3 egység FEL az y mentén'
      },
      {
        id: 'p2-2',
        prompt: 'Meredekség: a = -2',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="16" y1="8" x2="30" y2="8" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="30" y1="8" x2="30" y2="22" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="16" y1="8" x2="30" y2="22" stroke="#ef4444" strokeWidth="2" />
          </svg>
        ),
        value: '1 egység jobbra az x mentén, 2 egység LE az y mentén'
      },
      {
        id: 'p2-3',
        prompt: 'Meredekség: a = 3/4',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="12" y1="20" x2="38" y2="20" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="38" y1="20" x2="38" y2="8" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="12" y1="20" x2="38" y2="8" stroke="#2563eb" strokeWidth="2" />
          </svg>
        ),
        value: '4 egység jobbra az x mentén, 3 egység FEL az y mentén'
      },
      {
        id: 'p2-4',
        prompt: 'Meredekség: a = -1/2',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="14" y1="10" x2="38" y2="10" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="38" y1="10" x2="38" y2="20" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="14" y1="10" x2="38" y2="20" stroke="#ef4444" strokeWidth="2" />
          </svg>
        ),
        value: '2 egység jobbra az x mentén, 1 egység LE az y mentén'
      },
      {
        id: 'p2-5',
        prompt: 'Meredekség: a = 0',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="10" y1="14" x2="44" y2="14" stroke="#64748b" strokeWidth="2.5" />
          </svg>
        ),
        value: 'Jobbra lépve nincs függőleges elmozdulás (vízszintes egyenes)'
      },
      {
        id: 'p2-6',
        prompt: 'Meredekség: a = 5/2 (2,5)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="18" y1="22" x2="30" y2="22" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="30" y1="22" x2="30" y2="6" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="18" y1="22" x2="30" y2="6" stroke="#0ea5e9" strokeWidth="2" />
          </svg>
        ),
        value: '2 egység jobbra az x mentén, 5 egység FEL az y mentén'
      },
      {
        id: 'p2-7',
        prompt: 'Meredekség: a = -4/3',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="14" y1="6" x2="36" y2="6" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="36" y1="6" x2="36" y2="22" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="14" y1="6" x2="36" y2="22" stroke="#ef4444" strokeWidth="2" />
          </svg>
        ),
        value: '3 egység jobbra az x mentén, 4 egység LE az y mentén'
      },
      {
        id: 'p2-8',
        prompt: 'Meredekség: a = +1',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="16" y1="20" x2="34" y2="20" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="34" y1="20" x2="34" y2="8" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="16" y1="20" x2="34" y2="8" stroke="#2563eb" strokeWidth="2" />
          </svg>
        ),
        value: '1 egység jobbra, 1 egység fel (pontosan a négyzetrács átlója)'
      }
    ]
  },
  3: {
    title: '3. Szint: Életszerű Modellek és Ábrázolási Szabályok',
    subtitle: 'Párosítsd a valós életbeli jelenségeket a megfelelő grafikus megjelenítés szabályával!',
    pairs: [
      {
        id: 'p3-1',
        prompt: 'Vásárolt könyvek száma és ára',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="16" cy="22" r="2.5" fill="#f59e0b" />
            <circle cx="26" cy="16" r="2.5" fill="#f59e0b" />
            <circle cx="36" cy="10" r="2.5" fill="#f59e0b" />
          </svg>
        ),
        value: 'Diszkrét pontok (tilos összekötni, mert félig vásárolt könyv nem létezik)'
      },
      {
        id: 'p3-2',
        prompt: 'Egyenletesen melegedő víz hőmérséklete',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="10" y1="22" x2="44" y2="6" stroke="#2563eb" strokeWidth="2" />
          </svg>
        ),
        value: 'Folytonos egyenes szakasz (a hőmérséklet minden tized fokot felvesz)'
      },
      {
        id: 'p3-3',
        prompt: 'Taxi alapdíja (1000 Ft) + kilométerdíj (400 Ft/km)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="10" cy="18" r="2.5" fill="#10b981" />
            <line x1="10" y1="18" x2="44" y2="6" stroke="#2563eb" strokeWidth="2" />
          </svg>
        ),
        value: 'y-metszet az (0; 1000) pontban (alapdíj), meredekség a = 400'
      },
      {
        id: 'p3-4',
        prompt: 'Telefon előfizetés 100 lebeszélt percig fix díjas',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="10" y1="14" x2="44" y2="14" stroke="#6366f1" strokeWidth="2" />
          </svg>
        ),
        value: 'Vízszintes szakasz (konstans érték a használattól függetlenül)'
      },
      {
        id: 'p3-5',
        prompt: 'Tengelyek skálázása: idő (0-3 h), távolság (0-200 km)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="3" fill="#f1f5f9" stroke="#94a3b8" />
            <text x="27" y="16" className="text-[6px] font-bold fill-slate-700" textAnchor="middle">Eltérő skála</text>
          </svg>
        ),
        value: 'x tengelyen 1 rács = 0,5 óra, míg y tengelyen 1 rács = 25 km'
      },
      {
        id: 'p3-6',
        prompt: 'Lineáris függvény értéktáblázata',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="14" cy="20" r="2" fill="#2563eb" />
            <circle cx="27" cy="14" r="2" fill="#2563eb" />
            <circle cx="40" cy="8" r="2" fill="#2563eb" />
            <line x1="10" y1="22" x2="44" y2="6" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        ),
        value: 'Legalább 3 pontot számolunk ki a rajzoláshoz és az ellenőrzéshez'
      },
      {
        id: 'p3-7',
        prompt: 'Zérushely a grafikonon',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="20" x2="46" y2="20" stroke="#334155" strokeWidth="1.5" />
            <line x1="12" y1="24" x2="42" y2="6" stroke="#2563eb" strokeWidth="2" />
            <circle cx="27" cy="20" r="3" fill="#ef4444" />
          </svg>
        ),
        value: 'Ahol a grafikon átmetszi az x-tengelyt (f(x) = 0 pontja)'
      },
      {
        id: 'p3-8',
        prompt: 'Gyertya égése és hossza az idő függvényében',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="10" y1="6" x2="44" y2="22" stroke="#ef4444" strokeWidth="2" />
          </svg>
        ),
        value: 'Csökkenő folytonos szakasz a kezdőhossztól a csonkig (hossz = 0)'
      }
    ]
  }
};

export const PlottingGraphsMatcher: React.FC<PlottingGraphsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g8-func-plotting',
  topicTitle = 'Készítsünk Grafikont!'
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
      themeColor="blue"
    />
  );
};

export default PlottingGraphsMatcher;

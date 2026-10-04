import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ReadingGraphsSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Mozgástípusok a Menetdiagramon',
    subtitle: 'Válogasd szét a szakaszokat és helyzeteket: előrehaladás, pihenő/állóhelyzet vagy visszaút!',
    categories: [
      {
        id: 'cat-forward',
        name: 'Előrehaladás (Pozitív Sebesség)',
        description: 'Távolság nő a starttól, emelkedő szakasz (v > 0)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-stop',
        name: 'Állóhelyzet / Pihenő (v = 0)',
        description: 'Vízszintes szakasz, a test helyzete nem változik',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-return',
        name: 'Visszaút / Tolatás',
        description: 'Lefelé lejtő szakasz a kiindulási pont felé',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'Emelkedő egyenes szakasz (0-ról 40 km-re)', category: 'cat-forward' },
      { id: 's1-2', label: 'Gyorsuló autó felfelé hajló görbéje', category: 'cat-forward' },
      { id: 's1-3', label: 'Biciklis haladása 20 km/h-val a cél felé', category: 'cat-forward' },
      { id: 's1-4', label: 'Gyalogos tempós hegymászása (15 km 3 óra alatt)', category: 'cat-forward' },
      { id: 's1-5', label: 'Vízszintes szakasz a grafikonon (t = 2-től 3 óráig)', category: 'cat-stop' },
      { id: 's1-6', label: 'Várakozás a piros lámpánál vagy dugóban', category: 'cat-stop' },
      { id: 's1-7', label: 'Túrázók 1 órás ebédje a menedékházban', category: 'cat-stop' },
      { id: 's1-8', label: 'Autó tankolása és pihenő a benzinkútnál', category: 'cat-stop' },
      { id: 's1-9', label: 'Lefelé lejtő egyenes szakasz a t-tengely felé', category: 'cat-return' },
      { id: 's1-10', label: 'Hazatérés a kirándulásról (18 km-ről 0 km-re)', category: 'cat-return' },
      { id: 's1-11', label: 'Hátramenetbe kapcsolt autó tolatása', category: 'cat-return' },
      { id: 's1-12', label: 'Futó visszagyaloglása a rajtvonalhoz', category: 'cat-return' }
    ]
  },
  2: {
    title: '2. Szint: Szélsőértékek és Monotonitási Szakaszok',
    subtitle: 'Kategorizáld a grafikon változási szakaszait: növekvő, csökkenő vagy szélsőérték/állandó!',
    categories: [
      {
        id: 'cat-inc',
        name: 'Szigorúan Növekvő Szakasz',
        description: 'Balról jobbra haladva az értékek folyamatosan nőnek',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-dec',
        name: 'Szigorúan Csökkenő Szakasz',
        description: 'Balról jobbra haladva az értékek folyamatosan csökkennek',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-extremum',
        name: 'Szélsőérték vagy Állandó Szakasz',
        description: 'Maximumcsúcs, minimumhullám vagy konstans plató',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Hőmérséklet emelkedése reggel 6:00-tól 14:00-ig', category: 'cat-inc' },
      { id: 's2-2', label: 'Vízszint növekedése a medence feltöltésekor', category: 'cat-inc' },
      { id: 's2-3', label: 'Megtett távolság növekedése utazás közben', category: 'cat-inc' },
      { id: 's2-4', label: 'Árfolyam emelkedése a tőzsdén délelőtt', category: 'cat-inc' },
      { id: 's2-5', label: 'Hőmérséklet csökkenése este 18:00 és hajnali 4:00 között', category: 'cat-dec' },
      { id: 's2-6', label: 'Vízszint apadása a tartály leeresztésekor', category: 'cat-dec' },
      { id: 's2-7', label: 'Lázcsillapító hatására a testhőmérséklet esése', category: 'cat-dec' },
      { id: 's2-8', label: 'Fékezéskor a jármű sebességének csökkenése', category: 'cat-dec' },
      { id: 's2-9', label: 'Délutáni 28 °C-os napi hőmérsékleti csúcs (Maximum)', category: 'cat-extremum' },
      { id: 's2-10', label: 'Hajnali 5:00-kor mért -3 °C fagy (Minimum)', category: 'cat-extremum' },
      { id: 's2-11', label: 'Állandó 12 km-es távolság 45 percen keresztül (Plató)', category: 'cat-extremum' },
      { id: 's2-12', label: 'Konstans 20 °C a termosztátos szobában', category: 'cat-extremum' }
    ]
  },
  3: {
    title: '3. Szint: Grafikon Típusok és Fizikai Mennyiségek',
    subtitle: 'Sorold be a tulajdonságokat a megfelelő grafikon-típushoz: menetdiagram, hőmérséklet vagy vízszint!',
    categories: [
      {
        id: 'cat-st',
        name: 'Út-Idő Menetdiagram (s - t)',
        description: 'Távolság az idő függvényében, meredeksége a sebesség',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-temp',
        name: 'Hőmérséklet Grafikon (T - t)',
        description: 'Celsius-fok az időben, zérushely a 0 °C fagyáspont',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-volume',
        name: 'Vízszint / Folyadékmennyiség (V - t)',
        description: 'Térfogat változása, meredeksége a töltési vízhozam',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'Függőleges tengely: km, vízszintes tengely: óra', category: 'cat-st' },
      { id: 's3-2', label: 'Meredekség fizikai jelentése: sebesség (km/h)', category: 'cat-st' },
      { id: 's3-3', label: 'Két görbe metszéspontja: találkozás vagy előzés', category: 'cat-st' },
      { id: 's3-4', label: 'Vízszintes vonal: álló jármű, pihenő (v = 0)', category: 'cat-st' },
      { id: 's3-5', label: 'Függőleges tengely: Celsius-fok (°C)', category: 'cat-temp' },
      { id: 's3-6', label: 'Zérushely jelentése: 0 °C fagyáspont átlépése', category: 'cat-temp' },
      { id: 's3-7', label: 'Szélsőértékek: napi legmelegebb és leghidegebb óra', category: 'cat-temp' },
      { id: 's3-8', label: 'Napi ingadozás: max és min érték különbsége', category: 'cat-temp' },
      { id: 's3-9', label: 'Függőleges tengely: köbméter (m³) vagy liter', category: 'cat-volume' },
      { id: 's3-10', label: 'Meredekség fizikai jelentése: vízhozam (liter/perc)', category: 'cat-volume' },
      { id: 's3-11', label: 'Zérushely: a medence teljesen üresre apadt', category: 'cat-volume' },
      { id: 's3-12', label: 'Maximum: a víztározó elérte a maximális kapacitást', category: 'cat-volume' }
    ]
  }
};

export const ReadingGraphsSorter: React.FC<ReadingGraphsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-func-reading',
  topicTitle = 'Olvassunk a Grafikonról'
}) => {
  return (
    <SorterTemplate
      level={level}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      themeColor="teal"
    />
  );
};

export default ReadingGraphsSorter;

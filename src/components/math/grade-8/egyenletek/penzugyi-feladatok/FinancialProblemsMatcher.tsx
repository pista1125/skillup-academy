import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FinancialProblemsMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapvető Árváltozások és Szorzótényezők',
    subtitle: 'Párosítsd a pénzügyi változást a megfelelő algebrai szorzóval vagy értékkel!',
    pairs: [
      {
        id: 'fp1',
        prompt: 'Egy termék árának 20%-os megemelése',
        value: 'Új ár = x · 1,20'
      },
      {
        id: 'fp2',
        prompt: 'Egy ruhadarab 25%-os leértékelése',
        value: 'Új ár = x · 0,75'
      },
      {
        id: 'fp3',
        prompt: '100 000 Ft lekötése 1 évre 5%-os éves kamatra',
        value: 'Kamat: 5 000 Ft'
      },
      {
        id: 'fp4',
        prompt: 'Egy szolgáltatás nettó árára 27% ÁFA rakódik',
        value: 'Bruttó = Nettó · 1,27'
      },
      {
        id: 'fp5',
        prompt: 'Egy könyv ára 15%-kal csökkent',
        value: 'Új ár = x · 0,85'
      },
      {
        id: 'fp6',
        prompt: '200 000 Ft lekötése fél évre 6%-os éves kamatra',
        value: 'Kamat: 6 000 Ft'
      },
      {
        id: 'fp7',
        prompt: 'Egy termék 30%-os drágulása',
        value: 'Új ár = x · 1,30'
      },
      {
        id: 'fp8',
        prompt: 'Egy cipő ára 40%-os kiárusításon',
        value: 'Új ár = x · 0,60'
      }
    ]
  },
  2: {
    title: '2. Szint: Kétlépcsős Árváltozások és Egyszerű Kamat',
    subtitle: 'Párosítsd az összetett árváltozást vagy kamatot a pontos hatással!',
    pairs: [
      {
        id: 'fp9',
        prompt: '20% emelés, majd az új ár 20%-os leértékelése',
        value: '0,96x (4%-os csökkenés)'
      },
      {
        id: 'fp10',
        prompt: 'Kétszer egymás után 10%-os áremelés',
        value: '1,21x (21%-os növekedés)'
      },
      {
        id: 'fp11',
        prompt: '500 000 Ft 8%-os kamatra 3 évre egyszerű kamatozással',
        value: 'Kamat: 120 000 Ft'
      },
      {
        id: 'fp12',
        prompt: '10% leárazás, majd az akciós ár további 10%-os leárazása',
        value: '0,81x (19%-os csökkenés)'
      },
      {
        id: 'fp13',
        prompt: '300 000 Ft lekötése 4 hónapra évi 6%-os kamatra',
        value: 'Kamat: 6 000 Ft'
      },
      {
        id: 'fp14',
        prompt: 'Egy termék ára 50%-kal nőtt, majd 50%-kal csökkent',
        value: '0,75x (25%-os csökkenés)'
      },
      {
        id: 'fp15',
        prompt: '1 000 000 Ft betét évi 7%-os kamatra 2 évre',
        value: 'Teljes összeg: 1 140 000 Ft'
      },
      {
        id: 'fp16',
        prompt: '25% emelés, majd az új ár 20%-os csökkentése',
        value: '1,00x (Változatlan marad)'
      }
    ]
  },
  3: {
    title: '3. Szint: Pénzügyi Egyenletek és Visszaszámolások',
    subtitle: 'Párosítsd a felvételi típusú szöveges feladatot a levezetésével!',
    pairs: [
      {
        id: 'fp17',
        prompt: 'Egy kabát 20%-os emelés után 30%-kal leárazva 29 400 Ft',
        value: '0,84x = 29 400 ⇒ x = 35 000 Ft'
      },
      {
        id: 'fp18',
        prompt: 'Egy telefon bruttó ára 27%-os ÁFÁ-val 254 000 Ft',
        value: 'Nettó = 254 000 / 1,27 = 200 000 Ft'
      },
      {
        id: 'fp19',
        prompt: 'Egy bicikli 35%-os engedménnyel 65 000 Ft-ba kerül',
        value: '0,65x = 65 000 ⇒ x = 100 000 Ft'
      },
      {
        id: 'fp20',
        prompt: '400 000 Ft 9 hónap alatt 24 000 Ft kamatot hozott',
        value: 'p = 24 000 / (4000 · 0,75) = 8%'
      },
      {
        id: 'fp21',
        prompt: 'Egy televízió ára 15%-os drágulás után 138 000 Ft lett',
        value: '1,15x = 138 000 ⇒ x = 120 000 Ft'
      },
      {
        id: 'fp22',
        prompt: 'Egy kereskedő 25%-os haszonnal 75 000 Ft-ért ad el egy gépet',
        value: 'Beszerzés = 75 000 / 1,25 = 60 000 Ft'
      },
      {
        id: 'fp23',
        prompt: '600 000 Ft 1 év alatt 48 000 Ft kamatot termelt',
        value: 'Kamatláb = 48 000 / 6 000 = 8%'
      },
      {
        id: 'fp24',
        prompt: 'Kétféle betét: x Ft 6%-ra és (800 000 - x) Ft 9%-ra összesen 60 000 Ft kamat',
        value: '0,06x + 0,09(800 000 - x) = 60 000'
      }
    ]
  }
};

export const FinancialProblemsMatcher: React.FC<FinancialProblemsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-eq-financial',
  topicTitle = 'Pénzügyi feladatok'
}) => {
  return (
    <MatcherTemplate
      level={level}
      levels={matcherLevels}
      topicId={topicId}
      topicTitle={topicTitle}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

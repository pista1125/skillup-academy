import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WordProblemsMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Gyors Arányok és Szöveges Részletek',
    subtitle: 'Párosítsd a feladatok szöveges állításait a helyes matematikai értékkel!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Görögország: 75% repülő, 20% autó, 120 km bicikli (5%)',
        value: '2400 km a teljes utazás hossza'
      },
      {
        id: 'p2',
        prompt: '60 000 Ft laptop hitel 15% kamattal félévre',
        value: '9000 Ft kamat (havi 11 500 Ft törlesztő)'
      },
      {
        id: 'p3',
        prompt: '48 000 Ft költségű tablet 150%-os árréssel',
        value: '120 000 Ft bevezető fogyasztói ár'
      },
      {
        id: 'p4',
        prompt: 'Matek átlag 4,56, ami 14%-kal jobb a földrajznál',
        value: '4,00 volt az osztályátlag földrajzból'
      },
      {
        id: 'p5',
        prompt: '14 lány az edzésen, ha a csapat 72%-a fiú',
        value: '50 gyerek jár edzésre (28% lány)'
      },
      {
        id: 'p6',
        prompt: 'Angoltábor 10%-os kedvezménnyel 7830 Ft',
        value: '8700 Ft az eredeti tábori részvételi díj'
      },
      {
        id: 'p7',
        prompt: 'Pizzéria: 16% sajtos, 20% hawaii, 50% sonkás',
        value: '14% a zöldséges pizzák aránya'
      },
      {
        id: 'p8',
        prompt: 'Kosárlabda büntetődobás: 40 pontból 26 pont',
        value: '65%-os dobóteljesítmény (26 / 40)'
      }
    ]
  },
  2: {
    title: '2. Szint: Pénzügyek, Statisztika és Alapváltások',
    subtitle: 'Kapcsold össze a gazdasági és felmérési kérdéseket az eredményükkel!',
    pairs: [
      {
        id: 'p9',
        prompt: '2,4 millió Ft előleg (15%) a lakásvásárláskor',
        value: '16 000 000 Ft a lakás teljes vételára'
      },
      {
        id: 'p10',
        prompt: '16 millió Ft lakás 30%-os bankhitele',
        value: '4 800 000 Ft a felvett hitel összege'
      },
      {
        id: 'p11',
        prompt: '640 000 Ft illeték a 16 millió Ft-os lakásra',
        value: '4% a vagyonszerzési illeték mértéke'
      },
      {
        id: 'p12',
        prompt: 'Eladták a jégkrémek 55%-át a hőségben',
        value: '+122,2% visszatöltés kell a megmaradt 45%-ra'
      },
      {
        id: 'p13',
        prompt: 'Szofi jegyei: 65% ötös, 25% négyes, 2 db hármas (10%)',
        value: '20 jegye van, átlaga pontosan 4,55'
      },
      {
        id: 'p14',
        prompt: '5400 gyerek mos fogat napi 2-szer (ez a 45%)',
        value: '12 000 gyereket kérdeztek meg összesen'
      },
      {
        id: 'p15',
        prompt: 'Amerikai chips 8 kg/év, ami 23-szorosa a magyarnak',
        value: 'A magyar fogyasztás 4,35%-a az amerikainak'
      },
      {
        id: 'p16',
        prompt: '250 pizzából 16% sajtos (egy pizza 750 Ft)',
        value: '30 000 Ft sajtos pizza bevétel (40 db)'
      }
    ]
  },
  3: {
    title: '3. Szint: Receptek, Munkavégzés és Populációk',
    subtitle: 'Oldd meg a komplex arányossági, időbeli és többváltozós feladványokat!',
    pairs: [
      {
        id: 'p17',
        prompt: 'Eszter egyedül 6 óra alatt takarít, öccsével 50%-kal hatékonyabb',
        value: '4 óra szükséges ketten a takarításhoz'
      },
      {
        id: 'p18',
        prompt: '100 tengerimalac félévente 20%-kal szaporodva',
        value: '144 tengerimalac lesz 1 év múlva'
      },
      {
        id: 'p19',
        prompt: 'Gyümölcssaláta: 40 dkg alma a 115 dkg salátában',
        value: '34,78% alma tartalom (8:4:6:5 arány)'
      },
      {
        id: 'p20',
        prompt: '5,75 kg gyümölcssalátához szükséges banán',
        value: '1,5 kg (150 dkg) banán szükséges'
      },
      {
        id: 'p21',
        prompt: 'Tablet cég bevétele (12,5e db 120e Ft + 21e db 84e Ft)',
        value: '3 264 000 000 Ft (3,264 milliárd Ft) bevétel'
      },
      {
        id: 'p22',
        prompt: 'Téglalap oldalai 15 (-30%) és 10 (+20%) egység',
        value: 'Új terület 126 egység² (-16% csökkenés)'
      },
      {
        id: 'p23',
        prompt: 'Toldi-tanya: 180 000 Ft síléc a támogatás 40%-a',
        value: '450 000 Ft a teljes elnyert pályázati összeg'
      },
      {
        id: 'p24',
        prompt: '1000 gyerekből 5% nem mos fogat a felmérésben',
        value: '50 gyerek nem mos fogat egyáltalán'
      }
    ]
  }
};

export const WordProblemsMatcher: React.FC<WordProblemsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-pct-word-matcher',
  topicTitle = 'Szöveges feladatok'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      grade={7}
      chapterId="g7-percent-equations"
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="teal"
      title="Szöveges feladatok - Párkereső Játék"
      badge="PÁRKERESŐ"
    />
  );
};

export default WordProblemsMatcher;

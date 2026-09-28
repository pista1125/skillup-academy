import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CongruenceTransformMatcherProps {
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
    title: '1. Szint: Alapfogalmak és Invariáns Tulajdonságok',
    subtitle: 'Párosítsd a geometriai transzformációk fogalmait és alapvető tulajdonságait!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Tárgypont és képpont',
        value: 'A P eredeti pontból az utasítás szerint a sík P\' pontját kapjuk',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="18" cy="15" r="3" className="fill-emerald-700" />
            <circle cx="52" cy="15" r="3" className="fill-emerald-700" />
            <path d="M 22 12 Q 35 6 48 12" fill="none" className="stroke-emerald-600 stroke-[1.5]" />
            <polygon points="49,13 43,9 45,16" className="fill-emerald-600" />
            <text x="14" y="26" className="text-[7px] font-bold fill-emerald-800">P</text>
            <text x="50" y="26" className="text-[7px] font-bold fill-emerald-800">P'</text>
          </svg>
        )
      },
      {
        id: 'p2',
        prompt: "Távolságtartás (|A'B'| = |AB|)",
        value: 'Bármely két pont képtávolsága megegyezik az eredeti távolságukkal',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="30" y2="15" className="stroke-emerald-600 stroke-[2]" />
            <line x1="40" y1="15" x2="60" y2="15" className="stroke-emerald-600 stroke-[2]" />
            <text x="17" y="11" className="text-[7px] font-bold fill-emerald-700">d</text>
            <text x="47" y="11" className="text-[7px] font-bold fill-emerald-700">d' = d</text>
          </svg>
        )
      },
      {
        id: 'p3',
        prompt: "Szögtartás (α' = α)",
        value: 'A képszög nagysága pontosan megegyezik az eredeti szöggel',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="24" x2="35" y2="24" className="stroke-teal-600 stroke-[1.8]" />
            <line x1="15" y1="24" x2="28" y2="8" className="stroke-teal-600 stroke-[1.8]" />
            <text x="22" y="19" className="text-[7px] font-bold fill-teal-700">α</text>
          </svg>
        )
      },
      {
        id: 'p4',
        prompt: "Területtartás (T' = T)",
        value: 'Bármely sokszög vagy zárt síkidom területe változatlan marad',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="15,24 30,8 45,24" className="fill-emerald-100 stroke-emerald-600 stroke-[1.5]" />
            <text x="26" y="20" className="text-[7px] font-bold fill-emerald-800">T</text>
          </svg>
        )
      },
      {
        id: 'p5',
        prompt: 'Egyenestartás',
        value: 'Egyenes képe mindig egyenes, nem görbül meg',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="22" x2="60" y2="10" className="stroke-blue-600 stroke-[2]" />
            <text x="50" y="24" className="text-[7px] font-mono font-bold fill-blue-700">e</text>
          </svg>
        )
      },
      {
        id: 'p6',
        prompt: 'Párhuzamosságtartás',
        value: 'Párhuzamos egyenesek képei szintén párhuzamosak (e ∥ f ⟹ e\' ∥ f\')',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="10" x2="60" y2="10" className="stroke-blue-600 stroke-[1.8]" />
            <line x1="10" y1="20" x2="60" y2="20" className="stroke-blue-600 stroke-[1.8]" />
          </svg>
        )
      },
      {
        id: 'p7',
        prompt: 'Tengelyes tükrözés (t)',
        value: 'Megfordítja az alakzat körüljárási irányát (indirekt egybevágóság)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="35" y1="4" x2="35" y2="26" className="stroke-indigo-600 stroke-[2]" />
            <text x="18" y="20" className="text-[7px] font-bold fill-indigo-700">↺</text>
            <text x="44" y="20" className="text-[7px] font-bold fill-teal-700">↻</text>
          </svg>
        )
      },
      {
        id: 'p8',
        prompt: 'Középpontos tükrözés (K)',
        value: 'Megőrzi a körüljárási irányt, és 180°-os elforgatással egyenértékű',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="3" className="fill-teal-700" />
            <text x="32" y="27" className="text-[7px] font-bold fill-teal-800">K</text>
          </svg>
        )
      },
      {
        id: 'p9',
        prompt: 'Párhuzamos eltolás (v⃗)',
        value: 'Minden pontot azonos irányban és távolságra mozdít el (0 fixpont)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="15" x2="50" y2="15" className="stroke-blue-600 stroke-[2]" />
            <polygon points="55,15 48,11 48,19" className="fill-blue-600" />
            <text x="30" y="11" className="text-[7px] font-bold fill-blue-700">v⃗</text>
          </svg>
        )
      },
      {
        id: 'p10',
        prompt: 'Fixpont (P\' = P)',
        value: 'Olyan pont a síkon, amelynek a képe önmaga (helyben marad)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="4" className="fill-rose-600" />
            <text x="43" y="18" className="text-[7px] font-bold fill-rose-700">P = P'</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Tükrözések a Koordináta-rendszerben',
    subtitle: 'Párosítsd a pontok tükrözési szabályait és a koordináták változását!',
    pairs: [
      {
        id: 'p11',
        prompt: 'x tengelyre tükrözés szabálya',
        value: '(x; y) ↦ (x; -y)  (az y koordináta ellentettjére vált)'
      },
      {
        id: 'p12',
        prompt: 'y tengelyre tükrözés szabálya',
        value: '(x; y) ↦ (-x; y)  (az x koordináta ellentettjére vált)'
      },
      {
        id: 'p13',
        prompt: 'Origóra (O(0;0)) tükrözés',
        value: '(x; y) ↦ (-x; -y)  (mindkét koordináta az ellentettjére vált)'
      },
      {
        id: 'p14',
        prompt: 'y = x szögfelezőre tükrözés',
        value: '(x; y) ↦ (y; x)  (a koordináták egyszerűen helyet cserélnek)'
      },
      {
        id: 'p15',
        prompt: 'P(3; -4) tükörképe x tengelyre',
        value: "P'(3; 4)"
      },
      {
        id: 'p16',
        prompt: 'Q(-5; 2) tükörképe y tengelyre',
        value: "Q'(5; 2)"
      },
      {
        id: 'p17',
        prompt: 'R(2; -7) tükörképe az origóra',
        value: "R'(-2; 7)"
      },
      {
        id: 'p18',
        prompt: 'Háromszög tükrözése az egyik oldalára',
        value: 'Deltoid négyszöget kapunk az eredeti és képe uniójaként'
      },
      {
        id: 'p19',
        prompt: 'Háromszög tükrözése az oldal felezőpontjára',
        value: 'Paralelogramma négyszöget kapunk (átlók kölcsönösen felezik egymást)'
      },
      {
        id: 'p20',
        prompt: 'Fixegyenes fogalma',
        value: 'Olyan egyenes, amely önmagába képződik le (e\' = e), de pontjai elmozdulhatnak'
      }
    ]
  },
  3: {
    title: '3. Szint: Alapesetek és Összetett Transzformációk',
    subtitle: 'Párosítsd a háromszögek egybevágósági eseteit és a mélyebb geometriai összefüggéseket!',
    pairs: [
      {
        id: 'p21',
        prompt: 'o - o - o alapeset',
        value: 'Három oldal páronkénti egyenlősége igazolja a háromszögek egybevágóságát'
      },
      {
        id: 'p22',
        prompt: 'o - sz - o alapeset',
        value: 'Két oldal és a közbezárt szög egyenlősége elegendő az egybevágósághoz'
      },
      {
        id: 'p23',
        prompt: 'sz - o - sz alapeset',
        value: 'Egy oldal és a rajta fekvő két szög egyenlősége'
      },
      {
        id: 'p24',
        prompt: 'd - o - o alapeset',
        value: 'Két oldal és a nagyobbikkal szemközti szög egyenlősége'
      },
      {
        id: 'p25',
        prompt: 'Kétszeri tükrözés ugyanarra a tengelyre',
        value: 'Identitás (helybenhagyás: minden pont visszakerül az eredeti helyére)'
      },
      {
        id: 'p26',
        prompt: 'Tükrözés két párhuzamos egyenesre (d távolság)',
        value: 'Párhuzamos eltolást eredményez, hossza 2·d'
      },
      {
        id: 'p27',
        prompt: 'P(3; 4) tükrözése a K(1; 1) pontra',
        value: "P'(-1; -2)  (x' = 2·1 - 3 = -1,  y' = 2·1 - 4 = -2)"
      },
      {
        id: 'p28',
        prompt: 'Középpontos tükrözés K centruma',
        value: 'A tükrözött pontpár (AA\') összekötő szakaszának felezőpontja'
      },
      {
        id: 'p29',
        prompt: 'Tengelyes tükrözés fixpontjainak száma',
        value: 'Végtelen sok (a tükörtengely minden pontja fixpont)'
      },
      {
        id: 'p30',
        prompt: 'Kör tükrözése egybevágósággal',
        value: 'A sugár nem változik meg (r\' = r), csak a középpont helye módosul'
      }
    ]
  }
};

export const CongruenceTransformMatcher: React.FC<CongruenceTransformMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-geom-congruence-matcher',
  topicTitle = '1. Egybevágósági transzformációk Párosító'
}) => {
  return (
    <MatcherTemplate
      level={level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="emerald"
      badge="8. Osztály • Geometria"
      levels={matcherLevels}
    />
  );
};

export default CongruenceTransformMatcher;

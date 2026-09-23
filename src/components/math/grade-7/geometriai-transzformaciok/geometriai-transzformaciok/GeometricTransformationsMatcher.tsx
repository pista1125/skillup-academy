import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometricTransformationsMatcherProps {
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
    subtitle: 'Párosítsd a geometriai leképezések fogalmait, tulajdonságait és ábráit!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Tárgypont és képpont',
        value: 'A sík P kiindulópontjához a szabály egyértelműen hozzárendeli a P\' pontot',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="20" cy="18" r="3" className="fill-teal-700" />
            <circle cx="50" cy="18" r="3" className="fill-teal-700" />
            <path d="M 24 14 Q 35 8 45 14" fill="none" className="stroke-teal-600 stroke-[1.5]" />
            <polygon points="46,15 40,11 43,18" className="fill-teal-600" />
            <text x="14" y="29" className="text-[8px] font-bold fill-teal-800">P</text>
            <text x="47" y="29" className="text-[8px] font-bold fill-teal-800">P'</text>
          </svg>
        )
      },
      {
        id: 'p2',
        prompt: 'Távolságtartás (|P\'Q\'| = |PQ|)',
        value: 'Bármely két pont távolsága megegyezik a képpontjaik távolságával (egybevágóság)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="12" y1="12" x2="32" y2="12" className="stroke-indigo-600 stroke-[2]" />
            <line x1="38" y1="24" x2="58" y2="24" className="stroke-indigo-600 stroke-[2]" />
            <text x="18" y="9" className="text-[7px] font-bold fill-indigo-700">d</text>
            <text x="44" y="21" className="text-[7px] font-bold fill-indigo-700">d' = d</text>
          </svg>
        )
      },
      {
        id: 'p3',
        prompt: 'Szögtartás (α\' = α)',
        value: 'Egy szög képe pontosan azonos nagyságú az eredeti szöggel',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="28" x2="35" y2="28" className="stroke-teal-600 stroke-[1.8]" />
            <line x1="15" y1="28" x2="30" y2="10" className="stroke-teal-600 stroke-[1.8]" />
            <path d="M 23 28 A 8 8 0 0 0 21 21" fill="none" className="stroke-teal-500 stroke-[1.2]" />
            <text x="23" y="21" className="text-[7px] font-bold fill-teal-700">α</text>
          </svg>
        )
      },
      {
        id: 'p4',
        prompt: 'Területtartás (T\' = T)',
        value: 'Bármely sokszög vagy síkidom területe változatlan marad a képnél',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="15,26 30,10 45,26" className="fill-emerald-100 stroke-emerald-600 stroke-[1.5]" />
            <text x="25" y="22" className="text-[8px] font-bold fill-emerald-800">T</text>
          </svg>
        )
      },
      {
        id: 'p5',
        prompt: 'Egyenestartás',
        value: 'Egyenes képe mindig egyenes, nem görbül meg',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="22" x2="60" y2="12" className="stroke-blue-600 stroke-[2]" />
            <text x="50" y="24" className="text-[8px] font-mono font-bold fill-blue-700">e</text>
          </svg>
        )
      },
      {
        id: 'p6',
        prompt: 'Párhuzamosságtartás',
        value: 'Párhuzamos egyenesek képei szintén párhuzamosak (e ∥ f ⟹ e\' ∥ f\')',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="12" x2="60" y2="12" className="stroke-blue-600 stroke-[1.8]" />
            <line x1="10" y1="24" x2="60" y2="24" className="stroke-blue-600 stroke-[1.8]" />
          </svg>
        )
      },
      {
        id: 'p7',
        prompt: 'Tengelyes tükrözés (t)',
        value: 'Megfordítja az alakzat körüljárási irányát (indirekt egybevágóság)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="35" y1="4" x2="35" y2="31" className="stroke-indigo-600 stroke-[2]" />
            <polygon points="26,12 14,24 26,26" className="fill-teal-100 stroke-teal-600 stroke-[1.2]" />
            <polygon points="44,12 56,24 44,26" className="fill-indigo-100 stroke-indigo-600 stroke-[1.2]" />
          </svg>
        )
      },
      {
        id: 'p8',
        prompt: 'Középpontos tükrözés (O)',
        value: '180°-os forgatásként viselkedik, megőrzi a körüljárási irányt',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="18" r="3" className="fill-teal-700" />
            <line x1="18" y1="8" x2="52" y2="28" className="stroke-slate-400 stroke-[1] stroke-dasharray-[2,2]" />
            <circle cx="18" cy="8" r="2" className="fill-teal-600" />
            <circle cx="52" cy="28" r="2" className="fill-teal-600" />
            <text x="32" y="14" className="text-[7px] font-bold fill-teal-700">O</text>
          </svg>
        )
      },
      {
        id: 'p9',
        prompt: 'Párhuzamos eltolás (v)',
        value: 'Minden pontot azonos irányban és azonos távolsággal mozgat el',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="18" y1="18" x2="48" y2="18" className="stroke-blue-600 stroke-[2]" />
            <polygon points="53,18 46,14 46,22" className="fill-blue-600" />
            <text x="30" y="14" className="text-[7px] font-bold fill-blue-700">v</text>
          </svg>
        )
      },
      {
        id: 'p10',
        prompt: 'Illeszkedéstartás',
        value: 'Ha P pont illeszkedik az e egyenesre, akkor P\' pont is illeszkedik e\' képre',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="12" y1="24" x2="58" y2="12" className="stroke-slate-500 stroke-[1.8]" />
            <circle cx="35" cy="18" r="3" className="fill-teal-600" />
            <text x="33" y="13" className="text-[7px] font-bold fill-teal-700">P</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Fixpontok, Fixegyenesek és Forgatás',
    subtitle: 'Párosítsd a fix elemek típusait a megfelelő transzformációkkal és tételekkel!',
    pairs: [
      {
        id: 'p11',
        prompt: 'Tengelyes tükrözés fixpontjai',
        value: 'A tükörtengely minden egyes pontja fixpont (végtelen sok fixpont)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="35" y1="4" x2="35" y2="31" className="stroke-indigo-600 stroke-[2]" />
            <circle cx="35" cy="10" r="2.5" className="fill-rose-600" />
            <circle cx="35" cy="18" r="2.5" className="fill-rose-600" />
            <circle cx="35" cy="26" r="2.5" className="fill-rose-600" />
          </svg>
        )
      },
      {
        id: 'p12',
        prompt: 'Középpontos tükrözés fixpontja',
        value: 'Pontosan 1 darab fixpontja van: maga az O középpont (centrum)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="18" r="3.5" className="fill-rose-600" />
            <circle cx="35" cy="18" r="8" fill="none" className="stroke-rose-400 stroke-[1] stroke-dasharray-[2,2]" />
            <text x="39" y="16" className="text-[8px] font-bold fill-rose-700">O</text>
          </svg>
        )
      },
      {
        id: 'p13',
        prompt: 'Eltolás fixpontjai',
        value: 'Nincs egyetlen fixpontja sem (feltéve, hogy a vektor nem nulla)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="18" x2="45" y2="18" className="stroke-blue-600 stroke-[1.8]" />
            <polygon points="50,18 43,14 43,22" className="fill-blue-600" />
            <text x="24" y="14" className="text-[7px] font-bold fill-blue-700">v ≠ 0</text>
          </svg>
        )
      },
      {
        id: 'p14',
        prompt: 'Pontonként fix egyenes',
        value: 'Olyan egyenes, amelynek minden egyes pontja fixpont (pl. tükörtengely)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="18" x2="60" y2="18" className="stroke-indigo-600 stroke-[2.5]" />
            <text x="45" y="14" className="text-[7px] font-bold fill-indigo-700">t = t'</text>
          </svg>
        )
      },
      {
        id: 'p15',
        prompt: 'Nem pontonként fix egyenes',
        value: 'Az egyenes halmazként önmagába megy át, de pontjai vándorolnak rajta',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="18" x2="60" y2="18" className="stroke-teal-600 stroke-[2]" />
            <circle cx="25" cy="18" r="2" className="fill-teal-700" />
            <circle cx="45" cy="18" r="2" className="fill-teal-700" />
            <path d="M 27 15 Q 35 11 43 15" fill="none" className="stroke-slate-500 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 'p16',
        prompt: 'Tengelyre merőleges egyenes',
        value: 'Tengelyes tükrözésnél fixegyenes, de nem pontonként fix',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="35" y1="4" x2="35" y2="31" className="stroke-slate-500 stroke-[1.8]" />
            <line x1="12" y1="18" x2="58" y2="18" className="stroke-indigo-600 stroke-[2]" />
            <rect x="35" y="18" width="5" height="5" fill="none" className="stroke-indigo-500 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 'p17',
        prompt: 'Centrumon átmenő egyenes',
        value: 'Középpontos tükrözésnél mindig fixegyenes',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="12" y1="26" x2="58" y2="10" className="stroke-teal-600 stroke-[2]" />
            <circle cx="35" cy="18" r="2.5" className="fill-teal-700" />
            <text x="32" y="26" className="text-[7px] font-bold fill-teal-800">O</text>
          </svg>
        )
      },
      {
        id: 'p18',
        prompt: 'Elforgatás (O, α)',
        value: 'A pontok az O centrumtól mért távolságukat megtartva azonos α szöggel fordulnak',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="25" cy="24" r="2.5" className="fill-purple-700" />
            <line x1="25" y1="24" x2="52" y2="24" className="stroke-purple-600 stroke-[1.5]" />
            <line x1="25" y1="24" x2="48" y2="8" className="stroke-purple-600 stroke-[1.5]" />
            <path d="M 40 24 A 15 15 0 0 0 38 15" fill="none" className="stroke-purple-500 stroke-[1.2]" />
            <text x="39" y="19" className="text-[7px] font-bold fill-purple-700">α</text>
          </svg>
        )
      },
      {
        id: 'p19',
        prompt: 'Forgatás fixpontja',
        value: 'Pontosan az O forgási középpont (ha a forgásszög nem teljes kör)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="18" r="3.5" className="fill-purple-700" />
            <text x="39" y="16" className="text-[8px] font-bold fill-purple-700">O</text>
          </svg>
        )
      },
      {
        id: 'p20',
        prompt: 'Helybenhagyás (Identitás)',
        value: 'Olyan leképezés, amely a sík minden pontját önmagára képezi le (P\' = P)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="18" r="3" className="fill-emerald-600" />
            <text x="26" y="12" className="text-[7px] font-bold fill-emerald-700">P = P'</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Transzformációk Összetétele és Koordináták',
    subtitle: 'Párosítsd a transzformációk összetételét és koordináta-szabályait az eredménnyel!',
    pairs: [
      {
        id: 'p21',
        prompt: 'x-tengelyre tükrözés',
        value: '(x, y) ↦ (x, -y) — az ordináta előjelet vált',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="8" y1="18" x2="62" y2="18" className="stroke-slate-400 stroke-[1]" />
            <circle cx="35" cy="9" r="2.5" className="fill-teal-600" />
            <circle cx="35" cy="27" r="2.5" className="fill-teal-600" />
            <text x="38" y="11" className="text-[6px] font-mono fill-teal-700">(x,y)</text>
            <text x="38" y="29" className="text-[6px] font-mono fill-teal-700">(x,-y)</text>
          </svg>
        )
      },
      {
        id: 'p22',
        prompt: 'y-tengelyre tükrözés',
        value: '(x, y) ↦ (-x, y) — az abszcissza előjelet vált',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="35" y1="4" x2="35" y2="31" className="stroke-slate-400 stroke-[1]" />
            <circle cx="20" cy="18" r="2.5" className="fill-teal-600" />
            <circle cx="50" cy="18" r="2.5" className="fill-teal-600" />
            <text x="10" y="27" className="text-[6px] font-mono fill-teal-700">(-x,y)</text>
            <text x="44" y="27" className="text-[6px] font-mono fill-teal-700">(x,y)</text>
          </svg>
        )
      },
      {
        id: 'p23',
        prompt: 'Origóra tükrözés',
        value: '(x, y) ↦ (-x, -y) — mindkét koordináta ellentettjére változik',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="16" y1="26" x2="54" y2="10" className="stroke-slate-300 stroke-[1] stroke-dasharray-[2,2]" />
            <circle cx="35" cy="18" r="2" className="fill-slate-600" />
            <circle cx="16" cy="26" r="2.5" className="fill-teal-600" />
            <circle cx="54" cy="10" r="2.5" className="fill-teal-600" />
          </svg>
        )
      },
      {
        id: 'p24',
        prompt: 'Eltolás v(a, b) vektorral',
        value: '(x, y) ↦ (x + a, y + b)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="18" y1="22" x2="48" y2="12" className="stroke-blue-600 stroke-[1.8]" />
            <polygon points="52,11 45,10 47,16" className="fill-blue-600" />
            <text x="24" y="14" className="text-[6px] font-mono font-bold fill-blue-700">+a, +b</text>
          </svg>
        )
      },
      {
        id: 'p25',
        prompt: 'Két párhuzamos tengelyre tükrözés',
        value: 'Eredője párhuzamos eltolás (távolság: 2 · d a tengelyek közti távolságnak)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="26" y1="5" x2="26" y2="30" className="stroke-indigo-600 stroke-[1.5]" />
            <line x1="44" y1="5" x2="44" y2="30" className="stroke-indigo-600 stroke-[1.5]" />
            <text x="31" y="20" className="text-[7px] font-bold fill-indigo-700">d</text>
          </svg>
        )
      },
      {
        id: 'p26',
        prompt: 'Két metsző tengelyre tükrözés',
        value: 'Eredője elforgatás a metszéspont körül (forgásszög: 2 · α)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="14" y1="28" x2="56" y2="8" className="stroke-purple-600 stroke-[1.5]" />
            <line x1="14" y1="8" x2="56" y2="28" className="stroke-purple-600 stroke-[1.5]" />
            <circle cx="35" cy="18" r="2" className="fill-purple-700" />
          </svg>
        )
      },
      {
        id: 'p27',
        prompt: 'Két középpontos tükrözés egymás után',
        value: 'Eredője mindig párhuzamos eltolás (2 · O₁O₂ vektorral)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="25" cy="18" r="2.5" className="fill-teal-700" />
            <circle cx="45" cy="18" r="2.5" className="fill-teal-700" />
            <line x1="25" y1="18" x2="45" y2="18" className="stroke-teal-600 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 'p28',
        prompt: 'Páros számú tengelyes tükrözés',
        value: 'Megőrzi a körüljárási irányt (egyenes egybevágóságot eredményez)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="20" y="21" className="text-[8px] font-bold fill-emerald-700 font-mono">2k db ⟹ (+)</text>
          </svg>
        )
      },
      {
        id: 'p29',
        prompt: 'Páratlan számú tengelyes tükrözés',
        value: 'Megfordítja a körüljárási irányt (fordított egybevágóságot ad)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="16" y="21" className="text-[8px] font-bold fill-rose-700 font-mono">2k+1 db ⟹ (-)</text>
          </svg>
        )
      },
      {
        id: 'p30',
        prompt: 'Origó körüli +90°-os forgatás',
        value: '(x, y) ↦ (-y, x)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="35" y1="18" x2="52" y2="18" className="stroke-purple-600 stroke-[1.8]" />
            <line x1="35" y1="18" x2="35" y2="5" className="stroke-purple-600 stroke-[1.8]" />
            <rect x="35" y="12" width="6" height="6" fill="none" className="stroke-purple-500 stroke-[1]" />
          </svg>
        )
      }
    ]
  }
};

export const GeometricTransformationsMatcher: React.FC<GeometricTransformationsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g7-geom-transformations',
  topicTitle = '4. Geometriai transzformációk'
}) => {
  return (
    <MatcherTemplate
      level={level}
      grade={7}
      chapterId="g7-geom-trans"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Geometriai Transzformációk Párosító"
      subtitle="Párosítsd a transzformációkat, invariáns tulajdonságaikat, fix elemeiket és ábráikat!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default GeometricTransformationsMatcher;

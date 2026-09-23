import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrianglesAndQuadrilateralsMatcherProps {
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
    title: '1. Szint: Háromszögek Fajtái és Szabályai',
    subtitle: 'Párosítsd a háromszögtípusokat, definícióikat, tételeiket és ábráikat!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Hegyesszögű háromszög',
        value: 'Mindhárom belső szöge kisebb 90°-nál',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,6 10,30 60,30" className="fill-emerald-100 stroke-emerald-600 stroke-[2]" />
          </svg>
        )
      },
      {
        id: 'p2',
        prompt: 'Derékszögű háromszög',
        value: 'Pontosan 1 db 90°-os derékszöge van (befogók, átfogó)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="15,6 15,30 60,30" className="fill-blue-100 stroke-blue-600 stroke-[2]" />
            <rect x="15" y="22" width="8" height="8" fill="none" className="stroke-blue-500 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 'p3',
        prompt: 'Tompaszögű háromszög',
        value: 'Pontosan 1 db 90°-nál nagyobb szöge van',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="25,12 8,30 65,30" className="fill-amber-100 stroke-amber-600 stroke-[2]" />
          </svg>
        )
      },
      {
        id: 'p4',
        prompt: 'Egyenlő szárú háromszög',
        value: '2 oldala egyenlő (szárak), alapon fekvő szögei egyenlők',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,6 12,30 58,30" className="fill-indigo-100 stroke-indigo-600 stroke-[2]" />
            <line x1="35" y1="6" x2="35" y2="30" className="stroke-indigo-400 stroke-[1.5]" strokeDasharray="2 2" />
          </svg>
        )
      },
      {
        id: 'p5',
        prompt: 'Szabályos háromszög',
        value: 'Mindhárom oldala egyenlő, minden szöge 60°',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,8 10,32 60,32" className="fill-purple-100 stroke-purple-600 stroke-[2]" />
          </svg>
        )
      },
      {
        id: 'p6',
        prompt: 'Belső szögek összege',
        value: 'α + β + γ = 180° (minden háromszögben)',
        hint: 'Egyenesszöget zár be a 3 belső szög'
      },
      {
        id: 'p7',
        prompt: 'Külső szög tétele',
        value: 'α\' = β + γ (egyenlő a 2 nem mellette fekvő belső szög összegével)',
        hint: 'A külső szög és a mellette fekvő belső szög összege 180°'
      },
      {
        id: 'p8',
        prompt: 'Háromszög-egyenlőtlenség',
        value: 'a + b > c (bármely két oldal összege nagyobb a 3. oldalnál)',
        hint: 'A két rövidebb oldal összege nagyobb kell legyen a leghosszabbnál'
      }
    ]
  },
  2: {
    title: '2. Szint: Négyszögek Fajtái és Alaptulajdonságaik',
    subtitle: 'Párosítsd a négyszögeket tulajdonságaikkal, definícióikkal és ábráikkal!',
    pairs: [
      {
        id: 'p9',
        prompt: 'Négyszög belső szögei',
        value: 'α + β + γ + δ = 360° (bármely négyszögben)',
        hint: 'Egy átlóval két darab 180°-os háromszögre bontható'
      },
      {
        id: 'p10',
        prompt: 'Trapéz',
        value: 'Legalább 1 pár párhuzamos oldala van (alapok: a ∥ c)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="20,10 50,10 65,30 8,30" className="fill-slate-100 stroke-slate-600 stroke-[2]" />
          </svg>
        )
      },
      {
        id: 'p11',
        prompt: 'Paralelogramma',
        value: '2 pár párhuzamos oldal, átlói felezik egymást',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="22,8 65,8 50,28 8,28" className="fill-indigo-100 stroke-indigo-600 stroke-[2]" />
          </svg>
        )
      },
      {
        id: 'p12',
        prompt: 'Téglalap',
        value: 'Egyenlő szögű paralelogramma: mind a 4 szöge 90°',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="10" y="8" width="50" height="22" className="fill-blue-100 stroke-blue-600 stroke-[2]" />
          </svg>
        )
      },
      {
        id: 'p13',
        prompt: 'Rombusz',
        value: 'Egyenlő oldalú paralelogramma: mind a 4 oldala egyenlő (a)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,6 60,18 35,30 10,18" className="fill-purple-100 stroke-purple-600 stroke-[2]" />
          </svg>
        )
      },
      {
        id: 'p14',
        prompt: 'Négyzet',
        value: 'Szabályos négyszög: 4 egyenlő oldal és négy 90°-os szög',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="22" y="6" width="24" height="24" className="fill-emerald-100 stroke-emerald-600 stroke-[2]" />
          </svg>
        )
      },
      {
        id: 'p15',
        prompt: 'Deltoid',
        value: 'Két-két szomszédos oldala egyenlő, átlói merőlegesek',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,5 55,16 35,31 15,16" className="fill-rose-100 stroke-rose-600 stroke-[2]" />
          </svg>
        )
      },
      {
        id: 'p16',
        prompt: 'Húrtrapéz (szimmetrikus)',
        value: 'Szárai és alapon fekvő szögei egyenlők, átlói egyenlők',
        hint: '1 szimmetriatengelye van és köré kör írható'
      }
    ]
  },
  3: {
    title: '3. Szint: Átlók, Szimmetriák és Tételek',
    subtitle: 'Párosítsd a speciális négyszögek átlótulajdonságait és geometriai tételeit!',
    pairs: [
      {
        id: 'p17',
        prompt: 'Rombusz átlói',
        value: 'Merőlegesen felezik egymást (e ⊥ f) és felezik a belső szögeket',
        hint: 'Az átlók a rombusz szimmetriatengelyei'
      },
      {
        id: 'p18',
        prompt: 'Téglalap átlói',
        value: 'Egyenlő hosszúak (e = f) és felezik egymást',
        hint: 'Metszéspontjuk a köré írt kör középpontja'
      },
      {
        id: 'p19',
        prompt: 'Négyzet átlói',
        value: 'Egyenlők, merőlegesen felezik egymást és szögfelezők',
        hint: 'A négyzet átlói 4 egybevágó egyenlő szárú derékszögű háromszögre bontják a négyzetet'
      },
      {
        id: 'p20',
        prompt: 'Deltoid főátlója',
        value: 'Szimmetriatengely, felezi a másik átlót és merőleges rá',
        hint: 'A két különböző csúcsot köti össze'
      },
      {
        id: 'p21',
        prompt: 'Húrnégyszög tétele',
        value: 'Szemközti szögeinek összege 180° (α + γ = 180° és β + δ = 180°)',
        hint: 'Akkor és csak akkor írható köré kör, ha ez teljesül'
      },
      {
        id: 'p22',
        prompt: 'Érintőnégyszög tétele',
        value: 'Szemközti oldalainak összege egyenlő (a + c = b + d)',
        hint: 'Akkor és csak akkor írható bele kör, ha ez teljesül'
      },
      {
        id: 'p23',
        prompt: 'Paralelogramma szomszédos szögei',
        value: 'Összegük mindig 180° (α + β = 180°)',
        hint: 'Mert a párhuzamos szárak közötti belső szögek'
      },
      {
        id: 'p24',
        prompt: 'Négyzet szimmetriatengelyei',
        value: 'Pontosan 4 db szimmetriatengely (2 oldalfelező + 2 átló)',
        hint: 'Szabályos 4-szög'
      }
    ]
  }
};

export const TrianglesAndQuadrilateralsMatcher: React.FC<TrianglesAndQuadrilateralsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g7-geom-triangles-quads',
  topicTitle = '3. Háromszögek és négyszögek'
}) => {
  return (
    <MatcherTemplate
      level={level}
      grade={7}
      chapterId="g7-geom-trans"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Háromszögek és Négyszögek Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd a síkidomokat definícióikkal, ábráikkal és tulajdonságaikkal!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default TrianglesAndQuadrilateralsMatcher;

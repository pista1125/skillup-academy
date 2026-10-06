import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EarthSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Szélességi vs. Hosszúsági Körök',
    subtitle: 'Csoportosítsd a tulajdonságokat a megfelelő fokhálózati vonalhoz!',
    categories: [
      {
        id: 'cat-lat',
        name: 'Szélességi Körök (Paralellek)',
        description: 'Egyenlítővel párhuzamos körök, 0° - 90° (É és D)',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-lon',
        name: 'Hosszúsági Körök (Meridiánok)',
        description: 'Sarkokat összekötő fél-főkörök, 0° - 180° (K és Ny)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-both',
        name: 'Mindkettőre Jellemző',
        description: 'A teljes fokhálózatra vagy mindkét vonaltípusra érvényes',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'es1-1', label: 'Párhuzamosak az Egyenlítő síkjával', category: 'cat-lat' },
      { id: 'es1-2', label: '0° és 90° (É és D) közötti értékeket vesznek fel', category: 'cat-lat' },
      { id: 'es1-3', label: 'Kerületük a sarkok felé haladva fokozatosan csökken', category: 'cat-lat' },
      { id: 'es1-4', label: 'Sugár képlete: r = R · cos(φ)', category: 'cat-lat' },
      { id: 'es1-5', label: 'Mindegyik áthalad az Északi és Déli sarkon', category: 'cat-lon' },
      { id: 'es1-6', label: 'Kezdővonaluk a Greenwich-i obszervatórium (0°)', category: 'cat-lon' },
      { id: 'es1-7', label: 'Hosszuk mindegyiknél azonos: kb. 20 000 km-es félkörök', category: 'cat-lon' },
      { id: 'es1-8', label: '0° és 180° (K és Ny) között számozzuk őket', category: 'cat-lon' },
      { id: 'es1-9', label: 'Fokokban (°) és szögpercekben adjuk meg az értéküket', category: 'cat-both' },
      { id: 'es1-10', label: 'Együttesen egyértelműen meghatározzák a felszíni pontok helyét (GPS)', category: 'cat-both' },
      { id: 'es1-11', label: 'A Föld gömbmodelljén helyezkednek el', category: 'cat-both' },
      { id: 'es1-12', label: 'Merőlegesen (90°-ban) metszik egymást a gömbfelületen', category: 'cat-both' }
    ]
  },
  2: {
    title: '2. Szint: Geometriai Mennyiségek Dimenziói',
    subtitle: 'Döntsd el, hogy az adott Föld-adat hosszúság (1D), felszín (2D) vagy térfogat (3D)!',
    categories: [
      {
        id: 'cat-1d',
        name: 'Hosszúság és Kerület (1D, km)',
        description: 'Vonalas méretek, átmérők, körkerületek és távolságok',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-2d',
        name: 'Felszín és Terület (2D, km²)',
        description: 'Kétdimenziós felületek, óceánok és kontinensek kiterjedése',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-3d',
        name: 'Térfogat és Űrmérték (3D, km³)',
        description: 'Háromdimenziós térbeli kiterjedés és térfogat',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      { id: 'es2-1', label: 'Egyenlítő kerülete: K ≈ 40 000 km', category: 'cat-1d' },
      { id: 'es2-2', label: 'Föld átlagos sugara: R ≈ 6370 km', category: 'cat-1d' },
      { id: 'es2-3', label: '1° szélesség menti távolság: 111,1 km', category: 'cat-1d' },
      { id: 'es2-4', label: 'Ortodróma főkör-ív hossza két város között', category: 'cat-1d' },
      { id: 'es2-5', label: 'Föld teljes felszíne: A ≈ 510 millió km²', category: 'cat-2d' },
      { id: 'es2-6', label: 'Világtenger vízfelülete: kb. 361 millió km²', category: 'cat-2d' },
      { id: 'es2-7', label: 'Szárazföld területe: kb. 149 millió km²', category: 'cat-2d' },
      { id: 'es2-8', label: 'Felszínképlet: A = 4πR²', category: 'cat-2d' },
      { id: 'es2-9', label: 'Föld térfogata: V ≈ 1083 milliárd km³', category: 'cat-3d' },
      { id: 'es2-10', label: 'Térfogatképlet: V = (4/3)πR³', category: 'cat-3d' },
      { id: 'es2-11', label: 'A bolygótest teljes térfogata köbkilométerben', category: 'cat-3d' },
      { id: 'es2-12', label: 'A Föld magjának és köpenyének köbös térfogata', category: 'cat-3d' }
    ]
  },
  3: {
    title: '3. Szint: Állítások a Föld Geometriájáról',
    subtitle: 'Döntsd el a geometriai állításokról, hogy mindig igazak, csak néha vagy hamisak!',
    categories: [
      {
        id: 'cat-true',
        name: 'Mindig Igaz Állítás',
        description: 'Matematikailag és földrajzilag minden körülmények között érvényes',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-sometimes',
        name: 'Csak Speciális Helyen / Közelítőleg Igaz',
        description: 'Csak adott szélességen vagy kerekítési közelítéssel teljesül',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-false',
        name: 'Mindig Hamis Állítás',
        description: 'Téves megállapítás vagy geometriai képtelenség',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'es3-1', label: 'Gömbfelületen a két pont közötti legrövidebb út a főkör íve (ortodróma).', category: 'cat-true' },
      { id: 'es3-2', label: 'A délkörök mentén 1° elmozdulás mindig kb. 111,1 km távolságot jelent.', category: 'cat-true' },
      { id: 'es3-3', label: 'Az Egyenlítő az egyetlen szélességi kör, amely egyben főkör is.', category: 'cat-true' },
      { id: 'es3-4', label: 'Eratoszthenész a déli napsugarak beesési szögéből számolta ki a kerületet.', category: 'cat-true' },
      { id: 'es3-5', label: '1° hosszúságkülönbség pontosan 111,1 km távolságot jelent.', category: 'cat-sometimes' },
      { id: 'es3-6', label: 'A szélességi kör kerülete pontosan 20 000 km.', category: 'cat-sometimes' },
      { id: 'es3-7', label: 'A Föld felszínén a forgási kerületi sebesség kb. 1670 km/h.', category: 'cat-sometimes' },
      { id: 'es3-8', label: 'Egy nap pontosan 24 óra hosszan tart.', category: 'cat-sometimes' },
      { id: 'es3-9', label: 'A Föld sugara a pólusoknál nagyobb, mint az Egyenlítőnél.', category: 'cat-false' },
      { id: 'es3-10', label: 'A hosszúsági körök párhuzamosak egymással a Föld felszínén.', category: 'cat-false' },
      { id: 'es3-11', label: 'Sík térképen a vonalzóval húzott egyenes szakasz a legrövidebb repülési út.', category: 'cat-false' },
      { id: 'es3-12', label: 'A Föld felszínének több mint 50%-át szárazföld borítja.', category: 'cat-false' }
    ]
  }
};

export const EarthSorter: React.FC<EarthSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-solids-earth',
  topicTitle = 'A Föld Geometriája (Csoportosító)'
}) => {
  const activeLvl: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;

  return (
    <SorterTemplate
      key={`earth-sorter-${activeLvl}`}
      level={activeLvl}
      currentLevel={activeLvl}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      levelConfigs={sorterLevels}
      levelConfig={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      themeColor="teal"
      topicId={topicId}
      topicTitle={topicTitle}
      badge="8. Osztály • VII. Testek"
    />
  );
};

export default EarthSorter;

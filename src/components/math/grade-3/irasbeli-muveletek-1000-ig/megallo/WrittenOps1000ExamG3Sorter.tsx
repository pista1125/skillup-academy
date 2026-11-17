import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortAdd, SortSub, SmallChain, SmallWallet, MiniBar, MiniRoute, MiniRows } from './WrittenOps1000ExamG3CardFigures';

interface Props {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

export const WRITTEN_OPS_1000_EXAM_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Mekkora az eredmény?',
    description: 'Számolj írásban, és tedd a helyére!',
    categories: [
      { id: 'lo', name: '400-nál kevesebb', color: 'sky' },
      { id: 'mid', name: '400 és 700 között', color: 'amber' },
      { id: 'hi', name: '700-nál több', color: 'rose' }
    ],
    items: [
      { id: 'wo1000es1', text: '912 − 548', categoryId: 'lo', figure: <SortSub a={912} b={548} /> },
      { id: 'wo1000es2', text: '1000 − 672', categoryId: 'lo', figure: <SortSub a={1000} b={672} /> },
      { id: 'wo1000es3', text: '128 + 145', categoryId: 'lo', figure: <SortAdd xs={[128, 145]} /> },
      { id: 'wo1000es4', text: '603 − 287', categoryId: 'lo', figure: <SortSub a={603} b={287} /> },
      { id: 'wo1000es5', text: '700 − 345', categoryId: 'lo' },
      { id: 'wo1000es6', text: '99 + 186', categoryId: 'lo' },
      { id: 'wo1000es7', text: '845 − 476', categoryId: 'lo' },
      { id: 'wo1000es8', text: '213 + 168', categoryId: 'lo' },
      { id: 'wo1000es9', text: '520 − 199', categoryId: 'lo' },
      { id: 'wo1000es10', text: '286 + 347', categoryId: 'mid', figure: <SortAdd xs={[286, 347]} /> },
      { id: 'wo1000es11', text: '905 − 438', categoryId: 'mid', figure: <SortSub a={905} b={438} /> },
      { id: 'wo1000es12', text: '1000 − 523', categoryId: 'mid', figure: <SortSub a={1000} b={523} /> },
      { id: 'wo1000es13', text: '158 + 169 + 204', categoryId: 'mid', figure: <SortAdd xs={[158, 169, 204]} /> },
      { id: 'wo1000es14', text: '764 − 329', categoryId: 'mid' },
      { id: 'wo1000es15', text: '375 + 298', categoryId: 'mid' },
      { id: 'wo1000es16', text: '800 − 256', categoryId: 'mid' },
      { id: 'wo1000es17', text: '612 − 186', categoryId: 'mid' },
      { id: 'wo1000es18', text: '444 + 219', categoryId: 'mid' },
      { id: 'wo1000es19', text: '468 + 375', categoryId: 'hi', figure: <SortAdd xs={[468, 375]} /> },
      { id: 'wo1000es20', text: '1000 − 185', categoryId: 'hi', figure: <SortSub a={1000} b={185} /> },
      { id: 'wo1000es21', text: '952 − 198', categoryId: 'hi', figure: <SortSub a={952} b={198} /> },
      { id: 'wo1000es22', text: '236 + 187 + 349', categoryId: 'hi', figure: <SortAdd xs={[236, 187, 349]} /> },
      { id: 'wo1000es23', text: '527 + 389', categoryId: 'hi' },
      { id: 'wo1000es24', text: '900 − 165', categoryId: 'hi' },
      { id: 'wo1000es25', text: '643 + 318', categoryId: 'hi' },
      { id: 'wo1000es26', text: '1000 − 97', categoryId: 'hi' },
      { id: 'wo1000es27', text: '815 − 107', categoryId: 'hi' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Hibavadász',
    description: 'Jól számolt? Ha nem, mi volt a hiba?',
    categories: [
      { id: 'ok', name: 'Jó', color: 'emerald' },
      { id: 'carry', name: 'Elfelejtette a maradékot', color: 'amber' },
      { id: 'order', name: 'Rossz a sorrend', color: 'purple' }
    ],
    items: [
      { id: 'wo1000es28', text: '358 + 276 = 634', categoryId: 'ok', figure: <SortAdd xs={[358, 276]} res={634} /> },
      { id: 'wo1000es29', text: '742 − 385 = 357', categoryId: 'ok', figure: <SortSub a={742} b={385} r={357} /> },
      { id: 'wo1000es30', text: '427 + 186 = 613', categoryId: 'ok', figure: <SortAdd xs={[427, 186]} res={613} /> },
      { id: 'wo1000es31', text: '1000 − 264 = 736', categoryId: 'ok', figure: <SortSub a={1000} b={264} r={736} /> },
      { id: 'wo1000es32', text: '820 − 300 + 150 = 670', categoryId: 'ok', figure: <SmallChain start="820" ops={['− 300', '+ 150']} /> },
      { id: 'wo1000es33', text: '500 − 4 · 80 = 180', categoryId: 'ok' },
      { id: 'wo1000es34', text: '(600 − 240) : 6 = 60', categoryId: 'ok' },
      { id: 'wo1000es35', text: '456 + 278 = 734', categoryId: 'ok' },
      { id: 'wo1000es36', text: '903 − 457 = 446', categoryId: 'ok' },
      { id: 'wo1000es37', text: '467 + 285 = 642', categoryId: 'carry', figure: <SortAdd xs={[467, 285]} res={642} /> },
      { id: 'wo1000es38', text: '832 − 457 = 485', categoryId: 'carry', figure: <SortSub a={832} b={457} r={485} /> },
      { id: 'wo1000es39', text: '538 + 174 = 602', categoryId: 'carry', figure: <SortAdd xs={[538, 174]} res={602} /> },
      { id: 'wo1000es40', text: '621 − 348 = 383', categoryId: 'carry', figure: <SortSub a={621} b={348} r={383} /> },
      { id: 'wo1000es41', text: '379 + 248 = 517', categoryId: 'carry' },
      { id: 'wo1000es42', text: '904 − 276 = 738', categoryId: 'carry' },
      { id: 'wo1000es43', text: '645 + 289 = 824', categoryId: 'carry' },
      { id: 'wo1000es44', text: '713 − 458 = 365', categoryId: 'carry' },
      { id: 'wo1000es45', text: '286 + 159 = 335', categoryId: 'carry' },
      { id: 'wo1000es46', text: '1000 − 400 + 200 = 400', categoryId: 'order', figure: <SmallChain start="1000" ops={['− 400', '+ 200']} /> },
      { id: 'wo1000es47', text: '900 − 300 − 200 = 800', categoryId: 'order', figure: <SmallChain start="900" ops={['− 300', '− 200']} /> },
      { id: 'wo1000es48', text: '200 + 20 · 4 = 880', categoryId: 'order' },
      { id: 'wo1000es49', text: '(500 − 100) : 4 = 475', categoryId: 'order' },
      { id: 'wo1000es50', text: '100 + 50 · 3 = 450', categoryId: 'order' },
      { id: 'wo1000es51', text: '480 − 80 : 8 = 50', categoryId: 'order' },
      { id: 'wo1000es52', text: '90 + 10 · 6 = 600', categoryId: 'order' },
      { id: 'wo1000es53', text: '3 · 40 + 60 = 300', categoryId: 'order' },
      { id: 'wo1000es54', text: '640 − 40 : 4 = 150', categoryId: 'order' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Hogyan oldod meg?',
    description: 'Olvasd el! Egy összeadás, egy kivonás, vagy két lépés kell?',
    categories: [
      { id: 'add', name: 'Egy összeadás', color: 'emerald' },
      { id: 'sub', name: 'Egy kivonás', color: 'sky' },
      { id: 'two', name: 'Két lépés kell', color: 'purple' }
    ],
    items: [
      { id: 'wo1000es55', text: 'Egy könyv 248 oldalas, a másik 375. Hány oldal ez együtt?', categoryId: 'add' },
      { id: 'wo1000es56', text: 'Két szakasz: 318 m és 456 m. Milyen hosszú az út?', categoryId: 'add', figure: <MiniRoute vb="s" d1="318" d2="456" /> },
      { id: 'wo1000es57', text: '□ − 285 = 460. Mennyi a □?', categoryId: 'add', figure: <MiniBar vb="s" whole="□" a="285" b="460" wa={0.4} /> },
      { id: 'wo1000es58', text: 'Anna 274 képet fotózott, Bálint 168-cal többet. Hány képet fotózott Bálint?', categoryId: 'add', figure: <MiniRows vb="s" a="274" diff="+168" more /> },
      { id: 'wo1000es59', text: 'A busz délelőtt 287 km-t, délután 196 km-t ment. Mennyit ment egész nap?', categoryId: 'add' },
      { id: 'wo1000es60', text: '□ − 345 = 410. Mennyi a □?', categoryId: 'add', figure: <MiniBar vb="s" whole="□" a="345" b="410" wa={0.45} /> },
      { id: 'wo1000es61', text: 'Gondoltam egy számot. Elvettem belőle 230-at, 515 lett. Melyik szám ez?', categoryId: 'add' },
      { id: 'wo1000es62', text: 'Mennyi a 465 és a 378 összege?', categoryId: 'add' },
      { id: 'wo1000es63', text: 'A körből 420 m-t futottál, még 380 m van hátra. Milyen hosszú a kör?', categoryId: 'add' },
      { id: 'wo1000es64', text: '1000 m-ből 615 m-t megtettél. Mennyi van hátra?', categoryId: 'sub' },
      { id: 'wo1000es65', text: '□ + 386 = 900. Mennyi a □?', categoryId: 'sub', figure: <MiniBar vb="s" whole="900" a="□" b="386" /> },
      { id: 'wo1000es66', text: '742 − □ = 358. Mennyi a □?', categoryId: 'sub', figure: <MiniBar vb="s" whole="742" a="□" b="358" /> },
      { id: 'wo1000es67', text: 'Mennyivel hosszabb a 645 m-es út a 478 m-esnél?', categoryId: 'sub' },
      { id: 'wo1000es68', text: 'Lilinek 530 gyöngye van. Dórinak 175-tel kevesebb. Hány gyöngye van Dórinak?', categoryId: 'sub', figure: <MiniRows vb="s" a="530" diff="−175" more={false} /> },
      { id: 'wo1000es69', text: '900 Ft-od van. Veszel egy 385 Ft-os labdát. Mennyi marad?', categoryId: 'sub' },
      { id: 'wo1000es70', text: 'Két szám összege 800. Az egyik 437. Mennyi a másik?', categoryId: 'sub' },
      { id: 'wo1000es71', text: 'Egy 1000 darabos kirakóból 368 darab kész. Hány darab van még hátra?', categoryId: 'sub' },
      { id: 'wo1000es72', text: 'Az út 760 m. Az első szakasz 285 m. Milyen hosszú a második?', categoryId: 'sub', figure: <MiniBar vb="s" whole="760" a="285" b="□" wa={0.4} /> },
      { id: 'wo1000es73', text: '1000 Ft-ból veszel egy 365 Ft-os és egy 280 Ft-os dolgot. Mennyi marad?', categoryId: 'two', figure: <SmallWallet money="1000" tags={['365', '280']} /> },
      { id: 'wo1000es74', text: 'Délelőtt 238 gombóc fagyi fogyott, délután 145-tel több. Hány egész nap?', categoryId: 'two', figure: <MiniRows vb="s" a="238" diff="+145" more /> },
      { id: 'wo1000es75', text: '4 dobozban 120-120 ceruza van. 135-öt kiosztottak. Hány maradt?', categoryId: 'two' },
      { id: 'wo1000es76', text: '1000 m-es versenyen Ádám 640 m-nél, Bori 715 m-nél tart. Mennyi van hátra kettejüknek?', categoryId: 'two' },
      { id: 'wo1000es77', text: 'Gondoltam egy számot. Hozzáadtam 250-et, aztán elvettem 180-at. 600 lett. Melyik szám ez?', categoryId: 'two' },
      { id: 'wo1000es78', text: '900 Ft-od van. Veszel 3 füzetet, mindegyik 150 Ft. Mennyi marad?', categoryId: 'two' },
      { id: 'wo1000es79', text: 'Az iskolába 486 gyerek jár, 248 fiú. Mennyivel több a fiú, mint a lány?', categoryId: 'two' },
      { id: 'wo1000es80', text: '800 Ft-ból veszel egy 245 Ft-os és egy 310 Ft-os dolgot. Mennyi marad?', categoryId: 'two', figure: <SmallWallet money="800" tags={['245', '310']} /> },
      { id: 'wo1000es81', text: 'Piros: 460 gyöngy, kék: 85-tel kevesebb. Hány gyöngy van együtt?', categoryId: 'two', figure: <MiniRows vb="s" a="460" diff="−85" more={false} /> }
    ]
  }
};

export const WrittenOps1000ExamG3Sorter: React.FC<Props> = ({
  level = 1,
  currentLevel,
  topicId = 'g3-wops-tudasproba-sorter',
  topicTitle = '5. Megálló – tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-muveletek-1000-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Válogasd szét a feladatokat!"
      levels={WRITTEN_OPS_1000_EXAM_G3_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      {...rest}
    />
  );
};

export default WrittenOps1000ExamG3Sorter;

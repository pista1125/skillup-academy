import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { BoxScene, FeaturesScene, HouseBuildScene, LadybugBuiltScene, LapBasket, LapRow, MissingScene, RuleTable, lapOpt } from './LogikaiLapokG1Scenes';
import { FindTilePlayground } from './LogikaiLapokG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <BoxScene />,
    text: 'Pötyi kincses dobozt talált!',
    say: 'Szia, Pötyi vagyok! Képzeld, a kerti házikóban találtam egy dobozt. Tele van színes lapokkal. Ezek a logikai lapok. Nézzük meg őket együtt!',
    mood: 'wow',
  },
  {
    scene: <FeaturesScene kind="alak" />,
    text: 'Kör, négyzet, háromszög.',
    say: 'A lapoknak más-más az alakja. Ez a kör, kerek, mint a labda. Ez a négyzet, négy egyforma oldala van. Ez a háromszög, három csúcsa van, mint egy tetőnek.',
    task: {
      ask: 'Melyik a háromszög?',
      options: [lapOpt({ sh: 'haromszog', c: 'piros' }), lapOpt({ sh: 'kor', c: 'piros' }), lapOpt({ sh: 'negyzet', c: 'piros' })],
      hint: 'A háromszögnek három csúcsa van, olyan, mint a tető.',
    },
  },
  {
    scene: <FeaturesScene kind="szin" />,
    text: 'Piros, kék, sárga, zöld.',
    say: 'A lapok színe is különböző: piros, kék, sárga és zöld. Zümi a kék lapot keresi. Segíts neki!',
    task: {
      ask: 'Melyik a kék lap?',
      options: [lapOpt({ sh: 'negyzet', c: 'kek' }), lapOpt({ sh: 'negyzet', c: 'zold' }), lapOpt({ sh: 'negyzet', c: 'sarga' })],
      hint: 'Kék, mint az ég vagy a víz. Keresd azt a színt!',
    },
  },
  {
    scene: <FeaturesScene kind="nagysag" />,
    text: 'Nagy és kicsi.',
    say: 'Van nagy lap és kicsi lap. Ez a két kör ugyanolyan alakú és színű, de az egyik nagy, a másik kicsi. Melyik a kicsi kör?',
    task: {
      ask: 'Melyik a kicsi kör?',
      options: [lapOpt({ sh: 'kor', c: 'kek', big: false }), lapOpt({ sh: 'kor', c: 'kek' }), lapOpt({ sh: 'negyzet', c: 'kek', big: false })],
      hint: 'Kört keresünk, és kicsit. Mindkettő stimmeljen!',
    },
  },
  {
    scene: <FeaturesScene kind="lyuk" />,
    text: 'Lyukas és nem lyukas.',
    say: 'Nézd! Az egyik lap közepén kis lyuk van. Az lyukas lap. A másikon nincs lyuk.',
    task: {
      ask: 'Melyik lap lyukas?',
      options: [lapOpt({ sh: 'haromszog', c: 'zold', hole: true }), lapOpt({ sh: 'haromszog', c: 'zold' })],
      hint: 'Keresd a kis fehér pöttyöt a lap közepén!',
    },
  },
  {
    scene: <LapRow items={[{ sh: 'haromszog', c: 'piros', big: false }]} bg="#fef9c3" />,
    text: 'Alak szerint válogatunk.',
    say: 'Csigusz alak szerint pakolja a lapokat. A kosáron lévő jel mutatja, mi való bele. Hová tegye a kicsi piros háromszöget?',
    task: {
      ask: 'Melyik kosárba való?',
      options: [
        { figure: <LapBasket sign={{ sh: 'haromszog', c: 'sarga' }} />, say: 'háromszöges kosár' },
        { figure: <LapBasket sign={{ sh: 'kor', c: 'sarga' }} />, say: 'körös kosár' },
        { figure: <LapBasket sign={{ sh: 'negyzet', c: 'sarga' }} />, say: 'négyzetes kosár' },
      ],
      hint: 'Most csak az alak számít, a szín és a nagyság nem.',
    },
  },
  {
    scene: <RuleTable top={[{ sh: 'negyzet', c: 'piros', big: false }, { sh: 'kor', c: 'kek', big: false }, { sh: 'haromszog', c: 'sarga', big: false }]} bottom={[{ sh: 'negyzet', c: 'piros' }, { sh: 'kor', c: 'kek' }, null]} />,
    text: 'Mi változott?',
    say: 'Nézd meg a táblázatot! Fent kicsi lapok vannak, lent ugyanezek, de nagyban. Mi kerül a kérdőjel helyére?',
    task: {
      ask: 'Mi kerül a kérdőjel helyére?',
      options: [lapOpt({ sh: 'haromszog', c: 'sarga' }), lapOpt({ sh: 'haromszog', c: 'sarga', big: false }), lapOpt({ sh: 'haromszog', c: 'kek' })],
      hint: 'Lent minden lap ugyanolyan, mint fent, csak nagy.',
    },
  },
  {
    scene: <LapRow items={[{ sh: 'negyzet', c: 'piros' }, { sh: 'kor', c: 'zold' }, { sh: 'negyzet', c: 'piros' }, { sh: 'kor', c: 'zold' }, null]} />,
    text: 'Mi jön ezután?',
    say: 'Pötyi sort rakott: négyzet, kör, négyzet, kör. Mi jön ezután?',
    task: {
      ask: 'Mi jön ezután?',
      options: [lapOpt({ sh: 'negyzet', c: 'piros' }), lapOpt({ sh: 'kor', c: 'zold' }), lapOpt({ sh: 'haromszog', c: 'piros' })],
      hint: 'Mondd ki hangosan: négyzet, kör, négyzet, kör… és most?',
    },
  },
  {
    scene: <HouseBuildScene />,
    text: 'Építsünk házat!',
    say: 'Pötyi házat épít a lapokból. A fal egy nagy zöld négyzet. Melyik lap kell a tetőre?',
    task: {
      ask: 'Melyik lap kell a tetőre?',
      options: [lapOpt({ sh: 'haromszog', c: 'piros' }), lapOpt({ sh: 'kor', c: 'piros' }), lapOpt({ sh: 'negyzet', c: 'piros' })],
      hint: 'A tető hegyes, felül egy csúcsa van.',
    },
  },
  {
    scene: <MissingScene all={[{ sh: 'kor', c: 'piros' }, { sh: 'negyzet', c: 'kek', hole: true }, { sh: 'haromszog', c: 'sarga' }, { sh: 'kor', c: 'zold', big: false }]} missing={2} />,
    text: 'Melyik lap tűnt el?',
    say: 'Zümi elvitt egy lapot! Fent még mind megvan, lent már hiányzik egy. Melyik tűnt el?',
    task: {
      ask: 'Melyik lap tűnt el?',
      options: [lapOpt({ sh: 'haromszog', c: 'sarga' }), lapOpt({ sh: 'kor', c: 'piros' }), lapOpt({ sh: 'negyzet', c: 'kek', hole: true })],
      hint: 'Ez lent is megvan. Nézd meg, mi van fent a kérdőjel fölött!',
    },
  },
  {
    scene: <LadybugBuiltScene />,
    text: 'Nézd, egy lap-katica!',
    say: 'Hurrá! Pötyi lapokból kirakott egy katicát. Megismertük a lapok alakját, színét, nagyságát, és hogy lyukas-e. Most gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const LogikaiLapokG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="3. Logikai lapok"
    storyTitle="Pötyi és a színes lapok doboza"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • MESE"
    pages={PAGES}
    playground={<FindTilePlayground />}
    playgroundTitle="Játszótér: keresd meg a lapot!"
    parentNote="A gyerek megismeri a logikai lapok tulajdonságait: alak (kör, négyzet, háromszög), szín (piros, kék, sárga, zöld), nagyság (nagy, kicsi) és lyukas–nem lyukas. Tulajdonság szerint válogat, felismeri a szabályt („mi változott?”), folytat egy sort, és megkeresi a hiányzó lapot. A mesét a gép felolvassa."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default LogikaiLapokG1Mese;

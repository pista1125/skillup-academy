import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { GroupPic, PairRows, PicnicScene, TowersScene, TwoSets, groupOpt } from './TobbKevesebbUgyanannyiG1Scenes';
import { SignPlayground } from './TobbKevesebbUgyanannyiG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <PicnicScene />,
    text: 'Piknikezünk!',
    say: 'Szia! Pötyi vagyok. Ma piknikezünk a barátaimmal. Mindenkinek jusson eper! Figyeld ezeket a szavakat: több, kevesebb, ugyanannyi.',
    mood: 'cheer',
  },
  {
    scene: <PairRows top={['katica', 4]} bottom={['eper', 4]} />,
    text: 'Mindenkinek jut egy.',
    say: 'Minden katicának adok egy epret. Összekötöm őket párosával. Minden katicának jutott eper, és eper sem maradt. Ugyanannyi katica van, mint eper.',
  },
  {
    scene: <GroupPic thing="hal" n={3} className="w-36 h-auto mx-auto" />,
    text: 'Hol van ugyanannyi?',
    say: 'Nézd a halakat! Melyik képen van ugyanannyi csillag, ahány hal?',
    task: { ask: 'Hol van ugyanannyi csillag?', options: [groupOpt('csillag', 3), groupOpt('csillag', 2), groupOpt('csillag', 4)], hint: 'Párosítsd a fejedben: minden halhoz egy csillag. Ne maradjon ki semmi!' },
  },
  {
    scene: <TwoSets a={['labda', 3]} b={['csillag', 3]} sign="=" />,
    text: 'Ez az egyenlőségjel: =',
    say: 'Ha két oldalon ugyanannyi van, ezt a jelet tesszük közéjük. Egyenlő. Két egyforma vonal: mintha két egyforma rúd feküdne egymás alatt.',
  },
  {
    scene: <PairRows top={['eper', 5]} bottom={['katica', 2]} />,
    text: 'Több eper maradt.',
    say: 'Most öt eper van, de csak két katica jött. Összekötöm őket. Három eper pár nélkül maradt. Eperből több van, katicából kevesebb.',
    mood: 'think',
  },
  {
    text: 'Hol van több?',
    say: 'Két tányér van az asztalon. Melyik tányéron van több eper?',
    task: { ask: 'Melyik tányéron van több eper?', options: [groupOpt('eper', 5), groupOpt('eper', 2)], hint: 'Ott kevesebb van. Párosítsd őket: melyikből marad ki?' },
  },
  {
    scene: <TwoSets a={['madar', 4]} b={['madar', 2]} sign=">" />,
    text: 'A jel a több felé nyílik.',
    say: 'Ha nem ugyanannyi van, ilyen jelet teszünk közéjük. Olyan, mint egy éhes száj: a több felé nyílik, a hegye a kevesebb felé mutat. Négy madár több, mint két madár.',
  },
  {
    scene: <TwoSets a={['hal', 1]} b={['hal', 3]} />,
    text: 'Melyik jel kell?',
    say: 'Bal oldalon egy hal van, jobb oldalon három. Melyik jel kell középre?',
    task: { ask: 'Melyik jel kell középre?', options: ['<', '>', '='], hint: 'Jobb oldalon van több. A jel szája arra nyíljon!' },
  },
  {
    scene: <TowersScene left={4} right={4} />,
    text: 'Két torony',
    say: 'Pötyi két tornyot épített kockákból. Számold meg a kockákat! Melyik jel kell a tornyok közé?',
    task: { ask: 'Melyik jel kell a tornyok közé?', options: ['=', '<', '>'], hint: 'Számold meg mindkét torony kockáit! Ugyanannyi?' },
  },
  {
    scene: <GroupPic thing="alma" n={2} className="w-36 h-auto mx-auto" />,
    text: 'Eggyel több',
    say: 'A tálon két alma van. Pötyi a másik tálra eggyel többet tesz. Melyik a másik tál?',
    task: { ask: 'Hol van eggyel több alma?', options: [groupOpt('alma', 3), groupOpt('alma', 2), groupOpt('alma', 4)], hint: 'Eggyel több: ugyanannyi, és még egy. Ne sokkal több!' },
  },
  {
    scene: <GroupPic thing="pillango" n={4} className="w-36 h-auto mx-auto" />,
    text: 'Jut mindenkinek?',
    say: 'Négy pillangó szállt a kertbe. Mindegyik egy virágra szeretne leszállni. Melyik képen van annyi virág, hogy mindegyik pillangónak jusson egy?',
    task: { ask: 'Hol jut virág mindegyiknek?', options: [groupOpt('virag', 4), groupOpt('virag', 3)], hint: 'Ott egy pillangónak nem jutna virág. Párosítsd őket!' },
  },
  {
    scene: <PicnicScene />,
    text: 'Ügyes voltál!',
    say: 'Hurrá! Megtanultad, mi a több, a kevesebb és az ugyanannyi. Ismered a jeleket is: egyenlő, kisebb, nagyobb. Most gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const TobbKevesebbUgyanannyiG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="8. Több, kevesebb, ugyanannyi"
    storyTitle="Pötyi és az epres piknik"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<SignPlayground />}
    playgroundTitle="Játszótér: melyik jel kell?"
    parentNote="A gyerek párosítással hasonlít össze két csoportot (melyikből marad pár nélkül), megérti a több, kevesebb, ugyanannyi és az eggyel több, eggyel kevesebb jelentését, és megismeri a jeleket: =, <, >. Otthon is párosíthattok: jut-e minden tányérhoz kanál?"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default TobbKevesebbUgyanannyiG1Mese;

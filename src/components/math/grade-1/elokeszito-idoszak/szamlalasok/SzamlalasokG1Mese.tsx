import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { AnimalTable, AppleTree, BallHeap, CountIntroScene, DotCard, HandsRow, MixRow, SpotMushroom, ballOpt, dotOpt, mushOpt, thingOpt } from './SzamlalasokG1Scenes';
import { CountPlayground } from './SzamlalasokG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <CountIntroScene />,
    text: 'Ma számolunk!',
    say: 'Szia! Pötyi vagyok. Ma mindent megszámolunk a Számkertben. Tapsolunk, koppantunk és dobbantunk is. Gyere velem!',
    mood: 'cheer',
  },
  {
    scene: <HandsRow seq={['p', 'p', 'p']} />,
    text: 'Tapsolj ennyiszer!',
    say: 'Nézd a tenyereket! Tapsolj annyiszer, ahány tenyeret látsz. Számoljunk együtt: egy, kettő, három. Ügyes!',
  },
  {
    scene: <AppleTree n={4} />,
    text: 'Hány alma van a fán?',
    say: 'Pötyi almát szed. Mutass rá mindegyik almára, és számold meg! Melyik kártyán van ugyanannyi pötty?',
    task: { ask: 'Melyik kártya illik az almákhoz?', options: [dotOpt(4), dotOpt(3), dotOpt(5)], hint: 'Számold meg még egyszer, mutass rá mindegyik almára!' },
  },
  {
    scene: <MixRow things={['alma', 'gomba', 'eper', 'level', 'csiga']} />,
    text: 'Melyik a gyümölcs?',
    say: 'Pötyi kosarába csak gyümölcs kerülhet. Az alma és az eper gyümölcs. A gomba, a levél és a csiga nem gyümölcs. Hány gyümölcs van a sorban?',
    task: { ask: 'Hány gyümölcs van itt?', options: [dotOpt(2), dotOpt(3), dotOpt(5)], hint: 'Csak a gyümölcsöket számold: az almát és az epret!' },
  },
  {
    scene: <AnimalTable />,
    text: 'Ki van itt a legtöbbször?',
    say: 'Nézd ezt a táblázatot! Méhek, pillangók, csigák és katicák vannak benne. Melyik állatból van a legtöbb?',
    task: { ask: 'Melyik állatból van a legtöbb?', options: [thingOpt('pillango'), thingOpt('meh'), thingOpt('csiga')], hint: 'Számold meg külön a méheket, és külön a pillangókat!' },
  },
  {
    scene: <HandsRow seq={['f', 'f', 'f', 'f', 'f']} />,
    text: 'Postásjáték',
    say: 'Játsszatok postást! Álljatok egymás mögé. A hátsó gyerek néhányszor megkoppintja az előtte álló hátát. Ő ugyanannyiszor koppint tovább. A végén az első megmondja, hányat érzett. Ha ugyanannyi, jó postások voltatok!',
    mood: 'happy',
  },
  {
    scene: <BallHeap n={4} />,
    text: 'Labdakupac',
    say: 'Zümi egy kupacba dobta a labdákat. Egymásra estek! Számold meg őket figyelmesen, mindegyiket csak egyszer!',
    task: { ask: 'Hány labda van a kupacban?', options: [dotOpt(4), dotOpt(3), dotOpt(5)], hint: 'Mindegyik labda más színű. Számold a színeket!' },
  },
  {
    scene: <DotCard n={3} className="w-28 h-28 mx-auto" />,
    text: 'Pöttyös labdák',
    say: 'Pötyi pöttyös labdát keres. Annyi pötty legyen rajta, mint a kártyán. Melyik labda az?',
    task: { ask: 'Melyik labdán van ugyanannyi pötty?', options: [ballOpt(3), ballOpt(2, '#60a5fa'), ballOpt(4, '#f472b6')], hint: 'Számold meg a kártyán is, a labdán is a pöttyöket!' },
  },
  {
    scene: <SpotMushroom n={4} className="w-32 h-32 mx-auto" />,
    text: 'Keresd a párját!',
    say: 'Ennek a gombának pöttyös a kalapja. Keresd meg a párját: azt a gombát, amelyiken ugyanannyi pötty van!',
    task: { ask: 'Melyik gomba a párja?', options: [mushOpt(4), mushOpt(3), mushOpt(5)], hint: 'Számold meg a pöttyöket mindkét gombán!' },
  },
  {
    scene: <CountIntroScene />,
    text: 'Ügyesen számoltál!',
    say: 'Hurrá! Megszámoltad a tenyereket, az almákat, a labdákat és a pöttyöket. Most gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const SzamlalasokG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="7. Számlálások"
    storyTitle="Pötyi mindent megszámol"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<CountPlayground />}
    playgroundTitle="Játszótér: koppints és számolj!"
    parentNote="A gyerek tárgyakat, hangokat és mozdulatokat számlál (taps, koppantás), a mennyiséget pöttykártyával, dominóval párosítja, és kiválogatja, mit kell megszámolni (pl. csak a gyümölcsöket). Számjegyet még nem ír és nem olvas, a számokat csak mondja. Otthon is számoljatok: lépcsőfokot, kanalat, tapsot!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default SzamlalasokG1Mese;

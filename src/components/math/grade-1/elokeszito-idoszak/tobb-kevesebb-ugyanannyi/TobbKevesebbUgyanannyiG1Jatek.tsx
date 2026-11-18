import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Hand } from '../../shared/G1Pics';
import {
  DotCard,
  DotsCompare,
  GroupPic,
  NUM_ATTR,
  NUM_WORD,
  PairRows,
  THING_NAME,
  Thing,
  TowersScene,
  TwoSets,
  groupOpt,
  signOf,
  statementOpt,
  towerOpt,
} from './TobbKevesebbUgyanannyiG1Scenes';

const HandsCompare: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <svg viewBox="0 0 260 110" className="w-full max-w-[340px] h-auto mx-auto">
    <svg x="0" y="0" width="100" height="110" viewBox="0 0 100 110"><Hand fingers={a} className="" /></svg>
    <rect x="100" y="22" width="60" height="66" rx="12" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="3" strokeDasharray="6 4" />
    <text x="130" y="74" textAnchor="middle" fontSize="56" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text>
    <svg x="160" y="0" width="100" height="110" viewBox="0 0 100 110"><Hand fingers={b} className="" /></svg>
  </svg>
);

/** Fél mondat: bal oldalon csoport, jel, jobb oldalon „?” – mi kerülhet oda? */
const HalfScene: React.FC<{ thing: Thing; n: number; sign: '<' | '>' | '=' }> = ({ thing, n, sign }) => (
  <svg viewBox="0 0 330 110" className="w-full max-w-[420px] h-auto mx-auto">
    <svg x="0" y="5" width="120" height="100" viewBox="0 0 120 100"><GroupPic thing={thing} n={n} className="" /></svg>
    <text x="165" y="76" textAnchor="middle" fontSize="56" fontWeight="900" fill="#dc2626" fontFamily="system-ui, sans-serif">{sign}</text>
    <rect x="212" y="7" width="114" height="94" rx="16" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="3" strokeDasharray="6 4" />
    <text x="269" y="74" textAnchor="middle" fontSize="48" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text>
  </svg>
);

const SIGNS = ['<', '>', '='] as const;
/** A három jel, a helyes elöl. */
const signOpts = (a: number, b: number) => {
  const r = signOf(a, b);
  return [r, ...SIGNS.filter((s) => s !== r)];
};

export const TOBB_KEVESEBB_UGYANANNYI_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – több, kevesebb, ugyanannyi képekkel
  { id: 'k1', level: 1, badge: 'Több', ask: 'Melyik tányéron van több eper?', options: [groupOpt('eper', 4), groupOpt('eper', 2)], hint: 'Ott kevesebb van. Párosítsd őket a fejedben!' },
  { id: 'k2', level: 1, badge: 'Kevesebb', ask: 'Hol van kevesebb hal?', options: [groupOpt('hal', 1), groupOpt('hal', 3)], hint: 'Ott több hal úszik. Hol van kevesebb?' },
  { id: 'k3', level: 1, badge: 'Ugyanannyi', ask: 'Hol van ugyanannyi csillag?', say: 'Melyik képen van ugyanannyi csillag, ahány labda?', scene: <GroupPic thing="labda" n={3} className="w-32 h-auto mx-auto" />, options: [groupOpt('csillag', 3), groupOpt('csillag', 2), groupOpt('csillag', 4)], hint: 'Minden labdához egy csillag kell. Ne maradjon ki semmi!' },
  { id: 'k4', level: 1, badge: 'Jelek', ask: 'Melyik jel jelenti: ugyanannyi?', say: 'Melyik jel jelenti azt, hogy ugyanannyi, vagyis egyenlő?', options: ['=', '<', '>'], hint: 'Az egyenlőségjel két egyforma vonal.' },
  { id: 'k5', level: 1, badge: 'Párosítás', ask: 'Miből van több?', say: 'Párosítottuk a katicákat és a leveleket. Miből van több?', scene: <PairRows top={['katica', 3]} bottom={['level', 5]} />, options: [{ figure: <GroupPic thing="level" n={1} className="w-20 h-16" />, say: 'levél' }, { figure: <GroupPic thing="katica" n={1} className="w-20 h-16" />, say: 'katica' }], hint: 'Nézd meg, melyik sorból maradt ki pár nélkül!' },
  { id: 'k6', level: 1, badge: 'Kevesebb', ask: 'Hol van a legkevesebb gomba?', options: [groupOpt('gomba', 2), groupOpt('gomba', 5), groupOpt('gomba', 4)], hint: 'Számold meg mindegyik képen! Hol van a legkevesebb?' },
  { id: 'k7', level: 1, badge: 'Tornyok', ask: 'Melyik toronyban van több kocka?', options: [towerOpt(4), towerOpt(2)], hint: 'Az a torony alacsonyabb, kevesebb kocka van benne.' },
  { id: 'k8', level: 1, badge: 'Jelek', ask: 'Melyik jel kell?', say: 'Két labda és két labda. Melyik jel kell középre?', scene: <TwoSets a={['labda', 2]} b={['labda', 2]} />, options: signOpts(2, 2), hint: 'Mindkét oldalon ugyanannyi van.' },
  // 2. szint – a jelek kitétele
  { id: 'k9', level: 2, badge: 'Jelek', ask: 'Melyik jel kell?', say: 'Négy madár és két madár. Melyik jel kell középre?', scene: <TwoSets a={['madar', 4]} b={['madar', 2]} />, options: signOpts(4, 2), hint: 'Bal oldalon több van. A jel szája a több felé nyílik.' },
  { id: 'k10', level: 2, badge: 'Jelek', ask: 'Melyik jel kell?', say: 'Egy alma és három alma. Melyik jel kell középre?', scene: <TwoSets a={['alma', 1]} b={['alma', 3]} />, options: signOpts(1, 3), hint: 'Jobb oldalon több van. A jel hegye a kevesebb felé mutat.' },
  { id: 'k11', level: 2, badge: 'Tornyok', ask: 'Melyik jel kell a tornyok közé?', scene: <TowersScene left={3} right={5} />, options: signOpts(3, 5), hint: 'Számold meg a kockákat! A jel a magasabb torony felé nyílik.' },
  { id: 'k12', level: 2, badge: 'Pöttyök', ask: 'Melyik jel kell a kártyák közé?', scene: <DotsCompare a={5} b={4} />, options: signOpts(5, 4), hint: 'Számold meg a pöttyöket mindkét kártyán!' },
  { id: 'k13', level: 2, badge: 'Ujjak', ask: 'Melyik jel kell a kezek közé?', say: 'Számold meg a felemelt ujjakat! Melyik jel kell a két kéz közé?', scene: <HandsCompare a={2} b={2} />, options: signOpts(2, 2), hint: 'Mindkét kéz ugyanannyi ujjat mutat?' },
  { id: 'k14', level: 2, badge: 'Igaz jel', ask: 'Melyik kép igaz?', say: 'Melyik képen van jó jel a két csoport között?', options: [statementOpt('eper', 3, '>', 1), statementOpt('eper', 3, '<', 1), statementOpt('eper', 3, '=', 1)], hint: 'Bal oldalon több van. Melyik jel szája nyílik arra?' },
  { id: 'k15', level: 2, badge: 'Ugyanannyi', ask: 'Mi kerüljön a jel másik oldalára?', say: 'Egyenlőségjel van középen. Melyik kép kerüljön a kérdőjel helyére?', scene: <HalfScene thing="korte" n={2} sign="=" />, options: [groupOpt('szilva', 2), groupOpt('szilva', 1), groupOpt('szilva', 3)], hint: 'Egyenlő: ugyanannyi legyen, mint a körte.' },
  { id: 'k16', level: 2, badge: 'Több', ask: 'Hol van több, mint itt?', say: 'Itt három hal van. Melyik képen van több hal?', scene: <GroupPic thing="hal" n={3} className="w-32 h-auto mx-auto" />, options: [groupOpt('hal', 4), groupOpt('hal', 2), groupOpt('hal', 3)], hint: 'Ugyanannyi vagy kevesebb nem jó. Több kell!' },
  // 3. szint – eggyel több / kevesebb, jut-e mindenkinek, igaz jelek
  { id: 'k17', level: 3, badge: 'Eggyel több', ask: 'Hol van eggyel több alma?', say: 'Itt két alma van. Melyik képen van eggyel több?', scene: <GroupPic thing="alma" n={2} className="w-32 h-auto mx-auto" />, options: [groupOpt('alma', 3), groupOpt('alma', 2), groupOpt('alma', 4)], hint: 'Eggyel több: ugyanannyi, és még egy.' },
  { id: 'k18', level: 3, badge: 'Eggyel kevesebb', ask: 'Hol van eggyel kevesebb körte?', say: 'Itt négy körte van. Melyik képen van eggyel kevesebb?', scene: <GroupPic thing="korte" n={4} className="w-32 h-auto mx-auto" />, options: [groupOpt('korte', 3), groupOpt('korte', 4), groupOpt('korte', 2)], hint: 'Eggyel kevesebb: csak egyet veszünk el.' },
  { id: 'k19', level: 3, badge: 'Jut mindenkinek?', ask: 'Hány virág kell a pillangóknak?', say: 'Mindegyik pillangó egy virágra száll. Melyik képen van pont annyi virág, hogy mindegyiknek jusson?', scene: <GroupPic thing="pillango" n={5} className="w-32 h-auto mx-auto" />, options: [groupOpt('virag', 5), groupOpt('virag', 4), groupOpt('virag', 6)], hint: 'Párosítsd: minden pillangóhoz egy virág. Ne maradjon pillangó virág nélkül, virág se maradjon!' },
  { id: 'k20', level: 3, badge: 'Legtöbb', ask: 'Melyik kosárban van a legtöbb szilva?', options: [groupOpt('szilva', 5), groupOpt('szilva', 3), groupOpt('szilva', 4)], hint: 'Számold meg mindegyik kosárban!' },
  { id: 'k21', level: 3, badge: 'Ugyanannyi', ask: 'Melyik jel kell?', say: 'Három nagy labda és három kis csillag. Melyik jel kell középre? Vigyázz, nem a méret számít!', scene: <TwoSets a={['labda', 3]} b={['csillag', 3]} />, options: signOpts(3, 3), hint: 'A labdák nagyobbak, de számold meg őket! Ugyanannyi?' },
  { id: 'k22', level: 3, badge: 'Igaz jel', ask: 'Melyik kép igaz?', say: 'Melyik képen van jó jel a két csoport között?', options: [statementOpt('csillag', 2, '<', 4), statementOpt('csillag', 2, '>', 4), statementOpt('csillag', 2, '=', 4)], hint: 'Jobb oldalon több van. Melyik jel szája nyílik jobbra?' },
  { id: 'k23', level: 3, badge: 'Jelek', ask: 'Mi kerülhet a kérdőjel helyére?', say: 'Három hal nagyobb, mint a kérdőjel. Melyik kép kerülhet oda?', scene: <HalfScene thing="hal" n={3} sign=">" />, options: [groupOpt('csillag', 2), groupOpt('csillag', 3), groupOpt('csillag', 4)], hint: 'A jel szája a halak felé nyílik: ott van több. Kevesebb kell a másik oldalra!' },
  { id: 'k24', level: 3, badge: 'Mese', ask: 'Melyik Zümi tányérja?', say: 'Csigusznak két levele van. Zümi eggyel többet kap, mint Csigusz. Melyik Zümi tányérja?', scene: <GroupPic thing="level" n={2} className="w-32 h-auto mx-auto" />, options: [groupOpt('level', 3), groupOpt('level', 1), groupOpt('level', 2)], hint: 'Zümi eggyel többet kap: ugyanannyit, és még egyet.' },
];

const card = (t: Thing, n: number) => ({ figure: <GroupPic thing={t} n={n} className="w-24 h-20" />, say: `${NUM_ATTR[n]} ${THING_NAME[t]}` });
const pairPic = (ta: Thing, a: number, tb: Thing, b: number) => ({ figure: <TwoSets a={[ta, a]} b={[tb, b]} sign={null} className="w-full h-auto" />, say: `${NUM_WORD[a]} és ${NUM_WORD[b]}` });

export const TOBB_KEVESEBB_UGYANANNYI_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Keresd meg a képet, amelyiken ugyanannyi van!',
    pairs: [
      { a: card('alma', 1), b: card('csillag', 1) },
      { a: card('alma', 2), b: card('hal', 2) },
      { a: card('alma', 3), b: card('virag', 3) },
      { a: card('alma', 4), b: card('labda', 4) },
    ],
  },
  2: {
    say: 'Melyik jel kell a két csoport közé? Párosítsd a képet a jellel!',
    pairs: [
      { a: pairPic('eper', 3, 'eper', 1), b: '>' },
      { a: pairPic('hal', 1, 'hal', 2), b: '<' },
      { a: pairPic('labda', 2, 'csillag', 2), b: '=' },
    ],
  },
  3: {
    say: 'Keresd meg a párját: azt a képet, amelyiken eggyel több tárgy van, mint a kártyán pötty!',
    pairs: [1, 2, 3, 4].map((n, i) => ({ a: { figure: <DotCard n={n} className="w-16 h-16" />, say: `${NUM_WORD[n]} pötty` }, b: card((['korte', 'eper', 'szilva', 'alma'] as Thing[])[i], n + 1) })),
  },
};

const sortItem = (ta: Thing, a: number, tb: Thing, b: number) => ({ item: pairPic(ta, a, tb, b), bin: ['<', '=', '>'].indexOf(signOf(a, b)) });

export const TOBB_KEVESEBB_UGYANANNYI_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Pötyinek három epre van. Ugyanannyi van a képen, vagy nem ugyanannyi?',
    bins: [
      { label: 'Ugyanannyi', figure: <DotCard n={3} className="w-12 h-12" />, say: 'ugyanannyi, mint három' },
      { label: 'Nem ugyanannyi', say: 'nem ugyanannyi' },
    ],
    items: [
      { item: card('alma', 3), bin: 0 },
      { item: card('hal', 2), bin: 1 },
      { item: card('csillag', 3), bin: 0 },
      { item: card('labda', 4), bin: 1 },
      { item: card('virag', 3), bin: 0 },
      { item: card('szilva', 1), bin: 1 },
      { item: card('korte', 5), bin: 1 },
    ],
  },
  2: {
    say: 'Pötyinek három epre van. Több vagy kevesebb van a képen?',
    bins: [
      { label: 'Kevesebb', say: 'kevesebb, mint három' },
      { label: 'Több', say: 'több, mint három' },
    ],
    items: [
      { item: card('alma', 1), bin: 0 },
      { item: card('hal', 5), bin: 1 },
      { item: card('csillag', 2), bin: 0 },
      { item: card('labda', 4), bin: 1 },
      { item: card('virag', 6), bin: 1 },
      { item: card('szilva', 2), bin: 0 },
      { item: card('korte', 4), bin: 1 },
      { item: card('gomba', 1), bin: 0 },
    ],
  },
  3: {
    say: 'Melyik jel kell a két csoport közé? Tedd a képet a jó jel kosarába!',
    bins: [
      { label: '<', say: 'kisebb' },
      { label: '=', say: 'egyenlő' },
      { label: '>', say: 'nagyobb' },
    ],
    items: [
      sortItem('alma', 1, 'alma', 4),
      sortItem('hal', 2, 'hal', 3),
      sortItem('eper', 3, 'eper', 3),
      sortItem('labda', 2, 'csillag', 2),
      sortItem('virag', 5, 'virag', 2),
      sortItem('korte', 4, 'korte', 1),
      sortItem('szilva', 3, 'szilva', 5),
      sortItem('gomba', 4, 'gomba', 4),
      sortItem('csillag', 3, 'csillag', 2),
    ],
  },
};

export const TobbKevesebbUgyanannyiG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="8. Több, kevesebb, ugyanannyi"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • JÁTÉK"
    base="g1-prep-tobb-kevesebb-ugyanannyi"
    chapterId="elokeszito-idoszak"
    questions={TOBB_KEVESEBB_UGYANANNYI_G1_QUESTIONS}
    pairs={TOBB_KEVESEBB_UGYANANNYI_G1_PAIRS}
    sort={TOBB_KEVESEBB_UGYANANNYI_G1_SORT}
    {...props}
  />
);

export default TobbKevesebbUgyanannyiG1Jatek;

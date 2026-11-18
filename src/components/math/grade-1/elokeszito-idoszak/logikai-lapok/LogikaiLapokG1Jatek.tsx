import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { ColorSpot, HouseBuildScene, Lap, LapBasket, LapRow, LapSpec, MissingScene, RuleTable, lapOpt } from './LogikaiLapokG1Scenes';

const sm = 'w-16 h-16';
const card = (l: LapSpec, say?: string) => lapOpt(l, say, sm);
const shapeBasket = (sh: LapSpec['sh'], say: string) => ({ figure: <LapBasket sign={{ sh, c: 'sarga' }} />, say });
const colorBasket = (c: LapSpec['c'], say: string) => ({
  figure: (
    <svg viewBox="0 0 140 120" className="w-28 h-24">
      <path d="M30 50 Q70 -6 110 50" fill="none" stroke="#b45309" strokeWidth="7" strokeLinecap="round" />
      <path d="M14 52 H126 L112 112 H28 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="5" strokeLinejoin="round" />
      <svg x="46" y="60" width="48" height="48" viewBox="0 0 40 40">
        <ColorSpot c={c} className="" />
      </svg>
    </svg>
  ),
  say,
});

export const LOGIKAI_LAPOK_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – egy tulajdonság felismerése
  { id: 'l1', level: 1, badge: 'Alak', ask: 'Melyik a kör?', options: [lapOpt({ sh: 'kor', c: 'sarga' }), lapOpt({ sh: 'negyzet', c: 'sarga' }), lapOpt({ sh: 'haromszog', c: 'sarga' })], hint: 'A kör kerek, mint a labda. Nincs csúcsa.' },
  { id: 'l2', level: 1, badge: 'Szín', ask: 'Melyik lap piros?', options: [lapOpt({ sh: 'haromszog', c: 'piros' }), lapOpt({ sh: 'haromszog', c: 'kek' }), lapOpt({ sh: 'haromszog', c: 'zold' })], hint: 'Piros, mint az eper. Keresd azt a színt!' },
  { id: 'l3', level: 1, badge: 'Nagyság', ask: 'Melyik a nagy háromszög?', options: [lapOpt({ sh: 'haromszog', c: 'zold' }), lapOpt({ sh: 'haromszog', c: 'zold', big: false })], hint: 'Ez a kicsi. Melyik foglal több helyet?' },
  { id: 'l4', level: 1, badge: 'Lyukas', ask: 'Melyik lap lyukas?', options: [lapOpt({ sh: 'negyzet', c: 'kek', hole: true }), lapOpt({ sh: 'negyzet', c: 'kek' })], hint: 'Keresd a kis fehér pöttyöt a közepén!' },
  { id: 'l5', level: 1, badge: 'Alak', ask: 'Melyik a négyzet?', options: [lapOpt({ sh: 'negyzet', c: 'zold' }), lapOpt({ sh: 'kor', c: 'zold' }), lapOpt({ sh: 'haromszog', c: 'zold' })], hint: 'A négyzetnek négy egyforma oldala és négy sarka van.' },
  { id: 'l6', level: 1, badge: 'Szín', ask: 'Melyik lap zöld?', options: [lapOpt({ sh: 'kor', c: 'zold' }), lapOpt({ sh: 'kor', c: 'sarga' }), lapOpt({ sh: 'kor', c: 'kek' })], hint: 'Zöld, mint a fű és a levél.' },
  { id: 'l7', level: 1, badge: 'Nagyság', ask: 'Melyik a kicsi kör?', options: [lapOpt({ sh: 'kor', c: 'piros', big: false }), lapOpt({ sh: 'kor', c: 'piros' }), lapOpt({ sh: 'negyzet', c: 'piros', big: false })], hint: 'Kör legyen, és kicsi is!' },
  { id: 'l8', level: 1, badge: 'Lyukas', ask: 'Melyik lap nem lyukas?', options: [lapOpt({ sh: 'kor', c: 'sarga' }), lapOpt({ sh: 'kor', c: 'sarga', hole: true })], hint: 'Ezen van lyuk. Melyiken nincs fehér pötty?' },
  // 2. szint – két tulajdonság, válogatás, kakukktojás, sor
  { id: 'l9', level: 2, badge: 'Két tulajdonság', ask: 'Melyik a kicsi, kék négyzet?', options: [lapOpt({ sh: 'negyzet', c: 'kek', big: false }), lapOpt({ sh: 'negyzet', c: 'kek' }), lapOpt({ sh: 'negyzet', c: 'piros', big: false }), lapOpt({ sh: 'kor', c: 'kek', big: false })], hint: 'Három dolog kell: négyzet, kék és kicsi. Nézd meg mindet!' },
  { id: 'l10', level: 2, badge: 'Alak szerint', ask: 'Melyik kosárba való?', say: 'Alak szerint válogatunk. Melyik kosárba való a nagy sárga kör?', scene: <LapRow items={[{ sh: 'kor', c: 'sarga' }]} bg="#fef9c3" />, options: [shapeBasket('kor', 'körös kosár'), shapeBasket('negyzet', 'négyzetes kosár'), shapeBasket('haromszog', 'háromszöges kosár')], hint: 'Csak az alak számít. Melyik kosáron van kör?' },
  { id: 'l11', level: 2, badge: 'Szín szerint', ask: 'Melyik kosárba való?', say: 'Most szín szerint válogatunk. Melyik kosárba való a kicsi piros háromszög?', scene: <LapRow items={[{ sh: 'haromszog', c: 'piros', big: false }]} bg="#fef9c3" />, options: [colorBasket('piros', 'piros kosár'), colorBasket('kek', 'kék kosár'), colorBasket('zold', 'zöld kosár')], hint: 'Most csak a szín számít. Milyen színű a lap?' },
  { id: 'l12', level: 2, badge: 'Kakukktojás', ask: 'Melyik nem illik a sorba?', say: 'Nézd meg az alakokat! Melyik nem illik a sorba?', scene: <LapRow items={[{ sh: 'haromszog', c: 'piros' }, { sh: 'haromszog', c: 'kek' }, { sh: 'kor', c: 'sarga' }, { sh: 'haromszog', c: 'zold' }]} />, options: [lapOpt({ sh: 'kor', c: 'sarga' }), lapOpt({ sh: 'haromszog', c: 'kek' }), lapOpt({ sh: 'haromszog', c: 'zold' })], hint: 'A színek mind mások. Nézd az alakjukat!' },
  { id: 'l13', level: 2, badge: 'Kakukktojás', ask: 'Melyik nem illik a sorba?', say: 'Nézd meg a lapok nagyságát! Melyik nem illik a sorba?', scene: <LapRow items={[{ sh: 'kor', c: 'kek' }, { sh: 'negyzet', c: 'sarga' }, { sh: 'haromszog', c: 'piros' }, { sh: 'negyzet', c: 'zold', big: false }]} />, options: [lapOpt({ sh: 'negyzet', c: 'zold', big: false }), lapOpt({ sh: 'kor', c: 'kek' }), lapOpt({ sh: 'negyzet', c: 'sarga' })], hint: 'Az alak és a szín is más mindegyiknél. Nézd meg, mekkorák!' },
  { id: 'l14', level: 2, badge: 'Sor folytatása', ask: 'Mi jön ezután?', say: 'Kör, háromszög, kör, háromszög. Mi jön ezután?', scene: <LapRow items={[{ sh: 'kor', c: 'kek' }, { sh: 'haromszog', c: 'kek' }, { sh: 'kor', c: 'kek' }, { sh: 'haromszog', c: 'kek' }, null]} />, options: [lapOpt({ sh: 'kor', c: 'kek' }), lapOpt({ sh: 'haromszog', c: 'kek' }), lapOpt({ sh: 'negyzet', c: 'kek' })], hint: 'Mondd ki hangosan a sort, és folytasd!' },
  { id: 'l15', level: 2, badge: 'Sor folytatása', ask: 'Mi jön ezután?', say: 'Piros, piros, sárga, sárga, piros, piros. Mi jön ezután?', scene: <LapRow items={[{ sh: 'negyzet', c: 'piros' }, { sh: 'negyzet', c: 'piros' }, { sh: 'negyzet', c: 'sarga' }, { sh: 'negyzet', c: 'sarga' }, { sh: 'negyzet', c: 'piros' }, { sh: 'negyzet', c: 'piros' }, null]} />, options: [lapOpt({ sh: 'negyzet', c: 'sarga' }), lapOpt({ sh: 'negyzet', c: 'piros' }), lapOpt({ sh: 'negyzet', c: 'kek' })], hint: 'Mindig két egyforma jön egymás után. Két piros után?' },
  { id: 'l16', level: 2, badge: 'Építés', ask: 'Melyik lap kell a tetőre?', say: 'Pötyi házat épít. Melyik lap kell a tetőre?', scene: <HouseBuildScene />, options: [lapOpt({ sh: 'haromszog', c: 'kek' }), lapOpt({ sh: 'negyzet', c: 'kek' }), lapOpt({ sh: 'kor', c: 'kek' })], hint: 'A tető hegyes. Melyik lapnak van felül csúcsa?' },
  // 3. szint – szabály, hiányzó lap, három tulajdonság
  { id: 'l17', level: 3, badge: 'Mi változott?', ask: 'Mi kerül a kérdőjel helyére?', say: 'Fent kicsi lapok vannak, lent ugyanezek nagyban. Mi kerül a kérdőjel helyére?', scene: <RuleTable top={[{ sh: 'kor', c: 'piros', big: false }, { sh: 'negyzet', c: 'sarga', big: false }, { sh: 'kor', c: 'zold', big: false }]} bottom={[{ sh: 'kor', c: 'piros' }, { sh: 'negyzet', c: 'sarga' }, null]} />, options: [lapOpt({ sh: 'kor', c: 'zold' }), lapOpt({ sh: 'kor', c: 'zold', big: false }), lapOpt({ sh: 'negyzet', c: 'zold' })], hint: 'Lent minden ugyanolyan, mint fent, csak nagy.' },
  { id: 'l18', level: 3, badge: 'Mi változott?', ask: 'Mi kerül a kérdőjel helyére?', say: 'Fent a lapok nem lyukasak. Lent ugyanezek, de lyukasak. Mi kerül a kérdőjel helyére?', scene: <RuleTable top={[{ sh: 'haromszog', c: 'piros' }, { sh: 'kor', c: 'sarga' }, { sh: 'negyzet', c: 'kek' }]} bottom={[{ sh: 'haromszog', c: 'piros', hole: true }, { sh: 'kor', c: 'sarga', hole: true }, null]} />, options: [lapOpt({ sh: 'negyzet', c: 'kek', hole: true }), lapOpt({ sh: 'negyzet', c: 'kek' }), lapOpt({ sh: 'negyzet', c: 'piros', hole: true })], hint: 'Lent minden lap lyukas, de a színe és alakja ugyanaz, mint fent.' },
  { id: 'l19', level: 3, badge: 'Hiányzó lap', ask: 'Melyik lap tűnt el?', say: 'Fent még minden lap megvan. Lent egy eltűnt. Melyik?', scene: <MissingScene all={[{ sh: 'negyzet', c: 'zold' }, { sh: 'kor', c: 'kek', big: false }, { sh: 'haromszog', c: 'piros', hole: true }, { sh: 'kor', c: 'sarga' }]} missing={1} />, options: [lapOpt({ sh: 'kor', c: 'kek', big: false }), lapOpt({ sh: 'kor', c: 'sarga' }), lapOpt({ sh: 'kor', c: 'kek' })], hint: 'Nézd meg, mi van fent a kérdőjel fölött! Nagy vagy kicsi?' },
  { id: 'l20', level: 3, badge: 'Három tulajdonság', ask: 'Melyik a nagy, piros, lyukas kör?', options: [lapOpt({ sh: 'kor', c: 'piros', hole: true }), lapOpt({ sh: 'kor', c: 'piros' }), lapOpt({ sh: 'kor', c: 'piros', big: false, hole: true }), lapOpt({ sh: 'kor', c: 'kek', hole: true })], hint: 'Nézd meg egyenként: kör? piros? nagy? lyukas? Mind kell!' },
  { id: 'l21', level: 3, badge: 'Kakukktojás', ask: 'Melyik nem illik a sorba?', say: 'Ezek a lapok mind mások. Mégis van, ami nem illik közéjük. Melyik?', scene: <LapRow items={[{ sh: 'kor', c: 'piros', hole: true }, { sh: 'negyzet', c: 'zold', hole: true }, { sh: 'haromszog', c: 'kek', hole: true }, { sh: 'negyzet', c: 'sarga' }]} />, options: [lapOpt({ sh: 'negyzet', c: 'sarga' }), lapOpt({ sh: 'negyzet', c: 'zold', hole: true }), lapOpt({ sh: 'haromszog', c: 'kek', hole: true })], hint: 'Keresd a kis fehér pöttyöket! Melyiken nincs?' },
  { id: 'l22', level: 3, badge: 'Sor folytatása', ask: 'Mi jön ezután?', say: 'Kör, háromszög, négyzet, kör, háromszög. Mi jön ezután?', scene: <LapRow items={[{ sh: 'kor', c: 'zold' }, { sh: 'haromszog', c: 'zold' }, { sh: 'negyzet', c: 'zold' }, { sh: 'kor', c: 'zold' }, { sh: 'haromszog', c: 'zold' }, null]} />, options: [lapOpt({ sh: 'negyzet', c: 'zold' }), lapOpt({ sh: 'kor', c: 'zold' }), lapOpt({ sh: 'haromszog', c: 'zold' })], hint: 'Három lap ismétlődik. A háromszög után mi jött az elején?' },
  { id: 'l23', level: 3, badge: 'Mese-feladat', ask: 'Zümi sárga, de nem kör lapot kér.', say: 'Zümi egy sárga lapot kér, de az ne legyen kör. Melyiket adjuk neki?', options: [lapOpt({ sh: 'negyzet', c: 'sarga' }), lapOpt({ sh: 'kor', c: 'sarga' }), lapOpt({ sh: 'negyzet', c: 'kek' })], hint: 'Sárga legyen, de ne kerek!' },
  { id: 'l24', level: 3, badge: 'Mi változott?', ask: 'Mi kerül a kérdőjel helyére?', say: 'Fent piros lapok vannak, lent ugyanilyen alakú kék lapok. Mi kerül a kérdőjel helyére?', scene: <RuleTable top={[{ sh: 'negyzet', c: 'piros' }, { sh: 'haromszog', c: 'piros', big: false }, { sh: 'kor', c: 'piros' }]} bottom={[{ sh: 'negyzet', c: 'kek' }, { sh: 'haromszog', c: 'kek', big: false }, null]} />, options: [lapOpt({ sh: 'kor', c: 'kek' }), lapOpt({ sh: 'kor', c: 'piros' }), lapOpt({ sh: 'negyzet', c: 'kek' })], hint: 'Lent csak a szín változik: pirosból kék lesz.' },
];

export const LOGIKAI_LAPOK_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Keresd meg az ugyanolyan lapot!',
    pairs: [
      { a: card({ sh: 'kor', c: 'piros' }), b: card({ sh: 'kor', c: 'piros' }, 'ugyanolyan piros kör') },
      { a: card({ sh: 'negyzet', c: 'kek' }), b: card({ sh: 'negyzet', c: 'kek' }, 'ugyanolyan kék négyzet') },
      { a: card({ sh: 'haromszog', c: 'sarga' }), b: card({ sh: 'haromszog', c: 'sarga' }, 'ugyanolyan sárga háromszög') },
      { a: card({ sh: 'kor', c: 'zold', hole: true }), b: card({ sh: 'kor', c: 'zold', hole: true }, 'ugyanolyan zöld lyukas kör') },
    ],
  },
  2: {
    say: 'Mihez hasonlít? Párosítsd a lapot a tárggyal!',
    pairs: [
      { a: card({ sh: 'kor', c: 'sarga' }), b: { figure: <svg viewBox="0 0 100 100" className={sm}><rect x="3" y="3" width="94" height="94" rx="14" fill="#e0f2fe" stroke="#94a3b8" strokeWidth="3" /><circle cx="50" cy="50" r="22" fill="#facc15" stroke="#d97706" strokeWidth="4" />{Array.from({ length: 8 }, (_, k) => <path key={k} d="M50 22 V12" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" transform={`rotate(${k * 45} 50 50)`} />)}</svg>, say: 'nap' } },
      { a: card({ sh: 'haromszog', c: 'piros' }), b: { figure: <svg viewBox="0 0 100 100" className={sm}><rect x="3" y="3" width="94" height="94" rx="14" fill="#e0f2fe" stroke="#94a3b8" strokeWidth="3" /><path d="M20 50 L50 18 L80 50 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3" /><rect x="28" y="50" width="44" height="38" fill="#fde68a" stroke="#78350f" strokeWidth="3" /></svg>, say: 'ház teteje' } },
      { a: card({ sh: 'negyzet', c: 'kek' }), b: { figure: <svg viewBox="0 0 100 100" className={sm}><rect x="3" y="3" width="94" height="94" rx="14" fill="#fff" stroke="#94a3b8" strokeWidth="3" /><rect x="24" y="24" width="52" height="52" fill="#bae6fd" stroke="#1e3a8a" strokeWidth="5" /><path d="M50 24 V76 M24 50 H76" stroke="#1e3a8a" strokeWidth="4" /></svg>, say: 'ablak' } },
    ],
  },
  3: {
    say: 'Mi változott? A kicsi laphoz keresd meg a nagy párját!',
    pairs: [
      { a: card({ sh: 'kor', c: 'kek', big: false }), b: card({ sh: 'kor', c: 'kek' }) },
      { a: card({ sh: 'negyzet', c: 'piros', big: false }), b: card({ sh: 'negyzet', c: 'piros' }) },
      { a: card({ sh: 'haromszog', c: 'zold', big: false }), b: card({ sh: 'haromszog', c: 'zold' }) },
      { a: card({ sh: 'kor', c: 'sarga', big: false, hole: true }), b: card({ sh: 'kor', c: 'sarga', hole: true }) },
      { a: card({ sh: 'haromszog', c: 'kek', big: false, hole: true }), b: card({ sh: 'haromszog', c: 'kek', hole: true }) },
    ],
  },
};

const it = (l: LapSpec, bin: number) => ({ item: card(l), bin });

export const LOGIKAI_LAPOK_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Alak szerint válogass! Kör, négyzet vagy háromszög?',
    bins: [
      { label: 'Kör', figure: <Lap sh="kor" c="sarga" frame={false} className="w-10 h-10" />, say: 'kör' },
      { label: 'Négyzet', figure: <Lap sh="negyzet" c="sarga" frame={false} className="w-10 h-10" />, say: 'négyzet' },
      { label: 'Háromszög', figure: <Lap sh="haromszog" c="sarga" frame={false} className="w-10 h-10" />, say: 'háromszög' },
    ],
    items: [
      it({ sh: 'kor', c: 'piros' }, 0),
      it({ sh: 'negyzet', c: 'kek', big: false }, 1),
      it({ sh: 'haromszog', c: 'zold' }, 2),
      it({ sh: 'kor', c: 'kek', big: false, hole: true }, 0),
      it({ sh: 'negyzet', c: 'piros', hole: true }, 1),
      it({ sh: 'haromszog', c: 'sarga', big: false }, 2),
      it({ sh: 'kor', c: 'zold' }, 0),
      it({ sh: 'negyzet', c: 'sarga' }, 1),
    ],
  },
  2: {
    say: 'Szín szerint válogass! Piros, kék vagy zöld?',
    bins: [
      { label: 'Piros', figure: <ColorSpot c="piros" />, say: 'piros' },
      { label: 'Kék', figure: <ColorSpot c="kek" />, say: 'kék' },
      { label: 'Zöld', figure: <ColorSpot c="zold" />, say: 'zöld' },
    ],
    items: [
      it({ sh: 'haromszog', c: 'piros' }, 0),
      it({ sh: 'kor', c: 'kek' }, 1),
      it({ sh: 'negyzet', c: 'zold', big: false }, 2),
      it({ sh: 'kor', c: 'piros', big: false, hole: true }, 0),
      it({ sh: 'haromszog', c: 'kek', hole: true }, 1),
      it({ sh: 'kor', c: 'zold' }, 2),
      it({ sh: 'negyzet', c: 'piros' }, 0),
      it({ sh: 'negyzet', c: 'kek', big: false }, 1),
      it({ sh: 'haromszog', c: 'zold', hole: true }, 2),
    ],
  },
  3: {
    say: 'Lyukas vagy nem lyukas? Nézd meg jól a lap közepét!',
    bins: [
      { label: 'Lyukas', figure: <Lap sh="kor" c="kek" hole frame={false} className="w-10 h-10" />, say: 'lyukas' },
      { label: 'Nem lyukas', figure: <Lap sh="kor" c="kek" frame={false} className="w-10 h-10" />, say: 'nem lyukas' },
    ],
    items: [
      it({ sh: 'kor', c: 'sarga', hole: true }, 0),
      it({ sh: 'negyzet', c: 'piros' }, 1),
      it({ sh: 'haromszog', c: 'zold', big: false, hole: true }, 0),
      it({ sh: 'kor', c: 'kek', big: false }, 1),
      it({ sh: 'negyzet', c: 'zold', hole: true }, 0),
      it({ sh: 'haromszog', c: 'sarga' }, 1),
      it({ sh: 'negyzet', c: 'kek', big: false, hole: true }, 0),
      it({ sh: 'kor', c: 'piros' }, 1),
      it({ sh: 'haromszog', c: 'piros', hole: true }, 0),
    ],
  },
};

export const LogikaiLapokG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="3. Logikai lapok"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • JÁTÉK"
    base="g1-prep-logikai-lapok"
    chapterId="elokeszito-idoszak"
    questions={LOGIKAI_LAPOK_G1_QUESTIONS}
    pairs={LOGIKAI_LAPOK_G1_PAIRS}
    sort={LOGIKAI_LAPOK_G1_SORT}
    {...props}
  />
);

export default LogikaiLapokG1Jatek;


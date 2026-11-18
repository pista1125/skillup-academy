import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Domino, Hand, IconGroup, NumberLine, BigSign } from '../../shared/G1Pics';
import { AppleTreeScene, GroupBox, MiniGroup, SunSkyScene } from './AzEgyG1Scenes';

const pic = (icon: Parameters<typeof GroupBox>[0]['icon'], n: number, say: string) => ({ figure: <GroupBox icon={icon} n={n} />, say });

export const AZ_EGY_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés
  { id: 'e1', level: 1, badge: 'Egy vagy több', ask: 'Hány nap süt?', scene: <SunSkyScene suns={1} />, options: [1, 2, 3], hint: 'Mutass rá! Csak egy napot látsz.' },
  { id: 'e2', level: 1, badge: 'Egy vagy több', ask: 'Hol van egy labda?', options: [pic('labda', 1, 'egy labda'), pic('labda', 2, 'két labda'), pic('labda', 3, 'három labda')], hint: 'Ott több labda van. Keresd, ahol csak egy!' },
  { id: 'e3', level: 1, badge: 'Egy vagy több', ask: 'Hol van egy virág?', options: [pic('virag', 1, 'egy virág'), pic('virag', 3, 'sok virág')], hint: 'Ott sok virág van. Hol van csak egy?' },
  { id: 'e4', level: 1, badge: 'Számjegy', ask: 'Melyik az egyes?', options: [{ figure: <BigSign text="1" />, say: 'egyes' }, { figure: <BigSign text="7" />, say: 'hetes' }, { figure: <BigSign text="4" />, say: 'négyes' }], hint: 'Az egyes olyan, mint egy kis bot, a tetején kis kalappal.' },
  { id: 'e5', level: 1, badge: 'Ujjkép', ask: 'Melyik kéz mutat egyet?', options: [{ figure: <Hand fingers={1} />, say: 'egy ujj' }, { figure: <Hand fingers={2} />, say: 'két ujj' }, { figure: <Hand fingers={3} />, say: 'három ujj' }], hint: 'Számold meg az ujjakat! Egy ujj legyen fent.' },
  { id: 'e6', level: 1, badge: 'Egy vagy több', ask: 'Hány alma van a fán?', scene: <AppleTreeScene apples={1} />, options: [1, 3], hint: 'Nézd meg jól a fát! Hány piros almát látsz?' },
  { id: 'e7', level: 1, badge: 'Dominó', ask: 'Hol van egy pötty?', options: [{ figure: <Domino left={1} single />, say: 'egy pötty' }, { figure: <Domino left={2} single />, say: 'két pötty' }, { figure: <Domino left={3} single />, say: 'három pötty' }], hint: 'Számold meg a pöttyöket a dominón!' },
  { id: 'e8', level: 1, badge: 'Egy vagy több', ask: 'Hány katica van itt?', scene: <IconGroup icon="katica" n={1} className="w-40 h-32 mx-auto" />, options: [1, 2, 4], hint: 'Mutass rá a katicára! Hány van?' },
  // 2. szint – egy és egynél több, számegyenes, írás
  { id: 'e9', level: 2, badge: 'Egy vagy több', ask: 'Hol van több, mint egy?', options: [pic('hal', 3, 'három hal'), pic('hal', 1, 'egy hal')], hint: 'Ott csak egy hal van. Hol van több?' },
  { id: 'e10', level: 2, badge: 'Számegyenes', ask: 'Hová kell az 1?', say: 'Hová kell az egyes a számegyenesen? Hol van a kérdőjel?', scene: <NumberLine max={5} question={1} />, options: [1, 3, 5], hint: 'A nulla után rögtön az egyes jön.' },
  { id: 'e11', level: 2, badge: 'Párosítás', ask: 'Melyik kép illik az 1-hez?', scene: <BigSign text="1" className="w-24 h-24 mx-auto" />, options: [pic('eper', 1, 'egy eper'), pic('eper', 2, 'két eper'), pic('eper', 4, 'négy eper')], hint: 'Az egyeshez egy tárgy kell.' },
  { id: 'e12', level: 2, badge: 'Egy vagy több', ask: 'Melyikből van egy?', say: 'Melyikből van csak egy a képen?', scene: <svg viewBox="0 0 300 110"><rect x="2" y="2" width="296" height="106" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" /><g transform="translate(60 55)"><circle r="20" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="3" /></g><g transform="translate(150 40)"><path d="M0 -12 C-10 -20 -22 -10 -18 4 C-15 16 -6 20 0 16 C6 20 15 16 18 4 C22 -10 10 -20 0 -12 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3" /></g><g transform="translate(150 80)"><path d="M0 -12 C-10 -20 -22 -10 -18 4 C-15 16 -6 20 0 16 C6 20 15 16 18 4 C22 -10 10 -20 0 -12 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3" /></g><g transform="translate(240 40)"><path d="M0 -12 C-10 -20 -22 -10 -18 4 C-15 16 -6 20 0 16 C6 20 15 16 18 4 C22 -10 10 -20 0 -12 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3" /></g><g transform="translate(240 80)"><path d="M0 -12 C-10 -20 -22 -10 -18 4 C-15 16 -6 20 0 16 C6 20 15 16 18 4 C22 -10 10 -20 0 -12 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3" /></g></svg>, options: [{ figure: <IconGroup icon="labda" n={1} className="w-16 h-16" />, say: 'labda' }, { figure: <IconGroup icon="alma" n={1} className="w-16 h-16" />, say: 'alma' }], hint: 'Almából négy van. Miből van csak egy?' },
  { id: 'e13', level: 2, badge: 'Ujjkép', ask: 'Hány ujj van fent?', scene: <Hand fingers={1} className="w-32 h-32 mx-auto" />, options: [1, 2, 5], hint: 'Csak a mutatóujj van fent. Számold meg!' },
  { id: 'e14', level: 2, badge: 'Számjegy', ask: 'Hány pötty kell az 1-hez?', scene: <BigSign text="1" className="w-24 h-24 mx-auto" />, options: [{ figure: <Domino left={1} single />, say: 'egy pötty' }, { figure: <Domino left={2} single />, say: 'két pötty' }], hint: 'Az egyeshez egy pötty illik.' },
  { id: 'e15', level: 2, badge: 'Egy vagy több', ask: 'Hol van egy csiga?', options: [pic('csiga', 1, 'egy csiga'), pic('csiga', 2, 'két csiga'), pic('csiga', 3, 'három csiga')], hint: 'Számold meg a csigákat mindegyik képen!' },
  { id: 'e16', level: 2, badge: 'Számegyenes', ask: 'Melyik számra mutat a pötty?', say: 'Melyik számnál van a piros pötty?', scene: <NumberLine max={5} mark={[1]} hideLabels={[1]} />, options: [1, 0, 2], hint: 'A nulla után az első lépés.' },
  // 3. szint – összehasonlítás, jelek
  { id: 'e17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Egy labda, és három labda. Melyik jel kell középre?', scene: <svg viewBox="0 0 320 110"><svg x="0" y="5" width="120" height="100" viewBox="0 0 120 100"><GroupBox icon="labda" n={1} className="" /></svg><text x="160" y="72" textAnchor="middle" fontSize="52" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text><svg x="200" y="5" width="120" height="100" viewBox="0 0 120 100"><GroupBox icon="labda" n={3} className="" /></svg></svg>, options: ['<', '>', '='], hint: 'Az egy kevesebb. A jel hegye a kevesebb felé mutat.' },
  { id: 'e18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Két virág, és egy virág. Melyik jel kell középre?', scene: <svg viewBox="0 0 320 110"><svg x="0" y="5" width="120" height="100" viewBox="0 0 120 100"><GroupBox icon="virag" n={2} className="" /></svg><text x="160" y="72" textAnchor="middle" fontSize="52" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text><svg x="200" y="5" width="120" height="100" viewBox="0 0 120 100"><GroupBox icon="virag" n={1} className="" /></svg></svg>, options: ['>', '<', '='], hint: 'Jobb oldalon csak egy van. A hegy arra mutat, ahol kevesebb van.' },
  { id: 'e19', level: 3, badge: 'Ugyanannyi', ask: 'Melyik jel kell?', say: 'Egy hal, és egy hal. Melyik jel kell középre?', scene: <svg viewBox="0 0 320 110"><svg x="0" y="5" width="120" height="100" viewBox="0 0 120 100"><GroupBox icon="hal" n={1} className="" /></svg><text x="160" y="72" textAnchor="middle" fontSize="52" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text><svg x="200" y="5" width="120" height="100" viewBox="0 0 120 100"><GroupBox icon="hal" n={1} className="" /></svg></svg>, options: ['=', '<', '>'], hint: 'Mindkét oldalon ugyanannyi van.' },
  { id: 'e20', level: 3, badge: 'Elvétel', ask: 'Mennyi maradjon? Egy!', say: 'Pötyi elvesz almákat, hogy csak egy maradjon. Melyik képen maradt egy?', options: [{ figure: <svg viewBox="0 0 120 100"><rect x="3" y="3" width="114" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" /><path d="M20 30 L52 70 M52 30 L20 70" stroke="#94a3b8" strokeWidth="5" /><circle cx="36" cy="50" r="14" fill="#ef4444" opacity="0.4" /><circle cx="84" cy="50" r="16" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3" /></svg>, say: 'egy maradt' }, pic('alma', 2, 'kettő maradt'), pic('alma', 3, 'három maradt')], hint: 'Ott még több alma van. Hol maradt csak egy?' },
  { id: 'e21', level: 3, badge: 'Egy vagy több', ask: 'Melyik NEM egy?', say: 'Három kép közül kettőn egy tárgy van. Melyiken van több?', options: [pic('gomba', 2, 'két gomba'), pic('gomba', 1, 'egy gomba'), pic('meh', 1, 'egy méh')], hint: 'Számold meg! Hol van egynél több?' },
  { id: 'e22', level: 3, badge: 'Párosítás', ask: 'Melyik illik a kézhez?', say: 'A kéz egy ujjat mutat. Melyik dominó illik hozzá?', scene: <Hand fingers={1} className="w-28 h-28 mx-auto" />, options: [{ figure: <Domino left={1} single />, say: 'egy pötty' }, { figure: <Domino left={3} single />, say: 'három pötty' }, { figure: <Domino left={2} single />, say: 'két pötty' }], hint: 'Egy ujj, egy pötty.' },
  { id: 'e23', level: 3, badge: 'Számegyenes', ask: 'Mi jön a 0 után?', say: 'Mi jön a nulla után a számegyenesen?', scene: <NumberLine max={4} question={1} hideLabels={[2, 3, 4]} />, options: [1, 2, 4], hint: 'Egy lépés a nullától.' },
  { id: 'e24', level: 3, badge: 'Egy vagy több', ask: 'Hány madár repül?', scene: <IconGroup icon="madar" n={1} className="w-36 h-28 mx-auto" />, options: [1, 2, 3], hint: 'Mutass rá a madárra! Hány van?' },
];

export const AZ_EGY_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon arra, ami illik hozzá!',
    pairs: [
      { a: { figure: <MiniGroup icon="alma" n={1} />, say: 'egy alma' }, b: 1 },
      { a: { figure: <MiniGroup icon="alma" n={3} />, say: 'sok alma' }, b: 'sok' },
      { a: { figure: <Hand fingers={1} className="w-16 h-16" />, say: 'egy ujj' }, b: { figure: <Domino left={1} single className="w-14 h-14" />, say: 'egy pötty' } },
      { a: { figure: <MiniGroup icon="labda" n={2} />, say: 'két labda' }, b: { figure: <MiniGroup icon="virag" n={2} />, say: 'két virág' } },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! Ugyanannyi legyen.',
    pairs: [
      { a: { figure: <MiniGroup icon="hal" n={1} />, say: 'egy hal' }, b: { figure: <MiniGroup icon="csillag" n={1} />, say: 'egy csillag' } },
      { a: { figure: <MiniGroup icon="hal" n={3} />, say: 'három hal' }, b: { figure: <MiniGroup icon="csillag" n={3} />, say: 'három csillag' } },
      { a: { figure: <MiniGroup icon="hal" n={2} />, say: 'két hal' }, b: { figure: <MiniGroup icon="csillag" n={2} />, say: 'két csillag' } },
      { a: 1, b: { figure: <Hand fingers={1} className="w-16 h-16" />, say: 'egy ujj' } },
      { a: { figure: <Domino left={1} single className="w-14 h-14" />, say: 'egy pötty' }, b: { figure: <MiniGroup icon="eper" n={1} />, say: 'egy eper' } },
    ],
  },
  3: {
    say: 'Párosítsd a jelet a képhez!',
    pairs: [
      { a: '1 < 3', b: { figure: <svg viewBox="0 0 120 60"><circle cx="20" cy="30" r="12" fill="#3b82f6" /><circle cx="70" cy="30" r="10" fill="#ef4444" /><circle cx="90" cy="30" r="10" fill="#ef4444" /><circle cx="110" cy="30" r="10" fill="#ef4444" /></svg>, say: 'egy kék, három piros' } },
      { a: '1 = 1', b: { figure: <svg viewBox="0 0 120 60"><circle cx="30" cy="30" r="12" fill="#3b82f6" /><circle cx="90" cy="30" r="12" fill="#ef4444" /></svg>, say: 'egy kék, egy piros' } },
      { a: '2 > 1', b: { figure: <svg viewBox="0 0 120 60"><circle cx="15" cy="30" r="12" fill="#3b82f6" /><circle cx="45" cy="30" r="12" fill="#3b82f6" /><circle cx="95" cy="30" r="12" fill="#ef4444" /></svg>, say: 'két kék, egy piros' } },
      { a: { figure: <Hand fingers={1} className="w-16 h-16" />, say: 'egy ujj' }, b: 1 },
    ],
  },
};

export const AZ_EGY_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Hová való a kép? Ahol egy van, az az egy kosár. Ahol több van, az a több kosár.',
    bins: [
      { label: 'Egy', figure: <IconGroup icon="csillag" n={1} className="w-12 h-12" />, say: 'egy' },
      { label: 'Több', figure: <IconGroup icon="csillag" n={3} className="w-20 h-12" />, say: 'több, mint egy' },
    ],
    items: [
      { item: { figure: <MiniGroup icon="alma" n={1} />, say: 'alma' }, bin: 0 },
      { item: { figure: <MiniGroup icon="alma" n={3} />, say: 'almák' }, bin: 1 },
      { item: { figure: <MiniGroup icon="labda" n={1} />, say: 'labda' }, bin: 0 },
      { item: { figure: <MiniGroup icon="labda" n={2} />, say: 'labdák' }, bin: 1 },
      { item: { figure: <MiniGroup icon="virag" n={4} />, say: 'virágok' }, bin: 1 },
      { item: { figure: <MiniGroup icon="katica" n={1} />, say: 'katica' }, bin: 0 },
    ],
  },
  2: {
    say: 'Egy vagy több? Tedd a jó kosárba!',
    bins: [
      { label: 'Egy', figure: <BigSign text="1" className="w-12 h-12" />, say: 'egy' },
      { label: 'Több', figure: <IconGroup icon="csillag" n={3} className="w-20 h-12" />, say: 'több, mint egy' },
    ],
    items: [
      { item: { figure: <Hand fingers={1} className="w-16 h-16" />, say: 'egy ujj' }, bin: 0 },
      { item: { figure: <Hand fingers={3} className="w-16 h-16" />, say: 'három ujj' }, bin: 1 },
      { item: { figure: <Domino left={1} single className="w-14 h-14" />, say: 'dominó' }, bin: 0 },
      { item: { figure: <Domino left={4} single className="w-14 h-14" />, say: 'dominó' }, bin: 1 },
      { item: { figure: <MiniGroup icon="hal" n={2} />, say: 'halak' }, bin: 1 },
      { item: { figure: <MiniGroup icon="meh" n={1} />, say: 'méh' }, bin: 0 },
      { item: 1, bin: 0 },
    ],
  },
  3: {
    say: 'Három kosár van: egy, kettő, és sok. Hová való?',
    bins: [
      { label: '1', say: 'egy' },
      { label: '2', say: 'kettő' },
      { label: 'Sok', say: 'sok' },
    ],
    items: [
      { item: { figure: <MiniGroup icon="eper" n={1} />, say: 'eper' }, bin: 0 },
      { item: { figure: <MiniGroup icon="eper" n={2} />, say: 'eprek' }, bin: 1 },
      { item: { figure: <MiniGroup icon="eper" n={5} />, say: 'sok eper' }, bin: 2 },
      { item: { figure: <Hand fingers={1} className="w-16 h-16" />, say: 'egy ujj' }, bin: 0 },
      { item: { figure: <Domino left={2} single className="w-14 h-14" />, say: 'dominó' }, bin: 1 },
      { item: { figure: <MiniGroup icon="gomba" n={4} />, say: 'gombák' }, bin: 2 },
      { item: { figure: <MiniGroup icon="pillango" n={1} />, say: 'pillangó' }, bin: 0 },
      { item: { figure: <MiniGroup icon="csiga" n={2} />, say: 'csigák' }, bin: 1 },
    ],
  },
};

export const AzEgyG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="1. Az egy"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • JÁTÉK"
    base="g1-c5-az-egy"
    chapterId="szamolas-5-ig"
    questions={AZ_EGY_G1_QUESTIONS}
    pairs={AZ_EGY_G1_PAIRS}
    sort={AZ_EGY_G1_SORT}
    {...props}
  />
);

export default AzEgyG1Jatek;

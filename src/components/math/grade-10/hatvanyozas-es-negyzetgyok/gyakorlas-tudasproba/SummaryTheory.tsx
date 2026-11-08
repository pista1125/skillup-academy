import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  MathText
} from '../TheoryTemplate';
import {
  Zap,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Calculator,
  Compass,
  Layers,
  Sparkles,
  ArrowRight,
  Scale,
  Brain,
  ShieldAlert,
  Trophy,
  HelpCircle,
  RotateCcw,
  Check,
  X,
  Flame,
  Target,
  ArrowLeftRight,
  CheckCircle,
  XCircle
} from 'lucide-react';
import {
  ChapterIdentitiesMapSvg,
  FourClassicTrapsSvg,
  ScientificSummarySvg,
  RadicalTransformationsPipelineSvg
} from './SummaryFigures';

interface SummaryTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface TrapQuestion {
  id: number;
  formula: string;
  isCorrect: boolean;
  trapName: string;
  explanation: string;
  correctRule: string;
}

const TRAP_QUESTIONS: TrapQuestion[] = [
  {
    id: 1,
    formula: '√(9 + 16) = √9 + √16',
    isCorrect: false,
    trapName: 'Összeg gyökének csapdája',
    explanation: 'Összeget vagy különbséget szigorúan TILOS tagonként gyök alá vonni! Bal oldal: √(25) = 5. Jobb oldal: 3 + 4 = 7. Mivel 5 ≠ 7, az egyenlőség hamis!',
    correctRule: '√(a + b) ≠ √a + √b'
  },
  {
    id: 2,
    formula: '√((-6)²) = -6',
    isCorrect: false,
    trapName: 'Abszolútérték elhagyása',
    explanation: 'A négyzetgyök definíció szerint SOHA nem lehet negatív! A helyes azonosság √(a²) = |a|, ezért √((-6)²) = |-6| = +6!',
    correctRule: '√(a²) = |a|'
  },
  {
    id: 3,
    formula: '3⁻² = 1 / 9',
    isCorrect: true,
    trapName: 'Negatív kitevő definíciója',
    explanation: 'Helyes! A negatív kitevő soha nem teszi negatívvá a számot, hanem reciprok képzését jelenti: 3⁻² = 1 / 3² = 1 / 9.',
    correctRule: 'a⁻ⁿ = 1 / aⁿ'
  },
  {
    id: 4,
    formula: '(-4)² = -4²',
    isCorrect: false,
    trapName: 'Zárójelcsapda',
    explanation: 'Zárójellel az alap -4, így (-4) · (-4) = +16. Zárójel nélkül a kitevő csak a 4-re hat, a mínusz előtte marad: -(4²) = -16. A kettő nem egyenlő!',
    correctRule: '(-a)² ≠ -a²'
  },
  {
    id: 5,
    formula: '(a³)² = a⁶  és  a³ · a² = a⁵',
    isCorrect: true,
    trapName: 'Hatványozási azonosságok',
    explanation: 'Helyes! Hatvány hatványozásakor a kitevők összeszorzódnak (3 · 2 = 6), azonos alapú hatványok szorzásakor pedig összeadódnak (3 + 2 = 5).',
    correctRule: '(aⁿ)ᵐ = aⁿᵐ és aⁿ · aᵐ = aⁿ⁺ᵐ'
  },
  {
    id: 6,
    formula: '1 / √2 = √2 / 2',
    isCorrect: true,
    trapName: 'Egytagú gyöktelenítés',
    explanation: 'Helyes! Ha a törtet bővítjük √2-vel: (1 · √2) / (√2 · √2) = √2 / 2. Ez a trigonometrikus értékekből is jól ismert!',
    correctRule: 'c / √a = (c√a) / a'
  },
  {
    id: 7,
    formula: '0⁰ = 1',
    isCorrect: false,
    trapName: 'A 0⁰ tilalma',
    explanation: 'Hamis! Bár minden a ≠ 0 valós számra a⁰ = 1, a 0⁰ kifejezés a matematikában NEM ÉRTELMEZETT (határozatlan alak)!',
    correctRule: '0⁰ és 0⁻ⁿ nem értelmezett!'
  },
  {
    id: 8,
    formula: '√50 - √18 = √32',
    isCorrect: false,
    trapName: 'Különbség gyökének csapdája',
    explanation: 'Különbséget nem vonhatunk össze a gyök alatt! Helyesen részleges gyökvonással kell dolgozni: √50 = 5√2, √18 = 3√2, így 5√2 - 3√2 = 2√2 = √8 (és nem √32 = 4√2)!',
    correctRule: '√a - √b ≠ √(a - b)'
  }
];

const PARTIAL_ROOT_DATA: Record<number, { square: number; root: number; remainder: number }> = {
  8: { square: 4, root: 2, remainder: 2 },
  12: { square: 4, root: 2, remainder: 3 },
  18: { square: 9, root: 3, remainder: 2 },
  20: { square: 4, root: 2, remainder: 5 },
  24: { square: 4, root: 2, remainder: 6 },
  27: { square: 9, root: 3, remainder: 3 },
  32: { square: 16, root: 4, remainder: 2 },
  48: { square: 16, root: 4, remainder: 3 },
  50: { square: 25, root: 5, remainder: 2 },
  72: { square: 36, root: 6, remainder: 2 },
  75: { square: 25, root: 5, remainder: 3 },
  98: { square: 49, root: 7, remainder: 2 },
  108: { square: 36, root: 6, remainder: 3 },
  200: { square: 100, root: 10, remainder: 2 },
  300: { square: 100, root: 10, remainder: 3 }
};

const RATIONALIZATION_EXAMPLES = [
  {
    type: 'Egytagú',
    label: '6 / √3',
    num: 6,
    den: '√3',
    multiplier: '√3',
    step1: '(6 · √3) / (√3 · √3)',
    step2: '(6√3) / 3',
    result: '2√3',
    explanation: 'Egytagú nevező: bővítés magával a gyökkel (√3). A nevezőben (√3)² = 3 lesz, majd 6 / 3 = 2-vel egyszerűsítünk.'
  },
  {
    type: 'Egytagú',
    label: '10 / √5',
    num: 10,
    den: '√5',
    multiplier: '√5',
    step1: '(10 · √5) / (√5 · √5)',
    step2: '(10√5) / 5',
    result: '2√5',
    explanation: 'Egytagú nevező: bővítés √5-tel. A nevező 5 lesz, 10 / 5 = 2.'
  },
  {
    type: 'Egytagú',
    label: '1 / √2',
    num: 1,
    den: '√2',
    multiplier: '√2',
    step1: '(1 · √2) / (√2 · √2)',
    step2: '√2 / 2',
    result: '√2 / 2',
    explanation: 'A nevezetes 45°-os szögfüggvényekből is ismert egytagú gyöktelenített alak: 1 / √2 = √2 / 2.'
  },
  {
    type: 'Kéttagú konjugált',
    label: '4 / (√5 - 1)',
    num: 4,
    den: '√5 - 1',
    multiplier: '√5 + 1',
    step1: '(4(√5 + 1)) / ((√5 - 1)(√5 + 1))',
    step2: '(4(√5 + 1)) / (5 - 1) = (4(√5 + 1)) / 4',
    result: '√5 + 1',
    explanation: 'Kéttagú nevező: bővítés a konjugálttal (√5 + 1). A nevezőben (x-y)(x+y) = x² - y² = 5 - 1 = 4 lesz, és a 4 egyszerűsödik!'
  },
  {
    type: 'Kéttagú konjugált',
    label: '6 / (√7 - √5)',
    num: 6,
    den: '√7 - √5',
    multiplier: '√7 + √5',
    step1: '(6(√7 + √5)) / ((√7 - √5)(√7 + √5))',
    step2: '(6(√7 + √5)) / (7 - 5) = (6(√7 + √5)) / 2',
    result: '3(√7 + √5)',
    explanation: 'Két gyök különbsége a nevezőben: bővítés az összegükkel (√7 + √5). A nevező 7 - 5 = 2 lesz, 6 / 2 = 3.'
  },
  {
    type: 'Kéttagú konjugált',
    label: '2 / (√3 + 1)',
    num: 2,
    den: '√3 + 1',
    multiplier: '√3 - 1',
    step1: '(2(√3 - 1)) / ((√3 + 1)(√3 - 1))',
    step2: '(2(√3 - 1)) / (3 - 1) = (2(√3 - 1)) / 2',
    result: '√3 - 1',
    explanation: 'Összeg a nevezőben: bővítés a különbséggel (√3 - 1). A nevező 3 - 1 = 2 lesz, a 2 egyszerűsödik.'
  }
];

const SCIENTIFIC_EXAMPLES = [
  {
    expr: '(3 · 10⁴) · (4 · 10⁵)',
    step1: '(3 · 4) · 10⁴⁺⁵ = 12 · 10⁹',
    adjust: 'A 12 nem esik [1; 10[ közé! 12 = 1,2 · 10¹',
    result: '1,2 · 10¹⁰',
    type: 'Szorzás (Mantissza ≥ 10)'
  },
  {
    expr: '(2 · 10⁻³) · (3,5 · 10⁷)',
    step1: '(2 · 3,5) · 10⁻³⁺⁷',
    adjust: 'A 7 megfelel a feltételnek (1 ≤ 7 < 10), nincs szükség igazításra.',
    result: '7 · 10⁴',
    type: 'Szorzás (Azonnal normálalak)'
  },
  {
    expr: '(8 · 10⁶) : (4 · 10²)',
    step1: '(8 : 4) · 10⁶⁻²',
    adjust: 'A 2 megfelel a mantissza feltételnek.',
    result: '2 · 10⁴',
    type: 'Osztás'
  },
  {
    expr: '(2 · 10⁵) : (8 · 10²)',
    step1: '(2 : 8) · 10⁵⁻² = 0,25 · 10³',
    adjust: 'A 0,25 < 1! Jobbra toljuk a vesszőt: 0,25 = 2,5 · 10⁻¹',
    result: '2,5 · 10²',
    type: 'Osztás (Mantissza < 1)'
  }
];

const MATRIX_DATA: Record<string, {
  title: string;
  badge: string;
  powerRule: string;
  powerExplain: string;
  powerExample: string;
  rootRule: string;
  rootExplain: string;
  rootExample: string;
  synthesis: string;
}> = {
  mul: {
    title: 'Szorzás szabályai',
    badge: 'SZORZATOK',
    powerRule: 'aⁿ · aᵐ = aⁿ⁺ᵐ',
    powerExplain: 'Azonos alapok szorzásakor a kitevők összeadódnak.',
    powerExample: '2³ · 2⁴ = 2⁷ = 128',
    rootRule: '√(a · b) = √a · √b',
    rootExplain: 'Szorzat négyzetgyöke a tényezők gyökének szorzata (a, b ≥ 0).',
    rootExample: '√4 · √9 = 2 · 3 = 6 = √36',
    synthesis: 'Mindkét művelet közvetlenül szétbontható vagy összevonható szorzás esetén! A szorzás a legtermészetesebb műveleti partner mind a hatványnál, mind a gyöknél.'
  },
  div: {
    title: 'Osztás és törtképzés',
    badge: 'HÁNYADOSOK',
    powerRule: 'aⁿ : aᵐ = aⁿ⁻ᵐ  |  (a / b)ⁿ = aⁿ / bⁿ',
    powerExplain: 'Azonos alapok osztásakor a kitevők kivonódnak. Tört hatványa a számláló és nevező hatványa.',
    powerExample: '5⁶ : 5² = 5⁴ = 625  |  (2 / 3)² = 4 / 9',
    rootRule: '√(a / b) = √a / √b  (b > 0)',
    rootExplain: 'Hányados négyzetgyöke a számláló és a nevező négyzetgyökének hányadosa.',
    rootExample: '√(49 / 81) = √49 / √81 = 7 / 9',
    synthesis: 'A hányados ugyanúgy viselkedik, mint a szorzat: tagonként elvégezhető a művelet. A nevező sosem lehet 0!'
  },
  power: {
    title: 'Összetett művelet (Kitevő a kitevőn vs. Gyök a négyzeten)',
    badge: 'ÖSSZETETT',
    powerRule: '(aⁿ)ᵐ = aⁿ·ᵐ',
    powerExplain: 'Hatvány hatványozásakor a kitevők összeszorzódnak.',
    powerExample: '(2³)² = 2⁶ = 64',
    rootRule: '√(a²) = |a|  és  (√a)² = a',
    rootExplain: 'Ha a négyzet a gyök ALATT van: abszolútérték kötelező! Ha KÍVÜL: a ≥ 0 feltétel mellett azonnal a.',
    rootExample: '√((-5)²) = |-5| = 5  (nem -5!)',
    synthesis: 'Míg a hatványozásnál a kitevők sorrendje felcserélhető ((aⁿ)ᵐ = (aᵐ)ⁿ), a gyöknél a gyök alatti négyzet abszolútértéket eredményez, mert a gyökvonás eredménye sosem negatív!'
  },
  sum: {
    title: 'A TILTOTT MŰVELET: Összeadás és kivonás csapdája',
    badge: 'FIGYELEM!',
    powerRule: 'aⁿ + aᵐ ≠ aⁿ⁺ᵐ  (Tilos a kitevőket összeadni!)',
    powerExplain: 'Összegnél kiemeléssel kell dolgozni: 2¹⁰ + 2¹⁰ = 2 · 2¹⁰ = 2¹¹.',
    powerExample: '2³ + 2² = 8 + 4 = 12 ≠ 2⁵ = 32!',
    rootRule: '√(a + b) ≠ √a + √b  (Tilos tagonként gyököt vonni!)',
    rootExplain: 'Összeget vagy különbséget sosem bonthatunk fel gyökök összegére!',
    rootExample: '√(9 + 16) = √25 = 5 ≠ √9 + √16 = 3 + 4 = 7!',
    synthesis: 'ARANYSZABÁLY: Sem a hatványozás, sem a gyökvonás NEM disztributív az összeadásra és kivonásra! Összeget nem vonunk össze kitevőben, és nem bontunk szét gyökjel alatt!'
  }
};

export const SummaryTheory: React.FC<SummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Laboratórium fő fül állapota
  const [labTab, setLabTab] = useState<'rules' | 'calculator' | 'quiz' | 'matrix'>('rules');

  // 1. Zárójel- és előjeltesztelő állapota
  const [baseMode, setBaseMode] = useState<'int' | 'frac'>('int');
  const [testBase, setTestBase] = useState<number>(-3);
  const [testExp, setTestExp] = useState<number>(2);
  const [fracNum, setFracNum] = useState<number>(2);
  const [fracDen, setFracDen] = useState<number>(3);

  // 2. Műveleti kalkulátor állapota
  const [calcMode, setCalcMode] = useState<'root' | 'rationalize' | 'sci'>('root');
  const [selectedRootRadicand, setSelectedRootRadicand] = useState<number>(72);
  const [selectedRationIndex, setSelectedRationIndex] = useState<number>(0);
  const [selectedSciIndex, setSelectedSciIndex] = useState<number>(0);

  // 3. Érettségi Hibavadász kvíz állapota
  const [trapIndex, setTrapIndex] = useState<number>(0);
  const [userSelectedChoice, setUserSelectedChoice] = useState<boolean | null>(null);
  const [trapScore, setTrapScore] = useState<number>(0);
  const [answeredMap, setAnsweredMap] = useState<Record<number, boolean>>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // 4. Dual Matrix kategória
  const [matrixCategory, setMatrixCategory] = useState<string>('mul');

  // Számítások az 1. fülhöz
  const valWithParen = Math.pow(testBase, testExp);
  const valWithoutParen = -Math.pow(Math.abs(testBase), testExp);

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • III. HATVÁNYOZÁS ÉS A NÉGYZETGYÖK"
      title="8. Gyakorlás, tudáspróba"
      subtitle="A teljes fejezet szintézise: hatványozás azonosságai, normálalak, négyzetgyökvonás, gyöktelenítés és vizsgafelkészülés"
      themeColor="rose"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-rose-600 dark:text-rose-400 font-black">Hatványozás:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>aⁿ · aᵐ = aⁿ⁺ᵐ</MathText> &nbsp;|&nbsp; <MathText>(aⁿ)ᵐ = aⁿ·ᵐ</MathText> &nbsp;|&nbsp; <MathText>a⁻ⁿ = 1 / aⁿ</MathText> &nbsp;(a ≠ 0, 0⁰ értelmetlen)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Normálalak:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>x = a · 10ᵏ</MathText> &nbsp;(1 ≤ |a| &lt; 10 és k ∈ ℤ; pl. <MathText>3,84 · 10⁵</MathText>)</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sky-600 dark:text-sky-400 font-black">Négyzetgyök:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>√(a · b) = √a · √b</MathText> &nbsp;|&nbsp; <MathText>√(a²) = |a|</MathText> &nbsp;|&nbsp; <MathText>√(a + b) ≠ √a + √b</MathText>!</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-amber-600 dark:text-amber-400 font-black">Gyöktelenítés:</span>
              <span className="text-slate-800 dark:text-slate-100"><MathText>c / √a = (c√a) / a</MathText> &nbsp;|&nbsp; <MathText>c / (√a + √b) = (c(√a - √b)) / (a - b)</MathText> (konjugált)</span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Tudáspróba indítása"
    >
      {/* 1. SZEKCIÓ: A FEJEZET FŐ TÉRKÉPE */}
      <TheorySection
        number={1}
        title="A fejezet elméleti összegzése és azonosságtérképe"
        icon={<Compass className="w-5 h-5 text-rose-500" />}
        badge="ÖSSZEFOGLALÁS"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              A 10. osztályos matematika egyik legfontosabb technikai fejezetének végéhez értünk. A <strong>Hatványozás és a négyzetgyök</strong> fejezetben lefektetett azonosságok és műveleti készségek a teljes középiskolai matematika – a másodfokú egyenletek, a trigonometria, az exponenciális és logaritmusos egyenletek – elengedhetetlen alapkövei.
            </p>
            <p>
              A fejezet két nagy műveleti pillérre épül:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong>A hatványfogalom kiterjesztése:</strong> A természetes kitevőkről eljutottunk az egész kitevőkre (a permanencia-elv alapján: <MathText>a⁰ = 1</MathText> és <MathText>a⁻ⁿ = 1 / aⁿ</MathText>), ami lehetővé tette a rendkívül nagy és a mikroszkopikus mennyiségek egységes kezelését a <strong>számok normálalakjával</strong>.
              </li>
              <li>
                <strong>A négyzetgyök világa:</strong> A négyzetre emelés megfordításaként a nemnegatív számok nemnegatív gyökét tanulmányoztuk, megismerve a szorzat és hányados gyökének szabályait, a részleges gyökvonást, valamint a nevező gyöktelenítését.
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <ChapterIdentitiesMapSvg />
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: A 4 KLASSZIKUS VIZSGABUKTATÓ */}
      <TheorySection
        number={2}
        title="A 4 leggyakoribb dolgozatbeli és érettségi buktató"
        icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
        badge="BUKTATÓK"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              A felmérések tapasztalatai szerint a diákok a pontjaik több mint 70%-át nem a képletek nem tudása, hanem <strong>négy tipikus formai és elvi hiba</strong> miatt veszítik el:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>A zárójel elhagyása:</strong> <MathText>(-3)² = +9</MathText>, de <MathText>-3² = -9</MathText>! A kitevő zárójel nélkül kizárólag a közvetlenül előtte álló számra hat.
              </li>
              <li>
                <strong>A negatív kitevő félreértelmezése:</strong> <MathText>2⁻³ = 1 / 8</MathText>, és semmiképpen sem -8 vagy -6! A negatív kitevő sosem ad negatív előjelet, hanem reciprok képzését jelenti: <MathText>a⁻ⁿ = 1 / aⁿ</MathText>.
              </li>
              <li>
                <strong>Az összeg gyökének tilalma:</strong> <MathText>√(9 + 16) = √25 = 5</MathText>, miközben <MathText>√9 + √16 = 3 + 4 = 7</MathText>! A négyzetgyök nem tagolható összeadásra vagy kivonásra: <MathText>√(a + b) ≠ √a + √b</MathText>!
              </li>
              <li>
                <strong>Az abszolútérték szabály:</strong> <MathText>√(a²) = |a|</MathText>, ezért <MathText>√((-5)²) = |-5| = 5</MathText> (nem -5!). Változóknál: ha <MathText>x &lt; 0</MathText>, akkor <MathText>√(x²) = -x</MathText>.
              </li>
            </ol>
          </div>
          <div className="lg:col-span-6">
            <FourClassicTrapsSvg />
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: NORMÁLALAK ÉS GYÖKÖS ÁTALAKÍTÁSOK */}
      <TheorySection
        number={3}
        title="Normálalak és gyökös átalakítások összefoglaló eszköztára"
        icon={<Sparkles className="w-5 h-5 text-emerald-500" />}
        badge="ESZKÖZTÁR"
        badgeColor="emerald"
      >
        <div className="space-y-6">
          <ScientificSummarySvg />
          <RadicalTransformationsPipelineSvg />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <TheoryCard
            title="Normálalak műveletei"
            badge="SZABÁLY"
            badgeColor="emerald"
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Szorzás: mantisszák szorzódnak, kitevők összeadódnak.<br />
              <MathText>(2 · 10⁴) · (4 · 10⁵) = 8 · 10⁹</MathText>.<br />
              Ha a mantissza ≥ 10, kötelező újraigazítani: <MathText>24 · 10⁵ = 2,4 · 10⁶</MathText>!
            </p>
          </TheoryCard>

          <TheoryCard
            title="Kéttagú gyöktelenítés"
            badge="KONJUGÁLT"
            badgeColor="indigo"
            icon={<Zap className="w-4 h-4 text-indigo-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Bővítés az ellentett előjelű párral: <MathText>√a + √b</MathText> konjugáltja <MathText>√a - √b</MathText>.<br />
              Nevező: <MathText>(√a)² - (√b)² = a - b</MathText>, a gyökök teljesen eltűnnek: <MathText>c / (√a + √b) = (c(√a - √b)) / (a - b)</MathText>.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Gyökös egyenletek"
            badge="ELLENŐRZÉS"
            badgeColor="rose"
            icon={<ShieldAlert className="w-4 h-4 text-rose-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Négyzetre emeléskor hamis gyökök jöhetnek létre! Az ellenőrzés az eredeti egyenletbe való visszahelyettesítéssel kötelező: <MathText>√x = -3</MathText> egyenletnek nincs valós megoldása!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. INTERAKTÍV LABORATÓRIUM */}
      <TheorySection
        number={4}
        title="Interaktív Laboratórium: Fejezeti szintézis, kalkulátor és hibavadász"
        icon={<Calculator className="w-5 h-5 text-rose-500" />}
        badge="INTERAKTÍV"
        badgeColor="rose"
      >
        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          {/* Fő Fülválasztó (4 fül) */}
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 pb-3 flex-wrap">
            <button
              onClick={() => setLabTab('rules')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                labTab === 'rules'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border hover:bg-slate-100'
                }`}
            >
              <Flame className="w-4 h-4" />
              1. Zárójel- & Előjeltesztelő
            </button>
            <button
              onClick={() => setLabTab('calculator')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                labTab === 'calculator'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-4 h-4" />
              2. Műveleti kalkulátor & szintézis
            </button>
            <button
              onClick={() => setLabTab('quiz')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                labTab === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border hover:bg-slate-100'
                }`}
            >
              <Target className="w-4 h-4" />
              3. Érettségi hibavadász kvíz
            </button>
            <button
              onClick={() => setLabTab('matrix')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                labTab === 'matrix'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border hover:bg-slate-100'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4" />
              4. Hatvány vs. Gyök tükör
            </button>
          </div>

          {/* 1. FÜL: ZÁRÓJEL- ÉS ELŐJELTESZTELŐ */}
          {labTab === 'rules' && (
            <div className="space-y-6">
              {/* Alap típus választó: Egész vagy Tört */}
              <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 w-fit">
                <span className="text-xs font-bold text-slate-500 pl-1">Alap típusa:</span>
                <button
                  onClick={() => setBaseMode('int')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    baseMode === 'int'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Egész szám
                </button>
                <button
                  onClick={() => setBaseMode('frac')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    baseMode === 'frac'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Tört alap (Reciprok trükk)
                </button>
              </div>

              {baseMode === 'int' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Alap (a): {testBase}
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {[-5, -4, -3, -2, -1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          onClick={() => setTestBase(val)}
                          className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                            testBase === val
                              ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Kitevő (n): {testExp}
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {[-3, -2, -1, 0, 1, 2, 3, 4].map((val) => (
                        <button
                          key={val}
                          onClick={() => setTestExp(val)}
                          className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                            testExp === val
                              ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Tört alap: -({fracNum} / {fracDen})
                    </label>
                    <div className="flex gap-2 flex-wrap items-center">
                      {[
                        { n: 2, d: 3 },
                        { n: 3, d: 4 },
                        { n: 1, d: 2 },
                        { n: 3, d: 2 },
                        { n: 4, d: 5 }
                      ].map((f, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setFracNum(f.n);
                            setFracDen(f.d);
                          }}
                          className={`px-3 py-1 rounded text-xs font-bold border transition-all ${
                            fracNum === f.n && fracDen === f.d
                              ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          <MathText>{`-( ${f.n} / ${f.d} )`}</MathText>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Kitevő (n): {testExp}
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {[-3, -2, -1, 0, 1, 2, 3].map((val) => (
                        <button
                          key={val}
                          onClick={() => setTestExp(val)}
                          className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                            testExp === val
                              ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Számítási összehasonlítás kártyák */}
              {baseMode === 'int' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-300 dark:border-emerald-800 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                        <MathText>{`ZÁRÓJELLEL: (${testBase})^${testExp}`}</MathText>
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-900 dark:text-emerald-100 my-2 flex items-center justify-center">
                        <MathText>
                          {testExp === 0
                            ? '1'
                            : testExp < 0
                            ? `1 / (${testBase})^${Math.abs(testExp)} = ${(1 / Math.pow(testBase, Math.abs(testExp))).toFixed(4)}`
                            : `${valWithParen}`}
                        </MathText>
                      </div>
                    </div>
                    <div className="text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/40 p-2 rounded-lg mt-2">
                      {testExp === 0 ? (
                        <span>Minden <MathText>a ≠ 0</MathText> szám nulladik hatványa pontosan 1!</span>
                      ) : testBase < 0 && Math.abs(testExp) % 2 === 0 ? (
                        <span><strong>Páros kitevő:</strong> a negatív előjelek páros szorzata POZITÍV eredményt ad!</span>
                      ) : testBase < 0 && Math.abs(testExp) % 2 !== 0 ? (
                        <span><strong>Páratlan kitevő:</strong> a negatív előjel megmarad az eredményben!</span>
                      ) : (
                        <span>Pozitív alapot hatványoztunk.</span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-300 dark:border-rose-800 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-rose-700 dark:text-rose-300 mb-1">
                        <MathText>{`ZÁRÓJEL NÉLKÜL: -(${Math.abs(testBase)})^${testExp}`}</MathText>
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-rose-900 dark:text-rose-100 my-2 flex items-center justify-center">
                        <MathText>
                          {testExp === 0
                            ? '-1'
                            : testExp < 0
                            ? `-1 / ${Math.abs(testBase)}^${Math.abs(testExp)} = ${(-1 / Math.pow(Math.abs(testBase), Math.abs(testExp))).toFixed(4)}`
                            : `${valWithoutParen}`}
                        </MathText>
                      </div>
                    </div>
                    <div className="text-xs text-rose-800 dark:text-rose-300 bg-rose-100/70 dark:bg-rose-900/40 p-2 rounded-lg mt-2">
                      A mínuszjel kívül marad, csak az abszolútérték hatványozódik! Még páros kitevőnél is <strong>negatív marad</strong>!
                    </div>
                  </div>
                </div>
              ) : (
                /* Tört alap összehasonlítása */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-300 dark:border-purple-800 space-y-2">
                    <div className="text-xs font-bold text-purple-700 dark:text-purple-300">
                      ZÁRÓJELLEL: <MathText>{`(-${fracNum} / ${fracDen})^${testExp}`}</MathText>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-lg text-sm sm:text-base font-bold text-purple-900 dark:text-purple-100 flex items-center justify-center flex-wrap gap-1">
                      {testExp === 0 ? (
                        <MathText>{`(-${fracNum} / ${fracDen})⁰ = 1`}</MathText>
                      ) : testExp < 0 ? (
                        <>
                          <MathText>{`(-${fracNum} / ${fracDen})^${testExp} = (-${fracDen} / ${fracNum})^${Math.abs(testExp)}`}</MathText>
                          <span className="text-xs text-purple-600 block w-full mt-1">
                            Reciprok: megfordítottuk a törtet, a kitevő pozitív lett!
                          </span>
                        </>
                      ) : (
                        <MathText>{`(-${fracNum} / ${fracDen})^${testExp} = (${Math.abs(testExp) % 2 === 0 ? '' : '-'}${Math.pow(fracNum, testExp)} / ${Math.pow(fracDen, testExp)})`}</MathText>
                      )}
                    </div>
                    <div className="text-xs text-purple-700 dark:text-purple-300">
                      {Math.abs(testExp) % 2 === 0 && testExp !== 0 ? 'Páros kitevő ⟹ POZITÍV végeredmény!' : testExp !== 0 ? 'Páratlan kitevő ⟹ NEGATÍV végeredmény!' : ''}
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800 space-y-2">
                    <div className="text-xs font-bold text-amber-700 dark:text-amber-300">
                      ZÁRÓJEL NÉLKÜL: <MathText>{`-${fracNum} / ${fracDen}^${testExp}`}</MathText>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-lg text-sm sm:text-base font-bold text-amber-900 dark:text-amber-100 flex items-center justify-center">
                      <span className="text-xs text-amber-700 dark:text-amber-300">
                        Zárójel hiányában a kitevő CSAK a nevezőre (vagy csak a számlálóra) vonatkozik, nem az egész törtre! Ezért kötelező a törtet zárójelbe tenni!
                      </span>
                    </div>
                    <div className="text-xs font-bold text-amber-800 dark:text-amber-200">
                      Aranyszabály: Tört hatványozásakor a zárójel KÖTELEZŐ!
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. FÜL: MŰVELETI KALKULÁTOR ÉS SZINTÉZIS */}
          {labTab === 'calculator' && (
            <div className="space-y-6">
              {/* Al-fül választó */}
              <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                <button
                  onClick={() => setCalcMode('root')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    calcMode === 'root'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border hover:bg-slate-100'
                  }`}
                >
                  A) Részleges gyökvonás & gyök alá bevitel
                </button>
                <button
                  onClick={() => setCalcMode('rationalize')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    calcMode === 'rationalize'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border hover:bg-slate-100'
                  }`}
                >
                  B) Nevező gyöktelenítése (Konjugált labor)
                </button>
                <button
                  onClick={() => setCalcMode('sci')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    calcMode === 'sci'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border hover:bg-slate-100'
                  }`}
                >
                  C) Normálalak szorzó & igazító
                </button>
              </div>

              {/* A) Részleges gyökvonás */}
              {calcMode === 'root' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Válassz egy számot a gyök alá: <MathText>{`√${selectedRootRadicand}`}</MathText>
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {Object.keys(PARTIAL_ROOT_DATA).map((numStr) => {
                        const num = Number(numStr);
                        return (
                          <button
                            key={num}
                            onClick={() => setSelectedRootRadicand(num)}
                            className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                              selectedRootRadicand === num
                                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                            }`}
                          >
                            <MathText>{`√${num}`}</MathText>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {(() => {
                    const info = PARTIAL_ROOT_DATA[selectedRootRadicand] || { square: 1, root: 1, remainder: selectedRootRadicand };
                    return (
                      <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-amber-800 shadow-xs space-y-3">
                        <div className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                          Részleges gyökvonás levezetése lépésről lépésre:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                            <div className="text-[11px] text-slate-500 mb-1">1. Négyzetszám felbontás:</div>
                            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                              <MathText>{`√${selectedRootRadicand} = √(${info.square} · ${info.remainder})`}</MathText>
                            </div>
                          </div>
                          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                            <div className="text-[11px] text-slate-500 mb-1">2. Szorzat gyöke szabály:</div>
                            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                              <MathText>{`= √${info.square} · √${info.remainder}`}</MathText>
                            </div>
                          </div>
                          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800">
                            <div className="text-[11px] text-amber-700 dark:text-amber-300 mb-1 font-bold">3. Egyszerűsített alak:</div>
                            <div className="text-base font-black text-amber-600 dark:text-amber-400">
                              <MathText>{`= ${info.root}√${info.remainder}`}</MathText>
                            </div>
                          </div>
                        </div>

                        <div className="p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between flex-wrap gap-2">
                          <span className="font-bold text-slate-700 dark:text-slate-200">Ellenőrzés (Gyök alá bevitel visszafelé):</span>
                          <MathText>{`${info.root}√${info.remainder} = √(${info.root}² · ${info.remainder}) = √(${info.square} · ${info.remainder}) = √${selectedRootRadicand}`}</MathText>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* B) Nevező gyöktelenítése */}
              {calcMode === 'rationalize' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Válassz egy gyöktelenítési mintafeladatot:
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {RATIONALIZATION_EXAMPLES.map((ex, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedRationIndex(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            selectedRationIndex === idx
                              ? 'bg-teal-600 text-white border-teal-700 shadow-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          <span className="text-[10px] opacity-75 block">{ex.type}</span>
                          <MathText>{ex.label}</MathText>
                        </button>
                      ))}
                    </div>
                  </div>

                  {(() => {
                    const ex = RATIONALIZATION_EXAMPLES[selectedRationIndex];
                    return (
                      <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-teal-200 dark:border-teal-800 shadow-xs space-y-3">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider">
                            Típus: {ex.type} gyöktelenítés
                          </span>
                          <span className="px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 text-xs font-bold flex items-center gap-1">
                            Bővítés tényezője: <MathText>{ex.multiplier}</MathText>
                          </span>
                        </div>

                        <div className="p-3 bg-teal-50/50 dark:bg-teal-950/30 rounded-lg text-center space-y-2">
                          <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center flex-wrap gap-1.5">
                            <MathText>{`${ex.label} = ${ex.step1} = ${ex.step2}`}</MathText>
                          </div>
                          <div className="text-lg sm:text-xl font-black text-teal-600 dark:text-teal-400 pt-2 border-t border-teal-200 dark:border-teal-800/80 flex items-center justify-center gap-2">
                            <span>Végeredmény:</span>
                            <MathText>{ex.result}</MathText>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                          <MathText>{ex.explanation}</MathText>
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* C) Normálalak szorzó */}
              {calcMode === 'sci' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Válassz egy műveletet:
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {SCIENTIFIC_EXAMPLES.map((ex, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSciIndex(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            selectedSciIndex === idx
                              ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          <span className="text-[10px] opacity-75 block">{ex.type}</span>
                          <MathText>{ex.expr}</MathText>
                        </button>
                      ))}
                    </div>
                  </div>

                  {(() => {
                    const ex = SCIENTIFIC_EXAMPLES[selectedSciIndex];
                    return (
                      <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-xs space-y-3">
                        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                          Művelet: {ex.type}
                        </div>

                        <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-lg text-center space-y-2">
                          <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center">
                            <MathText>{`${ex.expr} = ${ex.step1}`}</MathText>
                          </div>
                          <div className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                            {ex.adjust}
                          </div>
                          <div className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 pt-2 border-t border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center gap-2">
                            <span>Helyes normálalak:</span>
                            <MathText>{ex.result}</MathText>
                          </div>
                        </div>

                        <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs text-slate-600 dark:text-slate-400">
                          <strong>Emlékeztető:</strong> A normálalak definíciója szerint a mantissza abszolútértékének szigorúan az <MathText>1 ≤ |a| &lt; 10</MathText> tartományba kell esnie!
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* 3. FÜL: ÉRETTSÉGI HIBAVADÁSZ KVÍZ */}
          {labTab === 'quiz' && (
            <div className="space-y-6">
              {!quizFinished ? (
                (() => {
                  const q = TRAP_QUESTIONS[trapIndex];
                  const hasAnswered = userSelectedChoice !== null;
                  const isUserCorrect = userSelectedChoice === q.isCorrect;

                  return (
                    <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-indigo-200 dark:border-indigo-800 shadow-xs space-y-4">
                      {/* Fejléc pontszámmal */}
                      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700/80 pb-3 flex-wrap gap-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                          Állítás: {trapIndex + 1} / {TRAP_QUESTIONS.length}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                            Eddigi pontszám: <strong className="text-indigo-600 dark:text-indigo-400 text-sm">{trapScore}</strong> / {TRAP_QUESTIONS.length}
                          </span>
                        </div>
                      </div>

                      {/* Állítás kártya */}
                      <div className="text-center py-4 px-2 space-y-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                          {q.trapName}
                        </span>
                        <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center justify-center my-3">
                          <MathText>{q.formula}</MathText>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                          Döntsd el: Matematikailag helyes vagy érettségi buktató (hamis)?
                        </p>
                      </div>

                      {/* Választó gombok */}
                      {!hasAnswered ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <button
                            onClick={() => {
                              setUserSelectedChoice(true);
                              if (q.isCorrect) setTrapScore((s) => s + 1);
                              setAnsweredMap((m) => ({ ...m, [trapIndex]: q.isCorrect }));
                            }}
                            className="p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/60 flex items-center justify-center gap-2 transition-all shadow-xs"
                          >
                            <Check className="w-5 h-5 text-emerald-600" />
                            IGAZ / HELYES ÁLLÍTÁS
                          </button>
                          <button
                            onClick={() => {
                              setUserSelectedChoice(false);
                              if (!q.isCorrect) setTrapScore((s) => s + 1);
                              setAnsweredMap((m) => ({ ...m, [trapIndex]: !q.isCorrect }));
                            }}
                            className="p-3.5 rounded-xl border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 font-bold hover:bg-rose-100 dark:hover:bg-rose-900/60 flex items-center justify-center gap-2 transition-all shadow-xs"
                          >
                            <X className="w-5 h-5 text-rose-600" />
                            HAMIS / CSAPDA (BUKTATÓ!)
                          </button>
                        </div>
                      ) : (
                        /* Visszajelzés kártya */
                        <div className="space-y-4 pt-2">
                          <div
                            className={`p-4 rounded-xl border ${
                              isUserCorrect
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100'
                            }`}
                          >
                            <div className="flex items-center gap-2 font-black text-sm sm:text-base mb-1">
                              {isUserCorrect ? (
                                <>
                                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                                  <span>Kiváló! Sikeresen felismerted! (+1 pont)</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-5 h-5 text-rose-600" />
                                  <span>Csapda! Vigyázz a dolgozatban!</span>
                                </>
                              )}
                            </div>
                            <div className="text-xs sm:text-sm mt-2 leading-relaxed text-slate-700 dark:text-slate-200">
                              <MathText>{q.explanation}</MathText>
                            </div>
                            <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 font-bold text-xs flex items-center gap-2">
                              <span>Helyes elv:</span>
                              <MathText>{q.correctRule}</MathText>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <button
                              onClick={() => {
                                if (trapIndex + 1 < TRAP_QUESTIONS.length) {
                                  setTrapIndex((i) => i + 1);
                                  setUserSelectedChoice(null);
                                } else {
                                  setQuizFinished(true);
                                }
                              }}
                              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 flex items-center gap-2 shadow-sm transition-all"
                            >
                              <span>{trapIndex + 1 < TRAP_QUESTIONS.length ? 'Következő állítás' : 'Eredmények megtekintése'}</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()
              ) : (
                /* Kvíz befejezve értékelő kártya */
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-indigo-200 dark:border-indigo-800 text-center space-y-4 shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-600 flex items-center justify-center mx-auto">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    Érettségi Hibavadász Befejezve!
                  </h3>
                  <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                    {trapScore} / {TRAP_QUESTIONS.length} pont ({Math.round((trapScore / TRAP_QUESTIONS.length) * 100)}%)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    {trapScore >= 7
                      ? 'Fantasztikus! Mindegyik klasszikus buktatót és szabályt magabiztosan átláttad. Készen állsz a tudáspróbára!'
                      : trapScore >= 5
                      ? 'Jó eredmény! Néhány tipikus zárójel- vagy gyökcsapdára érdemes még egyszer rápillantani a dolgozat előtt.'
                      : 'Érdemes még egyszer átolvasni a 4 leggyakoribb buktatót és a hatványozás azonosságait!'}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setTrapIndex(0);
                        setUserSelectedChoice(null);
                        setTrapScore(0);
                        setAnsweredMap({});
                        setQuizFinished(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs inline-flex items-center gap-1.5 transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Kvíz újrakezdése
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. FÜL: HATVÁNY VS. GYÖK TÜKÖR */}
          {labTab === 'matrix' && (
            <div className="space-y-6">
              {/* Kategória választó gombok */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { key: 'mul', label: '1. Szorzás szabályai' },
                  { key: 'div', label: '2. Osztás és hányados' },
                  { key: 'power', label: '3. Összetett művelet' },
                  { key: 'sum', label: '4. A tiltott összegcsapda' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setMatrixCategory(item.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      matrixCategory === item.key
                        ? 'bg-sky-600 text-white border-sky-700 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {(() => {
                const data = MATRIX_DATA[matrixCategory] || MATRIX_DATA.mul;
                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Bal oldal: Hatványozás */}
                      <div className="p-4 bg-sky-50/70 dark:bg-sky-950/30 rounded-xl border border-sky-200 dark:border-sky-800 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase">
                            Hatványozás világa
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 font-bold">
                            {data.badge}
                          </span>
                        </div>
                        <div className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 py-1">
                          <MathText>{data.powerRule}</MathText>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {data.powerExplain}
                        </p>
                        <div className="p-2 bg-white dark:bg-slate-900 rounded border border-sky-100 dark:border-sky-900 text-xs text-sky-900 dark:text-sky-200 font-bold">
                          Példa: <MathText>{data.powerExample}</MathText>
                        </div>
                      </div>

                      {/* Jobb oldal: Négyzetgyökvonás */}
                      <div className="p-4 bg-rose-50/70 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase">
                            Négyzetgyökvonás világa
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-bold">
                            {data.badge}
                          </span>
                        </div>
                        <div className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 py-1">
                          <MathText>{data.rootRule}</MathText>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {data.rootExplain}
                        </p>
                        <div className="p-2 bg-white dark:bg-slate-900 rounded border border-rose-100 dark:border-rose-900 text-xs text-rose-900 dark:text-rose-200 font-bold">
                          Példa: <MathText>{data.rootExample}</MathText>
                        </div>
                      </div>
                    </div>

                    {/* Szintézis & Tanulság doboz */}
                    <div className="p-3.5 bg-gradient-to-r from-sky-50 via-white to-rose-50 dark:from-sky-950/20 dark:via-slate-850 dark:to-rose-950/20 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                      <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white">Párhuzamos tanulság: </strong>
                        <MathText>{data.synthesis}</MathText>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SummaryTheory;

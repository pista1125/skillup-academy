import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ExponentialFunctionsMatcher } from './ExponentialFunctionsMatcher';
import { ExponentialFunctionsSorter } from './ExponentialFunctionsSorter';
import { expPath } from './ExponentialFunctionsFigures';

const QSVG = 'w-full max-w-[280px] h-auto mx-auto';

type Curve = { a: number; color: string; label?: string; lx?: number };

/** Kis négyzethálós koordináta-rendszer exponenciális görbékkel (egység 22 px). */
const ExpGraph: React.FC<{
  curves: Curve[];
  points?: { x: number; y: number; label?: string }[];
  hLine?: { y: number; label: string };
  note?: string;
  vMarks?: { x: number; a: number; label: string }[];
}> = ({ curves, points = [], hLine, note, vMarks = [] }) => {
  const ox = 120;
  const oy = 140;
  const k = 22;
  return (
    <svg viewBox="0 0 240 160" className={QSVG}>
      {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((t) => (
        <line key={`v${t}`} x1={ox + t * k} y1="8" x2={ox + t * k} y2={oy} stroke="#e2e8f0" />
      ))}
      {[1, 2, 3, 4, 5, 6].map((t) => (
        <line key={`h${t}`} x1="10" y1={oy - t * k} x2="230" y2={oy - t * k} stroke="#e2e8f0" />
      ))}
      <line x1="8" y1={oy} x2="234" y2={oy} stroke="#475569" strokeWidth="1.3" />
      <line x1={ox} y1={oy + 8} x2={ox} y2="4" stroke="#475569" strokeWidth="1.3" />
      <text x={ox + k} y={oy + 12} fontSize="9" textAnchor="middle" fill="#334155">
        1
      </text>
      <text x={ox - 4} y={oy - k + 3} fontSize="9" textAnchor="end" fill="#334155">
        1
      </text>
      <text x="232" y={oy - 4} fontSize="9" fill="#334155" textAnchor="end">
        x
      </text>
      <text x={ox + 4} y="10" fontSize="9" fill="#334155">
        y
      </text>
      {hLine && (
        <>
          <line x1="10" y1={oy - hLine.y * k} x2="230" y2={oy - hLine.y * k} stroke="#f59e0b" strokeDasharray="5 4" strokeWidth="1.5" />
          <text x="228" y={oy - hLine.y * k - 4} fontSize="10" textAnchor="end" fill="#b45309">
            {hLine.label}
          </text>
        </>
      )}
      {curves.map((c, i) => (
        <g key={i}>
          <path d={expPath(c.a, ox, oy, k, -5.4, 5.4, 6.2)} fill="none" stroke={c.color} strokeWidth="2.5" />
          {c.label && c.lx !== undefined && (
            <text x={ox + c.lx * k} y={oy - Math.pow(c.a, c.lx) * k - 6} fontSize="11" fontWeight="bold" textAnchor="middle" fill={c.color}>
              {c.label}
            </text>
          )}
        </g>
      ))}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={ox + p.x * k} cy={oy - p.y * k} r="3.5" fill="#be185d" />
          {p.label && (
            <text x={ox + p.x * k + 6} y={oy - p.y * k - 5} fontSize="10" fill="#be185d" fontWeight="bold">
              {p.label}
            </text>
          )}
        </g>
      ))}
      {vMarks.map((m, i) => {
        const y = Math.pow(m.a, m.x);
        return (
          <g key={"m" + i}>
            <line x1={ox + m.x * k} y1={oy} x2={ox + m.x * k} y2={oy - y * k} stroke="#be185d" strokeDasharray="3 3" />
            <line x1={ox} y1={oy - y * k} x2={ox + m.x * k} y2={oy - y * k} stroke="#be185d" strokeDasharray="3 3" />
            <circle cx={ox + m.x * k} cy={oy - y * k} r="3.5" fill="#be185d" />
            <text x={ox + m.x * k} y={oy + 20} fontSize="9" textAnchor="middle" fill="#be185d" fontWeight="bold">
              {m.label}
            </text>
            <text x={ox - 6} y={oy - y * k - 3} fontSize="10" textAnchor="end" fill="#be185d" fontWeight="bold">
              ?
            </text>
          </g>
        );
      })}
      {note && (
        <text x="12" y="20" fontSize="10" fill="#b91c1c" fontWeight="bold">
          {note}
        </text>
      )}
    </svg>
  );
};

const EXP_FUNCTION_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: definíció, tulajdonságok (1–10)
  {
    id: 'exf-q1',
    level: 1,
    questionTypeBadge: 'Értékkészlet',
    question: 'Mi a valós számok halmazán értelmezett x ↦ 2ˣ függvény értékkészlete?',
    options: ['A pozitív valós számok halmaza (R⁺)', 'A valós számok halmaza (R)', 'A nemnegatív valós számok halmaza', 'Az 1-nél nem kisebb valós számok halmaza'],
    correctAnswer: 0,
    explanation: '2ˣ minden valós x-re pozitív, és minden pozitív értéket felvesz; a 0-t sosem (nincs zérushelye). Ezért Rf = R⁺.'
  },
  {
    id: 'exf-q2',
    level: 1,
    questionTypeBadge: 'Nevezetes pont',
    question: 'Melyik ponton megy át MINDEN x ↦ aˣ (a > 0, a ≠ 1) exponenciális függvény grafikonja?',
    options: ['(0; 1)', '(1; 0)', '(0; 0)', '(1; 1)'],
    correctAnswer: 0,
    explanation: 'a⁰ = 1 minden a > 0 esetén, ezért a grafikon az y tengelyt a (0; 1) pontban metszi. (1; a) is rajta van, de ez a-tól függ.'
  },
  {
    id: 'exf-q3',
    level: 1,
    questionTypeBadge: 'Monotonitás',
    question: 'Milyen az x ↦ 2ˣ függvény monotonitása?',
    options: ['Szigorúan monoton növekvő', 'Szigorúan monoton csökkenő', 'Először csökkenő, majd növekvő', 'Konstans'],
    correctAnswer: 0,
    explanation: 'Az alap 2 > 1, ezért a függvény szigorúan monoton növekvő: nagyobb kitevőhöz nagyobb hatványérték tartozik.'
  },
  {
    id: 'exf-q4',
    level: 1,
    questionTypeBadge: 'Monotonitás',
    question: 'Milyen az x ↦ 0,5ˣ függvény monotonitása?',
    options: ['Szigorúan monoton csökkenő', 'Szigorúan monoton növekvő', 'Először növekvő, majd csökkenő', 'Nem monoton'],
    correctAnswer: 0,
    explanation: 'Az alap 0 < 0,5 < 1, ezért a függvény szigorúan monoton csökkenő (pl. 0,5⁰ = 1 > 0,5¹ = 0,5 > 0,5² = 0,25).'
  },
  {
    id: 'exf-q5',
    level: 1,
    questionTypeBadge: 'Definíció',
    question: 'Melyik hozzárendelést NEM soroljuk az exponenciális függvények közé?',
    options: ['x ↦ 1ˣ', 'x ↦ 0,4ˣ', 'x ↦ 1,5ˣ', 'x ↦ (3/4)ˣ'],
    correctAnswer: 0,
    explanation: 'Az x ↦ 1ˣ függvény minden értéke 1, tehát konstans függvény; ezért – bár formailag elfogadható lenne – nem soroljuk az exponenciális függvények közé. Az alap feltétele: a > 0 és a ≠ 1.'
  },
  {
    id: 'exf-q6',
    level: 1,
    questionTypeBadge: 'Függvényérték',
    question: 'Legyen f(x) = 3ˣ. Mennyi f(−2)?',
    options: ['1/9', '−9', '−6', '9'],
    correctAnswer: 0,
    explanation: '3⁻² = 1/3² = 1/9. A negatív kitevő reciprokot jelent, nem negatív előjelet.'
  },
  {
    id: 'exf-q7',
    level: 1,
    questionTypeBadge: 'Zérushely',
    question: 'Hány zérushelye van az x ↦ 2ˣ függvénynek?',
    options: ['Nincs zérushelye', 'Egy: x = 0', 'Egy: x = 1', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: '2ˣ > 0 minden valós x-re, ezért sosem 0. A grafikon az x tengelyhez közelít, de nem éri el. (x = 0-nál az érték 1.)'
  },
  {
    id: 'exf-q8',
    level: 1,
    questionTypeBadge: 'Grafikon',
    question: 'Az ábrán egy x ↦ aˣ függvény grafikonja látható (négyzet oldala 1 egység). Mi a hozzárendelési szabály?',
    figure: <ExpGraph curves={[{ a: 3, color: '#7c3aed' }]} points={[{ x: 1, y: 3 }]} note="x ↦ ?" />,
    options: ['x ↦ 3ˣ', 'x ↦ 2ˣ', 'x ↦ (1/3)ˣ', 'x ↦ 4ˣ'],
    correctAnswer: 0,
    explanation: 'A görbe átmegy az (1; 3) rácsponton, tehát a¹ = 3, azaz a = 3. Növekvő, így 1 < a – ez is egyezik.'
  },
  {
    id: 'exf-q9',
    level: 1,
    questionTypeBadge: 'Függvényérték',
    question: 'Legyen f(x) = 0,25ˣ. Mennyi f(−1)?',
    options: ['4', '−0,25', '0,25', '−4'],
    correctAnswer: 0,
    explanation: '0,25⁻¹ = 1/0,25 = 4.'
  },
  {
    id: 'exf-q10',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mit jelent az „exponens” szó, amelyről az exponenciális függvény a nevét kapta?',
    options: ['Hatványkitevő', 'Hatványalap', 'Szorzótényező', 'Gyökkitevő'],
    correctAnswer: 0,
    explanation: 'Az exponens latin szó jelentése hatványkitevő; a függvény exponenciális, ha a független változó a hatványkitevőben van (aˣ), nem az alapban (mint x² esetén).'
  },

  // LEVEL 2: grafikon, becslés, tükrözés (11–20)
  {
    id: 'exf-q11',
    level: 2,
    questionTypeBadge: 'Grafikon',
    question: 'Az ábrán egy x ↦ aˣ függvény grafikonja látható (négyzet oldala 1 egység). Mi a hozzárendelési szabály?',
    figure: <ExpGraph curves={[{ a: 0.5, color: '#0ea5e9' }]} points={[{ x: -2, y: 4 }]} note="x ↦ ?" />,
    options: ['x ↦ 0,5ˣ', 'x ↦ 2ˣ', 'x ↦ 4ˣ', 'x ↦ 0,25ˣ'],
    correctAnswer: 0,
    explanation: 'A görbe csökkenő (0 < a < 1) és átmegy a (−2; 4) ponton: a⁻² = 4 ⇒ a² = 1/4 ⇒ a = 1/2 = 0,5.'
  },
  {
    id: 'exf-q12',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Melyik két egész szám közé esik 3^{7/8}?',
    figure: <ExpGraph curves={[{ a: 3, color: '#7c3aed', label: 'y = 3ˣ', lx: 1.5 }]} vMarks={[{ x: 7 / 8, a: 3, label: '7/8' }]} />,
    options: ['2 és 3 közé', '1 és 2 közé', '0 és 1 közé', '3 és 4 közé'],
    correctAnswer: 0,
    explanation: '0 < 7/8 < 1 és 3ˣ növekvő, ezért 3⁰ = 1 < 3^{7/8} < 3¹ = 3. Mivel 7/8 közel van 1-hez: 3^{7/8} ≈ 2,615, tehát 2 és 3 közé esik.'
  },
  {
    id: 'exf-q13',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Melyik két egész szám közé esik 3^{−3/5}?',
    figure: <ExpGraph curves={[{ a: 3, color: '#7c3aed', label: 'y = 3ˣ', lx: 1.5 }]} vMarks={[{ x: -3 / 5, a: 3, label: '−3/5' }]} />,
    options: ['0 és 1 közé', '−1 és 0 közé', '1 és 2 közé', '−2 és −1 közé'],
    correctAnswer: 0,
    explanation: 'Negatív kitevőnél 3ˣ < 3⁰ = 1, de mindig pozitív: 3^{−3/5} ≈ 0,517, tehát 0 és 1 közé esik.'
  },
  {
    id: 'exf-q14',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Melyik két egész szám közé esik 0,5^{−5/4}?',
    figure: <ExpGraph curves={[{ a: 0.5, color: '#0ea5e9', label: 'y = 0,5ˣ', lx: -2.4 }]} vMarks={[{ x: -5 / 4, a: 0.5, label: '−5/4' }]} />,
    options: ['2 és 3 közé', '0 és 1 közé', '1 és 2 közé', '−3 és −2 közé'],
    correctAnswer: 0,
    explanation: '0,5^{−5/4} = 2^{5/4}. Mivel 1 < 5/4 < 2: 2¹ = 2 < 2^{5/4} < 2² = 4; számológéppel ≈ 2,378, tehát 2 és 3 közé esik.'
  },
  {
    id: 'exf-q15',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Melyik két egész szám közé esik 1,5^{3/2}?',
    figure: <ExpGraph curves={[{ a: 1.5, color: '#e11d48', label: 'y = 1,5ˣ', lx: 4 }]} vMarks={[{ x: 3 / 2, a: 1.5, label: '3/2' }]} />,
    options: ['1 és 2 közé', '2 és 3 közé', '0 és 1 közé', '3 és 4 közé'],
    correctAnswer: 0,
    explanation: '1,5^{3/2} = √(1,5³) = √3,375 ≈ 1,837, tehát 1 és 2 közé esik.'
  },
  {
    id: 'exf-q16',
    level: 2,
    questionTypeBadge: 'Irracionális kitevő',
    question: 'Mennyi 2^{√2} három tizedesjegy pontossággal?',
    options: ['2,665', '2,828', '4,000', '1,414'],
    correctAnswer: 0,
    explanation: '1,414 < √2 < 1,415 ⇒ 2^{1,414} < 2^{√2} < 2^{1,415}; számológéppel 2^{√2} ≈ 2,665. (2,828 = 2 · √2, ez szorzás, nem hatvány.)'
  },
  {
    id: 'exf-q17',
    level: 2,
    questionTypeBadge: 'Reciprok',
    question: 'Legyen f(x) = 0,25ˣ. Milyen kapcsolat van f(a) és f(−a) között?',
    options: ['f(a) · f(−a) = 1', 'f(a) = f(−a)', 'f(−a) = −f(a)', 'f(a) + f(−a) = 0'],
    correctAnswer: 0,
    explanation: 'f(−a) = 0,25⁻ᵃ = 1/0,25ᵃ = 1/f(a), tehát a szorzatuk 1. (Pl. f(1) = 0,25, f(−1) = 4.)'
  },
  {
    id: 'exf-q18',
    level: 2,
    questionTypeBadge: 'Grafikus megoldás',
    question: 'Az ábra az f(x) = 0,25ˣ grafikonját és az y = 3 egyenest mutatja. Mennyi a 0,25ˣ = 3 egyenlet megoldása (két tizedesjegyre)?',
    figure: <ExpGraph curves={[{ a: 0.25, color: '#0ea5e9', label: 'y = 0,25ˣ', lx: -1 }]} hLine={{ y: 3, label: 'y = 3' }} note="x = ?" />,
    options: ['≈ −0,79', '≈ 0,79', '≈ −1,26', '≈ 0,75'],
    correctAnswer: 0,
    explanation: 'A görbe csökkenő, és az y = 3 egyenest negatív x-nél, −1 és 0 között metszi (f(−1) = 4 > 3 > 1 = f(0)). Számológéppel 0,25^{−0,79} ≈ 3, tehát x ≈ −0,79.'
  },
  {
    id: 'exf-q19',
    level: 2,
    questionTypeBadge: 'Azonos függvények',
    question: 'Melyik két hozzárendelés adja ugyanazt a függvényt?',
    options: ['x ↦ (3/4)ˣ és x ↦ (4/3)⁻ˣ', 'x ↦ (3/4)ˣ és x ↦ (4/3)ˣ', 'x ↦ (3/4)ˣ és x ↦ (3/4)⁻ˣ', 'x ↦ (4/3)ˣ és x ↦ (4/3)⁻ˣ'],
    correctAnswer: 0,
    explanation: '(4/3)⁻ˣ = ((4/3)⁻¹)ˣ = (3/4)ˣ. A többi párnál a két grafikon egymás tükörképe az y tengelyre, nem ugyanaz.'
  },
  {
    id: 'exf-q20',
    level: 2,
    questionTypeBadge: 'Transzformáció',
    question: 'Az ábrán az y = 3ˣ és az y = (1/3)ˣ grafikonja látható. Milyen kapcsolatban van egymással a két grafikon?',
    figure: <ExpGraph curves={[{ a: 3, color: '#7c3aed' }, { a: 1 / 3, color: '#0ea5e9' }]} note="kapcsolat?" />,
    options: ['Egymás tükörképei az y tengelyre', 'Egymás tükörképei az x tengelyre', 'Egymás tükörképei az origóra', 'Egymás tükörképei az y = x egyenesre'],
    correctAnswer: 0,
    explanation: '(1/3)ˣ = 3⁻ˣ, tehát g(x) = f(−x): ez az y tengelyre való tükrözés. (Az x tengelyre tükrözve negatív értékek jönnének ki.)'
  },

  // LEVEL 3: pontillesztés, összehasonlítás, összetett (21–30)
  {
    id: 'exf-q21',
    level: 3,
    questionTypeBadge: 'Pontillesztés',
    question: 'Adottak: f(x) = 3ˣ, g(x) = (1/3)ˣ, h(x) = 9ˣ. Melyik grafikonjára illeszkedik a P(−2; 9) pont?',
    options: ['g(x) = (1/3)ˣ', 'f(x) = 3ˣ', 'h(x) = 9ˣ', 'Egyikre sem'],
    correctAnswer: 0,
    explanation: 'g(−2) = (1/3)⁻² = 3² = 9 ✓. f(−2) = 1/9, h(−2) = 1/81.'
  },
  {
    id: 'exf-q22',
    level: 3,
    questionTypeBadge: 'Pontillesztés',
    question: 'Adottak: f(x) = 3ˣ, g(x) = (1/3)ˣ, h(x) = 9ˣ. Melyik grafikonjára illeszkedik a P(−1/2; 1/3) pont?',
    options: ['h(x) = 9ˣ', 'f(x) = 3ˣ', 'g(x) = (1/3)ˣ', 'Egyikre sem'],
    correctAnswer: 0,
    explanation: 'h(−1/2) = 9^{−1/2} = 1/√9 = 1/3 ✓. f(−1/2) = 1/√3 ≈ 0,577, g(−1/2) = √3 ≈ 1,732.'
  },
  {
    id: 'exf-q23',
    level: 3,
    questionTypeBadge: 'Pontillesztés',
    question: 'Adottak: f(x) = 3ˣ, g(x) = (1/3)ˣ, h(x) = 9ˣ. Melyik grafikonjára illeszkedik a P(1/2; √3) pont?',
    options: ['f(x) = 3ˣ', 'g(x) = (1/3)ˣ', 'h(x) = 9ˣ', 'Mindháromra'],
    correctAnswer: 0,
    explanation: 'f(1/2) = 3^{1/2} = √3 ✓. g(1/2) = 1/√3, h(1/2) = √9 = 3.'
  },
  {
    id: 'exf-q24',
    level: 3,
    questionTypeBadge: 'Pontillesztés',
    question: 'Adottak: f(x) = 3ˣ, g(x) = (1/3)ˣ, h(x) = 9ˣ. Melyik grafikonjára illeszkedik a P(1; 0) pont?',
    options: ['Egyikre sem', 'f(x) = 3ˣ', 'g(x) = (1/3)ˣ', 'h(x) = 9ˣ'],
    correctAnswer: 0,
    explanation: 'Exponenciális függvény értéke sosem 0 (értékkészlete R⁺), tehát egyik grafikonon sincs y = 0 koordinátájú pont. (f(1) = 3, g(1) = 1/3, h(1) = 9.)'
  },
  {
    id: 'exf-q25',
    level: 3,
    questionTypeBadge: 'Monotonitás',
    question: 'Melyik függvény szigorúan monoton CSÖKKENŐ?',
    options: ['x ↦ (4/3)⁻ˣ', 'x ↦ (3/4)⁻ˣ', 'x ↦ 1,2ˣ', 'x ↦ 9^{x/2}'],
    correctAnswer: 0,
    explanation: '(4/3)⁻ˣ = (3/4)ˣ, az alap 3/4 < 1, tehát csökkenő. (3/4)⁻ˣ = (4/3)ˣ növekvő; 1,2ˣ növekvő; 9^{x/2} = 3ˣ növekvő.'
  },
  {
    id: 'exf-q26',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik állítás IGAZ?',
    figure: <ExpGraph curves={[{ a: 0.8, color: '#14b8a6', label: 'y = 0,8ˣ', lx: -4.5 }]} vMarks={[{ x: -3, a: 0.8, label: '−3' }, { x: -2, a: 0.8, label: '−2' }]} />,
    options: ['0,8⁻³ > 0,8⁻²', '0,8⁻³ < 0,8⁻²', '1,2⁻³ > 1,2⁻²', '2^{√2} > 2^{1,5}'],
    correctAnswer: 0,
    explanation: 'x ↦ 0,8ˣ csökkenő, és −3 < −2, ezért 0,8⁻³ > 0,8⁻² (≈ 1,953 > 1,5625). 1,2ˣ növekvő ⇒ 1,2⁻³ < 1,2⁻²; √2 ≈ 1,414 < 1,5 ⇒ 2^{√2} < 2^{1,5}.'
  },
  {
    id: 'exf-q27',
    level: 3,
    questionTypeBadge: 'Értékkészlet',
    question: 'Az x ↦ 2ˣ függvényt a {−2,6; −2,5; −2,4; …; 3,1} halmazon értelmezzük. Mennyi az értékkészlet legnagyobb eleme?',
    options: ['2^{3,1} ≈ 8,574', '8', '3,1² ≈ 9,61', '2 · 3,1 = 6,2'],
    correctAnswer: 0,
    explanation: 'A függvény szigorúan monoton növekvő, így a legnagyobb értéket a legnagyobb x-nél, 3,1-nél veszi fel: 2^{3,1} ≈ 8,574. (A legkisebb: 2^{−2,6} ≈ 0,165.)'
  },
  {
    id: 'exf-q28',
    level: 3,
    questionTypeBadge: 'Értelmezési tartomány',
    question: 'Hány pontból áll az x ↦ 2ˣ függvény grafikonja, ha az értelmezési tartomány a {−2,6; −2,5; −2,4; …; 3,1} halmaz?',
    options: ['58', '57', '56', '60'],
    correctAnswer: 0,
    explanation: '−2,6-tól 3,1-ig 0,1-es lépésekkel: (3,1 − (−2,6)) / 0,1 + 1 = 57 + 1 = 58 elem. (57 a lépések száma – kerítésoszlop-hiba.)'
  },
  {
    id: 'exf-q29',
    level: 3,
    questionTypeBadge: 'Növekedés',
    question: 'Hányszorosára nő az x ↦ 1,5ˣ függvény értéke, ha x-et 2-vel növeljük?',
    options: ['2,25-szörösére', '3-szorosára', '1,5-szeresére', '3,5-szeresére'],
    correctAnswer: 0,
    explanation: '1,5ˣ⁺² = 1,5ˣ · 1,5² = 2,25 · 1,5ˣ. Exponenciális függvénynél egyenlő x-növekményhez mindig ugyanakkora szorzó tartozik.'
  },
  {
    id: 'exf-q30',
    level: 3,
    questionTypeBadge: 'Grafikon',
    question: 'Az ábrán az y = 1,2ˣ, az y = 1,5ˣ és az y = 2ˣ grafikonja látható A, B, C betűvel jelölve. Melyik az y = 2ˣ grafikonja?',
    figure: (
      <ExpGraph
        curves={[
          { a: 1.5, color: '#e11d48', label: 'A', lx: 4.2 },
          { a: 2, color: '#7c3aed', label: 'B', lx: 2.4 },
          { a: 1.2, color: '#f59e0b', label: 'C', lx: 4.8 }
        ]}
      />
    ),
    options: ['B', 'A', 'C', 'Nem dönthető el a grafikonokból'],
    correctAnswer: 0,
    explanation: 'Pozitív x-re a nagyobb alapú függvény értéke a nagyobb (pl. x = 2: 1,44 < 2,25 < 4), ezért a jobbra legmeredekebben emelkedő görbe, a B a 2ˣ. Negatív x-nél a sorrend fordított.'
  }
];

export const ExponentialFunctionsQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId="g11-exp-exponencialis-fuggveny-quiz"
      subtopicId="exponencialis-fuggvenyek"
      title="7. Exponenciális függvények – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: az aˣ függvény tulajdonságai, grafikonok leolvasása, becslés, tükrözés és pontillesztés."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={EXP_FUNCTION_QUESTIONS}
      cheatSheets={[
        {
          title: 'Definíció',
          items: ['x ↦ aˣ, a > 0, a ≠ 1, Df = R', 'Rf = R⁺ (sosem 0, sosem negatív)', 'Nincs szélsőértéke, nincs zérushelye', 'x ↦ 1ˣ konstans – nem exponenciális']
        },
        {
          title: 'Monotonitás és grafikon',
          items: ['a > 1: szigorúan monoton növekvő', '0 < a < 1: szigorúan monoton csökkenő', 'Minden grafikon átmegy a (0; 1) ponton', '(1/a)ˣ = a⁻ˣ: tükrözés az y tengelyre']
        },
        {
          title: 'Számolás',
          items: ['a⁻ˣ = 1/aˣ (pl. 3⁻² = 1/9)', 'f(a) · f(−a) = 1', 'aˣ⁺² = a² · aˣ', '2^{√2} ≈ 2,665 (1,414 < √2 < 1,415)']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ExponentialFunctionsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <ExponentialFunctionsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default ExponentialFunctionsQuiz;

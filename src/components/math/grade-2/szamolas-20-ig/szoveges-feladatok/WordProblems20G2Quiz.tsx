import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WordProblems20G2Matcher } from './WordProblems20G2Matcher';
import { WordProblems20G2Sorter } from './WordProblems20G2Sorter';
import { BracePart, UnitStrip20Part, WORD20_FONT } from './WordProblems20G2Parts';

const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 116 }) => (
  <svg
    viewBox={`0 0 240 ${h}`}
    className="w-full max-w-[280px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={WORD20_FONT}
  >
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** 20-as szalag két összeadandóval és ? kapoccsal. */
const StripJoinFig: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const x0 = 15;
  const sq = 10.5;
  return (
    <QFig h={114}>
      <UnitStrip20Part x={x0} y={40} sqSize={sq} first={a} second={b} />
      <BracePart x1={x0} x2={x0 + a * sq} y={34} dir="up" color="#15803d" label={String(a)} fontSize={11} />
      <BracePart x1={x0 + a * sq} x2={x0 + (a + b) * sq} y={34} dir="up" color="#1d4ed8" label={String(b)} fontSize={11} />
      <BracePart x1={x0} x2={x0 + (a + b) * sq} y={56} dir="down" color="#0f172a" label="összesen: ?" labelColor={UNK} fontSize={12} />
    </QFig>
  );
};

/** 20-as szalag elvétellel (piros áthúzások). */
const StripCrossFig: React.FC<{ total: number; gone: number }> = ({ total, gone }) => {
  const x0 = 15;
  const sq = 10.5;
  const left = total - gone;
  return (
    <QFig h={114}>
      <UnitStrip20Part
        x={x0}
        y={42}
        sqSize={sq}
        first={total}
        crossed={gone}
        firstColor="#93c5fd"
        firstStroke="#1d4ed8"
      />
      <BracePart x1={x0} x2={x0 + total * sq} y={35} dir="up" color="#0f172a" label={`volt: ${total}`} fontSize={11} />
      <BracePart x1={x0} x2={x0 + left * sq} y={58} dir="down" color="#15803d" label="maradt: ?" labelColor={UNK} fontSize={11.5} />
      <BracePart x1={x0 + left * sq} x2={x0 + total * sq} y={58} dir="down" color="#dc2626" label={`−${gone}`} fontSize={11.5} />
    </QFig>
  );
};

/** 20-as szalag hiányzó résszel (sárga ? kockák). */
const StripMissingFig: React.FC<{ total: number; filled: number; caption?: string }> = ({ total, filled, caption }) => {
  const x0 = 15;
  const sq = 10.5;
  return (
    <QFig h={122}>
      <UnitStrip20Part
        x={x0}
        y={42}
        sqSize={sq}
        first={filled}
        unknownStart={filled}
        unknownCount={total - filled}
        firstColor="#86efac"
        firstStroke="#15803d"
      />
      <BracePart x1={x0} x2={x0 + total * sq} y={35} dir="up" color="#0f172a" label={`összesen: ${total}`} fontSize={11} />
      <BracePart x1={x0} x2={x0 + filled * sq} y={58} dir="down" color="#15803d" label={String(filled)} fontSize={11.5} />
      <BracePart x1={x0 + filled * sq} x2={x0 + total * sq} y={58} dir="down" color="#d97706" label="?" labelColor={UNK} fontSize={12.5} />
      {caption && (
        <text x="120" y="110" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#475569">
          {caption}
        </text>
      )}
    </QFig>
  );
};

/** 3 rész a 20-as szalagon: a + b + ? = 20. */
const ThreePartsFig: React.FC<{ a: number; b: number; unk: number }> = ({ a, b, unk }) => {
  const x0 = 15;
  const sq = 10.5;
  return (
    <QFig h={114}>
      <UnitStrip20Part
        x={x0}
        y={42}
        sqSize={sq}
        first={a}
        second={b}
        unknownStart={a + b}
        unknownCount={unk}
        firstColor="#cbd5e1"
        firstStroke="#475569"
        secondColor="#fde047"
        secondStroke="#a16207"
      />
      <BracePart x1={x0} x2={x0 + 20 * sq} y={35} dir="up" color="#0f172a" label="összesen: 20" fontSize={11} />
      <BracePart x1={x0} x2={x0 + a * sq} y={58} dir="down" color="#475569" label={String(a)} fontSize={11} />
      <BracePart x1={x0 + a * sq} x2={x0 + (a + b) * sq} y={58} dir="down" color="#a16207" label={String(b)} fontSize={11} />
      <BracePart x1={x0 + (a + b) * sq} x2={x0 + 20 * sq} y={58} dir="down" color="#1d4ed8" label="?" labelColor={UNK} fontSize={12} />
    </QFig>
  );
};

/** Kétlépéses szalag: a + b, majd c áthúzva. */
const TwoStepStripFig: React.FC<{ a: number; b: number; c: number }> = ({ a, b, c }) => {
  const x0 = 15;
  const sq = 10.5;
  const sum = a + b;
  const rem = sum - c;
  return (
    <QFig h={114}>
      <UnitStrip20Part x={x0} y={42} sqSize={sq} first={a} second={b} crossed={c} />
      <BracePart x1={x0} x2={x0 + a * sq} y={35} dir="up" color="#15803d" label={String(a)} fontSize={11} />
      <BracePart x1={x0 + a * sq} x2={x0 + sum * sq} y={35} dir="up" color="#1d4ed8" label={String(b)} fontSize={11} />
      <BracePart x1={x0} x2={x0 + rem * sq} y={58} dir="down" color="#0f172a" label="maradt: ?" labelColor={UNK} fontSize={11.5} />
      <BracePart x1={x0 + rem * sq} x2={x0 + sum * sq} y={58} dir="down" color="#dc2626" label={`−${c}`} fontSize={11.5} />
    </QFig>
  );
};

/** Összehasonlító két szalag (közvetlen vagy fordított). */
const CompareFig: React.FC<{
  topName: string;
  topVal: string;
  botName: string;
  botVal: string;
  diffText: string;
  topLonger: boolean;
}> = ({ topName, topVal, botName, botVal, diffText, topLonger }) => {
  const longW = 148;
  const shortW = 104;
  const x0 = 76;
  const tl = topLonger ? longW : shortW;
  const bl = topLonger ? shortW : longW;
  return (
    <QFig h={108}>
      <text x="12" y="34" fontSize="12" fontWeight="bold" fill="#0c4a6e">
        {topName}
      </text>
      <rect x={x0} y="16" width={tl} height="25" rx="5" fill="#7dd3fc" stroke="#0369a1" strokeWidth="1.8" />
      <text x={x0 + tl / 2} y="33" textAnchor="middle" fontSize="13" fontWeight="bold" fill={topVal.includes('?') ? UNK : '#0c4a6e'}>
        {topVal}
      </text>

      <text x="12" y="74" fontSize="12" fontWeight="bold" fill="#881337">
        {botName}
      </text>
      <rect x={x0} y="56" width={bl} height="25" rx="5" fill="#fda4af" stroke="#be123c" strokeWidth="1.8" />
      <text x={x0 + bl / 2} y="73" textAnchor="middle" fontSize="13" fontWeight="bold" fill={botVal.includes('?') ? UNK : '#881337'}>
        {botVal}
      </text>

      {topLonger ? (
        <rect x={x0 + shortW} y="56" width={longW - shortW} height="25" rx="5" fill="none" stroke="#a16207" strokeWidth="1.5" strokeDasharray="4 3" />
      ) : (
        <rect x={x0 + shortW} y="16" width={longW - shortW} height="25" rx="5" fill="none" stroke="#a16207" strokeWidth="1.5" strokeDasharray="4 3" />
      )}
      <text x={x0 + longW} y="98" textAnchor="end" fontSize="11" fontWeight="bold" fill="#92400e">
        {diffText}
      </text>
    </QFig>
  );
};

/** Kétlépéses összehasonlítás + összesen ? kapocs. */
const CompareTotalFig: React.FC<{ topName: string; topVal: string; botName: string; diffLabel: string }> = ({
  topName,
  topVal,
  botName,
  diffLabel,
}) => (
  <QFig h={114}>
    <text x="12" y="31" fontSize="12" fontWeight="bold" fill="#0c4a6e">
      {topName}
    </text>
    <rect x="68" y="14" width="136" height="24" rx="5" fill="#7dd3fc" stroke="#0369a1" strokeWidth="1.8" />
    <text x="136" y="31" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0c4a6e">
      {topVal}
    </text>

    <text x="12" y="67" fontSize="12" fontWeight="bold" fill="#881337">
      {botName}
    </text>
    <rect x="68" y="50" width="94" height="24" rx="5" fill="#fda4af" stroke="#be123c" strokeWidth="1.8" />
    <text x="115" y="67" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>
      ?
    </text>
    <rect x="162" y="50" width="42" height="24" rx="5" fill="none" stroke="#a16207" strokeWidth="1.5" strokeDasharray="4 3" />

    <text x="136" y="92" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#92400e">
      {diffLabel}
    </text>
    <text x="220" y="50" textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>
      ?
    </text>
    <path d="M 207 16 Q 214 16 214 25 L 214 38 Q 214 45 218 45 Q 214 45 214 52 L 214 65 Q 214 74 207 74" fill="none" stroke="#334155" strokeWidth="1.8" />
  </QFig>
);

/** Oszlopdiagram 4 oszloppal. */
const MiniBarChartFig: React.FC<{ vals: [number, number, number, number]; labels: [string, string, string, string] }> = ({
  vals,
  labels,
}) => {
  const colors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308'];
  const x0 = 36;
  const colW = 46;
  const yBot = 104;
  const unitH = 8.5;
  return (
    <QFig h={126}>
      {[0, 2, 4, 6, 8, 10].map((v) => {
        const y = yBot - v * unitH;
        return (
          <g key={v}>
            <line x1={x0} y1={y} x2={x0 + 4 * colW} y2={y} stroke="#cbd5e1" strokeWidth="1" />
            <text x={x0 - 6} y={y + 3.5} textAnchor="end" fontSize="9.5" fontWeight="bold" fill="#475569">
              {v}
            </text>
          </g>
        );
      })}
      {vals.map((v, i) => {
        const h = v * unitH;
        const x = x0 + i * colW + 8;
        return (
          <g key={labels[i]}>
            <rect x={x} y={yBot - h} width={colW - 16} height={h} rx="3" fill={colors[i]} stroke="#1e293b" strokeWidth="1" />
            <text x={x + (colW - 16) / 2} y={yBot - h - 4} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0f172a">
              {v}
            </text>
            <text x={x + (colW - 16) / 2} y={yBot + 14} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">
              {labels[i]}
            </text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Zsetonos pénztárca és 2 árcédula. */
const PurseFig: React.FC<{ money: number; p1: number; p2: number }> = ({ money, p1, p2 }) => (
  <QFig h={100}>
    <rect x="20" y="20" width="76" height="58" rx="10" fill="#86efac" stroke="#15803d" strokeWidth="2.5" />
    <path d="M 20 35 L 96 35" stroke="#15803d" strokeWidth="2" />
    <text x="58" y="62" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#14532d">
      {money} zs.
    </text>
    {[p1, p2].map((p, i) => (
      <g key={i}>
        <rect x={116 + i * 56} y="24" width="46" height="50" rx="6" fill="#ffffff" stroke="#c2410c" strokeWidth="2" />
        <text x={139 + i * 56} y="55" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#9a3412">
          {p}
        </text>
      </g>
    ))}
  </QFig>
);

/** Egyenlő két ismeretlen rész a 20-as szalagon. */
const EqualSplitStripFig: React.FC<{ known: number; rest: number }> = ({ known, rest }) => {
  const x0 = 15;
  const sq = 10.5;
  const half = rest / 2;
  return (
    <QFig h={114}>
      <UnitStrip20Part
        x={x0}
        y={42}
        sqSize={sq}
        first={known}
        unknownStart={known}
        unknownCount={rest}
        firstColor="#93c5fd"
        firstStroke="#1d4ed8"
      />
      <BracePart x1={x0} x2={x0 + 20 * sq} y={35} dir="up" color="#0f172a" label="összesen: 20" fontSize={11} />
      <BracePart x1={x0} x2={x0 + known * sq} y={58} dir="down" color="#1d4ed8" label={String(known)} fontSize={11} />
      <BracePart x1={x0 + known * sq} x2={x0 + (known + half) * sq} y={58} dir="down" color="#d97706" label="?" labelColor={UNK} fontSize={12} />
      <BracePart x1={x0 + (known + half) * sq} x2={x0 + 20 * sq} y={58} dir="down" color="#d97706" label="?" labelColor={UNK} fontSize={12} />
    </QFig>
  );
};

/** Két tálka egyenlő szétosztáshoz (osztásjel nélkül). */
const TwoBowlsFig: React.FC<{ total: number }> = ({ total }) => (
  <QFig h={104}>
    <rect x="75" y="12" width="90" height="28" rx="8" fill="#ddd6fe" stroke="#6d28d9" strokeWidth="2" />
    <text x="120" y="31" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4c1d95">
      {total} szem
    </text>
    <line x1="100" y1="40" x2="66" y2="58" stroke="#64748b" strokeWidth="2" />
    <line x1="140" y1="40" x2="174" y2="58" stroke="#64748b" strokeWidth="2" />
    <path d="M 34 60 L 98 60 Q 94 90 66 90 Q 38 90 34 60 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="66" y="80" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>
      ?
    </text>
    <path d="M 142 60 L 206 60 Q 202 90 174 90 Q 146 90 142 60 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="174" y="80" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>
      ?
    </text>
  </QFig>
);

/** Árcédulás polc 4 tárggyal. */
const PriceShelfFig: React.FC<{ items: [string, number][] }> = ({ items }) => (
  <QFig h={108}>
    {items.map(([name, price], i) => {
      const x = 12 + i * 55;
      return (
        <g key={name}>
          <rect x={x} y="16" width="50" height="72" rx="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.8" />
          <text x={x + 25} y="42" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
            {name}
          </text>
          <rect x={x + 6} y="54" width="38" height="24" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="1.4" />
          <text x={x + 25} y="71" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">
            {price} zs.
          </text>
        </g>
      );
    })}
  </QFig>
);

// ---------------------------------------------------------------------------
// 30 feladat (10 / szint) — szigorúan 0–20 között, osztás/szorzás/LaTeX nélkül
// ---------------------------------------------------------------------------
export const WORDPROBLEMS20_G2_QUESTIONS: QuizQuestion[] = [
  // === 1. SZINT ===
  {
    id: 'wp20-q1',
    level: 1,
    questionTypeBadge: 'Összesen',
    figure: <StripJoinFig a={6} b={8} />,
    question: 'Bence 6 piros és 8 sárga falevelet gyűjtött. Hány falevele van összesen?',
    options: ['14', '13', '15', '12'],
    correctAnswer: 0,
    explanation: 'A két részt összeadjuk: 6 + 8 = 6 + 4 + 4 = 14. Bencének 14 falevele van összesen.',
  },
  {
    id: 'wp20-q2',
    level: 1,
    questionTypeBadge: 'Elvétel',
    figure: <StripCrossFig total={15} gone={4} />,
    question: 'A bokron 15 veréb ült, közülük 4 elrepült. Hány veréb maradt a bokron?',
    options: ['11', '12', '10', '19'],
    correctAnswer: 0,
    explanation: 'Elrepültek, tehát kevesebben maradtak: 15 − 4 = 11. 11 veréb maradt a bokron.',
  },
  {
    id: 'wp20-q3',
    level: 1,
    questionTypeBadge: 'Hiányzó rész',
    figure: <StripMissingFig total={18} filled={10} caption="18 oldalas könyv, 10 oldal kész" />,
    question: 'Egy 18 oldalas mesekönyvből Eszter 10 oldalt már elolvasott. Hány oldal van még hátra?',
    options: ['8', '9', '7', '10'],
    correctAnswer: 0,
    explanation: 'Az egészből elvesszük a már elolvasott részt: 18 − 10 = 8. Még 8 oldal van hátra.',
  },
  {
    id: 'wp20-q4',
    level: 1,
    questionTypeBadge: 'Több',
    figure: <CompareFig topName="Soma" topVal="9" botName="Hanga" botVal="?" diffText="Hanga 5-tel több" topLonger={false} />,
    question: 'Soma 9 makkot talált. Hanga 5-tel többet talált nála. Hány makkot talált Hanga?',
    options: ['14', '4', '13', '15'],
    correctAnswer: 0,
    explanation: 'Hanga többet talált, ezért összeadunk: 9 + 5 = 9 + 1 + 4 = 14. Hanga 14 makkot talált.',
  },
  {
    id: 'wp20-q5',
    level: 1,
    questionTypeBadge: 'Kevesebb',
    figure: <CompareFig topName="Nóra" topVal="16" botName="Milán" botVal="?" diffText="Milán 7-tel kevesebb" topLonger={true} />,
    question: 'Nórának 16 színes ceruzája van. Milánnak 7-tel kevesebb van. Hány ceruzája van Milánnak?',
    options: ['9', '8', '10', '11'],
    correctAnswer: 0,
    explanation: 'Milánnak kevesebb van, ezért kivonunk: 16 − 7 = 16 − 6 − 1 = 9. Milánnak 9 ceruzája van.',
  },
  {
    id: 'wp20-q6',
    level: 1,
    questionTypeBadge: 'Terv',
    question: '„Sára 12 diót tört fel, aztán még 5-öt.” Melyik nyitott mondat adja meg, hány diót tört fel összesen?',
    options: ['12 + 5 = □', '12 − 5 = □', '12 − □ = 5', '5 + □ = 12'],
    correctAnswer: 0,
    explanation: 'A két adagot egyesítjük, tehát összeadunk: 12 + 5 = □.',
  },
  {
    id: 'wp20-q7',
    level: 1,
    questionTypeBadge: 'Pótlás',
    figure: <StripMissingFig total={20} filled={13} caption="20 fős busz, 13 gyerek ül" />,
    question: 'A 20 fős kirándulóbuszon már 13 gyerek ül. Hány üres hely van még?',
    options: ['7', '8', '6', '13'],
    correctAnswer: 0,
    explanation: '13-hoz mennyit kell adni, hogy 20 legyen? 20 − 13 = 7. Még 7 üres hely van.',
  },
  {
    id: 'wp20-q8',
    level: 1,
    questionTypeBadge: 'Összesen',
    question: 'A polcon 7 mesekönyv és 9 képeskönyv áll. Hány könyv van a polcon összesen?',
    options: ['16', '15', '17', '14'],
    correctAnswer: 0,
    explanation: 'Összeadjuk a kétféle könyvet: 7 + 9 = 7 + 3 + 6 = 16. 16 könyv van a polcon.',
  },
  {
    id: 'wp20-q9',
    level: 1,
    questionTypeBadge: 'Elvétel',
    figure: <StripCrossFig total={14} gone={6} />,
    question: 'A tálban 14 szilva volt. Délután megettünk belőle 6-ot. Hány szilva maradt a tálban?',
    options: ['8', '9', '7', '20'],
    correctAnswer: 0,
    explanation: 'Kivonunk: 14 − 6 = 14 − 4 − 2 = 8. 8 szilva maradt a tálban.',
  },
  {
    id: 'wp20-q10',
    level: 1,
    questionTypeBadge: 'Különbség',
    question: 'Vince 8 gólt lőtt a meccsen, Marci pedig 11-et. Mennyivel több gólt lőtt Marci, mint Vince?',
    options: ['3', '4', '2', '19'],
    correctAnswer: 0,
    explanation: 'A különbséget kivonással kapjuk meg: 11 − 8 = 3. Marci 3 góllal többet lőtt.',
  },

  // === 2. SZINT ===
  {
    id: 'wp20-q11',
    level: 2,
    questionTypeBadge: 'Csapda: többet, mint',
    figure: <CompareFig topName="Flóra" topVal="14" botName="Lotti" botVal="?" diffText="Flóra 5-tel több" topLonger={true} />,
    question: 'Flóra 14 kagylót gyűjtött, 5-tel többet, mint Lotti. Hány kagylót gyűjtött Lotti?',
    options: ['9', '19', '10', '8'],
    correctAnswer: 0,
    explanation: 'Vigyázz! Flóra gyűjtött többet, ezért Lotti KEVESEBBET gyűjtött: 14 − 5 = 9. Ellenőrzés: 9 + 5 = 14.',
  },
  {
    id: 'wp20-q12',
    level: 2,
    questionTypeBadge: 'Csapda: kevesebbet, mint',
    figure: <CompareFig topName="Matyi" topVal="7" botName="Vince" botVal="?" diffText="Matyi 6-tal kevesebb" topLonger={false} />,
    question: 'Matyi 7 mezőt lépett előre a társasban, 6-tal kevesebbet, mint Vince. Hány mezőt lépett Vince?',
    options: ['13', '1', '14', '12'],
    correctAnswer: 0,
    explanation: 'Matyi lépett kevesebbet, tehát Vince TÖBBET lépett: 7 + 6 = 13. Ellenőrzés: 13 − 6 = 7.',
  },
  {
    id: 'wp20-q13',
    level: 2,
    questionTypeBadge: 'Csapda: idősebb',
    question: 'A sakkcsoportban a legidősebb gyerek 13 éves. Ő 6 évvel idősebb a legfiatalabbnál. Hány éves a legfiatalabb gyerek?',
    options: ['7', '19', '8', '6'],
    correctAnswer: 0,
    explanation: 'A legfiatalabb gyerek fiatalabb, mint a 13 éves, tehát kivonunk: 13 − 6 = 7 éves.',
  },
  {
    id: 'wp20-q14',
    level: 2,
    questionTypeBadge: 'Oszlopdiagram',
    figure: <MiniBarChartFig vals={[6, 9, 4, 7]} labels={['Piros', 'Kék', 'Zöld', 'Sárga']} />,
    question: 'Nézd meg a gyöngyök oszlopdiagramját! Hány piros és sárga gyöngy van együtt?',
    options: ['13', '12', '14', '11'],
    correctAnswer: 0,
    explanation: 'A diagramból leolvassuk: piros = 6, sárga = 7. Együtt: 6 + 7 = 13 gyöngy.',
  },
  {
    id: 'wp20-q15',
    level: 2,
    questionTypeBadge: 'Oszlopdiagram',
    figure: <MiniBarChartFig vals={[9, 6, 4, 7]} labels={['Foci', 'Úszás', 'Futás', 'Torna']} />,
    question: 'A 2. osztályosok megszavazták a kedvenc sportjukat. Mennyivel többen választották a focit, mint a futást?',
    options: ['5', '4', '6', '13'],
    correctAnswer: 0,
    explanation: 'Foci: 9 fő, futás: 4 fő. A különbség: 9 − 4 = 5 fővel többen.',
  },
  {
    id: 'wp20-q16',
    level: 2,
    questionTypeBadge: 'Három rész',
    figure: <ThreePartsFig a={7} b={5} unk={8} />,
    question: 'Gréta 20 papírcsillagot hajtogatott: 7 ezüstöt, 5 aranyat, a többi kék. Hány kék csillagot hajtogatott?',
    options: ['8', '7', '9', '12'],
    correctAnswer: 0,
    explanation: 'Az ezüst és az arany együtt 7 + 5 = 12 csillag. A maradék kék: 20 − 12 = 8 csillag.',
  },
  {
    id: 'wp20-q17',
    level: 2,
    questionTypeBadge: 'Csapda: többen, mint',
    figure: <CompareFig topName="Fiúk" topVal="12" botName="Lányok" botVal="?" diffText="A fiúk 4-gyel többen" topLonger={true} />,
    question: 'A bábszínházba 12 fiú jött el. A fiúk 4-gyel többen voltak, mint a lányok. Hány lány volt ott?',
    options: ['8', '16', '9', '7'],
    correctAnswer: 0,
    explanation: 'A fiúk voltak többen, ezért lányból kevesebb volt: 12 − 4 = 8 lány.',
  },
  {
    id: 'wp20-q18',
    level: 2,
    questionTypeBadge: 'Műveleti jel',
    question: 'Melyik két műveleti jel hiányzik sorban?   9 □ 6 △ 4 = 11',
    options: ['+ és −', '− és +', '+ és +', '− és −'],
    correctAnswer: 0,
    explanation: 'Ellenőrizzük: 9 + 6 = 15, és 15 − 4 = 11. Tehát az első jel +, a második −.',
  },
  {
    id: 'wp20-q19',
    level: 2,
    questionTypeBadge: 'Visszafelé',
    question: 'Barnabás néhány matricát kapott, majd 5-öt elajándékozott. Így 9 matricája maradt. Hány matricát kapott?',
    options: ['14', '4', '13', '15'],
    correctAnswer: 0,
    explanation: 'Visszafelé számolunk: mielőtt elajándékozott 5-öt, ennyivel több volt: 9 + 5 = 14 matrica.',
  },
  {
    id: 'wp20-q20',
    level: 2,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'Gondoltam egy számra. Nálam 7-tel nagyobb a 15. Melyik számra gondoltam?',
    options: ['8', '7', '9', '12'],
    correctAnswer: 0,
    explanation: 'Ha a 15 a nagyobb 7-tel, akkor a gondolt szám kisebb 7-tel: 15 − 7 = 8. Ellenőrzés: 8 + 7 = 15.',
  },

  // === 3. SZINT ===
  {
    id: 'wp20-q21',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <TwoStepStripFig a={6} b={7} c={3} />,
    question: 'Bence 6, Soma 7 homokvárat épített a homokozóban, de 3 összedőlt. Hány vár áll még?',
    options: ['10', '13', '9', '11'],
    correctAnswer: 0,
    explanation: '1. lépés: 6 + 7 = 13 vár épült. 2. lépés: 13 − 3 = 10 vár áll még.',
  },
  {
    id: 'wp20-q22',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <CompareTotalFig topName="Sára" topVal="11" botName="Nóra" diffLabel="Nóra 4-gyel kevesebb" />,
    question: 'Sára 11 szirmot ragasztott a füzetbe, Nóra 4-gyel kevesebbet. Hány szirmot ragasztottak fel összesen?',
    options: ['18', '7', '15', '19'],
    correctAnswer: 0,
    explanation: '1. lépés: Nóra szirmai: 11 − 4 = 7. 2. lépés: összesen: 11 + 7 = 18 szirom.',
  },
  {
    id: 'wp20-q23',
    level: 3,
    questionTypeBadge: 'Két lépés csapda',
    figure: <CompareTotalFig topName="Milán" topVal="12" botName="Vince" diffLabel="Milán 5-tel több" />,
    question: 'Milán 12 gólt lőtt, 5-tel többet, mint Vince. Hány gólt lőttek együtt?',
    options: ['19', '7', '17', '20'],
    correctAnswer: 0,
    explanation: '1. lépés: Vince kevesebbet lőtt, tehát 12 − 5 = 7. 2. lépés: együtt 12 + 7 = 19 gólt lőttek.',
  },
  {
    id: 'wp20-q24',
    level: 3,
    questionTypeBadge: 'Zsetonok',
    figure: <PurseFig money={20} p1={7} p2={8} />,
    question: 'Eszternek 20 zsetonja van a vásárban. Vett egy 7 zsetonos könyvjelzőt és egy 8 zsetonos matricát. Hány zsetonja maradt?',
    options: ['5 zseton', '15 zseton', '6 zseton', '4 zseton'],
    correctAnswer: 0,
    explanation: 'Elköltött 7 + 8 = 15 zsetont. Maradt: 20 − 15 = 5 zseton.',
  },
  {
    id: 'wp20-q25',
    level: 3,
    questionTypeBadge: 'Egyenlő két rész',
    figure: <EqualSplitStripFig known={6} rest={14} />,
    question: 'A játszósarokban 20 játék van: 6 kisautó, a többi egyenlően elosztva plüss és építőkocka. Hány építőkocka van?',
    options: ['7', '14', '6', '8'],
    correctAnswer: 0,
    explanation: '1. lépés: 20 − 6 = 14 játék jut a plüssökre és építőkockákra. 2. lépés: két egyenlő rész: 7 + 7 = 14, tehát 7 építőkocka van.',
  },
  {
    id: 'wp20-q26',
    level: 3,
    questionTypeBadge: 'Próbálgatás',
    question: 'A dobozban 15 golyó van: 6 piros, a többi kék és zöld. A kékből 1-gyel több van, mint a zöldből. Hány kék golyó van?',
    options: ['5', '4', '6', '9'],
    correctAnswer: 0,
    explanation: 'A kék és a zöld együtt 15 − 6 = 9 golyó. Két szomszédos szám összege 9, tehát 5 + 4 = 9. Így 5 kék és 4 zöld van.',
  },
  {
    id: 'wp20-q27',
    level: 3,
    questionTypeBadge: 'Összeválogatás',
    figure: (
      <PriceShelfFig
        items={[
          ['Labda', 9],
          ['Füzet', 8],
          ['Ceruza', 6],
          ['Radír', 4],
        ]}
      />
    ),
    question: 'Hanga pontosan 19 zsetonért három különböző dolgot vett a polcról. Melyik hármat vehette meg?',
    options: ['Labda, ceruza, radír', 'Labda, füzet, radír', 'Füzet, ceruza, radír', 'Labda, füzet, ceruza'],
    correctAnswer: 0,
    explanation: 'Számoljuk össze: 9 + 6 + 4 = 19 zseton! A többi hármas összege vagy kevesebb (8 + 6 + 4 = 18), vagy több lenne 20-nál.',
  },
  {
    id: 'wp20-q28',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'A buszon 14 utas ült. Az első megállóban 5 leszállt, a másodikban 8 felszállt. Hány utas utazik tovább?',
    options: ['17', '11', '19', '16'],
    correctAnswer: 0,
    explanation: '1. lépés: 14 − 5 = 9 utas maradt. 2. lépés: 9 + 8 = 17 utas utazik tovább.',
  },
  {
    id: 'wp20-q29',
    level: 3,
    questionTypeBadge: 'Egyenlő két rész',
    figure: <TwoBowlsFig total={16} />,
    question: 'Rézi 16 szem szőlőt két tálkába tesz úgy, hogy mindkettőbe ugyanannyi jusson. Hány szem kerül egy tálkába?',
    options: ['8', '6', '9', '7'],
    correctAnswer: 0,
    explanation: 'Próbáljuk párosítani vagy két egyforma részre bontani: 8 + 8 = 16. Tehát 8 szem kerül egy tálkába.',
  },
  {
    id: 'wp20-q30',
    level: 3,
    questionTypeBadge: 'Terv',
    question: '„A dobozban 19 kréta volt. Barnabás kivett 6-ot, majd Eszter is kivett 5-öt.” Melyik tervvel kapod meg helyesen, hány kréta maradt?',
    options: [
      '19 − 6 = 13,  13 − 5 = 8',
      '19 − 6 = 13,  13 + 5 = 18',
      '19 + 6 = 20,  20 − 5 = 15',
      '6 − 5 = 1,  19 − 1 = 18',
    ],
    correctAnswer: 0,
    explanation: 'Mindketten kivettek a dobozból, ezért kétszer vonunk ki: 19 − 6 = 13, majd 13 − 5 = 8 kréta maradt.',
  },
];

export const WordProblems20G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId="g2-c20-szoveges-quiz"
      subtopicId="szoveges-feladatok"
      title="6. Szöveges feladatok – Kvíz"
      subtitle="30 feladat 3 szinten: szalagmodell, több-kevesebb csapda, diagram, kétlépéses feladatok 20-ig."
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG • KVÍZ"
      questions={WORDPROBLEMS20_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Az 5 lépés',
          items: [
            '1. Adatok: mit tudunk?',
            '2. Kérdés: mit kérdeznek?',
            '3. Terv: nyitott mondat (□)',
            '4. Számolás és ellenőrzés',
            '5. Válasz mondatban!',
          ],
        },
        {
          title: 'Melyik művelet?',
          items: [
            'Összesen, együtt, kaptam még: +',
            'Maradt, elrepült, hiányzik még: −',
            'Egyenlő két rész: □ + □ = egész',
            'Két lépésnél figyelj a sorrendre!',
          ],
        },
        {
          title: 'Vigyázz a csapdára!',
          items: [
            'Előbb kérdezd: Kinek van TÖBB?',
            '„Flóra 14, 5-tel több, mint Lotti” → 14 − 5 = 9',
            '„Matyi 7, 6-tal kevesebb, mint Vince” → 7 + 6 = 13',
            'Ellenőrzéssel mindig visszapróbálhatod!',
          ],
        },
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <WordProblems20G2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <WordProblems20G2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default WordProblems20G2Quiz;

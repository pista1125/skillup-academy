import React from 'react';
import { SeqFrame, SeqBarChart, SText, S_BLUE, S_RED, S_GREEN, S_PURPLE, S_AMBER, S_INK } from '../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: a fejezet térképe
export const ChapterMapSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const box = (x: number, y: number, w: number, t1: string, t2: string, c: string) => (
    <g>
      <rect x={x} y={y} width={w} height={46} rx={10} fill="#fff" stroke={c} strokeWidth="1.8" />
      <SText x={x + w / 2} y={y + 19} t={t1} s={12} c={c} b />
      <SText x={x + w / 2} y={y + 36} t={t2} s={10} c="#475569" />
    </g>
  );
  const ln = (x1: number, y1: number, x2: number, y2: number) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth="1.6" />;
  return (
    <SeqFrame title="II. Sorozatok – a fejezet felépítése" className={className}>
      {ln(240, 90, 120, 120)}
      {ln(240, 90, 360, 120)}
      {ln(120, 166, 120, 186)}
      {ln(360, 166, 360, 186)}
      {ln(360, 232, 360, 246)}
      {ln(120, 232, 240, 256)}
      {box(150, 44, 180, 'Számsorozat', 'n ↦ aₙ, n ∈ ℤ⁺ (1–2. lecke)', S_INK)}
      {box(30, 120, 180, 'Számtani sorozat', 'aₙ = a₁ + (n − 1)d', S_BLUE)}
      {box(270, 120, 180, 'Mértani sorozat', 'aₙ = a₁ · qⁿ⁻¹', S_RED)}
      {box(30, 186, 180, 'Sₙ = (a₁ + aₙ)/2 · n', '4. lecke', S_BLUE)}
      {box(270, 186, 180, 'Sₙ = a₁(qⁿ − 1)/(q − 1)', '6. lecke', S_RED)}
      {box(150, 246, 180, 'Pénzügyek', 'kamatos kamat, járadék, hitel', S_GREEN)}
      {ln(330, 256, 360, 232)}
    </SeqFrame>
  );
};

// 2. ábra: lépcső – 1 vagy 2 fokot lépünk
export const StairsFibonacciSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const vals = [1, 2, 3, 5, 8, 13, 21, 34];
  return (
    <SeqFrame title="Lépcső: hányféleképpen jutunk az n-edik fokra?" className={className} h={280}>
      {vals.map((v, i) => (
        <g key={i}>
          <rect x={40 + i * 40} y={240 - (i + 1) * 22} width={40} height={(i + 1) * 22} fill={i % 2 ? '#e0e7ff' : '#c7d2fe'} stroke={S_BLUE} />
          <SText x={60 + i * 40} y={232 - (i + 1) * 22} t={String(v)} s={12} c={S_RED} b />
          <SText x={60 + i * 40} y={256} t={`${i + 1}.`} s={10} c="#475569" />
        </g>
      ))}
      <SText x={390} y={70} t="aₙ = aₙ₋₁ + aₙ₋₂" s={13} c={S_INK} b />
      <SText x={390} y={90} t="(utolsó lépés 1 vagy 2)" s={10.5} c="#475569" />
      <SText x={390} y={116} t="a₁ = 1, a₂ = 2" s={11.5} c={S_BLUE} />
      <SText x={390} y={136} t="a₈ = 34" s={12} c={S_RED} b />
    </SeqFrame>
  );
};

// 3. ábra: Betyár patkószegei
export const HorseshoeNailsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <SeqFrame title="Betyár: 32 patkószeg, mindegyik kétszer annyiba kerül" className={className} h={260}>
    {[0, 1, 2, 3].map((h) => (
      <g key={h} transform={`translate(${50 + h * 100} 70)`}>
        <path d="M 10 70 L 10 30 A 30 30 0 0 1 70 30 L 70 70" fill="none" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
        {Array.from({ length: 8 }, (_, i) => {
          const t = Math.PI + (i / 7) * Math.PI;
          return <circle key={i} cx={40 + 30 * Math.cos(t) * (i === 0 || i === 7 ? 1 : 1)} cy={30 + 30 * Math.sin(t) + (i === 0 || i === 7 ? 25 : 0)} r={2.8} fill={S_AMBER} />;
        })}
        <SText x={40} y={98} t={`${h * 8 + 1}–${h * 8 + 8}. szeg`} s={10} />
      </g>
    ))}
    <SText x={240} y={196} t="1 + 2 + 4 + … + 2³¹ = 2³² − 1 = 4 294 967 295 fillér" s={12} c={S_RED} b />
    <SText x={240} y={220} t="≈ 42 949 673 Ft" s={12.5} c={S_RED} b />
  </SeqFrame>
);

// 4. ábra: a gazda hagyatéka – 7 fiú, mindegyik a maradék 20%-át kapja
export const InheritanceSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const parts = Array.from({ length: 7 }, (_, k) => 0.2 * 0.8 ** k);
  const rest = 0.8 ** 7;
  let acc = 0;
  const W = 420;
  const cols = ['#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];
  return (
    <SeqFrame title="7 fiú: mindegyik a megmaradt vagyon 20%-át kapja" className={className} h={240}>
      {parts.map((p, i) => {
        const x = 30 + acc * W;
        acc += p;
        return (
          <g key={i}>
            <rect x={x} y={80} width={p * W} height={50} fill={cols[i]} stroke="#fff" />
            <SText x={x + (p * W) / 2} y={110} t={`${i + 1}.`} s={10.5} c={i < 4 ? '#fff' : S_INK} b />
            <SText x={x + (p * W) / 2} y={148} t={`${(p * 100).toFixed(1).replace('.', ',')}%`} s={9} c={S_INK} />
          </g>
        );
      })}
      <rect x={30 + acc * W} y={80} width={rest * W} height={50} fill={S_GREEN} opacity={0.75} />
      <SText x={30 + acc * W + (rest * W) / 2} y={110} t="jótékony cél" s={10.5} c="#fff" b />
      <SText x={30 + acc * W + (rest * W) / 2} y={148} t="≈ 21%" s={9.5} c={S_INK} b />
      <SText x={240} y={186} t="a k-adik fiú része: 0,2 · 0,8ᵏ⁻¹ – mértani sorozat (q = 0,8)" s={11.5} c={S_INK} />
      <SText x={240} y={208} t="középső (4.): 10,24% · legkisebb (7.): ≈ 5,24% · marad: 0,8⁷ ≈ 20,97%" s={11} c={S_RED} b />
    </SeqFrame>
  );
};

// 5. ábra: Péter két fizetési ajánlata (érettségi 2016)
export const SalaryOffersSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const months = Array.from({ length: 48 }, (_, i) => i);
  const I = months.map((i) => (200000 + 5000 * i) / 1000);
  const II = months.map((i) => (200000 * 1.02 ** i) / 1000);
  return (
    <SeqFrame title="Péter: +5000 Ft/hó (I.) vagy +2%/hó (II.), 4 éven át" className={className}>
      <SeqBarChart values={I} line={II} x={60} y={50} w={380} h={190} color={S_BLUE} lineColor={S_RED} labelEvery={12} maxV={520} />
      <SText x={54} y={56} t="ezer Ft" s={9.5} a="end" />
      <SText x={250} y={272} t="hónap" s={10.5} c="#475569" />
      <SText x={80} y={72} t="I.: Σ = 48 · (400 000 + 47 · 5000)/2 = 15 240 000 Ft" s={10.5} c={S_BLUE} a="start" b />
      <SText x={80} y={90} t="II.: Σ = 200 000 · (1,02⁴⁸ − 1)/0,02 ≈ 15 870 704 Ft" s={10.5} c={S_RED} a="start" b />
      <SText x={80} y={110} t="a II. ajánlat a jobb" s={11} c={S_INK} a="start" />
    </SeqFrame>
  );
};

// 6. ábra: Fibonacci nyulai
export const RabbitsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const months = ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.'];
  const f = [1, 1, 2, 3, 5, 8, 13];
  return (
    <SeqFrame title="Fibonacci nyulai: fₙ = fₙ₋₂ + fₙ₋₁" className={className}>
      {months.map((m, i) => (
        <g key={m}>
          <SText x={60} y={62 + i * 32} t={m} s={11} a="end" />
          {Array.from({ length: f[i] }, (_, j) => (
            <circle key={j} cx={80 + j * 22} cy={58 + i * 32} r={8} fill={j < (i >= 2 ? f[i - 1] : f[i]) ? S_PURPLE : S_AMBER} opacity={0.85} />
          ))}
          <SText x={380} y={62 + i * 32} t={`f${['₁', '₂', '₃', '₄', '₅', '₆', '₇'][i]} = ${f[i]}`} s={11.5} c={S_INK} a="start" b />
        </g>
      ))}
      <SText x={240} y={286} t="lila: már meglévő pár · sárga: újszülött pár · 1 év után f₁₃ = 233 pár" s={10.5} c={S_RED} />
    </SeqFrame>
  );
};

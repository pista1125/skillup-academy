import React from 'react';
import { SeqFrame, SeqBarChart, SText, S_BLUE, S_RED, S_GREEN, S_PURPLE, S_AMBER, S_INK } from '../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: egyszerű és kamatos kamatozás összehasonlítása (1 000 000 Ft, évi 10%)
export const SimpleVsCompoundSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const simple = Array.from({ length: 10 }, (_, i) => 1 + 0.1 * (i + 1));
  const comp = Array.from({ length: 10 }, (_, i) => 1.1 ** (i + 1));
  return (
    <SeqFrame title="1 millió Ft évi 10%-kal: egyszerű vs. kamatos kamat" className={className}>
      <SeqBarChart values={simple} line={comp} x={60} y={50} w={380} h={190} maxV={2.7} color={S_BLUE} lineColor={S_RED} />
      <SText x={54} y={56} t="millió Ft" s={9.5} a="end" />
      <SText x={250} y={272} t="eltelt évek (n)" s={10.5} c="#475569" />
      <SText x={80} y={70} t="kék: egyszerű kamat – K₀(1 + n · p/100), lineáris" s={11} c={S_BLUE} a="start" b />
      <SText x={80} y={88} t="piros: kamatos kamat – K₀ · qⁿ, mértani sorozat" s={11} c={S_RED} a="start" b />
      <SText x={80} y={108} t="10 év után: 2 000 000 Ft vs. ≈ 2 593 742 Ft" s={11} c={S_INK} a="start" />
    </SeqFrame>
  );
};

// 2. ábra: negyedéves jóváírás – évi 8%-os kamatláb, 8,24%-os hozam
export const QuarterlyCompoundingSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X = (i: number) => 60 + i * 95;
  return (
    <SeqFrame title="Évi 8%, negyedéves jóváírás: 4 × 2%" className={className} h={240}>
      <line x1={X(0)} y1={150} x2={X(4)} y2={150} stroke={S_INK} strokeWidth="2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <line x1={X(i)} y1={142} x2={X(i)} y2={158} stroke={S_INK} strokeWidth="2" />
          <SText x={X(i)} y={176} t={i === 0 ? 'jan. 1.' : `${i}. negyedév vége`} s={10} c="#475569" />
          <SText x={X(i)} y={128} t={i === 0 ? '100' : (100 * 1.02 ** i).toFixed(2).replace('.', ',')} s={11.5} c={i === 4 ? S_RED : S_BLUE} b />
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <g key={`a${i}`}>
          <path d={`M ${X(i) + 8} 108 Q ${X(i) + 47} 80 ${X(i + 1) - 8} 108`} fill="none" stroke={S_GREEN} strokeWidth="1.6" />
          <SText x={X(i) + 47} y={80} t="· 1,02" s={11} c={S_GREEN} b />
        </g>
      ))}
      <SText x={240} y={56} t="8% : 4 = 2% negyedévente, kamatos kamattal" s={12} c={S_INK} />
      <SText x={240} y={212} t="1,02⁴ ≈ 1,0824 ⇒ a valódi éves növekedés 8,24% (> 8%)" s={12} c={S_RED} b />
    </SeqFrame>
  );
};

// 3. ábra: Dalma gyűjtőszámlája – 24 havi befizetés, mindegyik eltérő számú hónapig kamatozik
export const SavingsTimelineSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    { lbl: '1. befizetés', k: 24 },
    { lbl: '2. befizetés', k: 23 },
    { lbl: '3. befizetés', k: 22 },
    { lbl: '24. befizetés', k: 1 }
  ];
  const X = (m: number) => 140 + m * 13;
  return (
    <SeqFrame title="Gyűjtőjáradék: 20 000 Ft minden hónap elején, havi 0,5%" className={className} h={280}>
      {rows.map((r, i) => {
        const y = 60 + i * 40 + (i === 3 ? 20 : 0);
        const start = 24 - r.k;
        return (
          <g key={i}>
            <SText x={130} y={y + 5} t={r.lbl} s={11} a="end" />
            <rect x={X(start)} y={y - 7} width={r.k * 13} height={14} rx={4} fill={i === 3 ? S_AMBER : S_BLUE} opacity={0.75} />
            <circle cx={X(start)} cy={y} r={4.5} fill={S_RED} />
            <SText x={X(24) + 8} y={y + 4} t={`20 000 · 1,005${['²⁴', '²³', '²²', ''][i]}`} s={10.5} c={S_INK} a="start" />
          </g>
        );
      })}
      <SText x={X(12)} y={186} t="⋮" s={16} c="#475569" />
      <line x1={X(0)} y1={230} x2={X(24)} y2={230} stroke={S_INK} strokeWidth="1.5" />
      {[0, 6, 12, 18, 24].map((m) => (
        <g key={m}>
          <line x1={X(m)} y1={225} x2={X(m)} y2={235} stroke={S_INK} />
          <SText x={X(m)} y={248} t={`${m}. hó`} s={9.5} c="#475569" />
        </g>
      ))}
      <SText x={240} y={268} t="S₂₄ = 20 000 · 1,005 · (1,005²⁴ − 1)/(1,005 − 1) ≈ 511 182 Ft" s={11.5} c={S_RED} b />
    </SeqFrame>
  );
};

// 4. ábra: az új autó értékcsökkenése (érettségi 2022)
export const CarDepreciationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const months = Array.from({ length: 13 }, (_, i) => i * 6);
  const X = (m: number) => 60 + m * 5.2;
  const Y = (v: number) => 250 - v * 32;
  const lin = (m: number) => 6 - 0.05 * m;
  const exp = (m: number) => 6 * 0.99 ** m;
  return (
    <SeqFrame title="6 millió Ft-os új autó értéke: lineáris és exponenciális modell" className={className}>
      <line x1={60} y1={250} x2={445} y2={250} stroke="#64748b" />
      <line x1={60} y1={250} x2={60} y2={50} stroke="#64748b" />
      {[1, 2, 3, 4, 5, 6].map((v) => (
        <g key={v}>
          <line x1={56} y1={Y(v)} x2={445} y2={Y(v)} stroke="#e2e8f0" />
          <SText x={52} y={Y(v) + 4} t={String(v)} s={9.5} a="end" />
        </g>
      ))}
      <line x1={X(60)} y1={Y(3)} x2={X(60)} y2={250} stroke={S_PURPLE} strokeDasharray="4 4" />
      <line x1={60} y1={Y(3)} x2={445} y2={Y(3)} stroke={S_PURPLE} strokeDasharray="4 4" />
      <polyline points={months.map((m) => `${X(m)},${Y(lin(m))}`).join(' ')} fill="none" stroke={S_BLUE} strokeWidth="2.4" />
      <polyline points={months.map((m) => `${X(m)},${Y(exp(m))}`).join(' ')} fill="none" stroke={S_RED} strokeWidth="2.4" />
      {months.map((m) => (
        <SText key={m} x={X(m)} y={264} t={String(m)} s={9} c="#475569" />
      ))}
      <SText x={250} y={282} t="eltelt hónapok" s={10.5} c="#475569" />
      <SText x={52} y={44} t="millió Ft" s={9.5} a="start" />
      <SText x={300} y={70} t="kék: havonta −50 000 Ft (5 év alatt felére)" s={10.5} c={S_BLUE} a="start" b />
      <SText x={300} y={86} t="piros: havonta −1% (0,99ⁿ)" s={10.5} c={S_RED} a="start" b />
      <SText x={300} y={108} t="24 hó: ≈ 4,71 millió Ft (−21,4%)" s={10.5} c={S_INK} a="start" />
      <SText x={300} y={124} t="felére: ≈ 69 hónap alatt" s={10.5} c={S_INK} a="start" />
    </SeqFrame>
  );
};

// 5. ábra: Ferenc két szakaszos gyűjtőszámlája
export const TwoPhaseSavingsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const vals = [214000, 442980, 809848.2, 1209734.54];
  return (
    <SeqFrame title="Ferenc gyűjtőszámlája: 2 év 7%, utána 2 év 9%" className={className}>
      <SeqBarChart values={vals.map((v) => v / 1e6)} x={80} y={50} w={340} h={190} highlight={[2, 3]} highlightColor={S_GREEN} showValues valueDigits={3} maxV={2.2} />
      <SText x={250} y={272} t="év vége (millió Ft)" s={10.5} c="#475569" />
      <SText x={110} y={66} t="1–2. év eleje: 200 000 Ft, 7%" s={10.5} c={S_BLUE} a="start" b />
      <SText x={110} y={82} t="3–4. év eleje: 300 000 Ft, 9%" s={10.5} c={S_GREEN} a="start" b />
      <SText x={110} y={100} t="3. év: (442 980 + 300 000) · 1,09 ≈ 809 848 Ft" s={10} c={S_INK} a="start" />
      <SText x={110} y={116} t="4. év: (809 848 + 300 000) · 1,09 ≈ 1 209 735 Ft" s={10} c={S_INK} a="start" />
    </SeqFrame>
  );
};

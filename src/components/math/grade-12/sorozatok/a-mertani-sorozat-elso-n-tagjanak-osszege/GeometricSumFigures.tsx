import React from 'react';
import { SeqFrame, SeqBarChart, SText, S_BLUE, S_RED, S_GREEN, S_PURPLE, S_AMBER, S_INK } from './seqKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const EPI = Array.from({ length: 20 }, (_, i) => 600 * 0.9 ** i);

// 1. ábra: a járvány csökkenő fázisa – napi új megbetegedések (a1 = 600, q = 0,9)
export const EpidemicBarsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <SeqFrame title="Napi új megbetegedések: a₁ = 600, q = 0,9" className={className}>
    <SeqBarChart values={EPI} x={50} y={50} w={400} h={190} color={S_BLUE} highlight={[0, 19]} labelEvery={5} />
    <SText x={44} y={56} t="600" s={10} a="end" />
    <SText x={250} y={272} t="nap (n)" s={10.5} c="#475569" />
    <SText x={430} y={210} t="a₂₀ ≈ 81" s={10.5} c={S_AMBER} a="end" />
    <SText x={300} y={80} t="S₂₀ = 600 · (0,9²⁰ − 1) / (0,9 − 1) ≈ 5271" s={12} c={S_RED} b />
    <SText x={300} y={98} t="(minden nap az előző nap 90%-a)" s={10.5} c="#475569" />
  </SeqFrame>
);

// 2. ábra: az összegképlet levezetése – Sn és q·Sn tagjai egymás alatt, eltolva
export const SumDerivationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const top = ['a₁', 'a₁q', 'a₁q²', '…', 'a₁qⁿ⁻¹', ''];
  const bot = ['', 'a₁q', 'a₁q²', '…', 'a₁qⁿ⁻¹', 'a₁qⁿ'];
  const X = (i: number) => 120 + i * 62;
  return (
    <SeqFrame title="Vonjuk ki q · Sₙ-ből Sₙ-t: a közbülső tagok kiesnek" className={className} h={260}>
      <SText x={70} y={82} t="Sₙ =" s={14} b a="end" />
      <SText x={70} y={142} t="q · Sₙ =" s={14} b a="end" />
      {top.map((t, i) =>
        t ? (
          <g key={`t${i}`}>
            <rect x={X(i) - 27} y={62} width={54} height={30} rx={8} fill={i === 0 ? '#fee2e2' : '#e0e7ff'} stroke={i === 0 ? S_RED : S_BLUE} />
            <SText x={X(i)} y={82} t={t} s={12.5} c={i === 0 ? S_RED : S_INK} b={i === 0} />
          </g>
        ) : null
      )}
      {bot.map((t, i) =>
        t ? (
          <g key={`b${i}`}>
            <rect x={X(i) - 27} y={122} width={54} height={30} rx={8} fill={i === 5 ? '#dcfce7' : '#e0e7ff'} stroke={i === 5 ? S_GREEN : S_BLUE} />
            <SText x={X(i)} y={142} t={t} s={12.5} c={i === 5 ? S_GREEN : S_INK} b={i === 5} />
          </g>
        ) : null
      )}
      {[1, 2, 4].map((i) => (
        <line key={i} x1={X(i) - 22} y1={150} x2={X(i) + 22} y2={64} stroke={S_PURPLE} strokeWidth="1.6" opacity={0.7} />
      ))}
      <SText x={240} y={190} t="q · Sₙ − Sₙ = a₁qⁿ − a₁  ⇒  Sₙ(q − 1) = a₁(qⁿ − 1)" s={13} c={S_INK} b />
      <SText x={240} y={220} t="q ≠ 1 esetén:  Sₙ = a₁ · (qⁿ − 1) / (q − 1);   q = 1 esetén: Sₙ = n · a₁" s={12} c={S_RED} />
    </SeqFrame>
  );
};

// 3. ábra: Sissa ibn Dahir sakktáblája
export const ChessboardWheatSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 26;
  const ox = 30;
  const oy = 48;
  const labels = ['1', '2', '4', '8', '16', '32', '64', '128'];
  return (
    <SeqFrame title="Búzaszemek a sakktáblán: 1 + 2 + 4 + … + 2⁶³" className={className} h={290}>
      {Array.from({ length: 64 }, (_, k) => {
        const r = Math.floor(k / 8);
        const c = k % 8;
        return (
          <rect
            key={k}
            x={ox + c * s}
            y={oy + (7 - r) * s}
            width={s}
            height={s}
            fill={(r + c) % 2 === 0 ? '#78350f' : '#fde68a'}
            opacity={0.85}
          />
        );
      })}
      {labels.map((t, c) => (
        <SText key={t} x={ox + c * s + s / 2} y={oy + 7 * s + 17} t={t} s={c > 5 ? 8 : 10} c={(c % 2 === 0) ? '#fef3c7' : S_INK} b />
      ))}
      <rect x={ox} y={oy} width={8 * s} height={8 * s} fill="none" stroke={S_INK} strokeWidth="2" />
      <SText x={360} y={80} t="1. mező: 1 szem" s={11.5} a="middle" />
      <SText x={360} y={100} t="2. mező: 2 szem" s={11.5} />
      <SText x={360} y={120} t="k-adik mező: 2ᵏ⁻¹ szem" s={11.5} c={S_BLUE} b />
      <SText x={360} y={150} t="S₆₄ = (2⁶⁴ − 1) / (2 − 1)" s={12} c={S_RED} b />
      <SText x={360} y={170} t="≈ 1,84 · 10¹⁹ búzaszem" s={12} c={S_RED} b />
      <SText x={360} y={200} t="≈ 700 milliárd tonna búza –" s={10.5} c="#475569" />
      <SText x={360} y={216} t="kb. 1000-szerese a Föld" s={10.5} c="#475569" />
      <SText x={360} y={232} t="éves búzatermésének" s={10.5} c="#475569" />
    </SeqFrame>
  );
};

// 4. ábra: családfa – az ősök száma generációnként
export const FamilyTreeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [1, 2, 4, 8, 16];
  const W = 400;
  return (
    <SeqFrame title="Családfa: generációnként kétszer annyi ős" className={className} h={280}>
      {rows.map((cnt, r) => {
        const y = 250 - r * 46;
        return (
          <g key={r}>
            {Array.from({ length: cnt }, (_, i) => {
              const x = 40 + (W / cnt) * (i + 0.5);
              const px = 40 + (W / (cnt / 2)) * (Math.floor(i / 2) + 0.5);
              return (
                <g key={i}>
                  {r > 0 && <line x1={x} y1={y + 6} x2={px} y2={y + 40} stroke="#94a3b8" strokeWidth="1" />}
                  <circle cx={x} cy={y} r={r === 0 ? 9 : 7} fill={r === 0 ? S_AMBER : S_BLUE} opacity={0.9} />
                </g>
              );
            })}
            <SText x={452} y={y + 4} t={r === 0 ? 'én' : `${cnt}`} s={11} c={r === 0 ? S_AMBER : S_BLUE} a="start" b />
          </g>
        );
      })}
      <SText x={130} y={52} t="10 generáció: 2 + 4 + … + 2¹⁰ = 2046 ős" s={12} c={S_RED} b />
    </SeqFrame>
  );
};

const SCARF = Array.from({ length: 10 }, (_, i) => 8 * 1.2 ** i);
const SCARF_CUM = SCARF.map((_, i) => SCARF.slice(0, i + 1).reduce((a, b) => a + b, 0));

// 5. ábra: Szabó nagymama sála (érettségi 2007)
export const ScarfGrowthSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <SeqFrame title="A sál hossza: naponta 20%-kal többet köt (a₁ = 8 cm)" className={className}>
    <SeqBarChart values={SCARF} x={60} y={50} w={380} h={190} line={SCARF_CUM} refY={200} refLabel="200 cm = 2 m" maxV={215} />
    <SText x={54} y={56} t="cm" s={10} a="end" />
    <SText x={250} y={272} t="nap (n)" s={10.5} c="#475569" />
    <SText x={180} y={96} t="zöld: Sₙ (elkészült hossz)" s={10.5} c={S_GREEN} b />
    <SText x={180} y={112} t="kék: aznap kötött darab" s={10.5} c={S_BLUE} b />
    <SText x={180} y={136} t="S₉ ≈ 166,4 cm < 200 ≤ S₁₀ ≈ 207,7 cm" s={11} c={S_RED} />
  </SeqFrame>
);

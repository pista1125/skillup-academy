import React from 'react';
import { FONT, DiscCell, PLACE_BODY, PLACE_FILL, PLACE_TEXT } from '../haromjegyu-szamok-kivonasa/ThreeDigitSubG3Parts';
import { WrittenSubG3ColumnG, subSteps, exchangeMarks } from './WrittenSubG3Column';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode }> = ({ w, h, className = DEF, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const partial = (n: number, k: number) =>
  String(n)
    .padStart(3, ' ')
    .split('')
    .map((ch, i) => (2 - i < k ? ch : ' '))
    .join('');

/** Három lépés egymás mellett: 486 − 253 (felváltás nélkül), alatta elvétellel vagy pótlással kimondva. */
const ThreePanels: React.FC<{ a: number; b: number; captions: string[]; title: string; className?: string }> = ({ a, b, captions, title, className }) => (
  <Frame w={390} h={196} className={className}>
    <text x="195" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">{title}</text>
    {[1, 2, 3].map((k, i) => (
      <g key={k}>
        <WrittenSubG3ColumnG x={22 + i * 128} y={34} minuend={a} subtrahend={b} result={partial(a - b, k)} highlight={k - 1} cell={26} />
        <text x={22 + i * 128 + 48} y={172} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#0f172a">{captions[i]}</text>
        <text x={22 + i * 128 + 48} y={188} textAnchor="middle" fontSize="11" fill="#64748b">{k}. lépés</text>
      </g>
    ))}
  </Frame>
);

/** 486 − 253: egyesek, tízesek, százasok – elvétellel. */
export const StepsNoExchangeSvg: Fig = ({ className }) => (
  <ThreePanels a={486} b={253} title="Az egyesekkel kezdünk, aztán tízesek, végül százasok." captions={['6 e − 3 e = 3 e', '8 t − 5 t = 3 t', '4 sz − 2 sz = 2 sz']} className={className} />
);

/** 486 − 253: ugyanez pótlással. */
export const FillUpStepsSvg: Fig = ({ className }) => (
  <ThreePanels a={486} b={253} title="Pótlással: mennyit kell adni a kivonandóhoz?" captions={['3 e + 3 e = 6 e', '5 t + 3 t = 8 t', '2 sz + 2 sz = 4 sz']} className={className} />
);

/** Korongos helyiérték-táblázat (két sor: előtte / felváltás után) + oszlop felváltás-jelekkel. */
const ExchangeFigure: React.FC<{ a: number; b: number; title: string; className?: string; rows: { label: string; n: [number, number, number]; fresh?: [number, number, number] }[] }> = ({ a, b, title, className, rows }) => {
  const x0 = 86;
  const cw = [72, 112, 112];
  const xs = [x0, x0 + cw[0], x0 + cw[0] + cw[1]];
  const rowH = 58;
  const h = 46 + rows.length * rowH + 20;
  const steps = subSteps(a, b);
  return (
    <Frame w={480} h={Math.max(h, 150)} className={className}>
      <text x="240" y="22" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">{title}</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={xs[i]} y={32} width={cw[i]} height={16} fill={PLACE_FILL[i]} stroke="#fff" />
          <text x={xs[i] + cw[i] / 2} y={44} textAnchor="middle" fontSize="11" fontWeight="bold" fill={PLACE_TEXT[i]}>{['sz', 't', 'e'][i]}</text>
          <rect x={xs[i]} y={48} width={cw[i]} height={rows.length * rowH} fill={PLACE_BODY[i]} opacity="0.7" stroke="#fff" />
        </g>
      ))}
      {rows.map((r, k) => (
        <g key={k}>
          <text x={x0 - 6} y={48 + k * rowH + 24} textAnchor="end" fontSize="11.5" fontWeight="bold" fill={k === 0 ? '#0f172a' : '#15803d'}>{r.label}</text>
          {[0, 1, 2].map((i) => (
            <DiscCell key={i} x={xs[i]} y={48 + k * rowH + 5} w={cw[i]} n={r.n[i]} place={i as 0 | 1 | 2} r={6.5} fresh={r.fresh ? r.fresh[i] : 0} perRow={i === 0 ? 4 : 7} />
          ))}
          {k < rows.length - 1 && <line x1={x0} y1={48 + (k + 1) * rowH} x2={x0 + 296} y2={48 + (k + 1) * rowH} stroke="#94a3b8" strokeDasharray="3 3" />}
        </g>
      ))}
      <WrittenSubG3ColumnG x={x0 + 302} y={34} minuend={a} subtrahend={b} result={a - b} exchanges={exchangeMarks(steps, 3)} cell={21} header={false} />
    </Frame>
  );
};

/** 372 − 145: felváltás az egyeseknél. */
export const ExchangeOnesSvg: Fig = ({ className }) => (
  <ExchangeFigure
    a={372}
    b={145}
    title="2 egyesből nem lehet 5-öt elvenni: 1 tízest felváltunk."
    className={className}
    rows={[
      { label: '372', n: [3, 7, 2] },
      { label: 'felváltva', n: [3, 6, 12], fresh: [0, 0, 10] }
    ]}
  />
);

/** 428 − 175: felváltás a tízeseknél. */
export const ExchangeTensSvg: Fig = ({ className }) => (
  <ExchangeFigure
    a={428}
    b={175}
    title="2 tízesből nem lehet 7-et elvenni: 1 százast felváltunk."
    className={className}
    rows={[
      { label: '428', n: [4, 2, 8] },
      { label: 'felváltva', n: [3, 12, 8], fresh: [0, 10, 0] }
    ]}
  />
);

/** 421 − 186: kétszer is felváltunk. */
export const ExchangeBothSvg: Fig = ({ className }) => (
  <ExchangeFigure
    a={421}
    b={186}
    title="Az egyeseknél és a tízeseknél is felváltunk."
    className={className}
    rows={[
      { label: '421', n: [4, 2, 1] },
      { label: '1. felváltás', n: [4, 1, 11], fresh: [0, 0, 10] },
      { label: '2. felváltás', n: [3, 11, 11], fresh: [0, 10, 0] }
    ]}
  />
);

/** 403 − 157: a tízesek helyén 0 van – 1 százast 9 tízesre és 10 egyesre váltunk. */
export const ZeroTensSvg: Fig = ({ className }) => (
  <ExchangeFigure
    a={403}
    b={157}
    title="0 tízes van: 1 százas = 9 tízes + 10 egyes."
    className={className}
    rows={[
      { label: '403', n: [4, 0, 3] },
      { label: 'felváltva', n: [3, 9, 13], fresh: [0, 9, 10] }
    ]}
  />
);

/** Ellenőrzés: 372 − 145 = 227 → 227 + 145 = 372, 145 + 227 = 372, 372 − 227 = 145. */
export const CheckSvg: Fig = ({ className }) => (
  <Frame w={390} h={170} className={className}>
    <text x="195" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">372 − 145 = 227. Ellenőrizzük!</text>
    <WrittenSubG3ColumnG x={14} y={36} op="+" minuend={227} subtrahend={145} result={372} cell={24} header={false} />
    <WrittenSubG3ColumnG x={146} y={36} op="+" minuend={145} subtrahend={227} result={372} cell={24} header={false} />
    <WrittenSubG3ColumnG x={278} y={36} minuend={372} subtrahend={227} result={145} cell={24} header={false} />
    <text x="62" y="152" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#16a34a">összeadással</text>
    <text x="194" y="152" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#16a34a">vagy így</text>
    <text x="326" y="152" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">kivonással</text>
    <text x="128" y="96" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#64748b">vagy</text>
    <text x="261" y="96" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#64748b">vagy</text>
  </Frame>
);

/** Szöveges feladat lépései: Adatok, Terv, Becslés, Számítás, Ellenőrzés, Válasz. */
export const WordPlanSvg: Fig = ({ className }) => (
  <Frame w={440} h={210} className={className}>
    {[
      ['Adatok', 'összes szék: 364, foglalt: 178, üres: ?'],
      ['Terv', '364 − 178 = □'],
      ['Becslés', '364 ≈ 360, 178 ≈ 180, 360 − 180 = 180'],
      ['Számítás', 'írásban (jobbra)'],
      ['Ellenőrzés', '186 + 178 = 364'],
      ['Válasz', '186 szék marad üresen.']
    ].map(([k, v], i) => (
      <g key={k}>
        <text x="16" y={34 + i * 30} fontSize="12.5" fontWeight="bold" fill="#7c2d12">{k}:</text>
        <text x="92" y={34 + i * 30} fontSize="12" fill="#0f172a">{v}</text>
      </g>
    ))}
    <WrittenSubG3ColumnG x={336} y={56} minuend={364} subtrahend={178} result={186} cell={24} header />
  </Frame>
);

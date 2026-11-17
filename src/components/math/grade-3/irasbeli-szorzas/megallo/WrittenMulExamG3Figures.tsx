import React from 'react';

type FigProps = { className?: string };
const FONT = 'system-ui, Segoe UI, sans-serif';
const CLS = 'w-full max-w-xl h-auto mx-auto';

/** A fejezet térképe: öt állomás, amit már tudsz. */
export const ChapterMapMulSvg: React.FC<FigProps> = ({ className }) => {
  const st = [
    { x: 70, y: 70, t: 'Fejben', s: '140 · 3', c: '#f97316' },
    { x: 190, y: 150, t: 'Becslés', s: '335 ≈ 340', c: '#0ea5e9' },
    { x: 300, y: 70, t: 'Írásban', s: '214 · 3', c: '#16a34a' },
    { x: 410, y: 150, t: 'Következtetés', s: '2 db → 6 db', c: '#a855f7' },
    { x: 470, y: 60, t: 'Sorrend', s: '( ) · +', c: '#e11d48' }
  ];
  return (
    <svg viewBox="0 0 540 220" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="538" height="218" rx="16" fill="#f0f9ff" stroke="#bae6fd" />
      <path d="M 70 70 Q 130 170 190 150 Q 250 130 300 70 Q 350 20 410 150 Q 440 210 470 60" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="10 8" />
      {st.map((p, i) => (
        <g key={p.t}>
          <circle cx={p.x} cy={p.y} r="40" fill="#fff" stroke={p.c} strokeWidth="4" />
          <circle cx={p.x - 30} cy={p.y - 30} r="12" fill={p.c} />
          <text x={p.x - 30} y={p.y - 25} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">{i + 1}</text>
          <text x={p.x} y={p.y - 2} textAnchor="middle" fontSize={p.t.length > 9 ? 11 : 14} fontWeight="bold" fill={p.c}>{p.t}</text>
          <text x={p.x} y={p.y + 18} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{p.s}</text>
        </g>
      ))}
      <text x="270" y="208" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0369a1">XIII. Írásbeli szorzás – minden állomást bejártál!</text>
    </svg>
  );
};

/** Írásbeli szorzás a könyv elrendezésében, a nevekkel: szorzandó, szorzó, szorzat. */
export const MulNamesSvg: React.FC<FigProps> = ({ className }) => {
  const cx = [230, 200, 170];
  const fill = ['#fde68a', '#bae6fd', '#fecaca'];
  const lab = ['e', 't', 'sz'];
  return (
    <svg viewBox="0 0 520 230" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="518" height="228" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      {[0, 1, 2].map((c) => (
        <g key={c}>
          <rect x={cx[c] - 15} y="20" width="30" height="24" fill={fill[c]} />
          <text x={cx[c]} y="37" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">{lab[c]}</text>
        </g>
      ))}
      {['2', '1', '4'].map((d, i) => (
        <text key={i} x={cx[2 - i]} y="84" textAnchor="middle" fontSize="34" fontWeight="bold" fill="#0f172a">{d}</text>
      ))}
      <text x="282" y="84" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#ea580c">· 3</text>
      <line x1="150" y1="98" x2="250" y2="98" stroke="#0f172a" strokeWidth="3" />
      {['6', '4', '2'].map((d, i) => (
        <text key={i} x={cx[2 - i]} y="140" textAnchor="middle" fontSize="34" fontWeight="bold" fill="#16a34a">{d}</text>
      ))}
      {/* feliratok */}
      <line x1="150" y1="72" x2="96" y2="72" stroke="#7c3aed" strokeWidth="2.5" />
      <text x="20" y="77" fontSize="17" fontWeight="bold" fill="#6d28d9">szorzandó</text>
      <line x1="306" y1="72" x2="350" y2="72" stroke="#ea580c" strokeWidth="2.5" />
      <text x="356" y="77" fontSize="17" fontWeight="bold" fill="#c2410c">szorzó</text>
      <line x1="150" y1="128" x2="96" y2="128" stroke="#16a34a" strokeWidth="2.5" />
      <text x="20" y="133" fontSize="17" fontWeight="bold" fill="#15803d">szorzat</text>
      <text x="356" y="118" fontSize="13" fill="#334155">a két szám együtt:</text>
      <text x="356" y="136" fontSize="15" fontWeight="bold" fill="#334155">tényezők</text>
      <text x="260" y="180" textAnchor="middle" fontSize="15" fill="#334155">Az egyesekkel kezdünk: 3 · 4 = 12, leírom a 2-t, marad 1.</text>
      <text x="260" y="206" textAnchor="middle" fontSize="15" fill="#334155">3 · 1 = 3, + 1 = 4.  3 · 2 = 6.  Ellenőrzés: 214 + 214 + 214 = 642</text>
    </svg>
  );
};

/** Becslés: 335 a számegyenesen; tízesre 340, százasra 300. */
export const EstimateMulSvg: React.FC<FigProps> = ({ className }) => {
  const x = (v: number) => 40 + (v - 300) * 4.4;
  return (
    <svg viewBox="0 0 520 220" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="518" height="218" rx="16" fill="#f0fdf4" stroke="#bbf7d0" />
      <line x1="30" y1="80" x2="490" y2="80" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: 11 }, (_, i) => 300 + i * 10).map((v) => (
        <g key={v}>
          <line x1={x(v)} y1={v % 50 === 0 ? 66 : 72} x2={x(v)} y2={v % 50 === 0 ? 94 : 88} stroke="#334155" strokeWidth={v % 50 === 0 ? 3 : 2} />
          <text x={x(v)} y="112" textAnchor="middle" fontSize="13" fontWeight={v % 100 === 0 ? 'bold' : 'normal'} fill="#334155">{v}</text>
        </g>
      ))}
      <circle cx={x(335)} cy="80" r="7" fill="#dc2626" />
      <text x={x(335)} y="56" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#dc2626">335</text>
      <path d={`M ${x(335)} 46 Q ${(x(335) + x(340)) / 2} 30 ${x(340)} 46`} fill="none" stroke="#0284c7" strokeWidth="2.5" />
      <path d={`M ${x(335)} 46 Q ${(x(335) + x(300)) / 2} 14 ${x(300)} 62`} fill="none" stroke="#a855f7" strokeWidth="2.5" />
      <rect x="40" y="138" width="210" height="64" rx="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="145" y="162" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#075985">tízesre: 335 ≈ 340</text>
      <text x="145" y="188" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">340 · 2 = 680</text>
      <rect x="270" y="138" width="210" height="64" rx="12" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" />
      <text x="375" y="162" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#6b21a8">százasra: 335 ≈ 300</text>
      <text x="375" y="188" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">300 · 2 = 600</text>
    </svg>
  );
};

/** Műveletlánc: 125 → · 3 → − 200 → · 4 → ? */
export const ChainMulSvg: React.FC<FigProps> = ({ className }) => {
  const boxes = ['125', '· 3', '375', '− 200', '175', '· 4', '700'];
  return (
    <svg viewBox="0 0 540 140" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="538" height="138" rx="16" fill="#fff7ed" stroke="#fed7aa" />
      {boxes.map((b, i) => {
        const x = 12 + i * 75;
        const isOp = i % 2 === 1;
        return (
          <g key={i}>
            <rect x={x} y="40" width="64" height="40" rx="20" fill={isOp ? '#fff' : i === 0 ? '#f97316' : '#ffedd5'} stroke="#ea580c" strokeWidth="2.5" />
            <text x={x + 32} y="67" textAnchor="middle" fontSize="18" fontWeight="bold" fill={i === 0 ? '#fff' : '#0f172a'}>{b}</text>
            {i < boxes.length - 1 && <polygon points={`${x + 73},60 ${x + 66},54 ${x + 66},66`} fill="#c2410c" />}
          </g>
        );
      })}
      <text x="270" y="112" textAnchor="middle" fontSize="15" fill="#7c2d12">Minden lépés után az eredménnyel számolsz tovább.</text>
    </svg>
  );
};

/** Saját múzeum-alaprajz: minden teremben egy feladat (a tudáspróba előtt). */
export const MuseumMulSvg: React.FC<FigProps> = ({ className }) => {
  const rooms = [
    { x: 20, y: 20, w: 160, h: 80, t: '163 · 4', c: '#fecaca' },
    { x: 180, y: 20, w: 160, h: 80, t: '2 · (180 + 95)', c: '#bbf7d0' },
    { x: 340, y: 20, w: 160, h: 80, t: '4-szer annyi, mint 205', c: '#bfdbfe' },
    { x: 20, y: 100, w: 160, h: 90, t: '1000 − 3 · 215', c: '#fde68a' },
    { x: 180, y: 100, w: 160, h: 90, t: '2 · 5 · 3 · 30', c: '#ddd6fe' },
    { x: 340, y: 100, w: 160, h: 90, t: '348 + 126 · 2', c: '#fbcfe8' }
  ];
  return (
    <svg viewBox="0 0 520 230" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="518" height="228" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      {rooms.map((r) => (
        <g key={r.t}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={r.c} stroke="#334155" strokeWidth="2.5" />
          <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 6} textAnchor="middle" fontSize={r.t.length > 16 ? 13 : 17} fontWeight="bold" fill="#0f172a">{r.t}</text>
        </g>
      ))}
      <text x="20" y="214" fontSize="14" fontWeight="bold" fill="#b91c1c">bejárat ↑</text>
      <text x="500" y="214" textAnchor="end" fontSize="14" fontWeight="bold" fill="#15803d">↑ kijárat</text>
    </svg>
  );
};

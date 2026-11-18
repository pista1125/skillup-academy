import React from 'react';
import { BracePart, UnitStrip20Part, WORD20_FONT } from './WordProblems20G2Parts';

type FigProps = { className?: string };

/** 1. A szöveges feladat 5 lépése — lépcsős ábra 2. osztályosoknak. */
export const FiveStepsLadderSvg: React.FC<FigProps> = ({ className }) => {
  const steps = [
    { t: '1. Adatok', s: 'Mit tudunk?', c: '#0284c7' },
    { t: '2. Kérdés', s: 'Mit kérdez?', c: '#7c3aed' },
    { t: '3. Terv', s: 'Nyitott mondat', c: '#d97706' },
    { t: '4. Számolás', s: 'és ellenőrzés', c: '#059669' },
    { t: '5. Válasz', s: 'Mondatban', c: '#e11d48' },
  ];

  return (
    <svg
      viewBox="0 0 540 230"
      className={className ?? 'w-full max-w-xl h-auto mx-auto'}
      xmlns="http://www.w3.org/2000/svg"
      fontFamily={WORD20_FONT}
    >
      <rect x="1" y="1" width="538" height="228" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      {steps.map((st, i) => {
        const x = 14 + i * 103;
        const h = 64 + i * 31;
        const y = 214 - h;
        return (
          <g key={st.t}>
            <rect x={x} y={y} width="96" height={h} rx="10" fill={st.c} />
            <text x={x + 48} y={y + 24} textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#ffffff">
              {st.t}
            </text>
            <text x={x + 48} y={y + 44} textAnchor="middle" fontSize="11.5" fill="#f8fafc">
              {st.s}
            </text>
          </g>
        );
      })}
      {/* kis figura a lépcső előtt */}
      <circle cx="54" cy="100" r="9" fill="#fde68a" stroke="#92400e" strokeWidth="1.8" />
      <line x1="54" y1="109" x2="54" y2="128" stroke="#92400e" strokeWidth="2.4" />
      <line x1="54" y1="115" x2="43" y2="107" stroke="#92400e" strokeWidth="2.4" />
      <line x1="54" y1="115" x2="65" y2="107" stroke="#92400e" strokeWidth="2.4" />
      <line x1="54" y1="128" x2="47" y2="140" stroke="#92400e" strokeWidth="2.4" />
      <line x1="54" y1="128" x2="61" y2="140" stroke="#92400e" strokeWidth="2.4" />
    </svg>
  );
};

/** 2. 20-as négyzetrácsos szalagmodell kapcsos zárójellel (egész és hiányzó rész). */
export const StripModel20Svg: React.FC<FigProps> = ({ className }) => {
  const x0 = 40;
  const sq = 21;
  return (
    <svg
      viewBox="0 0 500 185"
      className={className ?? 'w-full max-w-xl h-auto mx-auto'}
      xmlns="http://www.w3.org/2000/svg"
      fontFamily={WORD20_FONT}
    >
      <rect x="1" y="1" width="498" height="183" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="250" y="25" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#0f172a">
        Szalagmodell 20-as soron: 16 gesztenyéből 9 a kosárban, mennyi a zsebben?
      </text>

      <BracePart
        x1={x0}
        x2={x0 + 16 * sq}
        y={64}
        dir="up"
        color="#0f172a"
        label="összesen: 16"
        fontSize={13}
      />

      <UnitStrip20Part
        x={x0}
        y={72}
        sqSize={sq}
        first={9}
        firstColor="#fed7aa"
        firstStroke="#c2410c"
        unknownStart={9}
        unknownCount={7}
      />

      <BracePart
        x1={x0}
        x2={x0 + 9 * sq}
        y={100}
        dir="down"
        color="#c2410c"
        label="9 a kosárban"
        fontSize={12.5}
      />
      <BracePart
        x1={x0 + 9 * sq}
        x2={x0 + 16 * sq}
        y={100}
        dir="down"
        color="#d97706"
        label="? a zsebben"
        labelColor="#dc2626"
        fontSize={12.5}
      />

      <text x="250" y="164" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">
        9 + □ = 16   →   16 − 9 = 7   (Ellenőrzés: 9 + 7 = 16)
      </text>
    </svg>
  );
};

/** 3. Fordított összehasonlítás csapdája („5-tel többet, mint...” → kivonás!). */
export const InverseComparisonBarsSvg: React.FC<FigProps> = ({ className }) => {
  const x0 = 96;
  const unit = 23;
  return (
    <svg
      viewBox="0 0 500 205"
      className={className ?? 'w-full max-w-xl h-auto mx-auto'}
      xmlns="http://www.w3.org/2000/svg"
      fontFamily={WORD20_FONT}
    >
      <rect x="1" y="1" width="498" height="203" rx="16" fill="#fff7ed" stroke="#fdba74" />
      <text x="250" y="26" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#9a3412">
        Vince 14 kagylót gyűjtött, 5-tel többet, mint Sára. Ki gyűjtött kevesebbet?
      </text>

      {/* Vince: 14 */}
      <text x="24" y="68" fontSize="14" fontWeight="bold" fill="#0369a1">
        Vince
      </text>
      <rect x={x0} y="48" width={14 * unit} height="30" rx="6" fill="#7dd3fc" stroke="#0369a1" strokeWidth="2" />
      <text x={x0 + 7 * unit} y="68" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0c4a6e">
        14 kagyló
      </text>

      {/* Sára: 9 + 5 hiányzó rész */}
      <text x="24" y="122" fontSize="14" fontWeight="bold" fill="#be123c">
        Sára
      </text>
      <rect x={x0} y="102" width={9 * unit} height="30" rx="6" fill="#fda4af" stroke="#be123c" strokeWidth="2" />
      <text x={x0 + 4.5 * unit} y="122" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#dc2626">
        ?
      </text>

      <rect
        x={x0 + 9 * unit}
        y="102"
        width={5 * unit}
        height="30"
        rx="6"
        fill="#fef3c7"
        stroke="#d97706"
        strokeWidth="2"
        strokeDasharray="5 3"
      />
      <text x={x0 + 11.5 * unit} y="123" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">
        5
      </text>

      <line x1={x0 + 9 * unit} y1="78" x2={x0 + 9 * unit} y2="100" stroke="#64748b" strokeDasharray="4 3" />
      <line x1={x0 + 14 * unit} y1="78" x2={x0 + 14 * unit} y2="100" stroke="#64748b" strokeDasharray="4 3" />

      <rect x="30" y="148" width="440" height="40" rx="10" fill="#ffffff" stroke="#cbd5e1" />
      <text x="250" y="166" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
        Vince gyűjtött többet, tehát Sárának KEVESEBB van!
      </text>
      <text x="250" y="182" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
        14 − 5 = 9 kagyló   (Ellenőrzés: 9 + 5 = 14)
      </text>
    </svg>
  );
};

/** 4. Kétlépéses feladat szalagmodellen (8 + 7 − 4 = 11). */
export const TwoStepStripSvg: React.FC<FigProps> = ({ className }) => {
  const x0 = 40;
  const sq = 21;
  return (
    <svg
      viewBox="0 0 500 180"
      className={className ?? 'w-full max-w-xl h-auto mx-auto'}
      xmlns="http://www.w3.org/2000/svg"
      fontFamily={WORD20_FONT}
    >
      <rect x="1" y="1" width="498" height="178" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="250" y="24" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#0f172a">
        Matyi 8, Flóra 7 matricát ragasztott be, de 4 leszakadt. Hány maradt?
      </text>

      <BracePart
        x1={x0}
        x2={x0 + 15 * sq}
        y={56}
        dir="up"
        color="#1d4ed8"
        label="1. lépés: 8 + 7 = 15"
        fontSize={12.5}
      />

      <UnitStrip20Part
        x={x0}
        y={64}
        sqSize={sq}
        first={8}
        second={7}
        crossed={4}
        firstColor="#93c5fd"
        firstStroke="#1d4ed8"
        secondColor="#fde68a"
        secondStroke="#d97706"
      />

      <BracePart
        x1={x0}
        x2={x0 + 11 * sq}
        y={92}
        dir="down"
        color="#15803d"
        label="maradt: 11"
        fontSize={12.5}
      />
      <BracePart
        x1={x0 + 11 * sq}
        x2={x0 + 15 * sq}
        y={92}
        dir="down"
        color="#dc2626"
        label="4 leszakadt"
        fontSize={12}
      />

      <text x="250" y="160" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
        1. lépés: 8 + 7 = 15     •     2. lépés: 15 − 4 = 11 matrica maradt
      </text>
    </svg>
  );
};

/** 5. Oszlopdiagram (négyzetrácsos szavazás, 0–8 közötti értékek). */
export const BarChartSnacksSvg: React.FC<FigProps> = ({ className }) => {
  const cols = [
    { name: 'Alma', val: 7, fill: '#ef4444', stroke: '#991b1b' },
    { name: 'Körte', val: 5, fill: '#22c55e', stroke: '#166534' },
    { name: 'Banán', val: 8, fill: '#eab308', stroke: '#854d0e' },
    { name: 'Szilva', val: 4, fill: '#8b5cf6', stroke: '#5b21b6' },
  ];
  const cellW = 72;
  const cellH = 18;
  const x0 = 110;
  const yBot = 178;

  return (
    <svg
      viewBox="0 0 460 215"
      className={className ?? 'w-full max-w-md h-auto mx-auto'}
      xmlns="http://www.w3.org/2000/svg"
      fontFamily={WORD20_FONT}
    >
      <rect x="1" y="1" width="458" height="213" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="230" y="22" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#0f172a">
        Kedvenc gyümölcsök a 2. osztályban (fő)
      </text>

      {/* vízszintes rácsvonalak és számok 0..8 */}
      {Array.from({ length: 9 }, (_, r) => {
        const y = yBot - r * cellH;
        return (
          <g key={r}>
            <line x1={x0} y1={y} x2={x0 + cols.length * cellW} y2={y} stroke="#cbd5e1" strokeWidth="1" />
            <text x={x0 - 10} y={y + 4} textAnchor="end" fontSize="11" fontWeight="bold" fill="#475569">
              {r}
            </text>
          </g>
        );
      })}

      {/* oszlopok és négyzeteik */}
      {cols.map((c, ci) => {
        const cx = x0 + ci * cellW;
        return (
          <g key={c.name}>
            {Array.from({ length: 8 }, (_, r) => {
              const filled = r < c.val;
              const y = yBot - (r + 1) * cellH;
              return (
                <rect
                  key={r}
                  x={cx + 8}
                  y={y}
                  width={cellW - 16}
                  height={cellH}
                  fill={filled ? c.fill : '#ffffff'}
                  stroke={filled ? c.stroke : '#cbd5e1'}
                  strokeWidth="1.2"
                />
              );
            })}
            <text x={cx + cellW / 2} y={yBot + 18} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#0f172a">
              {c.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** 6. Próbálgatás táblázattal (3 színű golyó, összesen 18, piros = 7, kék > sárga). */
export const BudgetTableSvg: React.FC<FigProps> = ({ className }) => {
  const cols = [
    { p: 7, k: 6, s: 5 },
    { p: 7, k: 7, s: 4 },
    { p: 7, k: 8, s: 3 },
    { p: 7, k: 9, s: 2 },
    { p: 7, k: 10, s: 1 },
  ];
  const labels = ['Piros', 'Kék', 'Sárga', 'Összesen'];
  const rowColors = ['#fee2e2', '#dbeafe', '#fef3c7', '#dcfce7'];
  const rowText = ['#991b1b', '#1e40af', '#92400e', '#166534'];
  const x0 = 24;
  const headW = 110;
  const colW = 66;
  const rowH = 30;
  const y0 = 56;

  return (
    <svg
      viewBox="0 0 490 205"
      className={className ?? 'w-full max-w-lg h-auto mx-auto'}
      xmlns="http://www.w3.org/2000/svg"
      fontFamily={WORD20_FONT}
    >
      <rect x="1" y="1" width="488" height="203" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="245" y="25" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#0f172a">
        18 golyó: 7 piros, kék és sárga (kék &gt; sárga, mindkettő legalább 1)
      </text>
      <text x="245" y="43" textAnchor="middle" fontSize="12" fill="#475569">
        A kék és a sárga együtt: 18 − 7 = 11 golyó
      </text>

      {labels.map((lab, ri) => (
        <g key={lab}>
          <rect
            x={x0}
            y={y0 + ri * rowH}
            width={headW}
            height={rowH}
            fill={rowColors[ri]}
            stroke="#64748b"
            strokeWidth="1.2"
          />
          <text
            x={x0 + 12}
            y={y0 + ri * rowH + 20}
            fontSize="13"
            fontWeight="bold"
            fill={rowText[ri]}
          >
            {lab}
          </text>
        </g>
      ))}

      {cols.map((c, ci) => {
        const cx = x0 + headW + ci * colW;
        const vals = [c.p, c.k, c.s, c.p + c.k + c.s];
        return (
          <g key={ci}>
            {vals.map((v, ri) => (
              <g key={ri}>
                <rect
                  x={cx}
                  y={y0 + ri * rowH}
                  width={colW}
                  height={rowH}
                  fill={ri === 3 ? '#dcfce7' : '#ffffff'}
                  stroke="#64748b"
                  strokeWidth="1.2"
                />
                <text
                  x={cx + colW / 2}
                  y={y0 + ri * rowH + 20}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#0f172a"
                >
                  {v}
                </text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
};

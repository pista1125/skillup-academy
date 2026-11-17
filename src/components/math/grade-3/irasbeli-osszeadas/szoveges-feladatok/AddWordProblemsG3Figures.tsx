import React from 'react';
import { FONT, INK, UNK, BarRowsG, PartsBarG } from '../az-osszeg-valtozasai/SumChangesG3Parts';
import { WrittenAddG3ColumnG, columnAddSize } from '../irasbeli-osszeadas/WrittenAddG3Column';
import { MenuBoardG, menuBoardHeight } from './AddWordProblemsG3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

/** A megoldás lépései: 6 színes kártya. */
export const WordStepsSvg: Fig = ({ className = DEF }) => {
  const steps: [string, string, string, string][] = [
    ['1', 'Olvasd el!', 'Mit kérdez?', '#e0f2fe'],
    ['2', 'Adatok', 'Írd ki a számokat!', '#fef3c7'],
    ['3', 'Terv', 'Rajz és művelet', '#dcfce7'],
    ['4', 'Becslés', 'Körülbelül mennyi?', '#fae8ff'],
    ['5', 'Számítás', 'Írásban, oszlopban', '#ffedd5'],
    ['6', 'Ellenőrzés, válasz', 'Mondattal felelj!', '#fee2e2']
  ];
  return (
    <svg viewBox="0 0 360 172" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {steps.map(([n, t, s, c], i) => {
        const x = 8 + (i % 3) * 118;
        const y = 8 + Math.floor(i / 3) * 82;
        return (
          <g key={n}>
            <rect x={x} y={y} width="108" height="74" rx="12" fill={c} stroke="#94a3b8" strokeWidth="1.4" />
            <circle cx={x + 18} cy={y + 18} r="12" fill="#1e293b" />
            <text x={x + 18} y={y + 23} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">{n}</text>
            <text x={x + 54} y={y + 46} textAnchor="middle" fontSize={t.length > 12 ? 11.5 : 14} fontWeight="bold" fill={INK}>{t}</text>
            <text x={x + 54} y={y + 63} textAnchor="middle" fontSize="10.5" fill="#475569">{s}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Mintapélda: 236 + 158 könyv – csík és írásbeli összeadás. */
export const WordLibrarySvg: Fig = ({ className = DEF }) => {
  const col = { addends: [236, 158], result: 394, carries: [null, 1, null], cell: 30 };
  const { w } = columnAddSize(col);
  return (
    <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="158" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <PartsBarG
        parts={[
          { v: 236, text: '236', color: '#93c5fd' },
          { v: 158, text: '158', color: '#fde68a' }
        ]}
        total="összesen: ?"
        x={14}
        y={62}
        W={200}
        h={34}
        fs={15}
      />
      <text x="74" y="116" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">hétfő</text>
      <text x="174" y="116" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">kedd</text>
      <text x="114" y="144" textAnchor="middle" fontSize="12.5" fill="#475569">B: 240 + 160 = 400</text>
      <WrittenAddG3ColumnG {...col} x={240 + (110 - w) / 2} y={14} />
    </svg>
  );
};

/** „…-val több”: délelőtt 148, délután 176-tal több. */
export const WordMoreSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="118" rx="12" fill="#f0fdf4" stroke="#86efac" />
    <BarRowsG
      rows={[
        { name: 'délelőtt', segs: [{ v: 148, text: '148', color: '#93c5fd' }] },
        { name: 'délután', segs: [{ v: 148, text: '148', color: '#93c5fd' }, { v: 176, text: '176-tal több', color: '#86efac' }], after: '?' }
      ]}
      x={10}
      y={16}
      nameW={70}
      W={250}
      h={32}
      gap={18}
      fs={14}
    />
    <text x="180" y="110" textAnchor="middle" fontSize="12.5" fill="#475569">A délutáni csík ugyanaz, mint a délelőtti, és még 176.</text>
  </svg>
);

/** Csapda: „…-mal rövidebb, mint” – mégis összeadás. */
export const WordLessThanSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="138" rx="12" fill="#fff1f2" stroke="#fda4af" />
    <BarRowsG
      rows={[
        { name: 'piros', segs: [{ v: 186, text: '186 cm', color: '#fca5a5' }] },
        { name: 'kék', segs: [{ v: 186, text: '186 cm', color: '#93c5fd' }, { v: 127, text: '127 cm', color: '#bfdbfe', dashed: true }], after: '?' }
      ]}
      x={10}
      y={16}
      nameW={50}
      W={262}
      h={32}
      gap={18}
      fs={14}
    />
    <text x="180" y="116" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={UNK}>A piros a rövidebb. A kék a hosszabb!</text>
    <text x="180" y="132" textAnchor="middle" fontSize="12" fill="#475569">kék = 186 cm + 127 cm</text>
  </svg>
);

/** Három tag: 128 + 216 + 93. */
export const WordThreeSvg: Fig = ({ className = DEF }) => {
  const col = { addends: [128, 216, 93], result: '___', cell: 26 };
  const { w } = columnAddSize(col);
  return (
    <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="158" rx="12" fill="#fffbeb" stroke="#fcd34d" />
      <PartsBarG
        parts={[
          { v: 128, text: '128', color: '#fca5a5' },
          { v: 216, text: '216', color: '#fde68a' },
          { v: 93, text: '93', color: '#c4b5fd' }
        ]}
        total="összesen: ? kg"
        x={12}
        y={66}
        W={220}
        h={34}
        fs={14}
      />
      <text x="44" y="120" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">alma</text>
      <text x="131" y="120" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">körte</text>
      <text x="210" y="120" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">szilva</text>
      <WrittenAddG3ColumnG {...col} x={246 + (108 - w) / 2} y={14} />
    </svg>
  );
};

/** Étlap: palacsinta + feltétek. */
export const WordMenuSvg: Fig = ({ className = 'w-full h-auto max-w-sm mx-auto' }) => {
  const h = menuBoardHeight(15);
  return (
    <svg viewBox={`0 0 260 ${h + 24}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <MenuBoardG x={10} y={6} w={240} fs={15} />
      <line x1="70" y1={h + 6} x2="50" y2={h + 22} stroke="#a16207" strokeWidth="5" strokeLinecap="round" />
      <line x1="190" y1={h + 6} x2="210" y2={h + 22} stroke="#a16207" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
};

import React from 'react';
import { WP_FONT, WP_UNK, BarPart, CompareBarsPart, IconPart } from './WordProblems100G2Parts';

const FigBox: React.FC<{ h: number; children: React.ReactNode; label: string }> = ({ h, children, label }) => (
  <svg
    viewBox={`0 0 480 ${h}`}
    className="w-full max-w-[480px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={WP_FONT}
    role="img"
    aria-label={label}
  >
    <rect x="1" y="1" width="478" height={h - 2} rx="16" fill="#fff1f2" stroke="#fecdd3" strokeWidth="2" />
    {children}
  </svg>
);

/** Az 5 lépés. */
export const FiveSteps100Svg: React.FC<{ className?: string }> = () => {
  const steps = [
    { t: 'Adatok', s: 'Mit tudok?', c: '#fda4af' },
    { t: 'Terv', s: '+ vagy −?', c: '#fcd34d' },
    { t: 'Számolás', s: '38 + 27', c: '#93c5fd' },
    { t: 'Ellenőrzés', s: 'Fordítva!', c: '#86efac' },
    { t: 'Válasz', s: 'Egész mondat', c: '#c4b5fd' }
  ];
  return (
    <FigBox h={130} label="A szöveges feladat 5 lépése">
      {steps.map((st, i) => {
        const x = 14 + i * 92;
        return (
          <g key={i}>
            <rect x={x} y={26} width="84" height="76" rx="12" fill={st.c} stroke="#334155" strokeWidth="2" />
            <circle cx={x + 16} cy={26} r="12" fill="#fff" stroke="#334155" strokeWidth="2" />
            <text x={x + 16} y={31} textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a">{i + 1}</text>
            <text x={x + 42} y={62} textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">{st.t}</text>
            <text x={x + 42} y={86} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{st.s}</text>
            {i < steps.length - 1 && <path d={`M ${x + 85} 64 L ${x + 91} 64`} stroke="#334155" strokeWidth="2.5" />}
          </g>
        );
      })}
    </FigBox>
  );
};

/** Rész–egész szalag: összevonás és elvétel. */
export const PartWhole100Svg: React.FC<{ className?: string }> = () => (
  <FigBox h={200} label="Szalagmodell: 23 + 14 = ? és 48 − 15 = ?">
    <IconPart kind="bead" x={34} y={66} s={1.2} />
    <text x="70" y="30" fontSize="14" fontWeight="bold" fill="#334155">Összesen? → összeadás</text>
    <BarPart x={70} y={58} w={270} h={32} segs={[{ label: '23', v: 23 }, { label: '14', v: 14 }]} total="?" fontSize={16} />
    <text x="352" y="80" fontSize="16" fontWeight="900" fill="#0f172a">23 + 14 = 37</text>
    <IconPart kind="apple" x={34} y={152} s={1.2} />
    <text x="70" y="116" fontSize="14" fontWeight="bold" fill="#334155">Maradt? → kivonás</text>
    <BarPart
      x={70}
      y={144}
      w={270}
      h={32}
      segs={[
        { label: '?', v: 33 },
        { label: '15', v: 15, color: '#fecaca', crossed: true }
      ]}
      total="48"
      fontSize={16}
    />
    <text x="352" y="166" fontSize="16" fontWeight="900" fill="#0f172a">48 − 15 = 33</text>
  </FigBox>
);

/** Összehasonlítás: ennyivel több. */
export const CompareMore100Svg: React.FC<{ className?: string }> = () => (
  <FigBox h={130} label="Kristóf 26, Emma 10-zel több">
    <g transform="translate(20 22)">
      <CompareBarsPart
        x={0}
        y={0}
        w={320}
        h={30}
        nameW={80}
        rows={[
          { name: 'Kristóf', label: '26', v: 26 },
          { name: 'Emma', label: '?', v: 36 }
        ]}
        diffLabel="10"
        fontSize={16}
      />
    </g>
    <text x="356" y="56" fontSize="14" fontWeight="bold" fill="#334155">Emmának több:</text>
    <text x="356" y="86" fontSize="18" fontWeight="900" fill="#0f172a">26 + 10 = 36</text>
  </FigBox>
);

/** Fordított megfogalmazás: „Ez 12-vel több, mint Emmáé”. */
export const InverseCompare100Svg: React.FC<{ className?: string }> = () => (
  <FigBox h={150} label="Kristóf 47 kártyája 12-vel több, mint Emmáé">
    <text x="240" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
      Kristófnak 47 kártyája van. Ez 12-vel több, mint Emmáé.
    </text>
    <g transform="translate(20 44)">
      <CompareBarsPart
        x={0}
        y={0}
        w={320}
        h={30}
        nameW={80}
        rows={[
          { name: 'Kristóf', label: '47', v: 47 },
          { name: 'Emma', label: '?', v: 35 }
        ]}
        diffLabel="12"
        fontSize={16}
      />
    </g>
    <text x="352" y="78" fontSize="14" fontWeight="bold" fill={WP_UNK}>Emmának kevesebb!</text>
    <text x="352" y="108" fontSize="18" fontWeight="900" fill="#0f172a">47 − 12 = 35</text>
  </FigBox>
);

/** Két lépés: a buszon leszállnak, felszállnak. */
export const TwoStep100Svg: React.FC<{ className?: string }> = () => {
  const boxes = ['42', '25', '34'];
  const ops = ['− 17', '+ 9'];
  return (
    <FigBox h={130} label="Két lépés: 42 − 17 = 25, 25 + 9 = 34">
      <IconPart kind="bus" x={42} y={66} s={1.4} />
      {boxes.map((b, i) => {
        const x = 96 + i * 130;
        return (
          <g key={i}>
            <rect x={x} y={46} width="64" height="40" rx="10" fill={i === 2 ? '#dcfce7' : '#fef3c7'} stroke={i === 2 ? '#15803d' : '#d97706'} strokeWidth="2.5" />
            <text x={x + 32} y={74} textAnchor="middle" fontSize="22" fontWeight="900" fill="#0f172a">{b}</text>
            {i < 2 && (
              <g>
                <line x1={x + 68} y1={66} x2={x + 122} y2={66} stroke="#334155" strokeWidth="2.5" />
                <path d={`M ${x + 118} 60 L ${x + 127} 66 L ${x + 118} 72 Z`} fill="#334155" />
                <text x={x + 96} y={56} textAnchor="middle" fontSize="16" fontWeight="900" fill={i === 0 ? '#be123c' : '#1d4ed8'}>{ops[i]}</text>
                <text x={x + 96} y={100} textAnchor="middle" fontSize="12" fill="#475569">{i === 0 ? 'leszálltak' : 'felszálltak'}</text>
              </g>
            )}
          </g>
        );
      })}
      <text x="240" y="122" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">1. lépés, aztán 2. lépés — balról jobbra!</text>
    </FigBox>
  );
};

/** Kulcsszavak — de mindig gondolkodj! */
export const KeyWords100Svg: React.FC<{ className?: string }> = () => {
  const rows = [
    { op: '+', c: '#1d4ed8', bg: '#dbeafe', words: 'együtt • összesen • kapott még • hozzátett' },
    { op: '−', c: '#be123c', bg: '#ffe4e6', words: 'maradt • elvitt • megevett • elajándékozott' },
    { op: '−', c: '#7c3aed', bg: '#ede9fe', words: 'Mennyi kell még? • Mennyivel több? • Mennyivel kevesebb?' }
  ];
  return (
    <FigBox h={160} label="Kulcsszavak">
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="16" y={16 + i * 46} width="448" height="38" rx="10" fill={r.bg} stroke={r.c} strokeWidth="2" />
          <circle cx="40" cy={35 + i * 46} r="14" fill="#fff" stroke={r.c} strokeWidth="2.5" />
          <text x="40" y={42 + i * 46} textAnchor="middle" fontSize="22" fontWeight="900" fill={r.c}>{r.op}</text>
          <text x="64" y={40 + i * 46} fontSize="13" fontWeight="bold" fill="#0f172a">{r.words}</text>
        </g>
      ))}
    </FigBox>
  );
};

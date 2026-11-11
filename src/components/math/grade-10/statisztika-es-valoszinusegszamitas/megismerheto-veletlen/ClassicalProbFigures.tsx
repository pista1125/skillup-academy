import React from 'react';

interface FigureProps {
  className?: string;
  size?: number;
}

/**
 * 1. Két dobókocka pontösszegének 6x6-os táblázata és Zsombor tévedése
 * Szemlélteti a 36 elemi eseményt és az összegek piramisát (2-től 12-ig).
 * Kiemeli a 7-es összeget (6 db mező) és a 8-as összeget (5 db mező).
 */
export const TwoDiceSumGridSvg: React.FC<FigureProps> = ({ className = '', size = 320 }) => {
  return (
    <svg
      viewBox="0 0 440 280"
      className={`w-full h-auto max-w-[440px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="440" height="280" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="440" height="280" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="220" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        Két kocka összege (6 × 6 = 36 eset): 7 vs. 8 összehasonlítás
      </text>

      {/* 6x6 Rács rajzolása */}
      <g transform="translate(45, 42)">
        {/* Fejléc ikonok / számok (1-6) */}
        <text x="-16" y="18" fontSize="10" fontWeight="bold" fill="#64748b" textAnchor="middle">Fehér</text>
        <text x="110" y="-8" fontSize="10" fontWeight="bold" fill="#64748b" textAnchor="middle">Fekete kocka (1–6)</text>

        {[1, 2, 3, 4, 5, 6].map((col, cIdx) => (
          <text key={`c-${cIdx}`} x={cIdx * 35 + 17.5} y="12" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569" className="dark:fill-slate-300">
            {col}
          </text>
        ))}

        {[1, 2, 3, 4, 5, 6].map((row, rIdx) => (
          <g key={`r-${rIdx}`}>
            <text x="-8" y={rIdx * 28 + 36} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569" className="dark:fill-slate-300">
              {row}
            </text>

            {[1, 2, 3, 4, 5, 6].map((col, cIdx) => {
              const sum = row + col;
              const isSeven = sum === 7;
              const isEight = sum === 8;

              let fill = '#ffffff';
              let stroke = '#e2e8f0';
              let textFill = '#334155';
              let fontWeight = 'normal';

              if (isSeven) {
                fill = '#dbeafe'; // Kék: 7 (kedvező 6 db)
                stroke = '#3b82f6';
                textFill = '#1d4ed8';
                fontWeight = 'bold';
              } else if (isEight) {
                fill = '#fce7f3'; // Rózsaszín: 8 (kedvező 5 db)
                stroke = '#ec4899';
                textFill = '#be185d';
                fontWeight = 'bold';
              }

              return (
                <g key={`cell-${rIdx}-${cIdx}`} transform={`translate(${cIdx * 35}, ${rIdx * 28 + 18})`}>
                  <rect
                    width="33"
                    height="26"
                    rx="4"
                    fill={fill}
                    className={!isSeven && !isEight ? 'dark:fill-slate-800' : ''}
                    stroke={stroke}
                    strokeWidth={isSeven || isEight ? 1.5 : 1}
                  />
                  <text
                    x="16.5"
                    y="17"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={fontWeight}
                    fill={textFill}
                    className={!isSeven && !isEight ? 'dark:fill-slate-200' : ''}
                  >
                    {sum}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </g>

      {/* Jobb oldali magyarázó és Zsombor tévedése kártya */}
      <g transform="translate(280, 52)">
        {/* 7-es összeg doboz */}
        <rect width="140" height="48" rx="8" fill="#eff6ff" className="dark:fill-blue-950/40" stroke="#bfdbfe" strokeWidth="1" />
        <text x="70" y="16" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#1d4ed8" className="dark:fill-blue-300">
          Összeg = 7 (6 db eset)
        </text>
        <text x="70" y="30" textAnchor="middle" fontSize="9" fill="#2563eb">
          (1,6),(2,5),(3,4),(4,3),(5,2),(6,1)
        </text>
        <text x="70" y="43" textAnchor="middle" fontSize="10" fontWeight="black" fill="#1e40af">
          P(7) = 6/36 = 1/6 (16,7%)
        </text>

        {/* 8-as összeg doboz */}
        <g transform="translate(0, 54)">
          <rect width="140" height="48" rx="8" fill="#fdf2f8" className="dark:fill-pink-950/40" stroke="#fbcfe8" strokeWidth="1" />
          <text x="70" y="16" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#be185d" className="dark:fill-pink-300">
            Összeg = 8 (5 db eset!)
          </text>
          <text x="70" y="30" textAnchor="middle" fontSize="9" fill="#db2777">
            (2,6),(3,5),(4,4),(5,3),(6,2)
          </text>
          <text x="70" y="43" textAnchor="middle" fontSize="10" fontWeight="black" fill="#9d174d">
            P(8) = 5/36 (13,9%)
          </text>
        </g>

        {/* Zsombor csapdája figyelmeztető */}
        <g transform="translate(0, 110)">
          <rect width="140" height="98" rx="8" fill="#fff1f2" className="dark:fill-rose-950/40" stroke="#fda4af" strokeWidth="1" />
          <text x="70" y="15" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#e11d48">
            ⚠️ ZSOMBOR CSAPDÁJA
          </text>
          <text x="8" y="30" fontSize="8.5" fill="#334155" className="dark:fill-slate-300">
            Zsombor hitte: 7 és 8 esélye egyenlő, mert mindkettő 3 pár:
          </text>
          <text x="8" y="43" fontSize="8.5" fontStyle="italic" fill="#64748b">
            7 = 1+6 = 2+5 = 3+4
          </text>
          <text x="8" y="55" fontSize="8.5" fontStyle="italic" fill="#64748b">
            8 = 2+6 = 3+5 = 4+4
          </text>
          <text x="8" y="70" fontSize="8.5" fontWeight="bold" fill="#9f1239" className="dark:fill-rose-300">
            De a 4+4 csak 1 mező,
          </text>
          <text x="8" y="82" fontSize="8.5" fill="#475569" className="dark:fill-slate-300">
            míg a vegyes párok 2-2 mezőt adnak! Így 6 ≠ 5!
          </text>
        </g>
      </g>

      {/* Lenti összesítő csík */}
      <g transform="translate(45, 235)">
        <text x="0" y="16" fontSize="10" fontWeight="bold" fill="#334155" className="dark:fill-slate-200">
          • Legvalószínűbb összeg: <tspan fill="#2563eb">7</tspan> (6/36 = 16,7%) | • Legritkább összegek: <tspan fill="#7c3aed">2</tspan> és <tspan fill="#7c3aed">12</tspan> (1/36 = 2,78%)
        </text>
        <text x="0" y="30" fontSize="9.5" fill="#64748b" className="dark:fill-slate-400">
          A két kocka akkor is 36 elemi kimenetelt ad, ha ránézésre teljesen egyformák!
        </text>
      </g>
    </svg>
  );
};

/**
 * 2. Kő-Papír-Olló és Kő-Papír-Olló-Gyík-Spock játék állapotgráf és döntetlenek
 * 3x3=9 eset (1/3 döntetlen) és 5x5=25 eset (1/5 döntetlen)
 */
export const RockPaperScissorsLizardSpockSvg: React.FC<FigureProps> = ({ className = '', size = 320 }) => {
  return (
    <svg
      viewBox="0 0 440 260"
      className={`w-full h-auto max-w-[440px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="440" height="260" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="440" height="260" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="220" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        Játékelmélet és valószínűség: Kő-Papír-Olló vs. K-P-O-Gyík-Spock
      </text>

      {/* Bal oldal: Klasszikus Kő-Papír-Olló (3x3 = 9 eset) */}
      <g transform="translate(25, 45)">
        <rect width="185" height="150" rx="12" fill="#faf5ff" className="dark:fill-purple-950/40" stroke="#e9d5ff" strokeWidth="1" />
        <text x="92.5" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7e22ce" className="dark:fill-purple-300">
          A) Kő-Papír-Olló (3 × 3 = 9 eset)
        </text>

        {/* 3x3 minitáblázat:
            Kő-Kő (D), Kő-Papír (P nyer), Kő-Olló (K nyer)
            Papír-Kő (P), Papír-Papír (D), Papír-Olló (O)
            Olló-Kő (K), Olló-Papír (O), Olló-Olló (D)
        */}
        <g transform="translate(22, 32)">
          {/* Oszlop/sor címkék */}
          <text x="30" y="10" fontSize="9" fontWeight="bold" fill="#64748b" textAnchor="middle">K</text>
          <text x="65" y="10" fontSize="9" fontWeight="bold" fill="#64748b" textAnchor="middle">P</text>
          <text x="100" y="10" fontSize="9" fontWeight="bold" fill="#64748b" textAnchor="middle">O</text>

          <text x="5" y="28" fontSize="9" fontWeight="bold" fill="#64748b">K</text>
          <text x="5" y="53" fontSize="9" fontWeight="bold" fill="#64748b">P</text>
          <text x="5" y="78" fontSize="9" fontWeight="bold" fill="#64748b">O</text>

          {/* Sor 1: D, P, K */}
          <rect x="15" y="15" width="30" height="20" rx="3" fill="#cbd5e1" />
          <text x="30" y="29" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e293b">D</text>

          <rect x="50" y="15" width="30" height="20" rx="3" fill="#e0e7ff" />
          <text x="65" y="29" textAnchor="middle" fontSize="9" fill="#3730a3">P nyer</text>

          <rect x="85" y="15" width="30" height="20" rx="3" fill="#fce7f3" />
          <text x="100" y="29" textAnchor="middle" fontSize="9" fill="#9d174d">K nyer</text>

          {/* Sor 2: P, D, O */}
          <rect x="15" y="40" width="30" height="20" rx="3" fill="#fce7f3" />
          <text x="30" y="54" textAnchor="middle" fontSize="9" fill="#9d174d">P nyer</text>

          <rect x="50" y="40" width="30" height="20" rx="3" fill="#cbd5e1" />
          <text x="65" y="54" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e293b">D</text>

          <rect x="85" y="40" width="30" height="20" rx="3" fill="#e0e7ff" />
          <text x="100" y="54" textAnchor="middle" fontSize="9" fill="#3730a3">O nyer</text>

          {/* Sor 3: K, O, D */}
          <rect x="15" y="65" width="30" height="20" rx="3" fill="#e0e7ff" />
          <text x="30" y="79" textAnchor="middle" fontSize="9" fill="#3730a3">K nyer</text>

          <rect x="50" y="65" width="30" height="20" rx="3" fill="#fce7f3" />
          <text x="65" y="79" textAnchor="middle" fontSize="9" fill="#9d174d">O nyer</text>

          <rect x="85" y="65" width="30" height="20" rx="3" fill="#cbd5e1" />
          <text x="100" y="79" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e293b">D</text>
        </g>

        <text x="92.5" y="138" textAnchor="middle" fontSize="10.5" fontWeight="black" fill="#6b21a8" className="dark:fill-purple-200">
          Döntetlen: 3/9 = 1/3 (33,3%)
        </text>
      </g>

      {/* Jobb oldal: K-P-O-Gyík-Spock (5x5 = 25 eset) */}
      <g transform="translate(230, 45)">
        <rect width="185" height="150" rx="12" fill="#eff6ff" className="dark:fill-blue-950/40" stroke="#bfdbfe" strokeWidth="1" />
        <text x="92.5" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8" className="dark:fill-blue-300">
          B) K-P-O-Gyík-Spock (5 × 5 = 25 eset)
        </text>

        <g transform="translate(15, 32)">
          <text x="0" y="18" fontSize="10" fill="#334155" className="dark:fill-slate-300">
            • 5 lehetséges választás fejenként.
          </text>
          <text x="0" y="34" fontSize="10" fill="#334155" className="dark:fill-slate-300">
            • Összes elemi eset: 5 · 5 = <tspan fontWeight="bold">25 eset</tspan>.
          </text>
          <text x="0" y="50" fontSize="10" fill="#334155" className="dark:fill-slate-300">
            • Döntetlen, ha mindketten ugyanazt
          </text>
          <text x="10" y="64" fontSize="9.5" fill="#64748b">
            mutatják (K-K, P-P, O-O, Gy-Gy, S-S): <tspan fontWeight="bold">5 db</tspan>.
          </text>
          <text x="0" y="80" fontSize="10" fill="#334155" className="dark:fill-slate-300">
            • 1. játékos nyer: 10 eset (40%)
          </text>
          <text x="0" y="94" fontSize="10" fill="#334155" className="dark:fill-slate-300">
            • 2. játékos nyer: 10 eset (40%)
          </text>
        </g>

        <text x="92.5" y="138" textAnchor="middle" fontSize="10.5" fontWeight="black" fill="#1e40af" className="dark:fill-blue-200">
          Döntetlen: 5/25 = 1/5 (20,0%)
        </text>
      </g>

      {/* Lenti tanulság */}
      <g transform="translate(30, 210)">
        <rect width="380" height="38" rx="8" fill="#f1f5f9" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="1" />
        <text x="190" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155" className="dark:fill-slate-200">
          💡 A döntetlen esélye 33,3%-ról 20%-ra csökken a kibővített játékban!
        </text>
        <text x="190" y="29" textAnchor="middle" fontSize="9.5" fill="#64748b" className="dark:fill-slate-400">
          Mindkét játék teljesen igazságos (fair), mivel a két fél győzelmi esélye hajszálpontosan megegyezik.
        </text>
      </g>
    </svg>
  );
};

/**
 * 3. Betűkártyák húzása visszatevés nélkül {A, E, M, Z}
 * Gráfos / fadiagramos fa: 4 x 3 = 12 kimenetel, ebből értelmes szó: AZ, EZ, MA (3/12 = 1/4)
 */
export const CardDrawTreeGraphSvg: React.FC<FigureProps> = ({ className = '', size = 320 }) => {
  return (
    <svg
      viewBox="0 0 440 250"
      className={`w-full h-auto max-w-[440px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="440" height="250" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="440" height="250" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="220" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        Betűkártyák {`{A; E; M; Z}`} húzása visszatevés nélkül
      </text>

      {/* 4 gyökérkártya (1. húzás) */}
      <g transform="translate(30, 42)">
        {/* A ág */}
        <g transform="translate(0, 0)">
          <rect width="85" height="30" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="42.5" y="20" textAnchor="middle" fontSize="12" fontWeight="black" fill="#3730a3">1. kártya: A</text>
          {/* 3 leágazás: E, M, Z */}
          <path d="M 42.5 30 L 15 55 M 42.5 30 L 42.5 55 M 42.5 30 L 70 55" stroke="#94a3b8" strokeWidth="1.2" />
          <text x="15" y="68" textAnchor="middle" fontSize="9" fill="#64748b">AE</text>
          <text x="42.5" y="68" textAnchor="middle" fontSize="9" fill="#64748b">AM</text>
          <rect x="58" y="57" width="24" height="15" rx="3" fill="#10b981" />
          <text x="70" y="68" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">AZ ★</text>
        </g>

        {/* E ág */}
        <g transform="translate(98, 0)">
          <rect width="85" height="30" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="42.5" y="20" textAnchor="middle" fontSize="12" fontWeight="black" fill="#3730a3">1. kártya: E</text>
          <path d="M 42.5 30 L 15 55 M 42.5 30 L 42.5 55 M 42.5 30 L 70 55" stroke="#94a3b8" strokeWidth="1.2" />
          <text x="15" y="68" textAnchor="middle" fontSize="9" fill="#64748b">EA</text>
          <text x="42.5" y="68" textAnchor="middle" fontSize="9" fill="#64748b">EM</text>
          <rect x="58" y="57" width="24" height="15" rx="3" fill="#10b981" />
          <text x="70" y="68" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">EZ ★</text>
        </g>

        {/* M ág */}
        <g transform="translate(196, 0)">
          <rect width="85" height="30" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="42.5" y="20" textAnchor="middle" fontSize="12" fontWeight="black" fill="#3730a3">1. kártya: M</text>
          <path d="M 42.5 30 L 15 55 M 42.5 30 L 42.5 55 M 42.5 30 L 70 55" stroke="#94a3b8" strokeWidth="1.2" />
          <rect x="3" y="57" width="24" height="15" rx="3" fill="#10b981" />
          <text x="15" y="68" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">MA ★</text>
          <text x="42.5" y="68" textAnchor="middle" fontSize="9" fill="#64748b">ME</text>
          <text x="70" y="68" textAnchor="middle" fontSize="9" fill="#64748b">MZ</text>
        </g>

        {/* Z ág */}
        <g transform="translate(294, 0)">
          <rect width="85" height="30" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="42.5" y="20" textAnchor="middle" fontSize="12" fontWeight="black" fill="#3730a3">1. kártya: Z</text>
          <path d="M 42.5 30 L 15 55 M 42.5 30 L 42.5 55 M 42.5 30 L 70 55" stroke="#94a3b8" strokeWidth="1.2" />
          <text x="15" y="68" textAnchor="middle" fontSize="9" fill="#64748b">ZA</text>
          <text x="42.5" y="68" textAnchor="middle" fontSize="9" fill="#64748b">ZE</text>
          <text x="70" y="68" textAnchor="middle" fontSize="9" fill="#64748b">ZM</text>
        </g>
      </g>

      {/* Számítás kártya lent */}
      <g transform="translate(30, 145)">
        <rect width="380" height="85" rx="12" fill="#ecfdf5" className="dark:fill-emerald-950/40" stroke="#a7f3d0" strokeWidth="1.2" />
        <text x="190" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#047857" className="dark:fill-emerald-300">
          Kombinatorikai modell és klasszikus valószínűség
        </text>
        <text x="16" y="42" fontSize="10" fill="#334155" className="dark:fill-slate-300">
          • Összes elemi kimenetel (visszatevés nélkül): 4 · 3 = <tspan fontWeight="bold">12 eset</tspan>.
        </text>
        <text x="16" y="58" fontSize="10" fill="#334155" className="dark:fill-slate-300">
          • Értelmes magyar kétbetűs szavak a kimenetelekből: <tspan fontWeight="bold" fill="#047857">AZ, EZ, MA</tspan> (3 kedvező eset).
        </text>
        <text x="190" y="76" textAnchor="middle" fontSize="12" fontWeight="black" fill="#065f46" className="dark:fill-emerald-200">
          P(értelmes szó) = 3 / 12 = 1 / 4 = 25%
        </text>
      </g>
    </svg>
  );
};


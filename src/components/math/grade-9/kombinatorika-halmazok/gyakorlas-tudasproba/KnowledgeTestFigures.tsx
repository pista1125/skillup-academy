import React from 'react';

/**
 * 1. Fejezeti Átfogó Mindmap / Összefoglaló Diagram
 * Kombinatorika és Halmazelmélet szimmetriája, kapcsolódási pontjai
 */
export const ChapterSummaryMindmapSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 220,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 180"
        style={{ width: size, height: (size * 180) / 240, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Háttér kártya */}
        <rect
          x="10"
          y="10"
          width="220"
          height="160"
          rx="14"
          className="fill-slate-50/80 dark:fill-slate-900/60 stroke-slate-300 dark:stroke-slate-700"
          strokeWidth="2"
        />

        {/* Középső I. Fejezet Badge */}
        <g transform="translate(120, 90)">
          <circle cx="0" cy="0" r="28" fill="#ef4444" className="shadow-lg" />
          <text x="0" y="-6" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">I. FEJEZET</text>
          <text x="0" y="8" textAnchor="middle" fill="#fee2e2" fontSize="7.5" fontWeight="bold">SZINTÉZIS</text>
        </g>

        {/* Bal felső ág: Kombinatorika */}
        <line x1="95" y1="75" x2="55" y2="45" stroke="#f87171" strokeWidth="2.5" strokeDasharray="3 2" />
        <rect x="18" y="25" width="74" height="28" rx="7" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" className="dark:fill-rose-950/60" />
        <text x="55" y="38" textAnchor="middle" fill="#991b1b" fontSize="8" fontWeight="black">Kombinatorika</text>
        <text x="55" y="48" textAnchor="middle" fill="#b91c1c" fontSize="6.5">n!, fadiagram, kódok</text>

        {/* Jobb felső ág: Gráfok */}
        <line x1="145" y1="75" x2="185" y2="45" stroke="#f87171" strokeWidth="2.5" strokeDasharray="3 2" />
        <rect x="148" y="25" width="74" height="28" rx="7" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" className="dark:fill-amber-950/60" />
        <text x="185" y="38" textAnchor="middle" fill="#92400e" fontSize="8" fontWeight="black">Gráfelmélet</text>
        <text x="185" y="48" textAnchor="middle" fill="#b45309" fontSize="6.5">∑d(v)=2e, n(n-1)/2</text>

        {/* Bal alsó ág: Halmazok */}
        <line x1="95" y1="105" x2="55" y2="135" stroke="#f87171" strokeWidth="2.5" strokeDasharray="3 2" />
        <rect x="18" y="125" width="74" height="28" rx="7" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" className="dark:fill-purple-950/60" />
        <text x="55" y="138" textAnchor="middle" fill="#5b21b6" fontSize="8" fontWeight="black">Halmazműveletek</text>
        <text x="55" y="148" textAnchor="middle" fill="#6d28d9" fontSize="6.5">∪, ∩, \, Ā, AΔB</text>

        {/* Jobb alsó ág: Szita & Intervallum */}
        <line x1="145" y1="105" x2="185" y2="135" stroke="#f87171" strokeWidth="2.5" strokeDasharray="3 2" />
        <rect x="148" y="125" width="74" height="28" rx="7" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" className="dark:fill-sky-950/60" />
        <text x="185" y="138" textAnchor="middle" fill="#075985" fontSize="8" fontWeight="black">Szita & Intervallum</text>
        <text x="185" y="148" textAnchor="middle" fill="#0284c7" fontSize="6.5">Venn 3, [a; b] ∩ ℤ</text>
      </svg>
    </div>
  );
};

/**
 * 2. Témazáró Szintű Három Halmazos Venn Szita
 * Számozott régiók: I, II, III, IV, V, VI, VII, VIII
 */
export const ExamVennSieveSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 200,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 200"
        style={{ width: size, height: (size * 200) / 240, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Alaphalmaz U */}
        <rect
          x="10"
          y="10"
          width="220"
          height="180"
          rx="12"
          className="fill-slate-50/70 dark:fill-slate-900/60 stroke-slate-300 dark:stroke-slate-700"
          strokeWidth="2"
        />
        <text x="24" y="28" className="fill-slate-400 font-bold text-[10px]">U</text>

        {/* 3 Kör */}
        <circle cx="90" cy="80" r="50" fill="#3b82f6" fillOpacity="0.22" stroke="#2563eb" strokeWidth="2" />
        <text x="56" y="58" fill="#1d4ed8" fontSize="12" fontWeight="900">A</text>

        <circle cx="150" cy="80" r="50" fill="#ec4899" fillOpacity="0.22" stroke="#db2777" strokeWidth="2" />
        <text x="184" y="58" fill="#be185d" fontSize="12" fontWeight="900">B</text>

        <circle cx="120" cy="128" r="50" fill="#10b981" fillOpacity="0.22" stroke="#059669" strokeWidth="2" />
        <text x="120" y="172" textAnchor="middle" fill="#047857" fontSize="12" fontWeight="900">C</text>

        {/* Régió jelölések */}
        <text x="75" y="75" fill="#1e3a8a" fontSize="8.5" fontWeight="bold">Csak A</text>
        <text x="165" y="75" fill="#831843" fontSize="8.5" fontWeight="bold">Csak B</text>
        <text x="120" y="148" textAnchor="middle" fill="#064e3b" fontSize="8.5" fontWeight="bold">Csak C</text>

        {/* Páros metszetek */}
        <text x="120" y="65" textAnchor="middle" fill="#4338ca" fontSize="7.5" fontWeight="bold">A∩B</text>
        <text x="96" y="112" textAnchor="middle" fill="#0f766e" fontSize="7.5" fontWeight="bold">A∩C</text>
        <text x="144" y="112" textAnchor="middle" fill="#9d174d" fontSize="7.5" fontWeight="bold">B∩C</text>

        {/* Középső hármas metszet mag */}
        <circle cx="120" cy="98" r="8" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
        <text x="120" y="101" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="black">∩</text>

        {/* Kívül eső elemek */}
        <text x="200" y="175" fill="#64748b" fontSize="7.5" fontWeight="bold">Egyik sem</text>
      </svg>
    </div>
  );
};

/**
 * 3. Gráfelmélet és Kézfogási Lemma Svg
 * ∑ d(v) = 2 · e és páratlan fokszámú csúcsok
 */
export const CompleteGraphKHandshakesSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 190,
  className = ''
}) => {
  // 5 csúcsú teljes gráf koordinátái
  const vertices = [
    { x: 100, y: 30, deg: '4' },
    { x: 165, y: 65, deg: '4' },
    { x: 145, y: 135, deg: '4' },
    { x: 55, y: 135, deg: '4' },
    { x: 35, y: 65, deg: '4' }
  ];

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 160"
        style={{ width: size, height: (size * 160) / 200, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Élek mind az 5 csúcs között: (5*4)/2 = 10 él */}
        {vertices.map((v1, i) =>
          vertices.slice(i + 1).map((v2, j) => (
            <line
              key={`${i}-${j}`}
              x1={v1.x}
              y1={v1.y}
              x2={v2.x}
              y2={v2.y}
              stroke="#cbd5e1"
              strokeWidth="1.7"
              className="dark:stroke-slate-700"
            />
          ))
        )}

        {/* Csúcsok */}
        {vertices.map((v, i) => (
          <g key={i}>
            <circle cx={v.x} cy={v.y} r="13" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <text x={v.x} y={v.y + 4} textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold">
              d={v.deg}
            </text>
          </g>
        ))}

        {/* Képlet Badge lent */}
        <g transform="translate(100, 148)">
          <rect x="-70" y="-8" width="140" height="16" rx="8" fill="#1e1b4b" />
          <text x="0" y="3.5" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
            ∑ d(v) = 2 · e = 20  ⟹  e = 10 él
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 4. Intervallumok és Számegyenes Műveletek
 * [a; b] ∩ [c; d] és kivonás
 */
export const IntervalSetIntersectionRulerSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 210,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 110"
        style={{ width: size, height: (size * 110) / 240, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Számegyenes főtengely */}
        <line x1="20" y1="65" x2="220" y2="65" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <polygon points="222,65 214,61 214,69" fill="#94a3b8" />

        {/* A intervallum: [-3; 2[ kék sáv fent */}
        <line x1="50" y1="45" x2="140" y2="45" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
        <circle cx="50" cy="45" r="4.5" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
        <circle cx="140" cy="45" r="4.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
        <text x="95" y="36" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="bold">A = [-3; 2[</text>

        {/* B intervallum: [0; 5] zöld sáv lent */}
        <line x1="105" y1="85" x2="195" y2="85" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
        <circle cx="105" cy="85" r="4.5" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
        <circle cx="195" cy="85" r="4.5" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
        <text x="150" y="100" textAnchor="middle" fill="#047857" fontSize="8" fontWeight="bold">B = [0; 5]</text>

        {/* Metszet kiemelése a tengelyen: [0; 2[ */}
        <rect x="105" y="60" width="35" height="10" rx="3" fill="#f59e0b" fillOpacity="0.6" stroke="#d97706" strokeWidth="1" />
        <text x="122.5" y="56" textAnchor="middle" fill="#b45309" fontSize="7.5" fontWeight="black">A ∩ B = [0; 2[</text>

        {/* Tengely osztások */}
        {[
          { x: 50, label: '-3' },
          { x: 105, label: '0' },
          { x: 140, label: '2' },
          { x: 195, label: '5' }
        ].map((pt, i) => (
          <g key={i}>
            <line x1={pt.x} y1="62" x2={pt.x} y2="68" stroke="#64748b" strokeWidth="1.5" />
            <text x={pt.x} y="78" textAnchor="middle" fill="#64748b" fontSize="7.5">{pt.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * 5. Kombinatorikus Döntési Fa / Sorbarendezés Svg
 * n! és szorzási szabály vizuális fája
 */
export const CountingPermutationTreeSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 190,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 120"
        style={{ width: size, height: (size * 120) / 200, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Gyökér pont */}
        <circle cx="20" cy="60" r="6" fill="#0f172a" />
        <text x="20" y="78" textAnchor="middle" fill="#64748b" fontSize="7.5">Kezdés</text>

        {/* 1. szint: 3 elágazás (A, B, C) */}
        <line x1="26" y1="60" x2="75" y2="25" stroke="#ef4444" strokeWidth="2" />
        <line x1="26" y1="60" x2="75" y2="60" stroke="#ef4444" strokeWidth="2" />
        <line x1="26" y1="60" x2="75" y2="95" stroke="#ef4444" strokeWidth="2" />

        <circle cx="75" cy="25" r="7" fill="#ef4444" />
        <text x="75" y="28.5" textAnchor="middle" fill="#fff" fontSize="7.5" fontWeight="bold">1.</text>
        <circle cx="75" cy="60" r="7" fill="#ef4444" />
        <text x="75" y="63.5" textAnchor="middle" fill="#fff" fontSize="7.5" fontWeight="bold">2.</text>
        <circle cx="75" cy="95" r="7" fill="#ef4444" />
        <text x="75" y="98.5" textAnchor="middle" fill="#fff" fontSize="7.5" fontWeight="bold">3.</text>

        {/* 2. szint: 2-2 ág mindegyikből */}
        <line x1="82" y1="25" x2="135" y2="15" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="82" y1="25" x2="135" y2="35" stroke="#f59e0b" strokeWidth="1.5" />

        <line x1="82" y1="60" x2="135" y2="50" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="82" y1="60" x2="135" y2="70" stroke="#f59e0b" strokeWidth="1.5" />

        <line x1="82" y1="95" x2="135" y2="85" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="82" y1="95" x2="135" y2="105" stroke="#f59e0b" strokeWidth="1.5" />

        {/* Levelek és számérték */}
        <g transform="translate(170, 60)">
          <rect x="-24" y="-20" width="48" height="40" rx="8" fill="#1e1b4b" />
          <text x="0" y="-4" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="bold">3 · 2 · 1</text>
          <text x="0" y="10" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="black">= 6</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 6. De Morgan és Komplementer Dualitás Svg
 * (A ∪ B)' = A' ∩ B' és (A ∩ B)' = A' ∪ B'
 */
export const DeMorganVennSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 190,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 220 120"
        style={{ width: size, height: (size * 120) / 220, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Alaphalmaz szürke háttér */}
        <rect x="10" y="10" width="200" height="100" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" className="dark:fill-purple-950/40" />

        {/* Két kör fehérre vágva */}
        <circle cx="80" cy="55" r="35" className="fill-white dark:fill-slate-900 stroke-purple-400" strokeWidth="1.5" />
        <circle cx="140" cy="55" r="35" className="fill-white dark:fill-slate-900 stroke-purple-400" strokeWidth="1.5" />

        <text x="65" y="58" fill="#6d28d9" fontSize="12" fontWeight="900">A</text>
        <text x="155" y="58" fill="#6d28d9" fontSize="12" fontWeight="900">B</text>

        {/* Badge */}
        <g transform="translate(110, 100)">
          <rect x="-56" y="-8" width="112" height="16" rx="8" fill="#581c87" />
          <text x="0" y="3.5" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
            (A ∪ B) = Ā ∩ B̄
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 7. Russell-Paradoxon és Logika Szimbólum
 * Összefoglaló pecsét / logikai mérleg
 */
export const RussellParadoxScaleSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 180,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 180 120"
        style={{ width: size, height: (size * 120) / 180, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Mérleg alap */}
        <line x1="90" y1="20" x2="90" y2="90" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        <polygon points="65,95 115,95 90,85" fill="#475569" />

        {/* Mérleg kar */}
        <line x1="30" y1="35" x2="150" y2="35" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        <circle cx="90" cy="35" r="5" fill="#ef4444" />

        {/* Bal serpenyő: X ∈ X */}
        <line x1="40" y1="35" x2="40" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="20" y="65" width="40" height="20" rx="5" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="40" y="78" textAnchor="middle" fill="#991b1b" fontSize="8" fontWeight="black">R ∈ R ?</text>

        {/* Jobb serpenyő: X ∉ X */}
        <line x1="140" y1="35" x2="140" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="120" y="65" width="40" height="20" rx="5" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="140" y="78" textAnchor="middle" fill="#991b1b" fontSize="8" fontWeight="black">R ∉ R ?</text>

        {/* Címke lent */}
        <g transform="translate(90, 110)">
          <rect x="-46" y="-7" width="92" height="14" rx="7" fill="#dc2626" />
          <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="bold">
            Russell-paradoxon
          </text>
        </g>
      </svg>
    </div>
  );
};

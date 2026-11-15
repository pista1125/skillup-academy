import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Geometriai leképezések hierarchiája (Venn-diagram: Leképezések ⊃ Transzformációk ⊃ Hasonlóságok ⊃ Egybevágóságok)
export const TransformationHierarchySvg: React.FC<FigureProps> = ({
  size = 320,
  className = ''
}) => {
  return (
    <svg
      viewBox="0 0 340 210"
      width={size}
      height={(size * 210) / 340}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="allMapGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="transGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0e7ff" />
          <stop offset="100%" stopColor="#c7d2fe" />
        </linearGradient>
        <linearGradient id="simGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="congGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dcfce7" />
          <stop offset="100%" stopColor="#bbf7d0" />
        </linearGradient>
      </defs>

      {/* Címke felül */}
      <rect x="50" y="6" width="240" height="20" rx="10" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
      <text x="170" y="20" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">
        A GEOMETRIAI HOZZÁRENDELÉSEK RENDSZERE
      </text>

      {/* 1. Legkülső: Geometriai hozzárendelések (Ponthalmaz -> Ponthalmaz, pl. vetítés) */}
      <rect x="15" y="32" width="310" height="170" rx="16" fill="url(#allMapGrad)" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="30" y="48" fill="#475569" fontSize="10" fontWeight="bold">
        Geometriai hozzárendelések (pl. merőleges vetítés, árnyék)
      </text>

      {/* 2. Középső külső: Geometriai transzformációk (kölcsönösen egyértelmű, sík -> sík) */}
      <rect x="35" y="56" width="270" height="136" rx="14" fill="url(#transGrad)" stroke="#818cf8" strokeWidth="1.5" />
      <text x="50" y="72" fill="#4338ca" fontSize="10" fontWeight="bold">
        Geometriai transzformációk (bijektív sík ↦ sík leképezések)
      </text>

      {/* 3. Belső: Hasonlósági transzformációk (aránytartó, szögtartó) */}
      <rect x="55" y="80" width="230" height="102" rx="12" fill="url(#simGrad)" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="70" y="96" fill="#b45309" fontSize="10" fontWeight="bold">
        Hasonlóságok (középpontos hasonlóság + egybevágóság)
      </text>

      {/* 4. Legbelső: Egybevágósági transzformációk (λ = 1, távolságtartó) */}
      <rect x="75" y="104" width="190" height="68" rx="10" fill="url(#congGrad)" stroke="#16a34a" strokeWidth="1.5" />
      <text x="170" y="122" fill="#15803d" fontSize="10" fontWeight="bold" textAnchor="middle">
        Egybevágóságok (λ = 1)
      </text>
      <text x="170" y="136" fill="#166534" fontSize="8.5" fontWeight="semibold" textAnchor="middle">
        Tükrözés (tengelyes/középpontos)
      </text>
      <text x="170" y="148" fill="#166534" fontSize="8.5" fontWeight="semibold" textAnchor="middle">
        Eltolás • Elforgatás
      </text>
      <text x="170" y="160" fill="#166534" fontSize="8" fontWeight="bold" textAnchor="middle">
        (Távolságtartó: |A'B'| = |AB|)
      </text>
    </svg>
  );
};

// 2. Merőleges vetítés egyenesre (Tankönyv 109-110. o.)
export const OrthogonalProjectionSvg: React.FC<FigureProps> = ({
  size = 320,
  className = ''
}) => {
  // e vetületi egyenes: y = 150
  const ey = 150;

  // 1. Ferde szakasz AB: A(40, 70), B(110, 100)
  // Vetülete: A'(40, 150), B'(110, 150)
  const a = { x: 40, y: 70 };
  const b = { x: 110, y: 100 };

  // 2. Merőleges szakasz CD: C(160, 60), D(160, 115)
  // Vetülete egyetlen pont: C'=D'(160, 150)
  const c = { x: 160, y: 60 };
  const d = { x: 160, y: 115 };

  // 3. Körvonal: középpont (250, 85), sugár r=30
  // Vetülete szakasz: [250-30, 250+30] = [220, 280] az e egyenesen!
  const circle = { cx: 250, cy: 85, r: 30 };

  return (
    <svg
      viewBox="0 0 340 210"
      width={size}
      height={(size * 210) / 340}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="projCircleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Címke */}
      <rect x="50" y="6" width="240" height="20" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1" />
      <text x="170" y="20" fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">
        MERŐLEGES VETÍTÉS AZ e EGYENESRE
      </text>

      {/* e vetületi egyenes */}
      <line x1="20" y1={ey} x2="320" y2={ey} stroke="#334155" strokeWidth="2" />
      <text x="325" y={ey + 4} fill="#1e293b" fontSize="11" fontWeight="black">e</text>

      {/* 1. AB szakasz és vetítése */}
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#0284c7" strokeWidth="2.5" />
      <circle cx={a.x} cy={a.y} r="3" fill="#0284c7" />
      <circle cx={b.x} cy={b.y} r="3" fill="#0284c7" />
      <text x={a.x - 12} y={a.y} fill="#0369a1" fontSize="10" fontWeight="bold">A</text>
      <text x={b.x + 6} y={b.y} fill="#0369a1" fontSize="10" fontWeight="bold">B</text>

      {/* Vetítővonalak A-ból és B-ből + magyar derékszögjel (negyedkörív + pont) */}
      <line x1={a.x} y1={a.y} x2={a.x} y2={ey} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />
      <path d={`M ${a.x} ${ey - 12} A 12 12 0 0 1 ${a.x + 12} ${ey}`} fill="none" stroke="#64748b" strokeWidth="1.2" />
      <circle cx={a.x + 4.8} cy={ey - 4.8} r="1.4" fill="#64748b" />
      <line x1={b.x} y1={b.y} x2={b.x} y2={ey} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />
      <path d={`M ${b.x - 12} ${ey} A 12 12 0 0 1 ${b.x} ${ey - 12}`} fill="none" stroke="#64748b" strokeWidth="1.2" />
      <circle cx={b.x - 4.8} cy={ey - 4.8} r="1.4" fill="#64748b" />

      {/* Vetület A'B' az e-n (piros vastag) */}
      <line x1={a.x} y1={ey} x2={b.x} y2={ey} stroke="#ef4444" strokeWidth="3.5" />
      <circle cx={a.x} cy={ey} r="3" fill="#ef4444" />
      <circle cx={b.x} cy={ey} r="3" fill="#ef4444" />
      <text x={a.x} y={ey + 15} fill="#dc2626" fontSize="9.5" fontWeight="bold" textAnchor="middle">A'</text>
      <text x={b.x} y={ey + 15} fill="#dc2626" fontSize="9.5" fontWeight="bold" textAnchor="middle">B'</text>
      <text x={(a.x + b.x) / 2} y={ey + 26} fill="#dc2626" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        |A'B'| ≤ |AB|
      </text>

      {/* 2. CD merőleges szakasz */}
      <line x1={c.x} y1={c.y} x2={d.x} y2={d.y} stroke="#059669" strokeWidth="2.5" />
      <circle cx={c.x} cy={c.y} r="3" fill="#059669" />
      <circle cx={d.x} cy={d.y} r="3" fill="#059669" />
      <text x={c.x - 12} y={c.y + 4} fill="#047857" fontSize="10" fontWeight="bold">C</text>
      <text x={d.x - 12} y={d.y + 4} fill="#047857" fontSize="10" fontWeight="bold">D</text>

      {/* Vetítővonal CD-ből (egybeesik vele) */}
      <line x1={c.x} y1={d.y} x2={c.x} y2={ey} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />

      {/* Vetület egyetlen pont! */}
      <circle cx={c.x} cy={ey} r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
      <text x={c.x} y={ey + 16} fill="#dc2626" fontSize="9.5" fontWeight="black" textAnchor="middle">
        C'=D' (pont!)
      </text>

      {/* 3. Körvonal */}
      <circle cx={circle.cx} cy={circle.cy} r={circle.r} fill="url(#projCircleGrad)" stroke="#7c3aed" strokeWidth="2" />
      <text x={circle.cx} y={circle.cy + 3} fill="#6d28d9" fontSize="10" fontWeight="bold" textAnchor="middle">Kör</text>

      {/* Érintő vetítővonalak a kör széleiről */}
      <line x1={circle.cx - circle.r} y1={circle.cy} x2={circle.cx - circle.r} y2={ey} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />
      <line x1={circle.cx + circle.r} y1={circle.cy} x2={circle.cx + circle.r} y2={ey} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />

      {/* Kör vetülete: átmérő hosszú szakasz */}
      <line x1={circle.cx - circle.r} y1={ey} x2={circle.cx + circle.r} y2={ey} stroke="#ef4444" strokeWidth="3.5" />
      <text x={circle.cx} y={ey + 16} fill="#dc2626" fontSize="9" fontWeight="bold" textAnchor="middle">
        szakasz (2r)
      </text>

      {/* Magyarázat alul */}
      <text x="170" y="198" fill="#64748b" fontSize="9" fontWeight="semibold" textAnchor="middle">
        A merőleges vetítés NEM távolságtartó: szakasz képe lehet pont, kör képe pedig szakasz!
      </text>
    </svg>
  );
};

// 3. Napóra sematikus működése (Párhuzamos vetítés a nap sugaraival, Tankönyv 108. o.)
export const SundialProjectionSvg: React.FC<FigureProps> = ({
  size = 320,
  className = ''
}) => {
  return (
    <svg
      viewBox="0 0 340 210"
      width={size}
      height={(size * 210) / 340}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
        <linearGradient id="dialPlaneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>

      {/* Címke */}
      <rect x="50" y="6" width="240" height="20" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" />
      <text x="170" y="20" fill="#b45309" fontSize="10" fontWeight="bold" textAnchor="middle">
        A NAPÓRA: PÁRHUZAMOS TÉRBELI VETÍTÉS
      </text>

      {/* Napkorong a bal felső sarokban */}
      <circle cx="45" cy="45" r="16" fill="url(#sunGrad)" stroke="#eab308" strokeWidth="1.5" />
      <text x="45" y="49" fill="#854d0e" fontSize="9" fontWeight="black" textAnchor="middle">Nap</text>

      {/* Napóralap (S sík) perspektívában */}
      <polygon points="60,175 280,175 310,135 120,135" fill="url(#dialPlaneGrad)" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="290" y="150" fill="#64748b" fontSize="10" fontWeight="bold">S sík</text>

      {/* Árnyékvető gnomon (ABC háromszög az S síkra állítva):
          BC az S síkon: B(140, 160), C(200, 150)
          A csúcs a levegőben: A(165, 80)
      */}
      <polygon points="140,160 200,150 165,80" fill="#38bdf8" fillOpacity="0.4" stroke="#0284c7" strokeWidth="2" />
      <circle cx="165" cy="80" r="3.5" fill="#0284c7" />
      <text x="165" y="72" fill="#0369a1" fontSize="10" fontWeight="black" textAnchor="middle">A (csúcs)</text>
      <text x="130" y="166" fill="#0369a1" fontSize="9" fontWeight="bold">B</text>
      <text x="206" y="154" fill="#0369a1" fontSize="9" fontWeight="bold">C</text>

      {/* Párhuzamos napsugarak a nap felől az A csúcson át */}
      <line x1="61" y1="45" x2="165" y2="80" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1="165" y1="80" x2="235" y2="155" stroke="#f59e0b" strokeWidth="1.5" />

      {/* A' árnyékpont a lapon */}
      <circle cx="235" cy="155" r="3.5" fill="#f59e0b" />
      <text x="245" y="160" fill="#b45309" fontSize="10" fontWeight="black">A' (árnyék)</text>

      {/* Vetült árnyékháromszög: A'BC az S síkon */}
      <polygon points="140,160 200,150 235,155" fill="#475569" fillOpacity="0.35" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Óraosztások a számlapon */}
      <line x1="190" y1="170" x2="200" y2="160" stroke="#64748b" strokeWidth="1" />
      <line x1="220" y1="170" x2="225" y2="160" stroke="#64748b" strokeWidth="1" />
      <line x1="250" y1="165" x2="250" y2="155" stroke="#64748b" strokeWidth="1" />
      <text x="195" y="180" fill="#64748b" fontSize="8" fontWeight="bold">10:00</text>
      <text x="225" y="180" fill="#64748b" fontSize="8" fontWeight="bold">11:00</text>
      <text x="255" y="175" fill="#64748b" fontSize="8" fontWeight="bold">12:00</text>

      {/* Alsó szöveg */}
      <text x="170" y="198" fill="#475569" fontSize="9" fontWeight="semibold" textAnchor="middle">
        A napsugarak iránya miatt az árnyék nem távolságtartó: BC közös, de az A'BC háromszög alakja változik!
      </text>
    </svg>
  );
};

// 4. Műszaki rajz 3 nézete (Elölnézet, Felülnézet, Oldalnézet - Kompetenciamérés feladat, Tankönyv 110. o.)
export const TechnicalDrawingViewsSvg: React.FC<FigureProps> = ({
  size = 320,
  className = ''
}) => {
  return (
    <svg
      viewBox="0 0 340 210"
      width={size}
      height={(size * 210) / 340}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="techBlockGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>

      {/* Címke */}
      <rect x="50" y="6" width="240" height="20" rx="10" fill="#f8fafc" stroke="#475569" strokeWidth="1" />
      <text x="170" y="20" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">
        MŰSZAKI VETÜLETEK: FELÜL-, ELÖL-, OLDALNÉZET
      </text>

      {/* 1. Doboz: Felülnézet (Top view) */}
      <g transform="translate(35, 45)">
        <rect x="0" y="0" width="75" height="50" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
        <rect x="0" y="0" width="75" height="25" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
        <rect x="0" y="25" width="40" height="25" fill="#7dd3fc" stroke="#0284c7" strokeWidth="1.5" />
        <text x="37" y="65" fill="#475569" fontSize="9.5" fontWeight="bold" textAnchor="middle">1. Felülnézet</text>
      </g>

      {/* 2. Doboz: Elölnézet (Front view) */}
      <g transform="translate(132, 45)">
        <rect x="0" y="0" width="75" height="50" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
        <polygon points="0,50 75,50 75,25 40,25 40,0 0,0" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" />
        <text x="37" y="65" fill="#475569" fontSize="9.5" fontWeight="bold" textAnchor="middle">2. Elölnézet</text>
      </g>

      {/* 3. Doboz: Oldalnézet (Side view) */}
      <g transform="translate(230, 45)">
        <rect x="0" y="0" width="75" height="50" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
        <polygon points="0,50 50,50 50,25 25,25 25,0 0,0" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
        <text x="37" y="65" fill="#475569" fontSize="9.5" fontWeight="bold" textAnchor="middle">3. Oldalnézet</text>
      </g>

      {/* Összefoglaló doboz alul */}
      <rect x="35" y="125" width="270" height="60" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <text x="170" y="142" fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle">
        Dimenziócsökkenés a vetületekben:
      </text>
      <text x="170" y="158" fill="#475569" fontSize="9" textAnchor="middle">
        3D térbeli test ↦ 2D síkbeli képek (Monge-féle képsíkok)
      </text>
      <text x="170" y="172" fill="#64748b" fontSize="8.5" textAnchor="middle">
        A vetületek egyenként nem bijektívek, de együtt egyértelműen meghatározzák a testet!
      </text>
    </svg>
  );
};

// 5. Fizikai alkalmazás: Erővektor vetülete az elmozdulás egyenesére (Tankönyv 111. o. 4. feladat)
export const VectorWorkProjectionSvg: React.FC<FigureProps> = ({
  size = 320,
  className = ''
}) => {
  return (
    <svg
      viewBox="0 0 340 210"
      width={size}
      height={(size * 210) / 340}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      {/* Címke */}
      <rect x="50" y="6" width="240" height="20" rx="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="1" />
      <text x="170" y="20" fill="#dc2626" fontSize="10" fontWeight="bold" textAnchor="middle">
        FIZIKAI ALKALMAZÁS: W = F_∥ · s = F · s · cos(α)
      </text>

      {/* Elmozdulás egyenese (piros vastag) vízszintesen */}
      <line x1="40" y1="130" x2="300" y2="130" stroke="#ef4444" strokeWidth="2.2" />
      <polygon points="295,126 305,130 295,134" fill="#ef4444" />
      <text x="270" y="122" fill="#dc2626" fontSize="10" fontWeight="bold">elmozdulás (s)</text>

      {/* Kiindulási pont A(70, 130) */}
      <circle cx="70" cy="130" r="4.5" fill="#1e293b" />
      <text x="56" y="134" fill="#1e293b" fontSize="11" fontWeight="bold">A</text>

      {/* Erővektor F ferdén: A(70, 130) -> (210, 60) */}
      <line x1="70" y1="130" x2="210" y2="60" stroke="#0284c7" strokeWidth="2.5" />
      <polygon points="204,56 215,57 210,68" fill="#0284c7" />
      <text x="145" y="80" fill="#0369a1" fontSize="12" fontWeight="black">F vektor</text>

      {/* Merőleges vetítővonal F végéből az elmozdulás egyenesére */}
      <line x1="210" y1="60" x2="210" y2="130" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Derékszög jele a vetületnél (negyedkörív és pont) */}
      <path d="M 196 130 A 14 14 0 0 1 210 116" fill="none" stroke="#64748b" strokeWidth="1.4" />
      <circle cx="204.5" cy="124.5" r="1.6" fill="#64748b" />

      {/* Hatásos erővektor vetület: F_∥ = F cos(α) zölddel az elmozdulás egyenesén */}
      <line x1="70" y1="130" x2="210" y2="130" stroke="#16a34a" strokeWidth="4" />
      <polygon points="202,125 212,130 202,135" fill="#16a34a" />
      <text x="140" y="148" fill="#15803d" fontSize="10" fontWeight="black" textAnchor="middle">
        F_∥ = F · cos(α) (vetület)
      </text>

      {/* Szögív α az A pont körül */}
      <path d="M 105 130 A 35 35 0 0 0 98 116" stroke="#f59e0b" strokeWidth="2" fill="none" />
      <text x="112" y="122" fill="#b45309" fontSize="10" fontWeight="bold">α</text>

      {/* Alsó szöveg */}
      <text x="170" y="185" fill="#475569" fontSize="9.5" fontWeight="semibold" textAnchor="middle">
        Csak az erő elmozdulás irányú merőleges vetülete végez mechanikai munkát!
      </text>
    </svg>
  );
};


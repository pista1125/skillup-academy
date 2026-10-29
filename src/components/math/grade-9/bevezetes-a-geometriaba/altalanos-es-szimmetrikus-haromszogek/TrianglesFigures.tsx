import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Háromszögek csoportosítása oldalak és szögek szerint
export const TriangleClassificationSvg: React.FC<FigureProps> = ({ size = 300, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 230"
      width={size}
      height={size * 0.6}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="220" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 1. Hegyesszögű háromszög */}
      <g transform="translate(15, 25)">
        <polygon points="45,15 15,75 80,75" fill="rgba(37, 99, 235, 0.12)" stroke="#2563eb" strokeWidth="2" />
        <text x="47" y="93" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#1e40af">Hegyesszögű</text>
        <text x="47" y="105" fontSize="9" textAnchor="middle" fill="#64748b">minden szög &lt; 90°</text>
      </g>

      {/* 2. Derékszögű háromszög (magyar szabvány negyedkörívvel és belső ponttal) */}
      <g transform="translate(135, 25)">
        <polygon points="15,15 15,75 85,75" fill="rgba(5, 150, 105, 0.12)" stroke="#059669" strokeWidth="2" />
        {/* Derékszög jelölése magyar konvencióval: (29, 75)-ből (15, 61)-be, sweep=0 (kifelé ível) */}
        <path d="M 29 75 A 14 14 0 0 0 15 61" fill="none" stroke="#059669" strokeWidth="1.5" />
        <circle cx="21" cy="69" r="1.5" fill="#059669" />
        <text x="50" y="93" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#065f46">Derékszögű</text>
        <text x="50" y="105" fontSize="9" textAnchor="middle" fill="#64748b">egy szög = 90°</text>
      </g>

      {/* 3. Tompaszögű háromszög: Csúcsok: C(18, 38), A(42, 75) tompaszögű csúcs, B(100, 75) */}
      <g transform="translate(255, 25)">
        <polygon points="18,38 42,75 100,75" fill="rgba(217, 119, 6, 0.12)" stroke="#d97706" strokeWidth="2" />
        {/* Tompaszög ív A(42, 75)-nél: (42+18, 75) = (60, 75)-től a CA szárig: unit vector CA=(-24,-37)/44.1 = (-0.544, -0.839)
            r=18 esetén: (42 - 18*0.544, 75 - 18*0.839) = (32.2, 59.9). Sweep=0 (kifelé ível a szárak közé). */}
        <path d="M 60 75 A 18 18 0 0 0 32.2 59.9" fill="none" stroke="#d97706" strokeWidth="1.5" />
        <text x="58" y="93" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#92400e">Tompaszögű</text>
        <text x="58" y="105" fontSize="9" textAnchor="middle" fill="#64748b">egy szög &gt; 90°</text>
      </g>

      {/* Alsó sor: Oldalak szerint */}
      {/* 4. Egyenlő szárú háromszög */}
      <g transform="translate(60, 122)">
        <polygon points="50,15 15,65 85,65" fill="rgba(124, 58, 237, 0.12)" stroke="#7c3aed" strokeWidth="2" />
        {/* Szárak jelölése vonallal */}
        <line x1="30" y1="38" x2="35" y2="42" stroke="#7c3aed" strokeWidth="2" />
        <line x1="65" y1="38" x2="70" y2="42" stroke="#7c3aed" strokeWidth="2" />
        <text x="50" y="82" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#5b21b6">Egyenlő szárú</text>
        <text x="50" y="94" fontSize="9" textAnchor="middle" fill="#64748b">a = b (alapi szögek =)</text>
      </g>

      {/* 5. Szabályos háromszög */}
      <g transform="translate(210, 122)">
        <polygon points="50,15 18,70 82,70" fill="rgba(225, 29, 72, 0.12)" stroke="#e11d48" strokeWidth="2" />
        {/* 3 egyenlő oldal jelölése */}
        <line x1="32" y1="40" x2="36" y2="45" stroke="#e11d48" strokeWidth="1.8" />
        <line x1="64" y1="40" x2="68" y2="45" stroke="#e11d48" strokeWidth="1.8" />
        <line x1="48" y1="68" x2="52" y2="72" stroke="#e11d48" strokeWidth="1.8" />
        <text x="50" y="82" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#9f1239">Szabályos</text>
        <text x="50" y="94" fontSize="9" textAnchor="middle" fill="#64748b">a = b = c (minden szög 60°)</text>
      </g>
    </svg>
  );
};

// 2. Háromszög-egyenlőtlenség szemléltető ábra
export const TriangleInequalitySvg: React.FC<FigureProps> = ({ size = 300, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.52}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="190" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Bal oldal: Érvényes háromszög (a + b > c) */}
      <g transform="translate(20, 25)">
        <polygon points="75,25 15,95 145,95" fill="rgba(16, 185, 129, 0.15)" stroke="#059669" strokeWidth="2.5" />
        <text x="35" y="55" fontSize="11" fontWeight="bold" fill="#047857">a = 5</text>
        <text x="115" y="55" fontSize="11" fontWeight="bold" fill="#047857">b = 6</text>
        <text x="80" y="112" fontSize="11" fontWeight="bold" fill="#047857" textAnchor="middle">c = 7</text>

        <rect x="15" y="125" width="130" height="26" rx="6" fill="#ecfdf5" stroke="#a7f3d0" />
        <text x="80" y="142" fontSize="11" fontWeight="bold" fill="#065f46" textAnchor="middle">
          5 + 6 &gt; 7  ✓ LÉTEZIK
        </text>
      </g>

      <line x1="190" y1="20" x2="190" y2="180" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Jobb oldal: Érvénytelen (a + b <= c, nem érnek össze) */}
      <g transform="translate(210, 25)">
        {/* Alap c = 9 */}
        <line x1="15" y1="95" x2="145" y2="95" stroke="#dc2626" strokeWidth="3" />
        {/* Oldal a = 3 fekve */}
        <line x1="15" y1="95" x2="55" y2="65" stroke="#ef4444" strokeWidth="2.5" />
        {/* Oldal b = 4 fekve */}
        <line x1="145" y1="95" x2="95" y2="70" stroke="#ef4444" strokeWidth="2.5" />

        {/* Körívek a csúcsok körül, hogy nem metszik egymást */}
        <path d="M 55 65 A 45 45 0 0 1 60 95" fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="2 2" />
        <path d="M 95 70 A 55 55 0 0 0 90 95" fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="2 2" />

        <text x="25" y="70" fontSize="11" fontWeight="bold" fill="#b91c1c">a = 3</text>
        <text x="125" y="75" fontSize="11" fontWeight="bold" fill="#b91c1c">b = 4</text>
        <text x="80" y="112" fontSize="11" fontWeight="bold" fill="#b91c1c" textAnchor="middle">c = 9</text>

        <rect x="15" y="125" width="130" height="26" rx="6" fill="#fef2f2" stroke="#fecaca" />
        <text x="80" y="142" fontSize="11" fontWeight="bold" fill="#991b1b" textAnchor="middle">
          3 + 4 &lt; 9  ✗ NEM LÉTEZIK
        </text>
      </g>
    </svg>
  );
};

// 3. Háromszög belső és külső szögeinek tétele
export const TriangleAnglesSvg: React.FC<FigureProps> = ({ size = 300, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.52}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="190" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Háromszög csúcsai: A(40, 140), B(240, 140), C(140, 45) */}
      <polygon points="40,140 240,140 140,45" fill="rgba(37, 99, 235, 0.08)" stroke="#1e293b" strokeWidth="2.5" />

      {/* Meghosszabbított alap B-nél a külső szöghöz */}
      <line x1="240" y1="140" x2="310" y2="140" stroke="#64748b" strokeWidth="2" strokeDasharray="4 3" />

      {/* C csúcson átmenő párhuzamos az AB alappal (bizonyítás) */}
      <line x1="70" y1="45" x2="230" y2="45" stroke="#3b82f6" strokeWidth="1.8" strokeDasharray="4 3" />
      <text x="235" y="49" fontSize="10" fontStyle="italic" fill="#2563eb">e ∥ AB</text>

      {/* Alfa szög A-nál: (68, 140)-től (60.3, 120.7)-ig a CA szárra, sweep=0 */}
      <path d="M 68 140 A 28 28 0 0 0 60.3 120.7" fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x="72" y="134" fontSize="12" fontWeight="bold" fill="#1d4ed8">α</text>

      {/* Váltószög C bal oldalán (alfa): bal oldali párhuzamos ray(116, 45) és CA ray(122.6, 61.5) között, sweep=0 */}
      <path d="M 116 45 A 24 24 0 0 0 122.6 61.5" fill="none" stroke="#2563eb" strokeWidth="1.8" />
      <text x="96" y="42" fontSize="11" fontWeight="bold" fill="#1d4ed8">α</text>

      {/* Gamma szög C-nél: CA ray(121.1, 62.9) és CB ray(158.9, 62.9) között, sweep=0 */}
      <path d="M 121.1 62.9 A 26 26 0 0 0 158.9 62.9" fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x="136" y="76" fontSize="12" fontWeight="bold" fill="#6d28d9">γ</text>

      {/* Béta szög B-nél: BA ray(212, 140) és BC ray(219.7, 120.7) között, sweep=1 */}
      <path d="M 212 140 A 28 28 0 0 1 219.7 120.7" fill="none" stroke="#f59e0b" strokeWidth="2" />
      <text x="204" y="134" fontSize="12" fontWeight="bold" fill="#d97706">β</text>

      {/* Váltószög C jobb oldalán (béta): CB ray(157.4, 61.5) és jobb oldali párhuzamos ray(164, 45) között, sweep=0 */}
      <path d="M 157.4 61.5 A 24 24 0 0 0 164 45" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
      <text x="172" y="42" fontSize="11" fontWeight="bold" fill="#d97706">β</text>

      {/* Külső szög B-nél (béta'): BC ray(221.1, 122.1)-ről indul és pontosan a vízszintes meghosszabbításig(266, 140) tart, sweep=1 */}
      <path d="M 221.1 122.1 A 26 26 0 0 1 266 140" fill="none" stroke="#e11d48" strokeWidth="2" />
      <text x="274" y="128" fontSize="12" fontWeight="bold" fill="#be123c">β'</text>

      {/* Magyarázó kártya alul */}
      <g transform="translate(40, 158)">
        <text x="0" y="15" fontSize="11" fontWeight="bold" fill="#1e293b">Belső szögek összege:</text>
        <text x="135" y="15" fontSize="11" fontWeight="bold" fill="#2563eb">α + β + γ = 180°</text>

        <text x="0" y="30" fontSize="11" fontWeight="bold" fill="#1e293b">Külső szög tétele:</text>
        <text x="135" y="30" fontSize="11" fontWeight="bold" fill="#be123c">β' = α + γ  (és  β + β' = 180°)</text>
      </g>
    </svg>
  );
};

// 4. Egyenlő szárú és szabályos háromszög szimmetriái
export const IsoscelesAndEquilateralSvg: React.FC<FigureProps> = ({ size = 300, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.52}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="190" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Bal: Egyenlő szárú háromszög */}
      <g transform="translate(15, 20)">
        <polygon points="85,15 25,120 145,120" fill="rgba(124, 58, 237, 0.1)" stroke="#7c3aed" strokeWidth="2.5" />
        {/* Szimmetriatengely (magasságvonal, szögfelező) */}
        <line x1="85" y1="10" x2="85" y2="130" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 3" />
        {/* Talpponti derékszög magyar konvencióval */}
        <path d="M 85 110 A 10 10 0 0 1 95 120" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <circle cx="89" cy="116" r="1.2" fill="#e11d48" />

        {/* Alapi szögek jelölése pontosan a szárakhoz érve */}
        <path d="M 47 120 A 22 22 0 0 0 35.9 100.9" fill="none" stroke="#7c3aed" strokeWidth="2" />
        <text x="48" y="114" fontSize="11" fontWeight="bold" fill="#6d28d9">α</text>

        <path d="M 123 120 A 22 22 0 0 1 134.1 100.9" fill="none" stroke="#7c3aed" strokeWidth="2" />
        <text x="114" y="114" fontSize="11" fontWeight="bold" fill="#6d28d9">α</text>

        {/* Feliratok */}
        <text x="85" y="148" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#5b21b6">Egyenlő szárú háromszög</text>
        <text x="85" y="162" fontSize="9" textAnchor="middle" fill="#64748b">1 szimmetriatengely (m = f = s)</text>
      </g>

      <line x1="190" y1="20" x2="190" y2="180" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Jobb: Szabályos háromszög */}
      <g transform="translate(205, 20)">
        <polygon points="85,15 25,120 145,120" fill="rgba(37, 99, 235, 0.1)" stroke="#2563eb" strokeWidth="2.5" />
        {/* 3 szimmetriatengely */}
        <line x1="85" y1="8" x2="85" y2="128" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="20" y1="123" x2="115" y2="67" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="150" y1="123" x2="55" y2="67" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Szögek 60° */}
        <text x="48" y="112" fontSize="9" fontWeight="bold" fill="#1d4ed8">60°</text>
        <text x="108" y="112" fontSize="9" fontWeight="bold" fill="#1d4ed8">60°</text>
        <text x="80" y="42" fontSize="9" fontWeight="bold" fill="#1d4ed8">60°</text>

        {/* Feliratok */}
        <text x="85" y="148" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#1e40af">Szabályos háromszög</text>
        <text x="85" y="162" fontSize="9" textAnchor="middle" fill="#64748b">3 szimmetriatengely (minden szög 60°)</text>
      </g>
    </svg>
  );
};

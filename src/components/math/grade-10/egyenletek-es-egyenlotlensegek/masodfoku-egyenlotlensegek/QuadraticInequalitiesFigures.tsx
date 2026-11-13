import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. D > 0 eset: 2 valós zérushely (kívül pozitív, között negatív)
export const ParabolaCasesDgt0Svg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 185"
      width={size}
      height={(size * 185) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="pcdgt0ParabolaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="pcdgt0NegShade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0.25" />
        </linearGradient>
        <filter id="pcdgt0Glow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#1e3a8a" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Háttér kártya */}
      <rect x="0" y="0" width="320" height="185" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Címke felül */}
        <rect x="36" y="8" width="248" height="18" rx="4" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
        <text x="160" y="20.5" fill="#1e40af" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.4">
          D &gt; 0 és a &gt; 0: KÉT ZÉRUSHELY (x₁ és x₂)
        </text>

        {/* Negatív tartomány satírozása (x1 és x2 között, a tengely alatt) */}
        {/* Pontos sub-Bézier a parabola x1 (100, 100) és x2 (220, 100) közötti ívén: Q (160, 172) */}
        <path
          d="M 100 100 Q 160 172 220 100 Z"
          fill="url(#pcdgt0NegShade)"
        />

        {/* x-tengely */}
        <line x1="20" y1="100" x2="294" y2="100" stroke="#64748b" strokeWidth="1.5" />
        <polygon points="298,100 290,97 290,103" fill="#64748b" />
        <text x="302" y="103" fill="#475569" fontSize="9" fontWeight="bold" fontFamily="monospace">x</text>

        {/* Parabola: Y(X) = 136 - 0.01*(X - 160)^2 -> Pontos Bézier Q (160, 236) */}
        <path
          d="M 60 36 Q 160 236 260 36"
          stroke="url(#pcdgt0ParabolaGrad)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Görbe felirat */}
        <rect x="68" y="24" width="76" height="13" rx="3" fill="#ffffff" stroke="#bfdbfe" strokeWidth="0.8" />
        <text x="106" y="33.5" fill="#1e40af" fontSize="7" fontWeight="bold" textAnchor="middle">f(x) = ax² + bx + c</text>

        {/* > 0 zöld sávok (kívül) */}
        <g filter="url(#pcdgt0Glow)">
          <rect x="25" y="46" width="68" height="16" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
          <text x="59" y="57.5" fill="#15803d" fontSize="7.5" fontWeight="900" textAnchor="middle">+ (KÍVÜL: &gt; 0)</text>

          <rect x="227" y="46" width="68" height="16" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
          <text x="261" y="57.5" fill="#15803d" fontSize="7.5" fontWeight="900" textAnchor="middle">+ (KÍVÜL: &gt; 0)</text>
        </g>

        {/* < 0 sárga/narancs sáv (között) */}
        <g filter="url(#pcdgt0Glow)">
          <rect x="115" y="140" width="90" height="16" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
          <text x="160" y="151.5" fill="#b45309" fontSize="7.5" fontWeight="900" textAnchor="middle">- (KÖZÖTT: &lt; 0)</text>
        </g>

          {/* Két zérushely pont - MATEMATIKAILAG 100% PONTOSAN A GÖRBÉN ÉS TENGELYEN */}
          {/* x1 (100; 100) */}
          <circle cx="100" cy="100" r="7" fill="#2563eb" fillOpacity="0.2" />
          <circle cx="100" cy="100" r="4.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
          <circle cx="100" cy="100" r="1.5" fill="#2563eb" />
          <rect x="88" y="108" width="24" height="14" rx="3" fill="#ffffff" stroke="#93c5fd" strokeWidth="0.8" />
          <text x="100" y="118.5" fill="#1e40af" fontSize="8" fontWeight="900" textAnchor="middle">x₁</text>

          {/* x2 (220; 100) */}
          <circle cx="220" cy="100" r="7" fill="#2563eb" fillOpacity="0.2" />
          <circle cx="220" cy="100" r="4.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
          <circle cx="220" cy="100" r="1.5" fill="#2563eb" />
          <rect x="208" y="108" width="24" height="14" rx="3" fill="#ffffff" stroke="#93c5fd" strokeWidth="0.8" />
          <text x="220" y="118.5" fill="#1e40af" fontSize="8" fontWeight="900" textAnchor="middle">x₂</text>

          {/* Magyarázat alul */}
          <rect x="15" y="162" width="290" height="17" rx="3.5" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.8" />
          <text x="160" y="173.5" fill="#334155" fontSize="7.5" fontWeight="bold" textAnchor="middle">
            f(x) &gt; 0 ⟹ x ∈ ]-∞; x₁[ ∪ ]x₂; ∞[  &nbsp;|&nbsp;  f(x) &lt; 0 ⟹ x ∈ ]x₁; x₂[
          </text>
        </svg>
        );
};

        // 2. D = 0 eset: 1 zérushely (érinti az x-tengelyt)
        export const ParabolaCasesDeq0Svg: React.FC<FigureProps> = ({size = 250, className = ''}) => {
  return (
          <svg
            viewBox="0 0 320 175"
            width={size}
            height={(size * 175) / 320}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`max-w-full h-auto select-none ${className}`}
          >
            <defs>
              <linearGradient id="pcdeq0Grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <filter id="pcdeq0Glow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#1e3a8a" floodOpacity="0.12" />
              </filter>
            </defs>

              <rect x="0" y="0" width="320" height="175" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

              {/* Címke felül */}
              <rect x="30" y="8" width="260" height="18" rx="4" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
              <text x="160" y="20.5" fill="#1e40af" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.3">
                D = 0 és a &gt; 0: ÉRINTI A TENGELYT (x₀ KETTŐS GYÖK)
              </text>

              {/* x-tengely: pontosan a vertex magasságában (y = 115) */}
              <line x1="20" y1="115" x2="294" y2="115" stroke="#64748b" strokeWidth="1.5" />
              <polygon points="298,115 290,112 290,118" fill="#64748b" />
              <text x="302" y="118" fill="#475569" fontSize="9" fontWeight="bold" fontFamily="monospace">x</text>

              {/* Parabola: csúcspont (160, 115) -> pontos Bézier Q (160, 196), végpontok (70, 34) és (250, 34) */}
              <path
                d="M 70 34 Q 160 196 250 34"
                stroke="url(#pcdeq0Grad)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Pozitív feliratok mindkét szárnyon */}
              <g filter="url(#pcdeq0Glow)">
                <rect x="85" y="55" width="54" height="15" rx="3.5" fill="#dcfce7" stroke="#16a34a" strokeWidth="0.8" />
                <text x="112" y="65.5" fill="#15803d" fontSize="7.5" fontWeight="900" textAnchor="middle">+ f(x) &gt; 0</text>

                <rect x="181" y="55" width="54" height="15" rx="3.5" fill="#dcfce7" stroke="#16a34a" strokeWidth="0.8" />
                <text x="208" y="65.5" fill="#15803d" fontSize="7.5" fontWeight="900" textAnchor="middle">+ f(x) &gt; 0</text>
              </g>

              {/* Érintési pont (160; 115) - TŰPONTOSAN A CSÚCSON ÉS A TENGELYEN */}
              <circle cx="160" cy="115" r="7" fill="#2563eb" fillOpacity="0.25" />
              <circle cx="160" cy="115" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="160" cy="115" r="1.5" fill="#ffffff" />
              <rect x="146" y="123" width="28" height="14" rx="3" fill="#ffffff" stroke="#93c5fd" strokeWidth="0.8" />
              <text x="160" y="133.5" fill="#1e40af" fontSize="8" fontWeight="900" textAnchor="middle">x₀</text>

              {/* Magyarázó doboz alul */}
                <rect x="15" y="148" width="290" height="20" rx="3.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <text x="160" y="161" fill="#334155" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  f(x) ≥ 0: x ∈ ℝ  &nbsp;|&nbsp;  f(x) &gt; 0: ℝ \ &#123;x₀&#125;  &nbsp;|&nbsp;  f(x) ≤ 0: x = x₀  &nbsp;|&nbsp;  f(x) &lt; 0: M = ∅
                </text>
              </svg>
              );
};

// 3. D < 0 eset: Lebeg a tengely felett (nincs zérushely)
              export const ParabolaCasesDlt0Svg: React.FC<FigureProps> = ({size = 250, className = ''}) => {
  return (
                <svg
                  viewBox="0 0 320 175"
                  width={size}
                  height={(size * 175) / 320}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`max-w-full h-auto select-none ${className}`}
                >
                  <defs>
                    <linearGradient id="pcdlt0Grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                    <linearGradient id="pcdlt0FloatingShade" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#dcfce7" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#dcfce7" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                    <rect x="0" y="0" width="320" height="175" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

                    {/* Címke felül */}
                    <rect x="25" y="8" width="270" height="18" rx="4" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
                    <text x="160" y="20.5" fill="#1e40af" fontSize="8.5" fontWeight="900" textAnchor="middle" letterSpacing="0.2">
                      D &lt; 0 és a &gt; 0: LEBEG A TENGELY FELETT (NINCS METSZÉSPONT)
                    </text>

                    {/* x-tengely lenn (y = 125) */}
                    <line x1="20" y1="125" x2="294" y2="125" stroke="#64748b" strokeWidth="1.5" />
                    <polygon points="298,125 290,122 290,128" fill="#64748b" />
                    <text x="302" y="128" fill="#475569" fontSize="9" fontWeight="bold" fontFamily="monospace">x</text>

                    {/* Halvány zöld kitöltés a parabola alatt (lebegés érzékeltetése) */}
                    <path
                      d="M 90 36 Q 160 134 230 36 L 230 125 L 90 125 Z"
                      fill="url(#pcdlt0FloatingShade)"
                    />

                    {/* Parabola: csúcspont (160, 85) -> 40 px a tengely felett lebeg */}
                    <path
                      d="M 90 36 Q 160 134 230 36"
                      stroke="url(#pcdlt0Grad)"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />

                      {/* Csúcspont jelzés */}
                      <circle cx="160" cy="85" r="4" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                      <text x="160" y="78" fill="#1e40af" fontSize="7" fontWeight="bold" textAnchor="middle">Minimum pont</text>

                      {/* Kiemelt "MINDENÜTT POZITÍV" szalag a lebegő részen */}
                      <rect x="75" y="94" width="170" height="18" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                      <text x="160" y="106.5" fill="#15803d" fontSize="8" fontWeight="900" textAnchor="middle">
                        MINDENÜTT POZITÍV: f(x) &gt; 0
                      </text>

                        {/* Magyarázó sáv alul */}
                        <rect x="15" y="148" width="290" height="20" rx="3.5" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
                        <text x="160" y="161.5" fill="#166534" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                          f(x) &gt; 0 megoldása: M = ℝ (Teljes ℝ)  &nbsp;|&nbsp;  f(x) &lt; 0 megoldása: M = ∅ (Üres halmaz)
                        </text>
                      </svg>
                      );
};

                      // 4. Előjeltáblázat szorzathoz: (x - 1)(x - 4) > 0
                      export const SignTableChartSvg: React.FC<FigureProps> = ({size = 260, className = ''}) => {
  return (
                        <svg
                          viewBox="0 0 320 155"
                          width={size}
                          height={(size * 155) / 320}
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`max-w-full h-auto select-none ${className}`}
                        >
                            <rect x="6" y="6" width="308" height="143" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />

                            {/* Cím */}
                            <rect x="30" y="10" width="260" height="16" rx="3.5" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="0.8" />
                            <text x="160" y="21.5" fill="#1e40af" fontSize="8.5" fontWeight="900" textAnchor="middle">
                              ELŐJELTÁBLÁZAT: (x - 1)(x - 4) &gt; 0
                            </text>

                            {/* Fejléc sor */}
                            <rect x="14" y="32" width="76" height="22" fill="#f1f5f9" rx="3" />
                            <text x="52" y="46.5" fill="#334155" fontSize="8" fontWeight="bold" textAnchor="middle">Tényező</text>

                            <rect x="94" y="32" width="62" height="22" fill="#f1f5f9" rx="3" />
                            <text x="125" y="46.5" fill="#334155" fontSize="8" fontWeight="bold" textAnchor="middle">x &lt; 1</text>

                            <rect x="160" y="32" width="70" height="22" fill="#f1f5f9" rx="3" />
                            <text x="195" y="46.5" fill="#334155" fontSize="8" fontWeight="bold" textAnchor="middle">1 &lt; x &lt; 4</text>

                            <rect x="234" y="32" width="72" height="22" fill="#f1f5f9" rx="3" />
                            <text x="270" y="46.5" fill="#334155" fontSize="8" fontWeight="bold" textAnchor="middle">x &gt; 4</text>

                            {/* Sor 1: (x - 1) */}
                            <line x1="14" y1="58" x2="306" y2="58" stroke="#e2e8f0" />
                            <text x="52" y="73" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">(x - 1)</text>

                            <rect x="110" y="63" width="30" height="16" rx="3" fill="#fee2e2" />
                            <text x="125" y="75" fill="#dc2626" fontSize="10" fontWeight="900" textAnchor="middle">-</text>

                            <rect x="180" y="63" width="30" height="16" rx="3" fill="#dcfce7" />
                            <text x="195" y="75" fill="#16a34a" fontSize="10" fontWeight="900" textAnchor="middle">+</text>

                            <rect x="255" y="63" width="30" height="16" rx="3" fill="#dcfce7" />
                            <text x="270" y="75" fill="#16a34a" fontSize="10" fontWeight="900" textAnchor="middle">+</text>

                            {/* Sor 2: (x - 4) */}
                            <line x1="14" y1="84" x2="306" y2="84" stroke="#e2e8f0" />
                            <text x="52" y="99" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">(x - 4)</text>

                            <rect x="110" y="89" width="30" height="16" rx="3" fill="#fee2e2" />
                            <text x="125" y="101" fill="#dc2626" fontSize="10" fontWeight="900" textAnchor="middle">-</text>

                            <rect x="180" y="89" width="30" height="16" rx="3" fill="#fee2e2" />
                            <text x="195" y="101" fill="#dc2626" fontSize="10" fontWeight="900" textAnchor="middle">-</text>

                            <rect x="255" y="89" width="30" height="16" rx="3" fill="#dcfce7" />
                            <text x="270" y="101" fill="#16a34a" fontSize="10" fontWeight="900" textAnchor="middle">+</text>

                            {/* Sor 3: Szorzat (Kiemelt sor) */}
                            <line x1="14" y1="110" x2="306" y2="110" stroke="#3b82f6" strokeWidth="1.5" />
                            <text x="52" y="127" fill="#1e40af" fontSize="8.5" fontWeight="900" textAnchor="middle">Szorzat</text>

                            <rect x="105" y="115" width="40" height="20" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                            <text x="125" y="129.5" fill="#15803d" fontSize="11" fontWeight="900" textAnchor="middle">+</text>

                            <rect x="175" y="115" width="40" height="20" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
                            <text x="195" y="129.5" fill="#b91c1c" fontSize="11" fontWeight="900" textAnchor="middle">-</text>

                            <rect x="250" y="115" width="40" height="20" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                            <text x="270" y="129.5" fill="#15803d" fontSize="11" fontWeight="900" textAnchor="middle">+</text>

                            <rect x="14" y="139" width="292" height="1" fill="#e2e8f0" />
                        </svg>
                        );
};

                        // 5. Számegyenes intervallum ábrázolás: Nyílt vs Zárt karika
                        export const InequalityIntervalNumberLineSvg: React.FC<FigureProps> = ({size = 250, className = ''}) => {
  return (
                          <svg
                            viewBox="0 0 320 145"
                            width={size}
                            height={(size * 145) / 320}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`max-w-full h-auto select-none ${className}`}
                          >
                            <rect x="0" y="0" width="320" height="145" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

                            {/* Felső: Szigorú egyenlőtlenség (> vagy <) */}
                              <rect x="16" y="8" width="288" height="16" rx="3.5" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="0.8" />
                              <text x="160" y="19.5" fill="#1e40af" fontSize="7.5" fontWeight="900" textAnchor="middle">
                                SZIGORÚ (&lt; vagy &gt;): x² - 4 &lt; 0 ⟹ x ∈ ]-2; 2[ (Nyílt karika: végpont nem tartozik hozzá)
                              </text>

                              <line x1="25" y1="42" x2="295" y2="42" stroke="#94a3b8" strokeWidth="1.5" />
                              <polygon points="298,42 291,39 291,45" fill="#64748b" />
                              {/* Kiemelt szakasz -2 és 2 között */}
                              <line x1="90" y1="42" x2="230" y2="42" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
                              {/* Nyílt karika -2 */}
                              <circle cx="90" cy="42" r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                              <rect x="80" y="49" width="20" height="12" rx="2.5" fill="#ffffff" stroke="#93c5fd" strokeWidth="0.6" />
                              <text x="90" y="58" fill="#1e40af" fontSize="7.5" fontWeight="bold" textAnchor="middle">-2</text>
                              {/* Nyílt karika 2 */}
                              <circle cx="230" cy="42" r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                              <rect x="220" y="49" width="20" height="12" rx="2.5" fill="#ffffff" stroke="#93c5fd" strokeWidth="0.6" />
                              <text x="230" y="58" fill="#1e40af" fontSize="7.5" fontWeight="bold" textAnchor="middle">2</text>

                              {/* Alsó: Megengedő egyenlőtlenség (≥ vagy ≤) */}
                                <rect x="16" y="74" width="288" height="16" rx="3.5" fill="#f0fdf4" stroke="#86efac" strokeWidth="0.8" />
                                <text x="160" y="85.5" fill="#166534" fontSize="7.5" fontWeight="900" textAnchor="middle">
                                  MEGENGEDŐ (≤ vagy ≥): x² - 4 ≤ 0 ⟹ x ∈ [-2; 2] (Teli karika: végpont beletartozik)
                                </text>

                                <line x1="25" y1="108" x2="295" y2="108" stroke="#94a3b8" strokeWidth="1.5" />
                                <polygon points="298,108 291,105 291,111" fill="#64748b" />
                                {/* Kiemelt szakasz teli karikákkal */}
                                <line x1="90" y1="108" x2="230" y2="108" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" />
                                {/* Teli karika -2 */}
                                <circle cx="90" cy="108" r="5" fill="#16a34a" stroke="#ffffff" strokeWidth="1.5" />
                                <rect x="80" y="115" width="20" height="12" rx="2.5" fill="#ffffff" stroke="#86efac" strokeWidth="0.6" />
                                <text x="90" y="124" fill="#15803d" fontSize="7.5" fontWeight="bold" textAnchor="middle">-2</text>
                                {/* Teli karika 2 */}
                                <circle cx="230" cy="108" r="5" fill="#16a34a" stroke="#ffffff" strokeWidth="1.5" />
                                <rect x="220" y="115" width="20" height="12" rx="2.5" fill="#ffffff" stroke="#86efac" strokeWidth="0.6" />
                                <text x="230" y="124" fill="#15803d" fontSize="7.5" fontWeight="bold" textAnchor="middle">2</text>
                              </svg>
                              );
};

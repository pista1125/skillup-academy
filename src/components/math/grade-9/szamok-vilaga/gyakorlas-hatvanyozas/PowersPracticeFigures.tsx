import React from 'react';

export interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Prímtényezős felbontás és közös alapra hozás
 * Összetett alapok (4, 6, 8, 9, 12) átírása prímhatványokká
 */
export const PrimeBaseDecompositionSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 540 260"
        style={size ? { width: size, height: (size * 260) / 540 } : { width: '100%', maxWidth: 540, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <linearGradient id="pbdCard1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdf4ff" />
            <stop offset="100%" stopColor="#fae8ff" />
          </linearGradient>
          <linearGradient id="pbdCard2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eff6ff" />
            <stop offset="100%" stopColor="#dbeafe" />
          </linearGradient>
          <linearGradient id="pbdCard3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="100%" stopColor="#dcfce7" />
          </linearGradient>
        </defs>

        {/* Felső cím */}
        <text x="270" y="24" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          Összetett Alapok Átírása Prímalapokra
        </text>
        <text x="270" y="42" textAnchor="middle" fill="#64748b" fontSize="11">
          Azonosságot csak azonos alapú vagy azonos kitevőjű tényezőkre alkalmazhatunk!
        </text>

        {/* 1. Kártya: 4^n és 8^k -> 2-es alap */}
        <g transform="translate(20, 58)">
          <rect x="0" y="0" width="155" height="185" rx="12" fill="url(#pbdCard1)" stroke="#e879f9" strokeWidth="1.5" />
          <rect x="12" y="10" width="131" height="26" rx="6" fill="#c026d3" />
          <text x="77" y="27" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
            2-es alap (Kettő)
          </text>

          <text x="77" y="60" textAnchor="middle" fill="#86198f" fontWeight="bold" fontSize="13">
            4ⁿ = (2²)ⁿ = 2²ⁿ
          </text>
          <text x="77" y="85" textAnchor="middle" fill="#86198f" fontWeight="bold" fontSize="13">
            8ⁿ = (2³)ⁿ = 2³ⁿ
          </text>
          <text x="77" y="110" textAnchor="middle" fill="#86198f" fontWeight="bold" fontSize="13">
            16ⁿ = (2⁴)ⁿ = 2⁴ⁿ
          </text>

          <rect x="10" y="130" width="135" height="44" rx="6" fill="#ffffff" stroke="#f0abfc" strokeWidth="1" />
          <text x="77" y="148" textAnchor="middle" fill="#701a75" fontSize="10" fontWeight="bold">
            Példa:
          </text>
          <text x="77" y="164" textAnchor="middle" fill="#a21caf" fontSize="11" fontWeight="bold">
            4⁵ · 8² = 2¹⁰ · 2⁶ = 2¹⁶
          </text>
        </g>

        {/* 2. Kártya: 9^n és 27^n -> 3-as alap */}
        <g transform="translate(192, 58)">
          <rect x="0" y="0" width="155" height="185" rx="12" fill="url(#pbdCard2)" stroke="#60a5fa" strokeWidth="1.5" />
          <rect x="12" y="10" width="131" height="26" rx="6" fill="#2563eb" />
          <text x="77" y="27" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
            3-as alap (Három)
          </text>

          <text x="77" y="60" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="13">
            9ⁿ = (3²)ⁿ = 3²ⁿ
          </text>
          <text x="77" y="85" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="13">
            27ⁿ = (3³)ⁿ = 3³ⁿ
          </text>
          <text x="77" y="110" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="13">
            81ⁿ = (3⁴)ⁿ = 3⁴ⁿ
          </text>

          <rect x="10" y="130" width="135" height="44" rx="6" fill="#ffffff" stroke="#93c5fd" strokeWidth="1" />
          <text x="77" y="148" textAnchor="middle" fill="#1e3a8a" fontSize="10" fontWeight="bold">
            Példa:
          </text>
          <text x="77" y="164" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="bold">
            27³ / 9⁴ = 3⁹ / 3⁸ = 3¹ = 3
          </text>
        </g>

        {/* 3. Kártya: 6^n és 12^n -> Vegyes prímek */}
        <g transform="translate(365, 58)">
          <rect x="0" y="0" width="155" height="185" rx="12" fill="url(#pbdCard3)" stroke="#4ade80" strokeWidth="1.5" />
          <rect x="12" y="10" width="131" height="26" rx="6" fill="#16a34a" />
          <text x="77" y="27" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
            Vegyes prímek
          </text>

          <text x="77" y="60" textAnchor="middle" fill="#166534" fontWeight="bold" fontSize="12.5">
            6ⁿ = (2 · 3)ⁿ = 2ⁿ · 3ⁿ
          </text>
          <text x="77" y="85" textAnchor="middle" fill="#166534" fontWeight="bold" fontSize="12.5">
            12ⁿ = (2² · 3)ⁿ = 2²ⁿ · 3ⁿ
          </text>
          <text x="77" y="110" textAnchor="middle" fill="#166534" fontWeight="bold" fontSize="12.5">
            10ⁿ = (2 · 5)ⁿ = 2ⁿ · 5ⁿ
          </text>

          <rect x="10" y="130" width="135" height="44" rx="6" fill="#ffffff" stroke="#86efac" strokeWidth="1" />
          <text x="77" y="148" textAnchor="middle" fill="#14532d" fontSize="10" fontWeight="bold">
            Példa:
          </text>
          <text x="77" y="164" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
            6⁴ / (2³ · 3⁴) = 2⁴ · 3⁴ / (2³ · 3⁴) = 2
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. Törtvonalon átlépés és negatív kitevők egyszerűsítése
 * a^(-n) a számlálóból -> nevezőbe és fordítva
 */
export const FractionMovementSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 520 240"
        style={size ? { width: size, height: (size * 240) / 520 } : { width: '100%', maxWidth: 520, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <marker id="arrowUp" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0284c7" />
          </marker>
          <marker id="arrowDown" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#e11d48" />
          </marker>
        </defs>

        {/* Fő konténer kártya */}
        <rect x="15" y="15" width="490" height="210" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Cím */}
        <text x="260" y="42" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          A Törtvonalon Átlépés Aranyszabálya
        </text>
        <text x="260" y="60" textAnchor="middle" fill="#64748b" fontSize="11">
          Ha egy hatványtényezőt átviszünk a törtvonal túlsó oldalára, a kitevője ellentettjére változik!
        </text>

        {/* Bal oldali ábra: Negatív kitevő a számlálóban -> lemegy */}
        <g transform="translate(40, 80)">
          <rect x="0" y="0" width="195" height="125" rx="10" fill="#ffffff" stroke="#fda4af" strokeWidth="1.2" />
          <text x="97" y="24" textAnchor="middle" fill="#9f1239" fontWeight="bold" fontSize="11">
            Fentről lefelé költözés
          </text>

          {/* Eredeti tört */}
          <text x="45" y="62" textAnchor="middle" fill="#e11d48" fontWeight="black" fontSize="16">
            x⁻³
          </text>
          <line x1="20" y1="72" x2="70" y2="72" stroke="#475569" strokeWidth="2" />
          <text x="45" y="94" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="15">
            y
          </text>

          {/* Átalakulási nyíl */}
          <text x="95" y="76" textAnchor="middle" fill="#64748b" fontWeight="bold" fontSize="18">
            =
          </text>

          {/* Új tört */}
          <text x="145" y="62" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="15">
            1
          </text>
          <line x1="120" y1="72" x2="175" y2="72" stroke="#475569" strokeWidth="2" />
          <text x="145" y="94" textAnchor="middle" fill="#059669" fontWeight="black" fontSize="15">
            x³ · y
          </text>

          {/* Lefelé mutató nyíl magyarázat */}
          <path d="M 68 55 Q 95 62 125 80" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrowDown)" />
        </g>

        {/* Jobb oldali ábra: Negatív kitevő a nevezőben -> felmegy */}
        <g transform="translate(285, 80)">
          <rect x="0" y="0" width="195" height="125" rx="10" fill="#ffffff" stroke="#7dd3fc" strokeWidth="1.2" />
          <text x="97" y="24" textAnchor="middle" fill="#0369a1" fontWeight="bold" fontSize="11">
            Lentről felfelé költözés
          </text>

          {/* Eredeti tört */}
          <text x="45" y="62" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="15">
            a
          </text>
          <line x1="20" y1="72" x2="70" y2="72" stroke="#475569" strokeWidth="2" />
          <text x="45" y="94" textAnchor="middle" fill="#0284c7" fontWeight="black" fontSize="16">
            b⁻⁴
          </text>

          {/* Átalakulási nyíl */}
          <text x="95" y="76" textAnchor="middle" fill="#64748b" fontWeight="bold" fontSize="18">
            =
          </text>

          {/* Új kifejezés */}
          <text x="145" y="76" textAnchor="middle" fill="#0284c7" fontWeight="black" fontSize="16">
            a · b⁴
          </text>

          {/* Felfelé mutató nyíl magyarázat */}
          <path d="M 68 90 Q 95 85 125 70" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrowUp)" />
        </g>
      </svg>
    </div>
  );
};

/**
 * 3. Kiemelési stratégia összegekben és különbségekben
 * A legkisebb kitevőjű hatvány kiemelése
 */
export const FactoringStrategySvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 530 230"
        style={size ? { width: size, height: (size * 230) / 530 } : { width: '100%', maxWidth: 530, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <linearGradient id="factBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
        </defs>

        <rect x="15" y="15" width="500" height="200" rx="16" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" />

        <text x="265" y="42" textAnchor="middle" fill="#92400e" fontWeight="900" fontSize="14">
          A Kiemelés Módszere Hatványösszegeknél
        </text>
        <text x="265" y="60" textAnchor="middle" fill="#78350f" fontSize="11">
          Összeadásra nincs hatványazonosság! Csak a legkisebb kitevőjű tagot emelhetjük ki!
        </text>

        {/* Nagy kiemelési folyamatábra */}
        <g transform="translate(35, 75)">
          {/* 1. Lépés: Eredeti összeg */}
          <rect x="0" y="10" width="130" height="90" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
          <text x="65" y="32" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="10">
            1. Eredeti összeg
          </text>
          <text x="65" y="65" textAnchor="middle" fill="#0f172a" fontWeight="black" fontSize="18">
            2ⁿ⁺² + 2ⁿ
          </text>
          <text x="65" y="85" textAnchor="middle" fill="#64748b" fontSize="9">
            2ⁿ⁺² = 2ⁿ · 2²
          </text>

          {/* Nyíl 1 */}
          <text x="145" y="65" fill="#f59e0b" fontWeight="black" fontSize="20">
            ➔
          </text>

          {/* 2. Lépés: Kiemelés */}
          <rect x="165" y="10" width="160" height="90" rx="10" fill="url(#factBoxGrad)" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="245" y="32" textAnchor="middle" fill="#b45309" fontWeight="bold" fontSize="10">
            2. Kiemeljük a 2ⁿ-t
          </text>
          <text x="245" y="65" textAnchor="middle" fill="#92400e" fontWeight="black" fontSize="18">
            2ⁿ · (2² + 1)
          </text>
          <text x="245" y="85" textAnchor="middle" fill="#b45309" fontSize="9" fontWeight="bold">
            (2² = 4, 4 + 1 = 5)
          </text>

          {/* Nyíl 2 */}
          <text x="340" y="65" fill="#f59e0b" fontWeight="black" fontSize="20">
            ➔
          </text>

          {/* 3. Lépés: Egyszerűsített szorzat */}
          <rect x="360" y="10" width="100" height="90" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
          <text x="410" y="32" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="10">
            3. Végeredmény
          </text>
          <text x="410" y="65" textAnchor="middle" fill="#047857" fontWeight="black" fontSize="18">
            5 · 2ⁿ
          </text>
          <text x="410" y="85" textAnchor="middle" fill="#059669" fontSize="9" fontWeight="bold">
            Szorzattá alakítva!
          </text>
        </g>

        {/* Alsó aranyszabály figyelmeztetés */}
        <text x="265" y="195" textAnchor="middle" fill="#b45309" fontWeight="bold" fontSize="11">
          💡 Törtes kifejezéseknél a kiemelt 2ⁿ azonnal egyszerűsíthető a nevezővel!
        </text>
      </svg>
    </div>
  );
};

/**
 * 4. Hatványok összehasonlításának 3 fő stratégiája
 * Közös alap, közös kitevő, és tört alapok viselkedése
 */
export const PowerComparisonSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 540 260"
        style={size ? { width: size, height: (size * 260) / 540 } : { width: '100%', maxWidth: 540, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <rect x="15" y="15" width="510" height="230" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        <text x="270" y="38" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          Hatványok Összehasonlítása: 3 Fő Stratégia
        </text>
        <text x="270" y="55" textAnchor="middle" fill="#64748b" fontSize="11">
          Hogyan döntsük el, melyik a nagyobb számológép nélkül?
        </text>

        {/* 1. Stratégia: Közös Alap */}
        <g transform="translate(30, 70)">
          <rect x="0" y="0" width="145" height="155" rx="10" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.2" />
          <rect x="10" y="10" width="125" height="22" rx="4" fill="#3b82f6" />
          <text x="72" y="25" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10.5">
            1. Közös Alap
          </text>

          <text x="72" y="55" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="12">
            4¹⁵ vs 8¹⁰
          </text>

          <text x="72" y="80" textAnchor="middle" fill="#334155" fontSize="10">
            4¹⁵ = (2²)¹⁵ = 2³⁰
          </text>
          <text x="72" y="100" textAnchor="middle" fill="#334155" fontSize="10">
            8¹⁰ = (2³)¹⁰ = 2³⁰
          </text>

          <rect x="12" y="118" width="121" height="26" rx="6" fill="#eff6ff" stroke="#bfdbfe" />
          <text x="72" y="135" textAnchor="middle" fill="#1d4ed8" fontWeight="black" fontSize="12">
            4¹⁵ = 8¹⁰ (Egyenlők!)
          </text>
        </g>

        {/* 2. Stratégia: Közös Kitevő */}
        <g transform="translate(195, 70)">
          <rect x="0" y="0" width="150" height="155" rx="10" fill="#ffffff" stroke="#c084fc" strokeWidth="1.2" />
          <rect x="10" y="10" width="130" height="22" rx="4" fill="#8b5cf6" />
          <text x="75" y="25" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10.5">
            2. Közös Kitevő
          </text>

          <text x="75" y="55" textAnchor="middle" fill="#5b21b6" fontWeight="bold" fontSize="12">
            2³⁰⁰ vs 3²⁰⁰
          </text>

          <text x="75" y="80" textAnchor="middle" fill="#334155" fontSize="10">
            2³⁰⁰ = (2³)¹⁰⁰ = 8¹⁰⁰
          </text>
          <text x="75" y="100" textAnchor="middle" fill="#334155" fontSize="10">
            3²⁰⁰ = (3²)¹⁰⁰ = 9¹⁰⁰
          </text>

          <rect x="12" y="118" width="126" height="26" rx="6" fill="#f5f3ff" stroke="#ddd6fe" />
          <text x="75" y="135" textAnchor="middle" fill="#6d28d9" fontWeight="black" fontSize="12">
            8¹⁰⁰ &lt; 9¹⁰⁰ ➔ 3²⁰⁰ nagyobb!
          </text>
        </g>

        {/* 3. Stratégia: Tört Alapok (0 < a < 1) */}
        <g transform="translate(365, 70)">
          <rect x="0" y="0" width="145" height="155" rx="10" fill="#ffffff" stroke="#f472b6" strokeWidth="1.2" />
          <rect x="10" y="10" width="125" height="22" rx="4" fill="#ec4899" />
          <text x="72" y="25" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10.5">
            3. Tört Alap (0 &lt; a &lt; 1)
          </text>

          <text x="72" y="55" textAnchor="middle" fill="#9d174d" fontWeight="bold" fontSize="12">
            (0,5)³ vs (0,5)⁵
          </text>

          <text x="72" y="80" textAnchor="middle" fill="#334155" fontSize="10">
            (1/2)³ = 1/8 = 0,125
          </text>
          <text x="72" y="100" textAnchor="middle" fill="#334155" fontSize="10">
            (1/2)⁵ = 1/32 ≈ 0,031
          </text>

          <rect x="12" y="118" width="121" height="26" rx="6" fill="#fdf2f8" stroke="#fbcfe8" />
          <text x="72" y="135" textAnchor="middle" fill="#be185d" fontWeight="black" fontSize="11.5">
            (0,5)³ &gt; (0,5)⁵ Fordított!
          </text>
        </g>
      </svg>
    </div>
  );
};

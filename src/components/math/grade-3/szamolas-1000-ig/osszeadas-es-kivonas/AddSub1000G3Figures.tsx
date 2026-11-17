import React from 'react';
import { FONT, UNK, HundredFlat, Note } from '../szamok-1000-ig/Numbers1000G3Parts';
import { JumpLine, PartBar, Tag } from './AddSub1000G3Parts';

const CLS = 'w-full h-auto max-w-[560px] mx-auto';

/** 1000 = 300 + 700: tíz lap két színnel. */
export const ThousandSplitSvg: React.FC<{ className?: string }> = ({ className = CLS }) => (
  <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {Array.from({ length: 10 }, (_, i) => (
      <HundredFlat key={i} x={16 + i * 33.5} y={24} s={3} color={i < 3 ? '#38bdf8' : '#fb923c'} />
    ))}
    <text x={16 + 1.5 * 33.5 + 15} y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0369a1">300</text>
    <text x={16 + 6.5 * 33.5 + 15} y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#c2410c">700</text>
    <text x="180" y="80" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">300 + 700 = 1000</text>
    <text x="180" y="106" textAnchor="middle" fontSize="12.5" fill="#334155">3 sz + 7 sz = 10 sz</text>
    <text x="180" y="132" textAnchor="middle" fontSize="12.5" fill="#334155">100 + 900, 200 + 800, 400 + 600, 500 + 500</text>
  </svg>
);

/** 480 + 70: előbb a következő kerek százasig (+20), aztán tovább (+50). */
export const AddBridgeSvg: React.FC<{ className?: string }> = ({ className = CLS }) => (
  <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="128" rx="14" fill="#f0fdf4" stroke="#86efac" />
    <text x="20" y="22" fontSize="14" fontWeight="bold" fill="#166534">480 + 70 = 480 + 20 + 50 = 550</text>
    <JumpLine lo={450} hi={560} tick={10} labels={[450, 500, 550]} start={480} jumps={[{ by: 20 }, { by: 50 }]} W={360} y={80} showMid endLabel="550" />
  </svg>
);

/** 620 − 330: előbb a százasok (−300), aztán a tízesek (−30). */
export const SubStepsSvg: React.FC<{ className?: string }> = ({ className = CLS }) => (
  <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="128" rx="14" fill="#fff7ed" stroke="#fdba74" />
    <text x="20" y="22" fontSize="14" fontWeight="bold" fill="#9a3412">620 − 330 = 620 − 300 − 30 = 290</text>
    <JumpLine lo={250} hi={650} tick={10} labels={[300, 400, 500, 600]} start={620} jumps={[{ by: -300 }, { by: -30 }]} W={360} y={82} endLabel="290" />
  </svg>
);

/** Pótlás 1000-re: 740 + ? = 1000. */
export const ToThousandSvg: React.FC<{ className?: string }> = ({ className = CLS }) => (
  <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="118" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <PartBar x={20} y={40} w={320} total="1000" known={740} whole={1000} />
    <text x="180" y="98" textAnchor="middle" fontSize="13" fill="#334155">740 + 60 = 800, és 800 + 200 = 1000.</text>
    <text x="180" y="113" textAnchor="middle" fontSize="12" fill="#334155">Ugrottunk 60-at és 200-at. Mennyi ez együtt?</text>
  </svg>
);

/** Ellenőrzés: 930 − 610 = 320, mert 320 + 610 = 930. */
export const CheckSvg: React.FC<{ className?: string }> = ({ className = CLS }) => (
  <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="128" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <PartBar x={20} y={34} w={320} total="930" known={610} whole={930} unknownLabel="320" />
    <text x="180" y="94" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">Kivonás: 930 − 610 = 320</text>
    <text x="180" y="116" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">Ellenőrzés: 320 + 610 = 930 ✓</text>
  </svg>
);

/** Papírbolt 1000 Ft-tal. */
export const ShopSvg: React.FC<{ className?: string }> = ({ className = CLS }) => (
  <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="118" rx="14" fill="#fefce8" stroke="#fde047" />
    <Tag x={16} y={20} price={120} w={70} label="radír" />
    <Tag x={100} y={20} price={260} w={70} label="füzet" />
    <Tag x={184} y={20} price={480} w={70} label="festék" />
    <Note x={272} y={22} v={1000} w={74} />
    <text x="180" y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">Mit vehetsz meg 1000 Ft-ból? Mennyi marad?</text>
    <text x="309" y="76" textAnchor="middle" fontSize="11" fill={UNK}>a pénzed</text>
  </svg>
);

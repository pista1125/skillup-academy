import React from 'react';
import { FONT, INK, TensOnes, NumLine, DotGroups, OrderMarks, DominoSquare, Chain, Bars } from './Count100ExamG3Parts';

type FigProps = { className?: string };

const Frame: React.FC<{ className?: string; h: number; w?: number; children?: React.ReactNode; title: string }> = ({ className, h, w = 300, children, title }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className ?? 'w-full h-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT} role="img" aria-label={title}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
    {children}
  </svg>
);

/** 47 tízesrudakkal és egyeskockákkal, mellette a bontás. */
export const Count100TensOnesSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={130} title="47 = 4 tízes és 7 egyes">
    <TensOnes x={24} y={22} tens={4} ones={7} cell={7} rodGap={15} onesCols={4} />
    <text x="40" y="112" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">4 tízes</text>
    <text x="106" y="112" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">7 egyes</text>
    <text x="215" y="60" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>47</text>
    <text x="215" y="84" textAnchor="middle" fontSize="12" fill="#334155">= 4 t + 7 e</text>
    <text x="215" y="100" textAnchor="middle" fontSize="12" fill="#334155">= 40 + 7</text>
  </Frame>
);

/** Számegyenes 0-tól 100-ig, a 47 helye és a tízes szomszédai. */
export const Count100NumberLineSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={110} w={300} title="Számegyenes 0-tól 100-ig">
    <g transform="translate(0,12)">
      <NumLine x={20} y={50} w={250} from={0} to={100} step={5} labelEvery={2} marks={[{ v: 47, label: '47' }]} />
    </g>
    <text x="150" y="98" textAnchor="middle" fontSize="11" fill="#334155">
      40 &lt; 47 &lt; 50 – a 47 tízes szomszédai: 40 és 50
    </text>
  </Frame>
);

/** 17 korong ötösével: 3 csoport, marad 2. */
export const Count100RemainderSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={110} w={240} title="17 : 5 = 3, marad 2">
    <DotGroups total={17} size={5} grouped y={14} />
    <text x="120" y="96" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7c2d12">
      17 : 5 = 3, marad 2
    </text>
  </Frame>
);

/** A műveletek sorrendje: 24 + 5 · 3, a lépések számozva. */
export const Count100OrderStepsSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={130} w={240} title="Előbb a szorzás, aztán az összeadás">
    <OrderMarks tokens={['24', '+', '5', '·', '3']} order={[null, 2, null, 1, null]} y={60} fs={22} />
    <text x="120" y="88" textAnchor="middle" fontSize="12" fill="#6d28d9" fontWeight="bold">1. lépés: 5 · 3 = 15</text>
    <text x="120" y="106" textAnchor="middle" fontSize="12" fill="#0e7490" fontWeight="bold">2. lépés: 24 + 15 = 39</text>
  </Frame>
);

/** Négy dominó négyzetben, minden oldalon 10 pötty. */
export const Count100DominoSquareSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={130} w={240} title="Dominó-négyzet: minden oldalon 10 pötty">
    <DominoSquare x={30} y={12} s={34} v={[4, 2, 4, 1, 5, 2, 3, 3]} />
    <text x="190" y="40" textAnchor="middle" fontSize="11" fill="#334155">felül:</text>
    <text x="190" y="54" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>4 + 2 + 4 = 10</text>
    <text x="190" y="76" textAnchor="middle" fontSize="11" fill="#334155">jobb oldalt:</text>
    <text x="190" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>4 + 1 + 5 = 10</text>
  </Frame>
);

/** Műveletlánc és szakaszos ábra egy szöveges feladathoz. */
export const Count100ChainSvg: React.FC<FigProps> = ({ className }) => (
  <Frame className={className} h={150} w={240} title="Műveletlánc és szakaszos ábra">
    <text x="120" y="20" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#6d28d9">Az előző eredménnyel számolj tovább!</text>
    <Chain values={['6', '18', '24', '4']} ops={['· 3', '+ 6', ': 6']} y={40} />
    <g transform="translate(0,78)">
      <Bars total="60 oldal" parts={[{ label: '18', len: 18 }, { label: '25', len: 25 }, { label: '17', len: 17 }]} y={14} />
    </g>
  </Frame>
);

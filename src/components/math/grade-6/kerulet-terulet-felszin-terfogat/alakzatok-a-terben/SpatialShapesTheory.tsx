import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Box,
  Boxes,
  Shapes,
  Eye,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Info,
  Maximize2,
  Flame,
  Check,
  Zap,
  Grid
} from 'lucide-react';
import {
  DimensionEvolutionSvg,
  PolyhedraVsRotationalSvg,
  PolyhedronElementsSvg,
  PrismsVsPyramidsSvg,
  RotationalSolidsGenerationSvg,
  CubeNetsValidationSvg,
  CylinderConeNetsSvg,
  MongeViewsProjectionSvg
} from './SpatialShapesDiagrams';

interface SpatialShapesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

type ShapeType =
  | 'cube'
  | 'cuboid'
  | 'triangularPrism'
  | 'squarePyramid'
  | 'tetrahedron'
  | 'cylinder'
  | 'cone'
  | 'sphere';

type ViewMode = '3d' | 'net' | 'views';

export const SpatialShapesTheory: React.FC<SpatialShapesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota
  const [selectedShape, setSelectedShape] = useState<ShapeType>('cube');
  const [viewMode, setViewMode] = useState<ViewMode>('3d');
  const [highlightVertices, setHighlightVertices] = useState<boolean>(true);
  const [highlightEdges, setHighlightEdges] = useState<boolean>(true);
  const [highlightFaces, setHighlightFaces] = useState<boolean>(true);

  // Alakzat adatok
  interface ShapeMetadata {
    name: string;
    type: 'Poliéder' | 'Forgástest';
    vertices: number | string;
    edges: number | string;
    faces: number | string;
    baseShape: string;
    sideShape: string;
    eulerApplies: boolean;
    eulerFormula: string;
    description: string;
  }

  const shapeInfo: Record<ShapeType, ShapeMetadata> = {
    cube: {
      name: 'Kocka (szabályos hexaéder)',
      type: 'Poliéder',
      vertices: 8,
      edges: 12,
      faces: 6,
      baseShape: 'Egybevágó négyzetek',
      sideShape: '4 egybevágó négyzet',
      eulerApplies: true,
      eulerFormula: '8 + 6 = 12 + 2  (14 = 14 ✓)',
      description: 'Minden határoló lapja azonos méretű négyzet, élei egyenlő hosszúak, lapjai derékszöget zárnak be egymással.'
    },
    cuboid: {
      name: 'Téglatest',
      type: 'Poliéder',
      vertices: 8,
      edges: 12,
      faces: 6,
      baseShape: 'Páronként egybevágó téglalapok',
      sideShape: 'Páronként egybevágó téglalapok',
      eulerApplies: true,
      eulerFormula: '8 + 6 = 12 + 2  (14 = 14 ✓)',
      description: 'Hat téglalap lap határolja. A szemközti lapok párhuzamosak és egybevágóak. Három különböző élhossza van: a, b és c.'
    },
    triangularPrism: {
      name: 'Háromoldalú hasáb',
      type: 'Poliéder',
      vertices: 6,
      edges: 9,
      faces: 5,
      baseShape: '2 egybevágó háromszög (alap és fedő)',
      sideShape: '3 téglalap lap',
      eulerApplies: true,
      eulerFormula: '6 + 5 = 9 + 2  (11 = 11 ✓)',
      description: 'Alaplapja és fedőlapja két párhuzamos, egybevágó háromszög, palástját 3 téglalap alkotja (pl. Toblerone csoki doboza).'
    },
    squarePyramid: {
      name: 'Négyzet alapú gúla (piramis)',
      type: 'Poliéder',
      vertices: 5,
      edges: 8,
      faces: 5,
      baseShape: '1 darab négyzet',
      sideShape: '4 egyenlő szárú háromszög',
      eulerApplies: true,
      eulerFormula: '5 + 5 = 8 + 2  (10 = 10 ✓)',
      description: 'Egyetlen négyzet alakú alaplapja van, és az egy közös csúcsban találkozó 4 háromszög oldallap alkotja a palástot.'
    },
    tetrahedron: {
      name: 'Szabályos tetraéder (háromoldalú gúla)',
      type: 'Poliéder',
      vertices: 4,
      edges: 6,
      faces: 4,
      baseShape: 'Egyenlő oldalú háromszög',
      sideShape: '3 egybevágó szabályos háromszög',
      eulerApplies: true,
      eulerFormula: '4 + 4 = 6 + 2  (8 = 8 ✓)',
      description: 'A legkisebb lapszámú poliéder a térben: mind a 4 lapja egybevágó szabályos háromszög.'
    },
    cylinder: {
      name: 'Egyenes körhenger',
      type: 'Forgástest',
      vertices: 'Nincs (0)',
      edges: 'Nincs sík éle (2 görbe perem)',
      faces: '2 síklap (kör) + 1 görbe palást',
      baseShape: '2 egybevágó párhuzamos kör',
      sideShape: 'Kiterítve téglalap',
      eulerApplies: false,
      eulerFormula: 'Forgástest – az Euler-tétel poliéderekre vonatkozik',
      description: 'Téglalap forgatásával keletkezik. Két párhuzamos egybevágó körlap és egy hengerfelület (palást) határolja.'
    },
    cone: {
      name: 'Egyenes körkúp',
      type: 'Forgástest',
      vertices: '1 geometriai csúcs',
      edges: 'Nincs sík éle (1 görbe perem)',
      faces: '1 síklap (kör) + 1 görbe palást',
      baseShape: '1 darab körlap',
      sideShape: 'Kiterítve körcikk',
      eulerApplies: false,
      eulerFormula: 'Forgástest – az Euler-tétel poliéderekre vonatkozik',
      description: 'Derékszögű háromszög egyik befogója körüli megforgatásával származtatható. Alapja kör, palástja kiterítve körcikk.'
    },
    sphere: {
      name: 'Gömb',
      type: 'Forgástest',
      vertices: 'Nincs (0)',
      edges: 'Nincs (0)',
      faces: '1 zárt gömbfelület',
      baseShape: 'Nincs sík alaplapja',
      sideShape: 'Minden irányból szimmetrikus gömbfelület',
      eulerApplies: false,
      eulerFormula: 'Forgástest – nincs éle, nincs csúcsa',
      description: 'A tér azon pontjai, amelyek egy adott középponttól legfeljebb R távolságra vannak. Félkör átmérő körüli forgatásával keletkezik.'
    }
  };

  const currentInfo = shapeInfo[selectedShape];

  // SVG Renderelő függvény a 3D nézethez
  const render3DView = () => {
    switch (selectedShape) {
      case 'cube':
        return (
          <svg viewBox="0 0 300 240" className="w-full h-56 select-none">
            {/* Hátsó lap és élek (szaggatott) */}
            <polygon points="110,60 210,60 210,160 110,160" fill="none" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />
            <line x1="60" y1="190" x2="110" y2="160" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />
            
            {/* Oldallapok kitöltése */}
            {highlightFaces && (
              <>
                <polygon points="60,90 160,90 210,60 110,60" fill="rgba(168, 85, 247, 0.25)" stroke="#9333ea" strokeWidth="1.5" />
                <polygon points="160,90 210,60 210,160 160,190" fill="rgba(147, 51, 234, 0.35)" stroke="#9333ea" strokeWidth="1.5" />
                <polygon points="60,90 160,90 160,190 60,190" fill="rgba(192, 132, 252, 0.3)" stroke="#7e22ce" strokeWidth="2" />
              </>
            )}

            {/* Fő látható élek */}
            {highlightEdges && (
              <g stroke="#6b21a8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <rect x="60" y="90" width="100" height="100" />
                <line x1="60" y1="90" x2="110" y2="60" />
                <line x1="160" y1="90" x2="210" y2="60" />
                <line x1="160" y1="190" x2="210" y2="160" />
                <line x1="110" y1="60" x2="210" y2="60" />
                <line x1="210" y1="60" x2="210" y2="160" />
              </g>
            )}

            {/* Csúcsok pöttyökkel */}
            {highlightVertices && (
              <g fill="#ec4899" stroke="#fff" strokeWidth="1.5">
                <circle cx="60" cy="90" r="4.5" />
                <circle cx="160" cy="90" r="4.5" />
                <circle cx="160" cy="190" r="4.5" />
                <circle cx="60" cy="190" r="4.5" />
                <circle cx="110" cy="60" r="4.5" />
                <circle cx="210" cy="60" r="4.5" />
                <circle cx="210" cy="160" r="4.5" />
                <circle cx="110" cy="160" r="3.5" fill="#a855f7" />
              </g>
            )}
            <text x="110" y="225" textAnchor="middle" className="text-[12px] font-bold fill-purple-700 dark:fill-purple-300">
              Kocka: C = 8, É = 12, L = 6
            </text>
          </svg>
        );

      case 'cuboid':
        return (
          <svg viewBox="0 0 300 240" className="w-full h-56 select-none">
            {/* Hátsó szaggatott */}
            <polygon points="120,50 240,50 240,140 120,140" fill="none" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />
            <line x1="40" y1="180" x2="120" y2="140" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />

            {/* Lapok */}
            {highlightFaces && (
              <>
                <polygon points="40,90 160,90 240,50 120,50" fill="rgba(168, 85, 247, 0.25)" stroke="#9333ea" strokeWidth="1.5" />
                <polygon points="160,90 240,50 240,140 160,180" fill="rgba(147, 51, 234, 0.35)" stroke="#9333ea" strokeWidth="1.5" />
                <polygon points="40,90 160,90 160,180 40,180" fill="rgba(192, 132, 252, 0.3)" stroke="#7e22ce" strokeWidth="2" />
              </>
            )}

            {/* Élek */}
            {highlightEdges && (
              <g stroke="#6b21a8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <rect x="40" y="90" width="120" height="90" />
                <line x1="40" y1="90" x2="120" y2="50" />
                <line x1="160" y1="90" x2="240" y2="50" />
                <line x1="160" y1="180" x2="240" y2="140" />
                <line x1="120" y1="50" x2="240" y2="50" />
                <line x1="240" y1="50" x2="240" y2="140" />
              </g>
            )}

            {/* Csúcsok */}
            {highlightVertices && (
              <g fill="#ec4899" stroke="#fff" strokeWidth="1.5">
                <circle cx="40" cy="90" r="4.5" />
                <circle cx="160" cy="90" r="4.5" />
                <circle cx="160" cy="180" r="4.5" />
                <circle cx="40" cy="180" r="4.5" />
                <circle cx="120" cy="50" r="4.5" />
                <circle cx="240" cy="50" r="4.5" />
                <circle cx="240" cy="140" r="4.5" />
                <circle cx="120" cy="140" r="3.5" fill="#a855f7" />
              </g>
            )}
            <text x="140" y="225" textAnchor="middle" className="text-[12px] font-bold fill-purple-700 dark:fill-purple-300">
              Téglatest (a ≠ b ≠ c): C = 8, É = 12, L = 6
            </text>
          </svg>
        );

      case 'triangularPrism':
        return (
          <svg viewBox="0 0 300 240" className="w-full h-56 select-none">
            {/* Hátsó szaggatott él */}
            <line x1="60" y1="170" x2="130" y2="130" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />
            <line x1="130" y1="130" x2="230" y2="150" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />
            <line x1="130" y1="130" x2="130" y2="60" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />

            {/* Lapok kitöltése */}
            {highlightFaces && (
              <>
                <polygon points="60,100 130,60 230,80" fill="rgba(168, 85, 247, 0.3)" stroke="#9333ea" strokeWidth="1.5" />
                <polygon points="60,100 230,80 230,150 60,170" fill="rgba(192, 132, 252, 0.35)" stroke="#7e22ce" strokeWidth="2" />
                <polygon points="60,100 60,170 130,130 130,60" fill="rgba(147, 51, 234, 0.2)" />
              </>
            )}

            {/* Látható élek */}
            {highlightEdges && (
              <g stroke="#6b21a8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <polygon points="60,100 130,60 230,80" />
                <line x1="60" y1="100" x2="60" y2="170" />
                <line x1="230" y1="80" x2="230" y2="150" />
                <line x1="60" y1="170" x2="230" y2="150" />
              </g>
            )}

            {/* Csúcsok */}
            {highlightVertices && (
              <g fill="#ec4899" stroke="#fff" strokeWidth="1.5">
                <circle cx="60" cy="100" r="4.5" />
                <circle cx="130" cy="60" r="4.5" />
                <circle cx="230" cy="80" r="4.5" />
                <circle cx="60" cy="170" r="4.5" />
                <circle cx="130" cy="130" r="3.5" fill="#a855f7" />
                <circle cx="230" cy="150" r="4.5" />
              </g>
            )}
            <text x="145" y="225" textAnchor="middle" className="text-[12px] font-bold fill-purple-700 dark:fill-purple-300">
              Háromoldalú hasáb: C = 6, É = 9, L = 5
            </text>
          </svg>
        );

      case 'squarePyramid':
        return (
          <svg viewBox="0 0 300 240" className="w-full h-56 select-none">
            {/* Hátsó szaggatott alapélek */}
            <line x1="70" y1="160" x2="150" y2="130" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />
            <line x1="150" y1="130" x2="230" y2="160" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />
            <line x1="150" y1="50" x2="150" y2="130" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />

            {/* Lapok */}
            {highlightFaces && (
              <>
                <polygon points="150,50 70,160 150,190" fill="rgba(192, 132, 252, 0.35)" stroke="#7e22ce" strokeWidth="1.5" />
                <polygon points="150,50 150,190 230,160" fill="rgba(147, 51, 234, 0.4)" stroke="#7e22ce" strokeWidth="1.5" />
              </>
            )}

            {/* Élek */}
            {highlightEdges && (
              <g stroke="#6b21a8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <line x1="70" y1="160" x2="150" y2="190" />
                <line x1="150" y1="190" x2="230" y2="160" />
                <line x1="150" y1="50" x2="70" y2="160" />
                <line x1="150" y1="50" x2="150" y2="190" />
                <line x1="150" y1="50" x2="230" y2="160" />
              </g>
            )}

            {/* Csúcsok */}
            {highlightVertices && (
              <g fill="#ec4899" stroke="#fff" strokeWidth="1.5">
                <circle cx="150" cy="50" r="5" fill="#f43f5e" />
                <circle cx="70" cy="160" r="4.5" />
                <circle cx="150" cy="190" r="4.5" />
                <circle cx="230" cy="160" r="4.5" />
                <circle cx="150" cy="130" r="3.5" fill="#a855f7" />
              </g>
            )}
            <text x="150" y="225" textAnchor="middle" className="text-[12px] font-bold fill-purple-700 dark:fill-purple-300">
              Négyzetes gúla: C = 5, É = 8, L = 5
            </text>
          </svg>
        );

      case 'tetrahedron':
        return (
          <svg viewBox="0 0 300 240" className="w-full h-56 select-none">
            {/* Hátsó szaggatott él */}
            <line x1="70" y1="170" x2="170" y2="140" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />

            {/* Lapok */}
            {highlightFaces && (
              <>
                <polygon points="150,55 70,170 230,175" fill="rgba(192, 132, 252, 0.3)" stroke="#7e22ce" strokeWidth="2" />
                <polygon points="150,55 170,140 230,175" fill="rgba(147, 51, 234, 0.35)" />
              </>
            )}

            {/* Élek */}
            {highlightEdges && (
              <g stroke="#6b21a8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <line x1="150" y1="55" x2="70" y2="170" />
                <line x1="150" y1="55" x2="230" y2="175" />
                <line x1="150" y1="55" x2="170" y2="140" />
                <line x1="70" y1="170" x2="230" y2="175" />
                <line x1="170" y1="140" x2="230" y2="175" />
              </g>
            )}

            {/* Csúcsok */}
            {highlightVertices && (
              <g fill="#ec4899" stroke="#fff" strokeWidth="1.5">
                <circle cx="150" cy="55" r="5" />
                <circle cx="70" cy="170" r="4.5" />
                <circle cx="170" cy="140" r="4" fill="#a855f7" />
                <circle cx="230" cy="175" r="4.5" />
              </g>
            )}
            <text x="150" y="225" textAnchor="middle" className="text-[12px] font-bold fill-purple-700 dark:fill-purple-300">
              Szabályos tetraéder: C = 4, É = 6, L = 4
            </text>
          </svg>
        );

      case 'cylinder':
        return (
          <svg viewBox="0 0 300 240" className="w-full h-56 select-none">
            {/* Alsó alap szaggatott hátsó íve */}
            <path d="M 80,165 A 70,25 0 0,1 220,165" fill="none" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />

            {/* Palást test */}
            <path
              d="M 80,85 L 80,165 A 70,25 0 0,0 220,165 L 220,85 Z"
              fill="rgba(192, 132, 252, 0.3)"
              stroke="none"
            />

            {/* Felső alaplap */}
            <ellipse cx="150" cy="85" rx="70" ry="25" fill="rgba(168, 85, 247, 0.4)" stroke="#6b21a8" strokeWidth="2.5" />

            {/* Alsó látható perem és alkotók */}
            <path d="M 80,165 A 70,25 0 0,0 220,165" fill="none" stroke="#6b21a8" strokeWidth="2.5" />
            <line x1="80" y1="85" x2="80" y2="165" stroke="#6b21a8" strokeWidth="2.5" />
            <line x1="220" y1="85" x2="220" y2="165" stroke="#6b21a8" strokeWidth="2.5" />

            <text x="150" y="225" textAnchor="middle" className="text-[12px] font-bold fill-purple-700 dark:fill-purple-300">
              Egyenes körhenger: 2 kör alaplap + 1 hengerpalást (Forgástest)
            </text>
          </svg>
        );

      case 'cone':
        return (
          <svg viewBox="0 0 300 240" className="w-full h-56 select-none">
            {/* Alsó kör szaggatott hátsó ív */}
            <path d="M 80,165 A 70,25 0 0,1 220,165" fill="none" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />

            {/* Palást kúp test */}
            <path
              d="M 150,55 L 80,165 A 70,25 0 0,0 220,165 Z"
              fill="rgba(192, 132, 252, 0.35)"
              stroke="none"
            />

            {/* Alsó látható ív és alkotók */}
            <path d="M 80,165 A 70,25 0 0,0 220,165" fill="none" stroke="#6b21a8" strokeWidth="2.5" />
            <line x1="150" y1="55" x2="80" y2="165" stroke="#6b21a8" strokeWidth="2.5" />
            <line x1="150" y1="55" x2="220" y2="165" stroke="#6b21a8" strokeWidth="2.5" />

            {/* Csúcs */}
            <circle cx="150" cy="55" r="4.5" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />

            <text x="150" y="225" textAnchor="middle" className="text-[12px] font-bold fill-purple-700 dark:fill-purple-300">
              Egyenes körkúp: 1 kör alap + 1 körcikk palást + 1 csúcs
            </text>
          </svg>
        );

      case 'sphere':
        return (
          <svg viewBox="0 0 300 240" className="w-full h-56 select-none">
            {/* Gömb körvonal és árnyékolás */}
            <circle cx="150" cy="115" r="70" fill="rgba(192, 132, 252, 0.3)" stroke="#6b21a8" strokeWidth="2.5" />

            {/* Egyenlítői kör szaggatott és látható része */}
            <path d="M 80,115 A 70,20 0 0,1 220,115" fill="none" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />
            <path d="M 80,115 A 70,20 0 0,0 220,115" fill="none" stroke="#6b21a8" strokeWidth="1.5" />

            {/* Sugár R jelölése */}
            <line x1="150" y1="115" x2="220" y2="115" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2 2" />
            <circle cx="150" cy="115" r="3.5" fill="#f43f5e" />
            <text x="185" y="108" className="text-[12px] font-bold fill-rose-600">R</text>

            <text x="150" y="225" textAnchor="middle" className="text-[12px] font-bold fill-purple-700 dark:fill-purple-300">
              Gömb: 0 él, 0 csúcs, egyetlen folytonos görbe felület
            </text>
          </svg>
        );
    }
  };

  // Háló nézet rajzoló
  const renderNetView = () => {
    switch (selectedShape) {
      case 'cube':
      case 'cuboid':
        return (
          <div className="flex flex-col items-center justify-center h-56 space-y-2">
            <svg viewBox="0 0 240 180" className="w-48 h-40">
              {/* T-alakú vagy kereszt alakú kockaháló */}
              <g fill="rgba(192, 132, 252, 0.25)" stroke="#6b21a8" strokeWidth="2">
                <rect x="30" y="60" width="40" height="40" />
                <rect x="70" y="60" width="40" height="40" />
                <rect x="110" y="60" width="40" height="40" />
                <rect x="150" y="60" width="40" height="40" />
                <rect x="70" y="20" width="40" height="40" />
                <rect x="70" y="100" width="40" height="40" />
              </g>
            </svg>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Kereszt elrendezésű síkbeli testháló (6 négyzetlap összefüggően)
            </span>
          </div>
        );
      case 'cylinder':
        return (
          <div className="flex flex-col items-center justify-center h-56 space-y-2">
            <svg viewBox="0 0 240 180" className="w-52 h-40">
              {/* Henger hálója: 1 téglalap + 2 kör */}
              <rect x="40" y="55" width="160" height="70" fill="rgba(192, 132, 252, 0.25)" stroke="#6b21a8" strokeWidth="2" />
              <circle cx="80" cy="30" r="24" fill="rgba(168, 85, 247, 0.35)" stroke="#6b21a8" strokeWidth="2" />
              <circle cx="160" cy="150" r="24" fill="rgba(168, 85, 247, 0.35)" stroke="#6b21a8" strokeWidth="2" />
              <text x="120" y="95" textAnchor="middle" className="text-[11px] font-bold fill-purple-800 dark:fill-purple-300">
                Palást: K = 2·r·π
              </text>
            </svg>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Henger hálója: Téglalap palást és 2 azonos kör alaplap
            </span>
          </div>
        );
      case 'cone':
        return (
          <div className="flex flex-col items-center justify-center h-56 space-y-2">
            <svg viewBox="0 0 240 180" className="w-52 h-40">
              {/* Kúp hálója: 1 körcikk + 1 kör */}
              <path d="M 120,30 L 60,110 A 80,80 0 0,0 180,110 Z" fill="rgba(192, 132, 252, 0.3)" stroke="#6b21a8" strokeWidth="2" />
              <circle cx="120" cy="140" r="24" fill="rgba(168, 85, 247, 0.4)" stroke="#6b21a8" strokeWidth="2" />
              <text x="120" y="85" textAnchor="middle" className="text-[11px] font-bold fill-purple-800 dark:fill-purple-300">
                Körcikk palást
              </text>
            </svg>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Kúp hálója: Körcikk palást és 1 kör alaplap
            </span>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-56 space-y-2 text-center p-4">
            <Shapes className="w-12 h-12 text-purple-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              A {currentInfo.name} síkba kiterített hálózata {currentInfo.faces} összefüggő síklapból áll.
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm">
              Alaplap: {currentInfo.baseShape} | Oldallapok: {currentInfo.sideShape}
            </span>
          </div>
        );
    }
  };

  // Nézetek rajzoló (Elöl-, felül-, oldalnézet)
  const renderViewsMode = () => {
    return (
      <div className="grid grid-cols-3 gap-3 p-3 h-56 items-center">
        {/* Elölnézet */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-2">
            Elölnézet (szemből)
          </span>
          <div className="w-16 h-16 flex items-center justify-center border-2 border-purple-600 bg-purple-200/50 dark:bg-purple-900/50 rounded-md">
            {selectedShape === 'cube' && <span className="font-mono font-bold text-xs">Négyzet</span>}
            {selectedShape === 'cuboid' && <span className="font-mono font-bold text-xs">Téglalap</span>}
            {selectedShape === 'cylinder' && <span className="font-mono font-bold text-xs">Téglalap</span>}
            {selectedShape === 'cone' && <span className="font-mono font-bold text-xs">Háromszög</span>}
            {selectedShape === 'sphere' && <span className="font-mono font-bold text-xs">Kör</span>}
            {selectedShape === 'squarePyramid' && <span className="font-mono font-bold text-xs">Háromszög</span>}
            {selectedShape === 'tetrahedron' && <span className="font-mono font-bold text-xs">Háromszög</span>}
            {selectedShape === 'triangularPrism' && <span className="font-mono font-bold text-xs">Téglalap</span>}
          </div>
        </div>

        {/* Felülnézet */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-2">
            Felülnézet (fentről)
          </span>
          <div className="w-16 h-16 flex items-center justify-center border-2 border-purple-600 bg-purple-200/50 dark:bg-purple-900/50 rounded-md">
            {selectedShape === 'cube' && <span className="font-mono font-bold text-xs">Négyzet</span>}
            {selectedShape === 'cuboid' && <span className="font-mono font-bold text-xs">Téglalap</span>}
            {selectedShape === 'cylinder' && <span className="font-mono font-bold text-xs">Kör</span>}
            {selectedShape === 'cone' && <span className="font-mono font-bold text-xs">Kör + pont</span>}
            {selectedShape === 'sphere' && <span className="font-mono font-bold text-xs">Kör</span>}
            {selectedShape === 'squarePyramid' && <span className="font-mono font-bold text-xs">Négyzet + X</span>}
            {selectedShape === 'tetrahedron' && <span className="font-mono font-bold text-xs">Háromszög</span>}
            {selectedShape === 'triangularPrism' && <span className="font-mono font-bold text-xs">Háromszög</span>}
          </div>
        </div>

        {/* Oldalnézet */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-2">
            Oldalnézet (oldalról)
          </span>
          <div className="w-16 h-16 flex items-center justify-center border-2 border-purple-600 bg-purple-200/50 dark:bg-purple-900/50 rounded-md">
            {selectedShape === 'cube' && <span className="font-mono font-bold text-xs">Négyzet</span>}
            {selectedShape === 'cuboid' && <span className="font-mono font-bold text-xs">Téglalap</span>}
            {selectedShape === 'cylinder' && <span className="font-mono font-bold text-xs">Téglalap</span>}
            {selectedShape === 'cone' && <span className="font-mono font-bold text-xs">Háromszög</span>}
            {selectedShape === 'sphere' && <span className="font-mono font-bold text-xs">Kör</span>}
            {selectedShape === 'squarePyramid' && <span className="font-mono font-bold text-xs">Háromszög</span>}
            {selectedShape === 'tetrahedron' && <span className="font-mono font-bold text-xs">Háromszög</span>}
            {selectedShape === 'triangularPrism' && <span className="font-mono font-bold text-xs">Téglalap</span>}
          </div>
        </div>
      </div>
    );
  };

  // 8 Részletes Tananyag Szekció
  const sections: TheorySection[] = [
    {
      id: 'sec-intro',
      title: '1. Mi a geometriai test? A 3. dimenzió felfedezése',
      badge: 'Alapfogalom',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A körülöttünk lévő világ háromdimenziós (3D). Míg a papírlapra rajzolt síkidomoknak (négyzet, kör, háromszög) csak <strong>hosszúságuk</strong> és <strong>szélességük</strong> van (területük van, de vastagságuk nincs), addig a térbeli tárgyaknak van egy harmadik mérete is: a <strong>magasságuk (mélységük)</strong>.
          </p>

          <DimensionEvolutionSvg />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-3">
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-center">
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">0 Dimenzió (0D)</span>
              <span className="font-black text-sm text-slate-800 dark:text-slate-200">Pont</span>
              <p className="text-[11px] text-slate-500 mt-0.5">Nincs kiterjedése</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">1 Dimenzió (1D)</span>
              <span className="font-black text-sm text-slate-800 dark:text-slate-200">Szakasz, Vonal</span>
              <p className="text-[11px] text-slate-500 mt-0.5">Hosszúság (h)</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">2 Dimenzió (2D)</span>
              <span className="font-black text-sm text-slate-800 dark:text-slate-200">Síkidom</span>
              <p className="text-[11px] text-slate-500 mt-0.5">Kerület és Terület (T)</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">3 Dimenzió (3D)</span>
              <span className="font-black text-sm text-slate-800 dark:text-slate-200">Geometriai Test</span>
              <p className="text-[11px] text-slate-500 mt-0.5">Felszín (A) és Térfogat (V)</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 flex items-start gap-2.5">
            <Info className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong>Definíció:</strong> A <strong>geometriai test</strong> a tér zárt felülettel határolt véges része. A testet határoló felület elválasztja a test belső pontjait a külső tértől.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-polyhedrons-rotationals',
      title: '2. A testek két nagy családja: Poliéderek és Forgástestek',
      badge: 'Csoportosítás',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A térbeli testeket leggyakrabban a határoló felületeik tulajdonsága szerint osztjuk két alapvető csoportra:
          </p>

          <PolyhedraVsRotationalSvg />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border-2 border-purple-200 dark:border-purple-800 space-y-2">
              <div className="flex items-center gap-2">
                <Box className="w-5 h-5 text-purple-600" />
                <h4 className="font-black text-base text-purple-900 dark:text-purple-200">1. Poliéderek (soklapú testek)</h4>
              </div>
              <p className="text-xs sm:text-sm">
                Olyan térbeli testek, amelyeket <strong>kizárólag síklapok (sokszögek)</strong> határolnak. Nincsen egyetlen görbe felületük sem!
              </p>
              <ul className="text-xs space-y-1 list-disc list-inside text-slate-600 dark:text-slate-400">
                <li><strong>Kocka</strong> (6 egyenlő négyzet határolja)</li>
                <li><strong>Téglatest</strong> (6 téglalap határolja)</li>
                <li><strong>Hasábok</strong> (háromszög, négyszög, ötszög alapú hasábok)</li>
                <li><strong>Gúlák</strong> (egy alaplap és háromszög oldallapok)</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-50/80 dark:bg-cyan-950/40 border-2 border-cyan-200 dark:border-cyan-800 space-y-2">
              <div className="flex items-center gap-2">
                <Boxes className="w-5 h-5 text-cyan-600" />
                <h4 className="font-black text-base text-cyan-900 dark:text-cyan-200">2. Forgástestek és Görbe felületű testek</h4>
              </div>
              <p className="text-xs sm:text-sm">
                Olyan testek, amelyek felületének legalább egy része <strong>görbe felület</strong> (palást vagy gömbfelület). Jellemzően egy síkidom egyenes körüli megforgatásával származnak.
              </p>
              <ul className="text-xs space-y-1 list-disc list-inside text-slate-600 dark:text-slate-400">
                <li><strong>Egyenes körhenger</strong> (téglalap forgatása)</li>
                <li><strong>Egyenes körkúp</strong> (derékszögű háromszög forgatása)</li>
                <li><strong>Gömb</strong> (félkör átmérő körüli forgatása)</li>
                <li><strong>Félgömb, csonkakúp, tórusz (fánk)</strong></li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-elements',
      title: '3. A poliéderek határoló elemei: Csúcsok, Élek, Lapok',
      badge: 'Testelemek',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Minden poliéder felépítését három alapvető geometriai elem határozza meg:
          </p>

          <PolyhedronElementsSvg />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
            <div className="p-3.5 rounded-xl bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800">
              <div className="font-bold text-pink-700 dark:text-pink-300 text-sm flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-pink-600" /> Csúcs (C)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                A csúcs egy <strong>pont a térben</strong>, ahol legalább három él (és három lap) találkozik egymással.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
              <div className="font-bold text-purple-700 dark:text-purple-300 text-sm flex items-center gap-1.5">
                <div className="w-4 h-0.5 bg-purple-600" /> Él (É)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Az él egy <strong>egyenes szakasz</strong>, amely két szomszédos lap közös határvonala (metszésvonala).
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
              <div className="font-bold text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-1.5">
                <div className="w-3 h-3 bg-emerald-500/50 border border-emerald-600" /> Lap (L)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                A testet határoló <strong>sokszög síkidom</strong> (pl. háromszög, négyzet, téglalap, ötszög).
              </p>
            </div>
          </div>

          {/* Összehasonlító táblázat */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 mt-4">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
                <tr>
                  <th className="p-2.5">Poliéder neve</th>
                  <th className="p-2.5 text-center">Csúcsok (C)</th>
                  <th className="p-2.5 text-center">Lapok (L)</th>
                  <th className="p-2.5 text-center">Élek (É)</th>
                  <th className="p-2.5">Lapok alakja</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2 font-sans font-semibold">Kocka</td>
                  <td className="p-2 text-center text-pink-600 font-bold">8</td>
                  <td className="p-2 text-center text-emerald-600 font-bold">6</td>
                  <td className="p-2 text-center text-purple-600 font-bold">12</td>
                  <td className="p-2 font-sans">6 egybevágó négyzet</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2 font-sans font-semibold">Téglatest</td>
                  <td className="p-2 text-center text-pink-600 font-bold">8</td>
                  <td className="p-2 text-center text-emerald-600 font-bold">6</td>
                  <td className="p-2 text-center text-purple-600 font-bold">12</td>
                  <td className="p-2 font-sans">6 téglalap (páronként egybevágó)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2 font-sans font-semibold">Háromoldalú hasáb</td>
                  <td className="p-2 text-center text-pink-600 font-bold">6</td>
                  <td className="p-2 text-center text-emerald-600 font-bold">5</td>
                  <td className="p-2 text-center text-purple-600 font-bold">9</td>
                  <td className="p-2 font-sans">2 háromszög + 3 téglalap</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2 font-sans font-semibold">Négyzetes gúla (piramis)</td>
                  <td className="p-2 text-center text-pink-600 font-bold">5</td>
                  <td className="p-2 text-center text-emerald-600 font-bold">5</td>
                  <td className="p-2 text-center text-purple-600 font-bold">8</td>
                  <td className="p-2 font-sans">1 négyzet + 4 háromszög</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2 font-sans font-semibold">Tetraéder (háromoldalú gúla)</td>
                  <td className="p-2 text-center text-pink-600 font-bold">4</td>
                  <td className="p-2 text-center text-emerald-600 font-bold">4</td>
                  <td className="p-2 text-center text-purple-600 font-bold">6</td>
                  <td className="p-2 font-sans">4 háromszög</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 bg-purple-50/30 dark:bg-purple-950/20">
                  <td className="p-2 font-sans font-bold">n-oldalú hasáb</td>
                  <td className="p-2 text-center font-bold">2n</td>
                  <td className="p-2 text-center font-bold">n + 2</td>
                  <td className="p-2 text-center font-bold">3n</td>
                  <td className="p-2 font-sans">2 db n-szög + n db téglalap</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 bg-amber-50/30 dark:bg-amber-950/20">
                  <td className="p-2 font-sans font-bold">n-oldalú gúla</td>
                  <td className="p-2 text-center font-bold">n + 1</td>
                  <td className="p-2 text-center font-bold">n + 1</td>
                  <td className="p-2 text-center font-bold">2n</td>
                  <td className="p-2 font-sans">1 db n-szög + n db háromszög</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'sec-euler',
      title: '4. Az Euler-féle poliédertétel',
      badge: 'Kiemelt Tétel',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A svájci származású matematikus zseni, <strong>Leonhard Euler</strong> (1707–1783) fedezte fel az egyik legszebb és legfontosabb térgeometriai összefüggést:
          </p>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-950/60 dark:to-indigo-950/60 border-2 border-purple-300 dark:border-purple-800 text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
              Euler-féle poliédertétel (minden konvex testre)
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-purple-900 dark:text-purple-100">
              C + L = É + 2
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              „A csúcsok és a lapok számának összege mindig pontosan 2-vel nagyobb az élek számánál!”
            </p>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="font-bold text-slate-900 dark:text-white">Példák az összefüggés ellenőrzésére:</div>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Kocka:</strong> C = 8, L = 6, É = 12 → 8 + 6 = 12 + 2 → 14 = 14 ✓</li>
              <li><strong>Tetraéder:</strong> C = 4, L = 4, É = 6 → 4 + 4 = 6 + 2 → 8 = 8 ✓</li>
              <li><strong>Háromoldalú hasáb:</strong> C = 6, L = 5, É = 9 → 6 + 5 = 9 + 2 → 11 = 11 ✓</li>
              <li><strong>Négyzetes gúla:</strong> C = 5, L = 5, É = 8 → 5 + 5 = 8 + 2 → 10 = 10 ✓</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 text-xs sm:text-sm">
              <Lightbulb className="w-4 h-4 text-amber-600" /> Hogyan számolhatunk ki ismeretlent a tételből?
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Ha egy feladatban megadják, hogy egy konvex testnek <strong>7 lapja</strong> és <strong>15 éle</strong> van, a csúcsok számát egyből megkapjuk átrendezéssel:
              <br />
              <span className="font-mono font-bold text-purple-700 dark:text-purple-300">C = É + 2 - L = 15 + 2 - 7 = 10 csúcs</span> (ez az ötszög alapú hasáb).
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'sec-prisms-pyramids',
      title: '5. Hasábok és Gúlák részletes világa',
      badge: 'Alakzattípusok',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A 6. osztályos tananyagban a poliéderek két leggyakoribb családját vizsgáljuk kiemelten:
          </p>

          <PrismsVsPyramidsSvg />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
              <div className="font-bold text-blue-900 dark:text-blue-300 text-sm">
                Hasábok (Prizmák)
              </div>
              <ul className="text-xs space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-400">
                <li>Van <strong>2 egybevágó és párhuzamos alaplapja</strong> (pl. háromszög, négyszög, hatszög).</li>
                <li>Az alaplapokat összekötő oldallapok összessége alkotja a <strong>palástot</strong>.</li>
                <li><strong>Egyenes hasáb:</strong> az oldalélek merőlegesek az alaplapra (minden oldallap téglalap).</li>
                <li>Különleges hasábok: a kocka és a téglatest négyzetes, illetve téglalap alapú egyenes hasábok.</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2">
              <div className="font-bold text-amber-900 dark:text-amber-300 text-sm">
                Gúlák (Piramisok)
              </div>
              <ul className="text-xs space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-400">
                <li>Csak <strong>1 sokszög alaplapja</strong> van.</li>
                <li>Minden oldallapja <strong>háromszög</strong>, és ezek mind egyetlen közös pontban (a gúla csúcsában) futnak össze.</li>
                <li><strong>Szabályos gúla:</strong> alapja szabályos sokszög (pl. szabályos háromszög, négyzet), és az oldallapjai egybevágó egyenlő szárú háromszögek.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-rotationals',
      title: '6. A forgástestek világa: Henger, Kúp és Gömb',
      badge: 'Forgástestek',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Forgástesteknek nevezzük azokat a testeket, amelyek egy síkidom egyenes vonal (a forgástengely) körüli 360 fokos megforgatásával állíthatók elő.
          </p>

          <RotationalSolidsGenerationSvg />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
            <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-center space-y-1">
              <div className="font-bold text-sm text-purple-800 dark:text-purple-300">Egyenes körhenger</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Egy téglalap egyik oldala körüli megforgatásakor jön létre. 2 párhuzamos kör alaplapja és 1 hengerpalástja van.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 text-center space-y-1">
              <div className="font-bold text-sm text-cyan-800 dark:text-cyan-300">Egyenes körkúp</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Egy derékszögű háromszög befogója körüli megforgatásakor keletkezik. 1 kör alapja, 1 csúcsa és körcikk palástja van.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-center space-y-1">
              <div className="font-bold text-sm text-indigo-800 dark:text-indigo-300">Gömb</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Egy félkör átmérője körüli megforgatásakor jön létre. Nincs csúcsa, nincs éle, teljesen szimmetrikus gömbfelület határolja.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-nets',
      title: '7. Testhálók: Kiterítés a síkba',
      badge: 'Hálórajzok',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Ha egy test felületét bizonyos élek mentén felvágjuk úgy, hogy a határoló lapok összefüggőek maradjanak, és a felületet kiterítjük a síkba, akkor a test <strong>síkbeli hálóját</strong> (testhálóját) kapjuk.
          </p>

          <CubeNetsValidationSvg />

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> A kocka 11 különböző síkbeli hálója
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A kockának pontosan <strong>11 különböző</strong> kiterítése van, amelyekből hajtogatással zárt kocka építhető.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-emerald-800 dark:text-emerald-300">
                <strong>✓ Érvényes háló (pl. kereszt):</strong> 4 négyzet egymás mellett egy sorban, és egy-egy fül a két ellentétes oldalon (nem egymás mellett).
              </div>
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 text-rose-800 dark:text-rose-300">
                <strong>✗ Hibás elrendezés:</strong> Ha 6 négyzet egymás után 1 egyenes sávban áll, vagy ha a két fedőlap a palást ugyanazon oldalára esik (összehajtva átfednék egymást).
              </div>
            </div>
          </div>

          <CylinderConeNetsSvg />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
              <strong>Henger hálója:</strong> 1 darab téglalap (a palást) és 2 darab azonos körlap (az alap- és fedőlap). A téglalap szélessége pontosan a kör kerülete ($K = 2 \cdot r \cdot \pi$).
            </div>
            <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800">
              <strong>Kúp hálója:</strong> 1 darab körcikk (a palást) és 1 darab körlap (az alaplap). A körcikk ívhossza megegyezik a kör kerületével.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-views',
      title: '8. Nézetek és vetületi ábrázolás',
      badge: 'Térlátás',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Mivel a papír és a monitor sík felület, a 3D testeket gyakran három merőleges irányú síkra vetítve (három nézetben) ábrázoljuk (Monge-féle képsíkrendszer):
          </p>

          <MongeViewsProjectionSvg />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-center">
              <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block">
                1. Elölnézet
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                A testre pontosan szemből, vízszintes irányból merőlegesen vetítve kapott síkbeli kép.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-center">
              <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider block">
                2. Felülnézet
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                A testre fentről, függőlegesen lefelé tekintve vetített síkbeli kép (alaprajz).
              </p>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-center">
              <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
                3. Oldalnézet
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                A testre oldalról (balról vagy jobbról) vetített kép (profil).
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-1.5">
            <div className="font-bold text-purple-800 dark:text-purple-300 flex items-center gap-1.5 text-xs sm:text-sm">
              <Eye className="w-4 h-4 text-purple-600" /> Kockaépítmények és magasságszámok
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Kockákból épített építményeknél a felülnézet (alaprajz) négyzeteibe beírjuk, hogy az adott mezőben <strong>hány kocka áll egymáson</strong>. Az építményben lévő kiskockák összessége egyszerűen a mezőkbe írt számok összege!
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Alakzatok a térben"
      subtitle="Térbeli testek csoportosítása, csúcsok, élek, lapok, az Euler-féle poliédertétel, testhálók és nézetek"
      topicBadge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="purple"
      pdfFilename="6_osztaly_V_alakzatok_a_terben_tananyag.pdf"
      ruleTitle="Euler-féle poliédertétel"
      ruleFormula="C + L = É + 2 \quad • \quad \text{Kocka / Téglatest: } C = 8,\; É = 12,\; L = 6"
      quickRule={{
        label: 'Euler-féle poliédertétel',
        formula: 'C + L = É + 2 \\quad • \\quad \\text{Kocka / Téglatest: } C = 8,\\; É = 12,\\; L = 6'
      }}
      practiceTitle="Készen állsz a térbeli alakzatok feladványaira?"
      practiceSubtitle="Tedd próbára tudásod a 30 feladatos interaktív kvízben, a párosítóban és a csoportosítóban!"
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* Interaktív 3D Test Stúdió Laboratórium */}
      <div className="p-4 sm:p-5 rounded-3xl border-2 border-purple-200 dark:border-purple-900/60 bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/40 dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-900 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-200/60 dark:border-purple-900/40 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                Interaktív Test Vizsgáló és 3D Labor
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Válassz ki egy térbeli alakzatot, és vizsgáld meg a modelljét, csúcsait, kiterített hálóját és vetületi nézeteit!
              </p>
            </div>
          </div>

          {/* Nézetmód választó fülek */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                viewMode === '3d'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              3D Modell
            </button>
            <button
              onClick={() => setViewMode('net')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                viewMode === 'net'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Testháló
            </button>
            <button
              onClick={() => setViewMode('views')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                viewMode === 'views'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Nézetek
            </button>
          </div>
        </div>

        {/* Alakzat választó gombok */}
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              { id: 'cube', label: 'Kocka' },
              { id: 'cuboid', label: 'Téglatest' },
              { id: 'triangularPrism', label: '3-oldalú hasáb' },
              { id: 'squarePyramid', label: 'Négyzetes gúla' },
              { id: 'tetrahedron', label: 'Tetraéder' },
              { id: 'cylinder', label: 'Henger' },
              { id: 'cone', label: 'Kúp' },
              { id: 'sphere', label: 'Gömb' }
            ] as const
          ).map((s) => (
            <Button
              key={s.id}
              variant={selectedShape === s.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedShape(s.id)}
              className={`rounded-xl text-xs font-bold h-8 transition-all ${
                selectedShape === s.id
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {s.label}
            </Button>
          ))}
        </div>

        {/* Központi vizsgáló: Balra a grafika, Jobbra az infókártyák */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Grafika doboz */}
          <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-purple-200/80 dark:border-purple-900/50 p-3 shadow-xs relative flex flex-col justify-center items-center min-h-[240px]">
            {viewMode === '3d' && render3DView()}
            {viewMode === 'net' && renderNetView()}
            {viewMode === 'views' && renderViewsMode()}

            {/* Kiemelés kapcsolók csak 3D módban */}
            {viewMode === '3d' && currentInfo.type === 'Poliéder' && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 w-full text-xs">
                <label className="inline-flex items-center gap-1.5 cursor-pointer text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={highlightVertices}
                    onChange={(e) => setHighlightVertices(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  Csúcsok (C)
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={highlightEdges}
                    onChange={(e) => setHighlightEdges(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  Élek (É)
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={highlightFaces}
                    onChange={(e) => setHighlightFaces(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  Lapok (L)
                </label>
              </div>
            )}
          </div>

          {/* Elemösszesítő és Euler kártyák */}
          <div className="md:col-span-5 space-y-3">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/50 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {currentInfo.name}
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  {currentInfo.type}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {currentInfo.description}
              </p>
            </div>

            {/* Számszaki adatok rács */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-900">
                <span className="text-[10px] font-bold text-pink-600 uppercase tracking-wider block">Csúcsok (C)</span>
                <span className="font-mono font-black text-base text-pink-700 dark:text-pink-300">
                  {currentInfo.vertices}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900">
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Élek (É)</span>
                <span className="font-mono font-black text-base text-purple-700 dark:text-purple-300">
                  {currentInfo.edges}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Lapok (L)</span>
                <span className="font-mono font-black text-base text-emerald-700 dark:text-emerald-300">
                  {currentInfo.faces}
                </span>
              </div>
            </div>

            {/* Euler-összefüggés doboz */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 border border-purple-200 dark:border-purple-800 text-center space-y-1">
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-300 uppercase tracking-wider block">
                Euler-tétel ellenőrzése (C + L = É + 2)
              </span>
              <div className="font-mono font-bold text-xs sm:text-sm text-purple-900 dark:text-purple-100">
                {currentInfo.eulerFormula}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TheoryTemplate>
  );
};

export default SpatialShapesTheory;

import * as THREE from 'three';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid, Text, ContactShadows, Environment, Center, PivotControls } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { 
    ArrowLeft, 
    Box, 
    Maximize, 
    Layers, 
    RotateCcw, 
    Settings2, 
    ChevronDown, 
    ChevronUp,
    Play,
    Pause,
    Ruler,
    Info,
    Layout
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Types ---

interface VolumeSurfaceToolProps {
    onBack: () => void;
}

// --- 3D Components ---

/**
 * A single face of the rectangular prism
 */
const Face = ({ 
    width, 
    height, 
    position, 
    rotation, 
    color, 
    opacity = 0.6,
    label
}: { 
    width: number, 
    height: number, 
    position: [number, number, number], 
    rotation: [number, number, number],
    color: string,
    opacity?: number,
    label?: string
}) => {
    return (
        <group position={position} rotation={rotation}>
            <mesh>
                <planeGeometry args={[width, height]} />
                <meshStandardMaterial 
                    color={color} 
                    transparent 
                    opacity={opacity} 
                    side={THREE.DoubleSide}
                    roughness={0.1}
                    metalness={0.1}
                />
            </mesh>
            <lineSegments>
                <edgesGeometry args={[useMemo(() => new THREE.PlaneGeometry(width, height), [width, height])]} />
                <lineBasicMaterial color={color} linewidth={2} />
            </lineSegments>
            {/* {label && (
                <Text
                    position={[0, 0, 0.01]}
                    fontSize={Math.min(width, height) * 0.2}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/Inter-Bold.woff"
                >
                    {label}
                </Text>
            )} */}
        </group>
    );
};

/**
 * The Rectangular Prism that can unfold
 */
const RectangularPrism = ({ 
    width, 
    height, 
    depth, 
    unfoldProgress,
    showFaces = true
}: { 
    width: number, 
    height: number, 
    depth: number, 
    unfoldProgress: number,
    showFaces?: boolean
}) => {
    // Unfold logic:
    // 0 = Folded (Prism)
    // 1 = Unfolded (Flat Net)
    
    const angle = (unfoldProgress * Math.PI) / 2;

    if (!showFaces) return null;

    return (
        <group>
            {/* BOTTOM (Center of the net) */}
            <Face 
                width={width} 
                height={depth} 
                position={[0, -height/2, 0]} 
                rotation={[-Math.PI / 2, 0, 0]} 
                color="#3b82f6" 
                label="Alap"
            />

            {/* FRONT */}
            <group position={[0, -height/2, depth/2]} rotation={[angle, 0, 0]}>
                <Face 
                    width={width} 
                    height={height} 
                    position={[0, height/2, 0]} 
                    rotation={[0, 0, 0]} 
                    color="#ef4444" 
                    label="Előlap"
                />
                
                {/* TOP (Attached to Front) */}
                <group position={[0, height, 0]} rotation={[angle - Math.PI / 2, 0, 0]}>
                    <Face 
                        width={width} 
                        height={depth} 
                        position={[0, depth/2, 0]} 
                        rotation={[0, 0, 0]} 
                        color="#8b5cf6" 
                        label="Fedőlap"
                    />
                </group>
            </group>

            {/* BACK */}
            <group position={[0, -height/2, -depth/2]} rotation={[-angle, 0, 0]}>
                <Face 
                    width={width} 
                    height={height} 
                    position={[0, height/2, 0]} 
                    rotation={[0, Math.PI, 0]} 
                    color="#f59e0b" 
                    label="Hátlap"
                />
            </group>

            {/* LEFT */}
            <group position={[-width/2, -height/2, 0]} rotation={[0, 0, angle]}>
                <Face 
                    width={depth} 
                    height={height} 
                    position={[0, height/2, 0]} 
                    rotation={[0, -Math.PI / 2, 0]} 
                    color="#10b981" 
                    label="Bal"
                />
            </group>

            {/* RIGHT */}
            <group position={[width/2, -height/2, 0]} rotation={[0, 0, -angle]}>
                <Face 
                    width={depth} 
                    height={height} 
                    position={[0, height/2, 0]} 
                    rotation={[0, Math.PI / 2, 0]} 
                    color="#ec4899" 
                    label="Jobb"
                />
            </group>
        </group>
    );
};

/**
 * Unit cubes for volume visualization
 */
const VolumeFill = ({ 
    width, 
    height, 
    depth, 
    fillCount,
    visible 
}: { 
    width: number, 
    height: number, 
    depth: number, 
    fillCount: number,
    visible: boolean
}) => {
    if (!visible) return null;

    const cubes = [];
    let count = 0;

    for (let y = 0; y < height; y++) {
        for (let z = 0; z < depth; z++) {
            for (let x = 0; x < width; x++) {
                if (count < fillCount) {
                    cubes.push(
                        <mesh 
                            key={`${x}-${y}-${z}`} 
                            position={[
                                x - width / 2 + 0.5, 
                                y - height / 2 + 0.5, 
                                z - depth / 2 + 0.5
                            ]}
                        >
                            <boxGeometry args={[0.95, 0.95, 0.95]} />
                            <meshStandardMaterial color="#6366f1" roughness={0.2} metalness={0.1} />
                        </mesh>
                    );
                }
                count++;
            }
        }
    }

    return <group>{cubes}</group>;
};

// --- Main Tool Component ---

export function VolumeSurfaceTool({ onBack }: VolumeSurfaceToolProps) {
    const [dimensions, setDimensions] = useState({ width: 3, height: 2, depth: 2 });
    const [isUnfolded, setIsUnfolded] = useState(false);
    const [unfoldProgress, setUnfoldProgress] = useState(0);
    const [isFilling, setIsFilling] = useState(false);
    const [fillCount, setFillCount] = useState(0);
    const [autoFill, setAutoFill] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const volume = dimensions.width * dimensions.height * dimensions.depth;
    const surfaceArea = 2 * (dimensions.width * dimensions.height + dimensions.height * dimensions.depth + dimensions.width * dimensions.depth);

    // Animation loop for unfolding
    useEffect(() => {
        let raf: number;
        const animate = () => {
            setUnfoldProgress(prev => {
                const target = isUnfolded ? 1 : 0;
                if (Math.abs(prev - target) < 0.01) return target;
                return prev + (target - prev) * 0.1;
            });
            raf = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(raf);
    }, [isUnfolded]);

    // Animation loop for filling
    useEffect(() => {
        if (!autoFill) return;
        
        const interval = setInterval(() => {
            setFillCount(prev => {
                if (prev >= volume) {
                    setAutoFill(false);
                    return volume;
                }
                return prev + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [autoFill, volume]);

    const handleReset = () => {
        setDimensions({ width: 3, height: 2, depth: 2 });
        setIsUnfolded(false);
        setUnfoldProgress(0);
        setIsFilling(false);
        setFillCount(0);
        setAutoFill(false);
    };

    const updateDimension = (dim: keyof typeof dimensions, val: number) => {
        const newVal = Math.max(1, Math.min(10, val));
        setDimensions(prev => ({ ...prev, [dim]: newVal }));
        setFillCount(0);
        setAutoFill(false);
    };

    return (
        <div className="fixed inset-0 flex flex-col bg-slate-50 overflow-hidden select-none z-50">
            {/* Header */}
            <header className="h-16 flex items-center justify-between px-6 bg-white border-b shadow-sm z-30">
                <div className="flex items-center gap-6">
                    <Button 
                        variant="ghost" 
                        onClick={onBack} 
                        size="sm" 
                        className="rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold px-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Vissza
                    </Button>
                    <div className="h-8 w-px bg-slate-200" />
                    <h1 className="text-lg font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                        <Box className="w-5 h-5 text-indigo-600" />
                        Térfogat és Felszín 3D
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-xl border-slate-200 font-bold gap-2 text-slate-600"
                        onClick={handleReset}
                    >
                        <RotateCcw className="w-4 h-4" />
                        Alaphelyzet
                    </Button>
                </div>
            </header>

            <main className="flex-1 relative flex overflow-hidden">
                {/* 3D Scene */}
                <div className="flex-1 bg-slate-100 relative">
                    <Canvas 
                        shadows 
                        camera={{ position: [5, 5, 5], fov: 50 }}
                        onPointerMissed={() => setIsSelected(false)}
                    >
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} castShadow />
                        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                        
                        <PivotControls 
                            anchor={[0, -1, 0]} 
                            depthTest={false} 
                            lineWidth={3} 
                            axisColors={['#ef4444', '#10b981', '#3b82f6']} 
                            scale={2}
                            activeAxes={[true, true, true]}
                            visible={isSelected}
                        >
                            <group onClick={(e) => { e.stopPropagation(); setIsSelected(true); }}>
                                <Center top>
                                    <RectangularPrism 
                                        width={dimensions.width} 
                                        height={dimensions.height} 
                                        depth={dimensions.depth} 
                                        unfoldProgress={unfoldProgress}
                                        showFaces={true}
                                    />
                                    
                                    <VolumeFill 
                                        width={dimensions.width} 
                                        height={dimensions.height} 
                                        depth={dimensions.depth} 
                                        fillCount={fillCount}
                                        visible={isFilling}
                                    />
                                </Center>
                            </group>
                        </PivotControls>

                        <ContactShadows 
                            position={[0, -2, 0]} 
                            opacity={0.4} 
                            scale={20} 
                            blur={2} 
                            far={4.5} 
                        />
                        <Grid 
                            infiniteGrid 
                            fadeDistance={50} 
                            fadeStrength={5} 
                            cellSize={1} 
                            sectionSize={5} 
                            sectionThickness={1.5} 
                            sectionColor="#334155"
                        />
                        <Environment preset="city" />
                        <OrbitControls makeDefault />
                    </Canvas>

                    {/* Quick Stats Overlay */}
                    <div className="absolute top-6 left-6 flex flex-col gap-3 pointer-events-none">
                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-lg pointer-events-auto transition-all hover:scale-105">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Térfogat (V)</div>
                            <div className="text-2xl font-black text-indigo-600">{volume} <span className="text-sm font-bold text-slate-400">e³</span></div>
                            <div className="text-[10px] font-bold text-slate-400 mt-1">{dimensions.width} × {dimensions.height} × {dimensions.depth}</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-lg pointer-events-auto transition-all hover:scale-105">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Felszín (A)</div>
                            <div className="text-2xl font-black text-emerald-600">{surfaceArea} <span className="text-sm font-bold text-slate-400">e²</span></div>
                            <div className="text-[10px] font-bold text-slate-400 mt-1">2(ab + bc + ac)</div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls */}
                <aside className="w-80 bg-white border-l flex flex-col overflow-y-auto shadow-2xl z-20">
                    <div className="p-6 border-b flex items-center justify-between bg-slate-50/50">
                        <div className="flex items-center gap-2 font-black text-slate-800">
                            <Settings2 className="w-5 h-5 text-indigo-600" />
                            Beállítások
                        </div>
                    </div>

                    <div className="p-6 space-y-8">
                        {/* Dimensions */}
                        <section className="space-y-4">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Méretek (Egység)</h3>
                            
                            {[
                                { id: 'width', label: 'Szélesség (a)', color: 'text-blue-600', bg: 'bg-blue-50' },
                                { id: 'height', label: 'Magasság (b)', color: 'text-red-600', bg: 'bg-red-50' },
                                { id: 'depth', label: 'Mélység (c)', color: 'text-amber-600', bg: 'bg-amber-50' }
                            ].map((dim) => (
                                <div key={dim.id} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className={cn("text-xs font-bold", dim.color)}>{dim.label}</label>
                                        <span className={cn("px-2 py-0.5 rounded-lg font-black text-xs", dim.bg, dim.color)}>
                                            {dimensions[dim.id as keyof typeof dimensions]} egység
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button 
                                            variant="outline" 
                                            size="icon" 
                                            className="h-8 w-8 rounded-lg"
                                            onClick={() => updateDimension(dim.id as any, dimensions[dim.id as keyof typeof dimensions] - 1)}
                                        >
                                            <ChevronDown className="w-4 h-4" />
                                        </Button>
                                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div 
                                                className={cn("h-full transition-all duration-300", dim.bg.replace('bg-', 'bg-').replace('50', '500'))}
                                                style={{ width: `${(dimensions[dim.id as keyof typeof dimensions] / 10) * 100}%` }}
                                            />
                                        </div>
                                        <Button 
                                            variant="outline" 
                                            size="icon" 
                                            className="h-8 w-8 rounded-lg"
                                            onClick={() => updateDimension(dim.id as any, dimensions[dim.id as keyof typeof dimensions] + 1)}
                                        >
                                            <ChevronUp className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <div className="h-px bg-slate-100" />

                        {/* Actions */}
                        <section className="space-y-4">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Szemléltetés</h3>
                            
                            <div className="grid grid-cols-1 gap-3">
                                <Button 
                                    className={cn(
                                        "w-full h-14 rounded-2xl font-bold justify-start px-6 gap-3 transition-all",
                                        isUnfolded ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200" : "bg-white text-slate-700 border-2 border-slate-100 hover:border-indigo-200"
                                    )}
                                    onClick={() => {
                                        setIsUnfolded(!isUnfolded);
                                        setIsFilling(false);
                                        setAutoFill(false);
                                    }}
                                >
                                    <Layout className="w-5 h-5" />
                                    {isUnfolded ? "Test összehajtása" : "Test kiterítése (Felszín)"}
                                </Button>

                                <Button 
                                    className={cn(
                                        "w-full h-14 rounded-2xl font-bold justify-start px-6 gap-3 transition-all",
                                        isFilling ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200" : "bg-white text-slate-700 border-2 border-slate-100 hover:border-indigo-200"
                                    )}
                                    onClick={() => {
                                        setIsFilling(!isFilling);
                                        setIsUnfolded(false);
                                        if (!isFilling) setFillCount(0);
                                    }}
                                >
                                    <Layers className="w-5 h-5" />
                                    {isFilling ? "Mérés befejezése" : "Térfogat mérése (Egységkockák)"}
                                </Button>

                                {isFilling && (
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 animate-in slide-in-from-top duration-300">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Feltöltés</span>
                                            <span className="text-xs font-black text-indigo-600">{fillCount} / {volume} e³</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button 
                                                variant="outline" 
                                                className="flex-1 rounded-xl h-10 font-bold text-xs"
                                                onClick={() => setFillCount(Math.min(volume, fillCount + 1))}
                                            >
                                                +1 Kocka
                                            </Button>
                                            <Button 
                                                className="flex-1 rounded-xl h-10 font-bold text-xs bg-indigo-600"
                                                onClick={() => setAutoFill(!autoFill)}
                                            >
                                                {autoFill ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                                                {autoFill ? "Megállít" : "Automata"}
                                            </Button>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            className="w-full mt-2 h-8 text-[10px] font-black text-slate-400 uppercase"
                                            onClick={() => setFillCount(0)}
                                        >
                                            Ürítés
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100">
                            <div className="flex items-center gap-2 mb-4">
                                <Info className="w-4 h-4 text-indigo-600" />
                                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Tudtad?</span>
                            </div>
                            <p className="text-xs text-indigo-700 leading-relaxed font-medium">
                                A **felszín** az alakzatot határoló lapok összterülete. Képzeld el, mennyi csomagolópapír kellene hozzá!
                                <br /><br />
                                A **térfogat** pedig azt mutatja meg, mennyi helyet foglal el a test a térben – hány egységkocka fér bele.
                            </p>
                        </section>
                    </div>
                </aside>
            </main>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, CheckCircle2, XCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type Color = 'red' | 'green' | 'blue' | 'yellow';
type Shape = 'square' | 'circle' | 'triangle';
type Size = 'small' | 'large';
type Hole = 'solid' | 'holed';

interface LogicBlock {
    id: string;
    color: Color;
    shape: Shape;
    size: Size;
    hole: Hole;
}

interface TargetSet {
    id: string;
    name: string;
    condition: (block: LogicBlock) => boolean;
    placedBlocks: LogicBlock[];
}

const COLORS: Color[] = ['red', 'green', 'blue', 'yellow'];
const SHAPES: Shape[] = ['square', 'circle', 'triangle'];
const SIZES: Size[] = ['small', 'large'];
const HOLES: Hole[] = ['solid', 'holed'];

const generateAllBlocks = (): LogicBlock[] => {
    const blocks: LogicBlock[] = [];
    COLORS.forEach(color => {
        SHAPES.forEach(shape => {
            SIZES.forEach(size => {
                HOLES.forEach(hole => {
                    blocks.push({
                        id: `${color}-${shape}-${size}-${hole}`,
                        color,
                        shape,
                        size,
                        hole
                    });
                });
            });
        });
    });
    return blocks;
};

const TARGET_SETS_DEF = [
    {
        id: 'set1',
        name: 'Kicsi, piros, nem lyukas',
        condition: (b: LogicBlock) => b.size === 'small' && b.color === 'red' && b.hole === 'solid'
    },
    {
        id: 'set2',
        name: 'Teli, szögletes, nagy',
        condition: (b: LogicBlock) => b.hole === 'solid' && b.shape === 'square' && b.size === 'large'
    },
    {
        id: 'set3',
        name: 'Nem teli, nem nagy, nem sárga',
        condition: (b: LogicBlock) => b.hole === 'holed' && b.size === 'small' && b.color !== 'yellow'
    },
    {
        id: 'set4',
        name: 'Kék és lyukas, de nem szögletes',
        condition: (b: LogicBlock) => b.color === 'blue' && b.hole === 'holed' && b.shape !== 'square'
    }
];

export function LogicBlocksGame({ onBack }: { onBack: () => void }) {
    const [availableBlocks, setAvailableBlocks] = useState<LogicBlock[]>([]);
    const [targetSets, setTargetSets] = useState<TargetSet[]>([]);
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | 'info' } | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        const allBlocks = generateAllBlocks().sort(() => Math.random() - 0.5);
        setAvailableBlocks(allBlocks);
        setTargetSets(TARGET_SETS_DEF.map(def => ({ ...def, placedBlocks: [] })));
        setSelectedBlockId(null);
        setMessage({ text: 'Válassz ki egy elemet, majd kattints a megfelelő halmazra!', type: 'info' });
        setIsCompleted(false);
    };

    const handleBlockSelect = (blockId: string) => {
        if (isCompleted) return;
        setSelectedBlockId(blockId === selectedBlockId ? null : blockId);
        if (message?.type !== 'info') setMessage(null);
    };

    const handleTargetSelect = (setId: string) => {
        if (!selectedBlockId || isCompleted) return;

        const block = availableBlocks.find(b => b.id === selectedBlockId);
        if (!block) return;

        const targetSet = targetSets.find(s => s.id === setId);
        if (!targetSet) return;

        if (targetSet.condition(block)) {
            // Correct placement
            setTargetSets(prev => prev.map(s => {
                if (s.id === setId) {
                    return { ...s, placedBlocks: [...s.placedBlocks, block] };
                }
                return s;
            }));
            setAvailableBlocks(prev => prev.filter(b => b.id !== selectedBlockId));
            setSelectedBlockId(null);
            setMessage({ text: 'Helyes! Az elem a halmazba tartozik.', type: 'success' });
            checkCompletion();
        } else {
            // Incorrect placement
            setMessage({ text: 'Hoppá! Ez az elem nem illik ebbe a halmazba.', type: 'error' });
            setSelectedBlockId(null);
        }
    };

    const checkCompletion = () => {
        // A játék akkor ér véget, ha az összes olyan elem a helyére került, ami BELEILLIK valamelyik halmazba.
        // Érdekes megközelítés: 48 elem van. Néhány elem esetleg egy halmazba sem illik, vagy többe is.
        // Optimalizáció: Csak azokat az elemeket kell elhelyezni, amik valahova jók.
        // Viszont ha úgy nézzük, hogy melyik halmaznak mennyi eleme van összesen...
        setTimeout(() => {
            setAvailableBlocks(currentAvailable => {
                setTargetSets(currentSets => {
                    let hasRemainingValidPairs = false;

                    for (const block of currentAvailable) {
                        for (const set of currentSets) {
                            if (set.condition(block)) {
                                hasRemainingValidPairs = true;
                                break;
                            }
                        }
                        if (hasRemainingValidPairs) break;
                    }

                    if (!hasRemainingValidPairs) {
                        setIsCompleted(true);
                        setMessage({ text: 'Gratulálok! Minden halmazt sikeresen feltöltöttél a megfelelő elemekkel!', type: 'success' });
                        confetti({
                            particleCount: 150,
                            spread: 100,
                            origin: { y: 0.6 }
                        });
                    }
                    return currentSets;
                });
                return currentAvailable;
            });
        }, 100);
    };

    const renderBlock = (block: LogicBlock, isSelected: boolean = false) => {
        const sizeClasses = block.size === 'large' ? 'w-10 h-10 md:w-12 md:h-12' : 'w-6 h-6 md:w-8 md:h-8';
        const colorClasses = {
            red: 'bg-red-500',
            green: 'bg-green-500',
            blue: 'bg-blue-500',
            yellow: 'bg-yellow-400'
        }[block.color];

        const shapeClasses = {
            square: 'rounded-sm',
            circle: 'rounded-full',
            triangle: 'clip-triangle'
        }[block.shape];

        return (
            <div
                key={block.id}
                onClick={() => handleBlockSelect(block.id)}
                className={cn(
                    "flex items-center justify-center cursor-pointer transition-all shrink-0 relative hover:scale-110",
                    sizeClasses,
                    colorClasses,
                    shapeClasses,
                    isSelected && "ring-4 ring-primary ring-offset-2 scale-110 z-10"
                )}
                style={block.shape === 'triangle' ? { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' } : {}}
            >
                {block.hole === 'holed' && (
                    <div className="w-1/3 h-1/3 min-w-[4px] min-h-[4px] bg-white rounded-full absolute"></div>
                )}
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 animate-in fade-in duration-500 relative">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={onBack} className="rounded-full shadow-sm bg-white/50 backdrop-blur hover:bg-white hover:shadow-md transition-all">
                        <ArrowLeft className="w-4 h-4 text-slate-600" />
                    </Button>
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Válogatások, Halmazok</h2>
                </div>
                <Button size="sm" onClick={initGame} variant="outline" className="rounded-xl shadow-sm bg-white text-slate-600 hover:text-slate-900 border-slate-200 gap-2">
                    <RefreshCw className="w-3 h-3" />
                    Újra
                </Button>
            </div>

            {message && (
                <div className={cn(
                    "mb-4 p-3 text-sm rounded-xl flex items-center gap-2 animate-in slide-in-from-top-4 font-medium",
                    message.type === 'success' ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                        message.type === 'error' ? "bg-rose-50 text-rose-700 border border-rose-200" :
                            "bg-blue-50 text-blue-700 border border-blue-200"
                )}>
                    {message.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                    {message.type === 'error' && <XCircle className="w-4 h-4 shrink-0" />}
                    {message.type === 'info' && <Info className="w-4 h-4 shrink-0" />}
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {targetSets.map((set) => (
                    <div
                        key={set.id}
                        onClick={() => handleTargetSelect(set.id)}
                        className={cn(
                            "border-2 rounded-2xl p-4 min-h-[140px] transition-all flex flex-col cursor-pointer",
                            selectedBlockId ? "border-primary/50 bg-primary/5 hover:bg-primary/10 hover:border-primary shadow-md" : "border-slate-200 bg-white hover:border-slate-300"
                        )}
                    >
                        <div className="bg-white border rounded-md px-3 py-1 text-xs md:text-sm font-bold text-slate-700 w-fit mb-2 shadow-sm relative -mt-7 mx-auto md:mx-0">
                            {set.name}
                        </div>

                        <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start flex-1 p-1">
                            {set.placedBlocks.map(block => (
                                <div key={block.id} className="cursor-default pointer-events-none">
                                    {renderBlock(block)}
                                </div>
                            ))}
                            {set.placedBlocks.length === 0 && (
                                <div className="w-full text-center text-slate-400 italic text-xs mt-2">
                                    {selectedBlockId ? "Kattints ide a kiválasztott elem elhelyezéséhez!" : "Üres halmaz"}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-50/80 backdrop-blur border border-slate-200 p-4 rounded-2xl shadow-sm">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Logikai készlet ({availableBlocks.length} db)</h3>
                {availableBlocks.length > 0 ? (
                    <div className="flex flex-wrap gap-2 justify-center">
                        {availableBlocks.map(block => renderBlock(block, block.id === selectedBlockId))}
                    </div>
                ) : (
                    <div className="text-center py-4 text-slate-400 font-medium text-sm">
                        Minden elemet elrendeztél!
                    </div>
                )}
            </div>
        </div>
    );
}

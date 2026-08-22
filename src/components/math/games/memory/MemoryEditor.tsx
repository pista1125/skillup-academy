import React, { useState, useEffect, useRef } from 'react';
import { 
  Trash2, 
  RotateCw, 
  Layers, 
  Maximize, 
  Minimize, 
  FlipHorizontal, 
  FlipVertical,
  Save,
  Download,
  Plus,
  Search,
  ChevronRight,
  ChevronLeft,
  Settings2,
  X,
  LayoutDashboard,
  Columns
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { SHAPE_LIBRARY, CATEGORIES, COLORS, ShapeDefinition } from '@/lib/memoryShapes';
import * as LucideIcons from 'lucide-react';
import { DEFAULT_LEVELS } from '@/data/memoryData';

interface MemoryItem {
  id: string;
  type: 'shape' | 'lucide' | 'emoji';
  content: string;
  color: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  isFilled: boolean;
  flipX: boolean;
  flipY: boolean;
  zIndex: number;
}

interface MemoryExercise {
  id: number;
  items: MemoryItem[];
}

export default function MemoryEditor() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [exercises, setExercises] = useState<MemoryExercise[][]>(
    DEFAULT_LEVELS.map(level => level.exercises)
  );
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('memory_game_custom_levels');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const merged = DEFAULT_LEVELS.map((level, lIdx) => {
          return level.exercises.map((defEx, exIdx) => {
             const customEx = parsed[lIdx] && parsed[lIdx][exIdx];
             if (customEx && customEx.items && customEx.items.length > 0) {
               return customEx;
             }
             return defEx;
          });
        });
        setExercises(merged);
      } catch (e) {
        console.error("Failed to load saved exercises", e);
      }
    }
  }, []);

  const saveToLocal = (data: MemoryExercise[][]) => {
    localStorage.setItem('memory_game_custom_levels', JSON.stringify(data));
  };

  const currentLevelItems = exercises[levelIdx][exerciseIdx].items;
  const selectedItem = currentLevelItems.find(item => item.id === selectedId);

  const addItem = (shape: ShapeDefinition) => {
    const newItem: MemoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: shape.type,
      content: shape.content,
      color: COLORS[0].value,
      x: 50,
      y: 50,
      size: 60,
      rotation: 0,
      isFilled: true,
      flipX: false,
      flipY: false,
      zIndex: currentLevelItems.length + 1
    };
    
    const newExercises = [...exercises];
    newExercises[levelIdx][exerciseIdx].items.push(newItem);
    setExercises(newExercises);
    setSelectedId(newItem.id);
    saveToLocal(newExercises);
  };

  const updateSelectedItem = (updates: Partial<MemoryItem>) => {
    if (!selectedId) return;
    const newExercises = [...exercises];
    const items = newExercises[levelIdx][exerciseIdx].items;
    const idx = items.findIndex(item => item.id === selectedId);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...updates };
      setExercises(newExercises);
      saveToLocal(newExercises);
    }
  };

  // Auto-open right panel when an item is selected
  useEffect(() => {
    if (selectedId) {
      setIsRightPanelOpen(true);
    }
  }, [selectedId]);

  const deleteSelectedItem = () => {
    if (!selectedId) return;
    const newExercises = [...exercises];
    newExercises[levelIdx][exerciseIdx].items = currentLevelItems.filter(item => item.id !== selectedId);
    setExercises(newExercises);
    setSelectedId(null);
    saveToLocal(newExercises);
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(exercises, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'memory_game_levels.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const renderShapeIcon = (shape: ShapeDefinition, size = 24) => {
    if (shape.type === 'emoji') return <span style={{ fontSize: size }}>{shape.content}</span>;
    if (shape.type === 'lucide') {
      const IconComp = (LucideIcons as any)[shape.content];
      return IconComp ? <IconComp size={size} /> : null;
    }
    // Simple SVG placeholders for custom shapes
    return <div className="w-6 h-6 border-2 border-current rounded-sm flex items-center justify-center text-[8px]">{shape.content.substring(0, 2)}</div>;
  };

  const renderCanvasItem = (item: MemoryItem) => {
    const isSelected = selectedId === item.id;
    const style: React.CSSProperties = {
      left: `${item.x}%`,
      top: `${item.y}%`,
      transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scaleX(${item.flipX ? -1 : 1}) scaleY(${item.flipY ? -1 : 1})`,
      fontSize: `${item.size}px`,
      color: item.color,
      position: 'absolute',
      zIndex: item.zIndex,
      cursor: 'move',
      userSelect: 'none',
      transition: 'all 0.1s ease-out'
    };

    let content = null;
    if (item.type === 'emoji') content = item.content;
    else if (item.type === 'lucide') {
      const IconComp = (LucideIcons as any)[item.content];
      content = IconComp ? <IconComp size={item.size} strokeWidth={item.isFilled ? 3 : 2} fill={item.isFilled ? 'currentColor' : 'none'} /> : null;
    } else {
       // Custom shape rendering (placeholder logic for now)
       content = (
         <div 
          style={{ 
            width: item.size, 
            height: item.size, 
            backgroundColor: item.isFilled ? item.color : 'transparent',
            border: !item.isFilled ? `3px solid ${item.color}` : 'none'
          }} 
          className={cn(
            item.content === 'circle' && "rounded-full",
            item.content === 'square' && "rounded-none"
          )}
         />
       );
    }

    return (
      <div 
        key={item.id} 
        style={style} 
        onClick={(e) => { e.stopPropagation(); setSelectedId(item.id); }}
        className={cn(
          "group",
          isSelected && "ring-2 ring-indigo-500 ring-offset-4 rounded-lg"
        )}
      >
        {content}
      </div>
    );
  };

  return (
    <div className="flex flex-1 w-full bg-slate-50 dark:bg-slate-950 overflow-hidden relative">
      {/* Sidebar: Shape Library */}
      <div className={cn(
        "absolute left-0 top-20 bottom-0 z-40 w-72 shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 ease-in-out",
        !isLeftPanelOpen && "-translate-x-full"
      )}>
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Layers className="text-indigo-600" /> Alakzat-tár
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setIsLeftPanelOpen(false)} className="rounded-full">
            <X size={18} />
          </Button>
        </div>

        <div className="p-4 border-b border-slate-50 dark:border-slate-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder="Keresés..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl bg-slate-50 dark:bg-slate-800 border-none h-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          {CATEGORIES.map(category => {
            const shapes = SHAPE_LIBRARY.filter(s => s.category === category.id && (searchTerm === '' || s.name.toLowerCase().includes(searchTerm.toLowerCase())));
            if (shapes.length === 0) return null;

            return (
              <div key={category.id}>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 px-2 flex items-center gap-2">
                  <category.icon size={12} /> {category.label}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {shapes.map(shape => (
                    <button
                      key={shape.id}
                      onClick={() => addItem(shape)}
                      title={shape.name}
                      className="aspect-square flex items-center justify-center bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all text-slate-700 dark:text-slate-300"
                    >
                      {renderShapeIcon(shape, 20)}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Area: Canvas + Level Controls */}
      <div className="flex-1 flex flex-col relative">
        {/* Top bar: Level selector */}
        <div className="h-20 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3">
                {!isLeftPanelOpen && (
                  <Button variant="default" size="icon" onClick={() => setIsLeftPanelOpen(true)} className="rounded-xl shadow-lg bg-indigo-600">
                    <Layers size={18} />
                  </Button>
                )}
                <Button variant="outline" size="icon" className="rounded-full" onClick={() => setLevelIdx(Math.max(0, levelIdx - 1))}>
                   <ChevronLeft size={16} />
                </Button>
                <div className="text-center w-24">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Szint</div>
                  <div className="font-bold flex items-center justify-center gap-2">
                    {levelIdx + 1} <span className="text-xs text-slate-400">/ 5</span>
                  </div>
                </div>
                <Button variant="outline" size="icon" className="rounded-full" onClick={() => setLevelIdx(Math.min(4, levelIdx + 1))}>
                   <ChevronRight size={16} />
                </Button>
             </div>

             <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />

             <div className="flex items-center gap-2 overflow-x-auto max-w-lg no-scrollbar">
                {exercises[levelIdx].map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => { setExerciseIdx(i); setSelectedId(null); }}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all border shrink-0",
                      exerciseIdx === i 
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-105" 
                        : "bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
             </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={exportJSON} className="gap-2 rounded-xl">
              <Download size={16} /> Export JSON
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div 
          ref={canvasRef}
          className="flex-1 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] relative overflow-hidden z-10"
          onClick={() => setSelectedId(null)}
          onMouseMove={(e) => {
             if (selectedId && e.buttons === 1) {
                const rect = canvasRef.current?.getBoundingClientRect();
                if (rect) {
                   const x = ((e.clientX - rect.left) / rect.width) * 100;
                   const y = ((e.clientY - rect.top) / rect.height) * 100;
                   updateSelectedItem({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
                }
             }
          }}
        >
          {currentLevelItems.map(renderCanvasItem)}
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-6 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm text-slate-500 font-medium shadow-xl">
             Kattints a formára a mozgatáshoz és szerkesztéshez
          </div>

          {!isRightPanelOpen && selectedId && (
            <Button 
               variant="default" 
               size="icon" 
               onClick={(e) => { e.stopPropagation(); setIsRightPanelOpen(true); }} 
               className="absolute top-4 right-4 rounded-xl shadow-lg bg-indigo-600 z-30"
            >
              <Settings2 size={18} />
            </Button>
          )}
        </div>
      </div>

      {/* Property Editor Panel */}
      <div className={cn(
        "absolute right-0 top-20 bottom-0 z-40 w-72 shrink-0 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col gap-6 shadow-2xl transition-transform duration-300 ease-in-out",
        !isRightPanelOpen && "translate-x-full"
      )}>
        {selectedItem ? (
          <>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold flex items-center gap-2">
                <Settings2 className="text-indigo-600 w-5 h-5" /> Tulajdonságok
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setIsRightPanelOpen(false)} className="rounded-full">
                <X size={18} />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Color Picker */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase">Szín</label>
                <div className="grid grid-cols-5 gap-2">
                  {COLORS.map(color => (
                    <button
                      key={color.value}
                      onClick={() => updateSelectedItem({ color: color.value })}
                      style={{ backgroundColor: color.value }}
                      className={cn(
                        "w-full aspect-square rounded-lg border-2 border-transparent transition-all",
                        selectedItem.color === color.value && "border-indigo-600 scale-110 shadow-lg"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Transformations */}
              <div className="space-y-4">
                <div className="space-y-2">
                   <div className="flex justify-between">
                     <label className="text-xs font-bold text-slate-400 uppercase">Méret</label>
                     <span className="text-xs font-bold">{selectedItem.size}px</span>
                   </div>
                   <Slider 
                    value={[selectedItem.size]} 
                    min={20} 
                    max={200} 
                    step={1} 
                    onValueChange={([val]) => updateSelectedItem({ size: val })}
                   />
                </div>

                <div className="space-y-2">
                   <div className="flex justify-between">
                     <label className="text-xs font-bold text-slate-400 uppercase">Forgatás</label>
                     <span className="text-xs font-bold">{selectedItem.rotation}°</span>
                   </div>
                   <Slider 
                    value={[selectedItem.rotation]} 
                    min={0} 
                    max={359} 
                    step={1} 
                    onValueChange={([val]) => updateSelectedItem({ rotation: val })}
                   />
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className={cn("flex-1 gap-2 rounded-xl", selectedItem.flipX && "bg-indigo-50 border-indigo-200")} 
                    onClick={() => updateSelectedItem({ flipX: !selectedItem.flipX })}
                  >
                    <FlipHorizontal size={16} /> Tükrözés H
                  </Button>
                  <Button 
                    variant="outline" 
                    className={cn("flex-1 gap-2 rounded-xl", selectedItem.flipY && "bg-indigo-50 border-indigo-200")} 
                    onClick={() => updateSelectedItem({ flipY: !selectedItem.flipY })}
                  >
                    <FlipVertical size={16} /> Tükrözés V
                  </Button>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Kitöltés</label>
                <div className="flex gap-2">
                   <Button 
                    variant={selectedItem.isFilled ? "default" : "outline"} 
                    className="flex-1 rounded-xl"
                    onClick={() => updateSelectedItem({ isFilled: true })}
                   >
                     Kitöltött
                   </Button>
                   <Button 
                    variant={!selectedItem.isFilled ? "default" : "outline"} 
                    className="flex-1 rounded-xl"
                    onClick={() => updateSelectedItem({ isFilled: false })}
                   >
                     Körvonal
                   </Button>
                </div>
              </div>

              {/* Z-Index */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Rétegezés</label>
                <div className="flex gap-2">
                   <Button variant="outline" className="flex-1 gap-2 rounded-xl" onClick={() => updateSelectedItem({ zIndex: selectedItem.zIndex + 1 })}>
                     <Maximize size={14} /> Előre
                   </Button>
                   <Button variant="outline" className="flex-1 gap-2 rounded-xl" onClick={() => updateSelectedItem({ zIndex: Math.max(1, selectedItem.zIndex - 1) })}>
                     <Minimize size={14} /> Hátra
                   </Button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto">
                 <Button variant="destructive" className="w-full gap-2 rounded-xl" onClick={deleteSelectedItem}>
                   <Trash2 size={18} /> Alakzat Törlése
                 </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
            <Layers size={48} className="mb-4" />
            <p className="font-medium">Válassz ki egy alakzatot<br/>a szerkesztéshez</p>
          </div>
        )}
      </div>
    </div>
  );
}

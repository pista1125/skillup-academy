import { useState, useRef, useEffect, useMemo } from 'react';
import {
  WordItem,
  PositionedWord,
  WordCloudShape,
  WORD_CLOUD_SHAPES,
  layoutWordCloud
} from './wordCloudUtils';
import { Button } from '@/components/ui/button';
import { Download, EyeOff, BarChart2, Cloud, Sparkles, Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface WordCloudDisplayProps {
  words: WordItem[];
  title?: string;
  question?: string;
  shape?: WordCloudShape;
  onShapeChange?: (shape: WordCloudShape) => void;
  isTeacher?: boolean;
  onHideWord?: (word: string) => void;
  className?: string;
}

export function WordCloudDisplay({
  words,
  title,
  question,
  shape = 'cloud',
  onShapeChange,
  isTeacher = false,
  onHideWord,
  className
}: WordCloudDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 480 });
  const [currentShape, setCurrentShape] = useState<WordCloudShape>(shape);
  const [viewMode, setViewMode] = useState<'cloud' | 'table'>('cloud');
  const [hoveredWord, setHoveredWord] = useState<WordItem | null>(null);
  const [selectedWord, setSelectedWord] = useState<WordItem | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (shape && shape !== currentShape) {
      setCurrentShape(shape);
    }
  }, [shape]);

  // Keep word cloud responsive
  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const w = Math.max(320, Math.floor(rect.width));
        const h = Math.max(340, Math.min(540, Math.floor(w * 0.58)));
        setDimensions({ width: w, height: h });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSelectShape = (newShape: WordCloudShape) => {
    setCurrentShape(newShape);
    if (onShapeChange) {
      onShapeChange(newShape);
    }
    const found = WORD_CLOUD_SHAPES.find(s => s.id === newShape);
    toast.success(`Alakzat átváltva: ${found?.icon} ${found?.name}`);
  };

  // Uniform 2D shape geometry
  const shapeSize = Math.min(dimensions.width * 0.88, dimensions.height * 0.88);
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const shapeX = centerX - shapeSize / 2;
  const shapeY = centerY - shapeSize / 2;

  // Compute positioned layout strictly inside the 2D shape
  const positionedWords: PositionedWord[] = useMemo(() => {
    if (words.length === 0) return [];
    return layoutWordCloud(words, dimensions.width, dimensions.height, currentShape);
  }, [words, dimensions.width, dimensions.height, currentShape]);

  const currentShapeConfig = useMemo(() => {
    return WORD_CLOUD_SHAPES.find(s => s.id === currentShape) || WORD_CLOUD_SHAPES[0];
  }, [currentShape]);

  const totalResponses = useMemo(() => {
    return words.reduce((acc, curr) => acc + curr.count, 0);
  }, [words]);

  // Export 2D word cloud as PNG
  const handleExportPNG = async () => {
    if (words.length === 0) return;
    setIsDownloading(true);

    try {
      const exportWidth = 1200;
      const exportHeight = 750;
      const exportShapeSize = Math.min(exportWidth * 0.85, exportHeight * 0.82);
      const exportCenterX = exportWidth / 2;
      const exportCenterY = exportHeight / 2 + 25;
      const exportShapeX = exportCenterX - exportShapeSize / 2;
      const exportShapeY = exportCenterY - exportShapeSize / 2;

      const canvas = document.createElement('canvas');
      canvas.width = exportWidth;
      canvas.height = exportHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Canvas context could not be created');

      // 1. Clean background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, exportWidth, exportHeight);

      // 2. Decorative borders
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.strokeRect(16, 16, exportWidth - 32, exportHeight - 32);

      // 3. Header
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title || 'SkillUp Szófelhő', exportWidth / 2, 55);

      if (question) {
        ctx.fillStyle = '#64748b';
        ctx.font = 'italic 18px sans-serif';
        ctx.fillText(`„${question}”`, exportWidth / 2, 88);
      }

      // 4. Draw 2D watermark shape
      if (currentShape !== 'rectangle' && typeof Path2D !== 'undefined') {
        ctx.save();
        ctx.translate(exportShapeX, exportShapeY);
        ctx.scale(exportShapeSize / 100, exportShapeSize / 100);
        const path2D = new Path2D(currentShapeConfig.svgPath);
        ctx.fillStyle = currentShapeConfig.watermarkColor;
        ctx.globalAlpha = 0.07;
        ctx.fill(path2D);
        ctx.strokeStyle = currentShapeConfig.watermarkColor;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 1.6;
        ctx.stroke(path2D);
        ctx.restore();
      }

      // 5. Scaled words
      const scaledWords = layoutWordCloud(words, exportWidth, exportHeight - 50, currentShape);

      scaledWords.forEach((word) => {
        ctx.save();
        ctx.font = `bold ${Math.round(word.fontSize * 1.35)}px sans-serif`;
        ctx.fillStyle = word.color || '#2563eb';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(word.text, word.x, word.y + 25);
        ctx.restore();
      });

      // 6. Footer
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(
        `SkillUp Academy • ${currentShapeConfig.icon} ${currentShapeConfig.name} • ${new Date().toLocaleDateString('hu-HU')} • ${totalResponses} válasz`,
        exportWidth - 36,
        exportHeight - 32
      );

      const link = document.createElement('a');
      link.download = `szofelho-${currentShape}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('Szófelhő sikeresen letöltve képként!');
    } catch (err) {
      console.error(err);
      toast.error('Hiba történt a kép letöltésekor');
    } finally {
      setIsDownloading(false);
    }
  };

  if (words.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-slate-50/80 rounded-2xl border border-dashed border-slate-200 text-center">
        <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mb-3">
          <Cloud className="w-7 h-7" />
        </div>
        <h3 className="text-sm font-bold text-slate-700">Még nincsenek megjeleníthető szavak</h3>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          Amint a diákok beküldik a szavaikat és a szavazás lezárul, itt jelenik meg a 2D szófelhő.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Top Toolbar */}
      <div className="flex items-center justify-between gap-2 flex-wrap pb-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-700 bg-sky-50 text-sky-800 px-2.5 py-1 rounded-xl border border-sky-200/80 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>{words.length} kifejezés</span>
            <span className="text-sky-400">•</span>
            <span>{totalResponses} válasz</span>
          </span>

          {/* 2D Shape Switcher */}
          <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 px-1.5 hidden md:inline">
              Alakzat:
            </span>
            {WORD_CLOUD_SHAPES.map((s) => {
              const isSelected = currentShape === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectShape(s.id)}
                  title={`${s.name} – ${s.description}`}
                  className={cn(
                    "px-2 py-0.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1",
                    isSelected
                      ? "bg-white text-sky-700 shadow-2xs font-extrabold"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                  )}
                >
                  <span className="text-sm leading-none">{s.icon}</span>
                  <span className="hidden lg:inline text-[11px]">{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* View mode toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('cloud')}
              className={cn(
                "px-2.5 py-1 text-xs font-bold rounded-lg flex items-center gap-1 transition-all",
                viewMode === 'cloud'
                  ? "bg-white text-sky-700 shadow-2xs font-extrabold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>Szófelhő</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={cn(
                "px-2.5 py-1 text-xs font-bold rounded-lg flex items-center gap-1 transition-all",
                viewMode === 'table'
                  ? "bg-white text-sky-700 shadow-2xs font-extrabold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Gyakoriság</span>
            </button>
          </div>

          {/* Download PNG */}
          <Button
            size="sm"
            variant="outline"
            onClick={handleExportPNG}
            disabled={isDownloading}
            className="h-7 text-xs font-semibold px-2.5 rounded-xl border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kép mentése</span>
          </Button>
        </div>
      </div>

      {/* Main 2D Canvas Area */}
      {viewMode === 'cloud' ? (
        <div
          ref={containerRef}
          className="relative w-full rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden select-none"
          style={{ minHeight: `${dimensions.height}px` }}
        >
          {/* SVG Canvas with 2D shape watermark & packed words */}
          <svg
            width={dimensions.width}
            height={dimensions.height}
            className="w-full h-full block"
          >
            {/* 2D Background shape outline (proportional 1:1, perfectly centered) */}
            {currentShape !== 'rectangle' && (
              <g
                transform={`translate(${shapeX}, ${shapeY}) scale(${shapeSize / 100}, ${shapeSize / 100})`}
                className="pointer-events-none transition-all duration-500"
              >
                <path
                  d={currentShapeConfig.svgPath}
                  fill={currentShapeConfig.watermarkColor}
                  fillOpacity={0.06}
                  stroke={currentShapeConfig.watermarkColor}
                  strokeWidth={1.8}
                  strokeDasharray="6 4"
                  strokeOpacity={0.3}
                />
              </g>
            )}

            {/* Flat 2D Placed Words inside the shape */}
            {positionedWords.map((word, idx) => {
              const isHovered = hoveredWord?.normalized === word.normalized;
              const isSelected = selectedWord?.normalized === word.normalized;
              const scale = isHovered || isSelected ? 1.12 : 1;

              return (
                <g
                  key={`${word.normalized}-${currentShape}-${idx}`}
                  transform={`translate(${word.x + word.width / 2}, ${word.y + word.height / 2}) scale(${scale})`}
                  onMouseEnter={() => setHoveredWord(word)}
                  onMouseLeave={() => setHoveredWord(null)}
                  onClick={() => setSelectedWord(selectedWord?.normalized === word.normalized ? null : word)}
                  className="cursor-pointer transition-transform duration-200"
                >
                  {/* Subtle 2D highlight pill on hover/selection */}
                  {(isHovered || isSelected) && (
                    <rect
                      x={-word.width / 2}
                      y={-word.height / 2}
                      width={word.width}
                      height={word.height}
                      rx={8}
                      ry={8}
                      fill={word.color || '#2563eb'}
                      opacity={0.14}
                    />
                  )}

                  {/* Clean 2D flat typography */}
                  <text
                    x={0}
                    y={word.fontSize * 0.35}
                    textAnchor="middle"
                    fill={word.color || '#2563eb'}
                    fontSize={word.fontSize}
                    fontWeight="800"
                    fontFamily="inherit"
                    className="select-none tracking-tight"
                  >
                    {word.text}
                  </text>

                  {/* Count indicator for words with count > 1 */}
                  {word.count > 1 && (
                    <g transform={`translate(${word.width / 2 - 2}, ${-word.height / 2 + 6})`}>
                      <circle r={8} fill={word.color || '#2563eb'} />
                      <text
                        x={0}
                        y={3}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize={9}
                        fontWeight="bold"
                      >
                        {word.count}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Floating detail card when word is selected */}
          {selectedWord && (
            <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:w-72 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-200 animate-in fade-in zoom-in-95 flex items-center justify-between gap-3 z-10">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedWord.color }} />
                  <p className="font-extrabold text-sm text-slate-800 truncate">{selectedWord.text}</p>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  <span className="font-bold text-slate-700">{selectedWord.count} diák</span> írta ezt ({selectedWord.percentage}%-a az összesnek)
                </p>
              </div>

              {isTeacher && onHideWord && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    onHideWord(selectedWord.normalized);
                    setSelectedWord(null);
                    toast.info(`"${selectedWord.text}" elrejtve a szófelhőből`);
                  }}
                  className="h-7 text-xs px-2 rounded-lg border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 font-bold shrink-0 flex items-center gap-1"
                >
                  <EyeOff className="w-3 h-3" />
                  <span>Elrejtés</span>
                </Button>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Table / Frequency list view */
        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
          <div className="p-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
            <span>Kifejezés / Szó</span>
            <span>Gyakoriság & Részarány</span>
          </div>
          <div className="divide-y divide-slate-100 max-h-[460px] overflow-y-auto">
            {words.map((w, idx) => (
              <div
                key={w.normalized}
                className="p-3 flex items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span className="w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 bg-slate-100 text-slate-600">
                    #{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-slate-800 truncate flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: w.color }} />
                      <span>{w.text}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="font-extrabold text-sm text-slate-800">{w.count}×</span>
                    <span className="text-[11px] text-slate-500 ml-1.5">({w.percentage}%)</span>
                  </div>

                  <div className="w-20 sm:w-28 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(8, w.percentage || 0)}%`,
                        backgroundColor: w.color || '#2563eb'
                      }}
                    />
                  </div>

                  {isTeacher && onHideWord && (
                    <button
                      type="button"
                      onClick={() => {
                        onHideWord(w.normalized);
                        toast.info(`"${w.text}" elrejtve a felhőből`);
                      }}
                      title="Szó elrejtése"
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isTeacher && (
        <p className="text-[11px] text-slate-400 flex items-center gap-1 italic px-1">
          <Info className="w-3 h-3 shrink-0" />
          <span>Tipp tanároknak: A felső gombokkal a szavakat bármikor átrendezheted más 2D formába (pl. Szív vagy Csillag).</span>
        </p>
      )}
    </div>
  );
}

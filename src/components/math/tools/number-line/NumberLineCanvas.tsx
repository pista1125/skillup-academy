import React, { useRef, useState, useEffect } from 'react';
import { NumberLineMode, MagnitudeScale, FractionDisplayType, PointMarker, NumberArrow } from './types';
import { snapNumberLineValue, formatFractionText, toMixedFraction } from './numberLineMath';
import { Trash2, MapPin, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NumberLineCanvasProps {
  mode: NumberLineMode;
  denominator: number;
  magnitude: MagnitudeScale;
  fractionDisplay: FractionDisplayType;
  showFractionLabels: boolean;
  scale: number; // pixels per unit
  setScale: React.Dispatch<React.SetStateAction<number>>;
  offset: number; // horizontal pan offset
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  markers: PointMarker[];
  setMarkers: React.Dispatch<React.SetStateAction<PointMarker[]>>;
  arrows: NumberArrow[];
  setArrows: React.Dispatch<React.SetStateAction<NumberArrow[]>>;
  toolMode: 'pan' | 'marker' | 'arrow';
  onAddMarkerAt?: (value: number) => void;
}

export function NumberLineCanvas({
  mode,
  denominator,
  magnitude,
  fractionDisplay,
  showFractionLabels,
  scale,
  setScale,
  offset,
  setOffset,
  markers,
  setMarkers,
  arrows,
  setArrows,
  toolMode,
  onAddMarkerAt
}: NumberLineCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 420 });

  // Dragging Canvas state
  const [isPanning, setIsPanning] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Dragging Marker or Arrow handles
  const [draggedMarkerId, setDraggedMarkerId] = useState<string | null>(null);
  const [draggedArrowId, setDraggedArrowId] = useState<string | null>(null);
  const [dragHandle, setDragHandle] = useState<'move' | 'start' | 'end' | null>(null);
  const [dragOffsetVal, setDragOffsetVal] = useState<number>(0);

  const centerY = dimensions.height * 0.65; // Position axis slightly lower to allow nice tall arcs above

  // Handle Resize
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    updateSize();
    return () => observer.disconnect();
  }, []);

  // Coordinate Conversion
  const getScreenX = (val: number): number => {
    const centerX = dimensions.width / 2;
    return centerX + (val * scale) + offset;
  };

  const getValueFromScreenX = (screenX: number): number => {
    const centerX = dimensions.width / 2;
    return (screenX - centerX - offset) / scale;
  };

  // Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
    const mouseX = e.clientX - (containerRef.current?.getBoundingClientRect().left || 0);

    // Zoom centered on cursor
    const valUnderCursor = getValueFromScreenX(mouseX);
    const newScale = Math.max(0.005, Math.min(2500, scale * zoomFactor));

    const centerX = dimensions.width / 2;
    const newOffset = mouseX - centerX - (valUnderCursor * newScale);

    setScale(newScale);
    setOffset(newOffset);
  };

  // Mouse Interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Left click only

    const rect = containerRef.current?.getBoundingClientRect();
    const mouseX = e.clientX - (rect?.left || 0);
    const rawVal = getValueFromScreenX(mouseX);
    const snappedVal = snapNumberLineValue(rawVal, mode, denominator, magnitude);

    if (toolMode === 'marker') {
      if (onAddMarkerAt) {
        onAddMarkerAt(snappedVal);
      } else {
        const newMarker: PointMarker = {
          id: `marker-${Date.now()}`,
          value: snappedVal,
          color: '#3b82f6',
          label: mode === 'fractions' 
            ? formatFractionText(Math.round(snappedVal * denominator), denominator, fractionDisplay)
            : `${snappedVal}`
        };
        setMarkers(prev => [...prev, newMarker]);
      }
      return;
    }

    // Default Pan
    setIsPanning(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const dx = e.clientX - lastMousePos.x;
    setLastMousePos({ x: e.clientX, y: e.clientY });

    if (isPanning) {
      setOffset(prev => prev + dx);
      return;
    }

    const rect = containerRef.current?.getBoundingClientRect();
    const mouseX = e.clientX - (rect?.left || 0);
    const currentVal = getValueFromScreenX(mouseX);

    // Drag Marker
    if (draggedMarkerId) {
      const snapped = snapNumberLineValue(currentVal - dragOffsetVal, mode, denominator, magnitude);
      setMarkers(prev => prev.map(m => {
        if (m.id === draggedMarkerId) {
          return {
            ...m,
            value: snapped,
            label: mode === 'fractions'
              ? formatFractionText(Math.round(snapped * denominator), denominator, fractionDisplay)
              : `${snapped}`
          };
        }
        return m;
      }));
      return;
    }

    // Drag Arrow or Handles
    if (draggedArrowId && dragHandle) {
      setArrows(prev => prev.map(a => {
        if (a.id === draggedArrowId) {
          if (dragHandle === 'move') {
            const newStart = snapNumberLineValue(currentVal - dragOffsetVal, mode, denominator, magnitude);
            return { ...a, startValue: newStart };
          } else if (dragHandle === 'start') {
            const snappedStart = snapNumberLineValue(currentVal, mode, denominator, magnitude);
            const currentEnd = a.startValue + a.length;
            return { ...a, startValue: snappedStart, length: currentEnd - snappedStart };
          } else if (dragHandle === 'end') {
            const snappedEnd = snapNumberLineValue(currentVal, mode, denominator, magnitude);
            return { ...a, length: snappedEnd - a.startValue };
          }
        }
        return a;
      }));
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggedMarkerId(null);
    setDraggedArrowId(null);
    setDragHandle(null);
    setDragOffsetVal(0);
  };

  // --- RENDER TICKS & AXIS ---
  const renderAxis = () => {
    const { width } = dimensions;
    const startX = -offset;
    const endX = -offset + width;

    const minVisibleVal = getValueFromScreenX(0) - (200 / scale);
    const maxVisibleVal = getValueFromScreenX(width) + (200 / scale);

    const ticks: React.ReactNode[] = [];

    if (mode === 'fractions') {
      const d = Math.max(1, denominator);
      const minInt = Math.floor(minVisibleVal);
      const maxInt = Math.ceil(maxVisibleVal);

      // Render for each whole unit and its sub-ticks
      for (let whole = minInt; whole <= maxInt; whole++) {
        // Render sub-ticks inside this unit: whole + (k / d)
        for (let k = 0; k < d; k++) {
          const val = whole + (k / d);
          const x = getScreenX(val);
          if (x < -80 || x > width + 80) continue;

          const isInteger = k === 0;
          const isZero = isInteger && whole === 0;
          const tickH = isInteger ? (isZero ? 28 : 22) : 12;
          const strokeColor = isZero ? '#0284c7' : (isInteger ? '#475569' : '#94a3b8');
          const strokeWidth = isZero ? 3.5 : (isInteger ? 2.5 : 1.5);

          // Labels
          let labelNode: React.ReactNode = null;
          if (isInteger) {
            labelNode = (
              <text
                y={isZero ? 34 : 32}
                textAnchor="middle"
                className={cn(
                  "font-bold select-none",
                  isZero ? "fill-sky-700 dark:fill-sky-400 text-base" : "fill-slate-700 dark:fill-slate-300 text-sm font-semibold"
                )}
              >
                {whole}
              </text>
            );
          } else if (showFractionLabels) {
            // Minor fraction label
            const totalNum = whole * d + k;
            const fracText = formatFractionText(totalNum, d, fractionDisplay);
            labelNode = (
              <text
                y={28}
                textAnchor="middle"
                className="fill-slate-500 dark:fill-slate-400 text-[11px] font-mono select-none"
              >
                {fracText}
              </text>
            );
          }

          ticks.push(
            <g key={`frac-${whole}-${k}`} transform={`translate(${x}, ${centerY})`}>
              <line
                y1={-tickH}
                y2={tickH}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                opacity={isInteger ? 1 : 0.75}
              />
              {labelNode}
            </g>
          );
        }
      }
    } else {
      // Integers or Magnitudes Mode
      let step = 1;
      let subStep = 0.5;

      if (mode === 'magnitudes') {
        step = magnitude;
        subStep = magnitude / 2;
        if (scale < 0.1 && magnitude === 1000) {
          step = 5000;
          subStep = 1000;
        }
      } else {
        // Integers mode
        if (scale < 30) step = 5;
        if (scale < 12) step = 10;
        if (scale > 100) subStep = 0.5;
        else subStep = step;
      }

      const minStep = Math.floor(minVisibleVal / step) * step - step;
      const maxStep = Math.ceil(maxVisibleVal / step) * step + step;

      // Draw sub-ticks if step allows
      if (subStep < step && scale > 40) {
        const minSub = Math.floor(minVisibleVal / subStep) * subStep;
        const maxSub = Math.ceil(maxVisibleVal / subStep) * subStep;
        for (let v = minSub; v <= maxSub; v += subStep) {
          if (Math.abs(v % step) < 0.0001) continue; // Major tick takes precedence
          const x = getScreenX(v);
          if (x < -40 || x > width + 40) continue;
          ticks.push(
            <g key={`sub-${v}`} transform={`translate(${x}, ${centerY})`}>
              <line y1={-8} y2={8} stroke="#cbd5e1" strokeWidth={1.5} strokeLinecap="round" />
            </g>
          );
        }
      }

      // Major ticks
      for (let v = minStep; v <= maxStep; v += step) {
        const val = Math.round(v * 1000) / 1000;
        const x = getScreenX(val);
        if (x < -80 || x > width + 80) continue;

        const isZero = Math.abs(val) < 0.0001;
        const tickH = isZero ? 28 : 20;

        ticks.push(
          <g key={`maj-${val}`} transform={`translate(${x}, ${centerY})`}>
            <line
              y1={-tickH}
              y2={tickH}
              stroke={isZero ? '#0284c7' : '#475569'}
              strokeWidth={isZero ? 3.5 : 2}
              strokeLinecap="round"
            />
            <text
              y={isZero ? 34 : 32}
              textAnchor="middle"
              className={cn(
                "select-none",
                isZero
                  ? "fill-sky-700 dark:fill-sky-400 font-black text-base"
                  : "fill-slate-600 dark:fill-slate-300 font-semibold text-xs sm:text-sm"
              )}
            >
              {val}
            </text>
          </g>
        );
      }
    }

    return (
      <g>
        {/* Main horizontal line with arrows on both ends */}
        <line
          x1={0}
          y1={centerY}
          x2={width}
          y2={centerY}
          stroke="#64748b"
          strokeWidth={3}
          strokeLinecap="round"
        />
        {/* Left Arrow Head */}
        <polygon
          points={`0,${centerY} 16,${centerY - 6} 16,${centerY + 6}`}
          fill="#64748b"
        />
        {/* Right Arrow Head */}
        <polygon
          points={`${width},${centerY} ${width - 16},${centerY - 6} ${width - 16},${centerY + 6}`}
          fill="#64748b"
        />
        {ticks}
      </g>
    );
  };

  // --- RENDER STEPPING ARROWS (ARCS) ---
  const renderArrows = () => {
    return arrows.map((arrow, idx) => {
      const startX = getScreenX(arrow.startValue);
      const endVal = arrow.startValue + arrow.length;
      const endX = getScreenX(endVal);

      // Arc height depends on distance and stack level
      const distancePx = Math.abs(endX - startX);
      const baseHeight = Math.min(180, Math.max(55, distancePx * 0.35));
      const levelHeight = baseHeight + (arrow.yLevel - 1) * 38;

      const controlY = centerY - levelHeight * 1.6;
      const midX = (startX + endX) / 2;

      // Smooth quadratic/cubic curve
      const pathD = `M ${startX} ${centerY} C ${startX} ${controlY}, ${endX} ${controlY}, ${endX} ${centerY}`;

      // Arrow head angle
      const isGoingRight = arrow.length >= 0;
      const arrowHeadY = centerY;

      return (
        <g key={arrow.id} className="group transition-opacity">
          {/* Main Jump Curve */}
          <path
            d={pathD}
            fill="none"
            stroke={arrow.color}
            strokeWidth={4}
            strokeLinecap="round"
            className="cursor-pointer transition-all hover:stroke-[5px] drop-shadow-sm"
            onMouseDown={(e) => {
              e.stopPropagation();
              const rect = containerRef.current?.getBoundingClientRect();
              const mouseX = e.clientX - (rect?.left || 0);
              const mouseVal = getValueFromScreenX(mouseX);
              setDragOffsetVal(mouseVal - arrow.startValue);
              setDraggedArrowId(arrow.id);
              setDragHandle('move');
              setLastMousePos({ x: e.clientX, y: e.clientY });
            }}
          />

          {/* Stepping Dots along the Axis for pedagogical clarity */}
          {Math.abs(arrow.length) > 0 && mode !== 'magnitudes' && (
            <g opacity={0.65}>
              {(() => {
                const dots = [];
                const stepCount = mode === 'fractions'
                  ? Math.abs(Math.round(arrow.length * denominator))
                  : Math.abs(Math.round(arrow.length));
                const singleStep = mode === 'fractions' ? (1 / denominator) : 1;
                const dir = arrow.length > 0 ? 1 : -1;

                if (stepCount <= 30) {
                  for (let i = 1; i < stepCount; i++) {
                    const stepVal = arrow.startValue + (i * singleStep * dir);
                    const dotX = getScreenX(stepVal);
                    dots.push(
                      <circle
                        key={`step-dot-${i}`}
                        cx={dotX}
                        cy={centerY}
                        r={3.5}
                        fill={arrow.color}
                      />
                    );
                  }
                }
                return dots;
              })()}
            </g>
          )}

          {/* Arrow Head at Target */}
          <polygon
            points={isGoingRight ? "0,0 -8,-14 8,-14" : "0,0 -8,-14 8,-14"}
            fill={arrow.color}
            transform={`translate(${endX}, ${arrowHeadY}) rotate(${isGoingRight ? 90 : -90})`}
            className="drop-shadow-sm"
          />

          {/* Central Label Pill */}
          <foreignObject
            x={midX - 90}
            y={centerY - levelHeight - 34}
            width={180}
            height={48}
            className="overflow-visible pointer-events-auto"
          >
            <div className="flex items-center justify-center w-full h-full">
              <div
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-full shadow-md text-xs font-bold border backdrop-blur-md transition-transform hover:scale-105 select-none",
                  "bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-700"
                )}
                style={{ color: arrow.color }}
              >
                <span className="font-mono text-xs">
                  {arrow.operationText || (
                    arrow.length > 0 ? `+${arrow.length}` : `${arrow.length}`
                  )}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-tight text-slate-500">
                  ({isGoingRight ? '→ Jobbra' : '← Balra'})
                </span>

                {/* Delete button on hover */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setArrows(prev => prev.filter(a => a.id !== arrow.id));
                  }}
                  className="ml-1 p-0.5 rounded-full hover:bg-red-100 dark:hover:bg-red-950/50 text-red-500"
                  title="Lépés törlése"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </foreignObject>

          {/* Interactive Start Handle */}
          <circle
            cx={startX}
            cy={centerY}
            r={8}
            fill="#ffffff"
            stroke={arrow.color}
            strokeWidth={3}
            className="cursor-ew-resize opacity-0 group-hover:opacity-100 transition-all hover:scale-125"
            onMouseDown={(e) => {
              e.stopPropagation();
              setDraggedArrowId(arrow.id);
              setDragHandle('start');
            }}
          />

          {/* Interactive End Handle */}
          <circle
            cx={endX}
            cy={centerY}
            r={8}
            fill={arrow.color}
            stroke="#ffffff"
            strokeWidth={2}
            className="cursor-ew-resize opacity-0 group-hover:opacity-100 transition-all hover:scale-125"
            onMouseDown={(e) => {
              e.stopPropagation();
              setDraggedArrowId(arrow.id);
              setDragHandle('end');
            }}
          />
        </g>
      );
    });
  };

  // --- RENDER POINT MARKERS ---
  const renderMarkers = () => {
    return markers.map(marker => {
      const x = getScreenX(marker.value);
      const isStart = marker.isStart;
      const isResult = marker.isResult;

      return (
        <g
          key={marker.id}
          transform={`translate(${x}, ${centerY})`}
          className="cursor-grab active:cursor-grabbing group"
          onMouseDown={(e) => {
            e.stopPropagation();
            const rect = containerRef.current?.getBoundingClientRect();
            const mouseX = e.clientX - (rect?.left || 0);
            const mouseVal = getValueFromScreenX(mouseX);
            setDragOffsetVal(mouseVal - marker.value);
            setDraggedMarkerId(marker.id);
            setLastMousePos({ x: e.clientX, y: e.clientY });
          }}
        >
          {/* Pulsing ring if Start or Result */}
          {(isStart || isResult) && (
            <circle
              r={18}
              fill="none"
              stroke={marker.color}
              strokeWidth={2}
              className="animate-ping opacity-40 pointer-events-none"
            />
          )}

          {/* Target Base Dot on Axis */}
          <circle
            r={7}
            fill={marker.color}
            stroke="#ffffff"
            strokeWidth={2.5}
            className="drop-shadow-md"
          />

          {/* Pin Graphic above */}
          <g transform="translate(-24, -68) scale(2)">
            <MapPin
              className="w-6 h-6 drop-shadow-lg"
              fill={marker.color}
              color="#ffffff"
              strokeWidth={1.5}
            />
          </g>

          {/* Marker Label Box */}
          <foreignObject x={-60} y={-104} width={120} height={34} className="overflow-visible pointer-events-none">
            <div className="flex flex-col items-center justify-center">
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-black shadow-md border backdrop-blur-sm pointer-events-auto select-none",
                  isStart
                    ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300"
                    : (isResult
                      ? "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300"
                      : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700")
                )}
              >
                {marker.label || (
                  mode === 'fractions'
                    ? formatFractionText(Math.round(marker.value * denominator), denominator, fractionDisplay)
                    : marker.value
                )}
              </span>
            </div>
          </foreignObject>

          {/* Delete Button on Hover (unless it's a fixed wizard marker) */}
          <foreignObject x={18} y={-76} width={24} height={24} className="opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMarkers(prev => prev.filter(m => m.id !== marker.id));
              }}
              className="w-5 h-5 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md text-xs"
              title="Jelölő törlése"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </foreignObject>
        </g>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full min-h-[380px] bg-slate-50/60 dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden select-none",
        isPanning ? "cursor-grabbing" : (toolMode === 'marker' ? "cursor-crosshair" : "cursor-grab")
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <svg className="w-full h-full">
        {/* Background Grid Accent */}
        <defs>
          <pattern id="nl-subtle-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200/50 dark:text-slate-800/40" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nl-subtle-grid)" />

        {/* Axis and ticks */}
        {renderAxis()}

        {/* Arcs and Arrows */}
        {renderArrows()}

        {/* Markers */}
        {renderMarkers()}
      </svg>

      {/* Floating Mode Helper Badge */}
      <div className="absolute bottom-3 left-4 flex items-center gap-2 pointer-events-none">
        <span className="text-[11px] font-mono text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
          {mode === 'fractions' && `Törtek: /${denominator} osztás (${fractionDisplay === 'mixed' ? 'Vegyes' : 'Közönséges'})`}
          {mode === 'integers' && 'Egész számok (1-es beosztás)'}
          {mode === 'magnitudes' && `${magnitude}-as nagyságrend`}
        </span>
      </div>

      {toolMode === 'marker' && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg pointer-events-none animate-in fade-in slide-in-from-top-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Kattints a számegyenesre a pont elhelyezéséhez!
        </div>
      )}
    </div>
  );
}

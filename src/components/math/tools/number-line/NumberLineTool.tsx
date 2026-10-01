import React, { useState, useEffect, useCallback } from 'react';
import { NumberLineMode, MagnitudeScale, FractionDisplayType, PointMarker, NumberArrow, PresetExample } from './types';
import { NumberLineCanvas } from './NumberLineCanvas';
import { NumberLineControls } from './NumberLineControls';
import { OperationWizard } from './OperationWizard';
import { formatFractionText } from './numberLineMath';

export interface NumberLineToolProps {
  onBack: () => void;
}

export function NumberLineTool({ onBack }: NumberLineToolProps) {
  // Modes & Settings
  const [mode, setMode] = useState<NumberLineMode>('integers');
  const [denominator, setDenominator] = useState<number>(4);
  const [magnitude, setMagnitude] = useState<MagnitudeScale>(100);
  const [fractionDisplay, setFractionDisplay] = useState<FractionDisplayType>('fraction');
  const [showFractionLabels, setShowFractionLabels] = useState<boolean>(true);

  // Canvas View State
  const [scale, setScale] = useState<number>(55); // pixels per unit
  const [offset, setOffset] = useState<number>(0);
  const [toolMode, setToolMode] = useState<'pan' | 'marker' | 'arrow'>('pan');

  // Drawn Objects
  const [markers, setMarkers] = useState<PointMarker[]>([
    { id: 'initial-1', value: -2, isStart: true, color: '#10b981', label: 'Kezdő: -2' },
    { id: 'initial-2', value: -5, isResult: true, color: '#f59e0b', label: 'Cél: -5' }
  ]);

  const [arrows, setArrows] = useState<NumberArrow[]>([
    {
      id: 'initial-arrow',
      startValue: -2,
      length: -3,
      yLevel: 1,
      color: '#ef4444',
      operationText: '+ (-3)',
      effectiveStep: -3
    }
  ]);

  // Adjust default scale when switching modes
  const handleModeChange = (newMode: NumberLineMode) => {
    setMode(newMode);
    if (newMode === 'fractions') {
      setScale(180); // So each 1/4 is 45px wide
      setOffset(0);
      setMarkers([
        { id: 'frac-start', value: 0.75, isStart: true, color: '#10b981', label: 'Kezdő: 3/4' },
        { id: 'frac-end', value: 1.25, isResult: true, color: '#f59e0b', label: 'Cél: 5/4 (1 1/4)' }
      ]);
      setArrows([
        {
          id: 'frac-arrow',
          startValue: 0.75,
          length: 0.5,
          yLevel: 1,
          color: '#3b82f6',
          operationText: '+ 2/4',
          effectiveStep: 0.5
        }
      ]);
    } else if (newMode === 'magnitudes') {
      setScale(0.6); // 100 units = 60px
      setOffset(0);
      setMarkers([
        { id: 'mag-start', value: 400, isStart: true, color: '#10b981', label: 'Kezdő: 400' },
        { id: 'mag-end', value: -250, isResult: true, color: '#f59e0b', label: 'Cél: -250' }
      ]);
      setArrows([
        {
          id: 'mag-arrow',
          startValue: 400,
          length: -650,
          yLevel: 1,
          color: '#ef4444',
          operationText: '+ (-650)',
          effectiveStep: -650
        }
      ]);
    } else {
      // integers
      setScale(55);
      setOffset(0);
      setMarkers([
        { id: 'int-start', value: -2, isStart: true, color: '#10b981', label: 'Kezdő: -2' },
        { id: 'int-end', value: -5, isResult: true, color: '#f59e0b', label: 'Cél: -5' }
      ]);
      setArrows([
        {
          id: 'int-arrow',
          startValue: -2,
          length: -3,
          yLevel: 1,
          color: '#ef4444',
          operationText: '+ (-3)',
          effectiveStep: -3
        }
      ]);
    }
  };

  // Adjust scale when magnitude changes
  useEffect(() => {
    if (mode === 'magnitudes') {
      if (magnitude === 10) setScale(6);
      else if (magnitude === 100) setScale(0.6);
      else if (magnitude === 1000) setScale(0.06);
      setOffset(0);
    }
  }, [magnitude, mode]);

  // Adjust scale when denominator changes
  useEffect(() => {
    if (mode === 'fractions') {
      // Scale so that 1 / denominator is at least 32-45px
      const recommendedScale = Math.max(120, denominator * 40);
      setScale(recommendedScale);
    }
  }, [denominator, mode]);

  // Center on a range
  const handleCenterRange = useCallback((startVal: number, endVal: number) => {
    const midVal = (startVal + endVal) / 2;
    // We want midVal to be at screen center (which is 0 offset relative to center)
    const newOffset = -midVal * scale;
    setOffset(newOffset);
  }, [scale]);

  // Preset Selection Handler
  const handleSelectPreset = (preset: PresetExample) => {
    setMode(preset.mode);

    if (preset.mode === 'fractions' && preset.denominator) {
      setDenominator(preset.denominator);
      setScale(Math.max(120, preset.denominator * 42));
    } else if (preset.mode === 'magnitudes' && preset.magnitude) {
      setMagnitude(preset.magnitude);
      if (preset.magnitude === 10) setScale(6);
      else if (preset.magnitude === 100) setScale(0.6);
      else if (preset.magnitude === 1000) setScale(0.06);
    } else {
      setScale(55);
    }

    const startVal = preset.start;
    let stepVal = preset.operand;
    if (preset.op === '-') {
      stepVal = -preset.operand;
    }
    const endVal = startVal + stepVal;

    const startMarker: PointMarker = {
      id: `p-start-${Date.now()}`,
      value: startVal,
      isStart: true,
      color: '#10b981',
      label: preset.mode === 'fractions' && preset.fractionStart
        ? `Kezdő: ${formatFractionText(preset.fractionStart.num, preset.fractionStart.den, fractionDisplay)}`
        : `Kezdő: ${startVal}`
    };

    const endMarker: PointMarker = {
      id: `p-end-${Date.now()}`,
      value: endVal,
      isResult: true,
      color: '#f59e0b',
      label: preset.mode === 'fractions' && preset.denominator
        ? `Cél: ${formatFractionText(Math.round(endVal * preset.denominator), preset.denominator, fractionDisplay)}`
        : `Cél: ${endVal}`
    };

    const arrow: NumberArrow = {
      id: `p-arrow-${Date.now()}`,
      startValue: startVal,
      length: stepVal,
      yLevel: 1,
      color: stepVal >= 0 ? '#3b82f6' : '#ef4444',
      operationText: preset.mode === 'fractions' && preset.fractionStep
        ? `${preset.op} ${preset.fractionStep.num}/${preset.fractionStep.den}`
        : `${preset.op} (${preset.operand})`,
      effectiveStep: stepVal
    };

    setMarkers([startMarker, endMarker]);
    setArrows([arrow]);

    // Center on this range
    const midVal = (startVal + endVal) / 2;
    const currentScale = preset.mode === 'fractions' && preset.denominator
      ? Math.max(120, preset.denominator * 42)
      : (preset.mode === 'magnitudes' ? (preset.magnitude === 1000 ? 0.06 : 0.6) : 55);
    setOffset(-midVal * currentScale);
  };

  // Zoom controls
  const handleZoomIn = () => setScale(s => Math.min(2500, s * 1.3));
  const handleZoomOut = () => setScale(s => Math.max(0.005, s / 1.3));
  const handleResetView = () => setOffset(0);
  const handleClearAll = () => {
    setMarkers([]);
    setArrows([]);
    setOffset(0);
  };

  return (
    <div className="flex flex-col gap-3 w-full h-[calc(100vh-80px)] max-w-7xl mx-auto p-2 sm:p-4">
      {/* Top Controls Toolbar */}
      <NumberLineControls
        onBack={onBack}
        mode={mode}
        setMode={handleModeChange}
        denominator={denominator}
        setDenominator={setDenominator}
        magnitude={magnitude}
        setMagnitude={setMagnitude}
        fractionDisplay={fractionDisplay}
        setFractionDisplay={setFractionDisplay}
        showFractionLabels={showFractionLabels}
        setShowFractionLabels={setShowFractionLabels}
        toolMode={toolMode}
        setToolMode={setToolMode}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
        onClearAll={handleClearAll}
        onSelectPreset={handleSelectPreset}
      />

      {/* Main Interactive Canvas */}
      <div className="flex-1 w-full min-h-[360px] relative">
        <NumberLineCanvas
          mode={mode}
          denominator={denominator}
          magnitude={magnitude}
          fractionDisplay={fractionDisplay}
          showFractionLabels={showFractionLabels}
          scale={scale}
          setScale={setScale}
          offset={offset}
          setOffset={setOffset}
          markers={markers}
          setMarkers={setMarkers}
          arrows={arrows}
          setArrows={setArrows}
          toolMode={toolMode}
        />
      </div>

      {/* Bottom Pedagogical Wizard / Operation Engine */}
      <OperationWizard
        mode={mode}
        denominator={denominator}
        setDenominator={setDenominator}
        magnitude={magnitude}
        fractionDisplay={fractionDisplay}
        setMarkers={setMarkers}
        setArrows={setArrows}
        onCenterRange={handleCenterRange}
      />
    </div>
  );
}

export default NumberLineTool;

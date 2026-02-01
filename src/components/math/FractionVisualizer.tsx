import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw, Check, Plus, Minus } from 'lucide-react';

interface FractionVisualizerProps {
  onBack: () => void;
}

interface FractionPiece {
  id: string;
  value: number; // 1 = whole, 0.5 = half, 0.25 = quarter, etc.
  label: string;
  color: string;
}

const FRACTION_PIECES: FractionPiece[] = [
  { id: 'whole', value: 1, label: '1', color: 'bg-blue-500' },
  { id: 'half', value: 0.5, label: '1/2', color: 'bg-green-500' },
  { id: 'third', value: 1/3, label: '1/3', color: 'bg-yellow-500' },
  { id: 'quarter', value: 0.25, label: '1/4', color: 'bg-orange-500' },
  { id: 'fifth', value: 0.2, label: '1/5', color: 'bg-pink-500' },
  { id: 'sixth', value: 1/6, label: '1/6', color: 'bg-purple-500' },
];

interface PlacedPiece {
  id: string;
  piece: FractionPiece;
}

export function FractionVisualizer({ onBack }: FractionVisualizerProps) {
  const [placedPieces, setPlacedPieces] = useState<PlacedPiece[]>([]);
  const [targetValue, setTargetValue] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentTotal = placedPieces.reduce((sum, p) => sum + p.piece.value, 0);
  const isCorrect = Math.abs(currentTotal - targetValue) < 0.001;

  const addPiece = (piece: FractionPiece) => {
    if (currentTotal + piece.value <= 2) { // Max 2 wholes
      setPlacedPieces([...placedPieces, { id: `${piece.id}-${Date.now()}`, piece }]);
      setShowSuccess(false);
    }
  };

  const removePiece = (id: string) => {
    setPlacedPieces(placedPieces.filter(p => p.id !== id));
    setShowSuccess(false);
  };

  const reset = () => {
    setPlacedPieces([]);
    setShowSuccess(false);
  };

  const checkAnswer = () => {
    if (isCorrect) {
      setShowSuccess(true);
    }
  };

  const changeTarget = (delta: number) => {
    const newTarget = Math.max(0.25, Math.min(2, targetValue + delta));
    setTargetValue(newTarget);
    setShowSuccess(false);
  };

  const formatFraction = (value: number): string => {
    if (value === 1) return '1';
    if (value === 0.5) return '1/2';
    if (value === 0.25) return '1/4';
    if (value === 0.75) return '3/4';
    if (value === 1.5) return '1 1/2';
    if (Math.abs(value - 1/3) < 0.001) return '1/3';
    if (Math.abs(value - 2/3) < 0.001) return '2/3';
    if (Math.abs(value - 1/6) < 0.001) return '1/6';
    if (value === 0.2) return '1/5';
    return value.toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Vissza a témakörökhöz
      </Button>

      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold mb-2">Törtek vizualizáció</h2>
        <p className="text-muted-foreground">
          Rakd össze a törteket, hogy elérd a célértéket!
        </p>
      </div>

      {/* Target Value Selector */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Célérték</span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => changeTarget(-0.25)}
                disabled={targetValue <= 0.25}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-2xl font-bold min-w-[60px] text-center text-primary">
                {formatFraction(targetValue)}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => changeTarget(0.25)}
                disabled={targetValue >= 2}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Visual Area */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Munkafelület</span>
            <span className={`text-sm font-normal ${isCorrect ? 'text-green-600' : 'text-muted-foreground'}`}>
              Jelenlegi érték: {formatFraction(currentTotal)}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Target visualization bar */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Cél: {formatFraction(targetValue)}</p>
            <div className="h-8 bg-secondary rounded-lg overflow-hidden relative">
              <div 
                className="h-full bg-primary/30 border-r-4 border-primary border-dashed"
                style={{ width: `${Math.min(100, targetValue * 50)}%` }}
              />
            </div>
          </div>

          {/* Placed pieces visualization */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Te megoldásod:</p>
            <div className="h-12 bg-secondary rounded-lg overflow-hidden flex">
              {placedPieces.map((placed) => (
                <button
                  key={placed.id}
                  onClick={() => removePiece(placed.id)}
                  className={`h-full ${placed.piece.color} flex items-center justify-center text-white font-bold text-sm hover:opacity-80 transition-all border-r border-white/30`}
                  style={{ width: `${placed.piece.value * 50}%` }}
                  title="Kattints az eltávolításhoz"
                >
                  {placed.piece.label}
                </button>
              ))}
              {placedPieces.length === 0 && (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                  Adj hozzá törteket az alábbi készletből
                </div>
              )}
            </div>
          </div>

          {/* Success message */}
          {showSuccess && (
            <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-700 dark:text-green-400 text-center font-bold animate-bounce-in">
              🎉 Helyes! Sikeresen összeraktad a {formatFraction(targetValue)} értéket!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fraction pieces to drag */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Törtek készlete</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {FRACTION_PIECES.map((piece) => (
              <button
                key={piece.id}
                onClick={() => addPiece(piece)}
                className={`${piece.color} rounded-xl p-4 text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg flex flex-col items-center gap-1`}
              >
                <span>{piece.label}</span>
                <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white"
                    style={{ width: `${piece.value * 100}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={reset}
          className="flex-1"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Újrakezdés
        </Button>
        <Button
          onClick={checkAnswer}
          disabled={placedPieces.length === 0}
          className="flex-1 bg-gradient-math hover:opacity-90"
        >
          <Check className="w-4 h-4 mr-2" />
          Ellenőrzés
        </Button>
      </div>
    </div>
  );
}

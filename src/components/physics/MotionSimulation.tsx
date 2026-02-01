import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface MotionSimulationProps {
  type: 'uniform' | 'accelerated' | 'projectile';
}

export function MotionSimulation({ type }: MotionSimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [velocity, setVelocity] = useState(5);
  const [acceleration, setAcceleration] = useState(2);
  const [angle, setAngle] = useState(45);
  const [time, setTime] = useState(0);
  const animationRef = useRef<number>();

  const resetSimulation = () => {
    setTime(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1a1f2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#2a3042';
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw ground
    ctx.fillStyle = '#3d4259';
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

    // Calculate position based on type
    let x = 40;
    let y = canvas.height - 60;
    
    switch (type) {
      case 'uniform':
        x = 40 + velocity * 10 * time;
        break;
      case 'accelerated':
        x = 40 + velocity * 10 * time + 0.5 * acceleration * 10 * time * time;
        break;
      case 'projectile':
        const radians = (angle * Math.PI) / 180;
        const vx = velocity * 10 * Math.cos(radians);
        const vy = velocity * 10 * Math.sin(radians);
        const g = 9.8;
        x = 40 + vx * time;
        const heightOffset = vy * time - 0.5 * g * time * time;
        y = canvas.height - 60 - heightOffset * 5;
        if (y > canvas.height - 60) y = canvas.height - 60;
        break;
    }

    // Draw trajectory (for projectile motion)
    if (type === 'projectile') {
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      const radians = (angle * Math.PI) / 180;
      const vx = velocity * 10 * Math.cos(radians);
      const vy = velocity * 10 * Math.sin(radians);
      const g = 9.8;
      
      for (let t = 0; t <= 10; t += 0.1) {
        const px = 40 + vx * t;
        const heightOffset = vy * t - 0.5 * g * t * t;
        let py = canvas.height - 60 - heightOffset * 5;
        if (py > canvas.height - 60) break;
        
        if (t === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw object (ball)
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
    gradient.addColorStop(0, '#818cf8');
    gradient.addColorStop(1, '#6366f1');
    
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add shine
    ctx.beginPath();
    ctx.arc(x - 5, y - 5, 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fill();

    // Draw velocity vector
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    if (type === 'projectile') {
      const radians = (angle * Math.PI) / 180;
      ctx.lineTo(x + velocity * 5 * Math.cos(radians), y - velocity * 5 * Math.sin(radians));
    } else {
      let currentVelocity = velocity;
      if (type === 'accelerated') {
        currentVelocity = velocity + acceleration * time;
      }
      ctx.lineTo(x + currentVelocity * 5, y);
    }
    ctx.stroke();

    // Draw info panel
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(10, 10, 200, type === 'projectile' ? 100 : 80);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Space Grotesk';
    ctx.fillText(`Idő: ${time.toFixed(1)} s`, 20, 35);
    ctx.fillText(`Pozíció: ${(x - 40).toFixed(0)} m`, 20, 55);
    
    if (type === 'accelerated') {
      const currentV = velocity + acceleration * time;
      ctx.fillText(`Sebesség: ${currentV.toFixed(1)} m/s`, 20, 75);
    } else if (type === 'projectile') {
      ctx.fillText(`Magasság: ${Math.max(0, (canvas.height - 60 - y) / 5).toFixed(1)} m`, 20, 75);
      ctx.fillText(`Szög: ${angle}°`, 20, 95);
    } else {
      ctx.fillText(`Sebesség: ${velocity} m/s`, 20, 75);
    }

  }, [time, velocity, acceleration, angle, type]);

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setTime(prev => prev + 0.05);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="space-y-6">
      <div className="simulation-canvas">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={300}
          className="w-full"
        />
      </div>

      <div className="bg-card rounded-xl p-4 space-y-4">
        {/* Controls */}
        <div className="flex gap-2">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className={isPlaying ? 'bg-destructive hover:bg-destructive/90' : 'bg-gradient-hero hover:opacity-90'}
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? 'Szünet' : 'Indítás'}
          </Button>
          <Button variant="outline" onClick={resetSimulation}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Újraindítás
          </Button>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Kezdősebesség: {velocity} m/s
            </label>
            <Slider
              value={[velocity]}
              onValueChange={([v]) => setVelocity(v)}
              min={1}
              max={20}
              step={1}
              disabled={isPlaying}
            />
          </div>

          {type === 'accelerated' && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Gyorsulás: {acceleration} m/s²
              </label>
              <Slider
                value={[acceleration]}
                onValueChange={([a]) => setAcceleration(a)}
                min={1}
                max={10}
                step={0.5}
                disabled={isPlaying}
              />
            </div>
          )}

          {type === 'projectile' && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Hajítási szög: {angle}°
              </label>
              <Slider
                value={[angle]}
                onValueChange={([a]) => setAngle(a)}
                min={10}
                max={80}
                step={5}
                disabled={isPlaying}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

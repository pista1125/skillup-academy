import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Snowflake, IceCream, RotateCcw } from 'lucide-react';

const NUM_BALLS = 150;
const BALL_RADIUS = 4;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;

class Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;

    constructor() {
        this.x = Math.random() * (CANVAS_WIDTH - 2 * BALL_RADIUS) + BALL_RADIUS;
        this.y = Math.random() * (CANVAS_HEIGHT - 2 * BALL_RADIUS) + BALL_RADIUS;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= BALL_RADIUS || this.x >= CANVAS_WIDTH - BALL_RADIUS) {
            this.vx *= -1;
        }
        if (this.y <= BALL_RADIUS || this.y >= CANVAS_HEIGHT - BALL_RADIUS) {
            this.vy *= -1;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
        ctx.closePath();
    }

    setSpeedMultiplier(multiplier: number) {
        this.vx *= multiplier;
        this.vy *= multiplier;
    }

    stop() {
        this.vx = 0;
        this.vy = 0;
    }
}

export function MoleculesSimulation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [balls, setBalls] = useState<Ball[]>([]);
    const [state, setState] = useState<'normal' | 'hot' | 'cold' | 'freeze'>('normal');
    const requestRef = useRef<number>();

    useEffect(() => {
        const initialBalls = Array.from({ length: NUM_BALLS }, () => new Ball());
        setBalls(initialBalls);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        balls.forEach(ball => {
            ball.move();
            ball.draw(ctx);
        });

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [balls]);

    const setHot = () => {
        setState('hot');
        balls.forEach(b => b.setSpeedMultiplier(1.5));
    };

    const setCold = () => {
        setState('cold');
        balls.forEach(b => b.setSpeedMultiplier(0.6));
    };

    const setFreeze = () => {
        setState('freeze');
        balls.forEach(b => b.stop());
    };

    const reset = () => {
        setState('normal');
        const newBalls = Array.from({ length: NUM_BALLS }, () => new Ball());
        setBalls(newBalls);
    };

    const getAvgSpeed = () => {
        if (balls.length === 0) return 0;
        const total = balls.reduce((sum, b) => sum + (Math.abs(b.vx) + Math.abs(b.vy)), 0);
        return total / (2 * balls.length);
    };

    const temp = Math.round(getAvgSpeed() * 100);

    return (
        <Card className="w-full bg-slate-950 overflow-hidden border-physics/30">
            <CardContent className="p-0 relative">
                {/* UI Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-10">
                    <div className="flex gap-2 pointer-events-auto">
                        <Button
                            variant={state === 'hot' ? 'default' : 'secondary'}
                            size="sm"
                            onClick={setHot}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            <Flame className="w-4 h-4 mr-2" />
                            Gyertya
                        </Button>
                        <Button
                            variant={state === 'cold' ? 'default' : 'secondary'}
                            size="sm"
                            onClick={setCold}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white"
                        >
                            <Snowflake className="w-4 h-4 mr-2" />
                            Jég
                        </Button>
                        <Button
                            variant={state === 'freeze' ? 'default' : 'secondary'}
                            size="sm"
                            onClick={setFreeze}
                            className="bg-slate-600 hover:bg-slate-700 text-white"
                        >
                            <IceCream className="w-4 h-4 mr-2" />
                            Fagyasztó
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={reset}
                            className="bg-green-600 border-none hover:bg-green-700 text-white"
                        >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reset
                        </Button>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-white pointer-events-auto min-w-[180px]">
                        <div className="text-xs uppercase tracking-wider opacity-70 mb-1">Hőmérséklet</div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full transition-all duration-500 ease-out"
                                    style={{
                                        width: `${Math.min(temp / 3, 100)}%`,
                                        backgroundColor: temp > 150 ? '#ef4444' : temp > 50 ? '#3b82f6' : '#06b6d4'
                                    }}
                                />
                            </div>
                            <span className="font-mono font-bold">{temp} K</span>
                        </div>
                    </div>
                </div>

                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="w-full h-auto cursor-crosshair"
                />

                <div className="p-4 bg-slate-900/80 text-slate-400 text-xs italic text-center">
                    A részecskék sebessége közvetlen kapcsolatban áll a gáz belső energiájával és hőmérsékletével.
                </div>
            </CardContent>
        </Card>
    );
}

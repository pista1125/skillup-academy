import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, LineChart, Zap } from 'lucide-react';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const BIG_BALL_RADIUS = 30;
const SMALL_BALL_RADIUS = 6;
const NUM_SMALL_BALLS = 40;
const TRAIL_LENGTH = 1000;

interface Point {
    x: number;
    y: number;
}

class SmallBall {
    x: number; y: number; vx: number; vy: number; radius: number;

    constructor() {
        this.radius = SMALL_BALL_RADIUS;
        this.x = Math.random() * (CANVAS_WIDTH - 2 * this.radius) + this.radius;
        this.y = Math.random() * (CANVAS_HEIGHT - 2 * this.radius) + this.radius;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x <= this.radius || this.x >= CANVAS_WIDTH - this.radius) this.vx *= -1;
        if (this.y <= this.radius || this.y >= CANVAS_HEIGHT - this.radius) this.vy *= -1;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#60a5fa';
        ctx.fill();
        ctx.closePath();
    }
}

class BigBall {
    x: number; y: number; vx: number; vy: number; radius: number;
    trail: Point[] = [];

    constructor() {
        this.radius = BIG_BALL_RADIUS;
        this.x = CANVAS_WIDTH / 2;
        this.y = CANVAS_HEIGHT / 2;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x <= this.radius || this.x >= CANVAS_WIDTH - this.radius) this.vx *= -1;
        if (this.y <= this.radius || this.y >= CANVAS_HEIGHT - this.radius) this.vy *= -1;

        // Small random perturbations to simulate infinitesimal collisions not modeled
        if (Math.random() < 0.05) {
            this.vx += (Math.random() - 0.5) * 0.5;
            this.vy += (Math.random() - 0.5) * 0.5;
        }

        // Limit speed
        const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
        if (speed > 4) {
            this.vx *= 4 / speed;
            this.vy *= 4 / speed;
        }

        // Add to trail
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > TRAIL_LENGTH) this.trail.shift();
    }

    draw(ctx: CanvasRenderingContext2D) {
        // Draw trail
        if (this.trail.length > 2) {
            ctx.beginPath();
            ctx.moveTo(this.trail[0].x, this.trail[0].y);
            for (let i = 1; i < this.trail.length; i++) {
                ctx.lineTo(this.trail[i].x, this.trail[i].y);
            }
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Draw ball
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
    }
}

export function BrownianSimulation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<{ bigBall: BigBall, smallBalls: SmallBall[] }>();
    const requestRef = useRef<number>();
    const [showTrail, setShowTrail] = useState(true);

    const init = () => {
        const bigBall = new BigBall();
        const smallBalls = Array.from({ length: NUM_SMALL_BALLS }, () => {
            let b = new SmallBall();
            // Ensure no initial overlap with big ball
            while (Math.sqrt((b.x - bigBall.x) ** 2 + (b.y - bigBall.y) ** 2) < bigBall.radius + b.radius + 10) {
                b = new SmallBall();
            }
            return b;
        });
        engineRef.current = { bigBall, smallBalls };
    };

    const checkCollision = (b1: BigBall, b2: SmallBall) => {
        const dist = Math.sqrt((b1.x - b2.x) ** 2 + (b1.y - b2.y) ** 2);
        if (dist < b1.radius + b2.radius) {
            // Very simple elastic collision response (just reverse velocities for effect)
            // Since we want the "jitter" effect, simple reversal works surprisingly well
            const nx = (b2.x - b1.x) / dist;
            const ny = (b2.y - b1.y) / dist;

            // Impact on big ball is small
            b1.vx -= nx * 0.5;
            b1.vy -= ny * 0.5;

            // Impact on small ball is large
            b2.vx += nx * 2;
            b2.vy += ny * 2;

            // Prevent sticking
            const overlap = b1.radius + b2.radius - dist;
            b2.x += nx * overlap;
            b2.y += ny * overlap;
        }
    };

    const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas || !engineRef.current) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        const { bigBall, smallBalls } = engineRef.current;

        smallBalls.forEach(b => {
            b.move();
            checkCollision(bigBall, b);
            b.draw(ctx);
        });

        bigBall.move();
        if (!showTrail) bigBall.trail = [];
        bigBall.draw(ctx);

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        init();
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [showTrail]);

    return (
        <Card className="w-full bg-slate-900 overflow-hidden border-physics/30">
            <CardContent className="p-0 relative">
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-10">
                    <div className="flex gap-2 pointer-events-auto">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setShowTrail(!showTrail)}
                            className={showTrail ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                        >
                            <LineChart className="w-4 h-4 mr-2" />
                            {showTrail ? "Pálya elrejtése" : "Pálya megjelenítése"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={init} className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reset
                        </Button>
                    </div>

                    <div className="bg-black/40 backdrop-blur-md rounded-lg p-3 border border-white/10 text-white pointer-events-auto max-w-xs">
                        <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <span className="text-xs font-bold uppercase tracking-tight">Fizikai alapelv</span>
                        </div>
                        <p className="text-[10px] leading-tight opacity-80">
                            A nagy piros golyó véletlenszerű mozgását a nála sokkal kisebb, de gyorsabb kék molekulákkal való folyamatos ütközés okozza. Ezt nevezzük Brown-mozgásnak.
                        </p>
                    </div>
                </div>

                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="w-full h-auto bg-slate-50"
                />

                <div className="p-3 bg-slate-800 text-slate-300 text-xs text-center border-t border-white/5">
                    Figyeld meg, hogyan változik a piros golyó mozgásának iránya minden ütközésnél!
                </div>
            </CardContent>
        </Card>
    );
}

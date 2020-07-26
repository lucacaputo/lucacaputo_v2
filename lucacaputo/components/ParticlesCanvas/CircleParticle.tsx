import { ParticleBluePrint } from "./Particle";

class CircleParticle extends ParticleBluePrint {
    constructor(
        x: number,
        y: number,
        dirX: number,
        dirY: number,
        size: number,
        color: string,
        id: number,
    ) {
        super(x,y,dirX,dirY,size,color,id);
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.moveTo(0,0);
        ctx.beginPath();
        ctx.arc(this.x + this.size/2 + this.dirX, this.y + this.size/2 + this.dirY, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

export default CircleParticle;
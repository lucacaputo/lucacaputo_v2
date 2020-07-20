import { ParticleBluePrint } from "./Particle";

class CubixParticle extends ParticleBluePrint {
    constructor(
        x: number, 
        y: number, 
        dirX: number, 
        dirY: number, 
        size: number, 
        color: string
    ) {
        super(x,y,dirX,dirY,size,color);
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.moveTo(0, 0);
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.rect(this.x, this.y, this.size*2, this.size*2);
        ctx.closePath();
        ctx.stroke();
    }
}

export default CubixParticle;
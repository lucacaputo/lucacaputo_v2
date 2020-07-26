import { ParticleBluePrint } from "./Particle";

class CubixParticle extends ParticleBluePrint {
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
        ctx.moveTo(0, 0);
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.lineWidth = 1;
        ctx.rect(this.x, this.y, this.size*2, this.size*2);
        ctx.closePath();
        ctx.fill();
    }
}

export default CubixParticle;
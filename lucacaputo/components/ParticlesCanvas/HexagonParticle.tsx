import { ParticleBluePrint } from "./Particle";

class HexagonParticle extends ParticleBluePrint {
    angle: number;
    constructor(
        x: number, 
        y: number, 
        dirX: number, 
        dirY: number, 
        size: number, 
        color: string, 
        angle: number
    ) {
        super(x,y,dirX,dirY,size,color);
        this.angle = angle;
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.moveTo(this.x + this.size/2, this.y + this.size/2);
        ctx.lineTo(this.x + this.size/2 + (this.size * Math.cos(this.angle)), this.y - this.size/2);
        ctx.lineTo(this.x + this.size/2 + (this.size * Math.cos(this.angle))  + this.size, this.y - this.size/2);
        ctx.lineTo(this.x + this.size/2 + (this.size * Math.cos(this.angle))  + this.size + (this.size * Math.cos(this.angle)), this.y + this.size/2)
        ctx.lineTo(this.x + this.size/2 + (this.size * Math.cos(this.angle))  + this.size, this.y + this.size + this.size/2);
        ctx.lineTo(this.x + this.size/2 + (this.size * Math.cos(this.angle)), this.y + this.size + this.size/2);
        ctx.lineTo(this.x + this.size/2, this.y + this.size/2);
        ctx.closePath();
        ctx.stroke();
    }
}

export default HexagonParticle;
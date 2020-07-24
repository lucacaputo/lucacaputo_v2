class Particle2 {
    x: number;
    y: number;
    dirX: number;
    dirY: number;
    size: number;
    color: string;
    constructor(
        x: number, y: number,
        dirX: number, dirY: number,
        size: number, color: string,
    ) {
        this.x = x;
        this.y = y,
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.x + this.size/2, this.y + this.size/2, this.size, this.size);
        ctx.closePath();
        ctx.fill();
    }
}


export default Particle2;
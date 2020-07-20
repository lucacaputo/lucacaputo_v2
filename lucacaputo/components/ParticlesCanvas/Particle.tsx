export abstract class ParticleBluePrint {
    x: number;
    y: number;
    dirX: number;
    dirY: number;
    size: number;
    color: string;
    constructor(x: number, y: number, dirX: number, dirY: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
    }
    log() {
        console.log(this);
    }
    update(limitX: number, limitY: number, ctx: CanvasRenderingContext2D) {
        console.log(limitX, limitY)
        if (Math.abs(this.x + this.dirX) >= limitX - this.size-10 || this.x < 0) this.dirX *= -1;
        if (Math.abs(this.y + this.dirY) >= limitY - this.size-10 || this.y < 0) this.dirY *= -1;
        this.x += this.dirX;
        this.y += this.dirY;
        this.draw(ctx);
    }
    abstract draw(ctx: CanvasRenderingContext2D): void;
}
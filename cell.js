export class Cell 
{
    static width;
    static height;

    constructor (ctx, pos)
    {
        this.ctx = ctx;
        this.pos = [pos[0], pos[1]];
        this.alive = Math.random() > 0.7; // TODO: remove this for custom alive cells
    }
}
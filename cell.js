export class Cell 
{
    static width;
    static height;
    nextAlive;
    constructor (ctx, pos, isAlive)
    {
        this.ctx = ctx;
        this.pos = [pos[0], pos[1]];
        //this.alive = Math.random() > 0.7; // TODO: remove this for custom alive cells
        this.alive = isAlive;
        this.nextAlive = true;
    }
}
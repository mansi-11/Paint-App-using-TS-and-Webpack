export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    set(...args) {
        if (args.length === 1) {
            const point = args[0];
            this.x = point;
            this.y = point;
        }
        else {
            this.x = args[0];
            this.y = args[1];
        }
        return this;
    }
    hypotenuse(point) {
        return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
    }
    distance(point) {
        return new Point(Math.abs(this.x - point.x), Math.abs(this.y - point.y));
    }
}

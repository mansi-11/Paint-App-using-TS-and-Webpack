import { Point } from "./utils/Point";
export class Game {
    constructor() {
        this.isMouseDown = false;
        this.canvas = document.getElementById("my-canvas");
        this.ctx = this.canvas.getContext("2d");
    }
    start() {
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.draw();
        // let valRect = document.getElementById("rectButton");
        // valRect.addEventListener('click', (e)=>{
        //   console.log(e.target);
        // });
        // let valCircle = document.getElementById("circleButton");
        // valCircle.addEventListener('click', (e)=>{
        //   console.log(e.type);
        // });
        // let valLine = document.getElementById("lineButton");
        // valLine.addEventListener('click', (e)=>{
        //   console.log(e.clientX);
        // });
    }
    update() { }
    // protected drawRect():void{
    //   this.ctx.beginPath();
    //       this.ctx.strokeStyle = "#000";
    //       this.ctx.lineWidth = 2;
    //       this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
    //       this.ctx.lineTo(this.endPoint.x, this.endPoint.y);
    //       this.ctx.stroke();
    //       this.ctx.closePath();
    // }
    draw() {
        switch (this.drawCommand) {
            case "line":
                this.ctx.beginPath();
                this.ctx.strokeStyle = "#000";
                this.ctx.lineWidth = 2;
                this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
                this.ctx.lineTo(this.endPoint.x, this.endPoint.y);
                this.ctx.stroke();
                this.ctx.closePath();
                break;
            case "rect":
                this.ctx.strokeStyle = "#000";
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.rect(this.startPoint.x, this.startPoint.y, this.endPoint.distance(this.startPoint).x, this.endPoint.distance(this.startPoint).y);
                this.ctx.stroke();
                this.ctx.closePath();
                // this.drawRect();
                break;
            case "circ":
                this.ctx.strokeStyle = "#000";
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(this.startPoint.x, this.startPoint.y, this.endPoint.hypotenuse(this.startPoint), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
                break;
        }
    }
    onKeyUp(e) {
        console.log(e);
        switch (e.code) {
            case "KeyL":
                this.drawCommand = "line";
                break;
            case "KeyR":
                this.drawCommand = "rect";
                break;
            case "KeyC":
                this.drawCommand = "circ";
                break;
        }
    }
    onMouseDown(e) {
        this.canvas.onmousemove = this.onMouseMove.bind(this);
        this.isMouseDown = true;
        this.startPoint = new Point(e.offsetX, e.offsetY);
        this.saveSnapshot();
    }
    onMouseMove(e) {
        this.endPoint = new Point(e.offsetX, e.offsetY);
    }
    onMouseUp(e) {
        this.restoreSnapshot();
        this.draw();
        this.isMouseDown = false;
        this.canvas.onmousemove = null;
        this.endPoint = null;
        this.startPoint = null;
    }
    saveSnapshot() {
        this.snapShot = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
    restoreSnapshot() {
        if (this.snapShot) {
            this.ctx.putImageData(this.snapShot, 0, 0);
        }
    }
}

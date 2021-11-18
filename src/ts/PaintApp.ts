import { Point } from "./utils/Point";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private drawCommand: "line" | "rect" | "circ" | "draw" | "clear" | "piechart" | "hexagen";
  private isMouseDown: boolean = false;
  private snapShot: ImageData;
  private startPoint: Point;
  private endPoint: Point;
  private numberOfSides:number = 6;
  private size:number = 50;

  constructor() {
    this.canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
  }

  public start(): void {
    window.addEventListener("click", (e) => this.dosomething(e));
    this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.draw();
  }
  protected update(): void { }
  private dosomething(e: any) {
    switch (e.target.id) {
      case "lineButton":
        this.drawCommand = "line";
        break;
      case "rectButton":
        this.drawCommand = "rect";
        break;
      case "circleButton":
        this.drawCommand = "circ";
        break;
      case "pencilButton":
        this.drawCommand = "draw";
        break;
      case "piechartButton":
        this.drawCommand = "piechart";
        break;
        case "hexagenButton":
          this.drawCommand = "hexagen";
          break;
      case "clear":
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        break;
    }
  }
  private drawRect(): void {
    let colors = (<HTMLInputElement>document.getElementById('pen-color')).value;
    this.ctx.strokeStyle = colors;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.rect(
      this.startPoint.x,
      this.startPoint.y,
      this.endPoint.distance(this.startPoint).x,
      this.endPoint.distance(this.startPoint).y
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }
  private drawPiechart() {
    const results = [
      { name: "Satisfied", count: 1043, color: "lightblue" },
      { name: "Neutral", count: 563, color: "lightgreen" },
      { name: "Unsatisfied", count: 510, color: "pink" },
      { name: "No comment", count: 175, color: "silver" }
    ];
    let total = results
      .reduce((sum, { count }) => sum + count, 0);
    let currentAngle = -0.5 * Math.PI;
    for (let result of results) {
      let sliceAngle = (result.count / total) * 2 * Math.PI;
      this.ctx.beginPath();
      this.ctx.arc(this.startPoint.x,
        this.startPoint.y,
        this.endPoint.hypotenuse(this.startPoint),
        currentAngle, currentAngle + sliceAngle);
      currentAngle += sliceAngle;
      this.ctx.lineTo(this.startPoint.x,
        this.startPoint.y);
      this.ctx.fillStyle = result.color;
      this.ctx.fill();
    }
  }
  private drawHexagen(): void {
    let colors = (<HTMLInputElement>document.getElementById('pen-color')).value;
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPoint.x + this.size * Math.cos(0), this.startPoint.y + this.size * Math.sin(0));

    for (var i = 1; i <= this.numberOfSides; i += 1) {
      this.ctx.lineTo(this.startPoint.x + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.startPoint.y + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
    }

    this.ctx.strokeStyle = colors;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }
  private drawLine(): void {
    let colors = (<HTMLInputElement>document.getElementById('pen-color')).value;
    this.ctx.beginPath();
    this.ctx.strokeStyle = colors;
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
    this.ctx.lineTo(this.endPoint.x, this.endPoint.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }
  private drawCircle(): void {
    let colors = (<HTMLInputElement>document.getElementById('pen-color')).value;
    this.ctx.strokeStyle = colors;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(
      this.startPoint.x,
      this.startPoint.y,
      this.endPoint.hypotenuse(this.startPoint),
      0,
      Math.PI * 2
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }
  protected draw(): void {
    switch (this.drawCommand) {
      case "line":
        this.drawLine();
        break;
      case "rect":
        this.drawRect();
        break;
      case "circ":
        this.drawCircle();
        break;
      case "piechart":
        this.drawPiechart();
        break;
        case "hexagen":
          this.drawHexagen();
          break;
      case "draw":
        let colors = (<HTMLInputElement>document.getElementById('pen-color')).value;
        this.ctx.beginPath();
        this.ctx.lineWidth = 50;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = colors;
        this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
        this.ctx.lineTo(this.startPoint.x, this.startPoint.y);
        this.ctx.stroke();
        break;
      case "clear":
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        break;
    }
  }

  protected onMouseDown(e: MouseEvent): void {
    this.canvas.onmousemove = this.onMouseMove.bind(this);
    this.isMouseDown = true;
    this.startPoint = new Point(e.offsetX, e.offsetY);
    this.saveSnapshot();
  }
  protected onMouseMove(e: MouseEvent): void {
    this.endPoint = new Point(e.offsetX, e.offsetY);
  }
  protected onMouseUp(e: MouseEvent): void {
    this.restoreSnapshot();
    this.draw();
    this.isMouseDown = false;
    this.canvas.onmousemove = null;
    this.endPoint = null;
    this.startPoint = null;
  }

  protected saveSnapshot(): void {
    this.snapShot = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  protected restoreSnapshot(): void {
    if (this.snapShot) {
      this.ctx.putImageData(this.snapShot, 0, 0);
    }
  }
}


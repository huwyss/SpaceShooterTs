// Hole das Canvas-Element und den 2D-Kontext
// const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
// const ctx = canvas.getContext("2d");

import { IGameObject } from "./IGameObject";

export class Renderer
{
    // Farben definieren
    backgroundColor = "lightblue";
    rectColor = "red";
    shipColor = "blue"

    _canvas: HTMLCanvasElement;
    _ctx: CanvasRenderingContext2D | null;
    _gameObjects: IGameObject[];

    // Variablen für Animation
    rectX = 50;
    rectY = 50;
    rectWidth = 100;
    rectHeight = 50;
    rectSpeedX = 3;
    rectSpeedY = 2;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null, gameObjects: IGameObject[])
    {
        this._canvas = canvas;
        this._ctx = ctx;
        this._gameObjects = gameObjects;
    }
   
    // Zeichne Hintergrund
    public drawBackground() : void
    {
        if (this._ctx == null)
        {
            return;
        }
            
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    // Zeichne ein bewegliches Rechteck
    public drawRectangle() : void
    {
        if (this._ctx == null)
        {
            return;
        }

        this._ctx.fillStyle = this.rectColor;
        this._ctx.fillRect(this.rectX, this.rectY, this.rectWidth, this.rectHeight);
    }

    // Aktualisiere Position des Rechtecks
    public updateRectangle() : void
    {
        this.rectX += this.rectSpeedX;
        this.rectY += this.rectSpeedY;

        // Kollisionserkennung: Wände
        if (this.rectX <= 0 || this.rectX + this.rectWidth >= this._canvas.width) {
            this.rectSpeedX *= -1; // Richtung umkehren
        }
        if (this.rectY <= 0 || this.rectY + this.rectHeight >= this._canvas.height) {
            this.rectSpeedY *= -1; // Richtung umkehren
        }
    }

    drawGameObjects() : void
    {
        if (this._ctx == null)
        {
            return;
        }

        this._gameObjects.forEach((gameObject) => {
        // let gameObject = this._gameObjects[0];
            let x = gameObject.bodyCells[0].PositionX;
            let y = gameObject.bodyCells[0].PositionY;
            let type = gameObject.bodyCells[0].Type;
            let visible = gameObject.bodyCells[0].IsVisible;

            if (visible)
            {
                this._ctx!.fillStyle = this.shipColor;
                this._ctx!.fillRect(x, y, this.rectWidth, this.rectHeight);
            }
        });
    }

    // Haupt-Animationsschleife
    public gameLoop = (): void => {
        
        this.drawBackground();
        // this.drawRectangle();
        this.drawGameObjects();
    
        // todo löschen, das ist Teil von PerformNextStep()
        // this.updateRectangle();

        // hier: gameObjects.PerformStep();

        requestAnimationFrame(this.gameLoop);
    }
}
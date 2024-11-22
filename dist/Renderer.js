// Hole das Canvas-Element und den 2D-Kontext
// const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
// const ctx = canvas.getContext("2d");
export class Renderer {
    constructor(canvas, ctx, gameObjects) {
        // Farben definieren
        this.backgroundColor = "lightblue";
        this.rectColor = "red";
        this.shipColor = "blue";
        // Variablen für Animation
        this.rectX = 50;
        this.rectY = 50;
        this.rectWidth = 100;
        this.rectHeight = 50;
        this.rectSpeedX = 3;
        this.rectSpeedY = 2;
        // Haupt-Animationsschleife
        this.gameLoop = () => {
            this.drawBackground();
            // this.drawRectangle();
            this.drawGameObjects();
            // todo löschen, das ist Teil von PerformNextStep()
            // this.updateRectangle();
            // hier: gameObjects.PerformStep();
            requestAnimationFrame(this.gameLoop);
        };
        this._canvas = canvas;
        this._ctx = ctx;
        this._gameObjects = gameObjects;
    }
    // Zeichne Hintergrund
    drawBackground() {
        if (this._ctx == null) {
            return;
        }
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }
    // Zeichne ein bewegliches Rechteck
    drawRectangle() {
        if (this._ctx == null) {
            return;
        }
        this._ctx.fillStyle = this.rectColor;
        this._ctx.fillRect(this.rectX, this.rectY, this.rectWidth, this.rectHeight);
    }
    // Aktualisiere Position des Rechtecks
    updateRectangle() {
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
    drawGameObjects() {
        if (this._ctx == null) {
            return;
        }
        this._gameObjects.forEach((gameObject) => {
            // let gameObject = this._gameObjects[0];
            let x = gameObject.bodyCells[0].PositionX;
            let y = gameObject.bodyCells[0].PositionY;
            let type = gameObject.bodyCells[0].Type;
            let visible = gameObject.bodyCells[0].IsVisible;
            if (visible) {
                this._ctx.fillStyle = this.shipColor;
                this._ctx.fillRect(x, y, this.rectWidth, this.rectHeight);
            }
        });
    }
}
//# sourceMappingURL=Renderer.js.map
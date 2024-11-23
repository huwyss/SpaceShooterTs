import { CellType } from "./Cell.js";
export class Renderer {
    constructor(canvas, ctx, gameObjects) {
        this.backgroundColor = "lightblue";
        this.enemyColor = "lightgreen";
        this.ufoColor = "darkgrey";
        this.ribbonColor = "darkgreen";
        this.shipColor = "blue";
        this.friendlyRocketColor = "white";
        this.enemyRocketColor = "yellow";
        // Haupt-Animationsschleife
        this.gameLoop = () => {
            this.drawBackground();
            this.drawGameObjects();
            this._gameObjects.forEach(gameObject => {
                gameObject.performNextGameStep();
            });
            requestAnimationFrame(this.gameLoop);
        };
        this._canvas = canvas;
        this._ctx = ctx;
        this._gameObjects = gameObjects;
        this._cellSize = 25;
        this._gridSizeX = this._canvas.width / this._cellSize;
        this._gridSizeY = this._canvas.height / this._cellSize;
    }
    drawBackground() {
        if (this._ctx == null) {
            return;
        }
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }
    drawGameObjects() {
        if (this._ctx == null) {
            return;
        }
        this._gameObjects.forEach((gameObject) => {
            gameObject.bodyCells.forEach(cell => {
                let x = cell.PositionX;
                let y = cell.PositionY;
                let type = cell.Type;
                let visible = cell.IsVisible;
                if (visible) {
                    this._ctx.fillStyle = this.getColor(type);
                    this._ctx.fillRect(x * this._cellSize, y * this._cellSize, this._cellSize, this._cellSize);
                }
            });
        });
    }
    getColor(cellType) {
        switch (cellType) {
            case CellType.SpaceShip:
                return this.shipColor;
                break;
            case CellType.Enemy:
                return this.enemyColor;
                break;
            case CellType.Ufo:
                return this.ufoColor;
                break;
            case CellType.UfoRibbon:
                return this.ribbonColor;
                break;
            case CellType.FriendlyRocket:
                return this.friendlyRocketColor;
                break;
            case CellType.EnemyRocket:
                return this.enemyRocketColor;
                break;
            default:
                return this.friendlyRocketColor;
                break;
        }
    }
}
//# sourceMappingURL=Renderer.js.map
import { CellType } from "./Cell.js";
export class Renderer {
    constructor(canvas, ctx, gameObjects, gameState) {
        this.backgroundColor = "lightblue";
        this.enemyColor = "lightgreen";
        this.ufoColor = "darkgrey";
        this.ribbonColor = "darkgreen";
        this.shipColor = "blue";
        this.friendlyRocketColor = "white";
        this.enemyRocketColor = "yellow";
        // Main loop
        this.gameLoop = () => {
            this.drawBackground();
            this.drawGameObjects();
            this.drawGameState();
            this.gameObjects.forEach(gameObject => {
                gameObject.performNextGameStep();
            });
            requestAnimationFrame(this.gameLoop);
        };
        this.canvas = canvas;
        this.ctx = ctx;
        this.gameObjects = gameObjects;
        this.gameState = gameState;
        this.cellSize = 25;
        this.gridSizeX = this.canvas.width / this.cellSize;
        this.gridSizeY = this.canvas.height / this.cellSize;
    }
    drawBackground() {
        if (this.ctx == null) {
            return;
        }
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawGameObjects() {
        if (this.ctx == null) {
            return;
        }
        this.gameObjects.forEach((gameObject) => {
            gameObject.bodyCells.forEach(cell => {
                let x = cell.PositionX;
                let y = cell.PositionY;
                let type = cell.Type;
                let visible = cell.IsVisible;
                if (visible) {
                    this.ctx.fillStyle = this.getColor(type);
                    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
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
    drawGameState() {
        if (this.ctx) {
            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "black";
            var scoreText = "Score: " + this.gameState.gameScore + "     Lives: " + this.gameState.lives + "     Level: " + this.gameState.level + "     Highscore: " + this.gameState.highScore;
            this.ctx.fillText(scoreText, 50, 30);
            this.ctx.fillText(this.gameState.message, 300, 200);
        }
    }
}
//# sourceMappingURL=Renderer.js.map
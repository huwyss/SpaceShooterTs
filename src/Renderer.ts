import { CellType } from "./Cell.js";
import { IGameObject } from "./IGameObject.js";
import { GameState } from "./GameState.js";

export class Renderer
{
    backgroundColor = "lightblue";
    enemyColor = "lightgreen";
    ufoColor = "darkgrey"
    ribbonColor = "darkgreen"
    shipColor = "blue"
    friendlyRocketColor = "white"
    enemyRocketColor = "yellow"

    cellSize : number;
    gridSizeX : number;
    gridSizeY : number;

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    gameObjects: IGameObject[];
    gameState: GameState;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null, gameObjects: IGameObject[], gameState: GameState)
    {
        this.canvas = canvas;
        this.ctx = ctx;
        this.gameObjects = gameObjects;
        this.gameState = gameState;

        this.cellSize = 25;
        this.gridSizeX = this.canvas.width /  this.cellSize;
        this.gridSizeY = this.canvas.height /  this.cellSize;
    }
   
    public drawBackground() : void
    {
        if (this.ctx == null)
        {
            return;
        }
            
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGameObjects() : void
    {
        if (this.ctx == null)
        {
            return;
        }

        this.gameObjects.forEach((gameObject) => {
            gameObject.bodyCells.forEach(cell => {
        
                let x = cell.PositionX;
                let y = cell.PositionY;
                let type = cell.Type;
                let visible = cell.IsVisible;

                if (visible)
                {
                    this.ctx!.fillStyle = this.getColor(type);
                    this.ctx!.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
                }
            });
        });
    }

    getColor(cellType: CellType) : string
    {
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

    drawGameState()
    {
        if (this.ctx)
        {
            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "black";
            var scoreText = "Score: " + this.gameState.gameScore + "     Lives: " + this.gameState.lives + "     Level: " + this.gameState.level + "     Highscore: " + this.gameState.highScore;
            this.ctx.fillText(scoreText, 30, 30);

            this.ctx.fillText(this.gameState.message, 250, 300);
        }
    }

    // Main loop
    public gameLoop = (): void => {
        
        this.drawBackground();
        this.drawGameObjects();
        this.drawGameState()
    
        this.gameObjects.forEach(gameObject => {
            gameObject.performNextGameStep();
        });

        requestAnimationFrame(this.gameLoop);
    }
}
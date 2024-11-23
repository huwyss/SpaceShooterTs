import { CellType } from "./Cell.js";
import { IGameObject } from "./IGameObject.js";

export class Renderer
{
    backgroundColor = "lightblue";
    enemyColor = "lightgreen";
    ufoColor = "darkgrey"
    ribbonColor = "darkgreen"
    shipColor = "blue"
    friendlyRocketColor = "white"
    enemyRocketColor = "yellow"

    _cellSize : number;
    _gridSizeX : number;
    _gridSizeY : number;

    _canvas: HTMLCanvasElement;
    _ctx: CanvasRenderingContext2D | null;
    _gameObjects: IGameObject[];

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null, gameObjects: IGameObject[])
    {
        this._canvas = canvas;
        this._ctx = ctx;
        this._gameObjects = gameObjects;

        this._cellSize = 25;
        this._gridSizeX = this._canvas.width /  this._cellSize;
        this._gridSizeY = this._canvas.height /  this._cellSize;
    }
   
    public drawBackground() : void
    {
        if (this._ctx == null)
        {
            return;
        }
            
        this._ctx.fillStyle = this.backgroundColor;
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    drawGameObjects() : void
    {
        if (this._ctx == null)
        {
            return;
        }

        this._gameObjects.forEach((gameObject) => {
            gameObject.bodyCells.forEach(cell => {
        
                let x = cell.PositionX;
                let y = cell.PositionY;
                let type = cell.Type;
                let visible = cell.IsVisible;

                if (visible)
                {
                    this._ctx!.fillStyle = this.getColor(type);
                    this._ctx!.fillRect(x * this._cellSize, y * this._cellSize, this._cellSize, this._cellSize);
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

    // Haupt-Animationsschleife
    public gameLoop = (): void => {
        
        this.drawBackground();
        this.drawGameObjects();
    
        this._gameObjects.forEach(gameObject => {
            gameObject.performNextGameStep();
        });

        requestAnimationFrame(this.gameLoop);
    }
}
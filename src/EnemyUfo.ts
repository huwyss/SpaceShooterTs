import { Mediator } from './Mediator.js';
import { EnemyRocket } from './EnemyRocket.js';
import { IGameObject } from './IGameObject.js';
import { ICell, Cell, CellType } from './Cell.js';

export class EnemyUfo implements IGameObject
{
    private readonly mediator: Mediator;
    private readonly gameObjects: IGameObject[];
    private cells: ICell[];
    private ribbon: ICell[];
    private ribbonRightX : number;
    private ribbonLeftX : number;
    private ribbonY : number;
    private difficulty : number;
    private approachTimerStart : number;

    constructor(mediator : Mediator, level: number, gameObjects: IGameObject[])
    {
        this.mediator = mediator;
        this.gameObjects = gameObjects;

        this.cells = [];
        this.ribbon = [];
        this.ribbonRightX = 0;
        this.ribbonLeftX = 0;
        this.ribbonY = 0;
        this.createAndAddUfo(2, 2);
        
        this.difficulty = 1 - level * 0.07;
        this.approachTimerStart = 100 - 5 * level;
    }

    public get bodyCells(): ICell[]
    {
        return this.cells;
    }

    performNextGameStep(): void
    {
        if (Math.random() > this.difficulty) // level 1: difficulty = 90% => fires in 10% of steps.
        {
            var posX = Math.random() * 29 + 2;
            this.ufoFired(posX, this.ribbonY);
        }
    }

    private ufoFired(posX: number, posY: number) : void
    {
        var rocket = new EnemyRocket(this.mediator, posX, posY);
        this.gameObjects.push(rocket);
    }

    cleanup(): void
    {
    
    }

    private createAndAddUfo(posX : number, posY : number) : void 
    {
        var ufo =
            "         ***********         \n" + // * - Ufo
            "    ******* ooooo *******    \n" + // o - Enemy
            " *************************** \n" + // x - Ribbon
            "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n" +
            " *************************** \n" +
            "    *********************    \n" +
            "         ***********         ";

        var startX = posX;
        var startY = posY;
        var positionX = startX;
        var positionY = startY;

        for (const character of ufo)
        {
            if (character == '*')
            {
                this.cells.push(this.makeCell(CellType.Ufo, positionX, positionY));
            }
            else if (character == 'x')
            {
                var ribbonCell = this.makeCell(CellType.UfoRibbon, positionX, positionY);
                this.cells.push(ribbonCell);
                this.addCellToRibbon(ribbonCell);
            }
            else if (character == 'o')
            {
                this.cells.push(this.makeCell(CellType.Enemy, positionX, positionY));
            }
            else if (character == '\n')
            {
                positionY += 1;
                positionX = startX;
                continue;
            }

            positionX += 1;
        }
    }

    private makeCell(type : CellType, x : number, y : number) : ICell
    {
        return new Cell(x, y, type, true);
    }

    private addCellToRibbon(ribbonCell : ICell) : void
    {
        if (ribbonCell.PositionX < this.ribbonLeftX)
        {
            this.ribbonLeftX = ribbonCell.PositionX;
        }

        if (ribbonCell.PositionX > this.ribbonRightX)
        {
            this.ribbonRightX = ribbonCell.PositionX;
        }

        this.ribbonY = ribbonCell.PositionY;

        this.ribbon.push(ribbonCell);
    }
}
import { EnemyRocket } from './EnemyRocket.js';
import { Cell, CellType } from './Cell.js';
export class EnemyUfo {
    constructor(mediator, level, gameObjects) {
        this.mediator = mediator;
        this.gameObjects = gameObjects;
        this.cells = [];
        this.ribbon = [];
        this.ribbonRightX = 0;
        this.ribbonLeftX = 1000; // big number, will be set properly while ufo is created.
        this.ribbonY = 0;
        this.createAndAddUfo(2, 2);
        this.speedTimer = 0;
        this.difficulty = 1 - level * 0.07;
        this.approachTimerStart = 100 - 5 * level;
        this.mediator.enemyHit.addListener((x) => this.enemyWasHit(x));
    }
    get bodyCells() {
        return this.cells;
    }
    get frequency() {
        return 2;
    }
    performNextGameStep() {
        this.speedTimer -= 1;
        if (this.speedTimer > 0) {
            return;
        }
        this.speedTimer = this.frequency;
        if (Math.random() > this.difficulty) // level 1: difficulty = 90% => fires in 10% of steps.
         {
            var posX = Math.random() * 29 + 2;
            this.ufoFired(posX, this.ribbonY);
        }
        this.rotateRibbon();
    }
    rotateRibbon() {
        var ribbonLength = this.ribbonRightX - this.ribbonLeftX + 1;
        for (const ribbonCell of this.ribbon) {
            ribbonCell.PositionX = (ribbonCell.PositionX - this.ribbonLeftX + 1) % ribbonLength + this.ribbonLeftX;
        }
    }
    ufoFired(posX, posY) {
        var rocket = new EnemyRocket(this.mediator, posX, posY);
        this.gameObjects.push(rocket);
    }
    cleanup() {
    }
    createAndAddUfo(posX, posY) {
        var ufo = "         ***********         \n" + // * - Ufo
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
        for (const character of ufo) {
            if (character == '*') {
                this.cells.push(this.makeCell(CellType.Ufo, positionX, positionY));
            }
            else if (character == 'x') {
                var ribbonCell = this.makeCell(CellType.UfoRibbon, positionX, positionY);
                this.cells.push(ribbonCell);
                this.addCellToRibbon(ribbonCell);
            }
            else if (character == 'o') {
                this.cells.push(this.makeCell(CellType.Enemy, positionX, positionY));
            }
            else if (character == '\n') {
                positionY += 1;
                positionX = startX;
                continue;
            }
            positionX += 1;
        }
    }
    makeCell(type, x, y) {
        return new Cell(x, y, type, true);
    }
    addCellToRibbon(ribbonCell) {
        if (ribbonCell.PositionX < this.ribbonLeftX) {
            this.ribbonLeftX = ribbonCell.PositionX;
        }
        if (ribbonCell.PositionX > this.ribbonRightX) {
            this.ribbonRightX = ribbonCell.PositionX;
        }
        this.ribbonY = ribbonCell.PositionY;
        this.ribbon.push(ribbonCell);
    }
    enemyWasHit(position) {
        for (const cell of this.bodyCells) {
            if (position.posX === cell.PositionX && position.posY === cell.PositionY && cell.IsVisible) {
                if (cell.Type == CellType.Enemy) {
                    // this.mediator.OnOneEnemyKilled();
                }
                cell.IsVisible = false;
            }
        }
    }
}
//# sourceMappingURL=EnemyUfo.js.map
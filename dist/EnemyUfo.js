import { EnemyRocket } from './EnemyRocket.js';
import { Cell, CellType } from './Cell.js';
export class EnemyUfo {
    constructor(mediator, level, gameObjects) {
        this.mediator = mediator;
        this.gameObjects = gameObjects;
        this.cells = [];
        this.ribbon = [];
        this.ribbonLeftX = 1000; // big number, will be set properly while ufo is created.
        this.ribbonRightX = 0;
        this.ribbonY = 0;
        this.createAndAddUfo(2, 2);
        this.speedTimer = 0;
        this.approachTimer = 0;
        this.gameLost = false;
        this.difficulty = 1 - level * 0.07;
        this.approachTimerStart = 400 - 20 * level;
        this.enemyHitMethod = (x) => this.enemyWasHit(x);
        this.mediator.enemyHit.addListener(this.enemyHitMethod);
    }
    cleanup() {
        this.mediator.enemyHit.removeListener(this.enemyHitMethod);
    }
    get bodyCells() {
        return this.cells;
    }
    get delay() {
        return 2;
    }
    performNextGameStep() {
        if (this.gameLost) {
            return;
        }
        this.speedTimer -= 1;
        if (this.speedTimer > 0) {
            return;
        }
        this.speedTimer = this.delay;
        if (Math.random() > this.difficulty) // level 1: difficulty = 90% => fires in 10% of steps.
         {
            var posX = Math.floor(Math.random() * 29 + 2);
            this.ufoFired(posX, this.ribbonY);
        }
        this.approach();
        this.rotateRibbon();
        this.gameOverIfAttacked();
    }
    approach() {
        this.approachTimer--;
        if (this.approachTimer < 0) {
            this.approachTimer = this.approachTimerStart;
            for (var cell of this.cells) {
                cell.PositionY++;
            }
        }
        this.ribbonY = this.ribbon[0].PositionY;
    }
    rotateRibbon() {
        var ribbonLength = this.ribbonRightX - this.ribbonLeftX + 1;
        for (const ribbonCell of this.ribbon) {
            ribbonCell.PositionX = (ribbonCell.PositionX - this.ribbonLeftX + 1) % ribbonLength + this.ribbonLeftX;
        }
    }
    gameOverIfAttacked() {
        if (this.ribbon[0].PositionY > 21) {
            this.gameLost = true;
            this.mediator.OnGameOver();
        }
    }
    ufoFired(posX, posY) {
        var rocket = new EnemyRocket(this.mediator, posX, posY);
        this.gameObjects.push(rocket);
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
                cell.IsVisible = false;
                if (cell.Type == CellType.Enemy) {
                    this.mediator.OnOneEnemyKilled();
                }
            }
        }
    }
}
//# sourceMappingURL=EnemyUfo.js.map
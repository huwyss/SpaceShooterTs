import { Cell, CellType } from './Cell.js';
export class EnemyUfo {
    constructor(mediator, level, gameObjects) {
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
    get bodyCells() {
        return this.cells;
    }
    performNextGameStep() {
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
}
//# sourceMappingURL=EnemyUfo.js.map
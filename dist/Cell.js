"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = exports.CellType = void 0;
var CellType;
(function (CellType) {
    CellType[CellType["SpaceShip"] = 0] = "SpaceShip";
    CellType[CellType["Ufo"] = 1] = "Ufo";
    CellType[CellType["UfoRibbon"] = 2] = "UfoRibbon";
    CellType[CellType["FriendlyRocket"] = 3] = "FriendlyRocket";
    CellType[CellType["EnemyRocket"] = 4] = "EnemyRocket";
    CellType[CellType["Enemy"] = 5] = "Enemy";
})(CellType || (exports.CellType = CellType = {}));
class Cell {
    constructor(positionX, positionY, type, isVisible) {
        this.PositionX = positionX;
        this.PositionY = positionY;
        this.Type = type;
        this.IsVisible = isVisible;
    }
}
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map
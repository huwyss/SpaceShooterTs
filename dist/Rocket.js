"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rocket = void 0;
class Rocket {
    // Getter für BodyCells
    get bodyCells() {
        return this._cells;
    }
    // Konstruktor
    constructor(mediator) {
        this._cells = [];
        this._mediator = mediator;
    }
    performNextGameStep() {
    }
    cleanup() {
    }
}
exports.Rocket = Rocket;
//# sourceMappingURL=Rocket.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mediator = void 0;
const GameEvent_1 = require("./GameEvent");
class Mediator {
    constructor() {
        this.gameStarted = new GameEvent_1.GameEvent();
    }
    onGameStarted() {
        this.gameStarted.emit();
    }
}
exports.Mediator = Mediator;
//# sourceMappingURL=Mediator.js.map
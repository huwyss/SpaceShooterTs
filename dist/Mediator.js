import { GameEvent } from './GameEvent.js';
export class Mediator {
    constructor() {
        this.gameStarted = new GameEvent();
    }
    onGameStarted() {
        this.gameStarted.emit();
    }
}
//# sourceMappingURL=Mediator.js.map
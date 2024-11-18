import { GameEvent } from './GameEvent';
export class Mediator {
    constructor() {
        this.gameStarted = new GameEvent();
    }
    onGameStarted() {
        this.gameStarted.emit();
    }
}
//# sourceMappingURL=Mediator.js.map
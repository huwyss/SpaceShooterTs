import { GameEvent } from './GameEvent.js';
export class Mediator {
    constructor() {
        this.gameStarted = new GameEvent();
        this.keyDown = new GameEvent();
    }
    onGameStarted() {
        this.gameStarted.emit();
    }
    OnKeyDown(event) {
        this.keyDown.emit(event);
    }
}
//# sourceMappingURL=Mediator.js.map
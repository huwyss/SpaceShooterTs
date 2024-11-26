import { GameEvent } from './GameEvent.js';
export class Mediator {
    constructor() {
        this.gameStarted = new GameEvent();
        this.keyDown = new GameEvent();
        this.keyUp = new GameEvent();
        this.friendlyRocketMoved = new GameEvent();
        this.enemyRocketMoved = new GameEvent();
        this.friendlyRocketHitTarget = new GameEvent();
        this.enemyHit = new GameEvent();
        this.enemyRocketHitTarget = new GameEvent();
        this.spaceShipHit = new GameEvent();
    }
    onGameStarted() {
        this.gameStarted.emit();
    }
    OnKeyDown(event) {
        this.keyDown.emit(event);
    }
    OnKeyUp(event) {
        this.keyUp.emit(event);
    }
    OnFriendlyRocketMoved(event) {
        this.friendlyRocketMoved.emit(event);
    }
    OnEnemyRocketMoved(event) {
        this.enemyRocketMoved.emit(event);
    }
    OnFriendlyRocketHitTarget(event) {
        this.friendlyRocketHitTarget.emit(event);
    }
    OnEnemyHit(event) {
        this.enemyHit.emit(event);
    }
    OnEnemyRocketHitTarget(event) {
        this.enemyRocketHitTarget.emit(event);
    }
    OnSpaceShipHit(event) {
        this.spaceShipHit.emit(event);
    }
}
//# sourceMappingURL=Mediator.js.map
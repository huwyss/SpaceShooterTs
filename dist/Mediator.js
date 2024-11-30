import { GameEvent } from './GameEvent.js';
export class Mediator {
    constructor() {
        this.gameStarted = new GameEvent();
        this.levelWon = new GameEvent();
        this.gameOver = new GameEvent();
        this.keyDown = new GameEvent();
        this.keyUp = new GameEvent();
        this.friendlyRocketMoved = new GameEvent();
        this.enemyRocketMoved = new GameEvent();
        this.friendlyRocketHitTarget = new GameEvent();
        this.enemyHit = new GameEvent();
        this.enemyRocketHitTarget = new GameEvent();
        this.spaceShipHit = new GameEvent();
        this.oneEnemyKilled = new GameEvent();
        this.showMessage = new GameEvent();
        this.startPause = new GameEvent();
        this.pauseOver = new GameEvent();
        this.showStartButton = new GameEvent();
    }
    onGameStarted() {
        this.gameStarted.emit();
    }
    OnLevelWon(event) {
        this.levelWon.emit(event);
    }
    OnGameOver() {
        this.gameOver.emit();
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
    OnOneEnemyKilled() {
        this.oneEnemyKilled.emit();
    }
    OnShowMessage(m) {
        this.showMessage.emit({ message: m });
    }
    OnStartPause(duration) {
        this.startPause.emit({ number: duration });
    }
    OnPauseOver() {
        this.pauseOver.emit();
    }
    OnShowStartButton() {
        this.showStartButton.emit();
    }
}
//# sourceMappingURL=Mediator.js.map
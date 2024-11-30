import { GameEvent } from './GameEvent.js';

export interface PositionEvent {
    posX: number;
    posY: number;
}

export interface NumberEvent {
    number: number;
}

export interface MessageEvent {
    message: string;
}

export class Mediator 
{
    gameStarted: GameEvent<void> ;
    levelWon: GameEvent<NumberEvent>;
    gameOver: GameEvent<void>;
    keyDown: GameEvent<KeyboardEvent>;
    keyUp: GameEvent<KeyboardEvent>;
    friendlyRocketMoved: GameEvent<PositionEvent>;
    enemyRocketMoved: GameEvent<PositionEvent>;
    friendlyRocketHitTarget: GameEvent<PositionEvent>;
    enemyHit: GameEvent<PositionEvent>;
    enemyRocketHitTarget: GameEvent<PositionEvent>;
    spaceShipHit: GameEvent<PositionEvent>;
    oneEnemyKilled: GameEvent<void>;
    showMessage: GameEvent<MessageEvent>;
    startPause: GameEvent<NumberEvent>;
    pauseOver: GameEvent<void>;
    showStartButton: GameEvent<void>;
    
    constructor ()
    {
        this.gameStarted = new GameEvent<void>();
        this.levelWon = new GameEvent<NumberEvent>();
        this.gameOver = new GameEvent<void>();
        this.keyDown = new GameEvent<KeyboardEvent>();
        this.keyUp = new GameEvent<KeyboardEvent>();
        this.friendlyRocketMoved = new GameEvent<PositionEvent>();
        this.enemyRocketMoved = new GameEvent<PositionEvent>();
        this.friendlyRocketHitTarget = new GameEvent<PositionEvent>();
        this.enemyHit = new GameEvent<PositionEvent>();
        this.enemyRocketHitTarget = new GameEvent<PositionEvent>();
        this.spaceShipHit = new GameEvent<PositionEvent>();
        this.oneEnemyKilled = new GameEvent<void>();
        this.showMessage = new GameEvent<MessageEvent>();
        this.startPause = new GameEvent<NumberEvent>();
        this.pauseOver = new GameEvent<void>();
        this.showStartButton = new GameEvent<void>();
    }
    
    onGameStarted() : void
    {
        this.gameStarted.emit();
    }
    
    OnLevelWon(event: NumberEvent) : void
    {
        this.levelWon.emit(event);
    }

    OnGameOver() : void
    {
        this.gameOver.emit();
    }

    OnKeyDown(event: KeyboardEvent) : void
    {
        this.keyDown.emit(event);
    }

    OnKeyUp(event: KeyboardEvent) : void
    {
        this.keyUp.emit(event);
    }

    OnFriendlyRocketMoved(event: PositionEvent) : void
    {
        this.friendlyRocketMoved.emit(event);
    }

    OnEnemyRocketMoved(event: PositionEvent) : void
    {
        this.enemyRocketMoved.emit(event);
    }

    OnFriendlyRocketHitTarget(event: PositionEvent) : void
    {
        this.friendlyRocketHitTarget.emit(event);
    }

    OnEnemyHit(event: PositionEvent) : void
    {
        this.enemyHit.emit(event);
    }

    OnEnemyRocketHitTarget(event: PositionEvent) : void
    {
        this.enemyRocketHitTarget.emit(event);
    }

    OnSpaceShipHit(event: PositionEvent) : void
    {
        this.spaceShipHit.emit(event);
    }

    OnOneEnemyKilled() : void
    {
        this.oneEnemyKilled.emit();
    }

    OnShowMessage(m: string) : void
    {
        this.showMessage.emit({message: m});
    }

    OnStartPause(duration: number)
    {
        this.startPause.emit({number: duration})
    }

    OnPauseOver() : void
    {
        this.pauseOver.emit();
    }

    OnShowStartButton() : void
    {
        this.showStartButton.emit();
    }
}
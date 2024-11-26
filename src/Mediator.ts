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
    keyDown: GameEvent<KeyboardEvent>;
    keyUp: GameEvent<KeyboardEvent>;
    friendlyRocketMoved: GameEvent<PositionEvent>;
    enemyRocketMoved: GameEvent<PositionEvent>;
    friendlyRocketHitTarget: GameEvent<PositionEvent>;
    enemyHit: GameEvent<PositionEvent>;
    enemyRocketHitTarget: GameEvent<PositionEvent>;
    spaceShipHit: GameEvent<PositionEvent>;

    constructor ()
    {
        this.gameStarted = new GameEvent<void>();
        this.keyDown = new GameEvent<KeyboardEvent>();
        this.keyUp = new GameEvent<KeyboardEvent>();
        this.friendlyRocketMoved = new GameEvent<PositionEvent>();
        this.enemyRocketMoved = new GameEvent<PositionEvent>();
        this.friendlyRocketHitTarget = new GameEvent<PositionEvent>();
        this.enemyHit = new GameEvent<PositionEvent>();
        this.enemyRocketHitTarget = new GameEvent<PositionEvent>();
        this.spaceShipHit = new GameEvent<PositionEvent>();
    }
    
    onGameStarted() : void
    {
        this.gameStarted.emit();
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
}
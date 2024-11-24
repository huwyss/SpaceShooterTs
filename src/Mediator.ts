import { GameEvent } from './GameEvent.js';

export interface PositionEventArgs {
    posX: number;
    posY: number;
}

export interface NumberEventArgs {
    number: number;
}

export interface MessageEventArgs {
    message: string;
}

export class Mediator 
{
    gameStarted: GameEvent<void> ;
    keyDown: GameEvent<KeyboardEvent>;
    keyUp: GameEvent<KeyboardEvent>;

    constructor ()
    {
        this.gameStarted = new GameEvent<void>();
        this.keyDown = new GameEvent<KeyboardEvent>();
        this.keyUp = new GameEvent<KeyboardEvent>();
    }
    
    onGameStarted() : void
    {
        this.gameStarted.emit();
    }

    OnKeyDown(event: KeyboardEvent) : void
    {
        this.keyDown.emit(event)
    }

    OnKeyUp(event: KeyboardEvent) : void
    {
        this.keyUp.emit(event)
    }
}
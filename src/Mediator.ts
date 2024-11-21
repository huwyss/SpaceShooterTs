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

    constructor ()
    {
        this.gameStarted = new GameEvent<void>();
        this.keyDown = new GameEvent<KeyboardEvent>();
    }
    
    onGameStarted() : void
    {
        this.gameStarted.emit();
    }

    OnKeyDown(event: KeyboardEvent) : void
    {
        console.log("keypressed in mediator...")
        this.keyDown.emit(event)
    }
    
}
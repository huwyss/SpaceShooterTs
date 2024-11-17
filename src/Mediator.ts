import { GameEvent } from './GameEvent';

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

    constructor ()
    {
        this.gameStarted = new GameEvent<void>();
    }
    
    onGameStarted() : void
    {
        this.gameStarted.emit();
    }
    
}
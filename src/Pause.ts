import { Mediator, NumberEvent } from './Mediator.js';
import { IGameObject } from './IGameObject.js';
import { ICell } from './Cell.js';

export class Pause implements IGameObject
{
    private readonly mediator: Mediator;
    timer: number = 0;
    startPauseMethod: any;

    constructor(mediator: Mediator)
    {
        this.mediator = mediator;
        this.timer = 0;

        this.startPauseMethod = (x: NumberEvent) => this.startPause(x);
        
        this.mediator.startPause.addListener(this.startPauseMethod);
    }

    bodyCells: ICell[] = [];

    performNextGameStep(): void
    {
        if (this.timer > 0)
        {
            this.timer--;
            if (this.timer == 0)
            {
                this.mediator.OnPauseOver();
            }
        }
    }

    cleanup(): void
    {
        this.mediator.startPause.removeListener(this.startPauseMethod);
        this.timer = 0;
    }

    startPause(event: NumberEvent)
    {
        this.timer = event.number;
    }

    get delay(): number {
        return 1;
    }
}
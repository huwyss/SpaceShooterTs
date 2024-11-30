import { Mediator, NumberEvent } from './Mediator.js';
import { IGameObject } from './IGameObject.js';
import { ICell } from './Cell.js';

export class Pause implements IGameObject
{
    private readonly mediator: Mediator;
    timer: number = 0;

    constructor(mediator: Mediator)
    {
        this.mediator = mediator;
        this.timer = 0;

        this.mediator.startPause.addListener((x) => this.startPause(x));
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
        this.mediator.startPause.removeListener((x) => this.startPause(x));
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
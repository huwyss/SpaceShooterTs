import { ICell } from "./Cell.js";
import { IGameObject } from "./IGameObject.js";
import { Mediator } from "./Mediator.js";
import { PositionEvent } from "./Mediator.js";


export abstract class Rocket implements IGameObject
{
    protected readonly mediator: Mediator;
    protected cells: ICell[] = [];
    protected rocket!: ICell;

    get bodyCells(): ICell[] {
        return this.cells;
    }

    get delay(): number {
        return 4;
    }

    constructor(mediator: Mediator) {
        this.mediator = mediator;
    }

    performNextGameStep(): void
    {
    }

    cleanup(): void
    {
    }

    rocketHitTarget(position: PositionEvent) : void
    {
        if (position.posX === this.rocket.PositionX && position.posY === this.rocket.PositionY)
        {
            this.rocket.IsVisible = false;
        }
    }
}
import { ICell } from "./Cell.js";
import { IGameObject } from "./IGameObject.js";
import { Mediator } from "./Mediator.js";
import { PositionEvent } from "./Mediator.js";


export abstract class Rocket implements IGameObject {
    // Protected Eigenschaften
    protected readonly mediator: Mediator;
    protected cells: ICell[] = [];
    protected rocket!: ICell;

    // Getter für BodyCells
    get bodyCells(): ICell[] {
        return this.cells;
    }

    get frequency(): number {
        return 3;
    }

    // Konstruktor
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
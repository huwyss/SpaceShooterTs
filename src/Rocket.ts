import { ICell } from "./Cell.js";
import { IGameObject } from "./IGameObject.js";
import { Mediator } from "./Mediator.js";


export abstract class Rocket implements IGameObject {
    // Protected Eigenschaften
    protected readonly _mediator: Mediator;
    protected _cells: ICell[] = [];
    protected _rocket!: ICell;

    // Getter für BodyCells
    get bodyCells(): ICell[] {
        return this._cells;
    }

    get frequency(): number {
        return 3;
    }

    // Konstruktor
    constructor(mediator: Mediator) {
        this._mediator = mediator;
    }

    performNextGameStep(): void
    {

    }

    cleanup(): void
    {

    }
}
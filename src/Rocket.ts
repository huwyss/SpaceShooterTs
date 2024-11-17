import { ICell } from "./Cell";
import { IGameObject } from "./IGameObject";
import { Mediator } from "./Mediator";


export abstract class Rocket implements IGameObject {
    // Protected Eigenschaften
    protected readonly _mediator: Mediator;
    protected _cells: ICell[] = [];
    protected _rocket!: ICell;

    // Getter für BodyCells
    get bodyCells(): ICell[] {
        return this._cells;
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
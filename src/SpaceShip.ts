import { Mediator } from './Mediator.js';
import { IGameObject } from './IGameObject.js';
import { ICell, Cell, CellType } from './Cell.js';
import { FriendlyRocket } from './FriendlyRocket.js';

enum Direction {
    Left,
    Right,
    None
}

export class SpaceShip implements IGameObject
{
    private readonly mediator: Mediator;
    private readonly gameObjects: IGameObject[];
    private cells: ICell[] = [];
    private ship: Cell;
    private _direction: Direction;
    private spaceTimer: number = 0;
    private canPressSpace: boolean = true;
    private speedTimer: number = 0;
    private fireSpeed: number = 12;

    constructor(mediator: Mediator, gameObjects: IGameObject[]) {
        this.mediator = mediator;
        this.gameObjects = gameObjects;

        this.ship = new Cell(3, 23, CellType.SpaceShip, true);
        this.cells.push(this.ship);

        this._direction = Direction.None;

        this.mediator.keyDown.addListener((x) => this.keyDown(x));
        this.mediator.keyUp.addListener((x) => this.keyUp(x));
    }

    get delay(): number {
        return 7;
    }

    public cleanup(): void
    {
        this.mediator.keyDown.removeListener((x) => this.keyDown(x));
        this.mediator.keyUp.removeListener((x) => this.keyUp(x));
        this._direction = Direction.None;
        this.spaceTimer = 0;
    }

    keyDown(event: KeyboardEvent) : void
    {
        if (event.key === "ArrowLeft")
        {
            this.direction = Direction.Left; // special setter
        }
        else if (event.key === "ArrowRight")
        {
            this.direction = Direction.Right; // special setter
        }
        else if (event.key == " ")
        {
            if (this.canPressSpace)
            {
                this.fireRocket(this.ship.PositionX, this.ship.PositionY);
                this.canPressSpace = false;
                this.spaceTimer = this.fireSpeed;
            }
        }
    }

    keyUp(event: KeyboardEvent) : void
    {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight")
        {
            this.direction = Direction.None;
        }
    }

    public get bodyCells(): ICell[]
    {
        return this.cells;
    }

    public performNextGameStep(): void
    {
        this.decreaseSpaceTimer();

        this.speedTimer -= 1;
        if (this.speedTimer > 0)
        {
            return;
        }
        this.speedTimer = this.delay;

        this.moveSpaceShip();
    }

    decreaseSpaceTimer()
    {
        this.spaceTimer-= 1;
        if (this.spaceTimer <= 0)
        {
            this.spaceTimer = 10;
            this.canPressSpace = true;
        }
    }

    moveSpaceShip()
    {
        switch (this.direction)
        {
            case Direction.Left:
                this.ship.PositionX -= 1;
                break;

            case Direction.Right:
                this.ship.PositionX += 1;
                break;

            default:
                break;
        }
    }

    private get direction() : Direction
    {
        return this._direction;
    }

    private set direction(value: Direction)
    {
        this._direction = value;
        this.speedTimer = this.delay;
        this.moveSpaceShip();
    }

    private fireRocket(posX: number, posY: number): void
    {
        let rocket =new FriendlyRocket(this.mediator, posX, posY);
        this.gameObjects.push(rocket);
    }
}


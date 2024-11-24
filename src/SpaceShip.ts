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
    private dir: Direction;
    private spaceTimer: number = 0;
    private canPressSpace: boolean = true;
    private speedTimer: number = 0;

    constructor(mediator: Mediator, gameObjects: IGameObject[]) {
        this.mediator = mediator;
        this.gameObjects = gameObjects;

        this.ship = new Cell(3, 23, CellType.SpaceShip, true);
        this.cells.push(this.ship);

        this.dir = Direction.None;

        this.mediator.gameStarted.addListener((msg) => this.OnGameStarted(msg));
        this.mediator.keyDown.addListener((x) => this.keyDown(x));
        this.mediator.keyUp.addListener((x) => this.keyUp(x));
    }

    get frequency(): number {
        return 2;
    }

    public cleanup(): void
    {
        this.mediator.gameStarted.removeListener((msg) => this.OnGameStarted(msg));
        this.mediator.keyDown.removeListener((x) => this.keyDown(x));
        this.mediator.keyUp.removeListener((x) => this.keyUp(x));
    }

    OnGameStarted(msg: void) : void
    {
        console.log("OnGameStarted called of SpaceShip.")
    }

    keyDown(event: KeyboardEvent) : void
    {
        if (event.key === "ArrowLeft")
        {
            this.direction = Direction.Left;
        }
        else if (event.key === "ArrowRight")
        {
            this.direction = Direction.Right;
        }
        else if (event.key == " ")
        {
            if (this.canPressSpace)
            {
                this.fireRocket(this.ship.PositionX, this.ship.PositionY);
                this.canPressSpace = false;
                this.spaceTimer = 5;
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

    private pauseOnce: boolean = false;

    public performNextGameStep(): void
    {
        this.speedTimer -= 1;
        if (this.speedTimer > 0)
        {
            return;
        }
        this.speedTimer = this.frequency;

        this.spaceTimer-= 1;
        if (this.spaceTimer <= 0)
        {
            this.spaceTimer = 0;
            this.canPressSpace = true;
        }

        if (this.pauseOnce) {
            this.pauseOnce = false;
            return;
        }

        switch (this.dir) {
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

    private set direction(value: Direction)
    {
        this.dir = value;
        this.performNextGameStep();
    }

    private fireRocket(posX: number, posY: number): void {
        let rocket = new FriendlyRocket(this.mediator, posX, posY);
        this.gameObjects.push(rocket);
    }
}


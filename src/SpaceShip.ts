import { Mediator } from './Mediator.js';
import { IGameObject } from './IGameObject.js';
import { ICell, Cell, CellType } from './Cell.js';
import { FriendlyRocket } from './FriendlyRocket.js';

enum Direction {
    Left,
    Right,
    None
}

export class SpaceShip implements IGameObject {
    private readonly mediator: Mediator;
    private readonly gameObjects: IGameObject[];
    private cells: ICell[] = [];
    private ship: Cell;
    private dir: Direction;

    // private spaceTimer: NodeJS.Timeout | null = null;
    private canPressSpace: boolean = true;

    constructor(mediator: Mediator, gameObjects: IGameObject[]) {
        this.mediator = mediator;
        this.gameObjects = gameObjects;

        this.ship = new Cell(3, 23, CellType.SpaceShip, true);
        this.cells.push(this.ship);

        this.dir = Direction.None;

        this.mediator.gameStarted.addListener((msg) => this.OnGameStarted(msg));
        this.mediator.keyDown.addListener((x) => this.OnKeyDown(x));


        // this.mediator.KeyPressed.add(this.keyPressed.bind(this));
        // this.mediator.KeyReleased.add(this.keyReleased.bind(this));

        // Initialize the timer with an interval
        // this.spaceTimer = null;

        console.log("SpaceShip: constructor called.")
    }

    public cleanup(): void {
        // this.mediator.KeyPressed.remove(this.keyPressed.bind(this));
        // this.mediator.KeyReleased.remove(this.keyReleased.bind(this));
    }

    OnGameStarted(msg: void) : void
    {
        console.log("OnGameStarted called of SpaceShip.")
    }

    OnKeyDown(event: KeyboardEvent) : void
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
                // this.spaceTimer = setTimeout(() => {
                //     this.canPressSpace = true;
                // }, 150);
            }
        }
    }

    public get bodyCells(): ICell[]
    {
        return this.cells;
    }

    private pauseOnce: boolean = false;

    public performNextGameStep(): void {
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

    private set direction(value: Direction) {
        this.dir = value;
        this.performNextGameStep();
        this.pauseOnce = true;
    }

    // private keyPressed(sender: any, key: string): void {
    //     switch (key) {
    //         case 'Left':
    //             this.direction = Direction.Left;
    //             break;

    //         case 'Right':
    //             this.direction = Direction.Right;
    //             break;

    //         case 'Space':
    //             if (this.canPressSpace) {
    //                 // this.fireRocket(this.ship.PositionX, this.ship.PositionY);
    //                 this.canPressSpace = false;
    //                 // this.spaceTimer = setTimeout(() => {
    //                 //     this.canPressSpace = true;
    //                 // }, 150);
    //             }
    //             break;

    //         default:
    //             break;
    //     }
    // }

    private keyReleased(sender: any, key: string): void {
        if (key === 'Left' || key === 'Right') {
            this.direction = Direction.None;
        }
    }

    private fireRocket(posX: number, posY: number): void {
        let rocket = new FriendlyRocket(this.mediator, posX, posY);
        this.gameObjects.push(rocket);
    }
}


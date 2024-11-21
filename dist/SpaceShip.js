import { Cell, CellType } from './Cell.js';
// import { FriendlyRocket } from './FriendlyRocket';
var Direction;
(function (Direction) {
    Direction[Direction["Left"] = 0] = "Left";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["None"] = 2] = "None";
})(Direction || (Direction = {}));
export class SpaceShip {
    constructor(mediator, gameObjects) {
        this.cells = [];
        // private spaceTimer: NodeJS.Timeout | null = null;
        this.canPressSpace = true;
        this.pauseOnce = false;
        this.mediator = mediator;
        this.gameObjects = gameObjects;
        this.ship = new Cell(3, 27, CellType.SpaceShip, true);
        this.cells.push(this.ship);
        this.dir = Direction.None;
        this.mediator.gameStarted.addListener((msg) => this.OnGameStarted(msg));
        this.mediator.keyDown.addListener((msg) => this.OnKeyDown(msg));
        // this.mediator.KeyPressed.add(this.keyPressed.bind(this));
        // this.mediator.KeyReleased.add(this.keyReleased.bind(this));
        // Initialize the timer with an interval
        // this.spaceTimer = null;
        console.log("SpaceShip: constructor called.");
    }
    cleanup() {
        // this.mediator.KeyPressed.remove(this.keyPressed.bind(this));
        // this.mediator.KeyReleased.remove(this.keyReleased.bind(this));
    }
    OnGameStarted(msg) {
        console.log("OnGameStarted called of SpaceShip.");
    }
    OnKeyDown(event) {
        console.log("keypressed in spaceship...");
        if (event.key === "ArrowLeft") {
            console.log("arrow left in spaceship...");
            this.ship.PositionX -= 1;
        }
        else if (event.key === "ArrowRight") {
            console.log("arrow right in spaceship...");
            this.ship.PositionX += 1;
        }
    }
    get bodyCells() {
        return this.cells;
    }
    performNextGameStep() {
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
    set direction(value) {
        this.dir = value;
        this.performNextGameStep();
        this.pauseOnce = true;
    }
    keyPressed(sender, key) {
        switch (key) {
            case 'Left':
                this.direction = Direction.Left;
                break;
            case 'Right':
                this.direction = Direction.Right;
                break;
            case 'Space':
                if (this.canPressSpace) {
                    // this.fireRocket(this.ship.PositionX, this.ship.PositionY);
                    this.canPressSpace = false;
                    // this.spaceTimer = setTimeout(() => {
                    //     this.canPressSpace = true;
                    // }, 150);
                }
                break;
            default:
                break;
        }
    }
    keyReleased(sender, key) {
        if (key === 'Left' || key === 'Right') {
            this.direction = Direction.None;
        }
    }
}
//# sourceMappingURL=SpaceShip.js.map
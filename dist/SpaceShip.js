import { Cell, CellType } from './Cell.js';
import { FriendlyRocket } from './FriendlyRocket.js';
var Direction;
(function (Direction) {
    Direction[Direction["Left"] = 0] = "Left";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["None"] = 2] = "None";
})(Direction || (Direction = {}));
export class SpaceShip {
    constructor(mediator, gameObjects) {
        this.cells = [];
        this.spaceTimer = 0;
        this.canPressSpace = true;
        this.speedTimer = 0;
        this.pauseOnce = false;
        this.mediator = mediator;
        this.gameObjects = gameObjects;
        this.ship = new Cell(3, 23, CellType.SpaceShip, true);
        this.cells.push(this.ship);
        this.dir = Direction.None;
        this.mediator.gameStarted.addListener((x) => this.OnGameStarted(x));
        this.mediator.keyDown.addListener((x) => this.keyDown(x));
        this.mediator.keyUp.addListener((x) => this.keyUp(x));
    }
    get frequency() {
        return 2;
    }
    cleanup() {
        this.mediator.gameStarted.removeListener((x) => this.OnGameStarted(x));
        this.mediator.keyDown.removeListener((x) => this.keyDown(x));
        this.mediator.keyUp.removeListener((x) => this.keyUp(x));
    }
    OnGameStarted(msg) {
        console.log("OnGameStarted called of SpaceShip.");
    }
    keyDown(event) {
        if (event.key === "ArrowLeft") {
            this.direction = Direction.Left;
        }
        else if (event.key === "ArrowRight") {
            this.direction = Direction.Right;
        }
        else if (event.key == " ") {
            if (this.canPressSpace) {
                this.fireRocket(this.ship.PositionX, this.ship.PositionY);
                this.canPressSpace = false;
                this.spaceTimer = 5;
            }
        }
    }
    keyUp(event) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            this.direction = Direction.None;
        }
    }
    get bodyCells() {
        return this.cells;
    }
    performNextGameStep() {
        this.speedTimer -= 1;
        if (this.speedTimer > 0) {
            return;
        }
        this.speedTimer = this.frequency;
        this.spaceTimer -= 1;
        if (this.spaceTimer <= 0) {
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
    set direction(value) {
        this.dir = value;
        this.performNextGameStep();
    }
    fireRocket(posX, posY) {
        let rocket = new FriendlyRocket(this.mediator, posX, posY);
        this.gameObjects.push(rocket);
    }
}
//# sourceMappingURL=SpaceShip.js.map
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
        this.fireSpeed = 12;
        this.mediator = mediator;
        this.gameObjects = gameObjects;
        this.ship = new Cell(3, 23, CellType.SpaceShip, true);
        this.cells.push(this.ship);
        this._direction = Direction.None;
        this.keyDownMethod = (x) => this.keyDown(x);
        this.keyUpMethod = (x) => this.keyUp(x);
        this.mediator.keyDown.addListener(this.keyDownMethod);
        this.mediator.keyUp.addListener(this.keyUpMethod);
    }
    get delay() {
        return 7;
    }
    cleanup() {
        this.mediator.keyDown.removeListener(this.keyDownMethod);
        this.mediator.keyUp.removeListener(this.keyUpMethod);
        this._direction = Direction.None;
        this.spaceTimer = 0;
    }
    keyDown(event) {
        if (event.key === "ArrowLeft") {
            this.direction = Direction.Left; // special setter
        }
        else if (event.key === "ArrowRight") {
            this.direction = Direction.Right; // special setter
        }
        else if (event.key == " ") {
            if (this.canPressSpace) {
                this.fireRocket(this.ship.PositionX, this.ship.PositionY);
                this.canPressSpace = false;
                this.spaceTimer = this.fireSpeed;
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
        this.decreaseSpaceTimer();
        this.speedTimer -= 1;
        if (this.speedTimer > 0) {
            return;
        }
        this.speedTimer = this.delay;
        this.moveSpaceShip();
    }
    decreaseSpaceTimer() {
        this.spaceTimer -= 1;
        if (this.spaceTimer <= 0) {
            this.spaceTimer = 10;
            this.canPressSpace = true;
        }
    }
    moveSpaceShip() {
        switch (this.direction) {
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
    get direction() {
        return this._direction;
    }
    set direction(value) {
        this._direction = value;
        this.speedTimer = this.delay;
        this.moveSpaceShip();
    }
    fireRocket(posX, posY) {
        let rocket = new FriendlyRocket(this.mediator, posX, posY);
        this.gameObjects.push(rocket);
    }
}
//# sourceMappingURL=SpaceShip.js.map
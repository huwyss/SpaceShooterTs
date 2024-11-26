import { Rocket } from "./Rocket.js"; // Importiere die Basisklasse
import { Cell, CellType } from "./Cell.js"; // Importiere die Cell-Klasse und den CellType
export class FriendlyRocket extends Rocket {
    constructor(mediator, startPosX, startPosY) {
        super(mediator);
        this.speedTimer = 0;
        this.rocket = new Cell(startPosX, startPosY, CellType.FriendlyRocket, true);
        this.cells.push(this.rocket);
        this.mediator.friendlyRocketHitTarget.addListener((x) => this.rocketHitTarget(x));
    }
    // RocketHitTarget Methode (falls benötigt, implementiere sie hier)
    RocketHitTarget() {
        console.log("Friendly rocket hit the target!");
    }
    performNextGameStep() {
        this.speedTimer -= 1;
        if (this.speedTimer > 0) {
            return;
        }
        this.speedTimer = this.frequency;
        if (!this.rocket.IsVisible) {
            return;
        }
        this.rocket.PositionY -= 1;
        if (this.rocket.PositionY < 0) {
            this.cells = [];
        }
        else {
            this.mediator.OnFriendlyRocketMoved({ posX: this.rocket.PositionX, posY: this.rocket.PositionY });
        }
    }
}
//# sourceMappingURL=FriendlyRocket.js.map
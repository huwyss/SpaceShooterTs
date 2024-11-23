import { Rocket } from "./Rocket.js"; // Importiere die Basisklasse
import { Cell, CellType } from "./Cell.js"; // Importiere die Cell-Klasse und den CellType
export class FriendlyRocket extends Rocket {
    constructor(mediator, startPosX, startPosY) {
        super(mediator);
        // Initialisiere _rocket
        this._rocket = new Cell(startPosX, startPosY, CellType.FriendlyRocket, true);
        // Füge _rocket zu _cells hinzu
        this._cells.push(this._rocket);
        // Event registrieren
        //mediator.FriendlyRocketHitTarget.on(this.RocketHitTarget.bind(this));
    }
    // RocketHitTarget Methode (falls benötigt, implementiere sie hier)
    RocketHitTarget() {
        console.log("Friendly rocket hit the target!");
    }
    performNextGameStep() {
        if (!this._rocket.IsVisible) {
            return;
        }
        this._rocket.PositionY -= 1;
        if (this._rocket.PositionY < 0) {
            this._cells = [];
        }
        else {
            //this._mediator.OnFriendlyRocketMoved(_rocket.PositionX, _rocket.PositionY);
        }
    }
}
//# sourceMappingURL=FriendlyRocket.js.map
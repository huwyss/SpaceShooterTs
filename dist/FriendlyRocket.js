"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendlyRocket = void 0;
const Rocket_1 = require("./Rocket"); // Importiere die Basisklasse
const Cell_1 = require("./Cell"); // Importiere die Cell-Klasse und den CellType
class FriendlyRocket extends Rocket_1.Rocket {
    constructor(mediator, startPosX, startPosY) {
        super(mediator);
        // Initialisiere _rocket
        this._rocket = new Cell_1.Cell(startPosX, startPosY, Cell_1.CellType.FriendlyRocket, true);
        // Füge _rocket zu _cells hinzu
        this._cells.push(this._rocket);
        // Event registrieren
        //mediator.FriendlyRocketHitTarget.on(this.RocketHitTarget.bind(this));
    }
    // RocketHitTarget Methode (falls benötigt, implementiere sie hier)
    RocketHitTarget() {
        console.log("Friendly rocket hit the target!");
    }
}
exports.FriendlyRocket = FriendlyRocket;
//# sourceMappingURL=FriendlyRocket.js.map
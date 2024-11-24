import { Rocket } from "./Rocket.js"; // Importiere die Basisklasse
import { Cell, CellType } from "./Cell.js"; // Importiere die Cell-Klasse und den CellType
export class EnemyRocket extends Rocket {
    constructor(mediator, startPosX, startPosY) {
        super(mediator);
        // Initialisiere _rocket
        this._rocket = new Cell(startPosX, startPosY, CellType.EnemyRocket, true);
        // Füge _rocket zu _cells hinzu
        this._cells.push(this._rocket);
        // Event registrieren
        //mediator.EnemyRocketHitTarget.on(this.RocketHitTarget.bind(this));
    }
    // RocketHitTarget Methode (falls benötigt, implementiere sie hier)
    // private RocketHitTarget(): void
    // {
    //     console.log("Friendly rocket hit the target!");
    // }
    performNextGameStep() {
        if (!this._rocket.IsVisible) {
            return;
        }
        this._rocket.PositionY += 1;
        if (this._rocket.PositionY > 30) {
            this._cells = [];
        }
        else {
            //this._mediator.OnEnemyRocketMoved(_rocket.PositionX, _rocket.PositionY);
        }
    }
}
//# sourceMappingURL=EnemyRocket.js.map
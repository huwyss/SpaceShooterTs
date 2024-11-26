import { Rocket } from "./Rocket.js"; // Importiere die Basisklasse
import { Cell, CellType } from "./Cell.js"; // Importiere die Cell-Klasse und den CellType
export class EnemyRocket extends Rocket {
    constructor(mediator, startPosX, startPosY) {
        super(mediator);
        this.speedTimer = 0;
        // Initialisiere _rocket
        this.rocket = new Cell(startPosX, startPosY, CellType.EnemyRocket, true);
        // Füge _rocket zu _cells hinzu
        this.cells.push(this.rocket);
        // Event registrieren
        //mediator.EnemyRocketHitTarget.on(this.RocketHitTarget.bind(this));
    }
    // RocketHitTarget Methode (falls benötigt, implementiere sie hier)
    // private RocketHitTarget(): void
    // {
    //     console.log("Friendly rocket hit the target!");
    // }
    performNextGameStep() {
        this.speedTimer -= 1;
        if (this.speedTimer > 0) {
            return;
        }
        this.speedTimer = this.frequency;
        if (!this.rocket.IsVisible) {
            return;
        }
        this.rocket.PositionY += 1;
        if (this.rocket.PositionY > 30) {
            this.cells = [];
        }
        else {
            this.mediator.OnEnemyRocketMoved({ posX: this.rocket.PositionX, posY: this.rocket.PositionY });
        }
    }
}
//# sourceMappingURL=EnemyRocket.js.map
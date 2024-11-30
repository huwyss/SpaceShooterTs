import { Rocket } from "./Rocket.js"; // Importiere die Basisklasse
import { Cell, CellType } from "./Cell.js"; // Importiere die Cell-Klasse und den CellType
export class EnemyRocket extends Rocket {
    constructor(mediator, startPosX, startPosY) {
        super(mediator);
        this.speedTimer = 0;
        this.rocket = new Cell(startPosX, startPosY, CellType.EnemyRocket, true);
        this.cells.push(this.rocket);
        this.mediator.enemyRocketHitTarget.addListener((x) => this.rocketHitTarget(x));
    }
    cleanup() {
        this.mediator.enemyRocketHitTarget.removeListener((x) => this.rocketHitTarget(x));
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
import { Rocket } from "./Rocket.js"; // Importiere die Basisklasse
import { Mediator } from "./Mediator.js"; // Importiere den Mediator
import { Cell, CellType } from "./Cell.js"; // Importiere die Cell-Klasse und den CellType

export class EnemyRocket extends Rocket
{
    speedTimer: number = 0;

    constructor(mediator: Mediator, startPosX: number, startPosY: number)
    {
        super(mediator);

        this.rocket = new Cell(startPosX, startPosY, CellType.EnemyRocket, true);
        this.cells.push(this.rocket);

        this.mediator.enemyRocketHitTarget.addListener((x) => this.rocketHitTarget(x));
    }

    override cleanup()
    {
        this.mediator.enemyRocketHitTarget.removeListener((x) => this.rocketHitTarget(x));
    }

    override performNextGameStep(): void
    {
        this.speedTimer -= 1;
        if (this.speedTimer > 0)
        {
            return;
        }
        this.speedTimer = this.delay;

        if (!this.rocket.IsVisible)
        {
            return;
        }
            
        this.rocket.PositionY += 1;
        
        if (this.rocket.PositionY > 30)
        {
            this.cells = [];
        }
        else
        {
            this.mediator.OnEnemyRocketMoved({posX: this.rocket.PositionX, posY: this.rocket.PositionY});
        }
    }
}
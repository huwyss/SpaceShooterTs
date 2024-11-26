import { Rocket } from "./Rocket.js"; // Importiere die Basisklasse
import { Mediator, PositionEvent } from "./Mediator.js"; // Importiere den Mediator
import { Cell, CellType } from "./Cell.js"; // Importiere die Cell-Klasse und den CellType

export class FriendlyRocket extends Rocket
{
    speedTimer: number = 0;

    constructor(mediator: Mediator, startPosX: number, startPosY: number)
    {
        super(mediator);

        this.rocket = new Cell(startPosX, startPosY,CellType.FriendlyRocket, true);

        this.cells.push(this.rocket);

        this.mediator.friendlyRocketHitTarget.addListener((x) => this.rocketHitTarget(x));
    }

    // RocketHitTarget Methode (falls benötigt, implementiere sie hier)
    private RocketHitTarget(): void
    {
        console.log("Friendly rocket hit the target!");
    }

    override performNextGameStep(): void
    {
        this.speedTimer -= 1;
        if (this.speedTimer > 0)
        {
            return;
        }
        this.speedTimer = this.frequency;

        if (!this.rocket.IsVisible)
        {
            return;
        }
            
        this.rocket.PositionY -= 1;
        
        if (this.rocket.PositionY < 0)
        {
            this.cells = [];
        }
        else
        {
            this.mediator.OnFriendlyRocketMoved({posX: this.rocket.PositionX, posY: this.rocket.PositionY});
        }
    }
}

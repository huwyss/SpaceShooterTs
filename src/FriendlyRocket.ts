import { Rocket } from "./Rocket.js";
import { Mediator, PositionEvent } from "./Mediator.js";
import { Cell, CellType } from "./Cell.js";

export class FriendlyRocket extends Rocket
{
    speedTimer: number = 0;
    friendlyRocketHitTargetMethod: any;

    constructor(mediator: Mediator, startPosX: number, startPosY: number)
    {
        super(mediator);

        this.rocket = new Cell(startPosX, startPosY,CellType.FriendlyRocket, true);
        this.cells.push(this.rocket);

        this.friendlyRocketHitTargetMethod = (x: PositionEvent) => this.rocketHitTarget(x);

        this.mediator.friendlyRocketHitTarget.addListener(this.friendlyRocketHitTargetMethod);
    }

    override cleanup()
    {
        this.mediator.friendlyRocketHitTarget.removeListener(this.friendlyRocketHitTargetMethod);
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

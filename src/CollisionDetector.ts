import { Mediator } from './Mediator.js';
import { IGameObject } from './IGameObject.js';
import { PositionEvent } from './Mediator.js';
import { EnemyUfo } from './EnemyUfo.js';
import { SpaceShip } from './SpaceShip.js';

export class CollisionDetector
{
    private readonly mediator: Mediator;
    private readonly gameObjects: IGameObject[];

    constructor(mediator: Mediator, gameObjects: IGameObject[])
    {
        this.mediator = mediator;
        this.gameObjects = gameObjects;

        this.mediator.friendlyRocketMoved.addListener((x) => this.checkCollisionWithUfo(x));
        this.mediator.enemyRocketMoved.addListener((x) => this.checkCollisionWithSpaceShip(x));
    }

    private checkCollisionWithUfo(position: PositionEvent) : void
    {
        var rocketX = position.posX;
        var rocketY = position.posY;
    
        var ufo = this.gameObjects.find(go => go instanceof EnemyUfo);
        if (ufo != null)
        {
            for (const cell of ufo.bodyCells)
            {
                if (cell.PositionX === rocketX && cell.PositionY === rocketY && cell.IsVisible)
                {
                    this.mediator.OnFriendlyRocketHitTarget({ posX: rocketX, posY: rocketY });
                    this.mediator.OnEnemyHit({ posX: rocketX, posY: rocketY });
                    break;
                }
            }
        }
    }
    
    private checkCollisionWithSpaceShip(position: PositionEvent) : void
    {
        var rocketX = position.posX;
        var rocketY = position.posY;
    
        var spaceShip = this.gameObjects.find(go => go instanceof SpaceShip);
        if (spaceShip != null)
        {
            for (const cell of spaceShip.bodyCells)
            {
                if (cell.PositionX === rocketX && cell.PositionY === rocketY && cell.IsVisible)
                {
                    this.mediator.OnEnemyRocketHitTarget({posX: rocketX, posY: rocketY});
                    this.mediator.OnSpaceShipHit({posX: rocketX, posY: rocketY});
                    break;
                }
            }
        }
    }

}
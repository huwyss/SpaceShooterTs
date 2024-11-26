import { EnemyUfo } from './EnemyUfo.js';
import { SpaceShip } from './SpaceShip.js';
export class CollisionDetector {
    constructor(mediator, gameObjects) {
        this.mediator = mediator;
        this.gameObjects = gameObjects;
        this.mediator.friendlyRocketMoved.addListener((x) => this.checkCollisionWithUfo(x));
        this.mediator.enemyRocketMoved.addListener((x) => this.checkCollisionWithSpaceShip(x));
    }
    checkCollisionWithUfo(position) {
        var rocketX = position.posX;
        var rocketY = position.posY;
        var ufo = this.gameObjects.find(go => go instanceof EnemyUfo);
        if (ufo != null) {
            for (const cell of ufo.bodyCells) {
                if (cell.PositionX === rocketX && cell.PositionY === rocketY && cell.IsVisible) {
                    this.mediator.OnFriendlyRocketHitTarget({ posX: rocketX, posY: rocketY });
                    this.mediator.OnEnemyHit({ posX: rocketX, posY: rocketY });
                    break;
                }
            }
        }
    }
    checkCollisionWithSpaceShip(position) {
        var rocketX = position.posX;
        var rocketY = position.posY;
        var spaceShip = this.gameObjects.find(go => go instanceof SpaceShip);
        if (spaceShip != null) {
            for (const cell of spaceShip.bodyCells) {
                if (cell.PositionX === rocketX && cell.PositionY === rocketY && cell.IsVisible) {
                    this.mediator.OnEnemyRocketHitTarget({ posX: rocketX, posY: rocketY });
                    this.mediator.OnSpaceShipHit({ posX: rocketX, posY: rocketY });
                    break;
                }
            }
        }
    }
}
//# sourceMappingURL=CollisionDetector.js.map
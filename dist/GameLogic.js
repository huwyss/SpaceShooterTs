import { SpaceShip } from './SpaceShip.js';
import { Mediator } from './Mediator.js';
import { Renderer } from './Renderer.js';
import { EnemyUfo } from './EnemyUfo.js';
import { CollisionDetector } from './CollisionDetector.js';
export class GameLogic {
    constructor(canvas, ctx, doc) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.document = doc;
        this.mediator = new Mediator();
        this.gameObjects = [];
        this.spaceShip = new SpaceShip(this.mediator, this.gameObjects);
        this.gameObjects.push(this.spaceShip);
        this.enemyUfo = new EnemyUfo(this.mediator, 1, this.gameObjects);
        this.gameObjects.push(this.enemyUfo);
        this.renderer = new Renderer(this.canvas, this.ctx, this.gameObjects);
        this.collisionDetector = new CollisionDetector(this.mediator, this.gameObjects);
    }
    start() {
        this.mediator.onGameStarted();
        console.log("Starting game loop ...");
        this.document.addEventListener("keydown", (event) => {
            this.mediator.OnKeyDown(event);
        });
        this.document.addEventListener("keyup", (event) => {
            this.mediator.OnKeyUp(event);
        });
        // Starte die Animation
        this.renderer.gameLoop();
    }
}
//# sourceMappingURL=GameLogic.js.map
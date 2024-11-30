import { SpaceShip } from './SpaceShip.js';
import { Mediator } from './Mediator.js';
import { IGameObject } from './IGameObject.js';
import { Renderer } from './Renderer.js';
import { EnemyUfo } from './EnemyUfo.js';
import { CollisionDetector } from './CollisionDetector.js';
import { GameState } from './GameState.js';

export class GameLogic
{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    document: Document;
    mediator: Mediator;
    gameObjects: IGameObject[];
    spaceShip: SpaceShip;
    enemyUfo: EnemyUfo;
    renderer: Renderer;
    collisionDetector: CollisionDetector;
    gameState: GameState;

    constructor(canvas : HTMLCanvasElement, ctx: CanvasRenderingContext2D | null, doc: Document)
    {
        this.canvas = canvas;
        this.ctx = ctx;
        this.document = doc;

        this.mediator = new Mediator();
        this.gameObjects = [];
        this.gameState = new GameState(this.mediator);

        this.spaceShip = new SpaceShip(this.mediator, this.gameObjects);
        this.gameObjects.push(this.spaceShip);
        
        this.enemyUfo = new EnemyUfo(this.mediator, 1, this.gameObjects);
        this.gameObjects.push(this.enemyUfo);

        this.renderer = new Renderer(this.canvas, this.ctx, this.gameObjects, this.gameState);
        this.collisionDetector = new CollisionDetector(this.mediator, this.gameObjects)
    }

    public start()
    {
        this.mediator.onGameStarted();

        console.log("Starting game loop ...");

        this.document.addEventListener("keydown", (event: KeyboardEvent) => {
            this.mediator.OnKeyDown(event);
        });

        this.document.addEventListener("keyup", (event: KeyboardEvent) => {
            this.mediator.OnKeyUp(event);
        });

        // Starte die Animation
        this.renderer.gameLoop();
    }
}
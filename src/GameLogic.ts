import { SpaceShip } from './SpaceShip.js';
import { Mediator } from './Mediator.js';
import { IGameObject } from './IGameObject.js';
import { Renderer } from './Renderer.js';
import { EnemyUfo } from './EnemyUfo.js';
import { CollisionDetector } from './CollisionDetector.js';
import { GameState } from './GameState.js';
import { NumberEvent } from './Mediator.js'
import { Pause } from './Pause.js'

enum Status
{
    Idle,
    ShowStartButton,
    StartNextLevel,
    GameRunning
}

export class GameLogic
{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    document: Document;
    mediator: Mediator;
    gameObjects: IGameObject[];
    spaceShip: SpaceShip;
    enemyUfo: EnemyUfo;
    pause: Pause;
    renderer: Renderer;
    collisionDetector: CollisionDetector;
    gameState: GameState;

    currentStatus: Status;
    nextStatus: Status;
    nextLevel: number;

    startNewGameMethod : any;
    levelWonMethod : any;
    gameOverMethod : any;
    pauseOverMethod : any;
    keyDownMethod : any;

    constructor(canvas : HTMLCanvasElement, ctx: CanvasRenderingContext2D | null, doc: Document)
    {
        this.canvas = canvas;
        this.ctx = ctx;
        this.document = doc;

        this.nextLevel = 1;
        this.nextStatus = 0;
        this.currentStatus = Status.Idle;

        this.mediator = new Mediator();
        this.gameObjects = [];
        this.gameState = new GameState(this.mediator);

        this.spaceShip = new SpaceShip(this.mediator, this.gameObjects);
        this.gameObjects.push(this.spaceShip);
        
        this.enemyUfo = new EnemyUfo(this.mediator, 1, this.gameObjects);
        this.gameObjects.push(this.enemyUfo);

        this.pause = new Pause(this.mediator);
        this.gameObjects.push(this.pause);

        this.renderer = new Renderer(this.canvas, this.ctx, this.gameObjects, this.gameState);
        this.collisionDetector = new CollisionDetector(this.mediator, this.gameObjects);

        this.startNewGameMethod = () => this.startNewGame();
        this.levelWonMethod = (x: NumberEvent) => this.wonLevel(x);
        this.gameOverMethod = () => this.gameOver();
        this.pauseOverMethod = () => this.pauseOver();
        this.keyDownMethod = (x: KeyboardEvent) => this.keyDown(x);

        this.mediator.gameStarted.addListener(this.startNewGameMethod);
        this.mediator.levelWon.addListener(this.levelWonMethod);
        this.mediator.gameOver.addListener(this.gameOverMethod);
        this.mediator.pauseOver.addListener(this.pauseOverMethod);
        this.mediator.keyDown.addListener(this.keyDownMethod);
    }

    public start()
    {
        this.document.addEventListener("keydown", (event: KeyboardEvent) => {
            this.mediator.OnKeyDown(event);
        });

        this.document.addEventListener("keyup", (event: KeyboardEvent) => {
            this.mediator.OnKeyUp(event);
        });

        this.renderer.gameLoop();
    }

    gameOver()
    {
        this.removeSpaceShip();
        this.mediator.OnShowMessage("        Game Over");
        this.nextStatus = Status.ShowStartButton;
        this.mediator.OnStartPause(120);
    }

    pauseOver() : void
    {
        this.mediator.OnShowMessage("");

        if (this.nextStatus == Status.ShowStartButton)
        {
            this.nextStatus = Status.Idle;
            this.currentStatus = Status.Idle;
            this.mediator.OnShowMessage("Press x to restart game");
        }
        else if (this.nextStatus == Status.StartNextLevel)
        {
            this.mediator.OnShowMessage("");
            this.startNewLevel();
        }
    }

    keyDown(event: KeyboardEvent)
    {
        if (event.key === "x" && this.currentStatus === Status.Idle)
        {
            this.mediator.OnShowMessage("");
            this.mediator.onGameStarted();
            this.currentStatus = Status.GameRunning;
        }
    }

    startNewGame()
    {
        this.cleanupGameObjects();
        this.setupGameObjects(1);
        this.nextLevel = 1;
        this.nextStatus = Status.StartNextLevel;
    }

    cleanupGameObjects()
    {
        for (var gameObject of this.gameObjects)
        {
            gameObject.cleanup();
        }

        this.gameObjects.splice(0, this.gameObjects.length)
    }

    wonLevel(event: NumberEvent)
    {
        this.removeSpaceShip();
        this.mediator.OnShowMessage("        Level: " + event.number);

        if (this.nextStatus == Status.Idle) // note: in the meanwile the game could already been over.
        {
            this.nextStatus = Status.StartNextLevel;
        }

        this.nextLevel = event.number;
        this.mediator.OnStartPause(120);
    }

    startNewLevel() : void
    {
        this.cleanupGameObjects();
        this.setupGameObjects(this.nextLevel);
    }

    removeSpaceShip()
    {
        const index = this.gameObjects.indexOf(this.spaceShip);
        if (index !== -1)
        {
            this.spaceShip.cleanup();
            this.gameObjects.splice(index, 1);
        }
    }    

    setupGameObjects(level: number) : void
    {
        this.spaceShip = new SpaceShip(this.mediator, this.gameObjects);
        this.gameObjects.push(this.spaceShip);
        
        this.enemyUfo = new EnemyUfo(this.mediator, level, this.gameObjects);
        this.gameObjects.push(this.enemyUfo);

        this.pause = new Pause(this.mediator);
        this.gameObjects.push(this.pause);
    }
}
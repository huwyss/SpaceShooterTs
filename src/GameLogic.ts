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
    StartNextLevel
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

    nextStatus: Status;
    nextLevel: number;


    constructor(canvas : HTMLCanvasElement, ctx: CanvasRenderingContext2D | null, doc: Document)
    {
        this.canvas = canvas;
        this.ctx = ctx;
        this.document = doc;

        this.nextLevel = 1;
        this.nextStatus = 0;

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

        this.mediator.gameStarted.addListener(() => this.startNewGame());
        this.mediator.levelWon.addListener((x) => this.wonLevel(x));
        this.mediator.gameOver.addListener(() => this.gameOver());
        this.mediator.pauseOver.addListener(() => this.pauseOver());
    }

    public start()
    {
        //this.mediator.onGameStarted();

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

    gameOver()
    {
        this.removeSpaceShip();
        this.mediator.OnShowMessage("Game Over");
        this.nextStatus = Status.ShowStartButton;
        this.mediator.OnStartPause(60);
    }

    pauseOver() : void
    {
        this.mediator.OnShowMessage("");

        if (this.nextStatus == Status.ShowStartButton)
        {
            this.nextStatus = Status.Idle;
            this.mediator.OnShowStartButton();
        }
        else if (this.nextStatus == Status.StartNextLevel)
        {
            this.startNewLevel();
        }
    }

    startNewGame()
    {
        // this.collisionDetector?.cleanup(); // not required. it stays alive.
        this.cleanupGameObjects();
        this.setupGameObjects(1);
     // why ??   this.collisionDetector = new CollisionDetector(Mediator, _gameObjects);
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
        this. removeSpaceShip();
        this.mediator.OnShowMessage("Level: " + event.number);

        if (this.nextStatus == Status.Idle) // note: in the meanwile the game could already been over.
        {
            this.nextStatus = Status.StartNextLevel;
        }

        this.nextLevel = event.number;
        this.mediator.OnStartPause(60);
    }

    startNewLevel() : void
    {
        this.cleanupGameObjects();
        this.setupGameObjects(this.nextLevel);
    }

    removeSpaceShip()
    {
        this.spaceShip?.cleanup();
        const index = this.gameObjects.indexOf(this.spaceShip);
        if (index !== -1)
        {
            this.gameObjects.splice(index, 1);
        }
    }    

    // updateGameState() : void
    // {
    //     var currentGameObjects = _gameObjects.ToList();

    //     foreach (var gameObject in currentGameObjects)
    //     {
    //         gameObject.PerformNextGameStep();
    //     }
    // }

    setupGameObjects(level: number) : void
    {
        this.spaceShip = new SpaceShip(this.mediator, this.gameObjects);
        this.gameObjects.push(this.spaceShip);
        
        this.enemyUfo = new EnemyUfo(this.mediator, 1, this.gameObjects);
        this.gameObjects.push(this.enemyUfo);

        this.pause = new Pause(this.mediator);
        this.gameObjects.push(this.pause);
    }
}
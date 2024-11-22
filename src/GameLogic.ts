import { SpaceShip } from './SpaceShip.js';
import { Mediator } from './Mediator.js';
import { IGameObject } from './IGameObject.js';
import { Renderer } from './Renderer.js';

export class GameLogic
{
    _canvas: HTMLCanvasElement;
    _ctx: CanvasRenderingContext2D | null;
    _document: Document;
    _mediator: Mediator;
    _gameObjects: IGameObject[];
    _spaceShip: SpaceShip;
    _renderer: Renderer;

    constructor(canvas : HTMLCanvasElement, ctx: CanvasRenderingContext2D | null, doc: Document)
    {
        this._canvas = canvas;
        this._ctx = ctx;
        this._document = doc;
        this._mediator = new Mediator();
        this._gameObjects = [];
        this._spaceShip = new SpaceShip(this._mediator, this._gameObjects);
        this._gameObjects.push(this._spaceShip);
        this._renderer = new Renderer(this._canvas, this._ctx, this._gameObjects);
    }

    public start()
    {
        this._mediator.onGameStarted();

        console.log("Starting game loop ...");

        this._document.addEventListener("keydown", (event: KeyboardEvent) => {
            // debugger; // Hilft, den genauen Durchlauf zu debuggen
            this._mediator.OnKeyDown(event);
            //console.log(`Key pressed: ${event.key}`);
        });

        // Starte die Animation
        this._renderer.gameLoop();
    }
}
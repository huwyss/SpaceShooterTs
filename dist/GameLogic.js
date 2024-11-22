import { SpaceShip } from './SpaceShip.js';
import { Mediator } from './Mediator.js';
import { Renderer } from './Renderer.js';
export class GameLogic {
    constructor(canvas, ctx, doc) {
        this._canvas = canvas;
        this._ctx = ctx;
        this._document = doc;
        this._mediator = new Mediator();
        this._gameObjects = [];
        this._spaceShip = new SpaceShip(this._mediator, this._gameObjects);
        this._renderer = new Renderer(this._canvas, this._ctx);
    }
    start() {
        this._mediator.onGameStarted();
        console.log("Starting game loop ...");
        this._document.addEventListener("keydown", (event) => {
            // debugger; // Hilft, den genauen Durchlauf zu debuggen
            this._mediator.OnKeyDown(event);
            console.log(`Key pressed: ${event.key}`);
        });
        // Starte die Animation
        this._renderer.gameLoop();
    }
}
//# sourceMappingURL=GameLogic.js.map
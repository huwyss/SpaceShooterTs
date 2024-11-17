import { Rocket } from "./Rocket"; // Importiere die Basisklasse
import { Mediator } from "./Mediator"; // Importiere den Mediator
import { Cell, CellType } from "./Cell"; // Importiere die Cell-Klasse und den CellType

export class FriendlyRocket extends Rocket
{
    constructor(mediator: Mediator, startPosX: number, startPosY: number)
    {
        super(mediator);

        // Initialisiere _rocket
        this._rocket = new Cell(startPosX, startPosY,CellType.FriendlyRocket, true);

        // Füge _rocket zu _cells hinzu
        this._cells.push(this._rocket);

        // Event registrieren
        //mediator.FriendlyRocketHitTarget.on(this.RocketHitTarget.bind(this));
    }

    // RocketHitTarget Methode (falls benötigt, implementiere sie hier)
    private RocketHitTarget(): void
    {
        console.log("Friendly rocket hit the target!");
    }
}

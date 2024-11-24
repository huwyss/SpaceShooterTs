export class Rocket {
    // Getter für BodyCells
    get bodyCells() {
        return this._cells;
    }
    get frequency() {
        return 3;
    }
    // Konstruktor
    constructor(mediator) {
        this._cells = [];
        this._mediator = mediator;
    }
    performNextGameStep() {
    }
    cleanup() {
    }
}
//# sourceMappingURL=Rocket.js.map
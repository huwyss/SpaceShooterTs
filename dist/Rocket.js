export class Rocket {
    // Getter für BodyCells
    get bodyCells() {
        return this.cells;
    }
    get frequency() {
        return 3;
    }
    // Konstruktor
    constructor(mediator) {
        this.cells = [];
        this.mediator = mediator;
    }
    performNextGameStep() {
    }
    cleanup() {
    }
    rocketHitTarget(position) {
        if (position.posX === this.rocket.PositionX && position.posY === this.rocket.PositionY) {
            this.rocket.IsVisible = false;
        }
    }
}
//# sourceMappingURL=Rocket.js.map
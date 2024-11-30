export class Rocket {
    get bodyCells() {
        return this.cells;
    }
    get delay() {
        return 4;
    }
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
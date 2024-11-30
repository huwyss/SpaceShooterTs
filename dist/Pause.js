export class Pause {
    constructor(mediator) {
        this.timer = 0;
        this.bodyCells = [];
        this.mediator = mediator;
        this.timer = 0;
        this.mediator.startPause.addListener((x) => this.startPause(x));
    }
    performNextGameStep() {
        if (this.timer > 0) {
            this.timer--;
            if (this.timer == 0) {
                this.mediator.OnPauseOver();
            }
        }
    }
    cleanup() {
        this.mediator.startPause.removeListener((x) => this.startPause(x));
        this.timer = 0;
    }
    startPause(event) {
        this.timer = event.number;
    }
    get frequency() {
        return 1;
    }
}
//# sourceMappingURL=Pause.js.map
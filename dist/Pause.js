export class Pause {
    constructor(mediator) {
        this.timer = 0;
        this.bodyCells = [];
        this.mediator = mediator;
        this.timer = 0;
        this.startPauseMethod = (x) => this.startPause(x);
        this.mediator.startPause.addListener(this.startPauseMethod);
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
        this.mediator.startPause.removeListener(this.startPauseMethod);
        this.timer = 0;
    }
    startPause(event) {
        this.timer = event.number;
    }
    get delay() {
        return 1;
    }
}
//# sourceMappingURL=Pause.js.map
export class GameEvent {
    constructor() {
        this.listeners = [];
    }
    // Hinzufügen eines Event-Handlers (+=)
    addListener(listener) {
        this.listeners.push(listener);
    }
    // Entfernen eines Event-Handlers (-=)
    removeListener(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
        // var index = this.listeners.indexOf(listener);
        // if (index > -1)
        // {
        //     this.listeners.splice(index, 1);
        // }
    }
    // Auslösen des Events
    emit(args) {
        this.listeners.forEach(listener => listener(args));
    }
}
//# sourceMappingURL=GameEvent.js.map
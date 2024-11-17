"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameEvent = void 0;
class GameEvent {
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
    }
    // Auslösen des Events
    emit(args) {
        this.listeners.forEach(listener => listener(args));
    }
}
exports.GameEvent = GameEvent;
//# sourceMappingURL=GameEvent.js.map
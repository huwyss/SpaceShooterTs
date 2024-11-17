export class GameEvent<T> {
    private listeners: Array<(args: T) => void> = [];

    // Hinzufügen eines Event-Handlers (+=)
    public addListener(listener: (args: T) => void): void {
        this.listeners.push(listener);
    }

    // Entfernen eines Event-Handlers (-=)
    public removeListener(listener: (args: T) => void): void {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    // Auslösen des Events
    public emit(args: T): void {
        this.listeners.forEach(listener => listener(args));
    }
}



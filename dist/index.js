import { GameLogic } from "./GameLogic.js";
// Warte darauf, dass das DOM vollständig geladen ist
window.addEventListener("load", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const doc = document;
    const game = new GameLogic(canvas, ctx, doc);
    game.start();
});
//# sourceMappingURL=index.js.map
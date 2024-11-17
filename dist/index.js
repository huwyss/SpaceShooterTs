"use strict";
// import { SpaceShip } from './SpaceShip';
// import { Mediator } from './Mediator';
// import { IGameObject } from './IGameObject';
// import { ICell, Cell, CellType } from './Cell';
// let cell = new Cell(100, 200, CellType.SpaceShip, true);
// Hole das Canvas-Element und den 2D-Kontext
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
// Farben definieren
const backgroundColor = "lightblue";
const rectColor = "red";
// Variablen für Animation
let rectX = 50;
let rectY = 50;
let rectWidth = 100;
let rectHeight = 50;
let rectSpeedX = 3;
let rectSpeedY = 2;
// Zeichne Hintergrund
function drawBackground() {
    if (ctx == null) {
        return;
    }
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// Zeichne ein bewegliches Rechteck
function drawRectangle() {
    if (ctx == null) {
        return;
    }
    ctx.fillStyle = rectColor;
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
}
// Aktualisiere Position des Rechtecks
function updateRectangle() {
    rectX += rectSpeedX;
    rectY += rectSpeedY;
    // Kollisionserkennung: Wände
    if (rectX <= 0 || rectX + rectWidth >= canvas.width) {
        rectSpeedX *= -1; // Richtung umkehren
    }
    if (rectY <= 0 || rectY + rectHeight >= canvas.height) {
        rectSpeedY *= -1; // Richtung umkehren
    }
}
// Haupt-Animationsschleife
function gameLoop() {
    drawBackground();
    drawRectangle();
    // todo löschen, das ist Teil von PerformNextStep()
    updateRectangle();
    // hier: gameObjects.PerformStep();
    requestAnimationFrame(gameLoop);
}
// let mediator = new Mediator();
// const gameObjects: IGameObject[] = [];
// let spaceShip = new SpaceShip(mediator, gameObjects);
// mediator.gameStarted.emit();
// Starte die Animation
gameLoop();
//# sourceMappingURL=index.js.map
export class GameState {
    get gameScore() { return this._gameScore; }
    set gameScore(value) { this._gameScore = value; }
    get highScore() { return this._highScore; }
    set highScore(value) { this._highScore = value; }
    get enemyLives() { return this._enemyLives; }
    set enemyLives(value) { this._enemyLives = value; }
    get lives() { return this._lives; }
    set lives(value) { this._lives = value; }
    get level() { return this._level; }
    set level(value) { this._level = value; }
    get message() { return this._message; }
    set message(value) { this._message = value; }
    constructor(mediator) {
        this.EnemyPoints = 500;
        this.LevelPoints = 3000;
        this.UfoHitPoints = 20;
        this._gameScore = 0;
        this._highScore = 0;
        this._enemyLives = 5;
        this._lives = 3;
        this._level = 1;
        this._message = "";
        this.mediator = mediator;
        this.oneEnemyKilledMethod = () => this.oneEnemyKilled();
        this.spaceShipHitMethod = () => this.spaceShipHit();
        this.enemyWasHitMethod = () => this.enemyWasHit();
        this.gameStartedMethod = () => this.gameStarted();
        this.showMessageMehod = (x) => this.showMessage(x);
        this.mediator.oneEnemyKilled.addListener(this.oneEnemyKilledMethod);
        this.mediator.spaceShipHit.addListener(this.spaceShipHitMethod);
        this.mediator.enemyHit.addListener(this.enemyWasHitMethod);
        this.mediator.gameStarted.addListener(this.gameStartedMethod);
        this.mediator.showMessage.addListener(this.showMessageMehod);
        this.initializeGameState();
    }
    initializeGameState() {
        if (this.gameScore > this._highScore) {
            this.highScore = this.gameScore;
        }
        else {
            this.highScore = this.highScore;
        }
        this.gameScore = 0;
        this.enemyLives = 5;
        this.lives = 3;
        this._level = 1;
        this.message = "";
    }
    enemyWasHit() {
        this.gameScore += this.UfoHitPoints;
    }
    oneEnemyKilled() {
        this.enemyLives--;
        this.gameScore += this.EnemyPoints;
        if (this.enemyLives <= 0) {
            this.level++;
            this.enemyLives = 5;
            this.gameScore += this.LevelPoints;
            this.mediator.OnLevelWon({ number: this.level });
        }
    }
    spaceShipHit() {
        this.lives--;
        if (this.lives <= 0) {
            this.mediator.OnGameOver();
        }
    }
    gameStarted() {
        this.initializeGameState();
    }
    showMessage(messageEvent) {
        this.message = messageEvent.message;
    }
}
//# sourceMappingURL=GameState.js.map
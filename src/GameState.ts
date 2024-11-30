import { Mediator } from './Mediator.js';
import { MessageEvent } from './Mediator.js';

export class GameState
{
    private EnemyPoints: number = 500;
    private LevelPoints: number = 3000;
    private UfoHitPoints: number = 20;

    private mediator : Mediator;

    _gameScore: number;
    _highScore: number;
    _enemyLives: number;
    _lives: number;
    _level: number;
    _message: string;

    public get gameScore() : number { return this._gameScore; }
    private set gameScore(value: number) { this._gameScore = value; }

    public get highScore() : number { return this._highScore; }
    private set highScore(value: number) { this._highScore = value; }

    public get enemyLives() : number { return this._enemyLives; }
    private set enemyLives(value: number) { this._enemyLives = value; }

    public get lives() : number { return this._lives; }
    private set lives(value: number) { this._lives = value; }

    public get level() : number { return this._level; }
    private set level(value: number) { this._level = value; }

    public get message() : string { return this._message; }
    private set message(value: string) { this._message = value; }

    oneEnemyKilledMethod : any;
    spaceShipHitMethod : any;
    enemyWasHitMethod : any;
    gameStartedMethod : any;
    showMessageMehod : any;

    constructor(mediator: Mediator)
    {
        this._gameScore = 0;
        this._highScore = 0;
        this._enemyLives = 5
        this._lives = 3;
        this._level = 1;
        this._message = "";

        this.mediator = mediator;

        this.oneEnemyKilledMethod = () => this.oneEnemyKilled();
        this.spaceShipHitMethod = () => this.spaceShipHit();
        this.enemyWasHitMethod = () => this.enemyWasHit();
        this.gameStartedMethod = () => this.gameStarted();
        this.showMessageMehod = (x: MessageEvent) => this.showMessage(x)

        this.mediator.oneEnemyKilled.addListener(this.oneEnemyKilledMethod);
        this.mediator.spaceShipHit.addListener(this.spaceShipHitMethod);
        this.mediator.enemyHit.addListener(this.enemyWasHitMethod);
        this.mediator.gameStarted.addListener(this.gameStartedMethod);
        this.mediator.showMessage.addListener(this.showMessageMehod);

        this.initializeGameState();
    }

    initializeGameState()
    {
        if (this.gameScore > this._highScore)
        {
            this.highScore = this.gameScore
        }
        else
        {
            this.highScore = this.highScore
        }

        this.gameScore = 0;
        this.enemyLives = 5;
        this.lives = 3;
        this._level = 1;
        this.message = "";
    }

    enemyWasHit()
    {
        this.gameScore += this.UfoHitPoints;
    }

    oneEnemyKilled()
    {
        this.enemyLives--;
        this.gameScore += this.EnemyPoints;
        if (this.enemyLives <= 0)
        {
            this.level++;
            this.enemyLives = 5;
            this.gameScore += this.LevelPoints;
            this.mediator.OnLevelWon({number: this.level});
        }
    }

    spaceShipHit()
    {
        this.lives--;
        if (this.lives <= 0)
        {
            this.mediator.OnGameOver();
        }
    }

    gameStarted()
    {
        this.initializeGameState();
    }

    showMessage(messageEvent: MessageEvent)
    {
        this.message = messageEvent.message;
    }
}
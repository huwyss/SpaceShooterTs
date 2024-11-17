export enum CellType {
    SpaceShip,
    Ufo,
    UfoRibbon,
    FriendlyRocket,
    EnemyRocket,
    Enemy        
}

export interface ICell {
    PositionX: number;
    PositionY: number;
    Type: CellType;
    IsVisible: boolean;
}

export class Cell implements ICell {
    PositionX: number;
    PositionY: number;
    Type: CellType;
    IsVisible: boolean;

    constructor(positionX: number, positionY: number, type: CellType, isVisible: boolean) {
        this.PositionX = positionX;
        this.PositionY = positionY;
        this.Type = type;
        this.IsVisible = isVisible;
    }
}
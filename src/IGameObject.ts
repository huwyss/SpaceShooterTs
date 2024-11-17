import { ICell, Cell, CellType } from './Cell';

export interface IGameObject
{
    bodyCells: ICell[];

    performNextGameStep(): void;

    cleanup(): void;
}
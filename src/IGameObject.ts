import { ICell, Cell, CellType } from './Cell.js';

export interface IGameObject
{
    bodyCells: ICell[];

    performNextGameStep(): void;

    cleanup(): void;
}
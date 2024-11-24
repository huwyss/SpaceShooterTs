import { ICell, Cell, CellType } from './Cell.js';

export interface IGameObject
{
    bodyCells: ICell[];

    performNextGameStep(): void;

    cleanup(): void;

    frequency: number; // 0 = ultrafast, 1 = fast, 2 = slower ...
}
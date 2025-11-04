/** Package version. */
export const version = '0.9.0-rc1';

export {
	createBoard,
	getPiece,
	setPiece,
	movePiece,
	setPosition,
	type Board,
} from './board';
export { createView } from './view';
export { pieces, type PieceSet } from './piece';
export type { Transformation } from './transform';

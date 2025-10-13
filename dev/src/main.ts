import {
	createBoard,
	movePiece,
	setPiece,
	setPosition,
} from '../../src/chesslike-board';

const knightsTour = async () => {
	const board = createBoard({ target: '#knights-tour' });

	await setPiece(board, 'b5', 'wk');

	await movePiece(board, 'b5', 'd7');
	await movePiece(board, 'd7', 'b1');
	await movePiece(board, 'b1', 'a1');

	await movePiece(board, 'b5', 'd7');
};

const foolsMate = async () => {
	const board = createBoard({ target: '#fools-mate' });
	await setPosition(board, true);
	await movePiece(board, 'f2', 'f3');
	await movePiece(board, 'e7', 'e6');
	await movePiece(board, 'g2', 'g4');
	await movePiece(board, 'd8', 'h4');
};

knightsTour();
foolsMate();

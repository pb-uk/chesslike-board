import {
	createBoard,
	movePiece,
	setPiece,
	setPosition,
} from '../../src/chesslike-board';

const allPiecesFen = 'rnbqkpdc/RNBQKPDC';
const chessPiecesFen = 'rnbqkp2/RNBQKP2';

const knightsTour = async () => {
	const board = createBoard({ target: '#knights-tour' });

	await setPiece(board, 'b5', 'wk');

	await movePiece(board, 'b5', 'd7');
	await movePiece(board, 'd7', 'b1');
	await movePiece(board, 'b1', 'a1');

	await movePiece(board, 'b5', 'd7');
};

const foolsMate = async () => {
	const board = createBoard({
		target: '#fools-mate',
	});
	await setPosition(board, true);
	await movePiece(board, 'f2', 'f3');
	await movePiece(board, 'e7', 'e6');
	await movePiece(board, 'g2', 'g4');
	await movePiece(board, 'd8', 'h4');
};

const fa7Pieces = async () => {
	const board = createBoard({
		columns: 8,
		rows: 2,
		target: '#fa7',
		view: { scalePawns: true, transform: 'flipBR' },
	});
	setPosition(board, allPiecesFen);
};

const fa7SolidPieces = async () => {
	const board = createBoard({
		columns: 8,
		rows: 2,
		target: '#fas7',
		view: { pieces: 'fa7Solid' },
	});
	setPosition(board, allPiecesFen);
};

const fa5SolidPieces = async () => {
	const board = createBoard({
		columns: 8,
		rows: 2,
		target: '#fas5',
		view: { pieces: 'fa5Solid' },
	});
	setPosition(board, allPiecesFen);
};

const cburnettPieces = async () => {
	const board = createBoard({
		columns: 8,
		rows: 2,
		target: '#cburnett',
		view: { pieces: 'cburnett' },
	});
	setPosition(board, chessPiecesFen);
};

knightsTour();
foolsMate();
fa7Pieces();
fa7SolidPieces();
fa5SolidPieces();
cburnettPieces();

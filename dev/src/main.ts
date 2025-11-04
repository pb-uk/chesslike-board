import * as ChesslikeBoard from '../../src/chesslike-board';

async function wait(ms: number) {
	return new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
}

// Knight's tour ---------------------------------------------------------------

const knightsTour = async () => {
	const { createBoard, movePiece, setPiece } = ChesslikeBoard;
	const board = createBoard({
		columns: 3,
		rows: 7,
		target: '#knights-tour',
		view: { border: true },
	});

	const { createView } = ChesslikeBoard;

	createView(board, {
		target: '#knights-tour-alt',
		transform: 'transpose',
		pieces: 'fa7',
	});

	const moves =
		'c2 b4 c6 a7 b5 c7 a6 c5 b7 a5 b3 c1 a2 c3 b1 a3 c4 b2 a4 b6'.split(' ');
	while (true) {
		// Put a white knight in a1.
		await setPiece(board, 'a1', 'wn');
		// This doesn't change anything, just pauses for the length of a move.
		await movePiece(board, 'a1', 'a1');
		let lastSquare = 'a1';
		for (const newSquare of moves) {
			await movePiece(board, lastSquare, newSquare);
			lastSquare = newSquare;
		}
		// Another pause for the length of a move.
		await movePiece(board, lastSquare, lastSquare);
		// Remove the knight from its finishing position before starting again.
		await setPiece(board, lastSquare, null);
	}
};

const demoPieces = () => {
	const { createBoard, createView } = ChesslikeBoard;

	createBoard({
		columns: 6,
		rows: 2,
		target: '#cburnett',
		position: 'rnbqkp/RNBQKP',
	});

	const board = createBoard({
		columns: 8,
		rows: 2,
		target: '#fa7',
		view: { pieces: 'fa7' },
		position: 'rnbqkpdc/RNBQKPDC',
	});

	createView(board, { target: '#fas7', pieces: 'fa7Solid' });
};

const transforms = () => {
	const { createBoard, createView } = ChesslikeBoard;

	const transforms = 'rotate transpose flipV flipH rotateR rotateL flipD';
	const position = 'rnb/3/RNB';
	const board = createBoard({ rows: 3, columns: 3, target: '#base', position });
	for (const transform of transforms.split(' ')) {
		createView(board, {
			target: `#${transform}`,
			transform: transform as ChesslikeBoard.Transformation,
		});
	}
};

const foolsMate = async () => {
	const { createBoard, createView, movePiece, setPosition, clear } =
		ChesslikeBoard;

	const board = createBoard({ target: '#fools-mate' });

	createView(board, { target: '#fools-mate-black', transform: 'rotate' });

	while (true) {
		await setPosition(board, true);
		await wait(2000);
		await movePiece(board, 'f2', 'f3');
		await movePiece(board, 'e7', 'e6');
		await movePiece(board, 'g2', 'g4');
		await movePiece(board, 'd8', 'h4');
		await wait(2000);
		await clear(board);
	}
};

// N Queens -----------------------------------------------------------
const n = 28;

async function nQueensSolve(
	board: ChesslikeBoard.Board,
	column = 0,
	availableRows: number[] = [],
) {
	const { setPiece, getPiece } = ChesslikeBoard;
	let piece = 'wq';
	if (column === 0) {
		for (let i = 0; i < n; ++i) {
			// availableRows[i] = i;
			const j = Math.floor(Math.random() * (i + 1));
			availableRows[i] = availableRows[j];
			availableRows[j] = i;
		}
	}
	for (let rowIndex = 0; rowIndex < availableRows.length; ++rowIndex) {
		const row = availableRows[rowIndex];
		await setPiece(board, [column, row], piece);
		let attacked = false;
		for (let i = 0; i < column; ++i) {
			// Only need to check the diagonals.
			if (
				(row - column + i >= 0 && getPiece(board, [i, row - column + i])) ||
				(row + column - i < n && getPiece(board, [i, row + column - i]))
			) {
				attacked = true;
				break;
			}
		}
		if (attacked) {
			await setPiece(board, [column, row], null);
			continue;
		}
		if (column === n - 1) {
			await wait(5000);
		} else {
			const newRows = availableRows.slice();
			newRows.splice(rowIndex, 1);
			piece = 'bq';
			await nQueensSolve(board, column + 1, newRows);
		}
		await setPiece(board, [column, row], null);
	}
}

async function nQueens() {
	const { createBoard } = ChesslikeBoard;
	const board = createBoard({
		rows: n,
		columns: n,
		target: '#n-queens',
		view: { border: 1 },
	});
	nQueensSolve(board);
}

knightsTour();
demoPieces();
transforms();

nQueens();

foolsMate();

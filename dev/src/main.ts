import {
	createBoard,
	movePiece,
	setPiece,
	getPiece,
	setPosition,
	createView,
	type Board,
	type Transformation,
} from '../../src/chesslike-board';

const allPiecesFen = 'rnbqkpdc/RNBQKPDC';
const chessPiecesFen = 'rnbqkp/RNBQKP';

const foolsMate = async () => {
	const board = createBoard({
		target: '#fools-mate',
		view: {
			// border: 0.25,
			// transform: 'flipD',
			// labels: false,
		},
	});
	await setPosition(board, true);
	await movePiece(board, 'f2', 'f3');
	await movePiece(board, 'e7', 'e6');
	await movePiece(board, 'g2', 'g4');
	await movePiece(board, 'd8', 'h4');
};

const knightsTour = async () => {
	const board = createBoard({
		columns: 3,
		rows: 7,
		target: '#knights-tour',
		view: { transform: 'transpose' },
	});
	createView(board, { target: '#knights-tour-alt', border: true });

	const moves =
		'c2 b4 c6 a7 b5 c7 a6 c5 b7 a5 b3 c1 a2 c3 b1 a3 c4 b2 a4 b6'.split(' ');
	while (true) {
		await setPiece(board, 'a1', 'wn');
		await movePiece(board, 'a1', 'a1');
		let lastSquare = 'a1';
		for (const newSquare of moves) {
			await movePiece(board, lastSquare, newSquare);
			lastSquare = newSquare;
		}
		await movePiece(board, lastSquare, lastSquare);
		await setPiece(board, lastSquare, null);
	}
};

const demoPieces = () => {
	// CBurnett pieces.
	createBoard({
		columns: 6,
		rows: 2,
		target: '#cburnett',
		view: { pieces: 'cburnett' },
		position: chessPiecesFen,
	});

	// Font Awesome 7.
	createBoard({
		columns: 8,
		rows: 2,
		target: '#fa7',
		view: { pieces: 'fa7' },
		position: allPiecesFen,
	});

	// Font Awesome 7 solid.
	createBoard({
		columns: 8,
		rows: 2,
		target: '#fas7',
		view: { pieces: 'fa7Solid' },
		position: allPiecesFen,
	});

	// Font Awesome 5 solid.
	createBoard({
		columns: 8,
		rows: 2,
		target: '#fas5',
		view: { pieces: 'fa5Solid' },
		position: allPiecesFen,
	});
};

async function wait(ms: number) {
	return new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
}

// N Queens -----------------------------------------------------------
const n = 28;

async function nQueensSolve(
	board: Board,
	column = 0,
	availableRows: number[] = [],
) {
	let piece = 'wq';
	if (column === 0) {
		for (let i = 0; i < n; ++i) {
			// availableRows[i] = i;
			const j = Math.floor(Math.random() * (i + 1));
			availableRows[i] = availableRows[j];
			availableRows[j] = i;
		}
		console.log(availableRows);
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
			await wait(10000);
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
	const board = createBoard({
		rows: n,
		columns: n,
		target: '#n-queens',
		view: { border: 1 },
	});
	nQueensSolve(board);
}

const transforms = () => {
	const position = 'rnb/RNB';
	const board = createBoard({ rows: 2, columns: 3, target: '#base', position });
	const transforms = 'rotateR rotate rotateL flipH flipV transpose flipD'.split(
		' ',
	);
	for (const transform of transforms) {
		createView(board, {
			target: `#${transform}`,
			transform: transform as Transformation,
		});
	}
};

knightsTour();
foolsMate();

demoPieces();
nQueens();

transforms();

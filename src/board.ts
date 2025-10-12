import {
	type View,
} from './view';

import {
	onMovePiece,
	onSetPiece,
	type MovePiecePromise,
	type SetPiecePromise,
} from './piece';

/** An n x m board. */
export interface Board {
	/** Number of columns. */
	columns: number;
	/** Number of rows. */
	rows: number;
	/**
	 * The contents of the board.
	 *
	 * This is stored as a 1D array in row major order, starting top left.
	 */
	squares: Square[];
	/** Map of squares to index in squares array. */
	map: Record<string, number>;
	/** Labels for columns (a...z, aa...zz, aaa...). */
	colLabels: string[];
	/** Labels for rows ('1', '2'...). */
	rowLabels: string[];
	/** Views attached to this board. */
	views: View[];
}

/** A single square/cell on a board. */
export interface Square {
	label: string;
	piece: string | null;
}

/** Options for createBoard(). */
export interface CreateBoardOptions {
	/** Number of columns. */
	columns: number;
	/** Number of rows. */
	rows: number;
}

type LabelPosition = string;
type IndexPosition = number;
type RowColPosition = [a: number, b: number];

export type Position = LabelPosition | IndexPosition | RowColPosition;

/** Attach a view to a board so it can be polled by events. */
export const attachView = (board: Board, view: View): void => {
	board.views.push(view);
};

/**
 * Create a board.
 *
 * @param options
 * @param options.columns Number of columns [8]
 * @param options.rows Number of rows [8]
 * @returns
 */
export const createBoard = (
	options: Partial<CreateBoardOptions> = {},
): Board => {
	const settings: CreateBoardOptions = {
		columns: 8,
		rows: 8,
		...options,
	};

	const { columns, rows } = settings;
	const length = columns * rows;

	// Create labels and add them to squares.
	const [labels, colLabels, rowLabels] = createLabels(columns, rows);
	const map = {} as Record<string, number>;

	// Create the squares on the board and set to empty.
	const squares: Square[] = new Array(length);
	for (let i = 0; i < length; i++) {
		const label = labels[i];
		squares[i] = {
			label,
			piece: null,
		};
		map[label] = i;
	}

	return {
		columns,
		rows,
		squares,
		map,
		colLabels,
		rowLabels,
		views: [] as View[],
	};
};

/** Generate labels for a board of unlimited size e.g. 'aa123'. */
export const createLabels = (columns: number, rows: number): string[][] => {
	// Labels for the columns.
	// Checkpoint
	const colLabels: string[] = new Array(columns);
	for (let col = 0; col < columns; col++) {
		let label = String.fromCharCode(97 + (col % 26));
		// For more than 26 columns we need to continue with 'aa' etc.
		let c = Math.floor(col / 26);
		while (c > 0) {
			const rem = (c - 1) % 26;
			c = Math.floor((c - 1) / 26);
			label = `${String.fromCharCode(97 + rem)}${label}`;
		}
		colLabels[col] = label;
	}

	// Labels for the rows.
	const rowLabels: string[] = new Array(rows);
	for (let row = 0; row < rows; row++) {
		rowLabels[row] = `${rows - row}`;
	}

	// Labels for the squares.
	const length = columns * rows;
	const labels: string[] = new Array(length);
	for (let i = 0; i < length; i++) {
		labels[i] =
			`${colLabels[i % columns]}${rowLabels[Math.floor(i / columns)]}`;
	}

	return [labels, colLabels, rowLabels];
};

/** Get the position index for a variadic position. */
export const getIndex = (board: Board, position: Position): number =>
	typeof position === 'string' ? board.map[position]
	: Array.isArray(position) ? board.columns * position[1] + position[0]
	: position;

export const movePiece = (
	board: Board,
	from: Position,
	to: Position,
): [a: string | null, b: MovePiecePromise[]] => {
	from = getIndex(board, from);
	to = getIndex(board, to);
	const fromSquare = board.squares[from];
	const toSquare = board.squares[to];
	const previous = toSquare.piece;
	toSquare.piece = fromSquare.piece;
	fromSquare.piece = null;

	const promises = [] as MovePiecePromise[];
	for (const view of board.views) {
		promises.push(onMovePiece(view, { from, to }));
	}
	return [previous, promises];
};

/**
 * Place or remove a piece on or from a board.
 *
 * @param board
 * @param position Target position as an index, [col, row] or square label.
 * @param piece    Key of the piece to place (omit or `null` to remove).
 * @returns Key of the piece previously in the square (or `null` if it was
 *          empty) and an array of promises resolving when views complete
 *          transitions.
 */
export const setPiece = (
	board: Board,
	position: Position,
	piece: string | null = null,
): [a: string | null, b: SetPiecePromise[]] => {
	const index = getIndex(board, position);
	const square = board.squares[index];
	const previous = square.piece;
	square.piece = piece;

	const promises = [] as SetPiecePromise[];
	for (const view of board.views) {
		promises.push(onSetPiece(view, { index, piece, previous }));
	}
	return [previous, promises];
};

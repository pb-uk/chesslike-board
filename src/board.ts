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
	/** Labels for columns (a...z, aa...zz, aaa...). */
	colLabels: string[];
	/** Labels for rows ('1', '2'...). */
	rowLabels: string[];
}

/** A single square/cell on a board. */
export interface Square {
	label: string;
}

/** Options for createBoard(). */
export interface CreateBoardOptions {
	/** Number of columns. */
	columns: number;
	/** Number of rows. */
	rows: number;
}

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

	const squares: Square[] = new Array(length);

	const [labels, colLabels, rowLabels] = createLabels(columns, rows);

	for (let i = 0; i < length; i++) {
		squares[i] = {
			label: labels[i],
		};
	}

	return {
		columns,
		rows,
		squares,
		colLabels,
		rowLabels,
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

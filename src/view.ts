import { type Board } from './board';
import { s } from './utils';

/** A view of a chess-like board. */
export interface View {
	/** The board to which this view is attached. */
	board: Board;
	/** Colour etc. theme. */
	theme: Theme;
	/** SVG elements making up the board. */
	elements: ViewElements;
	/** Board dimensions. */
	dimensions: ViewDimensions;
}

export interface ViewElements {
	board: SVGSVGElement;
	evenSquares: SVGElement;
	oddSquares: SVGElement;
	border?: SVGElement;
	edge?: SVGElement;
	borderLabels?: SVGElement;
}

export interface ViewDimensions {
	/** ViewBox width. */
	vbw: number;
	/** ViewBox height. */
	vbh: number;
	/** Border width. */
	bw: number;
	/** Edge width. */
	ew: number;
	/** Square size. */
	sq: number;
}

export interface Theme {
	/** Size of one square. */
	size: number;
	/** Border width. */
	borderSize: number | boolean;
	/** Edge width. */
	edgeSize: number | boolean;
	/** Colours for board. */
	board: string[];
	/** Border colour. */
	border: string;
	/** Colours for labels on the board. */
	text: string[];
	/** Colour for labels in the border. */
	borderText: string;
	/** Colour for the edge/outline of the board. */
	edge: string;
	/** Font for labels. */
	fontFamily: string;
}

export interface CreateViewOptions {
	theme: Partial<Theme>;
}

const defaultBorderSizeFactor = 0.5;
const defaultEdgeSizeFactor = 0.025;

const defaultTheme: Theme = {
	size: 40,
	borderSize: true,
	edgeSize: true,
	board: ['#efd9b5', '#b58862'],
	text: ['#b58862', '#efd9b5'],
	edge: '#b58862',
	border: '#efd9b5',
	borderText: '#b58862',
	fontFamily: 'system-ui, sans-serif',
};

const defaults: CreateViewOptions = {
	theme: defaultTheme,
};

/**
 * Create a board.
 *
 * @param options
 * @param options.columns Number of columns [8]
 * @param options.rows Number of rows [8]
 * @returns
 */
export const createView = (
	board: Board,
	options: Partial<CreateViewOptions> = {},
): View => {
	const settings: CreateViewOptions = {
		...defaults,
		...options,
	};

	const theme = { ...defaultTheme, ...settings.theme };
	const { size: sq } = theme;

	const borderSize =
		theme.borderSize === true ? sq * defaultBorderSizeFactor
		: theme.borderSize ? theme.borderSize
		: false;

	const bw = borderSize || 0;

	// Calculate the width of the board.
	const vbw = board.columns * sq + 2 * bw;
	const vbh = board.rows * sq + 2 * bw;
	const viewBox = `0 0 ${vbw} ${vbh}`;
	// Calculate an edge.
	const edgeSize =
		theme.edgeSize === true ? sq * defaultEdgeSizeFactor
		: theme.edgeSize ? theme.edgeSize
		: false;

	const dimensions: ViewDimensions = {
		vbw,
		vbh,
		bw,
		ew: edgeSize || 0,
		sq,
	};

	// The whole view lives inside an SVG element.
	const elements: Partial<ViewElements> = {};

	elements.board = s('svg', { viewBox }) as SVGSVGElement;

	// Add the border.
	elements.border = s('path', {
		fill: theme.border,
		d: `M0,0H${vbw}V${vbh}H0ZM${bw},${bw}V${vbh - bw}H${vbw - bw}V${bw}H${bw}`,
	});

	elements.board.append(elements.border);

	// Add the squares.
	const [evenSquares, oddSquares] = drawCheck(board, theme, dimensions);
	elements.evenSquares = evenSquares;
	elements.board.append(evenSquares);
	elements.oddSquares = oddSquares;
	elements.board.append(oddSquares);

	// Add the edge.
	elements.edge = s('path', {
		stroke: theme.edge,
		'stroke-width': dimensions.ew,
		fill: 'none',
		d: `M${bw},${bw}V${vbh - bw}H${vbw - bw}V${bw}Z`,
	});

	elements.board.append(elements.edge);

	elements.borderLabels = drawBorderLabels(board, theme, dimensions);
	elements.board.append(elements.borderLabels);

	return {
		board,
		theme,
		dimensions,
		// We need to be sure we have set everything required.
		elements: elements as ViewElements,
	};
};

/** Draw the check pattern. */
const drawCheck = (board: Board, theme: Theme, dimensions: ViewDimensions) => {
	const { rows, columns } = board;

	// Use the fancy method if we can, it is about a third of the size.
	if (columns === rows && !(columns % 2)) {
		return drawEvenCheck(board, theme, dimensions);
	}

	const { bw, sq } = dimensions;
	const xw = sq;
	const yw = sq;

	const even: string[] = [];
	const odd: string[] = [];
	const parts = [even, odd];
	// Need to do this to have a dark square in the bottom left when rows are odd.
	if (rows % 2) parts.reverse();
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < columns; col += 2) {
			const x = bw + col * xw;
			const y = bw + row * yw;
			// On even rows start with an even square.
			parts[0].push(`M${x},${y}h${xw}v${yw}h${-xw}Z`);
			// Only draw the next square if it fits on the row.
			if (col + 2 > columns) break;
			parts[1].push(`M${x + xw},${y}h${xw}v${yw}h${-xw}Z`);
		}
		parts.reverse();
	}

	const evenSquares = s('path', { fill: theme.board[0], d: even.join('') });
	const oddSquares = s('path', { fill: theme.board[1], d: odd.join('') });

	return [evenSquares, oddSquares];
};

/** Draw the check pattern on an even square board. */
const drawEvenCheck = (
	board: Board,
	theme: Theme,
	dimensions: ViewDimensions,
) => {
	const { vbw, vbh, bw, sq } = dimensions;

	const xw = sq;
	const yw = sq;

	const w = vbw - bw;
	const h = vbh - bw;

	let parts: string[] = [];
	let i;
	let x = xw + bw;
	let y = h - yw;
	const repeat = Math.floor(board.columns / 2) - 1;
	parts.push(`M${bw},${bw}H${x}V${h}`);
	for (i = 0; i < repeat; i++) {
		x = xw + bw + 2 * xw * (i + 1);
		parts.push(`H${x - xw}V${bw}H${x}V${h}`);
	}
	parts.push(`H${w}V${y}H${bw}`);
	for (i = 0; i < repeat; i++) {
		y = h - yw - 2 * yw * (i + 1);
		parts.push(`V${y + yw}H${w}V${y}H${bw}`);
	}
	parts.push(`V${bw}`);

	// parts.push(`<path fill="${getColour(clrs[0], clrSet)}" d="M0,0H${x}V${h}`);
	const evenSquares = s('path', { fill: theme.board[0], d: parts.join('') });
	parts = [];

	x = w - xw;
	y = yw + bw;
	parts.push(`M${w},${bw}H${x}V${h}`);
	for (i = 0; i < repeat; i++) {
		x = w - xw - 2 * xw * (i + 1);
		parts.push(`H${x + xw}V${bw}H${x}V${h}`);
	}
	parts.push(`H${bw}V${y}H${w}`);
	for (i = 0; i < repeat; i++) {
		y = yw + bw + 2 * yw * (i + 1);
		parts.push(`V${y - yw}H${bw}V${y}H${w}`);
	}
	parts.push(`V${bw}`);
	const oddSquares = s('path', { fill: theme.board[1], d: parts.join('') });

	return [evenSquares, oddSquares];
};

const drawBorderLabels = (
	board: Board,
	theme: Theme,
	dimensions: ViewDimensions,
) => {
	const { columns, rows } = board;
	const { bw, sq, vbh, vbw } = dimensions;

	// const topLabels = s('g', { 'text-anchor': 'middle' });
	// const bottomLabels = s('g', { 'text-anchor': 'middle' });
	// const leftLabels = s('g', { 'text-anchor': 'left', 'dominant-baseline': 'middle'});
	// const rightLabels = s('g', { 'text-anchor': 'left', 'dominant-baseline': 'middle'});
	const align = {
		'text-anchor': 'middle',
		'dominant-baseline': 'middle',
		fill: theme.borderText,
	};
	const topLabels = s('g', align);
	const bottomLabels = s('g', align);
	const leftLabels = s('g', align);
	const rightLabels = s('g', align);

	const yTop = bw * 0.5;
	const yBottom = vbh - bw * 0.5;
	for (let col = 0; col < columns; col++) {
		const x = bw + sq * (col + 0.5);
		let text = s('text', { x, y: yTop });
		text.textContent = board.colLabels[col];
		topLabels.append(text);
		text = s('text', { x, y: yBottom });
		text.textContent = board.colLabels[col];
		bottomLabels.append(text);
	}

	const xLeft = bw * 0.5;
	const xRight = vbw - bw * 0.5;
	for (let row = 0; row < rows; row++) {
		const y = bw + sq * (row + 0.5);
		let text = s('text', { x: xLeft, y });
		text.textContent = board.rowLabels[row];
		leftLabels.append(text);
		text = s('text', { x: xRight, y });
		text.textContent = board.rowLabels[row];
		rightLabels.append(text);
	}

	const g = s('g', {
		'font-family': theme.fontFamily,
		'font-size': bw * 0.625,
	});
	g.append(topLabels, rightLabels, bottomLabels, leftLabels);

	return g;
};

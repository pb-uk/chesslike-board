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
}

export interface ViewElements {
	board: SVGSVGElement;
	border?: SVGElement;
	edge?: SVGElement;
	evenSquares: SVGElement;
	oddSquares: SVGElement;
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
}


export interface CreateViewOptions {
	theme: Partial<Theme>;
}

const defaultBorderSizeFactor = 0.5;
const defaultEdgeSizeFactor = 0.05;

const defaultTheme: Theme = {
	size: 40,
	borderSize: true,
	edgeSize: true,
	board: ["#efd9b5", "#b58862", ],
	text: ["#b58862", "#efd9b5", ],
	edge: "#b58862",
	border: "#efd9b5",
	borderText: "#b58862",
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

	const theme = { ...defaultTheme, ...settings.theme }
	const { size } = theme;

	const borderSize =
		theme.borderSize === true ? size * defaultBorderSizeFactor
		: theme.borderSize ? theme.borderSize
		: false;

	const bw = borderSize || 0;

	// Calculate the width of the board.
	const vbw = board.columns * size + 2 * bw;
	const vbh = board.rows * size + 2 * bw;
	const viewBox = `0 0 ${vbw} ${vbh}`;

	// The whole view lives inside an SVG element.
	const elements: Partial<ViewElements> = {};

	elements.board = s('svg', { viewBox }) as SVGSVGElement;

	// Add the border.
	elements.border = s('path', {
		fill: theme.border,
		d: `M0,0H${vbw}V${vbh}H0ZM${bw},${bw}V${vbh-bw}H${vbw - bw}V${bw}H${bw}`,
	});

	elements.board.append(elements.border);

	// Calculate an edge.
	const edgeSize =
		theme.edgeSize === true ? size * defaultEdgeSizeFactor
		: theme.edgeSize ? theme.edgeSize
		: false;

	// Add the edge.
	elements.edge = s('path', {
		stroke: theme.edge,
		strokeWidth: edgeSize,
		fill: 'none',
		d: `M${bw},${bw}V${vbh-bw}H${vbw - bw}V${bw}H${bw}`,
	});

	elements.board.append(elements.edge);

	return {
		board,
		theme,
		// We need to be sure we have set everything required.
		elements: elements as ViewElements,
	};
};

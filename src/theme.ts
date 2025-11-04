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
	/** Colours for pieces (only works with uncoloured pieces). */
	pieces: Record<string, string>;
}

export const defaultTheme: Theme = {
	size: 40,
	borderSize: true,
	edgeSize: true,
	board: ['#efd9b5', '#b58862'],
	text: ['#b58862', '#efd9b5'],
	pieces: { b: 'black', w: 'white' },
	edge: '#b58862',
	border: '#efd9b5',
	borderText: '#b58862',
	fontFamily: 'system-ui, sans-serif',
};

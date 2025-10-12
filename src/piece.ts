import { s } from './utils';
import { getCoordinates, type View } from './view';

import { default as cburnett } from './sets/cburnett';

/** A piece for use on a board. */
export interface Piece {
	/** Size as [width, height]. */
	size: [w: number, h: number];
	/** SVG to draw the piece. */
	svg: string;
}

/** A set of pieces. */
export interface PieceSet {
	attribution: {
		name: string;
		link: string;
		license: string;
	},
	/**
	 * The (maximum) height of a piece. This will be used to scale the pieces to
	 * fit the square.
	 */
	height: number;
	pieces: Record<string, Piece>;
}

export const sets: Record<string, PieceSet> = { default: cburnett, cburnett };

/** Data provided to OnMovePiece(). */
export interface MovePiecePayload {
	from: number;
	to: number;
}

/** Promises returned by onMovePiece(). */
export type MovePiecePromise = Promise<SVGElement[]>;

/** Data provided to OnSetPiece(). */
export interface SetPiecePayload {
	index: number;
	piece: string | null;
	previous: string | null;
}

/** Promises returned by onSetPiece(). */
export type SetPiecePromise = Promise<SVGElement[]>;

/** Render a piece moving. */
export const onMovePiece = async (view: View, data: MovePiecePayload): MovePiecePromise => {
	// Get the piece to move.
	const piece = view.elements.pieces[data.from];
	// If there is nothing there fail silently.
	if (piece == null) return [];

	// See what is in the destination.
	const oldPiece = view.elements.pieces[data.to];

	// Work out where to place it so it is on the baseline in the centre of the
	// new square.
	// Coordinates of the top left of the square.
	const [left, top] = getCoordinates(view, data.to);

	const { element, scale, offsetX, offsetY } = piece;
	const x = left + offsetX;
	const y = top + offsetY;
	const transform = `translate(${x} ${y}) scale(${scale})`;

	// Create the element, add it to the map and render it.
	element.setAttribute('transform', transform);
	delete view.elements.pieces[data.from];
	view.elements.pieces[data.to] = piece;

	return oldPiece ? [piece.element, oldPiece.element] : [piece.element];
};

/** Render a piece placed on the board. */
export const onSetPiece = async (view: View, data: SetPiecePayload): SetPiecePromise => {
	// See what is there before trying to remove it.
	const oldPiece = view.elements.pieces[data.index];

	if (data.piece === null) {
		if (oldPiece == null) return [];

		// Remove the piece and return a promise for its SVG element.
		delete view.elements.pieces[data.index];
		return [oldPiece.element];
	}

	// Get the right scale for the piece.
	const { sq } = view.dimensions;
	const scale = sq / view.pieces.height;

	// Work out where to place it so it is on the baseline in the centre of the
	// square.
	const { size, svg } = view.pieces.pieces[data.piece];
	// Coordinates of the top left of the square.
	const [left, top] = getCoordinates(view, data.index);
	// Dimensions of the sprite.
	const [ w, h ] = size;

	const offsetX = sq / 2 - w * scale / 2;
	const offsetY = sq / 2 - h * scale / 2;
	const x = left + offsetX;
	const y = top + offsetY;
	const transform = `translate(${x} ${y}) scale(${scale})`;

	// Create the element, add it to the map and render it.
	const element = s('g', { x, y, transform });
	element.innerHTML = svg;
	view.elements.pieces[data.index] = { element, scale, offsetX, offsetY };
	view.elements.board.append(element);

	return oldPiece ? [element, oldPiece.element] : [element];
};

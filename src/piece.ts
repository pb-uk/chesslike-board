import { s } from './utils';
import { getCoordinates, type View } from './view';
import { type Position } from './board';

import { default as cburnett } from './sets/cburnett';
import { default as fa5Solid } from './sets/fa-5-solid';
import { default as fa7Solid } from './sets/fa-7-solid';
import { default as fa7 } from './sets/fa-7';

/** A piece for use on a board. */
export interface Piece {
	/** Size as [width, height] (overrides the default for the set). */
	size?: [w: number, h: number];
	/** SVG to draw the piece. */
	svg: string;
	/**
	 * The (maximum) height of a piece. This will be used to scale the pieces to
	 * fit the square.
	 */
	height?: number;
}

/** A set of pieces. */
export interface PieceSet {
	attribution: {
		name: string;
		link?: string;
		license?: string;
		copyright?: string;
	};

	/** Set if the elements have an intrinsic colour. */
	clr?: boolean;
	/** Size as [width, height]. */
	size?: [w: number, h: number];

	/**
	 * The (maximum) height of a piece. This will be used to scale the pieces to
	 * fit the square.
	 */
	height: number;
	pieces: Record<string, Piece>;
}

export const sets = {
	default: fa7,
	cburnett,
	fa7,
	fa7Solid,
	fa5Solid,
};

export type Pieces = keyof typeof sets;

/** Data provided to OnMovePiece(). */
export interface MovePiecePayload {
	from: number;
	to: number;
}

/** Data provided to OnSetPiece(). */
export interface SetPiecePayload {
	index: number;
	piece: string | null;
	previous: string | null;
}

/** Render a piece moving. */
export const onMovePiece = async (
	view: View,
	data: MovePiecePayload,
): Promise<SVGElement[]> => {
	// Get the piece to move.
	const piece = view.elements.squares[data.from];
	// If there is nothing there fail silently.
	if (!piece) return [];

	// See what is in the destination.
	const oldPiece = view.elements.squares[data.to];

	// Work out where to place it so it is on the baseline in the centre of the
	// new square.
	// Coordinates of the top left of the square.
	const [left, top] = getCoordinates(view, data.to);

	const { element, scale, offsetX, offsetY } = piece;
	const x = left + offsetX;
	const y = top + offsetY;
	const transform = `translate(${x} ${y}) scale(${scale})`;

	// Move the element.
	element.setAttribute('transform', transform);
	delete view.elements.squares[data.from];
	view.elements.squares[data.to] = piece;

	element.style.transition = 'transform 1s';
	const ret = oldPiece ? [piece.element, oldPiece.element] : [piece.element];
	return new Promise((resolve) => {
		const listener = () => {
			element.removeEventListener('transitionend', listener);
			resolve(ret);
		};
		element.addEventListener('transitionend', listener);
	});
};

/** Render a piece placed on the board. */
const setPiece = (view: View, data: SetPiecePayload): SVGElement[] => {
	// See what is there before trying to remove it.
	const oldPiece = view.elements.squares[data.index];

	if (data.piece === null) {
		if (!oldPiece) return [];

		// Remove the piece and return a promise for its SVG element.
		delete view.elements.squares[data.index];
		return [oldPiece.element];
	}

	const { sq } = view.dimensions;

	// Now get the SVG for the piece: sets with uncoloured pieces need to be
	// handled differently.
	let clrKey: string | null = null;
	let pieceKey = data.piece;
	if (!view.pieces.clr) {
		// This is an uncoloured set so we need to parse the key.
		[clrKey, pieceKey] = data.piece.split('');
	}

	// Work out where to place it so it is on the baseline in the centre of the
	// square.
	const { size, svg, height } = view.pieces.pieces[pieceKey];

	const { scalePawns } = view;
	// Get the right scale for the piece.
	const scale =
		sq / (scalePawns ? (height ?? view.pieces.height) : view.pieces.height);
	const hOffsetScale = sq / view.pieces.height;

	// Coordinates of the top left of the square.
	const [left, top] = getCoordinates(view, data.index);
	// Dimensions of the sprite.
	const [w, h] = size ?? view.pieces.size ?? [1, 1];

	const offsetX = (sq - w * scale) / 2;
	// The baseline is determined by the height of the SET, not the piece.
	const offsetY =
		scalePawns ?
			(sq + h * hOffsetScale) / 2 - h * scale
		:	(sq - h * hOffsetScale) / 2;
	const x = left + offsetX;
	const y = top + offsetY;
	const transform = `translate(${x} ${y}) scale(${scale})`;
	const fill = clrKey ? view.theme.pieces[clrKey] : undefined;

	// Create the element, add it to the map and render it.
	const element = s('g', { x, y, transform, fill });
	element.innerHTML = svg;
	view.elements.squares[data.index] = { element, scale, offsetX, offsetY };
	view.rootElement.append(element);

	return oldPiece ? [element, oldPiece.element] : [element];
};

/** Render a piece placed on the board. */
export const onSetPiece = async (
	view: View,
	data: SetPiecePayload,
): Promise<SVGElement[]> => {
	const ret = setPiece(view, data);
	return new Promise((resolve) => {
		setTimeout(() => resolve(ret), 0);
	});
};

export const onSetPosition = async (
	view: View,
	position: Position,
): Promise<SVGElement[]> => {
	const pieces = [] as SVGElement[];
	for (const [index, piece] of position) {
		setPiece(view, { index, piece, previous: null });
	}
	return new Promise((resolve) => {
		setTimeout(() => resolve(pieces), 0);
	});
};

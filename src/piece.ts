import { s } from './utils';
import { getCoordinates, type View } from './view';
import { type Position, type Square } from './board';

import { default as cburnett } from './pieces/cburnett';
import { default as fa5Solid } from './pieces/fa-5-solid';
import { default as fa7Solid } from './pieces/fa-7-solid';
import { default as fa7 } from './pieces/fa-7';

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

export const pieces = {
	default: cburnett,
	cburnett,
	fa7,
	fa7Solid,
	fa5Solid,
};

export type Pieces = keyof typeof pieces;

/** Data provided to OnMovePiece(). */
export interface MovePiecePayload {
	from: Square;
	to: Square;
}

/** Data provided to OnSetPiece(). */
export interface SetPiecePayload {
	index: number;
	piece: string | null;
}

/** Render a piece moving. */
export const onMovePiece = async (
	view: View,
	data: MovePiecePayload,
): Promise<SVGElement> => {
	const moveTime = 1; // Moves take 1 second.

	// Get the piece to move.
	const piece = view.elements.squares[data.from.index];
	if (!piece) {
		throw new Error(`There is no piece in ${data.from.label} to move`);
	}

	// If there is no movement the transitionend event will not fire so we just
	// wait for the set time and resolve.
	if (data.to === data.from) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(piece.element);
			}, moveTime * 1000);
		});
	}

	// See what is in the destination.
	deletePiece(view, data.to.index);

	// Work out where to place it so it is on the baseline in the centre of the
	// new square.
	// Coordinates of the top left of the square.
	const [left, top] = getCoordinates(view, data.to.index);

	const { element, scale, offsetX, offsetY } = piece;
	const x = left + offsetX;
	const y = top + offsetY;
	const transform = `translate(${x} ${y}) scale(${scale})`;

	// Move the element.
	element.setAttribute('transform', transform);
	delete view.elements.squares[data.from.index];
	view.elements.squares[data.to.index] = piece;

	element.style.transition = `transform ${moveTime}s`;
	return new Promise((resolve) => {
		const listener = () => {
			element.removeEventListener('transitionend', listener);
			resolve(element);
		};
		element.addEventListener('transitionend', listener);
	});
};

const deletePiece = (view: View, index: number) => {
	const square = view.elements.squares[index];
	if (square && square.element) {
		square.element.remove();
	}
	delete view.elements.squares[index];
};

/** Render a piece placed on the board. */
export const setPiece = async (
	view: View,
	data: SetPiecePayload,
): Promise<SVGElement | null> => {
	if (data.piece === null) {
		deletePiece(view, data.index);
		return null;
	}

	const { sq } = view.dimensions;

	// Now get the SVG for the piece: pieces with uncoloured pieces need to be
	// handled differently.
	let clrKey: string | null = null;
	let pieceKey = data.piece;
	if (!view.pieces.clr) {
		// This is an uncoloured set so we need to parse the key.
		[clrKey, pieceKey] = data.piece.split('');
	}

	if (!(pieceKey in view.pieces.pieces)) {
		throw new Error(`Piece '${pieceKey}' does not exist`);
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

	return element;
};

/** Render a piece placed on the board. */
export const onSetPiece = async (
	view: View,
	data: SetPiecePayload,
): Promise<SVGElement | null> => {
	const ret = setPiece(view, data);
	return new Promise((resolve) => {
		setTimeout(() => resolve(ret), 0);
	});
};

export const onSetPosition = async (
	view: View,
	position: Position,
	ignoreMissingPieces = true,
): Promise<SVGElement[]> => {
	const pieces = [] as SVGElement[];
	for (const [index, piece] of position) {
		try {
			setPiece(view, { index, piece });
		} catch (e) {
			if (!ignoreMissingPieces) {
				throw e;
			}
		}
	}
	return new Promise((resolve) => {
		setTimeout(() => resolve(pieces), 0);
	});
};

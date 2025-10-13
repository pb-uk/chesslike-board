import { type Position } from './board';

export const fenStartPosition =
	'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

/**
 * See https://github.com/fsmosca/PGN-Standard/blob/master/PGN-Standard.txt
 * 16.1 (line 2008).
 * @param board
 * @param fen
 */
export const fenToPosition = (fen: string | true) => {
	// const [placement, active, castling, ep, halfmove, fullmove] = fen.split(' ');
	if (fen === true) {
		fen = fenStartPosition;
	}
	const [placement] = fen.split(' ', 2);
	const rows = placement.split('/');
	const position: Position = [];
	let index = 0;
	for (const row of rows) {
		const chars = row.split('');
		for (const char of chars) {
			const n = parseInt(char);
			if (isNaN(n)) {
				// This is a piece.
				position.push([index, fenToKey(char)]);
				index++;
				continue;
			}
			// This is a number of empty squares.
			index += n;
		}
	}
	console.log(position);
	return position;
};

export const fenToKey = (fen: string): string =>
	fen.charAt(0) > 'Z' ? `b${fen}` : `w${fen.toLowerCase()}`;

export const keyToFen = (key: string): string =>
	key.charAt(0) === 'w' ? key.charAt(1).toUpperCase() : key.charAt(1);

import * as ChesslikeBoard from '../../src/chesslike-board';
import { version as pkgVersion } from '../../package.json';

const api = ['createBoard', 'version'];

describe('The entry point', () => {
	it('should export the correct version', () => {
		expect(ChesslikeBoard.version).toBe(pkgVersion);
	});

	it('should export only the public API', () => {
		expect(Object.keys(ChesslikeBoard).sort()).toEqual(api);
	});
});

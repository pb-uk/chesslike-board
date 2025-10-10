import { createBoard } from '@/board';

describe('createBoard', () => {
	it('should create the default board', () => {
		const board = createBoard();
		expect(board.squares).toEqual([]);
	});
});

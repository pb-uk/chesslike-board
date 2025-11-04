import { createBoard, createLabels } from '@/board';

describe('createBoard', () => {
	it('should create the default board', () => {
		const board = createBoard();
		expect(board.squares.length).toBe(64);
		expect(board.squares[0].label).toBe('a8');
		expect(board.squares[1].label).toBe('b8');
		expect(board.squares[63].label).toBe('h1');
	});

	it('should create labels for columns', () => {
		const board = createBoard();
		expect(board.colLabels.length).toBe(8);
		expect(board.colLabels[0]).toBe('a');
		expect(board.colLabels[7]).toBe('h');
	});

	it('should create labels for rows', () => {
		const board = createBoard();
		expect(board.rowLabels.length).toBe(8);
		expect(board.rowLabels[0]).toBe('8');
		expect(board.rowLabels[7]).toBe('1');
	});

	it('should create a board with no squares', () => {
		const board = createBoard({ rows: 0, columns: 0 });
		expect(board.rowLabels.length).toBe(0);
		expect(board.colLabels.length).toBe(0);
		expect(board.squares.length).toBe(0);
	});
});

describe('createLabels', () => {
	it('should create labels for a board with many rows', () => {
		const columns = 2;
		const rows = 100;
		const [labels, , rowLabels] = createLabels(columns, rows);

		expect(labels.length).toBe(200);
		expect(labels[0]).toBe('a100');
		expect(labels[2]).toBe('a99');
		expect(labels[199]).toBe('b1');

		expect(rowLabels.length).toBe(100);
		expect(rowLabels[0]).toBe('100');
		expect(rowLabels[99]).toBe('1');
	});

	it('should create labels for a board with many columns', () => {
		const columns = 26 + 26 * 26 * 2 + 1;
		const rows = 2;
		const [labels, colLabels] = createLabels(columns, rows);

		expect(labels.length).toBe(columns * rows);
		expect(labels[0]).toBe('a2');
		expect(labels[26]).toBe('aa2');
		expect(labels[26 * 2]).toBe('ba2');
		expect(labels[26 + 26 * 26]).toBe('aaa2');
		expect(labels[labels.length - 1]).toBe('baa1');

		expect(colLabels.length).toBe(columns);
	});
});

# Chess-like Board

## Browser API.

```js
const { createBoard, setPiece, movePiece } = ChesslikeBoard;
const board = createBoard;
document.body.append(board);
// Put a white rook in a8.
await setPiece(board, 'a8', 'wr');

// Move it to a1.
await movePiece(board, 'a8', 'a1');
```

```html
<script src="https://cdn.jsdelivr.net/npm/chesslike-board@1"></script>
<div id="knights-tour"></div>
<div id="fools-mate"></div>
<script>
	const { createBoard, setPiece, movePiece } = ChesslikeBoard;
	// Create a board with 7 columns and 3 rows.
	const knightsTour = createBoard({
		columns: 7,
		rows: 3,
		target: '#knights-tour',
	})

	// Place the knight in the initial position and send it on its tour.
	await knightsTour.setPiece('a1', 'wn');
	await knightsTour.movePiece(
		'a1',
		'c2 b4 c6 a7 b5 c7 a6 c5 b7 a5 b3 c1 a2 c3 b1 a3 c4 b2 a4 b6'.split(' '),
		{ interval: 1000 },
	);

	// Create a chess board set up with the initial position.
	const foolsMate = createBoard({ target: '#fools-mate', position: true });
	// Move multiple pieces.
	await movePieces(foolsMate, 'f2-f3 e7-e6 g2-g4 d8-h4');
</script>
```

## See also

- https://github.com/shaack/cm-chessboard
- https://jhlywa.github.io/chess.js/
- https://chessboardjs.com/

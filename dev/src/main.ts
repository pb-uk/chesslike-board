import { createBoard, createView } from '../../src/chesslike-board';

const app = document.getElementById('app') || document.body;

const board = createBoard();
const view = createView(board);
const wrapper = document.createElement('div');
wrapper.style.maxWidth = '50vh';
wrapper.append(view.elements.board);
app.append(wrapper);

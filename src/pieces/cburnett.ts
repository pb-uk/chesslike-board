import { type PieceSet } from '../piece';

const cburnett: PieceSet = {
	attribution: {
		name: 'Colin M.L. Burnett',
		link: 'https://commons.wikimedia.org/wiki/User:Cburnett',
		license: 'CC BY-SA 3.0',
	},

	height: 45 * 1,
	size: [45, 45],

	// This set has different icons for the different colours.
	clr: true,

	pieces: {
		// White pawn.
		wp: {
			// https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg
			svg: `<path d="M22.5 9a4 4 0 0 0-3.2 6.4 6.5 6.5 0 0 0-.9 10.6c-3 1-7.4 5.6-7.4 13.5h23c0-8-4.4-12.4-7.4-13.5a6.5 6.5 0 0 0-.9-10.6A4 4 0 0 0 22.5 9z" fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>`,
		},

		// Black pawn.
		bp: {
			// https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg
			svg: `<path d="M22.5 9a4 4 0 0 0-3.2 6.4 6.5 6.5 0 0 0-.9 10.6c-3 1-7.4 5.6-7.4 13.5h23c0-8-4.4-12.4-7.4-13.5a6.5 6.5 0 0 0-.9-10.6A4 4 0 0 0 22.5 9z" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>`,
		},

		// White king.
		wk: {
			// https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg
			svg: `<g fill="none" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-linejoin="miter" d="M22.5 11.6V6M20 8h5"/><path fill="#fff" stroke-linecap="butt" stroke-linejoin="miter" d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/><path fill="#fff" d="M12.5 37a20 20 0 0 0 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5z"/><path d="M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0"/></g>`,
		},

		// Black king.
		bk: {
			// https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg
			svg: `<g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.6V6" stroke-linejoin="miter"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#000" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M12.5 37a20 20 0 0 0 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5z" fill="#000"/><path d="M20 8h5" stroke-linejoin="miter"/><path d="M32 29.5s8.5-4 6-9.6C34.1 14 25 18 22.5 24.5v2.1-2.1C20 18 10.9 14 7 19.9c-2.5 5.6 6 9.6 6 9.6" stroke="#fff"/><path d="M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0" stroke="#fff"/></g>`,
		},

		// White queen.
		wq: {
			// https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg
			svg: `<g fill="#fff" stroke="#000" stroke-width="1.5" stroke-linejoin="round"><path d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1-5.2 13.6-3-14.5-3 14.5-5.2-13.6L14 25 6.5 13.5z"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1 2.5-1 2.5-1.5 1.5 0 2.5 0 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4a82 82 0 0 0-27 0z"/><path d="M11.5 30a81 81 0 0 1 22 0M12 33.5c6-1 15-1 21 0" fill="none"/><circle cx="6" cy="12" r="2"/><circle cx="14" cy="9" r="2"/><circle cx="22.5" cy="8" r="2"/><circle cx="31" cy="9" r="2"/><circle cx="39" cy="12" r="2"/></g>`,
		},

		// Black queen.
		bq: {
			// https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg
			svg: `<g stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1-5.2 13.6-3-14.5-3 14.5-5.2-13.6L14 25 6.5 13.5z" stroke-linecap="butt"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1 2.5-1 2.5-1.5 1.5 0 2.5 0 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4a82 82 0 0 0-27 0"/><path d="M11.5 30a81 81 0 0 1 22 0M12 33.5c6-1 15-1 21 0"/><circle cx="6" cy="12" r="2"/><circle cx="14" cy="9" r="2"/><circle cx="22.5" cy="8" r="2"/><circle cx="31" cy="9" r="2"/><circle cx="39" cy="12" r="2"/><path d="M11 38.5a35 35 1 0 0 23 0" fill="none" stroke-linecap="butt"/><path d="M11 29a35 35 1 0 1 23 0m-21.5 2.5h20m-21 3a35 35 1 0 0 22 0m-23 3a35 35 1 0 0 24 0" fill="none" stroke="#fff"/></g>`,
		},

		// White rook.
		wr: {
			// https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg
			svg: `<g fill="#fff" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-linecap="butt" d="M9 39.3h27v-3H9zm3-3v-4h21v4zm-1-22v-5h4v2h5v-2h5v2h5v-2h4v5"/><path d="m34 14.3-3 3H14l-3-3"/><path stroke-linecap="butt" stroke-linejoin="miter" d="M31 17.3v12.5H14V17.3"/><path d="m31 29.8 1.5 2.5h-20l1.5-2.5"/><path fill="none" stroke-linejoin="miter" d="M11 14.3h23"/></g>`,
		},

		// Black rook.
		br: {
			// https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg
			svg: `<g fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-linecap="butt" d="M9 39.3h27v-3H9zm3.5-7 1.5-2.5h17l1.5 2.5zm-.5 4v-4h21v4z"/><path stroke-linecap="butt" stroke-linejoin="miter" d="M14 29.8v-13h17v13z"/><path stroke-linecap="butt" d="m14 16.8-3-2.5h23l-3 2.5zm-3-2.5v-5h4v2h5v-2h5v2h5v-2h4v5z"/><path fill="none" stroke="#fff" stroke-linejoin="miter" stroke-width="1" d="M12 35.8h21m-20-4h19m-18-2h17m-17-13h17m-20-2.5h23"/></g>`,
		},

		// White knight.
		wn: {
			// https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg
			svg: `<g transform="translate(0 .3)" fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#fff"/><path d="M24 18c.4 3-5.6 7.4-8 9-3 2-2.8 4.3-5 4-1-1 1.4-3 0-3-1 0 .2 1.2-1 2-1 0-4 1-4-4 0-2 6-12 6-12s1.9-1.9 2-3.5c-.7-1-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.8-2 2.5-3c1 0 1 3 1 3" fill="#fff"/><path d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0m5.5-9.7a.5 1.5 30 1 1-1-.5.5 1.5 30 1 1 1 .5" fill="#000"/></g>`,
		},
		// Black knight.
		bn: {
			// https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg
			svg: `<g fill="none" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path fill="#000" d="M22 10.3c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/><path fill="#000" d="M24 18.3c.4 3-5.6 7.4-8 9-3 2-2.8 4.3-5 4-1-1 1.4-3 0-3-1 0 .2 1.2-1 2-1 0-4 1-4-4 0-2 6-12 6-12s1.9-1.9 2-3.5c-.7-1-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.8-2 2.5-3c1 0 1 3 1 3"/><path fill="#fff" stroke="#fff" d="M9.5 25.8a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0m5.5-9.7a.6 1.7 30 1 1-1-.5.6 1.7 30 1 1 1 .5"/><path fill="#fff" stroke="none" d="m24.6 10.7-.5 1.4.5.2c3.1 1 5.6 2.5 7.9 6.8a39 39 0 0 1 2.8 20.2l-.1.5h2.3v-.5c.5-10-.9-16.8-3.2-21.3s-5.8-6.7-9.3-7.2z"/></g>`,
		},

		// White bishop.
		wb: {
			// https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg
			svg: `<g fill="none" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><g fill="#fff" stroke-linecap="butt"><path d="M9 36.6c3.4-1 10.1.4 13.5-2 3.4 2.4 10.1 1 13.5 2 0 0 1.6.5 3 2q-1 1.4-3 .5c-3.4-1-10.1.5-13.5-1-3.4 1.5-10.1 0-13.5 1q-2 .9-3-.5c1.3-1.5 3-2 3-2z"/><path d="M15 32.6c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><path d="M25 8.6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g><path stroke-linejoin="miter" d="M17.5 26.6h10m-12.5 4h15m-7.5-14.5v5M20 18.6h5"/></g>`,
		},

		// Black bishop.
		bb: {
			// https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg
			svg: `<g fill="none" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><g fill="#000" stroke-linecap="butt"><path d="M9 36.6c3.4-1 10.1.4 13.5-2 3.4 2.4 10.1 1 13.5 2 0 0 1.6.5 3 2q-1 1.4-3 .5c-3.4-1-10.1.5-13.5-1-3.4 1.5-10.1 0-13.5 1q-2 .9-3-.5c1.3-1.5 3-2 3-2z"/><path d="M15 32.6c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><path d="M25 8.6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g><path stroke="#fff" stroke-linejoin="miter" d="M17.5 26.6h10m-12.5 4h15m-7.5-14.5v5M20 18.6h5"/></g>`,
		},
	},
};

export default cburnett;

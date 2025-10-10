export interface Square {
	label: string;
}

export interface Board {
	squares: Square[];
}

export const createBoard = (): Board => {
	return {
		squares: [],
	};
};

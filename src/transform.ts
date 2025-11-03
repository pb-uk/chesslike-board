export type Coordinates = [col: number, row: number];
export type TransformCoordinates = (
	dims: Coordinates,
	coords: Coordinates,
) => void;

export type Transformation = keyof typeof transformations;

const rotate: TransformCoordinates = ([w, h], xy) => {
	xy[0] = w - xy[0] - 1;
	xy[1] = h - xy[1] - 1;
};
const rotateR: TransformCoordinates = ([w], xy) => {
	const t = xy[0];
	xy[0] = w - xy[1] - 1;
	xy[1] = t;
};
const rotateL: TransformCoordinates = ([w], xy) => {
	const t = xy[0];
	xy[0] = xy[1];
	xy[1] = w - t - 1;
};
const flipV: TransformCoordinates = ([, h], xy) => {
	xy[1] = h - xy[1] - 1;
};
const flipH: TransformCoordinates = ([w], xy) => {
	xy[0] = w - xy[0] - 1;
};
const flipBL: TransformCoordinates = ([w, h], xy) => {
	const t = xy[0];
	xy[0] = h - xy[1] - 1;
	xy[1] = w - t - 1;
};
const flipBR: TransformCoordinates = (_, xy) => {
	const t = xy[0];
	xy[0] = xy[1];
	xy[1] = t;
};

export const transformations = {
	rotate,
	rotateL,
	rotateR,
	flipH,
	flipV,
	flipBL,
	flipBR,
};

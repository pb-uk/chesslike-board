export type Coordinates = [col: number, row: number];
export type TransformCoordinates = (
	coords: Coordinates,
	dims: Coordinates,
) => void;

export type Transformation = keyof typeof transformations;

const rotate: TransformCoordinates = (xy, [w, h]) => {
	xy[0] = w - xy[0] - 1;
	xy[1] = h - xy[1] - 1;
};

export const rotateR: TransformCoordinates = (xy, [, h]) => {
	const t = xy[0];
	xy[0] = h - xy[1] - 1;
	xy[1] = t;
};
const rotateL: TransformCoordinates = (xy, [w]) => {
	const t = xy[0];
	xy[0] = xy[1];
	xy[1] = w - t - 1;
};
const flipV: TransformCoordinates = (xy, [, h]) => {
	xy[1] = h - xy[1] - 1;
};
const flipH: TransformCoordinates = (xy, [w]) => {
	xy[0] = w - xy[0] - 1;
};
const transpose: TransformCoordinates = (xy, [w, h]) => {
	const t = xy[0];
	xy[0] = h - xy[1] - 1;
	xy[1] = w - t - 1;
};
const flipD: TransformCoordinates = (xy) => {
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
	transpose,
	flipD,
};

export const transposeCoordinates = (
	transformation: string,
	xy: Coordinates,
) => {
	if (['rotateL', 'rotateR', 'transpose', 'flipD'].includes(transformation)) {
		const t = xy[0];
		xy[0] = xy[1];
		xy[1] = t;
	}
};

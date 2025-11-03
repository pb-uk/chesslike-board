export type TransformCoordinates = [col: number, row: number];
export type TransformationFn = (
	dims: TransformCoordinates,
	coords: TransformCoordinates,
) => void;

export type Transformation = keyof typeof transformations;

const rotate: TransformationFn = ([w, h], xy) => {
	xy[0] = w - xy[0] - 1;
	xy[1] = h - xy[1] - 1;
};
const rotateR: TransformationFn = ([w], xy) => {
	const t = xy[0];
	xy[0] = w - xy[1] - 1;
	xy[1] = t;
};
const rotateL: TransformationFn = ([w], xy) => {
	const t = xy[0];
	xy[0] = xy[1];
	xy[1] = w - t - 1;
};
const flipV: TransformationFn = ([, h], xy) => {
	xy[1] = h - xy[1] - 1;
};
const flipH: TransformationFn = ([w], xy) => {
	xy[0] = w - xy[0] - 1;
};
const flipBL: TransformationFn = ([w, h], xy) => {
	const t = xy[0];
	xy[0] = h - xy[1] - 1;
	xy[1] = w - t - 1;
};
const flipBR: TransformationFn = (_, xy) => {
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

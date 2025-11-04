/** The SVG namespace. */
const svgNs = 'http://www.w3.org/2000/svg';

/** Create an SVG element. */
export const s = (
	tag: string,
	attributes: Record<string, unknown> = {},
): SVGElement => {
	const el = document.createElementNS(svgNs, tag);
	for (const [key, value] of Object.entries(attributes)) {
		el.setAttribute(key, `${value}`);
	}
	return el;
};

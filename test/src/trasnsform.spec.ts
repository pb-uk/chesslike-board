import { rotateR, type Coordinates } from '@/transform';

describe('Coordinate transformations', () => {
	describe('Rotate right', () => {
		test('should work', () => {
			const dimensions: Coordinates = [5, 3];
			const xy: Coordinates = [2, 1];
			rotateR(xy, dimensions);
			expect(xy).toEqual([1, 2]);
		});
	});
});

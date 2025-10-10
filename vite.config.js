import path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const name = 'ChesslikeBoard';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [tsconfigPaths()],
	resolve: {
		alias: {
			'@/': path.resolve(__dirname, '../'),
		},
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/chesslike-board.ts'),
			formats: ['es', 'iife'],
			name,
		},
		sourcemap: true,
	},

	test: {
		include: ['{src,test}/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
		globals: true,
		coverage: {
			include: ['src'],
		},
	},
});

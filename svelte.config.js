import preprocess from 'svelte-preprocess';
// import adapter from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-static';

import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$static: path.resolve('static')
				}
			}
		}
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;

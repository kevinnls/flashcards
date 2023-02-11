import { resolve } from 'path';
export default {
	base: "./",
	build: {
		target: "esnext",
		polyfillModulePreload: false,
		assetsInlineLimit: 768,
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				home: resolve(__dirname, "home/index.html"),
			}
		}
	},
};

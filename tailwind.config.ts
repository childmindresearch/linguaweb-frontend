import { join } from 'path';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';
import { cmiLight } from './cmiThemes';

const config = {
	plugins: [
		forms,
		skeleton({
			themes: {
				custom: [cmiLight]
			}
		})
	],

	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],

	theme: {}
} satisfies Config;

export default config;

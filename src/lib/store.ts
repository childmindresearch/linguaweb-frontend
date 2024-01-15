import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let preferredTheme = 'skeleton';
if (browser && localStorage.preferredTheme) {
	preferredTheme = localStorage.preferredTheme;
}

export const currentTheme = writable(preferredTheme);
if (browser) {
	currentTheme.subscribe((value) => {
		localStorage.preferredTheme = value;
	});
}

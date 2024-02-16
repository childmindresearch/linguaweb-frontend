import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { TaskName } from './api';

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

export const ageStore = writable(6);
export const taskStore: Writable<[...TaskName[]]> = writable(['synonyms']);

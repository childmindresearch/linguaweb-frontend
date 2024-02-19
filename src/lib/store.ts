import { writable, type Writable } from 'svelte/store';
import type { TaskName } from './api';

export const ageStore = writable(6);
export const taskStore: Writable<[...TaskName[]]> = writable(['synonyms']);

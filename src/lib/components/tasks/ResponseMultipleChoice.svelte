<script lang="ts">
	import type { Word } from '$lib/api';
	import { capitalizeFirstLetter } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	export let correct: Word;
	export let distractors: Word[];
	export let center: boolean = true;

	const choices = [correct, ...distractors]
		.map((word) => word.word)
		.sort(() => Math.random() - 0.5);
	const dispatch = createEventDispatcher();

	let colors = Array(choices.length).fill('blue');

	let divClassNames = '';
	if (center) {
		divClassNames = `
			flex
			justify-center
			items-center
			space-x-5
		`;
	}

	function checkResponse(event: Event, choice: string) {
		event.preventDefault();
		dispatch('click', choice);
		const index = choices.indexOf(choice);
		if (choice === correct.word) {
			colors[index] = 'green';
		} else {
			colors[index] = 'red';
		}
	}
</script>

<div class={divClassNames}>
	{#each choices as choice}
		<span>
			<button
				type="button"
				class="btn variant-filled-secondary"
				on:click={(e) => checkResponse(e, choice)}
			>
				{capitalizeFirstLetter(choice)}
			</button>
		</span>
	{/each}
</div>

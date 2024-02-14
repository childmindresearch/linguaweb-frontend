<script lang="ts">
	import type { Word } from '$lib/api';
	import { capitalizeFirstLetter } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';
	import Confetti from 'svelte-confetti';

	export let correct: Word;
	export let distractors: Word[];

	let isCorrect = false;

	const choices = [correct, ...distractors]
		.map((word) => word.word)
		.sort(() => Math.random() - 0.5);
	const dispatch = createEventDispatcher();

	let colors = Array(choices.length).fill('variant-filled-primary');

	function delay(time: number) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	function checkResponse(event: Event, choice: string) {
		event.preventDefault();
		const index = choices.indexOf(choice);
		if (choice === correct.word) {
			colors[index] = 'variant-filled-success';
			isCorrect = true;
			const audio = new Audio('sounds/correct.mp3');
			audio.play();
		} else {
			colors[index] = 'variant-filled-error';
			isCorrect = false;
			const audio = new Audio('sounds/wrong.mp3');
			audio.play();
		}
		const delay_time = isCorrect ? 1000 : 0;
		delay(delay_time).then(() => {
			dispatch('click', choice);
		});
	}
</script>

<div class="flex justify-center items-center space-x-5">
	{#each choices as choice, index}
		<div class="relative">
			<button
				type="button"
				class={'btn ' + colors[index]}
				disabled={isCorrect}
				on:click={(e) => checkResponse(e, choice)}
			>
				{capitalizeFirstLetter(choice)}
			</button>
			{#if isCorrect && choice === correct.word}
				<div class="absolute top-1/2 left-1/2">
					<Confetti duration={2000} />
				</div>
			{/if}
		</div>
	{/each}
</div>

<script lang="ts">
	import { type Word, getWord, type WritingTaskName } from '$lib/api';
	import { createEventDispatcher, onMount } from 'svelte';
	import ResponseMultipleChoice from '$lib/components/tasks/ResponseMultipleChoice.svelte';
	import LoadingBar from '$lib/components/LoadingBar.svelte';

	export let task: WritingTaskName;
	export let wordId: number;
	export let distractorIds: number[];

	const taskDescription: Record<WritingTaskName, string> = {
		synonyms: 'Find the synonym.',
		antonyms: 'Find the antonym.',
		description: 'What word is described?',
		jeopardy: 'Guess the word.'
	};

	let targetWord: Word;
	let distractors: Word[];
	let allPromises: Promise<Word>[] = [];

	let dispatch = createEventDispatcher();
	function onCheck(event: CustomEvent) {
		dispatch('check', event.detail);
	}

	function arrayToString(array: string[] | string) {
		if (Array.isArray(array)) {
			return array.join(', ');
		}
		return array;
	}

	onMount(async () => {
		const targetWordPromise = getWord(wordId);
		const distractorsPromise = distractorIds.map((id) => getWord(id));
		allPromises = [targetWordPromise, ...distractorsPromise];
		targetWord = await targetWordPromise;
		distractors = await Promise.all(distractorsPromise);
	});
</script>

{#if !targetWord || !distractors}
	<LoadingBar />
{:else}
	<h4 class="h4 font-semibold">{taskDescription[task]}</h4>
	<p class="pb-5">{arrayToString(targetWord[task])}</p>
	<ResponseMultipleChoice correct={targetWord} {distractors} on:click={onCheck} />
{/if}

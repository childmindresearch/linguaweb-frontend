<script lang="ts">
	import { type Word, getWord, type WritingTaskName } from '$lib/api';
	import { createEventDispatcher, onMount } from 'svelte';
	import ResponseMultipleChoice from '$lib/components/tasks/ResponseMultipleChoice.svelte';
	import LoadingBar from '$lib/components/LoadingBar.svelte';
	import { _ } from 'svelte-i18n';

	export let task: WritingTaskName;
	export let wordId: number;
	export let distractorIds: number[];

	let targetWord: Word;
	let distractors: Word[];

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
		targetWord = await targetWordPromise;
		distractors = await Promise.all(distractorsPromise);
	});
</script>

{#if !targetWord || !distractors}
	<LoadingBar />
{:else}
	<div class="space-y-5">
		<h4 class="h4 font-semibold text-center">{$_('tasks.' + task + '.description')}</h4>
		<p class="pb-5 text-center">{arrayToString(targetWord[task])}</p>
		<ResponseMultipleChoice correct={targetWord} {distractors} on:click={onCheck} />
	</div>
{/if}

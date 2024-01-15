<script lang="ts">
	import { type Word, getWord, getSpeechTranscript } from '$lib/api';
	import { createEventDispatcher } from 'svelte';
	import SpeechRecorder from '$lib/components/SpeechRecorder.svelte';
	import LoadingBar from '$lib/components/LoadingBar.svelte';

	export let wordId: number;

	const targetWord: Promise<Word> = getWord(wordId);
	let lastWord: string = '';

	let dispatch = createEventDispatcher();
	async function onStopRecording(event: CustomEvent) {
		event.preventDefault();
		const blob = event.detail;

		lastWord = await getSpeechTranscript(blob);
		dispatch('check', lastWord);
	}
</script>

{#if lastWord}
	<p>
		The word we heard was '<b>{lastWord}</b>'.
	</p>
{/if}

{#await targetWord}
	<LoadingBar />
{:then word}
	<h4 class="h4 font-semibold">Please say the following word:</h4>
	<b>{word.word}</b>
	<SpeechRecorder on:stop={onStopRecording} />
{:catch error}
	<p>{error.message}</p>
{/await}

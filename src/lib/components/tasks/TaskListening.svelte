<script lang="ts">
	import { getSpeechTranscript, getWordAudio } from '$lib/api';
	import { createEventDispatcher } from 'svelte';
	import AudioPlayer from '../AudioPlayer.svelte';
	import { _, locale } from 'svelte-i18n';
	import LoadingBar from '$lib/components/LoadingBar.svelte';
	import SpeechRecorder from '../SpeechRecorder.svelte';

	export let wordId: number;

	let wordAudio = getWordAudio(wordId);
	let lastWord: string = '';

	let dispatch = createEventDispatcher();
	async function onStopRecording(event: CustomEvent) {
		event.preventDefault();
		const blob = event.detail;
		const language = ($locale && $locale.split('-')[0]) || 'en';

		lastWord = await getSpeechTranscript(blob, language);
		dispatch('check', lastWord);
	}
</script>

{#if lastWord}
	<p>
		The word we heard was '<b>{lastWord}</b>'.
	</p>
{/if}

{#await wordAudio}
	<LoadingBar />
{:then audioBlob}
	<div class="flex flex-col items-center space-y-8">
		<h4 class="h4 font-semibold">{$_('tasks.sound.description')}</h4>
		<AudioPlayer {audioBlob} />
		<SpeechRecorder on:stop={onStopRecording} />
	</div>
{:catch error}
	<p>{error.message}</p>
{/await}

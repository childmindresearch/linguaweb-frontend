<script lang="ts">
	import { getWordAudio } from '$lib/api';
	import { createEventDispatcher } from 'svelte';
	import AudioPlayer from '../AudioPlayer.svelte';
	import ResponseInput from './ResponseInput.svelte';
	import LoadingBar from '$lib/components/LoadingBar.svelte';

	export let wordId: number;

	let wordAudio = getWordAudio(wordId);

	let dispatch = createEventDispatcher();
	function onCheck(event: CustomEvent) {
		dispatch('check', event.detail);
	}
</script>

{#await wordAudio}
	<LoadingBar />
{:then audioBlob}
	<div class="flex flex-col items-center space-y-2">
		<AudioPlayer {audioBlob} />
		<ResponseInput on:keyup={onCheck} placeholder="What word did you hear?" />
	</div>
{:catch error}
	<p>{error.message}</p>
{/await}

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let audioBlob: Blob;

	const audioUrl = URL.createObjectURL(audioBlob);
	let audioRef: HTMLAudioElement;

	function playAudio() {
		audioRef.play();
	}

	onDestroy(() => {
		URL.revokeObjectURL(audioUrl);
	});

	onMount(() => {
		playAudio();
	});
</script>

<audio bind:this={audioRef} src={audioUrl} />

<button class="btn variant-filled-surface" on:click={playAudio}>Play</button>

<script lang="ts">
	import { onMount } from 'svelte';
	import { PlaySolid } from 'flowbite-svelte-icons';

	export let audioBlob: Blob;

	const audioUrl = URL.createObjectURL(audioBlob);
	let audioRef: HTMLAudioElement;

	function playAudio() {
		audioRef.play();
	}

	onMount(() => {
		playAudio();
		return () => {
			URL.revokeObjectURL(audioUrl);
		};
	});
</script>

<audio bind:this={audioRef} src={audioUrl} />

<button class="btn variant-filled-surface" on:click={playAudio}>
	<PlaySolid class="mr-2" /> Play
</button>

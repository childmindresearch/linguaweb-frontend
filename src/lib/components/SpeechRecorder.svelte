<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { MicrophoneSolid } from 'flowbite-svelte-icons';

	let mediaRecorder: MediaRecorder;
	let media: Blob[] = [];
	let recordText: string = 'Record';

	const dispatch = createEventDispatcher();

	function toggleRecording(event: Event) {
		event.preventDefault();
		if (mediaRecorder.state === 'recording') {
			mediaRecorder.stop();
			recordText = 'Record';
			return;
		}
		mediaRecorder.start();
		recordText = 'Stop';
	}

	onMount(async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorder = new MediaRecorder(stream);
		mediaRecorder.ondataavailable = (e) => media.push(e.data);
		mediaRecorder.onstop = async function () {
			const audio = document.querySelector('audio');
			if (!audio) {
				return;
			}
			const fileName = 'audio.wav';
			const blob = new Blob(media, { type: 'audio/wav' });
			const file = new File([blob], fileName);
			media = [];
			dispatch('stop', file);
		};
	});

	onDestroy(() => {
		mediaRecorder.stream.getTracks().forEach((track) => track.stop());
		mediaRecorder.stop();
	});
</script>

<audio />
<button on:click={toggleRecording} class="btn variant-filled-secondary">
	<MicrophoneSolid class="mr-2" />
	{recordText}
</button>

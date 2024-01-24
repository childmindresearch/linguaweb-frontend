<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let placeholder = '';

	let inputElement: HTMLInputElement;

	const dispatch = createEventDispatcher();

	function checkResponse(event: KeyboardEvent) {
		event.preventDefault();
		if (event.key === 'Enter') {
			dispatch('keyup', inputElement.value);
		}
	}

	onMount(() => {
		inputElement.focus();
	});
</script>

<input class="input" type="text" {placeholder} bind:this={inputElement} on:keyup={checkResponse} />

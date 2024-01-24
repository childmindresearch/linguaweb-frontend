<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { AppShell, autoModeWatcher, storePopup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import '../app.postcss';

	onMount(() => {
		autoModeWatcher();
	});

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<svelte:head>
	<title>LinguaWeb</title>
</svelte:head>
<AppShell>
	<svelte:fragment slot="header">
		<NavBar />
	</svelte:fragment>
	<div class="max-w-screen-md mx-auto mt-5 px-5">
		<slot />
	</div>
</AppShell>

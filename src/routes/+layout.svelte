<script lang="ts">
	import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import NavBar from '$lib/components/NavBar.svelte';

	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

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

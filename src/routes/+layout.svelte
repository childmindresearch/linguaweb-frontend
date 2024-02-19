<script lang="ts">
	import NavBar from '$lib/components//NavBar/NavBar.svelte';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { AppShell, initializeStores, modeCurrent, storePopup } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import { _, addMessages, getLocaleFromNavigator, init } from 'svelte-i18n';
	import en from '../lang/en-US.json';
	import fr from '../lang/fr-FR.json';

	initializeStores();

	addMessages('en-US', en);
	addMessages('fr-FR', fr);
	init({
		fallbackLocale: 'en-US',
		initialLocale: getLocaleFromNavigator()
	});

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Enforce light mode while dark mode is not ready yet.
	$modeCurrent = true;
</script>

<svelte:head>
	<title>LinguaWeb | Child Mind Institute</title>
</svelte:head>
<AppShell>
	<svelte:fragment slot="header">
		<NavBar />
	</svelte:fragment>
	<div class="max-w-screen-md mx-auto mt-5 px-5 min-w-332px">
		<slot />
	</div>
</AppShell>

<style>
	.min-w-332px {
		min-width: 332px;
	}
</style>

<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { AppShell, autoModeWatcher, storePopup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import '../app.postcss';
	import { _, addMessages, getLocaleFromNavigator, init } from 'svelte-i18n';
	import en from '../lang/en-US.json';
	import fr from '../lang/fr-FR.json';
	import nl from '../lang/nl-NL.json';

	addMessages('en-US', en);
	addMessages('fr-FR', fr);
	addMessages('nl-NL', nl);
	init({
		fallbackLocale: 'en-US',
		initialLocale: getLocaleFromNavigator()
	});

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
	<svelte:fragment slot="footer">
		<div class="flex w-full">
			<div class="absolute bottom-5 right-11">
				<img class="h-10" src="/child-mind-institute-logo.svg" alt="Child Mind Institute" />
			</div>
		</div>
	</svelte:fragment>
</AppShell>

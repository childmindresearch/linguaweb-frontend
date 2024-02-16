<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import LocalizationDropdown from './LocalizationDropdown.svelte';
	import NavBarLead from './NavBarLead.svelte';
	import Age from './Age.svelte';
	import Tasks from './Tasks.svelte';
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<NavBarLead />
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<Tasks />
		<Age />
		<LocalizationDropdown />
	</svelte:fragment>
</AppBar>

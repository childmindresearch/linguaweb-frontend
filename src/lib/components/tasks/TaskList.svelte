<script lang="ts">
	import { taskNames, type TaskName } from '$lib/api';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { _, locale } from 'svelte-i18n';

	export let tasks: [...TaskName[]] = [];

	onMount(() => {
		tasks = [...taskNames];
	});
</script>

<div>
	<div class="border-b mb-3"><p class="text-center h3">{$_('title')}</p></div>
	<ListBox multiple class="flex flex-wrap space-x-3" spacing="">
		{#key $locale}
			{#each taskNames as task}
				<ListBoxItem bind:group={tasks} name={task} value={task} class="mb-2">
					<div class="select-none">
						{$_('tasks.' + task + '.title')}
					</div>
				</ListBoxItem>
			{/each}
		{/key}
	</ListBox>
</div>

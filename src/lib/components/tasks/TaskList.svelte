<script lang="ts">
	import { taskNames, type TaskName } from '$lib/api';
	import { capitalizeFirstLetter } from '$lib/utils';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let tasks: [...TaskName[]] = [];

	onMount(() => {
		tasks = [...taskNames];
	});
</script>

<div>
	<div class="border-b mb-3"><p class="text-center h3">Guess the Word!</p></div>
	<ListBox multiple class="flex flex-wrap space-x-3" spacing="">
		{#each taskNames as task}
			<ListBoxItem bind:group={tasks} name={task} value={task} class="mb-2">
				<div class="select-none">
					{capitalizeFirstLetter(task)}
				</div>
			</ListBoxItem>
		{/each}
	</ListBox>
</div>

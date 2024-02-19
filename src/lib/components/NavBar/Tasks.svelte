<script lang="ts">
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import { taskNames } from '$lib/api';
	import { taskStore } from '$lib/store';
	import { _, locale } from 'svelte-i18n';

	let tasks = [...taskNames];

	$: $taskStore = tasks;
</script>

<button
	class="btn hover:variant-soft-primary"
	use:popup={{ event: 'click', target: 'tasks', closeQuery: 'a[href]' }}
>
	<span class="font-semibold">Tasks</span>
</button>
<div class="card p-4 w-60 shadow-xl" data-popup="tasks">
	<ListBox
		multiple
		class="flex flex-wrap gap-x-3 justify-center"
		spacing=""
		active="variant-filled-primary"
	>
		{#key $locale}
			{#each taskNames as task}
				<ListBoxItem
					bind:group={tasks}
					name={task}
					value={task}
					class={'mb-2 min-w-28 text-center justify-center'}
				>
					<div class="select-none">
						{$_('tasks.' + task + '.title')}
					</div>
				</ListBoxItem>
			{/each}
		{/key}
	</ListBox>
</div>

<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
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
<div class="card p-4 w-40 shadow-xl" data-popup="tasks">
	<div class="flex flex-wrap gap-x-3">
		{#key $locale}
			{#each taskNames as task}
				<label class="mb-2 min-w-28">
					<input class="checkbox" type="checkbox" name={task} bind:group={tasks} value={task} />
					<span class="select-none">{$_('tasks.' + task + '.title')}</span>
				</label>
			{/each}
		{/key}
	</div>
</div>

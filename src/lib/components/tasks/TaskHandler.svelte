<script lang="ts">
	import type { TaskName } from '$lib/api';
	import TaskListening from '$lib/components/tasks/TaskListening.svelte';
	import TaskWriting from '$lib/components/tasks/TaskWriting.svelte';
	import { createEventDispatcher } from 'svelte';

	export let wordId: number;
	export let task: TaskName;
	export let distractorIds: number[];

	const dispatch = createEventDispatcher();

	function onCheck(event: CustomEvent) {
		dispatch('check', event.detail);
	}
</script>

{#if task === 'sound'}
	<TaskListening on:check={onCheck} {wordId} />
{:else}
	<TaskWriting on:check={onCheck} {task} {wordId} {distractorIds} />
{/if}

<script lang="ts">
	import { getWordIds, postCheckWord, type TaskName } from '$lib/api';
	import { onMount } from 'svelte';
	import TaskHandler from '$lib/components/tasks/TaskHandler.svelte';
	import LoadingBar from '$lib/components/LoadingBar.svelte';
	import { locale } from 'svelte-i18n';
	import { ageStore, taskStore } from '$lib/store';

	let currentWordId: number;
	let currentTask: TaskName;

	let ids: number[] = [];
	let distractorIds: number[] = [];

	const nDistractors = 3;

	async function setNextTask() {
		if ($taskStore.length === 0 || ids.length === 0) {
			return;
		}
		const lastId = currentWordId;
		currentTask = $taskStore[Math.floor(Math.random() * $taskStore.length)];
		while (lastId === currentWordId) {
			currentWordId = ids[Math.floor(Math.random() * ids.length)];
		}
		distractorIds = ids.filter((id) => id !== currentWordId);
		distractorIds = distractorIds.sort(() => Math.random() - 0.5).slice(0, nDistractors);
	}

	async function onCheck(event: CustomEvent) {
		const guessedWord = event.detail;
		const isCorrect = await postCheckWord(currentWordId, guessedWord);
		if (isCorrect) {
			setNextTask();
		}
	}

	onMount(async () => {
		taskSetter();
	});

	async function taskSetter() {
		ids = await getWordIds($locale || 'en-US', $ageStore);
		setNextTask();
	}

	$: if (!$taskStore.includes(currentTask)) setNextTask();
	$: $locale, $ageStore, taskSetter();
</script>

{#if ids.length == 0}
	<LoadingBar label="Starting up, please wait a moment..." />
{:else if $taskStore.length > 0 && currentWordId}
	{#key currentTask}
		{#key currentWordId}
			<TaskHandler task={currentTask} wordId={currentWordId} {distractorIds} on:check={onCheck} />
		{/key}
	{/key}
{:else}
	<p>Please select a task.</p>
{/if}

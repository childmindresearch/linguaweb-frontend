<script lang="ts">
	import Score from '$lib/components/Score.svelte';
	import TaskList from '$lib/components/tasks/TaskList.svelte';
	import { getWordIds, postCheckWord, type TaskName } from '$lib/api';
	import { onMount } from 'svelte';
	import TaskHandler from '$lib/components/tasks/TaskHandler.svelte';
	import LoadingBar from '$lib/components/LoadingBar.svelte';
	import { locale } from 'svelte-i18n';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	let score = 0;
	let maxScore = 0;
	let currentWordId: number;
	let currentTask: TaskName;
	let targetAge = 6;

	let ids: number[] = [];
	let tasks: [...TaskName[]] = ['synonyms'];
	let distractorIds: number[] = [];

	const nDistractors = 3;

	async function setNextTask() {
		if (tasks.length === 0 || ids.length === 0) {
			return;
		}
		const lastId = currentWordId;
		currentTask = tasks[Math.floor(Math.random() * tasks.length)];
		while (lastId === currentWordId) {
			currentWordId = ids[Math.floor(Math.random() * ids.length)];
		}
		distractorIds = ids.filter((id) => id !== currentWordId);
		distractorIds = distractorIds.sort(() => Math.random() - 0.5).slice(0, nDistractors);
	}

	async function onCheck(event: CustomEvent) {
		const guessedWord = event.detail;
		const isCorrect = await postCheckWord(currentWordId, guessedWord);
		score += +isCorrect;
		maxScore++;
		if (isCorrect) {
			setNextTask();
		}
	}

	onMount(async () => {
		taskSetter();
	});

	async function taskSetter() {
		ids = await getWordIds($locale || 'en-US', targetAge);
		setNextTask();
	}

	$: if (!tasks.includes(currentTask)) setNextTask();
	$: $locale, targetAge, taskSetter();
</script>

<div class="score">
	<Score {score} {maxScore} />
</div>
<div class="flex content-center justify-center mb-2">
	<TaskList bind:tasks />
</div>
<div class="flex content-center justify-center mb-10">
	<RadioGroup active="variant-filled-surface" hover="hover:variant-soft-tertiary">
		<RadioItem bind:group={targetAge} name="6-years" value={6}>6 years old</RadioItem>
		<RadioItem bind:group={targetAge} name="9-years" value={9}>9 years old</RadioItem>
		<RadioItem bind:group={targetAge} name="12-years" value={12}>12 years old</RadioItem>
	</RadioGroup>
</div>

{#if ids.length == 0}
	<LoadingBar label="Starting up, please wait a moment..." />
{:else if tasks.length > 0 && currentWordId}
	{#key currentTask}
		{#key currentWordId}
			<TaskHandler task={currentTask} wordId={currentWordId} {distractorIds} on:check={onCheck} />
		{/key}
	{/key}
{:else}
	<p>Please select a task.</p>
{/if}

<style>
	.score {
		position: absolute;
		right: 2.75rem;
		top: 6.8rem;
	}
</style>

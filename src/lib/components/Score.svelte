<script lang="ts">
	export let score: number;
	export let maxScore: number;

	let color: string;
	$: {
		if (score < 0.5 * maxScore) {
			color = 'text-error-500';
		} else if (score < 0.75 * maxScore) {
			color = 'text-warning-500';
		} else {
			color = 'text-success-500';
		}
	}
</script>

<div class="flex flex-col justify-right items-end w-full h-full">
	<p class="text-lg font-bold">
		Score: <span class={color}>{score} / {maxScore} </span>
	</p>
</div>

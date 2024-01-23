<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let value: number | undefined = undefined;
	export let label: string | undefined = undefined;

	const stroke = 100;
	const width = 'w-12';
	const strokeLinecap = 'round';
</script>

<div class="mr-auto flex justify-center items-center">
	<ProgressRadial {value} {stroke} {width} {strokeLinecap} />
</div>
{#if label}
	<p class="text-center text-md pt-2">{label}</p>
{/if}

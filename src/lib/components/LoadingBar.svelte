<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let width: number = 10;
	export let height: number = 10;
	export let center: boolean = true;
	export let stroke: number = 100;

	const radialClassNames = `
        w-${width}
        h-${height}
    `;
	let divClassNames = '';
	if (center) {
		divClassNames = `
            flex
            justify-center
            items-center
        `;
	}
</script>

<div class={divClassNames}>
	<ProgressRadial
		value={undefined}
		{stroke}
		meter="stroke-primary-500"
		track="stroke-primary-500/30"
		strokeLinecap="round"
		class={radialClassNames}
	/>
</div>

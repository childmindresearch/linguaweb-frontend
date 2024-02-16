<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import { ageStore } from '$lib/store';

	const ages = [6, 12];
</script>

<button
	class="btn hover:variant-soft-primary"
	use:popup={{ event: 'click', target: 'age', closeQuery: 'a[href]' }}
>
	<span class="font-semibold">Age</span>
</button>
<div class="card p-4 w-40 shadow-xl" data-popup="age">
	<nav class="my-1 list-nav pl-4 pr-4 -m-4 max-h-64 lg:max-h-[500px] overflow-y-auto">
		<ul>
			{#each ages as age}
				<li>
					<button
						class="option w-full h-full"
						type="submit"
						on:click={() => ageStore.set(age)}
						name="theme"
						value={age}
						class:bg-primary-active-token={$ageStore === age}
					>
						<span class="flex-auto text-left">{age + ' years old'}</span>
					</button>
				</li>
			{/each}
		</ul>
	</nav>
</div>

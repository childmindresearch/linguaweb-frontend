<script lang="ts">
	import { browser } from '$app/environment';
	import { currentTheme } from '$lib/store';
	import { LightSwitch, popup } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';

	const themes = [
		{ type: 'skeleton', name: 'Skeleton', icon: '💀' },
		{ type: 'wintry', name: 'Wintry', icon: '🌨️' },
		{ type: 'modern', name: 'Modern', icon: '🤖' },
		{ type: 'rocket', name: 'Rocket', icon: '🚀' },
		{ type: 'seafoam', name: 'Seafoam', icon: '🧜‍♀️' },
		{ type: 'vintage', name: 'Vintage', icon: '📺' },
		{ type: 'sahara', name: 'Sahara', icon: '🏜️' },
		{ type: 'hamlindigo', name: 'Hamlindigo', icon: '👔' },
		{ type: 'gold-nouveau', name: 'Gold Nouveau', icon: '💫' },
		{ type: 'crimson', name: 'Crimson', icon: '⭕' }
	];

	$: if (browser) {
		document.body.setAttribute('data-theme', $currentTheme);
	}
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/" class="flex items-center space-x-2">
			<img src="/favicon.png" alt="LinguaWeb" class="w-8 h-8" />
			<span class="hidden md:inline-block font-semibold">LinguaWeb</span>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<div>
			<button
				class="btn hover:variant-soft-primary"
				use:popup={{ event: 'click', target: 'theme', closeQuery: 'a[href]' }}
			>
				<i class="fa-solid fa-palette text-lg md:!hidden" />
				<span class="font-semibold">Theme</span>
				<i class="fa-solid fa-caret-down opacity-50" />
			</button>
			<div class="card p-4 w-60 shadow-xl" data-popup="theme">
				<div class="space-y-4">
					<section class="flex justify-between items-center">
						<h6 class="h6">Mode</h6>
						<LightSwitch />
					</section>
					<hr />
					<nav class="list-nav pl-4 pr-4 -m-4 max-h-64 lg:max-h-[500px] overflow-y-auto">
						<ul>
							{#each themes as { icon, name, type }}
								<li>
									<button
										class="option w-full h-full"
										type="submit"
										on:click={() => currentTheme.set(type)}
										name="theme"
										value={type}
										class:bg-primary-active-token={$currentTheme === type}
									>
										<span>{icon}</span>
										<span class="flex-auto text-left">{name}</span>
									</button>
								</li>
							{/each}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</svelte:fragment>
</AppBar>

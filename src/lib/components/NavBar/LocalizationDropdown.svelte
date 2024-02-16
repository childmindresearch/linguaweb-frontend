<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import { locale } from 'svelte-i18n';

	interface Localization {
		name: string;
		code: string;
		emoji: string;
	}
	const localizations: Localization[] = [
		{ name: 'English', code: 'en-US', emoji: '🇺🇸' },
		{ name: 'Français', code: 'fr-FR', emoji: '🇫🇷' }
	];

	let localization = localizations.find((l) => l.code === $locale) || localizations[0];
	$: localization = localizations.find((l) => l.code === $locale) || localizations[0];
</script>

<button
	class="btn hover:variant-soft-primary"
	use:popup={{ event: 'click', target: 'localization', closeQuery: 'a[href]' }}
>
	<span class="text-2xl">{localization.emoji}</span>
	<span class="font-semibold hidden sm:block">{localization.name}</span>
</button>
<div class="card p-4 w-60 shadow-xl" data-popup="localization">
	<nav class="my-1 list-nav pl-4 pr-4 -m-4 max-h-64 lg:max-h-[500px] overflow-y-auto">
		<ul>
			{#each localizations as { name, code, emoji }}
				<li>
					<button
						class="option w-full h-full"
						type="submit"
						on:click={() => locale.set(code)}
						name="theme"
						value={code}
						class:bg-primary-active-token={$locale === code}
					>
						<span>{emoji}</span>
						<span class="flex-auto text-left">{name}</span>
					</button>
				</li>
			{/each}
		</ul>
	</nav>
</div>

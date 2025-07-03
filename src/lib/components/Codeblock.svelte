<script lang="ts">
	import { page } from '$app/state';

	let { snippet }: { snippet: string } = $props();

	const code = page.data.codes?.[snippet];
</script>

{#if code}
	<div>{@html code}</div>
{:else}
	<div><strong>Invalid code snippet: {snippet}</strong></div>
{/if}

<style>
	div :global(pre) {
		display: flex;
		font-size: 1rem;
		padding: 1.25rem;
		background: var(--bg-elevated-tertiary);
		width: 100%;
		max-width: 95vw;
		border-radius: 0.5rem;
		margin-block: 1rem;
		font-family: 'Fira Code Variable', monospace;
		font-optical-sizing: auto;
		overflow-x: auto;
		white-space: pre-wrap;
	}
</style>

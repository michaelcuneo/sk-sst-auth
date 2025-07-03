<script lang="ts">
	import '@fontsource/lobster';
	import '@fontsource-variable/fira-code';
	import '@fontsource-variable/urbanist';
	import '@fontsource-variable/open-sans';
	import '@fontsource/material-icons';

	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import type { PageData } from './$types';

	import 'sanitize.css';
	import 'sanitize.css/forms.css';
	import 'sanitize.css/typography.css';
	import './style.css';
	import type { Snippet } from 'svelte';

	let { children, data }: { children: Snippet; data: PageData } = $props();
</script>

<div class="wrapper">
	<Header {data} />
	{@render children?.()}
	<Footer />
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100dvh;
		max-height: 100dvh;
	}
</style>

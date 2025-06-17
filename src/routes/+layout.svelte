<script lang="ts">
	import '@fontsource/lobster';
	import '@fontsource-variable/fira-code';
	import '@fontsource-variable/urbanist';
	import '@fontsource-variable/open-sans';

	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import type { PageData } from './$types';

	import 'sanitize.css';
	import 'sanitize.css/forms.css';
	import 'sanitize.css/typography.css';
	import './style.css';

	export let data: PageData;
</script>

<div class="wrapper">
	<Header {data} />
	<slot />
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

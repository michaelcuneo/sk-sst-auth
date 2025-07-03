<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<div class="wrapper">
	<div class="protected">
		<h4>THIS IS A PROTECTED LINK</h4>
		<p>You are logged in as {data.session.id}</p>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		max-width: 65rem;
		padding: 3rem 0 3rem 0;
	}
	.protected {
		width: auto;
		padding: 1rem;
		background: var(--bg-elevated-primary);
		border-radius: 10px;
	}
	h4 {
		line-height: 0.4rem;
	}
	@media screen and (max-width: 1200px) {
		.wrapper {
			max-width: 85rem;
			padding: 3rem 3rem 3rem 3rem;
		}
	}
	@media screen and (max-width: 768px) {
		.wrapper {
			max-width: 95rem;
			padding: 3rem 2rem 3rem 2rem;
		}
	}
	@media screen and (max-width: 480px) {
		.wrapper {
			max-width: 98rem;
			padding: 3rem 1rem 3rem 1rem;
		}
	}
</style>

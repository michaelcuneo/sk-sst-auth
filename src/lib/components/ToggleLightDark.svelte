<script lang="ts">
	let themes = ['light', 'dark'];
	let toggle = $state(false);

	// Set initial theme on mount
	$effect(() => {
		if (typeof window !== 'undefined') {
			const stored = window.localStorage.getItem('theme');
			const theme = stored && themes.includes(stored) ? stored : 'light';
			document.documentElement.setAttribute('data-theme', theme);
			toggle = theme === 'dark';
		}
	});

	// Reactively update theme when toggle changes
	$effect(() => {
		const theme = toggle ? 'dark' : 'light';
		const one_year = 60 * 60 * 24 * 365;
		window.localStorage.setItem('theme', theme);
		document.cookie = `theme=${theme}; max-age=${one_year}; path=/; SameSite=Lax`;
		document.documentElement.setAttribute('data-theme', theme);
	});
</script>

<div class="toggle">
	<input type="checkbox" bind:checked={toggle} />
	<span class="button"></span>
	<span class="label">
		<span class="material-icons">
			{#if toggle}light_mode{:else}dark_mode{/if}
		</span>
	</span>
</div>

<style>
	.toggle {
		display: inline-block;
		position: relative;
		height: 50px;
		width: 50px;
	}

	.toggle:before {
		content: '';
		border-radius: 50%;
		background: var(--bg-primary);
		position: absolute;
		margin-left: -18px;
		margin-top: -18px;
		opacity: 0.25;
		height: 36px;
		width: 36px;
		left: 50%;
		top: 50%;
	}

	.toggle .button {
		transition: all 300ms ease;
		box-shadow: var(--box-shadow-inactive);
		border-radius: 50%;
		position: absolute;
		background: var(--bg-secondary);
		margin-left: -17.2px;
		margin-top: -17.2px;
		display: block;
		height: 34.4px;
		width: 34.4px;
		left: 50%;
		top: 50%;
	}

	.toggle .label {
		transition: all 300ms ease;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22px;
		height: 100%;
		width: 100%;
		color: var(--clr-primary-a10, var(--text-primary));
	}

	.toggle input {
		opacity: 0;
		position: absolute;
		cursor: pointer;
		z-index: 1;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
	}

	.toggle input:hover ~ .button {
		transform: scale(1.05);
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
	}

	.toggle input:active ~ .button {
		filter: brightness(0.95);
		box-shadow: var(--box-shadow-active);
	}

	.toggle input:checked ~ .button {
		filter: brightness(1.05);
		box-shadow: var(--box-shadow-active);
	}

	.toggle input:checked ~ .label {
		color: var(--clr-accent-light, var(--text-accent));
	}

	:root[data-theme='dark'] .toggle input:checked ~ .label {
		color: var(--clr-accent-dark, var(--text-accent));
	}
</style>

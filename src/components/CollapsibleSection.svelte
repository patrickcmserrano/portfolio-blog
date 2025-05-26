<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	
	export let isVisible = false;
	export let title = 'Clique para ver as respostas';
	export let eyeIconPosition: 'left' | 'right' = 'left';
	export let buttonClass = '';
	
	const dispatch = createEventDispatcher();
	
	function toggleVisibility() {
		isVisible = !isVisible;
		dispatch('toggle', { isVisible });
	}
</script>

<div class="collapsible-section">
	<button 
		class="collapsible-button {buttonClass}" 
		on:click={toggleVisibility}
		aria-expanded={isVisible}
		aria-label={isVisible ? 'Ocultar seção' : 'Mostrar seção'}
	>
		{#if eyeIconPosition === 'left'}
			<span class="eye-icon" aria-hidden="true">
				{#if isVisible}
					<!-- Eye closed icon -->
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
						<path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 5 11 7a13.16 13.16 0 0 1-1.67 2.68"/>
						<path d="M6.61 6.61A13.526 13.526 0 0 0 1 12c0 2 4 7 11 7a9.74 9.74 0 0 0 5.39-1.61"/>
						<line x1="2" y1="2" x2="22" y2="22"/>
					</svg>
				{:else}
					<!-- Eye open icon -->
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
						<circle cx="12" cy="12" r="3"/>
					</svg>
				{/if}
			</span>
		{/if}
		
		<span class="button-text">{title}</span>
		
		{#if eyeIconPosition === 'right'}
			<span class="eye-icon" aria-hidden="true">
				{#if isVisible}
					<!-- Eye closed icon -->
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
						<path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 5 11 7a13.16 13.16 0 0 1-1.67 2.68"/>
						<path d="M6.61 6.61A13.526 13.526 0 0 0 1 12c0 2 4 7 11 7a9.74 9.74 0 0 0 5.39-1.61"/>
						<line x1="2" y1="2" x2="22" y2="22"/>
					</svg>
				{:else}
					<!-- Eye open icon -->
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
						<circle cx="12" cy="12" r="3"/>
					</svg>
				{/if}
			</span>
		{/if}
	</button>
	
	{#if isVisible}
		<div class="collapsible-content" transition:slide="{{duration: 300}}">
			<slot />
		</div>
	{/if}
</div>

<style>
	.collapsible-section {
		margin: 1rem 0;
	}

	.collapsible-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background: linear-gradient(135deg, #3b82f6, #1d4ed8);
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 600;
		transition: all 0.2s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		min-height: 44px; /* Ensure touch-friendly size */
		width: 100%;
		justify-content: flex-start;
	}

	.collapsible-button:hover {
		background: linear-gradient(135deg, #1d4ed8, #1e40af);
		transform: translateY(-1px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	}

	.collapsible-button:active {
		transform: translateY(0);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.collapsible-button:focus {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	.eye-icon {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		opacity: 0.9;
		transition: opacity 0.2s ease;
	}

	.collapsible-button:hover .eye-icon {
		opacity: 1;
	}

	.button-text {
		flex: 1;
		text-align: left;
	}

	.collapsible-content {
		padding: 1rem;
		background: rgba(59, 130, 246, 0.05);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 0 0 0.5rem 0.5rem;
		margin-top: -1px; /* Seamless connection with button */
	}

	/* Dark mode support */
	:global(.dark) .collapsible-button {
		background: linear-gradient(135deg, #1e40af, #1e3a8a);
		color: #e5e7eb;
	}

	:global(.dark) .collapsible-button:hover {
		background: linear-gradient(135deg, #1e3a8a, #1e40af);
	}

	:global(.dark) .collapsible-content {
		background: rgba(30, 64, 175, 0.1);
		border-color: rgba(30, 64, 175, 0.3);
		color: #e5e7eb;
	}

	/* Animation classes */
	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slide-up {
		from {
			opacity: 1;
			transform: translateY(0);
		}
		to {
			opacity: 0;
			transform: translateY(-10px);
		}
	}

	.collapsible-content {
		animation: slide-down 0.3s ease-out;
	}
</style>

import { onMount } from 'svelte';

/**
 * Configuração para seções colapsáveis
 */
export interface CollapsibleConfig {
	/** Padrão regex para identificar seções que devem ser colapsáveis */
	patterns: RegExp[];
	/** Título padrão para o botão */
	defaultButtonTitle: string;
	/** Posição do ícone do olho */
	eyeIconPosition: 'left' | 'right';
	/** Classes CSS personalizadas para o botão */
	buttonClass: string;
	/** Se as seções devem iniciar ocultas */
	startHidden: boolean;
}

/**
 * Configuração padrão para seções de respostas
 */
export const DEFAULT_CONFIG: CollapsibleConfig = {
	patterns: [
		/Review Question Answers/i,
		/Respostas das Perguntas/i,
		/Answers/i,
		/Respostas/i
	],
	defaultButtonTitle: 'See Answers',
	eyeIconPosition: 'left',
	buttonClass: '',
	startHidden: true
};

/**
 * Processa o conteúdo markdown renderizado e adiciona funcionalidade de colapsar
 */
export function processCollapsibleSections(
	container: HTMLElement, 
	config: Partial<CollapsibleConfig> = {}
): void {
	const finalConfig = { ...DEFAULT_CONFIG, ...config };
	
	if (!container) return;

	// Encontra todos os headers que correspondem aos padrões
	const headers = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
	
	headers.forEach((header) => {
		const headerText = header.textContent?.trim() || '';
		
		// Verifica se o header corresponde a algum padrão
		const isCollapsible = finalConfig.patterns.some(pattern => 
			pattern.test(headerText)
		);
		
		if (isCollapsible) {
			makeHeaderCollapsible(header as HTMLElement, finalConfig);
		}
	});
}

/**
 * Transforma um header em uma seção colapsável
 */
function makeHeaderCollapsible(header: HTMLElement, config: CollapsibleConfig): void {
	// Coleta todo o conteúdo até o próximo header do mesmo nível ou superior
	const headerLevel = parseInt(header.tagName.charAt(1));
	const content: HTMLElement[] = [];
	
	let nextElement = header.nextElementSibling;
	while (nextElement) {
		if (nextElement.tagName.match(/^H[1-6]$/)) {
			const nextLevel = parseInt(nextElement.tagName.charAt(1));
			if (nextLevel <= headerLevel) {
				break; // Parou no próximo header do mesmo nível ou superior
			}
		}
		
		content.push(nextElement as HTMLElement);
		nextElement = nextElement.nextElementSibling;
	}
	
	if (content.length === 0) return;
	
	// Cria o botão de toggle
	const toggleButton = createToggleButton(
		header.textContent?.trim() || 'Ver Seção',
		config
	);
	
	// Cria container para o conteúdo
	const contentContainer = document.createElement('div');
	contentContainer.className = 'collapsible-content-container';
	contentContainer.style.display = config.startHidden ? 'none' : 'block';
	
	// Move todo o conteúdo para o container
	content.forEach(el => {
		contentContainer.appendChild(el);
	});
	
	// Substitui o header original pelo novo sistema
	const wrapper = document.createElement('div');
	wrapper.className = 'collapsible-section-wrapper';
	
	// Remove o header original e adiciona o novo sistema
	header.parentNode?.insertBefore(wrapper, header);
	wrapper.appendChild(toggleButton);
	wrapper.appendChild(contentContainer);
	header.remove();
	
	// Adiciona funcionalidade de toggle
	let isVisible = !config.startHidden;
	toggleButton.addEventListener('click', () => {
		isVisible = !isVisible;
		contentContainer.style.display = isVisible ? 'block' : 'none';
		updateToggleButton(toggleButton, isVisible, config);
	});
}

/**
 * Cria o botão de toggle
 */
function createToggleButton(originalTitle: string, config: CollapsibleConfig): HTMLElement {
	const button = document.createElement('button');
	button.className = `collapsible-toggle-button ${config.buttonClass}`;
	button.setAttribute('aria-expanded', (!config.startHidden).toString());
	
	// Define estilos inline para garantir que funcione
	Object.assign(button.style, {
		display: 'flex',
		alignItems: 'center',
		gap: '0.5rem',
		padding: '0.75rem 1rem',
		background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
		color: 'white',
		border: 'none',
		borderRadius: '0.5rem',
		cursor: 'pointer',
		fontSize: '0.9rem',
		fontWeight: '600',
		transition: 'all 0.2s ease',
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
		minHeight: '44px',
		width: '100%',
		justifyContent: 'flex-start',
		margin: '1rem 0'
	});
	
	updateToggleButton(button, !config.startHidden, config);
	
	return button;
}

/**
 * Atualiza o conteúdo do botão de toggle
 */
function updateToggleButton(button: HTMLElement, isVisible: boolean, config: CollapsibleConfig): void {
	const eyeIcon = createEyeIcon(isVisible);
	const buttonText = document.createElement('span');
	buttonText.textContent = config.defaultButtonTitle;
	buttonText.style.flex = '1';
	buttonText.style.textAlign = 'left';
	
	// Limpa conteúdo anterior
	button.innerHTML = '';
	
	// Adiciona elementos na ordem correta
	if (config.eyeIconPosition === 'left') {
		button.appendChild(eyeIcon);
		button.appendChild(buttonText);
	} else {
		button.appendChild(buttonText);
		button.appendChild(eyeIcon);
	}
	
	button.setAttribute('aria-expanded', isVisible.toString());
}

/**
 * Cria o ícone do olho (aberto/fechado)
 */
function createEyeIcon(isOpen: boolean): HTMLElement {
	const iconContainer = document.createElement('span');
	iconContainer.className = 'eye-icon';
	Object.assign(iconContainer.style, {
		display: 'flex',
		alignItems: 'center',
		flexShrink: '0',
		opacity: '0.9'
	});
	
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', '20');
	svg.setAttribute('height', '20');
	svg.setAttribute('viewBox', '0 0 24 24');
	svg.setAttribute('fill', 'none');
	svg.setAttribute('stroke', 'currentColor');
	svg.setAttribute('stroke-width', '2');
	svg.setAttribute('stroke-linecap', 'round');
	svg.setAttribute('stroke-linejoin', 'round');
	
	if (isOpen) {
		// Olho aberto
		svg.innerHTML = `
			<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
			<circle cx="12" cy="12" r="3"/>
		`;
	} else {
		// Olho fechado
		svg.innerHTML = `
			<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
			<path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 5 11 7a13.16 13.16 0 0 1-1.67 2.68"/>
			<path d="M6.61 6.61A13.526 13.526 0 0 0 1 12c0 2 4 7 11 7a9.74 9.74 0 0 0 5.39-1.61"/>
			<line x1="2" y1="2" x2="22" y2="22"/>
		`;
	}
	
	iconContainer.appendChild(svg);
	return iconContainer;
}

/**
 * Hook Svelte para usar o processamento de seções colapsáveis
 */
export function useCollapsibleSections(
	container: HTMLElement | undefined,
	config: Partial<CollapsibleConfig> = {}
) {
	onMount(() => {
		if (container) {
			// Adiciona um pequeno delay para garantir que o DOM esteja completamente renderizado
			setTimeout(() => {
				processCollapsibleSections(container, config);
			}, 100);
		}
	});
}

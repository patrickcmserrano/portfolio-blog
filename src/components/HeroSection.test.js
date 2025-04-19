import { render } from '@testing-library/svelte';
import HeroSection from './HeroSection.svelte';

describe('HeroSection', () => {
	test('deve renderizar corretamente com os parâmetros fornecidos', () => {
		const { getByText } = render(HeroSection, {
			props: {
				base: '/base',
				title: 'Olá, eu sou Patrick',
				description:
					'Engenheiro de Software com foco em arquiteturas distribuídas e sistemas de pagamento.',
				aboutLinkText: 'Conheça minha trajetória',
				blogLinkText: 'Artigos técnicos'
			}
		});

		expect(getByText('Olá, eu sou Patrick')).toBeInTheDocument();
		expect(
			getByText(
				'Engenheiro de Software com foco em arquiteturas distribuídas e sistemas de pagamento.'
			)
		).toBeInTheDocument();
		expect(getByText('Conheça minha trajetória')).toBeInTheDocument();
		expect(getByText('Artigos técnicos')).toBeInTheDocument();
	});

	test('deve conter os links corretos', () => {
		const { getByText } = render(HeroSection, {
			props: {
				base: '/base',
				title: 'Olá, eu sou Patrick',
				description:
					'Engenheiro de Software com foco em arquiteturas distribuídas e sistemas de pagamento.',
				aboutLinkText: 'Conheça minha trajetória',
				blogLinkText: 'Artigos técnicos'
			}
		});

		expect(getByText('Conheça minha trajetória').closest('a')).toHaveAttribute(
			'href',
			'/base/about'
		);
		expect(getByText('Artigos técnicos').closest('a')).toHaveAttribute('href', '/base/blog');
	});
});

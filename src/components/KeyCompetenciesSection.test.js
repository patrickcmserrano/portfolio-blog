import { render } from '@testing-library/svelte';
import KeyCompetenciesSection from './KeyCompetenciesSection.svelte';

describe('KeyCompetenciesSection', () => {
	test('deve renderizar corretamente com os parâmetros fornecidos', () => {
		const competencies = [
			{
				title: 'Arquitetura de Software',
				description:
					'Experiência com arquiteturas modulares como Polylith e microsserviços, focando em manutenibilidade, testabilidade e escalabilidade.'
			},
			{
				title: 'Integração de Sistemas',
				description:
					'Desenvolvimento de pipelines robustos para integração com múltiplos serviços de pagamento, e-commerce e análise de fraude.'
			},
			{
				title: 'Desenvolvimento Full Stack',
				description:
					'Experiência em desenvolvimento frontend e backend com foco em qualidade, testes automatizados e práticas ágeis.'
			}
		];

		const { getByText } = render(KeyCompetenciesSection, {
			props: {
				title: 'Competências-chave',
				competencies
			}
		});

		expect(getByText('Competências-chave')).toBeInTheDocument();
		competencies.forEach((competency) => {
			expect(getByText(competency.title)).toBeInTheDocument();
			expect(getByText(competency.description)).toBeInTheDocument();
		});
	});
});
